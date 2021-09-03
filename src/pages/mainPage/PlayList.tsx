import React, { FC, useState } from "react";
import styled from "styled-components";
import Fighter from "assets/icon/i-fighters.png";
import Assassin from "assets/icon/i-assassins.png";
import Mage from "assets/icon/i-mages.png";
import Marksman from "assets/icon/i-marksmen.png";
import Support from "assets/icon/i-supports.png";
import Tank from "assets/icon/i-tanks.png";
import Carousel from "components/Carousel";
import { Champion } from "./Main";

const MaxString = 300;
const IconObj: Record<string, string> = {
  Tank: Tank,
  Fighter: Fighter,
  Assassin: Assassin,
  Mage: Mage,
  Marksman: Marksman,
  Support: Support,
};
interface PlayListProps {
  champion: Champion;
}

const PlayList: FC<PlayListProps> = ({ champion }) => {
  const [playList] = useState(
    [...Array(15)].map((i, index) => {
      return {
        title: `데마시아의 힘을 느껴보자${index}`,
        listCount: index,
        wardCount: index * 10,
        imgUrl:
          index % 2 === 0
            ? "https://i.ytimg.com/vi/veRIGU--tec/maxresdefault.jpg"
            : "https://i.scdn.co/image/ab67616d0000b2736fa6b0d2a6f7e50c4b45939f",
      };
    })
  );
  return (
    <PlayListSection url={champion.profile_image_url}>
      <GradientSection />
      <TextWrapper>
        <IconWrapper>
          {champion.position.map((i) => (
            <Icon
              key={i}
              src={IconObj[i]}
              width={34}
              height={34}
              marginRight={10}
            />
          ))}
        </IconWrapper>
        <Name>
          {champion.name} {champion.english_name}
        </Name>
        <ShortInfo>{champion.title}</ShortInfo>
        <Description>
          {champion.story.substr(0, MaxString)}
          {champion.story.length > MaxString ? "..." : ""}
        </Description>
      </TextWrapper>
      <Carousel items={playList} showPaging />
    </PlayListSection>
  );
};

export default PlayList;

const PlayListSection = styled.section<{ url: string }>`
  height: 640px;
  background-image: url(${({ url }) => url});
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  position: relative;
  background-position: 77.1687% 20.5788%;
`;

const GradientSection = styled.div`
  height: 100%;
  width: 55%;
  min-width: 815px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  background: linear-gradient(
    to left,
    rgba(20, 20, 20, 0) 10%,
    rgba(20, 20, 20, 0.25) 20%,
    rgba(20, 20, 20, 0.5) 40%,
    rgba(20, 20, 20, 0.75) 65%,
    rgba(20, 20, 20, 1) 100%
  );
  backdrop-filter: blur(2px);
`;
const TextWrapper = styled.div`
  z-index: 11;
  position: absolute;
  display: flex;
  flex-direction: column;
  max-height: 480px;
  top: 128px;
  left: calc(50% - 588px);
  width: 1176px;
  margin-right: auto;
  padding-right: 720px;
  box-sizing: border-box;
`;

const IconWrapper = styled.div`
  display: flex;
`;

export const Icon = styled.img<{
  width: number;
  height: number;
  marginRight?: number;
  opacity?: number;
}>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  margin-right: ${({ marginRight }) => `${marginRight || 0}px`};
  opacity: ${({ opacity }) => opacity || 1};
`;

const Name = styled.div`
  font-size: 50px;
  font-weight: 500;
  line-height: 74px;
  width: 1000px;
`;

const ShortInfo = styled.div`
  font-size: 19px;
  font-weight: medium;
  opacity: 0.5;
  line-height: 28px;
`;

const Description = styled.div`
  font-size: 16px;
  font-weight: lighter;
  margin-top: 30px;
`;
