import * as ol_base from 'ol'
import * as ol_control from 'ol/control'
import * as ol_events from 'ol/events'
import * as ol_extent from 'ol/extent'
import * as ol_format from 'ol/format'
import * as ol_geom from 'ol/geom'
import * as ol_interaction from 'ol/interaction'
import * as ol_layer from 'ol/layer'
import * as ol_proj from 'ol/proj'
import * as ol_render from 'ol/render'
import * as ol_reproj from 'ol/reproj'
import * as ol_source from 'ol/source'
import * as ol_style from 'ol/style'
import * as ol_tilegrid from 'ol/tilegrid'
import * as ol_webgl from 'ol/webgl'

/**
 * OpenLayers library patched from individual namespace imports.
 */
export namespace OpenLayers {
    export import Collection = ol_base.Collection
    export import Disposable = ol_base.Disposable
    export import Feature = ol_base.Feature
    export import Geolocation = ol_base.Geolocation
    export import Graticule = ol_base.Graticule
    export import ImageCanvas = ol_base.ImageCanvas
    export import ImageTile = ol_base.ImageTile
    export import Kinetic = ol_base.Kinetic
    export import Map = ol_base.Map
    export import MapBrowserEvent = ol_base.MapBrowserEvent
    export import MapBrowserEventHandler = ol_base.MapBrowserEventHandler
    export import MapEvent = ol_base.MapEvent
    export import Object = ol_base.Object
    export import Observable = ol_base.Observable
    export import Overlay = ol_base.Overlay
    export import Tile = ol_base.Tile
    export import TileCache = ol_base.TileCache
    export import TileQueue = ol_base.TileQueue
    export import TileRange = ol_base.TileRange
    export import VectorRenderTile = ol_base.VectorRenderTile
    export import VectorTile = ol_base.VectorTile
    export import View = ol_base.View
    export import Image = ol_base.Image
    export import ImageWrapper = ol_base.ImageWrapper
    export import getUid = ol_base.getUid
    export import VERSION = ol_base.VERSION

    export namespace control {
        export import Attribution = ol_control.Attribution
        export import Control = ol_control.Control
        export import FullScreen = ol_control.FullScreen
        export import MousePosition = ol_control.MousePosition
        export import OverviewMap = ol_control.OverviewMap
        export import Rotate = ol_control.Rotate
        export import ScaleLine = ol_control.ScaleLine
        export import Zoom = ol_control.Zoom
        export import ZoomSlider = ol_control.ZoomSlider
        export import ZoomToExtent = ol_control.ZoomToExtent
        export import defaults = ol_control.defaults
    }

    export namespace events {
        export import listen = ol_events.listen
        export import listenOnce = ol_events.listenOnce
        export import unlistenByKey = ol_events.unlistenByKey
    }

