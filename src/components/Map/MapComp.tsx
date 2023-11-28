import Map from "@arcgis/core/Map";
import FeatureEffect from "@arcgis/core/layers/support/FeatureEffect";
import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter";
import MapView from "@arcgis/core/views/MapView";
import { useEffect, useRef, useState, useCallback } from "react";
import { useAppSelector } from "../../hooks";
import {
  neighborhoodsGeoJson,
  openDataPhillyPoints,
  penndotPoints,
} from "./consts";
import { constructFilterQuery } from "./utils";

function MapComp() {
  const [view, setView] = useState<MapView>(new MapView());
  const mapRef = useRef() as any;
  const filter = useAppSelector((state) => state.filter);

  const findAndGoToNeighborhood = useCallback((neighborhood: string) => {
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
  }, [neighborhoodsGeoJson, view]);

  // function changeCursor(response: __esri.HitTestResult) {
  //   if (response.results.length > 1) {
  //     mapRef.current.style.cursor = "pointer";
  //   } else {
  //     mapRef.current.style.cursor = "default";
  //   }
  // }

  // function getGraphics(response: __esri.HitTestResult) {
  //   view.graphics.removeAll();
  //   let type = "";
  //   let hoveredGraphic: Graphic = new Graphic();

  //   for (const result of response.results) {
  //     if (result.type === "graphic") {
  //       const { graphic } = result;
  //       if (!graphic.attributes.layerId) {
  //         if (graphic.attributes.id) {
  //           type = "Crash";
  //           hoveredGraphic = graphic;
  //           break;
  //         }
  //         if (graphic.attributes.__OBJECTID) {
  //           hoveredGraphic = graphic;
  //           type = "Neighborhood";
  //         }
  //       }
  //     }
  //   }
  //   if (type === "Neighborhood") {
  //     view.graphics.remove(hoveredGraphic);
  //     view.graphics.add(hoveredGraphic);
  //   }
  //   if (type === "Crash") {
  //     view.graphics.remove(hoveredGraphic);
  //     view.graphics.add(hoveredGraphic);
  //   }
  // }

  const centerMap = useCallback(() => {
    view.goTo(neighborhoodsGeoJson.fullExtent);
  }, [neighborhoodsGeoJson])

  /**
   * Create map and load crash data
   */
  useEffect(() => {
    const mainMap = new Map({
      layers: [neighborhoodsGeoJson, penndotPoints, openDataPhillyPoints],
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
    const fromYear = parseInt(filter.fromYear, 10);
    const toYear = parseInt(filter.toYear, 10);

    const query = constructFilterQuery(
      fromYear,
      toYear,
      filter.cyclists,
      filter.pedestrians,
      filter.motorcyclists,
      filter.motorists,
      filter.fatalities,
      filter.majorInjuries,
      filter.dataset,
      filter.neighborhood.value,
    );

    penndotPoints.featureEffect = new FeatureEffect({
      filter: new FeatureFilter({
        where: query,
      }),
      excludedEffect: "opacity(0%)",
      excludedLabelsVisible: false,
    });

    openDataPhillyPoints.featureEffect = new FeatureEffect({
      filter: new FeatureFilter({
        where: query,
      }),
      excludedEffect: "opacity(0%)",
      excludedLabelsVisible: false,
    });
  }, [
    filter.fromYear,
    filter.toYear,
    filter.cyclists,
    filter.pedestrians,
    filter.motorcyclists,
    filter.motorists,
    filter.fatalities,
    filter.majorInjuries,
    filter.neighborhood,
    filter.dataset,
  ]);

  useEffect(() => {
    if (filter.neighborhood.value) {
      findAndGoToNeighborhood(filter.neighborhood.value);
    } else {
      centerMap();
    }
  }, [filter.neighborhood]);

  // neighborhoodsGeoJson.on("mouse-over", function(evt){

  // })

  // view.when(function () {
  //   view.whenLayerView(neighborhoodsGeoJson).then(function (lview) {
  //     reactiveUtils.when(
  //       () => !lview.updating,
  //       () => {
  // 			// Set up a click event handler and retrieve the screen x, y coordinates
  // 			view.on("pointer-move", function (evt) {
  // 				var screenPoint = {
  // 					x: evt.x,
  // 					y: evt.y
  // 				};
  //         lview.highlight
  // 				lview.hitTest(screenPoint)
  // 				.then(function (response) {
  // 				  changeCursor(response);
  // 				  getGraphics(response);
  // 				});
  // 			});
  //       },
  //     );
  //   });
  // });

  return <div className="mapDiv" ref={mapRef} />;
}

export default MapComp;
