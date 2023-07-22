import Table from "../../components/Table";
import { useMutation } from "react-query";
import { useQuery } from "react-query";
import { getParkingsList, requestWhiteList } from "../../api/User";
import TickIcon from "../../assets/icons/IconTick";

function Parkings() {
  const { data: Parkings, refetch } = useQuery("parkings", getParkingsList);
  const { mutate: mutateRequest, isLoading } = useMutation(requestWhiteList, {
    onSuccess: () => {
      refetch();
    },
  });

  const COLUMNS = [
    {
      Header: "#",
      accessor: "id",
    },
    {
      Header: "نام",
      accessor: "name",
    },
    {
      Header: "آدرس",
      accessor: "address",
    },
    {
      Header: "شماره تماس",
      accessor: "phone",
    },
    {
      Header: "وضعیت",
      accessor: "enabled",
      Cell: (props: any) => (
        <span>{props.row.original.enabled ? "فعال" : "غیرفعال"}</span>
      ),
    },
    {
      Header: "درخواست پارکینگ",
      accessor: "",
      Cell: (props: any) => (
        <>
          {props.row.original.have_access ? (
            <span>درخواست ارسال شده</span>
          ) : (
            <button
              className="option-btn"
              disabled={isLoading}
              onClick={() => {
                mutateRequest({ parking_id: +props.row.original.id });
              }}
            >
              <TickIcon />
            </button>
          )}
        </>
      ),
    },
  ];

  return (
    <div className="page-template-table-container">
      {Parkings && (
        <Table
          className="table-view"
          columns={COLUMNS}
          data={Parkings?.data?.parkings}
        />
      )}
    </div>
  );
}

export default Parkings;
