import { Type } from "@angular/core";

/**
 * Story descriptor model.
 */
export interface StoryModel {
    /**
     * The short title of the story.
     */
    title: string,
    /**
     * The short description of the story. Used in list views.
     */
    description: string,
    /**
     * The URL slug of the story.
     */
    slug: string,
    /**
     * The creation time of the story.
     */
    created: Date,
    /**
     * The last modification time of the story.
     */
    lastModified: Date,
    /**
     * The component access of the story's component for lazy loading.
     */
    loadComponent: (() => Promise<Type<unknown>>)
}

/**
 * Story categories.
 */
export enum StoryType {
    /**
     * Unknown category used for graceful error handling.
     */
    UNKNOWN,
    INSIGHT,
    CASESTUDY
}
