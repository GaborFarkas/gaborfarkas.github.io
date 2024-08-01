//@ts-nocheck
import { FeatureSupportFeature } from '@/models/web-mapping/feature-support-feature.model';
import * as Leaflet from 'leaflet';

const exports: Record<FeatureSupportFeature, (this: Leaflet.Map, L: typeof Leaflet, map: Leaflet.Map) => void> = {
    [FeatureSupportFeature.GEOJSON]: loadGeojson,
    [FeatureSupportFeature.WFS]: readWfs,
    [FeatureSupportFeature.WMS]: readWms,
    [FeatureSupportFeature.WMTS]: readWmts
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

export default exports;
