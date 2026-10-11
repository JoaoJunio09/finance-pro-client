import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import test from 'node:test';
import ts from 'typescript';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  formatInvoiceDate,
  formatInvoiceMonth,
  getCurrentInvoice,
  getInvoiceVisualStatus,
  getPurchaseInvoices,
  sortInvoices,
} from '../src/utils/invoices.ts';

const require = createRequire(import.meta.url);
const today = new Date(2026, 9, 10);
const invoice = (id, date, status = 'PAYING') => ({
  id,
  status,
  closingDate: date,
  expirationDate: date,
  limit: 5000,
  daysUntilExpiration: 7,
});

test('selects the closing month and sorts history without changing API data', () => {
  const invoices = [
    invoice('old', '2026-09-20', 'EXPIRED'),
    invoice('next', '2026-11-20'),
    invoice('current', '2026-10-20', 'PAID'),
  ];
  assert.equal(getCurrentInvoice(invoices, today).id, 'current');
  assert.deepEqual(sortInvoices(invoices).map(item => item.id), ['next', 'current', 'old']);
  assert.equal(invoices[0].id, 'old');
});

test('keeps overdue history reachable when no current-month invoice exists', () => {
  assert.equal(getCurrentInvoice([
    invoice('future', '2026-11-20'),
    invoice('overdue', '2026-09-20', 'EXPIRED'),
  ], today).id, 'overdue');
  assert.equal(getCurrentInvoice([], today), undefined);
});

test('new purchases exclude paid, expired, undated and already closed invoices', () => {
  const result = getPurchaseInvoices([
    invoice('paid', '2026-10-20', 'PAID'),
    invoice('closed', '2026-10-09'),
    invoice('open', '2026-10-20'),
    invoice('future', '2026-11-20'),
    invoice('expired', '2026-10-20', 'EXPIRED'),
    invoice('undated', null),
  ], today);
  assert.deepEqual(result.map(item => item.id), ['open', 'future']);
});

test('maps PAYING and derives urgency without treating a paid bill as expired', () => {
  assert.equal(getInvoiceVisualStatus(invoice('a', '2026-10-09'), today), 'EXPIRED');
  assert.equal(getInvoiceVisualStatus(invoice('a', '2026-10-10'), today), 'DUE_SOON');
  assert.equal(getInvoiceVisualStatus(invoice('a', '2026-10-15'), today), 'DUE_SOON');
  assert.equal(getInvoiceVisualStatus(invoice('a', '2026-10-16'), today), 'PAYING');
  assert.equal(getInvoiceVisualStatus(invoice('a', '2026-01-01', 'PAID'), today), 'PAID');
  assert.equal(getInvoiceVisualStatus(invoice('a', null), today), 'PAYING');
});

test('dates retain their year and work through year boundaries without UTC shifts', () => {
  assert.equal(formatInvoiceDate('2026-01-01'), '01/01/2026');
  assert.match(formatInvoiceMonth('2027-01-01'), /janeiro.*2027/);
  assert.equal(formatInvoiceDate(null), 'Não informado');
  assert.equal(getInvoiceVisualStatus(invoice('a', '2027-01-02'), new Date(2026, 11, 30)), 'DUE_SOON');
});

// Compile the real TS modules with the project's compiler; no extra test packages.
// API and CSS are the only stubs. React components render with the real React runtime.
function loadTs(relativePath, api) {
  const cache = new Map();
  function load(filename) {
    if (cache.has(filename)) return cache.get(filename);
    const source = ts.transpileModule(readFileSync(filename, 'utf8'), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2023,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
    }).outputText;
    const module = { exports: {} };
    cache.set(filename, module.exports);
    function localRequire(specifier) {
      if (specifier.endsWith('.css')) {
        return { __esModule: true, default: new Proxy({}, { get: (_, key) => String(key) }) };
      }
      if (specifier === './api') return { __esModule: true, default: api };
      if (!specifier.startsWith('.')) return require(specifier);
      const base = path.resolve(path.dirname(filename), specifier);
      const dependency = [base, base + '.ts', base + '.tsx'].find(existsSync);
      return load(dependency);
    }
    new Function('require', 'module', 'exports', source)(localRequire, module, module.exports);
    return module.exports;
  }
  return load(path.resolve(relativePath));
}

