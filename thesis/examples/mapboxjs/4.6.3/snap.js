function snap() {
    control = new L.Control.Draw({
        edit: {
            featureGroup: map.featureLayer
        }
    }).addTo(map);
    map.on('draw:created', function(evt) {
        map.featureLayer.addLayer(evt.layer);
        if (evt.layer instanceof L.Marker || evt.layer instanceof L.CircleMarker) {
            evt.layer.snapediting = new L.Handler.MarkerSnap(map, evt.layer);
        } else {
            evt.layer.snapediting = new L.Handler.PolylineSnap(map, evt.layer);
        }
        evt.layer.snapediting.addGuideLayer(map.featureLayer);
        evt.layer.snapediting.enable();
    });
    control.setDrawingOptions({
        polyline: { guideLayers: [map.featureLayer] },
        polygon: { guideLayers: [map.featureLayer] },
    });
    map.featureLayer.eachLayer(function(layer) {
        if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
            layer.snapediting = new L.Handler.MarkerSnap(map, layer);
        } else {
            layer.snapediting = new L.Handler.PolylineSnap(map, layer);
        }
        layer.snapediting.addGuideLayer(map.featureLayer);
        layer.snapediting.enable();
    });
}