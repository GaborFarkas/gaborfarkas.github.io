---
layout: post
title: "WebGIS application with OpenLayers 2 - Part 1: Layer tree"
date: 2015-01-25
description: "Creating a whole WebGIS application is a time-consuming task, which can be eased with toolkits, like GeoExt or Heron MC. However, using such a toolkit, has some disadvantages. For example, you can't keep step with the evolution of the mapping libraries, as the toolkits can't develop so rapidly. If you want to use the most recent features, and don't want to wait for the developers of your favourite toolkit to come up with a new version, you have to build your application just on the library. From another point of view, learning how a web mapping library works can be rewarding. If you build your WebGIS application, you can easily come across a situation, where you have to customize it in a way, that hasn't been implemented in your toolkit. At this point, you will need to learn how to use the native library anyway (and consider yourself lucky, if you don't work with a deadline). To avoid such a case, it is considerable to get acquainted with the library in time and use toolkits later. In the next few posts, I will demonstrate how to build a basic WebGIS application with only HTML, JavaScript, and OpenLayers 2. I will try to summarize the content of the last few posts, and show how to handle browser events with the library."
comments: true
---
<style>
tbody {
    vertical-align: top;
}
#layerControl_wrap img {
    padding: 0px;
}
#layerControl_wrap {
    width: 200px;
    max-height: 500px;
    overflow: auto;
    padding: 0px;
}
#layerControl_wrap p {
    width: 100px;
    word-break: break-all;
    display: inline-table;
}
#layerControl_wrap input {
    width: 20px;
    height: 20px;
    margin: 0px 0px 0px 4px;
}
#layerControl_wrap input[type=button] {
    position: relative;
    bottom: 3px;
}
.olControlPanel .olButton {
    top: 5px;
    position: relative;
    left: 100px;
    background-repeat: no-repeat;
    background-color: #EBEBE6;
    margin: 0 0 5px 5px;
    width: 24px;
    height: 22px;
    cursor: pointer;
    float: left;
    border-radius: 5px 5px 5px 5px;
    border: 1px grey solid;
}
.olControlPanel .olControlZoomToMaxExtentItemInactive { 
    background-image: url("http://openlayers.org/api/img/zoom-world-mini.png");
    background-size: contain;
}
.olControlPanel .olControlNavigationHistory {
    background-image: url("http://openlayers.org/api/theme/default/img/navigation_history.png");
}
svg {
        max-height: initial;
    }
</style>
Creating a whole WebGIS application is a time-consuming task, which can be eased with toolkits, like GeoExt or Heron MC. However, using such a toolkit, has some disadvantages. For example, you can’t keep step with the evolution of the mapping libraries, as the toolkits can’t develop so rapidly. If you want to use the most recent features, and don’t want to wait for the developers of your favourite toolkit to come up with a new version, you have to build your application just on the library.

From another point of view, learning how a web mapping library works can be rewarding. If you build your WebGIS application, you can easily come across a situation, where you have to customize it in a way, that hasn’t been implemented in your toolkit. At this point, you will need to learn how to use the native library anyway (and consider yourself lucky, if you don’t work with a deadline). To avoid such a case, it is considerable to get acquainted with the library in time and use toolkits later. In the next few posts, I will demonstrate how to build a basic WebGIS application with only HTML, JavaScript, and OpenLayers 2. I will try to summarize the content of the last few posts, and show how to handle browser events with the library.

The goal of this post is to show how to build a basic WebGIS application with layer management, and editing features. The application has the following features:

- Layer handling, showing them in a layer tree.
- Basic layer management (changing layer order for now).
- Editing vector layers.
- Basic map controls (zooming to maximum extent, navigation history).

### The layer tree

