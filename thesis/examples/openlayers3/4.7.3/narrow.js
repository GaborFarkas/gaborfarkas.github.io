function narrow() {
    ol.control.NorthArrow = function(opt_options) {
        this.options = opt_options || {};
        this.options.class = this.options.class || 'ol-northarrow';
        this.options.imagePath = this.options.imagePath || '../../../res/image/narrow.png';
        this.div = document.createElement('div');
        this.div.className = this.options.class + ' ol-unselectable';
        narrowImage = document.createElement('img');
        narrowImage.src = this.options.imagePath;
        this.div.appendChild(narrowImage);
        ol.control.Control.call(this, {
            element: this.div
        });
    };
    ol.inherits(ol.control.NorthArrow, ol.control.Control);
    ol.control.NorthArrow.prototype.setMap = function(map) {
        ol.control.Control.prototype.setMap.call(this, map);
        var self = this;
        var rotateArrow = function(evt){
            var radian = evt.target.getRotation();
            self.div.style.transform = 'rotate(' + radian * 180 / Math.PI + 'deg)';
        };
        if (map !== null) {
            if (self.map) {
                self.map.getView().un('change:rotation', rotateArrow);
            }
            self.map = map;
            map.getView().on('change:rotation', rotateArrow);
        } else {
            if (self.map) {
                self.map.getView().un('change:rotation', rotateArrow);
                self.map = null;
            }
        }
    }
    controlObj = new ol.control.NorthArrow();
    map.addControl(controlObj);
}