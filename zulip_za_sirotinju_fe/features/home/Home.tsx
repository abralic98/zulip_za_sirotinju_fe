import { Switcher } from "@/components/primitives/switcher";
import { Messages } from "./components/messages/Messages";
import { Notifications } from "./components/notifications/Notifications";
import { Rooms } from "./components/rooms/Rooms";
import { Users } from "./components/users/Users";
export const Home = () => {
  return (
    <Switcher gap={"0"}>
      <Rooms />
      <Messages />
      <Users />
      <Notifications/>
    </Switcher>
  );
};
