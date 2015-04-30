function property() {
    evt = function() {/*Do something*/};
    lyr.on('changeproperty', evt);
    lyr.fireEvent('changeproperty');
}