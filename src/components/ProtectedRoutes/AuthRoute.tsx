//Accessible only for users that are not signed in.

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface IChildrenProps {
  children: JSX.Element
}

const AuthRoute: React.FC<IChildrenProps> = ({ children }) => {
  const { userState } = useSelector((state: any) => state.auth)

  return !userState ? children : <Navigate to="/home" />
}

export default AuthRoute