//Accessible only for users that are not signed in.

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { IRouteChildren } from "../../ts/interfaces";

const AuthRoute: React.FC<IRouteChildren> = ({ children }) => {
  const { userState } = useSelector((state: any) => state.auth)

  let navigation;
  if (userState) {
    if (userState.user.firstName) {
      navigation = <Navigate to="/home/search" />
    } else {
      navigation = <Navigate to="/update_account"/> 
    }
  } else {
    navigation = children
  }

  return navigation
}

export default AuthRoute