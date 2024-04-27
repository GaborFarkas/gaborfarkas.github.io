import { Injectable } from "@angular/core";
import { StoryUrlMapping } from "../models/page-url-mapping.model";
import { StoryModel } from "../models/story.model";

/**
 * A service with lists of insight and case study stories with their query and access methods.
 */
@Injectable()
export class StoryService {
    /**
     * Insights available with slugs as keys.
     */
    private insights: Map<string, StoryModel> = new Map([
        [StoryUrlMapping.WEBPROG2, {
            title: 'Web Programming II.',
            description: 'Take a look into a Web Programming II. class with sample codes and some fascinating per-lesson insights from the professor\'s perspective.',
            loadComponent: () => import('../components/insights/web-programming-2/web-programming-2.component').then(m => m.WebProgramming2Component),
            slug: StoryUrlMapping.WEBPROG2,
            created: new Date('2024-04-27T14:47:00Z'),
            lastModified: new Date('2024-04-27T14:47:00Z')
        }]
    ]);

    /**
     * Returns every insight as an iterable.
     */
    public listInsights(): IterableIterator<StoryModel> {
        return this.insights.values();
    }

    /**
     * Returns a single insight based on its URL slug.
     * @param slug The URL slug.
     * @returns The insight, if found. Undefined, otherwise.
     */
    public getInsight(slug: string): StoryModel|undefined {
        if (this.insights.has(slug)) {
            return this.insights.get(slug)!;
        }

        return undefined;
    }

    /**
     * Returns an empty story descriptor with a NotFoundComponent inside.
     * @returns The 404 descriptor.
     */
    public notFound(): StoryModel {
        return {
            loadComponent: () => import('../components/not-found/not-found.component').then(m => m.NotFoundComponent),
            title: '',
            description: '',
            created: new Date(),
            lastModified: new Date(),
            slug: ''
        }
    }
}
