import { useEffect, useState } from "react"
import { useAudioSettingsContext } from "../contexts/AudioSettingsContext";
import CloseIcon from "../static/close.png";
import { audios } from "../utils/audios";


export const SettingsModal = ({ isOpen, onClose }) => {

    const { isAudioEnabled, audio, volume, setNewVolume, setNewAudioEnabled, setNewAudio, playAudio } = useAudioSettingsContext();

    const [currentIsAudioEnabled, setCurrentIsAudioEnabled] = useState(isAudioEnabled);
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

    const handleOnChangeAudioEnabled = () => {
        setNewAudioEnabled(!currentIsAudioEnabled);
        setCurrentIsAudioEnabled(!currentIsAudioEnabled);
    }

    const handleOnChangeAudio = (e) => {
        setCurrentAudio(e.target.value);
        setNewAudio(e.target.value);
    }

    return (
        <>
            <dialog 
                id="dialog-settings"
                className="backdrop:backdrop-blur-sm p-6 bg-gray-800 border border-gray-500 rounded-md"    
            >
                <div className="flex flex-col items-center w-96 text-slate-300">
                    <img onClick={closeModal} src={CloseIcon} alt="Close" width='16' height='16' className="self-end cursor-pointer hover:bg-gray-700" />
                    <h2 className="text-3xl">Settings</h2>
                    <div className="w-72 flex flex-col items-center gap-y-4">
                        <div className="w-full flex justify-between">
                            <label htmlFor="audio-enabled">Audio enabled</label>
                            <input onChange={handleOnChangeAudioEnabled} id="audio-enabled" type="checkbox" className="align-middle" checked={currentIsAudioEnabled} />
                        </div>
                        <div className="w-full flex justify-between">
                            <label htmlFor="volume">Volume&nbsp;&nbsp;</label>
                            <div>
                                <input
                                    id="volume"
                                    onInput={handleRangeValue}
                                    type="range"
                                    value={currentVolume}
                                    min="0"
                                    max="100"
                                    className="align-middle"
                                />
                                {currentVolume}
                            </div>
                        </div>
                        <div className="w-full flex justify-between">
                            <label htmlFor="audios">Audios</label>
                            <select onChange={handleOnChangeAudio} id="audios" value={currentAudio} className="text-slate-300 bg-gray-600 rounded-md w-24">
                                {audios.map(audio => (
                                    <option key={audio} value={audio}>{audio}</option>
                                ))}
                            </select>
                        </div>
                        <button onClick={playAudio} type="button" className="rounded-sm w-20 bg-green-700">Test</button>
                    </div>
                </div>
            </dialog>
        </>
    )
}