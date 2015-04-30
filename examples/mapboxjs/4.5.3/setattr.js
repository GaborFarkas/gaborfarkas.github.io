function setattr() {
    function setAttributes(feature, attributesObject) {
        for (var i in attributesObject) {
            feature.properties[i] = attributesObject[i];
        }
    }
    setAttributes(feat, {population: 500000});
}