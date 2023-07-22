import Table from "../../components/Table";
import { useQuery } from "react-query";
import { getWhiteLists } from "../../api/User";

function Parkings() {
  const { data: Parkings } = useQuery("requested", getWhiteLists);

  const COLUMNS = [
    {
      Header: "#",
      accessor: "id",
    },
    {
      Header: "نام",
      accessor: "parking_name",
    },
    {
      Header: "آدرس",
      accessor: "parking_address",
    },
    {
      Header: "وضعیت",
      accessor: "approved",
      Cell: (props: any) => (
        <span>{props.row.original.approved ? "تایید شده" : "در انتظار"}</span>
      ),
    },
  ];

  return (
    <div className="page-template-table-container">
      {Parkings && (
        <Table
          className="table-view"
          columns={COLUMNS}
          data={Parkings?.data?.whitelists}
        />
      )}
    </div>
  );
}

export default Parkings;
