import { AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ol } from '@/utils/openlayers';
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
    private map?: ol.Map;

    /**
     * Loads the base map with a simple style and positions it to Pécs.
     */
    ngAfterViewInit(): void {
        if (this.mapElem?.nativeElement) {
            // Load the small base map.
            this.map = new ol.Map({
                target: this.mapElem.nativeElement,
                view: new ol.View({
                    center: ol.proj.fromLonLat([18.2210, 46.0756]),
                    zoom: 5
                }),
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.OSM()
                    })
                ]
            });
        }
    }

    public playExample(feature: FeatureSupportFeature): void {
        throw new Error('Method not implemented.');
    }
}
