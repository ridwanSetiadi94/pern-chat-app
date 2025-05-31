import { useConversationContext } from "../../../context/ConversationContext";
import { useSocketContext } from "../../../context/SocketContext";

//Conversation component to display a single user
const Conversation = ({
  conversation,
  emoji,
}: {
  conversation: ConversationType;
  emoji: string;
}) => {
  const { selectedConversation, setSelectedConversation } =
    useConversationContext(); // Get selected conversation (user) and setter from ConversationContext
  const isSelected = selectedConversation?.id === conversation.id; // Check if the conversation is selected

  const { onlineUsers } = useSocketContext(); // Get online users from SocketContext
  const isOnline = onlineUsers.includes(conversation.id); // Check if the user is online
  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          isSelected && "bg-sky-500"
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div
          className={`avatar ${isOnline ? "avatar-online" : "avatar-offline"}`}
        >
          <div className="w-8 md:w-12 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200 text-sm md:text-md">
              {conversation.fullName}
            </p>
            <span className="text-xl hidden md:inline-block">{emoji}</span>
          </div>
        </div>
      </div>

      <div className="divider my-0 py-0 h-1" />
    </>
  );
};

export default Conversation;
