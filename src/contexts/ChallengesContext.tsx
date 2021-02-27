import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from "../../challenges.json";
import { LevelUpModal } from "../components/LevelUpModal";

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

//coloca os tipos para ficarem acessiveis em outros arquivos
interface ChallengesContextData { 
    activeChallenge: Challenge;
    challengesCompleted: number;
    currentExperience: number; 
    experienceToNextLevel: number;
    level: number; 
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}

interface ChallengesProviderProps{
    children: ReactNode;
    //rest : demais elementos
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

//rest tem as outras 3 propriedades, para resgatar os cookies
export function ChallengesProvider({ children, ...rest }){
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    
    const [activeChallenge, setActiveChallenge] = useState(null);

    const[isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    //quando o segundo elemento é um array, esse elemento é executado só uma vez
    useEffect(() => {
        Notification.requestPermission();
    }, []) 

    //permanência de dados nos cookies: yarn add js-cookie
    //para o typesccript ler a biblioteca: yarn add @types/js-cookie -D
    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted] )

    function levelUp() {
      setLevel(level + 1);

      setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal() { //fechar o modal
        setIsLevelUpModalOpen(false);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if(Notification.permission === "granted") {
            new Notification('Novo desafio ❗🤖',{
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChallenge() { //botão de falha
        setActiveChallenge(null);
    }

    function completeChallenge() { //botão de completei
        if(!activeChallenge){ //validação
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if(finalExperience > experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1)
    }

    return(
        <ChallengesContext.Provider 
        value={{
            activeChallenge,
            challengesCompleted, 
            currentExperience, 
            experienceToNextLevel,
            level, 
            levelUp,
            startNewChallenge,
            resetChallenge,
            completeChallenge,
            closeLevelUpModal
        }}>
            
            { children }
            
            { isLevelUpModalOpen && <LevelUpModal /> } 
            
        </ChallengesContext.Provider>
    );    /* { isso && isso } = um if sem else*/
}