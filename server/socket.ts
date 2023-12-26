import { Server } from "npm:socket.io@4.7.2";
import { DefaultEventsMap } from "https://deno.land/x/socket_io@0.1.1/packages/event-emitter/mod.ts";

export function listen(
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, unknown>
) {
  io.on("connection", (socket) => {
    socket.on("message", (message) => {
      console.log(message);
      socket.broadcast.emit("newMessage", message);
    });
  });
}
