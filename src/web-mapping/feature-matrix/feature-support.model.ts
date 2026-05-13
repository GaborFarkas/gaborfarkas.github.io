import { WebMappingLibrary } from "@/web-mapping/map/web-mapping-library"

/**
 * Enum for features in the feature support matrix.
 */
export enum FeatureSupportFeature
{
    HWACCEL = 'Hardware acceleration',
    RENDERGEOM = 'Render geometry',
    RENDERRASTER = 'Render raster',
    RENDERIMAGE = 'Render image',
    BLEND = 'Blend layers',
    SHAPEFILE = 'ESRI Shapefile',
    KML = 'KML',
    GEOJSON = 'GeoJSON',
    WFS = 'WFS',
    WFST = 'Write transaction',
    MAPBOXTILE = 'Mapbox vector tile',
    GEOTIFF = 'GeoTiff',
    ASCIIGRID = 'Arc/Info ASCII GRID',
    WCS = 'WCS',
    JPEG = 'JPEG',
    PNG = 'PNG',
    WMS = 'WMS',
    WMTS = 'WMTS',
    TMS = 'TMS',
    XYZ = 'Slippy map',
    GOOGLE = 'Google Maps',
    ARCGIS = 'ArcGIS REST API',
    BING = 'Bing Maps',
    POSTGIS = 'PostGIS',
    SPATIALITE = 'SpatiaLite',
    MYSQL = 'MySQL',
    DBMS = 'Using DBMS',
    QUERY = 'Query/filter',
    QL = 'Query language',
    ONTHEFLYPROJ = 'On the fly transformation',
    READATTRIB = 'Read attribute data',
    ZCOORDS = 'Z coordinates',
    MCOORDS = 'M coordinates',
    GEOMTYPES = 'Geometry types',
    SPATIALINDEX = 'Spatial indexing',
    GEOMVALID = 'Geometry validation',
    GEOMGENERALIZE = 'Geometry simplification',
    ATTRIBTBL = 'Attribute table',
    INTERPOLATE = 'Interpolate',
    RASTVECT = 'Raster to vector',
    VECTRAST = 'Vector to raster',
    MANIPULATE = 'Manipulation',
    UPDATEATTRIB = 'Update attribute data',
    UPDATEGEOM = 'Update geometry',
    FIELDCALC = 'Field calculator',
    ADDRMLYR = 'Add/remove layer',
    LYRORDER = 'Change layer order',
    TYPEDLYR = 'Typed layers',
    GEOPROC = 'Basic geoprocessing',
    TOPOLOGY = 'Topological analysis',
    MODIFYIMG = 'Modify image',
    MODIFYRAST = 'Modify raster',
    RASTCALC = 'Raster algebra',
    CLASSIFY = 'Classification',
    CONVOLVE = 'Convolution',
    WPS = 'Write WPS request',
    PROJ = 'Projection',
    TRANSVECT = 'Transform vector',
    WARPRAST = 'Warp raster',
    KNOWNPROJ = 'Well-known projections',
    CUSTOMPROJ = 'Custom projections',
    DRAW = 'Draw features',
    MODIFYFEAT = 'Modify features',
    SNAP = 'Snap points',
    MODIFYVIEW = 'Modify view',
    SELFEAT = 'Select features',
    QUERYFEAT = 'Query features',
    QUERYRAST = 'Query raster',
    MEAURE = 'Measure',
    CHTIME = 'Change time',
    COORDS = 'Mouse coordinates',
    STYLEVECT = 'Style vector',
    STYLERAST = 'Style raster',
    THEMATIC = 'Thematic maps',
    SCALE = 'Scale bar',
    NORTH = 'North arrow',
    LEGEND = 'Legend',
    GRATICULE = 'Graticule',
    OVERLAY = 'Text box',
    OVERVIEWMAP = 'Overview map'
}

/**
 * Enum for feature support scores in the feature support matrix.
 */
export enum FeatureSupportScore
{
    /**
     * Unkown development time.
     */
    UNKNOWN,
    /**
     * Native support.
     */
    NATIVE,
    /**
     * Low effort development.
     */
    LOW,
    /**
     * Moderate effort development.
     */
    MODERATE,
    /**
     * Impossible or infeasible.
     */
    HIGH
}

/**
 * Represents a single cell or category in the feature support matrix.
 */
export interface FeatureSupportItem {
    /**
     * Name of the item.
     */
    name: string,
    /**
     * Name of the item's parent category.
     */
    parent?: string,
    /**
     * Short description of the item.
     */
    description: string,
    /**
     * Support score for every assessed web mapping library. Undefined, if the current item is a category.
     */
    support?: Record<WebMappingLibrary, FeatureScoreDescriptor>,
    /**
     * Extra information for the current item.
     */
    addendum?: string
}

/**
 * Describes a single library's feature score in the feature support matrix.
 */
export interface FeatureScoreDescriptor {
    /**
     * The score expressed as an integer.
     */
    score: FeatureSupportScore,
    /**
     * Line number in the source example file, if the feature has an example.
     */
    line?: number
}
