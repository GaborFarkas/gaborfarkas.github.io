function pip() {
    var polyArr = leafletPip.pointInLayer(L.latLng(0,0), map.featureLayer, true);
    if (polyArr.length > 0) {
        return true;
    } else {
        return false;
    }
}