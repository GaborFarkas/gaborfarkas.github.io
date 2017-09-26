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
    document.getElementById('filter_layer').style.display = 'none';
    document.getElementById('filter_attribute').style.display = 'none';
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

function filterLayer(form) {
    var layerArr = [];
    for (var i=0;i<map.layers.length;i++) {
        if (map.layers[i].layerDiv) {
            if (map.layers[i].layerDiv.children[2].checked === true) {
                layerArr.push(map.layers[i]);
            }
        }
    }
    if (layerArr.length === 1) {
        var layer = layerArr[0];
        if (! layer.filterStrategy) {
            layer.filterStrategy = new OpenLayers.Strategy.Filter();
            layer.filterStrategy.setLayer(layer);
            layer.filterStrategy.activate();
        }
        if (form.expression_1.value !== '' || form.expression_2.value !== '') {
            if (form.expression_1.value !== '' && form.expression_2.value !== '') {
                var exp1 = form.expression_1.value;
                var exp2 = form.expression_2.value;
                var logical = form.operator.value;
                var filter = new OpenLayers.Filter.Logical({
                    type: logical,
                    filters: [
                        parseFilterExp(exp1),
                        parseFilterExp(exp2)
                    ]
                });
            } else {
                var exp1 = form.expression_1.value || form.expression_2.value;
                var filter = parseFilterExp(exp1);
            }
        } else {
            var filter = null;
        }
        try {
            layer.filterStrategy.setFilter(filter);
        } catch(err) {
            throw new SyntaxError (err.message);
        }
        closeDialog();
        document.getElementById('notifications').innerHTML = layer.features.length + ' features filtered (out of ' + (layer.filterStrategy.cache.length + layer.features.length) + ').';
    } else {
        document.getElementById('notifications').innerHTML = 'No or too many layer(s) selected.';
    }
}

function filterAttribute(form) {
    var layerArr = [];
    for (var i=0;i<map.layers.length;i++) {
        if (map.layers[i].layerDiv) {
            if (map.layers[i].layerDiv.children[2].checked === true) {
                layerArr.push(map.layers[i]);
            }
        }
    }
    if (layerArr.length === 1) {
        var layer = layerArr[0];
        var selectAgent = map.getControlsByClass('OpenLayers.Control.SelectFeature')[0];
        for (var i=0;i<map.layers.length;i++) {
            if (map.layers[i].selectedFeatures) {
                if (map.layers[i].selectedFeatures.length > 0) {
                    selectAgent.setLayer(map.layers[i]);
                    selectAgent.unselectAll();
                }
            }
        }
        if (form.expression_1.value !== '' || form.expression_2.value !== '') {
            if (form.expression_1.value !== '' && form.expression_2.value !== '') {
                var exp1 = form.expression_1.value;
                var exp2 = form.expression_2.value;
                var logical = form.operator.value;
                var filter = new OpenLayers.Filter.Logical({
                    type: logical,
                    filters: [
                        parseFilterExp(exp1),
                        parseFilterExp(exp2)
                    ]
                });
            } else {
                var exp1 = form.expression_1.value || form.expression_2.value;
                var filter = parseFilterExp(exp1);
            }
            for (var i=0;i<layer.features.length;i++) {
                if (filter.evaluate(layer.features[i]) === true) {
                    selectAgent.select(layer.features[i]);
                }
            }
            document.getElementById('notifications').innerHTML = layer.selectedFeatures.length + ' features selected (out of ' + layer.features.length + ').';
            closeDialog();
        } else {
            document.getElementById('notifications').innerHTML = 'No filter expression.';
        }
    } else {
        document.getElementById('notifications').innerHTML = 'No or too many layer(s) selected.';
    }
}

