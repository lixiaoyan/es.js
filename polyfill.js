if(!Object.getPrototypeOf) {
  Object.getPrototypeOf = function(O) {
    return O.__proto__;
  };
}

if(!Object.setPrototypeOf) {
  Object.setPrototypeOf = function(O, proto) {
    O.__proto__ = proto;
    return O;
  };
}
