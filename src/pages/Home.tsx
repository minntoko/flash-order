import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface Menu {
  foodName: string;
}

const Home = () => {
  const [mode, setMode] = useState("初心者モード");
  const [menus, setMenus] = useState<Menu[]>([]);

  const fetchAdvanceMenu = async () => {
    try {
      const result = await fetch("src/assets/advanceMenu.json");
      const json = await result.json();
      setMenus(json); // menusを更新
    } catch (error) {
      console.error('Error fetching menu: ', error);
    }
  };
  const fetchBeginnerMenu = async () => {
    try {
      const result = await fetch("src/assets/beginnerMenu.json");
      const json = await result.json();
      setMenus(json); // menusを更新
    } catch (error) {
      console.error('Error fetching menu: ', error);
    }
  };

  const handleAdvanceClick = () => {
    setMode("上級者モード");
    fetchAdvanceMenu();
  }

  const handleBeginnerClick = () => {
    setMode("初心者モード");
    fetchBeginnerMenu();
  }

  useEffect(() => {
    fetchBeginnerMenu();
  }, []);

  return (
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
          <h2>{mode}のメニュー表</h2>
          <SMenu>
            {menus.map((menu) => (
              <SFood key={menu.foodName}>
                <p>{menu.foodName}</p>
              </SFood>
            ))}
          </SMenu>
          <SLink to="/select" selected={true}>プレイする</SLink>
        </SMenuContainer>
      </SMain>
    </SContainer>
  );
};

const SContainer = styled.div`
  background-color: #f4f1ec;
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
  opacity: 0.6;
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
  min-height: 100px;
  border: solid 2px #dba15d;
  color: #333;
  background-color: #ffa21f3e;
  font-size: 1.3rem;
  border-radius: 8px;
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
  ${(props) => props.selected && "opacity: 1;"}
  &:hover {
    opacity: 1;
  }
  &:first-of-type {
    margin-top: 0;
  }
`;
export default Home;
