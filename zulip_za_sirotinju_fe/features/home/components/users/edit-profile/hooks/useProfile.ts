import { graphqlClient } from "@/lib/graphqlClient";
import { useGetUserAvatarQuery, useMeQuery } from "@/src/generated/graphql";

export const useProfile = () => {
  const { data: getUserProfile, isFetching: isFetchingGet } = useMeQuery(
    graphqlClient,
    {},
    { select: (u) => u.me }
  );

  const {data: getUserAvatar, isFetching: isFetchingAvatar} = useGetUserAvatarQuery(graphqlClient, {}, {select:(u)=>u.getUserAvatar})



  return { getUserProfile, isFetchingGet, getUserAvatar, isFetchingAvatar };
};
