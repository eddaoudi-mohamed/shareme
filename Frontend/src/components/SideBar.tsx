import { FC } from "react";
import { Iuser } from "../interfaces";
import { RiHomeFill } from "react-icons/ri";

import logo from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { categories } from "../data";

interface Iprops {
  user: Iuser | null;
  closeToggle?: (value: boolean) => void;
}

const isNotActiveStyle =
  "flex items-center px-5  gap-5 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center px-5 gap-5   font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize";
const SideBar: FC<Iprops> = ({ user, closeToggle }) => {
  const handleCloseSideBar = () => {
    if (closeToggle) closeToggle(false);
  };

  return (
    <>
      <div className="flex flex-col bg-white justify-between h-full overflow-y-scrikk min-w-210 hide-scrollbar">
        <div className="flex flex-col">
          <Link
            to="/"
            className="flex gap-2 px-5 my-6 items-center pt-1 w-190 "
            onClick={handleCloseSideBar}
          >
            <img src={logo} alt="" className="w-full" />
          </Link>

          <div className="flex flex-col gap-2 ">
            <NavLink
              onClick={handleCloseSideBar}
              to="/"
              className={({ isActive }) => {
                return isActive ? isActiveStyle : isNotActiveStyle;
              }}
            >
              <RiHomeFill /> Home
            </NavLink>
            <h3 className=" mt-2 text-base 2xl:text-xl px-5">
              Discover Category
            </h3>
            {categories.slice(0, categories.length - 1).map((item) => (
              <NavLink
                className={({ isActive }) => {
                  return isActive ? isActiveStyle : isNotActiveStyle;
                }}
                to={`/catergory/${item.name}`}
                key={item.name}
              >
                <img src={item.image} className=" w-8 h-8 rounded-full" />
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>

        {user && (
          <Link
            className="flex items-center p-2 bg-white rounded-lg shadow-lg mx-3  my-5 mb-3 gap-2"
            to={`user-profile/${user?._id}`}
          >
            <img
              src={user?.image}
              alt="profileImage"
              className="w-10 h-10 rounded-full"
            />
            <p> {user?.userName} </p>
          </Link>
        )}
      </div>
    </>
  );
};

export default SideBar;
