import { graphqlClient } from "@/lib/graphqlClient";
import {
  AccountStatus,
  useUpdateAccountStatusMutation,
} from "@/src/generated/graphql";
import { signOut, useSession } from "next-auth/react";

export const useLogout = () => {
  const { data: session, status } = useSession();

  const updateStatusMutation = useUpdateAccountStatusMutation(graphqlClient);
  const logout = async () => {
    if (!session?.user.token) return;
    const res = await updateStatusMutation.mutateAsync({
      status: AccountStatus.Offline,
    });
    try {
      if (res.updateAccountStatus) {
        signOut();
      }
    } catch {}
  };
  const login = async () => {
    const res = await updateStatusMutation.mutateAsync({
      status: AccountStatus.Online,
    });
    try {
      //
    } catch {}
  };

  return { logout, login };
};
