"use client";

import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { FormProvider, useForm } from "react-hook-form";
import { loginSchema, registerSchema } from "../zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { routes } from "@/config/routes";
import { Center } from "@/components/primitives/center";
import { Box } from "@/components/primitives/box/box";
import { Heading } from "@/components/ui/Heading";
import { Stack } from "@/components/primitives/stack";
import Link from "next/link";
import {
  CreateAccountInput,
  useCreateAccountMutation,
} from "@/src/generated/graphql";
import { graphqlClient } from "@/lib/graphqlClient";
import { useRouter } from "next/navigation";

export function Register() {
  const { push } = useRouter();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });

  const createAccountMutation = useCreateAccountMutation(graphqlClient);

  const onSubmit = async (input: CreateAccountInput) => {
    const res = await createAccountMutation.mutateAsync({ input: input });
    try {
      if (res.createAccount) {
        push(routes.login);
      }
    } catch {}
  };

  return (
    <Box
      background={"gray-800"}
      justifyContent={"center"}
      alignItems="center"
      display={"flex"}
      width="screen"
      height={"screen"}
    >
      <Center p={"lg"} style={{ borderRadius: "10px" }} background={"gray-600"}>
        <FormProvider {...form}>
          <Stack>
            <Heading type="h1" color="blue-500">
              Register
            </Heading>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Input
                color="blue-400"
                error={form.formState.errors["username"]}
                label="username"
                {...form.register("username")}
              />
              <Input
                color="blue-400"
                error={form.formState.errors["password"]}
                label="password"
                {...form.register("password")}
              />

              <Stack>
                <Input
                  color="blue-400"
                  error={form.formState.errors["password"]}
                  label="email"
                  {...form.register("email")}
                />
                <Link
                  className="text-purple-400"
                  style={{ fontWeight: "bold" }}
                  href={routes.login}
                >
                  Allready have Account?
                </Link>
                <Button>Create Account</Button>
              </Stack>
            </form>
          </Stack>
        </FormProvider>
      </Center>
    </Box>
  );
}
