function init() {
// Create 50 random features, and give them a "type" attribute that
// will be used for the label text.
var features = new Array(50);
for (var i = 0; i < features.length; i++) {
    features[i] = new OpenLayers.Feature.Vector(
    new OpenLayers.Geometry.Point(
    (360 * Math.random()) - 180, (180 * Math.random()) - 90), {
        magnitude: 5 + parseInt(5 * Math.random())
    });
}

/**
 * Create a style instance that is a collection of rules with symbolizers.
 * Use a default symbolizer to extend symoblizers for all rules.
 */

// Create a vector layer and give it your style map.

var points = new OpenLayers.Layer.Vector("Points", {
    styleMap: new OpenLayers.StyleMap({
        "default": new OpenLayers.Style({
            fillColor: "#ffcc66",
            strokeColor: "#ff9933",
            strokeWidth: 2,
            pointRadius: 7,
            label: "${magnitude}",
            fontColor: "#333333",
            fontFamily: "sans-serif",
            fontWeight: "bold"
            }, {
            rules: [
                new OpenLayers.Rule({
                    minScaleDenominator: 200000000,
                    symbolizer: {
                        pointRadius: 7,
                        fontSize: "9px"
                    }
                }),
                new OpenLayers.Rule({
                    maxScaleDenominator: 200000000,
                    minScaleDenominator: 100000000,
                    symbolizer: {
                        pointRadius: 10,
                        fontSize: "12px"
                    }
                }),
                new OpenLayers.Rule({
                    maxScaleDenominator: 100000000,
                    symbolizer: {
                        pointRadius: 13,
                        fontSize: "15px"
                    }
                }),
                new OpenLayers.Rule({
                    filter: new OpenLayers.Filter.Comparison({
                        type: OpenLayers.Filter.Comparison.LESS_THAN,
                        property: "magnitude",
                        value: 6
                    }),
                    symbolizer: {
                        fillColor: "#F78181",
                        strokeColor: "#FE2E2E"
                    }
                }),
                new OpenLayers.Rule({
                    filter: new OpenLayers.Filter.Comparison({
                        type: OpenLayers.Filter.Comparison.BETWEEN,
                        property: "magnitude",
                        lowerBoundary: 6,
                        upperBoundary: 7
                    }),
                    symbolizer: {
                        fillColor: "#58FA58",
                        strokeColor: "#04B404"
                    }
                }),
                new OpenLayers.Rule({
                    filter: new OpenLayers.Filter.Comparison({
                        type: OpenLayers.Filter.Comparison.GREATER_THAN,
                        property: "magnitude",
                        value: 8
                    }),
                    symbolizer: {
                        fillColor: "#F5A9F2",
                        strokeColor: "#FE2EC8"
                    }
                }),
            ]
        }),
        "select": new OpenLayers.Style({
            fillColor: "#66ccff",
            strokeColor: "#3399ff"
        })
    })
});
points.addFeatures(features);

var map = new OpenLayers.Map({
    div: "map",
    layers: [
    new OpenLayers.Layer.WMS(
        "OpenLayers WMS",
        "http://vmap0.tiles.osgeo.org/wms/vmap0", {
        layers: "basic"
    }),
    points],
    center: new OpenLayers.LonLat(0, 0),
    zoom: 1
});

var select = new OpenLayers.Control.SelectFeature(points, {hover: true, autoActivate: true});
map.addControl(select);}
init();
