---
layout: post
title: Getting started with OpenLayers
date: 2014-10-26
description: "In the world of open source web mapping interfaces, the biggest and most robust one is OpenLayers. OpenLayers was first released in 2006 by MetaCarta Labs. After 2007, it became an OSGeo project maintained by the OpenLayers Developer Team. It is still under development in these days. The two well-known and widely used branches of this project are OpenLayers 2 and OpenLayers 3. The third version was officially released this year (August, 2014.), and OpenLayers 3.1 has been announced. This also means, that OpenLayers 2 got out of development and the current version is its final form. OpenLayers 3 on the other hand is under constant development, so applications written with it may require frequent maintenance. In return we will get an interface armed with the capability of using up-to-date formats (e.g. TopoJSON), having beautifully rendered maps (WebGL) or in the future providing 3D maps (based on Cesium)."
comments: true
---
<link href="{{ site.baseurl }}/assets/css/ol-v3.0.0.css" rel="stylesheet" type="text/css" />
<style>
    .olControlAttribution {
        right : 0;
        bottom: 0;
        background: rgba(0, 60, 136, 0.3);
        padding: 2px 4px;
        border-radius: 5px 0 0 0;
        color: white;
    }
    .olControlAttribution a {
        color: white;
    }
    .olControlAttribution a:hover {
        color: #FF8000;
    }
    .olControlLayerSwitcher {
        right: 5px;
    }
    svg {
        max-height: initial;
    }
</style>
In the world of open source web mapping interfaces, the biggest and most robust one is OpenLayers. OpenLayers was first released in 2006 by MetaCarta Labs. After 2007, it became an OSGeo project maintained by the OpenLayers Developer Team. It is still under development in these days. The two well-known and widely used branches of this project are OpenLayers 2 and OpenLayers 3. The third version was officially released this year (August, 2014.), and OpenLayers 3.1 has been announced. This also means, that OpenLayers 2 got out of development and the current version is its final form. OpenLayers 3 on the other hand is under constant development, so applications written with it may require frequent maintenance. In return we will get an interface armed with the capability of using up-to-date formats (e.g. TopoJSON), having beautifully rendered maps (WebGL) or in the future providing 3D maps (based on Cesium).

### Basic considerations

Before using a web mapping interface, the first consideration is the library you would like to use. OpenLayers is not so easy to use, and large, therefore uses a lot of resources. It is designed for being used with browsers. In future development, with WebGL and Cesium, it will depend on hardware acceleration, too. In return, it offers a library on which a professional GIS application can be based on. It handles different projections, most of the formats, and sources out there.

The next consideration is the OpenLayers version you want to use. There is a stable OpenLayers 2, where no changes will be applied, but it lacks the support of the new data-exchange formats. It’s also more complicated to define projections in it. There is also the new OpenLayers 3. It supports most of the formats, has way more classes and utilities to customize your maps, but it is under serious development.

One of the most conspicuous changes in OpenLayers 3 is the lack of support of the Google Maps maps. Let me explain this change. Google Maps has a policy which makes its tiles only reachable from its API. If one wants to use their maps, he/she has to include the Google Maps API in the used application or web page. OpenLayers Developers did this in OpenLayers 2. When you use a Google Maps map, you are requesting it through the Google Maps API, which is integrated in OpenLayers 2’s `OpenLayers.Layer.Google` class. The Development Team stated, until Google will change its policy for reaching its tiles, OpenLayers 3 won’t have an integrated `Google` class.

Let’s see the two libraries in action (OpenLayers 3 on the left):


<div style="height: 500px; overflow: hidden; width: 700px;">
    <div id="openlayers2" style="height: 500px; position: absolute; width: 700px;"></div>
    <div id="openlayers3" style="height: 500px; position: absolute; width: 700px;"></div>
    <input id="slide" max="700" min="1" oninput="sliderChange(this.value)" style="opacity: 0.5; position: relative; top: 50%; width: 700px;" type="range" />
</div>

### Creating the map

The core object in every web mapping interface is the `Map` class. The `Map` class contains every aspect of the web map and populates a `<div>` container. It is a HTML DOM element, which can be styled in many ways. This styling defines how the map will look like in a web page. It can be a simple container, like in the example above, or a popup as well. The Map object can be defined with the following codes:

