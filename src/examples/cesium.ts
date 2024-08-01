//@ts-nocheck
import { FeatureSupportFeature } from '@/models/web-mapping/feature-support-feature.model';
import * as CesiumLib from 'cesium';

const exports: Record<FeatureSupportFeature, (this: CesiumLib.Viewer, Cesium: typeof CesiumLib, map: CesiumLib.Viewer) => void> = {
    [FeatureSupportFeature.KML]: loadKml,
    [FeatureSupportFeature.GEOJSON]: loadGeojson,
    [FeatureSupportFeature.WMS]: readWms,
    [FeatureSupportFeature.WMTS]: readWmts,
    [FeatureSupportFeature.XYZ]: readSlippy
} as Record<FeatureSupportFeature, (this: CesiumLib.Viewer, Cesium: typeof CesiumLib, map: CesiumLib.Viewer) => void>;

function loadKml(Cesium: typeof CesiumLib, map: CesiumLib.Viewer) {
    map.dataSources.add(Cesium.KmlDataSource.load('/assets/web-mapping/sample-data/simple-kml.kml'));
}

function loadGeojson(Cesium: typeof CesiumLib, map: CesiumLib.Viewer) {
    map.dataSources.add(Cesium.GeoJsonDataSource.load('/assets/web-mapping/sample-data/hungary_settlements.geojson'));
}

function readWms(Cesium: typeof CesiumLib, map: CesiumLib.Viewer) {
    map.imageryLayers.addImageryProvider(new Cesium.WebMapServiceImageryProvider({
        url: 'https://img.nj.gov/imagerywms/Natural2015',
        layers: 'Natural2015',
        parameters: {
            format: 'image/png',
            transparent: true
        }
    }));

    const center = Cesium.Cartesian3.fromDegrees(-74.88, 40.16);
    map.camera.lookAt(center, new Cesium.Cartesian3(0, 0, 100000));
}

function readWmts(Cesium: typeof CesiumLib, map: CesiumLib.Viewer) {
    map.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
        url: 'https://mrdata.usgs.gov/mapcache/wmts',
        layer: 'sgmc2',
        style: 'default',
        format: 'image/png',
        tileMatrixSetID: 'GoogleMapsCompatible',
        credit: new Cesium.Credit('Tiles © <a href="https://mrdata.usgs.gov/geology/state/" target="_blank">USGS</a>')
    }));

    const center = Cesium.Cartesian3.fromDegrees(-99, 40);
    map.camera.lookAt(center, new Cesium.Cartesian3(0, 0, 3500000));
}

function readSlippy(Cesium: typeof CesiumLib, map: CesiumLib.Viewer) {
    map.imageryLayers.addImageryProvider(new Cesium.OpenStreetMapImageryProvider({
        url: 'http://a.basemaps.cartocdn.com/light_all',
        credit: new Cesium.Credit('Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL')
    }));
}

export default exports;
