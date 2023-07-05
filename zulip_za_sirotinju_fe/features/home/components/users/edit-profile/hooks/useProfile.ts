import { graphqlClient } from "@/lib/graphqlClient";
import { useMeQuery } from "@/src/generated/graphql";

export const useProfile = () => {
  const { data: getUserProfile, isFetching: isFetchingGet } = useMeQuery(
    graphqlClient,
    {},
    { select: (u) => u.me }
  );



  return { getUserProfile, isFetchingGet };
};
