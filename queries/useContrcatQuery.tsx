import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import useNearContext from "../context/NearContext";
import useContract from "../hooks/useContract";
import { Contract } from "../interfaces/Contract";

export default function useContractQuery(owner: string, contractName: string) {
  const { near } = useNearContext();
  const methods = useMemo(() => {
    return [
      {
        name: "getContract",
        type: "view" as const,
      },
      {
        name: "createContract",
        type: "change" as const,
      },
      {
        name: "updateContractJson",
        type: "change" as const,
      },
    ];
  }, []);
  const { contract } = useContract("dev-1660931771342-13140308559008", methods);

  // useEffect(() => {
  //   if (!contract) {
  //     return;
  //   }
  //   (contract as any).updateContractJson({
  //     contractName: "dev-1660931771342-13140308559008",
  //     json: "QmbwatFta8GsTpbUwFLM8aqzka4TRdq3ZCWqeUHaMnH3fQ",
  //   });
  // }, [contract]);

  return useQuery<Contract>(
    ["contract", owner, contractName],
    async () => {
      return (contract as any).getContract({
        owner,
        contractName,
      });
    },
    {
      enabled: !!near && !!contract,
    }
  );
}
