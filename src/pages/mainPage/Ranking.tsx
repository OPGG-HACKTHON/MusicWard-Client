import React from "react";
import styled from "styled-components";
import HorizontalRankCard from "./components/HorizontalRankCard";
import VerticalRankCardProps from "./components/VerticalRankCard";

const Ranking = () => {
  return (
    <RankingSection>
      <RankingCategory>
        <Category active>챔피언</Category>
        <Category>플레이리스트</Category>
      </RankingCategory>
      <TopRankingCardWrapper>
        <VerticalRankCardProps
          rank={2}
          title="가렌"
          subTitle="데마시아의 힘"
          hitCount={100}
          wardCount={100}
          reviewCount={100}
        />
        <VerticalRankCardProps
          rank={1}
          title="가렌"
          subTitle="데마시아의 힘"
          hitCount={100}
          wardCount={100}
          reviewCount={100}
        />
        <VerticalRankCardProps
          rank={3}
          title="가렌"
          subTitle="데마시아의 힘"
          hitCount={100}
          wardCount={100}
          reviewCount={100}
        />
      </TopRankingCardWrapper>
      <RankingCardWrapper>
        {[...Array(7)].map((i, index) => (
          <HorizontalRankCard
            key={`rank-card-${index}`}
            rank={4 + index}
            title="가렌"
            subTitle="데마시아의 힘"
            hitCount={100}
            wardCount={100}
            reviewCount={100}
          />
        ))}
      </RankingCardWrapper>
    </RankingSection>
  );
};

export default Ranking;

const RankingSection = styled.section`
  height: 1780px;
  width: 100%;
  background: linear-gradient(#010407, #9fa6dc);
`;

const Category = styled.div<{ active?: boolean }>`
  font-size: 28px;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  padding: 0 35px;
  border-image: linear-gradient(to right, #bb8c3c 0%, #73592c 100%);
  border-image-width: 0 0 ${({ active }) => (active ? "4px" : "0")} 0;
  border-style: solid;
  border-image-slice: 1;
  border-left: none;
  border-right: none;
  opacity: ${({ active }) => (active ? 1 : 0.7)};
`;

const RankingCategory = styled.div`
  height: 47px;
  border-bottom: 1px solid #73592c;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
  ${Category}:first-child {
    margin-left: 60px;
  }
`;

const TopRankingCardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-top: 70px;
`;

const RankingCardWrapper = styled.div`
  margin-top: 70px;
`;
