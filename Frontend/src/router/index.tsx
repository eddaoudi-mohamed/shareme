import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "../pages/Auth/Login";
import Home from "../pages/Rootes/Home";
import { CreatPins, Feed, PinsDetail, Search, UserPofile } from "../components";
import Pins from "../pages/Rootes/Pins";
import Layout from "../pages/Rootes/Layout";
import { jwtDecode } from "jwt-decode";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="login" element={<Login />} />
      <Route
        element={<Layout />}
        loader={() => {
          const userInfo: any =
            localStorage.getItem("user") !== null
              ? jwtDecode(localStorage.getItem("user") || "")
              : localStorage.clear();
          if (!userInfo) {
            return (window.location.href = "http://localhost:5173/login");
          }
          console.log("here first ");
          return true;
        }}
      >
        <Route path="/" element={<Home />}>
          <Route path="/*" element={<Pins />}>
            <Route index element={<Feed />} />
            <Route path="catergory/:catergoryId" element={<Feed />} />
            <Route path="pin/:categoryId" element={<Feed />} />
            <Route path="pin-detail/:id" element={<PinsDetail />} />
            <Route path="create-pin" element={<CreatPins />} />
            <Route path="search" element={<Search />} />
          </Route>
          <Route path="user-profile/:id" element={<UserPofile />} />
        </Route>
      </Route>
    </>
  )
);

export default router;
