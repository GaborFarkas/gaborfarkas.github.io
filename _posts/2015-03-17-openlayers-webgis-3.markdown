---
layout: post
title: "WebGIS application with OpenLayers 2 - Part 3: Data management"
date: 2015-03-17
description: "In the last part of the series, we will cover data management in OpenLayers 2. It is a quite difficult part, as browsers mostly don't have native support for relational databases. The only exceptions are browsers powered by WebKit. This way, we have to make sure manually, that our data is stored in a consistent way. ASCII geodata formats, which are mainly used in web mapping environments don't support databases. We can store different attributes for every geometry in a layer/dataset. This doesn't seem to be an issue on the first glance, as web mapping libraries can handle object-oriented databases very well. However, if you declare attributes arbitrary, in an inconsistent way, you will have a hard time when you try to process it with a RDBMS. As the server side processing GIS softwares (e.g. QGIS, GRASS, PostGIS) will put these datasets into a relational database, it might be a wise consideration to handle features like they were in a relational table on the frontend."
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
    background-position: 1px 0px;
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
    .olControlPanel .olControlSelectFeatureItemInactive {
        background-image: url("https://docs.qgis.org/2.2/en/_images/mActionSelect.png");
        background-size: contain;
        left: -55px;
        top: 35px;
    }
    .olControlPanel .olControlSelectFeatureItemActive {
        background-image: url("https://docs.qgis.org/2.2/en/_images/mActionSelect.png");
        background-size: contain;
        filter: hue-rotate(180deg);
        -webkit-filter: hue-rotate(180deg);
        left: -55px;
        top: 35px;
    }
    .olControlPanel .olControlAttributeTableItemInactive {
        background-image: url("http://grass.osgeo.org/grass71/manuals/icons/table.png");
        background-size: contain;
        left: -55px;
        top: 35px;
    }
    .olControlPanel .olControlAttributeTableItemActive {
        background-image: url("http://grass.osgeo.org/grass71/manuals/icons/table.png");
        background-size: contain;
        filter: hue-rotate(180deg);
        -webkit-filter: hue-rotate(180deg);
        left: -55px;
        top: 35px;
    }
    .olControlEditingToolbar .olButton {
        background-color: #EBEBE6;
        border-radius: 5px 5px 5px 5px;
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
    .olControlEditingToolbar .olControlEditAttributeItemActive { 
        background-image: url("https://cdn2.iconfinder.com/data/icons/aspneticons_v1.0_Nov2006/database_table_(edit)_16x16.gif");
        background-size: contain;
        filter: hue-rotate(180deg);
        -webkit-filter: hue-rotate(180deg);
    }
    .olControlEditingToolbar .olControlEditAttributeItemInactive { 
        background-image: url("https://cdn2.iconfinder.com/data/icons/aspneticons_v1.0_Nov2006/database_table_(edit)_16x16.gif");
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
    .attributeTable {
        max-width: 670px;
        max-height: 500px;
        overflow: scroll;
        float: left;
    }
    .attributeTable td {
        padding-right: 10px;
        white-space: nowrap;
    }
    .attributeTable th {
        padding-right: 10px;
        white-space: nowrap;
    }
    .attributeCloseButton {
        width: 20px;
        height: 20px;
        overflow: hidden;
        cursor: pointer;
        text-align: center;
        border: 1px solid black;
    }
    .popupForm div {
        width: 100px;
        display: inline-block;
        overflow: hidden;
        word-wrap: normal;
    }
    .popupForm input[type=text] {
        width: 100px;
    }
svg {
        max-height: initial;
    }
</style>
In the last part of the series, we will cover data management in OpenLayers 2. It is a quite difficult part, as browsers mostly don’t have native support for relational databases. The only exceptions are browsers powered by WebKit. This way, we have to make sure manually, that our data is stored in a consistent way. ASCII geodata formats, which are mainly used in web mapping environments don’t support databases. We can store different attributes for every geometry in a layer/dataset. This doesn’t seem to be an issue on the first glance, as web mapping libraries can handle object-oriented databases very well. However, if you declare attributes arbitrary, in an inconsistent way, you will have a hard time when you try to process it with a RDBMS. As the server side processing GIS softwares (e.g. QGIS, GRASS, PostGIS) will put these datasets into a relational database, it might be a wise consideration to handle features like they were in a relational table on the frontend.

### HTML and CSS

The HTML and CSS parts of the final example are quite easy to understand, as they’re mostly just simple extensions to the previous ones. We’re defining three new controls, an attribute table, and a popup to assign attributes to newly created features. We also implement a new menu to filter layers with user specified expressions.

``` html
.attributeTable {
    max-width: 900px;
    max-height: 500px;
    overflow: scroll;
    float: left;
}
.attributeTable td {
    padding-right: 10px;
    white-space: nowrap;
}
.attributeTable th {
    padding-right: 10px;
    white-space: nowrap;
}
.attributeCloseButton {
    width: 20px;
    height: 20px;
    overflow: hidden;
    cursor: pointer;
    text-align: center;
    border: 1px solid black;
}
.popupForm div {
    width: 100px;
    display: inline-block;
    overflow: hidden;
}
.popupForm input[type=text] {
    width: 100px;
}

.olControlEditingToolbar .olControlEditAttributeItemActive { 
    background-image: url("https://cdn2.iconfinder.com/data/icons/aspneticons_v1.0_Nov2006/database_table_(edit)_16x16.gif");
    background-size: contain;
    filter: hue-rotate(180deg);
    -webkit-filter: hue-rotate(180deg);
}
.olControlEditingToolbar .olControlEditAttributeItemInactive { 
    background-image: url("https://cdn2.iconfinder.com/data/icons/aspneticons_v1.0_Nov2006/database_table_(edit)_16x16.gif");
    background-size: contain;
}
.olControlPanel .olControlSelectFeatureItemInactive {
    background-image: url("https://docs.qgis.org/2.2/en/_images/mActionSelect.png");
    background-size: contain;
}
.olControlPanel .olControlSelectFeatureItemActive {
    background-image: url("https://docs.qgis.org/2.2/en/_images/mActionSelect.png");
    background-size: contain;
    filter: hue-rotate(180deg);
    -webkit-filter: hue-rotate(180deg);
}
.olControlPanel .olControlAttributeTableItemInactive {
    background-image: url("http://grass.osgeo.org/grass71/manuals/icons/table.png");
    background-size: contain;
}
.olControlPanel .olControlAttributeTableItemActive {
    background-image: url("http://grass.osgeo.org/grass71/manuals/icons/table.png");
    background-size: contain;
    filter: hue-rotate(180deg);
    -webkit-filter: hue-rotate(180deg);
}
```

``` html
<form id="filter_layer" style="display: none;">
    <div style="float: left; padding-right: 20px;">
        <p>Filter Layer</p>
        <input name="expression_1" type="text">
        <br>
        <select name="operator">
            <option value="||">OR</option>
            <option value="&&">AND</option>
        </select>
        <br>
        <input name="expression_2" type="text">
        <br>
        <br>
        <input type="button" value="Filter" onclick="filterLayer(this.form)">
    </div>
    <p>Help: Write expressions with relational operators in one or both of the textboxes.</p>
    <p>The attribute column should be on the left side of the operator, while the value(s) should be on the right side.</p>
    <p>Neither part of the expression should be put into brackets or quotes.</p>
    <p>Legal operators:</p>
    <p><code>==</code>, <code>!=</code>, <code><</code>, <code>></code>, <code><=</code>, <code>>=</code>, <code>..</code>(between), <code>~</code>(like), <code>NULL</code></p>
</form>
```

### Data management scheme

For an easier understanding, we should clarify the scheme before jumping to the code. The datasets are handled as relational tables. This will cost some extra resources, memory or computing time. This example deems memory scarcer than computing time, so we don’t store every attribute in every feature to save some milliseconds. Instead, we iterate through every feature when the attribute names (headers) are needed and return them in an array.

The first field of every feature is its ID. It is mandatory, and it should be written in the fid property. Other fields are stored in the attributes property of the feature. The attributes of the layer are requested on feature creation or an “edit attributes” session. They’re shown as recommended properties and can be filled out by the user, or left empty. The feature only gets those attributes, which have a value other than an empty string.

To reduce overhead, and optimize the application a little bit, the application should store the headers in the `layer` object and modify it, if needed. Also, we should be able to delete or add new fields from the attribute table, beside/instead of the editing session. Applying these considerations will be the subject of a future post.

### Attribute management

The first task of this application when it comes to attribute management is to get the attribute names from a layer. As attributes are exclusive to the layers, it can be defined as a member of the layer object.

``` javascript
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
```

Now, as we can get the “headers” from a layer, we can programmatically recommend existent attributes to the user. However, we need a medium which can communicate between the user and the application. For this task, the `OpenLayers.Popup` class is perfect. When a user digitizes a point or tries to edit its attributes, a popup pops up (excuse me). It contains a form, which the user fills in, then submits. On submission, the feature gets updated with new values/attributes.

``` javascript
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
```

As a further consideration, only one popup can be active at a time. Otherwise the map view can be easily filled with popups. This can be achieved by looking at the `popups` attribute of the `map` object, as popups don’t get grouped in a layer. The rest of the code is mostly DOM manipulation. To deploy this function, we need a way to apply it on feature creation. This can be done by registering the function to a `featureadded` event. Note, that the `layer` object also has this event, but it fires every time the `features` property extends. As there aren’t only one way to extend the `features` property (e.g. removing filters), it is a bad approach. We only need to apply this function on new features. Fortunately, the editing tools also have a `featureadded` event.

``` javascript
//Register events, so attributes can be added on feature creation.
editingToolbar.controls[0].events.register('featureadded', editingToolbar.controls[0], attrPopup);
editingToolbar.controls[1].events.register('featureadded', editingToolbar.controls[1], attrPopup);
editingToolbar.controls[2].events.register('featureadded', editingToolbar.controls[2], attrPopup);

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
```

Now the popup only gets added, when a new feature is digitized, or when the custom `EditAttribute` control gets a feature (the user clicks on one with the control activated). Finally, we define a function for dynamically drawing an attribute table, then create a control for it.

``` javascript
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

var attributeTableControl = new OpenLayers.Control.Button({
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
});
```

The function iterates through the features two times. First it collects the unique attribute names, then the values. This can be optimized and reduced to one iteration. The control now doesn’t extend the `OpenLayers.Control` class, it is defined as a button control which calls the function if its requirements are met.

### Filters and selections

Filtering and selecting systems are built-in functionalities in OpenLayers 2. There is a default styling for selected features, a selection control, and an `OpenLayers.Filter` class just to mention a few. This section shows how to utilize selecting and filtering by attributes. First, we add a simple `SelectFeature` control with a little spice. It has basic selection capabilities on mouse click, and can switch to the selected layer to activation. Because its internal `setLayer` function reactivates the control, it gets stuck in a loop whenever it is activated. To avoid this, we implement an `avoidLoop` boolean attribute, which grabs the control out of loop after `setLayer` has been called.

``` javacsript
var selectControl = new OpenLayers.Control.SelectFeature(vect, {
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
});
```

Next, we add filter controls. The trickiest part in filters is writing a form, which can be used easily and effectively by the user. There are a lot of options, and we shouldn’t limit the user in writing expressions with fixed forms. However, for the sake of simplicity I’ve implemented a basic form with two comparisons and one logical operator. The comparison expressions can be written freely, so we need a simple parsing function which creates a filter based on them.

``` javascript
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
```

As we can parse simple expressions, we can write the filter functions. One of them is a hard filter, which removes every feature which get evaluated as false by the filter. The other one is a selection tool, which selects the filtered features. The hard filter works with a filter strategy, which needs to be accessed easily despite of how many strategies are applied. To do this, we make a dedicated property for the strategy. Also, if there is a syntax error in a `LIKE` expression, which gets evaluated by a regular expression, the features get removed from the layer. To prevent this, we wrap the filter in a try-catch clause, which throws an error message if the filter fails to apply.

``` javascript
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
```

For the selection function, we don’t want to duplicate the selection controls, so we call the one, which has been added previously. We evaluate every feature with the specified filter, then if it returns a true, we select it with the control’s select method. This way the selection control functions as a deselecting agent if activated later. In our case this considered a feature, but if in another environment it is a bug, you can dedicate a new `SelectFeatures` control to the function. Also, the function removes all of the previous selections prior to making a new one.

``` javascript
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
```
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
<div class="menuToggle" id="menu_filter">
&nbsp;Filter
<div class="menuContent" id="menu_filter_content" style="display: none;">
<div data-dialog="filter_layer" onclick="openDialog(this)">
Filter Layer</div>
<div data-dialog="filter_attribute" onclick="openDialog(this)">
Select by attribute</div>
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
<div id="attribute_wrap" style="display: none;">
</div>
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
<form id="filter_layer" style="display: none;">
<div style="float: left; padding-right: 20px;">
Filter Layer<br />
<input name="expression_1" type="text" />
        <br />
<select name="operator">
            <option value="||">OR</option>
            <option value="&amp;&amp;">AND</option>
        </select>
        <br />
<input name="expression_2" type="text" />
        <br />
<br />
<input onclick="filterLayer(this.form)" type="button" value="Filter" />
    </div>
Help: Write expressions with relational operators in one or both of the textboxes.<br />
The attribute column should be on the left side of the operator, while the value(s) should be on the right side.<br />
Neither part of the expression should be put into brackets or quotes.<br />
Legal operators:<br />
<code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>, <code>..</code>(between), <code>~</code>(like), <code>NULL</code></form>
<form id="filter_attribute" style="display: none;">
<div style="float: left; padding-right: 20px;">
Select by attribute<br />
<input name="expression_1" type="text" />
        <br />
<select name="operator">
            <option value="||">OR</option>
            <option value="&amp;&amp;">AND</option>
        </select>
        <br />
<input name="expression_2" type="text" />
        <br />
<br />
<input onclick="filterAttribute(this.form)" type="button" value="Select" />
    </div>
Help: Write expressions with relational operators in one or both of the textboxes.<br />
The attribute column should be on the left side of the operator, while the value(s) should be on the right side.<br />
Neither part of the expression should be put into brackets or quotes.<br />
Legal operators:<br />
<code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>, <code>..</code>(between), <code>~</code>(like), <code>NULL</code></form>
</div>

<script src="{{ site.baseurl }}/assets/js/OpenLayers/OpenLayers.js" type="text/javascript"></script>

<script src="{{ site.baseurl }}/assets/js/openlayers-webgis-3.js" type="text/javascript"></script>

