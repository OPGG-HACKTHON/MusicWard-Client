import React, { useCallback, useState } from "react";
import styled, { css } from "styled-components";
import UserIcon from "components/user/UserIcon";

import GoogleIcon from "assets/icon/i-google.svg";
import SpotifyFull from "assets/img/spotify-full.svg";
import YoutubeFull from "assets/img/youtube-full.svg";
import PlaySpotify from "assets/img/mypage/play-spotify.png";
import axiosInstance from "utils/axiosConfig";
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useResetRecoilState,
} from "recoil";
import { accessToken, getAuth, token } from "recoil/auth";
import { useHistory } from "react-router-dom";

const EditPage = () => {
  const { contents: userInfo } = useRecoilValueLoadable(getAuth);
  const { name, nickname, googleEmail, spotifyEmail } = userInfo;
  const jwtToken = useRecoilValue(accessToken);
  const [nickName, setNickName] = useState(nickname);
  const history = useHistory();
  const handleSubmitClick = async () => {
    await axiosInstance({
      url: "users/nickname",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "patch",
      data: {
        nickname: nickName,
      },
    });
    history.push({
      pathname: "/mypage",
    });
  };
  const handleChange = useCallback(
    (e) => {
      setNickName(e.target.value);
    },
    [setNickName]
  );
  const handleSpotifyLogin = useCallback(async () => {
    const { data } = await axiosInstance({
      url: "users/auth/spotify",
    });
    window.location.assign(data.link);
  }, []);
  const handleWithdrawal = useCallback(async () => {
    await axiosInstance({
      url: "users/withdrawal",
      method: "delete",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then(() => {
      logout();
    });
  }, []);
  const logout = useResetRecoilState(token);

  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <UserIcon width={200} height={200} />
      </div>
      <MyInfoBox>
        <MyId>{name}</MyId>
        <MyInfoLine />
        <MyInfoAccount>
          <AccountWrapper>
            <AccountIcon src={GoogleIcon} alt="account icon" />
            <UserEmail>{googleEmail}</UserEmail>
          </AccountWrapper>
          {spotifyEmail && (
            <AccountWrapper>
              <AccountIcon src={PlaySpotify} alt="account icon" />
              <UserEmail>{spotifyEmail}</UserEmail>
            </AccountWrapper>
          )}
        </MyInfoAccount>
      </MyInfoBox>
      <EditBox>
        <EditTitle>닉네임</EditTitle>
        <Nickname value={nickName} onChange={handleChange} />
      </EditBox>
      <EditBox>
        <EditTitle>연동플랫폼</EditTitle>
        <SpotifyButton
          isComplete={!!spotifyEmail}
          disabled={!!spotifyEmail}
          type="button"
          onClick={handleSpotifyLogin}
        >
          <img src={SpotifyFull} />
        </SpotifyButton>
        <YoutubeButton disabled type="button">
          <img src={YoutubeFull} />
        </YoutubeButton>
      </EditBox>
      <BottomLine />
      <div>
        <FunctionButton type="button" onClick={handleSubmitClick}>
          수정완료
        </FunctionButton>
        <FunctionButton type="button" onClick={handleWithdrawal}>
          회원탈퇴
        </FunctionButton>
      </div>
    </Container>
  );
};

const Container = styled.section`
  width: 1160px;
  margin: 100px auto 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MyInfoBox = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 29px 0 72px 0;
  flex: none;
`;

const MyId = styled.span`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 41px;
  color: #ffffff;
`;

const MyInfoLine = styled.hr`
  display: inline-block;
  width: 240px;
  height: 0px;
  margin: 13px 0;
  align-self: center;
  opacity: 0.8;
  border: 1px solid #bb8c3c;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const MyInfoAccount = styled.div`
  display: flex;
  justify-content: center;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  flex-direction: column;
  align-items: center;
`;

const AccountWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const AccountIcon = styled.img`
  width: 23px;
  margin-right: 15px;
`;

const UserEmail = styled.div`
  display: inline-block;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
`;

const EditBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 23px;
  position: relative;
`;

const EditTitle = styled.div`
  position: absolute;
  top: 10px;
  left: -118px;
  width: 100px;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  text-align: right;
`;

const Nickname = styled.input`
  width: 375px;
  height: 45px;
  background: #12191c;
  border: 2px solid #64583a;
  box-sizing: border-box;
  border-radius: 3px;
  padding: 0 15px;
`;

const SpotifyButton = styled.button<{ isComplete: boolean }>`
  width: 180px;
  height: 45px;
  margin-right: 15px;
  background-color: ${({ isComplete }) => (isComplete ? "#5f6cbb" : "#12191c")};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #64583a;
  box-sizing: border-box;
  border-radius: 3px;
  ${({ isComplete }) =>
    isComplete &&
    css`
      cursor: not-allowed;
    `}
`;

const YoutubeButton = styled.button`
  width: 180px;
  height: 45px;
  background: #5f6cbb;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #64583a;
  box-sizing: border-box;
  border-radius: 3px;
  cursor: not-allowed;
`;

const BottomLine = styled.hr`
  width: 1160px;
  opacity: 0.5;
  border: 1px solid #bb8c3c;
  margin: 0;
  margin: 76px 0 40px 0;
`;

const FunctionButton = styled.button`
  display: inline-block;
  padding: 5px 15px;
  margin: 0 4px;
  background: linear-gradient(#010407, #010407) padding-box,
    linear-gradient(180deg, #c9ac6a 0%, #72572a 100%);
  border: 1px solid transparent;
  border-radius: 8px;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  opacity: 0.8;
`;

export default EditPage;
