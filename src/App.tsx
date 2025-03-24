import { createBrowserRouter, RouterProvider } from "react-router";

import { CAuthProvider } from "@/components/layouts";

import routes from "./routes";

let router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <CAuthProvider>
        <RouterProvider router={router} />
      </CAuthProvider>
    </>
  );
}

export default App;
