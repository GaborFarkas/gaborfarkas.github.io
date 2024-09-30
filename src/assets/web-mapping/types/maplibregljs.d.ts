declare namespace maplibregl {
export class AttributionControl {
    constructor(...args: any[]);

    getDefaultPosition(...args: any[]): void;

    onAdd(...args: any[]): void;

    onRemove(...args: any[]): void;

}

export class BoxZoomHandler {
    constructor(...args: any[]);

    disable(...args: any[]): void;

    enable(...args: any[]): void;

    isActive(...args: any[]): void;

    isEnabled(...args: any[]): void;

    keydown(...args: any[]): void;

    mousedown(...args: any[]): void;

    mousemoveWindow(...args: any[]): void;

    mouseupWindow(...args: any[]): void;

    reset(...args: any[]): void;

}

export class CanvasSource {
    constructor(...args: any[]);

    getCanvas(...args: any[]): void;

    hasTransition(...args: any[]): void;

    load(...args: any[]): void;

    onAdd(...args: any[]): void;

    onRemove(...args: any[]): void;

    prepare(...args: any[]): void;

    serialize(...args: any[]): void;

}

export class CooperativeGesturesHandler {
    constructor(...args: any[]);

    disable(...args: any[]): void;

    enable(...args: any[]): void;

    isActive(...args: any[]): void;

    isBypassed(...args: any[]): void;

    isEnabled(...args: any[]): void;

    notifyGestureBlocked(...args: any[]): void;

    reset(...args: any[]): void;

}

export class DoubleClickZoomHandler {
    constructor(...args: any[]);

    disable(...args: any[]): void;

    enable(...args: any[]): void;

    isActive(...args: any[]): void;

    isEnabled(...args: any[]): void;

}

export class DragPanHandler {
    constructor(...args: any[]);

    disable(...args: any[]): void;

    enable(...args: any[]): void;

    isActive(...args: any[]): void;

    isEnabled(...args: any[]): void;

}

export class DragRotateHandler {
    constructor(...args: any[]);

    disable(...args: any[]): void;

    enable(...args: any[]): void;

    isActive(...args: any[]): void;

    isEnabled(...args: any[]): void;

}

export class EdgeInsets {
    constructor(...args: any[]);

    clone(...args: any[]): void;

    equals(...args: any[]): void;

    getCenter(...args: any[]): void;

    interpolate(...args: any[]): void;

    toJSON(...args: any[]): void;

}

export class Evented {
    constructor(...args: any[]);

    fire(...args: any[]): void;

    listens(...args: any[]): void;

    off(...args: any[]): void;

    on(...args: any[]): void;

    once(...args: any[]): void;

    setEventedParent(...args: any[]): void;

}

export class FullscreenControl {
    constructor(...args: any[]);

    onAdd(...args: any[]): void;

    onRemove(...args: any[]): void;

}

export class GeoJSONSource {
    constructor(...args: any[]);

    abortTile(...args: any[]): void;

    getClusterChildren(...args: any[]): void;

    getClusterExpansionZoom(...args: any[]): void;

    getClusterLeaves(...args: any[]): void;

    getData(...args: any[]): void;

    hasTransition(...args: any[]): void;

    load(...args: any[]): void;

    loadTile(...args: any[]): void;

    loaded(...args: any[]): void;

    onAdd(...args: any[]): void;

    onRemove(...args: any[]): void;

    serialize(...args: any[]): void;

    setClusterOptions(...args: any[]): void;

    setData(...args: any[]): void;

    unloadTile(...args: any[]): void;

    updateData(...args: any[]): void;

}

export class GeolocateControl {
    constructor(...args: any[]);

    onAdd(...args: any[]): void;

    onRemove(...args: any[]): void;

    trigger(...args: any[]): void;

}

export class Hash {
    constructor(...args: any[]);

    addTo(...args: any[]): void;

    getHashString(...args: any[]): void;

    remove(...args: any[]): void;

}

export class ImageSource {
    constructor(...args: any[]);

    hasTransition(...args: any[]): void;

    load(...args: any[]): void;

    loadTile(...args: any[]): void;

    loaded(...args: any[]): void;

    onAdd(...args: any[]): void;

    onRemove(...args: any[]): void;

    prepare(...args: any[]): void;

    serialize(...args: any[]): void;

    setCoordinates(...args: any[]): void;

    updateImage(...args: any[]): void;

}

export class KeyboardHandler {
    constructor(...args: any[]);

    disable(...args: any[]): void;

    disableRotation(...args: any[]): void;

    enable(...args: any[]): void;

    enableRotation(...args: any[]): void;

    isActive(...args: any[]): void;

    isEnabled(...args: any[]): void;

    keydown(...args: any[]): void;

    reset(...args: any[]): void;

}

export class LngLat {
    constructor(...args: any[]);

    distanceTo(...args: any[]): void;

    toArray(...args: any[]): void;

    toString(...args: any[]): void;

    wrap(...args: any[]): void;

    static convert(...args: any[]): void;

}

export class LngLatBounds {
    constructor(...args: any[]);

    adjustAntiMeridian(...args: any[]): void;

    contains(...args: any[]): void;

    extend(...args: any[]): void;

    getCenter(...args: any[]): void;

    getEast(...args: any[]): void;

    getNorth(...args: any[]): void;

    getNorthEast(...args: any[]): void;

    getNorthWest(...args: any[]): void;

    getSouth(...args: any[]): void;

    getSouthEast(...args: any[]): void;

    getSouthWest(...args: any[]): void;

    getWest(...args: any[]): void;

    isEmpty(...args: any[]): void;

    setNorthEast(...args: any[]): void;

    setSouthWest(...args: any[]): void;

    toArray(...args: any[]): void;

    toString(...args: any[]): void;

    static convert(...args: any[]): void;

    static fromLngLat(...args: any[]): void;

}

export class LogoControl {
    constructor(...args: any[]);

    getDefaultPosition(...args: any[]): void;

    onAdd(...args: any[]): void;

    onRemove(...args: any[]): void;

}

export class Map {
    constructor(...args: any[]);

    addControl(...args: any[]): void;

    addImage(...args: any[]): void;

    addLayer(...args: any[]): void;

    addSource(...args: any[]): void;

    addSprite(...args: any[]): void;

    areTilesLoaded(...args: any[]): void;

    calculateCameraOptionsFromTo(...args: any[]): void;

    getBounds(...args: any[]): void;

    getCameraTargetElevation(...args: any[]): void;

    getCanvas(...args: any[]): void;

    getCanvasContainer(...args: any[]): void;

    getContainer(...args: any[]): void;

    getFeatureState(...args: any[]): void;

    getFilter(...args: any[]): void;

    getGlyphs(...args: any[]): void;

    getImage(...args: any[]): void;

    getLayer(...args: any[]): void;

    getLayersOrder(...args: any[]): void;

    getLayoutProperty(...args: any[]): void;

    getLight(...args: any[]): void;

    getMaxBounds(...args: any[]): void;

    getMaxPitch(...args: any[]): void;

    getMaxZoom(...args: any[]): void;

    getMinPitch(...args: any[]): void;

    getMinZoom(...args: any[]): void;

    getPaintProperty(...args: any[]): void;

    getPixelRatio(...args: any[]): void;

    getRenderWorldCopies(...args: any[]): void;

    getSky(...args: any[]): void;

    getSource(...args: any[]): void;

    getSprite(...args: any[]): void;

    getStyle(...args: any[]): void;

    getTerrain(...args: any[]): void;

    hasControl(...args: any[]): void;

    hasImage(...args: any[]): void;

    isMoving(...args: any[]): void;

    isRotating(...args: any[]): void;

    isSourceLoaded(...args: any[]): void;

    isStyleLoaded(...args: any[]): void;

    isZooming(...args: any[]): void;

    listImages(...args: any[]): void;

    loadImage(...args: any[]): void;

    loaded(...args: any[]): void;

    moveLayer(...args: any[]): void;

    off(...args: any[]): void;

    on(...args: any[]): void;

    once(...args: any[]): void;

    project(...args: any[]): void;

    queryRenderedFeatures(...args: any[]): void;

    querySourceFeatures(...args: any[]): void;

    redraw(...args: any[]): void;

    remove(...args: any[]): void;

    removeControl(...args: any[]): void;

    removeFeatureState(...args: any[]): void;

    removeImage(...args: any[]): void;

    removeLayer(...args: any[]): void;

    removeSource(...args: any[]): void;

    removeSprite(...args: any[]): void;

    resize(...args: any[]): void;

    setFeatureState(...args: any[]): void;

    setFilter(...args: any[]): void;

    setGlyphs(...args: any[]): void;

    setLayerZoomRange(...args: any[]): void;

    setLayoutProperty(...args: any[]): void;

    setLight(...args: any[]): void;

    setMaxBounds(...args: any[]): void;

    setMaxPitch(...args: any[]): void;

    setMaxZoom(...args: any[]): void;

    setMinPitch(...args: any[]): void;

    setMinZoom(...args: any[]): void;

    setPaintProperty(...args: any[]): void;

    setPixelRatio(...args: any[]): void;

    setRenderWorldCopies(...args: any[]): void;

    setSky(...args: any[]): void;

    setSprite(...args: any[]): void;

    setStyle(...args: any[]): void;

    setTerrain(...args: any[]): void;

    setTransformRequest(...args: any[]): void;

    triggerRepaint(...args: any[]): void;

    unproject(...args: any[]): void;

    updateImage(...args: any[]): void;

}

export class MapMouseEvent {
    constructor(...args: any[]);

    preventDefault(...args: any[]): void;

}

export class MapTouchEvent {
    constructor(...args: any[]);

    preventDefault(...args: any[]): void;

}

export class MapWheelEvent {
    constructor(...args: any[]);

    preventDefault(...args: any[]): void;

}

export class Marker {
    constructor(...args: any[]);

    addClassName(...args: any[]): void;

    addTo(...args: any[]): void;

    getElement(...args: any[]): void;

    getLngLat(...args: any[]): void;

    getOffset(...args: any[]): void;

    getPitchAlignment(...args: any[]): void;

    getPopup(...args: any[]): void;

    getRotation(...args: any[]): void;

    getRotationAlignment(...args: any[]): void;

    isDraggable(...args: any[]): void;

    remove(...args: any[]): void;

    removeClassName(...args: any[]): void;

    setDraggable(...args: any[]): void;

    setLngLat(...args: any[]): void;

    setOffset(...args: any[]): void;

    setOpacity(...args: any[]): void;

    setPitchAlignment(...args: any[]): void;

    setPopup(...args: any[]): void;

    setRotation(...args: any[]): void;

    setRotationAlignment(...args: any[]): void;

    setSubpixelPositioning(...args: any[]): void;

    toggleClassName(...args: any[]): void;

    togglePopup(...args: any[]): void;

}

export class MercatorCoordinate {
    constructor(...args: any[]);

    meterInMercatorCoordinateUnits(...args: any[]): void;

    toAltitude(...args: any[]): void;

    toLngLat(...args: any[]): void;

    static fromLngLat(...args: any[]): void;

}

export class NavigationControl {
    constructor(...args: any[]);

    onAdd(...args: any[]): void;

    onRemove(...args: any[]): void;

}

export class Point {
    constructor(t: any, e: any);

    add(t: any): any;

    angle(): any;

    angleTo(t: any): any;

    angleWith(t: any): any;

    angleWithSep(t: any, e: any): any;

    clone(): any;

    dist(t: any): any;

    distSqr(t: any): any;

    div(t: any): any;

    divByPoint(t: any): any;

    equals(t: any): any;

    mag(): any;

    matMult(t: any): any;

    mult(t: any): any;

    multByPoint(t: any): any;

    perp(): any;

    rotate(t: any): any;

    rotateAround(t: any, e: any): any;

    round(): any;

    sub(t: any): any;

    unit(): any;

    static convert(t: any): any;

}

export class Popup {
    constructor(...args: any[]);

    addClassName(...args: any[]): void;

    addTo(...args: any[]): void;

    getElement(...args: any[]): void;

    getLngLat(...args: any[]): void;

    getMaxWidth(...args: any[]): void;

    isOpen(...args: any[]): void;

    removeClassName(...args: any[]): void;

    setDOMContent(...args: any[]): void;

    setHTML(...args: any[]): void;

    setLngLat(...args: any[]): void;

    setMaxWidth(...args: any[]): void;

    setOffset(...args: any[]): void;

    setSubpixelPositioning(...args: any[]): void;

    setText(...args: any[]): void;

    toggleClassName(...args: any[]): void;

    trackPointer(...args: any[]): void;

}

export class RasterDEMTileSource {
    constructor(...args: any[]);

    loadTile(...args: any[]): void;

    readImageNow(...args: any[]): void;

    unloadTile(...args: any[]): void;

}

export class RasterTileSource {
    constructor(...args: any[]);

    abortTile(...args: any[]): void;

    hasTile(...args: any[]): void;

    hasTransition(...args: any[]): void;

    load(...args: any[]): void;

    loadTile(...args: any[]): void;

    loaded(...args: any[]): void;

    onAdd(...args: any[]): void;

    onRemove(...args: any[]): void;

    serialize(...args: any[]): void;

    setSourceProperty(...args: any[]): void;

    setTiles(...args: any[]): void;

    setUrl(...args: any[]): void;

    unloadTile(...args: any[]): void;

}

export class ScaleControl {
    constructor(...args: any[]);

    getDefaultPosition(...args: any[]): void;

    onAdd(...args: any[]): void;

    onRemove(...args: any[]): void;

}

export class ScrollZoomHandler {
    constructor(...args: any[]);

    disable(...args: any[]): void;

    enable(...args: any[]): void;

    isActive(...args: any[]): void;

    isEnabled(...args: any[]): void;

    isZooming(...args: any[]): void;

    renderFrame(...args: any[]): void;

    reset(...args: any[]): void;

    setWheelZoomRate(...args: any[]): void;

    setZoomRate(...args: any[]): void;

    wheel(...args: any[]): void;

}

export class Style {
    constructor(...args: any[]);

    addImage(...args: any[]): void;

    addLayer(...args: any[]): void;

    addSource(...args: any[]): void;

    addSprite(...args: any[]): void;

    getFeatureState(...args: any[]): void;

    getFilter(...args: any[]): void;

    getGlyphs(...args: any[]): void;

    getGlyphsUrl(...args: any[]): void;

    getImage(...args: any[]): void;

    getImages(...args: any[]): void;

    getLayer(...args: any[]): void;

    getLayersOrder(...args: any[]): void;

    getLayoutProperty(...args: any[]): void;

    getLight(...args: any[]): void;

    getPaintProperty(...args: any[]): void;

    getSky(...args: any[]): void;

    getSource(...args: any[]): void;

    getSprite(...args: any[]): void;

    getTransition(...args: any[]): void;

    hasLayer(...args: any[]): void;

    hasTransitions(...args: any[]): void;

    listImages(...args: any[]): void;

    loadEmpty(...args: any[]): void;

    loadJSON(...args: any[]): void;

    loadURL(...args: any[]): void;

    loaded(...args: any[]): void;

    moveLayer(...args: any[]): void;

    queryRenderedFeatures(...args: any[]): void;

    querySourceFeatures(...args: any[]): void;

    removeFeatureState(...args: any[]): void;

    removeImage(...args: any[]): void;

    removeLayer(...args: any[]): void;

    removeSource(...args: any[]): void;

    removeSprite(...args: any[]): void;

    serialize(...args: any[]): void;

    setFeatureState(...args: any[]): void;

    setFilter(...args: any[]): void;

    setGeoJSONSourceData(...args: any[]): void;

    setGlyphs(...args: any[]): void;

    setLayerZoomRange(...args: any[]): void;

    setLayoutProperty(...args: any[]): void;

    setLight(...args: any[]): void;

    setPaintProperty(...args: any[]): void;

    setSky(...args: any[]): void;

    setSprite(...args: any[]): void;

    setState(...args: any[]): void;

    update(...args: any[]): void;

    updateImage(...args: any[]): void;

}

export class TerrainControl {
    constructor(...args: any[]);

    onAdd(...args: any[]): void;

    onRemove(...args: any[]): void;

}

export class TwoFingersTouchPitchHandler {
    constructor(...args: any[]);

    gestureBeginsVertically(...args: any[]): void;

    reset(...args: any[]): void;

    touchstart(...args: any[]): void;

}

export class TwoFingersTouchRotateHandler {
    constructor(...args: any[]);

    reset(...args: any[]): void;

}

export class TwoFingersTouchZoomHandler {
    constructor(...args: any[]);

    reset(...args: any[]): void;

}

export class TwoFingersTouchZoomRotateHandler {
    constructor(...args: any[]);

    disable(...args: any[]): void;

    disableRotation(...args: any[]): void;

    enable(...args: any[]): void;

    enableRotation(...args: any[]): void;

    isActive(...args: any[]): void;

    isEnabled(...args: any[]): void;

}

export class VectorTileSource {
    constructor(...args: any[]);

    abortTile(...args: any[]): void;

    hasTile(...args: any[]): void;

    hasTransition(...args: any[]): void;

    load(...args: any[]): void;

    loadTile(...args: any[]): void;

    loaded(...args: any[]): void;

    onAdd(...args: any[]): void;

    onRemove(...args: any[]): void;

    serialize(...args: any[]): void;

    setSourceProperty(...args: any[]): void;

    setTiles(...args: any[]): void;

    setUrl(...args: any[]): void;

    unloadTile(...args: any[]): void;

}

export class VideoSource {
    constructor(...args: any[]);

    getVideo(...args: any[]): void;

    hasTransition(...args: any[]): void;

    load(...args: any[]): void;

    onAdd(...args: any[]): void;

    pause(...args: any[]): void;

    play(...args: any[]): void;

    prepare(...args: any[]): void;

    seek(...args: any[]): void;

    serialize(...args: any[]): void;

}

export const config: {
    MAX_PARALLEL_IMAGE_REQUESTS: number;
    MAX_PARALLEL_IMAGE_REQUESTS_PER_FRAME: number;
    MAX_TILE_CACHE_ZOOM_LEVELS: number;
    REGISTERED_PROTOCOLS: {
    };
    WORKER_URL: string;
};

export function AJAXError(...args: any[]): void;

export function addProtocol(t: any, e: any): void;

export function addSourceType(t: any, i: any): void;

export function clearPrewarmedResources(): void;

export function getMaxParallelImageRequests(): any;

export function getRTLTextPluginStatus(): any;

export function getVersion(): any;

export function getWorkerCount(): any;

export function getWorkerUrl(): any;

export function importScriptInWorkers(t: any): any;

export function prewarm(): void;

export function removeProtocol(t: any): void;

export function setMaxParallelImageRequests(t: any): void;

export function setRTLTextPlugin(t: any, e: any): any;

export function setWorkerCount(t: any): void;

export function setWorkerUrl(t: any): void;

export namespace AJAXError {
    const stackTraceLimit: number;

    function captureStackTrace(p0: any, p1: any): any;

    function prepareStackTrace(error: any, trace: any): any;

}

}
declare var map: maplibregl.Map;
