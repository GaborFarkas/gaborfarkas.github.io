import { AfterViewInit, Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import * as L from 'leaflet';
import { WebMap } from '@/models/web-mapping/web-map.model';
import { FeatureSupportFeature } from '@/models/web-mapping/feature-support-feature.model';

/**
 * Leaflet web map component.
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

    @Input() public example?: string;

    constructor() {
        // Update icon paths
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: '../assets/leaflet/marker-icon-2x.png',
            shadowUrl: '../assets/leaflet/marker-shadow.png'
        });
    }

    /**
     * Loads the base map with a simple style and positions it to Pécs.
     */
    ngAfterViewInit(): void {
        if (this.mapElem?.nativeElement) {
            // Load the small base map.
            this.map = new L.Map(this.mapElem.nativeElement)
                .setView([46.0756, 18.2210], 5);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(this.map);

            if (this.example) {
                this.playExample(this.example);
            }
        }
    }

    public playExample(feature: string): void {
        import('@/examples/leaflet').then(module => {
            const examples = module.default;
            if (examples[feature as FeatureSupportFeature]) {
                this.play(examples[feature as FeatureSupportFeature]);
            }
        });
    }

    /**
     * Executes a user function in the context of the Leaflet map. Passes the Leaflet library and the map object as arguments.
     * @param func The user function.
     */
    public play(func: (this: L.Map, lib: typeof L, map: L.Map) => void) {
        if (this.map) {
            console.log(func.toString());
            func.bind(this.map)(L, this.map);
        }
    }
}
