import { FeatureSupportFeature } from '@/models/web-mapping/feature-support-feature.model';
import * as Maplibre from 'maplibre-gl';

const exports: Record<FeatureSupportFeature, (this: Maplibre.Map, maplibregl: typeof Maplibre, map: Maplibre.Map) => void> = {

} as Record<FeatureSupportFeature, (this: Maplibre.Map, maplibregl: typeof Maplibre, map: Maplibre.Map) => void>;

export default exports;
