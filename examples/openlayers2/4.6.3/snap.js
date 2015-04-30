function snap() {
    control = new OpenLayers.Control.Snapping({
        layer: map.layers[1]
    });
    map.addControl(control);
    control.activate();
}