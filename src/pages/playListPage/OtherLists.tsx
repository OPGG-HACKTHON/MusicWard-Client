import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import RightButton from "assets/img/playlistpage/list-arrow-right.svg";
import LeftButton from "assets/img/playlistpage/list-arrow-left.svg";

type IProps = {
  others?: {
    tracks: {
      total: number;
      items: [
        {
          artists: string;
          id: number;
          image: {
            url: string;
            width: number;
            height: number;
          };
          original_id: string;
          preview_url: string;
          title: string;
        }
      ];
    };
  };
};

const OtherLists = ({ others }: IProps) => {
  const slideSettings = {
    className: "center",
    centerPadding: "60px",
    dots: true,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    swipeToSlide: true,
  };

  return (
    <Container>
      <OtherPlayListHr />
      <Slider
        {...slideSettings}
        prevArrow={<LeftButtonImg src={LeftButton} />}
        nextArrow={<RightButtonImg src={RightButton} />}
      >
        {/* <OtherPlayLists> */}
        {others?.tracks.items.map((item) => (
          <OtherPlayList key={item.id}>
            <img
              src={item.image?.url}
              width="112px" //{item.image?.width}
              height="112px" //{item.image?.height}
            />
            <OtherTitle>{item.title}</OtherTitle>
            <OtherSinger>{item.artists}</OtherSinger>
          </OtherPlayList>
        ))}
        {/* </OtherPlayLists> */}
      </Slider>
    </Container>
  );
};

const Container = styled.section`
  position: relative;
  margin: 5% auto;
  width: 1060px;
`;

const LeftButtonImg = styled.img`
  position: absolute;
  top: 6vw;
  left: -52px;
`;

const RightButtonImg = styled.img`
  position: absolute;
  top: 6vw;
  right: -52px;
`;

const OtherPlayLists = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: hidden;
`;

const OtherPlayListHr = styled.div`
  width: 1161px;
  margin: 0 0 52px -49px;
  opacity: 0.5;
  border: 1px solid #bb8c3c;
  transform: rotate(180deg);
`;

const OtherPlayList = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-right: 62px;
  padding-left: 24px;
`;

const OtherTitle = styled.div`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 30px;
  color: #ffffff;
  width: 112px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const OtherSinger = styled.div`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  color: #ffffff;
  width: 112px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export default OtherLists;
