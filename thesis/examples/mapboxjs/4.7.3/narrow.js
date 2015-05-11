function narrow() {
    var northArrow = L.Control.extend({
        options: {
            position: 'topright'
        },
        onAdd: function (map) {
            var container = L.DomUtil.create('div', 'north-arrow');
            var image = L.DomUtil.create('img', '', container);
            image.src = '../../../res/image/narrow.png';
            return container;
        }
    });
    controlObj = new northArrow().addTo(map);
}