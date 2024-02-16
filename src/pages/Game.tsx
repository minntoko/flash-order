import { useLocation } from "react-router-dom";
import { SContainer } from "../components/bg/Container";
import styled from "styled-components";
import BackButton from "../components/button/BackButton";
import { SLink } from "../components/button/MainButton";
import { useEffect, useState } from "react";
import { Menu } from "../types/menu";
import SPrepareScreen from "../views/game/PrepareScreen";
import getRandomNumber from "../utils/getRandomNumber";
import { useMode } from "../providers/ModeProvider";
import { startCountdown } from "../views/game/utils/countdown";
import orderRepeat from "../views/game/utils/orderRepeat";
import firstOrder from "../views/game/utils/firstOrder";
import { defaultCountdown, defaultOrderCount } from "../constants/gameSetting";
import Confirm from "../views/game/components/Confirm";

const Game = () => {
  const location = useLocation();
  const state = location.state;

  const [orderCount, setOrderCount] = useState<number>(defaultOrderCount);
  const [inputs, setInputs] = useState<{ [key: number]: string }>({});
  const [countdown, setCountdown] = useState<number>(defaultCountdown);
  const [start, setStart] = useState<boolean>(false);
  const [end, setEnd] = useState<boolean>(false);
  const [display, setDisplay] = useState<boolean>(true);
  const [mode] = useMode();
  const [displayMenu, setDisplayMenu] = useState<Menu>({
    foodName: "",
    foodImage: "src/assets/foodImages/default.jpeg",
  });
  const [correctMenus, setCorrectMenus] = useState<{ [key: number]: string }>([]);

  const fetchMenu: () => Promise<Menu[] | undefined> = async () => {
    try {
      const result = await fetch(
        mode === "上級者モード"
          ? "../assets/advancedMenu.json"
          : "../assets/beginnerMenu.json"
      );
      const json = await result.json();
      return json as Menu[];
    } catch (error) {
      console.error("Error fetching menu: ", error);
    }
  };
  const fetchData = async () => {
    const menusJson = await fetchMenu();
    if (!menusJson) return;
    await startCountdown(setCountdown, setStart);

    firstOrder(
      getRandomNumber,
      menusJson,
      setDisplayMenu,
      setCorrectMenus,
      setDisplay,
      state
    );

    orderRepeat(
      setDisplay,
      setOrderCount,
      getRandomNumber,
      setDisplayMenu,
      menusJson,
      setCorrectMenus,
      state,
      setEnd
    );
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <SContainer>
      <SHeader>
        <BackButton />
      </SHeader>
      <SMain>
        <SFlex>
          {start ? (
            <SGameScreen>
              {!end ? <h2>お客様のオーダー</h2> : <h2>それではご注文を復唱させていただきます</h2>}
              <SGameArea>
                {display && !end && (
                  <>
                    <SOrderCount>{orderCount}品目</SOrderCount>
                    <SOrderText>{displayMenu.foodName}</SOrderText>
                    <SOrderImage
                      src={displayMenu.foodImage}
                      alt={displayMenu.foodName}
                    />
                  </>
                )}
                {!display && end && (
                  <Confirm
                    orderCount={state.count}
                    inputs={inputs}
                    setInputs={setInputs}
                  />
                )}
              </SGameArea>
            </SGameScreen>
          ) : (
            <SPrepareScreen>
              <h2>{countdown > 0 ? countdown : "GO"}</h2>
            </SPrepareScreen>
          )}
          <SMemo>
            <h2>メモ📝</h2>
            <SMemoArea placeholder="オーダーをメモ"></SMemoArea>
          </SMemo>
        </SFlex>
        <SBottomButton>
          {end ? (
            <SLink
              to="/result"
              selected={true}
              state={{ inputs, correctMenus, "orderCount": state.count }}
            >
              以上でよろしいでしょうか
            </SLink>
          ) : (
            <SLink to="/select" selected={true}>
              選択画面に戻る
            </SLink>
          )}
        </SBottomButton>
      </SMain>
    </SContainer>
  );
};

const SHeader = styled.header`
  padding-top: 20px;
`;

const SMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1200px;
  height: calc(100vh - 101px);
  margin: 0 auto;
`;

const SFlex = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const SGameScreen = styled.div`
  width: 700px;
  height: 450px;
  padding: 16px;
  background-color: #fff;
  border-radius: 16px;
`;

const SGameArea = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 16px;
  border-radius: 8px;
  border: 2px dashed #ccc;
  padding: 16px;
  height: calc(100% - 52px);
  position: relative;
`;

const SOrderCount = styled.h2`
  position: absolute;
  top: 16px;
  left: 16px;
  padding-left: 8px;
  border-left: 8px solid #dba15d;
  background-color: #fff;
`;

const SOrderImage = styled.img`
  width: 300px;
  height: 240px;
  object-fit: cover;
  border-radius: 8px;
`;

const SOrderText = styled.span`
  font-size: 2.4rem;
  color: #333;
`;

const SMemo = styled.div`
  width: 300px;
  height: 450px;
  background-color: #fff;
  border-radius: 16px;
  padding: 16px;
`;

const SBottomButton = styled.div`
  display: flex;
  justify-content: center;
`;

const SMemoArea = styled.textarea`
  width: 100%;
  height: calc(100% - 52px);
  resize: none;
  padding: 8px;
  margin-top: 16px;
  border-radius: 8px;
  border: 2px dashed #ccc;
  outline: none;
  :focus {
    border: 2px solid #ccc;
  }
`;

export default Game;
