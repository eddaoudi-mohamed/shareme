import { FC, useRef, useState, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Outlet } from "react-router-dom";
import { SideBar } from "../../components";

import logo from "../../assets/logo.png";

import { useUserContext } from "../../context/userContext";
interface Iprops {}

const Home: FC<Iprops> = ({}) => {
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const scrollRef = useRef<any>(null);
  const user = useUserContext();

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out ">
        <div className=" hidden md:flex h-screen flex-initial">
          <SideBar user={user && user} />
        </div>
        <div className="flex md:hidden flex-row ">
          <div className="flex w-full flex-row justify-between items-center shadow-md p-2 ">
            <HiMenu
              fontSize={40}
              className=" cursor-pointer"
              onClick={() => {
                setToggleSideBar(true);
              }}
            />
            <Link to="/">
              <img src={logo} alt="logo" className=" w-28" />
            </Link>
            <Link to={`user-profile/${user?._id}`}>
              <img
                src={user?.image}
                alt="logo"
                className=" w-12 h-12 rounded-full"
              />
            </Link>
          </div>
          {toggleSideBar && (
            <div className=" fixed bg-white h-screen overflow-y-auto w-4/5 shadow-md z-10 animate-slide-in">
              <div className=" absolute w-full flex items-center justify-end p-2">
                <AiFillCloseCircle
                  fontSize={30}
                  className=" cursor-pointer"
                  onClick={() => {
                    setToggleSideBar(false);
                  }}
                />
              </div>
              <SideBar user={user && user} closeToggle={setToggleSideBar} />
            </div>
          )}
        </div>

        <div
          className="flex-1 pb-2 overflow-y-scroll h-screen "
          ref={scrollRef}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Home;
