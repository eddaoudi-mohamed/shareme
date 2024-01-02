import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Iuser, ResponseGoogle } from "../interfaces";
import { jwtDecode } from "jwt-decode";
import { client } from "../client";
import { useQuery } from "../utils/data";

interface Iprops {
  children: ReactNode;
}
const INITIALUSER: Iuser = {
  userName: "",
  _id: "",
  image: "",
};
const ContextUser = createContext<Iuser>(INITIALUSER);

const UserContext: FC<Iprops> = ({ children }) => {
  const [user, setUser] = useState<Iuser>(INITIALUSER);

  const userInfo: ResponseGoogle | any =
    localStorage.getItem("user") !== null
      ? jwtDecode(localStorage.getItem("user") || "")
      : localStorage.clear();

  useEffect(() => {
    if (userInfo) {
      const query = useQuery(userInfo?.sub);
      client.fetch(query).then((data) => {
        setUser(data[0]);
      });
    }
  }, []);
  return (
    <>
      <ContextUser.Provider value={user}>{children}</ContextUser.Provider>
    </>
  );
};

export default UserContext;

export const useUserContext = () => useContext(ContextUser);
