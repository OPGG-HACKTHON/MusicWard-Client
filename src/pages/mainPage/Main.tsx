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
  const getChampion = async (id: number) => {
    const { data } = await axiosInstance.get(`champion/${id}`);
    setSelectedChampion(data);
    setTimeout(() => {
      const audio = new Audio(data.voice_url);
      audio.play();
    }, 100);
  };
  const handleChangeChampion = useCallback((id: number) => {
    getChampion(id);
  }, []);
  useEffect(() => {
    getChampion(Math.floor(Math.random() * 48) + 1);
  }, []);
  return (
    <>
      <PlayList champion={selectedChampion} />
      <Launchpad
        selectedChampion={selectedChampion}
        onChange={handleChangeChampion}
      />
      <Ranking onChange={handleChangeChampion} />
    </>
  );
};

export default Main;
