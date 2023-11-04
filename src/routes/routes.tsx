import React from "react";
import PATH from "./urls";

const ActivateAccount = React.lazy(() => import("../pages/ActivateAccount"));
const UpdateAccount = React.lazy(() => import("../pages/UpdateAccount"));
const SignIn = React.lazy(() => import("../pages/SignIn"));
const Home = React.lazy(() => import("../pages/Home"))

const authRoutes = [
  { path: PATH.ACTIVATE_ACCOUNT, element: <ActivateAccount /> },
  { path: PATH.SIGN_IN, element: <SignIn /> },
];

const accountActionsRoutes = [
  { path: PATH.UPDATE_ACCOUNT, element: <UpdateAccount /> }
]

const userRoutes = [
  { path: PATH.HOME, element: <Home /> },
]

export { authRoutes, userRoutes, accountActionsRoutes }
