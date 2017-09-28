---
layout: post
title: Switching coordinate order in OpenLayers 3
date: 2015-08-08
description: "In this post we will discuss a small, but quite annoying bug/lack of feature in OpenLayers 3. Working with WFS was never one of the strengths of the library. It offers some base classes, but you have to build a complete program on it, with tons of considerations. On the top of that, you can't easily declare the axis orientation you would like to use with your WFS request. If you have tested your WFS app with the OpenGeo demo services, you may have already bumped into this problem. Maybe, you are reading this post, because you would like to fix the issue. Well, the good news are, you can fix it manually with some JavaScript magic, but the are also some bad news. You can't implement a simple validating system on it, as it is not version specific. From some GeoServers the coordinates in EPSG:4326 come in reverse order, while in others they are perfect with the same WFS version."
comments: true
---
<link href="{{ site.baseurl }}/assets/css/ol-v3.0.0.css" rel="stylesheet" type="text/css" />
In this post we will discuss a small, but quite annoying bug/lack of feature in OpenLayers 3. Working with WFS was never one of the strengths of the library. It offers some base classes, but you have to build a complete program on it, with tons of considerations. On the top of that, you can’t easily declare the axis orientation you would like to use with your WFS request. If you have tested your WFS app with the OpenGeo demo services, you may have already bumped into this problem. Maybe, you are reading this post, because you would like to fix the issue. Well, the good news are, you can fix it manually with some JavaScript magic, but the are also some bad news. You can’t implement a simple validating system on it, as it is not version specific. From some GeoServers the coordinates in EPSG:4326 come in reverse order, while in others they are perfect with the same WFS version.

Let’s see the first test case. In this map, the US has taken on a journey to discover some terra incognita.

<div class="map" id="map"></div>

The map was produced with this simple code:

``` javascript
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: 'http://demo.opengeo.org/geoserver/wms',
                params: {
                    layers: 'bluemarble',
                    format: 'image/png'
                }
            })
        }),
        new ol.layer.Vector({
            source: new ol.source.Vector({
                loader: function (extent, res, proj) {
                    var source = this;
                    var wfsParser = new ol.format.WFS();
                    var request = new XMLHttpRequest();
                    request.onreadystatechange = function () {
                        if (request.readyState === 4 && request.status === 200) {
                            source.addFeatures(wfsParser.readFeatures(request.responseText));
                        }
                    };
                    request.open('GET', 'http://demo.opengeo.org/geoserver/wfs?SERVICE=WFS&REQUEST=GetFeature&TYPENAME=topp:states&VERSION=1.1.0&SRSNAME=' + proj.getCode() + '&BBOX=' + extent.join(','));
                    request.send();
                }
            })
        })
    ],
    view: new ol.View({
        center: [0, 0],
        zoom: 2,
        projection: 'EPSG:4326'
    })
});
```

So what is the problem with the request? We should use WFS 2.0.0 instead? No luck there. WFS 1.0.0? No luck, either (which is quite disturbing, as it has a [reverse coordinate order](http://docs.geoserver.org/stable/en/user/services/wfs/basics.html) in the [specification](http://www.opengeospatial.org/standards/wfs)). I couldn’t find out the reason behind this capricious behaviour of GeoServer. If you know the answer, don’t hesitate to leave a comment.

Now, let’s see the good news. With a little JavaScript magic, we can quite easily swap the coordinates in the parsed features.

<div class="map" id="map2"></div>

Now the US is safe and sound again, in the bounds of the Earth. How can you achieve the same effect? With the following modified code:

``` javascript
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: 'http://demo.opengeo.org/geoserver/wms',
                params: {
                    layers: 'bluemarble',
                    format: 'image/png'
                }
            })
        }),
        new ol.layer.Vector({
            source: new ol.source.Vector({
                loader: function (extent, res, proj) {
                    var source = this;
                    var wfsParser = new ol.format.WFS();
                    var request = new XMLHttpRequest();
                    request.onreadystatechange = function () {
                        if (request.readyState === 4 && request.status === 200) {
                            var features = wfsParser.readFeatures(request.responseText);
                            for (var i=0;i<features.length;i++) {
                                features[i].getGeometry().applyTransform(function (coords, coords2, stride) {
                                    for (var j=0;j<coords.length;j+=stride) {
                                        var y = coords[j];
                                        var x = coords[j+1];
                                        coords[j] = x;
                                        coords[j+1] = y;
                                    }
                                });
                            }
                            source.addFeatures(features);
                        }
                    };
                    request.open('GET', 'http://demo.opengeo.org/geoserver/wfs?SERVICE=WFS&REQUEST=GetFeature&TYPENAME=topp:states&VERSION=1.1.0&SRSNAME=' + proj.getCode() + '&BBOX=' + extent.join(','));
                    request.send();
                }
            })
        })
    ],
    view: new ol.View({
        center: [0, 0],
        zoom: 2,
        projection: 'EPSG:4326'
    })
});
```

### The applyTransform method to the rescue

This method is [listed in the API](http://openlayers.org/en/v3.7.0/apidoc/ol.geom.SimpleGeometry.html#applyTransform), however it lacks the required documentation. If you look at the source code, fortunately, you can see how it works. It gives out the internal coordinate array of a feature, which is a simple array. We can modify it in place with the function given to the method as an argument. The method gives three arguments to our function. The first two are the same coordinate array (don’t ask why), while the third is called the stride. It is a numerical representation of the layout used in the feature:

- XY - 2
- XYZ - 3
- XYZM - 4

It simply tells us, how much we have to increase our index in the iteration, to reach the next pair of coordinates. The rest of the function is unequivocal: we simply swap the x, and the y coordinates in place.

<script src="{{ site.baseurl }}/assets/js/ol-v3.7.0.js" type="text/javascript"></script>
<script src="{{ site.baseurl }}/assets/js/switch-coordinate-order.js" type="text/javascript"></script>

