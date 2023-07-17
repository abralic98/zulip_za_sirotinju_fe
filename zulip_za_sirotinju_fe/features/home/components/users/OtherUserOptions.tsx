import { Box } from "@/components/primitives/box/box";
import { Stack } from "@/components/primitives/stack";
import { Button } from "@/components/ui/button";
import { ImageBox } from "@/components/ui/ImageBox";
import { LoaderDots } from "@/components/ui/LoaderDots";
import { UserIcon } from "lucide-react";
import React, { FC } from "react";
import { usePrivateRoomsStore, usePrivateRoomStore } from "../../store/privateRoomStore";
import { useProfile } from "./edit-profile/hooks";

interface Props {
  userId: string;
  username: string
}
export const OtherUserOptions: FC<Props> = ({ userId, username }) => {
  const conversation = usePrivateRoomStore()
  const conversations = usePrivateRoomsStore()
  console.log(conversations,' conversations');
  
  const { isFetchingOtherAvatar, getOtherUserAvatar } = useProfile({userId:userId});
  const getAvatar = getOtherUserAvatar?.filePath ? (
      <ImageBox width={300} height={300} src={getOtherUserAvatar?.filePath || ""} />
  ) : (
      <UserIcon width={"120px"} height="120px" />
  );
  return (
    <Box
      background={"white"}
      style={{ zIndex: 99, position: "relative" }}
      width={"32"}
    >
      <Stack background={"gray-700"}>
        <Stack gap={"md"}>
          {isFetchingOtherAvatar ? (
            <LoaderDots />
          ) : (
            getAvatar
          )}
          <Button onClick={()=>{
            const conversationId = conversations.conversations.find((c)=>c.name === username)?.id
            conversation.setActiveConversation(conversationId)
          }} type='button'  color="white">
            Send Message
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
