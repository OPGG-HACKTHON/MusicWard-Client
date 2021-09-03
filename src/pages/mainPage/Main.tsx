import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import Launchpad from "./Launchpad";
import PlayList from "./PlayList";
import Ranking from "./Ranking";
import axiosInstance from "utils/axiosConfig";

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
    const { data } = await axiosInstance.get("championlist");
    setChampionList(data.champion_list);
  };
  const getChampion = async (id: number) => {
    const { data } = await axiosInstance.get(`champion/${id}`);
    setSelectedChampion(data);
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
      <Ranking onChange={handleChangeChampion} />
    </>
  );
};

export default Main;
