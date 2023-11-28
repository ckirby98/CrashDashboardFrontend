import { Crash, FilterState } from "../../types";

const categoryCountMap = {
  pedestrian_fatality_count: 0,
  pedestrian_injury_count: 0,
  cyclist_fatality_count: 0,
  cyclist_injury_count: 0,
  motorcyclist_fatality_count: 0,
  motorcyclist_injury_count: 0,
  motorist_fatality_count: 0,
  motorist_injury_count: 0,
};

export function getYearRange(fromYear: string, toYear: string) {
  return Array.from(
    { length: parseInt(toYear, 10) - parseInt(fromYear, 10) + 1 },
    (v, k) => k + parseInt(fromYear, 10),
  );
}

export function getCrashTypeTotalsByYear(data: Crash[], filter: FilterState) {
  const crashesByYear = new Map<number, Map<string, number>>();
  const yearRange = getYearRange(filter.fromYear, filter.toYear);
  yearRange.forEach((year) =>
    crashesByYear.set(year, new Map(Object.entries(categoryCountMap))),
  );

  // function showCategory(mode: string, severity: string, neighborhood: string) {
  //   if (mode === "Pedestrian" && !filter.pedestrians) return false;
  //   if (mode === "Cyclist" && !filter.cyclists) return false;
  //   if (mode === "Motorcyclist" && !filter.motorcyclists) return false;
  //   if (mode === "Motorist" && !filter.motorists) return false;
  //   if (severity === "Death" && !filter.fatalities) return false;
  //   if (severity === "Injury" && !filter.majorInjuries) return false;
  //   if (filter.neighborhood.value && filter.neighborhood.value !== neighborhood)
  //     return false;
  //   return true;
  // }

  data.forEach((crash) => {
    const map = crashesByYear.get(crash.year);
    if (
      map &&
      !(
        filter.neighborhood.value &&
        filter.neighborhood.value !== crash.neighborhood
      )
    ) {
      map.forEach((value, key) => {
        map.set(key, value + crash[key]);
      });
    }
  });
  return crashesByYear;
}
