import { Menu } from '../../../types/menu';

const orderRepeat = (
  setDisplay: (value: boolean) => void,
  setOrderCount: (func: (prevCount: number) => number) => void,
  getRandomNumber: (length: number) => number,
  setDisplayMenu: React.Dispatch<React.SetStateAction<Menu>>,
  menusJson: Menu[],
  setCorrectMenus: React.Dispatch<React.SetStateAction<{ [key: number]: string }>>,
  state: { count: number, time: number },
  setEnd: (value: boolean) => void
) => {
  const orderInterval = setInterval(() => {
      setDisplay(true);
      setOrderCount((prevCount) => {
          const newCount = prevCount + 1;
          const newRandomNumber = getRandomNumber(menusJson.length);
          const correctMenu = menusJson[newRandomNumber];
          setDisplayMenu(correctMenu);
          setCorrectMenus((prev) => ({ ...prev, [newCount]: correctMenu.foodName }));
          if (newCount == state.count) {
              setTimeout(() => {
                  setEnd(true);
              }, state.time * 1000 + 400);
              clearInterval(orderInterval);
          }
          return newCount;
      });
      setTimeout(() => {
        setDisplay(false);
      }, state.time * 1000);
  }, state.time * 1000 + 400);
}

export default orderRepeat;