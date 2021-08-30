import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import Launchpad from "./Launchpad";
import PlayList from "./PlayList";
import Ranking from "./Ranking";
import axios from "axios";

export type Champion = {
  champion_id: number;
  english_name: string;
  image_url: string;
  name: string;
  position: Array<string>;
  profile_image_url: string;
  story: string;
  title: string;
};

const Main = () => {
  const [championList, setChampionList] = useState([]);
  const [selectedChampion, setSelectedChampion] = useState<Champion>({
    champion_id: 0,
    english_name: "",
    image_url: "",
    name: "",
    position: [],
    profile_image_url: "",
    story: "",
    title: "",
  });
  const getChampionList = async () => {
    const { data } = await axios({
      url: "https://server.music-ward.com/championlist",
      method: "get",
    });
    setChampionList(data.data.champion_list);
  };
  const getChampion = async (id: number) => {
    const { data } = await axios({
      url: `https://server.music-ward.com/champion/${id}`,
      method: "get",
    });
    setSelectedChampion(data.data);
  };
  const handleChangeChampion = useCallback(async (id: number) => {
    getChampion(id);
  }, []);
  useEffect(() => {
    getChampionList();
    getChampion(Math.floor(Math.random() * 48));
  }, []);
  return (
    <>
      <PlayList champion={selectedChampion} />
      <Launchpad
        selectedChampion={selectedChampion}
        list={championList}
        onChange={handleChangeChampion}
      />
      <Ranking />
    </>
  );
};

export default Main;
