import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Crash, FatalityTotals, NeighborhoodDictionary } from "../types";

interface DataState {
  openDataPhillyCrashes: Crash[];
  penndotCrashes: Crash[];
  currentYearFatalityTotals: FatalityTotals;
  previousYearToDateFatalityTotals: FatalityTotals;
  openDataPhillyLoaded: boolean;
  penndotLoaded: boolean;
  neighborhoodDictionary: NeighborhoodDictionary;
}


const initialState: DataState = {
  openDataPhillyCrashes: [],
  penndotCrashes: [],
  currentYearFatalityTotals: {
    total: 0
  },
  previousYearToDateFatalityTotals: {
    total: 0
  },
  openDataPhillyLoaded: false,
  penndotLoaded: false,
  neighborhoodDictionary: {},
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setOpenDataPhillyCrashes: (state, action: PayloadAction<Crash[]>) => {
      return {
        ...state,
        openDataPhillyCrashes: action.payload,
        openDataPhillyLoaded: true,
      };
    },
    setPenndotCrashes: (state, action: PayloadAction<Crash[]>) => {
      return {
        ...state,
        penndotCrashes: action.payload,
        penndotLoaded: true,
      };
    },
    setCurrentYearFatalityTotals: (state, action: PayloadAction<FatalityTotals>) => {
      return {
        ...state,
        currentYearFatalityTotals: action.payload,
      };
    },
    setPreviousYearToDateFatalityTotals: (state, action: PayloadAction<FatalityTotals>) => {
      return {
        ...state,
        previousYearToDateFatalityTotals: action.payload,
      };
    },
    setNeighborhoodDictionary: (
      state,
      action: PayloadAction<NeighborhoodDictionary>,
    ) => {
      return {
        ...state,
        neighborhoodDictionary: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setOpenDataPhillyCrashes,
  setPenndotCrashes,
  setNeighborhoodDictionary,
  setCurrentYearFatalityTotals,
  setPreviousYearToDateFatalityTotals
} = dataSlice.actions;

export default dataSlice.reducer;
