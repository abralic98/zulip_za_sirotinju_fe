"use client";
import { Box } from "@/components/primitives/box/box";
import { Stack } from "@/components/primitives/stack";
import { LoaderDots } from "@/components/ui/LoaderDots";
import { graphqlClient } from "@/lib/graphqlClient";
import { GetMessagesByRoomIdQuery, Message } from "@/src/generated/graphql";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRoomStore } from "../../store/store";
import { SendMessage } from "./SendMessage";
import { SingleMessage } from "./SingleMessage";
import * as withAbsintheSocket from "@absinthe/socket";
import { useSession } from "next-auth/react";
import { ActiveSockets } from "@/types/socket";
import { Center } from "@/components/primitives/center";
import { useSocket } from "@/hooks/useSocket";
import { useMessages } from "./hooks";
import { usePagination } from "@/hooks/usePagination";
import { ObservableElement } from "@/components/ObservableElement";
import { queryClient } from "@/lib/queryClientProvider";
import { InfiniteData } from "@tanstack/react-query";

export const Messages = () => {
  const room = useRoomStore();
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const { data: session, status } = useSession();
  const { socket } = useSocket();
  const [data, setData] = useState<Message[]>([]);
  const { generateRowData, query } = useMessages();
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
          .getMessagesByRoomIdSocket as GetMessagesByRoomIdQuery["getMessagesByRoomId"][];
        if (kita) {
          setData((prev: any) => [...prev, kita]);
          messagesRef.current?.scrollIntoView();
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
  }, [room.activeRoom]);

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
      justifyContent={"between"}
      background={"gray-700"}
      height={"screen"}
      width="1/3"
    >
      <Box
        p={"xs"}
        style={{ overflowY: "scroll" }}
        background="gray-700"
        color="white"
      >
        {generateRowData()?.map((r) => {
          return <SingleMessage message={r} key={r.text} />;
        })}
        {data.map((d) => {
          return <SingleMessage message={d} key={d.text} />;
        })}
        <ObservableElement ref={messagesRef} />
      </Box>
      <SendMessage />
    </Stack>
  );
};
