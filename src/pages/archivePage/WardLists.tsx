import React from "react";
import styled from "styled-components";
import Ward from "assets/img/archivepage/ward.svg";
import SmallWard from "assets/img/mypage/ward.png";
import { useRecoilState } from "recoil";
import { playlistIdState } from "recoil/playlist";

type IProps = {
  wardBox?: [
    {
      playlist_id: number;
      tracks: { total: number };
      wards: { total: number };
      title: string;
      image: {
        url: string;
        width: number;
      };
    }
  ];
};

const WardLists = ({ wardBox }: IProps) => {
  const [, setCurrentPlayId] = useRecoilState(playlistIdState);

  const getActiveItemAttr = (e: any) => {
    let targetElement = e.target;
    while (targetElement.id != "wardTarget") {
      targetElement = targetElement.parentNode;
    }

    document.querySelectorAll("#wardTarget").forEach((item) => {
      item.classList.remove("active");
    });
    document.querySelectorAll("#wardGradient").forEach((item) => {
      item.setAttribute("style", "display: none;");
    });
    targetElement.nextElementSibling.style = "display: block;";

    setCurrentPlayId(targetElement.dataset.id);
  };

  return (
    <Container>
      <img src={Ward} style={{ width: "40px" }} />
      <WardText>와드함</WardText>
      <WardHr />

      <Lists>
        {wardBox?.map((i) => (
          <ItemsBox key={i.playlist_id}>
            <Items
              onClick={getActiveItemAttr}
              id="wardTarget"
              data-id={i.playlist_id}
            >
              <ImgBox>
                <img
                  src={i.image.url}
                  style={{
                    marginRight: "28px",
                    width: "93px",
                    height: "95px",
                  }}
                />
              </ImgBox>
              <ItemAlign>
                <Title>{i.title}</Title>
                <Popu>
                  <span>{i.tracks}곡</span>
                  <img src={SmallWard} />
                  <span>{i.wards}</span>
                </Popu>
              </ItemAlign>
            </Items>
            <ActiveGradi displayvalue="false" id="wardGradient" />
          </ItemsBox>
        ))}
      </Lists>
    </Container>
  );
};

const Container = styled.section`
  width: 340px;
`;

const ItemsBox = styled.div`
  position: relative;
`;

const ImgBox = styled.div`
  width: 93px;
  height: 95px;
  margin-right: 28px;
  z-index: 20;
`;

const ActiveGradi = styled.div<{ displayvalue: string }>`
  display: ${(props) => (props.displayvalue == "true" ? "block" : "none")};
  position: absolute;
  width: 100%;
  height: 112px;
  left: 0px;
  top: 0px;

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
  z-index: 20;
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
  padding: 10px 7px;
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
