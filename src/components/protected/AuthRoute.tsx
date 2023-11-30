//Accessible only for users that are not signed in.

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface IChildrenProps {
  children: JSX.Element
}

const AuthRoute: React.FC<IChildrenProps> = ({ children }) => {
  const { userState } = useSelector((state: any) => state.auth)

  let navigation;
  if (userState) {
    if (userState.user.firstName) {
      navigation = <Navigate to="/home" />
    } else {
      navigation = <Navigate to="/update_account"/> 
    }
  } else {
    navigation = children
  }

  return navigation
}

export default AuthRoute