//@ts-nocheck
import { FeatureSupportFeature } from '@/models/web-mapping/feature-support-feature.model';
import * as Leaflet from 'leaflet';

const exports: Record<FeatureSupportFeature, (this: Leaflet.Map, L: typeof Leaflet, map: Leaflet.Map) => void> = {
    [FeatureSupportFeature.GEOJSON]: loadGeojson,
    [FeatureSupportFeature.WFS]: readWfs
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

export default exports;