function parseFilterExp(expression) {
    var expArray = expression.split(' ');
    if (expArray[1] === '..') {
        var filter = new OpenLayers.Filter.Comparison({
            type: '..',
            property: expArray[0],
            lowerBoundary: expArray[2],
            upperBoundary: expArray[3]
        });
    } else if (expArray[1] === 'NULL') {
        var filter = new OpenLayers.Filter.Comparison({
            type: 'NULL',
            property: expArray[0]
        });
    } else {
        var filter = new OpenLayers.Filter.Comparison({
            type: expArray[1],
            property: expArray[0],
            value: expArray[2]
        });
    }
    return filter;
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
document.getElementById('menu_filter').addEventListener('click', expandMenu);

document.addEventListener('click', collapseMenu, true);

function collapseMenu() {
    document.getElementById('menu_new_content').style.display = 'none';
    document.getElementById('menu_open_content').style.display = 'none';
    document.getElementById('menu_filter_content').style.display = 'none';
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

function attrPopup(evt) {
    //The feature can be wrapped in an event object (digitizing), or passed directly (editing tool).
    var feature = evt.feature || evt;
    //Only one popup can be active at a time.
    if (map.popups.length === 0) {
        //Create the DOM elements of the form.
        var div = document.createElement('div');
        var p = document.createElement('p');
        p.innerHTML = 'Attributes:';
        div.appendChild(p);
        div.appendChild(document.createElement('br'));
        var form = document.createElement('form');
        form.className = 'popupForm';
        //For every existing attribute, create a record. Get the possible attributes with the custom
        //getAttributes() function.
        if (feature.layer.features.length > 0) {
            //Create a mandatory ID field, which will be stored in the fid attribute of the feature.
            var attrDiv = document.createElement('div');
            attrDiv.innerHTML = 'ID';
            var span = document.createElement('span');
            span.innerHTML = ':';
            var input = document.createElement('input');
            input.name = 'fid';
            input.type = 'text';
            input.value = feature.fid;
            form.appendChild(attrDiv);
            form.appendChild(span);
            form.appendChild(input);
            form.appendChild(document.createElement('br'));
            //Create the rest of the existing attributes.
            var headers = feature.layer.getAttributes();
            for (var i=0;i<headers.length;i++) {
                var attrDiv = document.createElement('div');
                attrDiv.innerHTML = headers[i];
                attrDiv.title = headers[i];
                var span = document.createElement('span');
                span.innerHTML = ':';
                var input = document.createElement('input');
                input.name = headers[i];
                input.type = 'text';
                if (feature.attributes[headers[i]]) {
                    input.value = feature.attributes[headers[i]];
                }
                form.appendChild(attrDiv);
                form.appendChild(span);
                form.appendChild(input);
                form.appendChild(document.createElement('br'));
            }
        }
        //Create a button which can add new records.
        form.attributeNum = 0;
        var newAttr = document.createElement('input');
        newAttr.type = 'button';
        newAttr.value = 'New attribute';
        newAttr.onclick = function() {
            var property = document.createElement('input');
            property.name = 'property_' + form.attributeNum;
            property.type = 'text';
            var span = document.createElement('span');
            span.innerHTML = ':';
            var value = document.createElement('input');
            value.name = 'value_' + form.attributeNum;
            value.type = 'text';
            this.form.insertBefore(property, this);
            this.form.insertBefore(span, this);
            this.form.insertBefore(value, this);
            var closeButton = document.createElement('button');
            var br = document.createElement('br');
            closeButton.innerHTML = 'X';
            closeButton.type = 'button';
            closeButton.onclick = function() {
                form.removeChild(property);
                form.removeChild(span);
                form.removeChild(value);
                form.removeChild(this);
                form.removeChild(br);
            }
            this.form.insertBefore(closeButton, this);
            this.form.insertBefore(br, this);
            this.form.attributeNum++;
        }
        form.appendChild(newAttr);
        div.appendChild(form);
        //Create a popup which will sit on the centroid of the geometry. The last parameter is the callback
        //function on close, which writes the changes to the layer, then removes the popup.
        var popup = new OpenLayers.Popup('attributes', 
            feature.geometry.getBounds().getCenterLonLat(),
            new OpenLayers.Size(260, 200),
            '',
            true,
            function() {
                feature.fid = form.fid.value;
                for (var i=0;i<headers.length;i++) {
                    var value = form[headers[i]].value;
                    if (value !== '') {
                        feature.attributes[headers[i]] = value;
                    }
                }
                for (var i=0;i<form.attributeNum;i++) {
                    try {
                        var property = form['property_' + i].value;
                        var value = form['value_' + i].value;
                        if (value !== '') {
                            feature.attributes[property] = value;
                        }
                    } catch(err) {}
                }
                map.removePopup(this);
                this.destroy();
            }
        );
        popup.panMapIfOutOfView = true;
        map.addPopup(popup);
        popup.contentDiv.appendChild(div);
    //If there is already a popup, destroy the feature. This way digitizing will be disabled, while there is
    //an active attribute defining session. Only when digitizing.
    } else {
        if (evt.type === 'featureadded') {
            feature.destroy();
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

function drawAttrTable(layer, select) {
    var attrWrap = document.getElementById('attribute_wrap');
    //Wipe out the previous table if it is still there.
    while (attrWrap.firstChild) {
        attrWrap.removeChild(attrWrap.firstChild);
    }
    //Proceed only when the layer has features.
    if (layer.features.length > 0) {
        //Create a column for the mandatory feature ID.
        var div = document.createElement('div');
        div.className = 'attributeTable';
        var tbl = document.createElement('table');
        var header = document.createElement('tr');
        var fid = document.createElement('th');
        fid.innerHTML = 'ID';
        header.appendChild(fid);
        tbl.appendChild(header);
        var headers = layer.getAttributes();
        //Create columns for every other attribute.
        for (var i=0;i<headers.length;i++) {
            var attr = document.createElement('th');
            attr.innerHTML = headers[i];
            header.appendChild(attr);
        }
        //If the select argument is true, only list the selected features.
        var features = select ? layer.selectedFeatures : layer.features;
        var counter = 0;
        //Create rows for every feature in the input array.
        for (var i=0;i<features.length;i++) {
            var feature = features[i];
            var featureRow = document.createElement('tr');
            var featureID = document.createElement('td');
            featureID.innerHTML = feature.fid;
            featureRow.appendChild(featureID);
            for (var j=0;j<header.children.length;j++) {
                var child = header.children[j];
                if (child.innerHTML !== 'ID') {
                    var featureColumn = document.createElement('td');
                    //If the feature doesn't have a value for a given attribute, the record should be empty
                    //instead of undefined.
                    featureColumn.innerHTML = feature.attributes[child.innerHTML] ? feature.attributes[child.innerHTML] : '';
                    featureRow.appendChild(featureColumn);
                }
            }
            //If a feature is selected show it with a light blue background.
            if (layer.selectedFeatures.indexOf(feature) > -1) {
                featureRow.style.backgroundColor = '#CEE3F6';
            }
            tbl.appendChild(featureRow);
            counter++;
        }
        //Create a close button for the table.
        var closeButton = document.createElement('div');
        closeButton.innerHTML = 'X';
        closeButton.className = 'attributeCloseButton';
        closeButton.onclick = function() {
            while (attrWrap.firstChild) {
                attrWrap.removeChild(attrWrap.firstChild);
            }
            attrWrap.style.display = 'none';
            document.getElementById('notifications').innerHTML = '';
        };
        div.appendChild(tbl);
        var selectedDiv = document.createElement('div');
        selectedDiv.style.clear = 'left';
        //Create an option for displaying only the selected features.
        var selectedCheckbox = document.createElement('input');
        selectedCheckbox.type = 'checkbox';
        selectedCheckbox.checked = select;
        selectedCheckbox.onchange = function() {
            drawAttrTable(layer, this.checked);
        };
        selectedDiv.appendChild(selectedCheckbox);
        var selectedSpan = document.createElement('span');
        selectedSpan.innerHTML = 'Show selected only';
        selectedDiv.appendChild(selectedSpan);
        attrWrap.appendChild(div);
        attrWrap.appendChild(closeButton);
        attrWrap.appendChild(selectedDiv);
        attrWrap.style.display = 'block';
        document.getElementById('notifications').innerHTML = counter + ' features listed (' + layer.selectedFeatures.length + ' selected).'
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

OpenLayers.Control.EditAttribute = OpenLayers.Class(OpenLayers.Control, {
    initialize: function(layer, options) {
        OpenLayers.Control.prototype.initialize.apply(this, [options]);
        this.layer = layer;
        this.handler = new OpenLayers.Handler.Feature(
            this, layer, {click: attrPopup}
        );
    },
    setMap: function(map) {
        this.handler.setMap(map);
        OpenLayers.Control.prototype.setMap.apply(this, arguments);
    },
    CLASS_NAME: "OpenLayers.Control.EditAttribute"
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

//Create a layer to initialize the map.
var vect = new OpenLayers.Layer.Vector('VectorLayer 1',{
    maxExtent: [-180, -90, 180, 90],
    featType: 'POINT'
});

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
    }),
    new OpenLayers.Control.SelectFeature(vect, {
        title: 'Select features',
        multiple: true,
        clickout: false,
        toggle: true,
        avoidLoop: false,
        eventListeners: {
            activate: function() {
                var layerArray = [];
                for (var i=0;i<this.map.layers.length;i++) {
                    if (this.map.layers[i].layerDiv.children[2].checked === true) {
                        layerArray.push(this.map.layers[i]);
                    }
                }
                if (layerArray.length === 1) {
                    if (this.avoidLoop === false) {
                        this.avoidLoop = true;
                        this.setLayer(layerArray[0]);
                    } else {
                        this.avoidLoop = false;
                    }
                }
            }
        }
    }),
    new OpenLayers.Control.Button({
        title: 'Draw attribute table',
        displayClass: 'olControlAttributeTable',
        trigger: function() {
            //Draw an attribute table if only one layer is selected.
            var layerArr = [];
            for (var i=0;i<map.layers.length;i++) {
                if (map.layers[i].layerDiv) {
                    if (map.layers[i].layerDiv.children[2].checked === true) {
                        layerArr.push(map.layers[i]);
                    }
                }
            }
            if (layerArr.length === 1) {
                var layer = layerArr[0];
                drawAttrTable(layer);  
            } else {
                document.getElementById('notifications').innerHTML = 'No or too many layer(s) selected.'
            }
        }
    })
]);

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
//Register events, so attributes can be added on feature creation.
editingToolbar.controls[0].events.register('featureadded', editingToolbar.controls[0], attrPopup);
editingToolbar.controls[1].events.register('featureadded', editingToolbar.controls[1], attrPopup);
editingToolbar.controls[2].events.register('featureadded', editingToolbar.controls[2], attrPopup);
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
    }),
    new OpenLayers.Control.EditAttribute(vect, {
        title: 'Edit attributes'
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

OpenLayers.Layer.Vector.prototype.buildAttrTable = function() {
    var headerElems = [];
    for (var i=0;i<this.features.length;i++) {
        var feature = this.features[i];
        for (var j in feature.attributes) {
            if (headerElems.indexOf(j) === -1) {
                headerElems.push(j);
                for (var k=0;k<this.features.length;k++) {
                    this.features[k].attributes[j] = typeof this.features[k].attributes[j] != 'undefined' ? this.features[k].attributes[j] : null;
                }
            }
        }
    }
};

OpenLayers.Layer.Vector.prototype.getAttributes = function() {
    var headerElems = [];
    for (var i=0;i<this.features.length;i++) {
        var feature = this.features[i];
        for (var j in feature.attributes) {
            if (headerElems.indexOf(j) === -1) {
                headerElems.push(j);
            }
        }
    }
    return headerElems;
};

map.addLayer(vect);
map.zoomToMaxExtent();
}
init();
