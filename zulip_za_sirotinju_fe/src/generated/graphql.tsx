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
  status?: Maybe<AccountStatus>;
  username?: Maybe<Scalars['String']['output']>;
};

export enum AccountStatus {
  Away = 'AWAY',
  Busy = 'BUSY',
  Offline = 'OFFLINE',
  Online = 'ONLINE'
}

export type Avatar = {
  __typename?: 'Avatar';
  fileName?: Maybe<Scalars['String']['output']>;
  filePath?: Maybe<Scalars['String']['output']>;
  insertedAt?: Maybe<Scalars['Datetime']['output']>;
};

export type Conversation = {
  __typename?: 'Conversation';
  id?: Maybe<Scalars['ID']['output']>;
  userOne?: Maybe<Account>;
  userTwo?: Maybe<Account>;
};

export type ConversationReply = Node & {
  __typename?: 'ConversationReply';
  account?: Maybe<Account>;
  conversation?: Maybe<Conversation>;
  /** The ID of an object */
  id: Scalars['ID']['output'];
  insertedAt?: Maybe<Scalars['Datetime']['output']>;
  text?: Maybe<Scalars['String']['output']>;
};

export type ConversationReplyConnection = {
  __typename?: 'ConversationReplyConnection';
  edges?: Maybe<Array<Maybe<ConversationReplyEdge>>>;
  pageInfo: PageInfo;
};

export type ConversationReplyEdge = {
  __typename?: 'ConversationReplyEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<ConversationReply>;
};