test('invoice reads and payments use invoice IDs and the exact backend contract', async () => {
  const calls = [];
  const api = {
    get: async (...args) => { calls.push(['GET', ...args]); return { data: { invoiceId: 'invoice-1' } }; },
    patch: async (...args) => { calls.push(['PATCH', ...args]); return { data: { invoiceId: 'invoice-1' } }; },
  };
  const Service = loadTs('src/services/InvoiceService.ts', api).default;
  const service = new Service('test-token');
  const signal = new AbortController().signal;
  assert.equal((await service.getDetails('invoice-1', signal)).invoiceId, 'invoice-1');
  await service.payInvoice('invoice-1', 'source-wallet');
  await service.payInstallment('invoice-1', 'portion-2', 'source-wallet');
  assert.deepEqual(calls.map(call => call.slice(0, 2)), [
    ['GET', '/api/invoices/v1/invoice-1/credit-card-bill'],
    ['PATCH', '/api/invoices/v1/invoice-1/credit-card-bill'],
    ['PATCH', '/api/invoices/v1/invoice-1/credit-card-bill/installments/portion-2'],
  ]);
  assert.equal(calls[0][2].signal, signal);
  assert.equal(calls[0][2].headers.Authorization, 'Bearer test-token');
  assert.deepEqual(calls[1][2], { paymentWalletId: 'source-wallet' });
  assert.deepEqual(calls[2][2], { paymentWalletId: 'source-wallet' });
});

test('API errors propagate without replacing them with a fake successful payment', async () => {
  const error = new Error('HTTP 500');
  const Service = loadTs('src/services/InvoiceService.ts', {
    patch: async () => { throw error; },
  }).default;
  await assert.rejects(new Service('test').payInvoice('invoice-1', 'wallet-1'), error);
});

test('installment plans are fetched by wallet with the authenticated contract', async () => {
  const calls = [];
  const api = {
    get: async (...args) => {
      calls.push(args);
      return { data: [{ id: 'plan-1', installments: [] }] };
    },
  };
  const Service = loadTs('src/services/InstallmentPlanService.ts', api).default;
  const signal = new AbortController().signal;
  const plans = await new Service('test-token').getAllByWallet('wallet-1', signal);

  assert.equal(plans[0].id, 'plan-1');
  assert.equal(calls[0][0], '/api/installmentPlans/v1/wallet/wallet-1');
  assert.equal(calls[0][1].headers.Authorization, 'Bearer test-token');
  assert.equal(calls[0][1].signal, signal);
});

test('history renders all months and a real empty state', () => {
  const { InvoiceHistory } = loadTs('src/features/wallets/components/Invoice/InvoiceHistory.tsx');
  const html = renderToStaticMarkup(createElement(InvoiceHistory, {
    invoices: [invoice('a', '2026-10-20'), invoice('b', '2025-12-20', 'PAID')],
    onSelect: () => {},
  }));
  assert.match(html, /outubro de 2026/);
  assert.match(html, /dezembro de 2025/);
  assert.match(html, /Limite do ciclo/);
  assert.match(renderToStaticMarkup(createElement(InvoiceHistory, {
    invoices: [], onSelect: () => {},
  })), /ainda não possui faturas/);
});

test('payment review excludes already paid installments and other plans when paying one', () => {
  const { InvoicePayment } = loadTs('src/features/wallets/components/Invoice/InvoicePayment.tsx');
  const details = {
    invoiceId: 'invoice-1',
    status: 'PAYING',
    closingDate: '2026-10-20',
    expirationDate: '2026-10-27',
    totalAmount: 350,
    paidAmount: 100,
    pendingAmount: 250,
    installments: [
      { id: 'paid', installmentPlanId: 'p1', description: 'Já quitada', value: 100, paid: true, month: 10, year: 2026 },
      { id: 'pending', installmentPlanId: 'p2', description: 'Celular', value: 200, paid: false, month: 10, year: 2026 },
      { id: 'other', installmentPlanId: 'p3', description: 'Curso', value: 50, paid: false, month: 10, year: 2026 },
    ],
  };
  const html = renderToStaticMarkup(createElement(InvoicePayment, {
    details, wallets: [], installmentId: 'pending', busy: false, onConfirm: () => {},
  }));
  assert.match(html, /Celular/);
  assert.doesNotMatch(html, /Já quitada|Curso/);
  assert.match(html, /Adicione uma carteira de saldo/);
  assert.match(html, /disabled/);
});

test('monthly installments start with unpaid items and keep alphabetical order', () => {
  const { InvoiceInstallments } = loadTs('src/features/wallets/components/Invoice/InvoiceInstallments.tsx');
  const html = renderToStaticMarkup(createElement(InvoiceInstallments, {
    filterable: true,
    installments: [
      { id: '3', description: 'Zíper', value: 30, paid: false, month: 10, year: 2026 },
      { id: '2', description: 'Blusa', value: 20, paid: true, month: 10, year: 2026 },
      { id: '1', description: 'Camisa', value: 10, paid: false, month: 10, year: 2026 },
    ],
  }));

  assert.doesNotMatch(html, /Blusa/);
  assert.ok(html.indexOf('Camisa') < html.indexOf('Zíper'));
  assert.match(html, /aria-pressed="true"[^>]*>Pendentes/);
});
