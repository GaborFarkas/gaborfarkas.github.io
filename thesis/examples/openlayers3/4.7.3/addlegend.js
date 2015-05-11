function addlegend() {
    ol.control.WMSLegend = function(opt_options) {
        this.options = opt_options || {};
        this.options.class = this.options.class || 'ol-legend';
        this.div = document.createElement('div');
        var legendP = document.createElement('p');
        legendP.innerHTML = 'Legend:';
        this.div.className = this.options.class + ' ol-unselectable';
        this.div.appendChild(legendP);
        this.div.appendChild(document.createElement('br'));
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
            if (/\?/.test(url) === false) {
                url += '?';
            }
            var legendImg = document.createElement('img');
            legendImg.src = url + '&version=' + this.options.wmsVersion + '&service=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=' + layer.getSource().getParams().layers + '&format=' + this.options.format;
            this.div.appendChild(legendImg);
        }
    };
    ol.control.WMSLegend.prototype.setMap = function(map){
        ol.control.Control.prototype.setMap.call(this, map);
        this.options.wmsVersion = this.options.wmsVersion || '1.3.0';
        this.options.format = this.options.format || 'image/png';
        if (map !== null) {
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
    };
    controlObj = new ol.control.WMSLegend();
    map.addControl(controlObj);
}