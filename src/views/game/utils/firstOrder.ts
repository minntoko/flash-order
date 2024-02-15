import { Menu } from "../../../types/menu";

const firstOrder = (
  getRandomNumber: (length: number) => number,
  menusJson: Menu[],
  setDisplayMenu: (menu: Menu) => void,
  setCorrectMenus: (value: { [id: number]: string }) => void,
  setDisplay: (value: boolean) => void,
  state: { time: number }
) => {
  const newRandomNumber: number = getRandomNumber(menusJson.length);
  const correctMenu: Menu = menusJson[newRandomNumber];
  setDisplayMenu(correctMenu);
  setCorrectMenus({ [1]: correctMenu.foodName });
  setTimeout(() => {
    setDisplay(false);
  }, state.time * 1000);
};

export default firstOrder;