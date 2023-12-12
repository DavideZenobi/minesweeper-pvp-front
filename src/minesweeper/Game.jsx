import { useEffect, useState } from "react";
import { Config } from "./Config";
import { Board } from "./Board";

const configs = {
    easy: {
        boardSize: 14,
        minesQuantity: 35,
    },
    medium: {
        boardSize: 20,
        minesQuantity: 60,
    },
    hard: {
        boardSize: 26,
        minesQuantity: 95,
    }
    
}

const boardStyle = {
    easy: {
        width: '350px',
        height: '350px',
    },
    medium: {
        width: '500px',
        height: '500px',
    },
    hard: {
        width: '650px',
        height: '650px',
    }
}
 
export const Game = () => {
    const [config, setConfig] = useState();
    const [style, setStyle] = useState();
    const [isGameRunning, setIsGameRunning] = useState(false);

    useEffect(() => {

    }, [config]);

    const handleConfigChange = (newConfig) => {
        setConfig(configs[newConfig]);
        setStyle(boardStyle[newConfig]);
    }

    return (
        <>
            <Config isDisabled={isGameRunning} onConfigChange={handleConfigChange} />
            <Board 
                config={config} 
                style={style} 
                isGameRunning={isGameRunning} 
                setIsGameRunning={setIsGameRunning} 
            />
        </>
    );
}