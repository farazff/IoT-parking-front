import { useForm, SubmitHandler } from "react-hook-form";
import Form from "react-bootstrap/Form";
import { Stack, Button } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import {
  createZone,
  updateZone,
  getZoneById,
  ZoneProps,
} from "../../api/ParkingAdmin/Zone";

function ZoneForm() {
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  const params = useParams<{ id: string }>();
  const { data: singleZoneData } = useQuery(
    "zone",
    () => getZoneById(+params?.id!),
    {
      enabled: !!params?.id,
      cacheTime: 0,
    }
  );
  const onSubmit: SubmitHandler<ZoneProps> = async (data) => {
    const newData = {
      ...data,
      capacity: +data.capacity,
      remained_capacity: +data.remained_capacity,
    };
    if (pathName === "/zone/new") {
      mutateCreateZone(newData);
    } else {
      mutateUpdateZone({ id: +params.id!, data: newData });
    }
  };
  const { register, handleSubmit } = useForm<ZoneProps>({
    defaultValues: singleZoneData?.data.zone,
    values: singleZoneData?.data.zone,
  });

  const { mutate: mutateCreateZone } = useMutation(createZone, {
    onSuccess: () => navigate("/zones"),
  });
  const { mutate: mutateUpdateZone } = useMutation(updateZone, {
    onSuccess: () => navigate("/zones"),
  });

  return (
    <div className="page-template">
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="form-make-container glass-bg"
      >
        <Form.Group className="form-group">
          <Form.Label>ظرفیت کلی:</Form.Label>
          <Form.Control
            type="number"
            {...register("capacity", { required: true })}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>ظرفیت باقی مانده:</Form.Label>
          <Form.Control
            type="number"
            {...register("remained_capacity", { required: true })}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>وضعیت</Form.Label>
          <Form.Check label="فعال" {...register("enabled")} />
        </Form.Group>
        <Stack direction="horizontal" gap={2}>
          <Button variant="dark" type="submit">
            {pathName === "/zone/new" ? "ایجاد زون" : "ویرایش زون"}
          </Button>
        </Stack>
      </Form>
    </div>
  );
}

export default ZoneForm;
