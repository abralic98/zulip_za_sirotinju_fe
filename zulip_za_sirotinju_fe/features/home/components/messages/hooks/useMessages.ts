import { useRoomStore } from "@/features/home/store/store";
import { graphqlClient } from "@/lib/graphqlClient";
import {
  GetMessagesByRoomIdDocument,
  GetMessagesByRoomIdQuery,
  GetMessagesByRoomIdQueryVariables,
  Message,
} from "@/src/generated/graphql";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useMessages = (
) => {
  const room = useRoomStore();
  const fetch = async (
    params: GetMessagesByRoomIdQueryVariables
  ): Promise<GetMessagesByRoomIdQuery> => {
    return await graphqlClient.request(GetMessagesByRoomIdDocument, {
      ...params,
    });
  };

  const query = useInfiniteQuery<GetMessagesByRoomIdQuery>(
    [`getMessages-${room.activeRoom}`],
    ({
      pageParam = {
        first: 25,
        roomId: room.activeRoom,
      },
    }) => fetch(pageParam),

    {
      enabled: Boolean(room.activeRoom),
      getNextPageParam: (lastPage) => {
        if (lastPage.getMessagesByRoomId?.pageInfo.hasNextPage)
          return {
            first: 25,
            after: lastPage.getMessagesByRoomId.pageInfo.endCursor,
            roomId: room.activeRoom,
          };
        return undefined;
      },
      cacheTime:0,
    }
  );
  const generateRowData = (): Message[] => {
    let list: Message[] = [];
    query.data?.pages.forEach((page) => {
      page.getMessagesByRoomId?.edges?.forEach((e) => {
        list = [...list, e?.node || ({} as Message)];
      });
    });
    return list;
  };


  return { generateRowData, query };
};
