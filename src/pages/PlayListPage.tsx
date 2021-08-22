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
  const [description] = useState(`
    가렌은 불굴의 선봉대를 이끄는 고결하고 자긍심 강한 전사다. 
    선봉대 내에서 인망이 두터울 뿐 아니라 심지어 적에게도 존경을 받지만, 
    그가 대대로 데마시아와 데마시아의 이상을
    `);

  return (
    <>
      <Top>
        <Tags>
          <TagButton>#가렌</TagButton>
          <TagButton>#데마시아</TagButton>
          <TagButton>#매드무비</TagButton>
          <TagButton>#전사</TagButton>
          <TagButton>#가요</TagButton>
        </Tags>

        <Functions>
          <FunctionButton>신고</FunctionButton>
          <FunctionButton>수정</FunctionButton>
        </Functions>
      </Top>

      <Middle>
        <PlayListInfo>
          <PlayListTitle>{title}</PlayListTitle>
          <PlayListHr />
          <PlayListDescription>{description}</PlayListDescription>
        </PlayListInfo>

        <PlayListThumbnail>
          <img src={Thumbnail} style={{ position: "absolute" }}></img>
          <img
            src={ThumbnailImageSample}
            style={{ position: "absolute" }}
          ></img>
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
      </Middle>

      <Bottom>
        <OtherPlayListHr />
        <LeftButtonImg src={LeftButton} />
        <OtherPlayLists>
          <OtherPlayList>
            <img src={OtherListImageSample} />
            <OtherTitle>제목</OtherTitle>
            <OtherSinger>내용</OtherSinger>
          </OtherPlayList>
          <OtherPlayList>
            <img src={OtherListImageSample} />
            <OtherTitle>제목</OtherTitle>
            <OtherSinger>내용</OtherSinger>
          </OtherPlayList>
          <OtherPlayList>
            <img src={OtherListImageSample} />
            <OtherTitle>제목</OtherTitle>
            <OtherSinger>내용</OtherSinger>
          </OtherPlayList>
          <OtherPlayList>
            <img src={OtherListImageSample} />
            <OtherTitle>제목</OtherTitle>
            <OtherSinger>내용</OtherSinger>
          </OtherPlayList>
          <OtherPlayList>
            <img src={OtherListImageSample} />
            <OtherTitle>제목</OtherTitle>
            <OtherSinger>내용</OtherSinger>
          </OtherPlayList>
          <OtherPlayList>
            <img src={OtherListImageSample} />
            <OtherTitle>제목</OtherTitle>
            <OtherSinger>내용</OtherSinger>
          </OtherPlayList>
          <OtherPlayList>
            <img src={OtherListImageSample} />
            <OtherTitle>제목</OtherTitle>
            <OtherSinger>내용</OtherSinger>
          </OtherPlayList>
        </OtherPlayLists>
        <RightButtonImg src={RightButton} />
      </Bottom>
    </>
  );
};

const Top = styled.section`
  display: flex;
  justify-content: space-between;
  margin: 5vw 5% 0 5%;
`;

const Tags = styled.section`
  position: relative;
  width: 30%;
`;

const TagButton = styled.div`
  display: inline-block;
  padding: 7px 15px;
  margin: 6px;
  background: linear-gradient(#2c2c2c, #2c2c2c) padding-box,
    linear-gradient(180deg, #c9ac6a 0%, #72572a 100%) border-box;
  border: 1px solid transparent;
  border-radius: 19.5px;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
  color: #ffffff;
  opacity: 0.8;
`;

const Functions = styled.section`
  position: relative;
`;

const FunctionButton = styled.div`
  display: inline-block;
  padding: 5px 15px;
  margin: 4px;
  background: linear-gradient(#010407, #010407) padding-box,
    linear-gradient(180deg, #c9ac6a 0%, #72572a 100%);
  border: 1px solid transparent;
  border-radius: 8px;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #ffffff;
  opacity: 0.8;
`;

const Middle = styled.section`
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

const Bottom = styled.section`
  position: relative;
  margin: 0 5%;
`;

const LeftButtonImg = styled.img`
  position: absolute;
  top: 6vw;
  left: -2vw;
`;

const RightButtonImg = styled.img`
  position: absolute;
  top: 6vw;
  right: -2vw;
`;

const OtherPlayLists = styled.div`
  display: flex;
  justify-content: space-between;
`;

const OtherPlayListHr = styled.hr`
  width: 98.5%;
  margin-bottom: 30px;
  opacity: 0.5;
  border: 1px solid #bb8c3c;
  transform: rotate(180deg);
`;

const OtherPlayList = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const OtherTitle = styled.div`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 30px;
  color: #ffffff;
`;

const OtherSinger = styled.div`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  color: #ffffff;
`;

export default PlayListPage;
