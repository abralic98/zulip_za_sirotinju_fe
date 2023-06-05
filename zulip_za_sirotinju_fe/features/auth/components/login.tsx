"use client";

import { signIn } from "next-auth/react"
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { FormProvider, useForm } from "react-hook-form";
import { loginSchema } from "../zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { routes } from "@/config/routes";

export function Login() {
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setLoading(true)
    try {
      await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: true,
        callbackUrl: routes.landing,
      })
    } catch {
      setLoading(false)
    }
    setLoading(false)
  }

  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Input
            error={form.formState.errors["username"]}
            label="username"
            {...form.register("username")}
          />
          <Input
            error={form.formState.errors["password"]}
            label="password"
            {...form.register("password")}
          />
          <Button>Submit</Button>
        </form>
      </FormProvider>
    </>
  );
}
