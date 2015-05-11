function chart() {
    //Based on the code written by Antonio Santiago, https://acanimal.github.io/thebookofopenlayers3/chapter03_04_imagecanvas.html.
    ol.layer.Piechart = function(opt_options) {
        var self = this;
        this.options = opt_options || {};
        this.options.colors = this.options.colors || [];
        this.options.attributes = this.options.attributes || [];
        this.canvasFunction = function(extent, resolution, pixelRatio, size, projection) {
            self.options.projection = self.options.projection || projection.getCode();
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            var canvasWidth = size[0], canvasHeight = size[1];
            canvas.setAttribute('width', canvasWidth);
            canvas.setAttribute('height', canvasHeight);
            var mapExtent = map.getView().calculateExtent(map.getSize());
            var canvasOrigin = map.getPixelFromCoordinate([extent[0], extent[3]]);
            var mapOrigin = map.getPixelFromCoordinate([mapExtent[0], mapExtent[3]]);
            var delta = [mapOrigin[0]-canvasOrigin[0], mapOrigin[1]-canvasOrigin[1]];
            var radius = self.options.radius || 15;
            var totalArc = -90*Math.PI / 180;
            var percentToRadians = 1 / 100*360 *Math.PI / 180;
            var wedgeRadians;
            function drawWedge(coordinate, percent, color) {
                var point = coordinate;
                var pixel = map.getPixelFromCoordinate(point);
                var cX = pixel[0] + delta[0], cY = pixel[1] + delta[1];
                wedgeRadians = percent * percentToRadians;
                context.save();
                context.beginPath();
                context.moveTo(cX, cY);
                context.arc(cX, cY, radius, totalArc, totalArc + wedgeRadians, false);
                context.closePath();
                context.fillStyle = color;
                context.fill();
                context.lineWidth = 1;
                context.strokeStyle = self.options.strokeColor || '#000000';
                context.stroke();
                context.restore();
                totalArc += wedgeRadians;
            }
            function drawPie(coordinate, data, colors) {
                for(var i=0;i<data.length;i++){
                    drawWedge(coordinate, data[i],colors[i]);
                }
            }
            if (self.options.source instanceof ol.source.Vector) {
                var features = self.options.source.getFeatures();
                var colors = self.options.colors;
                if (self.options.colors.length != self.options.attributes.length) {
                    for (var i=0;i<self.options.attributes.length;i++) {
                        colors.push('#'+Math.floor(Math.random()*16777215).toString(16));
                    }
                }
                for(var i=0; i<features.length;i++){
                    var geom = features[i].getGeometry();
                    var data = [];
                    var coord = [null, null];
                    if (geom instanceof ol.geom.Point) {
                        coord = geom.getCoordinates();
                    } else if (geom instanceof ol.geom.Polygon) {
                        coord = geom.getInteriorPoint().getCoordinates();
                    }
                    if (self.options.source.getProjection()) {
                        if (self.options.source.getProjection().getCode() != self.options.projection) {
                            coord = ol.proj.transform(coord, self.options.source.getProjection().getCode(), self.options.projection);
                        }
                    }
                    var total = 0;
                    for (var j=0;j<self.options.attributes.length;j++) {
                        total = total + parseFloat(features[i].get(self.options.attributes[j]));
                    }
                    for (var j=0;j<self.options.attributes.length;j++) {
                        data.push(parseFloat(features[i].get(self.options.attributes[j]))/total*100);
                    }
                    drawPie(coord, data, colors);
                }
            }
            self.dispatchEvent('ready');
            return canvas;
        };
        ol.layer.Image.call(this, {
            source: new ol.source.ImageCanvas({
                canvasFunction: this.canvasFunction
            })
        });
        this.once('ready', function(){
            map.getView().setZoom(map.getView().getZoom()-1);
        });
    };
    ol.inherits(ol.layer.Piechart, ol.layer.Image);
    map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Piechart({
                source: new ol.source.StaticVector({
                    format: new ol.format.GeoJSON(),
                    url: '../../../res/vector/ne_capitals.geojson',
                    projection: 'EPSG:4326'
                }),
                attributes: ['POP_MAX', 'POP_MIN']
            })
        ],
        view: new ol.View({
            projection: 'EPSG:4326',
            center: [6,45],
            zoom: 5
        })
    });
}