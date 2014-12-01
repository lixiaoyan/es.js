var $ = {};

$.helper = {};

$.helper.CreateObject = function() {
  return {};
};

$.helper.InitObject = function(O) {};

$.helper.Get = function(O, name) {
  if($.internal.hasOwnProperty(name)) {
    return $.internal[name].bind(O);
  }
  switch(name) {
    case "[[Prototype]]": {
      return Object.getPrototypeOf(O);
    }
  }
  console.warn("Not Implement: get %o on %o.", name, O);
  return null;
};

$.helper.Set = function(O, name, value) {
  if($.internal.hasOwnProperty(name)) {
    return;
  }
  switch(name) {
    case "[[Prototype]]": {
      Object.setPrototypeOf(O, value);
      return;
    }
  }
  console.warn("Not Implement: set %o to %o on %o.", name, value, O);
};

$.Type = function(O) {
  if(O === null) {
    return "Null";
  }
  switch(typeof O) {
    case "undefined":
      return "Undefined";
    case "boolean":
      return "Boolean";
    case "number":
      return "Number";
    case "string":
      return "String";
    case "object":
    case "function":
      return "Object";
  }
  return "";
};

$.internal = {};

$.internal["[[Get]]"] = function(P) {
  var O = this;
  return O[P];
};

$.internal["[[Call]]"] = function(thisArg, argList) {
  var F = this;
  return F.apply(thisArg, argList);
};

$.internal["[[Construct]]"] = function(argList) {
  var F = this;
  var obj = $.helper.CreateObject();
  $.helper.InitObject(obj);
  $.helper.Set(obj, "[[Class]]", "Object");
  $.helper.Set(obj, "[[Extensible]]", true);
  var proto = $.helper.Get(F, "[[Get]]")("prototype");
  if($.Type(proto) === "Object") {
    $.helper.Set(obj, "[[Prototype]]", proto);
  } else {
    $.helper.Set(obj, "[[Prototype]]", Object.prototype);
  }
  var result = $.helper.Get(F, "[[Call]]")(obj, argList);
  if($.Type(result) === "Object") {
    return result;
  }
  return obj;
};

$.operator = {};

$.operator["new"] = function(constructor, argList) {
  return $.helper.Get(constructor, "[[Construct]]")(argList);
};
