import React from "react";
import styled from "styled-components";
import ThumbnailEdge from "assets/img/playlistpage/thumbnail-edge.svg";
import PlayButton from "assets/img/playlistpage/play-button.png";

type IProps = {
  playInfo?: {
    title: string;
    description: string;
    external_url: string;
    image: {
      url: string;
      width: number;
      height: number;
    };
    comments: {
      total: number;
      items: [];
    };
  };
};

const PlayList = ({ playInfo }: IProps) => {
  return (
    <Container>
      <PlayListInfo>
        <PlayListTitle>{playInfo?.title}</PlayListTitle>
        <PlayListHr />
        <PlayListDescription>{playInfo?.description}</PlayListDescription>
      </PlayListInfo>

      <PlayListThumbnail>
        <img src={ThumbnailEdge} style={{ position: "absolute" }}></img>
        <img
          src={playInfo?.image.url}
          style={{
            position: "absolute",
            width: playInfo?.image.width,
            height: playInfo?.image.height,
            display: "none",
          }}
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
        {playInfo?.comments.items.map((item: any) => (
          <Comment key={item.comment_id}>{item.content}</Comment>
        ))}
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
