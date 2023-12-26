import { listen } from "./socket.ts";
import { serve } from "https://deno.land/std@0.150.0/http/server.ts";
import { Server } from "https://deno.land/x/socket_io@0.1.1/mod.ts";
import { ConnInfo } from "https://deno.land/x/socket_io@0.1.1/deps.ts";
import {
  serveDir,
  serveFile,
} from "https://deno.land/std@0.207.0/http/file_server.ts";

const io = new Server();

listen(io);

await serve(
  (req: Request, connInfo: ConnInfo) => {
    const pathname = new URL(req.url).pathname;

    if (pathname.startsWith("/assets")) {
      return serveDir(req, {
        fsRoot: "../client/dist",
      });
    }

    if (pathname === "/") {
      return serveFile(req, "../client/dist/index.html");
    }

    return io.handler()(req, connInfo);
  },
  {
    port: 3000,
  }
);
