import {
  AppShell,
  Avatar,
  Burger,
  Button,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CiLogout } from "react-icons/ci";
import { logout } from "../App";
import logo from "../assets/logo.png";
import MessageArea from "../components/MessageArea";
export function Home({ user }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" w={"100%"}>
          <Avatar src={logo}></Avatar>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Title order={3} c={"cyan"}>
            BCA CHAT
          </Title>
          <Group ml="xl" gap={2} visibleFrom="sm" ms={"auto"} p={1}>
            <Avatar name={user.email} color="initials" radius="xl" />
            <Stack align="flex-start" px={2} gap={2}>
              <Button
                size="xs"
                onClick={logout}
                leftSection={<CiLogout />}
                variant="light"
              >
                Logout
              </Button>
            </Stack>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar py="md" px="md">
        <Stack>
          <Avatar name={user?.email} color="initials" radius="xl" />
          <Text size="xs">{user?.email}</Text>
          <Button
            size="xs"
            leftSection={<CiLogout />}
            variant="light"
            fullWidth
            onClick={logout}
          >
            Logout
          </Button>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <MessageArea></MessageArea>
      </AppShell.Main>
    </AppShell>
  );
}
