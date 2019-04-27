var _ = require('underscore');



function clearObjectURL(){
  if (this.objectURLs) {
    this.objectURLs.forEach(function(objURL) {
      URL.revokeObjectURL(objURL);
    });
    this.objectURLs = null;
  }
};

function createObjectURL(blob){
  var objURL = URL.createObjectURL(blob);
  this.objectURLs = this.objectURLs || [];
  this.objectURLs.push(objURL);
  return objURL;
};

function getProp(name){
    return function(object){
        return object[name];
    }
}

function isString(param) {
    return toString.call(param) === '[object String]';
}

function isFunction(param) {
    return param instanceof Function;
}

function isEmpty (obj) {
    // null and undefined are "empty"
    if (obj == null) {
        return true;
    }
    // if number
    if (typeof(obj) === 'number' || obj === true) {
        return false;
    }
    // Assume if it has a length property with a non-zero value that that property is correct.
    if (obj.length) {
        return false;
    }
    if (obj.length === 0) {
        return true;
    }
    // Otherwise, does it have any properties of its own? Note that this doesn't handle toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }

    return true;
}


function promiseWaterfall(array, callback){
    return array.reduce((tasks, item) => {
        return tasks.then(res => {
            return callback(item).then(result => {
                res.push(result);
                return res;
            });
        });
    }, Promise.resolve([]))
}

function extractQueryParam(url, param) {
    url = new URL(url);
    return url.searchParams.get(param);
}
