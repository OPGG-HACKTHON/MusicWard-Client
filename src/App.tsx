import React from "react";
import GlobalStyle from "./GlobalStyle";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";

import GlobalNavBar from "components/GlobalNavBar";

import MyPage from "pages/myPage/MyPage";
import EditPage from "pages/myPage/EditPage";
import PlayListPage from "pages/playListPage/PlayListPage";
import ArchivePage from "pages/archivePage/ArchivePage";

import { MainPage } from "./pages/mainPage";
import { SearchCategory, SearchResultList } from "pages/searchPage";


const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <GlobalNavBar />
      <Switch>
        <Route path="/search/list" component={SearchResultList} />
        <Route path="/search" component={SearchCategory} />
        <Route path="/mypage" exact component={MyPage} />

        <Route path="/editpage" exact component={EditPage} />
        <Route path="/playlist" exact component={PlayListPage} />
        <Route path="/archive" exact component={ArchivePage} />

        <Route path="/" exact component={MainPage} />

        <Redirect path="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
