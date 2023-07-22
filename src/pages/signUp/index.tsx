import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Stack, Toast, Row, Col, Form, Button } from "react-bootstrap";
import { useMutation } from "react-query";
import IconLogo from "../../assets/icons/Parking.svg";
import { UserSignUp, UserSignUpProps } from "../../api/SignIn";
import { setApiKey } from "../../utils/LocalStorage";

function SignUpForm() {
  const { register, handleSubmit } = useForm<UserSignUpProps>();
  const [toast, setToast] = useState(false);
  const [carTag, setCarTag] = useState({
    letter: "",
    digits3: "",
    digits2: "",
    iran: "",
  });

  const { letter, digits3, digits2, iran } = carTag;

  const tag = `${iran}-${digits3} ${letter} ${digits2}`;

  const { mutate } = useMutation(UserSignUp, {
    onSuccess: () => {
      setToast(true);
      setTimeout(() => {
        window.location.href = "/sign-in";
        setToast(false);
      }, 2000);
    },
  });

  const onSubmit: SubmitHandler<UserSignUpProps> = async (data) => {
    await setApiKey("user");
    data.car_tag = `${digits2}${letter}${digits3}.${iran}`;
    mutate(data);
  };

  const CarTagChangeHandler = (e: any, name: string) => {
    setCarTag({ ...carTag, [name]: e.target!.value });
  };

  return (
    <div className="page-template">
      <Toast
        className="toast success"
        show={toast}
        onClose={() => setToast(!toast)}
      >
        <Toast.Body>ثبت نام با موفقیت انجام شد!</Toast.Body>
      </Toast>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="form-container glass-bg"
      >
        <img src={IconLogo} alt="logo" width={60} className="mb-4" />
        <Form.Group className="form-group">
          <Form.Label>نام</Form.Label>
          <Form.Control
            type="text"
            {...register("first_name", { required: true })}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>نام خانوادگی</Form.Label>
          <Form.Control
            type="text"
            {...register("last_name", { required: true })}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>شماره موبایل</Form.Label>
          <Form.Control
            type="number"
            {...register("phone", { required: true })}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>
            پلاک خودرو
            {Object.values(carTag).some((value) => value === "") ? (
              ""
            ) : (
              <strong> {tag}</strong>
            )}
          </Form.Label>
          <Row>
            <Col>
              <Form.Control
                placeholder="ایران"
                value={iran}
                type="number"
                maxLength={2}
                onChange={(e) => {
                  if (e.target.value.length === 3) {
                    e.target.value = e.target.value.slice(1, 0);
                  }
                  CarTagChangeHandler(e, "iran");
                }}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="3 رقم"
                value={digits3}
                type="number"
                maxLength={3}
                onChange={(e) => CarTagChangeHandler(e, "digits3")}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="حرف"
                value={letter}
                type="text"
                onChange={(e) => CarTagChangeHandler(e, "letter")}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="2 رقم"
                value={digits2}
                type="number"
                maxLength={2}
                onChange={(e) => CarTagChangeHandler(e, "digits2")}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>رمز ورود</Form.Label>
          <Form.Control
            type="text"
            {...register("password", { required: true })}
          />
        </Form.Group>
        <Stack direction="vertical" gap={2} className="mt-3">
          <Button variant="dark" type="submit">
            ثبت اکانت جدید
          </Button>
          <Button
            variant="link-dark"
            style={{ textDecoration: "none" }}
            type="button"
            href="/sign-in"
          >
            ورود با اکانت
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

export default SignUpForm;
