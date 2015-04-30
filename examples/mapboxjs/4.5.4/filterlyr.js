function filterlyr() {
    map.featureLayer.setFilter(function(feat) {
        return (feat.properties.name == 'Hungary');
    });
}