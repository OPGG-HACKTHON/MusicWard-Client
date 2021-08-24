import React from "react";
import styled from "styled-components";
import WardLists from "./WardLists";
import PlayCircle from "./PlayCircle";
import ArchiveInfo from "./ArchiveInfo";
import Champion from "assets/img/archivepage/background-champion.png";

const ArchivePage = () => {
  return (
    <Container>
      <Shadow />
      <WardLists />
      <PlayCircle />
      <ArchiveInfo />
    </Container>
  );
};

const Container = styled.section`
  width: auto;
  padding: 10vw 10%;
  display: flex;
  background-image: url(${Champion});
  background-repeat: round;
`;

const Shadow = styled.div`
  position: absolute;
  background: #000000;
  opacity: 0.8;
  transform: matrix(-1, 0, 0, 1, 0, 0);
`;

export default ArchivePage;
