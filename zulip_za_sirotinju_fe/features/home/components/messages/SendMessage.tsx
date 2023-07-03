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
  const rooms = useRoomsStore();

  const submit = async (input: CreateMessageInput) => {
    if (!room.activeRoom) return;
    console.log(room.activeRoom, "aktiverom");
    const res = await sendMessageMutation.mutateAsync({
      input: { ...input, roomId: room.activeRoom },
    });

    console.log(res, "res");
    try {
      if (res.createMessage) {
        const currentRoom = rooms.rooms.find((r) => r.id === room.activeRoom);
        const updateRoom = rooms.rooms.filter((r) => r.id !== room.activeRoom);

        rooms.setRooms([
          ...updateRoom,
          {
            name: room.activeRoom,
            id: room.activeRoom,
            unreadMessages: currentRoom?.unreadMessages || 0 + 1,
          },
        ]);
        console.log('jel uslo');
        
        form.resetField('text');
      }
    } catch {
      console.log('XD?');
      
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
