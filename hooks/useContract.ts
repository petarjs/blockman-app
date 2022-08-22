import { Contract } from "near-api-js";
import { useEffect, useState } from "react";
import useNearContext from "../context/NearContext";

export default function useContract(
  contractName: string,
  methods?: Array<{ name: string; type: "view" | "change" }>
) {
  const { walletConnection } = useNearContext();
  const [contract, setContract] = useState<Contract>();

  useEffect(() => {
    async function main() {
      if (!walletConnection || !methods) {
        return;
      }

      const contract = await new Contract(
        walletConnection.account(),
        contractName,
        {
          viewMethods: methods
            .filter((m) => m.type === "view")
            .map((m) => m.name),
          changeMethods: methods
            .filter((m) => m.type === "change")
            .map((m) => m.name),
        }
      );

      setContract(contract);
    }

    main();
  }, [walletConnection, contractName, methods]);

  return {
    contract,
  };
}
