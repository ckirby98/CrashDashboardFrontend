import esriConfig from "@arcgis/core/config";
import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import {
  isBrowser,
  isMobile,
} from "react-device-detect";
import { CHART_WIDTH } from "../../consts";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { loadOpenDataPhilly, loadPenndot } from "../../thunks/dataThunks";
import MapView from "../Map/MapComp";
import Sidebar from "./Sidebar";
import { FatalityTotals } from "../../types";
import CrashBarChart from "../DataVisualization/CrashBarChart";
import ProgressBar from "../DataVisualization/ProgressBar/ProgressBar";
import MapTopOverlay from "./MapTopOverlay";

esriConfig.apiKey =
  "AAPK03acd7bd14cc4cca80c38b0f14ac1c70NYgi-zHokSt0u6Aj2xISCHucc66tY8n8V-Iu4JcgG0FMGn3q2NRCedFh3x9UPGyB";

function Dashboard() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.data);
  const crashInfo = useAppSelector((state) => state.filter.crashInfo);

  useEffect(() => {
    dispatch(loadPenndot());
    dispatch(loadOpenDataPhilly());
  }, [dispatch]);

  const currentYearTotals: FatalityTotals = {
    ...(crashInfo.pedestrians && {
      pedestrian: data.currentYearFatalityTotals.pedestrian,
    }),
    ...(crashInfo.cyclists && {
      cyclist: data.currentYearFatalityTotals.cyclist,
    }),
    ...(crashInfo.motorcyclists && {
      motorcyclist: data.currentYearFatalityTotals.motorcyclist,
    }),
    ...(crashInfo.motorists && {
      motorist: data.currentYearFatalityTotals.motorist,
    }),
    total: 0,
  };

  const previousYearToDateTotals: FatalityTotals = {
    ...(crashInfo.pedestrians && {
      pedestrian: data.previousYearToDateFatalityTotals.pedestrian,
    }),
    ...(crashInfo.cyclists && {
      cyclist: data.previousYearToDateFatalityTotals.cyclist,
    }),
    ...(crashInfo.motorcyclists && {
      motorcyclist: data.previousYearToDateFatalityTotals.motorcyclist,
    }),
    ...(crashInfo.motorists && {
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
      {isBrowser && <Sidebar />}
      <Box w="100%" h="100%" position="relative">
        <Box
          w="100%"
          h="100%"
          // maxHeight={screenSize.height - FOOTER_HEIGHT}
          overflow="hidden"
          rounded="md"
        >
          <MapView />
          {isBrowser && (
            <>
              <MapTopOverlay />
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
            </>
          )}
          {isMobile && (
            <Box
              w="100%"
              h="15%"
              position="absolute"
              zIndex={10}
              bottom={2}
              padding={2}
              bg="rgba(245, 245, 249, 0.8)"
            >
              The majority of features are currently not available on mobile
              devices, please use a desktop or laptop.
            </Box>
          )}
        </Box>
        {/* <Footer /> */}
      </Box>
    </Box>
  );
}

export default Dashboard;
