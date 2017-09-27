---
layout: post
title: OpenLayers layer creation
date: 2014-11-23
description: "Layers are a core concept in every GIS software. They are collections of contiguous spatial data. You can stack layers on each other, perform an operation on them, style them individually, etc. Fortunately, OpenLayers is outstanding with its layer management. Every raster dataset is contained in a layer. For vector data, you can group features to as many layers as you like. Layers can be accessed, modified or removed after they are constructed. As the layer changes, the map object will track the changes, so it will take effect on the visualization, too. In the following post, I will write about OpenLayers layers."
comments: true
---
<style>
    svg {
        max-height: initial;
    }
</style>
Layers are a core concept in every GIS software. They are collections of contiguous spatial data. You can stack layers on each other, perform an operation on them, style them individually, etc. Fortunately, OpenLayers is outstanding with its layer management. Every raster dataset is contained in a layer. For vector data, you can group features to as many layers as you like. Layers can be accessed, modified or removed after they are constructed. As the layer changes, the map object will track the changes, so it will take effect on the visualization, too. In the following post, I will write about OpenLayers layers.

### Basic overview

As object-oriented libraries, OpenLayers handle layers in a structured form. The layer hierarchy in the two libraries are different. OpenLayers 2 bulks the different layer types in two objects, which are for handling raster and vector layer rendering. OpenLayers 3, on the other side, handles the layers in a more structured way. It has only the most essential layer types, thereafter it leaves the management of the layer source to a new object, `ol.source`. The OpenLayers raster hierarchy can be seen on figures 1 and 2.

<p><img class="col three" src="{{ site.baseurl }}/assets/img/perez_openlayers_layer_hierarchy.png" /></p>
<div class="col three caption">
Figure 1. OpenLayers 2 layer hierarchy. Adapted from  https://github.com/acanimal/OpenLayers-Presentation/tree/master/images. Copyright 2012 by A. S. Perez. Adapted with permission.
</div>

As you can see, in OpenLayers 2, every slightly different approach is represented by a new layer type. Note that, as Perez (2012) stated, the `OpenLayers.Layer.WFS` type is depreciated and its former function is now fulfilled by `OpenLayers.Layer.Vector`. There are four main classes, HTTPRequest, Image, Vector, and Markers. HTTPRequest is a helper class, which handles WMS and WMTS requests, so it can be identified with the Grid class. The role of the Grid class is to handle tiled (gridded) data. The Image class is self-evident. It renders single images on the map. The Vector class handles all the vector formats, OpenLayers 2 supports, and finally, the Marker class creates markers on the map.

<p><img class="col three" src="{{ site.baseurl }}/assets/img/openlayers3_layer_hierarchy.png" /></p>
<div class="col three caption">
Figure 2. OpenLayers 3 layer hierarchy.
</div>

As OpenLayers 3 is in development, the objects in the elements can be changed. However, the structure will probably remain the same. Every member of the hierarchy tree represent a different layer type with unique behaviour. The list of OpenLayers 3 layer classes is fairly truncated, as the missing classes (and many more) can be found as source classes. The role of the classes is similar to the OpenLayers 2 ones. There is only one significant change, the new `ol.layer.Group` class. With this implementation, layers can be grouped into layer groups and can be handled as one single layer.

### Creating layers

The layer creation in OpenLayers is quite straightforward. You have to construct a new layer object and pass the required arguments. In OpenLayers 2, you have to choose the most appropriate layer constructor and customize it for your needs. There are two types of parameters you can define: client side and server side. The client side parameters are processed by OpenLayers, they specify how the layer should be handled by the library. You can name your layer, tell the URL of the source map server, set vector styles, specify sizes, extents, base layers, overlays or tell the library if it should wrap the map around the date line. The server side parameters are piped into the GetMap request and the map server processes them. You have to know exactly what kind of parameters the map server can handle to define such options. You have to pass these types of parameters in a block after the other options.

