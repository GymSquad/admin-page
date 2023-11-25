import { websiteInfo } from "@/db/websiteInfo";
import { DataTable } from "./DataTable";
import { columns } from "./columns";

const HomePage = () => {
  return (
    <>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={websiteInfo} />
      </div>
    </>
  );
};

export default HomePage;
