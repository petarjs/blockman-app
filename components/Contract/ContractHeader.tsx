import { Badge, Button, Container, Group, Text, Title } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons";
import Link from "next/link";
import { useMemo } from "react";
import { getNearConfig, NEAR_ENV } from "../../config/near";
import useNearContext from "../../context/NearContext";
import { Contract } from "../../interfaces/Contract";

interface Props {
  contract: Contract;
}

export default function ContractHeader({ contract }: Props) {
  const { network } = useNearContext();
  const config = useMemo(
    () => !!network && getNearConfig(network as NEAR_ENV),
    [network]
  );

  return (
    <Container size="sm" ml={0} p={0} mb="lg">
      <Group>
        <Title
          size="h3"
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {contract.name}
        </Title>

        <Group>
          <Badge variant="dot" size="lg">
            {contract.network}
          </Badge>
          <Badge variant="light" size="lg">
            by {contract.owner}
          </Badge>
          {!!config && config?.explorerUrl && (
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={`${config.explorerUrl}/accounts/${contract.name}`}
            >
              <Button variant="filled" radius="xl" size="xs">
                <Group spacing={4}>
                  <Text>Explorer</Text>
                  <IconExternalLink size="16" />
                </Group>
              </Button>
            </Link>
          )}
        </Group>
      </Group>
      <Group mt="md">
        <Text italic lineClamp={2}>
          {contract.description}
        </Text>
      </Group>
    </Container>
  );
}
