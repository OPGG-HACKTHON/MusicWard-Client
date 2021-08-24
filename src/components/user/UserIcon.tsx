import React from "react";
import styled from "styled-components";
import MyImgEdge from "assets/img/mypage/my-img-edge.png";
import MyImgSample from "assets/img/mypage/my-img-sample.png";

const UserIcon = () => {
  return (
    <MyImgBox>
      <img
        style={{ width: "92%", height: "92%", margin: "4% 4%" }}
        src={MyImgSample}
        alt="user image"
      />
    </MyImgBox>
  );
};

const MyImgBox = styled.section`
  width: 200px;
  height: 200px;
  background-image: url(${MyImgEdge});
  background-repeat: no-repeat;
  margin: 2vw 3vw 2vw 0;
  flex: none;
`;

export default UserIcon;
