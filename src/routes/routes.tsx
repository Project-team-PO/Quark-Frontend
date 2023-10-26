import React from "react";
import PATH from "./urls";

const ActivateAccount = React.lazy(() => import("../pages/ActivateAccount"));
const UpdateAccount = React.lazy(() => import("../pages/UpdateAccount"));
const SignIn = React.lazy(() => import("../pages/SignIn"));

const authRoutes = [
  { path: PATH.ACTIVATE_ACCOUNT, element: <ActivateAccount /> },
  { path: PATH.SIGN_IN, element: <SignIn /> }
];

const userRoutes = [
  { path: PATH.UPDATE_ACCOUNT, element: <UpdateAccount /> },
]

export { authRoutes, userRoutes }
