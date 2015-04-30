function opacity(){
    if (lyr instanceof L.Path || lyr instanceof L.FeatureGroup) {
        lyr.setStyle({opacity: 0.5});
    } else if (lyr instanceof L.TileLayer) {
        lyr.setOpacity(0.5);
    }
}