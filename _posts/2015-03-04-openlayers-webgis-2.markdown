---
layout: post
title: "WebGIS application with OpenLayers 2 - Part 2: Map controls"
date: 2015-03-04
description: "So far we have created the basic container for a web mapping application GUI. The key aspect in a good application is user experience. This mostly depends on how easily a user can utilize the application, and how smoothly can accomplish a workflow. For a decent user experience, one should think as a user when designing the appearance and mechanics of the application. To make things go right in a WebGIS application powered by OpenLayers 2, the library offers a wide variety of controls. As developers, the responsibility is on us, if we get the most out of it, or not. This is the part where OpenLayers 2 shows its advantages even against its successor. The following post will demonstrate how we can extend our application with minimal programming, and mostly controls offered by OpenLayers 2."
comments: true
---
<style type="text/css">
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
    .olControlPanel .olControlMeasureItemActive {
        background-image: url("http://openlayers.org/api/img/measuring-stick-on.png");
        background-size: contain;
        background-position: 1px 0px;
    }
    .olControlPanel .olControlMeasureItemInactive {
        background-image: url("http://openlayers.org/api/img/measuring-stick-off.png");
        background-size: contain;
        background-position: 1px 0px;
    }
    .olControlPanel .olControlGraticuleItemActive {
        background-image: url("http://seadas.gsfc.nasa.gov/help/visat/images/icons/GraticuleOverlay24.gif");
        background-size: contain;
        filter: hue-rotate(180deg);
        -webkit-filter: hue-rotate(180deg);
    }
    .olControlPanel .olControlGraticuleItemInactive {
        background-image: url("http://seadas.gsfc.nasa.gov/help/visat/images/icons/GraticuleOverlay24.gif");
        background-size: contain;
    }
    .olControlEditingToolbar .olControlModifyFeatureItemActive { 
        background-image: url("http://junichi11.com/wp-content/uploads/2011/01/tool-node-editor.png");
        background-size: contain;
        filter: hue-rotate(180deg);
        -webkit-filter: hue-rotate(180deg);
    }
    .olControlEditingToolbar .olControlModifyFeatureItemInactive { 
        background-image: url("http://junichi11.com/wp-content/uploads/2011/01/tool-node-editor.png");
        background-size: contain;
    }
    .olControlEditingToolbar .olControlDragFeatureItemActive { 
        background-image: url("http://openlayers.org/api/theme/default/img/move_feature_on.png");
    }
    .olControlEditingToolbar .olControlDragFeatureItemInactive { 
        background-image: url("http://openlayers.org/api/theme/default/img/move_feature_off.png");
    }
    .olControlEditingToolbar .olControlDeleteFeatureItemActive { 
        background-image: url("http://openlayers.org/api/theme/default/img/remove_point_on.png");
    }
    .olControlEditingToolbar .olControlDeleteFeatureItemInactive { 
        background-image: url("http://openlayers.org/api/theme/default/img/remove_point_off.png");
    }
    .olControlEditingToolbar .olControlSnappingItemActive { 
        background-image: url("http://tavmjong.free.fr/INKSCAPE/MANUAL/images/ICONS_PNG/status/snap.png");
        background-size: contain;
        filter: hue-rotate(180deg);
        -webkit-filter: hue-rotate(180deg);
    }
    .olControlEditingToolbar .olControlSnappingItemInactive { 
        background-image: url("http://tavmjong.free.fr/INKSCAPE/MANUAL/images/ICONS_PNG/status/snap.png");
        background-size: contain;
    }
    .menuToggle {
        width: 100px;
        float: left;
        cursor: pointer;
        -moz-appearance: button;
        -moz-user-select: none;
        -webkit-appearance: button;
        -webkit-user-select: none;
    }
    .menuContent {
        list-style: none;
        position: absolute;
        width: inherit;
    }
    .menuContent div {
        border: 1px solid black;
        cursor: default;
        background-color: #FFFFFF;
        position: relative;
        z-index: 9999;
        border-top-width: 0px;
    }
    .menuContent div:hover {
        background-color: #CEE3F6;
    }
svg {
        max-height: initial;
    }
</style>
So far we have created the basic container for a web mapping application GUI. The key aspect in a good application is user experience. This mostly depends on how easily a user can utilize the application, and how smoothly can accomplish a workflow. For a decent user experience, one should think as a user when designing the appearance and mechanics of the application. To make things go right in a WebGIS application powered by OpenLayers 2, the library offers a wide variety of controls. As developers, the responsibility is on us, if we get the most out of it, or not. This is the part where OpenLayers 2 shows its advantages even against its successor. The following post will demonstrate how we can extend our application with minimal programming, and mostly controls offered by OpenLayers 2.

### The HTML and CSS part

The basic appearance of the application is defined in the OpenLayers 2 library, however, if we want to extend it with custom items, it has to be done in HTML and CSS. One can work with any of the more or less popular frameworks, but I used pure HTML and CSS for the sake of clarity. In HTML there are two new mechanisms: a menu bar and input forms. The menu bar consists of simple div elements, while the input forms are form elements wrapped in divs. In the CSS part, I defined some styles for these elements, plus added some icons for the new control buttons. The stylesheet looks like the following:

