import { useState } from "react";
import { useQuery } from "react-query";
import Pagination from "react-bootstrap/Pagination";
import { parkingAdminLog } from "../../api/ParkingAdmin/Zone";
import Table from "../../components/Table";

function Logs() {
  const [params, setParams] = useState<{ page: number }>({ page: 1 });

  const { data: logs } = useQuery(["parking-admin-logs", params], () =>
    parkingAdminLog(params.page)
  );

  let items = [];
  for (let number = 1; number <= logs?.data.page_count; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === params.page}
        onClick={() => setParams({ page: number })}
      >
        {number}
      </Pagination.Item>
    );
  }

  const COLUMNS = [
    {
      Header: "#",
      accessor: "id",
    },
    {
      Header: "نام",
      accessor: "last_name",
      Cell: (props: any) => (
        <span>
          {props.row.original.first_name} {props.row.original.last_name}
        </span>
      ),
    },
    {
      Header: "پلاک",
      accessor: "car_tage",
    },
    {
      Header: "شماره تماس",
      accessor: "phone",
    },
    {
      Header: "زمان ورود",
      accessor: "enter_time",
    },
    {
      Header: "زمان خروج",
      accessor: "exit_time",
    },
  ];

  return (
    <div className="page-template-table-container">
      {logs && (
        <Table
          className="table-view"
          columns={COLUMNS}
          data={logs?.data.logs}
        />
      )}
      {logs?.data.page_count > 1 ? (
        <div className="pagination-container">
          <Pagination>
            <Pagination.Prev
              disabled={params.page === 1}
              onClick={() => setParams((prv) => ({ page: (prv.page -= 1) }))}
            />
            {items}
            <Pagination.Next
              disabled={params.page === logs?.data.page_count}
              onClick={() => setParams((prv) => ({ page: (prv.page += 1) }))}
            />
          </Pagination>
        </div>
      ) : null}
    </div>
  );
}

export default Logs;
