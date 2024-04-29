/**
 * Represents a picture with an attribution.
 */
export interface AttributedPicture {
    /**
     * The image URL.
     */
    url: string,
    /**
     * The attribution URL, if any.
     */
    attributionUrl?: string,
    /**
     * The attribution text, if any.
     */
    attributionText?: string
}
