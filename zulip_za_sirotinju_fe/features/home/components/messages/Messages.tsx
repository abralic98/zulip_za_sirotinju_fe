"use client";
import { Box } from "@/components/primitives/box/box";
import { Stack } from "@/components/primitives/stack";
import { GetMessagesByRoomIdQuery, Message } from "@/src/generated/graphql";
import React, { useEffect, useRef, useState } from "react";
import { useRoomStore } from "../../store/store";
import { SendMessage } from "./SendMessage";
import { SingleMessage } from "./SingleMessage";
import * as withAbsintheSocket from "@absinthe/socket";
import { useSession } from "next-auth/react";
import { ActiveSockets } from "@/types/socket";
import { useSocket } from "@/hooks/useSocket";
import { useMessages } from "./hooks";
import { usePagination } from "@/hooks/usePagination";
import { ObservableElement } from "@/components/ObservableElement";

export const Messages = () => {
  const room = useRoomStore();

  const messagesRef = useRef<HTMLDivElement | null>(null);
  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  const socketMessage = useRef<HTMLDivElement | null>(null);
  const { data: session, status } = useSession();
  const { socket } = useSocket();
  const { generateRowData, query } = useMessages();
  const [data, setData] = useState<Message[]>([]);
  const nest = usePagination(query, messagesRef);
  const [activeSubscriptions, setActiveSubscriptions] = useState<
    ActiveSockets[]
  >([]);

  const operation = `
  subscription getMessagesByRoomIdSocket($id: ID!) {
    getMessagesByRoomIdSocket(id: $id) {
      text
      id
      account{
        username
      }
      insertedAt
      room{
        id
      }
    }
  }
`;
  const checkIsSubscriptionActive = () => {
    const activeRoomId = activeSubscriptions.some(
      (ac) => ac.notifier.request.variables?.id == room.activeRoom
    );

    if (activeRoomId) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    console.log('soba jebena', room.activeRoom);
    
    if (!session?.user.token || !room.activeRoom) return;
    if (!socket) return;

    const check = checkIsSubscriptionActive();
    // messagesRef.current?.scrollIntoView();

    if (!check) return;
    const notifier = withAbsintheSocket.send(socket, {
      operation,
      variables: { id: String(room.activeRoom) },
    });
    const absintheSocket = withAbsintheSocket.observe(socket, notifier, {
      onResult: (data) => {
        //@ts-ignore
        const kita = data.data
          .getMessagesByRoomIdSocket as Message;

        if (kita && room.activeRoom==kita.room?.id) {
          console.log(kita, "socket", room.activeRoom);
          
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
  }, [session?.user.token, room.activeRoom, socket]);

  useEffect(() => {
    setData([]);
    if (!messageContainerRef.current) return;
    const height = messageContainerRef.current.offsetHeight;

    messageContainerRef.current.scroll({ top: height });
  }, [messageContainerRef, query.isFetched]);

  if (!room.activeRoom)
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
