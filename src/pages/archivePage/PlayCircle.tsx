import React from "react";
import styled from "styled-components";

import Eclipse from "assets/img/archivepage/eclipse.png";
import WardListSample from "assets/img/archivepage/ward-list-sample.png";
import PlayButton from "assets/img/playlistpage/play-button.png";

const PlayCircle = () => {
  return (
    <Container>
      <div>
        <img src={Eclipse} style={{ position: "absolute" }} />
        <img src={WardListSample} style={{ position: "absolute" }} />
        <img src={PlayButton} style={{ position: "absolute" }} />
      </div>
    </Container>
  );
};

const Container = styled.section`
  padding: 5%;
  box-sizing: border-box;
  width: 50%;
`;

export default PlayCircle;
