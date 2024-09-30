declare namespace L {
export class Bounds {
    constructor(a: any, b: any);

    contains(obj: any): any;

    equals(bounds: any): any;

    extend(obj: any): any;

    getBottomLeft(): any;

    getBottomRight(): any;

    getCenter(round: any): any;

    getSize(): any;

    getTopLeft(): any;

    getTopRight(): any;

    intersects(bounds: any): any;

    isValid(): any;

    overlaps(bounds: any): any;

    pad(bufferRatio: any): any;

}

export class Canvas {
    constructor(...args: any[]);

    callInitHooks(): void;

    getEvents(): any;

    onAdd(): void;

    static addInitHook(fn: any, ...args: any[]): any;

    static extend(props: any, ...args: any[]): any;

    static include(props: any): any;

    static mergeOptions(options: any): any;

}

export class Circle {
    constructor(...args: any[]);

    callInitHooks(): void;

    getBounds(): any;

    getRadius(): any;

    initialize(latlng: any, options: any, legacyOptions: any): void;

    setRadius(radius: any): any;

    setStyle(style: any): any;

    toGeoJSON(precision: any): any;

    static addInitHook(fn: any, ...args: any[]): any;

    static extend(props: any, ...args: any[]): any;

    static include(props: any): any;

    static mergeOptions(options: any): any;

}

export class CircleMarker {
    constructor(...args: any[]);

    callInitHooks(): void;

    getLatLng(): any;

    getRadius(): any;

    initialize(latlng: any, options: any): void;

    setLatLng(latlng: any): any;

    setRadius(radius: any): any;

    setStyle(options: any): any;

    toGeoJSON(precision: any): any;

    static addInitHook(fn: any, ...args: any[]): any;

    static extend(props: any, ...args: any[]): any;

    static include(props: any): any;

    static mergeOptions(options: any): any;

}

export class Control {
    constructor(...args: any[]);

    addTo(map: any): any;

    callInitHooks(): void;

    getContainer(): any;

    getPosition(): any;

    initialize(options: any): void;

    remove(): any;

    setPosition(position: any): any;

    static addInitHook(fn: any, ...args: any[]): any;

    static extend(props: any, ...args: any[]): any;

    static include(props: any): any;

    static mergeOptions(options: any): any;

}

export class DivIcon {
    constructor(...args: any[]);

    callInitHooks(): void;

    createIcon(oldIcon: any): any;

    createShadow(): any;

    static addInitHook(fn: any, ...args: any[]): any;

    static extend(props: any, ...args: any[]): any;

    static include(props: any): any;

    static mergeOptions(options: any): any;

}

export class DivOverlay {
    constructor(...args: any[]);

    bringToBack(): any;

    bringToFront(): any;

    callInitHooks(): void;

    close(): any;

    getContent(): any;

    getElement(): any;

    getEvents(): any;

    getLatLng(): any;

    initialize(options: any, source: any): void;

    isOpen(): any;

    onAdd(map: any): void;

    onRemove(map: any): void;

    openOn(map: any, ...args: any[]): any;

    setContent(content: any): any;

    setLatLng(latlng: any): any;

    toggle(layer: any, ...args: any[]): any;

    update(): void;

    static addInitHook(fn: any, ...args: any[]): any;

    static extend(props: any, ...args: any[]): any;

    static include(props: any): any;

    static mergeOptions(options: any): any;

}

export class Draggable {
    constructor(...args: any[]);

    callInitHooks(): void;

    disable(): void;

    enable(): void;

    finishDrag(noInertia: any): void;

    initialize(element: any, dragStartTarget: any, preventOutline: any, options: any): void;

    static addInitHook(fn: any, ...args: any[]): any;

    static extend(props: any, ...args: any[]): any;

    static include(props: any): any;

    static mergeOptions(options: any): any;

}

export class Evented {
    constructor(...args: any[]);

    addEventListener(types: any, fn: any, context: any): any;

    addEventParent(obj: any): any;

    addOneTimeEventListener(types: any, fn: any, context: any): any;

    callInitHooks(): void;

    clearAllEventListeners(types: any, fn: any, context: any, ...args: any[]): any;

    fire(type: any, data: any, propagate: any): any;

    fireEvent(type: any, data: any, propagate: any): any;

    hasEventListeners(type: any, fn: any, context: any, propagate: any): any;

    listens(type: any, fn: any, context: any, propagate: any): any;

    off(types: any, fn: any, context: any, ...args: any[]): any;

    on(types: any, fn: any, context: any): any;

    once(types: any, fn: any, context: any): any;

    removeEventListener(types: any, fn: any, context: any, ...args: any[]): any;

    removeEventParent(obj: any): any;

    static addInitHook(fn: any, ...args: any[]): any;

    static extend(props: any, ...args: any[]): any;

    static include(props: any): any;

    static mergeOptions(options: any): any;

}

export class FeatureGroup {
    constructor(...args: any[]);

    addLayer(layer: any): any;

    bringToBack(): any;

    bringToFront(): any;

    callInitHooks(): void;

    getBounds(): any;

    removeLayer(layer: any): any;

    setStyle(style: any): any;

    static addInitHook(fn: any, ...args: any[]): any;

    static extend(props: any, ...args: any[]): any;

    static include(props: any): any;

    static mergeOptions(options: any): any;

}

export class GeoJSON {
    constructor(...args: any[]);

    addData(geojson: any): any;

    callInitHooks(): void;

    initialize(geojson: any, options: any): void;

    resetStyle(layer: any): any;

    setStyle(style: any): any;

    static addInitHook(fn: any, ...args: any[]): any;

    static asFeature(geojson: any): any;

    static coordsToLatLng(coords: any): any;

    static coordsToLatLngs(coords: any, levelsDeep: any, _coordsToLatLng: any): any;

    static extend(props: any, ...args: any[]): any;

    static geometryToLayer(geojson: any, options: any): any;

    static getFeature(layer: any, newGeometry: any): any;

    static include(props: any): any;

    static latLngToCoords(latlng: any, precision: any): any;

    static latLngsToCoords(latlngs: any, levelsDeep: any, closed: any, precision: any): any;

    static mergeOptions(options: any): any;

}

export class GridLayer {
    constructor(...args: any[]);

    beforeAdd(map: any): void;

    bringToBack(): any;

    bringToFront(): any;

    callInitHooks(): void;

    createTile(): any;

    getContainer(): any;

    getEvents(): any;

    getTileSize(): any;

    initialize(options: any): void;

    isLoading(): any;

    onAdd(): void;

    onRemove(map: any): void;

    redraw(): any;

    setOpacity(opacity: any): any;

    setZIndex(zIndex: any): any;

    static addInitHook(fn: any, ...args: any[]): any;

    static extend(props: any, ...args: any[]): any;

    static include(props: any): any;

    static mergeOptions(options: any): any;

}

export class Handler {
    constructor(...args: any[]);

    callInitHooks(): void;

    disable(): any;

    enable(): any;

    enabled(): any;

    initialize(map: any): void;

    static addInitHook(fn: any, ...args: any[]): any;

    static addTo(map: any, name: any): any;

    static extend(props: any, ...args: any[]): any;

    static include(props: any): any;

    static mergeOptions(options: any): any;

}

export class Icon {
    constructor(...args: any[]);

    callInitHooks(): void;

    createIcon(oldIcon: any): any;

    createShadow(oldIcon: any): any;

    initialize(options: any): void;

    static addInitHook(fn: any, ...args: any[]): any;

    static extend(props: any, ...args: any[]): any;

    static include(props: any): any;

    static mergeOptions(options: any): any;

}

export class ImageOverlay {
    constructor(...args: any[]);

    bringToBack(): any;

    bringToFront(): any;

    callInitHooks(): void;

    getBounds(): any;

    getCenter(): any;

    getElement(): any;

    getEvents(): any;

    initialize(url: any, bounds: any, options: any): void;

    onAdd(): void;

    onRemove(): void;

    setBounds(bounds: any): any;

    setOpacity(opacity: any): any;

    setStyle(styleOpts: any): any;

    setUrl(url: any): any;

    setZIndex(value: any): any;

    static addInitHook(fn: any, ...args: any[]): any;

    static extend(props: any, ...args: any[]): any;

    static include(props: any): any;

    static mergeOptions(options: any): any;

}

export class LatLng {
    constructor(lat: any, lng: any, alt: any);

    clone(): any;

    distanceTo(other: any): any;

    equals(obj: any, maxMargin: any): any;

    toBounds(sizeInMeters: any): any;

    toString(precision: any): any;

    wrap(): any;

}

export class LatLngBounds {
    constructor(corner1: any, corner2: any);

    contains(obj: any): any;

    equals(bounds: any, maxMargin: any): any;

    extend(obj: any): any;

    getCenter(): any;

    getEast(): any;

    getNorth(): any;

    getNorthEast(): any;

    getNorthWest(): any;

    getSouth(): any;

    getSouthEast(): any;

    getSouthWest(): any;

    getWest(): any;

    intersects(bounds: any): any;

    isValid(): any;

    overlaps(bounds: any): any;

    pad(bufferRatio: any): any;

    toBBoxString(): any;

}

export class Layer {
    constructor(...args: any[]);

    addInteractiveTarget(targetEl: any): any;

    addTo(map: any): any;

    bindPopup(content: any, options: any): any;

    bindTooltip(content: any, options: any): any;

    callInitHooks(): void;

    closePopup(): any;

    closeTooltip(): any;

    getAttribution(): any;

    getPane(name: any): any;

    getPopup(): any;

    getTooltip(): any;

    isPopupOpen(): any;

    isTooltipOpen(): any;

    openPopup(latlng: any): any;

    openTooltip(latlng: any): any;

    remove(): any;

    removeFrom(obj: any): any;

    removeInteractiveTarget(targetEl: any): any;

    setPopupContent(content: any): any;

    setTooltipContent(content: any): any;

    togglePopup(): any;

    toggleTooltip(): any;

    unbindPopup(): any;

    unbindTooltip(): any;

    static addInitHook(fn: any, ...args: any[]): any;

    static extend(props: any, ...args: any[]): any;

    static include(props: any): any;

    static mergeOptions(options: any): any;

}

export class LayerGroup {
    constructor(...args: any[]);

    addLayer(layer: any): any;

    callInitHooks(): void;

    clearLayers(): any;

    eachLayer(method: any, context: any): any;

    getLayer(id: any): any;

    getLayerId(layer: any): any;

    getLayers(): any;

    hasLayer(layer: any): any;

    initialize(layers: any, options: any): void;

    invoke(methodName: any, ...args: any[]): any;

    onAdd(map: any): void;

    onRemove(map: any): void;

    removeLayer(layer: any): any;

    setZIndex(zIndex: any): any;

    toGeoJSON(precision: any): any;

    toMultiPoint(precision: any): any;

    static addInitHook(fn: any, ...args: any[]): any;

    static extend(props: any, ...args: any[]): any;

    static include(props: any): any;

    static mergeOptions(options: any): any;

}

export class Map {
    constructor(...args: any[]);

    addControl(control: any): any;

    addHandler(name: any, HandlerClass: any): any;

    addLayer(layer: any): any;

    callInitHooks(): void;

    closePopup(popup: any, ...args: any[]): any;

    closeTooltip(tooltip: any): any;

    containerPointToLatLng(point: any): any;

    containerPointToLayerPoint(point: any): any;

    createPane(name: any, container: any): any;

    distance(latlng1: any, latlng2: any): any;

    eachLayer(method: any, context: any): any;

    fitBounds(bounds: any, options: any): any;

    fitWorld(options: any): any;

    flyTo(targetCenter: any, targetZoom: any, options: any): any;

    flyToBounds(bounds: any, options: any): any;

    getBounds(): any;

    getBoundsZoom(bounds: any, inside: any, padding: any): any;

    getCenter(): any;

    getContainer(): any;

    getMaxZoom(): any;

    getMinZoom(): any;

    getPane(pane: any): any;

    getPanes(): any;

    getPixelBounds(center: any, zoom: any): any;

    getPixelOrigin(): any;

    getPixelWorldBounds(zoom: any): any;

    getRenderer(layer: any): any;

    getScaleZoom(scale: any, fromZoom: any): any;

    getSize(): any;

    getZoom(): any;

    getZoomScale(toZoom: any, fromZoom: any): any;

    hasLayer(layer: any): any;

    initialize(id: any, options: any): void;

    invalidateSize(options: any): any;

    latLngToContainerPoint(latlng: any): any;

    latLngToLayerPoint(latlng: any): any;

    layerPointToContainerPoint(point: any): any;

    layerPointToLatLng(point: any): any;

    locate(options: any): any;

    mouseEventToContainerPoint(e: any): any;

    mouseEventToLatLng(e: any): any;

    mouseEventToLayerPoint(e: any): any;

    openPopup(popup: any, latlng: any, options: any): any;

    openTooltip(tooltip: any, latlng: any, options: any): any;

    panBy(offset: any, options: any): any;

    panInside(latlng: any, options: any): any;

    panInsideBounds(bounds: any, options: any): any;

    panTo(center: any, options: any): any;

    project(latlng: any, zoom: any): any;

    remove(): any;

    removeControl(control: any): any;

    removeLayer(layer: any): any;

    setMaxBounds(bounds: any): any;

    setMaxZoom(zoom: any): any;

    setMinZoom(zoom: any): any;

    setView(center: any, zoom: any, options: any): any;

    setZoom(zoom: any, options: any): any;

    setZoomAround(latlng: any, zoom: any, options: any): any;

    stop(): any;

    stopLocate(): any;

    unproject(point: any, zoom: any): any;

    whenReady(callback: any, context: any): any;

    wrapLatLng(latlng: any): any;

    wrapLatLngBounds(latlng: any): any;

    zoomIn(delta: any, options: any): any;

    zoomOut(delta: any, options: any): any;

    static addInitHook(fn: any, ...args: any[]): any;

    static extend(props: any, ...args: any[]): any;

    static include(props: any): any;

    static mergeOptions(options: any): any;

}

export class Marker {
    constructor(...args: any[]);

    callInitHooks(): void;

    getElement(): any;

    getEvents(): any;

    getIcon(): any;

    getLatLng(): any;

    initialize(latlng: any, options: any): void;

    onAdd(map: any): void;

    onRemove(map: any): void;

    setIcon(icon: any): any;

    setLatLng(latlng: any): any;

    setOpacity(opacity: any): any;

    setZIndexOffset(offset: any): any;

    toGeoJSON(precision: any): any;

    update(): any;

    static addInitHook(fn: any, ...args: any[]): any;

    static extend(props: any, ...args: any[]): any;

    static include(props: any): any;

    static mergeOptions(options: any): any;

}

export class Path {
    constructor(...args: any[]);

    beforeAdd(map: any): void;

    bringToBack(): any;

    bringToFront(): any;

    callInitHooks(): void;

    getElement(): any;

    onAdd(): void;

    onRemove(): void;

    redraw(): any;

    setStyle(style: any): any;

    static addInitHook(fn: any, ...args: any[]): any;

    static extend(props: any, ...args: any[]): any;

    static include(props: any): any;

    static mergeOptions(options: any): any;

}

export class Point {
    constructor(x: any, y: any, round: any);

    add(point: any): any;

    ceil(): any;

    clone(): any;

    contains(point: any): any;

    distanceTo(point: any): any;

    divideBy(num: any): any;

    equals(point: any): any;

    floor(): any;

    multiplyBy(num: any): any;

    round(): any;

    scaleBy(point: any): any;

    subtract(point: any): any;

    toString(): any;

    trunc(): any;

    unscaleBy(point: any): any;

}

export class Polygon {
    constructor(...args: any[]);

    callInitHooks(): void;

    getCenter(): any;

    isEmpty(): any;

    toGeoJSON(precision: any): any;

    static addInitHook(fn: any, ...args: any[]): any;

    static extend(props: any, ...args: any[]): any;

    static include(props: any): any;

    static mergeOptions(options: any): any;

}

export class Polyline {
    constructor(...args: any[]);

    addLatLng(latlng: any, latlngs: any): any;

    callInitHooks(): void;

    closestLayerPoint(p: any): any;

    getBounds(): any;

    getCenter(): any;

    getLatLngs(): any;

    initialize(latlngs: any, options: any): void;

    isEmpty(): any;

    setLatLngs(latlngs: any): any;

    toGeoJSON(precision: any): any;

    static addInitHook(fn: any, ...args: any[]): any;

    static extend(props: any, ...args: any[]): any;

    static include(props: any): any;

    static mergeOptions(options: any): any;

}

export class Popup {
    constructor(...args: any[]);

    callInitHooks(): void;

    getEvents(): any;

    onAdd(map: any): void;

    onRemove(map: any): void;

    openOn(map: any, ...args: any[]): any;

    static addInitHook(fn: any, ...args: any[]): any;

    static extend(props: any, ...args: any[]): any;

    static include(props: any): any;

    static mergeOptions(options: any): any;

}

export class PosAnimation {
    constructor(...args: any[]);

    callInitHooks(): void;

    run(el: any, newPos: any, duration: any, easeLinearity: any): void;

    stop(): void;

    static addInitHook(fn: any, ...args: any[]): any;

    static extend(props: any, ...args: any[]): any;

    static include(props: any): any;

    static mergeOptions(options: any): any;

}

export class Rectangle {
    constructor(...args: any[]);

    callInitHooks(): void;

    initialize(latLngBounds: any, options: any): void;

    setBounds(latLngBounds: any): any;

    static addInitHook(fn: any, ...args: any[]): any;

    static extend(props: any, ...args: any[]): any;

    static include(props: any): any;

    static mergeOptions(options: any): any;

}

export class Renderer {
    constructor(...args: any[]);

    callInitHooks(): void;

    getEvents(): any;

    initialize(options: any): void;

    onAdd(): void;

    onRemove(): void;

    static addInitHook(fn: any, ...args: any[]): any;

    static extend(props: any, ...args: any[]): any;

    static include(props: any): any;

    static mergeOptions(options: any): any;

}

export class SVG {
    constructor(...args: any[]);

    callInitHooks(): void;

    static addInitHook(fn: any, ...args: any[]): any;

    static create(name: any): any;

    static extend(props: any, ...args: any[]): any;

    static include(props: any): any;

    static mergeOptions(options: any): any;

    static pointsToPath(rings: any, closed: any): any;

}

export class SVGOverlay {
    constructor(...args: any[]);

    callInitHooks(): void;

    static addInitHook(fn: any, ...args: any[]): any;

    static extend(props: any, ...args: any[]): any;

    static include(props: any): any;

    static mergeOptions(options: any): any;

}

export class TileLayer {
    constructor(...args: any[]);

    callInitHooks(): void;

    createTile(coords: any, done: any): any;

    getTileUrl(coords: any): any;

    initialize(url: any, options: any): void;

    setUrl(url: any, noRedraw: any): any;

    static addInitHook(fn: any, ...args: any[]): any;

    static extend(props: any, ...args: any[]): any;

    static include(props: any): any;

    static mergeOptions(options: any): any;

}

export class Tooltip {
    constructor(...args: any[]);

    callInitHooks(): void;

    getEvents(): any;

    onAdd(map: any): void;

    onRemove(map: any): void;

    setOpacity(opacity: any): void;

    static addInitHook(fn: any, ...args: any[]): any;

    static extend(props: any, ...args: any[]): any;

    static include(props: any): any;

    static mergeOptions(options: any): any;

}

export class Transformation {
    constructor(a: any, b: any, c: any, d: any);

    transform(point: any, scale: any): any;

    untransform(point: any, scale: any): any;

}

export class VideoOverlay {
    constructor(...args: any[]);

    callInitHooks(): void;

    static addInitHook(fn: any, ...args: any[]): any;

    static extend(props: any, ...args: any[]): any;

    static include(props: any): any;

    static mergeOptions(options: any): any;

}

export const Browser: {
    android: boolean;
    android23: boolean;
    androidStock: boolean;
    any3d: boolean;
    canvas: boolean;
    chrome: boolean;
    edge: boolean;
    gecko: boolean;
    gecko3d: boolean;
    ie: boolean;
    ie3d: boolean;
    ielt9: boolean;
    inlineSvg: boolean;
    linux: boolean;
    mac: boolean;
    mobile: boolean;
    mobileGecko: boolean;
    mobileOpera: boolean;
    mobileWebkit: boolean;
    mobileWebkit3d: boolean;
    msPointer: any;
    opera: boolean;
    opera12: boolean;
    passiveEvents: boolean;
    phantom: boolean;
    pointer: boolean;
    retina: boolean;
    safari: boolean;
    svg: boolean;
    touch: boolean;
    touchNative: boolean;
    vml: boolean;
    webkit: boolean;
    webkit3d: boolean;
    win: boolean;
};

export const Mixin: {
    Events: {
        addEventListener: any;
        addEventParent: any;
        addOneTimeEventListener: any;
        clearAllEventListeners: any;
        fire: any;
        fireEvent: any;
        hasEventListeners: any;
        listens: any;
        off: any;
        on: any;
        once: any;
        removeEventListener: any;
        removeEventParent: any;
    };
};

export const Projection: {
    LonLat: {
        bounds: {
            contains: any;
            equals: any;
            extend: any;
            getBottomLeft: any;
            getBottomRight: any;
            getCenter: any;
            getSize: any;
            getTopLeft: any;
            getTopRight: any;
            intersects: any;
            isValid: any;
            max: {
                add: any;
                ceil: any;
                clone: any;
                contains: any;
                distanceTo: any;
                divideBy: any;
                equals: any;
                floor: any;
                multiplyBy: any;
                round: any;
                scaleBy: any;
                subtract: any;
                toString: any;
                trunc: any;
                unscaleBy: any;
                x: number;
                y: number;
            };
            min: {
                add: any;
                ceil: any;
                clone: any;
                contains: any;
                distanceTo: any;
                divideBy: any;
                equals: any;
                floor: any;
                multiplyBy: any;
                round: any;
                scaleBy: any;
                subtract: any;
                toString: any;
                trunc: any;
                unscaleBy: any;
                x: number;
                y: number;
            };
            overlaps: any;
            pad: any;
        };
        project: any;
        unproject: any;
    };
    Mercator: {
        R: number;
        R_MINOR: number;
        bounds: {
            contains: any;
            equals: any;
            extend: any;
            getBottomLeft: any;
            getBottomRight: any;
            getCenter: any;
            getSize: any;
            getTopLeft: any;
            getTopRight: any;
            intersects: any;
            isValid: any;
            max: {
                add: any;
                ceil: any;
                clone: any;
                contains: any;
                distanceTo: any;
                divideBy: any;
                equals: any;
                floor: any;
                multiplyBy: any;
                round: any;
                scaleBy: any;
                subtract: any;
                toString: any;
                trunc: any;
                unscaleBy: any;
                x: number;
                y: number;
            };
            min: {
                add: any;
                ceil: any;
                clone: any;
                contains: any;
                distanceTo: any;
                divideBy: any;
                equals: any;
                floor: any;
                multiplyBy: any;
                round: any;
                scaleBy: any;
                subtract: any;
                toString: any;
                trunc: any;
                unscaleBy: any;
                x: number;
                y: number;
            };
            overlaps: any;
            pad: any;
        };
        project: any;
        unproject: any;
    };
    SphericalMercator: {
        MAX_LATITUDE: number;
        R: number;
        bounds: {
            contains: any;
            equals: any;
            extend: any;
            getBottomLeft: any;
            getBottomRight: any;
            getCenter: any;
            getSize: any;
            getTopLeft: any;
            getTopRight: any;
            intersects: any;
            isValid: any;
            max: {
                add: any;
                ceil: any;
                clone: any;
                contains: any;
                distanceTo: any;
                divideBy: any;
                equals: any;
                floor: any;
                multiplyBy: any;
                round: any;
                scaleBy: any;
                subtract: any;
                toString: any;
                trunc: any;
                unscaleBy: any;
                x: number;
                y: number;
            };
            min: {
                add: any;
                ceil: any;
                clone: any;
                contains: any;
                distanceTo: any;
                divideBy: any;
                equals: any;
                floor: any;
                multiplyBy: any;
                round: any;
                scaleBy: any;
                subtract: any;
                toString: any;
                trunc: any;
                unscaleBy: any;
                x: number;
                y: number;
            };
            overlaps: any;
            pad: any;
        };
        project: any;
        unproject: any;
    };
};

export const version: string;

export function Class(): void;

export function bind(fn: any, obj: any, ...args: any[]): any;

export function bounds(a: any, b: any): any;

export function canvas(options: any): any;

export function circle(latlng: any, options: any, legacyOptions: any): any;

export function circleMarker(latlng: any, options: any): any;

export function control(options: any): any;

export function divIcon(options: any): any;

export function extend(dest: any, ...args: any[]): any;

export function featureGroup(layers: any, options: any): any;

export function geoJSON(geojson: any, options: any): any;

export function geoJson(geojson: any, options: any): any;

export function gridLayer(options: any): any;

export function icon(options: any): any;

export function imageOverlay(url: any, bounds: any, options: any): any;

export function latLng(a: any, b: any, c: any): any;

export function latLngBounds(a: any, b: any): any;

export function layerGroup(layers: any, options: any): any;

export function map(id: any, options: any): any;

export function marker(latlng: any, options: any): any;

export function noConflict(): any;

export function point(x: any, y: any, round: any): any;

export function polygon(latlngs: any, options: any): any;

export function polyline(latlngs: any, options: any): any;

export function popup(options: any, source: any): any;

export function rectangle(latLngBounds: any, options: any): any;

export function setOptions(obj: any, options: any): any;

export function stamp(obj: any): any;

export function svg(options: any): any;

export function svgOverlay(el: any, bounds: any, options: any): any;

export function tileLayer(url: any, options: any): any;

export function tooltip(options: any, source: any): any;

export function transformation(a: any, b: any, c: any, d: any): any;

export function videoOverlay(video: any, bounds: any, options: any): any;

export namespace CRS {
    const infinite: boolean;

    function getProjectedBounds(zoom: any): any;

    function latLngToPoint(latlng: any, zoom: any): any;

    function pointToLatLng(point: any, zoom: any): any;

    function project(latlng: any): any;

    function scale(zoom: any): any;

    function unproject(point: any): any;

    function wrapLatLng(latlng: any): any;

    function wrapLatLngBounds(bounds: any): any;

    function zoom(scale: any): any;

    namespace EPSG3395 {
        const R: number;

        const code: string;

        const infinite: boolean;

        const wrapLng: number[];

        function distance(latlng1: any, latlng2: any): any;

        function getProjectedBounds(zoom: any): any;

        function latLngToPoint(latlng: any, zoom: any): any;

        function pointToLatLng(point: any, zoom: any): any;

        function project(latlng: any): any;

        function scale(zoom: any): any;

        function unproject(point: any): any;

        function wrapLatLng(latlng: any): any;

        function wrapLatLngBounds(bounds: any): any;

        function zoom(scale: any): any;

        namespace projection {
            const R: number;

            const R_MINOR: number;

            function project(latlng: any): any;

            function unproject(point: any): any;

            namespace bounds {
                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG3395.projection.bounds
                const contains: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG3395.projection.bounds
                const equals: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG3395.projection.bounds
                const extend: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG3395.projection.bounds
                const getBottomLeft: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG3395.projection.bounds
                const getBottomRight: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG3395.projection.bounds
                const getCenter: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG3395.projection.bounds
                const getSize: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG3395.projection.bounds
                const getTopLeft: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG3395.projection.bounds
                const getTopRight: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG3395.projection.bounds
                const intersects: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG3395.projection.bounds
                const isValid: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG3395.projection.bounds
                const max: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG3395.projection.bounds
                const min: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG3395.projection.bounds
                const overlaps: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG3395.projection.bounds
                const pad: any;

            }

        }

        namespace transformation {
            function transform(point: any, scale: any): any;

            function untransform(point: any, scale: any): any;

        }

    }

    namespace EPSG3857 {
        const R: number;

        const code: string;

        const infinite: boolean;

        const wrapLng: number[];

        function distance(latlng1: any, latlng2: any): any;

        function getProjectedBounds(zoom: any): any;

        function latLngToPoint(latlng: any, zoom: any): any;

        function pointToLatLng(point: any, zoom: any): any;

        function project(latlng: any): any;

        function scale(zoom: any): any;

        function unproject(point: any): any;

        function wrapLatLng(latlng: any): any;

        function wrapLatLngBounds(bounds: any): any;

        function zoom(scale: any): any;

        namespace projection {
            const MAX_LATITUDE: number;

            const R: number;

            function project(latlng: any): any;

            function unproject(point: any): any;

            namespace bounds {
                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG3857.projection.bounds
                const contains: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG3857.projection.bounds
                const equals: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG3857.projection.bounds
                const extend: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG3857.projection.bounds
                const getBottomLeft: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG3857.projection.bounds
                const getBottomRight: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG3857.projection.bounds
                const getCenter: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG3857.projection.bounds
                const getSize: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG3857.projection.bounds
                const getTopLeft: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG3857.projection.bounds
                const getTopRight: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG3857.projection.bounds
                const intersects: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG3857.projection.bounds
                const isValid: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG3857.projection.bounds
                const max: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG3857.projection.bounds
                const min: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG3857.projection.bounds
                const overlaps: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG3857.projection.bounds
                const pad: any;

            }

        }

        namespace transformation {
            function transform(point: any, scale: any): any;

            function untransform(point: any, scale: any): any;

        }

    }

    namespace EPSG4326 {
        const R: number;

        const code: string;

        const infinite: boolean;

        const wrapLng: number[];

        function distance(latlng1: any, latlng2: any): any;

        function getProjectedBounds(zoom: any): any;

        function latLngToPoint(latlng: any, zoom: any): any;

        function pointToLatLng(point: any, zoom: any): any;

        function project(latlng: any): any;

        function scale(zoom: any): any;

        function unproject(point: any): any;

        function wrapLatLng(latlng: any): any;

        function wrapLatLngBounds(bounds: any): any;

        function zoom(scale: any): any;

        namespace projection {
            function project(latlng: any): any;

            function unproject(point: any): any;

            namespace bounds {
                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG4326.projection.bounds
                const contains: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG4326.projection.bounds
                const equals: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG4326.projection.bounds
                const extend: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG4326.projection.bounds
                const getBottomLeft: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG4326.projection.bounds
                const getBottomRight: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG4326.projection.bounds
                const getCenter: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG4326.projection.bounds
                const getSize: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG4326.projection.bounds
                const getTopLeft: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG4326.projection.bounds
                const getTopRight: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG4326.projection.bounds
                const intersects: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG4326.projection.bounds
                const isValid: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG4326.projection.bounds
                const max: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG4326.projection.bounds
                const min: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG4326.projection.bounds
                const overlaps: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG4326.projection.bounds
                const pad: any;

            }

        }

        namespace transformation {
            function transform(point: any, scale: any): any;

            function untransform(point: any, scale: any): any;

        }

    }

    namespace EPSG900913 {
        const R: number;

        const code: string;

        const infinite: boolean;

        const wrapLng: number[];

        function distance(latlng1: any, latlng2: any): any;

        function getProjectedBounds(zoom: any): any;

        function latLngToPoint(latlng: any, zoom: any): any;

        function pointToLatLng(point: any, zoom: any): any;

        function project(latlng: any): any;

        function scale(zoom: any): any;

        function unproject(point: any): any;

        function wrapLatLng(latlng: any): any;

        function wrapLatLngBounds(bounds: any): any;

        function zoom(scale: any): any;

        namespace projection {
            const MAX_LATITUDE: number;

            const R: number;

            function project(latlng: any): any;

            function unproject(point: any): any;

            namespace bounds {
                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG900913.projection.bounds
                const contains: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG900913.projection.bounds
                const equals: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG900913.projection.bounds
                const extend: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG900913.projection.bounds
                const getBottomLeft: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG900913.projection.bounds
                const getBottomRight: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG900913.projection.bounds
                const getCenter: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG900913.projection.bounds
                const getSize: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG900913.projection.bounds
                const getTopLeft: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG900913.projection.bounds
                const getTopRight: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG900913.projection.bounds
                const intersects: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG900913.projection.bounds
                const isValid: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG900913.projection.bounds
                const max: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG900913.projection.bounds
                const min: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG900913.projection.bounds
                const overlaps: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.EPSG900913.projection.bounds
                const pad: any;

            }

        }

        namespace transformation {
            function transform(point: any, scale: any): any;

            function untransform(point: any, scale: any): any;

        }

    }

    namespace Earth {
        const R: number;

        const infinite: boolean;

        const wrapLng: number[];

        function distance(latlng1: any, latlng2: any): any;

        function getProjectedBounds(zoom: any): any;

        function latLngToPoint(latlng: any, zoom: any): any;

        function pointToLatLng(point: any, zoom: any): any;

        function project(latlng: any): any;

        function scale(zoom: any): any;

        function unproject(point: any): any;

        function wrapLatLng(latlng: any): any;

        function wrapLatLngBounds(bounds: any): any;

        function zoom(scale: any): any;

    }

    namespace Simple {
        const infinite: boolean;

        function distance(latlng1: any, latlng2: any): any;

        function getProjectedBounds(zoom: any): any;

        function latLngToPoint(latlng: any, zoom: any): any;

        function pointToLatLng(point: any, zoom: any): any;

        function project(latlng: any): any;

        function scale(zoom: any): any;

        function unproject(point: any): any;

        function wrapLatLng(latlng: any): any;

        function wrapLatLngBounds(bounds: any): any;

        function zoom(scale: any): any;

        namespace projection {
            function project(latlng: any): any;

            function unproject(point: any): any;

            namespace bounds {
                // Too-deep object hierarchy from leaflet_gentypes.CRS.Simple.projection.bounds
                const contains: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.Simple.projection.bounds
                const equals: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.Simple.projection.bounds
                const extend: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.Simple.projection.bounds
                const getBottomLeft: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.Simple.projection.bounds
                const getBottomRight: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.Simple.projection.bounds
                const getCenter: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.Simple.projection.bounds
                const getSize: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.Simple.projection.bounds
                const getTopLeft: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.Simple.projection.bounds
                const getTopRight: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.Simple.projection.bounds
                const intersects: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.Simple.projection.bounds
                const isValid: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.Simple.projection.bounds
                const max: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.Simple.projection.bounds
                const min: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.Simple.projection.bounds
                const overlaps: any;

                // Too-deep object hierarchy from leaflet_gentypes.CRS.Simple.projection.bounds
                const pad: any;

            }

        }

        namespace transformation {
            function transform(point: any, scale: any): any;

            function untransform(point: any, scale: any): any;

        }

    }

}

export namespace Class {
    function addInitHook(fn: any, ...args: any[]): any;

    function extend(props: any, ...args: any[]): any;

    function include(props: any): any;

    function mergeOptions(options: any): any;

}

export namespace Control {
    class Attribution {
        constructor(...args: any[]);

        addAttribution(text: any): any;

        callInitHooks(): void;

        initialize(options: any): void;

        onAdd(map: any): any;

        onRemove(map: any): void;

        removeAttribution(text: any): any;

        setPrefix(prefix: any): any;

        static addInitHook(fn: any, ...args: any[]): any;

        static extend(props: any, ...args: any[]): any;

        static include(props: any): any;

        static mergeOptions(options: any): any;

    }

    class Layers {
        constructor(...args: any[]);

        addBaseLayer(layer: any, name: any): any;

        addOverlay(layer: any, name: any): any;

        addTo(map: any): any;

        callInitHooks(): void;

        collapse(): any;

        expand(): any;

        initialize(baseLayers: any, overlays: any, options: any): void;

        onAdd(map: any): any;

        onRemove(): void;

        removeLayer(layer: any): any;

        static addInitHook(fn: any, ...args: any[]): any;

        static extend(props: any, ...args: any[]): any;

        static include(props: any): any;

        static mergeOptions(options: any): any;

    }

    class Scale {
        constructor(...args: any[]);

        callInitHooks(): void;

        onAdd(map: any): any;

        onRemove(map: any): void;

        static addInitHook(fn: any, ...args: any[]): any;

        static extend(props: any, ...args: any[]): any;

        static include(props: any): any;

        static mergeOptions(options: any): any;

    }

    class Zoom {
        constructor(...args: any[]);

        callInitHooks(): void;

        disable(): any;

        enable(): any;

        onAdd(map: any): any;

        onRemove(map: any): void;

        static addInitHook(fn: any, ...args: any[]): any;

        static extend(props: any, ...args: any[]): any;

        static include(props: any): any;

        static mergeOptions(options: any): any;

    }

}

export namespace DomEvent {
    function addListener(obj: any, types: any, fn: any, context: any): any;

    function disableClickPropagation(el: any): any;

    function disableScrollPropagation(el: any): any;

    function getMousePosition(e: any, container: any): any;

    function getPropagationPath(ev: any): any;

    function getWheelDelta(e: any): any;

    function isExternalTarget(el: any, e: any): any;

    function off(obj: any, types: any, fn: any, context: any, ...args: any[]): any;

    function on(obj: any, types: any, fn: any, context: any): any;

    function preventDefault(e: any): any;

    function removeListener(obj: any, types: any, fn: any, context: any, ...args: any[]): any;

    function stop(e: any): any;

    function stopPropagation(e: any): any;

}

export namespace DomUtil {
    const TRANSFORM: string;

    const TRANSITION: string;

    const TRANSITION_END: string;

    function addClass(el: any, name: any): void;

    function create(tagName: any, className: any, container: any): any;

    function disableImageDrag(): void;

    function disableTextSelection(): void;

    function empty(el: any): void;

    function enableImageDrag(): void;

    function enableTextSelection(): void;

    function get(id: any): any;

    function getClass(el: any): any;

    function getPosition(el: any): any;

    function getScale(element: any): any;

    function getSizedParentNode(element: any): any;

    function getStyle(el: any, style: any): any;

    function hasClass(el: any, name: any): any;

    function preventOutline(element: any): void;

    function remove(el: any): void;

    function removeClass(el: any, name: any): void;

    function restoreOutline(): void;

    function setClass(el: any, name: any): void;

    function setOpacity(el: any, value: any): void;

    function setPosition(el: any, point: any): void;

    function setTransform(el: any, offset: any, scale: any): void;

    function testProp(props: any): any;

    function toBack(el: any): void;

    function toFront(el: any): void;

}

export namespace Icon {
    class Default {
        constructor(...args: any[]);

        callInitHooks(): void;

        static addInitHook(fn: any, ...args: any[]): any;

        static extend(props: any, ...args: any[]): any;

        static include(props: any): any;

        static mergeOptions(options: any): any;

    }

}

export namespace LineUtil {
    function clipSegment(a: any, b: any, bounds: any, useLastCode: any, round: any): any;

    function closestPointOnSegment(p: any, p1: any, p2: any): any;

    function isFlat(latlngs: any): any;

    function pointToSegmentDistance(p: any, p1: any, p2: any): any;

    function polylineCenter(latlngs: any, crs: any): any;

    function simplify(points: any, tolerance: any): any;

}

export namespace Map {
    class BoxZoom {
        constructor(...args: any[]);

        addHooks(): void;

        callInitHooks(): void;

        initialize(map: any): void;

        moved(): any;

        removeHooks(): void;

        static addInitHook(fn: any, ...args: any[]): any;

        static addTo(map: any, name: any): any;

        static extend(props: any, ...args: any[]): any;

        static include(props: any): any;

        static mergeOptions(options: any): any;

    }

    class DoubleClickZoom {
        constructor(...args: any[]);

        addHooks(): void;

        callInitHooks(): void;

        removeHooks(): void;

        static addInitHook(fn: any, ...args: any[]): any;

        static addTo(map: any, name: any): any;

        static extend(props: any, ...args: any[]): any;

        static include(props: any): any;

        static mergeOptions(options: any): any;

    }

    class Drag {
        constructor(...args: any[]);

        addHooks(): void;

        callInitHooks(): void;

        moved(): any;

        moving(): any;

        removeHooks(): void;

        static addInitHook(fn: any, ...args: any[]): any;

        static addTo(map: any, name: any): any;

        static extend(props: any, ...args: any[]): any;

        static include(props: any): any;

        static mergeOptions(options: any): any;

    }

    class Keyboard {
        constructor(...args: any[]);

        addHooks(): void;

        callInitHooks(): void;

        initialize(map: any): void;

        removeHooks(): void;

        static addInitHook(fn: any, ...args: any[]): any;

        static addTo(map: any, name: any): any;

        static extend(props: any, ...args: any[]): any;

        static include(props: any): any;

        static mergeOptions(options: any): any;

    }

    class ScrollWheelZoom {
        constructor(...args: any[]);

        addHooks(): void;

        callInitHooks(): void;

        removeHooks(): void;

        static addInitHook(fn: any, ...args: any[]): any;

        static addTo(map: any, name: any): any;

        static extend(props: any, ...args: any[]): any;

        static include(props: any): any;

        static mergeOptions(options: any): any;

    }

    class TapHold {
        constructor(...args: any[]);

        addHooks(): void;

        callInitHooks(): void;

        removeHooks(): void;

        static addInitHook(fn: any, ...args: any[]): any;

        static addTo(map: any, name: any): any;

        static extend(props: any, ...args: any[]): any;

        static include(props: any): any;

        static mergeOptions(options: any): any;

    }

    class TouchZoom {
        constructor(...args: any[]);

        addHooks(): void;

        callInitHooks(): void;

        removeHooks(): void;

        static addInitHook(fn: any, ...args: any[]): any;

        static addTo(map: any, name: any): any;

        static extend(props: any, ...args: any[]): any;

        static include(props: any): any;

        static mergeOptions(options: any): any;

    }

}

export namespace PolyUtil {
    function centroid(coords: any): any;

    function clipPolygon(points: any, bounds: any, round: any): any;

    function polygonCenter(latlngs: any, crs: any): any;

}

export namespace TileLayer {
    class WMS {
        constructor(...args: any[]);

        callInitHooks(): void;

        getTileUrl(coords: any): any;

        initialize(url: any, options: any): void;

        onAdd(map: any): void;

        setParams(params: any, noRedraw: any): any;

        static addInitHook(fn: any, ...args: any[]): any;

        static extend(props: any, ...args: any[]): any;

        static include(props: any): any;

        static mergeOptions(options: any): any;

    }

}

export namespace Util {
    const emptyImageUrl: string;

    const lastId: number;

    function bind(fn: any, obj: any, ...args: any[]): any;

    function cancelAnimFrame(id: any): void;

    function cancelFn(id: any): void;

    function create(p0: any, p1: any): any;

    function extend(dest: any, ...args: any[]): any;

    function falseFn(): any;

    function formatNum(num: any, precision: any): any;

    function getParamString(obj: any, existingUrl: any, uppercase: any): any;

    function indexOf(array: any, el: any): any;

    function isArray(p0: any): any;

    function requestAnimFrame(fn: any, context: any, immediate: any): any;

    function requestFn(fn: any): any;

    function setOptions(obj: any, options: any): any;

    function splitWords(str: any): any;

    function stamp(obj: any): any;

    function template(str: any, data: any): any;

    function throttle(fn: any, time: any, context: any, ...args: any[]): any;

    function trim(str: any): any;

    function wrapNum(x: any, range: any, includeMax: any): any;

}

export namespace control {
    function attribution(options: any): any;

    function layers(baseLayers: any, overlays: any, options: any): any;

    function scale(options: any): any;

    function zoom(options: any): any;

}

export namespace tileLayer {
    function wms(url: any, options: any): any;

}

}
declare var map: L.Map;