OpenLayers 3 on the other hand have more structured layer constructors. It requires every definable parameter in strict KVP (Key-Value Pairs) style, making the construction more flexible. For example you have to pass the server side parameters in the `params` section. As the layer classes are truncated, you have to select and pass a source object to the constructor. There are plenty of sources, you have to choose the most appropriate one. Luckily the names of the sources are telling and logical, and the [official page](http://openlayers.org/) has plenty of great [examples](http://openlayers.org/en/v3.0.0/examples/). In OpenLayers 3 the source object takes some of the parameters (the source specific ones), be aware of that.

OpenLayers 2:

``` javascript
var ol2_image = new OpenLayers.Layer.Image(
    'City Lights',
    'http://dev.openlayers.org/examples/data/4_m_citylights_lg.gif',
    new OpenLayers.Bounds(-180, -88.759, 180, 88.759),
    new OpenLayers.Size(580, 288),
    {
        numZoomLevels: 3,
        isBaseLayer: false
    });

var ol2_tile = new OpenLayers.Layer.WMS(
    'Global Imagery',
    'http://demo.opengeo.org/geoserver/wms',
    {
        layers: 'bluemarble'
    },
    {
        buffer: 1
    });

var ol2_vector = new OpenLayers.Layer.Vector('Countries', {
    projection: 'EPSG:4326',
    strategies: [new OpenLayers.Strategy.Fixed()],
    protocol: new OpenLayers.Protocol.HTTP({
        url: "countries.geojson",
        format: new OpenLayers.Format.GeoJSON()
    }),
    style: {
        strokeColor: '#339933',
        strokeWidth: 1,
        strokeOpacity: 1,
        fill: false
    }
});

var ol2_marker = new OpenLayers.Layer.Markers('Random markers');
```

OpenLayers 3:

``` javascript
var ol3_tile = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: 'http://demo.opengeo.org/geoserver/wms',
        params: {
            layers: 'bluemarble',
            format: 'image/png'
        }
    }),
});

var ol3_heatmap = new ol.layer.Heatmap({
     source: new ol.source.Vector(),
     radius: 10,
     weight: 'magnitude',
});

var ol3_image = new ol.layer.Image({
    source: new ol.source.ImageStatic({
        url: 'http://dev.openlayers.org/examples/data/4_m_citylights_lg.gif',
        imageExtent: [-180, -89.5, 180, 89.5],
        imageSize: [580, 288]
    }),
    minResolution: 0.15625,
});

var ol3_vector = new ol.layer.Vector({
    source: new ol.source.GeoJSON({
        url: 'countries.geojson'
    }),
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#339933',
            width: 1,
            opacity: 1
        })
    }),
});

var ol3_group = new ol.layer.Group();
```

As you can see, the in OpenLayers 2 the arguments are passed in order, so it doesn’t have named parameters for them. The first argument is the name of the layer, the second is the URL, and the third is block with the server side parameters. When a layer doesn’t follow this schema, like `OpenLayers.Layer.Vector`, the layer specific parameters are usually defined in KVP style. Luckily, the [API documentation](http://dev.openlayers.org/releases/OpenLayers-2.13.1/doc/apidocs/files/OpenLayers-js.html) clarifies the usage of the constructors.

In OpenLayers 3, thanks to the KVP parameters, the passable arguments are straightforward, easy to understand and apply. The most conspicuous difference is the lack of name handling. OpenLayers 3 doesn’t accept layer names by default. This will probably change with the implementation of the layer switcher. The concept of base layers and overlays is waiting for implementation, too.

### Parametrizing vector layers

The structure of the vector layers are slightly different from the rasters. There are a few vector specific terms and techniques you need to learn. Vector layers come in three major types (three dimensions). Features with zero dimensions are called points, one dimensional features are called lines, and two dimensionals are called polygons. As the geometries of the different features have to be handled differently, there are geometry classes for them in both of the libraries. There are more complex geometry types, like multipart features. They are handled with the simple feature classes, off course with extra rules. If you need to define the type of your features, you have to choose the most appropriate one for your data. Don’t worry about, how the library handles it. It is also important to note, that these libraries can handle all the feature types in one layer, so if you need to to take considerations for separating feature types, you have to set up rules for your layers.

#### Strategies

Strategies are a key concept in loading features. Typically servers store vast amounts of feature data, and you probably won’t need all of them at a time. Loading all of them make the rendering process slow, and if they’re rendered as DOM elements, it can crash the application. The FAQ of OpenLayers 2 suggests to keep the DOM elements under 500. Above 1000 DOM features, the application will most likely crash.

If the features are rendered in SVG format, or in a `<canvas>`, big number of features will still slow down the application. This is why strategies have been implemented. In OpenLayers 2, you can define strategies in any vector layer. The most commonly used strategies are `OpenLayers.Strategy.Fixed` and `OpenLayers.Strategy.BBOX`. The first one loads the whole array of features only once, while the second one only loads features in the current viewport.

In OpenLayers 3, strategies are limited to the `ol.source.ServerVector` class. The other vector sources are static, and most likely will be used with considerable amount of data. If the data is stored in a WFS server, then it can be called with strategies. The equivalent strategies with the above ones are `ol.loadingstrategy.all` and `ol.loadingstrategy.bbox`.

#### Protocols and proxy

When loading a vector layer from your own server, everything goes smooth. You have to clarify the path of your data in OpenLayers 3, or construct a protocol object in OpenLayers 2. `OpenLayers.Protocol.HTTP` will take care of your data and render it on your map. However, JavaScript has a same origin policy for security reasons. If you want to visualize some features from a remote server (cross origin data), it can give you a headache.

For cross origin data management, there are three methods to use. The first one is to use JSONP, which is basically a script injection to retrieve JSON data from a cross origin server. You can use `OpenLayers.Protocol.Script` in OpenLayers 2 to achieve this. The second option is to enable CORS on the server side. After then, you can use `OpenLayers.Protocol.WFS` to access feature data. The third is to use a proxy file on your server, which will fetch the cross origin data and handle it to you, as same origin. In OpenLayers 3, for now, an AJAX request is your best chance.

Of course, you can choose to include the JSON data in your code as a variable. This way, you will get a same origin object, which can be parsed by the OpenLayers library without an error, however the syntax is different. In OpenLayers 3 there is only a minor difference, you have to change the `url` parameter to `object`. In OpenLayers 2, the only way to do this, is to create an empty vector layer, then fill it up afterwards. The only problem is, that you can’t parametrize a vector layer without features. You have to set up every parameter with separate commands. Note that this way, you can’t set up strategies.

OpenLayers 2:

``` javascript
ol2_vector = new OpenLayers.Layer.Vector();
ol2_vector.setName('Countries');
ol2_vector.projection = 'EPSG:4326';
ol2_vector.addFeatures(new OpenLayers.Format.GeoJSON().read(countries));
ol2_vector.style = {
    strokeColor: '#339933',
    strokeWidth: 1,
    strokeOpacity: 1,
    fill: false
};
```

OpenLayers 3:

``` javascript
ol3_vector = new ol.layer.Vector({
    source: new ol.source.GeoJSON({
        object: countries
    }),
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#339933',
            width: 1,
            opacity: 1
        })
    }),
    variable: "ol3_vector"
});
```

#### Style

Finally, as vector layers are rendered by the library, they can be styled with it, too. In OpenLayers 2 you can either apply a style or a styleMap to the vector layer. A style object is very simple, you just pass the `OpenLayers.Symbolizer` options of the correct feature type and you’re done. With `OpenLayers.StyleMap`, you can define styling rules and override rendering intents (default, selected, temporary). You have to key it by them. The following example (adapted from the [official page](http://dev.openlayers.org/examples/label-scale.html)) has different style for default and selected features and has a rule for labelling and sizing in different scales, and colouring based on the `magnitude` “column”:

``` javascript
styleMap: new OpenLayers.StyleMap({
    "default": new OpenLayers.Style({
        fillColor: "#ffcc66",
        strokeColor: "#ff9933",
        strokeWidth: 2,
        pointRadius: 7,
        label: "${magnitude}",
        fontColor: "#333333",
        fontFamily: "sans-serif",
        fontWeight: "bold"
        }, {
        rules: [
            new OpenLayers.Rule({
                minScaleDenominator: 200000000,
                symbolizer: {
                    pointRadius: 7,
                    fontSize: "9px"
                }
            }),
            new OpenLayers.Rule({
                maxScaleDenominator: 200000000,
                minScaleDenominator: 100000000,
                symbolizer: {
                    pointRadius: 10,
                    fontSize: "12px"
                }
            }),
            new OpenLayers.Rule({
                maxScaleDenominator: 100000000,
                symbolizer: {
                    pointRadius: 13,
                    fontSize: "15px"
                }
            }),
            new OpenLayers.Rule({
                filter: new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.LESS_THAN,
                    property: "magnitude",
                    value: 6
                }),
                symbolizer: {
                    fillColor: "#F78181",
                    strokeColor: "#FE2E2E"
                }
            }),
            new OpenLayers.Rule({
                filter: new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.BETWEEN,
                    property: "magnitude",
                    lowerBoundary: 6,
                    upperBoundary: 7
                }),
                symbolizer: {
                    fillColor: "#58FA58",
                    strokeColor: "#04B404"
                }
            }),
            new OpenLayers.Rule({
                filter: new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.GREATER_THAN,
                    property: "magnitude",
                    value: 8
                }),
                symbolizer: {
                    fillColor: "#F5A9F2",
                    strokeColor: "#FE2EC8"
                }
            }),
        ]
    }),
    "select": new OpenLayers.Style({
        fillColor: "#66ccff",
        strokeColor: "#3399ff"
    })
})
```

<div id="map" style="height: 500px; width: 100%;"></div>

OpenLayers 3 offers a more structured, still more simple way to define styles. For now it doesn’t have rule based styling and style maps. First, you have to construct an `ol.style.Style` object, which can handle informations for the following classes: `fill`, `image`, `stroke`, `text`. There are separate objects for each of these classes, you have to construct. For something like a rule based styling, you have to build up your own routine, which returns the desired style for each feature.

<script src="{{ site.baseurl }}/assets/js/OpenLayers/OpenLayers.js" type="text/javascript"></script>
<script src="{{ site.baseurl }}/assets/js/openlayers-layercreate.js" type="text/javascript"></script>

