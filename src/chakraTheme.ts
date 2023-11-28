import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme({
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode("#F5F5F9", "gray.800")(props),
      },
    }),
  },
});

export default theme;
