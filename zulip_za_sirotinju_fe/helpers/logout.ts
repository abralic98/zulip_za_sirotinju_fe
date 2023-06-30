import { routes } from "@/config/routes";
import { graphqlClient } from "@/lib/graphqlClient";
import {
  AccountStatus,
  useUpdateAccountStatusMutation,
} from "@/src/generated/graphql";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const { data: session, status } = useSession();
  const { push } = useRouter();

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
    setTimeout(async () => {
      await updateStatusMutation.mutateAsync({
        status: AccountStatus.Online,
      });
      try {
      } catch {}
    }, 3000);
  };

  return { logout, login };
};
