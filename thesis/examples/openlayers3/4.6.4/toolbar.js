function toolbar() {
    var customControl = function(opt_options) {
        var options = opt_options || {};
        var controlElem = document.createElement('div');
        var button = document.createElement('button');
        controlElem.appendChild(button);
        controlElem.className = 'ol-unselectable ol-control';
        controlElem.title = 'My custom control';
        controlElem.style.top = '65px';
        controlElem.style.left = '.5em';
        ol.control.Control.call(this,{
            element: controlElem,
            target: options.target
        });
    };
    ol.inherits(customControl, ol.control.Control);
    control = new customControl();
    map.addControl(control);
}