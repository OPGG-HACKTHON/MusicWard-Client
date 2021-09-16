import React, { useState, useCallback } from "react";
import styled from "styled-components";
import ThumbnailEdge from "assets/img/playlistpage/thumbnail-edge-new.svg";
import ThumbnailBg from "assets/img/playlistpage/thumbnail-bg.svg";
import PlayButton from "assets/img/playlistpage/play-button.svg";
import SpotifyIcon from "assets/icon/i-spotify-music.svg";
import YoutubeIcon from "assets/icon/i-youtube-music.svg";
import LoginSpotifyModal from "components/LoginSpotifyModal";
import { useRecoilValue, useRecoilState, useRecoilValueLoadable } from "recoil";
import { accessToken, getAuth, isLogined } from "recoil/auth";
import { uploadCommentState } from "recoil/comments";
import axiosInstance from "utils/axiosConfig";

type IProps = {
  playInfo?: {
    title: string;
    description: string;
    external_url: string;
    playlist_id: number;
    provider: string;
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
          user: { nickname: string };
        }
      ];
    };
  };
};

const PlayList = ({ playInfo }: IProps) => {
  const { contents: userInfo } = useRecoilValueLoadable(getAuth);
  const { spotifyEmail } = userInfo;

  const [modal, setModal] = useState<boolean>(false);
  const clickToPlay = () => {
    if (playInfo?.provider === "SPOTIFY") {
      if (spotifyEmail == undefined) {
        setModal(true);
        return;
      }
    }
    window.open(playInfo?.external_url, "_blank");
  };

  const jwtToken = useRecoilValue(accessToken);
  const wasLogined = useRecoilValue(isLogined);

  const [commentContent, setCommentContent] = useState("");
  const [, setCommentsState] = useRecoilState<boolean>(uploadCommentState);

  const handleChange = useCallback(
    (e) => {
      setCommentContent(e.target.value);
    },
    [setCommentContent]
  );

  const postComment = async () => {
    await axiosInstance({
      url: "playlists/comment",
      method: "post",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      data: {
        comment: commentContent,
        playlist_id: playInfo?.playlist_id,
      },
    });
    setCommentsState(true);
    setCommentContent("");
  };

  const handleEnterPress = async (e: any) => {
    if (e.key === "Enter") {
      await postComment();
    }
  };

  const setBigImgSize = (e: any) => {
    if (e.target.naturalWidth == 1280) {
      e.target.style.width = "auto";
      e.target.style.left = "-244px";
    } else {
      e.target.style.width = "628px";
      e.target.style.left = 0;
    }
  };

  const [isHide, setIsHide] = useState(false);
  const hideComment = () => {
    if (isHide) {
      setIsHide(false);
    } else {
      setIsHide(true);
    }
  };

  return (
    <Container>
      <PlayListThumbnail>
        <img
          src={ThumbnailBg}
          style={{
            position: "absolute",
            left: "-67px",
            top: "-30px",
          }}
        />
        <img
          id="playListBigImg"
          src={playInfo?.image.url}
          onLoad={setBigImgSize}
          style={{
            position: "absolute",
            clipPath: "circle()",
            margin: "17px 15px 0 14.7px",
            height: "628px",
          }}
        />
        <img
          src={ThumbnailEdge}
          style={{
            position: "absolute",
            width: "658px",
            height: "658px",
          }}
        />
        <img
          src={PlayButton}
          style={{
            position: "absolute",
            top: "266px",
            left: "274px",
            cursor: "pointer",
          }}
          onClick={clickToPlay}
        ></img>
      </PlayListThumbnail>
      <PlayListThumbnailShadow />

      <PlayListInfo>
        <IconBox>
          {playInfo?.provider == "SPOTIFY" ? (
            <img src={SpotifyIcon} style={{ marginBottom: "5px" }} />
          ) : (
            <img src={YoutubeIcon} style={{ marginBottom: "5px" }} />
          )}
        </IconBox>
        <PlayListTitle>{playInfo?.title}</PlayListTitle>
        <PlayListHr />
        <PlayListDescription>{playInfo?.description}</PlayListDescription>
      </PlayListInfo>

      <PlayListComments>
        <CommentTitle>
          <HideText onClick={hideComment}>숨기기</HideText>
          <CommentText>댓글</CommentText>
        </CommentTitle>
        <CommentBox isHide={isHide}>
          <div>
            {playInfo?.comments.items &&
              playInfo?.comments.items.map((item: any) => (
                <CommentAlign key={item.item_id}>
                  <Comment>{item.user.nickname + ": " + item.content}</Comment>
                </CommentAlign>
              ))}
          </div>
        </CommentBox>
        <CommentEdit
          isHide={isHide}
          type="textarea"
          placeholder={
            wasLogined
              ? "댓글을 입력해주세요."
              : "로그인 후 댓글 작성이 가능합니다."
          }
          onChange={handleChange}
          onKeyPress={handleEnterPress}
          value={commentContent}
          disabled={wasLogined ? false : true}
        />
      </PlayListComments>

      {modal && <LoginSpotifyModal modal={modal} setModal={setModal} />}
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
  width: 273px;
`;

const IconBox = styled.div`
  display: flex;
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
  background-color: #bb8c3c;
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
  left: 261px;
  top: 458.5px;

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
  cursor: pointer;
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

const CommentBox = styled.section<{ isHide: boolean }>`
  margin-top: 14px;
  padding-right: 5px;
  display: flex;
  flex-direction: column-reverse;
  height: 333px;
  overflow: auto;
  display: ${(props) => (props.isHide ? "none" : "flex")};

  ::-webkit-scrollbar {
    width: 2px;
  }
  ::-webkit-scrollbar-thumb {
    height: 17%;
    background: linear-gradient(180deg, #bb8c3c 0%, #73592c 100%);
  }
  ::-webkit-scrollbar-track {
    background: #1b1b1b;
  }
`;

const CommentAlign = styled.div`
  display: flex;
  justify-content: end;
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

const CommentEdit = styled.input<{ isHide: boolean }>`
  width: 260px;
  height: 69px;
  margin-top: 12.5px;
  background: #12191c;
  /* gold/deepdark */
  border: 2px solid #64583a;
  box-sizing: border-box;
  border-radius: 3px;
  display: ${(props) => (props.isHide ? "none" : "flex")};
  margin-left: 15px;
`;

export default PlayList;
