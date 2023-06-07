import * as withAbsintheSocket from "@absinthe/socket";

export interface ActiveSockets {
  notifier: withAbsintheSocket.Notifier<
    {
      id: string;
    },
    {}
  >;
  absintheSocket: withAbsintheSocket.AbsintheSocket<{}>;
  observer: withAbsintheSocket.Observer<{ id: string; }>,
}
