import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Error404 from "./pages/Error404"

import authRoutes from "./routes/authRoutes"

import AuthLayout from "./layouts/AuthLayout"

import "./styles/global.css"

const App = () => {
  const router = createBrowserRouter([
    {
      element: <AuthLayout />,
      errorElement: <Error404 />,
      children: authRoutes
    }
  ])

  return <RouterProvider router={router} />
}

export default App