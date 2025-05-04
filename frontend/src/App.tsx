import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./_ui_design/pages/Home";
import SignUp from "./_ui_design/pages/SignUp";
import Login from "./_ui_design/pages/Login";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser, isLoading } = useAuthContext();
  console.log("Auth User", authUser);

  if (isLoading) {
    return null;
  }

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        {!authUser ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
