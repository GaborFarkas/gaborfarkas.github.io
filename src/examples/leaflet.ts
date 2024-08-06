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
    [FeatureSupportFeature.OVERLAY]: textBox
} as Record<FeatureSupportFeature, (this: Leaflet.Map, L: typeof Leaflet, map: Leaflet.Map) => void>;

async function loadGeojson(L: typeof Leaflet, map: Leaflet.Map) {
    const geojson = await (await fetch('/assets/web-mapping/sample-data/hungary_settlements.geojson')).json();
    L.geoJSON(geojson, {
        // By default, Leaflet adds points as clickable markers, which has a huge impact on performance.
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
    const wfsLayer = L.geoJSON().addTo(map);
    map.on('moveend', function (evt) {
        const bounds = map.getBounds();
        const bboxArr = [bounds.getSouth(), bounds.getWest(), bounds.getNorth(), bounds.getEast()];
        fetch('https://view.eumetsat.int/geoserver/osmgray/ows?service=WFS&version=2.0.0&request=GetFeature&srsname=EPSG:4326&typeName=osmgray%3Ane_10m_admin_0_countries_points&outputFormat=application/json'
            + '&bbox=' + bboxArr.join(',')).then(resp => {
                resp.json().then(geojson => {
                    wfsLayer.clearLayers();
                    wfsLayer.addData(geojson);
                });
            });
    });
    map.fire('moveend');
}

function readWms(L: typeof Leaflet, map: Leaflet.Map) {
    L.tileLayer.wms('https://www.oeny.hu/geoserver/ows?', {
        layers: 'tr4-tszt:rtszt_tersegi_teruletfelhaszn_kat',
        transparent: true,
        format: 'image/png',
        attribution: 'E-TÉR data by © <a href="https://www.oeny.hu/oeny/4tr/#/tudastar/interaktiv-terkep" target="_blank">Lechner Tudásközpont</a>'
    }).addTo(map);

    map.setView([46.78, 17.64], 10);
}

function readWmts(L: typeof Leaflet, map: Leaflet.Map) {
    L.tileLayer('https://mrdata.usgs.gov/mapcache/wmts?service=wmts&request=GetTile&version=1.0.0&layer=sgmc2&style=default&tilematrixset=GoogleMapsCompatible&tilematrix={z}&tilerow={y}&tilecol={x}&format=image%2Fpng', {
        continuousWorld: true,
        attribution: 'Tiles © <a href="https://mrdata.usgs.gov/geology/state/" target="_blank">USGS</a>',
    }).addTo(map);

    map.setView([40, -99], 4);
}

function readSlippy(L: typeof Leaflet, map: Leaflet.Map) {
    L.tileLayer('http://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        continuousWorld: true,
        attribution: 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL',
    }).addTo(map);
}

async function readAttribs(L: typeof Leaflet, map: Leaflet.Map) {
    const geojson = await (await fetch('/assets/web-mapping/sample-data/australia-rivers-zm.geojson')).json();
    L.geoJSON(geojson, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.name);
        }
    }).addTo(map);

    map.setView([-25.8, 131.4], 4);
}

async function zCoords(L: typeof Leaflet, map: Leaflet.Map) {
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
    const geojson = await (await fetch('/assets/web-mapping/sample-data/hungary_settlements.geojson')).json();
    const layer = L.geoJSON(geojson, {
        // By default, Leaflet adds points as clickable markers, which has a huge impact on performance.
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

function textBox(L: typeof Leaflet, map: Leaflet.Map) {
    L.marker(map.getCenter(), {
        icon: L.divIcon({
            html: '<h1>This label is managed by the map</h1>',
            className: 'whitespace-nowrap'
        })
    }).addTo(map);
}

export default exports;
