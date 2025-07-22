import http from "./http";

export const locations = async () => {
  let response = await http.get("locations?Page=1&Size=10000");
  if (response) {
    return response.data.list;
  }
  return [];
} 