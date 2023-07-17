import { Box } from "@/components/primitives/box/box";
import { Cluster } from "@/components/primitives/cluster";
import { Split } from "@/components/primitives/split";
import { Stack } from "@/components/primitives/stack";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/Dialog";
import { Heading } from "@/components/ui/Heading";
import { Input } from "@/components/ui/input";
import { updateAccountSchema } from "@/features/home/zod";
import { UpdateProfileInput } from "@/src/generated/graphql";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Dispatch, FC, SetStateAction, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { useProfile } from "./hooks/useProfile";
import { UploadAvatar } from "./UploadAvatar";

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}
export const EditProfile: FC<Props> = ({ setOpen, open }) => {
  const form = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateAccountSchema),
  });

  const { getUserProfile, isFetchingGet, updateProfile } = useProfile({
    form: form,
  });

  return (
    <Dialog setOpen={setOpen} open={open}>
      <Box
        p={"sm"}
        background={"gray-700"}
        style={{ width: "1000px", height: "500px" }}
        display="flex"
        flexDirection={"col"}
        gap="sm"
      >
        <Heading type="h1" color={"white"}>
          Edit Profile
        </Heading>
        <Split alignItems={"center"}>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(updateProfile)}>
              <Stack>
                <Box>
                  <Input
                    className="w-80 bg-gray-600 text-white"
                    color="white"
                    label="Username"
                    {...form.register("username")}
                  />
                  <Input
                    className="w-80 bg-gray-600 text-white"
                    color="white"
                    label="First Name"
                    {...form.register("firstName")}
                  />
                  <Input
                    className="w-80 bg-gray-600 text-white"
                    color="white"
                    label="Last Name"
                    {...form.register("lastName")}
                  />
                  <Input
                    className="w-80 bg-gray-600 text-white"
                    color="white"
                    label="Email"
                    {...form.register("email")}
                  />
                </Box>
                <Button>Update Profile Info</Button>
              </Stack>
            </form>
          </FormProvider>
          <UploadAvatar />
        </Split>
      </Box>
    </Dialog>
  );
};
