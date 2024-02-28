import { Evented, IControl, Map } from "maplibre-gl";

/**
 * MapLibreGL 3D layer toggler control.
 */
export default class LayerToggleControl extends Evented implements IControl {
    /**
     * The control's button element.
     */
    private container: HTMLDivElement;

    /**
     * The layers to switch between.
     */
    private layers: [string, string];

    /**
     * The currently selected layer.
     */
    private selLayer: string;

    constructor(options: LayerToggleControlOptions) {
        super();
        this.layers = options.layers;
        this.selLayer = options.selected || this.layers[0];
        this.container = this.buildDom();
    }

    onAdd(map: Map): HTMLElement {
        return this.container;
    }

    onRemove(map: Map): void {
        this.container.remove();
    }

    /**
     * Builds the DOM structure of the control.
     * @returns {HTMLDivElement} The DOM container
     */
    private buildDom(): HTMLDivElement {
        const containerElem = document.createElement('div');
        containerElem.className = 'maplibregl-ctrl maplibregl-ctrl-group';

        const btnElem = document.createElement('button');
        containerElem.appendChild(btnElem);
        btnElem.title = 'Toggle base map';

        btnElem.className = `maplibregl-ctrl-toggler ${this.selLayer} ${this.layers.indexOf(this.selLayer) === 0 ? 'left' : 'right'}`;
        btnElem.setAttribute('type', 'button');

        btnElem.addEventListener('click', function (this: LayerToggleControl) {
            this.selLayer = this.selLayer === this.layers[0] ? this.layers[1] : this.layers[0];
            btnElem.className = `maplibregl-ctrl-toggler ${this.selLayer} ${this.layers.indexOf(this.selLayer) === 0 ? 'left' : 'right'}`;
            this.fire('layerswitch', { layer: this.selLayer });
        }.bind(this));

        const spanElem = document.createElement('span');
        btnElem.appendChild(spanElem);
        spanElem.className = 'maplibregl-ctrl-icon';
        spanElem.setAttribute('aria-hidden', 'true');

        return containerElem;
    }
}

/**
 * Options for the layer toggle control.
 */
interface LayerToggleControlOptions {
    /**
     * The layers to toggle between.
     */
    layers: [string, string],
    /**
     * The currently selected layer. Defaults to the first one.
     */
    selected?: string
}
