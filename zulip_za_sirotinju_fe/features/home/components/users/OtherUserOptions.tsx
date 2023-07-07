import { Box } from "@/components/primitives/box/box";
import { Stack } from "@/components/primitives/stack";
import { Button } from "@/components/ui/button";
import { ImageBox } from "@/components/ui/ImageBox";
import { LoaderDots } from "@/components/ui/LoaderDots";
import { UserIcon } from "lucide-react";
import React, { FC } from "react";
import { useProfile } from "./edit-profile/hooks";

interface Props {
  userId: string;
}
export const OtherUserOptions: FC<Props> = ({ userId }) => {
  const { isFetchingOtherAvatar, getOtherUserAvatar } = useProfile(userId);

  console.log('is other');
  

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
          <Button type='button'  color="white">
            Send Message
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
