import React from "react";
import PATH from "./urls";

const ActivateAccount = React.lazy(() => import("../pages/ActivateAccount"));
const UpdateAccount = React.lazy(() => import("../pages/UpdateAccount"));
const SignIn = React.lazy(() => import("../pages/SignIn"));
const Chat = React.lazy(() => import("../components/Chat"));
const Search = React.lazy(() => import("../components/UserSearch"));
const AdminDashboard = React.lazy(() => import("../components/admin/AdminDashboard"));
const AdminStatistics = React.lazy(() => import("../components/admin/AdminStatistics"));
const AdminManagers = React.lazy(() => import("../components/admin/AdminManagers"));
const AdminTeams = React.lazy(() => import("../components/admin/AdminTeams"));


const authRoutes = [
  { path: PATH.ACTIVATE_ACCOUNT, element: <ActivateAccount /> },
  { path: PATH.SIGN_IN, element: <SignIn /> },
];

const accountActionsRoutes = [
  { path: PATH.UPDATE_ACCOUNT, element: <UpdateAccount /> },
]

const userRoutes = [
  { path: PATH.CHAT, element: <Chat /> },
  { path: PATH.SEARCH, element: <Search /> },
]
const adminRoutes = [
  { path: PATH.ADMIN, element: <AdminDashboard /> },
  { path: PATH.ADMIN_STATISTICS, element: <AdminStatistics /> },
  { path: PATH.ADMIN_MANAGERS, element: <AdminManagers /> },
  { path: PATH.ADMIN_TEAMS, element: <AdminTeams /> },
]
export { authRoutes, userRoutes, accountActionsRoutes, adminRoutes }
