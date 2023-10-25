import React from "react";
import PATH from "./paths";

const ActivateAccount = React.lazy(() => import("../pages/ActivateAccount"));
const AfterSignUp = React.lazy(() => import("../pages/AfterSignUp"));
const SignIn = React.lazy(() => import("../pages/SignIn"));

const authRoutes = [
  { path: PATH.ACTIVATE_ACCOUNT, element: <ActivateAccount /> },
  { path: PATH.AFTER_SIGN_UP, element: <AfterSignUp /> },
  { path: PATH.SIGN_IN, element: <SignIn /> }
];

export default authRoutes
