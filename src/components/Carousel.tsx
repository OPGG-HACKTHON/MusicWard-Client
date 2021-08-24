import React, { FC } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PlayListItem, { PlayListItemProps } from "components/PlayListItem";

import SliderPrevArrow from "assets/img/slider-prev-arrow.png";
import SliderNextArrow from "assets/img/slider-next-arrow.png";

interface SliderProps {
  items: Array<PlayListItemProps>;
  showPaging?: boolean;
  position?: string;
}

const Carousel: FC<SliderProps> = ({
  items,
  showPaging,
  position = "absolute",
}) => {
  return (
    <SliderWrapper position={position}>
      <Slider
        className="slider variable-width"
        dots={!!showPaging}
        dotsClass="slick-dots slick-thumb"
        infinite
        speed={500}
        slidesToShow={5}
        slidesToScroll={5}
        variableWidth
        customPaging={() => <div className="slick-dots" />}
        prevArrow={<SliderArrow type="prev" />}
        nextArrow={<SliderArrow type="next" />}
      >
        {items.map((i, index) => (
          <PlayListItem
            key={`slider-item-${index}`}
            title={i.title}
            listCount={i.listCount}
            wardCount={i.wardCount}
            imgUrl={i.imgUrl}
          />
        ))}
      </Slider>
    </SliderWrapper>
  );
};

export default Carousel;

const SliderWrapper = styled.div<{ position: string }>`
  width: 1220px;
  position: ${({ position }) => position};
  z-index: 12;
  bottom: -81px;
  left: calc(50% - 610px);
  .slick-dots.slick-thumb {
    display: flex !important;
    flex-direction: row;
    justify-content: center;
    padding: 0 22px;
    box-sizing: border-box;
    bottom: -65px;
  }
  .slick-dots.slick-thumb li {
    flex: 1;
    transition: all 1s ease-in-out;
    will-change: width;
    margin: 0;
    height: 4px;
    border-bottom: 1px solid #bb8c3c;
  }
  .slick-dots.slick-thumb li.slick-active {
    background: linear-gradient(90deg, #bb8c3c 0%, #73592c 100%);
  }
`;

interface SliderArrowProps {
  type: "next" | "prev";
  className?: string;
  style?: Record<string, string>;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const SliderArrow = ({ type, className, style, onClick }: SliderArrowProps) => {
  return (
    <img
      className={className}
      style={{ ...style, height: "30px" }}
      onClick={onClick}
      src={type === "prev" ? SliderPrevArrow : SliderNextArrow}
    />
  );
};
