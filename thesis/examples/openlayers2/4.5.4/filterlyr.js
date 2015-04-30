function filterlyr() {
    var filter = new OpenLayers.Filter.Comparison({
        type: '==',
        property: 'name',
        value: 'Hungary'
    });
    filterStrategy.setFilter(filter);
}