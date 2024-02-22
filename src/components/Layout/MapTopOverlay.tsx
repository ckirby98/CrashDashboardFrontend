import { ChakraStylesConfig, Select, SingleValue } from "chakra-react-select";
import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { Neigborhood } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setNeighborhood } from "../../slices/filterSlice";
import { EMPTY_NEIGHBORHOOD, NEIGHBORHOOD_OPTIONS } from "../../consts";
import SettingsDropdown from "./SettingsDropdown";

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
  container: (prev) => ({
    ...prev,
    background: "white",
    borderRadius: "6px",
  }),
};

export default function MapTopOverlay() {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.filter);

  const handleNeighborhoodChange = (
    selectedNeighborhood: SingleValue<Neigborhood>,
  ) => {
    if (selectedNeighborhood) {
      dispatch(setNeighborhood(selectedNeighborhood));
    }
  };

  const handleClear = () => {
    dispatch(setNeighborhood(EMPTY_NEIGHBORHOOD));
  };

  return (
    <Box position="absolute" zIndex={10} top={4} right={4} display="flex">
      <Button
        marginRight="10px"
        onClick={handleClear}
        backgroundColor="gray.500"
        color="white"
      >
        Clear
      </Button>
      <Box width="275px" marginEnd="10px">
        <Select
          size="md"
          placeholder="Neighborhood"
          options={NEIGHBORHOOD_OPTIONS}
          value={filter.crashInfo.neighborhood}
          onChange={handleNeighborhoodChange}
          chakraStyles={chakraStyles}
        />
      </Box>
      <SettingsDropdown />
    </Box>
  );
}
