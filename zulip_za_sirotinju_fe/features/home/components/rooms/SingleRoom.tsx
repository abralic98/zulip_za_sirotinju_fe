"use client";
import { Box } from "@/components/primitives/box/box";
import { Room } from "@/src/generated/graphql";
import { Color } from "@/styles/vars/colors";
import React, { FC, useState } from "react";
import { useRoomsStore, useRoomStore } from "../../store/store";

interface Props {
  room: Room | null;
}
export const SingleRoom: FC<Props> = ({ room }) => {
  const roomstore = useRoomStore();
  const roomsstore = useRoomsStore();
  const [color, setColor] = useState<Color>("gray-600");
  
  if (!room) return null;
  const current = roomsstore.rooms.find((r) => r.id === room.id);
  const hasMessages = current?.unreadMessages && current?.unreadMessages>0 ? current.unreadMessages : '' 
  
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
      {`${room.name} ${hasMessages} `}
    </Box>
  );
};
