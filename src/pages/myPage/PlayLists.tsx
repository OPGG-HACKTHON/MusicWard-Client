import React, { useState, useCallback } from "react";
import styled from "styled-components";
// import PlayListSample from "assets/img/mypage/play-list-sample.png";
import DeleteButton from "assets/img/mypage/delete-button.png";
import Ward from "assets/img/mypage/ward.png";
import PlayYoutube from "assets/img/mypage/play-youtube.png";
// import PlaySpotify from "assets/img/mypage/play-spotify.png";
import PlayListAddModal from "components/PlayListAddModal";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { accessToken } from "recoil/auth";
import axiosInstance from "utils/axiosConfig";

const PlayLists = () => {
  // FIXME: 임시로 플레이리스트 생성 모달 표출
  const jwtToken = useRecoilValue(accessToken);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [uploadPlayList, setUploadPlayList] = useState([]);
  const [playList, setPlayList] = useState([]);
  const [playListId, setPlayListId] = useState("");
  const [playListUrl, setPlayListUrl] = useState("");

  const handleOpenModal = useCallback(
    (state: boolean) => () => {
      setOpenModal(state);
    },
    [setOpenModal]
  );
  const handleAddPlayList = useCallback(
    ({ original_id: id, external_url: url }) =>
      () => {
        setOpenModal(true);
        setPlayListId(id);
        setPlayListUrl(url);
      },
    [setOpenModal, setPlayListUrl]
  );
  const getUploadPlayList = async () => {
    const { data } = await axiosInstance({
      url: "playlists/me",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    console.log(data);
    setUploadPlayList(data);
  };
  const getPlayList = async () => {
    const { data } = await axiosInstance({
      url: "non-playlists",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      params: {
        provider: "SPOTIFY", // FIXME
      },
    });
    console.log(data.items);
    setPlayList(data.items);
  };
  useEffect(() => {
    getUploadPlayList();
    getPlayList();
  }, []);

  return (
    <Container>
      {openModal && (
        <PlayListAddModal
          id={playListId}
          link={playListUrl}
          onClose={handleOpenModal(false)}
        />
      )}
      <Wrapper>
        <MainText>업로드한 플레이리스트</MainText>
        <Lists>
          <Rows>
            {uploadPlayList.map(
              (i: {
                original_id: string;
                image: { url: string };
                original_title: string;
              }) => (
                <Item
                  key={i.original_id}
                  url={i.image.url}
                  onClick={handleAddPlayList(i)}
                >
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
                    <Title>{i.original_title}</Title>
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
              )
            )}
            {playList.map(
              (i: {
                original_id: string;
                image: { url: string };
                original_title: string;
              }) => (
                <Item
                  key={i.original_id}
                  url={i.image.url}
                  onClick={handleAddPlayList(i)}
                >
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
                    <Title>{i.original_title}</Title>
                  </Info>
                </Item>
              )
            )}
          </Rows>
        </Lists>
      </Wrapper>
    </Container>
  );
};

const Container = styled.section`
  background: #141a21;
  height: calc(100vh - 380px);
  border-top: 1px solid #bb8c3c;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 1166px;
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
`;

const Item = styled.div<{ url?: string }>`
  position: relative;
  width: 246px;
  height: 247px;
  background-image: url(${({ url }) => url || ""});
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
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
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

export default PlayLists;
