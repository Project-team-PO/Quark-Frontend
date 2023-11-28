import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface IChildrenProps {
  children: JSX.Element
}

const UserRoute: React.FC<IChildrenProps> = ({ children }) => {
  const { userState } = useSelector((state: any) => state.auth)

  return userState ? children : <Navigate to="/sign_in" />
}

export default UserRoute 