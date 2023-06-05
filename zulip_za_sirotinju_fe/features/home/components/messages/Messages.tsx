"use client";
import { Box } from "@/components/primitives/box/box";
import { Stack } from "@/components/primitives/stack";
import { LoaderDots } from "@/components/ui/LoaderDots";
import { graphqlClient } from "@/lib/graphqlClient";
import { useGetMessagesByRoomIdQuery } from "@/src/generated/graphql";
import { gql } from "graphql-request";
import React, { useEffect } from "react";
import { useRoomStore } from "../../store/store";
import { SendMessage } from "./SendMessage";
import { SingleMessage } from "./SingleMessage";

export const Messages = () => {
  const room = useRoomStore();
  const { data, isFetching } = useGetMessagesByRoomIdQuery(
    graphqlClient,
    { roomId: room.activeRoom || "" },
    { enabled: Boolean(room.activeRoom), select: (m) => m.getMessagesByRoomId }
  );

  const message_sub = gql`
    subscription getMessagesByRoomIdSocket($roomId: ID!) {
      getMessagesByRoomIdSocket(roomId: $roomId) {
        id
      }
    }
  `;

  
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
        {data?.map((m) => {
          return <SingleMessage message={m} key={m?.id} />;
        })}
      </Box>
      <SendMessage />
    </Stack>
  );
};
