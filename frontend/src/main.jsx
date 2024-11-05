import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import { SocketProvider } from "./socket/SocketContext.jsx";
import store from "./redux/store.js";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <SocketProvider>
          <ToastContainer
            style={{
              zIndex: 999,
            }}
          />
          <App />
        </SocketProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
