import { ChevronDown, Pencil, Wallet, X } from "lucide-react";
import React from "react";
import WalletCard from "./WalletCard";
import type { BankResponse } from "../../../models/bank/BankResponse";
import type { FormData } from "../types/FormData";
import type { WalletResponse } from "../../../models/wallet/WalletResponse";
import { WalletDefault } from "../types/WalletDefault";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";

interface WalletModalProps {
	banks: BankResponse[];
	form: FormData;
	previewWallet: WalletResponse,
	handleOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement, Element>) => void;
	isEditing: boolean
	onClose: () => void;
	saveOrUpdate: () => void;
}

function WalletModal({
	banks,
	form,
	previewWallet,
	handleOnChange,
	isEditing,
	onClose,
	saveOrUpdate
}: WalletModalProps) {
	const selectedBank = banks.find(b => b.id === form.bankIdOrType);
	return (
		<div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
			<div className="absolute inset-0 bg-black/75 backdrop-blur-sm animate-overlay" onClick={onClose} />
			
			<div className="relative z-[61] w-full max-w-[480px] bg-[#111113] border border-white/[0.06] rounded-[24px] p-[28px] animate-slide-up shadow-2xl"
					style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(139,92,246,0.10)' }}>
				
				<div className="flex items-center justify-between mb-[20px]">
					<div className="flex items-center gap-3">
						{isEditing ? (
							<div className="w-[40px] h-[40px] rounded-xl flex items-center justify-center bg-[#8B5CF6]/10 border border-[#8B5CF6]/20">
								<Pencil size={18} className="text-[#8B5CF6]" />
							</div>
						) : (
							<div className="w-[40px] h-[40px] rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
								<Wallet size={18} color="#FFF" />
							</div>
						)}
						<div className="font-['Outfit'] text-[17px] font-semibold text-[#E8EAFF]">
							{isEditing ? 'Editar Carteira' : 'Nova Carteira'}
						</div>
					</div>
					<button onClick={onClose} className="p-1 rounded-lg hover:bg-white/[0.05] text-zinc-500 hover:text-white transition-colors">
						<X size={18} />
					</button>
				</div>

				<div className="w-[240px] mx-auto mb-[24px]">
					<WalletCard wallet={previewWallet} />
				</div>

				<div className="flex flex-col gap-[14px]">
					
					<div>
						<label className="font-['Inter'] text-[12px] font-semibold text-zinc-500 uppercase tracking-widest block mb-2">Nome</label>
						<input 
							id="name"
							name="name"
							type="text"
							placeholder="Ex: Conta Principal, Reserva, Moto..."
							value={form.name}
							onChange={handleOnChange}
							className="w-full h-[44px] rounded-[12px] bg-[#09090B] border border-white/[0.08] px-4 font-['Inter'] text-[13px] text-white placeholder-zinc-500 focus:outline-none focus:border-[#8B5CF6] focus:ring-[3px] focus:ring-[#8B5CF6]/20 transition-all"
						/>
					</div>

					<div>
						<label className="font-['Inter'] text-[12px] font-semibold text-zinc-500 uppercase tracking-widest block mb-2">Banco ou Tipo</label>
						<div className="relative">
							<div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center pointer-events-none">
								{selectedBank?.icon && selectedBank.color ? (
									<DynamicIcon name={selectedBank?.icon as IconName} size={16} color={selectedBank?.color} />
								) : (
									<Wallet size={16} color="#8B5CF6" />
								)}								
							</div>
							<select
								id="bankIdOrType"
								name="bankIdOrType"
								value={form.bankIdOrType}
								onChange={handleOnChange}
								className="w-full h-[44px] rounded-[12px] bg-[#09090B] border border-white/[0.08] pl-11 pr-10 font-['Inter'] text-[13px] text-white appearance-none focus:outline-none focus:border-[#8B5CF6] focus:ring-[3px] focus:ring-[#8B5CF6]/20 transition-all cursor-pointer"
							>
								<option value='' hidden>Selecione</option>
								<optgroup label="Bancos" className="bg-[#111113]">
									{Object.values(banks).map(b => (
										<option key={b.id} value={b.id}>{b.name}</option>
									))}
								</optgroup>
								<optgroup label="Tipos" className="bg-[#111113]">
									<option value={WalletDefault}>Carteira Manuel</option>
								</optgroup>
							</select>
							<div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
								<ChevronDown size={14} className="text-zinc-500" />
							</div>
						</div>
					</div>

					<div className="flex gap-4">
						<div className="flex-1">
							<label className="font-['Inter'] text-[12px] font-semibold text-zinc-500 uppercase tracking-widest block mb-2">Saldo Atual</label>
							<div className="relative h-[52px] rounded-[12px] bg-[#09090B] border border-white/[0.08] focus-within:border-[#8B5CF6] focus-within:ring-[3px] focus-within:ring-[#8B5CF6]/20 transition-all overflow-hidden flex items-center">
								<span className="font-['Inter'] text-[14px] text-zinc-500 absolute left-[14px] pointer-events-none font-semibold">R$</span>
								<input
									id="balance"
									name="balance"
									type="text"
									placeholder="0,00"
									value={form.balance}
									onChange={handleOnChange}
									className="w-full h-full bg-transparent pl-[46px] pr-4 font-['Outfit'] text-[20px] font-semibold text-white tabular-nums placeholder-[#71717A] outline-none"
								/>
							</div>
						</div>

						{true && (
							<div className="w-[120px]">
								<label className="font-['Inter'] text-[12px] font-semibold text-zinc-500 uppercase tracking-widest block mb-2 truncate">
									4 Dígitos <span className="text-zinc-500 font-normal lowercase tracking-normal bg-[#111113] rounded px-1.5 ml-1 text-[10px] border border-white/[0.04]">(opc)</span>
								</label>
								<input
									id="digits"
									name="digits"
									type="text"
									maxLength={4}
									placeholder="0000"
									value={form.digits}
									onChange={handleOnChange}
									className="w-full h-[52px] rounded-[12px] bg-[#09090B] border border-white/[0.08] px-4 font-['Outfit'] text-[20px] font-medium text-white tabular-nums placeholder-zinc-500 focus:outline-none focus:border-[#8B5CF6] focus:ring-[3px] focus:ring-[#8B5CF6]/20 transition-all text-center"
								/>
							</div>
						)}
					</div>

				</div>

				<div className="w-full h-[1px] my-[20px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

				<div className="flex gap-[10px]">
					<button 
						onClick={onClose}
						className="h-[42px] px-[20px] rounded-[10px] bg-transparent border border-white/[0.08] hover:bg-white/[0.04] font-['Inter'] text-[13px] font-medium text-zinc-400 hover:text-white transition-all outline-none"
					>
						Cancelar
					</button>
					<button 
						onClick={saveOrUpdate}
						disabled={!form.name || !form.balance || !form.bankIdOrType}
						className="flex-1 h-[42px] rounded-[10px] font-['Inter'] text-[13px] font-semibold text-white transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed outline-none"
						style={{ 
							background: 'linear-gradient(135deg, #7C3AED, #6D28D9)',
							boxShadow: '0 4px 14px rgba(124,58,237,0.20)'
						}}
					>
						Salvar Carteira
					</button>
				</div>

			</div>
		</div>
	)
}

export default WalletModal;