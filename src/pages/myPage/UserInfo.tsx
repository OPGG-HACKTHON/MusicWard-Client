import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import UserIcon from "components/user/UserIcon";
import YoutubeMusicIcon from "assets/icon/i-youtube-music.svg";
import SpotifyMusicIcon from "assets/icon/i-spotify-music.svg";
import GoogleAccount from "assets/img/mypage/google-account.png";
import { useRecoilValueLoadable, useResetRecoilState } from "recoil";
import { token, getAuth } from "recoil/auth";

const UserInfo = () => {
  const { contents: userInfo } = useRecoilValueLoadable(getAuth);
  const { nickname, googleEmail, spotifyEmail } = userInfo;
  const [userProfile] = useState(""); // TODO: 구글 프로필 추가

  const history = useHistory();
  const clickToEdit = () => {
    history.push({
      pathname: "/editpage",
    });
  };
  const logout = useResetRecoilState(token);
  const handleLogout = useCallback(() => {
    logout();
  }, [history]);

  return (
    <Container>
      <Wrapper>
        <UserIcon imgUrl={userProfile} />
        <MyInfoBox>
          <div>
            {googleEmail && (
              <img
                style={{ width: "24px", marginRight: "10px" }}
                src={YoutubeMusicIcon}
              />
            )}
            {spotifyEmail && (
              <img style={{ width: "24px" }} src={SpotifyMusicIcon} />
            )}
          </div>
          <MyId>{nickname}</MyId>
          <MyInfoLine />
          <MyInfoAccount>
            <EmailWrapper>
              <img
                style={{ width: "24px", marginRight: "15px" }}
                src={GoogleAccount}
                alt="account icon"
              />
              <UserEmail>{googleEmail}</UserEmail>
            </EmailWrapper>
            {spotifyEmail && (
              <EmailWrapper>
                <img
                  style={{ width: "23px", marginRight: "15px" }}
                  src={SpotifyMusicIcon}
                  alt="account icon"
                />
                <UserEmail>{spotifyEmail}</UserEmail>
              </EmailWrapper>
            )}
          </MyInfoAccount>
        </MyInfoBox>
        <Functions>
          <FunctionButton onClick={clickToEdit}>수정</FunctionButton>
          <FunctionButton onClick={handleLogout}>로그아웃</FunctionButton>
        </Functions>
      </Wrapper>
    </Container>
  );
};

const Container = styled.section`
  height: 300px;
  position: relative;
  display: flex;
  background: #010407;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  width: 1166px;
`;

const MyInfoBox = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: none;
  margin-left: 40px;
`;

const MyId = styled.span`
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
  margin-left: 0;
  opacity: 0.8;
  border: 1px solid #bb8c3c;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 16px 0;
`;

const MyInfoAccount = styled.div`
  display: flex;
  justify-content: left;
  flex-direction: column;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
`;

const EmailWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const UserEmail = styled.div`
  display: inline-block;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
`;

const Functions = styled.section`
  margin-left: auto;
`;

const FunctionButton = styled.button`
  display: inline-block;
  padding: 5px 15px;
  margin: 4px;
  background: linear-gradient(#010407, #010407) padding-box,
    linear-gradient(180deg, #c9ac6a 0%, #72572a 100%);
  border: 1px solid transparent;
  border-radius: 8px;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #ffffff;
  opacity: 0.8;
`;

export default UserInfo;
