import Graphic from "@arcgis/core/Graphic";
import { FilterState, NeighborhoodDictionary } from "../../types";

export const createNeighborhoodCrashFrequencyDict = (points: Graphic[]) => {
  const dict: NeighborhoodDictionary = {};
  points.forEach((point) => {
    const { neighborhood } = point.attributes;
    if (neighborhood in dict) {
      dict[neighborhood] += 1;
    } else {
      dict[neighborhood] = 1;
    }
  });
  return dict;
};

export const constructFilterQuery = (filter: FilterState) => {
  const {
    pedestrians,
    cyclists,
    motorcyclists,
    motorists,
    dataset,
    neighborhood,
    fatalities,
    majorInjuries,
    fromYear,
    toYear,
  } = filter;
  const fromYearParsed = parseInt(fromYear, 10);
  const toYearParsed = parseInt(toYear, 10);
  let query = "";

  function addClause(clause: string, condition: string) {
    if (query.length === 0) {
      query += clause;
    } else if (condition === "NONE") {
      query += clause;
    } else {
      query += ` ${condition} ${clause}`;
    }
  }

  addClause(`id ${dataset === "PennDOT" ? ">" : "<"} 1000000`, "AND");
  addClause(`year >= ${fromYearParsed}`, "AND");
  addClause(`year <= ${toYearParsed}`, "AND");

  if (neighborhood.value) {
    addClause(`neighborhood = '${neighborhood.value}'`, "AND");
  }

  const modes = [];

  if (pedestrians) modes.push("pedestrian");
  if (cyclists) modes.push("cyclist");
  if (motorcyclists) modes.push("motorcyclist");
  if (motorists) modes.push("motorist");

  query += " AND (";

  modes.forEach((mode) => {
    if (fatalities) {
      addClause(
        `${mode}_fatality_count > 0`,
        query.slice(-1) === "(" ? "NONE" : "OR",
      );
    }
    if (majorInjuries) {
      addClause(
        `${mode}_injury_count > 0`,
        query.slice(-1) === "(" ? "NONE" : "OR",
      );
    }
  });
  query += ")";
  return query;
};
