import React from 'react'
import styles from "./Loader.module.css";
import { Loader } from 'lucide-react';

export const LoaderAP = ({text}) => {
  return (
     <div className={styles.cargando}>
        <Loader size={48} className={styles.spinner} />
        <p className={styles.textocargando}>{text}</p>
      </div>
  )
}
