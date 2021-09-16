import React, { useState, useCallback, MouseEvent } from "react";
import styled from "styled-components";
import DeleteButton from "assets/img/delete-button.svg";
import Ward from "assets/img/mypage/ward.png";
import YoutubeMusicIcon from "assets/icon/i-youtube-music.svg";
import SpotifyMusicIcon from "assets/icon/i-spotify-music.svg";
import SyncIcon from "assets/icon/i-sync.svg";
import EmptyImg from "assets/img/empty-img.svg";
import PlayListAddModal from "components/PlayListAddModal";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { accessToken, isSpotify } from "recoil/auth";
import axiosInstance from "utils/axiosConfig";
import { useHistory } from "react-router";
import { alertState, AlertType } from "recoil/alert";

type PlayListType = {
  original_id: string;
  image: { url: string };
  original_title: string;
};

interface UploadPlayListType extends PlayListType {
  playlist_id: number;
  title: string;
  tags: Array<string>;
  created_date: string;
  tracks: { total: string };
  wards: { total: string };
  provider: string;
}

const PlayLists = () => {
  const history = useHistory();
  const jwtToken = useRecoilValue(accessToken);
  const useSpotify = useRecoilValue(isSpotify);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [uploadPlayList, setUploadPlayList] = useState([]);
  const [spotifyPlayList, setSpotifyPlayList] = useState([]);
  const [playList, setPlayList] = useState([]);
  const [playListId, setPlayListId] = useState("");
  const [playListUrl, setPlayListUrl] = useState("");
  const [provider, setProvider] = useState("");
  const [, setAlertState] = useRecoilState<AlertType>(alertState);

  const handleOpenModal = useCallback(
    (state: boolean) => () => {
      if (!state) {
        getUploadPlayList();
        getPlayList();
        if (useSpotify) {
          getPlayList("SPOTIFY");
        }
      }
      setOpenModal(state);
    },
    [setOpenModal]
  );
  const handleAddPlayList = useCallback(
    ({ original_id: id, external_url: url }, provider) =>
      () => {
        setOpenModal(true);
        setPlayListId(id);
        setPlayListUrl(url);
        setProvider(provider);
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
    setUploadPlayList(data);
  };
  const getPlayList = async (provider = "YOUTUBE") => {
    const { data } = await axiosInstance({
      url: "non-playlists",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      params: {
        provider,
      },
    });
    if (provider === "YOUTUBE") {
      setPlayList(data.items);
      return;
    }
    setSpotifyPlayList(data.items);
  };
  const handleDelete = useCallback(
    (id) => (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      setAlertState({
        show: true,
        title: "플레이리스트 삭제",
        confirmText: "삭제하기",
        onConfirm: () => deletePlayList(id),
      });
    },
    [setAlertState]
  );
  const deletePlayList = async (id: number) => {
    await axiosInstance({
      url: `playlists/${id}`,
      method: "delete",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then(() => {
      setAlertState({
        show: false,
      });
    });
  };
  const handleGoPlayList = useCallback(
    (id) => () => {
      history.push({
        pathname: `/playlist/${id}`,
      });
    },
    []
  );
  const handleSync = useCallback(
    (id) => async (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      await axiosInstance({
        url: `playlists/${id}`,
        method: "post",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }).then(() => {
        getUploadPlayList();
        getPlayList();
        if (useSpotify) {
          getPlayList("SPOTIFY");
        }
      });
    },
    []
  );
  useEffect(() => {
    getUploadPlayList();
    getPlayList();
    if (useSpotify) {
      getPlayList("SPOTIFY");
    }
  }, []);

  return (
    <Container>
      {openModal && (
        <PlayListAddModal
          id={playListId}
          link={playListUrl}
          provider={provider}
          onClose={handleOpenModal(false)}
        />
      )}
      <Wrapper>
        <MainText>업로드한 플레이리스트</MainText>
        <PlayListSection>
          <PlayList>
            {uploadPlayList.map((i: UploadPlayListType) => (
              <PlayListWrapper
                key={`upload-play-list-${i.playlist_id}`}
                onClick={handleGoPlayList(i.playlist_id)}
              >
                <PlayListBox imgUrl={i.image.url}>
                  <Delete
                    src={DeleteButton}
                    onClick={handleDelete(i.playlist_id)}
                  />
                  <Info>
                    <IconWrapper>
                      <Icon
                        src={
                          i.provider === "YOUTUBE"
                            ? YoutubeMusicIcon
                            : SpotifyMusicIcon
                        }
                      />
                      <Icon
                        src={SyncIcon}
                        onClick={handleSync(i.playlist_id)}
                      />
                    </IconWrapper>
                    <Title>{i.title}</Title>
                    <TagsWrapper>
                      {i.tags?.map((t) => (
                        <Tags key={t}>#{t} </Tags>
                      ))}
                    </TagsWrapper>
                    <BottomInfoWrapper>
                      <Popu>
                        <span>{i.tracks?.total}곡</span>
                        <Hr />
                        <img src={Ward} />
                        <span>{i.wards?.total}</span>
                      </Popu>
                      <Date>{i.created_date.split(" ")[0]}</Date>
                    </BottomInfoWrapper>
                  </Info>
                </PlayListBox>
              </PlayListWrapper>
            ))}
            {spotifyPlayList.map((i: UploadPlayListType) => (
              <PlayListWrapper
                key={`play-list-${i.original_id}`}
                onClick={handleAddPlayList(i, "SPOTIFY")}
              >
                <PlayListWrapperFilter />
                <PlusIcon />
                <PlayListBox imgUrl={i.image.url}>
                  <PlayListGradient>
                    <PlayListTitle>
                      <div>
                        <Icon src={SpotifyMusicIcon} />
                      </div>
                      <div>{i.original_title}</div>
                    </PlayListTitle>
                  </PlayListGradient>
                </PlayListBox>
              </PlayListWrapper>
            ))}
            {playList.map((i: PlayListType) => (
              <PlayListWrapper
                key={`play-list-${i.original_id}`}
                onClick={handleAddPlayList(i, "YOUTUBE")}
              >
                <PlayListWrapperFilter />
                <PlusIcon />
                <PlayListBox imgUrl={i.image.url}>
                  <PlayListGradient>
                    <PlayListTitle>
                      <div>
                        <Icon src={YoutubeMusicIcon} />
                      </div>
                      <div>{i.original_title}</div>
                    </PlayListTitle>
                  </PlayListGradient>
                </PlayListBox>
              </PlayListWrapper>
            ))}
          </PlayList>
        </PlayListSection>
      </Wrapper>
    </Container>
  );
};

const PlayListWrapperFilter = styled.div`
  position: absolute;
  width: 246px !important;
  height: 246px;
  top: 0;
  left: 0;
  background: rgb(42 77 109 / 50%);
  z-index: 10;
`;

const PlusIcon = styled.div`
  &::after,
  &::before {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 6px;
    height: 56px;
    background-color: #f0f0f0;
    transform-origin: top left;
    content: "";
    z-index: 20;
  }
  &::before {
    transform: rotate(0deg) translate(-50%, -50%);
  }
  &::after {
    transform: rotate(90deg) translate(-50%, -50%);
  }
`;

const PlayListWrapper = styled.div`
  position: relative;
  width: 246px !important;
  height: 246px;
  background: conic-gradient(
    #755c28,
    #d3bf89,
    #817347,
    #433915,
    #817347,
    #d3bf89,
    #755c28
  );
  padding: 15px;
  box-sizing: border-box;
  margin: 30px;
  cursor: pointer;
`;

const PlayListBox = styled.div<{ imgUrl?: string }>`
  position: absolute;
  top: 5px;
  left: 5px;
  width: 236px;
  height: 236px;
  background: url(${({ imgUrl }) => imgUrl || EmptyImg}), #010407;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const PlayListGradient = styled.div`
  position: absolute;
  height: 150px;
  width: 100%;
  bottom: 0;
  left: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 69.05%);
  padding: 10px;
  box-sizing: border-box;
`;

const PlayListTitle = styled.div`
  width: 100%;
  padding: 15px;
  font-weight: bold;
  font-size: 18px;
  line-height: 26px;
  color: #ffffff;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Container = styled.section`
  background: #141a21;
  min-height: 100vh;
  border-top: 1px solid #bb8c3c;
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
`;

const Wrapper = styled.div`
  width: 1166px;
`;

const MainText = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  color: #ffffff;
  margin: 35px 0;
`;

const PlayListSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: -30px;
`;

const PlayList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const Delete = styled.img`
  position: absolute;
  right: 1vw;
  top: 1vw;
  cursor: pointer;
`;

const Info = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 160px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 69.05%);
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const IconWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 20px;
  margin-bottom: 5px;
  img {
    margin-right: 5px;
  }
`;

const Title = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 26px;
  color: #ffffff;
`;

const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Tags = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 17px;
  color: #ffffff;
  opacity: 0.7;
  margin-right: 10px;
`;

const Popu = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 17px;
  color: #ffffff;
  opacity: 0.6;
  display: flex;
  align-items: center;
`;

const BottomInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Hr = styled.hr`
  opacity: 0.5;
  border: 1px solid #666666;
  transform: rotate(90deg);
  display: inline;
  margin: 0;
  height: 100%;
  width: 10px;
`;

const Date = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 17px;
  text-align: right;
  color: #ffffff;
  opacity: 0.6;
`;

const Icon = styled.img`
  width: 20px;
`;

export default PlayLists;
