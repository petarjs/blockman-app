import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { Contract } from "near-api-js";
import http from "../services/http";

interface Props {
  type: "view" | "change";
  method: string;
  params: unknown;
  gas?: string;
  deposit?: string;
}

export default function useContractCallMutation(
  contract?: Contract,
  opts?: Partial<UseMutationOptions>
) {
  return useMutation(async function (data: unknown) {
    const { type, method, params, gas, deposit } = data as Props;

    if (!contract) {
      return;
    }

    if (type === "view") {
      return (contract as any)[method]?.(params);
    } else {
      return (contract as any)[method]?.(params);
    }
  }, opts);
}
