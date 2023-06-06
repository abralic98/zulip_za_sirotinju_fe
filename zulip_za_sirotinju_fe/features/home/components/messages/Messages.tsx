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

interface ActiveSockets {
  notifier: withAbsintheSocket.Notifier<
    {
      id: string;
    },
    {}
  >;
  absintheSocket: withAbsintheSocket.AbsintheSocket<{}>;
  observer: withAbsintheSocket.Observer<{ id: string; }>,
}
export const Messages = () => {
  const room = useRoomStore();
  const { data: session, status } = useSession();
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
      cacheTime:0,
      select: (m) => m.getMessagesByRoomId,
      onSuccess: (d) => {
        setData2(d || []);
      },
    }
  );

  const absintheSocketInit = withAbsintheSocket.create(
    new PhoenixSocket("ws://localhost:4000/api/graphql/socket", {
      params: {
        Authorization: `Bearer ${session?.user.token}`,
      },
    })
  );
  const operation = `
  subscription getMessagesByRoomIdSocket($id: String!) {
    getMessagesByRoomIdSocket(id: $id) {
      id
      text
    }
  }
`;
  const checkIsSubscriptionActive = () => {
    const activeRoomId = activeSubscriptions.some(
      (ac) => ac.notifier.request.variables?.id == room.activeRoom
    );
    
    if(activeRoomId){
      return false
    }
    else{
      return true
    }
  };

  useEffect(() => {
    if (!session?.user.token || !room.activeRoom) return;
    console.log(room.activeRoom, "active room");

    const check = checkIsSubscriptionActive();
    if(!check) return
    const notifier = withAbsintheSocket.send(absintheSocketInit, {
      operation,
      variables: { id: String(room.activeRoom) },
    });
    const absintheSocket = withAbsintheSocket.observe(absintheSocketInit, notifier, {
      onResult: (data) => {
        //@ts-ignore
        const kita = data.data
          .getMessagesByRoomIdSocket as GetMessagesByRoomIdQuery["getMessagesByRoomId"][];
        if (kita) {
          setData2((prev: any) => [...prev, ...kita]);
        }
      },
    });
    setActiveSubscriptions([
      ...activeSubscriptions,
      {
        notifier: notifier,
        absintheSocket: absintheSocket,
        observer: notifier.activeObservers[0]
      },
    ]);
    console.log(absintheSocket);
  }, [session?.user.token, room.activeRoom]);

  if (isFetching) return <LoaderDots />;
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
