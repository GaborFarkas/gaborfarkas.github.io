import { FeatureSupportFeature } from '@/models/web-mapping/feature-support-feature.model';
import { OpenLayers } from '@/utils/openlayers';

const exports: Record<FeatureSupportFeature, (this: OpenLayers.Map, L: typeof OpenLayers, map: OpenLayers.Map) => void> = {

} as Record<FeatureSupportFeature, (this: OpenLayers.Map, L: typeof OpenLayers, map: OpenLayers.Map) => void>;

export default exports;
