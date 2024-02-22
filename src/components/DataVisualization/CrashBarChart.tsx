import { useCallback } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useAppSelector } from "../../hooks";
import { getCrashTypeTotalsByYear } from "./utils";

interface ChartYear {
  name: string;
  pedestrian_fatality_count?: number;
  pedestrian_injury_count?: number;
  cyclist_fatality_count?: number;
  cyclist_injury_count?: number;
  motorcyclist_fatality_count?: number;
  motorcyclist_injury_count?: number;
  motorist_fatality_count?: number;
  motorist_injury_count?: number;
  total: number;
}

function CrashBarChart() {
  const data = useAppSelector((state) => state.data);
  const crashInfo = useAppSelector((state) => state.filter.crashInfo);

  const getChartData = useCallback(() => {
    const crashTypeTotalsByYear = getCrashTypeTotalsByYear(
      crashInfo.dataset === "PennDOT"
        ? data.penndotCrashes
        : data.openDataPhillyCrashes,
      crashInfo,
    );

    const crashesByYear: ChartYear[] = [];

    crashTypeTotalsByYear.forEach((value, key) => {
      const total = Object.values(value).reduce((acc, val) => acc + val, 0);
      crashesByYear.push({
        name: key.toString(),
        pedestrian_fatality_count: value.get("pedestrian_fatality_count"),
        pedestrian_injury_count: value.get("pedestrian_injury_count"),
        cyclist_fatality_count: value.get("cyclist_fatality_count"),
        cyclist_injury_count: value.get("cyclist_injury_count"),
        motorcyclist_fatality_count: value.get("motorcyclist_fatality_count"),
        motorcyclist_injury_count: value.get("motorcyclist_injury_count"),
        motorist_fatality_count: value.get("motorist_fatality_count"),
        motorist_injury_count: value.get("motorist_injury_count"),
        total,
      });
    });
    return crashesByYear;
  }, [data, crashInfo]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={getChartData()}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {crashInfo.pedestrians && crashInfo.fatalities && (
          <Bar
            dataKey="pedestrian_fatality_count"
            name="Pedestrian Fatalities"
            stackId="a"
            fill="#996e4b"
          />
        )}
        {crashInfo.pedestrians && crashInfo.majorInjuries && (
          <Bar
            dataKey="pedestrian_injury_count"
            name="Pedestrian Injuries"
            stackId="a"
            fill="#E5BFA0"
          />
        )}
        {crashInfo.cyclists && crashInfo.fatalities && (
          <Bar
            dataKey="cyclist_fatality_count"
            name="Cyclist Fatalities"
            stackId="a"
            fill="#3a607a"
          />
        )}
        {crashInfo.cyclists && crashInfo.majorInjuries && (
          <Bar
            dataKey="cyclist_injury_count"
            name="Cyclist Injuries"
            stackId="a"
            fill="#9AC2DE"
          />
        )}
        {crashInfo.motorcyclists && crashInfo.fatalities && (
          <Bar
            dataKey="motorcyclist_fatality_count"
            name="Motorcyclist Fatalities"
            stackId="a"
            fill="#345c5c"
          />
        )}
        {crashInfo.motorcyclists && crashInfo.majorInjuries && (
          <Bar
            dataKey="motorcyclist_injury_count"
            name="Motorcyclist Injuries"
            stackId="a"
            fill="#82A6A6"
          />
        )}
        {crashInfo.motorists && crashInfo.fatalities && (
          <Bar
            dataKey="motorist_fatality_count"
            name="Motorist Fatalities"
            stackId="a"
            fill="#4f578c"
          />
        )}
        {crashInfo.motorists && crashInfo.majorInjuries && (
          <Bar
            dataKey="motorist_injury_count"
            name="Motorist Injuries"
            stackId="a"
            fill="#AEB5E0"
          />
        )}
      </BarChart>
    </ResponsiveContainer>
  );
}

export default CrashBarChart;
