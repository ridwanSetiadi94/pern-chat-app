import { useAuthContext } from "../../../context/AuthContext";
import { useConversationContext } from "../../../context/ConversationContext";
import { extractTime } from "../../../utils/extractTime";

function Message({ message }: { message: MessageType }) {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversationContext();

  const fromMe = message?.senderId === authUser?.id;
  const img = fromMe ? authUser?.profilePic : selectedConversation?.profilePic;
  const chatClass = fromMe ? "chat-end" : "chat-start";

  const bubbleBg = fromMe && "bg-blue-500";
  const shakeClass = message.shouldShake ? "shake" : "";
  console.log(shakeClass);

  return (
    <div className={`chat ${chatClass}`}>
      <div className="hidden md:block chat-image avatar">
        <div className="w-6 md:w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={img} />
        </div>
      </div>
      <p
        className={`chat-bubble text-white ${bubbleBg} text-sm md:text-md ${shakeClass}`}
      >
        {message.body}
      </p>
      <span className="chat-footer opacity-50 text-xs flex gap-1 items-center text-white">
        {extractTime(message.createdAt)}
      </span>
    </div>
  );
}

export default Message;
