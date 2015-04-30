function toolbar() {
    control = new OpenLayers.Control.Panel({
        allowDepress: true
    });
    control.addControls([
        new OpenLayers.Control.Button({
            title: 'My custom control'
        })
    ]);
    map.addControl(control);
}