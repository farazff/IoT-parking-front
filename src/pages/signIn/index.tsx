import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Stack, Toast } from "react-bootstrap";
import { useMutation } from "react-query";
import { GeneralDataContext } from "../../store/GeneralContext";
import { roleType, SignIn } from "../../api/SignIn";
import IconLogo from "../../assets/icons/Parking.svg";
import { setApiKey, setToken, setNumber } from "../../utils/LocalStorage";

type Inputs = {
  role: roleType;
  phone: string;
  password: string;
};

function SignInForm() {
  const { register, handleSubmit } = useForm<Inputs>();
  const [toast, setToast] = useState(false);
  const [, setState] = useContext(GeneralDataContext);
  const { mutate } = useMutation(SignIn, {
    onSuccess: (res, values) => {
      setToken(res.headers["session_token"]);
      setState(true);
      setNumber(values.phone);
      window.location.href = "/";
    },
    onError: () => {
      setToast(true);
      setTimeout(() => setToast(false), 2000);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await setApiKey(data.role);
    mutate(data);
  };

  return (
    <div className="page-template">
      <Toast className="toast" show={toast} onClose={() => setToast(!toast)}>
        <Toast.Body>کاربر مورد نظر یافت نشد!</Toast.Body>
      </Toast>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="form-container glass-bg"
      >
        <img src={IconLogo} alt="logo" width={60} className="mb-4" />
        <Form.Group className="form-group">
          <Form.Label>نوع کاربر</Form.Label>
          <Form.Control as="select" {...register("role", { required: true })}>
            <option value="sysAdmin">سیستم ادمین</option>
            <option value="parkingAdmin">پارکینگ ادمین</option>
            <option value="user">کاربر معمولی</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>شماره موبایل</Form.Label>
          <Form.Control
            type="phone"
            {...register("phone", { required: true })}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>رمز ورود</Form.Label>
          <Form.Control
            type="password"
            {...register("password", { required: true })}
          />
        </Form.Group>
        <Stack direction="vertical" gap={2} className="mt-3">
          <Button variant="dark" type="submit">
            ورود با اکانت
          </Button>
          <Button
            variant="link-dark"
            style={{ textDecoration: "none" }}
            type="button"
            href="/sign-up"
          >
            ثبت نام
          </Button>
        </Stack>
      </Form>
      <span
        style={{
          color: "#ccc",
          fontSize: "12px",
          width: "500px",
          textAlign: "left",
          marginLeft: "40px",
          marginTop: "8px",
        }}
      >
        پنل مدیریتی پارکینگ هوشمند
      </span>
    </div>
  );
}

export default SignInForm;
