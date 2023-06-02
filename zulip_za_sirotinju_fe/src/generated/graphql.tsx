import { GraphQLClient } from 'graphql-request';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables extends { [key: string]: any }>(client: GraphQLClient, query: string, variables?: TVariables, requestHeaders?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request({
    document: query,
    variables,
    requestHeaders
  });
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Account = Node & {
  __typename?: 'Account';
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  /** The ID of an object */
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type CreateAccountInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CreateMessageInput = {
  roomId?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type CreateRoomInput = {
  name: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
};

export type CreateSessionInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};

export type Message = {
  __typename?: 'Message';
  account?: Maybe<Account>;
  id?: Maybe<Scalars['ID']['output']>;
  room?: Maybe<Room>;
  text?: Maybe<Scalars['String']['output']>;
};

export type Node = {
  /** The ID of the object. */
  id: Scalars['ID']['output'];
};

export type Room = {
  __typename?: 'Room';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
};

export type RootMutationType = {
  __typename?: 'RootMutationType';
  createAccount?: Maybe<Account>;
  /** Create Message */
  createMessage?: Maybe<Message>;
  createRoom?: Maybe<Room>;
  createSession?: Maybe<Session>;
  deleteMessage?: Maybe<Message>;
  deleteRoom?: Maybe<Room>;
  updateMessage?: Maybe<Message>;
  updateRoom?: Maybe<Room>;
};


export type RootMutationTypeCreateAccountArgs = {
  input: CreateAccountInput;
};


export type RootMutationTypeCreateMessageArgs = {
  input?: InputMaybe<CreateMessageInput>;
};


export type RootMutationTypeCreateRoomArgs = {
  input?: InputMaybe<CreateRoomInput>;
};


export type RootMutationTypeCreateSessionArgs = {
  input?: InputMaybe<CreateSessionInput>;
};


export type RootMutationTypeDeleteMessageArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type RootMutationTypeDeleteRoomArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type RootMutationTypeUpdateMessageArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  input?: InputMaybe<CreateMessageInput>;
};


export type RootMutationTypeUpdateRoomArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  input?: InputMaybe<CreateRoomInput>;
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  getAccounts?: Maybe<Array<Maybe<Account>>>;
  getMessagesByRoomId?: Maybe<Array<Maybe<Message>>>;
  getRooms?: Maybe<Array<Maybe<Room>>>;
  /** Health check */
  healthCheck?: Maybe<Scalars['Boolean']['output']>;
  me?: Maybe<Account>;
  node?: Maybe<Node>;
};


export type RootQueryTypeGetMessagesByRoomIdArgs = {
  roomId?: InputMaybe<Scalars['ID']['input']>;
};


export type RootQueryTypeNodeArgs = {
  id: Scalars['ID']['input'];
};

export type RootSubscriptionType = {
  __typename?: 'RootSubscriptionType';
  getMessagesByRoomIdSocket?: Maybe<Array<Maybe<Message>>>;
};


export type RootSubscriptionTypeGetMessagesByRoomIdSocketArgs = {
  id: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
};

export type Session = {
  __typename?: 'Session';
  account?: Maybe<Account>;
  token?: Maybe<Scalars['String']['output']>;
};

export type CreateAccountMutationVariables = Exact<{
  input: CreateAccountInput;
}>;


export type CreateAccountMutation = { __typename?: 'RootMutationType', createAccount?: { __typename?: 'Account', id: string } | null };


export const CreateAccountDocument = `
    mutation createAccount($input: CreateAccountInput!) {
  createAccount(input: $input) {
    id
  }
}
    `;
export const useCreateAccountMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateAccountMutation, TError, CreateAccountMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateAccountMutation, TError, CreateAccountMutationVariables, TContext>(
      ['createAccount'],
      (variables?: CreateAccountMutationVariables) => fetcher<CreateAccountMutation, CreateAccountMutationVariables>(client, CreateAccountDocument, variables, headers)(),
      options
    );