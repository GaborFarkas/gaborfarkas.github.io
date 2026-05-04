import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import * as Maplibre from 'maplibre-gl';
import { WebMap } from '@/models/web-mapping/web-map.model';
import { FeatureSupportFeature } from '@/models/web-mapping/feature-support-feature.model';

type MaplibreExampleFunc = (this: Maplibre.Map, maplibregl: typeof Maplibre, map: Maplibre.Map) => void;

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
    private mapElem = viewChild.required<ElementRef<HTMLDivElement>>('map');

    /**
     * The Maplibre GL JS map object.
     */
    private map?: Maplibre.Map;

    public example = input<string>();

    public exposePlay = input(false);

    /**
     * Loads the base map with a simple style and positions it to Pécs.
     */
    ngAfterViewInit(): void {
        // Load the small base map.
        this.map = new Maplibre.Map({
            container: this.mapElem().nativeElement,
            style: 'https://demotiles.maplibre.org/style.json',
            center: { lat: 46.0756, lng: 18.2210 },
            zoom: 5
        });

        this.map.on('load', function (this: MaplibreMapComponent) {
            this.map!.setSprite('https://demotiles.maplibre.org/styles/osm-bright-gl-style/sprite');
        }.bind(this));

        const example = this.example();
        if (example) {
            this.playExample(example);
        }

        if (this.exposePlay()) {
            (document as unknown as Record<string, unknown>)['play'] = this.play.bind(this);
            (document as unknown as Record<string, unknown>)['playLoaded'] = true;
            document.dispatchEvent(new Event('playLoaded'));
        }
    }

    public playExample(feature: string): void {
        import('@/examples/maplibregljs').then(module => {
            const examples = module.default as unknown as Record<FeatureSupportFeature, MaplibreExampleFunc>;
            if (examples[feature as FeatureSupportFeature]) {
                this.play(examples[feature as FeatureSupportFeature]);
            }
        });
    }

    /**
     * Executes a user function in the context of the Maplibre GL JS map. Passes the Maplibre GL JS library and the map object as arguments.
     * @param func The user function.
     */
    public play(func: MaplibreExampleFunc) {
        if (this.map) {
            func.bind(this.map)(Maplibre, this.map);
        }
    }
}
