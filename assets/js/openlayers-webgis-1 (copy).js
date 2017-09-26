var map;
window.map = map;
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
function init(){
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
}
init();
