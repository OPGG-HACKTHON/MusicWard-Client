import React from "react";
import styled from "styled-components";

import Eclipse from "assets/img/archivepage/eclipse.png";
import WardListSample from "assets/img/archivepage/ward-list-sample.png";
import PlayButton from "assets/img/playlistpage/play-button.png";

const PlayCircle = () => {
  return (
    <Container>
      <PlayListContainer>
        <WardPlayListImg src={WardListSample} />
        <img src={Eclipse} style={{ position: "absolute" }} />
        <img
          src={PlayButton}
          style={{
            position: "absolute",
            top: "178px",
            left: "178px",
          }}
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
