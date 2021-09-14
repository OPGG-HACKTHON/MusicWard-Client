import React from "react";
import {
  Redirect,
  Route,
  RouteProps,
  RouteComponentProps,
} from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLogined } from "recoil/auth";
import { modalState } from "recoil/modal";

const PrivateRoute = ({ component: Component, ...rest }: RouteProps) => {
  const [, setOpenModal] = useRecoilState<boolean>(modalState);
  const render = Component
    ? (props: RouteComponentProps) => <Component {...props} />
    : () => <></>;
  const renderFallback = () => {
    return <Redirect to="/" />;
  };
  if (!useRecoilValue(isLogined)) {
    setOpenModal(true);
  }
  return (
    <Route
      {...rest}
      render={useRecoilValue(isLogined) ? render : renderFallback}
    />
  );
};

export default PrivateRoute;
