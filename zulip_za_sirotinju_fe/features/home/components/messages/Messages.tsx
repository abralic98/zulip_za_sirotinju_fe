"use client";
import { Box } from "@/components/primitives/box/box";
import { Stack } from "@/components/primitives/stack";
import { LoaderDots } from "@/components/ui/LoaderDots";
import { graphqlClient } from "@/lib/graphqlClient";
import {
  GetMessagesByRoomIdQuery,
  useGetMessagesByRoomIdQuery,
} from "@/src/generated/graphql";
import { gql } from "graphql-request";
import React, { useEffect, useState } from "react";
import { useRoomStore } from "../../store/store";
import { SendMessage } from "./SendMessage";
import { SingleMessage } from "./SingleMessage";
import * as withAbsintheSocket from "@absinthe/socket";
//@ts-ignore
import { Socket as PhoenixSocket } from "phoenix";
import { useSession } from "next-auth/react";
import { ActiveSockets } from "@/types/socket";
import { Center } from "@/components/primitives/center";
import toast from "react-hot-toast";
import { useSocket } from "@/hooks/useSocket";

export const Messages = () => {
  const room = useRoomStore();
  const { data: session, status } = useSession();
  const {socket} =useSocket()
  const [activeSubscriptions, setActiveSubscriptions] = useState<
    ActiveSockets[]
  >([]);
  const [data2, setData2] = useState<
    GetMessagesByRoomIdQuery["getMessagesByRoomId"]
  >([]);
  const { data, isFetching } = useGetMessagesByRoomIdQuery(
    graphqlClient,
    { roomId: room.activeRoom || "" },
    {
      enabled: Boolean(room.activeRoom),
      cacheTime: 0,
      select: (m) => m.getMessagesByRoomId,
      onSuccess: (d) => {
        setData2(d || []);
      },
    }
  );

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
    if(!socket) return
    const check = checkIsSubscriptionActive();

    if (!check) return;
    const notifier = withAbsintheSocket.send(socket, {
      operation,
      variables: { id: String(room.activeRoom) },
    });
    const absintheSocket = withAbsintheSocket.observe(
      socket,
      notifier,
      {
        onResult: (data) => {
          //@ts-ignore
          const kita = data.data
            .getMessagesByRoomIdSocket as GetMessagesByRoomIdQuery["getMessagesByRoomId"][];
          if (kita) {
            setData2((prev: any) => [...prev, kita]);
          }
        },
      }
    );
    setActiveSubscriptions([
      ...activeSubscriptions,
      {
        notifier: notifier,
        absintheSocket: absintheSocket,
        observer: notifier.activeObservers[0],
      },
    ]);
  }, [session?.user.token, room.activeRoom, socket]);

  if (isFetching)
    return (
      <Box display={'flex'} alignItems='center' justifyContent={'center'} width={"1/3"} background="gray-700">
        <Center> 
          <LoaderDots width={'50px'} height=''/>
        </Center>
      </Box>
    );
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
        {data2?.map((m) => {
          return <SingleMessage message={m} key={m?.id} />;
        })}
      </Box>
      <SendMessage />
    </Stack>
  );
};
