import { FeatureScoreDescriptor } from '@/models/web-mapping/feature-support-item.model';
import { FeatureSupportScore } from '@/models/web-mapping/feature-support-score.model';
import { Directive, HostBinding, Input } from '@angular/core';

/**
 * Directive for displaying a div as a feature support score rectangle in the feature support page.
 */
@Directive({
  standalone: true,
  selector: '[supportRectangle]',
})
export class FeatureSupportScoreDirective {
    /**
     * The feature score object to display.
     */
    @Input({required: true, alias: 'supportRectangle'}) set supportItem(item: FeatureScoreDescriptor) {
        this.class = `w-10 h-6 ${this.scoreToBackgroundColor(item.score)} rounded mr-4 flex-shrink-0` + (item.example ? ' example' : '');
    }

    /**
     * Element's class name calculated from the support item.
     */
    @HostBinding('class') class: string = 'w-10 h-6 rounded mr-4 flex-shrink-0';

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
