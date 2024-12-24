import { AfterViewInit, Component, ElementRef, input, viewChild, ViewEncapsulation } from '@angular/core';
import * as Cesium from 'cesium';
import { WebMap } from '@/models/web-mapping/web-map.model';
import { FeatureSupportFeature } from '@/models/web-mapping/feature-support-feature.model';

type CesiumExampleFunc = (this: Cesium.Viewer, lib: typeof Cesium, map: Cesium.Viewer) => void;

/**
 * Cesium JS web map component.
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
    private mapElem = viewChild.required<ElementRef<HTMLDivElement>>('map');

    /**
     * The Cesium map object.
     */
    private map?: Cesium.Viewer;

    public example = input<string>();

    public exposePlay = input(false);

    constructor() {
        (window as unknown as Record<string, unknown>)['CESIUM_BASE_URL'] = '/assets/cesium/';
    }

    /**
     * Loads the base map with a simple style and positions it to Pécs.
     */
    ngAfterViewInit(): void {
        // Load the small base map.
        this.map = new Cesium.Viewer(this.mapElem().nativeElement);
        this.map.camera.setView({
            destination: Cesium.Cartesian3.fromDegrees(18.2210, 46.0756, 4000000)
        });

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
        import('@/examples/cesiumjs').then(module => {
            const examples = module.default as unknown as Record<FeatureSupportFeature, CesiumExampleFunc>;
            if (examples[feature as FeatureSupportFeature]) {
                this.play(examples[feature as FeatureSupportFeature]);
            }
        });
    }

    /**
     * Executes a user function in the context of the Cesium map. Passes the Cesium library and the map object as arguments.
     * @param func The user function.
     */
    public play(func: CesiumExampleFunc) {
        if (this.map) {
            func.bind(this.map)(Cesium, this.map);
        }
    }
}
