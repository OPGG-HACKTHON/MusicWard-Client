import React, { ReactNode } from "react";
import { Route, Switch } from "react-router-dom";
import GlobalNavBar from "components/GlobalNavBar";
import LoginModal from "components/LoginModal";
import PerfectScrollbar from "react-perfect-scrollbar";

interface LayoutProps {
  children?: ReactNode;
}

const EmptyTemplate = ({ children }: LayoutProps) => {
  return <>{children}</>;
};

const DefaultTemplate = ({ children }: LayoutProps) => {
  return (
    <PerfectScrollbar>
      <GlobalNavBar />
      <LoginModal />
      {children}
      {/* TODO: 푸터 추가 */}
      {/* <GlobalFooter/> */}
    </PerfectScrollbar>
  );
};

const Layout = (props: LayoutProps) => {
  return (
    <Switch>
      <Route
        path={["/riot.txt", "/account/terms"]}
        render={() => <EmptyTemplate {...props} />}
      />
      <Route
        path={[
          "/search/list",
          "/search",
          "/playlist/:id",
          "/mypage",
          "/editpage",
          "/archive",
          "/",
          "*",
        ]}
        render={() => <DefaultTemplate {...props} />}
      />
    </Switch>
  );
};

export default Layout;
