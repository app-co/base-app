/* eslint-disable @typescript-eslint/no-empty-interface */
import "styled-components";
import theme from "./theme";
import theme2 from "./theme2";

declare module "styled-components" {
   type ThemeType = typeof theme;

   export interface DefaultTheme extends ThemeType {}
}
