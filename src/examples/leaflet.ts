// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { FeatureSupportFeature } from '@/models/web-mapping/feature-support-feature.model';
import * as Leaflet from 'leaflet';

const exports: Record<FeatureSupportFeature, (this: Leaflet.Map, L: typeof Leaflet, map: Leaflet.Map) => void> = {
    [FeatureSupportFeature.GEOJSON]: loadGeojson,
    [FeatureSupportFeature.WFS]: readWfs,
    [FeatureSupportFeature.WMS]: readWms,
    [FeatureSupportFeature.WMTS]: readWmts,
    [FeatureSupportFeature.XYZ]: readSlippy,
    [FeatureSupportFeature.READATTRIB]: readAttribs,
    [FeatureSupportFeature.ZCOORDS]: zCoords,
    [FeatureSupportFeature.MCOORDS]: mCoords,
    [FeatureSupportFeature.UPDATEATTRIB]: updateAttribs,
    [FeatureSupportFeature.ADDRMLYR]: addRmLayer,
    [FeatureSupportFeature.TRANSVECT]: transformVector,
    [FeatureSupportFeature.OVERLAY]: textBox
} as Record<FeatureSupportFeature, (this: Leaflet.Map, L: typeof Leaflet, map: Leaflet.Map) => void>;

async function loadGeojson(L: typeof Leaflet, map: Leaflet.Map) {
    /**
     * Format > Vector > GeoJSON
     *
     * Displays a GeoJSON data source (layer) on the map.
     */

    const geojson = await (await fetch('/assets/web-mapping/sample-data/hungary_settlements.geojson')).json();
    L.geoJSON(geojson, {
        // Without pointToLayer, Leaflet adds points as clickable markers, which has a huge impact on performance.
        // No problem with lines and polygons.
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: 4,
                fillColor: "#ff7800",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
        }
    }).addTo(map);
}

function readWfs(L: typeof Leaflet, map: Leaflet.Map) {
    /**
     * Format > Vector > WFS
     *
     * Displays a WFS data source (layer) on the map.
     */

    const baseWfsUrl = 'https://view.eumetsat.int/geoserver/osmgray/ows?service=WFS&version=2.0.0&request=GetFeature&srsname=EPSG:4326&typeName=osmgray%3Ane_10m_admin_0_countries_points&outputFormat=application/json';
    const wfsLayer = L.geoJSON().addTo(map);
    map.on('moveend', function () {
        const bounds = map.getBounds();
        const bboxArr = [bounds.getSouth(), bounds.getWest(), bounds.getNorth(), bounds.getEast()];

        // Fetch WFS URL with current BBOX and load new content into the WFS layer.
        fetch(`${baseWfsUrl}&bbox=${bboxArr.join(',')}`).then(resp => {
            resp.json().then(geojson => {
                wfsLayer.clearLayers();
                wfsLayer.addData(geojson);
            });
        });
    });
    map.fire('moveend');
}

function readWms(L: typeof Leaflet, map: Leaflet.Map) {
    /**
     * Format > Image > WMS
     *
     * Displays a WMS tile layer on the map.
     */

    L.tileLayer.wms('https://www.oeny.hu/geoserver/ows?', {
        layers: 'tr4-tszt:rtszt_tersegi_teruletfelhaszn_kat',
        transparent: true,
        format: 'image/png',
        attribution: 'E-TÉR data by © <a href="https://www.oeny.hu/oeny/4tr/#/tudastar/interaktiv-terkep" target="_blank">Lechner Tudásközpont</a>'
    }).addTo(map);

    map.setView([46.78, 17.64], 10);
}

function readWmts(L: typeof Leaflet, map: Leaflet.Map) {
    /**
     * Format > Tile service > WMTS
     *
     * Displays a WMTS tile layer on the map.
     */

    L.tileLayer('https://mrdata.usgs.gov/mapcache/wmts?service=wmts&request=GetTile&version=1.0.0&layer=sgmc2&style=default&tilematrixset=GoogleMapsCompatible&tilematrix={z}&tilerow={y}&tilecol={x}&format=image%2Fpng', {
        continuousWorld: true,
        attribution: 'Tiles © <a href="https://mrdata.usgs.gov/geology/state/" target="_blank">USGS</a>',
    }).addTo(map);

    map.setView([40, -99], 4);
}

function readSlippy(L: typeof Leaflet, map: Leaflet.Map) {
    /**
     * Format > Tile service > Slippy map
     *
     * Displays a slippy map (XYZ or OSM) tile layer on the map.
     */

    L.tileLayer('http://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        continuousWorld: true,
        attribution: 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL',
    }).addTo(map);
}

