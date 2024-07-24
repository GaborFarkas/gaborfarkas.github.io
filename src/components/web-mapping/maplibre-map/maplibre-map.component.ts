import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as Maplibre from 'maplibre-gl';
import { WebMap } from '@/models/web-mapping/web-map.model';
import { FeatureSupportFeature } from '@/models/web-mapping/feature-support-feature.model';

/**
 * MapLibre GL JS web map component.
 */
@Component({
    selector: 'div.maplibre',
    standalone: true,
    templateUrl: './maplibre-map.component.html'
})
export class MaplibreMapComponent implements AfterViewInit, WebMap {
    /**
     * The HTML element for the map canvas.
     */
    @ViewChild('map') private mapElem?: ElementRef<HTMLDivElement>;

    /**
     * The Maplibre GL JS map object.
     */
    private map?: Maplibre.Map;

    /**
     * Loads the base map with a simple style and positions it to Pécs.
     */
    ngAfterViewInit(): void {
        if (this.mapElem?.nativeElement) {
            // Load the small base map.
            this.map = new Maplibre.Map({
                container: this.mapElem.nativeElement,
                style: 'https://demotiles.maplibre.org/style.json',
                center: { lat: 46.0756, lng: 18.2210 },
                zoom: 5
            });
        }
    }

    public playExample(feature: FeatureSupportFeature): void {
        throw new Error('Method not implemented.');
    }
}
