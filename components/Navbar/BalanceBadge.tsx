import { Badge, Center, Loader } from "@mantine/core";
import useAuth from "../../hooks/useAuth";
import useBalanceQuery from "../../queries/useBalanceQuery";

export default function BalanceBadge() {
  const { accountId } = useAuth();
  const { data: balance, isLoading: isLoadingBalance } =
    useBalanceQuery(accountId);

  return (
    <Badge color="violet" variant="outline">
      <Center>
        {isLoadingBalance ? (
          <Loader size="xs" />
        ) : (
          `${Number(balance).toFixed(1)} N`
        )}
      </Center>
    </Badge>
  );
}
