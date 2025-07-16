import { useContext, useState } from "react";
import { Dropdown, Menu } from "antd";
import SimpleBar from "simplebar-react";
import { SpinnerCircular } from "spinners-react";
import { FiDownload, FiMoreVertical } from "react-icons/fi";

import SolicitudContext from "../../store/solicitud-context";

import classes from "./solicitudes-archivos.module.scss";

import icon from "./../../assets/images/folder.png";

import http from "../../services/http";

const SolicitudesArchivos = () => {
  const context = useContext(SolicitudContext);

  const [downloading, setDownloading] = useState(null);

  const onClickDownload = async (item) => {
    setDownloading(item);

    const response = await http.get(`archivos/${item.id}`).catch(() => {
      setDownloading(undefined);
    });

    if (response) {
      const data = response.data;
      const linkSource = `data:application/octet-stream;base64,${data.contenido}`;
      const downloadLink = document.createElement("a");
      downloadLink.href = linkSource;
      downloadLink.download = data.nombre;
      downloadLink.click();
      setDownloading(undefined);
    }
  };

  const onClickDownloadZip = async() => {
    const solicitudId = context.solicitud.id;
    setDownloading(solicitudId);

    const response = await http.get(`archivos/solicitud/${solicitudId}`).catch(()=>{
      setDownloading(undefined);
    })

    if(response){
      console.log(response.data)
      const data = response.data;
      const linkSource = `data:application/zip;base64,${data.ZipBase64}`;
      const downloadLink = document.createElement("a");
      downloadLink.href = linkSource;
      downloadLink.download = `solicitud_${solicitudId}.zip`;
      downloadLink.click();
      setDownloading(undefined);
    }
  };

  const menuHeader = (item) => (
    <Menu>
      <Menu.Item
        key="1"
        icon={<FiDownload />}
        onClick={() => onClickDownloadZip()}
      >
        Descargar Zip
      </Menu.Item>
    </Menu>
  );

  const menu = (item) => (
    <Menu>
      <Menu.Item
        key="1"
        icon={<FiDownload />}
        onClick={() => onClickDownload(item)}
      >
        Descargar
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <div className={classes.header}>
        <div className={classes.container}>
          <div className={classes.icon}>
            <img src={icon} alt="emails" />
          </div>
          <div className={classes.data}>
            <div className={classes.title}>Archivos</div>
            <div className={classes.description}>
              Descargá toda la documentación generada durante el proceso.
            </div>
          </div>
        </div>
        <div>
        {downloading === context.solicitud.id && (
                <SpinnerCircular
                  className={classes.loading}
                  size="30px"
                  thickness={150}
                  color="#7367f0"
                  secondaryColor="#eeedfd"
                />
              )}
              {downloading !== context.solicitud.id && (
                <Dropdown
                  overlay={() => menuHeader()}
                  placement="bottomRight"
                  arrow
                  trigger="click"
                >
                  <div className={classes.menu}>
                      <FiMoreVertical />
                  </div>
                </Dropdown>
              )}
        </div>
      </div>
      <SimpleBar style={{ height: "500px" }}>
        <div className={classes.list}>
          {context.solicitud.archivos.map((archivo, index) => (
            <div key={index} className={classes.item}>
              {downloading === archivo && (
                <SpinnerCircular
                  className={classes.loading}
                  size="30px"
                  thickness={150}
                  color="#7367f0"
                  secondaryColor="#eeedfd"
                />
              )}
              {downloading !== archivo && (
                <Dropdown
                  overlay={() => menu(archivo)}
                  placement="bottomLeft"
                  arrow
                  trigger="click"
                >
                  <div className={classes.menu}>
                    <FiMoreVertical />
                  </div>
                </Dropdown>
              )}
              <div className={classes.content}>
                <div className={classes.title}>{archivo.tipo}</div>
                <div className={classes.description}>{archivo.fecha} {archivo.hora}</div>
              </div>
            </div>
          ))}
        </div>
      </SimpleBar>
    </div>
  );
};

export default SolicitudesArchivos;
