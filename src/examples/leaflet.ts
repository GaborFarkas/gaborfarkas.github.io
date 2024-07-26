import { FeatureSupportFeature } from '@/models/web-mapping/feature-support-feature.model';
import * as Leaflet from 'leaflet';

const exports: Record<FeatureSupportFeature, (this: Leaflet.Map, L: typeof Leaflet, map: Leaflet.Map) => void> = {
    [FeatureSupportFeature.RENDERGEOM]: renderGeom
} as Record<FeatureSupportFeature, (this: Leaflet.Map, L: typeof Leaflet, map: Leaflet.Map) => void>;

export default exports;

function renderGeom(L: typeof Leaflet, map: Leaflet.Map) {
    L.marker([51.5, -0.09]).addTo(map)
        .bindPopup('A pretty CSS popup.<br> Easily customizable.')
        .openPopup();
}
