---
layout: post
title: OpenLayers layer management
date: 2014-11-27
description: "In the previous post I wrote about layer creation. This is only a part of the capabilities of a good GIS application. A good application can also manage layers in an efficient way. Fortunately, OpenLayers libraries have predefined functions for layer management. They provide a great base to build upon and create dynamic Web GIS applications. Some of the basic tasks of layer management are adding and removing layers, changing layer order, listing rendered layers, and changing layer styles. Off course, they have to do it during the workflow, without reloading the page. I will show a few of these functions with a live example in this post."
comments: true
---
<style>
    svg {
        max-height: initial;
    }
</style>

<link href="{{ site.baseurl }}/assets/css/ol-v3.0.0.css" rel="stylesheet" type="text/css" />
In the previous post I wrote about layer creation. This is only a part of the capabilities of a good GIS application. A good application can also manage layers in an efficient way. Fortunately, OpenLayers libraries have predefined functions for layer management. They provide a great base to build upon and create dynamic Web GIS applications. Some of the basic tasks of layer management are adding and removing layers, changing layer order, listing rendered layers, and changing layer styles. Off course, they have to do it during the workflow, without reloading the page. I will show a few of these functions with a live example in this post.

### Adding layers

To demonstrate layer management, first you have to add some layers to work with. In this example, I will use the base layer types, presented in the previous post:

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

### Layer management

OpenLayers libraries provide functionality of modifying layers on some levels. OpenLayers 2 has a rich array of tools to achieve tasks of layer management. OpenLayers 3 doesn’t have so much helper functions, yet, but it has some essential basic functionality to build on. As layers are members of the map object, these functions have to be called from it. The only exception is setting the style of a layer (in this example opacity), which is a layer property, so it has to be called from the layer object.

OpenLayers 2:

<div id="ol2map" style="height: 500px; width: 700px;"></div>
<table>
    <tbody>
        <tr>
            <td><select id="ol2_layerSelection" onchange="ol2_getAttributes(this.value)">
                        <option selected="" value="ol2_tile">Tile layer</option>
                        <option value="ol2_image">Image layer</option>
                        <option value="ol2_vector">Vector layer</option>
                        <option value="ol2_marker">Marker layer</option>
                    </select></td>
                    <td>Current pos.: <span id="ol2_pos"></span></td>
                    <td><input onclick="ol2_layerUp()" type="button" value="Up" /></td>
                    <td><input onclick="ol2_layerDown()" type="button" value="Down" /></td>
                    <td><input onclick="ol2_layerTop()" type="button" value="Top" /></td>
                    <td><input onclick="ol2_layerBottom()" type="button" value="Bottom" /></td>
                    <td><input onclick="ol2_layerAdd()" type="button" value="Add" /></td>
                    <td><input onclick="ol2_layerRemove()" type="button" value="Remove" /></td>
                </tr>
</tbody></table>
<table>
                <tbody>
<tr>
                    <td>Opacity(%):</td>
                    <td><input id="ol2_opacity" max="1" min="0" oninput="ol2_changeOpacity(this.value)" step="0.1" type="range" /></td>
                </tr>
</tbody></table>

OpenLayers 3:

<div id="ol3map" style="height: 500px; width: 700px;"></div>
<table>
                <tbody>
<tr>
                    <td><select id="ol3_layerSelection" onchange="ol3_getAttributes(this.value)">
                        <option id="ol3_tile" selected="" value="ol3_tile">Tile layer</option>
                        <option id="ol3_image" value="ol3_image">Image layer</option>
                        <option id="ol3_vector" value="ol3_vector">Vector layer</option>
                        <option id="ol3_heatmap" value="ol3_heatmap">Heatmap layer</option>
                        <option disabled="" id="ol3_group" value="ol3_group">Group layer</option>
                    </select></td>
                    <td>Current pos.: <span id="ol3_pos" style="background-color: #f5a9a9;"></span></td>
                    <td><input onclick="ol3_layerUp()" style="background-color: #f5a9a9;" type="button" value="Up" /></td>
                    <td><input onclick="ol3_layerDown()" style="background-color: #f5a9a9;" type="button" value="Down" /></td>
                    <td><input onclick="ol3_layerTop()" style="background-color: #f5a9a9;" type="button" value="Top" /></td>
                    <td><input onclick="ol3_layerBottom()" style="background-color: #f5a9a9;" type="button" value="Bottom" /></td>
                    <td><input onclick="ol3_layerAdd()" type="button" value="Add" /></td>
                    <td><input onclick="ol3_layerRemove()" type="button" value="Remove" /></td>
                </tr>
