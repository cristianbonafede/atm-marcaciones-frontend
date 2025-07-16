import React, { useEffect, useState } from 'react';
import styles from './Sucursales.module.scss';
import http from '../../services/http';


const SucursalesPage = () => {

  const [sucursalesData, setSucursalesData] = useState([]);
  useEffect(() => {
    async function getData() {
        const response = await http.get("sucursales");
  
        if (response) {
          const data = response.data;
 
          setSucursalesData(data);
        }
      }
  
      getData();
    }, []);
  
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sucursales activas</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Sucursal</th>
            <th>Admin</th>
            <th>Ahora</th>
            <th>%</th>
            <th>Hoy</th>
            <th>%</th>
            <th>Asignados</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sucursalesData.map((sucursal, idx) => {
            let rowClass = '';
            if (sucursal.estado === 'online') rowClass = styles['left-border'];
            else if (sucursal.estado === 'warning') rowClass = styles['left-border-warning'];
            else if (sucursal.estado === 'offline') rowClass = styles['left-border-offline'];
            return (
              <tr key={idx} >
                <td className={rowClass}><b>{sucursal.nombre}</b></td>
                <td>{sucursal.admin}</td>
                <td>{sucursal.ahora}</td>
                <td>{sucursal.porcentajeAhora}</td>
                <td>{sucursal.hoy}</td>
                <td>{sucursal.porcentajeHoy}</td>
                <td>{sucursal.asignados}</td>
                <td><button className={styles.detallesBtn}>Detalles</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.referencias}>
        <span className={styles.refTitle}>Referencias</span>
        <span className={styles.refOnline}><span className={styles.dot + ' ' + styles.online}></span>En línea</span>
        <span className={styles.refWarning}><span className={styles.dot + ' ' + styles.warning}></span>En línea - Mala conexión</span>
        <span className={styles.refOffline}><span className={styles.dot + ' ' + styles.offline}></span>Fuera de línea</span>
      </div>
    </div>
  );
};

export default SucursalesPage;
