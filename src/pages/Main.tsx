import React from "react";
import { useState } from "react";
import styled from "styled-components";
import BackgroundImg from "assets/img/background-img.png";
import ChampionIcon from "assets/img/champion-icon.png";
import WardIcon from "assets/img/ward-icon.png";
import SliderPrevArrow from "assets/img/slider-prev-arrow.png";
import SliderNextArrow from "assets/img/slider-next-arrow.png";
import SliderSampleImg from "assets/img/slider-sample-img.png";
import LaunchpadBg from "assets/img/launchpad-bg.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Main = () => {
  const [name] = useState("가렌 Garen");
  const [shortInfo] = useState("데마시아의 힘");
  const [description] = useState(
    "가렌은 불굴의 선봉대를 이끄는 고결하고 자긍심 강한 전사다. 선봉대 내에서 인망이 두터울 뿐 아니라 심지어 적에게도 존경을 받지만, 그가 대대로 데마시아와 데마시아의 이상을 수호하는 임무를 맡은 크라운가드 가문의 자손이기 때문은 아니다. 가렌은 마법 저항력을 갖춘 방어구와 거대한 대검으로 무장하고, 언제라도 마법사에 맞서 정당한 검으로 진정한 칼바람을 일으킬 준비가 되어 있다"
  );
  const [PlayList] = useState(
    [...Array(15)].map((i, index) => {
      return {
        title: `데마시아의 힘을 느껴보자${index}`,
        listCount: index,
        wardCount: index * 10,
      };
    })
  );

  return (
    <>
      <PlayListSection>
        <GradientSection />
        <TextWrapper>
          <Icon src={ChampionIcon} width={34} height={34} />
          <Name>{name}</Name>
          <ShortInfo>{shortInfo}</ShortInfo>
          <Description>{description}</Description>
        </TextWrapper>
        <SliderWrapper>
          <Slider
            className="slider variable-width"
            dots
            dotsClass="slick-dots slick-thumb"
            infinite
            speed={500}
            slidesToShow={5}
            slidesToScroll={5}
            variableWidth
            customPaging={(p) => <a>{p}</a>}
            prevArrow={<SliderArrow type="prev" />}
            nextArrow={<SliderArrow type="next" />}
          >
            {PlayList.map((i, index) => (
              <SliderItem key={`slider-item-${index}`}>
                <SliderItemBox>
                  <SliderItemGradient>
                    <ItemWrappder>
                      <Title>{i.title}</Title>
                      <CountWrapper>
                        <Count>{i.listCount}곡</Count>
                        <Divider />
                        <Icon
                          src={WardIcon}
                          width={13}
                          height={14}
                          marginRight={2}
                        />
                        <Count>{i.wardCount}</Count>
                      </CountWrapper>
                    </ItemWrappder>
                  </SliderItemGradient>
                </SliderItemBox>
              </SliderItem>
            ))}
          </Slider>
        </SliderWrapper>
      </PlayListSection>
      <LaunchpadSection>
        <LaunchPadBg>
          <Launpad>
            <LaunpadInner>
              <LaunchpadFilter>
                <CategoryFilter>
                  <Icon
                    src={ChampionIcon}
                    width={34}
                    height={34}
                    marginRight={10}
                  />
                  <Icon
                    src={ChampionIcon}
                    width={34}
                    height={34}
                    marginRight={10}
                  />
                  <Icon
                    src={ChampionIcon}
                    width={34}
                    height={34}
                    marginRight={10}
                  />
                  <Icon
                    src={ChampionIcon}
                    width={34}
                    height={34}
                    marginRight={10}
                  />
                  <Icon
                    src={ChampionIcon}
                    width={34}
                    height={34}
                    marginRight={10}
                  />
                  <Icon
                    src={ChampionIcon}
                    width={34}
                    height={34}
                    marginRight={10}
                  />
                </CategoryFilter>
              </LaunchpadFilter>
              {[...Array(6)].map((w) => {
                return (
                  <ItemWrapper key={w}>
                    {[...Array(8)].map((i) => {
                      return <LaunchpadItem key={i}></LaunchpadItem>;
                    })}
                  </ItemWrapper>
                );
              })}
            </LaunpadInner>
          </Launpad>
        </LaunchPadBg>
      </LaunchpadSection>
      <RankingSection>
        <RankingCategory></RankingCategory>
      </RankingSection>
    </>
  );
};

export default Main;

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

