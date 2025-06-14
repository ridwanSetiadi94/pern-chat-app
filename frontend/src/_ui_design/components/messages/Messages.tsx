import useChatScroll from "../../../hooks/useChatScroll";
import useGetMessages from "../../../hooks/useGetMessages";
import useListenMessages from "../../../hooks/useListenMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";

function Messages() {
  const { loading, messages } = useGetMessages();
  useListenMessages();
  const ref = useChatScroll(messages); // Custom hook to handle chat scrolling

  return (
    <div className="px-4 flex-1 overflow-auto" ref={ref}>
      {loading &&
        [...Array(3)].map((_, index) => <MessageSkeleton key={index} />)}

      {!loading &&
        Array.isArray(messages) &&
        messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}

      {!loading && Array.isArray(messages) && messages.length === 0 && (
        <div className="flex items-center justify-center w-full h-full">
          <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
            <p>No messages yet</p>
          </div>
        </div>
      )}
    </div>
  );
}
export default Messages;
