import { useForm, SubmitHandler } from "react-hook-form";
import { Stack, Button, Form } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import {
  createParkingAdmin,
  updateParkingAdmin,
  getParkingAdminByID,
} from "../../api/SystemAdmin/ParkingAdmin";
import { getParkings } from "../../api/SystemAdmin/Parking";

export type ParkingAdminProps = {
  phone: string;
  password: string;
  first_name: string;
  last_name: string;
  parking_id: number;
  enabled: boolean;
};

function ParkingAdminForms() {
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  const params = useParams<{ id: string }>();
  const { data: parkings } = useQuery("parkings", getParkings);
  const { data: singleParkingAdminData } = useQuery(
    "parking-admin",
    () => getParkingAdminByID(+params?.id!),
    {
      enabled: !!params?.id,
      cacheTime: 0,
    }
  );
  const onSubmit: SubmitHandler<ParkingAdminProps> = async (data) => {
    if (pathName === "/parking-admin/new") {
      mutateCreateParking({ ...data, parking_id: +data.parking_id });
    } else {
      mutateUpdateParking({
        id: +params.id!,
        data: { ...data, parking_id: +data.parking_id },
      });
    }
  };
  const { register, handleSubmit } = useForm<ParkingAdminProps>({
    defaultValues: singleParkingAdminData?.data.parking_admin,
    values: singleParkingAdminData?.data.parking_admin,
  });

  const { mutate: mutateCreateParking } = useMutation(createParkingAdmin, {
    onSuccess: () => navigate("/parking-admins"),
  });
  const { mutate: mutateUpdateParking } = useMutation(updateParkingAdmin, {
    onSuccess: () => navigate("/parking-admins"),
  });

  return (
    <div className="page-template">
      <Form.Group
        onSubmit={handleSubmit(onSubmit)}
        className="form-make-container glass-bg"
      >
        <Form.Group className="form-group">
          <Form.Label>نام </Form.Label>
          <Form.Control
            type="fist_name"
            {...register("first_name", { required: true })}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>نام خانوادگی</Form.Label>
          <Form.Control
            type="last_name"
            {...register("last_name", { required: true })}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>شماره تماس</Form.Label>
          <Form.Control
            type="phone"
            {...register("phone", { required: true })}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>پارکینگ</Form.Label>
          <Form.Control
            as="select"
            {...register("parking_id", { required: true })}
          >
            {parkings?.data.parkings.map((parking: any) => (
              <option key={parking.id} value={parking.id}>
                {parking.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>رمز عبور</Form.Label>
          <Form.Control
            type="password"
            {...register("password", { required: pathName.includes("new") })}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>وضعیت</Form.Label>
          <Form.Check label="فعال" {...register("enabled")} />
        </Form.Group>
        <Stack direction="horizontal" gap={2}>
          <Button variant="dark" type="submit" onClick={handleSubmit(onSubmit)}>
            {pathName === "/parking-admin/new"
              ? "ایجاد پارکینگ ادمین"
              : "ویرایش پارکینگ ادمین"}
          </Button>
        </Stack>
      </Form.Group>
    </div>
  );
}

export default ParkingAdminForms;
