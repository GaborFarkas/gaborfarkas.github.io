var ol2_map, ol3_map;

OpenLayers.Control.WMSLegend = OpenLayers.Class(OpenLayers.Control, {
        class: null,
        wmsVersion: '1.3.0',
        format: 'image/png',
        draw: function () {
            var legendP = document.createElement('p');
            legendP.innerHTML = 'Legend:';
            this.div = document.createElement('div');
            this.div.className = this.class + ' olControlNoSelect';
            this.div.appendChild(legendP);
            var layers = this.map.layers;
            for(var i=0;i<layers.length;i++){
                if (layers[i].getOptions().showLegend === true) {
                    var legendImg = document.createElement('img');
                    if (typeof layers[i].params.LAYERS === 'string') {
                        var layer = layers[i].params.LAYERS;
                    } else {
                        var layer = layers[i].params.LAYERS[0];
                    }
                    legendImg.src = layers[i].url + '&version=' + this.wmsVersion + '&service=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=' + layer + '&format=' + this.format;
                    this.div.appendChild(legendImg);
                }
            }
            return this.div;
        },
        CLASS_NAME: 'OpenLayers.Control.WMSLegend'
    });
ol.control.WMSLegend = function(opt_options) {
    var options = opt_options || {};
    this.options = options;
    this.div = document.createElement('div');
    var legendP = document.createElement('p');
    legendP.innerHTML = 'Legend:';
    this.div.className = this.options.class + ' ol-unselectable';
    this.div.appendChild(legendP);
    ol.control.Control.call(this, {
        element: this.div
    });
};
ol.inherits(ol.control.WMSLegend, ol.control.Control);

ol.control.WMSLegend.prototype.drawLegendItem = function(layer) {
    if (layer.get('showLegend') === true) {
        try {
            var url = layer.getSource().getUrls()[0];
        }
        catch(err) {
            var url = layer.getSource().getUrl();
        }
        var legendImg = document.createElement('img');
        legendImg.src = url + '&version=' + this.options.wmsVersion + '&service=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=' + layer.getSource().getParams().layers + '&format=' + this.options.format;
        this.div.appendChild(legendImg);
    }
}

ol.control.WMSLegend.prototype.setMap = function(map){
    ol.control.Control.prototype.setMap.call(this, map);
    this.options.wmsVersion = this.options.wmsVersion || '1.3.0';
    this.options.format = this.options.format || 'image/png';
    var layers = map.getLayers().getArray();
    for (var i=0;i<layers.length;i++) {
        if (layers[i] instanceof ol.layer.Group) {
            var layersFromGroup = layers[i].getLayers().getArray();
            for (var j=0;j<layersFromGroup.length;j++) {
                this.drawLegendItem(layersFromGroup[j]);
            }
        } else {
            this.drawLegendItem(layers[i]);
        }
    }
}

function init() {
Proj4js.defs["EPSG:23700"]="+proj=somerc +lat_0=47.14439372222222 +lon_0=19.04857177777778 +k_0=0.99993 +x_0=650000 +y_0=200000 +ellps=GRS67 +towgs84=52.17,-71.82,-14.9,0,0,0,0 +units=m +no_defs";
    
    ol2_map = new OpenLayers.Map('ol2map', {
        projection: "EPSG:23700",
        restrictedExtent: new OpenLayers.Bounds(400000,45000,950000,380000),
        maxResolution: 1000
    });
    
    var wms = new OpenLayers.Layer.WMS( "Administrative boundaries",
        'http://mercator.elte.hu/cgi-bin/mapserv?map=/home/oktatok/saman/public_html/hu/okt/mapserver/mo.map',
        {
            layers: 'kozig',
            format: 'image/png'
        },
        {
            maxExtent: new OpenLayers.Bounds(400000,45000,950000,380000),
            singleTile: true,
            isBaseLayer: false,
            showLegend: true
        });
        
    var wms2 = new OpenLayers.Layer.WMS("Elevation",
        'http://www.agt.bme.hu/cgi-bin/mapserv?map=/var/www/html/gis/wms/eu_dem/eu_dem.map', {
            layers: 'mo_eov_szines',
            format: 'image/png'
        },
        {
            maxExtent: new OpenLayers.Bounds(400000,45000,950000,380000)
    });
    
    ol2_map.addLayers([wms, wms2]);
    
    ol2_map.zoomToMaxExtent();
    ol2_map.addControl(new OpenLayers.Control.MousePosition());
    ol2_map.addControl(new OpenLayers.Control.LayerSwitcher());
    ol2_map.addControl(new OpenLayers.Control.WMSLegend({
        class: 'ol_legend'
    }));
    
    proj4.defs("EPSG:23700", "+proj=somerc +lat_0=47.14439372222222 +lon_0=19.04857177777778 +k_0=0.99993 +x_0=650000 +y_0=200000 +ellps=GRS67 +towgs84=52.17,-71.82,-14.9,0,0,0,0 +units=m +no_defs");
    ol3_map = new ol.Map({
        target: 'ol3map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.TileWMS({
                    url: 'http://www.agt.bme.hu/cgi-bin/mapserv?map=/var/www/html/gis/wms/eu_dem/eu_dem.map',
                    params: {
                        layers: 'mo_eov_szines',
                        format: 'image/png'
                    },
                    serverType: 'mapserver'
                }),
                extent: [400000,45000,950000,380000]
            }),
            new ol.layer.Image({
                source: new ol.source.ImageWMS({
                    url: 'http://mercator.elte.hu/cgi-bin/mapserv?map=/home/oktatok/saman/public_html/hu/okt/mapserver/mo.map',
                    params:{
                        layers: 'kozig',
                        format: 'image/png'
                    },
                    serverType: 'mapserver'
                }),
                extent: [400000,45000,950000,380000],
                showLegend: true
            })
        ],
        controls: ol.control.defaults({attribution: false}).extend([
            new ol.control.MousePosition(),
            new ol.control.WMSLegend({
                class: 'ol_legend'
            })
            ]),
        view: new ol.View({
            center: [675000, 212500],
            zoom: 0,
            projection: 'EPSG:23700',
            extent: [400000,45000,950000,380000],
            maxResolution: 1000
        })
    });
}
init();
