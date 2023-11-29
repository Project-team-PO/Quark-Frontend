//Accessible for all logged users.

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface IChildrenProps {
  children: JSX.Element
}

const UserRoute: React.FC<IChildrenProps> = ({ children }) => {
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