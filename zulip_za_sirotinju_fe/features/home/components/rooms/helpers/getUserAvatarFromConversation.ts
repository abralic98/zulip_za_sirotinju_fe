import { Conversation } from "@/src/generated/graphql";

export const getUserAvatarFromConversation = (
  conversation: Conversation | undefined | null,
  currentUserId: string
) => {
  if (!conversation) return null;

  if (conversation.userOne?.id === currentUserId) {
    return atob(String(conversation.userTwo?.id)).split(":")[1];
  }

  if (conversation.userTwo?.id === currentUserId) {
    return atob(String(conversation.userOne?.id)).split(":")[1];
  } else {
    return null;
  }
};
