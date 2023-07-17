import { Box } from "@/components/primitives/box/box";
import { Cluster } from "@/components/primitives/cluster";
import { Heading } from "@/components/ui/Heading";
import { Options } from "@/components/ui/Options";
import { getStatusColor } from "@/helpers/getStatusColor";
import { Account } from "@/src/generated/graphql";
import { MoreVertical } from "lucide-react";
import { useSession } from "next-auth/react";
import { FC, useState } from "react";
import { OtherUserOptions } from "./OtherUserOptions";
import { UserOptions } from "./UserOptions";

interface Props {
  account: Account | null;
}
export const SingleUser: FC<Props> = ({ account }) => {
  const { data: session } = useSession();
  const [dots, setDots] = useState(false);
  const [options, setOptions] = useState(false);

  if (!account) return null;

  const color = getStatusColor(account.status);
  const currentAccount = session?.user.id === account.id;

  return (
    <Cluster
      style={{ position: "relative" }}
      onMouseEnter={() => setDots(true)}
      onMouseLeave={() => setDots(false)}
      gap={"xs"}
      alignItems={"center"}
    >
      <Heading
        fontWeight={currentAccount ? "bold" : "normal"}
        type="h3"
        color="white"
      >
        {account.username}
      </Heading>
      <Box
        width={"3"}
        height="3"
        style={{ borderRadius: "50%" }}
        background={color}
      />
      {dots && (
        <Box
          onClick={() => setOptions(!options)}
          style={{ cursor: "pointer", right: "5px", position: "absolute" }}
        >
          <MoreVertical width={"18px"} />
        </Box>
      )}
      <Options open={options} setOpen={setOptions}>
        <Box style={{ position: "absolute", top: "22px", left: "15px" }}>
          <Heading type="h3" color="white" fontWeight="bold">
            {account.username || ""}
          </Heading>
        </Box>
        {currentAccount && <UserOptions setOptions={setOptions} />}
        {!currentAccount && <OtherUserOptions username={account.username || ''} userId={account.id} />}
      </Options>
    </Cluster>
  );
};
