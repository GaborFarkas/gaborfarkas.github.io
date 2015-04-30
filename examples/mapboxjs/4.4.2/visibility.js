function visibility() {
    if (lyr instanceof L.Path || lyr instanceof L.FeatureGroup) {
        lyr.setStyle({opacity: 0});
    } else if (lyr instanceof L.TileLayer) {
        lyr.getContainer().style.display = 'none';
    }
}