</tbody></table>
<table>
                <tbody>
<tr>
                    <td>Opacity(%):</td>
                    <td><input id="ol3_opacity" max="1" min="0" oninput="ol3_changeOpacity(this.value)" step="0.1" type="range" /></td>
                    <td>&nbsp;&nbsp;Visible:&nbsp;&nbsp;</td>
                    <td><input checked="true" id="ol3_visible" onchange="ol3_changeVisible(this.checked)" type="checkbox" /></td>
                </tr>
</tbody></table>
<table>
                <tbody>
<tr>
                    <td>Tile layer:&nbsp;&nbsp;</td>
                    <td><input id="ol3_tilecheck" onchange="ol3_checkbox(this)" type="checkbox" value="ol3_tile" />&nbsp;&nbsp;</td>
                    <td>Image layer:&nbsp;&nbsp;</td>
                    <td><input id="ol3_imagecheck" onchange="ol3_checkbox(this)" type="checkbox" value="ol3_image" />&nbsp;&nbsp;</td>
                    <td>Vector layer:&nbsp;&nbsp;</td>
                    <td><input id="ol3_vectorcheck" onchange="ol3_checkbox(this)" type="checkbox" value="ol3_vector" />&nbsp;&nbsp;</td>
                    <td>Heatmap layer:&nbsp;&nbsp;</td>
                    <td><input id="ol3_heatmapcheck" onchange="ol3_checkbox(this)" type="checkbox" value="ol3_heatmap" />&nbsp;&nbsp;</td>
                </tr>
</tbody></table>
<table>
                <tbody>
<tr>
                    <td><input onclick="ol3_groupLayers()" type="button" value="Group layers" /></td>
                    <td><input onclick="ol3_ungroupLayers()" type="button" value="Ungroup layers" /></td>
                </tr>
</tbody></table>

There are two strange typos in blogger. The vector layer misalignment in OpenLayers 2, and the empty OpenLayers 3 div element. I have no idea about the first one, but to fix the last, simply click one of the red buttons.

#### Checking layer presence

The first step in writing functions for layer handling is to check if the layer is present on the map. It has no sense to alter layers which don’t even exist. Running layer management functions on non-existent layers are basically wasting resources, but it can end up in more serious problems, like layer duplication. The first consideration is to store the layers in different variables. This way the layers can be accessed after they’ve been added without extra lines to gather them by various properties.

OpenLayers 2:

``` javascript
if (ol2_map.getLayersByName(ol2_curLayer.name).length === 1) {
    // Do something
} else {
    // Tell the user, the layer doesn't exist
}
```

OpenLayers 3:

``` javascript
function ol3_checkLayer(layer) {
    var res = false;
    for (var i=0;i<ol3_map.getLayers().getLength();i++) {
        if (ol3_map.getLayers().getArray()[i] === layer) { //check if layer exists
            res = true; //if exists, return true
        }
    }
    return res;
}

if (ol3_checkLayer(ol3_curLayer)) {
    // Do something
} else {
    // Tell the user, the layer doesn't exist
}
```

In OpenLayers 2, the checking can be done with a simple one-liner. The `getLayersByName(name)` method returns an array of layers with the name of the input string. This only works if every layer has a unique name. If the layers have another unique identifier in a different property, this can be done with the `getLayersBy(property, value)` method.

In OpenLayers 3, there isn’t any method to check if a layer is present in the current composition. However, it has one to provide all layers in an `ol.Collection` object. You can easily iterate through this object and check if the provided layer matches any of the returned layers. Watch out for the programming style. I didn’t write the function in the ol.Map object’s prototype, so you have to hard code the `ol.Map`’s variable in the function. If requested, I will write a post about creating functions in prototype.

#### Adding and removing layers

