import api from "../API";

export type ZoneProps = {
  capacity: number;
  enabled: boolean;
  remained_capacity: number;
};

export const getZoneById = (id: number) => {
  return api.get(`v1/zone/${id}`);
};

export const getZones = () => {
  return api.get(`v1/zones`);
};

export const createZone = (data: ZoneProps) => {
  return api.post(`v1/zone`, data);
};

export const updateZone = ({ id, data }: { id: number; data: ZoneProps }) => {
  return api.put(`v1/zone/${id}`, data);
};

export const deleteZone = (id: number) => {
  return api.delete(`v1/zone/${id}`);
};

export const parkingAdminLog = (page: number) => {
  return api.get(`/v1/logs/${page}`);
};
