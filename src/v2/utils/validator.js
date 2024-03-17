const audios = ['sound1', 'sound2', 'sound3'];

export const validateAudio = (audio) => {
    return audios.includes(audio);
}

export const validateVolume = (volume) => {
    if (volume >= 0 && volume <= 100) {
        return true;
    } else {
        return false;
    }
}

export const isNumber = (data) => {
    return typeof data === 'number';
}