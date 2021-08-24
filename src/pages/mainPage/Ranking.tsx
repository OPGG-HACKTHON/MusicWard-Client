import React, { useState, useCallback } from "react";
import styled from "styled-components";
import HorizontalRankCard from "./components/HorizontalRankCard";
import VerticalRankCardProps from "./components/VerticalRankCard";

const Ranking = () => {
  const [category, setCategory] = useState("champion");
  const handleChange = useCallback((e) => {
    setCategory(e.target.id);
  }, []);
  return (
    <RankingSection>
      <RankingCategory>
        <CategoryInput
          checked={category === "champion"}
          type="radio"
          id="champion"
          name="category"
          onChange={handleChange}
        />
        <Category htmlFor="champion">챔피온</Category>
        <CategoryInput
          checked={category === "playlist"}
          type="radio"
          id="playlist"
          name="category"
          onChange={handleChange}
        />
        <Category htmlFor="playlist">플레이리스트</Category>
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

const CategoryInput = styled.input`
  display: none;
`;

const Category = styled.label`
  cursor: pointer;
  font-size: 28px;
  font-weight: normal;
  padding: 0 35px;
  border-image: linear-gradient(to right, #bb8c3c 0%, #73592c 100%);
  border-image-width: 0 0 0 0;
  border-style: solid;
  border-image-slice: 1;
  border-left: none;
  border-right: none;
  opacity: 0.7;
  input:checked + & {
    font-weight: bold;
    border-image-width: 0 0 4px 0;
    opacity: 1;
  }
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
