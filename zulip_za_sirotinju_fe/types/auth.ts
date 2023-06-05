import { Account } from "@/src/generated/graphql";

export interface AccountWithToken extends Account {
  token?: string
}
