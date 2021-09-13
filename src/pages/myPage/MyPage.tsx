import React, { useCallback, useEffect } from "react";
import UserInfo from "./UserInfo";
import PlayLists from "./PlayLists";
import { useRecoilState, useRecoilValue } from "recoil";
import { accessToken, auth, AuthType } from "recoil/auth";
import axiosInstance from "utils/axiosConfig";

const MyPage = () => {
  const jwtToken = useRecoilValue(accessToken);
  const [, setAuth] = useRecoilState<AuthType>(auth);
  const getMyPageInfo = useCallback(async () => {
    const { data } = await axiosInstance({
      url: "users/me",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    const { google_email, spotify_email, nickname, name } = data;
    setAuth({
      name,
      nickname: nickname,
      googleEmail: google_email,
      spotifyEmail: spotify_email,
    });
    localStorage.setItem("musicward_auth", JSON.parse(data));
  }, []);
  useEffect(() => {
    getMyPageInfo();
  }, []);
  return (
    <>
      <UserInfo />
      <PlayLists />
    </>
  );
};

export default MyPage;