The most essential control in layer management is the capability of adding and removing layers. Every Web GIS environment offer some functions to this task, you just have to utilize them in your code, so you can create a dynamic application. These functions are one-liners in both of the libraries, you just have to provide the constructed layer objects to them (preferably in variable form for later operations). The only difference is, that OpenLayers 2 provides a bulk add function (`OpenLayers.Map.addLayers([layer1, layer2, etc.]`), which requests an array of layer objects. Don’t forget: you should only add layers to the composition which aren’t present and remove the ones which aren’t already removed. For this reason, I will include the checking method into the examples.

OpenLayers 2:

``` javascript
function ol2_layerAdd(ol2_curLayer) {
    if (ol2_map.getLayersByName(ol2_curLayer.name).length === 0) {
        ol2_map.addLayer(ol2_curLayer);
        // Success, tell the user about it
    } else {
        // Layer already added
    }
}

function ol2_layerRemove(ol2_curLayer) {
    if (ol2_map.getLayersByName(ol2_curLayer.name).length > 0) {
        ol2_map.removeLayer(ol2_curLayer);
        // Success, tell the user about it
    } else {
        // Layer isn't present in the composition
    }
}
```

OpenLayers 3:

``` javascript
function ol3_layerAdd(ol3_curLayer) {
    if (ol3_checkLayer(ol3_curLayer) === false) {
        ol3_map.addLayer(ol3_curLayer);
        // Success, tell the user about it
    } else {
        // Layer already added
    }
}

function ol3_layerRemove(ol3_curLayer) {
    if (ol3_checkLayer(ol3_curLayer) === true) {
        ol3_map.removeLayer(ol3_curLayer);
        // Success, tell the user about it
    } else {
        // Layer isn't present in the composition
    }
}
```

#### Changing layer order

When changing the ordering of the layers, you are changing the z index of the layer elements. In theory, you can change the z indexing outside of the framework, however this is often not a good practice. OpenLayers libraries keep track of the z index, and have internal support for changing them. You can change the z index in HTML code, but you can easily end up in conflicts and malfunctions (e.g. you would like to edit a vector layer, which is indexed to the top outside of the library, and the application says, you can’t do so, because internally, it is indexed in the middle).

OpenLayers 2 provides direct functions to change layer order. You can raise and lower layers. You can also define the index of a layer manually, which is handy if you want to set the current layer on the top or the bottom of the stack.

In OpenLayers 3, you have to manually rearrange the array of layers in the composition. You can easily write functions to achieve this, just be sure to do this consequently and keep track of the other members of the array while changing one. There are built-in functions for array manipulation in JavaScript, like `push()` and `splice()`. You also have to update the view after each modification with `ol.Map.updateSize()`.

OpenLayers 2:

``` javascript
function ol2_layerUp(ol2_curLayer) {
    if (ol2_map.getLayersByName(ol2_curLayer.name).length === 1) {
        ol2_map.raiseLayer(ol2_curLayer, 1);
    }
}

function ol2_layerDown(ol2_curLayer) {
    if (ol2_map.getLayersByName(ol2_curLayer.name).length === 1) {
        ol2_map.raiseLayer(ol2_curLayer, -1);
    }
}

function ol2_layerTop(ol2_curLayer) {
    if (ol2_map.getLayersByName(ol2_curLayer.name).length === 1) {
        var lastIndex = ol2_map.getNumLayers()-1;
        ol2_map.setLayerIndex(ol2_curLayer, lastIndex);
    }
}

function ol2_layerBottom(ol2_curLayer) {
    if (ol2_map.getLayersByName(ol2_curLayer.name).length === 1) {
        ol2_map.setLayerIndex(ol2_curLayer, 0);
    }
}
```

OpenLayers 3:

