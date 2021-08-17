import React from "react";
import { useState } from "react";
import styled from "styled-components";
import GoogleAccount from "assets/img/mypage/google-account.png";
import MyImgEdge from "assets/img/mypage/my-img-edge.png";
import MyImgSample from "assets/img/mypage/my-img-sample.png";

const MyPage = () => {
  const [userId] = useState("와드깔고승리하자");
  const [userEmail] = useState("rPwjd@lol.lol");

  return (
    <>
      <MyImgBox>
        <MyImg>
          <img
            style={{ width: "92%", height: "92%", margin: "4% 4%" }}
            src={MyImgSample}
            alt="user image"
          />
        </MyImg>
      </MyImgBox>
      <MyInfoBox>
        <img src={GoogleAccount} />
        <div>{userId}</div>
        <MyInfoLine />
        <div>{userEmail}</div>
      </MyInfoBox>
    </>
  );
};

const MyImgBox = styled.div`
  width: 30%;
  display: inline-block;
  position: relative;
`;

const MyImg = styled.div`
  width: 200px;
  height: 200px;
  background-image: url(${MyImgEdge});
  background-repeat: no-repeat;
`;

const MyInfoBox = styled.div`
  width: 70%;
  display: inline-block;
  position: relative;
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

export default MyPage;
