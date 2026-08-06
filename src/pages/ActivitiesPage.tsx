import { useState } from "react";
import Activities from "../features/activities/Activities";

function ActivitiesPage() {
  const [openFabRadialMobile, setOpenFabRadialMobile] = useState(false);
	const [openFabRadialDesktop, setOpenFabRadialDesktop] = useState(false);
	const [activeDesktopTab, setActiveDesktopTab] = useState(0);

	return (
		<div className="bg-main min-h-screen relative flex flex-row justify-center overflow-x-hidden selection:bg-[color-mix(in_srgb,var(--color-primary)_30%,transparent)] transition-colors duration-500 w-full">
			<Activities />
		</div>
	)
}

export default ActivitiesPage;