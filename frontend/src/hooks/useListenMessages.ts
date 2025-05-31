import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import { useConversationContext } from "../context/ConversationContext";
import notificationSound from "../_ui_design/assets/sounds/notification.mp3";

const audio = new Audio(notificationSound); // Preload the audio once when the module is loaded
audio.load(); // Preloads the sound into memory

function useListenMessages() {
  const { socket } = useSocketContext(); // Get the socket instance from the SocketContext
  const { setMessages } = useConversationContext(); // Get the setMessages function from the ConversationContext

  useEffect(() => {
    const handleNewMessage = (newMessage: MessageType) => {
      // Define the type of newMessage based on your application
      newMessage.shouldShake = true; // Optional: Add a property to the function if needed
      setMessages((prev) => [...prev, newMessage]); // Update the messages state with the new message
      audio.play(); // Play the notification sound when a new message is received
    };

    socket?.on("newMessage", handleNewMessage); // Listen for the 'newMessage' event from the server

    return () => {
      socket?.off("newMessage", handleNewMessage); // Cleanup the event listener when the component unmounts
    };
  }, [socket, setMessages]); // Listen for new messages and update the messages state
}

export default useListenMessages;
// This hook listens for new messages from the server and updates the conversation context
