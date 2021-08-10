import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    margin: 0;
    font-family: "Noto Sans CJK KR", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    line-height: 1.5;
    font-size: 16px;
    text-rendering: optimizeLegibility;
    color: white  ;
    background: black;
  }

  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  input,
  select,
  button,
  textarea {
    background-color: transparent;
    font-size: inherit;
    font-family: "Noto Sans CJK KR", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    color: inherit;

    &:focus {
      outline: 0;
    }
  }

  input,
  textarea {
    border-radius: 0;
  }

  th {
    text-align: inherit;
  }
  
  html,
  body {
    font-family: "Noto Sans CJK KR", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  }

  body.font-loaded {
    font-family: "Noto Sans CJK KR", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  }

  button,
  input,
  select,
  textarea {
    font-family: "Noto Sans CJK KR", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  }

  .font-loaded input,
  .font-loaded select,
  .font-loaded button,
  .font-loaded textarea {
    font-family: "Noto Sans CJK KR", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  }

  #app {
    height: 100%;
  }

  nav li::before {
    content: "";
  }
`;

export default GlobalStyle;
