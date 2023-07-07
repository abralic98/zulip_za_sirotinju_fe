import { graphqlClient } from "@/lib/graphqlClient";
import {
  UpdateProfileInput,
  useGetUserAvatarIdQuery,
  useGetUserAvatarQuery,
  useMeQuery,
  useUpdateProfileMutation,
} from "@/src/generated/graphql";
import { UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";

interface Props {
  userId?: string;
  form?: UseFormReturn<UpdateProfileInput, any>
}
export const useProfile = (props: Props) => {
  const updateProfileMutation = useUpdateProfileMutation(graphqlClient);
  const decodedId = props?.userId
    ? atob(String(props.userId)).split(":")[1]
    : "";
  const { data: getUserProfile, isFetching: isFetchingGet } = useMeQuery(
    graphqlClient,
    {},
    {
      select: (u) => u.me,
      onSuccess: (d) => {
        props?.form?.reset({
          username: d?.username,
          firstName: d?.firstName,
          lastName: d?.lastName,
          email: d?.email,
        });
      },
      cacheTime:0
    }
  );

  //current user avatar
  const { data: getUserAvatar, isFetching: isFetchingAvatar } =
    useGetUserAvatarQuery(
      graphqlClient,
      {},
      { enabled: !Boolean(props?.userId), select: (u) => u.getUserAvatar }
    );

  const { data: getOtherUserAvatar, isFetching: isFetchingOtherAvatar } =
    useGetUserAvatarIdQuery(
      graphqlClient,
      { userId: decodedId },
      { enabled: Boolean(props?.userId), select: (u) => u.getUserAvatarId }
    );

  const updateProfile = async (input: UpdateProfileInput) => {
    const res = await updateProfileMutation.mutateAsync({ input: input });
    try {
      if (res.updateProfile) {
        toast.success("Profile Successfully updated");
      }
    } catch {}
  };
  return {
    getUserProfile,
    isFetchingGet,
    getUserAvatar,
    isFetchingAvatar,
    getOtherUserAvatar,
    isFetchingOtherAvatar,
    updateProfile,
  };
};
