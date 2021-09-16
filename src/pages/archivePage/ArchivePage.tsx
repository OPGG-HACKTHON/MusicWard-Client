import React, { useEffect, useState } from "react";
import styled from "styled-components";
import WardLists from "./WardLists";
import PlayCircle from "./PlayCircle";
import ArchiveInfo from "./ArchiveInfo";
import { useRecoilState, useRecoilValue } from "recoil";
import { accessToken } from "recoil/auth";
import { playlistIdState, playlistImgState } from "recoil/playlist";
import axiosInstance from "utils/axiosConfig";

type IProps = {
  wardBox: [
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
  playBox: {
    champion: {
      profile_image_url: string;
    };
    external_url: string;
    image: {
      url: string;
      width: number;
      height: number;
    };
    tags: [];
    provider: string;
    title: string;
    description: string;
    playlist_id: number;
    tracks: {
      total: number;
    };
    wards: {
      total: number;
    };
  };
};

const ArchivePage = () => {
  const [, setPlayBox] = useState<IProps["playBox"] | undefined>();
  const [wardBox, setWardBox] = useState<IProps["wardBox"] | undefined>();

  const [champion, setChampion] = useState("");
  const [currentPlayId] = useRecoilState(playlistIdState);
  const [currentPlayImg, setCurrentPlayImg] = useRecoilState(playlistImgState);

  const jwtToken = useRecoilValue(accessToken);
  const getMyArchive = async () => {
    const { data } = await axiosInstance({
      url: `playlists/wards/me?page=1&size=50&sort=created_date`,
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const wardData: IProps["wardBox"] = data.map(
      (i: {
        playlist_id: number;
        tracks: { total: number };
        wards: { total: number };
        title: string;
        image: {
          url: string;
          width: number;
        };
      }) => {
        return {
          playlist_id: i.playlist_id,
          tracks: i.tracks.total,
          wards: i.wards.total,
          title: i.title,
          image: i.image,
        };
      }
    );
    setWardBox(wardData);

    const playData: IProps["playBox"] = data.map(
      (i: {
        champion: {
          profile_image_url: string;
        };
        external_url: string;
        image: {
          url: string;
          width: number;
          height: number;
        };
        tags: [];
        provider: string;
        title: string;
        description: string;
        playlist_id: number;
        tracks: {
          total: number;
        };
        wards: {
          total: number;
        };
      }) => {
        if (currentPlayId == i.playlist_id) {
          setChampion(i.champion.profile_image_url);
          return {
            champion: {
              image_url: i.champion.profile_image_url,
            },
            external_url: i.external_url,
            image: {
              url: i.image.url,
              width: i.image.width,
              height: i.image.height,
            },
            tags: i.tags,
            provider: i.provider,
            title: i.title,
            description: i.description,
            playlist_id: i.playlist_id,
            tracks: {
              total: i.tracks.total,
            },
            wards: {
              total: i.wards.total,
            },
          };
        }
      }
    );
    setPlayBox(playData);
  };

  useEffect(() => {
    getMyArchive();
  }, [currentPlayId]);

  useEffect(() => {
    async function getFirstArchive() {
      const { data } = await axiosInstance({
        url: `playlists/wards/me?page=1&size=50&sort=created_date`,
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setChampion(data[0].champion.profile_image_url);
      setCurrentPlayImg(data[0].image.url);
    }
    getFirstArchive();
  }, []);

  const calcHeight = innerHeight - 80;

  return (
    <Container height={calcHeight} champion={champion}>
      <Wrapper>
        <WardLists wardBox={wardBox} />
        <PlayCircle currentPlayImg={currentPlayImg} />
        <ArchiveInfo />
      </Wrapper>
    </Container>
  );
};

// ${(props) => props.height + "px"};
const Container = styled.section<{ height: number; champion: string }>`
  width: 100%;
  height: 100%;
  padding: 44px 140px;
  box-sizing: border-box;
  background: url(${(props) => props.champion}), rgba(0, 0, 0, 0.8);
  background-blend-mode: multiply;
  background-repeat: round;
`;

const Wrapper = styled.div`
  width: 1160px;
  margin: 0 auto;
  display: flex;
`;

export default ArchivePage;
