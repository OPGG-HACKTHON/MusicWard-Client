import React from "react";
import styled from "styled-components";
import Profile from "assets/img/profile.png";
import EmptyImg from "assets/img/empty-img.svg";

interface UserIconProps {
  imgUrl?: string;
  width: number;
  height: number;
}

const UserIcon = ({ imgUrl, width, height }: UserIconProps) => {
  return (
    <MyImgBox width={width} height={height}>
      <img src={imgUrl || EmptyImg} alt="user image" />
    </MyImgBox>
  );
};

const MyImgBox = styled.section<{ width: number; height: number }>`
  position: relative;
  flex: none;
  width: ${(props) => props.width + "px"};
  height: ${(props) => props.width + "px"};
  background-image: url(${Profile});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  > img {
    border-radius: 100px;
    width: 80%;
    height: 80%;
    position: absolute;
    top: 10%;
    left: 10%;
  }
`;

export default UserIcon;
