import { useState } from "react";
import Table from "../../components/Table";
import { deleteZone } from "../../api/ParkingAdmin/Zone";
import { useMutation } from "react-query";
import { useQuery } from "react-query";
import { Button } from "react-bootstrap";
import { getZones, parkingAdminLog } from "../../api/ParkingAdmin/Zone";
import IconDelete from "../../assets/icons/IconDelete";
import EditIcon from "../../assets/icons/IconEdit";
import ConfirmDataModal from "../../components/modal";
import { useNavigate } from "react-router-dom";

function Zones() {
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

  const { data: Zones, refetch } = useQuery("zones", getZones);
  const { mutate: mutateDelete } = useMutation(deleteZone, {
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
      Header: "ظرفیت کلی",
      accessor: "capacity",
    },
    {
      Header: "ظرفیت باقیمانده",
      accessor: "remained_capacity",
    },
    {
      Header: "وضعیت",
      accessor: "enabled",
      Cell: (props: any) => (
        <span>{props.row.original.enabled ? "فعال" : "غیرفعال"}</span>
      ),
    },
    {
      Header: "عملیات",
      accessor: "",
      Cell: (props: any) => (
        <>
          <button
            className="option-btn"
            onClick={() => {
              navigate(`/zone/${props.row.original.id}`);
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
                text: `آیا از حذف زون اطمینان دارید؟`,
              });
            }}
          >
            <IconDelete />
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="page-template-table-container">
      <Button
        onClick={() => {
          navigate(`/zone/new`);
        }}
        className="mt-2"
        variant="dark"
      >
        اضافه کردن زون جدید
      </Button>
      {Zones && (
        <Table
          className="table-view"
          columns={COLUMNS}
          data={Zones?.data?.zones}
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

export default Zones;
