import Map from "@arcgis/core/Map";
import FeatureEffect from "@arcgis/core/layers/support/FeatureEffect";
import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter";
import MapView from "@arcgis/core/views/MapView";
import { useEffect, useRef, useState, useCallback } from "react";
import { useAppSelector } from "../../hooks";
import {
  neighborhoodsGeoJson,
  penndotPoints,
  openDataPhillyPoints,
  stateRoadsGeoJson,
  schoolsGeoJson,
  recCentersGeoJson,
  trafficCalmingGeoJson,
} from "./consts";
import { constructFilterQuery } from "./utils";

function MapComp() {
  const [view, setView] = useState<MapView>(new MapView());
  const mapRef = useRef() as any;
  const filter = useAppSelector((state) => state.filter);

  const findAndGoToNeighborhood = useCallback(
    (neighborhood: string) => {
      neighborhoodsGeoJson
        .queryFeatures({
          outSpatialReference: view.extent.spatialReference,
          orderByFields: ["NAME"],
        })
        .then((result) => {
          const graphics = result.features;
          graphics.forEach((graphic) => {
            const { attributes } = graphic;
            if (attributes.name === neighborhood) {
              // temp hacky solution as goTo didn't consistently work without full zoom
              view
                .goTo(neighborhoodsGeoJson.fullExtent)
                .then(() => view.goTo(graphic));
            }
          });
        });
    },
    [view],
  );

  const centerMap = useCallback(() => {
    view.goTo(neighborhoodsGeoJson.fullExtent);
  }, [view]);

  /**
   * Create map and load crash data
   */
  useEffect(() => {
    const mainMap = new Map({
      layers: [
        neighborhoodsGeoJson,
        stateRoadsGeoJson,
        penndotPoints,
        openDataPhillyPoints,
        schoolsGeoJson,
        recCentersGeoJson,
        trafficCalmingGeoJson,
      ],
      basemap: "arcgis-topographic",
    });

    const mapView = new MapView({
      container: mapRef.current,
      map: mainMap,
      extent: {
        xmin: -8380590.75200715,
        ymin: 4845805.23524727,
        xmax: -8343846.66079948,
        ymax: 4886869.56369725,
        spatialReference: {
          wkid: 3857,
        },
      },
    });

    setView(mapView);
  }, []);

  /**
   * Filter points for non dataset filter updates
   */
  useEffect(() => {
    const query = constructFilterQuery(filter.crashInfo);

    penndotPoints.featureEffect = new FeatureEffect({
      filter: new FeatureFilter({
        where: query,
      }),
      excludedEffect: "grayscale(20%) opacity(8%)",
    });

    openDataPhillyPoints.featureEffect = new FeatureEffect({
      filter: new FeatureFilter({
        where: query,
      }),
      excludedEffect: "grayscale(20%) opacity(8%)",
    });
  }, [filter.crashInfo]);

  useEffect(() => {
    stateRoadsGeoJson.visible = filter.displayableInfo.stateRoads;
    schoolsGeoJson.visible = filter.displayableInfo.schoolsAndRec;
    recCentersGeoJson.visible = filter.displayableInfo.schoolsAndRec;
    trafficCalmingGeoJson.visible = filter.displayableInfo.trafficCalming;
    openDataPhillyPoints.visible = filter.displayableInfo.points;
    penndotPoints.visible = filter.displayableInfo.points;
  }, [filter.displayableInfo]);

  useEffect(() => {
    if (filter.crashInfo.neighborhood.value) {
      findAndGoToNeighborhood(filter.crashInfo.neighborhood.value);
    } else {
      centerMap();
    }
  }, [filter.crashInfo.neighborhood, findAndGoToNeighborhood, centerMap]);

  return <div className="mapDiv" ref={mapRef} />;
}

export default MapComp;
