import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./store";
import Dashboard from "./components/Layout/Dashboard";
import theme from "./chakraTheme";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
]);

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ChakraProvider>
  );
}
