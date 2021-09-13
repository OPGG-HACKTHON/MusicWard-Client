import React, { useState, useEffect } from "react";
import Champion from "./Champion";
import PlayList from "./PlayList";
import OtherLists from "./OtherLists";
import Axios from "axios";
import { useRecoilState } from "recoil";
import { uploadCommentState } from "recoil/comments";

type IProps = {
  tags: [];

  playInfo: {
    title: string;
    description: string;
    external_url: string;
    playlist_id: number;
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

  useEffect(() => {
    const pathName: string = window.location.pathname;
    const playListId = parseInt(pathName.substring(10));

    Axios.get(`https://server.music-ward.com/playlists/${playListId}`).then(
      (res) => {
        const resData = res.data.data;
        console.log(resData);

        const tags: IProps["tags"] = resData.tags;
        setTags(tags);

        const playListData: IProps["playInfo"] = {
          title: resData.title,
          description: resData.description,
          external_url: resData.external_url,
          playlist_id: resData.playlist_id,
          image: {
            url: resData.image.url,
            width: resData.image.width,
            height: resData.image.height,
          },
          comments: {
            total: resData.comments.total,
            items: resData.comments.items,
          },
        };
        setPlayListInfo(playListData);

        const othersData: IProps["others"] = {
          tracks: {
            total: resData.tracks.total,
            items: resData.tracks.items,
          },
        };
        setOthers(othersData);
      }
    );
    setCommentsState(false);
  }, [commentsState]);

  return (
    <>
      <Champion tags={tags} />
      <PlayList playInfo={playListInfo} />
      <OtherLists others={others} />
    </>
  );
};

export default PlayListPage;
