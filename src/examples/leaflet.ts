//@ts-nocheck
import { FeatureSupportFeature } from '@/models/web-mapping/feature-support-feature.model';
import * as Leaflet from 'leaflet';

const exports: Record<FeatureSupportFeature, (this: Leaflet.Map, L: typeof Leaflet, map: Leaflet.Map) => void> = {
} as Record<FeatureSupportFeature, (this: Leaflet.Map, L: typeof Leaflet, map: Leaflet.Map) => void>;

export default exports;
