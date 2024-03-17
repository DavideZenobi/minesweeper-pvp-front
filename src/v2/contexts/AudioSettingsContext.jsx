import { createContext, useContext, useEffect, useState } from "react";
import { getLocalStorageItem, setLocalStorageItem } from "../utils/localstorage";
import { isNumber, validateAudio, validateVolume } from "../utils/validator";
import opener from '../static/audios/opener.wav';
import lose from '../static/audios/lose.wav';
import win from '../static/audios/win.wav';
import cellOpened from '../static/audios/cellOpened.wav';


const AudioSettingsContext = createContext();

export const useAudioSettingsContext = () => useContext(AudioSettingsContext);

export const AudioSettingsProvider = ({ children }) => {
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [audio, setAudio] = useState('sound1');
    const [volume, setVolume] = useState(20);
    
    useEffect(() => {
        const isAudioEnabledItem = getLocalStorageItem('isEnabled');
        if (isAudioEnabledItem !== null && (isAudioEnabledItem === true || isAudioEnabledItem === false)) {
            setIsAudioEnabled(JSON.parse(isAudioEnabledItem));
        } else {
            setNewAudioEnabled(isAudioEnabled);
        }

        const currentAudioItem = getLocalStorageItem('audio');
        if (currentAudioItem !== null && validateAudio(currentAudioItem)) {
            setAudio(currentAudioItem);
        } else {
            setNewAudio(audio);
        }

        const currentVolumeItem = getLocalStorageItem('volume');
        if (currentVolumeItem !== null && isNumber(JSON.parse(currentVolumeItem)) && Number.isInteger(JSON.parse(currentVolumeItem)) && validateVolume(JSON.parse(currentVolumeItem))) {
            setVolume(currentVolumeItem);
        } else {
            setNewVolume(volume);
        }

    }, []);

    const sounds = {
        sound1: opener,
        sound2: win,
        sound3: lose,
        sound4: cellOpened,
    }

    const setNewAudioEnabled = (value) => {
        setIsAudioEnabled(value);
        setLocalStorageItem('isEnabled', value);
    }

    const setNewAudio = (value) => {
        setAudio(value);
        setLocalStorageItem('audio', value);
    }

    const setNewVolume = (value) => {
        setVolume(value);
        setLocalStorageItem('volume', value);
    }

    const playAudio = () => {
        if (!isAudioEnabled) {
            return;
        }
        const sound = new Audio(sounds[audio]);
        sound.volume = volume / 100;
        sound.play();
    }

    return (
        <AudioSettingsContext.Provider value={{ setNewAudioEnabled, setNewAudio, setNewVolume, playAudio, isAudioEnabled, audio, volume }}>
            { children }
        </AudioSettingsContext.Provider>
    )
}