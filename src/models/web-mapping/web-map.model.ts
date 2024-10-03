/**
 * Interface for web map components in the web mapping pages.
 */
export interface WebMap {
    /**
     * The starting example, if any.
     */
    example?: string;

    /**
     * Plays the example associated with a feature.
     * @param feature The feature as a string.
     */
    playExample(feature: string): void;

    /**
     * The component should expose its play function to the global namespace.
     * Used for running user code in a standalone map.
     */
    exposePlay: boolean;
}
