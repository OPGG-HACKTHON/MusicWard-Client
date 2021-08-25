import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LoginModal from "./LoginModal";
import LogoImg from "assets/img/logo.svg";

const GlobalNavBar = () => {
  const [login, setLogin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const openModal = useCallback(() => {
    setShowModal(true);
  }, [setShowModal]);
  const handleClose = useCallback(() => {
    setShowModal(false);
    setLogin(true);
  }, [setShowModal]);
  return (
    <>
      <GNB>
        <Menu to="/">랭킹</Menu>
        <Menu to="/archive">보관함</Menu>
        <Menu to="/">
          <Logo />
        </Menu>
        <Menu to="/search">검색</Menu>
        {login ? (
          <Menu to="/mypage">마이페이지</Menu>
        ) : (
          <Menu to="#" onClick={openModal}>
            로그인
          </Menu>
        )}
      </GNB>
      {showModal && <LoginModal onClose={handleClose} />}
    </>
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

const Logo = styled.div`
  background-image: url(${LogoImg});
  width: 147px;
  height: 24px;
  background-repeat: no-repeat;
  background-size: contain;
`;

export default GlobalNavBar;
