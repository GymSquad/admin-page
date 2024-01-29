import { WebsiteInfoTable } from "@/components/websites/WebsiteInfoTable";
import { useWebsiteInfo } from "@/components/websites/query";
import { useDebounce } from "@/lib/utils";
import { Search } from "lucide-react";
import { useState } from "react";

const HomePage = () => {
  const [searchText, setSearchText] = useState("");

  const webInfoQuery = useWebsiteInfo({ q: searchText });

  return (
    <div className="container mx-auto flex h-screen max-w-6xl flex-col gap-4 py-10">
      <SearchBar setSearchText={setSearchText} />
      <WebsiteInfoTable queryRes={webInfoQuery} />
    </div>
  );
};

type SearchBarProps = {
  setSearchText: (text: string) => void;
};

const SearchBar = ({ setSearchText }: SearchBarProps) => {
  const [inputText, setInputText] = useState("");
  const debounceSearch = useDebounce(setSearchText, 1000);

  return (
    <div className="flex items-center gap-2 rounded-full border border-input px-4 focus-within:ring-2 focus-within:ring-ring">
      <Search />
      <input
        placeholder="Search"
        className="h-full w-full py-2 text-lg focus-visible:outline-none"
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
          debounceSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default HomePage;
