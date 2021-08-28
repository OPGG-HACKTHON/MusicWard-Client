import React from "react";
import styled from "styled-components";
import RightButton from "assets/img/playlistpage/list-arrow-right.svg";
import LeftButton from "assets/img/playlistpage/list-arrow-left.svg";
import OtherListImageSample from "assets/img/playlistpage/other-list-image-sample.png";

type IProps = {
  others?: {
    tracks: {
      total: number;
      items: [];
    };
  };
};

const OtherLists = ({ others }: IProps) => {
  return (
    <Container>
      <OtherPlayListHr />
      <LeftButtonImg src={LeftButton} />
      <OtherPlayLists>
        <OtherPlayList>
          <img src={OtherListImageSample} />
          <OtherTitle>제목</OtherTitle>
          <OtherSinger>내용</OtherSinger>
        </OtherPlayList>
        <OtherPlayList>
          <img src={OtherListImageSample} />
          <OtherTitle>제목</OtherTitle>
          <OtherSinger>내용</OtherSinger>
        </OtherPlayList>
        <OtherPlayList>
          <img src={OtherListImageSample} />
          <OtherTitle>제목</OtherTitle>
          <OtherSinger>내용</OtherSinger>
        </OtherPlayList>
        <OtherPlayList>
          <img src={OtherListImageSample} />
          <OtherTitle>제목</OtherTitle>
          <OtherSinger>내용</OtherSinger>
        </OtherPlayList>
        <OtherPlayList>
          <img src={OtherListImageSample} />
          <OtherTitle>제목</OtherTitle>
          <OtherSinger>내용</OtherSinger>
        </OtherPlayList>
        <OtherPlayList>
          <img src={OtherListImageSample} />
          <OtherTitle>제목</OtherTitle>
          <OtherSinger>내용</OtherSinger>
        </OtherPlayList>
        <OtherPlayList>
          <img src={OtherListImageSample} />
          <OtherTitle>제목</OtherTitle>
          <OtherSinger>내용</OtherSinger>
        </OtherPlayList>
      </OtherPlayLists>
      <RightButtonImg src={RightButton} />
    </Container>
  );
};

const Container = styled.section`
  position: relative;
  margin: 0 5%;
`;

const LeftButtonImg = styled.img`
  position: absolute;
  top: 6vw;
  left: -2vw;
`;

const RightButtonImg = styled.img`
  position: absolute;
  top: 6vw;
  right: -2vw;
`;

const OtherPlayLists = styled.div`
  display: flex;
  justify-content: space-between;
`;

const OtherPlayListHr = styled.hr`
  width: 98.5%;
  margin-bottom: 30px;
  opacity: 0.5;
  border: 1px solid #bb8c3c;
  transform: rotate(180deg);
`;

const OtherPlayList = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const OtherTitle = styled.div`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 30px;
  color: #ffffff;
`;

const OtherSinger = styled.div`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  color: #ffffff;
`;

export default OtherLists;
