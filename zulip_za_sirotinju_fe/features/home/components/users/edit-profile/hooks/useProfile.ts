import { graphqlClient } from "@/lib/graphqlClient";
import {
  useGetUserAvatarIdQuery,
  useGetUserAvatarQuery,
  useMeQuery,
} from "@/src/generated/graphql";

export const useProfile = (userId?: string) => {
  const decodedId = userId ? atob(String(userId)).split(":")[1] : "";
  const { data: getUserProfile, isFetching: isFetchingGet } = useMeQuery(
    graphqlClient,
    {},
    { select: (u) => u.me }
  );

  //current user avatar
  const { data: getUserAvatar, isFetching: isFetchingAvatar } =
    useGetUserAvatarQuery(
      graphqlClient,
      {},
      { enabled: !Boolean(userId), select: (u) => u.getUserAvatar }
    );

  const { data: getOtherUserAvatar, isFetching: isFetchingOtherAvatar } =
    useGetUserAvatarIdQuery(
      graphqlClient,
      { userId: decodedId },
      { enabled: Boolean(userId), select: (u) => u.getUserAvatarId }
    );

  return {
    getUserProfile,
    isFetchingGet,
    getUserAvatar,
    isFetchingAvatar,
    getOtherUserAvatar,
    isFetchingOtherAvatar,
  };
};
