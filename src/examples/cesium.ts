//@ts-nocheck
import { FeatureSupportFeature } from '@/models/web-mapping/feature-support-feature.model';
import * as CesiumLib from 'cesium';

const exports: Record<FeatureSupportFeature, (this: CesiumLib.Viewer, Cesium: typeof CesiumLib, map: CesiumLib.Viewer) => void> = {
    [FeatureSupportFeature.KML]: loadKml,
    [FeatureSupportFeature.GEOJSON]: loadGeojson
} as Record<FeatureSupportFeature, (this: CesiumLib.Viewer, Cesium: typeof CesiumLib, map: CesiumLib.Viewer) => void>;

function loadKml(Cesium: typeof CesiumLib, map: CesiumLib.Viewer) {
    map.dataSources.add(Cesium.KmlDataSource.load('/assets/web-mapping/sample-data/simple-kml.kml'));
}

function loadGeojson(Cesium: typeof CesiumLib, map: CesiumLib.Viewer) {
    map.dataSources.add(Cesium.GeoJsonDataSource.load('/assets/web-mapping/sample-data/hungary_settlements.geojson'));
}

export default exports;
