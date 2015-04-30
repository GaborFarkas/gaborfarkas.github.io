function lyrswitch() {
    control =  L.control.layers(
        {'MapQuest': map.tileLayer},
        {'Vector': map.featureLayer}
    ).addTo(map);
}