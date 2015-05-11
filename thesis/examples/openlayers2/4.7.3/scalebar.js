function scalebar() {
    controlObj = new OpenLayers.Control.ScaleLine({geodesic: true});
    map.addControl(controlObj);
}