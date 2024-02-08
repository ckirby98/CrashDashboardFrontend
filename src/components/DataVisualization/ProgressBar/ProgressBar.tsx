import { Box, Text } from "@chakra-ui/react";
import { FatalityTotals } from "../../../types";
import Bar from "./Bar";
import BarLegend from "./BarLegend";
import getBarCategories from "./utills";

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
  console.log("Curr: " + currentYearWidth + " - Prev: " + previousYearWidth)

  const categoriesCurrent = getBarCategories(currentYear);
  const categoriesPrevious = getBarCategories(previousYearToDate);

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
          {lastMonth.getFullYear()}
        </Text>
        <Box w="100%">
          <Bar
            categories={categoriesCurrent}
            widthPercentage={currentYearWidth}
          />
        </Box>
      </Box>

      <BarLegend
        totals={currentYear}
        previousYearToDateTotals={previousYearToDate}
      />

      <Box display="flex" marginBottom={2}>
        <Text fontSize="md" fontWeight="bold" marginRight={8}>
          {lastMonth.getFullYear() - 1}
        </Text>
        <Box w="100%">
          <Bar
            categories={categoriesPrevious}
            widthPercentage={previousYearWidth}
          />
        </Box>
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
