import React, { useState } from "react";
import styled from "styled-components";

import Ward from "assets/img/archivepage/ward.svg";
import SmallWard from "assets/img/mypage/ward.png";
import WardListSample from "assets/img/archivepage/ward-list-sample.png";

const WardLists = () => {
  const [positionTop, setPositionTop] = useState(272);
  const getActiveItemAttr = (e: any) => {
    setPositionTop(e.target.offsetTop);
  };

  return (
    <Container>
      <img src={Ward} style={{ width: "40px" }} />
      <WardText>와드함</WardText>
      <WardHr />

      <ActiveGradi positionTop={positionTop} />
      <Lists>
        <Items onClick={getActiveItemAttr}>
          <img src={WardListSample} style={{ marginRight: "28px" }} />
          <ItemAlign>
            <Title>데마시아의 힘을 느껴보자</Title>
            <Popu>
              <span>23곡</span>
              <img src={SmallWard} />
              <span>133</span>
            </Popu>
          </ItemAlign>
        </Items>
        <Items>
          <img src={WardListSample} style={{ marginRight: "28px" }} />
          <ItemAlign>
            <Title>데마시아의 힘을 느껴보자</Title>
            <Popu>
              <span>23곡</span>
              <img src={SmallWard} />
              <span>133</span>
            </Popu>
          </ItemAlign>
        </Items>
        <Items>
          <img src={WardListSample} style={{ marginRight: "28px" }} />
          <ItemAlign>
            <Title>데마시아의 힘을 느껴보자</Title>
            <Popu>
              <span>23곡</span>
              <img src={SmallWard} />
              <span>133</span>
            </Popu>
          </ItemAlign>
        </Items>
        <Items>
          <img src={WardListSample} style={{ marginRight: "28px" }} />
          <ItemAlign>
            <Title>데마시아의 힘을 느껴보자</Title>
            <Popu>
              <span>23곡</span>
              <img src={SmallWard} />
              <span>133</span>
            </Popu>
          </ItemAlign>
        </Items>
        <Items>
          <img src={WardListSample} style={{ marginRight: "28px" }} />
          <ItemAlign>
            <Title>데마시아의 힘을 느껴보자</Title>
            <Popu>
              <span>23곡</span>
              <img src={SmallWard} />
              <span>133</span>
            </Popu>
          </ItemAlign>
        </Items>
        <Items>
          <img src={WardListSample} style={{ marginRight: "28px" }} />
          <span>
            <Title>데마시아의 힘을 느껴보자</Title>
            <Popu>
              <span>23곡</span>
              <img src={SmallWard} />
              <span>133</span>
            </Popu>
          </span>
        </Items>
        <Items>
          <img src={WardListSample} style={{ marginRight: "28px" }} />
          <span>
            <Title>데마시아의 힘을 느껴보자</Title>
            <Popu>
              <span>23곡</span>
              <img src={SmallWard} />
              <span>133</span>
            </Popu>
          </span>
        </Items>
        <Items>
          <img src={WardListSample} style={{ marginRight: "28px" }} />
          <span>
            <Title>데마시아의 힘을 느껴보자</Title>
            <Popu>
              <span>23곡</span>
              <img src={SmallWard} />
              <span>133</span>
            </Popu>
          </span>
        </Items>
        <Items>
          <img src={WardListSample} style={{ marginRight: "28px" }} />
          <span>
            <Title>데마시아의 힘을 느껴보자</Title>
            <Popu>
              <span>23곡</span>
              <img src={SmallWard} />
              <span>133</span>
            </Popu>
          </span>
        </Items>
      </Lists>
    </Container>
  );
};

const Container = styled.section`
  width: 340px;
`;

const ActiveGradi = styled.div<{ positionTop: number }>`
  position: absolute;
  width: 460px;
  height: 112px;
  left: 0px;
  top: ${(props) => props.positionTop};

  background: radial-gradient(
    100% 1686.86% at 0% 64.73%,
    #2a4d6d 0%,
    rgba(42, 77, 109, 0) 100%
  );
`;

const ItemAlign = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const WardText = styled.div`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 41px;
  color: #ffffff;
`;

const WardHr = styled.hr`
  width: 239px;
  height: 0px;
  margin: 30px 0;
  opacity: 0.5;
  /* gold/primary */
  border: 1px solid #bb8c3c;
  transform: rotate(180deg);
  background-color: #bb8c3c;
`;

const Lists = styled.section`
  height: 570px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-thumb {
    height: 17%;
    background: linear-gradient(180deg, #bb8c3c 0%, #73592c 100%);
  }
  ::-webkit-scrollbar-track {
    background: #1b1b1b;
  }
`;

const Items = styled.div`
  display: flex;
  height: 112px;
  padding: 10px 7px 10px 0;
  box-sizing: border-box;
`;

const Title = styled.div`
  margin-right: 10px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 26px;
  color: #ffffff;
`;

const Popu = styled.div`
  display: flex;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #ffffff;
  opacity: 0.6;

  & > img {
    margin: 3px 3px 0 36px;
  }
`;

export default WardLists;
