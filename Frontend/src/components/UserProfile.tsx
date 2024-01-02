import { FC, useEffect, useState } from "react";
import { useUserContext } from "../context/userContext";
import Spinner from "./Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { userCreatedPinsQuery, userSavedPinsQuery } from "../utils/data";
import { client } from "../client";
import { IPins } from "../interfaces";
import MesnryLyaout from "./MesnryLyaout";

interface Iprops {}
const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles =
  "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none";

const UserProfile: FC<Iprops> = ({}) => {
  const [pins, setPins] = useState<IPins[] | null>(null);
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");
  const user = useUserContext();
  const { id: userId } = useParams();
  const navigate = useNavigate();
  if (!user) return <Spinner message={"Loading user ..."} />;

  const logoutFunction = () => {
    localStorage.clear();
    navigate("/login");
  };
  // console.log("userid : ", userId);

  const fetchPins = () => {
    setPins(null);
    console.log("text : ", text);
    if (text === "Created") {
      const createdPinsQuery = userCreatedPinsQuery(userId || "");
      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else if (text === "saved") {
      const savedPinsQuery = userSavedPinsQuery(userId || "");

      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  };

  useEffect(() => {
    fetchPins();
  }, [text, userId]);
  if (!user) return <Spinner message="Loading user " />;
  return (
    <>
      <div className="relative pb-2 h-full justify-center items-center">
        <div className="flex flex-col pb-5">
          <div className="relative flex flex-col mb-7">
            <div className="flex flex-col justify-center items-center">
              <img
                className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
                src="https://source.unsplash.com/1600x900/?nature,photography,technology"
                alt="user-pic"
              />
              <img
                className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
                src={user.image}
                alt="user-pic"
              />
            </div>
            <h1 className="font-bold text-3xl text-center mt-3">
              {user.userName}
            </h1>
            <div className="absolute top-0 z-1 right-0 p-2">
              {userId === user._id && (
                <button
                  type="button"
                  className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                  onClick={logoutFunction}
                >
                  <AiOutlineLogout color="red" fontSize={21} />
                </button>
              )}
            </div>
          </div>
          <div className="text-center mb-7">
            <button
              type="button"
              onClick={() => {
                setText("Created");
                setActiveBtn("created");
              }}
              className={`${
                activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Created
            </button>
            <button
              type="button"
              onClick={() => {
                setText("saved");
                setActiveBtn("saved");
              }}
              className={`${
                activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Saved
            </button>
          </div>

          <div className="px-2">
            <MesnryLyaout pins={pins} />
          </div>

          {pins?.length === 0 && (
            <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
              No Pins Found!
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
