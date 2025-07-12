import swal from "sweetalert";
import { toast } from "react-toastify";
import {
  FaCheckCircle,
  FaInfo,
} from "react-icons/fa";
import {
  FiAlertCircle, FiAlertTriangle,
} from "react-icons/fi";

export const confirm = (title, text) => {
  return swal({
    title: title,
    text: text,
    icon: "warning",
    buttons: ["Cancelar", "Confirmar"],
  });
};

export const modalSuccess = (title, text) => {
  return swal({
    title: title,
    text: text,
    icon: "success",
    buttons: [false, "Aceptar"],
  });
};

export const modalError = (title, text) => {
  return swal({
    title: title,
    text: text,
    icon: "error",
    buttons: [false, "Aceptar"],
  });
};

export const toastSuccess = (text) => {
  toast.success(text, {
    position: "bottom-right",
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const renderAlert = (type, message) => {
  let icon = "";
  let title = "";

  switch (type) {
    case "success":
      icon = <FaCheckCircle />;
      title = "Éxito";
      break;

    case "info":
      icon = <FaInfo />;
      title = "Información";
      break;

    case "warning":
      icon = <FiAlertTriangle />;
      title = "Advertencia";
      break;

    case "error":
      icon = <FiAlertCircle />;
      title = "Errors";
      break;

    default:
      break;
  }

  return (
    <div className={`alert ${type}`}>
      <div className="title">
        <div className="icon">{icon}</div>
        {title}
      </div>
      <div className="description">{message}</div>
    </div>
  );
};
