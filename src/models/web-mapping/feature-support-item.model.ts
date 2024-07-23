import { FeatureSupportScore } from "./feature-support-score.model";
import { WebMappingLibrary } from "./web-mapping-library";

/**
 * Represents a single cell or category in the feature support matrix.
 */
export interface FeatureSupportItem {
    /**
     * Name of the item.
     */
    name: string,
    /**
     * Short description of the item.
     */
    description: string,
    /**
     * Support score for every assessed web mapping library. Undefined, if the current item is a category.
     */
    support?: Record<WebMappingLibrary, FeatureScoreDescriptor>,
    /**
     * Extra information for the current item.
     */
    addendum?: string
}

/**
 * Describes a single library's feature score in the feature support matrix.
 */
export interface FeatureScoreDescriptor {
    /**
     * The score expressed as an integer.
     */
    score: FeatureSupportScore,
    /**
     * There is an example available for this feature and library.
     */
    example: boolean
}
