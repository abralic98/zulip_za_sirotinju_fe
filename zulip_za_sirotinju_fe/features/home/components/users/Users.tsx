"use client";
import { Box } from "@/components/primitives/box/box";
import { graphqlClient } from "@/lib/graphqlClient";
import { GetAccountsQuery, useGetAccountsQuery } from "@/src/generated/graphql";
import React, { useEffect, useState } from "react";
import * as withAbsintheSocket from "@absinthe/socket";
//@ts-ignore
import { Socket as PhoenixSocket } from "phoenix";
import { signOut, useSession } from "next-auth/react";
import { SingleUser } from "./SingleUser";
import { Heading } from "@/components/ui/Heading";
import { Stack } from "@/components/primitives/stack";
import { LogOutIcon } from "lucide-react";
import { Split } from "@/components/primitives/split";
import { useLogout } from "@/helpers/logout";

export const Users = () => {
  const { data: session, status } = useSession();
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

  const absintheSocketInit = withAbsintheSocket.create(
    // new PhoenixSocket("ws://localhost:4000/api/graphql/socket", {

    new PhoenixSocket(String(process.env.WS_LINK), {
      params: {
        Authorization: `Bearer ${session?.user.token}`,
      },
    })
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
    const notifier = withAbsintheSocket.send(absintheSocketInit, {
      operation,
      variables: {},
    });
    const absintheSocket = withAbsintheSocket.observe(
      absintheSocketInit,
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
  }, [session?.user.token]);

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
