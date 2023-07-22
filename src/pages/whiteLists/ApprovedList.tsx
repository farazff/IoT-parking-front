import { useState } from "react";
import Table from "../../components/Table";
import { useMutation } from "react-query";
import { useQuery } from "react-query";
import IconDelete from "../../assets/icons/IconDelete";
import ConfirmDataModal from "../../components/modal";
import {
  getApprovedWhiteLists,
  deleteWhiteList,
} from "../../api/ParkingAdmin/WhiteList";
import { useNavigate } from "react-router-dom";

function ListToApprove() {
  const navigate = useNavigate();
  const [modal, setModal] = useState<{
    show: boolean;
    id: number;
    text: string;
  }>({
    show: false,
    id: 0,
    text: "",
  });

  const { data: List, refetch } = useQuery(
    "ApprovedList",
    getApprovedWhiteLists
  );
  const { mutate: mutateDelete } = useMutation(deleteWhiteList, {
    onSuccess: () => {
      setModal({ ...modal, show: false });
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
      accessor: "last_name",
      Cell: (props: any) => (
        <span>
          {props.row.original.first_name} {props.row.original.last_name}
        </span>
      ),
    },
    {
      Header: "پلاک",
      accessor: "car_tag",
    },
    {
      Header: "شماره تماس",
      accessor: "phone",
    },
    {
      Header: "عملیات",
      accessor: "",
      Cell: (props: any) => (
        <button
          className="option-btn"
          onClick={() => {
            setModal({
              show: true,
              id: props.row.original.id,
              text: `آیا از حذف پارکینگ ${props.row.original.name} اطمینان دارید؟`,
            });
          }}
        >
          <IconDelete />
        </button>
      ),
    },
  ];

  return (
    <div className="page-template-table-container">
      {List && (
        <Table
          className="table-view"
          columns={COLUMNS}
          data={List?.data?.whitelists}
        />
      )}
      <ConfirmDataModal
        showModal={modal.show}
        setShowModal={(value) => setModal({ ...modal, show: value })}
        modalText={modal.text}
        confirmFunc={() => mutateDelete(modal.id)}
      />
    </div>
  );
}

export default ListToApprove;
