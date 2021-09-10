import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LogoImg from "assets/img/logo.svg";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "recoil/modal";
import { isLogined } from "recoil/auth";

const GlobalNavBar = () => {
  const [, setOpenModal] = useRecoilState<boolean>(modalState);

  const handleOpenModal = useCallback(() => {
    setOpenModal(true);
  }, [setOpenModal]);

  const handleRankFocus = useCallback(() => {
    setTimeout(() => {
      window.scrollTo({ top: 1970, left: 0, behavior: "smooth" });
    }, 100);
  }, []);

  return (
    <GNB>
      <Menu to="/" onClick={handleRankFocus}>
        랭킹
      </Menu>
      <Menu to="/archive">보관함</Menu>
      <Menu to="/">
        <Logo />
      </Menu>
      <Menu to="/search">검색</Menu>
      {useRecoilValue(isLogined) ? (
        <Menu to="/mypage">마이페이지</Menu>
      ) : (
        <Menu to="#" onClick={handleOpenModal}>
          로그인
        </Menu>
      )}
    </GNB>
  );
};

const GNB = styled.div`
  height: 80px;
  width: 60%;
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
  color: #ffffff;
  flex: 1;
  justify-content: center;
`;

const Logo = styled.div`
  background-image: url(${LogoImg});
  width: 260px;
  height: 30px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 140px;
  background-position-y: 1px;
`;

export default GlobalNavBar;
