import { useContext, useEffect, useState } from "react";
import { Button } from "antd";

import SolicitudContext from "../../store/solicitud-context";

import classes from "./solicitudes-validaciones.module.scss";
import http from "../../services/http";

import icon from "./../../assets/images/verified.png";
import check from "./../../assets/images/check.png";
import close from "./../../assets/images/close.png";
import warning from "./../../assets/images/warning.png";
import { modalError } from "../../services/notifications";

const SolicitudesValidaciones = (props) => {
  const context = useContext(SolicitudContext);
  const [loading, setLoading] = useState(false);

  const [validations, setValidations] = useState([
    {
      type: "boolean",
      title: "Documento - Lista Negra BIND",
      property: "documentoListaNegraBind",
      errorProperty: "errorListaNegraBind",
      expected: false,
      empty: "No se consultó el servicio de documentos en la lista negra BIND",
      success: "El documento no se encuentra registrado en la lista negra BIND.",
      failed: "El documento se encuentra registrado en la lista negra BIND.",
      error:
        "Ocurrió un error al consultar el servicio de documentos en la lista negra BIND",
    },
    {
      type: "boolean",
      title: "Documento - Lista Blanca",
      property: "documentoListaBlanca",
      expected: true,
      empty: "No se consultó la lista blanca de documentos",
      success: "El documento se encuentra registrado en la lista blanca.",
      failed: "El documento no se encuentra registrado en la lista blanca.",
    },
    {
      type: "boolean",
      title: "Documento - Lista Negra",
      property: "documentoListaNegra",
      expected: false,
      empty: "No se consultó la lista negra de documentos",
      success: "El documento no se encuentra registrado en la lista negra.",
      failed: "El documento se encuentra registrado en la lista negra.",
    },
    {
      type: "notNull",
      title: "Afip - Actividad",
      property: "afipActividad",
      errorProperty: "errorAfip",
      empty: "No se consultó el servicio de AFIP",
      success: "La persona esta registrada en AFIP con una actividad.",
      failed: "La persona no esta registrada en AFIP con una actividad.",
      error: "Ocurrió un error al consultar el servicio de AFIP",
    },
    {
      type: "notNull",
      title: "Nosis",
      property: "errorNosis",
      errorProperty: "errorNosis",
      empty: "No se consultó el servicio de Nosis",
      success: "Se consultó a Nosis correctamente.",
      failed: "Se consultó a Nosis correctamente.",
      error: "Ocurrió un error al consultar el servicio de Nosis",
    },
    {
      type: "boolean",
      title: "Worldsys - Terrorista",
      property: "worldsysTerrorista",
      errorProperty: "errorWorldsys",
      expected: false,
      empty: "No se consultó el servicio de Worldsys",
      success: "La persona no aparece en bases de datos de Terroristas.",
      failed: "La persona aparece en bases de datos de Terroristas.",
      error: "Ocurrió un error al consultar el servicio de Worldsys",
    },
    {
      type: "boolean",
      title: "Worldsys - P.E.P",
      property: "worldsysPep",
      errorProperty: "errorWorldsys",
      expected: false,
      empty: "No se consultó el servicio de Worldsys",
      success:
        "La persona no está registrada como Persona Expuesta Politicamente.",
      failed: "La persona está registrada como Persona Expuesta Politicamente.",
      error: "Ocurrió un error al consultar el servicio de Worldsys",
    },
    {
      type: "boolean",
      title: "Uif- Sujeto Obligado",
      property: "uifSujetoObligado",
      errorProperty: "errorUif",
      expected: false,
      empty: "No se consultó el servicio de Uif",
      success: "La persona no está registrada como Sujeto Obligado.",
      failed: "La persona está registrada como Sujeto Obligado.",
      error: "Ocurrió un error al consultar el servicio de Uif",
    },
    {
      type: "text",
      title: "Prueba de Vida - Intentos",
      property: "addaliaIntentos",
      empty: "No se consultó el servicio de prueba de vida",
      success: "Cantidad de intentos para la prueba de vida.",
    },
    {
      type: "boolean",
      title: "Validacion Facial",
      property: "addaliaValidacionFacial",
      expected: true,
      empty: "No se consultó el servicio de Validación Facial",
      success: "La persona pasó la prueba de validación facial.",
      failed: "La persona no pasó la prueba de validación facial.",
    },
    {
      type: "boolean",
      title: "Prueba Vida",
      property: "addaliaPruebaVida",
      expected: true,
      empty: "No se consultó el servicio de prueba de vida",
      success: "La persona pasó la prueba de vida.",
      failed: "La persona no pasó la prueba de vida.",
    },
    {
      type: "text",
      title: "Comparación Facial",
      property: "amazonComparacionFacial",
      errorProperty: "errorAmazon",
      empty: "No se consultó el servicio de comparación facial",
      success: "Porcentaje de similitud entre la foto del DNI y la selfie.",
      error: "Ocurrió un error al consultar el servicio de Amazon",
    },
    {
      type: "text",
      title: "Renaper Rostro - Scoring",
      property: "comparacionFacialRenaperScoring",
      errorProperty: "errorRenaper",
      empty: "No se consultó el servicio de RENAPER Rostro",
      success: "Scoring obtenido para la comparación facial",
      error: "Ocurrió un error al consultar el servicio de RENAPER Rostro",
    },
    {
      type: "boolean",
      title: "Email - Lista Negra",
      property: "emailListaNegra",
      expected: false,
      empty: "No se consultó la lista negra de emails",
      success: "El email no se encuentra registrado en la lista negra.",
      failed: "El email se encuentra registrado en la lista negra.",
    },
    {
      type: "text",
      title: "Email - Scoring",
      property: "emailScoring",
      errorProperty: "errorSeon",
      empty: "No se consultó el servicio de scoring",
      success: "Scoring obtenido para la direccion de correo",
      error: "Ocurrió un error al consultar el servicio de scoring",
    },
    {
      type: "boolean",
      title: "Teléfono - Lista Negra",
      property: "telefonoListaNegra",
      expected: false,
      empty: "No se consultó la lista negra de teléfonos",
      success: "El teléfono no se encuentra registrado en la lista negra.",
      failed: "El teléfono se encuentra registrado en la lista negra.",
    },
    {
      type: "text",
      title: "Teléfono - Scoring",
      property: "telefonoScoring",
      errorProperty: "errorSeon",
      empty: "No se consultó el servicio de scoring",
      success: "Scoring obtenido para el número de teléfono",
      error: "Ocurrió un error al consultar el servicio de scoring",
    },
    {
      type: "boolean",
      title: "Terminos & Condiciones",
      property: "aceptaTyc",
      expected: true,
      empty: "No se han mostrado los terminos y condiciones",
      success: "La persona acepto los terminos y condiciones",
      failed: "La persona no acepto los terminos y condiciones",
    },
    {
      type: "boolean",
      title: "Morfologia",
      property: "morfologiaDocNoEncontrado",
      errorProperty: "errorMorfologia",
      expected: false,
      empty: "No se consultó el servicio de morfologia",
      success: "Documento encontrado en imagenes correctamente",
      failed: "Documento no encontrado en imagenes",
      error: "Ocurrió un error al consultar el servicio de morfologia",
    },
    {
      type: "boolean",
      title: "Terminos & Condiciones Comitente",
      errorProperty: "errorCuentaComitente",
      property: "aceptaTycComitente",
      expected: true,
      empty: "No se han mostrado los terminos y condiciones de cuenta comitente",
      success: "La persona acepto los terminos y condiciones de cuenta comitente",
      failed: "La persona no acepto los terminos y condiciones de cuenta comitente",
      error: "Ocurrió un error al consultar el servicio de cuenta comitente",
    },
    {
      type: "text",
      title: "Puntaje de Riesgo",
      property: "puntajeRiesgo",
      empty: "No se ha calculado la matriz de riesgo",
      success: "Puntaje obtenido al ejecutar la matriz de riesgo",
    },
  ]);

  useEffect(() => {
    if (context.solicitud.id) {
      const nValidations = [...validations];
      for (let i = 0; i < nValidations.length; i++) {
        const value = context.solicitud[nValidations[i].property];
        const error = context.solicitud[nValidations[i].errorProperty];

        if (nValidations[i].type === "boolean") {
          if (error) {
            nValidations[i].description = nValidations[i].error;
            nValidations[i].value = (
              <img src={warning} alt="error" className={classes.warning} />
            );
            nValidations[i].status = "error";
          } else if (value === undefined || value === null) {
            nValidations[i].description = nValidations[i].empty;
            nValidations[i].value = "-";
            nValidations[i].status = "empty";
          } else if (value === nValidations[i].expected) {
            nValidations[i].description = nValidations[i].success;
            nValidations[i].value = (
              <img src={check} alt="aprobado" className={classes.success} />
            );
            nValidations[i].status = "success";
          } else if (value !== nValidations[i].expected) {
            nValidations[i].description = nValidations[i].failed;
            nValidations[i].value = (
              <img src={close} alt="rechazado" className={classes.failed} />
            );
            nValidations[i].status = "failed";
          }
        }

        if (nValidations[i].type === "text") {
          if (error) {
            nValidations[i].description = nValidations[i].error;
            nValidations[i].value = (
              <img src={warning} alt="error" className={classes.warning} />
            );
            nValidations[i].status = "error";
          } else if (value === undefined || value === null) {
            nValidations[i].description = nValidations[i].empty;
            nValidations[i].value = "-";
            nValidations[i].status = "empty";
          } else {
            nValidations[i].description = nValidations[i].success;
            nValidations[i].value = value;
            nValidations[i].status = "success";
          }
        }

        if (nValidations[i].type === "notNull") {
          if (error) {
            nValidations[i].description = nValidations[i].error;
            nValidations[i].value = (
              <img src={warning} alt="error" className={classes.warning} />
            );
            nValidations[i].status = "error";
          } else if (value === undefined || value === null) {
            nValidations[i].description = nValidations[i].empty;
            nValidations[i].value = "-";
            nValidations[i].status = "empty";
          } else if (value !== "") {
            nValidations[i].description = nValidations[i].success;
            nValidations[i].value = (
              <img src={check} alt="aprobado" className={classes.success} />
            );
            nValidations[i].status = "success";
          } else if (value === "") {
            nValidations[i].description = nValidations[i].failed;
            nValidations[i].value = (
              <img src={close} alt="rechazado" className={classes.failed} />
            );
            nValidations[i].status = "failed";
          }
        }
      }

      setValidations(nValidations);

      console.log(nValidations);
      console.log(nValidations.filter((x) => x.status === "error").length);
    }
  }, [context.solicitud]);

  const onClickInform = async () => {
    setLoading(true);
    var id = context.solicitud.id;
    const response = await http.patch(`solicitudes/${id}/reprocesar-consulta`, {})
      .catch(async (error) => {
        console.log("Response:", error.response);
        setLoading(false);
        modalError(
          "Error al reprocesar",
          error.response.data.errores[0].detalle
        );
      });
    if (response) {
      context.reloader();
    }
    setLoading(false);
  };
  return (
    <div>
      <div className={classes.header}>
        <div className={classes.icon}>
          <img src={icon} alt="emails" />
        </div>
        <div className={classes.data}>
          <div className={classes.title}>Validaciones</div>
          <div className={classes.description}>
            Resultados de las diferentes validaciones realizadas durante el
            proceso.
          </div>
        </div>
      </div>
      <div className={classes.list}>
        {validations.map((validation, index) => (
          <div key={index} className={classes.validation}>
            <div className={classes.data}>
              <div className={classes.title}>{validation.title}</div>
              <div className={classes.description}>
                {validation.description}
              </div>
            </div>
            <div className={classes.value}>{validation.value}</div>
          </div>
        ))}
      </div>
      {validations.filter((x) => x.status === "error").length > 0 && (
        <div>
          <div className={classes.warnings}>
            <img src={warning} alt="error" className={classes.icon} />
            <div className={classes.description}>
              <span className={classes.title}>Advertencia:</span> la solicitud no
              se aprobara automaticamente ya que uno de los servicios no pudo ser
              consultado.
            </div>
          </div>
          <div className={classes.warnings}>
            <Button type="primary" onClick={onClickInform}
              loading={loading}>
              Reprocesar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SolicitudesValidaciones;
