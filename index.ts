import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Handle socket connection
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle IncomingData event
  socket.on("IncomingData", (data) => {
    console.log("Informacion Recibida:", data);

    // Emit event to front-end
    io.emit("IncomingData", data);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
const port = 5555;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
