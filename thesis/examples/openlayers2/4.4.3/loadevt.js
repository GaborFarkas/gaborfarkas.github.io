function loadevt() {
    evt = function(){/*Do something*/};
    lyr.events.on({loadstart: evt});
    lyr.events.on({loadend: evt});
}