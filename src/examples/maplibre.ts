//@ts-nocheck
import { FeatureSupportFeature } from '@/models/web-mapping/feature-support-feature.model';
import * as Maplibre from 'maplibre-gl';

const exports: Record<FeatureSupportFeature, (this: Maplibre.Map, maplibregl: typeof Maplibre, map: Maplibre.Map) => void> = {
    [FeatureSupportFeature.GEOJSON]: loadGeojson,
    [FeatureSupportFeature.WFS]: readWfs,
    [FeatureSupportFeature.WMS]: readWms,
    [FeatureSupportFeature.WMTS]: readWmts,
    [FeatureSupportFeature.XYZ]: readSlippy,
    [FeatureSupportFeature.READATTRIB]: readAttribs,
    [FeatureSupportFeature.INTERPOLATE]: heatMap,
    [FeatureSupportFeature.UPDATEATTRIB]: updateAttribs,
    [FeatureSupportFeature.UPDATEGEOM]: updateGeom,
    [FeatureSupportFeature.OVERLAY]: textBox
} as Record<FeatureSupportFeature, (this: Maplibre.Map, maplibregl: typeof Maplibre, map: Maplibre.Map) => void>;

function loadGeojson(maplibregl: typeof Maplibre, map: Maplibre.Map) {
    map.on('load', evt => {
        map.addSource('src-settlements-points', {
            type: 'geojson',
            data: '/assets/web-mapping/sample-data/hungary_settlements.geojson'
        });

        map.addLayer({
            id: 'lyr-settlements-points',
            source: 'src-settlements-points',
            type: 'circle',
            paint: {
                "circle-color": '#ff7800',
                "circle-radius": 4
            }
        });
    });
}

function readWfs(maplibregl: typeof Maplibre, map: Maplibre.Map) {
    map.on('load', evt => {
        map.addSource('src-ne-10m-countries-points', {
            type: 'geojson',
            data: getWfsUrl()
        });

        map.addLayer({
            id: 'lyr-ne-10m-countries-points',
            source: 'src-ne-10m-countries-points',
            type: 'symbol',
            paint: {
                "icon-color": '#007cbf'
            },
            layout: {
                "text-field": ['get', 'NAME_GERM'],
                "icon-image": 'circle_stroked_11',
                "text-anchor": 'bottom',
                "text-offset": [0, -0.5],
                "icon-size": ['interpolate', ['linear'], ['get', 'POP'], 10000, 0.5, 1500000000, 2]
            }
        });
    });

    map.on('moveend', evt => {
        map.getSource('src-ne-10m-countries-points')?.setData(getWfsUrl());
    });

    /**
     * Returns a formatted WFS URL with the current map view's bounding box included.
     * @returns The URL.
     */
    function getWfsUrl() {
        // We have to transform LngLat to LatLng before joining
        return 'https://view.eumetsat.int/geoserver/osmgray/ows?service=WFS&version=2.0.0&request=GetFeature&srsname=EPSG:4326&typeName=osmgray%3Ane_10m_admin_0_countries_points&outputFormat=application/json'
            + '&bbox=' + map.getBounds().toArray().map(coords => coords.reverse()).flat().join(',');
    }
}

function readWms(maplibregl: typeof Maplibre, map: Maplibre.Map) {
    map.on('load', evt => {
        map.addSource('src-natural-2015', {
            type: 'raster',
            tiles: [
                'https://img.nj.gov/imagerywms/Natural2015?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=Natural2015'
            ],
            tileSize: 256
        });

        map.addLayer({
            id: 'lyr-natural-2015',
            type: 'raster',
            source: 'src-natural-2015'
        });
    });

    map.setCenter([-74.88, 40.16]);
    map.setZoom(7);
}

function readWmts(maplibregl: typeof Maplibre, map: Maplibre.Map) {
    map.on('load', evt => {
        map.addSource('src-usgs-sgmc2', {
            type: 'raster',
            tiles: [
                'https://mrdata.usgs.gov/mapcache/wmts?service=wmts&request=GetTile&version=1.0.0&layer=sgmc2&style=default&tilematrixset=GoogleMapsCompatible&tilematrix={z}&tilerow={y}&tilecol={x}&format=image%2Fpng'
            ],
            tileSize: 256,
            attribution: 'Tiles © <a href="https://mrdata.usgs.gov/geology/state/" target="_blank">USGS</a>'
        });

        map.addLayer({
            id: 'lyr-usgs-sgmc2',
            type: 'raster',
            source: 'src-usgs-sgmc2'
        });
    });

    map.setCenter([-99, 40]);
    map.setZoom(3.5);
}

