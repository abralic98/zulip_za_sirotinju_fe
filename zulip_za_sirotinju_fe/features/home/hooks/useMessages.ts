import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRoomStore } from "../store/store";

// export const useMessages = () => {
//   const room = useRoomStore();
//   useQuery({
//     queryKey: ["getMessagesByRoomId", { roomId: room.activeRoom }],
//     queryFn: fetchMessages,
//   });
// };

export const useMessageSubscription = () => {
  useEffect(() => {
    console.log("uslo");
    const websocket = new WebSocket(
      "ws://localhost:4000/api/graphql/socket/?account_id=1"
    );
    console.log(websocket,'websocket');
    
    websocket.onopen = () => {
      console.log("connected");
    };
    websocket.onerror= () => {
      console.log("kurcina");
    };

    return () => {
      websocket.close();
    };
  }, []);
};
