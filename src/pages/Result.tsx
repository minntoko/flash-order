import styled from "styled-components";
import { SContainer } from "../components/bg/Container";
import BackButton from "../components/button/BackButton";
import { SLink } from "../components/button/MainButton";

const Result = () => {
  return (
    <SContainer>
      <SHeader>
        <BackButton />
      </SHeader>
      <SMain>
        <SResultScreen>
          <h1>結果</h1>
          <SScoreContainer>
            <p>あなたのスコアは〇〇点です！</p>
          </SScoreContainer>
        </SResultScreen>
        <SLink to="/select" selected={true}>
          選択画面に戻る
        </SLink>
      </SMain>
    </SContainer>
  );
};

const SHeader = styled.header`
  padding-top: 20px;
`;

const SMain = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(100vh - 101px);
  width: 100vw;
`;

const SResultScreen = styled.div`
  width: 800px;
  height: 450px;
  padding: 16px;
  background-color: #fff;
  border-radius: 16px;
`;

const SScoreContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 350px;
  margin-top: 16px;
  padding: 16px;
  border-radius: 8px;
  border: 2px dashed #ccc;
`;

export default Result;
