import { Search } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useConversationContext } from "../../../context/ConversationContext";
import useGetConversation from "../../../hooks/useGetConversation";

// SearchInput component for searching conversations
function SearchInput() {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversationContext();
  const { conversations } = useGetConversation();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!search.trim()) {
      toast.error("Please enter a search term");
      return;
    }
    if (search.length < 3) {
      toast.error("Search term must be at least 3 characters long");
      return;
    }

    const foundConversation = conversations.find(
      (conversation: ConversationType) =>
        conversation.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (foundConversation) {
      setSelectedConversation(foundConversation);
      setSearch("");
    } else {
      toast.error("No user found");
    }
  }

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search…"
        className="input input-sm md:input-md input-bordered rounded-full w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="btn btn-sm md:btn-md btn-circle bg-sky-500 text-white"
      >
        <Search className="w-4 h-4 md:w-6 md:h-6 outline-none" />
      </button>
    </form>
  );
}
export default SearchInput;
