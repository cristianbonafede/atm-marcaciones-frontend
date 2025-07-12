import { createContext, useState } from "react";

const PerfilContext = createContext({
  modulos: [],

  updateModulos: (list) => {},
  toggleModulo: (id) => {},
  toggleAction: (id) => {},
  getSelected: () => {},
});

export function PerfilContextProvider(props) {
  // State
  const [modulos, setModulos] = useState([]);

  // Methods
  const updateModulos = (list, selected) => {
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < list[i].acciones.length; j++) {
        list[i].acciones[j].nombre = list[i].acciones[j].nombre
          .split("-")[1]
          .trim();

        if (selected.indexOf(list[i].acciones[j].id) > -1) {
          list[i].acciones[j].seleccionada = true;
        }
      }

      list[i].seleccionado =
        list[i].acciones.length ===
        list[i].acciones.filter((x) => x.seleccionada).length;
    }

    setModulos(list);
  };

  const toggleModulo = (id, selected) => {
    let nModulos = [...modulos];

    let item = nModulos.find((x) => x.id === id);
    const index = nModulos.indexOf(item);

    item.seleccionado = selected;
    item.acciones = item.acciones.map((action) => ({
      ...action,
      seleccionada: selected,
    }));

    nModulos[index] = item;
    setModulos(nModulos);
  };

  const toggleAction = (id, selected) => {
    let nModulos = [...modulos];

    let item = nModulos.find(
      (x) => x.acciones.find((y) => y.id === id) !== undefined
    );
    const index = nModulos.indexOf(item);

    item.acciones = item.acciones.map((action) =>
      action.id === id
        ? {
            ...action,
            seleccionada: selected,
          }
        : action
    );
    item.seleccionado =
      item.acciones.length === item.acciones.filter((x) => x.seleccionada);

    nModulos[index] = item;
    setModulos(nModulos);
  };

  const getSelected = () => {
    let selected = [];

    modulos.forEach((modulo) => {
      modulo.acciones.forEach((action) => {
        if (action.seleccionada) {
          selected.push(action.id);
        }
      });
    });

    return selected;
  };

  const context = {
    modulos: modulos,
    updateModulos: updateModulos,
    toggleModulo: toggleModulo,
    toggleAction: toggleAction,
    getSelected: getSelected,
  };

  return (
    <PerfilContext.Provider value={context}>
      {props.children}
    </PerfilContext.Provider>
  );
}

export default PerfilContext;
