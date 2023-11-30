import { DataTable } from "../components/websites/DataTable";

const HomePage = () => {
  return (
    <>
      <div className="container mx-auto h-screen py-10">
        <div className="h-full">
          <DataTable />
        </div>
      </div>
    </>
  );
};

export default HomePage;
