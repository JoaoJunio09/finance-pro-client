import type { ReactNode } from "react";

export type BankName =
	| 'Nubank'
	| 'Itaú'
	| 'Bradesco'
	| 'Banco do Brasil'
	| 'Caixa Econômica Federal'
	| 'Santander'
	| 'Inter'
	| 'BTG Pactual'
	| 'C6 Bank'
	| 'Banco Pan'
	| 'Banco Original'
	| 'Mercado Pago'
	| 'PicPay'
	| 'PagBank'
	| 'Neon'
	| 'Sicoob'
	| 'Sicredi'
	| 'XP Investimentos';

export interface BankBrandStyle {
	bg: string;
	glow: string;
	logo: () => ReactNode;
}

export const BANK_BRANDS: Record<string, BankBrandStyle> = {
	'Nubank': {
		bg: 'linear-gradient(135deg, #8A05BE 0%, #4D0678 100%)',
		glow: 'rgba(138,5,190,0.4)',
		logo: () => <span className="font-display font-black text-2xl tracking-tighter text-purple-400">nu</span>
	},

	'Itau': {
		bg: 'linear-gradient(135deg, #EC7000 0%, #001C3D 100%)',
		glow: 'rgba(236,112,0,0.3)',
		logo: () => (
			<div className="w-8 h-8 rounded-lg bg-[#001C3D] border border-[#EC7000] flex items-center justify-center font-display font-black text-xs text-[#EC7000]">
				Itaú
			</div>
		)
	},

	'Bradesco': {
		bg: 'linear-gradient(135deg, #CC092F 0%, #7A041A 100%)',
		glow: 'rgba(204,9,47,0.4)',
		logo: () => <span className="font-display font-bold text-lg tracking-tight text-white">Bradesco</span>
	},

	'Banco do Brasil': {
		bg: 'linear-gradient(135deg, #003087 0%, #001A4D 100%)',
		glow: 'rgba(0,48,135,0.4)',
		logo: () => (
			<div className="w-9 h-8 rounded-lg bg-[#001A4D] border border-[#FFD100] flex items-center justify-center font-display font-black text-sm text-[#FFD100]">
				BB
			</div>
		)
	},

	'Caixa Economica Federal': {
		bg: 'linear-gradient(135deg, #0033A0 0%, #001F66 100%)',
		glow: 'rgba(0,51,160,0.4)',
		logo: () => (
			<div className="flex items-center gap-1">
				<span className="w-2 h-2 rounded-full bg-[#F39200] shrink-0" />
				<span className="font-display font-black text-sm tracking-tight text-white uppercase">Caixa</span>
			</div>
		)
	},

	'Santander': {
		bg: 'linear-gradient(135deg, #EC0000 0%, #7A0000 100%)',
		glow: 'rgba(236,0,0,0.4)',
		logo: () => <span className="font-display font-bold text-lg tracking-tight text-white">Santander</span>
	},

	'Inter': {
		bg: 'linear-gradient(135deg, #FF7A00 0%, #CC6200 100%)',
		glow: 'rgba(255,122,0,0.4)',
		logo: () => <span className="font-display font-extrabold text-lg tracking-tight text-white uppercase">inter</span>
	},

	'BTG Pactual': {
		bg: 'linear-gradient(135deg, #050505 0%, #0B192C 100%)',
		glow: 'rgba(11,25,44,0.6)',
		logo: () => <span className="font-display font-bold text-xs tracking-widest text-[#00E5FF] uppercase">btg pactual</span>
	},

	'C6 Bank': {
		bg: 'linear-gradient(135deg, #1A1A1A 0%, #000000 100%)',
		glow: 'rgba(255,255,255,0.08)',
		logo: () => <span className="font-display font-black text-xl tracking-tighter text-white">C6</span>
	},

	'Banco Pan': {
		bg: 'linear-gradient(135deg, #E6007E 0%, #99004F 100%)',
		glow: 'rgba(230,0,126,0.4)',
		logo: () => <span className="font-display font-extrabold text-lg tracking-tight text-white lowercase">pan</span>
	},

	'Banco Original': {
		bg: 'linear-gradient(135deg, #00A650 0%, #00612E 100%)',
		glow: 'rgba(0,166,80,0.4)',
		logo: () => <span className="font-display font-bold text-base tracking-tight text-white lowercase">original</span>
	},

	'Mercado Pago': {
		bg: 'linear-gradient(135deg, #009EE3 0%, #005A9E 100%)',
		glow: 'rgba(0,158,227,0.4)',
		logo: () => (
			<div className="flex flex-col items-start leading-none select-none">
				<span className="font-display font-extrabold text-[12px] tracking-tight text-white/90">mercado</span>
				<span className="font-display font-normal text-[10px] tracking-widest text-[#00E5FF]">pago</span>
			</div>
		)
	},

	'PicPay': {
		bg: 'linear-gradient(135deg, #11C76F 0%, #0B7A44 100%)',
		glow: 'rgba(17,199,111,0.4)',
		logo: () => <span className="font-display font-black text-lg tracking-tight text-white lowercase">picpay</span>
	},

	'PagBank': {
		bg: 'linear-gradient(135deg, #00C2B2 0%, #00786E 100%)',
		glow: 'rgba(0,194,178,0.4)',
		logo: () => <span className="font-display font-bold text-base tracking-tight text-white">PagBank</span>
	},

	'Neon': {
		bg: 'linear-gradient(135deg, #00D4FF 0%, #7000FF 100%)',
		glow: 'rgba(112,0,255,0.4)',
		logo: () => <span className="font-display font-extrabold text-lg tracking-wide text-white lowercase">neon</span>
	},

	'Sicoob': {
		bg: 'linear-gradient(135deg, #00AEEF 0%, #00723A 100%)',
		glow: 'rgba(0,174,239,0.35)',
		logo: () => <span className="font-display font-bold text-sm tracking-wide text-white uppercase">sicoob</span>
	},

	'Sicredi': {
		bg: 'linear-gradient(135deg, #7AB800 0%, #4C7300 100%)',
		glow: 'rgba(122,184,0,0.4)',
		logo: () => <span className="font-display font-bold text-sm tracking-wide text-white uppercase">sicredi</span>
	},

	'XP Investimentos': {
		bg: 'linear-gradient(135deg, #0D0D0D 0%, #000000 100%)',
		glow: 'rgba(255,255,255,0.06)',
		logo: () => <span className="font-display font-black text-2xl tracking-tighter text-[#FFD400]">XP</span>
	},
};