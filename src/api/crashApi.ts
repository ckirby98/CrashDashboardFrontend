import axios, { AxiosResponse } from "axios";
import { Crash } from "../types";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

export default async function getCrashes(
  dataset: string,
  fromYear: string,
  toYear: string,
) {
  const response: AxiosResponse<Crash[]> = await axios.get(
    `${baseUrl}/crash/${dataset}`,
    { params: { from: fromYear, to: toYear } },
  );
  return response.data;
}
