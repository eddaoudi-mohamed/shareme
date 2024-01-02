import { FC, useState } from "react";
import { Inewpin } from "../interfaces";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { AiOutlineCloudUpload, AiTwotoneDelete } from "react-icons/ai";
import { client } from "../client";
import { categories, inputsPins } from "../data";
import SelectList from "./ui/Select";
import { useUserContext } from "../context/userContext";

interface Iprops {}

const CreatPins: FC<Iprops> = ({}) => {
  const defaultValue: Inewpin = {
    title: "",
    about: "",
    destination: "",
    category: categories[3].name,
    imageAssets: "",
  };
  const [createPins, setCreatePins] = useState<Inewpin>(defaultValue);
  const [loading, setLoading] = useState(false);
  const [feilds, setFeilds] = useState(false);
  const navigate = useNavigate();
  const user = useUserContext();
  const uploadeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const fileImage = e.target.files;
    if (fileImage) {
      client.assets
        .upload("image", fileImage[0], {
          contentType: fileImage[0].type,
          filename: fileImage[0].name,
        })
        .then((document) => {
          setCreatePins({ ...createPins, imageAssets: document });

          setLoading(false);
        })
        .catch((error: any) => {
          console.log("error to Uploade image : ", error);
        });
    }
  };
  const deleteImageUploade = () => {
    setCreatePins({ ...createPins, imageAssets: null });
  };
  const savePins = () => {
    const errores = Object.values(createPins).every((item) => item !== "");
    if (!errores) {
      console.log("All the failed are required ");
      return setFeilds(true);
    }
    setFeilds(false);
    // const pinInfo = { ...createPins };

    const doc = {
      _type: "pin",
      title: createPins.title,
      about: createPins.about,
      destination: createPins.destination,
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: createPins.imageAssets?._id,
        },
      },
      userId: user._id,
      postedBy: {
        _type: "postedBy",
        _ref: user._id,
      },
      category: createPins.category,
    };
    client.create(doc).then(() => {
      navigate("/");
    });
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center lg:h-4/5 mt-5">
        {feilds && (
          <p className=" text-red-500 mb-5 transition-all text-xl duration-150 ease-in">
            All The feilds are required{" "}
          </p>
        )}

        <div className=" flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full">
          <div className=" bg-secondaryColor p-3 flex flex-0.7 w-full">
            <div className="flex items-center justify-center border-2 border-dotted border-gray-300 p-3 w-full h-420">
              {loading ? (
                <Spinner message="Loading" />
              ) : !createPins.imageAssets ? (
                <label>
                  <div className="flex items-center justify-center flex-col h-full ">
                    <div className="flex items-center justify-center flex-col">
                      <p className=" font-bold text-2xl">
                        <AiOutlineCloudUpload className="" />
                      </p>
                      <p className="text-lg">Click To Upload</p>
                    </div>
                    <p className=" mt-32 text-gray-400 capitalize">
                      use hight Quality JPG ,SVG ,PNG less then 20 mb
                    </p>
                  </div>
                  <input
                    type="file"
                    name="image"
                    accept="image/png, image/gif, image/jpeg"
                    onChange={uploadeImage}
                    className="w-0 h-0"
                  />
                </label>
              ) : (
                <div className=" relative w-full ">
                  <img
                    src={createPins.imageAssets.url}
                    alt="ImageUploade"
                    className="w-full h-full"
                  />
                  <button
                    type="button"
                    className=" absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                    onClick={deleteImageUploade}
                  >
                    <AiTwotoneDelete />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full ">
            {inputsPins.map((item) =>
              item.type !== "select" ? (
                <input
                  key={item.id}
                  type={item.type}
                  name={item.name}
                  placeholder={item.placeholder}
                  value={createPins[item.name]}
                  onChange={(e) => {
                    const { name, value } = e.target;

                    setCreatePins({ ...createPins, [name]: value });
                  }}
                  className="outline-none text-sm font-bold border-b-2 border-gray-200 p-2 "
                />
              ) : (
                <div className="flex flex-col " key={item.id}>
                  <SelectList setCreatePins={setCreatePins} />

                  <div className="flex justify-end items-end mt-5">
                    <button
                      type="button"
                      className=" bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
                      onClick={savePins}
                    >
                      {" "}
                      Save Pin
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatPins;
