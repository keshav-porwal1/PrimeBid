
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "@/store/store.js";
import { Provider } from "react-redux";

// Apply theme on load
const savedTheme = localStorage.getItem("theme");
document.documentElement.classList.toggle("dark", savedTheme === "dark");

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
