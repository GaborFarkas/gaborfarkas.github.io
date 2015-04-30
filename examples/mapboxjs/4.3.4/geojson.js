function geojson() {
    var geojsonObj = map.featureLayer.toGeoJSON();
    document.getElementById('functionOutput').innerHTML = JSON.stringify(geojsonObj);
}