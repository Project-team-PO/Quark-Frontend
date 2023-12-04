//Accessible for users that are signed in but it's their first login

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { IRouteChildren } from "../../ts/interfaces";

const ActionRoute: React.FC<IRouteChildren> = ({ children }) => {
  const { userState } = useSelector((state: any) => state.auth)

  let navigation;
  if (userState) {
    if (userState.user.firstName) {
      navigation = <Navigate to="/home" />
    } else {
      navigation = children 
    }
  } else {
    navigation = <Navigate to="/sign_in" />
  }

  return navigation
}

export default ActionRoute