const PlayListSection = styled.section`
  height: 640px;
  background-image: url(${BackgroundImg});
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  position: relative;
`;

const GradientSection = styled.div`
  height: 100%;
  width: 55%;
  min-width: 815px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  background: linear-gradient(
    to left,
    rgba(20, 20, 20, 0) 10%,
    rgba(20, 20, 20, 0.25) 20%,
    rgba(20, 20, 20, 0.5) 40%,
    rgba(20, 20, 20, 0.75) 65%,
    rgba(20, 20, 20, 1) 100%
  );
  backdrop-filter: blur(2px);
`;

const TextWrapper = styled.div`
  z-index: 11;
  position: absolute;
  display: flex;
  flex-direction: column;
  max-height: 480px;
  max-width: 479px;
  top: 130px;
  left: 130px;
`;
const Icon = styled.img<{
  width: number;
  height: number;
  marginRight?: number;
}>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  margin-right: ${({ marginRight }) => `${marginRight || 0}px`};
`;
const Name = styled.div`
  font-size: 50px;
  font-weight: 500;
  line-height: 74px;
`;
const ShortInfo = styled.div`
  font-size: 19px;
  font-weight: medium;
  opacity: 0.5;
  line-height: 28px;
`;
const Description = styled.div`
  font-size: 16px;
  font-weight: lighter;
  margin-top: 30px;
`;
const SliderWrapper = styled.div`
  height: 300px;
  width: 1220px;
  position: absolute;
  z-index: 12;
  bottom: -175px;
  left: calc(50% - 610px);
`;

const SliderItem = styled.div`
  position: relative;
  width: 200px !important;
  height: 200px;
  background: conic-gradient(
    #755c28,
    #d3bf89,
    #817347,
    #433915,
    #817347,
    #d3bf89,
    #755c28
  );
  padding: 12px;
  box-sizing: border-box;
  margin: 0 22px;
`;

const SliderItemBox = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  width: 190px;
  height: 190px;
  background-image: url(${SliderSampleImg});
  background-repeat: no-repeat;
  background-size: cover;
`;

const SliderItemGradient = styled.div`
  position: absolute;
  height: 130px;
  width: 100%;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    to bottom,
    rgba(20, 20, 20, 0) 5%,
    rgba(20, 20, 20, 0.25) 35%,
    rgba(20, 20, 20, 0.5) 55%,
    rgba(20, 20, 20, 0.75) 75%,
    rgba(20, 20, 20, 1) 100%
  );
`;
const ItemWrappder = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  left: 15px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
`;
const CountWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 7px;
`;
const Count = styled.div`
  font-size: 12px;
  font-weight: medium;
  opacity: 0.6;
`;
const Divider = styled.hr`
  height: 13px;
  width: 1px;
  background-color: #666666;
  opacity: 0.5;
  margin: 0 10px;
  border: 0;
`;

const LaunchpadSection = styled.section`
  margin-top: 200px;
`;

const LaunchPadBg = styled.div`
  background-image: url(${LaunchpadBg});
  width: 1102px;
  height: 865px;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0 auto;
`;

const Launpad = styled.div`
  width: 890px;
  height: 750px;
  background: conic-gradient(
    #755c28,
    #d3bf89,
    #817347,
    #433915,
    #817347,
    #d3bf89,
    #755c28
  );
  margin: 0 auto;
  border-radius: 20px;
  padding-top: 4px;
  box-sizing: border-box;
`;

const LaunpadInner = styled.div`
  width: 882px;
  height: 742px;
  background: conic-gradient(
    #0c1c2d,
    #0d1f32,
    #0e2235,
    #000204,
    #0e2235,
    #0d1f32,
    #0c1c2d
  );
  margin: 0 auto;
  border-radius: 20px;
  padding: 20px 50px 60px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LaunchpadFilter = styled.div`
  height: 60px;
  width: 100%;
  border-bottom: 1px solid #64583a;
`;

const CategoryFilter = styled.div`
  display: flex;
`;

const LaunchpadItem = styled.div`
  width: 75px;
  height: 75px;
  background-color: gray;
  border-radius: 5px;
  border: 1px solid #73592c;
`;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

//28
//75

const RankingSection = styled.section`
  height: 1780px;
  width: 100%;
  background: linear-gradient(#010407, #9fa6dc);
`;

const RankingCategory = styled.div`
  height: 120px;
  border-bottom: 1px solid #73592c;
  display: flex;
  justify-content: center;
  align-items: center;
`;
