import React, { useState, useCallback } from "react";
import styled from "styled-components";
import PlayListSample from "assets/img/mypage/play-list-sample.png";
import DeleteButton from "assets/img/mypage/delete-button.png";
import Ward from "assets/img/mypage/ward.png";
import PlayYoutube from "assets/img/mypage/play-youtube.png";
// import PlaySpotify from "assets/img/mypage/play-spotify.png";
import PlayListAddModal from "components/PlayListAddModal";

const PlayLists = () => {
  // FIXME: 임시로 플레이리스트 생성 모달 표출
  const [showModal, setShowModal] = useState(false);
  const openModal = useCallback(() => {
    setShowModal(true);
  }, [setShowModal]);
  const handleClose = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);
  return (
    <Container>
      {showModal && <PlayListAddModal onClose={handleClose} />}
      <Line />
      <MainText>업로드한 플레이리스트</MainText>
      <Lists>
        <Rows>
          <Item onClick={openModal}>
            <Delete src={DeleteButton} />
            <Info>
              <img
                src={PlayYoutube}
                style={{
                  width: "20px",
                  position: "absolute",
                  left: "15px",
                  top: "40px",
                }}
              />
              <Title>데마시아의 힘을 느껴보자</Title>
              <Tags>#가렌 #데마시아 #매드무비</Tags>
              <Popu>
                <span>23곡</span>
                <VHr />
                <img src={Ward} />
                <span>133</span>
              </Popu>
              <Date>2021.07.21</Date>
            </Info>
          </Item>
          <Item>
            <Delete src={DeleteButton} />
            <Info>
              <img
                src={PlayYoutube}
                style={{
                  width: "20px",
                  position: "absolute",
                  left: "15px",
                  top: "40px",
                }}
              />
              <Title>데마시아의 힘을 느껴보자</Title>
              <Tags>#가렌 #데마시아 #매드무비</Tags>
              <Popu>
                <span>23곡</span>
                <VHr />
                <img src={Ward} />
                <span>133</span>
              </Popu>
              <Date>2021.07.21</Date>
            </Info>
          </Item>
          <Item>
            <Delete src={DeleteButton} />
            <Info>
              <img
                src={PlayYoutube}
                style={{
                  width: "20px",
                  position: "absolute",
                  left: "15px",
                  top: "40px",
                }}
              />
              <Title>데마시아의 힘을 느껴보자</Title>
              <Tags>#가렌 #데마시아 #매드무비</Tags>
              <Popu>
                <span>23곡</span>
                <VHr />
                <img src={Ward} />
                <span>133</span>
              </Popu>
              <Date>2021.07.21</Date>
            </Info>
          </Item>
          <Item>
            <Delete src={DeleteButton} />
            <Info>
              <img
                src={PlayYoutube}
                style={{
                  width: "20px",
                  position: "absolute",
                  left: "15px",
                  top: "40px",
                }}
              />
              <Title>데마시아의 힘을 느껴보자</Title>
              <Tags>#가렌 #데마시아 #매드무비</Tags>
              <Popu>
                <span>23곡</span>
                <VHr />
                <img src={Ward} />
                <span>133</span>
              </Popu>
              <Date>2021.07.21</Date>
            </Info>
          </Item>
        </Rows>
        <Rows>
          <Item>
            <OverR></OverR>
          </Item>
          <img src={PlayListSample} />
          <img src={PlayListSample} />
          <img src={PlayListSample} />
          <img src={PlayListSample} />
        </Rows>
        <Rows>
          <img src={PlayListSample} />
          <img src={PlayListSample} />
          <img src={PlayListSample} />
          <img src={PlayListSample} />
        </Rows>
      </Lists>
    </Container>
  );
};

const Container = styled.section`
  position: relative;
  padding: 2vw 10%;
  background: #141a21;
`;

const Line = styled.hr`
  position: absolute;
  width: 100%;
  top: 0;
  margin: 0 0 0 -10%;
  opacity: 0.5;
  /* gold/primary */
  border: 1px solid #bb8c3c;
`;

const MainText = styled.div`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  color: #ffffff;
  margin: 2vw 0;
`;

const Lists = styled.div`
  display: flex;
  flex-direction: column;
`;

const Rows = styled.div`
  width: 100%;
  margin-bottom: 60px;
  display: flex;
  justify-content: space-between;
`;

const Item = styled.div`
  position: relative;
  width: 246px;
  height: 247px;
  background-image: url(${PlayListSample});
  border: 5px solid;
  border-image-source: linear-gradient(
    from 180deg at 50% 50%,
    #443916 -0.23deg,
    #d4c18b 112.53deg,
    #765c29 144.84deg,
    #765c29 214.97deg,
    #d4c18b 248.9deg,
    #443916 359.77deg,
    #d4c18b 472.53deg
  );
`;

const Delete = styled.img`
  position: absolute;
  right: 1vw;
  top: 1vw;
`;

const Info = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 160px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 69.05%);
`;

const Title = styled.div`
  position: absolute;
  left: 15px;
  top: 67px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 26px;
  color: #ffffff;
`;

const Tags = styled.div`
  position: absolute;
  left: 15px;
  bottom: 45px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 17px;
  color: #ffffff;
  opacity: 0.7;
`;

const Popu = styled.div`
  position: absolute;
  left: 15px;
  bottom: 15px;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 17px;
  color: #ffffff;
  opacity: 0.6;
`;

const VHr = styled.hr`
  opacity: 0.5;
  border: 1px solid #666666;
  transform: rotate(90deg);
  display: inline;
  margin: 10px;
`;

const Date = styled.div`
  position: absolute;
  right: 15px;
  bottom: 15px;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 17px;
  text-align: right;
  color: #ffffff;
  opacity: 0.6;
`;

const OverR = styled.div`
  background: #2a4d6d;
  opacity: 0.5;
`;

export default PlayLists;
