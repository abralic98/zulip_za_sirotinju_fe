"use client";
import { useEffect, useState } from "react";
import { useRoomsStore, useRoomStore } from "../../store/store";
import * as withAbsintheSocket from "@absinthe/socket";
import { useSession } from "next-auth/react";
import { useSocket } from "@/hooks/useSocket";
import { useToast } from "@/hooks/useToast";
import { Conversation, Message, Notification } from "@/src/generated/graphql";
import {
  usePrivateRoomsStore,
  usePrivateRoomStore,
} from "../../store/privateRoomStore";

export const PrivateNotifications = () => {
  const conversation = usePrivateRoomStore();
  const conversations = usePrivateRoomsStore();

  const { data: session } = useSession();
  const [sound, setSound] = useState<HTMLAudioElement | null>(null);
  const { socket } = useSocket();
  const { toastSuccess } = useToast();
  const [message, setMessage] = useState<{conversation:Conversation}>();

  useEffect(() => {
    // setSound(new Audio('sounds/coin-drop.mp3'))
    setSound(new Audio("sounds/ajmo.mp3"));
  }, []);

  const operation = `
subscription{
  privateNotifications(id:1) {
    id
    account{
      username
      id
    }
    insertedAt
    conversation{
      id
    }
    conversationReply{
      text
    }
  }
}
`;

  useEffect(() => {
    if (!session?.user.token) return;
    if (!socket) return;
    if (!Boolean(conversations.conversations.length === 0)) return;

    const notifier = withAbsintheSocket.send(socket, {
      operation,
      variables: { id: String(conversation.activeConversation) },
    });
    const absintheSocket = withAbsintheSocket.observe(socket, notifier, {
      onResult: (data) => {
        // @ts-ignore
        const kita = data.data.privateNotifications;
        if (kita?.account.id == session.user.id) return;
        if (kita) {
          setMessage(kita);
          toastSuccess(
            `${kita.account.username} sent you PM`
          );
          sound?.play();
        }
      },
    });
  }, [session?.user.token, socket]);

  useEffect(() => {
    if (conversation.activeConversation=== message?.conversation?.id) {
      return;
    }
    const updated = conversations.conversations.map((r) => {
      if (r.id === message?.conversation?.id) {
        return {
          ...r,
          unreadMessages: r.unreadMessages + 1,
        };
      } else {
        return r;
      }
    });

    conversations.setConversations(updated);
  }, [message]);
  return null;
};
