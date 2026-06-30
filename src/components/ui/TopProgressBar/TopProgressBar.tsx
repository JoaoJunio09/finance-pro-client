function TopProgressBar() {
	return (
		<div className="fixed top-0 left-0 w-full h-1 z-350 bg-slate-200">
			<div
				className="h-full w-1/4 bg-purple-600 animate-(--animate-progresss-bar)"
			/>
		</div>
	)
}

export default TopProgressBar;