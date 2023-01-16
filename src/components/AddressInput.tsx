import { FormEvent, useReducer } from "react";
import { match } from "ts-pattern";

type ApiResponse = {
  balance: string;
};

const initialState = {
  wallet: "",
  contractAddress: "",
};
type Actions = {
  type: "updateInput";
  payload: {
    name: string;
    value: string;
  };
};

async function checkTokenBalance(state: typeof initialState) {
  const res = await fetch(
    `/api/tokenBalanceAtBlock?${new URLSearchParams({
      ...state,
    })}`
  );
  const data: ApiResponse = await res.json();

  console.log(data);
  console.log(state);
}

function reducer(state: typeof initialState, action: Actions) {
  // console.log(action.payload);
  return match(action.type)
    .with("updateInput", () => {
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    })
    .otherwise(() => {
      return {
        wallet: "",
        contractAddress: "",
      };
    });
}

export default function AddressInput() {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
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
                onChange={(e) =>
                  dispatch({
                    type: "updateInput",
                    payload: { name: e.target.name, value: e.target.value },
                  })
                }
              />
            </div>
          </div>

          <div>
            <label htmlFor="contractAddress" className="block font-medium text-gray-700">
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
                onChange={(e) =>
                  dispatch({
                    type: "updateInput",
                    payload: { name: e.target.name, value: e.target.value },
                  })
                }
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => checkTokenBalance(state)}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
