import { useForm, SubmitHandler } from "react-hook-form";
import Form from "react-bootstrap/Form";
import { Stack, Button } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import {
  createParking,
  updateParking,
  getParkingById,
  ParkingProps,
} from "../../api/SystemAdmin/Parking";

function ParkingForm() {
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  const params = useParams<{ id: string }>();
  const { data: singleParkingData } = useQuery(
    "parking",
    () => getParkingById(+params?.id!),
    {
      enabled: !!params?.id,
      cacheTime: 0,
    }
  );
  const onSubmit: SubmitHandler<ParkingProps> = async (data) => {
    if (pathName === "/parking/new") {
      mutateCreateParking(data);
    } else {
      mutateUpdateParking({ id: +params.id!, data });
    }
  };
  const { register, handleSubmit } = useForm<ParkingProps>({
    defaultValues: singleParkingData?.data.parking,
    values: singleParkingData?.data.parking,
  });

  const { mutate: mutateCreateParking } = useMutation(createParking, {
    onSuccess: () => navigate("/parkings"),
  });
  const { mutate: mutateUpdateParking } = useMutation(updateParking, {
    onSuccess: () => navigate("/parkings"),
  });

  return (
    <div className="page-template">
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="form-make-container glass-bg"
      >
        <Form.Group className="form-group">
          <Form.Label>نام</Form.Label>
          <Form.Control type="name" {...register("name", { required: true })} />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>شماره تماس</Form.Label>
          <Form.Control
            type="phone"
            {...register("phone", { required: true })}
          />
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label>آدرس</Form.Label>
          <Form.Control
            type="address"
            as="textarea"
            {...register("address", { required: true })}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>وضعیت</Form.Label>
          <Form.Check label="فعال" {...register("enabled")} />
        </Form.Group>
        <Stack direction="horizontal" gap={2}>
          <Button variant="dark" type="submit">
            {pathName === "/parking/new" ? "ایجاد پارکینگ" : "ویرایش پارکینگ"}
          </Button>
        </Stack>
      </Form>
    </div>
  );
}

export default ParkingForm;
