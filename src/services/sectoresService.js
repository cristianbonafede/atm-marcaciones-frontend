import http from "./http";

export const getSectorById = (id) => {
  return http.get(`crews/${id}`);
};

export const createSector = (sector) => {
  return http.post("crews", sector);
};

export const updateSector = (id, sector) => {
  return http.put(`crews/${id}`, sector);
};

export const getCrewCategories = () => {
  return http.get("/crewCategories?Page=1&Size=10000");
};

export const getWorkplaces = () => {
  return http.get("/workplaces?Page=1&Size=10000");
};

export const getWorkingHours = () => {
  return http.get("/workingHours?Page=1&Size=10000");
};

export const getDedications = () => {
  return http.get("/dedications?Page=1&Size=10000");
};

export const getBosses = () => {
  return http.get("crews/bosses");
};

export const getParentSectors = () => {
  return http.get(`crews?Page=1&Size=10000`);
};