/**
 * Options for taking slices from a data source.
 */
export interface PaginationOptions {
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
