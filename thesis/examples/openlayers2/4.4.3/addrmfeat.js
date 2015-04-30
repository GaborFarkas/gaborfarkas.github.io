function addrmfeat() {
    evt = function(){/*Do something*/};
    lyr.events.on({featureadded: evt});
    lyr.events.on({featureremoved: evt});
}