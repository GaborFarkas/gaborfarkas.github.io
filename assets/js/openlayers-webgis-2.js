function openDialog(div) {
    collapseMenu();
    closeDialog();
    document.getElementById(div.getAttribute('data-dialog')).style.display = 'initial';
}

function closeDialog() {
    document.getElementById('new_wms').style.display = 'none';
    document.getElementById('new_wfs').style.display = 'none';
    document.getElementById('new_vector').style.display = 'none';
    document.getElementById('open_image').style.display = 'none';
    document.getElementById('open_vector').style.display = 'none';
}

//Add a WMS layer with user specified parameters.
function addWmsLayer(form) {
    var server = form.server.value;
    if (/^((http)|(https))(:\/\/)/.test(server) === false) {
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
    if (/^((http)|(https))(:\/\/)/.test(server) === false) {
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

//Dropdown menu related events and functions.
document.getElementById('menu_new').addEventListener('click', expandMenu);
document.getElementById('menu_open').addEventListener('click', expandMenu);

document.addEventListener('click', collapseMenu, true);

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

var map;
function init() {
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

//Create a map with event listeners.
map = new OpenLayers.Map('map',{
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
    maxResolution: 0.35,
    projection: "EPSG:4326"
});

//Create a new panel for the universal controls, like navigation history. Define the element type, which
//should contain the control. It can be anything as it will get an .olButton class, which will make it clickable.
var panel = new OpenLayers.Control.Panel({
    createControlMarkup: function(control) {
        ctrlDiv = document.createElement('div');
        ctrlDiv.id = control.id;
        control.div = ctrlDiv;
        return ctrlDiv;
    },
    allowDepress: true
});

//Create a navigation history control. Note that the main control has to be added to the map object, while
//its two subcontrols can be added to the control panel.
var nav = new OpenLayers.Control.NavigationHistory({
    previousOptions: {
        title: 'Previous extent'
    },
    nextOptions: {
        title: 'Next extent'
    }
});

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
//Create a layer to initialize the map.
var vect = new OpenLayers.Layer.Vector('VectorLayer 1',{
    maxExtent: [-180, -90, 180, 90],
    featType: 'POINT'
});

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

map.addLayer(vect);
map.zoomToMaxExtent();
}
init();
