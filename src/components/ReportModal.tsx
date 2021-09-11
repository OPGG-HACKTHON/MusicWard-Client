import React from "react";
import LoginModalBg from "assets/img/login-modal.svg";
import styled from "styled-components";
import LogoImg from "assets/img/logo.svg";
import Spotify from "assets/icon/i-spotify.svg";
import Google from "assets/icon/i-google.svg";
import { useCallback } from "react";
import { useRecoilState } from "recoil";
//import { modalState } from "recoil/modal";
import { reportModalState } from "recoil/modal";
import axiosInstance from "utils/axiosConfig";

const ReportModal = () => {
  const [openReportModal, setOpenReportModal] = useRecoilState<boolean>(reportModalState);
  const handleClose = useCallback(() => {
    setOpenReportModal(false);
  }, [setOpenReportModal]);
  const handleLogin = useCallback(
    (type: string) => async () => {
      const { data } = await axiosInstance({
        url: `users/auth/${type}`,
      });
      window.location.assign(data.link);
    },
    []
  );
  return (
    <>
      {console.log(openReportModal, "모달 !!")}
      {openReportModal && (
        <Wrapper>
          <ModalWrapper>
            <CloseBtn onClick={handleClose} />
            <ModalContent>
              <Logo />
              <Text>연동 서비스로 간편 로그인하세요.</Text>
              <LoginButton
                isGoogle
                type="button"
                onClick={handleLogin("google")}
              >
                Google 연동하기
              </LoginButton>
            </ModalContent>
          </ModalWrapper>
        </Wrapper>
      )}
    </>
  );
};

export default ReportModal;

export const Wrapper = styled.div`
  display: block;
  position: fixed;
  z-index: 999;
  background-color: #00000099;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

export const CloseBtn = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  left: calc(50% - 20px);
  top: -57px;
  background: #101010;
  border: 1px solid #9c9c9c;
  box-sizing: border-box;
  border-radius: 40px;
  cursor: pointer;
  &::after,
  &::before {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 3px;
    height: 20px;
    background-color: #f0f0f0;
    transform-origin: top left;
    content: "";
  }
  &::after {
    transform: rotate(45deg) translate(-50%, -50%);
  }
  &::before {
    transform: rotate(-45deg) translate(-50%, -50%);
  }
`;

const ModalWrapper = styled.div`
  position: absolute;
  width: 558px;
  height: 555px;
  left: 441px;
  top: 269px;

  background: #041321;
  /* gold/soft */

  border: 3px solid #c9ac6a;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 462px;
`;

const Logo = styled.div`
  background-image: url(${LogoImg});
  width: 203px;
  height: 32px;
  background-repeat: no-repeat;
`;

const Text = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  color: #c9ac6a;
  opacity: 0.6;
  margin: 43px 0 30px;
`;

const LoginButton = styled.button<{ isGoogle?: boolean }>`
  width: 205px;
  height: 68px;
  border-radius: 39px;
  margin-bottom: 12px;
  align-items: center;
  display: flex;
  justify-content: center;
  cursor: pointer;
  background: url(${({ isGoogle }) => (isGoogle ? Google : Spotify)}) no-repeat
    left 28px center #384a5b;
  padding-left: 27px;
  box-sizing: border-box;
  border: none;
`;
