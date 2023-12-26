import { Server } from "https://deno.land/x/socket_io@0.1.1/mod.ts";
import { DefaultEventsMap } from "https://deno.land/x/socket_io@0.1.1/packages/event-emitter/mod.ts";

export function listen(
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, unknown>
) {
  io.on("connection", (socket) => {
    io.emit("message", "Hello from Deno! 🦕");
  });
}
