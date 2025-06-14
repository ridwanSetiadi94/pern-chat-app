import useGetConversation from "../../../hooks/useGetConversation";
import { getRandomEmoji } from "../../../utils/emojis";
import Conversation from "./Conversation";

// Conversations component to display a list of users
const Conversations = () => {
  const { loading, conversations } = useGetConversation();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {Array.isArray(conversations) &&
        conversations.map((conversation) => (
          <Conversation
            key={conversation.id}
            conversation={conversation}
            emoji={getRandomEmoji()}
          />
        ))}
      {loading && <span className="loading loading-spinner mx-auto"></span>}
      {!loading &&
        Array.isArray(conversations) &&
        conversations.length === 0 && (
          <p className="text-gray-400 text-center">No conversations found</p>
        )}
    </div>
  );
};
export default Conversations;
