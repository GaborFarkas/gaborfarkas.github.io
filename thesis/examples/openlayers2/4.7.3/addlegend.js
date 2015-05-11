function addlegend() {
    OpenLayers.Control.WMSLegend = OpenLayers.Class(OpenLayers.Control, {
        class: 'ol-legend',
        wmsVersion: '1.3.0',
        format: 'image/png',
        draw: function () {
            var legendP = document.createElement('p');
            legendP.innerHTML = 'Legend:';
            this.div = document.createElement('div');
            this.div.className = this.class + ' olControlNoSelect';
            this.div.appendChild(legendP);
            this.div.appendChild(document.createElement('br'));
            var layers = this.map.layers;
            for(var i=0;i<layers.length;i++){
                if (layers[i].getOptions().showLegend === true) {
                    var legendImg = document.createElement('img');
                    if (typeof layers[i].params.LAYERS === 'string') {
                        var layer = layers[i].params.LAYERS;
                    } else {
                        var layer = layers[i].params.LAYERS[0];
                    }
                    if (/\?/.test(layers[i].url) === false) {
                        legendImg.src = layers[i].url + '?';
                    }
                    legendImg.src = legendImg.src + '&version=' + this.wmsVersion + '&service=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=' + layer + '&format=' + this.format;
                    this.div.appendChild(legendImg);
                }
            }
            return this.div;
        },
        CLASS_NAME: 'OpenLayers.Control.WMSLegend'
    });
    controlObj = new OpenLayers.Control.WMSLegend();
    map.addControl(controlObj);
}