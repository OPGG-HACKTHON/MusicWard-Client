import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import UserIcon from "components/user/UserIcon";

import EditYoutube from "assets/img/mypage/edit-youtube.png";
import EditSpotify from "assets/img/mypage/edit-spotify.png";
import GoogleAccount from "assets/img/mypage/google-account.png";
import PlaySpotify from "assets/img/mypage/play-spotify.png";
import axiosInstance from "utils/axiosConfig";
import { useRecoilValue } from "recoil";
import { accessToken } from "recoil/auth";
import { useHistory } from "react-router-dom";

const EditPage = () => {
  const jwtToken = useRecoilValue(accessToken);
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [googleEmail, setGoogleEmail] = useState("");
  const [spotifyEmail, setSpotifyEmail] = useState("");
  const [userProfile, setUserProfile] = useState("");
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
  const getMyPageInfo = useCallback(async () => {
    const { data } = await axiosInstance({
      url: "users/me",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    setGoogleEmail(data.google_email);
    setSpotifyEmail(data.spotify_email);
    setNickName(data.nickname);
    setName(data.name);
  }, []);
  const handleChange = useCallback(
    (e) => {
      setNickName(e.target.value);
    },
    [setNickName]
  );
  useEffect(() => {
    getMyPageInfo();
  }, []);

  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <UserIcon />
      </div>
      <MyInfoBox>
        <MyId>{name}</MyId>
        <MyInfoLine />
        <MyInfoAccount>
          <div>
            <img
              style={{ width: "23px", marginRight: "15px" }}
              src={GoogleAccount}
              alt="account icon"
            />
            <UserEmail>{googleEmail}</UserEmail>
          </div>
          {spotifyEmail && (
            <div>
              <img
                style={{ width: "23px", marginRight: "15px" }}
                src={PlaySpotify}
                alt="account icon"
              />
              <UserEmail>{googleEmail}</UserEmail>
            </div>
          )}
        </MyInfoAccount>
      </MyInfoBox>
      <EditBox>
        <EditTitle>닉네임</EditTitle>
        <Nickname value={nickName} onChange={handleChange} />
      </EditBox>
      <EditBox>
        <EditTitle>연동플랫폼</EditTitle>
        <SpotifyButton>
          <img src={EditSpotify} />
        </SpotifyButton>
        <YoutubeButton>
          <img src={EditYoutube} />
        </YoutubeButton>
      </EditBox>
      <BottomLine />
      <Functions>
        <FunctionButton onClick={handleSubmitClick}>수정완료</FunctionButton>
        <FunctionButton>회원탈퇴</FunctionButton>
      </Functions>
    </Container>
  );
};

const Container = styled.section`
  width: auto;
  margin: 10vw 30% 0 30%;
  text-align: center;
`;

const MyInfoBox = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 3vw 0;
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

  opacity: 0.8;
  /* gold/primary */
  border: 1px solid #bb8c3c;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const MyInfoAccount = styled.div`
  display: flex;
  justify-content: center;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
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
`;

const EditTitle = styled.div`
  width: 100px;
  margin-right: 20px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  text-align: right;
  color: #ffffff;
`;

const Nickname = styled.input`
  width: 375px;
  height: 45px;
  margin-bottom: 23px;
  background: #12191c;
  /* gold/deepdark */
  border: 2px solid #64583a;
  box-sizing: border-box;
  border-radius: 3px;
`;

const SpotifyButton = styled.div`
  width: 180px;
  height: 45px;
  margin-right: 15px;
  background: #12191c;

  display: flex;
  justify-content: center;
  align-items: center;

  /* gold/deepdark */
  border: 2px solid #64583a;
  box-sizing: border-box;
  border-radius: 3px;
`;

const YoutubeButton = styled.div`
  width: 180px;
  height: 45px;
  background: #5f6cbb;

  display: flex;
  justify-content: center;
  align-items: center;

  /* gold/deepdark */
  border: 2px solid #64583a;
  box-sizing: border-box;
  border-radius: 3px;
`;

const BottomLine = styled.hr`
  margin: 100px 0 40px -50%;
  width: 200%;
  opacity: 0.5;
  /* gold/primary */
  border: 1px solid #bb8c3c;
  transform: rotate(180deg);
`;

const Functions = styled.section`
  position: relative;
  margin: 2vw 0;
  margin-left: auto;
`;

const FunctionButton = styled.div`
  display: inline-block;
  padding: 5px 15px;
  margin: 4px;
  background: linear-gradient(#010407, #010407) padding-box,
    linear-gradient(180deg, #c9ac6a 0%, #72572a 100%);
  border: 1px solid transparent;
  border-radius: 8px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #ffffff;
  opacity: 0.8;
`;

export default EditPage;
