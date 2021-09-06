import Carousel from "components/Carousel";
import { PlayListItemProps } from "components/PlayListItem";
import React, { FC } from "react";
import styled from "styled-components";
import EmptyImg from "assets/img/empty-img.svg";

interface SearchResultListProps {
  title: React.ReactNode;
  subTitle: string;
  items: Array<PlayListItemProps>;
}

const SearchResultList: FC<SearchResultListProps> = ({
  title,
  subTitle,
  items,
}) => {
  return (
    <ResultWrapper>
      <TitleWrapper>
        <Title>{title}</Title>
        <SubTitle>{subTitle}</SubTitle>
      </TitleWrapper>
      {items.length === 0 ? (
        <EmptyBox />
      ) : (
        <Carousel items={items} position="block" />
      )}
    </ResultWrapper>
  );
};

export default SearchResultList;

const ResultWrapper = styled.div`
  margin-bottom: 69px;
`;

const TitleWrapper = styled.div`
  padding-left: 22px;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  width: 439px;
  border-bottom: 1px solid #bb8c3c80;
  padding: 18px 0;
`;

const SubTitle = styled.div`
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  margin-top: 13px;
  margin-bottom: 40px;
`;

const EmptyBox = styled.div`
  width: 200px;
  height: 200px;
  margin: 0 22px;
  background: url(${EmptyImg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center; ;;;;;;;;;;;;
`;
