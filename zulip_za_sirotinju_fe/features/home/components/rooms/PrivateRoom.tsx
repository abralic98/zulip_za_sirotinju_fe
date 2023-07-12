"use client";
import { Box } from "@/components/primitives/box/box";
import { Cluster } from "@/components/primitives/cluster";
import { TextBox } from "@/components/ui/TextBox";
import { graphqlClient } from "@/lib/graphqlClient";
import { Conversation, useGetUserAvatarIdQuery } from "@/src/generated/graphql";
import { Color } from "@/styles/vars/colors";
import { UserIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { FC, useState } from "react";
import {
  usePrivateRoomsStore,
  usePrivateRoomStore,
} from "../../store/privateRoomStore";
import { useRoomStore } from "../../store/store";
import { getOtherUser } from "./helpers/getOtherUser";
import { getUserAvatarFromConversation } from "./helpers/getUserAvatarFromConversation";

interface Props {
  conversation: Conversation | null;
}

export const PrivateRoom: FC<Props> = ({ conversation }) => {
  const { data: session, status } = useSession();
  const privateRoomStore = usePrivateRoomStore();
  const privateRoomsStore = usePrivateRoomsStore();
  const room = useRoomStore();
  const [color, setColor] = useState<Color>("gray-600");

  const username = getOtherUser(conversation, String(session?.user.id));
  const otherUserId = getUserAvatarFromConversation(conversation, String(session?.user.id))
  const { data: getAvatar, isFetching } = useGetUserAvatarIdQuery(
    graphqlClient,
    { userId: String(otherUserId) },
    { enabled: Boolean(otherUserId), select: (a) => a.getUserAvatarId }
  );

  if (!conversation) return null;

  const current = privateRoomsStore.conversations.find(
    (r) => r.id === conversation.id
  );

  const hasMessages =
    current?.unreadMessages && current?.unreadMessages > 0
      ? current.unreadMessages
      : "";

  return (
    <Box>
      <Box
        onClick={() => {
          privateRoomStore.setActiveConversation(conversation.id || undefined);
          room.setActiveRoom(undefined);
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
          {getAvatar?.filePath ? (
            <Image
            style={{borderRadius:'50'}}
              src={getAvatar?.filePath}
              width={30}
              height={30}
              alt="user avatar"
            />
          ) : (
            <UserIcon width={30} height={30} />
          )}
          {username?.name}
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
    </Box>
  );
};
