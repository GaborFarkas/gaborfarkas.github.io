import { FeatureSupportScoreDirective } from '@/directives/feature-support-score.directive';
import { FeatureSupportItem } from '@/models/web-mapping/feature-support-item.model';
import { FeatureSupportScore } from '@/models/web-mapping/feature-support-score.model';
import { WebMappingLibrary } from '@/models/web-mapping/web-mapping-library';
import { ConfigService } from '@/services/config.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

/**
 * The feature matrix web mapping page.
 */
@Component({
    selector: 'feature-matrix-page',
    standalone: true,
    templateUrl: './feature-matrix.page.html',
    styleUrl: './feature-matrix.page.css',
    imports: [CommonModule, FeatureSupportScoreDirective],
    providers: [ConfigService]
})
export class FeatureMatrixPage implements OnInit {
    /**
     * Web mapping libraries enum for the template.
     */
    protected WebMappingLibrary = WebMappingLibrary;

    /**
     * Feature support score enum for the template.
     */
    protected FeatureSupportScore = FeatureSupportScore;

    /**
     * Rows displayed in the feature support matrix.
     */
    protected featureSupportItems: FeatureSupportItem[] = [];

    constructor(private configService: ConfigService) { }

    async ngOnInit() {
        this.featureSupportItems = await this.configService.getConfigAsync('feature-support.json');
    }
}
