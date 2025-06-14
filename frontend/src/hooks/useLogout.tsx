import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

function useLogout() {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  async function logout() {
    setLoading(true);
    try {
      const res = await fetch("api/auth/logout", {
        method: "POST",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // Clear the auth user from context
      setAuthUser(null);
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return { loading, logout };
}

export default useLogout;
