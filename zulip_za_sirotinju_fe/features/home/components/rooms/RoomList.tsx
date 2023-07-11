"use client";
import { Box } from "@/components/primitives/box/box";
import { Stack } from "@/components/primitives/stack";
import { LoaderDots } from "@/components/ui/LoaderDots";
import { graphqlClient } from "@/lib/graphqlClient";
import { GetRoomsQuery, Room, useGetRoomsQuery } from "@/src/generated/graphql";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { SingleRoom } from "./SingleRoom";
import * as withAbsintheSocket from "@absinthe/socket";
import { useRoomsStore } from "../../store/store";
import { useSocket } from "@/hooks/useSocket";

export const RoomList = () => {
  const { data: session, status } = useSession();
  const [data, setData] = useState<GetRoomsQuery["getRooms"]>([]);
  const roomsStore = useRoomsStore();
  const {socket} = useSocket()

  const { isFetching } = useGetRoomsQuery(
    graphqlClient,
    {},
    {
      select: (a) => a.getRooms,
      onSuccess: (d) => {
        if (!d) return;
        setData(d || []);
        const test = d.map((r) => {
          return {
            name: String(r?.name),
            id: String(r?.id),
            unreadMessages: 0,
          };
        });
        roomsStore.setRooms(test);
      },
    }
    );

  const operation = `
  subscription getRoomsSubscription{
    getRoomsSubscription{
      name
      id
      isPasswordProtected
    }
  }
`;

  useEffect(() => {
    if (!session?.user.token) return;
    if(!socket) return
    const notifier = withAbsintheSocket.send(socket, {
      operation,
      variables: {},
    });
    const absintheSocket = withAbsintheSocket.observe(
      socket,
      notifier,
      {
        onResult: (response) => {
          //@ts-ignore
          const modifiedData = response.data.getRoomsSubscription;
          const rooms = modifiedData.map((r: Room) => {
            return {
              name: String(r?.name),
              id: String(r?.id),
              unreadMessages: 0,
            };
          });
          setData(modifiedData);
          roomsStore.setRooms(modifiedData);
        },
      }
    );
  }, [session?.user.token, socket]);

  if (isFetching) return <LoaderDots />;
  return (
    <Box style={{height:'500px', overflow: 'auto'}}>
      <Stack gap={"xxs"}>
        {data?.map((r) => {
          return <SingleRoom key={r?.id} room={r} />;
          // return null
        })}
      </Stack>
    </Box>
  );
};
