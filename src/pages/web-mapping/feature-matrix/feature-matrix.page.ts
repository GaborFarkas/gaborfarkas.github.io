import { ModalComponent } from '@/components/modal/modal.component';
import { LeafletMapComponent } from '@/components/web-mapping/leaflet-map/leaflet-map.component';
import { MaplibreMapComponent } from '@/components/web-mapping/maplibre-map/maplibre-map.component';
import { OpenLayersMapComponent } from '@/components/web-mapping/openlayers-map/openlayers-map.component';
import { FeatureSupportScoreDirective } from '@/directives/feature-support-score.directive';
import { FeatureSupportItem } from '@/models/web-mapping/feature-support-item.model';
import { FeatureSupportScore } from '@/models/web-mapping/feature-support-score.model';
import { WebMappingLibrary } from '@/models/web-mapping/web-mapping-library';
import { ConfigService } from '@/services/config.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';

/**
 * The feature matrix web mapping page.
 */
@Component({
    selector: 'feature-matrix-page',
    standalone: true,
    templateUrl: './feature-matrix.page.html',
    styleUrl: './feature-matrix.page.css',
    imports: [CommonModule, FeatureSupportScoreDirective, ModalComponent, LeafletMapComponent, OpenLayersMapComponent, MaplibreMapComponent],
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

    /**
     * The modal dialog of this page.
     */
    @ViewChild(ModalComponent) dialog!: ModalComponent;

    /**
     * The feature support item currently playing as an example.
     */
    protected playingItem?: FeatureSupportItem;

    /**
     * The currently playing feature support item's library.
     */
    protected playingLibrary?: WebMappingLibrary;

    constructor(private configService: ConfigService) { }

    async ngOnInit() {
        this.featureSupportItems = await this.configService.getConfigAsync('feature-support.json');
    }

    /**
     * Plays an example based on a feature support item.
     * @param feature
     */
    playExample(feature: FeatureSupportItem, library: WebMappingLibrary) {
        if (feature.support?.[library].example) {
            this.playingLibrary = library;
            this.playingItem = feature;
            this.dialog.open();
        }
    }

    /**
     * Clears the last played example.
     */
    clearExample() {
        this.playingItem = undefined;
        this.playingLibrary = undefined;
    }
}
