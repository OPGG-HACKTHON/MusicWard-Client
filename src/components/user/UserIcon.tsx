import React from "react";
import styled from "styled-components";
import MyImgEdge from "assets/img/mypage/my-img-edge.png";
import EmptyImg from "assets/img/empty-img.svg";

interface UserIconProps {
  imgUrl?: string;
}

const UserIcon = ({ imgUrl }: UserIconProps) => {
  return (
    <MyImgBox>
      <img src={imgUrl || EmptyImg} alt="user image" />
    </MyImgBox>
  );
};

const MyImgBox = styled.section`
  width: 200px;
  height: 200px;
  background-image: url(${MyImgEdge});
  background-repeat: no-repeat;
  flex: none;
  position: relative;
  > img {
    border: 1px solid black;
    border: 5px solid gold;
    border-radius: 100px;
    width: 174px;
    height: 174px;
    position: absolute;
    top: 5px;
    left: 8px;
  }
`;

export default UserIcon;
