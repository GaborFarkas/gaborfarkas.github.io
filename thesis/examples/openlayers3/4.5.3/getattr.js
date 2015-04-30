function getattr() {
    var attr = feat.getProperties();
    delete attr.geometry;
    return attr;
}