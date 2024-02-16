import { Box } from "@chakra-ui/react";
import { CHART_WIDTH, FOOTER_HEIGHT } from "../../consts";
import CrashBarChart from "../DataVisualization/CrashBarChart";

function Footer() {
  return (
    <Box>
      <Box
        display="flex"
        backgroundColor="white"
        boxShadow="lg"
        overflow="hidden"
        rounded="md"
        height={FOOTER_HEIGHT}
        marginTop={2}
      >
        <Box w="65%" backgroundColor="red" display="flex">
          <Box w="50%" margin={2}>
            <Box h="50%" marginBottom={2} backgroundColor="black" />
            <Box h="50%" marginBottom={2} backgroundColor="black" />
          </Box>
          <Box w="50%" margin={2}>
            <Box h="50%" marginBottom={2} backgroundColor="black" />
            <Box h="50%" marginBottom={2} backgroundColor="black" />
          </Box>
        </Box>
        <Box margin={2} marginTop={0} width="35%" height={CHART_WIDTH / 2}>
          <CrashBarChart />
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
