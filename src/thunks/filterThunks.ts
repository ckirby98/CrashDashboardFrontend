import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import {
  setYearOptions,
  setFromYear,
  setToYear,
  setDateset,
  setMajorInjuries,
  setFatalities,
  setNeighborhood,
  setMotorists,
} from "../slices/filterSlice";
import { EMPTY_NEIGHBORHOOD } from "../consts";

const datasetOptions = ["PennDOT", "OpenDataPhilly"];

const openDataPhillyInitialYear = 2019;

const pennDOTYearOptipons = [
  "2002",
  "2003",
  "2004",
  "2005",
  "2006",
  "2007",
  "2008",
  "2009",
  "2010",
  "2011",
  "2012",
  "2013",
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
];

function getOpenDataPhillyYearOptions() {
  const currentYear = new Date().getFullYear();

  const options: string[] = [];
  let index = openDataPhillyInitialYear;
  while (index <= currentYear) {
    options.push(index.toString());
    index += 1;
  }
  return options;
}

const resetFilters =
  (dataset: string): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    if (dataset) dispatch(setNeighborhood(EMPTY_NEIGHBORHOOD));
    dispatch(setFatalities(true));
    dispatch(setMotorists(false));
    dispatch(setDateset(dataset));

    if (dataset === datasetOptions[1]) {
      const options = getOpenDataPhillyYearOptions();
      await dispatch(setYearOptions(options));
      dispatch(setFromYear(options[0]));
      dispatch(setToYear(options[options.length - 1]));
      dispatch(setMajorInjuries(false));
    } else {
      await dispatch(setYearOptions(pennDOTYearOptipons));
      dispatch(setFromYear(pennDOTYearOptipons[0]));
      dispatch(setToYear(pennDOTYearOptipons[pennDOTYearOptipons.length - 1]));
      dispatch(setMajorInjuries(true));
    }
  };

export default resetFilters;
