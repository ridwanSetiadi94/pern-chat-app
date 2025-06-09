import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  useRef,
} from "react";
import { useAuthContext } from "./AuthContext";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  // Define the shape of the context
  socket: Socket | null; // The socket instance
  onlineUsers: string[]; // List of online users
}

const SocketContext = createContext<SocketContextType | undefined>(undefined); // Create the context

export function useSocketContext(): SocketContextType {
  // Custom hook to use the SocketContext
  const context = useContext(SocketContext); // Get the context value
  if (context === undefined) {
    // If context is undefined, throw an error
    throw new Error("useSocketContext must be used within a SocketProvider"); // Ensure the hook is used within the provider
  }
  return context; // Return the context value
}

const socketURL = import.meta.env.VITE_BACKEND_URL;
console.log("Socket URL:", socketURL); // Log the socket URL for debugging

export function SocketContextProvider({ children }: { children: ReactNode }) {
  // Create a provider component
  const socketRef = useRef<Socket | null>(null); // Reference to the socket instance

  const [onlineUsers, setOnlineUsers] = useState<string[]>([]); // State to hold the list of online users
  const { authUser, isLoading } = useAuthContext(); // Get auth user and loading state from AuthContext

  useEffect(() => {
    // Effect to establish the socket connection
    if (authUser && !isLoading) {
      // Check if authUser is available and not loading
      const socket = io(socketURL, {
        // Initialize the socket connection
        query: {
          // Pass the user ID as a query parameter
          userId: authUser.id, // Assuming authUser has an id property
        },
      });
      socketRef.current = socket; // Store the socket instance in the ref

      socket.on("getOnlineUsers", (users: string[]) => {
        // Listen for the 'getOnlineUsers' event
        setOnlineUsers(users); // Update the online users state
      });

      return () => {
        // Cleanup function to disconnect the socket when the component unmounts
        socket.close(); // Clean up the socket connection
        socketRef.current = null; // Reset the socket reference
      };
    } else if (!authUser && !isLoading) {
      // If authUser is not available, reset the online users state
      if (socketRef.current) {
        // Check if the socket reference exists
        socketRef.current.close(); // Close the existing socket connection
        socketRef.current = null; // Reset the socket reference
      }
    }
  }, [authUser, isLoading]); // Dependencies for the effect

  return (
    <SocketContext.Provider // Provide the context value
      value={{
        socket: socketRef.current, // Provide the current socket instance
        onlineUsers, // Provide the list of online users
      }}
    >
      {children} {/* Render the children components */}
    </SocketContext.Provider>
  );
}

export default SocketContextProvider; // Export the SocketContextProvider component