``` html
.olControlPanel .olControlMeasureItemInactive {
    background-image: url("../../OpenLayers-2.13.1/img/measuring-stick-off.png");
    background-size: contain;
    background-position: 1px 0px;
}
.olControlPanel .olControlGraticuleItemActive {
    background-image: url("http://seadas.gsfc.nasa.gov/help/visat/images/icons/GraticuleOverlay24.gif");
    background-size: contain;
    filter: hue-rotate(180deg);
    -webkit-filter: hue-rotate(180deg);
}
.olControlPanel .olControlGraticuleItemInactive {
    background-image: url("http://seadas.gsfc.nasa.gov/help/visat/images/icons/GraticuleOverlay24.gif");
    background-size: contain;
}
.olControlEditingToolbar .olControlModifyFeatureItemActive { 
    background-image: url("http://junichi11.com/wp-content/uploads/2011/01/tool-node-editor.png");
    background-size: contain;
    filter: hue-rotate(180deg);
    -webkit-filter: hue-rotate(180deg);
}
.olControlEditingToolbar .olControlModifyFeatureItemInactive { 
    background-image: url("http://junichi11.com/wp-content/uploads/2011/01/tool-node-editor.png");
    background-size: contain;
}
.olControlEditingToolbar .olControlDragFeatureItemActive { 
    background-image: url("../../OpenLayers-2.13.1/theme/default/img/move_feature_on.png");
}
.olControlEditingToolbar .olControlDragFeatureItemInactive { 
    background-image: url("../../OpenLayers-2.13.1/theme/default/img/move_feature_off.png");
}
.olControlEditingToolbar .olControlDeleteFeatureItemActive { 
    background-image: url("../../OpenLayers-2.13.1/theme/default/img/remove_point_on.png");
}
.olControlEditingToolbar .olControlDeleteFeatureItemInactive { 
    background-image: url("../../OpenLayers-2.13.1/theme/default/img/remove_point_off.png");
}
.olControlEditingToolbar .olControlSnappingItemActive { 
    background-image: url("http://tavmjong.free.fr/INKSCAPE/MANUAL/images/ICONS_PNG/status/snap.png");
    background-size: contain;
    filter: hue-rotate(180deg);
    -webkit-filter: hue-rotate(180deg);
}
.olControlEditingToolbar .olControlSnappingItemInactive { 
    background-image: url("http://tavmjong.free.fr/INKSCAPE/MANUAL/images/ICONS_PNG/status/snap.png");
    background-size: contain;
}
.menuToggle {
    width: 100px;
    float: left;
    cursor: pointer;
    -moz-appearance: button;
    -moz-user-select: none;
    -webkit-appearance: button;
    -webkit-user-select: none;
}
.menuContent {
    list-style: none;
    position: absolute;
    width: inherit;
}
.menuContent div {
    border: 1px solid black;
    cursor: default;
    background-color: #FFFFFF;
    position: relative;
    z-index: 9999;
    border-top-width: 0px;
}
.menuContent div:hover {
    background-color: #CEE3F6;
}
```

As you can see, the styles of the controls buttons are nested into the appropriate container styles. Without this step, the buttons don’t get rendered correctly. Also, I used some experimental attributes, like `filter` and `appearance`. These experimental attributes have to be defined for every browser engine differently. The `-moz` and `-webkit` prefixes are the engine specific definitions, and they represent the Gecko (Mozilla products), and the WebKit/Blink (used by Chrome, Opera, and Safari) engines.

The HTML part of my code looks like this:

``` html
<div id="menu_new" class="menuToggle"> New
    <div id="menu_new_content" class="menuContent" style="display: none;">
        <div data-dialog="new_wms" onclick="openDialog(this)">WMS Layer</div>
        <div data-dialog="new_wfs" onclick="openDialog(this)">WFS Layer</div>
        <div data-dialog="new_vector" onclick="openDialog(this)">Vector Layer</div>
    </div>
</div>

<form id="new_wms" style="display:none;">
    <p>New WMS layer</p>
    <table>
        <tr>
            <td title="URL of the WMS server.">Server URL:</td>
            <td><input name="server" type="text"></td>
            <td><input type="button" value="Check for layers" onclick="checkWmsLayer(this.form)"></td>
        </tr>
        <tr>
            <td title="Name of the layer on the WMS server.">Layer name:</td>
            <td><input name="layer" type="text"><select name="layerSel" style="display: none; max-width: 150px;"></select></td>
        </tr>
        <tr>
            <td title="Display name in OpenLayers.">Display name:</td>
            <td><input name="lyrname" type="text"></td>
        </tr>
        <tr>
            <td title="Layer transparency.">Transparency:</td>
            <td><input name="transp" type="checkbox" checked="true"></td>
        </tr>
        <tr>
            <td><br/></td>
        </tr>
        <tr>
            <td><input type="button" value="Create layer" onclick="addWmsLayer(this.form)"></td>
        </tr>
    </table>
</form>
```

The menu items are opened and closed with JavaScript events. When a member is clicked, the appropriate dialogue comes visible, which is stored in the `data-dialog` attribute. When a form gets submitted, a function gets the entire form, and processes the input parameters. These functions will be described later. For now, these are the events and functions managing the menu:

