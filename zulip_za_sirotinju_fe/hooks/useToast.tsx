import { UserIcon } from "lucide-react";
import React, { FC } from "react";
import toast from "react-hot-toast";
import { Box } from "../components/primitives/box/box";
import { Cluster } from "../components/primitives/cluster";
import { Heading } from "../components/ui/Heading";

export const useToast = () => {
  const shadow = "rgb(38, 57, 77) 0px 20px 30px -10px";
  const toastSuccess = (message: string) =>
    toast.custom((t) => (
      <Cluster
        alignItems={"center"}
        style={{ width: "400px", height: "70px", boxShadow: shadow }}
        background={"gray-700"}
      >
        <UserIcon color="white" />
        <Heading color="white" type="h2">
          {message}
        </Heading>
      </Cluster>
    ));
  return { toastSuccess };
};
