import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { getParkingAdmins } from "../../api/SystemAdmin/ParkingAdmin";
import { deleteParkingAdmin } from "../../api/SystemAdmin/ParkingAdmin";
import IconDelete from "../../assets/icons/IconDelete";
import ConfirmDataModal from "../../components/modal";
import EditIcon from "../../assets/icons/IconEdit";
import Table from "../../components/Table";

function ParkingsAdmins() {
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
      Header: "پارکینگ",
      accessor: "parking_id",
    },
    {
      Header: "شماره تماس",
      accessor: "phone",
    },
    {
      Header: "وضعیت",
      accessor: "enabled",
      Cell: ({ value }: { value: boolean }) => {
        return value ? "فعال" : "غیرفعال";
      },
    },
    {
      Header: "عملیات",
      accessor: "",
      Cell: (props: any) => (
        <>
          <button
            className="option-btn"
            onClick={() => {
              navigate(`/parking-admin/${props.row.original.id}`);
            }}
          >
            <EditIcon />
          </button>
          <button
            className="option-btn"
            onClick={() => {
              setModal({
                show: true,
                id: props.row.original.id,
                text: `آیا از حذف پارکینگ ادمین ${props.row.original.last_name} اطمینان دارید؟`,
              });
            }}
          >
            <IconDelete />
          </button>
        </>
      ),
    },
  ];

  const { data: ParkingsAdmins, refetch } = useQuery(
    "parkingsAdmins",
    getParkingAdmins
  );
  const { mutate: mutateDelete } = useMutation(deleteParkingAdmin, {
    onSuccess: () => {
      setModal({ ...modal, show: false });
      refetch();
    },
  });

  return (
    <div className="page-template-table-container">
      <Button
        onClick={() => {
          navigate(`/parking-admin/new`);
        }}
        className="mt-2"
        variant="dark"
      >
        اضافه کردن پارکینگ ادمین
      </Button>
      {ParkingsAdmins && (
        <Table
          className="table-view"
          columns={COLUMNS}
          data={ParkingsAdmins?.data.parking_admins}
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

export default ParkingsAdmins;
