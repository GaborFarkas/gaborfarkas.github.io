import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FullscreenControl, Map as MaplibreMap, StyleSpecification, TerrainControl } from 'maplibre-gl';
import { environment } from '../../environments/environment';
import BuildingControl from '../../utils/maplibregl/BuildingControl';

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
     * The HTML element for the map canvas.
     */
    @ViewChild('map') private mapElem?: ElementRef<HTMLDivElement>;

    /**
     * Gets or sets if extra features are already loaded into the map.
     */
    private extrasLoaded: boolean = false;

    /**
     * Gets or sets if extra features are currently loading into the map.
     */
    private extrasLoading: boolean = false;

    /**
     * The Maplibre GL JS map object.
     */
    private map?: MaplibreMap;

    /**
     * Gets or sets the current base map style.
     */
    private currentStyle: BaseMapStyle = BaseMapStyle.ARTISTIC;

    /**
     * Gets or sets the base map layers associated with a single style.
     */
    private baseMapLayers: Map<BaseMapStyle, string[]> = new Map();

    /**
     * Loads the base map with a simple artistic style and positions it to Pécs.
     */
    ngAfterViewInit(): void {
        if (this.mapElem?.nativeElement) {
            // Load the small base map with the Stamen Watercolor layer.
            this.map = new MaplibreMap({
                container: this.mapElem.nativeElement,
                style: 'https://tiles.stadiamaps.com/styles/stamen_watercolor.json',
                center: { lat: 46.0756, lng: 18.2210 },
                zoom: 12
            });

            // Add full screen control.
            const fsControl = new FullscreenControl({ container: this.mapElem.nativeElement });
            fsControl.on('fullscreenstart', function (this: FooterMapComponent) {
                // Add some extra features when full screen is first toggled.
                if (!this.extrasLoaded && !this.extrasLoading) {
                    this.extrasLoading = true;

                    this.loadExtras();

                    this.extrasLoaded = true;
                    this.extrasLoading = false;
                }
            }.bind(this));

            this.map.addControl(fsControl);
        }
    }

    /**
     * Loads extra features and layers on toggling the map to full screen.
     */
    private loadExtras(): void {
        if (!this.map) {
            return;
        }

        // Add sources and layers for DEM and 3D building extrusions (NOTE: flat roofs only).
        this.map.addSource('buildings-vector', {
            type: 'vector',
            url: `https://api.maptiler.com/tiles/v3/tiles.json?key=${environment.mapTilerApiKey}`
        });
        this.map.addSource('terrainSrc', {
            type: 'raster-dem',
            url: `https://api.maptiler.com/tiles/terrain-rgb/tiles.json?key=${environment.mapTilerApiKey}`,
            tileSize: 256
        });

        this.map.setTerrain({
            source: 'terrainSrc',
            exaggeration: 1
        });

        this.map.addLayer({
            'id': '3d-buildings',
            'source': 'buildings-vector',
            'source-layer': 'building',
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint': {
                'fill-extrusion-color': '#4988cb',
                'fill-extrusion-height': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15,
                    0,
                    16,
                    ['get', 'render_height']
                ],
                'fill-extrusion-base': ['case',
                    ['>=', ['get', 'zoom'], 16],
                    ['get', 'render_min_height'], 0
                ],
                'fill-extrusion-opacity': 0.8
            }
        });

        // Add built-in control to toggle the DEM.
        this.map.addControl(new TerrainControl({
            source: 'terrainSrc',
            exaggeration: 1
        }));

        this.baseMapLayers.set(BaseMapStyle.ARTISTIC, ['watercolor']);
        this.baseMapLayers.set(BaseMapStyle.PRECISE, []);

        // Prepare a new topographic style to choose as base map.
        this.map.setStyle(`https://api.maptiler.com/maps/basic-v2/style.json?key=${environment.mapTilerApiKey}`, {
            transformStyle: function (this: FooterMapComponent, prevStyle: StyleSpecification|undefined, nextStyle: StyleSpecification) {
                return {
                    ...nextStyle,
                    sources: {
                        ...nextStyle.sources,
                        ...prevStyle?.sources
                    },
                    layers: [
                        // Should add the base layers first, watercolor as bottom to have road labels
                        prevStyle!.layers.find(lyr => lyr.id === 'watercolor')!,
                        ...nextStyle.layers.map(lyr => {
                            // Road labels should be always visible
                            if (lyr.id !== 'Road labels') {
                                this.baseMapLayers.get(BaseMapStyle.PRECISE)?.push(lyr.id);
                                lyr.layout = {
                                    ...lyr.layout || {}, visibility: 'none'
                                }
                            }
                            return lyr;
                        }),
                        // Add the 3D buildings last? Or maybe move this below the road labels?
                        prevStyle!.layers.find(lyr => lyr.id === '3d-buildings')!
                    ]
                }
            }.bind(this)
        });

        this.map.addControl(new BuildingControl({
            layer: '3d-buildings'
        }));
    }
}

/**
 * Possible styles for the footer map.
 */
enum BaseMapStyle {
    /** Stamen Watercolor */
    ARTISTIC = 'watercolor',
    /** MapTiler vector tiles */
    PRECISE = 'topographic'
}
