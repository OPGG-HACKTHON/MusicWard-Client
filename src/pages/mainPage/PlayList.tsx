import React, { useState } from "react";
import styled from "styled-components";
import BackgroundImg from "assets/img/background-img.svg";
import ChampionIcon from "assets/img/i-fighters.png";
import Carousel from "components/Carousel";

const PlayList = () => {
  const [name] = useState("가렌 Garen");
  const [shortInfo] = useState("데마시아의 힘");
  const [description] = useState(
    "가렌은 불굴의 선봉대를 이끄는 고결하고 자긍심 강한 전사다. 선봉대 내에서 인망이 두터울 뿐 아니라 심지어 적에게도 존경을 받지만, 그가 대대로 데마시아와 데마시아의 이상을 수호하는 임무를 맡은 크라운가드 가문의 자손이기 때문은 아니다. 가렌은 마법 저항력을 갖춘 방어구와 거대한 대검으로 무장하고, 언제라도 마법사에 맞서 정당한 검으로 진정한 칼바람을 일으킬 준비가 되어 있다"
  );
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
    <PlayListSection>
      <GradientSection />
      <TextWrapper>
        <Icon src={ChampionIcon} width={34} height={34} />
        <Name>{name}</Name>
        <ShortInfo>{shortInfo}</ShortInfo>
        <Description>{description}</Description>
      </TextWrapper>
      <Carousel items={playList} showPaging />
    </PlayListSection>
  );
};

export default PlayList;

const PlayListSection = styled.section`
  height: 640px;
  background-image: url(${BackgroundImg});
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  position: relative;
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
  max-width: 479px;
  top: 130px;
  left: 130px;
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
