import api from "../API";

export const getWhiteListToApprove = () => {
  return api.get(`v1/whitelists/toApprove`);
};

export const getApprovedWhiteLists = () => {
  return api.get(`v1/whitelists/approved`);
};

export const approveWhiteList = (id: number) => {
  return api.put(`v1/whitelist/approve/${id}`);
};

export const deleteWhiteList = (id: number) => {
  return api.delete(`v1/whitelists/${id}`);
};