    export namespace extent {
        export import boundingExtent = ol_extent.boundingExtent
        export import buffer = ol_extent.buffer
        export import clone = ol_extent.clone
        export import closestSquaredDistanceXY = ol_extent.closestSquaredDistanceXY
        export import containsCoordinate = ol_extent.containsCoordinate
        export import containsExtent = ol_extent.containsExtent
        export import containsXY = ol_extent.containsXY
        export import coordinateRelationship = ol_extent.coordinateRelationship
        export import createEmpty = ol_extent.createEmpty
        export import createOrUpdate = ol_extent.createOrUpdate
        export import createOrUpdateEmpty = ol_extent.createOrUpdateEmpty
        export import createOrUpdateFromCoordinate = ol_extent.createOrUpdateFromCoordinate
        export import createOrUpdateFromCoordinates = ol_extent.createOrUpdateFromCoordinates
        export import createOrUpdateFromFlatCoordinates = ol_extent.createOrUpdateFromFlatCoordinates
        export import createOrUpdateFromRings = ol_extent.createOrUpdateFromRings
        export import equals = ol_extent.equals
        export import approximatelyEquals = ol_extent.approximatelyEquals
        export import extend = ol_extent.extend
        export import extendCoordinate = ol_extent.extendCoordinate
        export import extendCoordinates = ol_extent.extendCoordinates
        export import extendFlatCoordinates = ol_extent.extendFlatCoordinates
        export import extendRings = ol_extent.extendRings
        export import extendXY = ol_extent.extendXY
        export import forEachCorner = ol_extent.forEachCorner
        export import getArea = ol_extent.getArea
        export import getBottomLeft = ol_extent.getBottomLeft
        export import getBottomRight = ol_extent.getBottomRight
        export import getCenter = ol_extent.getCenter
        export import getCorner = ol_extent.getCorner
        export import getEnlargedArea = ol_extent.getEnlargedArea
        export import getForViewAndSize = ol_extent.getForViewAndSize
        export import getRotatedViewport = ol_extent.getRotatedViewport
        export import getHeight = ol_extent.getHeight
        export import getIntersectionArea = ol_extent.getIntersectionArea
        export import getIntersection = ol_extent.getIntersection
        export import getMargin = ol_extent.getMargin
        export import getSize = ol_extent.getSize
        export import getTopLeft = ol_extent.getTopLeft
        export import getTopRight = ol_extent.getTopRight
        export import getWidth = ol_extent.getWidth
        export import intersects = ol_extent.intersects
        export import isEmpty = ol_extent.isEmpty
        export import returnOrUpdate = ol_extent.returnOrUpdate
        export import scaleFromCenter = ol_extent.scaleFromCenter
        export import intersectsSegment = ol_extent.intersectsSegment
        export import applyTransform = ol_extent.applyTransform
        export import wrapX = ol_extent.wrapX
        export import wrapAndSliceX = ol_extent.wrapAndSliceX
    }

    export namespace format {
        export import EsriJSON = ol_format.EsriJSON
        export import GeoJSON = ol_format.GeoJSON
        export import GML = ol_format.GML
        export import GPX = ol_format.GPX
        export import IGC = ol_format.IGC
        export import IIIFInfo = ol_format.IIIFInfo
        export import KML = ol_format.KML
        export import MVT = ol_format.MVT
        export import OWS = ol_format.OWS
        export import Polyline = ol_format.Polyline
        export import TopoJSON = ol_format.TopoJSON
        export import WFS = ol_format.WFS
        export import WKB = ol_format.WKB
        export import WKT = ol_format.WKT
        export import WMSCapabilities = ol_format.WMSCapabilities
        export import WMSGetFeatureInfo = ol_format.WMSGetFeatureInfo
        export import WMTSCapabilities = ol_format.WMTSCapabilities
    }

    export namespace geom {
        export import Circle = ol_geom.Circle
        export import Geometry = ol_geom.Geometry
        export import GeometryCollection = ol_geom.GeometryCollection
        export import LinearRing = ol_geom.LinearRing
        export import LineString = ol_geom.LineString
        export import MultiLineString = ol_geom.MultiLineString
        export import MultiPoint = ol_geom.MultiPoint
        export import MultiPolygon = ol_geom.MultiPolygon
        export import Point = ol_geom.Point
        export import Polygon = ol_geom.Polygon
        export import SimpleGeometry = ol_geom.SimpleGeometry
    }

