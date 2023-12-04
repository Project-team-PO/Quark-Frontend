//Accessible for all logged users.

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { IRouteChildren } from "../../ts/interfaces";

const UserRoute: React.FC<IRouteChildren> = ({ children }) => {
  const { userState } = useSelector((state: any) => state.auth)

  let navigation;
  if (userState) {
    if (userState.user.firstName) {
      navigation = children
    } else {
      navigation = <Navigate to="/update_account" />
    }
  } else {
    navigation = <Navigate to="/sign_in" />
  }

  return navigation
}

export default UserRoute 