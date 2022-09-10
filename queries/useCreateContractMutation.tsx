import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import useMainContract from "../hooks/useMainContract";

export interface CreateContractVariables {
  network: string;
  contractName: string;
  description: string;
  redirectUrl: string;
}

export default function useCreateContractMutation(
  opts?: Omit<
    UseMutationOptions<unknown, unknown, CreateContractVariables, unknown>,
    "mutationFn"
  >
) {
  const { contract } = useMainContract();

  return useMutation(async function (data: CreateContractVariables) {
    const { redirectUrl, ...contractData } = data;

    // @todo Add a success callback to the redirect URL
    return (contract as any).createContract({
      callbackUrl: redirectUrl,
      args: { ...contractData, json: "" },
    });
  }, opts);
}
