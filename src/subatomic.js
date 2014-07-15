/*! subtomic.js v0.1 | (c) 2014 Metric.io | Thomas Marks */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory(root));
  } else if (typeof exports === 'object') {
    module.exports = factory;
  } else {
    root.subatomic = factory(root);
  }
})(this, function (root) {
  'use strict';
  var exports, callbacks;

  function parse(req) {
    var result;
    try {
      result = JSON.parse(req.responseText);
    } catch (e) {
      result = req.responseText;
    }
    return [result, req];
  }

  function xhr(options) {
    var type,
        url,
        data,
        methods,
        XHR,
        request,
        MSObj;

    type = options.type;
    url = options.url;
    data = options.data;

    methods = {
      success: options.success || function () {},
      error: options.error || function () {}
    };

    XHR = root.XMLHttpRequest  || ActiveXObject;
    MSObj = ['.6.0', ''];
    for(var i = 0; i < MSObj.length; i++) {
      try{
        request = new XHR('MSXML2.XMLHTTP' + MSObj[i]);
        break;
      }catch(e){}
    }
    if(!request) {
      throw new Error('XMLHttpRequest not supported in this browser');
    }
    
    request.open(type, url, true);
    if(data) {
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
          methods.success.apply(methods, parse(request));
        } else {
          methods.error.apply(methods, parse(request));
        }
      }
    };
    request.send(data);
    callbacks = {
      success: function (callback) {
        methods.success = callback;
        return callbacks;
      },
      error: function (callback) {
        methods.error = callback;
        return callbacks;
      }
    };

    return callbacks;
  }

  exports = {
    get: function (options) {
      options.type = 'GET';
      return xhr(options);
    },
    post: function (options) {
      options.type = 'POST';
      return xhr(options);
    }
  };

  return exports;

});
