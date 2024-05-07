/**
 * Options for listing operations taking slices from a data source.
 */
export interface ListOptions {
    /**
     * The number of items to return.
     */
    take: number,
    /**
     * The number of items to skip from the start.
     */
    skip: number,
    /**
     * The ordering property.
     */
    orderBy: string,
    /**
     * Ordering should be ascending.
     */
    ascending: boolean
}
