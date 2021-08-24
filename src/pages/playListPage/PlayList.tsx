import React, { useState } from "react";
import styled from "styled-components";
import Thumbnail from "assets/img/playlistpage/thumbnail.png";
import ThumbnailImageSample from "assets/img/playlistpage/thumbnail-image-sample.png";
import PlayButton from "assets/img/playlistpage/play-button.png";

const PlayList = () => {
  const [title] = useState("데마시아의 힘을 느껴보자");
  const [description] = useState(`
    가렌은 불굴의 선봉대를 이끄는 고결하고 자긍심 강한 전사다. 
    선봉대 내에서 인망이 두터울 뿐 아니라 심지어 적에게도 존경을 받지만, 
    그가 대대로 데마시아와 데마시아의 이상을
    `);

  return (
    <Container>
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
        <CommentTitle>
          <HideText>숨기기</HideText>
          <CommentText>댓글</CommentText>
        </CommentTitle>
        <Comment>댓글이얌</Comment>
        <Comment>댓글이얌댓글이얌댓글이얌댓글이얌댓글이얌</Comment>
        <Comment>댓글이얌</Comment>
        <Comment>댓글이얌</Comment>
        <Comment>댓글이얌</Comment>
        <Comment>댓글이얌</Comment>
        <Comment>
          댓글이얌댓글이얌댓글이얌댓글이얌댓글이얌댓글이얌댓글이얌댓글
        </Comment>
      </PlayListComments>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  justify-content: space-between;
  margin: -4% 5% 2%;
  height: 40vw;
`;

const PlayListInfo = styled.section`
  position: relative;
  top: 10vw;
  width: 30%;
`;

const PlayListTitle = styled.div`
  word-break: keep-all;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 41px;
  color: #ffffff;
`;

const PlayListHr = styled.hr`
  width: 100%;
  margin: 20px 0;
  opacity: 0.5;
  border: 1px solid #bb8c3c;
  transform: rotate(180deg);
`;

const PlayListDescription = styled.div`
  word-break: keep-all;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
`;

const PlayListThumbnail = styled.section`
  position: relative;
  width: 659px;
`;

const PlayListComments = styled.section`
  position: relative;
  display: grid;
  justify-items: end;
  height: fit-content;
  width: 30%;
`;

const CommentTitle = styled.div`
  position: relative;
  margin: 5vw 0 10px;
`;

const HideText = styled.span`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 24px;
  color: #ffffff;
  opacity: 0.5;
`;

const CommentText = styled.span`
  margin-left: 10px;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  color: #ffffff;
  opacity: 0.8;
`;

const Comment = styled.span`
  position: relative;
  display: inline-block;
  margin-bottom: 10px;
  padding: 5px 10px;
  background: linear-gradient(#10131b, #10131b) padding-box,
    linear-gradient(180deg, #c9ac6a 0%, #72572a 100%) border-box;
  border: 1px solid transparent;
  border-radius: 8px;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 22px;
  text-align: right;
  color: #ffffff;
  opacity: 0.8;
`;

export default PlayList;