export type CreateAccountInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CreateConversationReplyInput = {
  conversationId?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type CreateFileInput = {
  fileName?: InputMaybe<Scalars['String']['input']>;
  filePath?: InputMaybe<Scalars['String']['input']>;
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

export type Message = Node & {
  __typename?: 'Message';
  account?: Maybe<Account>;
  /** The ID of an object */
  id: Scalars['ID']['output'];
  insertedAt?: Maybe<Scalars['Datetime']['output']>;
  room?: Maybe<Room>;
  text?: Maybe<Scalars['String']['output']>;
};

export type MessageConnection = {
  __typename?: 'MessageConnection';
  edges?: Maybe<Array<Maybe<MessageEdge>>>;
  pageInfo: PageInfo;
};

export type MessageEdge = {
  __typename?: 'MessageEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<Message>;
};

export type Node = {
  /** The ID of the object. */
  id: Scalars['ID']['output'];
};

export type Notification = {
  __typename?: 'Notification';
  account?: Maybe<Account>;
  id?: Maybe<Scalars['ID']['output']>;
  insertedAt?: Maybe<Scalars['Datetime']['output']>;
  message?: Maybe<Message>;
  room?: Maybe<Room>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type PrivateNotification = {
  __typename?: 'PrivateNotification';
  account?: Maybe<Account>;
  conversation?: Maybe<Conversation>;
  id?: Maybe<Scalars['ID']['output']>;
  insertedAt?: Maybe<Scalars['Datetime']['output']>;
  text?: Maybe<ConversationReply>;
};

export type Room = {
  __typename?: 'Room';
  id?: Maybe<Scalars['ID']['output']>;
  isPasswordProtected?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type RootMutationType = {
  __typename?: 'RootMutationType';
  /** Enter Protected Room */
  accessProtectedRoom?: Maybe<Scalars['Boolean']['output']>;
  /** Register */
  createAccount?: Maybe<Account>;
  /** Create Private Conversation */
  createConversation?: Maybe<Conversation>;
  /** Send Private Message */
  createConversationReply?: Maybe<ConversationReply>;
  /** Create Message */
  createMessage?: Maybe<Message>;
  /** Create Room */
  createRoom?: Maybe<Room>;
  /** Create Session */
  createSession?: Maybe<Session>;
  /** Delete Message */
  deleteMessage?: Maybe<Message>;
  /** Delete Room */
  deleteRoom?: Maybe<Room>;
  /** Update Account Status */
  updateAccountStatus?: Maybe<Account>;
  /** Update Message */
  updateMessage?: Maybe<Message>;
  /** Update Profile Info */
  updateProfile?: Maybe<Account>;
  /** Update Room */
  updateRoom?: Maybe<Room>;
  /** Upload Image */
  uploadAvatar?: Maybe<Avatar>;
};


export type RootMutationTypeAccessProtectedRoomArgs = {
  password: Scalars['String']['input'];
  roomId: Scalars['ID']['input'];
};


export type RootMutationTypeCreateAccountArgs = {
  input: CreateAccountInput;
};


export type RootMutationTypeCreateConversationArgs = {
  userTwo: Scalars['ID']['input'];
};


export type RootMutationTypeCreateConversationReplyArgs = {
  input?: InputMaybe<CreateConversationReplyInput>;
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


export type RootMutationTypeUpdateAccountStatusArgs = {
  status?: InputMaybe<AccountStatus>;
};


export type RootMutationTypeUpdateMessageArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  input?: InputMaybe<CreateMessageInput>;
};


export type RootMutationTypeUpdateProfileArgs = {
  input?: InputMaybe<UpdateProfileInput>;
};


export type RootMutationTypeUpdateRoomArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  input?: InputMaybe<CreateRoomInput>;
};


export type RootMutationTypeUploadAvatarArgs = {
  avatar: CreateFileInput;
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  /** Get All Accounts */
  getAccounts?: Maybe<Array<Maybe<Account>>>;
  /** Paginated Private Messages in Conversation */
  getConversationRepliesByConversationId?: Maybe<ConversationReplyConnection>;
  /** Paginated Messages in Room */
  getMessagesByRoomId?: Maybe<MessageConnection>;
  /** Get All Rooms */
  getRooms?: Maybe<Array<Maybe<Room>>>;
  /** Get User Avatar */
  getUserAvatar?: Maybe<Avatar>;
  /** Get User Avatar Id */
  getUserAvatarId?: Maybe<Avatar>;
  /** Get User Private Conversations */
  getUserConversations?: Maybe<Array<Maybe<Conversation>>>;
  /** Health check */
  healthCheck?: Maybe<Scalars['Boolean']['output']>;
  /** Get User */
  me?: Maybe<Account>;
  node?: Maybe<Node>;
};


export type RootQueryTypeGetConversationRepliesByConversationIdArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  conversationId?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQueryTypeGetMessagesByRoomIdArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  roomId?: InputMaybe<Scalars['ID']['input']>;
};


export type RootQueryTypeGetUserAvatarIdArgs = {
  userId: Scalars['ID']['input'];
};


export type RootQueryTypeNodeArgs = {
  id: Scalars['ID']['input'];
};

/** Get Messages By Room Id Socket */
export type RootSubscriptionType = {
  __typename?: 'RootSubscriptionType';
  /** Get Accounts Socket */
  getAccounts?: Maybe<Array<Maybe<Account>>>;
  /** Get Conversation Reply Socket */
  getConversationRepliesByConversationId?: Maybe<ConversationReply>;
  /** Get User Private Conversations Socket */
  getConversationsSubscription?: Maybe<Array<Maybe<Conversation>>>;
  getMessagesByRoomIdSocket?: Maybe<Message>;
  /** Get Rooms Socket */
  getRoomsSubscription?: Maybe<Array<Maybe<Room>>>;
  /** Get Public Notifications */
  notifications?: Maybe<Notification>;
  /** Get Private Notifications */
  privateNotifications?: Maybe<PrivateNotification>;
};


/** Get Messages By Room Id Socket */
export type RootSubscriptionTypeGetConversationRepliesByConversationIdArgs = {
  id: Scalars['ID']['input'];
};


/** Get Messages By Room Id Socket */
export type RootSubscriptionTypeGetMessagesByRoomIdSocketArgs = {
  id: Scalars['ID']['input'];
};

export type Session = {
  __typename?: 'Session';
  account?: Maybe<Account>;
  token?: Maybe<Scalars['String']['output']>;
};

export type UpdateProfileInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type CreateAccountMutationVariables = Exact<{
  input: CreateAccountInput;
}>;


export type CreateAccountMutation = { __typename?: 'RootMutationType', createAccount?: { __typename?: 'Account', id: string } | null };

export type CreateSessionMutationVariables = Exact<{
  input?: InputMaybe<CreateSessionInput>;
}>;


export type CreateSessionMutation = { __typename?: 'RootMutationType', createSession?: { __typename?: 'Session', token?: string | null } | null };

export type UpdateAccountStatusMutationVariables = Exact<{
  status?: InputMaybe<AccountStatus>;
}>;


export type UpdateAccountStatusMutation = { __typename?: 'RootMutationType', updateAccountStatus?: { __typename?: 'Account', status?: AccountStatus | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'RootQueryType', me?: { __typename?: 'Account', id: string, username?: string | null, firstName?: string | null, lastName?: string | null, email?: string | null, status?: AccountStatus | null } | null };

export type CreateMessageMutationVariables = Exact<{
  input?: InputMaybe<CreateMessageInput>;
}>;


export type CreateMessageMutation = { __typename?: 'RootMutationType', createMessage?: { __typename?: 'Message', id: string } | null };

export type CreateRoomMutationVariables = Exact<{
  input?: InputMaybe<CreateRoomInput>;
}>;


export type CreateRoomMutation = { __typename?: 'RootMutationType', createRoom?: { __typename?: 'Room', id?: string | null } | null };

export type UploadAvatarMutationVariables = Exact<{
  avatar: CreateFileInput;
}>;


export type UploadAvatarMutation = { __typename?: 'RootMutationType', uploadAvatar?: { __typename?: 'Avatar', filePath?: string | null, fileName?: string | null } | null };

export type UpdateProfileMutationVariables = Exact<{
  input?: InputMaybe<UpdateProfileInput>;
}>;


export type UpdateProfileMutation = { __typename?: 'RootMutationType', updateProfile?: { __typename?: 'Account', id: string } | null };

export type AccessProtectedRoomMutationVariables = Exact<{
  password: Scalars['String']['input'];
  roomId: Scalars['ID']['input'];
}>;


export type AccessProtectedRoomMutation = { __typename?: 'RootMutationType', accessProtectedRoom?: boolean | null };

export type CreateConversationReplyMutationVariables = Exact<{
  input?: InputMaybe<CreateConversationReplyInput>;
}>;


export type CreateConversationReplyMutation = { __typename?: 'RootMutationType', createConversationReply?: { __typename?: 'ConversationReply', id: string } | null };

export type GetMessagesByRoomIdQueryVariables = Exact<{
  roomId?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetMessagesByRoomIdQuery = { __typename?: 'RootQueryType', getMessagesByRoomId?: { __typename?: 'MessageConnection', edges?: Array<{ __typename?: 'MessageEdge', node?: { __typename?: 'Message', text?: string | null, insertedAt?: any | null, id: string, account?: { __typename?: 'Account', username?: string | null, id: string } | null } | null } | null> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, endCursor?: string | null, startCursor?: string | null } } | null };

export type GetRoomsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRoomsQuery = { __typename?: 'RootQueryType', getRooms?: Array<{ __typename?: 'Room', id?: string | null, name?: string | null, isPasswordProtected?: boolean | null } | null> | null };

export type GetAccountsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAccountsQuery = { __typename?: 'RootQueryType', getAccounts?: Array<{ __typename?: 'Account', username?: string | null, status?: AccountStatus | null, id: string } | null> | null };

export type GetUserAvatarQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserAvatarQuery = { __typename?: 'RootQueryType', getUserAvatar?: { __typename?: 'Avatar', fileName?: string | null, filePath?: string | null } | null };

export type GetUserAvatarIdQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type GetUserAvatarIdQuery = { __typename?: 'RootQueryType', getUserAvatarId?: { __typename?: 'Avatar', fileName?: string | null, filePath?: string | null } | null };

export type GetUserConversationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserConversationsQuery = { __typename?: 'RootQueryType', getUserConversations?: Array<{ __typename?: 'Conversation', id?: string | null, userOne?: { __typename?: 'Account', username?: string | null, status?: AccountStatus | null, id: string } | null, userTwo?: { __typename?: 'Account', username?: string | null, status?: AccountStatus | null, id: string } | null } | null> | null };

export type GetConversationRepliesByConversationIdQueryVariables = Exact<{
  conversationId?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetConversationRepliesByConversationIdQuery = { __typename?: 'RootQueryType', getConversationRepliesByConversationId?: { __typename?: 'ConversationReplyConnection', edges?: Array<{ __typename?: 'ConversationReplyEdge', node?: { __typename?: 'ConversationReply', text?: string | null, insertedAt?: any | null, id: string, account?: { __typename?: 'Account', username?: string | null, id: string } | null } | null } | null> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, endCursor?: string | null, startCursor?: string | null } } | null };


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
export const UpdateAccountStatusDocument = `
    mutation updateAccountStatus($status: AccountStatus) {
  updateAccountStatus(status: $status) {
    status
  }
}
    `;
export const useUpdateAccountStatusMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateAccountStatusMutation, TError, UpdateAccountStatusMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateAccountStatusMutation, TError, UpdateAccountStatusMutationVariables, TContext>(
      ['updateAccountStatus'],
      (variables?: UpdateAccountStatusMutationVariables) => fetcher<UpdateAccountStatusMutation, UpdateAccountStatusMutationVariables>(client, UpdateAccountStatusDocument, variables, headers)(),
      options
    );
export const MeDocument = `
    query me {
  me {
    id
    username
    firstName
    lastName
    email
    status
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
export const CreateRoomDocument = `
    mutation createRoom($input: CreateRoomInput) {
  createRoom(input: $input) {
    id
  }
}
    `;
export const useCreateRoomMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateRoomMutation, TError, CreateRoomMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateRoomMutation, TError, CreateRoomMutationVariables, TContext>(
      ['createRoom'],
      (variables?: CreateRoomMutationVariables) => fetcher<CreateRoomMutation, CreateRoomMutationVariables>(client, CreateRoomDocument, variables, headers)(),
      options
    );
export const UploadAvatarDocument = `
    mutation uploadAvatar($avatar: CreateFileInput!) {
  uploadAvatar(avatar: $avatar) {
    filePath
    fileName
  }
}
    `;
export const useUploadAvatarMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UploadAvatarMutation, TError, UploadAvatarMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UploadAvatarMutation, TError, UploadAvatarMutationVariables, TContext>(
      ['uploadAvatar'],
      (variables?: UploadAvatarMutationVariables) => fetcher<UploadAvatarMutation, UploadAvatarMutationVariables>(client, UploadAvatarDocument, variables, headers)(),
      options
    );
export const UpdateProfileDocument = `
    mutation updateProfile($input: UpdateProfileInput) {
  updateProfile(input: $input) {
    id
  }
}
    `;
export const useUpdateProfileMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateProfileMutation, TError, UpdateProfileMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateProfileMutation, TError, UpdateProfileMutationVariables, TContext>(
      ['updateProfile'],
      (variables?: UpdateProfileMutationVariables) => fetcher<UpdateProfileMutation, UpdateProfileMutationVariables>(client, UpdateProfileDocument, variables, headers)(),
      options
    );
export const AccessProtectedRoomDocument = `
    mutation accessProtectedRoom($password: String!, $roomId: ID!) {
  accessProtectedRoom(password: $password, roomId: $roomId)
}
    `;
export const useAccessProtectedRoomMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AccessProtectedRoomMutation, TError, AccessProtectedRoomMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<AccessProtectedRoomMutation, TError, AccessProtectedRoomMutationVariables, TContext>(
      ['accessProtectedRoom'],
      (variables?: AccessProtectedRoomMutationVariables) => fetcher<AccessProtectedRoomMutation, AccessProtectedRoomMutationVariables>(client, AccessProtectedRoomDocument, variables, headers)(),
      options
    );
export const CreateConversationReplyDocument = `
    mutation createConversationReply($input: CreateConversationReplyInput) {
  createConversationReply(input: $input) {
    id
  }
}
    `;
export const useCreateConversationReplyMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateConversationReplyMutation, TError, CreateConversationReplyMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateConversationReplyMutation, TError, CreateConversationReplyMutationVariables, TContext>(
      ['createConversationReply'],
      (variables?: CreateConversationReplyMutationVariables) => fetcher<CreateConversationReplyMutation, CreateConversationReplyMutationVariables>(client, CreateConversationReplyDocument, variables, headers)(),
      options
    );
export const GetMessagesByRoomIdDocument = `
    query getMessagesByRoomId($roomId: ID, $first: Int, $after: String) {
  getMessagesByRoomId(roomId: $roomId, first: $first, after: $after) {
    edges {
      node {
        account {
          username
          id
        }
        text
        insertedAt
        id
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      endCursor
      startCursor
    }
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
    isPasswordProtected
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
export const GetAccountsDocument = `
    query getAccounts {
  getAccounts {
    username
    status
    id
  }
}
    `;
export const useGetAccountsQuery = <
      TData = GetAccountsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetAccountsQueryVariables,
      options?: UseQueryOptions<GetAccountsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetAccountsQuery, TError, TData>(
      variables === undefined ? ['getAccounts'] : ['getAccounts', variables],
      fetcher<GetAccountsQuery, GetAccountsQueryVariables>(client, GetAccountsDocument, variables, headers),
      options
    );
export const GetUserAvatarDocument = `
    query getUserAvatar {
  getUserAvatar {
    fileName
    filePath
  }
}
    `;
export const useGetUserAvatarQuery = <
      TData = GetUserAvatarQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetUserAvatarQueryVariables,
      options?: UseQueryOptions<GetUserAvatarQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetUserAvatarQuery, TError, TData>(
      variables === undefined ? ['getUserAvatar'] : ['getUserAvatar', variables],
      fetcher<GetUserAvatarQuery, GetUserAvatarQueryVariables>(client, GetUserAvatarDocument, variables, headers),
      options
    );
export const GetUserAvatarIdDocument = `
    query getUserAvatarId($userId: ID!) {
  getUserAvatarId(userId: $userId) {
    fileName
    filePath
  }
}
    `;
export const useGetUserAvatarIdQuery = <
      TData = GetUserAvatarIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetUserAvatarIdQueryVariables,
      options?: UseQueryOptions<GetUserAvatarIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetUserAvatarIdQuery, TError, TData>(
      ['getUserAvatarId', variables],
      fetcher<GetUserAvatarIdQuery, GetUserAvatarIdQueryVariables>(client, GetUserAvatarIdDocument, variables, headers),
      options
    );
export const GetUserConversationsDocument = `
    query getUserConversations {
  getUserConversations {
    id
    userOne {
      username
      status
      id
    }
    userTwo {
      username
      status
      id
    }
  }
}
    `;
export const useGetUserConversationsQuery = <
      TData = GetUserConversationsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetUserConversationsQueryVariables,
      options?: UseQueryOptions<GetUserConversationsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetUserConversationsQuery, TError, TData>(
      variables === undefined ? ['getUserConversations'] : ['getUserConversations', variables],
      fetcher<GetUserConversationsQuery, GetUserConversationsQueryVariables>(client, GetUserConversationsDocument, variables, headers),
      options
    );
export const GetConversationRepliesByConversationIdDocument = `
    query getConversationRepliesByConversationId($conversationId: ID, $first: Int, $after: String) {
  getConversationRepliesByConversationId(
    conversationId: $conversationId
    first: $first
    after: $after
  ) {
    edges {
      node {
        account {
          username
          id
        }
        text
        insertedAt
        id
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      endCursor
      startCursor
    }
  }
}
    `;
export const useGetConversationRepliesByConversationIdQuery = <
      TData = GetConversationRepliesByConversationIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetConversationRepliesByConversationIdQueryVariables,
      options?: UseQueryOptions<GetConversationRepliesByConversationIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetConversationRepliesByConversationIdQuery, TError, TData>(
      variables === undefined ? ['getConversationRepliesByConversationId'] : ['getConversationRepliesByConversationId', variables],
      fetcher<GetConversationRepliesByConversationIdQuery, GetConversationRepliesByConversationIdQueryVariables>(client, GetConversationRepliesByConversationIdDocument, variables, headers),
      options
    );