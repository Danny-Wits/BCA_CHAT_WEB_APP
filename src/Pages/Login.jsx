import {
  Anchor,
  Button,
  Checkbox,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import supabase from "../supabase";
import classes from "./AuthenticationImage.module.css";

export function Login() {
  const theme = useMantineTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();
  const authenticate = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      notifications.show({
        message: error.message,
        color: "red",
      });
      return;
    }

    notifications.show({
      message: "Login successful",
      color: "green",
    });
    queryClient.invalidateQueries(["isAuth"]);
  };
  const signup = async () => {
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      notifications.show({
        message: error.message,
        color: "red",
      });
      return;
    }
    queryClient.invalidateQueries(["isAuth"]);
  };
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form}>
        <Title order={2} className={classes.title}>
          Welcome to{" "}
          <span
            style={{
              color: theme.colors.cyan[6],
              fontWeight: "bold",
            }}
          >
            BCA CHAT
          </span>
        </Title>

        <TextInput
          label="Email address"
          placeholder="hello@gmail.com"
          size="md"
          radius="md"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
          radius="md"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Checkbox label="Keep me logged in" mt="xl" size="md" />

        <Group justify="space-around">
          <Button
            w={"40%"}
            mt="xl"
            size="md"
            radius="md"
            onClick={authenticate}
          >
            Login
          </Button>
          <Button
            w={"40%"}
            mt="xl"
            size="md"
            radius="md"
            onClick={signup}
            variant="light"
          >
            SignUp
          </Button>
        </Group>

        <Text ta="center" mt="md">
          Don&apos;t have an account?{" "}
          <Anchor href="#" fw={500} onClick={(event) => event.preventDefault()}>
            Use Sign up Button Above
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
