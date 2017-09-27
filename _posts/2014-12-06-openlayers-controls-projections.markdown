---
layout: post
title: Controls and projections in OpenLayers
date: 2014-12-06
description: "OpenLayers has a huge advantage as a Web GIS GUI over Leaflet. It can handle any projection, which can be described by Proj.4. Leaflet supports only two projections (the WGS84 and the Web Mercator). These projections are natively supported in most of the GUIs. As Leaflet is a plugin based, modular library, it has a plugin to use Proj.4 capable projections, but it makes a reverse transformation. It transforms the input coordinates with Proj4js from the defined projection to geographic coordinates. OpenLayers on the other side is capable to handle any coordinate system, so the input maps will be rendered in a projection defined by the developer."
comments: true
---
<style type="text/css">
    .ol-mouse-position {
        bottom: 0px;
        right: 0px;
        top: auto;
    }
    .ol_legend {
    bottom: 0px; left: 0px; position: absolute; background-color: #FFFFFF;
    }
    svg {
        max-height: initial;
    }
</style>

<link href="{{ site.baseurl }}/assets/css/ol-v3.0.0.css" rel="stylesheet" type="text/css" />
OpenLayers has a huge advantage as a Web GIS GUI over Leaflet. It can handle any projection, which can be described by Proj.4. Leaflet supports only two projections (the [WGS84](http://spatialreference.org/ref/epsg/4326/) and the [Web Mercator](http://spatialreference.org/ref/sr-org/7483/)). These projections are natively supported in most of the GUIs. As Leaflet is a plugin based, modular library, it has a [plugin](https://github.com/kartena/Proj4Leaflet) to use Proj.4 capable projections, but it makes a reverse transformation. It transforms the input coordinates with Proj4js from the defined projection to geographic coordinates. OpenLayers on the other side is capable to handle any coordinate system, so the input maps will be rendered in a projection defined by the developer.

### Using local projections

Both of the OpenLayers libraries support projection information of the map object, and any individual layer. As vector layers get rendered on the client side, the libraries project it from the layer projection to the map projection (if defined) automatically. In OpenLayers 2, the map object also has a `displayProjection` parameter. It can be used to display mouse coordinates in the defined projection without projecting the map data.

Raster layers are harder to handle. They cannot be reprojected with the Proj.4 library, so they can only exist in one particular projection. In the case of raster layers, their CRS must be the same, the `map` object should know this parameter, and their respective layer objects don’t have to know about it. To define a projection, you have to provide its Proj.4 definition in the `projection` parameter.

To use a local or custom projection, the library needs the definition of it. OpenLayers 2 knows a lot of definitions natively, but in OpenLayers 3, you have to define them prior to use. Note, that the two libraries using different versions of Proj4js. With OpenLayers 2, you have to use [v1.0+](https://trac.osgeo.org/proj4js/wiki/Download) (preferably v1.1.1), while OpenLayers 3 uses [v2.0+](https://github.com/proj4js/proj4js/releases). The syntax of defining projections in the two library differs. Be aware to use the correct syntax for the used version.

OpenLayers 2:

``` javascript
Proj4js.defs["EPSG:23700"]="+proj=somerc +lat_0=47.14439372222222 
+lon_0=19.04857177777778 +k_0=0.99993 +x_0=650000 +y_0=200000 
+ellps=GRS67 +towgs84=52.17,-71.82,-14.9,0,0,0,0 +units=m +no_defs";
```

OpenLayers 3:

``` javascript
proj4.defs("EPSG:23700", "+proj=somerc +lat_0=47.14439372222222 
+lon_0=19.04857177777778 +k_0=0.99993 +x_0=650000 +y_0=200000 
+ellps=GRS67 +towgs84=52.17,-71.82,-14.9,0,0,0,0 +units=m +no_defs");
```

To use the defined projection in the application, you just have to include the definition name (currently EPSG:23700) in the `projection` parameter. You can name your projection definitions practically anything.

OpenLayers 2:

``` javascript
var ol2_map = new OpenLayers.Map('ol2map', {
    projection: "EPSG:23700",
    restrictedExtent: new OpenLayers.Bounds(400000,45000,950000,380000),
    maxResolution: 1000
});

var wms = new OpenLayers.Layer.WMS( "Administrative boundaries",
    'http://mercator.elte.hu/cgi-bin/mapserv?map=/home/oktatok/saman/public_html/hu/okt/mapserver/mo.map',
    {
        layers: 'kozig',
        format: 'image/png'
    },
    {
        maxExtent: new OpenLayers.Bounds(400000,45000,950000,380000),
        singleTile: true,
        isBaseLayer: false,
        showLegend: true
    });
    
var wms2 = new OpenLayers.Layer.WMS("Elevation",
    'http://www.agt.bme.hu/cgi-bin/mapserv?map=/var/www/html/gis/wms/eu_dem/eu_dem.map', {
        layers: 'mo_eov_szines',
        format: 'image/png'
    },
    {
        maxExtent: new OpenLayers.Bounds(400000,45000,950000,380000)
});

ol2_map.addLayers([wms, wms2]);

ol2_map.zoomToMaxExtent();
```

OpenLayers 3:

``` javascript
var ol3_map = new ol.Map({
    target: 'ol3map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: 'http://www.agt.bme.hu/cgi-bin/mapserv?map=/var/www/html/gis/wms/eu_dem/eu_dem.map',
                params: {
                    layers: 'mo_eov_szines',
                    format: 'image/png'
                },
                serverType: 'mapserver'
            }),
            extent: [400000,45000,950000,380000]
        }),
        new ol.layer.Image({
            source: new ol.source.ImageWMS({
                url: 'http://mercator.elte.hu/cgi-bin/mapserv?map=/home/oktatok/saman/public_html/hu/okt/mapserver/mo.map',
                params:{
                    layers: 'kozig',
                    format: 'image/png'
                },
                serverType: 'mapserver'
            }),
            extent: [400000,45000,950000,380000],
            showLegend: true
        })
    ],
    controls: ol.control.defaults({attribution: false}).extend([
        new ol.control.MousePosition()
        ]),
    view: new ol.View({
        center: [675000, 212500],
        zoom: 0,
        projection: 'EPSG:23700',
        extent: [400000,45000,950000,380000],
        maxResolution: 1000
    })
});
```

The source of the layers are now two different MapServers with a local, Hungarian projection (EPSG:23700, HD72/EOV). They only cover the area of Hungary, so they have a fixed extent, which have to be provided to the server to get the requested images. But how to get these information from a WMS server? If you know the URL to the service, you know everything. The WMS specification states, that a Web Map Service is required to answer to two request. One of them is the [GetCapabilities](http://mercator.elte.hu/cgi-bin/mapserv?map=/home/oktatok/saman/public_html/hu/okt/mapserver/mo.map&service=WMS&request=GetCapabilities) request, which returns the capabilities of the current service. The returned XML contains the map extent, the available formats, and the available layers.

### Adding map controls

Map controls are built-in functions to ease the use and the customization of a Web GIS application. There are very different functions, like the `LayerSwither()`, the `MousePosition()`, the `ScaleLine()`, or the `Rotate()` tool in OpenLayers 3. There are also basic, default controls, like the zoom or pan tool. Note, that if you define controls in the map object, you override the default controls, so somehow you have to include them, too in the `controls` parameter.

OpenLayers 2:

``` javascript
ol2_map.addControl(new OpenLayers.Control.MousePosition());
ol2_map.addControl(new OpenLayers.Control.LayerSwitcher());
ol2_map.addControl(new OpenLayers.Control.WMSLegend({
    class: 'ol_legend'
}));
```

OpenLayers 3:

``` javascript
var ol3_map = new ol.Map({
    [...]
    controls: ol.control.defaults({attribution: false}).extend([
        new ol.control.MousePosition()
        ]),
    [...]

ol3_map.addControl(ol3_legend({
    map: ol3_map,
    class: 'ol_legend'
}));
```

In OpenLayers 2, to add the controls in the map object, you have to add the default controls too, which are `OpenLayers.Control.Navigation()` and `OpenLayers.Control.Zoom()`. Otherwise, you have to add the new control after the map had been constructed, with the `addControl()` method. In OpenLayers 3, there is an `addControl()` method, too, however, you can extend the default controls with `ol.control.defaults.extend()`.

### Creating new control

If you look at the provided GetCapabilities request link, there is a legend service, which can be used as an image legend. For this, you can build a new `WMSLegend()` control, which can be parametrized for any similar service. We don’t want to include layer identifiers in it, so instead, we create a new property in the layer objects called `showLegend`. It will be the key of the filter to sort out the layers the control will be applied on. Furthermore, we want to use that particular map object, the control is called upon. To do this, we have to inherit the properties of the main control class. Sadly, this is bugged in OpenLayers 3.0.0, but it is fixed in the current testing version. For this reason, the OpenLayers 3 control will require the map object.

``` html
<style type="text/css">
    .ol_legend {
    bottom: 0px; left: 0px; position: absolute; background-color: #FFFFFF;
    }
</style>
```

OpenLayers 2:

``` javascript
OpenLayers.Control.WMSLegend = OpenLayers.Class(OpenLayers.Control, {
    class: null,
    wmsVersion: '1.3.0',
    format: 'image/png',
    draw: function () {
        var legendP = document.createElement('p');
        legendP.innerHTML = 'Legend:';
        this.div = document.createElement('div');
        this.div.className = this.class + ' olControlNoSelect';
        this.div.appendChild(legendP);
        var layers = this.map.layers;
        for(var i=0;i<layers.length;i++){
            if (layers[i].getOptions().showLegend === true) {
                var legendImg = document.createElement('img');
                if (typeof layers[i].params.LAYERS === 'string') {
                    var layer = layers[i].params.LAYERS;
                } else {
                    var layer = layers[i].params.LAYERS[0];
                }
                legendImg.src = layers[i].url + '&version=' + this.wmsVersion + '&service=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=' + layer + '&format=' + this.format;
                this.div.appendChild(legendImg);
            }
        }
        return this.div;
    },
    CLASS_NAME: 'OpenLayers.Control.WMSLegend'
});
```

OpenLayers 3:

``` javascript
ol.control.WMSLegend = function(opt_options) {
    var options = opt_options || {};
    this.options = options;
    this.div = document.createElement('div');
    var legendP = document.createElement('p');
    legendP.innerHTML = 'Legend:';
    this.div.className = this.options.class + ' ol-unselectable';
    this.div.appendChild(legendP);
    ol.control.Control.call(this, {
        element: this.div
    });
};
ol.inherits(ol.control.WMSLegend, ol.control.Control);

ol.control.WMSLegend.prototype.drawLegendItem = function(layer) {
    if (layer.get('showLegend') === true) {
        try {
            var url = layer.getSource().getUrls()[0];
        }
        catch(err) {
            var url = layer.getSource().getUrl();
        }
        var legendImg = document.createElement('img');
        legendImg.src = url + '&version=' + this.options.wmsVersion + '&service=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=' + layer.getSource().getParams().layers + '&format=' + this.options.format;
        this.div.appendChild(legendImg);
    }
}

ol.control.WMSLegend.prototype.setMap = function(map){
    ol.control.Control.prototype.setMap.call(this, map);
    this.options.wmsVersion = this.options.wmsVersion || '1.3.0';
    this.options.format = this.options.format || 'image/png';
    var layers = map.getLayers().getArray();
    for (var i=0;i<layers.length;i++) {
        if (layers[i] instanceof ol.layer.Group) {
            var layersFromGroup = layers[i].getLayers().getArray();
            for (var j=0;j<layersFromGroup.length;j++) {
                this.drawLegendItem(layersFromGroup[j]);
            }
        } else {
            this.drawLegendItem(layers[i]);
        }
    }
};
```

#### Extending controls in OpenLayers 2

To make our new control inherit the properties of the main control class, we have to use `OpenLayers.Class(OpenLayers.Control, [...])`. This way, our control will have all the properties, `OpenLayers.Control` has. We have to set up every control specific variable and function as object parameters. There are three main function properties in the control class: `initialize`, `destroy`, and `draw`. We will only use the draw property to draw the legend. We will define the following variables: `class`, `wmsVersion`, and `format`. They will have an initial value, which can be overridden in the construction.

Note that we can access the control’s map object with `this.map`. We have to write every HTML element in `this.div`, and we have to return it in the finish. The main function is simple, we filter the layers with the `showLegend` property, get the desired layers, and write a WMS GetLegendGraphic request with the provided or default parameters. The control in the current state won’t support arrays of layers, it will only create a legend for the first one in the array. The last parameter of the control is the `CLASS_NAME`. This will make sure the control can be called with the `getLayersByClass()` method.

<div id="ol2map" style="height: 500px; width: 700px;"></div>

#### Extending controls in OpenLayers 3

In OpenLayers 3, creating custom controls are a little bit different. At the object construction, the control can’t access the map’s properties yet, so we just set up the legend frame. Then we call the `ol.control.Control` constructor with our arguments, and set up inheritance, so it will be a proper control object. With the inheritance set up, our control will have a `setMap` function, which will be called after adding the control to the `map` object. To access the map’s layer stack, we have to extend the control’s `setMap` function to draw the legend. The legends’ properties are stored on construction, so we just have to access them, and create some elements for the images. Note that, for a successful initialization, we mustn’t override the original map setting functionality, and to do so, we have to call the original `ol.control.Control`’s `setMap` function with our custom control and map object as arguments. Update: thanks to @paul.py’s [question](https://gis.stackexchange.com/questions/139008/openlayers-3-get-legend-not-working) on GIS StackExchange, I’ve found out that I didn’t take layer groups into consideration. The updated control brings in a separate `drawLegendItem` function, which accepts a single layer item as an argument, thus leaving the iteration to the `setMap` function and taking care of this problem in a nice way.

<div id="ol3map" style="height: 500px; width: 700px;"></div>

Special thanks to Tobias Sauerwein for sorting out my [misconception](https://gis.stackexchange.com/questions/136572/openlayers-3-custom-control-doesnt-get-the-map-object) about creating controls in OpenLayers 3.

<script src="{{ site.baseurl }}/assets/js/OpenLayers/OpenLayers.js" type="text/javascript"></script>

<script src="{{ site.baseurl }}/assets/js/ol-v3.0.0.js" type="text/javascript"></script>

<script src="{{ site.baseurl }}/assets/js/proj4js_v2.3.3.js" type="text/javascript"></script>

<script src="{{ site.baseurl }}/assets/js/proj4js_v1.1.0.js" type="text/javascript"></script>

<script src="{{ site.baseurl }}/assets/js/openlayers-controls-projections.js" type="text/javascript"></script>

