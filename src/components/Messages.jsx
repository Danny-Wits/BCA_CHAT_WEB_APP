import { Center, Loader, ScrollArea, Stack } from "@mantine/core";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
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
  const viewport = useRef(null);
  const scrollToBottom = () => {
    viewport.current?.scrollTo({
      top: viewport.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const queryClient = useQueryClient();
  useEffect(() => {
    const channels = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "text_message" },
        (payload) => {
          queryClient.invalidateQueries(["messages"]);
          scrollToBottom();
        }
      )
      .subscribe();
    return () => {
      channels.unsubscribe();
    };
  }, []);
  useEffect(() => {
    if (!messages) return;
    scrollToBottom();
  }, [messages]);
  if (!messages) {
    return (
      <Center>
        <Loader></Loader>
      </Center>
    );
  }
  return (
    <ScrollArea h={"60vh"} viewportRef={viewport} py={"sm"}>
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
    </ScrollArea>
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
