import { useQuery } from "@tanstack/react-query";
import { utils } from "near-api-js";
import useNearContext from "../context/NearContext";

export default function useBalanceQuery(accountId: string) {
  const { near } = useNearContext();

  return useQuery(
    ["balance", accountId],
    async () => {
      const account = await near?.account(accountId);
      const balance = await account?.getAccountBalance();

      if (!balance) {
        return "";
      }

      const amountInNEAR = utils.format.formatNearAmount(balance.available);

      return amountInNEAR;
    },
    {
      enabled: !!near && !!accountId,
    }
  );
}
