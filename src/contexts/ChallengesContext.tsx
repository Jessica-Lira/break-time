import { createContext, useState, ReactNode } from 'react';
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

    function levelUp(){
      setLevel(level + 1);
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);
    }

    function resetChallenge(){ //botão de falha
        setActiveChallenge(null);
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
            resetChallenge
        }}>
            { children }
        </ChallengesContext.Provider>
    );
}