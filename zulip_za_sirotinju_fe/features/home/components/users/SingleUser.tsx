import { Box } from "@/components/primitives/box/box";
import { Cluster } from "@/components/primitives/cluster";
import { Heading } from "@/components/ui/Heading";
import { getStatusColor } from "@/helpers/getStatusColor";
import { Account } from "@/src/generated/graphql";
import { FC } from "react";

interface Props {
  account: Account | null;
}
export const SingleUser: FC<Props> = ({ account }) => {
  if (!account) return null;
  const color = getStatusColor(account.status);
  return (
    <Cluster gap={'xs'} alignItems={'center'}>
      <Heading type="h3" color="white">
        {account.username}
      </Heading>
      <Box
        width={"3"}
        height="3"
        style={{ borderRadius: "50%" }}
        background={color}
      />
    </Cluster>
  );
};
