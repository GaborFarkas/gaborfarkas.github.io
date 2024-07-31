//@ts-nocheck
import { FeatureSupportFeature } from '@/models/web-mapping/feature-support-feature.model';
import * as Leaflet from 'leaflet';

const exports: Record<FeatureSupportFeature, (this: Leaflet.Map, L: typeof Leaflet, map: Leaflet.Map) => void> = {
    [FeatureSupportFeature.GEOJSON]: loadGeojson
} as Record<FeatureSupportFeature, (this: Leaflet.Map, L: typeof Leaflet, map: Leaflet.Map) => void>;

async function loadGeojson(Cesium: typeof CesiumLib, map: CesiumLib.Viewer) {
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

export default exports;
