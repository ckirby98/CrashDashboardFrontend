import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks";

function NeighborhoodTable() {
  const [sortedData, setSortedData] = useState<[string, number][]>([]);
  const neighborhoodDict = useAppSelector(
    (state) => state.data.neighborhoodDictionary,
  );

  useEffect(() => {
    if (neighborhoodDict) {
      const keyValues: [string, number][] = [];

      Object.keys(neighborhoodDict).forEach((key) => {
        keyValues.push([key, neighborhoodDict[key]]);
      });

      keyValues.sort(function compare(kv1, kv2) {
        return kv2[1] - kv1[1];
      });
      setSortedData(keyValues);
    }
  }, [neighborhoodDict]);

  return (
    <TableContainer overflowY="auto" maxH="310px">
      <Table variant="striped">
        <TableCaption>Fatalities by Neighborhood</TableCaption>
        <Thead>
          <Tr>
            <Th>Neighborhood</Th>
            <Th>Total Fatalities</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sortedData.map((keyValue) => {
            return (
              <Tr>
                <Td>{keyValue[0]}</Td>
                <Td>{keyValue[1]}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default NeighborhoodTable;
