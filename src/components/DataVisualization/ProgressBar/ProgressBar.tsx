import { Box, Text } from "@chakra-ui/react";
import { FatalityTotals } from "../../../types";
import Bar from "./Bar";
import BarLegend from "./BarLegend";
import { modeColorMap } from "./consts";

interface Props {
  currentYear: FatalityTotals;
  previousYearToDate: FatalityTotals;
}

const lastMonth = new Date();
lastMonth.setDate(1);
lastMonth.setHours(-1);

const month = lastMonth.toLocaleString("default", { month: "long" });

function ProgressBar(props: Props) {
  const { currentYear, previousYearToDate } = props;

  let currentYearWidth = 0;
  let previousYearWidth = 0;

  if (currentYear.total > previousYearToDate.total) {
    currentYearWidth = 100;
    previousYearWidth = (previousYearToDate.total / currentYear.total) * 100;
  } else {
    previousYearWidth = 100;
    currentYearWidth = (currentYear.total / previousYearToDate.total) * 100;
  }

  const categoriesCurrent = [
    ...(currentYear.pedestrian
      ? [
          {
            mode: "Pedestrian",
            color: modeColorMap.get("pedestrian"),
            widthPercentage: currentYear.pedestrian / currentYear.total,
          },
        ]
      : []),
    ...(currentYear.cyclist
      ? [
          {
            mode: "Cyclist",
            color: modeColorMap.get("cyclist"),
            widthPercentage: currentYear.cyclist / currentYear.total,
          },
        ]
      : []),
    ...(currentYear.motorcyclist
      ? [
          {
            mode: "Motorcyclist",
            color: modeColorMap.get("motorcyclist"),
            widthPercentage: currentYear.motorcyclist / currentYear.total,
          },
        ]
      : []),
    ...(currentYear.motorist
      ? [
          {
            mode: "Motorist",
            color: modeColorMap.get("motorist"),
            widthPercentage: currentYear.motorist / currentYear.total,
          },
        ]
      : []),
  ];

  const categoriesPrevious = [
    ...(previousYearToDate.pedestrian
      ? [
          {
            mode: "Pedestrian",
            color: modeColorMap.get("pedestrian"),
            widthPercentage:
              previousYearToDate.pedestrian / previousYearToDate.total,
          },
        ]
      : []),
    ...(previousYearToDate.cyclist
      ? [
          {
            mode: "Cyclist",
            color: modeColorMap.get("cyclist"),
            widthPercentage:
              previousYearToDate.cyclist / previousYearToDate.total,
          },
        ]
      : []),
    ...(previousYearToDate.motorcyclist
      ? [
          {
            mode: "Motorcyclist",
            color: modeColorMap.get("motorcyclist"),
            widthPercentage:
              previousYearToDate.motorcyclist / previousYearToDate.total,
          },
        ]
      : []),
    ...(previousYearToDate.motorist
      ? [
          {
            mode: "Motorist",
            color: modeColorMap.get("motorist"),
            widthPercentage:
              previousYearToDate.motorist / previousYearToDate.total,
          },
        ]
      : []),
  ];

  return (
    <Box>
      <Box marginBottom={6} display="flex" justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold">
          Year To Date Fatal Crashes
        </Text>
        <Text fontSize="md" fontWeight="bold">
          {`January 1 - ${month} ${lastMonth.getDate()}`}
        </Text>
      </Box>

      <Box display="flex" marginBottom={2} alignSelf="flex-end">
        <Text fontSize="md" fontWeight="bold" marginRight={8}>
          {2023}
        </Text>
        <Bar
          categories={categoriesCurrent}
          widthPercentage={currentYearWidth}
        />
      </Box>

      <BarLegend
        totals={currentYear}
        previousYearToDateTotals={previousYearToDate}
      />

      <Box display="flex" marginBottom={2}>
        <Text fontSize="md" fontWeight="bold" marginRight={8}>
          {2022}
        </Text>
        <Bar
          categories={categoriesPrevious}
          widthPercentage={previousYearWidth}
        />
      </Box>

      <BarLegend totals={previousYearToDate} />

      <Box>
        <Text fontSize="sm">
          Note: Data for the current year comes from OpenDataPhilly. Unlike
          PennDOT, this data does not account for multiple fatalities in one
          crash, so this visualization compares total fatal crash occurences
          instead.
        </Text>
      </Box>
    </Box>
  );
}

export default ProgressBar;
