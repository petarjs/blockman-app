import {
  Button,
  createStyles,
  Group,
  Loader,
  Menu,
  Skeleton,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { IconChevronDown, IconLogout } from "@tabler/icons";
import { useState } from "react";
import useNearContext from "../../context/NearContext";
import useAuth from "../../hooks/useAuth";
import BalanceBadge from "./BalanceBadge";

const useStyles = createStyles((theme) => ({
  user: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },

    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },
  userActive: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },
}));

export default function UserDropdown() {
  const { nearLoading } = useNearContext();
  const { accountId, signIn, signOut } = useAuth();
  const { classes, cx } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  if (nearLoading) {
    return (
      <Group pt="xs" px="sm">
        <Skeleton width={150} height={30} radius="md" />
      </Group>
    );
  }

  if (!accountId) {
    return (
      <Group py={5} px="sm">
        <Button size="xs" onClick={signIn}>
          Connect NEAR account
        </Button>
      </Group>
    );
  }

  return (
    <Menu
      width={260}
      position="bottom-end"
      transition="pop-top-right"
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
    >
      <Menu.Target>
        <UnstyledButton
          className={cx(classes.user, {
            [classes.userActive]: userMenuOpened,
          })}
        >
          <Group spacing={7}>
            <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
              {accountId}
            </Text>
            <BalanceBadge />
            <IconChevronDown size={12} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          icon={<IconLogout size={14} stroke={1.5} />}
          onClick={signOut}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
