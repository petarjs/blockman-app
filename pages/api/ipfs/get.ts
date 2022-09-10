// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import ipfs from "../../../services/ipfs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { path } = req.body;

    if (!path) {
      return res.status(400).json({ error: "Path cannot be empty" });
    }
    const data = await ipfs.get(path);

    res.status(200).json(data);
  } catch (error) {
    console.log({ error });

    res.status(500).json({ error });
  }
}
