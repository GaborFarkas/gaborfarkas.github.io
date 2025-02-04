import * as ol_base from 'ol';
import * as ol_control from 'ol/control';
import * as ol_events from 'ol/events';
import * as ol_extent from 'ol/extent';
import * as ol_format from 'ol/format';
import * as ol_geom from 'ol/geom';
import * as ol_interaction from 'ol/interaction';
import * as ol_layer from 'ol/layer';
import * as ol_proj from 'ol/proj';
import * as ol_render from 'ol/render';
import * as ol_reproj from 'ol/reproj';
import * as ol_source from 'ol/source';
import * as ol_style from 'ol/style';
import * as ol_tilegrid from 'ol/tilegrid';
import * as ol_webgl from 'ol/webgl';

/**
 * OpenLayers library patched from individual namespace imports.
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace OpenLayers {
    export import Collection = ol_base.Collection
    export import Disposable = ol_base.Disposable
    export import Feature = ol_base.Feature
    export import Geolocation = ol_base.Geolocation
    export import Graticule = ol_base.Graticule
    export import Image = ol_base.Image
    export import ImageCanvas = ol_base.ImageCanvas
    export import ImageTile = ol_base.ImageTile
    export import ImageWrapper = ol_base.ImageWrapper
    export import Kinetic = ol_base.Kinetic
    export import Map = ol_base.Map
    export import MapBrowserEvent = ol_base.MapBrowserEvent
    export import MapBrowserEventHandler = ol_base.MapBrowserEventHandler
    export import MapEvent = ol_base.MapEvent
    export import Object = ol_base.Object
    export import Observable = ol_base.Observable
    export import Overlay = ol_base.Overlay
    export import Tile = ol_base.Tile
    export import TileQueue = ol_base.TileQueue
    export import TileRange = ol_base.TileRange
    export import VectorRenderTile = ol_base.VectorRenderTile
    export import VectorTile = ol_base.VectorTile
    export import View = ol_base.View
    export import getUid = ol_base.getUid
    export import VERSION = ol_base.VERSION

    export const control = ol_control;

    export const events = ol_events;

    export const extent = ol_extent;

    export const format = ol_format;

    export const geom = ol_geom;

    export const interaction = ol_interaction;

    export const layer = ol_layer;

    export const proj = ol_proj;

    export const render = ol_render;

    export const reproj = ol_reproj;

    export const source = ol_source;

    export const style = ol_style;

    export const tilegrid = ol_tilegrid;

    export const webgl = ol_webgl;
}
