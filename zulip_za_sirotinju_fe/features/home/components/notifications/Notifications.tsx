"use client";
import { useEffect, useState } from "react";
import { useRoomStore } from "../../store/store";
import * as withAbsintheSocket from "@absinthe/socket";
//@ts-ignore
import { Socket as PhoenixSocket } from "phoenix";
import { useSession } from "next-auth/react";
import { ActiveSockets } from "@/types/socket";
import { Center } from "@/components/primitives/center";
import toast from "react-hot-toast";

export const Notifications = () => {
  const room = useRoomStore();
  const { data: session, status } = useSession();
  const [sound, setSound] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    // setSound(new Audio('sounds/coin-drop.mp3'))
    setSound(new Audio('sounds/voice.mp3'))
  }, [])

  const absintheSocketInit = withAbsintheSocket.create(
    new PhoenixSocket("ws://localhost:4000/api/graphql/socket", {
      params: {
        Authorization: `Bearer ${session?.user.token}`,
      },
    })
  );
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

    const notifier = withAbsintheSocket.send(absintheSocketInit, {
      operation,
      variables: { id: String(room.activeRoom) },
    });
    const absintheSocket = withAbsintheSocket.observe(
      absintheSocketInit,
      notifier,
      {
        onResult: (data) => {
          //@ts-ignore
          const kita = data.data.notifications;
          if(kita?.account.id==session.user.id) return
          if (kita) {
            toast.success(
              `${kita.account.username} sent ${kita.message.text} in ${kita.room.name}`
            );
            sound?.play()
          }
        },
      }
    );
  }, [session?.user.token]);

  return null;
};
