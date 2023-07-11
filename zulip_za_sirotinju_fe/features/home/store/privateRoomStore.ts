import { Conversation } from "@/src/generated/graphql";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface PrivateStore{
  activeConversation: string | undefined;
  setActiveConversation: (activeConversation: string | undefined) => void;
}
interface PrivateRoomsStore {
  conversations: Conversation[];
  setConversations: (conversations: Conversation[]) => void;
}

export const usePrivateRoomStore = create<PrivateStore>()(
  devtools((set) => ({
    activeConversation: undefined,
    setActiveConversation: (state) =>
      set(() => ({ activeConversation: state }), false, "selectedPrivateRoom"),
  }))
);

export const usePrivateRoomsStore = create<PrivateRoomsStore>()(
  devtools((set) => ({
    conversations: [],
    setConversations: (state) =>
      set(() => ({ conversations: state }), false, "privateRooms"),
  }))
);