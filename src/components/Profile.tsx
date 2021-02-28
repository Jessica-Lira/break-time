import { useContext } from "react"
import { ChallengesContext } from "../contexts/ChallengesContext";
import { ThemeModeContext } from '../contexts/ThemeModeContext';

import { MdWbSunny } from 'react-icons/md';
import { FaMoon } from 'react-icons/fa';

import styles from "../styles/components/Profile.module.css";

export function Profile(){
    const { toggleTheme, currentTheme } = useContext(ThemeModeContext);
    const { level } = useContext(ChallengesContext);

    return(
        <div className = {styles.profileRow}>
            <div className = {styles.profileContainer}>
                <img src="https://github.com/jessica-lira.png" alt="foto de perfil"/>
                <div>
                    <strong>Jéssica Lira</strong>

                    <p>
                        <img src="icons/level.svg" alt="Level"/>
                        Level {level}
                    </p>
                </div>
                {currentTheme === 'theme-dark' ? 
                    <MdWbSunny onClick={toggleTheme} /> : 
                    <FaMoon color="#2E384D" onClick={toggleTheme} 
                />}
            </div>
        </div>
    );
}