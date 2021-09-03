import React from "react";
import {
  Redirect,
  Route,
  RouteProps,
  RouteComponentProps,
} from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLogined } from "recoil/auth";

const PrivateRoute = ({ component: Component, ...rest }: RouteProps) => {
  const render = Component
    ? (props: RouteComponentProps) => <Component {...props} />
    : () => <></>;
  const renderFallback = () => {
    return <Redirect to="/" />;
  };
  return (
    <Route
      {...rest}
      render={useRecoilValue(isLogined) ? render : renderFallback}
    />
  );
};

export default PrivateRoute;
