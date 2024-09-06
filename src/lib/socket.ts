import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
  paymentSuccess: () => void;
  sessionData: (sessionId: string) => void;
}

interface ClientToServerEvents {
  leaveRoom: () => void;
  startGame: (gameId: string) => void;
  endGame: (gameId: string) => void;
}

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

export const initiateSocketConnection = (walletAddress: string) => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_API_URL ?? "", {
      query: { walletAddress },
    });

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });
  } else {
    console.log("Socket already initialized");
  }
};

export const getSocket = () => {
  if (!socket) {
    throw new Error(
      "Socket is not initialized. Please call initiateSocketConnection first."
    );
  }
  return socket;
};

export const leaveRoom = () => {
  if (socket) {
    socket.emit("leaveRoom");
    console.log("Left room.");
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    console.log("Disconnected from WebSocket server");
    socket = null; // Reset the socket instance
  }
};
