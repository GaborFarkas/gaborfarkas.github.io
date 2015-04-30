function line() {
    lyr.addFeatures([
        new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString([
            new OpenLayers.Geometry.Point(0,0),
            new OpenLayers.Geometry.Point(1,0.5),
            new OpenLayers.Geometry.Point(1.25,0.51),
            new OpenLayers.Geometry.Point(2,1)
        ]))
    ]);
}