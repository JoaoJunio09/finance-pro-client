# Invoice integration checks

- Run contract, date and rendering tests: `node --test tests/invoices.test.mjs`.
- For visual/interaction checks, start `npm run dev -- --host 127.0.0.1 --port 4190`
  and open `http://127.0.0.1:4190/tests/fixtures/invoices-preview.html`.
- The preview uses an in-memory Axios adapter. No requests or payments reach the
  real backend. Use the dedicated port because the fixture writes test-only
  session storage on its origin.

Check at 320px, 390px and desktop widths:

1. Open the main card and its invoice history; filter by status/year.
2. Open an old paid invoice and verify its dates, totals and paid installments.
3. Pay one installment with the checking wallet; verify the debit and remaining total.
4. Pay the remaining invoice; verify the paid history and new cycle.
5. Open the card without invoices; it must show an empty state.
6. Toggle query/payment failures; verify retry and error feedback.
7. Open a new purchase; verify invoice selection and absence of paid/closed cycles.
8. Check light/dark themes, keyboard navigation and no horizontal overflow.

This fixture validates the frontend contract, not the backend's payment implementation.
