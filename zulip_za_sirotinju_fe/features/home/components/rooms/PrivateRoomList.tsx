"use client";
import { Box } from "@/components/primitives/box/box";
import { Stack } from "@/components/primitives/stack";
import { LoaderDots } from "@/components/ui/LoaderDots";
import { graphqlClient } from "@/lib/graphqlClient";
import {
  Conversation,
  GetUserConversationsQuery,
  Room,
  useGetUserConversationsQuery,
} from "@/src/generated/graphql";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import * as withAbsintheSocket from "@absinthe/socket";
import { useSocket } from "@/hooks/useSocket";
import { PrivateRoom } from "./PrivateRoom";
import { getOtherUser } from "./helpers/getOtherUser";
import { usePrivateRoomsStore } from "../../store/privateRoomStore";

export const PrivateRoomList = () => {
  const { data: session, status } = useSession();
  const [data, setData] = useState<
    GetUserConversationsQuery["getUserConversations"]
  >([]);
  const privateRoomsStore = usePrivateRoomsStore();
  const { socket } = useSocket();

  const { isFetching } = useGetUserConversationsQuery(
    graphqlClient,
    {},
    {
      select: (a) => a.getUserConversations,
      onSuccess: (d) => {
        if (!d) return;
        setData(d || []);
        const test = d.map((c) => {
          return {
            name: getOtherUser(c, String(session?.user.id))?.name || '',
            id: getOtherUser(c, String(session?.user.id))?.id || '',
            unreadMessages: 0,
          };
        });
        privateRoomsStore.setConversations(test);
      },
    }
  );

  const operation = `
  subscription getConversationsSubscription{
    getConversationsSubscription{
        id
        userOne{
            id
            username
        }
        userTwo{
            id
            username
        }
    }
  }
`;

  useEffect(() => {
    if (!session?.user.token) return;
    if (!socket) return;
    const notifier = withAbsintheSocket.send(socket, {
      operation,
      variables: {},
    });
    const absintheSocket = withAbsintheSocket.observe(socket, notifier, {
      onResult: (response) => {
        //@ts-ignore
        const modifiedData = response.data.getConversationsSubscription;
        console.log(response, "Respons");
        
        const rooms = modifiedData.map((c: Conversation) => {
          return {
            name: getOtherUser(c, session.user.id)?.name,
            id: getOtherUser(c, session.user.id)?.id,
            unreadMessages: 0,
          };
        });
        setData(modifiedData);
        privateRoomsStore.setConversations(modifiedData);
      },
    });
  }, [session?.user.token, socket]);

  if (isFetching) return <LoaderDots />;
  return (
    <Box style={{ height: "500px", overflow: "auto" }}>
      <Stack gap={"xxs"}>
        {data?.map((c) => {
          return <PrivateRoom key={c?.id} conversation={c} />;
        })}
      </Stack>
    </Box>
  );
};
