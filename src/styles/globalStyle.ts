import { createGlobalStyle, css, ThemeProvider } from "styled-components";
import fonts from "./fonts";
const GlobalStyles = createGlobalStyle`
  ${fonts};
  
  html {
    height: 100%;
    margin: 0;
    padding: 0;
    scroll-behavior: smooth;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    width: 100vw;
    background-color: #141425;
    color: white;
  }
  
  a {
    text-decoration: none; 
    color: inherit; 
    cursor: pointer;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  body > div:first-of-type,
  div#__next,
  div#__next > div {
    height: 100%;
  }

  .numbered-heading {
    display: flex;
    align-items: center;
    position: relative;
    margin: 10px 0px 40px 0px;
    width: 100%;
    font-size: clamp(32px, 5vw, 38px);
    white-space: nowrap;
    font-weight: 600;
    font-family: "Montserrat", sans-serif;
    line-height: 1.1;
    }
`;

export default GlobalStyles;
