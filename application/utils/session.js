let _ = require("lodash");

let Session = {};

function set(uid,key,value){
    _.set(Session,`[${uid}][${key}]`,value);
    console.log(Session);
    return _.get(Session,`[${uid}][${key}]`,null);
}
function get(uid,key){
    console.log(Session);
    return _.get(Session,`[${uid}][${key}]`,null);
}

function getAll(uid){
    console.log(Session);
    return _.get(Session,`[${uid}]`,null);
}


module.exports = {set,get,getAll};