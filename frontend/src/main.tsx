import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { ConversationContextProvider } from "./context/ConversationContext.tsx";
import SocketContextProvider from "./context/SocketContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ConversationContextProvider>
          <SocketContextProvider>
            <App />
          </SocketContextProvider>
        </ConversationContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
