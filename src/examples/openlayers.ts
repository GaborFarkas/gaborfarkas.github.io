//@ts-nocheck
import { FeatureSupportFeature } from '@/models/web-mapping/feature-support-feature.model';
import { OpenLayers } from '@/utils/openlayers';

const exports: Record<FeatureSupportFeature, (this: OpenLayers.Map, ol: typeof OpenLayers, map: OpenLayers.Map) => void> = {
    [FeatureSupportFeature.HWACCEL]: webglPoints,
    [FeatureSupportFeature.BLEND]: blendLayers,
    [FeatureSupportFeature.GEOTIFF]: geoTiff
} as Record<FeatureSupportFeature, (this: OpenLayers.Map, ol: typeof OpenLayers, map: OpenLayers.Map) => void>;

function webglPoints(ol: typeof OpenLayers, map: OpenLayers.Map) {
    // In its current form, OpenLayers flat style descriptors are not stable enough to have a single, data-driven style.
    // We create a group layer and use as many layers as different styles we want.
    const lyr = new ol.layer.Group();
    // All the layers can work from the same source
    const source = new ol.source.Vector({
        format: new ol.format.GeoJSON({
            dataProjection: 'EPSG:4326'
        }),
        url: '/assets/web-mapping/sample-data/hungary_settlements.geojson'
    });

    // Create styles for different symbols filtering the data
    const styles = [{
        'filter': ['!=', ['get', 'place'], 'city'],
        'shape-points': 4,
        'shape-radius': 8,
        'shape-radius2': 0,
        'shape-fill-color': '#006688',
        'shape-stroke-color': '#006688',
        'shape-stroke-width': 3,
        'shape-rotation': Math.PI / 4
    }, {
        'filter': ['==', ['get', 'place'], 'city'],
        'circle-radius': ['interpolate', ['linear'], ['get', 'population'], 50000, 2, 500000, 6],
        'circle-fill-color': '#ffeda0',
        'circle-stroke-color': '#f03b20',
        'circle-stroke-width': 1
    }];

    // Process styles, create a layer for each and add it to the layer group
    for (let style of styles) {
        const ptLyr = new ol.layer.WebGLPoints({
            source: source,
            style: style
        });
        lyr.getLayers().push(ptLyr);
    }

    map.addLayer(lyr);
}

function blendLayers(ol: typeof OpenLayers, map: OpenLayers.Map) {
    const lyr = new ol.layer.Tile({
        source: new ol.source.TileImage({
            attributions:
                'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer">ArcGIS</a>',
            url:
                'https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}',
        })
    });

    lyr.on('postrender', evt => {
        if (evt.context) {
            evt.context.globalCompositeOperation = 'multiply';
        }
    });

    map.addLayer(lyr);
}

function geoTiff(ol: typeof OpenLayers, map: OpenLayers.Map) {
    const source = new ol.source.GeoTIFF({
        sources: [
            {
                url: 'https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/36/Q/WD/2020/7/S2A_36QWD_20200701_0_L2A/TCI.tif',
            },
        ],
    });

    map.addLayer(new ol.layer.WebGLTile({
        source: source
    }));

    map.getView().setCenter([546484, 1842303]);
    map.getView().setZoom(9);
}

export default exports;
