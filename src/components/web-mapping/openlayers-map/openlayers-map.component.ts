import { AfterViewInit, Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { OpenLayers } from '@/utils/openlayers';
import { WebMap } from '@/models/web-mapping/web-map.model';
import { FeatureSupportFeature } from '@/models/web-mapping/feature-support-feature.model';

/**
 * OpenLayers web map component.
 */
@Component({
    selector: 'div.openlayers',
    standalone: true,
    templateUrl: './openlayers-map.component.html',
    styleUrl: '../../../../node_modules/ol/ol.css',
    encapsulation: ViewEncapsulation.None
})
export class OpenLayersMapComponent implements AfterViewInit, WebMap {
    /**
     * The HTML element for the map canvas.
     */
    @ViewChild('map') private mapElem?: ElementRef<HTMLDivElement>;

    /**
     * The OpenLayers map object.
     */
    private map?: OpenLayers.Map;

    @Input() public example?: string;

    @Input() public exposePlay = false;

    /**
     * Loads the base map with a simple style and positions it to Pécs.
     */
    ngAfterViewInit(): void {
        if (this.mapElem?.nativeElement) {
            // Load the small base map.
            this.map = new OpenLayers.Map({
                target: this.mapElem.nativeElement,
                view: new OpenLayers.View({
                    center: OpenLayers.proj.fromLonLat([18.2210, 46.0756]),
                    zoom: 5
                }),
                layers: [
                    new OpenLayers.layer.Tile({
                        source: new OpenLayers.source.OSM()
                    })
                ]
            });

            if (this.example) {
                this.playExample(this.example);
            }

            if (this.exposePlay) {
                (document as any).play = this.play.bind(this);
                (document as any).playLoaded = true;
                document.dispatchEvent(new Event('playLoaded'));
            }
        }
    }

    public playExample(feature: string): void {
        import('@/examples/openlayers').then(module => {
            const examples = module.default;
            if (examples[feature as FeatureSupportFeature]) {
                this.play(examples[feature as FeatureSupportFeature]);
            }
        });
    }

    /**
     * Executes a user function in the context of the OpenLayers map. Passes the OpenLayers library and the map object as arguments.
     * @param func The user function.
     */
    public play(func: (this: OpenLayers.Map, lib: typeof OpenLayers, map: OpenLayers.Map) => void) {
        if (this.map) {
            func.bind(this.map)(OpenLayers, this.map);
        }
    }
}
