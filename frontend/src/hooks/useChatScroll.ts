import { useEffect, useRef } from "react";

function useChatScroll(dep: any) {
  const ref = useRef<HTMLDivElement | null>(null); // Reference to the chat container

  useEffect(() => {
    setTimeout(() => {
      if (ref.current) {
        // Scroll to the bottom of the chat container
        ref.current.scrollTop = ref.current.scrollHeight;
      }
    }, 100); // Timeout to ensure the DOM is updated before scrolling
  }, [dep]); // Dependency array to trigger the effect when dep changes

  return ref; // Return the reference to the chat container
}
export default useChatScroll;
