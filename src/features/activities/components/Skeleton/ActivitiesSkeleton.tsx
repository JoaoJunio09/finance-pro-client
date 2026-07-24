import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ActivitiesSkeleton() {
  return (
    <main className="flex-1 w-full relative z-10 flex flex-col items-center overflow-hidden">
      <div className="w-full relative z-10 flex flex-col max-w-[400px] bg-main min-h-screen shadow-2xl lg:max-w-[1440px] lg:border-none lg:shadow-none lg:min-h-0">
        {/* Aplicando as variáveis CSS ao tema do Skeleton */}
        <SkeletonTheme
          baseColor="var(--color-surface-elevated)"
          highlightColor="var(--color-surface)"
        >
          <div className="layout py-8 px-5 sm:px-8 lg:px-12 w-full">
            
            {/* 1. Header / Apresentation */}
            <header className="flex flex-col md:flex-row items-center justify-between gap-8 py-6 mb-10">
              <div className="flex flex-col gap-4 w-full max-w-2xl">
                {/* Tag */}
                <Skeleton height={24} width={180} borderRadius={999} />
                {/* Title */}
                <Skeleton height={48} width="75%" className="max-w-[250px] mt-2" />
                {/* Subtitle */}
                <Skeleton height={60} width="100%" className="max-w-md mt-2" />
              </div>
              
              {/* Graphic/Orbital */}
              <div className="flex-shrink-0">
                <Skeleton circle width={176} height={176} className="md:w-52 md:h-52" />
              </div>
            </header>

            {/* 2. Month Selector */}
            <div className="flex justify-center items-center mb-8">
              <Skeleton height={48} width={260} borderRadius={999} />
            </div>

            {/* 3. Summary Cards */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className="h-[136px] rounded-[20px] flex flex-col justify-between p-5 border border-[var(--border-subtle)] bg-transparent"
                >
                  <div className="flex justify-between items-start">
                    <Skeleton width={110} height={16} />
                    <Skeleton circle width={32} height={32} />
                  </div>
                  <Skeleton width={160} height={32} />
                </div>
              ))}
            </section>

            {/* Content Body Wrapper */}
            <main className="flex flex-col gap-12 w-full">
              
              {/* 4. Calendar */}
              <section className="w-full">
                {/* Header dos dias da semana */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <Skeleton key={`cal-head-${i}`} height={16} borderRadius={4} />
                  ))}
                </div>
                {/* Dias do Mês */}
                <div className="grid grid-cols-7 gap-2 sm:gap-4">
                  {Array.from({ length: 35 }).map((_, i) => (
                    <div key={`cal-day-${i}`} className="aspect-square">
                      <Skeleton height="100%" borderRadius={12} style={{ aspectRatio: '1/1' }} />
                    </div>
                  ))}
                </div>
              </section>

              {/* 5. Transactions Timeline */}
              <section className="w-full flex flex-col">
                
                {/* Divider Header */}
                <div className="flex items-center gap-5 w-full mb-6">
                  <Skeleton width={120} height={24} />
                  <div className="flex-1 h-[1px] bg-[var(--border-subtle)]"></div>
                </div>

                {/* Input Search */}
                <div className="mb-6">
                  <Skeleton height={56} borderRadius={12} />
                </div>

                {/* Highlights (Cards de Maior Receita/Despesa) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 pb-10 border-b border-[var(--border-subtle)]">
                  <Skeleton height={92} borderRadius={16} />
                  <Skeleton height={92} borderRadius={16} />
                </div>

                {/* Listagem de transações com a Linha do Tempo */}
                <div className="relative flex flex-col gap-10">
                  {/* Linha Estrutural do CSS mantida para manter o grid visual */}
                  <div className="absolute left-[9px] top-[10px] bottom-[10px] w-[1.5px] z-[1] bg-[var(--border-subtle)]"></div>

                  {[1, 2].map((group) => (
                    <div key={group} className="flex flex-col gap-6 relative">
                      <div className="relative top-0 z-[5] pl-[2.2rem]">
                        <Skeleton width={110} height={28} borderRadius={999} />
                      </div>

                      <div className="flex flex-col gap-3 pl-[2.2rem]">
                        {[1, 2, 3].map((item) => (
                          <div 
                            key={item} 
                            className="h-[76px] w-full rounded-xl border border-[var(--border-subtle)] flex items-center px-4 gap-4"
                          >
                            <Skeleton circle width={40} height={40} />
                            
                            <div className="flex flex-col gap-2 flex-1">
                              <Skeleton width="50%" height={16} />
                              <Skeleton width="30%" height={12} />
                            </div>
                            
                            <Skeleton width={80} height={20} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

              </section>
            </main>

          </div>
        </SkeletonTheme>
      </div>
    </main>
  );
}

export default ActivitiesSkeleton;