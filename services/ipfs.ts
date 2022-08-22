import { create } from "ipfs-http-client";

const ipfsClient = create({
  url: process.env.INFURA_IPFS_ENDPOINT,
  headers: {
    Authorization: `Basic ${Buffer.from(
      `${process.env.INFURA_IPFS_PROJECT_ID}:${process.env.INFURA_IPFS_API_KEY}`
    ).toString("base64")}`,
  },
});

const ipfs = {
  ipfsClient,
  save(data: any) {
    return ipfsClient.add({
      content: Buffer.from(JSON.stringify(data)),
    });
  },
  get(path: string) {
    return new Promise(async (res) => {
      const stream = ipfsClient.cat(path);

      let data = null;

      for await (const iterator of stream) {
        data = new TextDecoder().decode(iterator);
        data = JSON.parse(data);
        data = new TextDecoder().decode(Uint8Array.from(data.content.data));
      }

      res(JSON.parse(data!));
    });
  },
};

export default ipfs;
