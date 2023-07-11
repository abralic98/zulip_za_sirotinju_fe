import { Conversation } from "@/src/generated/graphql";

export const getOtherUser = (
  conversation: Conversation | undefined | null,
  currentUserId: string
)  => {
  if (!conversation) return null;

  if (conversation.userOne?.id === currentUserId) {
    return {
      name: String(conversation?.userTwo?.username),
      id: String(conversation?.id),
      unreadMessages: 0,
    };
  }

  if (conversation.userTwo?.id === currentUserId) {
    return {
      name: String(conversation?.userOne?.username),
      id: String(conversation?.id),
      unreadMessages: 0,
    };
  } else {
    return null;
  }
};