``` javascript
function openDialog(e) {
    collapseMenu();
    closeDialog();
    document.getElementById(e.getAttribute('data-dialog')).style.display = 'initial';
}

function closeDialog() {
    document.getElementById('new_wms').style.display = 'none';
    document.getElementById('new_wfs').style.display = 'none';
    document.getElementById('new_vector').style.display = 'none';
    document.getElementById('open_image').style.display = 'none';
    document.getElementById('open_vector').style.display = 'none';
}

function collapseMenu() {
    document.getElementById('menu_new_content').style.display = 'none';
    document.getElementById('menu_open_content').style.display = 'none';
}

function expandMenu(evt) {
    evt.stopPropagation();
    if (evt.target.id) {
        var menuContent = evt.target.children[0];
        if (menuContent.style.display === 'none') {
            menuContent.style.display = 'block';
            for (var i=0;i<evt.target.parentNode.children.length;i++) {
                if (evt.target.parentNode.children[i] !== evt.target) {
                    evt.target.parentNode.children[i].children[0].style.display = 'none';
                }
            }
        } else {
            menuContent.style.display = 'none';
        }
    }
}

document.getElementById('menu_new').addEventListener('click', expandMenu);
document.getElementById('menu_open').addEventListener('click', expandMenu);

document.addEventListener('click', collapseMenu, true);
```

In a nutshell, the `openDialog` function makes the representative form of the clicked menu item visible. It also calls the `closeDialog` function, which hides all of the forms, so only one form can be visible at a time. The `expandMenu` and `collapseMenu` functions are doing the same on the menu bar, although `expandMenu` uses a different, soft-coded method to hide the rest of the menus.

Note: there is also a notification and a coordinates bar under the map. The notification bar’s `id` is `notifications`. It will be called later, to provide feedback to the user.

### Initial modifications

In the first part of the series, we defined a toolbar for vector editing controls with the `EditingToolbar` control. We recreated this control for every editable vector layer separately. This method works just fine for 1-2 vector layers, however, the more editable layers are there, the more overhead there will be. To lower redundancy, in this part, there is only one toolbar, which is forced to change layer, once the target layer of the edit session is changed. For this, we have to change the `drawRegistry` function, and extend the `EditingToolbar` with a `setLayer` function.

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
        if (/Vector/g.test(evt.layer.id) === true) {
            //Only one layer can be edited at a time, so block every other layer's edit option if one is 
            //checked. Activate or deactivate the edit control correspondingly.
            if (evt.layer.featType) {
                editCheck.onchange = function(){
                    if (this.checked === true) {
                        var otherBoxes = document.getElementsByName('layerEdit');
                        for (var i=0;i<otherBoxes.length;i++) {
                            if (otherBoxes[i] != this) {
                                otherBoxes[i].disabled = true;
                            }
                        }
                        var editingToolbar = evt.layer.map.getControlsByClass('OpenLayers.Control.EditingToolbar')[0];
                        editingToolbar.setLayer(evt.layer);
                        editingToolbar.activate();
                    } else {
                        var allBoxes = document.getElementsByName('layerEdit');
                        for (var i=0;i<allBoxes.length;i++) {
                            allBoxes[i].disabled = false;
                        }
                        var editingToolbar = evt.layer.map.getControlsByClass('OpenLayers.Control.EditingToolbar')[0];
                        editingToolbar.deactivate();
                    }
                };
                editCheck.name = 'layerEdit';
                editCheck.disabled = false;
            }
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
        //Insert the new layer on the top of the stack, as it will be added on the top in OpenLayers.
        if (layerControl.firstChild) {
            layerControl.insertBefore(layerDiv, layerControl.firstChild);
        } else {
            layerControl.appendChild(layerDiv);
        }
        //Store the associated DOM element in the layer object. Be sure not to overwrite the original
        //layer.div property.
        evt.layer.layerDiv = layerDiv;
    }
}

