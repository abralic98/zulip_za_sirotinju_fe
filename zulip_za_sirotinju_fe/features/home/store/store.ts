import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface Store {
  activeRoom: string | undefined
  setActiveRoom: (activeRoom: string | undefined) => void
}

interface Room{
name: string
id:string
unreadMessages:number
}
interface RoomsStore{
  rooms: Room[]
  setRooms: (rooms: Room[] ) => void
}

export const useRoomStore = create<Store>()(
  devtools((set) => ({
    activeRoom: undefined,
    setActiveRoom: (state) => set(() => ({ activeRoom: state }), false, 'selectedRoom'),
  }))
)

export const useRoomsStore= create<RoomsStore>()(
  devtools((set) => ({
    rooms: [],
    setRooms: (state) => set(() => ({ rooms: state }), false, 'rooms'),
  }))
)