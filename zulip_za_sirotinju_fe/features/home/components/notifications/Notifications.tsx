"use client";
import { useEffect, useState } from "react";
import { useRoomStore } from "../../store/store";
import * as withAbsintheSocket from "@absinthe/socket";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useSocket } from "@/hooks/useSocket";
import { useToast } from "@/hooks/useToast";

export const Notifications = () => {
  const room = useRoomStore();

  const { data: session } = useSession();
  const [sound, setSound] = useState<HTMLAudioElement | null>(null);
  const { socket } = useSocket();
  const { toastSuccess } = useToast();

  useEffect(() => {
    // setSound(new Audio('sounds/coin-drop.mp3'))
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
      }
    }
  }
`;

  useEffect(() => {
    if (!session?.user.token) return;
    if (!socket) return;

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
          toastSuccess(
            `${kita.account.username} sent ${kita.message.text} in ${kita.room.name}`
          );
          sound?.play();
        }
      },
    });
  }, [session?.user.token, socket]);

  return null;
};
