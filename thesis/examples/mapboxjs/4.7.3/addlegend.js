function addlegend() {
    legendObj = '<img src="http://demo.opengeo.org/geoserver/wms?REQUEST=GetLegendGraphic&LAYER=ne:ne&format=image/png">';
    map.legendControl.addLegend(legendObj);
}