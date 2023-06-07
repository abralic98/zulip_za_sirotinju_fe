import { Box } from "@/components/primitives/box/box";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/Dialog";
import { Heading } from "@/components/ui/Heading";
import { Input } from "@/components/ui/input";
import { graphqlClient } from "@/lib/graphqlClient";
import { queryClient } from "@/lib/queryClientProvider";
import {
  CreateRoomInput,
  useCreateRoomMutation,
} from "@/src/generated/graphql";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { createRoomSchema } from "../../zod";

export const CreateNewRoom = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof createRoomSchema>>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      name: "",
      password: null,
    },
  });

  const createRoomMutation = useCreateRoomMutation(graphqlClient);

  const submit = async (input: CreateRoomInput) => {
    const res = await createRoomMutation.mutateAsync({ input: input });
    try {
      if (res.createRoom) {
        queryClient.refetchQueries(["getRooms"]);
        setOpen(false);
      }
    } catch {}
  };
  return (
    <>
      <Button onClick={() => setOpen(true)} type="button">
        CreateNewRoom
      </Button>
      <Dialog setOpen={setOpen} open={open}>
        <Box
          p={"sm"}
          background={"gray-700"}
          style={{ width: "500px", height: "300px" }}
          display="flex"
          flexDirection={"col"}
          gap="sm"
        >
          <Heading type="h1" color={'white'}>
            Create New Room
          </Heading>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(submit)}>
              <Box display={"flex"} flexDirection="col">
                <Input color="white" label="Room Name" {...form.register("name")} />
                <Input color="white" label="Room Password" {...form.register("password")} />
                <Box style={{ alignSelf: "flex-end" }}>
                  <Button>Create Room</Button>
                </Box>
              </Box>
            </form>
          </FormProvider>
        </Box>
      </Dialog>
    </>
  );
};
