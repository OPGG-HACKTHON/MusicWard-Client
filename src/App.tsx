import React from "react";
import GlobalStyle from "./GlobalStyle";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";

import GlobalNavBar from "components/GlobalNavBar";
import MyPage from "./pages/myPage/MyPage";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <GlobalNavBar />
      <Switch>
        <Route path="/mypage" exact component={MyPage} />
        <Redirect path="*" to="/" />
      </Switch>
      <div>musicward-client</div>
    </BrowserRouter>
  );
};

export default App;
