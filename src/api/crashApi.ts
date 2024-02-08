import axios, { AxiosResponse } from "axios";
import { Crash, FilterState } from "../types";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

13

const downloadFile = (file) => {
  const url = window.URL.createObjectURL(new Blob([file]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', "yourfilename.csv");
  document.body.appendChild(link);
  link.click();
  link.remove();
}


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

export async function getReport(
  filter: FilterState
) {
  var params = new URLSearchParams();
  if (filter.pedestrians) params.append("modes", "pedestrian");
  if (filter.cyclists) params.append("modes", "cyclist");
  if (filter.motorcyclists) params.append("modes", "motorcyclist");
  if (filter.motorists) params.append("modes", "motorist");
  if (filter.fatalities) params.append("severities", "fatality");
  if (filter.majorInjuries) params.append("severities", "injury");
  params.append("from", filter.fromYear);
  params.append("to", filter.toYear);

  const response = await axios.get(
    `${baseUrl}/crash/report`,
    { params: params, responseType: 'blob' },
  );
  debugger;
  const file = response.data;
  downloadFile(file);
}

