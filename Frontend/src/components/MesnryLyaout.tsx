import { FC } from "react";
import Masonry from "react-masonry-css";
import Pin from "./Pin";
import { IPins } from "../interfaces";
interface Iprops {
  pins: IPins[] | null;
}
const breaKPointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};
const MesnryLyaout: FC<Iprops> = ({ pins }) => {
  return (
    <>
      <Masonry
        breakpointCols={breaKPointObj}
        className="flex animate-slide-fwd"
      >
        {pins?.map((item) => (
          <Pin key={item._id} pin={item} />
        ))}
      </Masonry>
    </>
  );
};

export default MesnryLyaout;
