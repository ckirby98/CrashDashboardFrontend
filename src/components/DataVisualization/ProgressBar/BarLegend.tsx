import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { FatalityTotals } from "../../../types";
import { modeColorMap } from "./consts";

interface Props {
  totals: FatalityTotals;
  previousYearToDateTotals?: FatalityTotals;
}

function BarLegend(props: Props) {
  const { totals, previousYearToDateTotals } = props;
  return (
    <Box
      marginBottom={6}
      marginLeft={16}
    >
      <Grid gridTemplateColumns="repeat(4, 1fr)">
        {Object.entries(totals)
          .slice(0, -1)
          .map(([mode, total]) => {
            let difference = 0;
            if (previousYearToDateTotals) {
              difference = total - previousYearToDateTotals[mode.toLowerCase()];
            }

            const color = modeColorMap.get(mode);
            return (
              <GridItem>
                <Box display="flex">
                  <Text color={color}>{"\u2B24"}</Text>
                  <Text>&nbsp;{`${mode}:`}&nbsp;</Text>
                  <Text>{total}</Text>
                  {previousYearToDateTotals && (
                    <Text color={difference > 0 ? "red" : "green"}>
                      &nbsp;{`(${difference > 0 ? '+' : ''}${difference})`}
                    </Text>
                  )}
                </Box>
              </GridItem>
            );
          })}
      </Grid>
    </Box>
  );
}

export default BarLegend;
