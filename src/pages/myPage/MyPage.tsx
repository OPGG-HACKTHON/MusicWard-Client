import React, { useCallback, useEffect } from "react";
import UserInfo from "./UserInfo";
import PlayLists from "./PlayLists";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import {
  accessToken,
  auth,
  AuthType,
  refreshToken,
  token,
  TokenType,
} from "recoil/auth";
import axiosInstance from "utils/axiosConfig";

const MyPage = () => {
  const jwtToken = useRecoilValue(accessToken);
  const logout = useResetRecoilState(token);
  const refresh = useRecoilValue(refreshToken);
  const [, setAuth] = useRecoilState<AuthType>(auth);
  const [, setToken] = useRecoilState<TokenType>(token);
  const getMyPageInfo = useCallback(async () => {
    await axiosInstance({
      url: "users/me",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then(({ data }) => {
        const { google_email, spotify_email, nickname, name } = data;
        setAuth({
          name,
          nickname: nickname,
          googleEmail: google_email,
          spotifyEmail: spotify_email,
        });
        localStorage.setItem("musicward_auth", JSON.parse(data));
      })
      .catch(async (err) => {
        if (err?.response?.status === 401) {
          await axiosInstance({
            url: "user/auth",
            method: "put",
            data: {
              refresh_token: refresh,
            },
          })
            .then(({ data }) => {
              const { access_token, refresh_token } = data;
              setToken({
                accessToken: access_token,
                refreshToken: refresh_token,
              });
              localStorage.setItem("musicward_token", JSON.parse(data));
            })
            .catch(() => {
              logout();
            });
        }
      });
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
