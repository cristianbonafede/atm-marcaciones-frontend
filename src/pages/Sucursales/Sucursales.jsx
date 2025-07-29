import React, { useEffect, useState } from 'react';
import styles from './Sucursales.module.scss';
import http from '../../services/http';

const Spinner = () => (
  <div className={styles.spinnerContainer}>
    <div className={styles.spinner}></div>
    <span>Cargando sucursales...</span>
  </div>
);

const estadoColor = {
  online: styles.cardOnline,
  warning: styles.cardWarning,
  offline: styles.cardOffline,
};

const SucursalesPage = () => {
  const [sucursalesData, setSucursalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const response = await http.get("sucursales");
      if (response) {
        const data = response.data;
        setSucursalesData(data);
      }
      setLoading(false);
    }
    getData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sucursales activas</h2>
      <div className={styles.cardsGrid}>
        {sucursalesData.map((sucursal, idx) => (
          <div
            key={idx}
            className={`${styles.card} ${estadoColor[sucursal.estado] || ''}`}
          >
            <div className={styles.cardHeader}>
              <b>{sucursal.nombre}</b>
              <span className={styles.estado}>{sucursal.estado === 'online' ? '🟢' : sucursal.estado === 'warning' ? '🟠' : '🔴'}</span>
            </div>
            <div className={styles.cardBody}>
              <div><b>Admin:</b> {sucursal.admin}</div>
              <div><b>Ahora:</b> {sucursal.ahora} <span className={styles.porcentaje}>{sucursal.porcentajeAhora}%</span></div>
              <div><b>Hoy:</b> {sucursal.hoy} <span className={styles.porcentaje}>{sucursal.porcentajeHoy}%</span></div>
              <div><b>Asignados:</b> {sucursal.asignados}</div>
            </div>
            <button className={styles.detallesBtn}>Detalles</button>
          </div>
        ))}
      </div>
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
