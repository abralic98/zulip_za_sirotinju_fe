
"use client";
import { Box } from "@/components/primitives/box/box";
import { Stack } from "@/components/primitives/stack";
import { ConversationReply, GetMessagesByRoomIdQuery, Message } from "@/src/generated/graphql";
import React, { FC, useEffect, useRef, useState } from "react";
import {  useRoomStore } from "../../store/store";
import { SendMessage } from "./SendMessage";
import { SingleMessage } from "./SingleMessage";
import * as withAbsintheSocket from "@absinthe/socket";
import { useSession } from "next-auth/react";
import { ActiveSockets } from "@/types/socket";
import { useSocket } from "@/hooks/useSocket";
import { useMessages, usePrivateMessages } from "./hooks";
import { usePagination } from "@/hooks/usePagination";
import { ObservableElement } from "@/components/ObservableElement";
import { usePrivateRoomStore } from "../../store/privateRoomStore";

export const PrivateMessages= () => {
  const conversation= usePrivateRoomStore();

  const messagesRef = useRef<HTMLDivElement | null>(null);
  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  const { data: session, status } = useSession();
  const { socket } = useSocket();
  const { generateRowData, query } = usePrivateMessages();
  const [data, setData] = useState<ConversationReply[]>([]);
  const nest = usePagination(query, messagesRef);
  const [activeSubscriptions, setActiveSubscriptions] = useState<
    ActiveSockets[]
  >([]);

  const operation = `
  subscription getConversationRepliesByConversationId($id: ID!) {
    getConversationRepliesByConversationId(id: $id) {
      text
      id
      account{
        username
      }
      insertedAt
      conversation{
        id
      }
    }
  }
`;


        console.log(conversation, "DATAAAAAAAA");
  useEffect(() => {
    if (!session?.user.token || !conversation.activeConversation) return;
    if (!socket) return;
    const notifier = withAbsintheSocket.send(socket, {
      operation,
      variables: { id: String(conversation.activeConversation) },
    });
    const absintheSocket = withAbsintheSocket.observe(socket, notifier, {
      onResult: (data) => {
        //@ts-ignore
        const kita = data.data.getConversationRepliesByConversationId as ConversationReply;

        console.log(kita);
        
        if (kita && String(conversation.activeConversation) === String(kita.conversation?.id)) {
          
          setData((prev: any) => [...prev, kita]);

          if (messageContainerRef.current) {
            const height = messageContainerRef.current.offsetHeight;
            messageContainerRef.current.scroll({ top: height });
          }
        }
      },
    });
    setActiveSubscriptions([
      ...activeSubscriptions,
      {
        notifier: notifier,
        absintheSocket: absintheSocket,
        observer: notifier.activeObservers[0],
      },
    ]);
    return () => {
      withAbsintheSocket.cancel(socket, notifier);
    };
  }, [session?.user.token, conversation.activeConversation, socket]);

  useEffect(() => {
    setData([]);
    if (!messageContainerRef.current) return;
    const height = messageContainerRef.current.offsetHeight;

    messageContainerRef.current.scroll({ top: height });
  }, [messageContainerRef, query.isFetched]);


  if (!conversation.activeConversation)
    return (
      <Box width={"1/3"} background="gray-700" color="white">
        Join Room
      </Box>
    );
  return (
    <Stack
      display={"flex"}
      flexDirection="col"
      justifyContent={"end"}
      background={"gray-700"}
      height={"screen"}
      width="1/3"
    >
      <Box
        ref={messageContainerRef}
        p={"xs"}
        // style={{ overflowY: "scroll" }}
        // background="blue-500"
        color="white"
      >
        <Box
          style={{ height: "90vh", overflow: "auto", gap: "20px" }}
          className="flex flex-col-reverse"
        >
          <Box className="flex flex-col">
            {data.map((d) => {
              return <SingleMessage message={d} key={d.text} />;
            })}
          </Box>
          {generateRowData()?.map((r) => {
            return <SingleMessage message={r} key={r.text} />;
          })}
          <ObservableElement ref={messagesRef} />
        </Box>
      </Box>
      <SendMessage />
    </Stack>
  );
};
