import { ethers } from "ethers";
import { useState } from "react";
type ApiResponse = {
  balance: string;
  decimals: number;
};

const initialState = {
  wallet: "",
  contractAddress: "",
};

async function checkTokenBalance(state: typeof initialState) {
  const res = await fetch(
    `/api/tokenBalanceAtBlock?${new URLSearchParams({
      ...state,
    })}`
  );
  const data: ApiResponse = await res.json();

  console.log(data);
}

export default function AddressInput() {
  const [formData, setFormData] = useState(initialState);
  console.log(formData);
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-100">
          Get Token Balance
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div>
            <label htmlFor="wallet" className="block font-medium text-gray-700">
              Wallet Address
            </label>
            <div className="mt-1">
              <input
                id="wallet"
                name="wallet"
                type="wallet"
                autoComplete="wallet"
                required
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label htmlFor="contractAddress" className="block font-medium text-gray-700 mt-4">
              Contract Address
            </label>
            <div className="mt-1">
              <input
                id="contractAddress"
                name="contractAddress"
                type="contractAddress"
                autoComplete="contractAddress"
                required
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-2"
              onClick={() => checkTokenBalance(formData)}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
