import { FatalityTotals } from "../../../types";
import modeColorMap from "./consts";

function getBarCategories(totals: FatalityTotals) {
  return [
    ...(totals.pedestrian
      ? [
          {
            mode: "Pedestrian",
            color: modeColorMap.get("pedestrian"),
            widthPercentage: totals.pedestrian / totals.total,
          },
        ]
      : []),
    ...(totals.cyclist
      ? [
          {
            mode: "Cyclist",
            color: modeColorMap.get("cyclist"),
            widthPercentage: totals.cyclist / totals.total,
          },
        ]
      : []),
    ...(totals.motorcyclist
      ? [
          {
            mode: "Motorcyclist",
            color: modeColorMap.get("motorcyclist"),
            widthPercentage: totals.motorcyclist / totals.total,
          },
        ]
      : []),
    ...(totals.motorist
      ? [
          {
            mode: "Motorist",
            color: modeColorMap.get("motorist"),
            widthPercentage: totals.motorist / totals.total,
          },
        ]
      : []),
  ];
}

export default getBarCategories;
