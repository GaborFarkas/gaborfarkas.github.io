function polygon() {
    lyr.addFeatures([
        new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Polygon([
            new OpenLayers.Geometry.LinearRing([
                new OpenLayers.Geometry.Point(0,0),
                new OpenLayers.Geometry.Point(0,-0.5),
                new OpenLayers.Geometry.Point(2,-0.4),
                new OpenLayers.Geometry.Point(0,0)
            ])
        ]))
    ]);
}