OpenLayers 2:

``` javascript
var map = new OpenLayers.Map({
    div: 'openlayers2',
    layers: [
        new OpenLayers.Layer.Google('Google Streets'),
        new OpenLayers.Layer.OSM(),
        vector
    ],
    center: [0, 0],
    zoom: 2
});
```

OpenLayers 3:

``` javascript
var map2 = new ol.Map({
    target: 'openlayers3',
    layers: [
        new ol.layer.Tile({
            style: 'Road',
            source: new ol.source.MapQuest({layer: 'osm'})
        }),
        new ol.layer.Vector({
            source: new ol.source.GeoJSON({
                object: hun
            })
        })
    ],
    view: new ol.View({
        center: [0, 0],
        zoom: 2,
        minZoom: 2
    })
});
```

This method is called object construction. The `OpenLayers` and `ol` objects are constructors. They require parameters to do their task. The map constructors take a great number of parameters, however almost all of them have a default value. You only have to provide the ones, you want to use specifically. For this example, I only used the most essentials. The common parameters are `div`/`target` and `layers`. The first one must be the `id` of the corresponding `<div>` container, and the second one, of course defines the layers got to be shown. Only the last parameter differs in the codes. The view needs to be defined in both of the instances. However, the method differs.

### Creating the view

In OpenLayers 2 the map view is defined by parameters which belong to the map object. You can include them in the constructor or set them up with functions, when the map object has been constructed. In OpenLayers 3, there is an ol.View constructor, which defines the view. This is more practical in several ways. In OL 2, the map object is lengthy, the masses of parameters make it harder to implement. OL 3 minimized the number of parameters with adding more constructors to distinct aspects. With a new ol.View object, the construction is more clear, and it is easier to synchronize.

OpenLayers 2:

``` javascript
var map = new OpenLayers.Map({
    [...]
    center: [0, 0],
    zoom: 2
});

map.setCenter([0, 0], 2);

map.zoomToMaxExtent();
Note that the three methods are alternatives to each others.
```

OpenLayers 3:

``` javascript
var view = new ol.View({
    center: [0, 0],
    zoom: 2,
    minZoom: 2
});
```

### Adding controls

The `controls` parameter can be defined in both of the frameworks. There are default controls, like pan and zoom, only the extra ones need to be defined. In OpenLayers 3 there isn’t a layer switcher yet, but I wanted to show it, so I defined one in the OpenLayers 2 instance. Defining controls, also has two ways. You can provide them as a parameter in the map constructor in an array, or you can add them after. I recommend the second method, if you aren’t sure what are you doing, as in the first method you have to provide the default controls also, otherwise they will be lost. For now, I will only show the code of the only control in the example, but there will be an article later based on control management.

OpenLayers 2:

``` javascript
var map = new OpenLayers.Map({
    [...]
    controls: [
        new OpenLayers.Control.LayerSwitcher()
    ]
});

map.addControl(new OpenLayers.Control.LayerSwitcher());
```

### The full code

``` javascript
var map = new OpenLayers.Map({
    div: 'openlayers2',
    layers: [
        new OpenLayers.Layer.Google('Google Streets'),
        new OpenLayers.Layer.OSM()
    ]
});

map.addControl(new OpenLayers.Control.LayerSwitcher());
map.setCenter([0, 0], 2);

var view = new ol.View({
    center: [0, 0],
    zoom: 2,
    minZoom: 2
});

map2 = new ol.Map({
    target: 'openlayers3',
    layers: [
        new ol.layer.Tile({
            style: 'Road',
            source: new ol.source.MapQuest({layer: 'osm'})
        })
    ],
    view: view
});
```

<script src="{{ site.baseurl }}/assets/js/OpenLayers/OpenLayers.js" type="text/javascript"></script>

<script src="{{ site.baseurl }}/assets/js/ol-v3.0.0.js" type="text/javascript"></script>

<script src="https://maps.google.com/maps/api/js?v=3&amp;sensor=false&amp;callback=check&amp;key=AIzaSyBXuctRWm0Po1lKBCQZnkAQz9wDU2UNGes" type="text/javascript"></script>

<script src="{{ site.baseurl }}/assets/js/getting-started-openlayers.js" type="text/javascript"></script>

