// Return array with 2 elements.
// data[0] = minutes
// data[1] = seconds
export const timeToMinutesAndSeconds = (time) => {
    const data = [];
    if (time > 60) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        data.push(minutes);
        data.push(seconds);
    } else {
        data.push(0);
        data.push(time);
    }
    return data;
}