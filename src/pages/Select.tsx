import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Select = () => {
  const orderTimes = [
    { time: "3.0秒" },
    { time: "2.0秒" },
    { time: "1.0秒" },
    { time: "0.5秒" },
  ];

  const orderCounts = [
    { count: "5個" },
    { count: "7個" },
    { count: "10個" },
    { count: "15個" },
  ];

  const [selectedOrderTime, setSelectedOrderTime] = useState({
    time: "3.0秒",
  });
  const [selectedOrderCount, setSelectedOrderCount] = useState({
    count: "5個",
  });

  const handleOrderTimeClick = (orderTime: string) => {
    setSelectedOrderTime({ time: orderTime });
  };

  const handleOrderCountClick = (orderCount: string) => {
    setSelectedOrderCount({ count: orderCount });
  };

  return (
    <SContainer>
      <SHeader>
        <SBackButton to="/">
          <SBoard>
            <STopBoard />
            <SCircle />
            <SBackLabel>ホームに戻る</SBackLabel>
            <SBottomBoard />
          </SBoard>
        </SBackButton>
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
                {orderTime.time}
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
                {orderCount.count}
              </SButton>
            ))}
          </SOrderCountContainer>
        </SCenterLine>
        <SDecorationLine />
        <SLink to="/game" selected={true}>
          ご注文お伺いします
        </SLink>
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
`;

const SBackButton = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  font-size: 1.4rem;
`;

const SBoard = styled.div`
  background-color: #dba15d;
  padding: 24px;
  width: 300px;
  border-radius: 0 16px 16px 0;
  text-align: center;
  position: relative;
`;

const STopBoard = styled.div`
  width: 50px;
  height: 20px;
  background-color: #f4f1ec;
  border-radius: 0 0 20px 0;
  position: absolute;
  top: 0;
  left: 0;
`;

const SBottomBoard = styled.div`
  width: 50px;
  height: 20px;
  background-color: #f4f1ec;
  border-radius: 0 20px 0 0;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const SCircle = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #f4f1ec;
  position: absolute;
  top: 50%;
  left: 17px;
  transform: translateY(-50%);
`;

const SBackLabel = styled.span`
  margin-left: 32px;
`;

const SMain = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(100vh - 151px);
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

const SLink = styled(Link)<{ selected: boolean }>`
  padding: 16px 80px;
  margin-top: 50px;
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
`;

export default Select;
