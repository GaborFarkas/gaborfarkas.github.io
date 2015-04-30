function multipart() {
    lyr.addFeatures([
        new OpenLayers.Feature.Vector(new OpenLayers.Geometry.MultiPolygon([
            new OpenLayers.Geometry.Polygon([
                new OpenLayers.Geometry.LinearRing([
                    new OpenLayers.Geometry.Point(0,0),
                    new OpenLayers.Geometry.Point(-2,0),
                    new OpenLayers.Geometry.Point(-2,2),
                    new OpenLayers.Geometry.Point(0,0)
                ])
            ]),
            new OpenLayers.Geometry.Polygon([
                new OpenLayers.Geometry.LinearRing([
                    new OpenLayers.Geometry.Point(1,1),
                    new OpenLayers.Geometry.Point(2,1),
                    new OpenLayers.Geometry.Point(2,2),
                    new OpenLayers.Geometry.Point(1,1)
                ])
            ])
        ]))
    ]);
}