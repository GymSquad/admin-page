import { WebsiteInfoTable } from "@/components/websites/WebsiteInfoTable";
import { useWebsiteInfo } from "@/components/websites/query";
import { Search } from "lucide-react";
import { useState } from "react";

const HomePage = () => {
  const [query, setQuery] = useState("");
  const webInfoQuery = useWebsiteInfo({ q: query });

  return (
    <div className="container mx-auto flex h-screen flex-col gap-4 py-10">
      <div className="flex items-center gap-2 rounded-full border border-input px-4 focus-within:ring-2 focus-within:ring-ring">
        <Search />
        <input
          placeholder="Search"
          className="h-full w-full py-2 text-lg focus-visible:outline-none"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>
      <WebsiteInfoTable queryRes={webInfoQuery} />
    </div>
  );
};

export default HomePage;
