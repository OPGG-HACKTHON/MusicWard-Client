import React, { FC } from "react";
import styled from "styled-components";

import RandkingCardBg from "assets/img/ranking-card.svg";
import Rank1 from "assets/img/rank1.svg";
import Rank2 from "assets/img/rank2.svg";
import Rank3 from "assets/img/rank3.svg";
import RannkProfileBorder from "assets/img/rank-profile-border.svg";
import RannkProfile from "assets/img/rank-profile.svg";

export interface RankCardProps {
  rank: number;
  hitCount: number;
  wardCount: number;
  reviewCount: number;
  title: string;
  subTitle: string;
}

const rankIconArr = [Rank1, Rank2, Rank3];

const VerticalRankCard: FC<RankCardProps> = ({
  rank,
  hitCount,
  wardCount,
  reviewCount,
  title,
  subTitle,
}) => {
  const isFirstPlace = rank === 1;
  return (
    <RankingCard
      isFirstPlace={isFirstPlace}
      margin={isFirstPlace ? "0 50px 50px" : "0"}
    >
      <RankIcon rank={rank} />
      <ProfileWrapper isFirstPlace={isFirstPlace} />
      <Profile isFirstPlace={isFirstPlace} />
      <Title isFirstPlace={isFirstPlace}>{title}</Title>
      <SubTitle isFirstPlace={isFirstPlace}>{subTitle}</SubTitle>
      <RankInfoWrapper isFirstPlace={isFirstPlace}>
        <InfoBoxWrapper isFirstPlace={isFirstPlace}>
          <InfoBox>
            <div>조회수</div>
            <div>{hitCount}</div>
          </InfoBox>
          <InfoBox>
            <div>와드수</div>
            <div>{wardCount}</div>
          </InfoBox>
          <InfoBox>
            <div>댓글수</div>
            <div>{reviewCount}</div>
          </InfoBox>
        </InfoBoxWrapper>
      </RankInfoWrapper>
    </RankingCard>
  );
};

export default VerticalRankCard;

const RankingCard = styled.div<{
  isFirstPlace: boolean;
  margin: string;
}>`
  background-image: url(${RandkingCardBg});
  height: ${({ isFirstPlace }) => (isFirstPlace ? "478px" : "387px")};
  width: ${({ isFirstPlace }) => (isFirstPlace ? "478px" : "387px")};
  background-size: cover;
  background-repeat: no-repeat;
  margin: ${({ margin }) => margin};
  position: relative;
`;

const RankIcon = styled.div<{
  rank: number;
}>`
  background-image: ${({ rank }) => `url(${rankIconArr[rank - 1]})`};
  background-size: cover;
  background-repeat: no-repeat;
  height: ${({ rank }) => (rank === 1 ? "100px" : "84px")};
  width: ${({ rank }) => (rank === 1 ? "100px" : "84px")};
  position: absolute;
  top: -28px;
  left: ${({ rank }) => `calc(50% - ${rank === 1 ? 50 : 42}px)`};
`;

const ProfileWrapper = styled.div<{ isFirstPlace: boolean }>`
  background-image: url(${RannkProfileBorder});
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  z-index: 10;
  width: ${({ isFirstPlace }) => (isFirstPlace ? "164px" : "136px")};
  height: ${({ isFirstPlace }) => (isFirstPlace ? "162px" : "134px")};
  left: ${({ isFirstPlace }) => `calc(50% - ${isFirstPlace ? 82 : 68}px)`};
  top: ${({ isFirstPlace }) => (isFirstPlace ? "74px" : "56px")};
`;
const Profile = styled.div<{ isFirstPlace: boolean }>`
  background-image: url(${RannkProfile});
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  width: ${({ isFirstPlace }) => (isFirstPlace ? "156px" : "126px")};
  height: ${({ isFirstPlace }) => (isFirstPlace ? "156px" : "126px")};
  left: ${({ isFirstPlace }) => `calc(50% - ${isFirstPlace ? 77 : 62}px)`};
  top: ${({ isFirstPlace }) => (isFirstPlace ? "76px" : "59px")};
`;

const Title = styled.div<{ isFirstPlace: boolean }>`
  position: absolute;
  font-weight: bold;
  text-align: center;
  font-size: 28px;
  line-height: 41px;
  letter-spacing: -0.01em;
  bottom: ${({ isFirstPlace }) => (isFirstPlace ? "182px" : "142px")};
  left: ${({ isFirstPlace }) => `calc(50% - ${isFirstPlace ? 175 : 140}px)`};
  width: ${({ isFirstPlace }) => (isFirstPlace ? "350px" : "280px")};
`;

const SubTitle = styled.div<{ isFirstPlace: boolean }>`
  position: absolute;
  color: #c9ab6a;
  opacity: 0.6;
  text-align: center;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  bottom: ${({ isFirstPlace }) => (isFirstPlace ? "154px" : "116px")};
  left: ${({ isFirstPlace }) => `calc(50% - ${isFirstPlace ? 175 : 140}px)`};
  width: ${({ isFirstPlace }) => (isFirstPlace ? "350px" : "280px")};
`;

const InfoBoxWrapper = styled.div<{ isFirstPlace: boolean }>`
  display: flex;
  justify-content: space-around;
  text-align: center;
  padding: 0 ${({ isFirstPlace }) => (isFirstPlace ? "22px" : "18px")};
`;

const RankInfoWrapper = styled.div<{ isFirstPlace: boolean }>`
  position: absolute;
  bottom: ${({ isFirstPlace }) => (isFirstPlace ? "20px" : "10px")};
  width: 100%;
`;

const InfoBox = styled.div`
  div:first-child {
    font-size: 16px;
    font-weight: 300;
    letter-spacing: -0.01em;
    line-height: 24px;
    opacity: 0.87;
  }
  div:last-child {
    font-size: 22px;
    font-weight: bold;
    line-height: 32px;
  }
`;
