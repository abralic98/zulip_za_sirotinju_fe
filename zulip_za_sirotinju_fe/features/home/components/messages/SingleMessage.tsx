import { Box } from "@/components/primitives/box/box";
import { Cluster } from "@/components/primitives/cluster";
import { Stack } from "@/components/primitives/stack";
import { Heading } from "@/components/ui/Heading";
import { displayDate } from "@/helpers/dateTimeConverter";
import { ConversationReply, Message } from "@/src/generated/graphql";
import React, { FC } from "react";

interface Props {
  message: Message | ConversationReply |  null;
}
export const SingleMessage: FC<Props> = ({ message }) => {
  if (!message) return null;
  
  return (
    <Box height={"20"}>
      <Cluster justifyContent={'between'} alignItems='center'>
        <Stack>
          <Heading type="h2">
            {message.account?.username}
          </Heading>
          <Heading color="white" type="h3">
            {message.text}
          </Heading>
        </Stack>
        <Heading type="h4">{displayDate(message.insertedAt)}</Heading>
      </Cluster>
    </Box>
  );
};
