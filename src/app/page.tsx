import { useWebsiteInfo } from "@/components/websites/query";
import { DataTable } from "../components/websites/DataTable";
import { columns } from "../components/websites/columns";

const HomePage = () => {
  const { data, isPending, isError } = useWebsiteInfo();

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
    </>
  );
};

export default HomePage;
