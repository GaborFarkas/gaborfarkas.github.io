import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot, faEnvelope, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FullscreenControl, Map as MaplibreMap } from 'maplibre-gl';

/**
 * Footer component.
 */
@Component({
    selector: 'footer',
    standalone: true,
    imports: [FontAwesomeModule, CommonModule],
    templateUrl: './footer.component.html'
})
export class FooterComponent implements AfterViewInit {
    /**
     * FA location marker icon.
     */
    protected marker: IconDefinition = faLocationDot;

    /**
     * FA email icon.
     */
    protected email: IconDefinition = faEnvelope;

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
