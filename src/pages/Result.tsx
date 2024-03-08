import styled from "styled-components";
import { SContainer } from "../components/bg/Container";
import BackButton from "../components/button/BackButton";
import { SLink } from "../components/button/MainButton";
import { useLocation } from "react-router-dom";
import OpacityTransition from "../utils/OpacityTransition";

const Result = () => {
  const location = useLocation();
  const { inputs = {}, correctMenus = {}, orderCount = 0 } = location.state;
  const result = [];
  let correctCount = 0;
  // ここであっているかどうかを判定する処理を書く
  // あっている場合はスコアを表示する
  // あっていない場合は正しいメニューを表示する
  for (const key in correctMenus) {
    if (inputs[key] === correctMenus[key]) {
      result.push(true);
      correctCount++;
    } else {
      result.push(false);
    }
  }
  return (
    <OpacityTransition>
      <SContainer>
        <SHeader>
          <BackButton />
        </SHeader>
        <SMain>
          <SResultScreen>
            <h1>結果</h1>
            <SScoreContainer>
              <SScoreTitle>
                {orderCount}問中{correctCount}問正解です。
              </SScoreTitle>
              <SResultContainer>
                {result.map((result, index) => {
                  return (
                    <>
                      <SResult>
                        <div>
                          {`${index + 1}品目:
                        ${inputs[index + 1] ?? "オーダーが"}`}
                        </div>
                        {result ? (
                          <SCorrect>正解、よくできました👏</SCorrect>
                        ) : (
                          <div>
                            <SIncorrect>※違います</SIncorrect>、正解は
                            <SCorrectAnswer>
                              {correctMenus[index + 1]}
                            </SCorrectAnswer>
                            です
                          </div>
                        )}
                      </SResult>
                    </>
                  );
                })}
              </SResultContainer>
            </SScoreContainer>
          </SResultScreen>
          <SLink to="/select" selected={true}>
            選択画面に戻る
          </SLink>
        </SMain>
      </SContainer>
    </OpacityTransition>
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
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 350px;
  margin-top: 16px;
  border-radius: 8px;
  border: 2px dashed #ccc;
`;

const SScoreTitle = styled.h2`
  padding: 16px 0 0 16px;
`

const SResultContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 16px;
  overflow: scroll;
`;

const SResult = styled.div`
  display: flex;
  justify-content: space-between;
  width: 500px;
  margin: 16px auto 8px;
`;

const SIncorrect = styled.span`
  color: red;
`;

const SCorrect = styled.span`
  color: #22c55e;
`;

const SCorrectAnswer = styled.span`
  font-size: 1.2rem;
`;

export default Result;
