import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FilterState, Neigborhood } from "../types";

const initialState: FilterState = {
  dataset: "PennDOT",
  fromYear: "",
  toYear: "",
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
  yearOptions: [],
  yearRange: [],
};

export const fitlerSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setDateset: (state, action: PayloadAction<string>) => {
      state.dataset = action.payload;
    },
    setFromYear: (state, action: PayloadAction<string>) => {
      state.fromYear = action.payload;
    },
    setToYear: (state, action: PayloadAction<string>) => {
      state.toYear = action.payload;
    },
    setNeighborhood: (state, action: PayloadAction<Neigborhood>) => {
      state.neighborhood = action.payload;
    },
    setYearOptions: (state, action: PayloadAction<string[]>) => {
      state.yearOptions = action.payload;
    },
    setCyclists: (state, action: PayloadAction<boolean>) => {
      state.cyclists = action.payload;
    },
    setPedestrians: (state, action: PayloadAction<boolean>) => {
      state.pedestrians = action.payload;
    },
    setMotorcyclists: (state, action: PayloadAction<boolean>) => {
      state.motorcyclists = action.payload;
    },
    setMotorists: (state, action: PayloadAction<boolean>) => {
      state.motorists = action.payload;
    },
    setFatalities: (state, action: PayloadAction<boolean>) => {
      state.fatalities = action.payload;
    },
    setMajorInjuries: (state, action: PayloadAction<boolean>) => {
      state.majorInjuries = action.payload;
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
} = fitlerSlice.actions;

export default fitlerSlice.reducer;
