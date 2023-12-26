import { listen } from "./socket.ts";
import { Server } from "npm:socket.io@4.7.2";
import express from "npm:express@4.17.1";
import { createServer } from "node:http";
import path from "node:path";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static(path.join("..", "client", "dist")));
app.use("/", express.static(path.join("..", "client", "dist", "index.html")));

listen(io);

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