The first task is to create the container of the map and the layer tree. The layer tree is a simple HTML div element, nothing fancy, like [GeoMOOSE](https://demo.geomoose.org/master/desktop/). To achieve this task, I created a table with two columns. The first one contains the layer tree, while the second one is for the map. The layer tree contains a wrapper div to store the metadata of the layer tree, like the title. In the wrapper, there is a `div`, called `layerControl`, which will be populated with the actual layers as divs. The code for this is the following:

``` html
<table style="width:950px; height:500px;">
    <tr>
        <td>
            <div id="layerControl_wrap">
                <p>Layers:</p>
                <br/>
                <p>Name</p>
                <img src="../../OpenLayers-2.13.1/theme/default/img/draw_point_on.png" style="width:20px; height: 20px;" title="Edit layer">
                <img src="../../OpenLayers-2.13.1/theme/default/img/overview_replacement.gif" style="width:20px; height: 20px;" title="Select layer">
                <div style="width: 20px; height:20px; border: 1px solid black; text-align: center; display: inline-block; position:relative; top: 2px;" title="Raise layer">⇧</div>
                <div style="width: 20px; height:20px; border: 1px solid black; text-align: center; display: inline-block; position:relative; top: 2px;" title="Lower layer">⇩</div>
                <br/>
                <div id="layerControl"></div>
            </div>
        </td>
        <td>
            <div id="map" style="width:700px; height:500px;"></div>
        </td>
    </tr>
</table>
```

The schema for the layer tree contains a title, called “Layers:”. Then it has the legend for every column, precisely “Name”, edit checkbox, select checkbox, raise layer button, and lower layer button. This layout resembles a table, but it is achieved with divs and CSS.

The next step, is to create a function which will populate the layer tree with the layers. The name of the function is `drawRegistry()`, and it will create a div for every layer when it is added. The function is associated with an event, so it gets an input parameter. This input parameter is an event object, which contains, inter alia, the layer object the function got called upon. This way, we can soft-code the function, and reuse in any environment.

``` javascript
function drawRegistry(evt) {
    //Look for the displayInLayerSwitcher property, thus handler layers 
    //won't appear in the layer tree.
    if (evt.layer.getOptions().displayInLayerSwitcher != false) {
        //Create the HTML element of the layer
        var layerControl = document.getElementById("layerControl");
        var layerDiv = document.createElement('div');
        var layerP = document.createElement('p');
        layerDiv.id = evt.layer.id;
        layerDiv.className = 'layerDiv';
        layerP.innerHTML = evt.layer.name.toString() + ' ';
        layerDiv.appendChild(layerP);
        var editCheck = document.createElement('input');
        editCheck.type = 'checkbox';
        editCheck.name = 'layerEdit_noselect';
        editCheck.disabled = true;
        var selectCheck = document.createElement('input');
        selectCheck.type = 'checkbox';
        selectCheck.name = 'layerDelete';
        var upButton = document.createElement('input');
        upButton.type = 'button';
        var downButton = document.createElement('input');
        downButton.type = 'button';
        //If it is a vector layer, then editing should be available.
        if (evt.layer.id.indexOf('Vector') > -1) {
            //Create an edit toolbox for the layer, which has the ID of the layer as a property, so it
            //can be looked up later.
            if (evt.layer.map.getControlsBy('layerId', evt.layer.id)[0] === undefined){
                var editControl = new OpenLayers.Control.EditingToolbar(evt.layer, {
                    autoActivate: false, 
                    citeCompliant: true, 
                    layerId: evt.layer.id 
                });
                evt.layer.map.addControl(editControl);
            } else {
                var editControl = evt.layer.map.getControlsBy('layerId', evt.layer.id)[0];
            }
            //Only one layer can be edited at a time, so block every other layer's edit option if one is 
            //checked. Activate or deactivate the edit control correspondingly.
            editCheck.onchange = function(){
                if (this.checked === true) {
                    editControl.activate();
                    var otherBoxes = document.getElementsByName('layerEdit');
                    for (var i=0;i<otherBoxes.length;i++) {
                        if (otherBoxes[i] != this) {
                            otherBoxes[i].disabled = true;
                        }
                    }
                } else {
                    editControl.deactivate();
                    var allBoxes = document.getElementsByName('layerEdit');
                    for (var i=0;i<allBoxes.length;i++) {
                        allBoxes[i].disabled = false;
                    }
                    
                }
            };
            editCheck.name = 'layerEdit';
            editCheck.disabled = false;
        }
        upButton.onclick = function(){
            evt.layer.map.raiseLayer(evt.layer, 1);
        };
        downButton.onclick = function(){
            evt.layer.map.raiseLayer(evt.layer, -1);
        };
        layerDiv.appendChild(editCheck);
        layerDiv.appendChild(selectCheck);
        layerDiv.appendChild(upButton);
        layerDiv.appendChild(downButton);
        layerControl.appendChild(layerDiv);
        //Store the associated DOM element in the layer object. Be sure not to overwrite the original
        //layer.div property.
        evt.layer.layerDiv = layerDiv;
    }
}
```

In OpenLayers 2, when we draw on the map, a little blue point indicates the point of the cursor. This helping function has been implemented as a handler layer, and gets created every time an edit session has started. For this, the first thing our function has to check, is if a newly created layer is a handler layer or not. Luckily, there is a `displayInLayerSwitcher` boolean attribute for every layer, and the default value for a handler layer is false.

Next, we should separate the handling of the vector layers from any other layer type. Vector layers can be edited, so they need a checkable edit checkbox. They also need an editing control, for which there is a very handy control in OpenLayers 2, called `OpenLayers.Control.EditingToolbar`. It is a toolbar with basic controls for creating features, however it can be extended. For now, the plain control is enough. The toolbar is created only if there isn’t one already for the layer. This can be checked with the custom `layerId` property, which is assigned to the control on the construction. The control gets assigned to a variable, so it can be called later in the function.

Now that we have the edit control assigned to the layer, we have to take care of the initialization of the edit session. The edit checkbox is the input of the session, so we will create an event, which will listen for the change in the checkbox’s status. We can only edit one layer at a time, so if an edit session is started, we disable the checkbox for every other layer. Note that we call the `getElementsByName()` method to get the edit checkboxes of the other vector layers. This way the raster layers remain uneditable, as their DOM elements are created with the name `editLayer_noselect`. When an edit session ends, we disable the corresponding toolbar, so the handler layer gets removed properly. After then, we enable the checkboxes of the vector layers.

Finally, we assign the corresponding functions for the layer order change buttons. These functions are explained in a previous post, OpenLayers layer management. We save the newly created DOM element in the layer object. I created a `layerDiv` property, as there is a `div` property already, which causes the library to fail, if overwritten.

### The map object

The map object is quite simple, there are only a few required options we have to set up. OpenLayers 2 can only work with only one projection, which will be initialized with the object construction. This way, we can assign a maximum extent based on the chosen projection, so the users won’t be able to digitize out of the projection’s bounds. Note that the default behaviour of the library will allow such actions, so we have to make restrictions. We can assign a maximum resolution, which can be used to fit the map to the canvas on zoom level 0. This is optional, however can assist the restriction. When the projection’s bounds fit in the canvas on a zoom level entirely, users will be able to digitize out of bounds despite of the maximum extent. The last options will be the `allOverlays` flag, which will make sure, that the map can be initialized without a WMS layer.

``` javascript
var map = new OpenLayers.Map('map',{
    //The map should have only overlays, so it won't look for global WMS specific properties, such as
    //wrapDateLine.
    allOverlays: true,
    eventListeners: {
        //After adding a layer, create a layer tree registry.
        addlayer: drawRegistry,
        //The edit control should be removed prior to layer removal, so the correct event is the preremovelayer.
        //As the belonging control has the ID of the layer, it can be called with getControlsBy().
        preremovelayer: function(evt) {
            if (evt.layer.getOptions().displayInLayerSwitcher != false) {
                var layerControl = document.getElementById("layerControl");
                var layerTr = document.getElementById(evt.layer.id);
                layerControl.removeChild(layerTr);
                if (evt.layer.id.indexOf('Vector') > -1) {
                    var rmcontrol = evt.layer.map.getControlsBy('layerId', evt.layer.id)[0];
                    rmcontrol.deactivate();
                    //Clean up the toolbar's subcontrols.
                    for (var j in rmcontrol.controls) {
                        evt.layer.map.removeControl(rmcontrol.controls[j]);
                    }
                    evt.layer.map.removeControl(rmcontrol);
                }
            }
        },
        //When the layer order changes, fire an event to redraw the layer tree correctly.
        changelayer: function(evt) {
            if (evt.property === 'order') {
                var layerControl = document.getElementById('layerControl');
                //Clear out the entire layer tree.
                while (layerControl.firstChild) {
                    layerControl.removeChild(layerControl.firstChild);
                }
                //Redraw every layer. Note that in computing, the uppermost element is the last one, 
                //while in GIS, the top layer is the first, so we have to work with reverse ordering.
                for (var j=0;j<evt.object.layers.length;j++) {
                    layerControl.appendChild(evt.object.layers[evt.object.layers.length - 1 - j].layerDiv);
                }
            }
        }
    },
    //Restrict the extent, so digitizing out of the projection's bounds is impossible.
    restrictedExtent: [-180, -90, 180, 90],
    maxResolution: 0.35
});
```

The object only differs from the previous one in the `eventListeners` section. It is designed to define events connected to the map object on construction. We only add the most important events for our cause. When a layer is added, the `drawRegistry` function will be invoked with the layer object. Prior to layer deletion, the `preremovelayer` event will take care of the layer’s controls and layer tree element. Finally, when the order of the layer changes, the `changelayer` event will fire up, and redraw the entire registry. Note that, to clear out the layer tree easily, you need a wrapper div, which contains the layer tree elements.

### Initializing the map

For putting the finishing touches to the application, we add a custom control panel and a default vector layer to the map. To successfully initialize the map object, a layer is needed. To achieve this, we make an empty layer object and add it to the map.

``` javascript
//Create a new panel for the universal controls, like navigation history. Define the element type, which
//should contain the control. It can be anything as it will get an .olButton class, which will make it clickable.
var panel = new OpenLayers.Control.Panel({
    createControlMarkup: function(control) {
        return document.createElement('div');
    }
});

//Create a navigation history control. Note that the main control has to be added to the map object, while
//its two subcontrols can be added to the control panel.
var nav = new OpenLayers.Control.NavigationHistory({
});

panel.addControls([
    new OpenLayers.Control.ZoomToMaxExtent(),
    nav.previous,
    nav.next
]);

map.addControls([nav, panel]);
//Create a layer to initialize the map.
var vect = new OpenLayers.Layer.Vector('VectorLayer 1',{
    maxExtent: [-180, -90, 180, 90],
    projection: "EPSG:4326"
});
map.addLayer(vect);
map.zoomToMaxExtent();
```

The panel is a container for varying controls. We only define its `createControlMarkup` parameter, as it won’t know what kind of element it should make for the control buttons by default. We can style the buttons with CSS, as the class name of the controls are constant, and they will be children of the control panel element.

``` html
tbody {
    vertical-align: top;
}
#layerControl_wrap {
    width: 250px;
    max-height: 500px;
    overflow: auto;
}
#layerControl_wrap p {
    width: 100px;
    word-break: break-all;
    display: inline-table;
}
#layerControl_wrap input {
    width: 20px;
    height: 20px;
    margin-left: 4px;
}
#layerControl_wrap input[type=button] {
    position: relative;
    bottom: 3px;
}
.olControlPanel .olButton {
    top: 5px;
    position: relative;
    left: 100px;
    background-repeat: no-repeat;
    background-color: #EBEBE6;
    margin: 0 0 5px 5px;
    width: 24px;
    height: 22px;
    cursor: pointer;
    float: left;
    border-radius: 5px 5px 5px 5px;
    border: 1px grey solid;
}
.olControlPanel .olControlZoomToMaxExtentItemInactive { 
    background-image: url("../../OpenLayers-2.13.1/img/zoom-world-mini.png");
    background-size: contain;
}
.olControlPanel .olControlNavigationHistory {
    background-image: url("../../OpenLayers-2.13.1/theme/default/img/navigation_history.png");
}
```

Feel free to test the first part of the application. The `map` object is global, called map. You can add layers in the console with the `map.addLayer()` function, after you have created the layer object. Please be sure, that the layer is in a WGS 84 projection (EPSG:4326). A code snippet for adding further layers is the following:

``` javascript
var raster = new OpenLayers.Layer.WMS(
    'GlobImagery',
    'http://demo.opengeo.org/geoserver/wms',
    {
        layers: 'bluemarble'
});
map.addLayer(raster);

var vector = new OpenLayers.Layer.Vector('Someothervectorlayer_withapointlesslylongname',{
    maxExtent: [-180, -90, 180, 90],
    projection: "EPSG:4326"
});
map.addLayer(vector);
```

<table style="height: 500px; table-layout: fixed; width: 720px;">
<tbody style="vertical-align: top;">
<tr>
        <td style="width: 200px;"><div id="layerControl_wrap" style="max-height: 500px; overflow: auto; width: 220px;">
Layers:<br />
<br />
<br />
<p>Name</p>
<img src="{{ site.baseurl }}/assets/js/OpenLayers/theme/default/img/draw_point_on.png" style="height: 20px; width: 20px;" title="Edit layer" />
                <img src="{{ site.baseurl }}/assets/js/OpenLayers/theme/default/img/overview_replacement.gif" style="height: 20px; width: 20px;" title="Select layer" />
<div style="border: 1px solid black; display: inline-block; height: 20px; position: relative; text-align: center; top: -4px; width: 20px;" title="Raise layer">
⇧</div>
<div style="border: 1px solid black; display: inline-block; height: 20px; position: relative; text-align: center; top: -4px; width: 20px;" title="Lower layer">
⇩</div>
<br />
<div id="layerControl">
</div>
</div>
</td>
        <td style="width: 500px;"><div id="map" style="height: 500px; width: 500px;">
</div>
</td>
    </tr>
</tbody>
</table>

<script src="{{ site.baseurl }}/assets/js/OpenLayers/OpenLayers.js" type="text/javascript"></script>
<script src="{{ site.baseurl }}/assets/js/openlayers-webgis-1.js" type="text/javascript"></script>


