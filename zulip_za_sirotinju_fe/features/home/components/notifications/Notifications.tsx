"use client";
import { useEffect, useState } from "react";
import { useRoomsStore, useRoomStore } from "../../store/store";
import * as withAbsintheSocket from "@absinthe/socket";
import { useSession } from "next-auth/react";
import { useSocket } from "@/hooks/useSocket";
import { useToast } from "@/hooks/useToast";
import { Notification } from "@/src/generated/graphql";

export const Notifications = () => {
  const room = useRoomStore();
  const rooms = useRoomsStore();

  const { data: session } = useSession();
  const [sound, setSound] = useState<HTMLAudioElement | null>(null);
  const { socket } = useSocket();
  const { toastSuccess } = useToast();
  const [message, setMessage] = useState<Notification>();

  useEffect(() => {
    setSound(new Audio("sounds/voice.mp3"));
  }, []);

  const operation = `
  subscription notifications {
    notifications {
        message{
            text
        }
      account{
        username
        id
      }
      room{
        name
        id
      }
    }
  }
`;

  useEffect(() => {
    if (!session?.user.token) return;
    if (!socket) return;
    if (!Boolean(rooms.rooms.length === 0)) return;

    const notifier = withAbsintheSocket.send(socket, {
      operation,
      variables: { id: String(room.activeRoom) },
    });
    const absintheSocket = withAbsintheSocket.observe(socket, notifier, {
      onResult: (data) => {
        // @ts-ignore
        const kita = data.data.notifications;
        if (kita?.account.id == session.user.id) return;
        if (kita) {
          setMessage(kita);
          toastSuccess(
            `${kita.account.username} sent ${kita.message.text} in ${kita.room.name}`
          );
          sound?.play();
        }
      },
    });
  }, [session?.user.token, socket]);

  useEffect(() => {
    if (room.activeRoom === message?.room?.id) {
      return;
    }
    const updated = rooms.rooms.map((r) => {
      if (r.id === message?.room?.id) {
        return {
          ...r,
          unreadMessages: r.unreadMessages + 1,
        };
      } else {
        return r;
      }
    });

    rooms.setRooms(updated);
  }, [message]);
  return null;
};
