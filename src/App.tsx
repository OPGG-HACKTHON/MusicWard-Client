import React from "react";
import GlobalStyle from "./GlobalStyle";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";

import GlobalNavBar from "components/GlobalNavBar";
import MyPage from "pages/MyPage";
import PlayListPage from "pages/playListPage/PlayListPage";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <GlobalNavBar />
      <Switch>
        <Route path="/mypage" exact component={MyPage} />
        <Route path="/editpage" exact component={EditPage} />
        <Route path="/playlist" exact component={PlayListPage} />
        <Redirect path="*" to="/" />
      </Switch>
      <div>musicward-client</div>
    </BrowserRouter>
  );
};

export default App;
