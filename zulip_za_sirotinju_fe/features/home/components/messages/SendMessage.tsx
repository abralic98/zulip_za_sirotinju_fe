"use client";
import { Cluster } from "@/components/primitives/cluster";
import { Switcher } from "@/components/primitives/switcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { graphqlClient } from "@/lib/graphqlClient";
import { queryClient, QueryClientProviderA } from "@/lib/queryClientProvider";
import {
  CreateConversationReplyInput,
  CreateMessageInput,
  useCreateConversationReplyMutation,
  useCreateMessageMutation,
} from "@/src/generated/graphql";
import React, { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { usePrivateRoomStore } from "../../store/privateRoomStore";
import { useRoomStore } from "../../store/store";

interface Props {
  type: "Public" | "Private";
}
export const SendMessage: FC<Props> = ({ type }) => {
  const form = useForm<CreateMessageInput | CreateConversationReplyInput>();

  const sendMessageMutation = useCreateMessageMutation(graphqlClient);
  const sendPrivateMessageMutation =
    useCreateConversationReplyMutation(graphqlClient);
  const conversation = usePrivateRoomStore();
  const room = useRoomStore();

  const submit = async (
    input: CreateMessageInput | CreateConversationReplyInput
  ) => {
    if (type === "Public") {
      if (!room.activeRoom) return;

      const res = await sendMessageMutation.mutateAsync({
        input: { ...input, roomId: room.activeRoom },
      });

      try {
        if (res.createMessage) {
          form.resetField("text");
        }
      } catch {}
    }
    if (type === "Private") {
      if (!conversation.activeConversation) return;

      const res = await sendPrivateMessageMutation.mutateAsync({
        input: { ...input, conversationId: conversation.activeConversation},
      });

      try {
        if (res.createConversationReply) {
          form.resetField("text");
        }
      } catch {}
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
