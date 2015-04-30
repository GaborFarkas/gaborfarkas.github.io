function setattr() {
    function setAttributes(feature, attributesObject) {
        for (var i in attributesObject) {
            feature.attributes[i] = attributesObject[i];
        }
    }
    setAttributes(feat, {population: 500000});
}