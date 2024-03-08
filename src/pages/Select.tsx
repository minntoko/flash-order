import { useState } from "react";
import styled from "styled-components";
import BackButton from "../components/button/BackButton";
import { SLink } from "../components/button/MainButton";
import { SContainer } from "../components/bg/Container";
import OpacityTransition from "../utils/OpacityTransition";

const Select = () => {
  const orderTimes = [
    { time: 3.0 },
    { time: 2.0 },
    { time: 1.0 },
    { time: 0.5 },
  ];

  const orderCounts = [
    { count: 5 },
    { count: 7 },
    { count: 10 },
    { count: 15 },
  ];

  const [selectedOrderTime, setSelectedOrderTime] = useState({
    time: 3,
  });
  const [selectedOrderCount, setSelectedOrderCount] = useState({
    count: 5,
  });

  const handleOrderTimeClick = (orderTime: number) => {
    setSelectedOrderTime({ time: orderTime });
  };

  const handleOrderCountClick = (orderCount: number) => {
    setSelectedOrderCount({ count: orderCount });
  };

  return (
    <OpacityTransition>
      <SContainer>
        <SHeader>
          <BackButton />
        </SHeader>
        <SMain>
          <SDecorationLine />
          <SCenterLine>
            <SOrderTimeContainer>
              <SSelectTitle>注文時間/1品</SSelectTitle>
              {orderTimes.map((orderTime) => (
                <SButton
                  key={orderTime.time}
                  selected={orderTime.time === selectedOrderTime.time}
                  onClick={() => handleOrderTimeClick(orderTime.time)}
                >
                  {orderTime.time}秒
                </SButton>
              ))}
            </SOrderTimeContainer>
            <SOrderCountContainer>
              <SSelectTitle>注文数</SSelectTitle>
              {orderCounts.map((orderCount) => (
                <SButton
                  key={orderCount.count}
                  selected={orderCount.count === selectedOrderCount.count}
                  onClick={() => handleOrderCountClick(orderCount.count)}
                >
                  {orderCount.count}個
                </SButton>
              ))}
            </SOrderCountContainer>
          </SCenterLine>
          <SDecorationLine />
          <SLink
            to="/game"
            selected={true}
            state={{ ...selectedOrderTime, ...selectedOrderCount }}
          >
            ご注文お伺いします
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

const SDecorationLine = styled.div`
  width: 100%;
  height: 16px;
  background-color: #fff;
`;

const SCenterLine = styled.div`
  width: 100%;
  padding: 50px 0;
  margin: 40px 0;
  background-color: #fff;
`;

const SOrderTimeContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 50%;
  padding: 25px;
  margin: 0 auto;
`;

const SOrderCountContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 50%;
  padding: 25px;
  margin: 0 auto;
`;

const SSelectTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: bold;
  color: #000;
  min-width: 180px;
  text-align: end;
  margin-right: 20px;
`;

const SButton = styled.button<{ selected: boolean }>`
  width: 70px;
  padding: 8px 0;
  margin: 0 8px;
  font-size: 1.2rem;
  background-color: #db6b5d;
  border: none;
  font-weight: bold;
  border-radius: 8px;
  opacity: 0.7;
  transition: all 0.2s ease-in-out;
  color: #fff;
  ${(props) => props.selected && "opacity: 1;"}
  &:hover {
    opacity: 1;
  }
`;

export default Select;
