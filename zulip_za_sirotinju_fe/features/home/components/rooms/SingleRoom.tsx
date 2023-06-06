"use client";
import { Box } from "@/components/primitives/box/box";
import { Room } from "@/src/generated/graphql";
import { Color } from "@/styles/vars/colors";
import React, { FC, useState } from "react";
import { useRoomStore } from "../../store/store";

interface Props {
  room: Room | null;
}
export const SingleRoom: FC<Props> = ({ room }) => {
  const roomstore = useRoomStore();
  const [color, setColor] = useState<Color>("gray-500");
  if (!room) return null;
  return (
    <Box
      onClick={() => {
        roomstore.setActiveRoom(room.id || undefined);
      }}
      style={{ cursor: "pointer" }}
      onMouseEnter={() => setColor("gray-500")}
      background={color}
      onMouseLeave={() => setColor("gray-600")}
      height="12"
      display={"flex"}
      alignItems="center"
      p={"xl"}
    >
      {room.name}
    </Box>
  );
};
