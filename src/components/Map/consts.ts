import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";

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
  url: `${baseUrl}/image?type=pedestrian_fatality`,
  contentType: "image/png",
  width: "23px",
  height: "23px",
};

export const cyclistFatalitySymbol = {
  type: "picture-marker",
  color: [10, 119, 40], // Orange
  // url: this._getAQHIIcon(attributes.AQHI),
  url: `${baseUrl}/image?type=cyclist_fatality`,
  contentType: "image/png",
  width: "23px",
  height: "23px",
};

export const motorcyclistFatalitySymbol = {
  type: "picture-marker",
  color: [10, 119, 40], // Orange
  // url: this._getAQHIIcon(attributes.AQHI),
  url: `${baseUrl}/image?type=motorcyclist_fatality`,
  contentType: "image/png",
  width: "23px",
  height: "23px",
};

export const motoristFatalitySymbol = {
  type: "picture-marker",
  color: [10, 119, 40], // Orange
  // url: this._getAQHIIcon(attributes.AQHI),
  url: `${baseUrl}/image?type=motorist_fatality`,
  contentType: "image/png",
  width: "23px",
  height: "23px",
};

export const pedestrianInjurySymbol = {
  type: "picture-marker",
  color: [10, 119, 40], // Orange
  // url: this._getAQHIIcon(attributes.AQHI),
  url: `${baseUrl}/image?type=pedestrian_injury`,
  contentType: "image/png",
  width: "19px",
  height: "19px",
};

export const cyclistInjurySymbol = {
  type: "picture-marker",
  color: [10, 119, 40], // Orange
  // url: this._getAQHIIcon(attributes.AQHI),
  url: `${baseUrl}/image?type=cyclist_injury`,
  contentType: "image/png",
  width: "19px",
  height: "19px",
};

export const motorcyclistInjurySymbol = {
  type: "picture-marker",
  color: [10, 119, 40], // Orange
  // url: this._getAQHIIcon(attributes.AQHI),
  url: `${baseUrl}/image?type=motorcyclist_injury`,
  contentType: "image/png",
  width: "19px",
  height: "19px",
};

export const motoristInjurySymbol = {
  type: "picture-marker",
  color: [10, 119, 40], // Orange
  // url: this._getAQHIIcon(attributes.AQHI),
  url: `${baseUrl}/image?type=motorist_injury`,
  contentType: "image/png",
  width: "23px",
  height: "23px",
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

export const tractRenderer = new SimpleRenderer({
  symbol: simpleFillSymbolTract,
});

export const neighborhoodRenderer = new SimpleRenderer({
  symbol: simpleFillSymbol,
});

const template = {
  title: "{mapname}",
  content:
    "<a href='http://localhost:3000/report/{name}'>Neigborhood Report</a>",
};

export const neighborhoodsGeoJson: GeoJSONLayer = new GeoJSONLayer({
  url: `${baseUrl}/neighborhoods`,
  renderer: neighborhoodRenderer,
  popupTemplate: template,
});

// const less10 = {
//   type: "simple-marker",
//   color: "#f0ff00",
//   outline: {
//     color: "rgba(153, 31, 23, 0.3)",
//     width: 0.3,
//   },
// };

// const less25 = {
//   type: "simple-marker",
//   color: "#ffce00",
//   outline: {
//     color: "rgba(153, 31, 23, 0.3)",
//     width: 0.3,
//   },
// };

// const more25 = {
//   type: "simple-marker",
//   color: "#ff9a00",
//   outline: {
//     color: "rgba(153, 31, 23, 0.3)",
//     width: 0.3,
//   },
// };

// const more50 = {
//   type: "simple-marker",
//   color: "#ff5a00",
//   outline: {
//     color: "rgba(153, 31, 23, 0.3)",
//     width: 0.3,
//   },
// };

// const more100 = {
//   type: "simple-marker",
//   color: "#ff0000",
//   outline: {
//     color: "rgba(153, 31, 23, 0.3)",
//     width: 0.3,
//   },
// };

// const classBreaksRenderer = new ClassBreaksRenderer({
//   field: "cluster_count", // total number of adults (25+) with a college degree
//   defaultLabel: "no data", // legend label for features that don't match a class break
//   classBreakInfos: [
//     {
//       minValue: 1,
//       maxValue: 9,
//       symbol: less10,
//       label: "< 10", // label for symbol in legend
//     },
//     {
//       minValue: 10,
//       maxValue: 24,
//       symbol: less25,
//       label: "11 - 24", // label for symbol in legend
//     },
//     {
//       minValue: 25,
//       maxValue: 49,
//       symbol: more25,
//       label: "25 - 49", // label for symbol in legend
//     },
//     {
//       minValue: 50,
//       maxValue: 99,
//       symbol: more50,
//       label: "50 - 99", // label for symbol in legend
//     },
//     {
//       minValue: 100,
//       maxValue: 100000,
//       symbol: more100,
//       label: "100+", // label for symbol in legend
//     },
//   ],
// });

// const clusterConfig = new FeatureReductionCluster({
//   fields: [
//     new AggregateField({
//       name: "SUM_INCIDENTS",
//       onStatisticField: "total_incidents", // layer field
//       statisticType: "sum",
//     }),
//   ],
//   clusterRadius: "80px",
//   popupTemplate: {
//     title: "Cluster summary",
//     content: "This cluster represents {cluster_count} earthquakes.",
//     fieldInfos: [
//       {
//         fieldName: "cluster_count",
//         format: {
//           places: 0,
//           digitSeparator: true,
//         },
//       },
//     ],
//   },
//   clusterMinSize: "24px",
//   clusterMaxSize: "60px",
//   renderer: classBreaksRenderer,
//   labelingInfo: [
//     {
//       deconflictionStrategy: "none",
//       labelExpressionInfo: {
//         expression: "Text($feature.cluster_count, '#,###')",
//       },
//       symbol: {
//         type: "text",
//         color: "#004a5d",
//         font: {
//           weight: "bold",
//           family: "Noto Sans",
//           size: "12px",
//         },
//       },
//       labelPlacement: "center-center",
//     },
//   ],
// });

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
  url: `${baseUrl}/penndot_geo`,
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
  url: `${baseUrl}/opendataphilly_geo`,
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

export const tractsGeoJson: GeoJSONLayer = new GeoJSONLayer({
  url: `${baseUrl}/tracts`,
  renderer: tractRenderer,
});
