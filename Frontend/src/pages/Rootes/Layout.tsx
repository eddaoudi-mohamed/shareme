import { FC } from "react";
import UserContext from "../../context/userContext";
import { Outlet } from "react-router-dom";

interface Iprops {}

const Layout: FC<Iprops> = ({}) => {
  return (
    <UserContext>
      <Outlet />
    </UserContext>
  );
};

export default Layout;
