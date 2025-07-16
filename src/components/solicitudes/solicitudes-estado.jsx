import { Tag, Tooltip } from "antd";

const SolicitudesEstado = (props) => {
  const { className, estado, title, step } = props;

  const getSept = (step) => {
    step = step?.replace("update-", "");
    return ` (${step})`;
  }

  switch (estado) {
    case 1:
      return (
        <Tag className={className} color="gold" >
          Pendiente
          {step && (
            (getSept(step))
          )}
        </Tag>
      );

    case 2:
      return (

        <Tag className={className} color="green">
          Aprobada
        </Tag>

      );

    case 3:
      return (
        <Tooltip title={title}>
          <Tag className={className} color="red">
            Rechazada
          </Tag>
        </Tooltip>
      );

    case 4:
      return (
        <Tooltip title={title}>
          <Tag className={className} color="orange">
            Verificación Manual
          </Tag>
        </Tooltip>
      );

    case 5:
      return (
        <Tooltip title={title}>
          <Tag className={className} color="lime">
            Pendiente credenciales
          </Tag>
        </Tooltip>
      );

    case 6:
      return (
        <Tooltip title={title}>
          <Tag className={className} color="volcano">
            Error en alta
          </Tag>
        </Tooltip>
      );

    case 7:
      return (
        <Tooltip title={title}>
          <Tag className={className} color="lime">
            Aprobado a Revisar
          </Tag>
        </Tooltip>
      );

    case 8:
      return (
        <Tooltip title={title}>
          <Tag className={className} color="yellow">
            Aprobado sin notificar
          </Tag>
        </Tooltip>
      );
    case 9:
      return (
        <Tooltip title={title}>
          <Tag className={className} color="red">
            Vencida
          </Tag>
        </Tooltip>
      );

    default:
      return "-";
  }
};

export default SolicitudesEstado;
