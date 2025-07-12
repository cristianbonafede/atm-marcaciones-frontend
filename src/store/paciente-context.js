import { createContext, useState } from "react";

const PacienteContext = createContext({
  paciente: {},
  reload: {},
  updatePaciente: () => {},
  reloader: () => {},
});

export function PacienteContextProvider(props) {
  // State
  const [paciente, setPaciente] = useState({
    archivos: [],
    json: [],
  });
  const [reload, setReload] = useState({});

  // Methods
  const updatePaciente = (item) => {
    setPaciente(item);
  };
  const reloader = () => {
    setReload(!reload);
  };

  const context = {
    paciente: paciente,
    reload: reload,
    updatePaciente: updatePaciente,
    reloader: reloader
  };

  return (
    <PacienteContext.Provider value={context}>
      {props.children}
    </PacienteContext.Provider>
  );
}

export default PacienteContext;
