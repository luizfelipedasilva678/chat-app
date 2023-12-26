import { Server } from "npm:socket.io@4.7.2";
import { DefaultEventsMap } from "https://deno.land/x/socket_io@0.1.1/packages/event-emitter/mod.ts";
import getId from "./utils/getId.ts";

const messages: {
  id: number;
  userName: string;
  message: string;
}[] = [];

export function listen(
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, unknown>
) {
  io.on("connection", (socket) => {
    socket.emit("initialMessages", messages);

    socket.on("newMessage", (message) => {
      const id = getId(messages);

      Object.assign(message, { id });
      messages.push(message);

      io.emit("newMessages", messages);
    });
  });
}
