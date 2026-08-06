import { Bell, Menu, Search, User } from "lucide-react";
import Dashboard from "../features/dashboard/Dashboard";

function DashboardPage() {
	return (
		<div className={`min-h-screen ${false ? 'theme-dark' : 'theme-light'} bg-[var(--bg-base)] text-[var(--text-main)] relative selection:bg-[var(--accent-muted)] selection:text-[var(--accent)]`}>
			<header className="sticky top-0 z-40 bg-[var(--bg-surface)] border-b border-[var(--border-color)] py-2 sm:py-3 flex items-center justify-center shadow-sm min-h-[60px] transition-all">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Desktop */}
          <div className="hidden lg:flex items-center justify-between w-full">
            <button 
              onClick={() => {}}
              className="p-2 -ml-2 rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-main)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              aria-label="Abrir menu"
            >
              <Menu size={20} />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input 
                  type="text" 
                  placeholder="Pesquisar..." 
                  className="w-56 lg:w-72 bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--border-hover)] rounded-xl pl-9 pr-4 py-1.5 text-sm text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all shadow-sm"
                />
              </div>

              <button className="relative flex shrink-0 items-center justify-center w-9 h-9 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-elevated)] transition-all shadow-sm">
                <Bell size={15} className="text-[var(--text-muted)]" />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[var(--expense)] rounded-full ring-2 ring-[var(--bg-surface)]"></span>
              </button>

              <button className="relative flex shrink-0 items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-[var(--accent)] to-[#9333EA] text-white shadow-sm border border-[var(--border-color)] overflow-hidden hover:opacity-90 transition-opacity">
                <User size={15} />
              </button>
            </div>
          </div>

          {/* Header Mobile */}
          <div className="flex lg:hidden items-center justify-between w-full gap-3">
            <button className="relative flex shrink-0 items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-[var(--accent)] to-[#9333EA] text-white shadow-sm border border-[var(--border-color)] overflow-hidden hover:opacity-90 transition-opacity">
              <User size={15} />
            </button>

            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input 
                type="text" 
                placeholder="Pesquisar..." 
                className="w-full bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--border-hover)] rounded-xl pl-9 pr-4 py-1.5 text-sm text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all shadow-sm"
              />
            </div>

            <button className="relative flex shrink-0 items-center justify-center w-9 h-9 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-elevated)] transition-all shadow-sm">
              <Bell size={15} className="text-[var(--text-muted)]" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[var(--expense)] rounded-full ring-2 ring-[var(--bg-surface)]"></span>
            </button>
          </div>

        </div>
      </header>

			<div className="w-full">
				<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 lg:pb-10">
					<Dashboard />
				</div>
			</div>
		</div>		
	)
}

export default DashboardPage;