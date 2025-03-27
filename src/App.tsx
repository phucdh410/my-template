import { createBrowserRouter, RouterProvider } from "react-router";

import { Toaster } from "sonner";

import { CAuthProvider } from "@/components/layouts";

import routes from "./routes";

let router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <CAuthProvider>
        <RouterProvider router={router} />
      </CAuthProvider>

      <Toaster position="top-right" visibleToasts={4} richColors />
    </>
  );
}

export default App;
