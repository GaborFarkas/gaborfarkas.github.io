//@ts-nocheck
import { environment } from '@/environments/environment';
import { FeatureSupportFeature } from '@/models/web-mapping/feature-support-feature.model';
import * as CesiumLib from 'cesium';

const exports: Record<FeatureSupportFeature, (this: CesiumLib.Viewer, Cesium: typeof CesiumLib, map: CesiumLib.Viewer) => void> = {
    [FeatureSupportFeature.KML]: loadKml,
    [FeatureSupportFeature.GEOJSON]: loadGeojson,
    [FeatureSupportFeature.WMS]: readWms,
    [FeatureSupportFeature.WMTS]: readWmts,
    [FeatureSupportFeature.XYZ]: readSlippy,
    [FeatureSupportFeature.GOOGLE]: readGoogle,
    [FeatureSupportFeature.ARCGIS]: readArcgis,
    [FeatureSupportFeature.ONTHEFLYPROJ]: loadGeojson,
    [FeatureSupportFeature.READATTRIB]: readAttribs,
    [FeatureSupportFeature.ZCOORDS]: zCoords,
    [FeatureSupportFeature.OVERLAY]: textBox
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

    map.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(-74.88, 40.16, 150000)
    });
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

    map.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(-99, 40, 4000000)
    });
}

function readSlippy(Cesium: typeof CesiumLib, map: CesiumLib.Viewer) {
    map.imageryLayers.addImageryProvider(new Cesium.OpenStreetMapImageryProvider({
        url: 'http://a.basemaps.cartocdn.com/light_all',
        credit: new Cesium.Credit('Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL')
    }));
}

async function readGoogle(Cesium: typeof CesiumLib, map: CesiumLib.Viewer) {
    const tileset = await Cesium.createGooglePhotorealistic3DTileset();
    map.scene.primitives.add(tileset);

    map.camera.zoomIn(3999000);
}

async function readArcgis(Cesium: typeof CesiumLib, map: CesiumLib.Viewer) {
    map.imageryLayers.addImageryProvider(await Cesium.ArcGisMapServerImageryProvider.fromUrl(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer'
    ));
}

function readAttribs(Cesium: typeof CesiumLib, map: CesiumLib.Viewer) {
    map.dataSources.add(Cesium.GeoJsonDataSource.load('/assets/web-mapping/sample-data/australia-rivers-zm.geojson'));
    map.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(131.4, -25.8, 4000000)
    });
}

function zCoords(Cesium: typeof CesiumLib, map: CesiumLib.Viewer) {
    map.dataSources.add(Cesium.GeoJsonDataSource.load('/assets/web-mapping/sample-data/australia-rivers-zm.geojson'));
    map.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(131.4, -25.8, 4000000)
    });

    map.entities.add({
        id: 'elev_lbl',
        label: {
            show: false,
            pixelOffset: new Cesium.Cartesian2(0, -15)
        }
    });

    const labelEntity = map.entities.getById('elev_lbl');

    const handler = new Cesium.ScreenSpaceEventHandler(map.canvas);
    handler.setInputAction(function (evt) {
        labelEntity.label.show = false;

        const pickedObject = map.scene.pick(evt.endPosition);
        if (pickedObject && pickedObject.id.polyline) {
            const coords = pickedObject.id.polyline.positions.getValue();
            const avgZ = coords.map(coord => Cesium.Cartographic.fromCartesian(coord).height).reduce((acc, val) => acc + val, 0) / coords.length;
            const cartesian = map.scene.pickPosition(evt.endPosition);
            labelEntity.position = cartesian;
            labelEntity.label.show = true;
            labelEntity.label.text = `Average elevation is ${avgZ} m`;
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
}

function textBox(Cesium: typeof CesiumLib, map: CesiumLib.Viewer) {
    map.entities.add({
        position: Cesium.Cartesian3.fromRadians(map.camera.positionCartographic.longitude, map.camera.positionCartographic.latitude),
        label: {
            text: 'This label is managed by the map',
        }
    });
}

export default exports;
