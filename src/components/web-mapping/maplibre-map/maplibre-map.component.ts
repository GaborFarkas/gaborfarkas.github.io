import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
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

    @Input() public example?: string;

    @Input() public exposePlay = false;

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

            this.map.on('load', function(this: MaplibreMapComponent) {
                this.map!.setSprite('https://demotiles.maplibre.org/styles/osm-bright-gl-style/sprite');
            }.bind(this));

            if (this.example) {
                this.playExample(this.example);
            }

            if (this.exposePlay) {
                (document as unknown as Record<string, unknown>)['play'] = this.play.bind(this);
                (document as unknown as Record<string, unknown>)['playLoaded'] = true;
                document.dispatchEvent(new Event('playLoaded'));
            }
        }
    }

    public playExample(feature: string): void {
        import('@/examples/maplibregljs').then(module => {
            const examples = module.default;
            if (examples[feature as FeatureSupportFeature]) {
                this.play(examples[feature as FeatureSupportFeature]);
            }
        });
    }

    /**
     * Executes a user function in the context of the Maplibre GL JS map. Passes the Maplibre GL JS library and the map object as arguments.
     * @param func The user function.
     */
    public play(func: (this: Maplibre.Map, lib: typeof Maplibre, map: Maplibre.Map) => void) {
        if (this.map) {
            func.bind(this.map)(Maplibre, this.map);
        }
    }
}
