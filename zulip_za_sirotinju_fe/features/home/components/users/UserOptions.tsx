import { Box } from "@/components/primitives/box/box";
import { Stack } from "@/components/primitives/stack";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/Heading";
import { ImageBox } from "@/components/ui/ImageBox";
import { LoaderDots } from "@/components/ui/LoaderDots";
import { LocalStorage } from "@/helpers/localStorage";
import { graphqlClient } from "@/lib/graphqlClient";
import {
  AccountStatus,
  useUpdateAccountStatusMutation,
} from "@/src/generated/graphql";
import { UserIcon } from "lucide-react";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { EditProfile } from "./edit-profile/EditProfile";
import { useProfile } from "./edit-profile/hooks";

interface Props {
  setOptions: Dispatch<SetStateAction<boolean>>;
}
export const UserOptions: FC<Props> = ({ setOptions }) => {
  const [editProfile, setEditProfile] = useState(false);
  const { isFetchingAvatar, getUserAvatar } = useProfile({});
  const updateAccountStatusMutation =
    useUpdateAccountStatusMutation(graphqlClient);

  const updateStatus = async (status: AccountStatus) => {
    const res = await updateAccountStatusMutation.mutateAsync({
      status: status,
    });
    if (res.updateAccountStatus) {
      LocalStorage.setItem("zulip-status", "BUSY");
    }
    setOptions(false);
  };

  const getAvatar = getUserAvatar?.filePath ? (
    <Box onClick={() => setEditProfile(true)}>
      <ImageBox width={300} height={300} src={getUserAvatar?.filePath || ""} />
    </Box>
  ) : (
    <Box onClick={() => setEditProfile(true)}>
      <UserIcon width={"120px"} height="120px" />
    </Box>
  );

  return (
    <Box
      background={"white"}
      style={{ zIndex: 99, position: "relative" }}
      width={"32"}
    >
      <Stack background={"gray-700"}>
        <Stack gap={"md"}>
          {isFetchingAvatar ? <LoaderDots /> : getAvatar}
          <Button onClick={() => setEditProfile(true)} color="white">
            Edit Profile
          </Button>
        </Stack>
        <Box
          style={{ cursor: "pointer" }}
          background={"gray-700"}
          onClick={() => updateStatus(AccountStatus.Online)}
        >
          <Heading color="white" fontWeight="bold" type="h3">
            Online
          </Heading>
        </Box>
        <Box
          style={{ cursor: "pointer" }}
          background={"gray-700"}
          onClick={() => updateStatus(AccountStatus.Busy)}
        >
          <Heading color="white" fontWeight="bold" type="h3">
            Busy
          </Heading>
        </Box>
      </Stack>
      <EditProfile open={editProfile} setOpen={setEditProfile} />
    </Box>
  );
};
