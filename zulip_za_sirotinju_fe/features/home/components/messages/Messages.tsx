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
import { Socket as PhoenixSocket } from "phoenix";

export const Messages = () => {
  const room = useRoomStore();
  const [data2, setData2] = useState<GetMessagesByRoomIdQuery['getMessagesByRoomId']>([]);
  const { data, isFetching } = useGetMessagesByRoomIdQuery(
    graphqlClient,
    { roomId: room.activeRoom || "" },
    {
      enabled: Boolean(room.activeRoom),
      onSuccess: (d) => {
        setData2(d);
      },
      select: (m) => m.getMessagesByRoomId,
    }
  );

  const absintheSocket = withAbsintheSocket.create(
    // new PhoenixSocket("ws://localhost:4000/api/graphql/socket/?account_id=1",{})
    new PhoenixSocket("ws://localhost:4000/api/graphql/socket")
  );
  const operation = `
  subscription getMessagesByRoomIdSocket($id: String!) {
    getMessagesByRoomIdSocket(id: $id) {
      id
      text
    }
  }
`;

  // This example uses a subscription, but the functionallity is the same for
  // all operation types (queries, mutations and subscriptions)
  const logEvent =
    (eventName) =>
    (...args) =>
      console.log(eventName, ...args);
  useEffect(() => {
    const notifier = withAbsintheSocket.send(absintheSocket, {
      operation,
      // variables: {id: String(room.activeRoom)}
      variables: { id: "10" },
    });
    const updatedNotifier = withAbsintheSocket.observe(
      absintheSocket,
      notifier,
      {
        onAbort: logEvent("abort"),
        onError: logEvent("error"),
        onStart: logEvent("open"),
        onResult: (data) => {
          const kita = data.data.getMessagesByRoomId as GetMessagesByRoomIdQuery['getMessagesByRoomId']

          if(kita){
            setData2((prev) => [...prev, ...kita]);
          }
        },
      }
    );

    // console.log(updatedNotifier, "notifier");
  }, []);
  console.log(data2);

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
