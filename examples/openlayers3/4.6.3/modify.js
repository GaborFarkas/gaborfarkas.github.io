function modify() {
    control = new ol.interaction.Modify({
        features: new ol.Collection(map.getLayers().getArray()[1].getSource().getFeatures())
    });
    map.addInteraction(control);
}