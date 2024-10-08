import { Navigate } from "react-router-dom";


const useNavigate = Navigate;

interface PrivateRouteProps extends NivelProps {
  children: JSX.Element;
}
interface NivelProps {
  nivel: string;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const user = localStorage.getItem("@PermissionYT:token");

  if (!user) {
    return <Navigate to={"/"} replace state={{ from: location }} />;
  } else {
    return children;
  }
};
