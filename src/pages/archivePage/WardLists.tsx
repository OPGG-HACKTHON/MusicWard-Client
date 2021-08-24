import React from "react";
import styled from "styled-components";

import Ward from "assets/img/archivepage/ward.png";
import SmallWard from "assets/img/mypage/ward.png";
import WardListSample from "assets/img/archivepage/ward-list-sample.png";

const WardLists = () => {
  return (
    <Container>
      <img src={Ward} style={{ width: "40px" }} />
      <WardText>와드함</WardText>
      <WardHr />

      <Lists>
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
  width: 25%;
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
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #ffffff;
  opacity: 0.6;
`;

export default WardLists;
