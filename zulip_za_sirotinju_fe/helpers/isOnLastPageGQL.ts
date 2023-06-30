import { PageInfo } from "@/src/generated/graphql"

type response = unknown | undefined
interface NextPageParamPropsGQL {
  pageInfo: Partial<PageInfo> | undefined
  extraArguments?: object
}
export const isOnLastPageGQL = ({
  pageInfo,
  extraArguments,
}: NextPageParamPropsGQL): response => {
  if (!pageInfo) return undefined
  if (!pageInfo.startCursor) return undefined
  const isLastPage = pageInfo.hasNextPage

  if (!isLastPage) {
    return {
      startCursor: pageInfo.startCursor,
      // first,
      endCursor:pageInfo.endCursor,
      ...extraArguments,
    }
  } else return undefined
}
