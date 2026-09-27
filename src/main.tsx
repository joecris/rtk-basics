import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import AppRoutes from "./routes/routes.tsx";

import { worker } from "./api/server.ts";

async function start() {
  // Start our mock API server
  worker.listen({ onUnhandledRequest: "bypass" });

  const root = createRoot(document.getElementById("root")!);

  root.render(
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    </StrictMode>,
  );
}

start();

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <Provider store={store}>
//       <BrowserRouter>
//         <AppRoutes />
//       </BrowserRouter>
//     </Provider>
//   </StrictMode>,
// );
