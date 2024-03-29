import React, { ReactNode } from "react";
import { Route, Switch } from "react-router-dom";
import GlobalNavBar from "components/GlobalNavBar";
import LoginModal from "components/LoginModal";
import PerfectScrollbar from "react-perfect-scrollbar";
import GlobalFooter from "components/GlobalFooter";
import Alert from "components/Alert";

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
      <Alert />
      {children}
      <GlobalFooter />
    </PerfectScrollbar>
  );
};

const Layout = (props: LayoutProps) => {
  return (
    <Switch>
      <Route
        path={["/account/terms"]}
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
