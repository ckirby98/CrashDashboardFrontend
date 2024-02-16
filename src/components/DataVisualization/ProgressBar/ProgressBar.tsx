import { Box, Text } from "@chakra-ui/react";
import { FatalityTotals } from "../../../types";
import Bar from "./Bar";
import BarLegend from "./BarLegend";
import getBarCategories from "./utills";

interface Props {
  currentYear: FatalityTotals;
  previousYearToDate: FatalityTotals;
}

const targetDate = new Date();
const month = targetDate.toLocaleString("default", { month: "long" });

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

  const categoriesCurrent = getBarCategories(currentYear);
  const categoriesPrevious = getBarCategories(previousYearToDate);

  return (
    <Box>
      <Box marginBottom={6} display="flex" justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold">
          Year To Date Fatal Crashes
        </Text>
        <Text fontSize="md" fontWeight="bold">
          {`January 1 - ${month} ${targetDate.getDate()}`}
        </Text>
      </Box>

      <Box display="flex" marginBottom={2} alignSelf="flex-end">
        <Text fontSize="md" fontWeight="bold" marginRight={8}>
          {targetDate.getFullYear()}
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
          {targetDate.getFullYear() - 1}
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
          Note: Data in this table compares total CRASHES, not total FATALITIES.
          OpenDataPhilly does not contain as detailed information
        </Text>
      </Box>
    </Box>
  );
}

export default ProgressBar;
