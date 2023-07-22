import { useState } from "react";
import Table from "../../components/Table";
import { deleteParking } from "../../api/SystemAdmin/Parking";
import { useMutation } from "react-query";
import { useQuery } from "react-query";
import { Button } from "react-bootstrap";
import { getParkings } from "../../api/SystemAdmin/Parking";
import IconDelete from "../../assets/icons/IconDelete";
import EditIcon from "../../assets/icons/IconEdit";
import ConfirmDataModal from "../../components/modal";
import { useNavigate } from "react-router-dom";

function Parkings() {
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

  const { data: Parkings, refetch } = useQuery("parkings", getParkings);
  const { mutate: mutateDelete } = useMutation(deleteParking, {
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
      Header: "عملیات",
      accessor: "",
      Cell: (props: any) => (
        <>
          <button
            className="option-btn"
            onClick={() => {
              navigate(`/parking/${props.row.original.id}`);
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
                text: `آیا از حذف پارکینگ ${props.row.original.name} اطمینان دارید؟`,
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
          navigate(`/parking/new`);
        }}
        className="mt-2"
        variant="dark"
      >
        اضافه کردن پارکینگ
      </Button>
      {Parkings && (
        <Table
          className="table-view"
          columns={COLUMNS}
          data={Parkings?.data?.parkings}
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

export default Parkings;
