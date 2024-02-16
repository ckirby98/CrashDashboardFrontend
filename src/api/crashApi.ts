import axios, { AxiosResponse } from "axios";
import { Crash, FilterState } from "../types";
import getOutputFilename from "./utils";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const downloadFile = (file: BlobPart, fileName: string) => {
  const url = window.URL.createObjectURL(new Blob([file]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${fileName}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export async function getCrashes(
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

export async function getReport(filter: FilterState) {
  const params = new URLSearchParams();
  if (filter.pedestrians) params.append("modes", "pedestrian");
  if (filter.cyclists) params.append("modes", "cyclist");
  if (filter.motorcyclists) params.append("modes", "motorcyclist");
  if (filter.motorists) params.append("modes", "motorist");
  if (filter.fatalities) params.append("severities", "fatality");
  if (filter.majorInjuries) params.append("severities", "injury");
  params.append("from", filter.fromYear);
  params.append("to", filter.toYear);

  const response = await axios.get(`${baseUrl}/crash/report`, {
    params,
    responseType: "blob",
  });
  const file = response.data;
  const fileName = getOutputFilename(filter);
  downloadFile(file, fileName);
}
