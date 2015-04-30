function utfgrid(){
    var utfgrid = new OpenLayers.Layer.UTFGrid({
        url: "../../../res/utfgrid/geography-class/${z}/${x}/${y}.grid.json",
        utfgridResolution: 4, // default is 2
        displayInLayerSwitcher: false
    });
    
    map = new OpenLayers.Map('map', {
        projection: "EPSG:900913",
        layers: [new OpenLayers.Layer.OSM(),
            utfgrid
        ],
        controls: [
            new OpenLayers.Control.Navigation()
        ],
        center: [0, 0],
        zoom: 2
    });
    
    var output = document.getElementById("info");
    
    var callback = function(infoLookup) {
        if (infoLookup) {
            var info;
            for (var idx in infoLookup) {
                info = infoLookup[idx];
                if (info && info.data) {
                    output.innerHTML = infoLookup[idx].data.admin;
                }
            }
        }
    };
        
    var control = new OpenLayers.Control.UTFGrid({
        callback: callback,
        handlerMode: "move"
    });
    
    map.addControl(control);
}