function popup() {
    popupObj = new OpenLayers.Popup('custom',
        new OpenLayers.LonLat(0,0),
        new OpenLayers.Size(100,30),
        'Hello world!',
        true
    );
    map.addPopup(popupObj);
}