import { Box } from "@/components/primitives/box/box";
import { Cluster } from "@/components/primitives/cluster";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/Dialog";
import { Heading } from "@/components/ui/Heading";
import { Input } from "@/components/ui/input";
import { graphqlClient } from "@/lib/graphqlClient";
import {
  AccessProtectedRoomMutationVariables,
  useAccessProtectedRoomMutation,
} from "@/src/generated/graphql";
import React, { Dispatch, FC, SetStateAction } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRoomStore } from "../../store/store";

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  roomId: string;
}
export const VerifyRoomAccess: FC<Props> = ({ setOpen, open, roomId }) => {
  const form = useForm<Omit<AccessProtectedRoomMutationVariables, "roomId">>();
  const roomstore = useRoomStore();
  const accessRoom = useAccessProtectedRoomMutation(graphqlClient);

  const submit = async (
    data: Omit<AccessProtectedRoomMutationVariables, "roomId">
  ) => {
    const res = await accessRoom.mutateAsync({ ...data, roomId: roomId });
    try {
      if (res.accessProtectedRoom) {
        roomstore.setActiveRoom(roomId);
        setOpen(false);
      } else {
        toast.error("Wrong password");
        setOpen(false);
      }
    } catch {}
  };
  return (
    <Dialog setOpen={setOpen} open={open}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          <Box
            p={"sm"}
            background={"gray-700"}
            style={{ width: "500px", height: "150px" }}
            display="flex"
            flexDirection={"col"}
            gap="sm"
          >
            <Heading type="h1" color={"white"}>
              Enter Room Password
            </Heading>
            <Cluster alignItems={"center"}>
              <Input
                className="w-80 bg-gray-600 text-white"
                {...form.register("password")}
              />
              <Button>Enter Room</Button>
            </Cluster>
          </Box>
        </form>
      </FormProvider>
    </Dialog>
  );
};
