import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Baloo Bhai 2", serif;
  }

  html, body {
    width: 100%;
    height: 100%;
    overflow: hidden; /* Opcional */
  }
`;

export default GlobalStyle;