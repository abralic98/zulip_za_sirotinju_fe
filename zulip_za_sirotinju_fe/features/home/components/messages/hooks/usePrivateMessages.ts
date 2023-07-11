import { usePrivateRoomStore } from "@/features/home/store/privateRoomStore";
import { useRoomStore } from "@/features/home/store/store";
import { graphqlClient } from "@/lib/graphqlClient";
import {
  ConversationReply,
  GetConversationRepliesByConversationIdDocument,
  GetConversationRepliesByConversationIdQuery,
  GetConversationRepliesByConversationIdQueryVariables,
} from "@/src/generated/graphql";
import { useInfiniteQuery } from "@tanstack/react-query";

export const usePrivateMessages = () => {
  const conversation = usePrivateRoomStore();
  const fetch = async (
    params: GetConversationRepliesByConversationIdQueryVariables
  ): Promise<GetConversationRepliesByConversationIdQuery> => {
    return await graphqlClient.request(
      GetConversationRepliesByConversationIdDocument,
      {
        ...params,
      }
    );
  };

  const query = useInfiniteQuery<GetConversationRepliesByConversationIdQuery>(
    [`getPrivateMessages-${conversation.activeConversation}`],
    ({
      pageParam = {
        first: 25,
        conversationId: conversation.activeConversation,
      },
    }) => fetch(pageParam),

    {
      enabled: Boolean(conversation.activeConversation),
      getNextPageParam: (lastPage) => {
        if (
          lastPage.getConversationRepliesByConversationId?.pageInfo.hasNextPage
        )
          return {
            first: 25,
            after:
              lastPage.getConversationRepliesByConversationId.pageInfo
                .endCursor,
            conversationId: conversation.activeConversation,
          };
        return undefined;
      },
      cacheTime: 0,
    }
  );
  const generateRowData = (): ConversationReply[] => {
    let list: ConversationReply[] = [];
    query.data?.pages.forEach((page) => {
      page.getConversationRepliesByConversationId?.edges?.forEach((e) => {
        list = [...list, e?.node || ({} as ConversationReply)];
      });
    });
    return list;
  };

  return { generateRowData, query };
};
