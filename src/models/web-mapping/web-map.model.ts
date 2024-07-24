import { FeatureSupportFeature } from "./feature-support-feature.model";

/**
 * Interface for web map components in the web mapping pages.
 */
export interface WebMap {
    /**
     * Plays the example associated with a feature.
     * @param feature The feature.
     */
    playExample(feature: FeatureSupportFeature): void;
}
