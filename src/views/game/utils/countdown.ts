type SetStateNumber = React.Dispatch<React.SetStateAction<number>>;
type SetStateBoolean = React.Dispatch<React.SetStateAction<boolean>>;

export const startCountdown = (
  setCountdown: SetStateNumber,
  setStart: SetStateBoolean
): Promise<void> => {
  return new Promise<void>((resolve) => {
    const startCount = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 0) {
          setStart(true);
          clearInterval(startCount);
          resolve();
        }
        return prevCount - 1;
      });
    }, 1000);
  });
};