import React, { useCallback } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { getAlertState, alertState, AlertType } from "recoil/alert";
import styled from "styled-components";
import { CloseBtn, Wrapper } from "./LoginModal";
import AlertBg from "assets/img/alert.svg";

const Alert = () => {
  const { contents } = useRecoilValueLoadable(getAlertState);
  const { show, title, confirmText, cancelText, onConfirm } = contents;
  const [, setAlertState] = useRecoilState<AlertType>(alertState);
  const handleClose = useCallback(() => {
    setAlertState({
      show: false,
    });
  }, [setAlertState]);
  return (
    <>
      {show && (
        <Wrapper>
          <AlertWrapper>
            <CloseBtn onClick={handleClose} />
            <Title>{title || "타이틀"}</Title>
            <ButtonWrapper>
              <Button onClick={onConfirm}>{confirmText || "확인하기"}</Button>
              <Button onClick={handleClose}>{cancelText || "취소하기"}</Button>
            </ButtonWrapper>
          </AlertWrapper>
        </Wrapper>
      )}
    </>
  );
};

const AlertWrapper = styled.div`
  position: absolute;
  left: calc(50% - 222px);
  top: calc(50% - 134px);
  background-image: url(${AlertBg});
  background-repeat: no-repeat;
  width: 444px;
  height: 268px;
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 28px;
  line-height: 41px;
  text-align: center;
  letter-spacing: -0.01em;
  margin: 42px 0 38px 0;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  align-items: center;
`;
const Button = styled.button`
  border-radius: 39px;
  margin-bottom: 12px;
  padding: 14px 47px;
  border: none;
  background-color: #384a5b;
`;

export default Alert;
