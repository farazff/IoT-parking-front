import api from "../API";
import { SignUpProps } from "../SignIn";

export const getParkingAdminByID = (id: number) => {
  return api.get(`v1/parkingAdmin/${id}`);
};

export const getParkingAdmins = () => {
  return api.get(`v1/parkingAdmins`);
};

export const createParkingAdmin = (data: SignUpProps) => {
  return api.post(`v1/parkingAdmin`, data);
};

export const updateParkingAdmin = ({
  id,
  data,
}: {
  id: number;
  data: SignUpProps;
}) => {
  return api.put(`v1/parkingAdmin/${id}`, data);
};

export const deleteParkingAdmin = (id: number) => {
  return api.delete(`v1/parkingAdmin/${id}`);
};
