import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const GlobalNavBar = () => {
  return (
    <GNB>
      <Menu to="/">랭킹</Menu>
      <Menu to="/">보관함</Menu>
      <Menu to="/">
        <Icon />
        Music Ward
      </Menu>
      <Menu to="/search">검색</Menu>
      <Menu to="/mypage">마이페이지</Menu>
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

const Menu = styled(Link)`
  font-size: 14px;
  font-weight: bold;
  line-height: 24px;
  display: flex;
  cursor: pointer;
  color: #fff;
`;

const Icon = styled.div`
  width: 24px;
  height: 24px;
  background-color: #c4c4c4;
  border-radius: 20px;
  margin-right: 10px;
`;

export default GlobalNavBar;
