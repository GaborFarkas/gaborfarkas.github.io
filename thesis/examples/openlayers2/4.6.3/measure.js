function measure() {
    control = new OpenLayers.Control.Measure(OpenLayers.Handler.Polygon);
    map.addControl(control);
    control.activate();
}