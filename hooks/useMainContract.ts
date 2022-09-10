import { Contract } from "near-api-js";
import { useEffect, useMemo, useState } from "react";
import useNearContext from "../context/NearContext";
import useContract from "./useContract";

export default function useMainContract() {
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

  const { contract } = useContract(
    process.env.NEXT_PUBLIC_MAIN_CONTRACT!,
    methods
  );

  return {
    contract,
  };
}
