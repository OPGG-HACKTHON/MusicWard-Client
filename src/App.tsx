import React, { StrictMode, Suspense } from "react";
import GlobalStyle from "./GlobalStyle";
import { RecoilRoot } from "recoil";
import { Route, BrowserRouter } from "react-router-dom";
import Routes from "routes";
import "react-perfect-scrollbar/dist/css/styles.css";

const App = () => {
  return (
    <StrictMode>
      <RecoilRoot>
        <Suspense fallback={<div>Loading...</div>}>
          <BrowserRouter>
            <GlobalStyle />
            <Route component={Routes} />
          </BrowserRouter>
        </Suspense>
      </RecoilRoot>
    </StrictMode>
  );
};

export default App;
