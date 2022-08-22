import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import http from "../services/http";

export default function useIpfsMutation(opts?: Partial<UseMutationOptions>) {
  return useMutation(async function (data: unknown) {
    return http.post("/api/ipfs/set", data);
  }, opts);
}
