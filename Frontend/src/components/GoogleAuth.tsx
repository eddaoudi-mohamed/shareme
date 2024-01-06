import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { FC } from "react";
import { jwtDecode } from "jwt-decode";
import { ResponseGoogle } from "../interfaces";

import { client } from "../client";
import { useNavigate } from "react-router-dom";

interface Iprops {}

const GoogleAuth: FC<Iprops> = ({}) => {
  const navigate = useNavigate();
  return (
    <>
      <GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            localStorage.setItem("user", credentialResponse.credential || "");
            const credentianDecode: ResponseGoogle = await jwtDecode(
              credentialResponse.credential || ""
            );
            console.log("credentianDecode ", credentianDecode);
            const { name, picture, sub } = await credentianDecode;
            const doc = {
              _id: sub,
              _type: "user",
              userName: name,
              image: picture,
            };
            client.createIfNotExists(doc).then(() => {
              navigate("/", { replace: true });
            });
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider>
    </>
  );
};

export default GoogleAuth;
