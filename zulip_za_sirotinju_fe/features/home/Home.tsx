import { Switcher } from "@/components/primitives/switcher";
import { Notifications } from "./components/notifications/Notifications";
import { PrivateNotifications } from "./components/privateNotifications/PrivateNotifications";
import { Rooms } from "./components/rooms/Rooms";
import { Users } from "./components/users/Users";
import { RenderMessages } from "./RenderMessages";
export const Home = () => {

  return (
    <Switcher gap={"0"}>
      <Rooms />
      <RenderMessages/>
      <Users />
      <Notifications />
      <PrivateNotifications/>
    </Switcher>
  );
};
