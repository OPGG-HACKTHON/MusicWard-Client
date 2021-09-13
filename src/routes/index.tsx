import React, { useEffect } from "react";

import ArchivePage from "pages/archivePage/ArchivePage";
import { MainPage } from "pages/mainPage";
import EditPage from "pages/myPage/EditPage";
import MyPage from "pages/myPage/MyPage";
import PlayListPage from "pages/playListPage/PlayListPage";
import { SearchCategory, SearchResultList } from "pages/searchPage";
import { Redirect, Route, Switch } from "react-router-dom";
import PrivateRoute from "router/PrivateRoute";
import { useRecoilState } from "recoil";
import { token, TokenType } from "recoil/auth";
import queryString from "query-string";
import axiosInstance from "utils/axiosConfig";
import Layout from "Layout";
import AccountTermPage from "pages/etcPage/AccountTermPage";

const Routes = () => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  const [, setToken] = useRecoilState<TokenType>(token);
  const parsed = queryString.parse(location.search);
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
  };
  useEffect(() => {
    if (parsed.code) {
      getToken();
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