    export namespace interaction {
        export import DoubleClickZoom = ol_interaction.DoubleClickZoom
        export import DblClickDragZoom = ol_interaction.DblClickDragZoom
        export import DragAndDrop = ol_interaction.DragAndDrop
        export import DragBox = ol_interaction.DragBox
        export import DragPan = ol_interaction.DragPan
        export import DragRotate = ol_interaction.DragRotate
        export import DragRotateAndZoom = ol_interaction.DragRotateAndZoom
        export import DragZoom = ol_interaction.DragZoom
        export import Draw = ol_interaction.Draw
        export import Extent = ol_interaction.Extent
        export import Interaction = ol_interaction.Interaction
        export import KeyboardPan = ol_interaction.KeyboardPan
        export import KeyboardZoom = ol_interaction.KeyboardZoom
        export import Link = ol_interaction.Link
        export import Modify = ol_interaction.Modify
        export import MouseWheelZoom = ol_interaction.MouseWheelZoom
        export import PinchRotate = ol_interaction.PinchRotate
        export import PinchZoom = ol_interaction.PinchZoom
        export import Pointer = ol_interaction.Pointer
        export import Select = ol_interaction.Select
        export import Snap = ol_interaction.Snap
        export import Translate = ol_interaction.Translate
        export import defaults = ol_interaction.defaults
    }

    export namespace layer {
        export import Graticule = ol_layer.Graticule
        export import Group = ol_layer.Group
        export import Heatmap = ol_layer.Heatmap
        export import Image = ol_layer.Image
        export import Layer = ol_layer.Layer
        export import Tile = ol_layer.Tile
        export import Vector = ol_layer.Vector
        export import VectorImage = ol_layer.VectorImage
        export import VectorTile = ol_layer.VectorTile
        export import WebGLPoints = ol_layer.WebGLPoints
        export import WebGLTile = ol_layer.WebGLTile
    }

    export namespace proj {
        export import METERS_PER_UNIT = ol_proj.METERS_PER_UNIT
        export import Projection = ol_proj.Projection
        export import disableCoordinateWarning = ol_proj.disableCoordinateWarning
        export import cloneTransform = ol_proj.cloneTransform
        export import identityTransform = ol_proj.identityTransform
        export import addProjection = ol_proj.addProjection
        export import addProjections = ol_proj.addProjections
        export import get = ol_proj.get
        export import getPointResolution = ol_proj.getPointResolution
        export import addEquivalentProjections = ol_proj.addEquivalentProjections
        export import addEquivalentTransforms = ol_proj.addEquivalentTransforms
        export import clearAllProjections = ol_proj.clearAllProjections
        export import createProjection = ol_proj.createProjection
        export import createTransformFromCoordinateTransform = ol_proj.createTransformFromCoordinateTransform
        export import addCoordinateTransforms = ol_proj.addCoordinateTransforms
        export import fromLonLat = ol_proj.fromLonLat
        export import toLonLat = ol_proj.toLonLat
        export import equivalent = ol_proj.equivalent
        export import getTransformFromProjections = ol_proj.getTransformFromProjections
        export import getTransform = ol_proj.getTransform
        export import transform = ol_proj.transform
        export import transformExtent = ol_proj.transformExtent
        export import transformWithProjections = ol_proj.transformWithProjections
        export import setUserProjection = ol_proj.setUserProjection
        export import clearUserProjection = ol_proj.clearUserProjection
        export import getUserProjection = ol_proj.getUserProjection
        export import useGeographic = ol_proj.useGeographic
        export import toUserCoordinate = ol_proj.toUserCoordinate
        export import fromUserCoordinate = ol_proj.fromUserCoordinate
        export import toUserExtent = ol_proj.toUserExtent
        export import fromUserExtent = ol_proj.fromUserExtent
        export import toUserResolution = ol_proj.toUserResolution
        export import fromUserResolution = ol_proj.fromUserResolution
        export import createSafeCoordinateTransform = ol_proj.createSafeCoordinateTransform
        export import addCommon = ol_proj.addCommon
    }

    export namespace render {
        export import toContext = ol_render.toContext
        export import getVectorContext = ol_render.getVectorContext
        export import getRenderPixel = ol_render.getRenderPixel
    }

    export namespace reproj {
        export import calculateSourceResolution = ol_reproj.calculateSourceResolution
        export import calculateSourceExtentResolution = ol_reproj.calculateSourceExtentResolution
        export import render = ol_reproj.render
    }

