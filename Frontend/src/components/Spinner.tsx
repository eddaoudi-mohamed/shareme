import { FC } from "react";
import { RiLoader2Fill } from "react-icons/ri";
// import Loader

interface Iprops {
  message: string;
}

const Spinner: FC<Iprops> = ({ message }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <RiLoader2Fill
          fontSize={50}
          type="Circles"
          color="red"
          className=" animate-spin duration-75"
        />
        {message}
      </div>
    </>
  );
};

export default Spinner;
