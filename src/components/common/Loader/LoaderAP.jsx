import React from 'react'
import styles from "./Loader.module.css";
import { Loader } from 'lucide-react';

export const LoaderAP = ({text}) => {
  return (
     <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>{text}</p>
      </div>
  )
}
