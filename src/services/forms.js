export const required = {
  required: true,
  message: "Este campo es obligatorio",
};

export const rango = (min, max) => {
  return () => ({
    validator(rule, value) {
      const number = parseFloat(value);
      if (number >= min && number <= max) {
        return Promise.resolve();
      }
      return Promise.reject(`El valor debe estar entre ${min} y ${max}`);

    },
  });
};

export const valorPositivo = {
  message: "El campo debe ser mayor o igual a 0",
  validator: (_, value) => {
    if (value < 0 ) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  }
};
export const guid = {
  message: "El campo debe cumplir con el formato de un GUID",
  validator: (_, value) => {
    const regex =
      /^([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})|[0-9]+$/i;

    if (regex.test(value)) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  },
};
