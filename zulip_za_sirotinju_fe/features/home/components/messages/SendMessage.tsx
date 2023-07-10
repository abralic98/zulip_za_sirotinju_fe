"use client";
import { Cluster } from "@/components/primitives/cluster";
import { Switcher } from "@/components/primitives/switcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { graphqlClient } from "@/lib/graphqlClient";
import { queryClient, QueryClientProviderA } from "@/lib/queryClientProvider";
import {
  CreateMessageInput,
  useCreateMessageMutation,
} from "@/src/generated/graphql";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRoomsStore, useRoomStore } from "../../store/store";

export const SendMessage = () => {
  const form = useForm<CreateMessageInput>();

  const sendMessageMutation = useCreateMessageMutation(graphqlClient);
  const room = useRoomStore();

  const submit = async (input: CreateMessageInput) => {
    if (!room.activeRoom) return;
    const res = await sendMessageMutation.mutateAsync({
      input: { ...input, roomId: room.activeRoom },
    });

    try {
      if (res.createMessage) {
        form.resetField('text');
      }
    } catch {
      
    }
  };
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <Switcher alignItems={"center"} width={"full"}>
          <Input
            background="white"
            color="black"
            placeholder="Enter Message"
            {...form.register("text")}
          />
          <Button style={{ maxWidth: "200px", height: "40px" }}>
            Send Message
          </Button>
        </Switcher>
      </form>
    </FormProvider>
  );
};
