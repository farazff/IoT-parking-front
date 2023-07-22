import api from "../API";

export type ParkingProps = {
  name: string;
  address: string;
  phone: string;
  enabled: boolean;
};

export const getParkingById = (id: number) => {
  return api.get(`v1/parking/${id}`);
};

export const getParkings = () => {
  return api.get(`v1/parkings`);
};

export const createParking = (data: ParkingProps) => {
  return api.post(`v1/parking`, data);
};

export const updateParking = ({
  id,
  data,
}: {
  id: number;
  data: ParkingProps;
}) => {
  return api.put(`v1/parking/${id}`, data);
};

export const deleteParking = (id: number) => {
  return api.delete(`v1/parking/${id}`);
};
