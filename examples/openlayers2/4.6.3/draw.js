function draw() {
    control = new OpenLayers.Control.DrawFeature(map.layers[1],
        OpenLayers.Handler.Polygon
    );
    map.addControl(control);
    control.activate();
}