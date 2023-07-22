import { useState } from "react";
import { getProfile, UpdateProfile } from "../../api/User";
import { useForm, SubmitHandler } from "react-hook-form";
import { Toast, Button, Form, Stack, Row, Col } from "react-bootstrap";
import { useQuery, useMutation } from "react-query";

function Profile() {
  const { data: profileData } = useQuery("profile", getProfile, {
    onSuccess: (data) => {
      const regex = /^(\d+)([آ-ی])(\d+)\.(\d+)$/;
      const tagRegex = data?.data.user.car_tag?.match(regex);
      setCarTag({
        letter: tagRegex![2],
        digits3: tagRegex![3],
        digits2: tagRegex![1],
        iran: tagRegex![4],
      });
    },
  });
  const [carTag, setCarTag] = useState({
    letter: "",
    digits3: "",
    digits2: "",
    iran: "",
  });
  const [toast, setToast] = useState(false);
  const { letter, digits3, digits2, iran } = carTag;

  const tag = `${digits3}.${iran}${letter}${digits2}`;

  const { mutate } = useMutation(UpdateProfile, {
    onSuccess: () => {
      setToast(true);
      setTimeout(() => {
        window.location.href = "/";
        setToast(false);
      }, 2000);
    },
  });

  const { register, handleSubmit } = useForm({
    defaultValues: profileData?.data.user,
    values: profileData?.data.user,
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    if (data.new_password === "" || data.old_password === "")
      delete data.new_password && delete data.old_password;
    if (tag !== profileData?.data.user.car_tag)
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
        <Toast.Body>تغییرات با موفقیت انجام شد!</Toast.Body>
      </Toast>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="form-make-container glass-bg"
      >
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
            disabled
            {...register("phone", { required: true })}
          />
        </Form.Group>
        <Form.Group className="form-group" style={{ marginBottom: "-7px" }}>
          <Form.Label>
            پلاک خودرو <strong>{`: ${tag}`}</strong>
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
                onChange={(e) => {
                  if (e.target.value.length === 4) {
                    e.target.value = e.target.value.slice(1, 0);
                  }
                  CarTagChangeHandler(e, "digits3");
                }}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="حرف"
                value={letter}
                type="text"
                onChange={(e) => {
                  CarTagChangeHandler(e, "letter");
                }}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="2 رقم"
                value={digits2}
                type="number"
                maxLength={2}
                onChange={(e) => {
                  if (e.target.value.length === 3) {
                    e.target.value = e.target.value.slice(1, 0);
                  }
                  CarTagChangeHandler(e, "digits2");
                }}
              />
            </Col>
          </Row>
          <span className="danger">* در صورت تمایل به تغییر پلاک خودرو</span>
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>رمز ورود (قدیمی)</Form.Label>
          <Form.Control type="password" {...register("old_password")} />
          <span className="danger"> * در صورت تمایل به تغییر رمز ورود</span>
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>رمز ورود (جدید)</Form.Label>
          <Form.Control type="password" {...register("new_password")} />
          <span className="danger"> * در صورت تمایل به تغییر رمز ورود</span>
        </Form.Group>
        <Stack direction="horizontal" gap={2}>
          <Button variant="dark" type="submit" onClick={handleSubmit(onSubmit)}>
            ویرایش پروفایل
          </Button>
        </Stack>
      </Form>
    </div>
  );
}

export default Profile;
