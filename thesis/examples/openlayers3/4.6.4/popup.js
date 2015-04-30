function popup() {
    var popupElem = document.createElement('div');
    popupElem.innerHTML = 'Hello world!';
    popupElem.style.backgroundColor = '#ffffff';
    popupObj = new ol.Overlay({
        element: popupElem,
        position: [0,0]
    });
    map.addOverlay(popupObj);
}