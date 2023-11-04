import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Error404 from "./pages/Error404"

import { accountActionsRoutes, authRoutes, userRoutes } from "./routes/routes"

import AuthLayout from "./layouts/AuthLayout"
import AccountActionsLayout from "./layouts/AccountActionsLayout"

import "./styles/global.css"

const App = () => {
  const router = createBrowserRouter([
    {
      element: <AuthLayout />,
      errorElement: <Error404 />,
      children: authRoutes
    },
    {
      element: <AccountActionsLayout />,
      errorElement: <Error404 />,
      children: accountActionsRoutes
    },
    {
      errorElement: <Error404 />,
      children: userRoutes
    }
  ])

  return <RouterProvider router={router} />
}

export default App