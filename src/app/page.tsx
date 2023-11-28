import { useWebsiteInfo } from "@/components/websites/query";
import { DataTable } from "../components/websites/DataTable";
import { columns } from "../components/websites/columns";

const HomePage = () => {
  const { data, isPending, isError, fetchNextPage } = useWebsiteInfo();

  if (isError) {
    return <div>Error...</div>;
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  console.log(data);

  return (
    <>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
      <button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={() => void fetchNextPage()}
      >
        Load more...
      </button>
    </>
  );
};

export default HomePage;
