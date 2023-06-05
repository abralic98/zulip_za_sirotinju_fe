import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface Store {
  activeRoom: string | undefined
  setActiveRoom: (activeRoom: string | undefined) => void
}

export const useRoomStore = create<Store>()(
  devtools((set) => ({
    activeRoom: undefined,
    setActiveRoom: (state) => set(() => ({ activeRoom: state }), false, 'selectedRoom'),
  }))
)