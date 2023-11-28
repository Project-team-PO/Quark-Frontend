import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Error404 from "./pages/Error404"

import { accountActionsRoutes, authRoutes, userRoutes, adminRoutes } from "./routes/routes"

import AuthLayout from "./layouts/AuthLayout"
import AccountActionsLayout from "./layouts/AccountActionsLayout"
import HomeLayout from "./layouts/HomeLayout"
import AdminLayout from "./layouts/AdminLayout"

import "./styles/global.css"

import ActionRoute from "./components/ProtectedRoutes/ActionRoute"
import UserRoute from "./components/ProtectedRoutes/UserRoute"

const App = () => {
  const router = createBrowserRouter([
    {
      element: <AuthLayout />,
      errorElement: <Error404 />,
      children: authRoutes
    },
    {
      element:
        <ActionRoute>
          <AccountActionsLayout />
        </ActionRoute>,
      errorElement: <Error404 />,
      children: accountActionsRoutes
    },
    {
      element:
        <UserRoute>
          <HomeLayout />
        </UserRoute>,
      errorElement: <Error404 />,
      children: userRoutes
    },
    {
      element: <AdminLayout />,
      errorElement: <Error404 />,
      children: adminRoutes
    }
  ])

  return <RouterProvider router={router} />
}

export default App