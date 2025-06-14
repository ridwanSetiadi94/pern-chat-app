import { useEffect, useState } from "react";
import { useConversationContext } from "../context/ConversationContext";
import toast from "react-hot-toast";

function useGetMessages() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } =
    useConversationContext();

  useEffect(() => {
    async function getMessages() {
      if (!selectedConversation) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${selectedConversation.id}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        console.log("Fetched messages:", data);

        setMessages(data);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    getMessages();
  }, [selectedConversation, setMessages]);

  return { loading, messages };
}

export default useGetMessages;
