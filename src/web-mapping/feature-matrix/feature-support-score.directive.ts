import { FeatureScoreDescriptor } from '@/models/web-mapping/feature-support-item.model';
import { FeatureSupportScore } from '@/models/web-mapping/feature-support-score.model';
import { computed, Directive, input } from '@angular/core';

/**
 * Directive for displaying a div as a feature support score rectangle in the feature support page.
 */
@Directive({
    standalone: true,
    selector: '[supportRectangle]',
    host: {
        '[class]': 'class()'
    }
})
export class FeatureSupportScoreDirective {
    /**
     * The feature score object to display.
     */
    public supportRectangle = input.required<FeatureScoreDescriptor>();

    /**
     * Element's class name calculated from the support item.
     */
    protected class = computed(() =>
        `w-10 h-6 ${this.scoreToBackgroundColor(this.supportRectangle().score)} rounded mr-4 flex-shrink-0` +
        (this.supportRectangle().line !== undefined ? ' example' : ''));

    /**
     * Returns the background color class string for the current score.
     */
    private scoreToBackgroundColor(score: FeatureSupportScore): string {
        switch (score) {
            case FeatureSupportScore.HIGH:
                return 'bg-red-500';
            case FeatureSupportScore.LOW:
                return 'bg-yellow-300';
            case FeatureSupportScore.MODERATE:
                return 'bg-amber-500';
            case FeatureSupportScore.NATIVE:
                return 'bg-lime-400';
            default:
                return 'bg-slate-400';
        }
    }
}
