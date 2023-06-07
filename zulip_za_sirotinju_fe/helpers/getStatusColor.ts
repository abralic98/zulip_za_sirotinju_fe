import { AccountStatus, Maybe } from "@/src/generated/graphql";
import { Color } from "@/styles/vars/colors";

export const getStatusColor = (
  status: Maybe<AccountStatus> | undefined
): Color => {
  switch (status) {
    case AccountStatus.Online:
      return "green-500";
    case AccountStatus.Away:
      return "yellow-500";

    case AccountStatus.Busy:
      return "red-500";
    default:
      return "gray-300";
  }
};
