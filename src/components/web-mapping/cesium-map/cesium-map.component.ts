import { AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import * as Cesium from 'cesium';
import { WebMap } from '@/models/web-mapping/web-map.model';
import { FeatureSupportFeature } from '@/models/web-mapping/feature-support-feature.model';

/**
 * MapLibre GL JS web map component.
 */
@Component({
    selector: 'div.cesium',
    standalone: true,
    templateUrl: './cesium-map.component.html',
    styleUrl: '../../../../node_modules/cesium/Build/Cesium/Widgets/widgets.css',
    encapsulation: ViewEncapsulation.None
})
export class CesiumMapComponent implements AfterViewInit, WebMap {
    /**
     * The HTML element for the map canvas.
     */
    @ViewChild('map') private mapElem?: ElementRef<HTMLDivElement>;

    /**
     * The Leaflet map object.
     */
    private map?: Cesium.Viewer;

    constructor() {
        (window as { [key: string]: any })['CESIUM_BASE_URL'] = '/assets/cesium/';
    }

    /**
     * Loads the base map with a simple style and positions it to Pécs.
     */
    ngAfterViewInit(): void {
        if (this.mapElem?.nativeElement) {
            // Load the small base map.
            this.map = new Cesium.Viewer(this.mapElem.nativeElement);
        }
    }

    public playExample(feature: FeatureSupportFeature): void {
        throw new Error('Method not implemented.');
    }
}
