function line() {
    lyr.getSource().addFeature(new ol.Feature({
        geometry: new ol.geom.LineString([[0,0], [1,0.5], [1.25,0.51], [2,1]])
    }));
}