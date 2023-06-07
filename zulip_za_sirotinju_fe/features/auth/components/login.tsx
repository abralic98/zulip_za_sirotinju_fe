"use client";

import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { FormProvider, useForm } from "react-hook-form";
import { loginSchema } from "../zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { routes } from "@/config/routes";
import { Center } from "@/components/primitives/center";
import { Box } from "@/components/primitives/box/box";
import { Heading } from "@/components/ui/Heading";
import { Stack } from "@/components/primitives/stack";
import Link from "next/link";
import { useLogout } from "@/helpers/logout";

export function Login() {
  const [loading, setLoading] = useState(false);
  const { login } = useLogout();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setLoading(true);
    try {
      await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: true,
        callbackUrl: routes.app,
      }).then(() => {
        login();
      });
    } catch {
      setLoading(false);
    }
    setLoading(false);
  }

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
              Login
            </Heading>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Input
                color="blue-400"
                error={form.formState.errors["username"]}
                label="username"
                {...form.register("username")}
              />
              <Stack>
                <Input
                  color="blue-400"
                  error={form.formState.errors["password"]}
                  label="password"
                  {...form.register("password")}
                />
                <Link
                  className="text-purple-400"
                  style={{ fontWeight: "bold" }}
                  href={routes.register}
                >
                  Dont have account?
                </Link>
                <Button>Submit</Button>
              </Stack>
            </form>
          </Stack>
        </FormProvider>
      </Center>
    </Box>
  );
}
