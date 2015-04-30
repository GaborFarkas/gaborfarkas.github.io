function xyz() {
    map = new L.mapbox.Map('map', null, {
        center: [0,0],
        zoom: 3,
        layers: [
            L.tileLayer("http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png", {
                subdomains: '1234',
                attribution: "&copy; MapQuest, OpenStreetMap contributors"
            })
        ]
    });
}