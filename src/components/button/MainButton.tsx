import { Link } from "react-router-dom";
import styled from "styled-components";


export const SLink = styled(Link)<{ selected: boolean }>`
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
