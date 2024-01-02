import { FC, useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useParams } from "react-router-dom";
import { feedQuery, searchQuery } from "../utils/data";
import { client } from "../client";
import MesnryLyaout from "./MesnryLyaout";
import { IPins } from "../interfaces";

interface Iprops {}

const Feed: FC<Iprops> = ({}) => {
  const [loading, setLoading] = useState(true);
  const [pins, setPins] = useState<IPins[] | null>(null);
  const parms = useParams();
  const categoryId = parms.catergoryId;

  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  if (loading)
    return <Spinner message={`we are adding new idea to you Feed `} />;
  if (!pins?.length)
    return (
      <h2 className=" text-center text-lg font-bold flex flex-col items-center justify-center  ">
        {" "}
        No Pins Found
      </h2>
    );
  return (
    <>
      <div>{pins && <MesnryLyaout pins={pins} />}</div>
    </>
  );
};

export default Feed;
