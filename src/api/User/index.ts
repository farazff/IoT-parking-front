import api from "../API";

export const getParkingsList = () => {
  return api.get(`v1/user/parkings`);
};

export const getWhiteLists = () => {
  return api.get(`v1/user/whitelists/requested`);
};

export const requestWhiteList = ({ parking_id }: { parking_id: number }) => {
  return api.post(`v1/user/whitelist/request`, { parking_id });
};

export const userLogs = (id: number) => {
  return api.get(`v1/user/logs/${id}`);
};

export const getProfile = () => {
  return api.get(`v1/user`);
};

export const UpdateProfile = (data: any) => {
  return api.put(`v1/user`, data);
};
