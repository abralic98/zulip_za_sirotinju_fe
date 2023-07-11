"use client";
import { Box } from "@/components/primitives/box/box";
import { Cluster } from "@/components/primitives/cluster";
import { TextBox } from "@/components/ui/TextBox";
import { Conversation } from "@/src/generated/graphql";
import { Color } from "@/styles/vars/colors";
import { useSession } from "next-auth/react";
import React, { FC, useState } from "react";
import { usePrivateRoomsStore, usePrivateRoomStore } from "../../store/privateRoomStore";
import { getOtherUser } from "./helpers/getOtherUser";

interface Props {
  conversation: Conversation | null;
}

export const PrivateRoom: FC<Props> = ({ conversation }) => {
  const { data: session, status } = useSession();
  const privateRoomStore= usePrivateRoomStore();
  const privateRoomsStore = usePrivateRoomsStore();
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState<Color>("gray-600");

  if (!conversation) return null;
//   const current = privateRoomsStore.conversations.find((r) => r.id === conversation.id);
  

console.log(privateRoomStore.activeConversation, "AKTIVNA KONVERZACIJA");

  const username = getOtherUser(conversation, String(session?.user.id));
  return (
    <Box>
      <Box
        onClick={() => {
          privateRoomStore.setActiveConversation(conversation.id || undefined);
          const updated = privateRoomsStore.conversations.map((r) => {
            if (r.id === conversation.id) {
              return {
                ...r,
                unreadMessages: 0,
              };
            } else {
              return r;
            }
          });

          privateRoomsStore.setConversations(updated);
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
          {username?.name}
          {/* {hasMessages && (
            <TextBox
              borderRadius="7px"
              width="26px"
              height="26px"
              background="green-400"
              text={String(hasMessages)}
            />
          )} */}
        </Cluster>
      </Box>
    </Box>
  );
};
