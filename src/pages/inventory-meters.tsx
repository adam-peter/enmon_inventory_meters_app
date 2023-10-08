import { useQuery } from "@tanstack/react-query";
import { getMeters } from "@/api/inventory-meters";
import { useNavigate } from "react-router-dom";
import DataTable from "@/components/datatable/DataTable";
import { columns } from "@/components/datatable/columns";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const InventoryMeters = () => {
  const navigate = useNavigate();
  const { loggedIn, authData } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!loggedIn) navigate("/");
  }, [loggedIn]);

  const {
    data: metersData,
    isFetching: metersIsFetching,
    isError: metersIsError,
    ...metersQuery
  } = useQuery({
    queryKey: ["inventoryMeters"],
    queryFn: () => getMeters(authData),
  });

  return (
    <div className="container mt-4">
      <h1 className="headingGradient mr-10 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Inventory Meters
      </h1>
      {metersIsFetching ? (
        <div className="mt-5">
          <Skeleton className="h-screen w-full" />
        </div>
      ) : metersIsError ? (
        <div className="mt-5">
          <p>Error while fetching data</p>
          <Button onClick={() => metersQuery.refetch()}>Try again</Button>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={metersData}
          className="mt-5 border"
        />
      )}
    </div>
  );
};

export default InventoryMeters;
