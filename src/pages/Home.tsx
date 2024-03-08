import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Menu } from "../types/menu";
import { useMode } from "../providers/ModeProvider";
import Background from "../views/home/background/Background";
import OpacityTransition from "../utils/OpacityTransition";

const Home = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [mode, setMode] = useMode();
  const fetchAdvanceMenu = async () => {
    try {
      const result = await fetch("/advanceMenu.json");
      const json = await result.json();
      setMenus(json); // menusを更新
    } catch (error) {
      console.error("Error fetching menu: ", error);
    }
  };
  const fetchBeginnerMenu = async () => {
    try {
      const result = await fetch("/beginnerMenu.json");
      const json = await result.json();
      setMenus(json); // menusを更新
    } catch (error) {
      console.error("Error fetching menu: ", error);
    }
  };

  const handleAdvanceClick = () => {
    setMode("上級者モード");
    fetchAdvanceMenu();
  };

  const handleBeginnerClick = () => {
    setMode("初心者モード");
    fetchBeginnerMenu();
  };

  useEffect(() => {
    if (mode == "上級者モード") {
      fetchAdvanceMenu();
    } else {
      fetchBeginnerMenu();
    }
  }, []);

  return (
    <OpacityTransition>
      <SContainer>
        <SHeader>
          <STitleLine />
          <STitleBack>
            <STitle>FlashOrder</STitle>
          </STitleBack>
        </SHeader>
        <SMain>
          <SButtonContainer>
            <SButton
              onClick={handleAdvanceClick}
              selected={"上級者モード" === mode}
            >
              上級者モード
            </SButton>
            <SButton
              onClick={handleBeginnerClick}
              selected={"初心者モード" === mode}
            >
              初心者モード
            </SButton>
          </SButtonContainer>
          <SMenuContainer>
            <SMenuTable>{mode}のメニュー表</SMenuTable>
            <SMenu>
              {menus.map((menu) => (
                <SFood key={menu.foodName}>
                  <SFoodImage src={menu.foodImage} alt="" />
                  <SFoodName>{menu.foodName}</SFoodName>
                </SFood>
              ))}
            </SMenu>
            <SLink to="/select" selected={true}>
              プレイする
            </SLink>
          </SMenuContainer>
        </SMain>
        <Background />
      </SContainer>
    </OpacityTransition>
  );
};

const SContainer = styled.div`
  height: 100vh;
  width: 100vw;
`;

const SHeader = styled.header`
  padding-top: 20px;
  height: 120px;
  max-height: 120px;
`;

const STitleLine = styled.div`
  width: 300px;
  height: 12px;
  background-color: #dba15d;
  border-radius: 0 8px 8px 0;
`;

const STitle = styled.h1`
  font-size: 30px;
  font-weight: bold;
  color: #fff;
  text-align: center;
`;

const STitleBack = styled.div`
  width: 280px;
  padding: 16px;
  margin-top: 8px;
  border-radius: 0 0 32px 0;
  background-color: #db6b5d;
`;

const SMain = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 1200px;
  height: calc(100vh - 120px);
  margin: 0 auto;
  background-color: transparent;
`;

const SButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const SButton = styled.button<{ selected: boolean }>`
  padding: 16px 80px;
  margin-top: 100px;
  font-size: 1.3rem;
  color: #fff;
  background-color: #db6b5d;
  opacity: 0.7;
  border-radius: 99px;
  border: 1px solid #bbb;
  white-space: nowrap;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  ${(props) => props.selected && "opacity: 1;"}
  &:hover {
    opacity: 1;
  }
  &:first-of-type {
    margin-top: 0;
  }
`;

const SMenuContainer = styled.div`
  display: flex;
  height: 100%;
  max-height: 700px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0 50px;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const SMenuTable = styled.h2`
  box-shadow: 0px 0px 8px #ccc;
  color: #333;
  background-color: #fff;
  padding: 8px;
  border-radius: 8px;
`;

const SMenu = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  width: 600px;
  height: 400px;
  padding: 32px;
  background-color: #fff;
  border: 8px solid #fff;
  border-radius: 32px;
  overflow: scroll;
`;

const SFood = styled.div`
  display: block;
  padding: 16px;
  border: solid 2px #dba15d;
  color: #333;
  font-size: 1.3rem;
  border-radius: 8px;
  width: 252px;
  height: 152px;
`;

const SFoodImage = styled.img`
  display: block;
  margin: 0 auto 8px;
  width: 100px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

const SFoodName = styled.p`
  text-align: center;
`;

const StartAnimation = keyframes`
  0% {
    transform: translateY(0);
    scale: 1;
    opacity: 0.8;
  }
  25% {
    transform: translateY(0);
    scale: 1;
    opacity: 0.8;
  }
  50% {
    transform: translateY(-4px);
    scale: 1.05;
    opacity: 1;
  }
  75% {
    transform: translateY(0);
    scale: 1;
    opacity: 0.8;
  }
  100% {
    transform: translateY(0);
    scale: 1;
    opacity: 0.8;
  }
`;

const SLink = styled(Link)<{ selected: boolean }>`
  padding: 16px 80px;
  margin-top: 100px;
  font-size: 1.3rem;
  color: #fff;
  background-color: #db6b5d;
  opacity: 0.6;
  border-radius: 99px;
  border: 1px solid #bbb;
  white-space: nowrap;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  animation: ${StartAnimation} 1.8s ease-in-out infinite alternate;
  ${(props) => props.selected && "opacity: 1;"}
  &:hover {
    opacity: 1;
  }
  &:first-of-type {
    margin-top: 0;
  }
`;
export default Home;
