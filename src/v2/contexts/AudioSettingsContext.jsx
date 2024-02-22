import { createContext, useContext, useEffect, useState } from "react";
import { getLocalStorageItem, setLocalStorageItem } from "../utils/localstorage";


const AudioSettingsContext = createContext();

export const useAudioSettingsContext = () => useContext(AudioSettingsContext);

export const AudioSettingsProvider = ({ children }) => {
    const [isAudioEnabled, setIsAudioEnabled] = useState(false);
    const [audio, setAudio] = useState('default');
    const [volume, setVolume] = useState(100);
    
    useEffect(() => {
        const isAudioEnabledItem = getLocalStorageItem('isEnabled');
        if (isAudioEnabledItem !== null) {
            setIsAudioEnabled(isAudioEnabledItem);
        } else {
            setNewAudioEnabled(isAudioEnabled);
        }

        const currentAudioItem = getLocalStorageItem('audio');
        if (currentAudioItem !== null) {
            setAudio(currentAudioItem);
        } else {
            setNewAudio(audio);
        }

        const currentVolumeItem = getLocalStorageItem('volume');
        if (currentVolumeItem !== null) {
            setVolume(currentVolumeItem);
        } else {
            setNewVolume(volume);
        }

    }, []);

    const audioTypes = {
        default: ''
    }

    const setNewAudioEnabled = (value) => {
        setLocalStorageItem('isEnabled', value);
    }

    const setNewAudio = (value) => {
        setLocalStorageItem('audio', value);
    }

    const setNewVolume = (value) => {
        setLocalStorageItem('volume', value);
    }

    const playAudio = () => {
        if (isAudioEnabled) {
            return;
        }
    }

    return (
        <AudioSettingsContext.Provider value={{ setNewAudioEnabled, setNewAudio, setNewVolume, playAudio, isAudioEnabled, audio, volume }}>
            { children }
        </AudioSettingsContext.Provider>
    )
}