//Extend the EditingToolbar with a setLayer method which will sort out the corresponding draw control with
//the input layer's featType property, if it has one.
OpenLayers.Control.EditingToolbar.prototype.setLayer = function(layer) {
    if (layer.featType) {
        //Store the disabled controls in an object property, so iterating through the map's controls won't
        //be needed.
        this.disabledControls = this.disabledControls || [];
        for (var i=0;i<this.controls.length;i++) {
            //Associate controls with a layer property with the input layer. Controls in the disabled array
            //won't be associated, therefore this has to be repeated prior to re-enabling the draw control.
            //Also check for handlers, which may have a layer property.
            if (this.controls[i].layer) {
                this.controls[i].layer = layer;
                try {
                    this.controls[i].handler.layer = layer;
                } catch(err) {
                    try {
                        this.controls[i].handlers.feature.layer = layer;
                    } catch(err) {
                        try{
                            this.controls[i].targets[0].layer = layer;
                        } catch(err){}
                    }
                }
            }
            //Disable the draw controls.
            if (this.controls[i].CLASS_NAME === 'OpenLayers.Control.DrawFeature') {
                this.disabledControls.push(this.controls[i]);
                this.controls.splice(i,1);
                i--;
            }
        }
        var switchType;
        switch (layer.featType) {
            case 'POINT' :
                switchType = 'olControlDrawFeaturePoint';
                break;
            case 'LINE' :
                switchType = 'olControlDrawFeaturePath';
                break;
            case 'POLYGON' :
                switchType = 'olControlDrawFeaturePolygon';
                break;
            case 'COLLECTION' :
                switchType = 'olControlDrawFeature';
                break;
        }
        for (var i=0;i<this.disabledControls.length;i++) {
            //Enable only the corresponding control.
            var regular = new RegExp(switchType);
            if (regular.test(this.disabledControls[i].displayClass) === true) {
                this.disabledControls[i].layer = layer;
                this.controls.push(this.disabledControls[i]);
                this.disabledControls.splice(i,1);
                i--;
            }
        }
        //Redraw the toolbar. Note that the redraw method is inherited from OpenLayers.Control.Panel.
        this.redraw();
    }
}
```

The modifications in the `drawRegistry` function are unequivocal. On activation, the function gets the only `EditingToolbar` control in the map, it calls its `setLayer` function when activated (with a layer object provided as an argument), then activates the control. On deactivation, it just simply deactivates the control.

The `setLayer` function is just a bit more complicated. As it is an extension for an existing control, we have to add the function to the control’s `prototype` object. The concept behind it, is that we disable every drawing controls on call, then only enable the appropriate ones. We also change the target layer for every enabled editing controls. The disabled controls are stored in an array, which is a property of the control. The `layer` property of the controls is in the `control.layer` property, however there can be a reference in `control.handler.layer`, `control.handlers.feature.layer`, or `control.targets[i].layer`, but only in one. This way the association can be wrapped in a series of try-catch clauses. To enable the corresponding controls, I used a regular expression based on the class name of the control. The regular expression is a search pattern, which can be used to test a string, if the expression’s content can be found in it.

### Creating the controls

The map controls are consisting of three main groups of elements, the layer manipulation controls, the layer editing controls, and the layer independent controls. Most of the latter two are also panel controls, which are in the map view.

#### Layer manipulation controls

Under layer manipulation, this part of the application means adding and removing layers. It can also fetch WMS capabilities from a CORS enabled server, just to show how to do that. There are dialogues for making connection to a WMS or WFS (only CORS enabled) server, adding an image overlay with an URL, or from your hard drive, and creating new or opening vector data. They have two common features: they require a form as an input, and they return an `OpenLayers.Layer` object as a result.

``` javascript
//Add a WMS layer with user specified parameters.
function addWmsLayer(form) {
    var server = form.server.value;
    if (server.substring(0,7) !== 'http://') {
        server = 'http://' + server;
    }
    var layer = form.layer.value || form.layerSel.value;
    var name = form.lyrname.value || 'WMS Layer';
    var transp = form.transp.checked;
    //Check if the user has provided a server and a layer parameter. If yes, create the layer.
    if (server !== '' && layer !== '') {
        var wmsLayer = new OpenLayers.Layer.WMS(name,
        server,
        {
            layers: layer,
            transparent: transp
        });
        closeDialog();
        map.addLayer(wmsLayer);
        document.getElementById('notifications').innerHTML = 'WMS layer added to map.'
    }
}

function addWfsLayer(form) {
    var server = form.server.value;
    if (server.substring(0,7) !== 'http://') {
        server = 'http://' + server;
    }
    var ftype = form.lyrtype.value;
    var ns = form.ns.value;
    var name = form.lyrname.value || 'WFS Layer';
    if (server !== '' && ftype !== '') {
        var wfsLayer = new OpenLayers.Layer.Vector(name, {
            strategies: [new OpenLayers.Strategy.BBOX()],
            protocol: new OpenLayers.Protocol.WFS({
                url: server,
                featureType: ftype,
                featureNS: ns
            })
        });
        closeDialog();
        map.addLayer(wfsLayer);
        document.getElementById('notifications').innerHTML = 'WFS layer added to map.'
    }
}

function addVectorLayer(form) {
    var ftype = form.lyrtype.value;
    var name = form.lyrname.value || 'Vector Layer';
    var vectLayer = new OpenLayers.Layer.Vector(name, {
        featType: ftype
    });
    closeDialog();
    map.addLayer(vectLayer);
    document.getElementById('notifications').innerHTML = 'Vector layer added to map.'
}
```

In the first three functions, there are nothing new. We evaluate the user inputs, correct them, if they need to be corrected, then construct a `layer` object based on them.

``` javascript
function openImageFile(form) {
    var file = form.file.files[0];
    if (typeof file === 'object' && /image/.test(file.type) === true) {
        var fr = new FileReader();
        fr.onload = function(evt) {
            form.dataURLval = evt.target.result;
            form.dataURL = true;
            openImageLayer(form);
        };
        fr.readAsDataURL(file);
    }
}

