import { FC } from "react";

import { NavBar } from "../../components";
import { Outlet } from "react-router-dom";
import ContextSearch from "../../context/ContextSearch";
interface Iprops {}

const Pins: FC<Iprops> = ({}) => {
  return (
    <>
      <ContextSearch>
        <div className="px-2 md:px-5">
          <div className="bg-gray-50 ">
            <NavBar />
          </div>
          <div className="h-full ">
            <Outlet />
          </div>
        </div>
      </ContextSearch>
    </>
  );
};

export default Pins;
