import ConnectWalletButton from "@/components/layout/ConnectWalletButton";

type Props = {
  children?: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="border">
      <div className="
       max-w-lg border">
        <ConnectWalletButton />
      </div>
      {children}
    </div>
  );
}
