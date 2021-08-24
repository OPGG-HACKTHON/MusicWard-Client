import React from "react";
import GlobalStyle from "./GlobalStyle";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";

import GlobalNavBar from "components/GlobalNavBar";
import { MainPage } from "./pages/mainPage";
import { SearchCategory, SearchResultList } from "pages/searchPage";
import MyPage from "./pages/MyPage";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <GlobalNavBar />
      <Switch>
        <Route path="/search/list" component={SearchResultList} />
        <Route path="/search" component={SearchCategory} />
        <Route path="/mypage" exact component={MyPage} />
        <Route path="/" exact component={MainPage} />
        <Redirect path="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
