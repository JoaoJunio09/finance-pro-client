import { useState } from "react";
import DesktopNav from "../components/layout/nagivation/desktop/DasktopNav";
import FabRadialMenu from "../components/layout/nagivation/mobile/radial/FabRadialManu";
import MobileNav from "../components/layout/nagivation/mobile/MobileNav";
import Activities from "../features/activities/Activities";

function ActivitiesPage() {
  const [openFabRadialMobile, setOpenFabRadialMobile] = useState(false);
	const [openFabRadialDesktop, setOpenFabRadialDesktop] = useState(false);
	const [activeDesktopTab, setActiveDesktopTab] = useState(0);

	return (
		<div className="bg-main min-h-screen relative flex flex-row justify-center overflow-x-hidden selection:bg-[color-mix(in_srgb,var(--color-primary)_30%,transparent)] transition-colors duration-500 w-full">
			<Activities />

			<MobileNav
				isFabOpen={openFabRadialMobile}
				onToggleFab={() => setOpenFabRadialMobile((prev) => !prev)}
				active="activities"
			/>

			<DesktopNav
				activeTab={activeDesktopTab}
				setActiveTab={setActiveDesktopTab}
				isDesktopMenuOpen={openFabRadialDesktop}
				setIsDesktopMenuOpen={setOpenFabRadialDesktop}
			/>

			<FabRadialMenu
				isFabOpen={openFabRadialMobile}
				onClose={() => setOpenFabRadialMobile(false)}
			/>
		</div>
	)
}

export default ActivitiesPage;