import React, { FC } from "react";
import styled from "styled-components";

import RandkingHorizontalCardBg from "assets/img/ranking-horizontal-card.svg";

import RannkProfileBorder from "assets/img/rank-profile-border.svg";
import RannkProfile from "assets/img/rank-profile.svg";
import { RankCardProps } from "./VerticalRankCard";

const HorizontalRankCard: FC<RankCardProps> = ({
  rank,
  hitCount,
  wardCount,
  reviewCount,
  title,
  subTitle,
}) => {
  return (
    <RankingCard>
      <Rank>{rank}</Rank>
      <ProfileWrapper />
      <Profile />
      <Title>{title}</Title>
      <SubTitle>{subTitle}</SubTitle>
      <InfoBoxWrapper>
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
    </RankingCard>
  );
};

export default HorizontalRankCard;

const RankingCard = styled.div`
  background-image: url(${RandkingHorizontalCardBg});
  background-size: cover;
  background-repeat: no-repeat;
  width: 1198px;
  height: 113px;
  margin: 0 auto;
  margin-bottom: 16px;
  position: relative;
`;

const Rank = styled.div`
  position: absolute;
  color: #c9ab6a;
  top: 34px;
  left: 110px;
  font-weight: bold;
  font-size: 28px;
  line-height: 41px;
  letter-spacing: -0.01em;
`;

const ProfileWrapper = styled.div`
  position: absolute;
  background-image: url(${RannkProfileBorder});
  background-size: cover;
  background-repeat: no-repeat;
  width: 65px;
  height: 65px;
  z-index: 10;
  width: 65px;
  height: 64px;
  top: 25px;
  left: 180px;
`;

const Profile = styled.div`
  position: absolute;
  background-image: url(${RannkProfile});
  background-size: cover;
  background-repeat: no-repeat;
  width: 60px;
  height: 60px;
  top: 27px;
  left: 183px;
`;

const Title = styled.div`
  position: absolute;
  top: 38px;
  left: 280px;
  font-weight: bold;
  font-size: 28px;
  line-height: 41px;
  letter-spacing: -0.01em;
`;

const SubTitle = styled.div`
  position: absolute;
  color: #c9ab6a;
  top: 48px;
  left: 380px;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
`;

const InfoBoxWrapper = styled.div`
  display: flex;
  width: 557px;
  justify-content: space-around;
  position: absolute;
  right: 0;
  top: 43px;
`;

const InfoBox = styled.div`
  div:first-child {
    opacity: 0.7;
    font-weight: 300;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.01em;
  }
  div:last-child {
    font-weight: bold;
    font-size: 22px;
    line-height: 32px;
  }
`;
