function modify() {
    control = new L.Control.Draw({
        edit: {
            featureGroup: map.featureLayer
        }
    }).addTo(map);
    map.on('draw:created', function(evt) {
        map.featureLayer.addLayer(evt.layer);
    });
}