import esriConfig from "@arcgis/core/config";
import { Box, Button } from "@chakra-ui/react";
import { ChakraStylesConfig, Select, SingleValue } from "chakra-react-select";
import { useEffect } from "react";
import {
  CHART_WIDTH,
  EMPTY_NEIGHBORHOOD,
  NEIGHBORHOOD_OPTIONS,
} from "../../consts";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { loadOpenDataPhilly, loadPenndot } from "../../thunks/dataThunks";
import MapView from "../Map/MapComp";
import Sidebar from "./Sidebar";

import { setNeighborhood } from "../../slices/filterSlice";
import { FatalityTotals, Neigborhood } from "../../types";
import CrashBarChart from "../DataVisualization/CrashBarChart";
import ProgressBar from "../DataVisualization/ProgressBar/ProgressBar";

esriConfig.apiKey =
  "AAPK03acd7bd14cc4cca80c38b0f14ac1c70NYgi-zHokSt0u6Aj2xISCHucc66tY8n8V-Iu4JcgG0FMGn3q2NRCedFh3x9UPGyB";

function Dashboard() {
  const dispatch = useAppDispatch();
  const neighborhood = useAppSelector((state) => state.filter.neighborhood);
  const data = useAppSelector((state) => state.data);
  const filter = useAppSelector((state) => state.filter);

  const handleNeighborhoodChange = (
    selectedNeighborhood: SingleValue<Neigborhood>,
  ) => {
    if (selectedNeighborhood) {
      dispatch(setNeighborhood(selectedNeighborhood));
    }
  };

  const chakraStyles: ChakraStylesConfig = {
    dropdownIndicator: (prev, { selectProps: { menuIsOpen } }) => ({
      ...prev,
      "> svg": {
        transitionDuration: "normal",
        transform: `rotate(${menuIsOpen ? -180 : 0}deg)`,
      },
      color: "white",
      background: "gray.500",
    }),
  };

  const handleClear = () => {
    dispatch(setNeighborhood(EMPTY_NEIGHBORHOOD));
  };

  useEffect(() => {
    dispatch(loadPenndot());
    dispatch(loadOpenDataPhilly());
  }, [dispatch]);

  const currentYearTotals: FatalityTotals = {
    ...(filter.pedestrians && {
      pedestrian: data.currentYearFatalityTotals.pedestrian,
    }),
    ...(filter.cyclists && { cyclist: data.currentYearFatalityTotals.cyclist }),
    ...(filter.motorcyclists && {
      motorcyclist: data.currentYearFatalityTotals.motorcyclist,
    }),
    ...(filter.motorists && {
      motorist: data.currentYearFatalityTotals.motorist,
    }),
    total: 0,
  };

  const previousYearToDateTotals: FatalityTotals = {
    ...(filter.pedestrians && {
      pedestrian: data.previousYearToDateFatalityTotals.pedestrian,
    }),
    ...(filter.cyclists && {
      cyclist: data.previousYearToDateFatalityTotals.cyclist,
    }),
    ...(filter.motorcyclists && {
      motorcyclist: data.previousYearToDateFatalityTotals.motorcyclist,
    }),
    ...(filter.motorists && {
      motorist: data.previousYearToDateFatalityTotals.motorist,
    }),
    total: 0,
  };

  currentYearTotals.total = Object.values(currentYearTotals).reduce(
    (a, b) => a + b,
    0,
  );
  previousYearToDateTotals.total = Object.values(
    previousYearToDateTotals,
  ).reduce((a, b) => a + b, 0);

  return (
    <Box display="flex" w="100%" h="100%">
      <Sidebar />
      <Box w="100%" h="100%" position="relative">
        <Box
          w="100%"
          h="100%"
          // maxHeight={screenSize.height - FOOTER_HEIGHT}
          overflow="hidden"
          rounded="md"
        >
          <MapView />

          <Box position="absolute" zIndex={10} top={4} right={4} display="flex">
            <Button
              marginRight="10px"
              onClick={handleClear}
              backgroundColor="gray.500"
              color="white"
            >
              Clear
            </Button>
            <Box width="275px" bg="rgba(255, 255, 259)" border-radius="6px">
              <Select
                size="md"
                placeholder="Neighborhood"
                options={NEIGHBORHOOD_OPTIONS}
                value={neighborhood}
                onChange={handleNeighborhoodChange}
                chakraStyles={chakraStyles}
              />
            </Box>
          </Box>

          <Box
            margin={2}
            w="52%"
            height={CHART_WIDTH / 2}
            position="absolute"
            zIndex={10}
            bottom={2}
            left={2}
            padding={2}
            bg="rgba(245, 245, 249, 0.8)"
          >
            <ProgressBar
              currentYear={currentYearTotals}
              previousYearToDate={previousYearToDateTotals}
            />
          </Box>
          <Box
            margin={2}
            w="45%"
            h={CHART_WIDTH / 2}
            position="absolute"
            zIndex={10}
            bottom={2}
            right={2}
            padding={2}
            bg="rgba(245, 245, 249, 0.8)"
          >
            <CrashBarChart />
          </Box>
        </Box>
        {/* <Footer /> */}
      </Box>
    </Box>
  );
}

export default Dashboard;
