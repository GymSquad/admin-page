import { getWebsiteInfo } from "@/api/getWebsiteInfo";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "./DataTable";
import { columns } from "./columns";

const HomePage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["websiteInfo"],
    queryFn: getWebsiteInfo,
    select: (data) => {
      return data.result.flatMap((info) => info.websites);
    },
  });

  if (isError) {
    return <div>Error...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return null;
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
