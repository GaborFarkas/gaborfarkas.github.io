function loadevt() {
    evt = function(){
        if (lyr.getSource().getState() === 'ready') {
            /*Do something*/
        }
    };
    lyr.getSource().on('change', evt);
}