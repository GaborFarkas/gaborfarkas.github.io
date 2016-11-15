function init() {
    document.removeEventListener('DOMContentLoaded', init);
    
    var mapSwitch = function() {
        var element = document.createElement('div');
        element.style.bottom = '0.5em';
        element.style.left = '0.5em';
        element.style.width = '100px';
        element.style.height = '50px';
        element.classList.add('ol-control', 'ol-unselectable');
        var canvas = document.createElement('input');
        canvas.type = 'radio';
        canvas.name = 'renderer';
        this.canvas = canvas;
        var _this = this;
        canvas.addEventListener('click', function() {
           if (_this.getMap().getRenderer() instanceof ol.renderer.webgl.Map) {
               _this.getMap().setTarget(null);
               var map = new ol.Map({
                    target: 'map',
                    layers: layers,
                    view: view,
                    renderer: 'canvas',
                    controls: controls
                });
           }
        });
        element.appendChild(canvas);
        element.appendChild(document.createTextNode('Canvas'));
        element.appendChild(document.createElement('br'));
        var webgl = document.createElement('input');
        webgl.type = 'radio';
        webgl.name = 'renderer';
        this.webgl = webgl;
        webgl.addEventListener('click', function() {
           if (_this.getMap().getRenderer() instanceof ol.renderer.canvas.Map) {
               _this.getMap().setTarget(null);
               var map = new ol.Map({
                    target: 'map',
                    layers: layers,
                    view: view,
                    renderer: 'webgl',
                    controls: controls
                });
           }
        });
        element.appendChild(webgl);
        element.appendChild(document.createTextNode('WebGL'));
        
        ol.control.Control.call(this, {
          element: element
        });
    };
    ol.inherits(mapSwitch, ol.control.Control);
    
    mapSwitch.prototype.setMap = function(map) {
        ol.control.Control.prototype.setMap.call(this, map);
        if (map.getRenderer() instanceof ol.renderer.canvas.Map) {
            this.canvas.checked = "checked";
        } else {
            this.webgl.checked = "checked";
        }
    };
    
    var layers = [
        new ol.layer.Tile({
            source: new ol.source.OSM({wrapX: false})
        }),
        new ol.layer.Vector({
            title: 'Rivers',
            source: new ol.source.Vector({
                format: new ol.format.TopoJSON({
                    defaultDataProjection: 'EPSG:4326'
                }),
                url: 'rivers.topojson',
                attributions: [
                    new ol.Attribution({
                        html: 'Rivers © Natural Earth'
                    })
                ],
                wrapX: false
            }),
            visible: false
        }),
        new ol.layer.Vector({
            title: 'Coastline',
            source: new ol.source.Vector({
                format: new ol.format.GeoJSON({
                    defaultDataProjection: 'EPSG:4326'
                }),
                url: 'coast.geojson',
                attributions: [
                    new ol.Attribution({
                        html: 'Coastline © Natural Earth'
                    })
                ],
                wrapX: false
            }),
            visible: false
        }),
        new ol.layer.Vector({
            title: 'Countries',
            source: new ol.source.Vector({
                format: new ol.format.GeoJSON({
                    defaultDataProjection: 'EPSG:4326'
                }),
                url: 'world_countries.geojson',
                attributions: [
                    new ol.Attribution({
                        html: 'Coastline © Natural Earth'
                    })
                ],
                wrapX: false
            }),
            visible: false
        }),
        new ol.layer.Vector({
            title: 'Rivers (updateWhileInteracting)',
            source: new ol.source.Vector({
                format: new ol.format.TopoJSON({
                    defaultDataProjection: 'EPSG:4326'
                }),
                url: 'rivers.topojson',
                attributions: [
                    new ol.Attribution({
                        html: 'Rivers © Natural Earth'
                    })
                ],
                wrapX: false
            }),
            updateWhileInteracting: true,
            visible: false
        }),
        new ol.layer.Vector({
            title: 'Coastline (updateWhileInteracting)',
            source: new ol.source.Vector({
                format: new ol.format.GeoJSON({
                    defaultDataProjection: 'EPSG:4326'
                }),
                url: 'coast.geojson',
                attributions: [
                    new ol.Attribution({
                        html: 'Coastline © Natural Earth'
                    })
                ],
                wrapX: false
            }),
            updateWhileInteracting: true,
            visible: false
        }),
        new ol.layer.Vector({
            title: 'Countries (updateWhileInteracting)',
            source: new ol.source.Vector({
                format: new ol.format.GeoJSON({
                    defaultDataProjection: 'EPSG:4326'
                }),
                url: 'world_countries.geojson',
                attributions: [
                    new ol.Attribution({
                        html: 'World Countries © Natural Earth'
                    })
                ],
                wrapX: false
            }),
            updateWhileInteracting: true,
            visible: false
        }),
    ];

    var view = new ol.View({center: [0,0], zoom: 4});
    
    var controls = ol.control.defaults().extend([
        new ol.control.LayerSwitcher(),
        new mapSwitch()
    ]);

    var map = new ol.Map({
        target: 'map',
        layers: layers,
        view: view,
        renderer: 'webgl',
        controls: controls
    });
}
document.addEventListener('DOMContentLoaded', init);
