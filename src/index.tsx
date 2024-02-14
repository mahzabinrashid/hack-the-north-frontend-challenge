import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyles from "./styles/globalStyle";
import theme from "./styles/theme";
import { ThemeProvider } from "styled-components";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </>
);
