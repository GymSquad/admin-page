import { DataTable } from "../components/websites/DataTable";

const HomePage = () => {
  return (
    <>
      <div className="container mx-auto h-screen py-10">
        <div className="h-full">
          <DataTable />
        </div>
      </div>
      {/* <button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={() => void fetchNextPage()}
      >
        Load more...
      </button> */}
    </>
  );
};

export default HomePage;
