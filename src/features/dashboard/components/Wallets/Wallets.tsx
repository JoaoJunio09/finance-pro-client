import type { WalletResponse } from "../../../../models/wallet/WalletResponse";
import { WalletCard } from "./WalletCard/WalletCard";

interface WalletsProps {
  wallets: WalletResponse[];
  showBalance: boolean;
}

export function Wallets({ wallets, showBalance }: WalletsProps) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-[var(--text-main)] px-1">Suas Carteiras</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {wallets.map((wallet) => (
          <WalletCard key={wallet.id} wallet={wallet} showBalance={showBalance} />
        ))}
      </div>
    </section>
  );
}

export default Wallets;