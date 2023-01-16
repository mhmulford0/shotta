// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { ethers } from "ethers";
import { match, P } from "ts-pattern";
import { z } from "zod";

const provider = new ethers.providers.AlchemyProvider("homestead", process.env.ALCHEMY_API_KEY);

const reqInfo = z.object({
  wallet: z.string().length(42).startsWith("0x"),
  contractAddress: z.string().length(42).startsWith("0x"),
  blockNumber: z.coerce.number(),
});

const ERC20ABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { contractAddress, wallet, blockNumber } = reqInfo.parse(req.query);
    const ERC20 = new ethers.Contract(contractAddress, ERC20ABI, provider);

    match(req.method)
      .with("GET", async () => {
        try {
          const balance = await ERC20.balanceOf(wallet);

          res.status(200).json({ balance: balance.toString() });
        } catch (error) {
          res.status(500).json({ error });
        }
      })
      .otherwise(() => {
        res.status(405).end();
      });
  } catch (error) {
    res.status(500).json({ error });
  }
}
