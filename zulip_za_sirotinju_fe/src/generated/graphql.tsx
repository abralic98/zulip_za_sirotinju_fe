import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
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
  Datetime: { input: any; output: any; }
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
  insertedAt?: Maybe<Scalars['Datetime']['output']>;
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

export type CreateSessionMutationVariables = Exact<{
  input?: InputMaybe<CreateSessionInput>;
}>;


export type CreateSessionMutation = { __typename?: 'RootMutationType', createSession?: { __typename?: 'Session', token?: string | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'RootQueryType', me?: { __typename?: 'Account', id: string, username?: string | null, email?: string | null } | null };

export type CreateMessageMutationVariables = Exact<{
  input?: InputMaybe<CreateMessageInput>;
}>;


export type CreateMessageMutation = { __typename?: 'RootMutationType', createMessage?: { __typename?: 'Message', id?: string | null } | null };

export type GetMessagesByRoomIdQueryVariables = Exact<{
  roomId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetMessagesByRoomIdQuery = { __typename?: 'RootQueryType', getMessagesByRoomId?: Array<{ __typename?: 'Message', text?: string | null, id?: string | null, insertedAt?: any | null, account?: { __typename?: 'Account', username?: string | null, id: string } | null } | null> | null };

export type GetRoomsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRoomsQuery = { __typename?: 'RootQueryType', getRooms?: Array<{ __typename?: 'Room', id?: string | null, name?: string | null } | null> | null };


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
export const CreateSessionDocument = `
    mutation createSession($input: CreateSessionInput) {
  createSession(input: $input) {
    token
  }
}
    `;
export const useCreateSessionMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateSessionMutation, TError, CreateSessionMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateSessionMutation, TError, CreateSessionMutationVariables, TContext>(
      ['createSession'],
      (variables?: CreateSessionMutationVariables) => fetcher<CreateSessionMutation, CreateSessionMutationVariables>(client, CreateSessionDocument, variables, headers)(),
      options
    );
export const MeDocument = `
    query me {
  me {
    id
    username
    email
  }
}
    `;
export const useMeQuery = <
      TData = MeQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: MeQueryVariables,
      options?: UseQueryOptions<MeQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<MeQuery, TError, TData>(
      variables === undefined ? ['me'] : ['me', variables],
      fetcher<MeQuery, MeQueryVariables>(client, MeDocument, variables, headers),
      options
    );
export const CreateMessageDocument = `
    mutation createMessage($input: CreateMessageInput) {
  createMessage(input: $input) {
    id
  }
}
    `;
export const useCreateMessageMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateMessageMutation, TError, CreateMessageMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateMessageMutation, TError, CreateMessageMutationVariables, TContext>(
      ['createMessage'],
      (variables?: CreateMessageMutationVariables) => fetcher<CreateMessageMutation, CreateMessageMutationVariables>(client, CreateMessageDocument, variables, headers)(),
      options
    );
export const GetMessagesByRoomIdDocument = `
    query getMessagesByRoomId($roomId: ID) {
  getMessagesByRoomId(roomId: $roomId) {
    account {
      username
      id
    }
    text
    id
    insertedAt
  }
}
    `;
export const useGetMessagesByRoomIdQuery = <
      TData = GetMessagesByRoomIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetMessagesByRoomIdQueryVariables,
      options?: UseQueryOptions<GetMessagesByRoomIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetMessagesByRoomIdQuery, TError, TData>(
      variables === undefined ? ['getMessagesByRoomId'] : ['getMessagesByRoomId', variables],
      fetcher<GetMessagesByRoomIdQuery, GetMessagesByRoomIdQueryVariables>(client, GetMessagesByRoomIdDocument, variables, headers),
      options
    );
export const GetRoomsDocument = `
    query getRooms {
  getRooms {
    id
    name
  }
}
    `;
export const useGetRoomsQuery = <
      TData = GetRoomsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetRoomsQueryVariables,
      options?: UseQueryOptions<GetRoomsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetRoomsQuery, TError, TData>(
      variables === undefined ? ['getRooms'] : ['getRooms', variables],
      fetcher<GetRoomsQuery, GetRoomsQueryVariables>(client, GetRoomsDocument, variables, headers),
      options
    );