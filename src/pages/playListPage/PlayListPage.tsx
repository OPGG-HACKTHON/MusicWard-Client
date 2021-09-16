import React, { useState, useEffect } from "react";
import Champion from "./Champion";
import PlayList from "./PlayList";
import OtherLists from "./OtherLists";
import { useRecoilState, useRecoilValue } from "recoil";
import { uploadCommentState } from "recoil/comments";
import { accessToken } from "recoil/auth";
import axiosInstance from "utils/axiosConfig";

type IProps = {
  tags: [];

  playInfo: {
    title: string;
    description: string;
    external_url: string;
    playlist_id: number;
    provider: string;
    image: {
      url: string;
      width: number;
      height: number;
    };
    comments: {
      total: number;
      items: [
        {
          item_id: number;
          content: string;
          user: { nickname: string };
        }
      ];
    };
  };

  others: {
    tracks: {
      total: number;
      items: [
        {
          artists: string;
          id: number;
          image: {
            url: string;
            width: number;
            height: number;
          };
          original_id: string;
          preview_url: string;
          title: string;
        }
      ];
    };
  };
};

const PlayListPage = () => {
  const [tags, setTags] = useState<IProps["tags"] | undefined>();
  const [playListInfo, setPlayListInfo] = useState<
    IProps["playInfo"] | undefined
  >();
  const [others, setOthers] = useState<IProps["others"] | undefined>();

  const [commentsState, setCommentsState] =
    useRecoilState<boolean>(uploadCommentState);
  const [wardState, setWardState] = useState(false);

  const jwtToken = useRecoilValue(accessToken);

  const pathName: string = window.location.pathname;
  const playListId = parseInt(pathName.substring(10));

  useEffect(() => {
    async function getPlayList() {
      const { data } = await axiosInstance({
        url: `playlists/${playListId}`,
      });

      const tags: IProps["tags"] = data.tags;
      setTags(tags);

      const playListData: IProps["playInfo"] = {
        title: data.title,
        description: data.description,
        external_url: data.external_url,
        playlist_id: data.playlist_id,
        provider: data.provider,
        image: {
          url: data.image.url,
          width: data.image.width,
          height: data.image.height,
        },
        comments: {
          total: data.comments.total,
          items: data.comments.items,
        },
      };
      setPlayListInfo(playListData);

      const othersData: IProps["others"] = {
        tracks: {
          total: data.tracks.total,
          items: data.tracks.items,
        },
      };
      setOthers(othersData);

      setCommentsState(false);
    }
    getPlayList();

    async function getArchive() {
      const { data } = await axiosInstance({
        url: `playlists/wards/me?page=1&size=50&sort=created_date`,
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      data.map((i: any) => {
        if (playListId == i.playlist_id) {
          setWardState(true);
          return;
        }
      });
    }
    getArchive();
  }, [commentsState]);

  return (
    <>
      <Champion
        tags={tags}
        playListId={playListId}
        wardState={wardState}
        setWardState={setWardState}
      />
      <PlayList playInfo={playListInfo} />
      <OtherLists others={others} />
    </>
  );
};

export default PlayListPage;
