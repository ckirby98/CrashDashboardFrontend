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
  Button,
} from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";
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
import resetFilters from "../../thunks/filterThunks";
import { getReport } from "../../api/crashApi";

const datasetOptions = ["OpenDataPhilly", "PennDOT"];

function Sidebar() {
  const [downloading, setDownloading] = useState<boolean>(false);

  const filter = useAppSelector((state) => state.filter);
  const { crashInfo } = filter;
  const openDataPhillyLoaded = useAppSelector(
    (state) => state.data.openDataPhillyLoaded,
  );

  const dispatch = useAppDispatch();
  const { dataset, fromYear, toYear } = crashInfo;
  const { yearOptions } = filter;

  function getYearToOptionsAfterFrom() {
    return yearOptions.slice(yearOptions.indexOf(fromYear));
  }

  const handleDownloadClick = async () => {
    setDownloading(true);
    await getReport(filter.crashInfo);
    setDownloading(false);
  };

  const handleDatasetSelect = (event: React.ChangeEvent<{ value: string }>) => {
    const selectedOption = event.target.value;
    dispatch(resetFilters(selectedOption));
  };

  const handleFromYearSelect = (
    event: React.ChangeEvent<{ value: string }>,
  ) => {
    const selectedOption = event.target.value;
    dispatch(setFromYear(selectedOption));
    if (selectedOption > toYear) {
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
        <Select
          value={dataset}
          onChange={handleDatasetSelect}
          disabled={!openDataPhillyLoaded}
        >
          {datasetOptions.map((datasetOption) => (
            <option key={datasetOption} value={datasetOption}>
              {datasetOption}
            </option>
          ))}
        </Select>
      </FormControl>
      <HStack spacing={2} paddingX={5} paddingBottom={5}>
        <FormControl>
          <FormLabel fontSize="sm">From</FormLabel>
          <Select value={fromYear} onChange={handleFromYearSelect}>
            {yearOptions.map((year) => (
              <option value={year}>{year}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel fontSize="sm">To</FormLabel>
          <Select value={toYear} onChange={handleToYearSelect}>
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
            disabled={!crashInfo.majorInjuries}
            isChecked={crashInfo.fatalities}
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
            disabled={
              crashInfo.dataset === "OpenDataPhilly" || !crashInfo.fatalities
            }
            isChecked={crashInfo.majorInjuries}
            onChange={handleMajorInjuriesCheckbox}
          >
            Severe Injuries
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
              !crashInfo.cyclists &&
              !crashInfo.motorcyclists &&
              !crashInfo.motorists
            }
            isChecked={crashInfo.pedestrians}
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
              !crashInfo.pedestrians &&
              !crashInfo.motorists &&
              !crashInfo.motorcyclists
            }
            isChecked={crashInfo.cyclists}
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
              !crashInfo.pedestrians &&
              !crashInfo.motorists &&
              !crashInfo.cyclists
            }
            isChecked={crashInfo.motorcyclists}
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
              !crashInfo.cyclists &&
              !crashInfo.pedestrians &&
              !crashInfo.motorcyclists
            }
            isChecked={crashInfo.motorists}
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
      {crashInfo.dataset !== "OpenDataPhilly" && (
        <Stack spacing={3} p={5}>
          <Button
            backgroundColor="gray.500"
            color="white"
            isLoading={downloading}
            onClick={handleDownloadClick}
          >
            Download Data By Filters
          </Button>
        </Stack>
      )}
    </Box>
  );
}

export default Sidebar;