async function readAttribs(L: typeof Leaflet, map: Leaflet.Map) {
    /**
     * Data > Pre-process > Read attribute data
     *
     * Demonstrates how Leaflet handles vector attributes.
     *
     * Usage: click on the vector elements to get the associated attributes.
     */

    const geojson = await (await fetch('/assets/web-mapping/sample-data/australia-rivers-zm.geojson')).json();
    L.geoJSON(geojson, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.name);
        }
    }).addTo(map);

    map.setView([-25.8, 131.4], 4);
}

async function zCoords(L: typeof Leaflet, map: Leaflet.Map) {
    /**
     * Data > Pre-process > Z coordinates
     *
     * Demonstrates how Leaflet handles vector Z coordinates.
     *
     * Usage: click on a feature to see its average elevation.
     */

    const geojson = await (await fetch('/assets/web-mapping/sample-data/australia-rivers-zm.geojson')).json();
    L.geoJSON(geojson, {
        onEachFeature: function (feature, layer) {
            const avgZ = feature.geometry.coordinates.map(coord => coord[2]).reduce((acc, val) => acc + val, 0) / feature.geometry.coordinates.length;
            layer.bindPopup(`Average elevation is ${avgZ} m`);
        }
    }).addTo(map);

    map.setView([-25.8, 131.4], 4);
}

async function mCoords(L: typeof Leaflet, map: Leaflet.Map) {
    /**
     * Data > Pre-process > M coordinates
     *
     * Demonstrates how Leaflet handles vector M (measurement) coordinates.
     *
     * Usage: click on a feature to see its watershed area.
     */

    const geojson = await (await fetch('/assets/web-mapping/sample-data/australia-rivers-zm.geojson')).json();
    L.geoJSON(geojson, {
        onEachFeature: function (feature, layer) {
            const maxM = Math.round(Math.max(...feature.geometry.coordinates.map(coord => coord[3])) / 1000000);
            layer.bindPopup(`This river accumulates water from ${maxM} km2`);
        }
    }).addTo(map);

    map.setView([-25.8, 131.4], 4);
}

async function updateAttribs(L: typeof Leaflet, map: Leaflet.Map) {
    /**
     * Data > Manipulation > Update attribute data
     *
     * Demonstrates how Leaflet handles attribute updates.
     *
     * Usage: click on a feature to change its color.
     */

    const geojson = await (await fetch('/assets/web-mapping/sample-data/hungary_settlements.geojson')).json();
    const layer = L.geoJSON(geojson, {
        // Without pointToLayer, Leaflet adds points as clickable markers, which has a huge impact on performance.
        // No problem with lines and polygons.
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: styleFunction
    }).addTo(map);

    layer.on('click', function (evt) {
        if (evt.sourceTarget) {
            evt.sourceTarget.feature.properties.visited = true;
            layer.setStyle(styleFunction);
        }
    });

    function styleFunction(feature) {
        return {
            radius: 4,
            fillColor: feature?.properties.visited ? '#ffff00' : '#ff7800',
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        }
    }
}

async function addRmLayer(L: typeof Leaflet, map: Leaflet.Map) {
    /**
     * Data > Manipulation > Add/remove layer
     *
     * Demonstrates how Leaflet handles layer management.
     *
     * Usage: click to toggle the vector layer.
     */

    const geojson = await (await fetch('/assets/web-mapping/sample-data/australia-rivers-zm.geojson')).json();
    const lyr = L.geoJSON(geojson, {
        onEachFeature: function (feature, layer) {
            const maxM = Math.round(Math.max(...feature.geometry.coordinates.map(coord => coord[3])) / 1000000);
            layer.bindPopup(`This river accumulates water from ${maxM} km2`);
        }
    }).addTo(map);
    let added = true;

    map.setView([-25.8, 131.4], 4);

    map.on('click', function () {
        if (added) {
            map.removeLayer(lyr);
        } else {
            map.addLayer(lyr);
        }

        added = !added;
    });
}

async function transformVector(L: typeof Leaflet, map: Leaflet.Map) {
    /**
     * Projection > Transform vector
     *
     * Demonstrates how Leaflet transforms vector data under the hood.
     *
     * Notes: the data source is in WGS84, while the display projection is Web Mercator.
     * This is the only transformation Leaflet is capable of implicitly without plugins.
     */

    const geojson = await (await fetch('/assets/web-mapping/sample-data/australia-rivers-zm.geojson')).json();
    L.geoJSON(geojson).addTo(map);

    map.setView([-25.8, 131.4], 4);
}

function textBox(L: typeof Leaflet, map: Leaflet.Map) {
    /**
     * Representation > Text box
     *
     * Displays a text box on the map.
     */

    L.marker(map.getCenter(), {
        icon: L.divIcon({
            html: '<h1>This label is managed by the map</h1>',
            className: 'whitespace-nowrap'
        })
    }).addTo(map);
}

export default exports;
