import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

/**
 * Describes a single reference
 */
export interface ReferenceDescriptor {
    /**
     * The URL pointing to the referred page.
     */
    url: string,
    /**
     * Flyout text describing the reference button.
     */
    text?: string,
    /**
     * The icon of the reference.
     */
    icon?: IconDefinition
}
