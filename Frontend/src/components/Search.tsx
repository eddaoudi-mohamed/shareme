import { FC, useEffect, useState } from "react";
import { IPins } from "../interfaces";
import { useSearchContext } from "../context/ContextSearch";
import { feedQuery, searchQuery } from "../utils/data";
import { client } from "../client";
import Spinner from "./Spinner";
import MesnryLyaout from "./MesnryLyaout";

interface Iprops {}

const Search: FC<Iprops> = ({}) => {
  const [pins, setPins] = useState<IPins[] | null>(null);
  const [loading, setLoading] = useState(false);

  const { searchTerm } = useSearchContext();

  useEffect(() => {
    setLoading(true);
    if (searchTerm !== "") {
      const query = searchQuery(searchTerm);
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
  }, [searchTerm]);

  return (
    <>
      {loading && <Spinner message="Loading pins" />}
      {pins?.length !== 0 && <MesnryLyaout pins={pins} />}
      {pins?.length === 0 && searchTerm !== "" && !loading && (
        <div className="mt-10 text-center text-xl ">No Pins Found!</div>
      )}
    </>
  );
};

export default Search;
