"use client";
import { LocalStorage } from "@/helpers/localStorage";
import { graphqlClient } from "@/lib/graphqlClient";
import {
  AccountStatus,
  useMeQuery,
  useUpdateAccountStatusMutation,
} from "@/src/generated/graphql";
import { useEffect, useState } from "react";

const logoutTime = 6 * 1000;

export const useInactive = () => {
  const [trigger, setTrigger] = useState(true);
  const minute = 1000 * 60;
  const updateStatusMutation = useUpdateAccountStatusMutation(graphqlClient);

  const me = useMeQuery(
    graphqlClient,
    {},
    {
      onSuccess: (data) => {
        LocalStorage.setItem("zulip-status", String(data.me?.status));
      },
    }
  );

  const update = async (status: AccountStatus) => {
    if (LocalStorage.getItem("zulip-status") == status) return;
    const res = await updateStatusMutation.mutateAsync({ status: status });
    try {
      if (res.updateAccountStatus) {
        setTrigger(!trigger);
      }
    } catch {}
  };

  useEffect(() => {
    const activityListener = () => {
      const now = Date.now();
      LocalStorage.setItem("login-time", Date.now().toString());
      setTrigger(!trigger);
      if (now - Number(LocalStorage.getItem("login-time")) <= logoutTime) {
        setTrigger(!trigger);
        update(AccountStatus.Online);
        LocalStorage.setItem("zulip-status", "ONLINE");
      }
    };
    document.addEventListener("click", activityListener);
    document.addEventListener("keydown", activityListener);

    const interval = setInterval(() => {
      const now = Date.now();
      if (now - Number(LocalStorage.getItem("login-time")) >= logoutTime) {
        setTrigger(!trigger);
        update(AccountStatus.Away);
        LocalStorage.clearStorage();
        LocalStorage.setItem("zulip-status", "AWAY");
      }
    }, minute * 1);

    return () => {
      document.removeEventListener("click", activityListener);
      document.removeEventListener("keydown", activityListener);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return () => {
    null;
  };
};