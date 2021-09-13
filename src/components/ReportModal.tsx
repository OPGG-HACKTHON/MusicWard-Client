import React, { useState } from "react";
import styled from "styled-components";
import axiosInstance from "utils/axiosConfig";
import UserIcon from "components/user/UserIcon";
import Check from "assets/img/playlistpage/check.svg";
import { useRecoilValue } from "recoil";
import { accessToken } from "recoil/auth";

const ReportModal = ({
  setModal,
}: {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const pathName: string = window.location.pathname;
  const playListId = parseInt(pathName.substring(10));
  const jwtToken = useRecoilValue(accessToken);
  const [display, setDisplay] = useState(true);

  const handleSubmit = async () => {
    const response = await axiosInstance({
      url: "playlists/report",
      method: "post",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      data: {
        playlist_id: playListId,
      },
    });
    console.log(response, "리폿결과");
    setDisplay(false);
  };

  return (
    <>
      <Wrapper>
        {display ? (
          <ModalWrapper>
            <CloseBtn onClick={() => setModal(false)} />
            <ModalContent>
              <ModalHeader>
                <UserIcon width={106} height={108} />
                <ModalTitle>플레이리스트 신고하기</ModalTitle>
              </ModalHeader>

              <ModalChkBoxContainer>
                <ChkBoxBox data-id="0">
                  <HiddenChkBox type="checkbox" checked={true} />
                  <StyledChkBox checked={true}>
                    <img src={Check} />
                  </StyledChkBox>
                  <ChkBoxTitle>욕설이 담긴 이름 사용</ChkBoxTitle>
                </ChkBoxBox>

                <ChkBoxBox data-id="1">
                  <HiddenChkBox type="checkbox" checked={false} />
                  <StyledChkBox checked={false}>
                    <img src={Check} />
                  </StyledChkBox>
                  <ChkBoxTitle>혐오/차별적인 이름 및 내용</ChkBoxTitle>
                </ChkBoxBox>

                <ChkBoxBox data-id="2">
                  <HiddenChkBox type="checkbox" checked={false} />
                  <StyledChkBox checked={false}>
                    <img src={Check} />
                  </StyledChkBox>
                  <ChkBoxTitle>
                    불쾌감을 주거나 부적절한 이름이나 내용
                  </ChkBoxTitle>
                </ChkBoxBox>
              </ModalChkBoxContainer>

              <ModalTextArea type="textarea"></ModalTextArea>
              <SubmitButton onClick={handleSubmit}>신고</SubmitButton>
            </ModalContent>
          </ModalWrapper>
        ) : (
          <ChangeDisplay>
            신고가 정상적으로 접수되었습니다. 이용해 주셔서 감사합니다.
          </ChangeDisplay>
        )}
      </Wrapper>
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
  filter: drop-shadow(0px 4px 10px rgba(1, 4, 7, 0.1));

  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 2px;
`;

const ModalHeader = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  padding: 38px 0 0 44px;
  box-sizing: border-box;
`;

const ModalTitle = styled.div`
  /* title/large */
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 41px;
  /* identical to box height */
  letter-spacing: -0.01em;
  text-align: center;
  margin: auto 22px;

  color: #ffffff;
`;

const ModalChkBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 34px 0 0 50px;
`;

const ChkBoxBox = styled.div`
  display: flex;
  margin-bottom: 36px;
`;

const HiddenChkBox = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledChkBox = styled.div<{ checked: boolean }>`
  box-sizing: border-box;
  border-radius: 2px;
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 2px solid #c9ac6a;
  background: ${(props) => (props.checked ? "#c9ac6a;" : "#010407")};
  border-radius: 0.4rem;
  transition: all 150ms;
  & > img {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
  }
`;

const ChkBoxTitle = styled.span`
  width: auto;
  margin-left: 22px;

  /* title/sub */
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;

  /* white */
  color: #ffffff;

  opacity: 0.6;
`;

const ModalTextArea = styled.input`
  width: 478px;
  height: 123px;
  margin: 0 auto;
  padding: 10px;

  background: #12191c;
  /* gold/deepdark */
  border: 2px solid #64583a;
  box-sizing: border-box;
  border-radius: 3px;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 26px;

  /* gold/soft */
  color: #c9ac6a;
  opacity: 0.6;
`;

const SubmitButton = styled.button`
  width: 97px;
  height: 50px;
  margin: 20px auto;

  /* deepgreen/50 */
  background: #0d1f30;
  /* gold/soft */
  border: 3px solid #c9ac6a;
  box-sizing: border-box;
  border-radius: 6px;
`;

const ChangeDisplay = styled.div`
  display: block;
`;
