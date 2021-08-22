import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Thumbnail from "assets/img/playlistpage/thumbnail.png";
import ThumbnailImageSample from "assets/img/playlistpage/thumbnail-image-sample.png";
import PlayButton from "assets/img/playlistpage/play-button.png";
import RightButton from "assets/img/playlistpage/list-arrow-right.png";
import LeftButton from "assets/img/playlistpage/list-arrow-left.png";
import OtherListImageSample from "assets/img/playlistpage/other-list-image-sample.png";

const PlayListPage = () => {
  const [title] = useState("데마시아의 힘을 느껴보자");
  const [description] = useState("가렌설명설명설명");

  return (
    <>
      <Top>
        <Tags>
          <TagButton>#가렌</TagButton>
        </Tags>

        <Functions>
          <FunctionButton>신고</FunctionButton>
        </Functions>
      </Top>

      <PlayListInfo>
        <PlayListTitle>{title}</PlayListTitle>
        <PlayListHr />
        <PlayListDescription>{description}</PlayListDescription>
      </PlayListInfo>

      <PlayListThumbnail>
        <img src={Thumbnail} style={{ position: "absolute" }}></img>
        <img src={ThumbnailImageSample} style={{ position: "absolute" }}></img>
        <img
          src={PlayButton}
          style={{ position: "absolute", top: "50%", left: "50%" }}
        ></img>
      </PlayListThumbnail>

      <PlayListComments>
        <Comment>댓글이얌</Comment>
      </PlayListComments>

      <OtherPlayLists>
        <img src={RightButton} />
        <img src={LeftButton} />
        <img src={OtherListImageSample} />
      </OtherPlayLists>
    </>
  );
};

const Top = styled.section`
  display: flex;
  justify-content: space-between;
`;

const Tags = styled.section`
  top: 10vw;
  left: 15vw;
`;

const Functions = styled.section`
  top: 10vw;
  right: 20vw;
`;

const PlayListInfo = styled.section`
  top: 20vw;
  left: 10vw;
`;

const PlayListThumbnail = styled.section`
  top: 10vw;
  left: 30vw;
  width: 672px;
  height: auto;
`;

const PlayListComments = styled.section``;

const Comment = styled.div`
  position: relative;
  display: inline-block;
  padding: 5px 10px;
  background: linear-gradient(#10131b, #10131b) padding-box,
    linear-gradient(180deg, #c9ac6a 0%, #72572a 100%) border-box;
  border: 1px solid transparent;
  border-radius: 8px;
`;

const OtherPlayLists = styled.section`
  bottom: 10vw;
  left: 15vw;
`;

const TagButton = styled.div`
  display: inline-block;
  padding: 5px 10px;
  background: linear-gradient(#2c2c2c, #2c2c2c) padding-box,
    linear-gradient(180deg, #c9ac6a 0%, #72572a 100%) border-box;
  border: 1px solid transparent;
  border-radius: 19.5px;
`;

const FunctionButton = styled.div`
  display: inline-block;
  padding: 5px 15px;
  background: linear-gradient(#010407, #010407) padding-box,
    linear-gradient(180deg, #c9ac6a 0%, #72572a 100%);
  border: 1px solid transparent;
  border-radius: 8px;
`;

const PlayListTitle = styled.div`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 41px;
  letter-spacing: -0.01em;
  color: #ffffff;
`;

const PlayListHr = styled.hr`
  width: 240px;
  opacity: 0.5;

  border: 1px solid #bb8c3c;
  transform: rotate(180deg);
`;

const PlayListDescription = styled.div`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.01em;
  color: #ffffff;
`;

export default PlayListPage;
