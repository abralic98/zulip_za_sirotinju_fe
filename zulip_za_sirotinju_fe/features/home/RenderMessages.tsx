"use client";
import { Box } from "@/components/primitives/box/box";
import { Messages } from "./components/messages/Messages";
import { PrivateMessages } from "./components/messages/PrivateMessages";
import { usePrivateRoomStore } from "./store/privateRoomStore";
import { useRoomStore } from "./store/store";

export const RenderMessages = () => {
  const room = useRoomStore();
  const conversation = usePrivateRoomStore();

  const render = () => {
    if (room.activeRoom) {
      return <Messages />;
    }
    if (conversation.activeConversation) {
      return <PrivateMessages />;
    } else {
      return (
        <Box width={"1/3"} background="gray-700" color="white">
          Join Room
        </Box>
      );
    }
  };
  return (
    <>
    {render()}
    </>
  );
};
