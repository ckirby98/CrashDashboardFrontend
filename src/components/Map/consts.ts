import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import penndotJSON from "../../staticGeojson/penndot.json";
import neighborhoodsJSON from "../../staticGeojson/neighborhoods.json";
import schoolsJSON from "../../staticGeojson/schools.json";
import recCentersJSON from "../../staticGeojson/rec_centers.json";
import trafficCalmingJSON from "../../staticGeojson/traffic_calming_devices.json";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

export const clusterSymbol = {
  type: "simple-marker",
  style: "circle",
  color: "#69dcff",
  outline: {
    color: "rgba(0, 139, 174, 0.5)",
    width: 6,
  },
};

export const pedestrianFatalitySymbol = {
  type: "picture-marker",
  color: [10, 119, 40], // Orange
  // url: this._getAQHIIcon(attributes.AQHI),
  url: `${process.env.PUBLIC_URL}pedestrian_fatality.png`,
  contentType: "image/png",
  width: "23px",
  height: "23px",
};

export const cyclistFatalitySymbol = {
  type: "picture-marker",
  color: [10, 119, 40], // Orange
  // url: this._getAQHIIcon(attributes.AQHI),
  url: `${process.env.PUBLIC_URL}cyclist_fatality.png`,
  contentType: "image/png",
  width: "23px",
  height: "23px",
};

export const motorcyclistFatalitySymbol = {
  type: "picture-marker",
  color: [10, 119, 40], // Orange
  // url: this._getAQHIIcon(attributes.AQHI),
  url: `${process.env.PUBLIC_URL}motorcyclist_fatality.png`,
  contentType: "image/png",
  width: "23px",
  height: "23px",
};

export const motoristFatalitySymbol = {
  type: "picture-marker",
  color: [10, 119, 40], // Orange
  // url: this._getAQHIIcon(attributes.AQHI),
  url: `${process.env.PUBLIC_URL}motorist_fatality.png`,
  contentType: "image/png",
  width: "23px",
  height: "23px",
};

export const pedestrianInjurySymbol = {
  type: "picture-marker",
  color: [10, 119, 40], // Orange
  // url: this._getAQHIIcon(attributes.AQHI),
  url: `${process.env.PUBLIC_URL}pedestrian_injury.png`,
  contentType: "image/png",
  width: "19px",
  height: "19px",
};

export const cyclistInjurySymbol = {
  type: "picture-marker",
  color: [10, 119, 40], // Orange
  // url: this._getAQHIIcon(attributes.AQHI),
  url: `${process.env.PUBLIC_URL}cyclist_injury.png`,
  contentType: "image/png",
  width: "19px",
  height: "19px",
};

export const motorcyclistInjurySymbol = {
  type: "picture-marker",
  color: [10, 119, 40], // Orange
  // url: this._getAQHIIcon(attributes.AQHI),
  url: `${process.env.PUBLIC_URL}motorcyclist_injury.png`,
  contentType: "image/png",
  width: "19px",
  height: "19px",
};

export const motoristInjurySymbol = {
  type: "picture-marker",
  color: [10, 119, 40], // Orange
  // url: this._getAQHIIcon(attributes.AQHI),
  url: `${process.env.PUBLIC_URL}motorist_injury.png`,
  contentType: "image/png",
  width: "23px",
  height: "23px",
};

export const schoolSymbol = {
  type: "picture-marker",
  color: [10, 119, 40], // Orange
  // url: this._getAQHIIcon(attributes.AQHI),
  url: `${process.env.PUBLIC_URL}school.png`,
  contentType: "image/png",
  width: "20px",
  height: "20px",
};

export const recCenterSymbol = {
  type: "picture-marker",
  color: [10, 119, 40], // Orange
  // url: this._getAQHIIcon(attributes.AQHI),
  url: `${process.env.PUBLIC_URL}rec_center.png`,
  contentType: "image/png",
  width: "20px",
  height: "20px",
};

export const trafficCalmingSymbol = {
  type: "picture-marker",
  color: [10, 119, 40], // Orange
  // url: this._getAQHIIcon(attributes.AQHI),
  url: `${process.env.PUBLIC_URL}traffic_calming.png`,
  contentType: "image/png",
  width: "20px",
  height: "20px",
};