``` javascript
function ol3_getLayerIndex(layer) {
    var res = false;
    for (var i=0;i<ol3_map.getLayers().getLength();i++) {
        if (ol3_map.getLayers().getArray()[i] === layer) { //check if layer exists
            res = i; //if exists, return index
        }
    }
    return res;
}

function ol3_layerUp(ol3_curLayer) {
    var e = ol3_getLayerIndex(ol3_curLayer);
    if (e != false && e + 1 < ol3_map.getLayers().getLength()) {
        var f = ol3_map.getLayers().getArray()[e + 1];
        ol3_map.getLayers().getArray()[e + 1] = ol3_curLayer;
        ol3_map.getLayers().getArray()[e] = f;
        ol3_map.updateSize();
    }
}

function ol3_layerDown(ol3_curLayer) {
    var e = ol3_getLayerIndex(ol3_curLayer);
    if (e != false && e != 0) {
        var f = ol3_map.getLayers().getArray()[e - 1];
        ol3_map.getLayers().getArray()[e - 1] = ol3_curLayer;
        ol3_map.getLayers().getArray()[e] = f;
        ol3_map.updateSize();
    }
}

function ol3_layerTop(ol3_curLayer) {
    var e = ol3_getLayerIndex(ol3_curLayer);
    if (e != false) {
        ol3_map.getLayers().getArray().splice(e,1);
        ol3_map.getLayers().getArray().push(ol3_curLayer);
        ol3_map.updateSize();
    }
}

function ol3_layerBottom(ol3_curLayer) {
    var e = ol3_getLayerIndex(ol3_curLayer);
    if (e != false) {
        ol3_map.getLayers().getArray().splice(e,1);
        ol3_map.getLayers().getArray().splice(0,0,ol3_curLayer);
        ol3_map.updateSize();
    }
}
```

Note that in the OpenLayers 3 part of the example code, I have used two methods to rearrange layers. For the layer up and layer down functions, I simply swapped the index of the two corresponding layers. In the top and bottom functions, I have used the `splice()` and `push()` methods. The `ol3_getLayerIndex()` function is similar to the previous `ol3_checkLayer()` function, only it returns the index of the matching layer instead of true.

#### Setting opacity

I’m not entirely sure if this simple function deserves an entire subsection, but it is a major consideration in a Web GIS application, to provide an opacity control. Web GIS frameworks based on mapping GUIs, like GeoExt provide controls for this. However, in OpenLayers, there aren’t such controls, so you have to write it manually. There are plenty of ways to implement this control in your code, like registering an event, or just creating a slider with an `onchange` attribute, so I just show how to change opacity on a layer. Note that opacity values are between 0 and 1.

OpenLayers 2:

``` javascript
function ol2_changeOpacity(ol2_curLayer, value) {
    if (ol2_map.getLayersByName(ol2_curLayer.name).length === 1) {
        ol2_curLayer.setOpacity(value);
    }
}
```

OpenLayers 3:

``` javascript
function ol3_changeOpacity(ol3_curLayer, value) {
    if (ol3_getLayerIndex(ol3_curLayer) != false) {
        ol3_curLayer.setOpacity(value);
    }
}
```

#### OpenLayers 3 specific functions

OpenLayers 3 has some major lack in layer management in this early time of development. It doesn’t provide a layer switcher control, so you have to change layer visibility with a function. The `value` property must be boolean.

``` javascript
function ol3_changeVisible(ol3_curlayer, value) {
    ol3_curLayer.setVisible(value);
}
```

As I mentioned in the previous post, OpenLayers 3 provides a new layer class, `ol.layer.Group`. You can group and ungroup any stack of layers dynamically. For this, you only have to provide an `ol.Collection` object with the layers in it. To empty a layer group, just provide an empty collection object. In this case the layers parameter must be an array, and it have to contain layer objects.

``` javascript
function ol3_groupLayers(ol3_group, layers) {
    if (layers.length > 0) { //Check if the array have members
        ol3_group.setLayers(new ol.Collection(layers));
        ol3_map.addLayer(ol3_group);
    }
}

function ol3_ungroupLayers(ol3_group) {
    if (ol3_group.getLayers().getLength() > 0) { //Check if the group layer contains layers
        ol3_map.removeLayer(ol3_group); //Remove the layer group from the map
        ol3_group.setLayers(new ol.Collection()); //Empty the layer group
    }
}
```

<script src="{{ site.baseurl }}/assets/js/OpenLayers/OpenLayers.js" type="text/javascript"></script>

<script src="{{ site.baseurl }}/assets/js/ol-v3.0.0.js" type="text/javascript"></script>

<script src="{{ site.baseurl }}/assets/js/openlayers-layer-management.js" type="text/javascript"></script>

