import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type ConversationContextType = {
  selectedConversation: ConversationType | null;
  setSelectedConversation: Dispatch<SetStateAction<ConversationType | null>>;
  messages: MessageType[];
  setMessages: Dispatch<SetStateAction<MessageType[]>>;
};

const ConversationContext = createContext<ConversationContextType>({
  selectedConversation: null,
  setSelectedConversation: () => {},
  messages: [],
  setMessages: () => {},
});

export const useConversationContext = () => useContext(ConversationContext);

export const ConversationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<ConversationType | null>(null);

  return (
    <ConversationContext.Provider
      value={{
        messages,
        setMessages,
        selectedConversation,
        setSelectedConversation,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};
