//@ts-nocheck
import { environment } from '@/environments/environment';
import { FeatureSupportFeature } from '@/models/web-mapping/feature-support-feature.model';
import { OpenLayers } from '@/utils/openlayers';

const exports: Record<FeatureSupportFeature, (this: OpenLayers.Map, ol: typeof OpenLayers, map: OpenLayers.Map) => void> = {
    [FeatureSupportFeature.HWACCEL]: webglPoints,
    [FeatureSupportFeature.BLEND]: blendLayers,
    [FeatureSupportFeature.KML]: loadKml,
    [FeatureSupportFeature.GEOJSON]: loadGeojson,
    [FeatureSupportFeature.GEOTIFF]: geoTiff,
    [FeatureSupportFeature.WFS]: readWfs,
    [FeatureSupportFeature.MAPBOXTILE]: loadVectorTiles,
    [FeatureSupportFeature.WMS]: readWms,
    [FeatureSupportFeature.WMTS]: readWmts,
    [FeatureSupportFeature.XYZ]: readSlippy,
    [FeatureSupportFeature.GOOGLE]: readGoogle,
    [FeatureSupportFeature.ARCGIS]: readArcgis,
    [FeatureSupportFeature.BING]: readBing,
    [FeatureSupportFeature.NORTH]: northArrow
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

function northArrow(ol: typeof OpenLayers, map: OpenLayers.Map) {
    map.addControl(new ol.control.Rotate());
    map.getView().setRotation(Math.PI / 4);
}

function loadKml(ol: typeof OpenLayers, map: OpenLayers.Map) {
    map.addLayer(new ol.layer.Vector({
        source: new ol.source.Vector({
            url: '/assets/web-mapping/sample-data/simple-kml.kml',
            format: new ol.format.KML()
        })
    }));
}

function loadGeojson(ol: typeof OpenLayers, map: OpenLayers.Map) {
    map.addLayer(new ol.layer.Vector({
        source: new ol.source.Vector({
            url: '/assets/web-mapping/sample-data/hungary_settlements.geojson',
            format: new ol.format.GeoJSON({
                dataProjection: 'EPSG:4326'
            })
        })
    }));
}

function readWfs(ol: typeof OpenLayers, map: OpenLayers.Map) {
    map.addLayer(new ol.layer.Vector({
        source: new ol.source.Vector({
            url: function (extent) {
                return 'https://view.eumetsat.int/geoserver/osmgray/ows?service=WFS&version=2.0.0&request=GetFeature&srsname=EPSG:3857&typeName=osmgray%3Ane_10m_admin_0_countries_points&outputFormat=application/json'
                    + '&bbox=' + extent.join(',');
            },
            format: new ol.format.GeoJSON()
        })
    }));
}

function loadVectorTiles(ol: typeof OpenLayers, map: OpenLayers.Map) {
    map.addLayer(new ol.layer.VectorTile({
        declutter: true,
        source: new ol.source.VectorTile({
            format: new ol.format.MVT(),
            url: 'https://demotiles.maplibre.org/tiles/{z}/{x}/{y}.pbf',
            attributions: '<a href="https://maplibre.org">Maplibre</a>'
        }),
        background: '#d1d1d1',
        style: {
            'stroke-width': 0.6,
            'stroke-color': '#8c8b8b',
            'fill-color': '#f7f7e9',
        }
    }))
}

function readWms(ol: typeof OpenLayers, map: OpenLayers.Map) {
    map.addLayer(new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'https://www.oeny.hu/geoserver/ows',
            serverType: 'geoserver',
            params: {
                'LAYERS': 'tr4-tszt:rtszt_tersegi_teruletfelhaszn_kat'
            },
            attributions: 'E-TÉR data by © <a href="https://www.oeny.hu/oeny/4tr/#/tudastar/interaktiv-terkep" target="_blank">Lechner Tudásközpont</a>'
        })
    }));

    map.getView().setCenter([1962131, 5908264]);
    map.getView().setZoom(10);
}

function readWmts(ol: typeof OpenLayers, map: OpenLayers.Map) {
    // Example taken from https://openlayers.org/en/latest/examples/wmts.html
    const size = ol.extent.getWidth(map.getView().getProjection().getExtent()) / 256;
    const resolutions = new Array(19);
    const matrixIds = new Array(19);
    for (let z = 0; z < 19; ++z) {
        // generate resolutions and matrixIds arrays for this WMTS
        resolutions[z] = size / Math.pow(2, z);
        matrixIds[z] = z;
    }

    map.addLayer(new ol.layer.Tile({
        source: new ol.source.WMTS({
            attributions: 'Tiles © <a href="https://mrdata.usgs.gov/geology/state/" target="_blank">USGS</a>',
            url: 'https://mrdata.usgs.gov/mapcache/wmts',
            layer: 'sgmc2',
            matrixSet: 'GoogleMapsCompatible',
            format: 'image/png',
            projection: map.getView().getProjection(),
            tileGrid: new ol.tilegrid.WMTS({
                origin: ol.extent.getTopLeft(map.getView().getProjection().getExtent()),
                resolutions: resolutions,
                matrixIds: matrixIds,
            }),
            style: 'default',
            wrapX: true,
        })
    }));

    map.getView().setCenter([-10881201, 4688556]);
    map.getView().setZoom(4);
}

function readSlippy(ol: typeof OpenLayers, map: OpenLayers.Map) {
    map.addLayer(new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'http://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
            attributions: 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL'
        })
    }));
}

function readGoogle(ol: typeof OpenLayers, map: OpenLayers.Map) {
    map.addLayer(new ol.layer.WebGLTile({
        source: new ol.source.Google({
            key: environment.googleMapsApiKey,
            scale: 'scaleFactor2x',
            highDpi: true,
            mapType: 'satellite',
            layerTypes: ['layerRoadmap'],
            overlay: false
        })
    }));
}

function readArcgis(ol: typeof OpenLayers, map: OpenLayers.Map) {
    map.addLayer(new ol.layer.WebGLTile({
        source: new ol.source.TileArcGISRest({
            url: 'https://services.geodataonline.no/arcgis/rest/services/Geocache_UTM33_EUREF89/GeocacheBilder/MapServer'
        })
    }));

    map.getView().setCenter([1564542, 9769810]);
    map.getView().setZoom(4.5);
}

function readBing(ol: typeof OpenLayers, map: OpenLayers.Map) {
    map.addLayer(new ol.layer.WebGLTile({
        source: new ol.source.BingMaps({
            key: environment.bingApiKey,
            imagerySet: 'AerialWithLabelsOnDemand'
        })
    }));
}

export default exports;
