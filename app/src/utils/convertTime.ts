export const convertTime = (seconds: number) => {
    const min = Math.floor(Math.abs(seconds) / 60);
    const sec = Math.abs(seconds) % 60;


    return `${min}:${sec < 10 ? '0' : '' }${sec}`;
};
