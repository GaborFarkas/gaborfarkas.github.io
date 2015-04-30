function modify() {
    control = new OpenLayers.Control.ModifyFeature(map.layers[1]);
    map.addControl(control);
    control.activate();
}