function openImageLayer(form) {
    var image = form.dataURLval || form.url.value;
    var tempExtent = form.extent.value.split(',');
    var extent = [0,0,0,0];
    var name = form.lyrname.value || 'Image Layer';
    var testImage = document.createElement('img');
    testImage.src = image;
    if (testImage.height === 0 && testImage.width === 0) {
        image = '';
    }
    if (tempExtent.length === 4) {
        for (var i=0;i<tempExtent.length;i++) {
            extent[i] = parseFloat(tempExtent[i]);
        }
    } else {
        var transform = OpenLayers.Projection.transform({x: testImage.width, y: testImage.height}, 'EPSG:3857', map.projection)
        extent = [0,0,transform.x, transform.y];
    }
    if (image !== '') {
        var imageLayer = new OpenLayers.Layer.Image(
            name,
            image,
            new OpenLayers.Bounds(extent[0], extent[1], extent[2], extent[3]),
            new OpenLayers.Size(testImage.width, testImage.height)
        );
        closeDialog();
        if (form.dataURL === true) {
            form.dataURLval = '';
            form.dataURL = false;
        }
        map.addLayer(imageLayer);
        document.getElementById('notifications').innerHTML = 'Image layer added to map.'
    }
}

function openVectorLayer(form) {
    var name = form.lyrname.value || 'Vector Layer';
    var proj = form.proj.value;
    var format = form.format.value;
    var file = form.file.files[0];
    var type = form.lyrtype.value;
    if (typeof file === 'object') {
        var fr = new FileReader();
        fr.onload = function(evt) {
            var text = evt.target.result;
            switch(format) {
                case 'geojson':
                    var ol_format = new OpenLayers.Format.GeoJSON({
                        ignoreExtraDims: true
                    });
                    break;
                case 'kml':
                    var ol_format = new OpenLayers.Format.KML();
                    break;
                case 'osm':
                    var ol_format = new OpenLayers.Format.OSM();
                    break;
                case 'wkt':
                    var ol_format = new OpenLayers.Format.WKT();
                    break;
            }
            var vectLayer = new OpenLayers.Layer.Vector();
            vectLayer.name = name;
            vectLayer.projection = proj;
            vectLayer.featType = type;
            vectLayer.addFeatures(ol_format.read(text));
            closeDialog();
            map.addLayer(vectLayer);
            document.getElementById('notifications').innerHTML = 'Vector layer added to map.'
        };
        fr.readAsText(file);
    }
}
```

Now things start to get interesting. To open files from one’s hard drive, we can use the FileReader API, which can process a file to various formats in an asynchronous manner. In these cases we use text format for vector data, and data URL format for images, as they need to be provided as an URI. As the `FileReader` needs some time to read the provided data, we have to use its asynchronicity to load the data into the application, when it has been fetched. To do so, we assign a function to its `onload` event and place the rest of the code there.

As images can be also loaded from an URL, we place the reading process in another function, which will add the data URL to the input form, and call the layer constructor when finished. Images can be georeferenced manually, but it isn’t required. By default, the application checks for the `width` and `height` properties of the image, handles it as if it was in Web Mercator projection (to avoid exceeding the projection’s extent), then projects it to the current map projection.

Vector data can come in a variety of formats. Currently there aren’t any binary format handlers integrated in web mapping libraries, so we can only use ASCII formats. Every `OpenLayers.Format` object is a parser, which can decode data of its type and convert it into the application’s native vector structure. You can support any vector format which have a parser object. For this example, I chose to support some of the more popular formats: GeoJSON, WKT, OSM, and KML. Note that GeoJSON specification supports Z coordinates, which can be misinterpreted by the parser. To avoid this, it is recommended to set the `ignoreExtraDims` parameter to true.

``` javascript
//Check for layers with a GetCapabilities request. Note that for this task, the server must be same origin,
//it has to be CORS-enabled, or you must use a proxy script.
function checkWmsLayer(form) {
    var server = form.server.value;
    //If the server URL doesn't start with http://, prepend to it. 
    if (/^((http)|(https))(:\/\/)/.test(server) === false) {
        server = 'http://' + server;
    }
    //Create an async request to get and parse the response from the GetCapabilities request.
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (ajax.readyState === 4 && ajax.status === 200) {
            //Parse the response with the OpenLayers WMSCapabilities parser.
            var capabilities = new OpenLayers.Format.WMSCapabilities();
            var layersObj = capabilities.read(ajax.responseText);
            //If the response is valid, create an option with every layer in a select tag.
            if (layersObj.capability) {
                var layerSelect = form.layerSel;
                a = layersObj;
                while (layerSelect.firstChild) {
                    layerSelect.removeChild(layerSelect.firstChild);
                }
                for (var i=0; i<layersObj.capability.layers.length; i++) {
                    //Only include layers which projection are matching the map projection.
                    if (typeof layersObj.capability.layers[i].bbox[map.getProjection()] !== 'undefined') {
                        var layerSelectElem = document.createElement('option');
                        layerSelectElem.value = layersObj.capability.layers[i].name;
                        layerSelectElem.innerHTML = layersObj.capability.layers[i].name;
                        layerSelect.appendChild(layerSelectElem);
                    }
                }
                form.layer.value = '';
                form.layer.style.display = 'none';
                layerSelect.style.display = 'initial';
                document.getElementById('notifications').innerHTML = 'Capabilities read successfully.';
            } else {
                form.layer.style.display = 'initial';
                form.layerSel.style.display = 'none';
                document.getElementById('notifications').innerHTML = 'Capability error.';
            }
        } else {
            form.layer.style.display = 'initial';
            form.layerSel.style.display = 'none';
        }
    }
    ajax.open('GET', server + '?REQUEST=GetCapabilities&SERVICE=WMS');
    ajax.send();
}
```

The twist in getting the capabilities from a server is the `XMLHttpRequest`. It can be used to make asynchronous requests to the server (AJAX). To make a `GetCapabilities` request, we only need to append the request parameters to the server URL, send the request, and bind a function to its `onreadystatechange` event. If the request returns with a status of 200, and a state of 4, it didn’t run into a CORS error, so we can check the result. If it can be parsed with `OpenLayers.Format.WMSCapabilities`, the server responded with an XML which can contain the result of the request, or an error. If we have a valid result, we get the layers, which are available in the map projection (from the `bbox` property). This method can also be used to get the layer extent from the WMS layer.

``` javascript
function deleteLayers() {
    var layers = map.layers;
    for (var i=0, counter=0;i<layers.length;i++) {
        if (layers[i].layerDiv) {
            if (layers[i].layerDiv.children[2].checked === true) {
                map.removeLayer(layers[i]);
                counter++;
                i--;
            }
        }
    } 
    if (counter === 0) {
        document.getElementById('notifications').innerHTML = 'No layers selected to remove.'
    } else {
        document.getElementById('notifications').innerHTML = counter + ' layers removed from map.'
    }
}
```

The layer removing function is also quite simple, we just iterate through the layers and check if it is selected for removing. The checkbox is in a fixed position, so we can use its index number.

#### Layer editing controls

The layer editing controls are used for feature manipulation, and they belong to the editing toolbar. Only one of the new controls needs to be defined, the delete feature.

``` javascript
//Adapted from http://dev.openlayers.org/examples/wfs-protocol-transactions.js
OpenLayers.Control.DeleteFeature = OpenLayers.Class(OpenLayers.Control, {
    initialize: function(layer, options) {
        OpenLayers.Control.prototype.initialize.apply(this, [options]);
        this.layer = layer;
        this.handler = new OpenLayers.Handler.Feature(
            this, layer, {click: this.clickFeature}
        );
    },
    clickFeature: function(feature) {
        // if feature doesn't have a fid, destroy it
        if(feature.fid == undefined) {
            this.layer.destroyFeatures([feature]);
        } else {
            feature.state = OpenLayers.State.DELETE;
            this.layer.events.triggerEvent("afterfeaturemodified", 
                                           {feature: feature});
            feature.renderIntent = "select";
            this.layer.drawFeature(feature);
        }
    },
    setMap: function(map) {
        this.handler.setMap(map);
        OpenLayers.Control.prototype.setMap.apply(this, arguments);
    },
    CLASS_NAME: "OpenLayers.Control.DeleteFeature"
});
```

This is a simple control with a handler, which allows us to select the feature which has to be deleted. It simply modifies the selected feature’s state to `DELETE`, then calls the `afterfeaturemodified` event, which updates the features based on their status.

``` javascript
var editingToolbar = new OpenLayers.Control.EditingToolbar(vect, {
    autoActivate: false,
    citeCompliant: true,
    allowDepress: true,
    createControlMarkup: function(control) {
        ctrlDiv = document.createElement('div');
        ctrlDiv.id = control.id;
        control.div = ctrlDiv;
        return ctrlDiv;
    }
});
//Remove the navigation tool from the editing toolbar, as it is completely useless.
editingToolbar.controls.splice(0,1);
//Add tooltips for the drawing controls, which are in fixed positions yet.
editingToolbar.controls[0].div.title = 'Draw point';
editingToolbar.controls[1].div.title = 'Draw line';
editingToolbar.controls[2].div.title = 'Draw polygon';
//Extend the toolbar with custom editing controls.
editingToolbar.addControls([
    new OpenLayers.Control.DragFeature(vect, {
        title: 'Drag features'
    }),
    new OpenLayers.Control.DeleteFeature(vect, {
        title: 'Delete features'
    }),
    new OpenLayers.Control.ModifyFeature(vect, {
        title: 'Modify features'
    }),
    new OpenLayers.Control.Snapping({
        layer: vect,
        title: 'Snap features',
        type: OpenLayers.Control.TYPE_TOGGLE
    })
]);
```

The editing toolbar itself needs some tweaks to behave properly. The `allowDepress` property makes its containing controls able to be deactivated. This way there is no need to include the navigation control in the toolbar, as it is a duplicate of the map’s default navigation control. The `createControlMarkup` property is a function, which expected to return a DOM element to contain the control’s toggle button. We don’t really have to overwrite this function, but this way, as our own div element is bound to the control, we can add a tooltip to the default tools. This won’t change our application’s functionality, but definitely make it nicer.

The last step is to add the controls to the toolbar. The only unusual method is for the snapping tool, which needs the layer object as a KVP property. It also has a `type` property, as it needs to be activated with other editing controls. The `TYPE_TOGGLE` makes a control independent from other members of the toolbar, which are `TYPE_TOOL`s by default.

#### Layer independent controls

These controls are the real map controls, as they are fully independent from the loaded and active layers. In this example, there are two new controls in the panel (which can be toggled), and one added directly to the map.

``` javascript
function notifyMeasure(evt) {
    document.getElementById('notifications').innerHTML = 'Measure: ' + evt.measure.toFixed(5) + ' ' + evt.units;
}

