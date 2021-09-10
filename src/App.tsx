import React, { StrictMode, Suspense } from "react";
import GlobalStyle from "./GlobalStyle";
import { RecoilRoot } from "recoil";
import { Route, BrowserRouter } from "react-router-dom";
import Routes from "routes";
import GlobalNavBar from "components/GlobalNavBar";
import LoginModal from "components/LoginModal";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

const App = () => {
  return (
    <StrictMode>
      <RecoilRoot>
        <Suspense fallback={<div>Loading...</div>}>
          <BrowserRouter>
            <GlobalStyle />
            <PerfectScrollbar>
              <GlobalNavBar />
              <LoginModal />
              <Route component={Routes} />
            </PerfectScrollbar>
          </BrowserRouter>
        </Suspense>
      </RecoilRoot>
    </StrictMode>
  );
};

export default App;
