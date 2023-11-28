export interface Crash {
  category: string;
  cyclist_fatality_count: number;
  cyclist_injury_count: number;
  date: string;
  id: number;
  max_severity: string;
  modes: string[];
  most_affected_vulnerable_mode: string;
  motorcyclist_fatality_count: number;
  motorcyclist_injury_count: number;
  motorist_fatality_count: number;
  motorist_injury_count: number;
  neighborhood: string;
  pedestrian_fatality_count: number;
  pedestrian_injury_count: number;
  point_x: number;
  point_y: number;
  total_deaths: number;
  total_incidents: number;
  total_injuries: number;
  year: number;
}

export interface Neigborhood {
  label: string;
  value: string;
}

export interface FilterState {
  dataset: string;
  fromYear: string;
  toYear: string;
  neighborhood: Neigborhood;
  cyclists: boolean;
  pedestrians: boolean;
  motorcyclists: boolean;
  motorists: boolean;
  fatalities: boolean;
  majorInjuries: boolean;
  yearOptions: string[];
  yearRange: number[];
}

export interface NeighborhoodDictionary {
  [neighborhood: string]: number;
}

export interface FatalityTotals {
  pedestrian?: number;
  cyclist?: number;
  motorcyclist?: number;
  motorist?: number;
  total: number;
}
