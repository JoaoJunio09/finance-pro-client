import { useEffect, useState } from "react";
import { formatCurrency } from "../../../utils/FormatCurrency";

const useAnimatedNumber = (end: number, duration: number = 1500) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(end * easeOutExpo);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return value;
};

function CurrentBalance({ currentBalance }: { currentBalance: number | undefined }) {
  if (!currentBalance) return;

  let balance: number = 0;

  if (currentBalance > 0) balance = useAnimatedNumber(currentBalance);
	else balance = currentBalance;

	return (
		<section className="mt-12 sm:mt-16 md:mt-20 lg:mt-24 animate-slide-up delay-100">
			<p className="text-zinc-600 text-xs sm:text-sm lg:text-base uppercase tracking-[0.2em] font-semibold mb-3 lg:mb-5">
				Hoje você possui
			</p>
			<div className="flex flex-wrap items-baseline gap-3 sm:gap-4 md:gap-6 lg:gap-8">
				<h1 className="text-6xl sm:text-7xl md:text-8xl xl:text-9xl 2xl:text-[9rem] leading-none font-semibold tracking-tighter text-white">
					{formatCurrency(balance)}
				</h1>
				<span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-zinc-500 font-light tracking-wide">
					Disponíveis.
				</span>
			</div>
		</section>
	)
}

export default CurrentBalance;