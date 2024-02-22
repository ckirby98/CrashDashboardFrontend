import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FilterState, Neigborhood } from "../types";

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

const initialState: FilterState = {
  crashInfo: {
    dataset: "PennDOT",
    fromYear: pennDOTYearOptipons[0],
    toYear: pennDOTYearOptipons[pennDOTYearOptipons.length - 1],
    neighborhood: {
      label: "",
      value: "",
    },
    cyclists: true,
    pedestrians: true,
    motorcyclists: false,
    motorists: false,
    fatalities: true,
    majorInjuries: true,
  },
  displayableInfo: {
    stateRoads: false,
    schoolsAndRec: false,
    eligibleRoads: false,
    trafficCalming: false,
    points: true,
  },
  yearOptions: pennDOTYearOptipons,
  yearRange: [],
};

export const fitlerSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setDateset: (state, action: PayloadAction<string>) => {
      state.crashInfo.dataset = action.payload;
    },
    setFromYear: (state, action: PayloadAction<string>) => {
      state.crashInfo.fromYear = action.payload;
    },
    setToYear: (state, action: PayloadAction<string>) => {
      state.crashInfo.toYear = action.payload;
    },
    setNeighborhood: (state, action: PayloadAction<Neigborhood>) => {
      state.crashInfo.neighborhood = action.payload;
    },
    setYearOptions: (state, action: PayloadAction<string[]>) => {
      state.yearOptions = action.payload;
    },
    setCyclists: (state, action: PayloadAction<boolean>) => {
      state.crashInfo.cyclists = action.payload;
    },
    setPedestrians: (state, action: PayloadAction<boolean>) => {
      state.crashInfo.pedestrians = action.payload;
    },
    setMotorcyclists: (state, action: PayloadAction<boolean>) => {
      state.crashInfo.motorcyclists = action.payload;
    },
    setMotorists: (state, action: PayloadAction<boolean>) => {
      state.crashInfo.motorists = action.payload;
    },
    setFatalities: (state, action: PayloadAction<boolean>) => {
      state.crashInfo.fatalities = action.payload;
    },
    setMajorInjuries: (state, action: PayloadAction<boolean>) => {
      state.crashInfo.majorInjuries = action.payload;
    },
    setStateRoads: (state, action: PayloadAction<boolean>) => {
      state.displayableInfo.stateRoads = action.payload;
    },
    setSchoolsAndRec: (state, action: PayloadAction<boolean>) => {
      state.displayableInfo.schoolsAndRec = action.payload;
    },
    setEligibleRoads: (state, action: PayloadAction<boolean>) => {
      state.displayableInfo.eligibleRoads = action.payload;
    },
    setTrafficCalming: (state, action: PayloadAction<boolean>) => {
      state.displayableInfo.trafficCalming = action.payload;
    },
    setPoints: (state, action: PayloadAction<boolean>) => {
      state.displayableInfo.points = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setDateset,
  setFromYear,
  setToYear,
  setNeighborhood,
  setYearOptions,
  setCyclists,
  setPedestrians,
  setMotorcyclists,
  setMotorists,
  setFatalities,
  setMajorInjuries,
  setStateRoads,
  setSchoolsAndRec,
  setEligibleRoads,
  setTrafficCalming,
  setPoints,
} = fitlerSlice.actions;

export default fitlerSlice.reducer;
