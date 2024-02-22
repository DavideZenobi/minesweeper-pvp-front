import { useEffect, useState } from "react"
import { useAudioSettingsContext } from "../contexts/AudioSettingsContext";
import CloseIcon from "../static/close.png";


export const SettingsModal = ({ isOpen, onClose }) => {

    const { isAudioEnabled, audio, volume, setNewVolume } = useAudioSettingsContext();

    const [currentAudio, setCurrentAudio] = useState(audio);
    const [currentVolume, setCurrentVolume] = useState(volume);

    useEffect(() => {
        if (isOpen) {
            openModal();
        }
    }, [isOpen])

    const openModal = () => {
        const dialog = document.getElementById('dialog-settings');
        dialog.showModal();
    }

    const closeModal = () => {
        const dialog = document.getElementById('dialog-settings');
        dialog.close();
        onClose();
    }

    const handleRangeValue = (e) => {
        setCurrentVolume(e.target.value);
        setNewVolume(e.target.value);
    }

    return (
        <>
            <dialog 
                id="dialog-settings"
                className="p-6 bg-gray-800 border border-gray-500 rounded-md"    
            >
                <div className="flex flex-col items-center w-96 text-slate-300">
                    <img onClick={closeModal} src={CloseIcon} alt="Close" width='16' height='16' className="self-end cursor-pointer hover:bg-gray-700" />
                    <h2 className="text-3xl">Settings</h2>
                    <label htmlFor="audio-enabled">
                        Audio enabled
                        <input id="audio-enabled" type="checkbox" className="align-middle" />
                    </label>
                    <label htmlFor="volume">
                        Volume
                        <input
                            id="volume"
                            onInput={handleRangeValue}
                            type="range"
                            value={currentVolume}
                            min="0"
                            max="100"
                            className="align-middle"
                        />
                    </label>
                </div>
            </dialog>
        </>
    )
}