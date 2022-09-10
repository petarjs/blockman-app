import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import http from "../services/http";

export default function useIpfsQuery<T>(path: string, opts?: UseQueryOptions) {
  return useQuery(
    ["ipfs", path],
    async function () {
      if (!path) {
        return;
      }

      return http.post<T>("/api/ipfs/get", { path });
    },
    {
      select: (response) => response?.data,
    }
  );
}
