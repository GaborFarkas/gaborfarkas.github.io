function setzindex() {
    map.getLayers().remove(lyr);
    map.getLayers().insertAt(0, lyr);
}