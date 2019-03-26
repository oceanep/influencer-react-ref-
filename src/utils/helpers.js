var _ = require('underscore');

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


function average(array, property) {
    return custom_sum(array.map(item => item[property])) / (array.length || 1);
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


/**
 * _.get() polyfill for q&d implementation.
 * lodash has _.get(data, path, defaultValue), but underscore does not.
 * makes data traversal so nice.
 * see https://lodash.com/docs/4.17.4#get
 */
let custom_get;
typeof custom_get === 'function' || (function(){
    var at = function get(object, pathString, defaultValue){

        // Coerce pathString to a string (even it turns into "[object Object]").
        var parts = (pathString + '').split('.');
        var length = parts.length;
        var i = 0;

        // In case object isn't a real object, set it to undefined.
        var value = object === Object(object) ? object : undefined;

        while (value != null && i < length) {
            value = value[parts[i++]];
        }

        /**
         * lodash.get() returns the resolved value if
         * 1. iteration happened (i > 0)
         * 2. iteration completed (i === length)
         * 3. the value at the path is found in the data structure (not undefined). Note that if the path is found but the
         *    value is null, then null is returned.
         * If any of those checks fails, return the defaultValue param, if provided.
         */
        return i && i === length && value !== undefined ? value : defaultValue;
    };

    custom_get = at;
}());

let custom_sum;
typeof custom_sum === 'function' || (function(){
    custom_sum = function (array, callback){
        if (isString(callback)) {
            callback = getProp(callback);
        } else if (!callback) {
            callback = function(item){
                return item;
            };
        } else if (!isFunction(callback)){
            return null;
        }

        return array.map(callback).reduce(function(sum, item){
            return sum += Number(item) || 0;
        }, 0);
    };
}());
