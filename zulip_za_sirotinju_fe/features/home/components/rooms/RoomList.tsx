"use client";
import { Box } from "@/components/primitives/box/box";
import { Stack } from "@/components/primitives/stack";
import { LoaderDots } from "@/components/ui/LoaderDots";
import { graphqlClient } from "@/lib/graphqlClient";
import { useGetRoomsQuery } from "@/src/generated/graphql";
import { Loader2Icon } from "lucide-react";
import React from "react";
import { SingleRoom } from "./SingleRoom";

export const RoomList = () => {
  const { data, isFetching } = useGetRoomsQuery(
    graphqlClient,
    {},
    { select: (r) => r.getRooms }
  );
  if (isFetching) return <LoaderDots />;
  return (
    <Box>
      <Stack gap={'xxs'}>
        {data?.map((r) => {
          return <SingleRoom key={r?.id} room={r} />;
        })}
      </Stack>
    </Box>
  );
};
