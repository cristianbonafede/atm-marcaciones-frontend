import http from "./http";


// Obtener todas las dedicaciones con filtros opcionales
export const getDedicaciones = (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.name) params.append('name', filters.name);
  if (filters.status) params.append('status', filters.status);
  if (filters.default !== undefined) params.append('default', filters.default);
  if (filters.percentage !== undefined) params.append('percentage', filters.percentage);
  if (filters.page) params.append('page', filters.page);
  if (filters.size) params.append('size', filters.size);

  return http.get(`/dedications?${params.toString()}`);
};

// Obtener dedicación por ID
export const getDedicacionById = (id) => {
  return http.get(`/dedications/${id}`);
};

// Crear nueva dedicación
export const createDedicacion = (data) => {
  return http.post('/dedications', data);
};

// Actualizar dedicación
export const updateDedicacion = (id, data) => {
  return http.put(`/dedications/${id}`, data);
};

// Eliminar dedicación
export const deleteDedicacion = (id) => {
  return http.delete(`/dedications/${id}`);
};