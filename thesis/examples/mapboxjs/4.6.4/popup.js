function popup() {
    popupObj = L.popup();
    popupObj.setLatLng(L.latLng(0,0));
    popupObj.setContent('Hello world!');
    popupObj.openOn(map);
}