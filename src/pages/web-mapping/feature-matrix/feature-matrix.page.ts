import { ModalComponent } from '@/components/modal/modal.component';
import { CesiumMapComponent } from '@/components/web-mapping/cesium-map/cesium-map.component';
import { LeafletMapComponent } from '@/components/web-mapping/leaflet-map/leaflet-map.component';
import { MaplibreMapComponent } from '@/components/web-mapping/maplibre-map/maplibre-map.component';
import { OpenLayersMapComponent } from '@/components/web-mapping/openlayers-map/openlayers-map.component';
import { FeatureSupportScoreDirective } from '@/directives/feature-support-score.directive';
import { environment } from '@/environments/environment';
import { FeatureSupportItem } from '@/models/web-mapping/feature-support-item.model';
import { FeatureSupportScore } from '@/models/web-mapping/feature-support-score.model';
import { WebMappingLibrary } from '@/models/web-mapping/web-mapping-library';
import { FileService } from '@/services/file.service';
import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal, viewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * The feature matrix web mapping page.
 */
@Component({
    selector: 'feature-matrix-page',
    templateUrl: './feature-matrix.page.html',
    styleUrl: './feature-matrix.page.css',
    imports: [CommonModule, FontAwesomeModule, FeatureSupportScoreDirective, ModalComponent, LeafletMapComponent, OpenLayersMapComponent, MaplibreMapComponent, CesiumMapComponent],
    providers: [FileService]
})
export class FeatureMatrixPage implements OnInit {
    /**
     * Question mark icon.
     */
    protected readonly faQuestionCircle = signal(faQuestionCircle).asReadonly();

    /**
     * Web mapping libraries enum for the template.
     */
    protected readonly WebMappingLibrary = signal(WebMappingLibrary).asReadonly();

    /**
     * Feature support score enum for the template.
     */
    protected readonly FeatureSupportScore = signal(FeatureSupportScore).asReadonly();

    /**
     * Rows displayed in the feature support matrix.
     */
    protected featureSupportItems = signal<FeatureSupportItem[]>([]);

    /**
     * The modal dialog of this page.
     */
    private dialog = viewChild.required(ModalComponent);

    /**
     * The feature support item currently playing as an example.
     */
    protected playingItem = signal<FeatureSupportItem | undefined>(undefined);

    /**
     * The currently playing feature support item's library.
     */
    protected playingLibrary = signal<WebMappingLibrary | undefined>(undefined);

    /**
     * The GitHub URL of the currently playing example.
     */
    protected playingExampleUrl = computed(() => {
        const sourceFileName = this.playingLibrary()?.replace(/ /g, '').toLowerCase();
        if (!sourceFileName || !this.playingItem()?.support?.[this.playingLibrary()!].line) return undefined;
        return `https://github.com/GaborFarkas/gaborfarkas.github.io/blob/${environment.gitRev}/src/examples/${sourceFileName}.ts#L${this.playingItem()!.support![this.playingLibrary()!].line}`;
    });

    constructor(private fileService: FileService) { }

    async ngOnInit() {
        this.featureSupportItems.set(await this.fileService.getConfigAsync('feature-support.json'));
    }

    /**
     * Plays an example based on a feature support item.
     * @param feature The feature to play.
     * @param library The library to play the feature in.
     */
    playExample(feature: FeatureSupportItem, library: WebMappingLibrary) {
        if (feature.support?.[library].line !== undefined) {
            this.playingItem.set(feature);
            this.playingLibrary.set(library);
            this.dialog().open();
        }
    }

    /**
     * Clears the last played example.
     */
    clearExample() {
        this.playingItem.set(undefined);
        this.playingLibrary.set(undefined);
    }
}
