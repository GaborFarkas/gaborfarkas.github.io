import { AfterViewInit, Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import * as Cesium from 'cesium';
import { WebMap } from '@/models/web-mapping/web-map.model';
import { FeatureSupportFeature } from '@/models/web-mapping/feature-support-feature.model';

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
    @ViewChild('map') private mapElem?: ElementRef<HTMLDivElement>;

    /**
     * The Cesium map object.
     */
    private map?: Cesium.Viewer;

    @Input() public example?: string;

    @Input() public exposePlay = false;

    constructor() {
        (window as Record<string, any>)['CESIUM_BASE_URL'] = '/assets/cesium/';
    }

    /**
     * Loads the base map with a simple style and positions it to Pécs.
     */
    ngAfterViewInit(): void {
        if (this.mapElem?.nativeElement) {
            // Load the small base map.
            this.map = new Cesium.Viewer(this.mapElem.nativeElement);
            this.map.camera.setView({
                destination: Cesium.Cartesian3.fromDegrees(18.2210, 46.0756, 4000000)
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
        import('@/examples/cesiumjs').then(module => {
            const examples = module.default;
            if (examples[feature as FeatureSupportFeature]) {
                this.play(examples[feature as FeatureSupportFeature]);
            }
        });
    }

    /**
     * Executes a user function in the context of the Cesium map. Passes the Cesium library and the map object as arguments.
     * @param func The user function.
     */
    public play(func: (this: Cesium.Viewer, lib: typeof Cesium, map: Cesium.Viewer) => void) {
        if (this.map) {
            func.bind(this.map)(Cesium, this.map);
        }
    }
}
