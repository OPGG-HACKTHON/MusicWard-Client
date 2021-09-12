import React, { useEffect } from "react";
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
    dots: false,
    infinite: true,
    slidesToShow:
      others?.tracks.total &&
      (others?.tracks.total > 6 ? 7 : others?.tracks.total),
    slidesToScroll: 1,
    swipeToSlide: true,
  };

  useEffect(() => {
    const slideItems = document.querySelectorAll(".slick-slide.slick-active");
    slideItems.forEach((item) => {
      item.firstElementChild?.firstElementChild?.setAttribute(
        "style",
        "width: auto;"
      );
      item.firstElementChild?.setAttribute(
        "style",
        "display: flex; justify-content: center;"
      );
    });
  });

  return (
    <Container>
      <OtherPlayListHr />
      <Slider
        {...slideSettings}
        prevArrow={<LeftButtonImg src={LeftButton} className="slick-prev" />}
        nextArrow={<RightButtonImg src={RightButton} className="slick-next" />}
      >
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
      </Slider>
    </Container>
  );
};

const Container = styled.section`
  position: relative;
  margin: 0 auto;
  width: 1060px;
`;

const LeftButtonImg = styled.img`
  position: absolute;
  top: 111px;
  left: -52px;
`;

const RightButtonImg = styled.img`
  position: absolute;
  top: 111px;
  right: -52px;
`;

const OtherPlayListHr = styled.div`
  width: 1161px;
  margin: 0 0 52px -49px;
  opacity: 0.5;
  border: 1px solid #bb8c3c;
  transform: rotate(180deg);
`;

const OtherPlayList = styled.div`
  width: auto;
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
