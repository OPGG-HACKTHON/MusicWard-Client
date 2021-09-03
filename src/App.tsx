import React, { StrictMode, Suspense } from "react";
import GlobalStyle from "./GlobalStyle";
import { RecoilRoot } from "recoil";
import { Route, BrowserRouter } from "react-router-dom";
import Routes from "routes";
import GlobalNavBar from "components/GlobalNavBar";
import LoginModal from "components/LoginModal";

const App = () => {
  return (
    <StrictMode>
      <RecoilRoot>
        <Suspense fallback={<div>Loading...</div>}>
          <BrowserRouter>
            <GlobalStyle />
            <GlobalNavBar />
            <LoginModal />
            <Route component={Routes} />
          </BrowserRouter>
        </Suspense>
      </RecoilRoot>
    </StrictMode>
  );
};

export default App;
