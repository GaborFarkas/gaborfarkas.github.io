import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FullscreenControl, Map as MaplibreMap } from 'maplibre-gl';

/**
 * Footer map module component.
 */
@Component({
    selector: 'footer-map',
    standalone: true,
    templateUrl: './footer-map.component.html'
})
export class FooterMapComponent implements AfterViewInit {
    /**
     * The HTML element for the map canvas
     */
    @ViewChild('map') private mapElem?: ElementRef<HTMLDivElement>;

    ngAfterViewInit() {
        if (this.mapElem?.nativeElement) {
            new MaplibreMap({
                container: this.mapElem.nativeElement,
                style: 'https://tiles.stadiamaps.com/styles/stamen_watercolor.json',
                center: { lat: 46.075613520277756, lng: 18.22102546962799 },
                zoom: 12
            }).addControl(new FullscreenControl({container: this.mapElem.nativeElement}));
        }
    }
}
