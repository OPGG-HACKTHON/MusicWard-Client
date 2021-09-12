import React, { useState, useCallback } from "react";
import styled from "styled-components";
import ThumbnailEdge from "assets/img/playlistpage/thumbnail-edge.svg";
import PlayButton from "assets/img/playlistpage/play-button.png";
import { useRecoilValue } from "recoil";
import { accessToken } from "recoil/auth";
// import Axios from "axios";
import axiosInstance from "utils/axiosConfig";

type IProps = {
  playInfo?: {
    title: string;
    description: string;
    external_url: string;
    playlist_id: number;
    image: {
      url: string;
      width: number;
      height: number;
    };
    comments: {
      total: number;
      items: [
        {
          item_id: number;
          content: string;
        }
      ];
    };
  };
};

const PlayList = ({ playInfo }: IProps) => {
  const clickToPlay = () => {
    window.open(playInfo?.external_url, "_blank");
  };

  const [commentContent, setCommentContent] = useState("");
  const handleChange = useCallback(
    (e) => {
      setCommentContent(e.target.value);
    },
    [setCommentContent]
  );

  const userToken = useRecoilValue(accessToken);

  const handleEnterPress = (e: any) => {
    if (e.key === "Enter") {
      console.log(userToken);
      uploadComment(playInfo?.playlist_id);
    }
  };

  // TODO: 플레리스트 삭제 알럿이 우선 떠야한다.
  const uploadComment = useCallback(
    (id) => async () => {
      const { data } = await axiosInstance({
        url: "playlists/comment",
        data: {
          comment: commentContent,
          playList_id: id,
        },
        method: "post",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      console.log(data);
    },
    []
  );

  return (
    <Container>
      <PlayListThumbnail onClick={clickToPlay}>
        <img
          src={playInfo?.image.url}
          width="628px"
          height="628px"
          style={{
            position: "absolute",
            clipPath: "circle()",
            margin: "15px",
            // width: playInfo?.image.width,
            // height: playInfo?.image.height,
          }}
        />
        <img
          src={ThumbnailEdge}
          width="658px"
          height="658px"
          style={{ position: "absolute" }}
        />
        <img
          src={PlayButton}
          style={{ position: "absolute", top: "266px", left: "274px" }}
        ></img>
      </PlayListThumbnail>
      <PlayListThumbnailShadow />

      <PlayListInfo>
        <PlayListTitle>{playInfo?.title}</PlayListTitle>
        <PlayListHr />
        <PlayListDescription>{playInfo?.description}</PlayListDescription>
      </PlayListInfo>

      <PlayListComments>
        <CommentTitle>
          <HideText>숨기기</HideText>
          <CommentText>댓글</CommentText>
        </CommentTitle>
        <CommentBox>
          {playInfo?.comments.items &&
            playInfo?.comments.items.map((item: any) => {
              console.log(playInfo?.comments, "댓글 나요냐~", item);
              <Comment>{item.item}</Comment>;
            })}
        </CommentBox>
        <CommentEdit
          type="textarea"
          onChange={handleChange}
          onKeyPress={handleEnterPress}
          value={commentContent}
        />
      </PlayListComments>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 1160px;
  height: 569px;
  position: relative;
`;

const PlayListInfo = styled.section`
  position: absolute;
  top: 183.5px;
  left: 0px;
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
  position: absolute;
  left: 251px;
`;

const PlayListThumbnailShadow = styled.div`
  position: absolute;
  width: 629px;
  height: 216px;
  left: 271px;
  top: 518.5px;

  background: linear-gradient(0deg, #010407 28.25%, rgba(1, 4, 7, 0) 91.32%);
`;

const PlayListComments = styled.section`
  position: absolute;
  top: 74.5px;
  right: 0;
  width: 274px;
  height: 488px;
  text-align: right;
`;

const CommentTitle = styled.div`
  position: relative;
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

const CommentBox = styled.section`
  height: 313px;
  width: 261px;
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

const CommentEdit = styled.input`
  width: 260px;
  height: 69px;
  margin-top: 12.5px;
  background: #12191c;
  /* gold/deepdark */
  border: 2px solid #64583a;
  box-sizing: border-box;
  border-radius: 3px;
`;

export default PlayList;
