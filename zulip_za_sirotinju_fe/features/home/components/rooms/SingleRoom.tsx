"use client";
import { Box } from "@/components/primitives/box/box";
import { Cluster } from "@/components/primitives/cluster";
import { TextBox } from "@/components/ui/TextBox";
import { Room } from "@/src/generated/graphql";
import { Color } from "@/styles/vars/colors";
import React, { FC, useState } from "react";
import { usePrivateRoomStore } from "../../store/privateRoomStore";
import { useRoomsStore, useRoomStore } from "../../store/store";
import { VerifyRoomAccess } from "./VerifyRoomAccess";

interface Props {
  room: Room | null;
}
export const SingleRoom: FC<Props> = ({ room }) => {
  const roomstore = useRoomStore();
  const conversation = usePrivateRoomStore()
  const roomsstore = useRoomsStore();
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState<Color>("gray-600");

  if (!room) return null;
  const current = roomsstore.rooms.find((r) => r.id === room.id);

  const hasMessages =
    current?.unreadMessages && current?.unreadMessages > 0
      ? current.unreadMessages
      : "";

  return (
    <Box>
      <Box
        onClick={() => {
          if (room.isPasswordProtected) {
            setOpen(true);
          }
          if (!room.isPasswordProtected) {
            roomstore.setActiveRoom(room.id || undefined);
            conversation.setActiveConversation(undefined);
            const updated = roomsstore.rooms.map((r) => {
              if (r.id === room.id) {
                return {
                  ...r,
                  unreadMessages: 0,
                };
              } else {
                return r;
              }
            });

            roomsstore.setRooms(updated);
          }
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
        <Cluster>
          {`${room.name}`}
          {hasMessages && (
            <TextBox
              borderRadius="7px"
              width="26px"
              height="26px"
              background="green-400"
              text={String(hasMessages)}
            />
          )}
        </Cluster>
      </Box>
      <VerifyRoomAccess roomId={room.id || ""} open={open} setOpen={setOpen} />
    </Box>
  );
};
