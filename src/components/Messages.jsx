import { Center, Loader, Stack } from "@mantine/core";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import supabase from "../supabase";
import Message from "./Message";

function Messages() {
  const { data: messages } = useQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
    retry: 2,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
  const queryClient = useQueryClient();
  useEffect(() => {
    const channels = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "text_message" },
        (payload) => {
          queryClient.invalidateQueries(["messages"]);
        }
      )
      .subscribe();
    return () => {
      channels.unsubscribe();
    };
  }, []);
  if (!messages) {
    return (
      <Center>
        <Loader></Loader>
      </Center>
    );
  }
  return (
    <Stack>
      {Array.from(messages).map((message) => {
        return (
          <Message
            user={message?.username}
            text={message?.content}
            time={message?.created_at}
            key={message?.id}
          ></Message>
        );
      })}
    </Stack>
  );
}
const getMessages = async () => {
  let { data: text_message, error } = await supabase
    .from("text_message")
    .select("*");

  if (error) return false;
  return text_message;
};

export default Messages;
