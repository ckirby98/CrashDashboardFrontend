import { FilterState } from "../types";

export default function getOutputFilename(filter: FilterState) {
  const today = new Date().toISOString().substring(0, 10);
  const modes = [
    ...(filter.pedestrians ? ["PE"] : []),
    ...(filter.cyclists ? ["CY"] : []),
    ...(filter.motorcyclists ? ["MC"] : []),
    ...(filter.motorists ? ["MO"] : []),
  ];
  const severities = [
    ...(filter.fatalities ? ["FAT"] : []),
    ...(filter.majorInjuries ? ["INJ"] : []),
  ];
  return `crash_report_${today} ${severities.join("-")} ${modes.join("-")}`;
}
