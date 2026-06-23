import React, { useState, useEffect } from 'react';
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  Check, 
  TrendingUp 
} from 'lucide-react';
import useSignIn from '../hooks/useSignIn';
import { toast } from 'react-toastify';

// ==========================================================================
// COMPONENTE EXPORT DEFAULT: Login
// ==========================================================================

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  
	const {
		form,
		handleOnChange,
		error,
		loading: isLoading,
		signIn
	} = useSignIn();

	useEffect(() => {
		if (error) {
			toast.error(error);
		}
	}, [error]);

  return (
    <div 
      className="min-h-screen w-full flex flex-col lg:flex-row overflow-x-hidden theme-transition" 
      style={{ backgroundColor: '#0D0D0D' }}
    >
      
      {/* ──────────────────────────────────────────────────────────────────────────
          COLUNA ESQUERDA — Branding (Apenas Desktop, oculta no Mobile)
          ────────────────────────────────────────────────────────────────────────── */}
      <section 
        className="hidden lg:flex lg:w-1/2 bg-[#6366F1] relative flex-col justify-center items-center px-12 overflow-hidden select-none"
      >
        {/* Elementos Decorativos de Profundidade */}
        <div className="absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-15%] right-[-5%] w-[40vw] h-[45vw] rounded-full bg-white/[0.04] blur-3xl pointer-events-none" />

        {/* Bloco de Conteúdo */}
        <div className="max-w-[440px] text-white flex flex-col items-start z-10">
          <div className="flex items-center gap-3.5 mb-4">
            <div className="w-12 h-12 bg-white text-[#6366F1] rounded-2xl flex items-center justify-center shadow-lg">
              <TrendingUp size={24} />
            </div>
          </div>
          
          <h2 className="text-[28px] font-semibold tracking-tight font-sans text-white">
            FinancePro
          </h2>
          
          <p className="text-[16px] leading-relaxed text-white/75 mt-2 mb-12 font-sans font-normal">
            Visualize sua vida financeira em segundos.
          </p>

          {/* Lista de Recursos (Bullets Generosos) */}
          <div className="flex flex-col space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <Check size={14} className="text-white" />
              </div>
              <span className="text-[14px] font-sans font-medium text-white/90">
                Saldo e carteiras em tempo real
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <Check size={14} className="text-white" />
              </div>
              <span className="text-[14px] font-sans font-medium text-white/90">
                Controle de entradas e saídas
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <Check size={14} className="text-white" />
              </div>
              <span className="text-[14px] font-sans font-medium text-white/90">
                Metas e recorrências automáticas
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          COLUNA DIREITA — Formulário de Login (Responsivo)
          ────────────────────────────────────────────────────────────────────────── */}
      <section 
        className="flex-1 flex flex-col justify-center items-center px-6 lg:px-12 py-10 relative"
        style={{ backgroundColor: '#0D0D0D' }}
      >
        {/* Container do Formulário */}
        <div className="w-full max-w-[380px] flex flex-col">
          
          {/* Cabeçalho do Formulário */}
          <div className="flex flex-col items-start">
            {/* Logo Visível apenas no Mobile */}
            <div className="w-8 h-8 bg-[#6366F1] text-white rounded-xl flex lg:hidden items-center justify-center shadow-md mb-6">
              <TrendingUp size={18} />
            </div>

            <h1 
              className="text-2xl font-semibold tracking-tight font-sans theme-transition text-[#EDEDED]"
            >
              Bem-vindo de volta
            </h1>
            <p 
              className="text-[14px] mt-1 font-sans font-normal theme-transition text-[#71717A]"
            >
              Entre com suas credenciais para continuar
            </p>
          </div>

          {/* Inputs do Formulário */}
          <form onSubmit={(e) => e.preventDefault()} className="mt-8 flex flex-col">
            
            {/* CAMPO USERNAME */}
            <div className="flex flex-col">
              <label 
                htmlFor="username" 
                className="text-[13px] font-medium font-sans mb-1.5 tracking-wide theme-transition text-[#A1A1AA]"
              >
                Usuário
              </label>
              
              <div className="relative w-full">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                  <User size={16} className="theme-transition text-[#71717A]" />
                </div>
                
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={form.username}
                  onChange={handleOnChange}
                  placeholder="seu_usuario"
                  required
                  disabled={isLoading}
                  className="w-full h-11 rounded-xl font-sans text-[14px] pl-11 pr-4 bg-transparent border theme-transition outline-none"
                  style={{
                    backgroundColor: '#141414',
                    borderColor: '#2A2A2A',
                    color: '#EDEDED',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#6366F1';
                    e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.12)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#2A2A2A';
                    e.target.style.boxShadow = 'none';
                  }}
                  onMouseEnter={(e) => {
                    if (document.activeElement !== e.currentTarget) {
                      e.currentTarget.style.borderColor = '#71717A';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (document.activeElement !== e.currentTarget) {
                      e.currentTarget.style.borderColor = '#2A2A2A';
                    }
                  }}
                />
              </div>
            </div>

            {/* CAMPO PASSWORD */}
            <div className="flex flex-col mt-4">
              <label 
                htmlFor="password" 
                className="text-[13px] font-medium font-sans mb-1.5 tracking-wide theme-transition text-[#A1A1AA]"
              >
                Senha
              </label>
              
              <div className="relative w-full">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                  <Lock size={16} className="theme-transition text-[#71717A]" />
                </div>
                
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
									name="password"
                  value={form.password}
                  onChange={handleOnChange}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                  className="w-full h-11 rounded-xl font-sans text-[14px] pl-11 pr-11 bg-transparent border theme-transition outline-none"
                  style={{
                    backgroundColor: '#141414',
                    borderColor: '#2A2A2A',
                    color: '#EDEDED',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#6366F1';
                    e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.12)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#2A2A2A';
                    e.target.style.boxShadow = 'none';
                  }}
                  onMouseEnter={(e) => {
                    if (document.activeElement !== e.currentTarget) {
                      e.currentTarget.style.borderColor = '#71717A';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (document.activeElement !== e.currentTarget) {
                      e.currentTarget.style.borderColor = '#2A2A2A';
                    }
                  }}
                />

                {/* Toggle de visibilidade da senha */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-white/5 flex items-center justify-center text-[#71717A] hover:text-[#EDEDED] transition-all duration-150"
                  aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* BOTÃO DE LOGIN */}
            <button
              type="submit"
              disabled={isLoading}
							onClick={signIn}
              className="cursor-pointer w-full h-11 rounded-xl mt-6 text-[#FFFFFF] text-[14px] font-semibold font-sans flex items-center justify-center transition-all duration-150 active:scale-[0.99] border-none outline-none select-none"
              style={{
                backgroundColor: '#6366F1',
              }}
              onMouseEnter={(e) => {
                if (!isLoading) e.currentTarget.style.backgroundColor = '#5558E3';
              }}
              onMouseLeave={(e) => {
                if (!isLoading) e.currentTarget.style.backgroundColor = '#6366F1';
              }}
              onMouseDown={(e) => {
                if (!isLoading) e.currentTarget.style.backgroundColor = '#4F52D9';
              }}
            >
              {isLoading ? (
                // Spinner SVG polido e animado no carregamento
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                'Entrar'
              )}
            </button>
          </form>

          {/* Rodapé do Formulário */}
          <div className="mt-6 flex items-center justify-center gap-1">
            <span 
              className="text-[13px] font-sans font-normal theme-transition text-[#71717A]"
            >
              Não tem uma conta?
            </span>
            <button 
              className="text-[13px] font-sans font-medium text-[#6366F1] hover:text-[#5558E3] bg-transparent border-none p-0 cursor-pointer outline-none transition-colors"
            >
              Fale com o administrador
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}