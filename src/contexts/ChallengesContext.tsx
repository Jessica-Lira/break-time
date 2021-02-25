import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from "../../challenges.json"

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData { //coloca os tipos para ficarem acessiveis em outros arquivos
    activeChallenge: Challenge;
    challengesCompleted: number;
    currentExperience: number; 
    experienceToNextLevel: number;
    level: number; 
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
}

interface ChallengesProviderProps{
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }){
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    
    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    //quando o segundo elemento é um array, esse elemento é executado só uma vez
    useEffect(() => {
        Notification.requestPermission();
    }, []) 

    function levelUp() {
      setLevel(level + 1);
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
            completeChallenge
        }}>
            { children }
        </ChallengesContext.Provider>
    );
}