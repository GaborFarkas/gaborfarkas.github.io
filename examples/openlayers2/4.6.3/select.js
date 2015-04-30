function select() {
    control = new OpenLayers.Control.SelectFeature([map.layers[1]], {
        multiple: true
    });
    map.addControl(control);
    control.activate();
}