    export namespace source {
        export import BingMaps = ol_source.BingMaps
        export import CartoDB = ol_source.CartoDB
        export import Cluster = ol_source.Cluster
        export import DataTile = ol_source.DataTile
        export import GeoTIFF = ol_source.GeoTIFF
        export import Google = ol_source.Google
        export import IIIF = ol_source.IIIF
        export import Image = ol_source.Image
        export import ImageArcGISRest = ol_source.ImageArcGISRest
        export import ImageCanvas = ol_source.ImageCanvas
        export import ImageMapGuide = ol_source.ImageMapGuide
        export import ImageStatic = ol_source.ImageStatic
        export import ImageWMS = ol_source.ImageWMS
        export import OGCMapTile = ol_source.OGCMapTile
        export import OGCVectorTile = ol_source.OGCVectorTile
        export import OSM = ol_source.OSM
        export import Raster = ol_source.Raster
        export import Source = ol_source.Source
        export import StadiaMaps = ol_source.StadiaMaps
        export import Tile = ol_source.Tile
        export import TileArcGISRest = ol_source.TileArcGISRest
        export import TileDebug = ol_source.TileDebug
        export import TileImage = ol_source.TileImage
        export import TileJSON = ol_source.TileJSON
        export import TileWMS = ol_source.TileWMS
        export import UrlTile = ol_source.UrlTile
        export import UTFGrid = ol_source.UTFGrid
        export import Vector = ol_source.Vector
        export import VectorTile = ol_source.VectorTile
        export import WMTS = ol_source.WMTS
        export import XYZ = ol_source.XYZ
        export import Zoomify = ol_source.Zoomify
        export import createWMSLoader = ol_source.createWMSLoader
        export import createArcGISRestLoader = ol_source.createArcGISRestLoader
        export import createStaticLoader = ol_source.createStaticLoader
        export import createMapGuideLoader = ol_source.createMapGuideLoader
        export import sourcesFromTileGrid = ol_source.sourcesFromTileGrid
    }

    export namespace style {
        export import Circle = ol_style.Circle
        export import Fill = ol_style.Fill
        export import Icon = ol_style.Icon
        export import IconImage = ol_style.IconImage
        export import Image = ol_style.Image
        export import RegularShape = ol_style.RegularShape
        export import Stroke = ol_style.Stroke
        export import Style = ol_style.Style
        export import Text = ol_style.Text
    }

    export namespace tilegrid {
        export import TileGrid = ol_tilegrid.TileGrid
        export import WMTS = ol_tilegrid.WMTS
        export import getForProjection = ol_tilegrid.getForProjection
        export import wrapX = ol_tilegrid.wrapX
        export import createForExtent = ol_tilegrid.createForExtent
        export import createXYZ = ol_tilegrid.createXYZ
        export import createForProjection = ol_tilegrid.createForProjection
        export import extentFromProjection = ol_tilegrid.extentFromProjection
    }

    export namespace webgl {
        export import ARRAY_BUFFER = ol_webgl.ARRAY_BUFFER
        export import ELEMENT_ARRAY_BUFFER = ol_webgl.ELEMENT_ARRAY_BUFFER
        export import STREAM_DRAW = ol_webgl.STREAM_DRAW
        export import STATIC_DRAW = ol_webgl.STATIC_DRAW
        export import DYNAMIC_DRAW = ol_webgl.DYNAMIC_DRAW
        export import UNSIGNED_BYTE = ol_webgl.UNSIGNED_BYTE
        export import UNSIGNED_SHORT = ol_webgl.UNSIGNED_SHORT
        export import UNSIGNED_INT = ol_webgl.UNSIGNED_INT
        export import FLOAT = ol_webgl.FLOAT
        export import getContext = ol_webgl.getContext
        export import getSupportedExtensions = ol_webgl.getSupportedExtensions
    }
}