const simpleFillSymbol = new SimpleFillSymbol({
  color: [197, 208, 224, 0.3],
  style: "solid",
  outline: {
    color: "black",
    width: 1,
  },
});

const simpleFillSymbolTract = new SimpleFillSymbol({
  color: [255, 153, 153, 0.3],
  style: "none",
  outline: {
    color: "yellow",
    width: 0.5,
  },
});

const simpleRoadLine = new SimpleLineSymbol({
  width: "4px",
  style: "solid",
  color: [85, 106, 243, 0.8],
});

export const tractRenderer = new SimpleRenderer({
  symbol: simpleFillSymbolTract,
});

export const neighborhoodRenderer = new SimpleRenderer({
  symbol: simpleFillSymbol,
});

export const stateRoadRenderer = new SimpleRenderer({
  symbol: simpleRoadLine,
});

export const schoolsRenderer = new SimpleRenderer({
  symbol: schoolSymbol,
});

export const recCentersRenderer = new SimpleRenderer({
  symbol: recCenterSymbol,
});

export const trafficCalmingRenderer = new SimpleRenderer({
  symbol: trafficCalmingSymbol,
});

// const neighborhodTemplate = {
//   title: "{mapname}",
// };

const neighborhoodsBlob = new Blob([JSON.stringify(neighborhoodsJSON)], {
  type: "application/json",
});

const penndotBlob = new Blob([JSON.stringify(penndotJSON)], {
  type: "application/json",
});

const schoolsBlob = new Blob([JSON.stringify(schoolsJSON)], {
  type: "application/json",
});

const recCentersBlob = new Blob([JSON.stringify(recCentersJSON)], {
  type: "application/json",
});

const trafficCalmingBlob = new Blob([JSON.stringify(trafficCalmingJSON)], {
  type: "application/json",
});

const neighborhoodsUrl = URL.createObjectURL(neighborhoodsBlob);
const penndotUrl = URL.createObjectURL(penndotBlob);
const schoolsUrl = URL.createObjectURL(schoolsBlob);
const recCentersUrl = URL.createObjectURL(recCentersBlob);
const trafficCalmingUrl = URL.createObjectURL(trafficCalmingBlob);

export const neighborhoodsGeoJson: GeoJSONLayer = new GeoJSONLayer({
  url: neighborhoodsUrl,
  renderer: neighborhoodRenderer,
  // popupTemplate: neighborhodTemplate,
});

export const stateRoadsGeoJson: GeoJSONLayer = new GeoJSONLayer({
  url: `${baseUrl}/geojson/?name=philadelphia_state_roads`,
  renderer: stateRoadRenderer,
});

export const schoolsGeoJson: GeoJSONLayer = new GeoJSONLayer({
  url: schoolsUrl,
  renderer: schoolsRenderer,
  popupTemplate: {
    title: "{SCHOOL_NAME}",
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "TYPE_SPECIFIC",
            label: "Type",
          },
          {
            fieldName: "GRADE_LEVEL",
            label: "Grade Level",
          },
          {
            fieldName: "STREET_ADDRESS",
            label: "Street Address",
          },
        ],
      },
    ],
  },
});

export const recCentersGeoJson: GeoJSONLayer = new GeoJSONLayer({
  url: recCentersUrl,
  renderer: recCentersRenderer,
  popupTemplate: {
    title: "{PARK_NAME}",
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "COMMENTS",
            label: "Comments",
          },
          {
            fieldName: "PROGRAM_TYPE",
            label: "TYPE",
          },
        ],
      },
    ],
  },
});

export const trafficCalmingGeoJson: GeoJSONLayer = new GeoJSONLayer({
  url: trafficCalmingUrl,
  renderer: trafficCalmingRenderer,
  popupTemplate: {
    title: "{id}",
  },
});

