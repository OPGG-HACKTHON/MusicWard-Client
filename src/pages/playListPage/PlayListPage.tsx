import React, { useState, useEffect } from "react";
import Champion from "./Champion";
import PlayList from "./PlayList";
import OtherLists from "./OtherLists";
import Axios from "axios";

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

`
champion: {champion_id: 50, name: "징크스", title: "난폭한 말괄량이", english_name: "Jinx", story: "자운 출신의 충동적이고 격정적인 범죄자 징크스. 난장판을 벌이는 재미로 살며, 결과 따위는… 징크스는 지루함을 끔찍이 싫어하고 가는 곳 어디에나 특유의 대혼란을 화끈하게 일으킨다.", …}
comments: {total: 2, items: Array(2)}
created_date: "2021-08-22 23:41:50"
description: "징크스를 좋아한다면 꼭 들어야 하는 플레이리스트"
external_url: "https://music.youtube.com/playlist?list=PLKoYnF1HLQ5gW5DPfWI8erSG-MfjEJE2k"
image: {url: "https://i.ytimg.com/vi/veRIGU--tec/maxresdefault.jpg", width: "1280", height: "720"}
last_modified_date: "2021-08-23 16:15:23"
original_id: "PLKoYnF1HLQ5gW5DPfWI8erSG-MfjEJE2k"
playlist_id: 1
provider: "YOUTUBE"
tags: (3) ["징크스", "매드무비", "원딜"]
title: "매드무비 즐길사람 여기모여라"
tracks: {total: 50, items: Array(50)}
view: 1
wards: {total: 0}
`;

const PlayListPage = () => {
  const [tags, setTags] = useState<IProps["tags"] | undefined>();
  const [playListInfo, setPlayListInfo] = useState<
    IProps["playInfo"] | undefined
  >();
  const [others, setOthers] = useState<IProps["others"] | undefined>();

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
  }, []);

  return (
    <>
      <Champion tags={tags} />
      <PlayList playInfo={playListInfo} />
      <OtherLists others={others} />
    </>
  );
};

export default PlayListPage;
