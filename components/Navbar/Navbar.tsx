import {
  Anchor,
  Breadcrumbs,
  Burger,
  Button,
  Container,
  createStyles,
  Group,
  Tabs,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Suspense } from "react";
import { NetworkSelect } from "./NetworkSelect";

const UserDropdown = dynamic(() => import("./UserDropdown"), {
  suspense: true,
  ssr: false,
});

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[2]
    }`,
  },

  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  tabs: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  tabsList: {
    borderBottom: "0 !important",
  },

  tab: {
    fontWeight: 500,
    height: 38,
    backgroundColor: "transparent",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },

    "&[data-active]": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      borderColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[2],
    },
  },
}));

export default function Navbar() {
  const { classes, theme, cx } = useStyles();
  const { push, pathname } = useRouter();
  const [opened, { toggle }] = useDisclosure(false);
  const {
    query: { owner, contractName },
  } = useRouter();

  const isNewContractPage = pathname === "/contract/new";

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection}>
        <Group position="apart">
          <Group position="left">
            <Text>Blockman</Text>

            <NetworkSelect />
          </Group>

          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />

          <Suspense fallback={`Loading...`}>
            <UserDropdown />
          </Suspense>
        </Group>
      </Container>
      <Container pb="sm">
        <Group position="apart">
          {!!owner && (
            <Breadcrumbs>
              <Anchor href={`/${owner}`}>{owner}</Anchor>
              {!!contractName && (
                <Anchor href={`/${owner}/${contractName}`}>
                  {contractName}
                </Anchor>
              )}
            </Breadcrumbs>
          )}

          {!isNewContractPage && (
            <Button
              size="xs"
              leftIcon={<IconPlus size={14} />}
              onClick={() => push("/contract/new")}
            >
              New Contract
            </Button>
          )}
        </Group>
      </Container>
    </div>
  );
}