panel.addControls([
    new OpenLayers.Control.ZoomToMaxExtent({
        title: 'Zoom to maximum extent'
    }),
    nav.previous,
    nav.next,
    new OpenLayers.Control.Measure(
        OpenLayers.Handler.Path, {
            eventListeners: {
                measure: notifyMeasure,
                measurepartial: notifyMeasure,
            },
            immediate: true,
            title: 'Measure line'
        }
    ),
    new OpenLayers.Control.Graticule({
        title: 'Show graticule',
        type: OpenLayers.Control.TYPE_TOGGLE
    })
]);
```

The measure control needs a handler to draw measurable shapes. It can be a path or an area handler. It also needs some functions to notify about the results. In our case, the outcome can be seen in the notifications bar with a 5 digit precision. The `immediate` property makes sure the result updates with the movement of the pointer. The graticule control is a simple grid as a toggle type.

``` javascript
map.addControls([
    nav,
    panel,
    new OpenLayers.Control.MousePosition({
        div: document.getElementById('coordinates')
    }),
    editingToolbar,
    new OpenLayers.Control.ScaleLine({
        geodesic: true,
        topOutUnits: this.map.units,
        topInUnits: 'm',
        bottomOutUnits: '',
        bottomInUnits: '',
        fixWidth: function() {
            if (parseInt(this.eTop.style.width) > this.maxWidth) {
                this.eTop.innerHTML = +parseFloat(this.eTop.innerHTML).toFixed(5)/2 + ' ' + this.topOutUnits;
                this.eTop.style.width = Math.round(parseInt(this.eTop.style.width)/2) + 'px';
                this.fixWidth();
            }
        },
        maxWidth: 150
    })
]);

