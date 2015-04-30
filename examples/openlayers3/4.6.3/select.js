function select() {
    control = new ol.interaction.Select({
        layers: [map.getLayers().getArray()[1]],
    });
    map.addInteraction(control);
}