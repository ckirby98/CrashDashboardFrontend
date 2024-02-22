import { FilterCrashInfo } from "../types";

export default function getOutputFilename(crashInfo: FilterCrashInfo) {
  const today = new Date().toISOString().substring(0, 10);
  const modes = [
    ...(crashInfo.pedestrians ? ["PE"] : []),
    ...(crashInfo.cyclists ? ["CY"] : []),
    ...(crashInfo.motorcyclists ? ["MC"] : []),
    ...(crashInfo.motorists ? ["MO"] : []),
  ];
  const severities = [
    ...(crashInfo.fatalities ? ["FAT"] : []),
    ...(crashInfo.majorInjuries ? ["INJ"] : []),
  ];
  return `crash_report_${today} ${severities.join("-")} ${modes.join("-")}`;
}