map.events.register('moveend', map.getControlsByClass('OpenLayers.Control.ScaleLine')[0], map.getControlsByClass('OpenLayers.Control.ScaleLine')[0].fixWidth);
```

The last control is a customized scale bar. By default, it has two scales with four different units. In this case, one scale is enough, so we leave the `bottomOutUnits` and `bottomInUnits` properties empty. With the `topOutUnits` set to map units, it will show the scale in degrees, when zoomed out. When the map is zoomed in so far, that degrees don’t really make sense, the application will change to meters, as defined in the `topInUnits` property.

When the scale bar is used with degrees, it has an ugly bug. Below 1 degree, it can only display the tenth of the previous scale, so the scale bar can be longer than defined in the `maxWidth` property, even longer than the map. To fix this, we use an ugly fix, which checks if the control surpassed its maximum width, and if that is the case, it halves the scale bar along with its numeric content. This is also a recursive function, as it may need multiple calls to truncate the scale bar into the right size. As a last step, we register this function to the map’s `moveend` event, so it is properly called after every redraw of the control.

<div>
<div class="menuToggle" id="menu_new">
&nbsp;New
<div class="menuContent" id="menu_new_content" style="display: none;">
<div data-dialog="new_wms" onclick="openDialog(this)">
WMS Layer</div>
<div data-dialog="new_wfs" onclick="openDialog(this)">
WFS Layer</div>
<div data-dialog="new_vector" onclick="openDialog(this)">
Vector Layer</div>
</div>
</div>
<div class="menuToggle" id="menu_open">
&nbsp;Open
<div class="menuContent" id="menu_open_content" style="display: none;">
<div data-dialog="open_image" onclick="openDialog(this)">
Image Layer</div>
<div data-dialog="open_vector" onclick="openDialog(this)">
Vector Layer</div>
</div>
</div>
</div>
<div class="menuToggle" id="delete" onclick="deleteLayers()">
&nbsp;Delete</div>
<table style="height: 500px; table-layout: fixed; width: 720px;">
<tbody style="vertical-align: top;">
<tr>
        <td style="width: 200px;"><div id="layerControl_wrap" style="max-height: 500px; overflow: auto; width: 220px;">
Layers:<br />
<p>Name</p>
<img src="{{ site.baseurl }}/assets/js/OpenLayers/theme/default/img/draw_point_on.png" style="height: 20px; width: 20px;" title="Edit layer" />
                <img src="{{ site.baseurl }}/assets/js/OpenLayers/theme/default/img/overview_replacement.gif" style="height: 20px; width: 20px;" title="Select layer" />
<div style="border: 1px solid black; display: inline-block; height: 20px; position: relative; text-align: center; top: -4px; width: 20px;" title="Raise layer">
⇧</div>
<div style="border: 1px solid black; display: inline-block; height: 20px; position: relative; text-align: center; top: -4px; width: 20px;" title="Lower layer">
⇩</div>
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
<table style="table-layout: fixed; width: 720px;">
    <tbody>
<tr style="height: 20px;">
        <td style="width: 200px;"></td>
        <td style="width: 300px;"><span id="notifications"></span>
        </td>
        <td style="text-align: right; width: 200px;"><span id="coordinates"></span>
        </td>
    </tr>
</tbody></table>
<div id="dialog_wrap">
<form id="new_wms" style="display: none;">
New WMS layer<br />
<table>
            <tbody>
<tr>
                <td title="URL of the WMS server.">Server URL:</td>
                <td><input name="server" type="text" /></td>
                <td><input onclick="checkWmsLayer(this.form)" type="button" value="Check for layers" /></td>
            </tr>
<tr>
                <td title="Name of the layer on the WMS server.">Layer name:</td>
                <td><input name="layer" type="text" /><select name="layerSel" style="display: none; max-width: 150px;"></select></td>
            </tr>
<tr>
                <td title="Display name in OpenLayers.">Display name:</td>
                <td><input name="lyrname" type="text" /></td>
            </tr>
<tr>
                <td title="Layer transparency.">Transparency:</td>
                <td><input checked="true" name="transp" type="checkbox" /></td>
            </tr>
<tr>
                <td><br /></td>
            </tr>
<tr>
                <td><input onclick="addWmsLayer(this.form)" type="button" value="Create layer" /></td>
            </tr>
</tbody></table>
</form>
<form id="new_wfs" style="display: none;">
New WFS layer<br />
<table>
            <tbody>
<tr>
                <td title="URL of the WFS server.">Server URL:</td>
                <td><input name="server" type="text" /></td>
            </tr>
<tr>
                <td title="Name of the &quot;layer&quot; on the WFS server.">Layer:</td>
                <td><input name="lyrtype" type="text" /></td>
            </tr>
<tr>
                <td title="Namespace of the feature type.">Namespace (optional):</td>
                <td><input name="ns" type="text" /></td>
            </tr>
<tr>
                <td title="Display name in OpenLayers.">Display name:</td>
                <td><input name="lyrname" type="text" /></td>
            </tr>
<tr>
                <td><br /></td>
            </tr>
<tr>
                <td><input onclick="addWfsLayer(this.form)" type="button" value="Create layer" /></td>
            </tr>
</tbody></table>
</form>
<form id="new_vector" style="display: none;">
New Vector layer<br />
<table>
            <tbody>
<tr>
                <td title="Type of the vector layer.">Feature type:</td>
                <td><select name="lyrtype">
                        <option value="POINT">Point</option>
                        <option value="LINE">Line</option>
                        <option value="POLYGON">Polygon</option>
                        <option value="COLLECTION">Geometry collection</option>
                    </select>
                </td>
            </tr>
<tr>
                <td title="Display name in OpenLayers.">Display name:</td>
                <td><input name="lyrname" type="text" /></td>
            </tr>
<tr>
                <td><br /></td>
            </tr>
<tr>
                <td><input onclick="addVectorLayer(this.form)" type="button" value="Create layer" /></td>
            </tr>
</tbody></table>
</form>
<form id="open_image" style="display: none;">
Open Image layer<br />
<table>
            <tbody>
<tr>
                <td>Image from URL</td>
            </tr>
<tr>
                <td title="URL of the image.">Image URL:</td>
                <td><input name="url" type="text" /></td>
            </tr>
<tr>
                <td>Image from file</td>
            </tr>
<tr>
                <td title="Path of the image.">Image path:</td>
                <td><input accept="image/*" name="file" type="file" /></td>
            </tr>
<tr>
                <td title="Boundary coordinates of the image. Leave blank for non-georeferenced image.">Image extent (W,S,E,N):</td>
                <td><input name="extent" type="text" /></td>
            </tr>
<tr>
                <td title="Display name in OpenLayers.">Display name:</td>
                <td><input name="lyrname" type="text" /></td>
            </tr>
<tr>
                <td><br /></td>
            </tr>
<tr>
                <td><input onclick="openImageLayer(this.form)" type="button" value="Create layer (URL)" /></td>
                <td><input onclick="openImageFile(this.form)" type="button" value="Create layer (file)" /></td>
            </tr>
</tbody></table>
</form>
<form id="open_vector" style="display: none;">
Open Vector layer<br />
<table>
            <tbody>
<tr>
                <td title="Projection of the vector layer.">Projection:</td>
                <td><select name="proj">
                        <option value="EPSG:4326">EPSG:4326</option>
                        <option value="EPSG:3857">EPSG:3857</option>
                    </select>
                </td>
            </tr>
<tr>
                <td title="Format of the vector layer.">Format:</td>
                <td><select name="format">
                        <option value="geojson">GeoJSON</option>
                        <option value="kml">KML</option>
                        <option value="osm">OSM</option>
                        <option value="wkt">WKT</option>
                    </select>
                </td>
            </tr>
<tr>
                <td title="Type of the vector layer.">Feature type:</td>
                <td><select name="lyrtype">
                        <option value="POINT">Point</option>
                        <option value="LINE">Line</option>
                        <option value="POLYGON">Polygon</option>
                        <option value="COLLECTION">Geometry collection</option>
                    </select>
                </td>
            </tr>
<tr>
                <td title="Path of the vetor.">Vector path:</td>
                <td><input name="file" type="file" /></td>
            </tr>
<tr>
                <td title="Display name in OpenLayers.">Display name:</td>
                <td><input name="lyrname" type="text" /></td>
            </tr>
<tr>
                <td><br /></td>
            </tr>
<tr>
                <td><input onclick="openVectorLayer(this.form)" type="button" value="Open layer" /></td>
            </tr>
</tbody></table>
</form>
</div>

<script src="{{ site.baseurl }}/assets/js/OpenLayers/OpenLayers.js" type="text/javascript"></script>
<script src="{{ site.baseurl }}/assets/js/openlayers-webgis-2.js" type="text/javascript"></script>

