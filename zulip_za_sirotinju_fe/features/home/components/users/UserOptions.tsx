import { Box } from "@/components/primitives/box/box";
import { Stack } from "@/components/primitives/stack";
import { Heading } from "@/components/ui/Heading";
import { routes } from "@/config/routes";
import { LocalStorage } from "@/helpers/localStorage";
import { graphqlClient } from "@/lib/graphqlClient";
import {
  AccountStatus,
  useUpdateAccountStatusMutation,
} from "@/src/generated/graphql";
import { useRouter } from "next/navigation";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { EditProfile } from "./edit-profile/EditProfile";

interface Props {
  setOptions: Dispatch<SetStateAction<boolean>>;
}
export const UserOptions: FC<Props> = ({ setOptions }) => {
  const [editProfile, setEditProfile] = useState(false)
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

  return (
    <Box background={"white"} style={{ zIndex: 999 }} width={"20"}>
      <Stack background={"gray-700"}>
        <Box
          style={{ cursor: "pointer" }}
          background={"gray-700"}
          onClick={()=>setEditProfile(true)}
        >
          <Heading color="white" fontWeight="bold" type="h3">
            Edit Profile 
          </Heading>
        </Box>
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
      <EditProfile open={editProfile} setOpen={setEditProfile}/>
    </Box>
  );
};
