"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { FormProvider, useForm } from "react-hook-form";
import { loginSchema } from "../zod";
import { Button } from "@/components/ui/button";
import { useCreateAccountMutation } from "@/src/generated/graphql";

export function Login() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    console.log(values);

  };

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
