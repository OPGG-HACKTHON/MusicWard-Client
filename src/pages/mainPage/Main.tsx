import React from "react";
import Launchpad from "./Launchpad";
import PlayList from "./PlayList";
import Ranking from "./Ranking";

const Main = () => {
  return (
    <>
      <PlayList />
      <Launchpad />
      <Ranking />
    </>
  );
};

export default Main;
