import React from "react";
import styled from "styled-components";

const GlobalNavBar = () => {
  return (
    <GNB>
      <Menu>랭킹</Menu>
      <Menu>보관함</Menu>
      <Menu>
        <Icon />
        Music Ward
      </Menu>
      <Menu>마이페이지</Menu>
      <Menu>검색</Menu>
    </GNB>
  );
};

const GNB = styled.div`
  height: 80px;
  width: 47%;
  min-width: 680px;
  text-align: center;
  display: flex;
  align-items: center;
  margin: 0 auto;
  justify-content: space-between;
`;

const Menu = styled.div`
  font-size: 14px;
  font-weight: bold;
  line-height: 24px;
  display: flex;
  cursor: pointer;
`;

const Icon = styled.div`
  width: 24px;
  height: 24px;
  background-color: #c4c4c4;
  border-radius: 20px;
  margin-right: 10px;
`;

export default GlobalNavBar;
