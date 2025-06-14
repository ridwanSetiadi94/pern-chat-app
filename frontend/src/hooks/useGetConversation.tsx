import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Custom hook to fetch user list
function useGetConversation() {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState<ConversationType[]>([]);

  useEffect(() => {
    async function getConversations() {
      setLoading(true);
      try {
        const res = await fetch("/api/messages/conversations");
        const data = await res.json();
        if (data.error) throw new Error(data.error);

        setConversations(data);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    // Call the function to fetch conversations
    getConversations();
  }, []);
  return { loading, conversations };
}

export default useGetConversation;
