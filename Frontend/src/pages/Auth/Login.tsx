import { FC } from "react";

import sharedVideo from "../../assets/share.mp4";
import logo from "../../assets/logowhite.png";

import GoogleAuth from "../../components/GoogleAuth";

interface Iprops {}

const Login: FC<Iprops> = ({}) => {
  return (
    <>
      <div className="flex justify-start items-center flex-col h-screen">
        <div className=" relative w-full h-full">
          <video
            src={sharedVideo}
            typeof="video/mp4"
            loop
            controls={false}
            muted
            autoPlay={true}
            className="w-full h-full object-cover"
          />
          <div className=" absolute flex flex-col items-center justify-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
            <div className="p-5">
              <img src={logo} alt="" width={"130px"} />
            </div>
            <div className=" shadow-2xl">
              <GoogleAuth />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
