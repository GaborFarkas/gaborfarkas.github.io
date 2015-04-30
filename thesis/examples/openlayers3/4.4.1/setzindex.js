function setzindex() {
    function setLayerIndex(layer, index) {
        var lyrArr = map.getLayers().getArray();
        var lyrIndex = lyrArr.indexOf(layer);
        if (lyrIndex > -1 && index < lyrArr.length && index >= 0) {
            lyrArr.splice(lyrIndex, 1);
            lyrArr.splice(index, 0, layer);
        }
    }
    setLayerIndex(lyr, 0);
}