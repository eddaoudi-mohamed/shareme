import { FC } from "react";
import { useSearchContext } from "../context/ContextSearch";
import { useUserContext } from "../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdSearch } from "react-icons/io";

interface Iprops {}

const NavBar: FC<Iprops> = ({}) => {
  const { searchTerm, setsearchTerm } = useSearchContext();
  const user = useUserContext();

  const navigate = useNavigate();

  if (!user) return null;

  return (
    <>
      <div className="flex gap-2 md:gap-3 w-full mt-5 pb-7 ">
        <div className="flex justify-start items-center w-full px-2 rounded-md border-none outline-none focus-within:shadow-sm bg-white">
          <IoMdSearch fontSize={21} className="ml-1" />
          <input
            type="text"
            name="search"
            onChange={(e) => setsearchTerm(e.target.value)}
            value={searchTerm}
            onFocus={() => navigate("/search")}
            className="p-2 w-full outline-none bg-white"
          />
        </div>

        <div className="flex gap-3 items-center">
          <Link to={`user-profile/${user._id}`} className="hiddem md:block">
            <img
              src={user.image}
              alt="imageProfile"
              className=" w-10 h-10 rounded-full mx-1"
            />
          </Link>
          <Link
            to={`create-pin`}
            className="bg-black text-white rounded-lg w-10 h-10 md:w-10 md:h-10 flex justify-center items-center"
          >
            <IoMdAdd />
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;
