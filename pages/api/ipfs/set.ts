// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import ipfs from "../../../services/ipfs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!req.body) {
      res.status(400).json({ error: "Body cannot be empty" });
    }

    const data = await ipfs.save({
      content: Buffer.from(JSON.stringify(req.body)),
    });

    res.status(200).json({ path: data.path });
  } catch (error) {
    console.log({ error });

    res.status(500).json({ error });
  }
}
