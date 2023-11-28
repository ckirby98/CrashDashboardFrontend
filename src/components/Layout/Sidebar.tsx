import {
  Box,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Select,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";
import React, { ChangeEvent, useEffect } from "react";
import { SIDEBAR_WIDTH } from "../../consts";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  setCyclists,
  setFatalities,
  setFromYear,
  setMajorInjuries,
  setMotorcyclists,
  setMotorists,
  setPedestrians,
  setToYear,
} from "../../slices/filterSlice";
import { initializeFilter, resetFilters } from "../../thunks/filterThunks";

const datasetOptions = ["OpenDataPhilly", "PennDOT"];

function Sidebar() {
  const filter = useAppSelector((state) => state.filter);
  const penndotLoaded = useAppSelector((state) => state.data.penndotLoaded);
  const dispatch = useAppDispatch();
  const { dataset } = filter;
  const yearFrom = filter.fromYear;
  const yearTo = filter.toYear;
  const { yearOptions } = filter;

  useEffect(() => {
    dispatch(initializeFilter());
  }, []);

  function getYearToOptionsAfterFrom() {
    return yearOptions.slice(yearOptions.indexOf(yearFrom));
  }

  const handleDatasetSelect = (event: React.ChangeEvent<{ value: string }>) => {
    const selectedOption = event.target.value;
    dispatch(resetFilters(selectedOption));
  };

  const handleFromYearSelect = (
    event: React.ChangeEvent<{ value: string }>,
  ) => {
    const selectedOption = event.target.value;
    dispatch(setFromYear(selectedOption));
    if (selectedOption > yearTo) {
      dispatch(setToYear(selectedOption));
    }
  };

  const handleToYearSelect = (event: React.ChangeEvent<{ value: string }>) => {
    const selectedOption = event.target.value;
    dispatch(setToYear(selectedOption));
  };

  const handleCyclistCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setCyclists(event.target.checked));
  };

  const handlePedestrianCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPedestrians(event.target.checked));
  };

  const handleMotorcyclistCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setMotorcyclists(event.target.checked));
  };

  const handleMotoristCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setMotorists(event.target.checked));
  };

  const handleFatalitiesCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFatalities(event.target.checked));
  };

  const handleMajorInjuriesCheckbox = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(setMajorInjuries(event.target.checked));
  };

  return (
    <Box w={SIDEBAR_WIDTH} h="100%" boxShadow="md" p="6" rounded="md">
      <Stack spacing={3} p={5}>
        <Heading as="h1" fontSize="26px">
          {" "}
          Philadelphia Crash Dashboard{" "}
        </Heading>
      </Stack>
      <FormControl paddingX={5} paddingBottom={2}>
        <FormLabel fontSize="sm">Dataset</FormLabel>
        <Select value={dataset} onChange={handleDatasetSelect}>
          {datasetOptions.map((datasetOption) => (
            <option
              key={datasetOption}
              value={datasetOption}
              disabled={datasetOption === datasetOptions[1] && !penndotLoaded}
            >
              {datasetOption}
            </option>
          ))}
        </Select>
      </FormControl>
      <HStack spacing={2} paddingX={5} paddingBottom={5}>
        <FormControl>
          <FormLabel fontSize="sm">From</FormLabel>
          <Select value={yearFrom} onChange={handleFromYearSelect}>
            {yearOptions.map((year) => (
              <option value={year}>{year}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel fontSize="sm">To</FormLabel>
          <Select value={yearTo} onChange={handleToYearSelect}>
            {getYearToOptionsAfterFrom().map((year) => (
              <option value={year}>{year}</option>
            ))}
          </Select>
        </FormControl>
      </HStack>
      <Stack spacing={3} p={5}>
        <Text fontSize="md" as="b">
          Severity
        </Text>
        <Box display="flex" justifyContent="space-between">
          <Checkbox
            disabled={!filter.majorInjuries}
            isChecked={filter.fatalities}
            onChange={handleFatalitiesCheckbox}
          >
            Fatalities
          </Checkbox>
          <Image
            src={`${process.env.PUBLIC_URL}red_circle.png`}
            boxSize="24px"
          />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Checkbox
            disabled={filter.dataset === "OpenDataPhilly" || !filter.fatalities}
            isChecked={filter.majorInjuries}
            onChange={handleMajorInjuriesCheckbox}
          >
            Serious Injuries
          </Checkbox>
          <Image
            src={`${process.env.PUBLIC_URL}orange_circle.png`}
            boxSize="24px"
          />
        </Box>
      </Stack>
      <Stack spacing={3} p={5}>
        <Text fontSize="md" as="b">
          Mode
        </Text>
        <Box display="flex" justifyContent="space-between">
          <Checkbox
            disabled={
              !filter.cyclists && !filter.motorcyclists && !filter.motorists
            }
            isChecked={filter.pedestrians}
            onChange={handlePedestrianCheckbox}
          >
            Pedestrians
          </Checkbox>
          <Image
            src={`${process.env.PUBLIC_URL}pedestrian_grey.png`}
            boxSize="24px"
          />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Checkbox
            disabled={
              !filter.pedestrians && !filter.motorists && !filter.motorcyclists
            }
            isChecked={filter.cyclists}
            onChange={handleCyclistCheckbox}
          >
            Cyclists
          </Checkbox>
          <Image
            src={`${process.env.PUBLIC_URL}cyclist_grey.png`}
            boxSize="24px"
          />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Checkbox
            disabled={
              !filter.pedestrians && !filter.motorists && !filter.cyclists
            }
            isChecked={filter.motorcyclists}
            onChange={handleMotorcyclistCheckbox}
          >
            Motorcyclists
          </Checkbox>
          <Image
            src={`${process.env.PUBLIC_URL}motorcyclist_grey.png`}
            boxSize="24px"
          />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Checkbox
            disabled={
              !filter.cyclists && !filter.pedestrians && !filter.motorcyclists
            }
            isChecked={filter.motorists}
            onChange={handleMotoristCheckbox}
          >
            Motorists
          </Checkbox>
          <Image
            src={`${process.env.PUBLIC_URL}motorist_grey.png`}
            boxSize="24px"
          />
        </Box>
      </Stack>
    </Box>
  );
}

export default Sidebar;
