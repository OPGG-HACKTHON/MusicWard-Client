import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Eclipse from "assets/img/archivepage/eclipse.png";
import PlayButton from "assets/img/playlistpage/play-button.png";
import axiosInstance from "utils/axiosConfig";

import { useRecoilValue } from "recoil";
import { playlistIdState } from "recoil/playlist";

type PlayInfo = {
  external_url: string;
  image: {
    url: string;
    width: number;
    height: number;
  };
};

const PlayCircle = () => {
  const playlistId = useRecoilValue(playlistIdState);
  const [playInfo, setPlayInfo] = useState<PlayInfo>();

  useEffect(() => {
    async function getPlayList() {
      console.log(playlistId, "이거왜이랭");
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
    }
    getPlayList();
  }, [playlistId]);

  const clickToPlay = () => {
    window.open(playInfo?.external_url, "_blank");
  };

  return (
    <Container>
      <PlayListContainer>
        <WardPlayListImg src={playInfo?.image.url} />
        <img src={Eclipse} style={{ position: "absolute" }} />
        <img
          src={PlayButton}
          style={{
            position: "absolute",
            top: "178px",
            left: "178px",
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

const WardPlayListImg = styled.img`
  position: absolute;
  width: 458px;
  height: 458px;
  clip-path: circle();
`;

export default PlayCircle;
