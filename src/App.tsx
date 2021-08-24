import React from "react";
import GlobalStyle from "./GlobalStyle";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";

import GlobalNavBar from "components/GlobalNavBar";
import MyPage from "./pages/myPage/MyPage";
import EditPage from "./pages/myPage/EditPage";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <GlobalNavBar />
      <Switch>
        <Route path="/mypage" exact component={MyPage} />
        <Route path="/editpage" exact component={EditPage} />
        <Redirect path="*" to="/" />
      </Switch>
      <div>musicward-client</div>
    </BrowserRouter>
  );
};

export default App;
