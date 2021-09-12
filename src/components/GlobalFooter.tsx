import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const GlobalFooter = () => {
  return (
    <Text to="/account/terms">Youtube Music / Spotify 개인정보처리방침</Text>
  );
};

const Text = styled(Link)`
  font-size: 18px;
  line-height: 26px;
  color: #c9ac6a;
  opacity: 0.5;
  display: flex;
  justify-content: center;
  margin: 117px auto;
`;

export default GlobalFooter;
