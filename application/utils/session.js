let _ = require("lodash");

let Session = {};

function set(uid,key,value){
    _.set(Session,`[${uid}][${key}]`,value);
    return _.get(Session,`[${uid}][${key}]`,null);
}
function get(uid,key){
    return _.get(Session,`[${uid}][${key}]`,null);
}

function getAll(uid){
    return _.get(Session,`[${uid}]`,null);
}


module.exports = {set,get,getAll};