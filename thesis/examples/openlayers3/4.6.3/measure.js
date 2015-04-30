function measure() {
    control = new ol.interaction.Draw({
        source: null,
        type: 'LineString'
    });
    control.on('drawend', function(evt) {
        var length = evt.feature.getGeometry().getLength();
        document.getElementById('info').innerHTML = length/1000 + ' km';
    });
    map.addInteraction(control);
}