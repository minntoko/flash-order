import { Link } from "react-router-dom";
import styled from "styled-components";

const BackButton = () => {
  return (
    <SBackButton to="/">
      <SBoard>
        <STopBoard />
        <SCircle />
        <SBackLabel>ホームに戻る</SBackLabel>
        <SBottomBoard />
      </SBoard>
    </SBackButton>
  )
}

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

export default BackButton