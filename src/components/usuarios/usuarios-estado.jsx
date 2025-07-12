import { Tag } from "antd";

const UsuariosEstado = (props) => {
  const { className, estado } = props;

  if (estado) {
    return (
      <Tag className={className} color="green">
        Habilitado
      </Tag>
    );
  }
  return (
    <Tag className={className} color="red">
      Deshabilitado
    </Tag>
  );
};

export default UsuariosEstado;
