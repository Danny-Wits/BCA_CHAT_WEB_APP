import { ActionIcon, Stack, TextInput } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { isAuth } from "../App";
import supabase from "../supabase";
import Messages from "./Messages";

function MessageArea() {
  const [messages, setMessages] = useState("");
  const { data: user } = useQuery({ queryKey: ["isAuth"], queryFn: isAuth });
  const queryClient = useQueryClient();

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: sendMessageH,
    onSuccess: () => {
      setMessages("");
    },
  });
  async function sendMessageH() {
    if (!user) return false;
    if (!messages.trim()) return false;
    const { data, error } = await supabase.from("text_message").insert([
      {
        username: user.email,
        content: messages,
        user_id: user.id,
      },
    ]);

    if (error) return false;
  }

  return (
    <Stack justify="space-between" h={"80vh"}>
      <Messages />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <TextInput
          value={messages}
          component={"textarea"}
          onChange={(e) => setMessages(e.target.value)}
          placeholder="Type a Message"
          rightSection={
            <ActionIcon onClick={sendMessage} loading={isPending}>
              <IoSend />
            </ActionIcon>
          }
        ></TextInput>
      </form>
    </Stack>
  );
}

export default MessageArea;
