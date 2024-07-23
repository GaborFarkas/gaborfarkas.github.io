/**
 * Enum for feature support scores in the feature support matrix.
 */
export enum FeatureSupportScore
{
    /**
     * Unkown development time.
     */
    UNKNOWN,
    /**
     * Native support.
     */
    NATIVE,
    /**
     * Low effort development.
     */
    LOW,
    /**
     * Moderate effort development.
     */
    MODERATE,
    /**
     * Impossible or infeasible.
     */
    HIGH
}
