"use client";
import { Box } from "@/components/primitives/box/box";
import { Stack } from "@/components/primitives/stack";
import { Heading } from "@/components/ui/Heading";
import React, { useState } from "react";
import { CreateNewRoom } from "./CreateNewRoom";
import { RoomList } from "./RoomList";

export const Rooms = () => {
  const [showNot, setShowNot] = useState(false);

  return (
    <Box
      p={"md"}
      display={"flex"}
      flexDirection="col"
      justifyContent={"between"}
      background={"gray-800"}
      color={"white"}
      height="screen"
    >
      <Stack>
        <Heading type="h1" color="blue-400">
          Rooms
        </Heading>
        <RoomList />
      </Stack>
      <CreateNewRoom />
    </Box>
  );
};
