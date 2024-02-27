import { IControl, Map } from "maplibre-gl";

/**
 * MapLibreGL 3D building toggler control.
 */
export default class BuildingControl implements IControl {
    /**
     * The control's button element.
     */
    private container: HTMLDivElement = this.buildDom();

    /**
     * The control's bound map.
     */
    private map?: Map;

    /**
     * The layer id to toggle.
     */
    private buildingLayer: string;

    /**
     * Backing field for the active property.
     */
    private active_: boolean = false;

    /**
     * Gets or sets if the control is currently active.
     */
    private get active(): boolean {
        return this.active_;
    }

    /**
     * Gets or sets if the control is currently active.
     */
    private set active(val: boolean) {
        if (this.active_ !== val) {
            this.active_ = val;
            const btnElem = this.container.querySelector('button');
            if (btnElem) {
                btnElem.className = this.active_ ? 'maplibregl-ctrl-building-enabled' : 'maplibregl-ctrl-building';
                btnElem.title = this.active_ ? 'Disable buildings' : 'Enable buildings';
            }

            this.map?.setLayoutProperty(this.buildingLayer, 'visibility', this.active ? 'visible' : 'none');
        }
    }

    constructor(options: BuildingControlOptions) {
        this.buildingLayer = options.layer;
    }

    onAdd(map: Map): HTMLElement {
        this.map = map;

        // Set the active state of the control from the map's building layer.
        this.active = this.map.getLayoutProperty(this.buildingLayer, 'visibility') !== 'none';

        return this.container;
    }

    onRemove(map: Map): void {
        this.container.remove();
        this.map = undefined;
        this.active = false;
    }

    /**
     * Builds the DOM structure of the control.
     * @returns {HTMLDivElement} The DOM container
     */
    private buildDom(): HTMLDivElement {
        const containerElem = document.createElement('div');
        containerElem.className = 'maplibregl-ctrl maplibregl-ctrl-group';

        const btnElem = document.createElement('button')
        containerElem.appendChild(btnElem);
        btnElem.title = 'Enable buildings';
        btnElem.className = 'maplibregl-ctrl-building';
        btnElem.setAttribute('type', 'button');

        btnElem.addEventListener('click', function (this: BuildingControl) {
            if (this.map) {
                this.active = !this.active;
            }
        }.bind(this));

        const spanElem = document.createElement('span');
        btnElem.appendChild(spanElem);
        spanElem.className = 'maplibregl-ctrl-icon';
        spanElem.setAttribute('aria-hidden', 'true');

        return containerElem;
    }
}

/**
 * Options for the building control.
 */
interface BuildingControlOptions {
    /**
     * The layer to toggle.
     */
    layer: string
}
