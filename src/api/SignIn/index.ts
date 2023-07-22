import api from "../API";

export type roleType = "user" | "sysAdmin" | "parkingAdmin";
export type roleApiKey = "user" | "system" | "parking";

export const logout = () => {
  localStorage.clear();
  window.location.href = "/";
};

export type SignUpProps = {
  phone: string;
  password: string;
  first_name: string;
  last_name: string;
  parking_id: number;
  enabled: boolean;
};

export type UserSignUpProps = {
  phone: string;
  password: string;
  first_name: string;
  last_name: string;
  car_tag: string;
};

type ParkingAdminCrudProps = {
  method: "POST" | "PUT" | "DELETE";
  adminId: number;
} & SignUpProps;

export const SignIn = ({
  phone,
  password,
  role,
}: {
  phone: string;
  password: string;
  role: roleType;
}) => {
  switch (role) {
    case "user":
      return api.post("user/signIn", {
        phone: phone,
        password: password,
      });
    case "sysAdmin":
      return api.post("systemAdmin/signIn", {
        phone: phone,
        password: password,
      });
    case "parkingAdmin":
      return api.post("parkingAdmin/signIn", {
        phone,
        password,
      });
  }
};

export const UserSignUp = (body: UserSignUpProps) => {
  return api.post("user/signUp", {
    ...body,
  });
};

export const ParkingAdminCrud = ({
  method,
  adminId,
  ...body
}: ParkingAdminCrudProps) => {
  switch (method) {
    case "POST":
      return api.post("v1/parkingAdmin", {
        ...body,
      });
    case "PUT":
      return api.put(`v1/parkingAdmin/${adminId}`, {
        ...body,
      });
    case "DELETE":
      return api.delete(`v1/parkingAdmin/${adminId}`);
  }
};

export const SignOut = (role: roleApiKey) => {
  switch (role) {
    case "user":
      return api.post("user/signOut");
    case "system":
      return api.post("systemAdmin/signOut");
    case "parking":
      return api.post("parkingAdmin/signOut");
  }
};

export const RenewToken = (role: roleType) => {
  switch (role) {
    case "user":
      return api.post("user/refresh-token");
    case "sysAdmin":
      return api.post("/systemAdmin/refresh-token");
    case "parkingAdmin":
      return api.post("parkingAdmin/refresh-token");
  }
};
