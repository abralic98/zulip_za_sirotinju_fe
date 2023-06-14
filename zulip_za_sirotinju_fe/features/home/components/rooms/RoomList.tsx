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
//@ts-ignore
import { Socket as PhoenixSocket } from "phoenix";
import { useRoomsStore } from "../../store/store";

export const RoomList = () => {
  const { data: session, status } = useSession();
  const [data, setData] = useState<GetRoomsQuery["getRooms"]>([]);
  const roomsStore = useRoomsStore();

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

  const absintheSocketInit = withAbsintheSocket.create(
    // new PhoenixSocket("ws://localhost:4000/api/graphql/socket", {

    new PhoenixSocket(String(process.env.WS_LINK), {
      params: {
        Authorization: `Bearer ${session?.user.token}`,
      },
    })
  );
  const operation = `
  subscription getRoomsSubscription{
    getRoomsSubscription{
      name
      id
    }
  }
`;

  useEffect(() => {
    if (!session?.user.token) return;
    const notifier = withAbsintheSocket.send(absintheSocketInit, {
      operation,
      variables: {},
    });
    const absintheSocket = withAbsintheSocket.observe(
      absintheSocketInit,
      notifier,
      {
        onResult: (response) => {
          //@ts-ignore
          const modifiedData = response.data.getRoomsSubscription;
          const rooms = modifiedData.map((r:Room) => {
            return {
              name: String(r?.name),
              id: String(r?.id),
              unreadMessages: 0,
            };
          });
          setData(modifiedData)
          roomsStore.setRooms(modifiedData);
        },
      }
    );
  }, [session?.user.token]);

  useEffect(() => {
    console.log(roomsStore.rooms);
  }, [roomsStore]);

  if (isFetching) return <LoaderDots />;
  return (
    <Box>
      <Stack gap={"xxs"}>
        {data?.map((r) => {
          return <SingleRoom key={r?.id} room={r} />;
        })}
      </Stack>
    </Box>
  );
};
