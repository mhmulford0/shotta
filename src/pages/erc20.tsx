import { useState } from "react";
import dynamic from "next/dynamic";

import ERC20TokenBalance from "@/components/ERC20TokenBalance";
import { ApiResponse } from "@/types";

const AddressInput = dynamic(() => import("@/components/AddressInput"), {
  ssr: false,
});



export default function ERC20BalancePage() {
  const [apiData, setApiData] = useState<ApiResponse>({
    balance: "",
    decimals: "",
    name: "",
    symbol: "",
    wallet: ""
  });
  return (
    <>
      <AddressInput setApiData={setApiData} />
      {apiData.balance ? <ERC20TokenBalance apiData={apiData} /> : ""}
    </>
  );
}
