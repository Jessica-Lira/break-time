import { Profiler } from "react"

import styles from "../styles/components/Profile.module.css";

export function Profile(){
    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/jessica-lira.png" alt="imagem de perfil Jessica Lira"/>
            <div>
                <strong>Jéssica Lira</strong>

                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level 1
                </p>
            </div>
        </div>
    );
}