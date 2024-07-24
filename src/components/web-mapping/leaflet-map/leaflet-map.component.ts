import { AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import * as L from 'leaflet';
import { WebMap } from '@/models/web-mapping/web-map.model';
import { FeatureSupportFeature } from '@/models/web-mapping/feature-support-feature.model';

/**
 * MapLibre GL JS web map component.
 */
@Component({
    selector: 'div.leaflet',
    standalone: true,
    templateUrl: './leaflet-map.component.html',
    styleUrl: '../../../../node_modules/leaflet/dist/leaflet.css',
    encapsulation: ViewEncapsulation.None
})
export class LeafletMapComponent implements AfterViewInit, WebMap {
    /**
     * The HTML element for the map canvas.
     */
    @ViewChild('map') private mapElem?: ElementRef<HTMLDivElement>;

    /**
     * The Leaflet map object.
     */
    private map?: L.Map;

    /**
     * Loads the base map with a simple style and positions it to Pécs.
     */
    ngAfterViewInit(): void {
        if (this.mapElem?.nativeElement) {
            // Load the small base map.
            this.map = new L.Map(this.mapElem.nativeElement)
                .setView([46.0756, 18.2210], 5);

            this.map.whenReady(function (this: LeafletMapComponent) {
                setTimeout(function (this: LeafletMapComponent) {
                    this.map!.invalidateSize();
                }.bind(this), 500);
            }.bind(this));

            console.log(this.map);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(this.map!);
        }
    }

    public playExample(feature: FeatureSupportFeature): void {
        throw new Error('Method not implemented.');
    }
}
