import AppShell from "../components/layout/AppShell/AppShell";
import Dashboard from "../features/dashboard/Dashboard";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-[1400px] px-4 py-7 sm:px-6 lg:px-8">
        <Dashboard />
      </div>
    </AppShell>
  );
}
