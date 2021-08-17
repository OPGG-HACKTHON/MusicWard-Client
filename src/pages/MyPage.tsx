import React from "react";
import { useState } from "react";
import styled from "styled-components";
import PlayButton from "assets/img/mypage/play-button.png";
import MyImgEdge from "assets/img/mypage/my-img-edge.png";
import MyImgSample from "assets/img/mypage/my-img-sample.png";
import GoogleAccount from "assets/img/mypage/google-account.png";

const MyPage = () => {
  const [userId] = useState("와드깔고승리하자");
  const [userEmail] = useState("rPwjd@lol.lol");

  return (
    <>
      <MyBox>
        <MyImgBox>
          <img
            style={{ width: "92%", height: "92%", margin: "4% 4%" }}
            src={MyImgSample}
            alt="user image"
          />
        </MyImgBox>
        <MyInfoBox>
          <img style={{ width: "47px" }} src={PlayButton} />
          <MyId>{userId}</MyId>
          <MyInfoLine />
          <MyInfoAccount>
            <img
              style={{ width: "23px", marginRight: "15px" }}
              src={GoogleAccount}
              alt="account icon"
            />
            <UserEmail>{userEmail}</UserEmail>
          </MyInfoAccount>
        </MyInfoBox>
      </MyBox>
    </>
  );
};

const MyBox = styled.section`
  height: 20vw;
  position: relative;
  display: flex;
`;

const MyImgBox = styled.section`
  width: 200px;
  height: 200px;
  margin: auto 5vw auto 14vw;
  background-image: url(${MyImgEdge});
  background-repeat: no-repeat;
`;

const MyInfoBox = styled.section`
  position: relative;
  width: 60vw;

  display: flex;
  flex-direction: column;
  justify-content: center;
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
  margin-left: 0;

  opacity: 0.8;
  /* gold/primary */
  border: 1px solid #bb8c3c;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const MyInfoAccount = styled.div`
  display: flex;
  justify-content: left;
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

export default MyPage;
