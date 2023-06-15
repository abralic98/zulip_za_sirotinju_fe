"use client";
import { Box } from "@/components/primitives/box/box";
import { graphqlClient } from "@/lib/graphqlClient";
import { GetAccountsQuery, useGetAccountsQuery } from "@/src/generated/graphql";
import React, { useEffect, useState } from "react";
import * as withAbsintheSocket from "@absinthe/socket";
//@ts-ignore
import { signOut, useSession } from "next-auth/react";
import { SingleUser } from "./SingleUser";
import { Heading } from "@/components/ui/Heading";
import { Stack } from "@/components/primitives/stack";
import { LogOutIcon } from "lucide-react";
import { Split } from "@/components/primitives/split";
import { useLogout } from "@/helpers/logout";
import { useSocket } from "@/hooks/useSocket";

export const Users = () => {
  const { data: session, status } = useSession();
  const {socket} = useSocket()
  const [data, setData] = useState<GetAccountsQuery["getAccounts"]>([]);
  const { logout } = useLogout();

  const {} = useGetAccountsQuery(
    graphqlClient,
    {},
    {
      select: (a) => a.getAccounts,
      onSuccess: (d) => {
        if (!d) return;
        setData(d || []);
      },
    }
  );

  const operation = `
  subscription getAccounts{
    getAccounts{
      username
      status
      id
    }
  }
`;

  useEffect(() => {
    if (!session?.user.token) return;
    if(!socket) return
    const notifier = withAbsintheSocket.send(socket, {
      operation,
      variables: {},
    });
    const absintheSocket = withAbsintheSocket.observe(
      socket,
      notifier,
      {
        onResult: (response) => {
          //@ts-ignore
          const modifiedData = response.data.getAccounts;

          if (modifiedData) {
            const filter =
              data?.filter((a) => a?.username !== modifiedData.username) || [];
            const append = [...filter, ...modifiedData];
            setData(append);
          }
        },
      }
    );
  }, [session?.user.token, socket]);

  return (
    <Box background={"gray-800"} p="md" color={"white"} height="screen">
      <Stack>
        <Split>
          <Heading type="h1" color="blue-400">
            Users
          </Heading>
          <Box style={{ cursor: "pointer" }} onClick={logout}>
            <LogOutIcon />
          </Box>
        </Split>
        {data?.map((a) => {
          return <SingleUser account={a} key={a?.id} />;
        })}
      </Stack>
    </Box>
  );
};
