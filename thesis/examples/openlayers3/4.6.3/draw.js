function draw() {
    control = new ol.interaction.Draw({
        source: map.getLayers().getArray()[1].getSource(),
        type: 'Polygon'
    });
    map.addInteraction(control);
}