import { FC, useState } from "react";
import { IPins } from "../interfaces";
import { client, urlFor } from "../client";
import { Link, useNavigate } from "react-router-dom";
import { IoMdDownload } from "react-icons/io";
import { useUserContext } from "../context/userContext";
import { v4 as uuidv4 } from "uuid";
import { RiArrowRightUpLine } from "react-icons/ri";
import { AiTwotoneDelete } from "react-icons/ai";
interface Iprops {
  pin: IPins;
}

const Pin: FC<Iprops> = ({ pin }) => {
  const [postHoved, setPostHoved] = useState(false);
  const navigate = useNavigate();
  const user = useUserContext();
  const alreadySave = pin?.save?.filter(
    (item) => user._id == item.postedBy._id
  );

  const savePins = (id: string) => {
    if (alreadySave?.length == 0 || alreadySave == undefined) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: user._id,
            postedBy: {
              _type: "postedBy",
              _ref: user._id,
            },
          },
        ])
        .commit()
        .then(() => {
          // window.location.reload();
          console.log("finshed");
        });
    }
  };

  const deletePin = (id: string) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };
  return (
    <>
      <div className="m-2">
        <div
          onMouseEnter={() => setPostHoved(true)}
          onMouseLeave={() => setPostHoved(false)}
          onClick={() => navigate(`/pin-detail/${pin._id}`)}
          className=" relative cursor-zoom-in w-auto hover:shadow-lg transition-all duration-500 ease-in-out rounded-lg overflow-hidden "
        >
          <img
            src={urlFor(pin.image).width(250).url()}
            className=" rounded-lg w-full "
            alt=""
          />

          {postHoved && (
            <div
              className=" absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pb-2 pt-2 z-50 "
              style={{ height: "100%" }}
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <a
                    href={`${pin.image.asset.url}?dl=`}
                    download
                    onClick={(e) => e.stopPropagation()}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                  >
                    <IoMdDownload />
                  </a>
                </div>
                {alreadySave?.length != 0 && alreadySave != undefined ? (
                  <button className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold py-1 text-base px-5 rounded-3xl hover:shadow-md outline-none">
                    {pin?.save?.length} saved
                  </button>
                ) : (
                  <button
                    className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold py-1 text-base px-5 rounded-3xl hover:shadow-md outline-none"
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      savePins(pin._id);
                    }}
                  >
                    save
                  </button>
                )}
              </div>
              <div className="flex justify-between items-center gap-2 w-full">
                {pin.destination && (
                  <a
                    href={pin.destination}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    target="_blank"
                    rel="noreferre"
                    className=" bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                  >
                    <RiArrowRightUpLine />
                    {pin?.destination?.slice(8, 20).concat("...")}
                  </a>
                )}

                {pin.postedBy._id == user._id ? (
                  <button
                    type="button"
                    className="bg-white opacity-70 hover:opacity-100  font-bold p-2 text-base  text-dark rounded-3xl hover:shadow-md outline-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePin(pin._id);
                    }}
                  >
                    <AiTwotoneDelete />
                  </button>
                ) : null}
              </div>
            </div>
          )}
        </div>
        <Link
          to={`/user-profile/${pin.postedBy._id}`}
          className="flex gap-2 mt-2 items-center"
        >
          <img
            src={pin.postedBy.image}
            className=" w-8 h-8  rounded-full object-cover"
            alt=""
          />
          <p className=" font-semibold capitalize">{pin.postedBy.userName} </p>
        </Link>
      </div>
    </>
  );
};

export default Pin;
