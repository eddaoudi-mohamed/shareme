import { FC, ReactNode, createContext, useContext, useState } from "react";

interface Iprops {
  children: ReactNode;
}
interface IcontextType {
  searchTerm: string;
  setsearchTerm: (value: string) => void;
}

const INITIAL_VALUE: IcontextType = {
  searchTerm: "",
  setsearchTerm: () => {},
};
const SearchContext = createContext<IcontextType>(INITIAL_VALUE);
const ContextSearch: FC<Iprops> = ({ children }) => {
  const [searchTerm, setsearchTerm] = useState("");

  return (
    <>
      <SearchContext.Provider value={{ searchTerm, setsearchTerm }}>
        {children}
      </SearchContext.Provider>
    </>
  );
};

export default ContextSearch;

export const useSearchContext = () => useContext(SearchContext);
