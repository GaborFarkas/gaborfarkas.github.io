function narrow() {
    OpenLayers.Control.NorthArrow = OpenLayers.Class(OpenLayers.Control, {
        class: 'ol-northarrow',
        imagePath: '../../../res/image/narrow.png',
        draw: function() {
            this.div = document.createElement('div');
            var narrowImg = document.createElement('img');
            narrowImg.src = this.imagePath;
            this.div.appendChild(narrowImg);
            this.div.className = this.class + ' olControlNoSelect';
            return this.div;
        },
        CLASS_NAME: 'OpenLayers.Control.NorthArrow'
    });
    controlObj = new OpenLayers.Control.NorthArrow();
    map.addControl(controlObj);
}