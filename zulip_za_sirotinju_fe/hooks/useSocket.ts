"use client";
import * as withAbsintheSocket from "@absinthe/socket";
import { useSession } from "next-auth/react";
import { Socket as PhoenixSocket } from "phoenix";
import { useEffect, useState } from "react";
export const useSocket = () => {
  const { data: session, status } = useSession();
  const [socket, setSocket] = useState<withAbsintheSocket.AbsintheSocket>();
  useEffect(() => {
    if (typeof window !== undefined && session?.user.token) {
      const absintheSocketInit = withAbsintheSocket.create(
        new PhoenixSocket(
          // process.env.WS_LINK || "ws://116.203.201.51:4000/api/graphql/socket",
          process.env.WS_LINK || "ws://116.203.201.51:4000/api/graphql/socket",
          {
            params: {
              Authorization: `Bearer ${session?.user.token}`,
            },
          }
        )
      );
      setSocket(absintheSocketInit);
    }
  }, [session?.user.token]);

  return { socket };
};