export const uniqueValueRenderer = new UniqueValueRenderer({
  // field: "mode",
  field: "category",
  uniqueValueGroups: [
    {
      heading: "Heading 1",
      // All features with value of "North" will be blue
      classes: [
        {
          label: "Pedestrian Fatality",
          symbol: pedestrianFatalitySymbol,
          values: "pedestrian_fatality",
        },
        {
          label: "Pedestrian Injury",
          symbol: pedestrianInjurySymbol,
          values: "pedestrian_injury",
        },
        {
          label: "Cyclist Fatality",
          symbol: cyclistFatalitySymbol,
          values: "cyclist_fatality",
        },
        {
          label: "Cyclist Injury",
          symbol: cyclistInjurySymbol,
          values: "cyclist_injury",
        },
        {
          label: "Motorcyclist Injury",
          symbol: motorcyclistInjurySymbol,
          values: "motorcyclist_injury",
        },
        {
          label: "Motorcyclist Fatality",
          symbol: motorcyclistFatalitySymbol,
          values: "motorcyclist_fatality",
        },
        {
          label: "Motorist Injury",
          symbol: motoristInjurySymbol,
          values: "motorist_injury",
        },
        {
          label: "Motorist Fatality",
          symbol: motoristFatalitySymbol,
          values: "motorist_fatality",
        },
      ],
    },
  ],
});

export const penndotPoints: GeoJSONLayer = new GeoJSONLayer({
  url: penndotUrl,
  // featureReduction: clusterConfig,
  outFields: ["*"],
  popupTemplate: {
    title: "{severity}",
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "date",
            label: "Date",
          },
          {
            fieldName: "id",
            label: "ID",
          },
          {
            fieldName: "neighborhood",
            label: "Neighborhood",
          },
          {
            fieldName: "modes",
            label: "Modes",
          },
          {
            fieldName: "total_deaths",
            label: "Total Deaths",
          },
          {
            fieldName: "total_injuries",
            label: "Total Injuries",
          },
          {
            fieldName: "pedestrian_fatality_count",
            label: "Pedestrian Deaths",
          },
          {
            fieldName: "pedestrian_injury_count",
            label: "Pedestrian Injuries",
          },
          {
            fieldName: "cyclist_fatality_count",
            label: "Cyclist Deaths",
          },
          {
            fieldName: "cyclist_injury_count",
            label: "Cyclist Injuries",
          },
          {
            fieldName: "motorcyclist_fatality_count",
            label: "Motorcyclist Deaths",
          },
          {
            fieldName: "motorcyclist_injury_count",
            label: "Motorcyclist Injuries",
          },
          {
            fieldName: "motorist_fatality_count",
            label: "Motorist Deaths",
          },
          {
            fieldName: "motorist_injury_count",
            label: "Motorist Injuries",
          },
        ],
      },
    ],
  },
  renderer: uniqueValueRenderer,
});

export const openDataPhillyPoints: GeoJSONLayer = new GeoJSONLayer({
  url: `${baseUrl}/geojson/?name=opendataphilly`,
  // featureReduction: clusterConfig,
  outFields: ["*"],
  popupTemplate: {
    title: "{severity}",
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "date",
            label: "Date",
          },
          {
            fieldName: "id",
            label: "ID",
          },
          {
            fieldName: "neighborhood",
            label: "Neighborhood",
          },
          {
            fieldName: "modes",
            label: "Modes",
          },
          {
            fieldName: "veh1",
            label: "Vehicle 1",
          },
          {
            fieldName: "veh2",
            label: "Vehicle 2",
          },
          {
            fieldName: "total_deaths",
            label: "Total Deaths",
          },
          {
            fieldName: "total_injuries",
            label: "Total Injuries",
          },
          {
            fieldName: "pedestrian_fatality_count",
            label: "Pedestrian Deaths",
          },
          {
            fieldName: "pedestrian_injury_count",
            label: "Pedestrian Injuries",
          },
          {
            fieldName: "cyclist_fatality_count",
            label: "Cyclist Deaths",
          },
          {
            fieldName: "cyclist_injury_count",
            label: "Cyclist Injuries",
          },
          {
            fieldName: "motorcyclist_fatality_count",
            label: "Motorcyclist Deaths",
          },
          {
            fieldName: "motorcyclist_injury_count",
            label: "Motorcyclist Injuries",
          },
          {
            fieldName: "motorist_fatality_count",
            label: "Motorist Deaths",
          },
          {
            fieldName: "motorist_injury_count",
            label: "Motorist Injuries",
          },
        ],
      },
    ],
  },
  renderer: uniqueValueRenderer,
});
