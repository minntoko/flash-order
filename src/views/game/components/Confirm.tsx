import { useState } from "react";
import styled from "styled-components";
type Props = {
  orderCount: number;
  inputs: { [key: number]: string };
  setInputs: (inputs: { [key: number]: string }) => void;
};

const Confirm = ({ orderCount, inputs, setInputs }: Props) => {
  const [confirmCount, setConfirmCount] = useState<number>(1);
  const inputArray = new Array(orderCount).fill(0);
  const prevActive = confirmCount === 1 ? false : true;
  const nextActive = confirmCount === orderCount ? false : true;
  const clickNext = () => {
    setConfirmCount((prev) => {
      if (prev > orderCount - 1) {
        return prev;
      }
      return prev + 1;
    });
  };
  const clickPrev = () => {
    setConfirmCount((prev) => {
      if (prev < 2) {
        return prev;
      }
      return prev - 1;
    });
  };
  return (
    <>
      <STitle>{confirmCount}品目</STitle>
      <SColumn>
        {inputArray.map((_, index) => {
          const id = index + 1;
          if (index + 1 !== confirmCount) return null;
          return (
            <SFlex key={id}>
              <SInput
                type="text"
                onChange={(e) => setInputs({ ...inputs, [id]: e.target.value })}
                value={inputs[id] || ""}
              />
              がお一つ
            </SFlex>
          );
        })}
        <SButtonFlex>
          <SButton selected={prevActive} onClick={clickPrev}>
            ←前へ
          </SButton>
          <SButton selected={nextActive} onClick={clickNext}>
            次へ→
          </SButton>
        </SButtonFlex>
      </SColumn>
    </>
  );
};

const STitle = styled.h2`
  position: absolute;
  top: 32px;
  left: 32px;
  font-size: 1.6rem;
`;

const SColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SFlex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SInput = styled.input`
  border: 1px solid #aaa;
  padding: 16px;
  border-radius: 8px;
  margin: 8px 8px 32px 8px;
  width: 300px;
  outline: none;
  :focus {
    outline: #aaa;
  }
`;

const SButtonFlex = styled.div`
  position: absolute;
  bottom: 32px;
  left: 0px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const SButton = styled.button<{ selected: boolean }>`
  padding: 12px 80px;
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
`;

export default Confirm;
