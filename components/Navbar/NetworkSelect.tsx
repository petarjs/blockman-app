import {
  ActionIcon,
  Group,
  Loader,
  Select,
  Skeleton,
  Tooltip,
} from "@mantine/core";
import {
  IconLayersLinked,
  IconLayoutGrid,
  IconList,
  IconNetwork,
  IconSearch,
  IconWallet,
} from "@tabler/icons";
import { useMemo } from "react";
import { getNearConfig, NEAR_ENV } from "../../config/near";
import useNearContext from "../../context/NearContext";
import useAuth from "../../hooks/useAuth";

export function NetworkSelect() {
  const { network, setNetwork } = useNearContext();
  const { signOut } = useAuth();

  const networks = [NEAR_ENV.TESTNET, NEAR_ENV.MAINNET, NEAR_ENV.LOCAL];

  const config = useMemo(
    () => !!network && getNearConfig(network as NEAR_ENV),
    [network]
  );

  if (!network || !config) {
    return <Skeleton width={220} height={30} radius="md" />;
  }

  return (
    <Group>
      <Tooltip label="Select Network">
        <Select
          defaultValue={network}
          data={networks}
          placeholder="Select NEAR network"
          size="xs"
          icon={<IconLayersLinked />}
          onChange={(value) => {
            if (!value) {
              return;
            }
            signOut();
            setNetwork(value);
          }}
        />
      </Tooltip>

      {!!config.explorerUrl && (
        <Tooltip label="Open Explorer">
          <ActionIcon
            variant="light"
            component="a"
            target="_blank"
            href={config.explorerUrl}
            size="sm"
          >
            <IconSearch />
          </ActionIcon>
        </Tooltip>
      )}

      {!!config.walletUrl && (
        <Tooltip label="Open Wallet">
          <ActionIcon
            variant="light"
            component="a"
            target="_blank"
            href={config.walletUrl}
            size="sm"
          >
            <IconWallet />
          </ActionIcon>
        </Tooltip>
      )}
    </Group>
  );
}
