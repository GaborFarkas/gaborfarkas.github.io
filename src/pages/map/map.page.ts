import { CesiumMapComponent } from "@/components/web-mapping/cesium-map/cesium-map.component";
import { LeafletMapComponent } from "@/components/web-mapping/leaflet-map/leaflet-map.component";
import { MaplibreMapComponent } from "@/components/web-mapping/maplibre-map/maplibre-map.component";
import { OpenLayersMapComponent } from "@/components/web-mapping/openlayers-map/openlayers-map.component";
import { MapPageQueryParams } from "@/models/page-url-mapping.model";
import { WebMappingLibrary } from "@/models/web-mapping/web-mapping-library";
import { CommonModule } from "@angular/common";
import { Component, OnInit, signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

/**
 * A standalone map page for the sandbox.
 */
@Component({
    selector: 'map-page',
    templateUrl: './map.page.html',
    imports: [CommonModule, CesiumMapComponent, LeafletMapComponent, MaplibreMapComponent, OpenLayersMapComponent]
})
export class MapPage implements OnInit {
    /**
     * Web mapping library enum exported for the template.
     */
    protected readonly WebMappingLibrary = signal(WebMappingLibrary).asReadonly();

    /**
     * The library to use in the map page.
     */
    protected library = signal(WebMappingLibrary.OPENLAYERS);

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            const lib: string | undefined = params[MapPageQueryParams.LIB];
            if (lib) {
                this.library.set(Object.values(WebMappingLibrary).find(wmLib =>
                    wmLib.toString().toLowerCase() === lib) ?? WebMappingLibrary.OPENLAYERS);
            }
        });
    }
}
