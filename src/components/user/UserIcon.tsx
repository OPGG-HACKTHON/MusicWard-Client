import React from "react";
import styled from "styled-components";
import Profile from "assets/img/profile.png";
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
  position: relative;
  flex: none;
  width: 200px;
  height: 200px;
  background-image: url(${Profile});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  > img {
    border-radius: 100px;
    width: 164px;
    height: 164px;
    position: absolute;
    top: 17px;
    left: 18px;
  }
`;

export default UserIcon;
