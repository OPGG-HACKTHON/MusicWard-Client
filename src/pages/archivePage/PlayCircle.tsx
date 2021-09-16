import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Eclipse from "assets/img/archivepage/eclipse.png";
import PlayButton from "assets/img/playlistpage/play-button.png";
import axiosInstance from "utils/axiosConfig";

import { useRecoilValue, useRecoilState } from "recoil";
import { playlistIdState, playlistImgState } from "recoil/playlist";

type IProps = { currentPlayImg: string };

type PlayInfo = {
  external_url: string;
  image: {
    url: string;
    width: number;
    height: number;
  };
};

const PlayCircle = ({ currentPlayImg }: IProps) => {
  const playlistId = useRecoilValue(playlistIdState);
  const [, setCurrentPlayImg] = useRecoilState(playlistImgState);
  const [playInfo, setPlayInfo] = useState<PlayInfo>();

  useEffect(() => {
    async function getPlayList() {
      const { data } = await axiosInstance({
        url: `playlists/${playlistId}`,
      });

      const playListData: PlayInfo = {
        external_url: data.external_url,
        image: {
          url: data.image.url,
          width: data.image.width,
          height: data.image.height,
        },
      };
      setPlayInfo(playListData);
      setCurrentPlayImg(playListData.image.url);
    }
    getPlayList();
  }, [playlistId]);

  const clickToPlay = () => {
    window.open(playInfo?.external_url, "_blank");
  };

  return (
    <Container>
      <PlayListContainer>
        <img
          src={currentPlayImg}
          id="currentPlay"
          style={{
            position: "absolute",
            height: "458px",
            width: `${playInfo?.image.width == 1280 ? "160%" : "458px"}`,
            marginLeft: `${playInfo?.image.width == 1280 ? "-30.7%" : "0"}`,
            clipPath: "circle()",
          }}
        />
        <img src={Eclipse} style={{ position: "absolute" }} />
        <img
          src={PlayButton}
          style={{
            position: "absolute",
            top: "178px",
            left: "178px",
            cursor: "pointer",
          }}
          onClick={clickToPlay}
        />
      </PlayListContainer>
    </Container>
  );
};

const Container = styled.section`
  padding: 200px 40px 0;
  box-sizing: border-box;
  width: 50%;
`;

const PlayListContainer = styled.section`
  position: relative;
`;

export default PlayCircle;
