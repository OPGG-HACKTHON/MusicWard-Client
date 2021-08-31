import React, { FC, useState, useCallback } from "react";
import styled from "styled-components";
import HorizontalRankCard from "./components/HorizontalRankCard";
import VerticalRankCardProps from "./components/VerticalRankCard";
import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

interface RankType {
  id: number;
  title: string;
  sub_title: string;
  view: number;
  wards_total: number;
  comments_total: number;
  image_url: string;
}

interface RankingProps {
  onChange: (id: number) => void;
}

const Ranking: FC<RankingProps> = ({ onChange }) => {
  const history = useHistory();
  const [category, setCategory] = useState("champion");
  const [rankList, setRankList] = useState<Array<RankType>>([]);
  const getRanking = async () => {
    const { data } = await axios({
      url: "https://server.music-ward.com/ranking",
      params: {
        type: category,
      },
    });
    console.log(data);
    setRankList(data.data);
  };
  const handleChange = useCallback(
    (e) => {
      setCategory(e.target.id);
    },
    [setCategory]
  );
  useEffect(() => {
    getRanking();
  }, [category]);
  const handleClick = useCallback(
    (id: number) => {
      const isChampionCategory = category === "champion";
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: isChampionCategory ? "smooth" : "auto",
      });
      if (isChampionCategory) {
        onChange(id);
        return;
      }
      history.push({
        pathname: "/playlist",
      });
    },
    [category, onChange]
  );
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
        {[1, 0, 2].map((i) => (
          <VerticalRankCardProps
            key={i}
            rank={i + 1}
            id={rankList[i]?.id}
            title={rankList[i]?.title}
            subTitle={rankList[i]?.sub_title}
            hitCount={rankList[i]?.view}
            wardCount={rankList[i]?.wards_total}
            reviewCount={rankList[i]?.comments_total}
            img={rankList[i]?.image_url}
            onClick={handleClick}
          />
        ))}
      </TopRankingCardWrapper>
      <RankingCardWrapper>
        {rankList.slice(3, rankList.length).map((i, index) => (
          <HorizontalRankCard
            id={i.id}
            key={`rank-card-${i.id}`}
            rank={4 + index}
            title={i.title}
            subTitle={category === "champion" ? i.sub_title : undefined}
            hitCount={i.view}
            wardCount={i.wards_total}
            reviewCount={i.comments_total}
            img={i.image_url}
            onClick={handleClick}
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
