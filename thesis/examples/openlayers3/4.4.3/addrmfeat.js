function addrmfeat() {
    evt = function(){/*Do something*/};
    lyr.getSource().on('addfeature', evt);
    lyr.getSource().on('removefeature', evt);
}