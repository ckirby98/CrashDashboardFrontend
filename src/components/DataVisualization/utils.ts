import { Crash, FilterCrashInfo } from "../../types";

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

export function getCrashTypeTotalsByYear(
  data: Crash[],
  crashInfo: FilterCrashInfo,
) {
  const crashesByYear = new Map<number, Map<string, number>>();
  const yearRange = getYearRange(crashInfo.fromYear, crashInfo.toYear);
  yearRange.forEach((year) =>
    crashesByYear.set(year, new Map(Object.entries(categoryCountMap))),
  );

  data.forEach((crash) => {
    const map = crashesByYear.get(crash.year);
    if (
      map &&
      !(
        crashInfo.neighborhood.value &&
        crashInfo.neighborhood.value !== crash.neighborhood
      )
    ) {
      map.forEach((value, key) => {
        map.set(key, value + crash[key]);
      });
    }
  });
  return crashesByYear;
}