function readSlippy(maplibregl: typeof Maplibre, map: Maplibre.Map) {
    map.on('load', evt => {
        map.addSource('src-carto', {
            type: 'raster',
            tiles: [
                'http://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
            ],
            tileSize: 256,
            attribution: 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL'
        });

        map.addLayer({
            id: 'lyr-carto',
            type: 'raster',
            source: 'src-carto'
        });
    });
}

function readAttribs(maplibregl: typeof Maplibre, map: Maplibre.Map) {
    map.on('load', evt => {
        map.addSource('src-aus-rivers', {
            type: 'geojson',
            data: '/assets/web-mapping/sample-data/australia-rivers-zm.geojson'
        });

        map.addLayer({
            id: 'lyr-aus-rivers',
            source: 'src-aus-rivers',
            type: 'line',
            paint: {
                "line-width": 5,
                "line-color": "#0000ff"
            }
        });

        map.setCenter([131.4, -25.8]);
        map.setZoom(3.5);

        map.on('click', 'lyr-aus-rivers', (evt) => {
            if (evt.features?.length) {
                new maplibregl.Popup()
                    .setLngLat(evt.lngLat)
                    .setHTML(evt.features[0].properties.name)
                    .addTo(map);
            }
        });
    });
}

function heatMap(maplibregl: typeof Maplibre, map: Maplibre.Map) {
    map.on('load', evt => {
        map.addSource('src-settlements-points', {
            type: 'geojson',
            data: '/assets/web-mapping/sample-data/hungary_settlements.geojson'
        });

        map.addLayer({
            id: 'lyr-settlements-points',
            source: 'src-settlements-points',
            type: 'heatmap',
            paint: {
                'heatmap-weight': [
                    'interpolate',
                    ['linear'],
                    ['get', 'population'],
                    0,
                    0,
                    6,
                    1
                ]
            }
        });
    });
}

function updateAttribs(maplibregl: typeof Maplibre, map: Maplibre.Map) {
    map.on('load', evt => {
        map.addSource('src-settlements-points', {
            type: 'geojson',
            data: '/assets/web-mapping/sample-data/hungary_settlements.geojson'
        });

        map.addLayer({
            id: 'lyr-settlements-points',
            source: 'src-settlements-points',
            type: 'circle',
            paint: {
                "circle-color": ['case', ['==', ['get', 'visited'], true], '#ffff00', '#ff7800'],
                "circle-radius": 4
            }
        });

        map.on('click', 'lyr-settlements-points', function (evt) {
            if (evt.features?.length) {
                const featName = evt.features[0].properties.name;
                map.getSource('src-settlements-points').getData().then(data => {
                    data.features.find(feature => feature.properties.name === featName).properties.visited = true;
                    map.getSource('src-settlements-points').setData(data);
                });
            }
        });
    });
}

function updateGeom(maplibregl: typeof Maplibre, map: Maplibre.Map) {
    map.on('load', evt => {
        const geojson = {
            type: "FeatureCollection",
            features: [{
                type: "Feature",
                geometry: {
                    type: "LineString",
                    coordinates: [[Math.random() * 360 - 180, Math.random() * 180 - 90], [Math.random() * 360 - 180, Math.random() * 180 - 90]]
                }
            }]
        };

        map.addSource('src-random-line', {
            type: 'geojson',
            data: geojson
        });

        map.addLayer({
            id: 'lyr-random-line',
            source: 'src-random-line',
            type: 'line',
            paint: {
                "line-width": 5,
                "line-color": "#0000ff"
            }
        });

        map.on('click', function () {
            geojson.features[0].geometry.coordinates.push([Math.random() * 360 - 180, Math.random() * 180 - 90]);
            map.getSource('src-random-line').setData(geojson);
        });

        map.setCenter([0, 0]);
        map.setZoom(1);
    });
}

function textBox(maplibregl: typeof Maplibre, map: Maplibre.Map) {
    map.on('load', evt => {
        map.addSource('src-label', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [{
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: map.getCenter().toArray()
                    }
                }]
            }
        });

        map.addLayer({
            id: 'lyr-label',
            source: 'src-label',
            type: 'symbol',
            layout: {
                "text-field": 'This label is managed by the map'
            }
        });
    });
}

export default exports;
