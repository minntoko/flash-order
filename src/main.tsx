import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ModeProvider } from "./providers/ModeProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <ModeProvider>
      <App />
    </ModeProvider>
  </BrowserRouter>
  // </React.StrictMode>,
);
