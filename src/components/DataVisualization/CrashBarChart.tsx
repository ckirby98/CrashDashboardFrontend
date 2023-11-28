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
  const filter = useAppSelector((state) => state.filter);

  const getChartData = useCallback(() => {
    const crashTypeTotalsByYear = getCrashTypeTotalsByYear(
      filter.dataset === "PennDOT"
        ? data.penndotCrashes
        : data.openDataPhillyCrashes,
      filter,
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
  }, [data, filter]);

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
        {filter.pedestrians && filter.fatalities && (
          <Bar
            dataKey="pedestrian_fatality_count"
            name="Pedestrian Fatalities"
            stackId="a"
            fill="#996e4b"
          />
        )}
        {filter.pedestrians && filter.majorInjuries && (
          <Bar
            dataKey="pedestrian_injury_count"
            name="Pedestrian Injuries"
            stackId="a"
            fill="#E5BFA0"
          />
        )}
        {filter.cyclists && filter.fatalities && (
          <Bar
            dataKey="cyclist_fatality_count"
            name="Cyclist Fatalities"
            stackId="a"
            fill="#3a607a"
          />
        )}
        {filter.cyclists && filter.majorInjuries && (
          <Bar
            dataKey="cyclist_injury_count"
            name="Cyclist Injuries"
            stackId="a"
            fill="#9AC2DE"
          />
        )}
        {filter.motorcyclists && filter.fatalities && (
          <Bar
            dataKey="motorcyclist_fatality_count"
            name="Motorcyclist Fatalities"
            stackId="a"
            fill="#345c5c"
          />
        )}
        {filter.motorcyclists && filter.majorInjuries && (
          <Bar
            dataKey="motorcyclist_injury_count"
            name="Motorcyclist Injuries"
            stackId="a"
            fill="#82A6A6"
          />
        )}
        {filter.motorists && filter.fatalities && (
          <Bar
            dataKey="motorist_fatality_count"
            name="Motorist Fatalities"
            stackId="a"
            fill="#4f578c"
          />
        )}
        {filter.motorists && filter.majorInjuries && (
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
