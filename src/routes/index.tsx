import React, { useEffect } from "react";

import ArchivePage from "pages/archivePage/ArchivePage";
import { MainPage } from "pages/mainPage";
import EditPage from "pages/myPage/EditPage";
import MyPage from "pages/myPage/MyPage";
import PlayListPage from "pages/playListPage/PlayListPage";
import { SearchCategory, SearchResultList } from "pages/searchPage";
import { Redirect, Route, Switch } from "react-router-dom";
import PrivateRoute from "router/PrivateRoute";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import {
  accessToken,
  auth,
  AuthType,
  refreshToken,
  token,
  TokenType,
} from "recoil/auth";
import queryString from "query-string";
import axiosInstance from "utils/axiosConfig";
import Layout from "Layout";
import AccountTermPage from "pages/etcPage/AccountTermPage";

const Routes = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  const jwtToken = useRecoilValue(accessToken);
  const [, setToken] = useRecoilState<TokenType>(token);
  const parsed = queryString.parse(location.search);
  const resetToken = useResetRecoilState(token);
  const resetAuth = useResetRecoilState(auth);
  const refresh = useRecoilValue(refreshToken);
  const [, setAuth] = useRecoilState<AuthType>(auth);
  const getToken = async () => {
    const { data } = await axiosInstance({
      url: "users/auth/google",
      method: "post",
      params: {
        code: parsed.code,
      },
    });
    const { access_token, refresh_token, oauth_refresh_token, type } = data;
    setToken({
      accessToken: access_token,
      refreshToken: refresh_token,
      oauthRefreshToken: oauth_refresh_token,
      type: type,
    });
    localStorage.setItem("musicward_token", JSON.parse(data));
    await getMyPageInfo();
  };
  const getSpotifyToken = async () => {
    const { data } = await axiosInstance({
      url: "users/auth/spotify",
      method: "post",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      params: {
        code: parsed.code,
      },
    });
    const { access_token, refresh_token, oauth_refresh_token, type } = data;
    setToken({
      accessToken: access_token,
      refreshToken: refresh_token,
      oauthRefreshToken: oauth_refresh_token,
      type: type,
    });
    localStorage.setItem("musicward_token", JSON.parse(data));
  };
  const getMyPageInfo = async () => {
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
              resetToken();
              resetAuth();
            });
        }
      });
  };
  useEffect(() => {
    if (parsed.code && jwtToken) {
      getSpotifyToken();
      return;
    }
    if (parsed.code) {
      getToken();
    }
  }, [parsed]);
  useEffect(() => {
    if (jwtToken) {
      getMyPageInfo();
    }
  }, []);
  return (
    <Layout>
      <Switch>
        <Route path="/search/list" component={SearchResultList} />
        <Route path="/search" component={SearchCategory} />
        <Route path="/playlist/:id" exact component={PlayListPage} />
        <PrivateRoute path="/mypage" exact component={MyPage} />
        <PrivateRoute path="/editpage" exact component={EditPage} />
        <PrivateRoute path="/archive" exact component={ArchivePage} />
        <Route path="/account/terms" exact component={AccountTermPage} />
        <Route path="/" exact component={MainPage} />
        <Redirect path="*" to="/" />
      </Switch>
    </Layout>
  );
};

export default Routes;
