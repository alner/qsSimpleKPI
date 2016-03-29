/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(56);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__resourceQuery) {var io = __webpack_require__(2);
	var stripAnsi = __webpack_require__(54);
	var scriptElements = document.getElementsByTagName("script");
	io = io.connect( true ?
		__resourceQuery.substr(1) :
		scriptElements[scriptElements.length-1].getAttribute("src").replace(/\/[^\/]+$/, "")
	);
	
	var hot = false;
	var initial = true;
	var currentHash = "";
	
	io.on("hot", function() {
		hot = true;
		console.log("[WDS] Hot Module Replacement enabled.");
	});
	
	io.on("invalid", function() {
		console.log("[WDS] App updated. Recompiling...");
	});
	
	io.on("hash", function(hash) {
		currentHash = hash;
	});
	
	io.on("still-ok", function() {
		console.log("[WDS] Nothing changed.")
	});
	
	io.on("ok", function() {
		if(initial) return initial = false;
		reloadApp();
	});
	
	io.on("warnings", function(warnings) {
		console.log("[WDS] Warnings while compiling.");
		for(var i = 0; i < warnings.length; i++)
			console.warn(stripAnsi(warnings[i]));
		if(initial) return initial = false;
		reloadApp();
	});
	
	io.on("errors", function(errors) {
		console.log("[WDS] Errors while compiling.");
		for(var i = 0; i < errors.length; i++)
			console.error(stripAnsi(errors[i]));
		if(initial) return initial = false;
		reloadApp();
	});
	
	io.on("proxy-error", function(errors) {
		console.log("[WDS] Proxy error.");
		for(var i = 0; i < errors.length; i++)
			console.error(stripAnsi(errors[i]));
		if(initial) return initial = false;
		reloadApp();
	});
	
	io.on("disconnect", function() {
		console.error("[WDS] Disconnected!");
	});
	
	function reloadApp() {
		if(hot) {
			console.log("[WDS] App hot update...");
			window.postMessage("webpackHotUpdate" + currentHash, "*");
		} else {
			console.log("[WDS] App updated. Reloading...");
			window.location.reload();
		}
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, "?http://localhost:8080"))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	
	module.exports = __webpack_require__(3);


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var url = __webpack_require__(4);
	var parser = __webpack_require__(7);
	var Manager = __webpack_require__(14);
	var debug = __webpack_require__(6)('socket.io-client');
	
	/**
	 * Module exports.
	 */
	
	module.exports = exports = lookup;
	
	/**
	 * Managers cache.
	 */
	
	var cache = exports.managers = {};
	
	/**
	 * Looks up an existing `Manager` for multiplexing.
	 * If the user summons:
	 *
	 *   `io('http://localhost/a');`
	 *   `io('http://localhost/b');`
	 *
	 * We reuse the existing instance based on same scheme/port/host,
	 * and we initialize sockets for each namespace.
	 *
	 * @api public
	 */
	
	function lookup(uri, opts) {
	  if (typeof uri == 'object') {
	    opts = uri;
	    uri = undefined;
	  }
	
	  opts = opts || {};
	
	  var parsed = url(uri);
	  var source = parsed.source;
	  var id = parsed.id;
	  var io;
	
	  if (opts.forceNew || opts['force new connection'] || false === opts.multiplex) {
	    debug('ignoring socket cache for %s', source);
	    io = Manager(source, opts);
	  } else {
	    if (!cache[id]) {
	      debug('new io instance for %s', source);
	      cache[id] = Manager(source, opts);
	    }
	    io = cache[id];
	  }
	
	  return io.socket(parsed.path);
	}
	
	/**
	 * Protocol version.
	 *
	 * @api public
	 */
	
	exports.protocol = parser.protocol;
	
	/**
	 * `connect`.
	 *
	 * @param {String} uri
	 * @api public
	 */
	
	exports.connect = lookup;
	
	/**
	 * Expose constructors for standalone build.
	 *
	 * @api public
	 */
	
	exports.Manager = __webpack_require__(14);
	exports.Socket = __webpack_require__(46);


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {
	/**
	 * Module dependencies.
	 */
	
	var parseuri = __webpack_require__(5);
	var debug = __webpack_require__(6)('socket.io-client:url');
	
	/**
	 * Module exports.
	 */
	
	module.exports = url;
	
	/**
	 * URL parser.
	 *
	 * @param {String} url
	 * @param {Object} An object meant to mimic window.location.
	 *                 Defaults to window.location.
	 * @api public
	 */
	
	function url(uri, loc){
	  var obj = uri;
	
	  // default to window.location
	  var loc = loc || global.location;
	  if (null == uri) uri = loc.protocol + '//' + loc.host;
	
	  // relative path support
	  if ('string' == typeof uri) {
	    if ('/' == uri.charAt(0)) {
	      if ('/' == uri.charAt(1)) {
	        uri = loc.protocol + uri;
	      } else {
	        uri = loc.hostname + uri;
	      }
	    }
	
	    if (!/^(https?|wss?):\/\//.test(uri)) {
	      debug('protocol-less url %s', uri);
	      if ('undefined' != typeof loc) {
	        uri = loc.protocol + '//' + uri;
	      } else {
	        uri = 'https://' + uri;
	      }
	    }
	
	    // parse
	    debug('parse %s', uri);
	    obj = parseuri(uri);
	  }
	
	  // make sure we treat `localhost:80` and `localhost` equally
	  if (!obj.port) {
	    if (/^(http|ws)$/.test(obj.protocol)) {
	      obj.port = '80';
	    }
	    else if (/^(http|ws)s$/.test(obj.protocol)) {
	      obj.port = '443';
	    }
	  }
	
	  obj.path = obj.path || '/';
	
	  // define unique id
	  obj.id = obj.protocol + '://' + obj.host + ':' + obj.port;
	  // define href
	  obj.href = obj.protocol + '://' + obj.host + (loc && loc.port == obj.port ? '' : (':' + obj.port));
	
	  return obj;
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * Parses an URI
	 *
	 * @author Steven Levithan <stevenlevithan.com> (MIT license)
	 * @api private
	 */
	
	var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
	
	var parts = [
	    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host'
	  , 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
	];
	
	module.exports = function parseuri(str) {
	  var m = re.exec(str || '')
	    , uri = {}
	    , i = 14;
	
	  while (i--) {
	    uri[parts[i]] = m[i] || '';
	  }
	
	  return uri;
	};


/***/ },
/* 6 */
/***/ function(module, exports) {

	
	/**
	 * Expose `debug()` as the module.
	 */
	
	module.exports = debug;
	
	/**
	 * Create a debugger with the given `name`.
	 *
	 * @param {String} name
	 * @return {Type}
	 * @api public
	 */
	
	function debug(name) {
	  if (!debug.enabled(name)) return function(){};
	
	  return function(fmt){
	    fmt = coerce(fmt);
	
	    var curr = new Date;
	    var ms = curr - (debug[name] || curr);
	    debug[name] = curr;
	
	    fmt = name
	      + ' '
	      + fmt
	      + ' +' + debug.humanize(ms);
	
	    // This hackery is required for IE8
	    // where `console.log` doesn't have 'apply'
	    window.console
	      && console.log
	      && Function.prototype.apply.call(console.log, console, arguments);
	  }
	}
	
	/**
	 * The currently active debug mode names.
	 */
	
	debug.names = [];
	debug.skips = [];
	
	/**
	 * Enables a debug mode by name. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} name
	 * @api public
	 */
	
	debug.enable = function(name) {
	  try {
	    localStorage.debug = name;
	  } catch(e){}
	
	  var split = (name || '').split(/[\s,]+/)
	    , len = split.length;
	
	  for (var i = 0; i < len; i++) {
	    name = split[i].replace('*', '.*?');
	    if (name[0] === '-') {
	      debug.skips.push(new RegExp('^' + name.substr(1) + '$'));
	    }
	    else {
	      debug.names.push(new RegExp('^' + name + '$'));
	    }
	  }
	};
	
	/**
	 * Disable debug output.
	 *
	 * @api public
	 */
	
	debug.disable = function(){
	  debug.enable('');
	};
	
	/**
	 * Humanize the given `ms`.
	 *
	 * @param {Number} m
	 * @return {String}
	 * @api private
	 */
	
	debug.humanize = function(ms) {
	  var sec = 1000
	    , min = 60 * 1000
	    , hour = 60 * min;
	
	  if (ms >= hour) return (ms / hour).toFixed(1) + 'h';
	  if (ms >= min) return (ms / min).toFixed(1) + 'm';
	  if (ms >= sec) return (ms / sec | 0) + 's';
	  return ms + 'ms';
	};
	
	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */
	
	debug.enabled = function(name) {
	  for (var i = 0, len = debug.skips.length; i < len; i++) {
	    if (debug.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (var i = 0, len = debug.names.length; i < len; i++) {
	    if (debug.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	};
	
	/**
	 * Coerce `val`.
	 */
	
	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}
	
	// persist
	
	try {
	  if (window.localStorage) debug.enable(localStorage.debug);
	} catch(e){}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var debug = __webpack_require__(6)('socket.io-parser');
	var json = __webpack_require__(8);
	var isArray = __webpack_require__(10);
	var Emitter = __webpack_require__(11);
	var binary = __webpack_require__(12);
	var isBuf = __webpack_require__(13);
	
	/**
	 * Protocol version.
	 *
	 * @api public
	 */
	
	exports.protocol = 4;
	
	/**
	 * Packet types.
	 *
	 * @api public
	 */
	
	exports.types = [
	  'CONNECT',
	  'DISCONNECT',
	  'EVENT',
	  'BINARY_EVENT',
	  'ACK',
	  'BINARY_ACK',
	  'ERROR'
	];
	
	/**
	 * Packet type `connect`.
	 *
	 * @api public
	 */
	
	exports.CONNECT = 0;
	
	/**
	 * Packet type `disconnect`.
	 *
	 * @api public
	 */
	
	exports.DISCONNECT = 1;
	
	/**
	 * Packet type `event`.
	 *
	 * @api public
	 */
	
	exports.EVENT = 2;
	
	/**
	 * Packet type `ack`.
	 *
	 * @api public
	 */
	
	exports.ACK = 3;
	
	/**
	 * Packet type `error`.
	 *
	 * @api public
	 */
	
	exports.ERROR = 4;
	
	/**
	 * Packet type 'binary event'
	 *
	 * @api public
	 */
	
	exports.BINARY_EVENT = 5;
	
	/**
	 * Packet type `binary ack`. For acks with binary arguments.
	 *
	 * @api public
	 */
	
	exports.BINARY_ACK = 6;
	
	/**
	 * Encoder constructor.
	 *
	 * @api public
	 */
	
	exports.Encoder = Encoder;
	
	/**
	 * Decoder constructor.
	 *
	 * @api public
	 */
	
	exports.Decoder = Decoder;
	
	/**
	 * A socket.io Encoder instance
	 *
	 * @api public
	 */
	
	function Encoder() {}
	
	/**
	 * Encode a packet as a single string if non-binary, or as a
	 * buffer sequence, depending on packet type.
	 *
	 * @param {Object} obj - packet object
	 * @param {Function} callback - function to handle encodings (likely engine.write)
	 * @return Calls callback with Array of encodings
	 * @api public
	 */
	
	Encoder.prototype.encode = function(obj, callback){
	  debug('encoding packet %j', obj);
	
	  if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
	    encodeAsBinary(obj, callback);
	  }
	  else {
	    var encoding = encodeAsString(obj);
	    callback([encoding]);
	  }
	};
	
	/**
	 * Encode packet as string.
	 *
	 * @param {Object} packet
	 * @return {String} encoded
	 * @api private
	 */
	
	function encodeAsString(obj) {
	  var str = '';
	  var nsp = false;
	
	  // first is type
	  str += obj.type;
	
	  // attachments if we have them
	  if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
	    str += obj.attachments;
	    str += '-';
	  }
	
	  // if we have a namespace other than `/`
	  // we append it followed by a comma `,`
	  if (obj.nsp && '/' != obj.nsp) {
	    nsp = true;
	    str += obj.nsp;
	  }
	
	  // immediately followed by the id
	  if (null != obj.id) {
	    if (nsp) {
	      str += ',';
	      nsp = false;
	    }
	    str += obj.id;
	  }
	
	  // json data
	  if (null != obj.data) {
	    if (nsp) str += ',';
	    str += json.stringify(obj.data);
	  }
	
	  debug('encoded %j as %s', obj, str);
	  return str;
	}
	
	/**
	 * Encode packet as 'buffer sequence' by removing blobs, and
	 * deconstructing packet into object with placeholders and
	 * a list of buffers.
	 *
	 * @param {Object} packet
	 * @return {Buffer} encoded
	 * @api private
	 */
	
	function encodeAsBinary(obj, callback) {
	
	  function writeEncoding(bloblessData) {
	    var deconstruction = binary.deconstructPacket(bloblessData);
	    var pack = encodeAsString(deconstruction.packet);
	    var buffers = deconstruction.buffers;
	
	    buffers.unshift(pack); // add packet info to beginning of data list
	    callback(buffers); // write all the buffers
	  }
	
	  binary.removeBlobs(obj, writeEncoding);
	}
	
	/**
	 * A socket.io Decoder instance
	 *
	 * @return {Object} decoder
	 * @api public
	 */
	
	function Decoder() {
	  this.reconstructor = null;
	}
	
	/**
	 * Mix in `Emitter` with Decoder.
	 */
	
	Emitter(Decoder.prototype);
	
	/**
	 * Decodes an ecoded packet string into packet JSON.
	 *
	 * @param {String} obj - encoded packet
	 * @return {Object} packet
	 * @api public
	 */
	
	Decoder.prototype.add = function(obj) {
	  var packet;
	  if ('string' == typeof obj) {
	    packet = decodeString(obj);
	    if (exports.BINARY_EVENT == packet.type || exports.BINARY_ACK == packet.type) { // binary packet's json
	      this.reconstructor = new BinaryReconstructor(packet);
	
	      // no attachments, labeled binary but no binary data to follow
	      if (this.reconstructor.reconPack.attachments === 0) {
	        this.emit('decoded', packet);
	      }
	    } else { // non-binary full packet
	      this.emit('decoded', packet);
	    }
	  }
	  else if (isBuf(obj) || obj.base64) { // raw binary data
	    if (!this.reconstructor) {
	      throw new Error('got binary data when not reconstructing a packet');
	    } else {
	      packet = this.reconstructor.takeBinaryData(obj);
	      if (packet) { // received final buffer
	        this.reconstructor = null;
	        this.emit('decoded', packet);
	      }
	    }
	  }
	  else {
	    throw new Error('Unknown type: ' + obj);
	  }
	};
	
	/**
	 * Decode a packet String (JSON data)
	 *
	 * @param {String} str
	 * @return {Object} packet
	 * @api private
	 */
	
	function decodeString(str) {
	  var p = {};
	  var i = 0;
	
	  // look up type
	  p.type = Number(str.charAt(0));
	  if (null == exports.types[p.type]) return error();
	
	  // look up attachments if type binary
	  if (exports.BINARY_EVENT == p.type || exports.BINARY_ACK == p.type) {
	    var buf = '';
	    while (str.charAt(++i) != '-') {
	      buf += str.charAt(i);
	      if (i == str.length) break;
	    }
	    if (buf != Number(buf) || str.charAt(i) != '-') {
	      throw new Error('Illegal attachments');
	    }
	    p.attachments = Number(buf);
	  }
	
	  // look up namespace (if any)
	  if ('/' == str.charAt(i + 1)) {
	    p.nsp = '';
	    while (++i) {
	      var c = str.charAt(i);
	      if (',' == c) break;
	      p.nsp += c;
	      if (i == str.length) break;
	    }
	  } else {
	    p.nsp = '/';
	  }
	
	  // look up id
	  var next = str.charAt(i + 1);
	  if ('' !== next && Number(next) == next) {
	    p.id = '';
	    while (++i) {
	      var c = str.charAt(i);
	      if (null == c || Number(c) != c) {
	        --i;
	        break;
	      }
	      p.id += str.charAt(i);
	      if (i == str.length) break;
	    }
	    p.id = Number(p.id);
	  }
	
	  // look up json data
	  if (str.charAt(++i)) {
	    try {
	      p.data = json.parse(str.substr(i));
	    } catch(e){
	      return error();
	    }
	  }
	
	  debug('decoded %s as %j', str, p);
	  return p;
	}
	
	/**
	 * Deallocates a parser's resources
	 *
	 * @api public
	 */
	
	Decoder.prototype.destroy = function() {
	  if (this.reconstructor) {
	    this.reconstructor.finishedReconstruction();
	  }
	};
	
	/**
	 * A manager of a binary event's 'buffer sequence'. Should
	 * be constructed whenever a packet of type BINARY_EVENT is
	 * decoded.
	 *
	 * @param {Object} packet
	 * @return {BinaryReconstructor} initialized reconstructor
	 * @api private
	 */
	
	function BinaryReconstructor(packet) {
	  this.reconPack = packet;
	  this.buffers = [];
	}
	
	/**
	 * Method to be called when binary data received from connection
	 * after a BINARY_EVENT packet.
	 *
	 * @param {Buffer | ArrayBuffer} binData - the raw binary data received
	 * @return {null | Object} returns null if more binary data is expected or
	 *   a reconstructed packet object if all buffers have been received.
	 * @api private
	 */
	
	BinaryReconstructor.prototype.takeBinaryData = function(binData) {
	  this.buffers.push(binData);
	  if (this.buffers.length == this.reconPack.attachments) { // done with buffer list
	    var packet = binary.reconstructPacket(this.reconPack, this.buffers);
	    this.finishedReconstruction();
	    return packet;
	  }
	  return null;
	};
	
	/**
	 * Cleans up binary packet reconstruction variables.
	 *
	 * @api private
	 */
	
	BinaryReconstructor.prototype.finishedReconstruction = function() {
	  this.reconPack = null;
	  this.buffers = [];
	};
	
	function error(data){
	  return {
	    type: exports.ERROR,
	    data: 'parser error'
	  };
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*! JSON v3.2.6 | http://bestiejs.github.io/json3 | Copyright 2012-2013, Kit Cambridge | http://kit.mit-license.org */
	;(function (window) {
	  // Convenience aliases.
	  var getClass = {}.toString, isProperty, forEach, undef;
	
	  // Detect the `define` function exposed by asynchronous module loaders. The
	  // strict `define` check is necessary for compatibility with `r.js`.
	  var isLoader = "function" === "function" && __webpack_require__(9);
	
	  // Detect native implementations.
	  var nativeJSON = typeof JSON == "object" && JSON;
	
	  // Set up the JSON 3 namespace, preferring the CommonJS `exports` object if
	  // available.
	  var JSON3 = typeof exports == "object" && exports && !exports.nodeType && exports;
	
	  if (JSON3 && nativeJSON) {
	    // Explicitly delegate to the native `stringify` and `parse`
	    // implementations in CommonJS environments.
	    JSON3.stringify = nativeJSON.stringify;
	    JSON3.parse = nativeJSON.parse;
	  } else {
	    // Export for web browsers, JavaScript engines, and asynchronous module
	    // loaders, using the global `JSON` object if available.
	    JSON3 = window.JSON = nativeJSON || {};
	  }
	
	  // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
	  var isExtended = new Date(-3509827334573292);
	  try {
	    // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
	    // results for certain dates in Opera >= 10.53.
	    isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
	      // Safari < 2.0.2 stores the internal millisecond time value correctly,
	      // but clips the values returned by the date methods to the range of
	      // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
	      isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
	  } catch (exception) {}
	
	  // Internal: Determines whether the native `JSON.stringify` and `parse`
	  // implementations are spec-compliant. Based on work by Ken Snyder.
	  function has(name) {
	    if (has[name] !== undef) {
	      // Return cached feature test result.
	      return has[name];
	    }
	
	    var isSupported;
	    if (name == "bug-string-char-index") {
	      // IE <= 7 doesn't support accessing string characters using square
	      // bracket notation. IE 8 only supports this for primitives.
	      isSupported = "a"[0] != "a";
	    } else if (name == "json") {
	      // Indicates whether both `JSON.stringify` and `JSON.parse` are
	      // supported.
	      isSupported = has("json-stringify") && has("json-parse");
	    } else {
	      var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
	      // Test `JSON.stringify`.
	      if (name == "json-stringify") {
	        var stringify = JSON3.stringify, stringifySupported = typeof stringify == "function" && isExtended;
	        if (stringifySupported) {
	          // A test function object with a custom `toJSON` method.
	          (value = function () {
	            return 1;
	          }).toJSON = value;
	          try {
	            stringifySupported =
	              // Firefox 3.1b1 and b2 serialize string, number, and boolean
	              // primitives as object literals.
	              stringify(0) === "0" &&
	              // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
	              // literals.
	              stringify(new Number()) === "0" &&
	              stringify(new String()) == '""' &&
	              // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
	              // does not define a canonical JSON representation (this applies to
	              // objects with `toJSON` properties as well, *unless* they are nested
	              // within an object or array).
	              stringify(getClass) === undef &&
	              // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
	              // FF 3.1b3 pass this test.
	              stringify(undef) === undef &&
	              // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
	              // respectively, if the value is omitted entirely.
	              stringify() === undef &&
	              // FF 3.1b1, 2 throw an error if the given value is not a number,
	              // string, array, object, Boolean, or `null` literal. This applies to
	              // objects with custom `toJSON` methods as well, unless they are nested
	              // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
	              // methods entirely.
	              stringify(value) === "1" &&
	              stringify([value]) == "[1]" &&
	              // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
	              // `"[null]"`.
	              stringify([undef]) == "[null]" &&
	              // YUI 3.0.0b1 fails to serialize `null` literals.
	              stringify(null) == "null" &&
	              // FF 3.1b1, 2 halts serialization if an array contains a function:
	              // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
	              // elides non-JSON values from objects and arrays, unless they
	              // define custom `toJSON` methods.
	              stringify([undef, getClass, null]) == "[null,null,null]" &&
	              // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
	              // where character escape codes are expected (e.g., `\b` => `\u0008`).
	              stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
	              // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
	              stringify(null, value) === "1" &&
	              stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
	              // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
	              // serialize extended years.
	              stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
	              // The milliseconds are optional in ES 5, but required in 5.1.
	              stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
	              // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
	              // four-digit years instead of six-digit years. Credits: @Yaffle.
	              stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
	              // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
	              // values less than 1000. Credits: @Yaffle.
	              stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
	          } catch (exception) {
	            stringifySupported = false;
	          }
	        }
	        isSupported = stringifySupported;
	      }
	      // Test `JSON.parse`.
	      if (name == "json-parse") {
	        var parse = JSON3.parse;
	        if (typeof parse == "function") {
	          try {
	            // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
	            // Conforming implementations should also coerce the initial argument to
	            // a string prior to parsing.
	            if (parse("0") === 0 && !parse(false)) {
	              // Simple parsing test.
	              value = parse(serialized);
	              var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
	              if (parseSupported) {
	                try {
	                  // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
	                  parseSupported = !parse('"\t"');
	                } catch (exception) {}
	                if (parseSupported) {
	                  try {
	                    // FF 4.0 and 4.0.1 allow leading `+` signs and leading
	                    // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
	                    // certain octal literals.
	                    parseSupported = parse("01") !== 1;
	                  } catch (exception) {}
	                }
	                if (parseSupported) {
	                  try {
	                    // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
	                    // points. These environments, along with FF 3.1b1 and 2,
	                    // also allow trailing commas in JSON objects and arrays.
	                    parseSupported = parse("1.") !== 1;
	                  } catch (exception) {}
	                }
	              }
	            }
	          } catch (exception) {
	            parseSupported = false;
	          }
	        }
	        isSupported = parseSupported;
	      }
	    }
	    return has[name] = !!isSupported;
	  }
	
	  if (!has("json")) {
	    // Common `[[Class]]` name aliases.
	    var functionClass = "[object Function]";
	    var dateClass = "[object Date]";
	    var numberClass = "[object Number]";
	    var stringClass = "[object String]";
	    var arrayClass = "[object Array]";
	    var booleanClass = "[object Boolean]";
	
	    // Detect incomplete support for accessing string characters by index.
	    var charIndexBuggy = has("bug-string-char-index");
	
	    // Define additional utility methods if the `Date` methods are buggy.
	    if (!isExtended) {
	      var floor = Math.floor;
	      // A mapping between the months of the year and the number of days between
	      // January 1st and the first of the respective month.
	      var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
	      // Internal: Calculates the number of days between the Unix epoch and the
	      // first day of the given month.
	      var getDay = function (year, month) {
	        return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
	      };
	    }
	
	    // Internal: Determines if a property is a direct property of the given
	    // object. Delegates to the native `Object#hasOwnProperty` method.
	    if (!(isProperty = {}.hasOwnProperty)) {
	      isProperty = function (property) {
	        var members = {}, constructor;
	        if ((members.__proto__ = null, members.__proto__ = {
	          // The *proto* property cannot be set multiple times in recent
	          // versions of Firefox and SeaMonkey.
	          "toString": 1
	        }, members).toString != getClass) {
	          // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
	          // supports the mutable *proto* property.
	          isProperty = function (property) {
	            // Capture and break the object's prototype chain (see section 8.6.2
	            // of the ES 5.1 spec). The parenthesized expression prevents an
	            // unsafe transformation by the Closure Compiler.
	            var original = this.__proto__, result = property in (this.__proto__ = null, this);
	            // Restore the original prototype chain.
	            this.__proto__ = original;
	            return result;
	          };
	        } else {
	          // Capture a reference to the top-level `Object` constructor.
	          constructor = members.constructor;
	          // Use the `constructor` property to simulate `Object#hasOwnProperty` in
	          // other environments.
	          isProperty = function (property) {
	            var parent = (this.constructor || constructor).prototype;
	            return property in this && !(property in parent && this[property] === parent[property]);
	          };
	        }
	        members = null;
	        return isProperty.call(this, property);
	      };
	    }
	
	    // Internal: A set of primitive types used by `isHostType`.
	    var PrimitiveTypes = {
	      'boolean': 1,
	      'number': 1,
	      'string': 1,
	      'undefined': 1
	    };
	
	    // Internal: Determines if the given object `property` value is a
	    // non-primitive.
	    var isHostType = function (object, property) {
	      var type = typeof object[property];
	      return type == 'object' ? !!object[property] : !PrimitiveTypes[type];
	    };
	
	    // Internal: Normalizes the `for...in` iteration algorithm across
	    // environments. Each enumerated key is yielded to a `callback` function.
	    forEach = function (object, callback) {
	      var size = 0, Properties, members, property;
	
	      // Tests for bugs in the current environment's `for...in` algorithm. The
	      // `valueOf` property inherits the non-enumerable flag from
	      // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
	      (Properties = function () {
	        this.valueOf = 0;
	      }).prototype.valueOf = 0;
	
	      // Iterate over a new instance of the `Properties` class.
	      members = new Properties();
	      for (property in members) {
	        // Ignore all properties inherited from `Object.prototype`.
	        if (isProperty.call(members, property)) {
	          size++;
	        }
	      }
	      Properties = members = null;
	
	      // Normalize the iteration algorithm.
	      if (!size) {
	        // A list of non-enumerable properties inherited from `Object.prototype`.
	        members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
	        // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
	        // properties.
	        forEach = function (object, callback) {
	          var isFunction = getClass.call(object) == functionClass, property, length;
	          var hasProperty = !isFunction && typeof object.constructor != 'function' && isHostType(object, 'hasOwnProperty') ? object.hasOwnProperty : isProperty;
	          for (property in object) {
	            // Gecko <= 1.0 enumerates the `prototype` property of functions under
	            // certain conditions; IE does not.
	            if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
	              callback(property);
	            }
	          }
	          // Manually invoke the callback for each non-enumerable property.
	          for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property));
	        };
	      } else if (size == 2) {
	        // Safari <= 2.0.4 enumerates shadowed properties twice.
	        forEach = function (object, callback) {
	          // Create a set of iterated properties.
	          var members = {}, isFunction = getClass.call(object) == functionClass, property;
	          for (property in object) {
	            // Store each property name to prevent double enumeration. The
	            // `prototype` property of functions is not enumerated due to cross-
	            // environment inconsistencies.
	            if (!(isFunction && property == "prototype") && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)) {
	              callback(property);
	            }
	          }
	        };
	      } else {
	        // No bugs detected; use the standard `for...in` algorithm.
	        forEach = function (object, callback) {
	          var isFunction = getClass.call(object) == functionClass, property, isConstructor;
	          for (property in object) {
	            if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
	              callback(property);
	            }
	          }
	          // Manually invoke the callback for the `constructor` property due to
	          // cross-environment inconsistencies.
	          if (isConstructor || isProperty.call(object, (property = "constructor"))) {
	            callback(property);
	          }
	        };
	      }
	      return forEach(object, callback);
	    };
	
	    // Public: Serializes a JavaScript `value` as a JSON string. The optional
	    // `filter` argument may specify either a function that alters how object and
	    // array members are serialized, or an array of strings and numbers that
	    // indicates which properties should be serialized. The optional `width`
	    // argument may be either a string or number that specifies the indentation
	    // level of the output.
	    if (!has("json-stringify")) {
	      // Internal: A map of control characters and their escaped equivalents.
	      var Escapes = {
	        92: "\\\\",
	        34: '\\"',
	        8: "\\b",
	        12: "\\f",
	        10: "\\n",
	        13: "\\r",
	        9: "\\t"
	      };
	
	      // Internal: Converts `value` into a zero-padded string such that its
	      // length is at least equal to `width`. The `width` must be <= 6.
	      var leadingZeroes = "000000";
	      var toPaddedString = function (width, value) {
	        // The `|| 0` expression is necessary to work around a bug in
	        // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
	        return (leadingZeroes + (value || 0)).slice(-width);
	      };
	
	      // Internal: Double-quotes a string `value`, replacing all ASCII control
	      // characters (characters with code unit values between 0 and 31) with
	      // their escaped equivalents. This is an implementation of the
	      // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
	      var unicodePrefix = "\\u00";
	      var quote = function (value) {
	        var result = '"', index = 0, length = value.length, isLarge = length > 10 && charIndexBuggy, symbols;
	        if (isLarge) {
	          symbols = value.split("");
	        }
	        for (; index < length; index++) {
	          var charCode = value.charCodeAt(index);
	          // If the character is a control character, append its Unicode or
	          // shorthand escape sequence; otherwise, append the character as-is.
	          switch (charCode) {
	            case 8: case 9: case 10: case 12: case 13: case 34: case 92:
	              result += Escapes[charCode];
	              break;
	            default:
	              if (charCode < 32) {
	                result += unicodePrefix + toPaddedString(2, charCode.toString(16));
	                break;
	              }
	              result += isLarge ? symbols[index] : charIndexBuggy ? value.charAt(index) : value[index];
	          }
	        }
	        return result + '"';
	      };
	
	      // Internal: Recursively serializes an object. Implements the
	      // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
	      var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
	        var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
	        try {
	          // Necessary for host object support.
	          value = object[property];
	        } catch (exception) {}
	        if (typeof value == "object" && value) {
	          className = getClass.call(value);
	          if (className == dateClass && !isProperty.call(value, "toJSON")) {
	            if (value > -1 / 0 && value < 1 / 0) {
	              // Dates are serialized according to the `Date#toJSON` method
	              // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
	              // for the ISO 8601 date time string format.
	              if (getDay) {
	                // Manually compute the year, month, date, hours, minutes,
	                // seconds, and milliseconds if the `getUTC*` methods are
	                // buggy. Adapted from @Yaffle's `date-shim` project.
	                date = floor(value / 864e5);
	                for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
	                for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
	                date = 1 + date - getDay(year, month);
	                // The `time` value specifies the time within the day (see ES
	                // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
	                // to compute `A modulo B`, as the `%` operator does not
	                // correspond to the `modulo` operation for negative numbers.
	                time = (value % 864e5 + 864e5) % 864e5;
	                // The hours, minutes, seconds, and milliseconds are obtained by
	                // decomposing the time within the day. See section 15.9.1.10.
	                hours = floor(time / 36e5) % 24;
	                minutes = floor(time / 6e4) % 60;
	                seconds = floor(time / 1e3) % 60;
	                milliseconds = time % 1e3;
	              } else {
	                year = value.getUTCFullYear();
	                month = value.getUTCMonth();
	                date = value.getUTCDate();
	                hours = value.getUTCHours();
	                minutes = value.getUTCMinutes();
	                seconds = value.getUTCSeconds();
	                milliseconds = value.getUTCMilliseconds();
	              }
	              // Serialize extended years correctly.
	              value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
	                "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
	                // Months, dates, hours, minutes, and seconds should have two
	                // digits; milliseconds should have three.
	                "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
	                // Milliseconds are optional in ES 5.0, but required in 5.1.
	                "." + toPaddedString(3, milliseconds) + "Z";
	            } else {
	              value = null;
	            }
	          } else if (typeof value.toJSON == "function" && ((className != numberClass && className != stringClass && className != arrayClass) || isProperty.call(value, "toJSON"))) {
	            // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
	            // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
	            // ignores all `toJSON` methods on these objects unless they are
	            // defined directly on an instance.
	            value = value.toJSON(property);
	          }
	        }
	        if (callback) {
	          // If a replacement function was provided, call it to obtain the value
	          // for serialization.
	          value = callback.call(object, property, value);
	        }
	        if (value === null) {
	          return "null";
	        }
	        className = getClass.call(value);
	        if (className == booleanClass) {
	          // Booleans are represented literally.
	          return "" + value;
	        } else if (className == numberClass) {
	          // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
	          // `"null"`.
	          return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
	        } else if (className == stringClass) {
	          // Strings are double-quoted and escaped.
	          return quote("" + value);
	        }
	        // Recursively serialize objects and arrays.
	        if (typeof value == "object") {
	          // Check for cyclic structures. This is a linear search; performance
	          // is inversely proportional to the number of unique nested objects.
	          for (length = stack.length; length--;) {
	            if (stack[length] === value) {
	              // Cyclic structures cannot be serialized by `JSON.stringify`.
	              throw TypeError();
	            }
	          }
	          // Add the object to the stack of traversed objects.
	          stack.push(value);
	          results = [];
	          // Save the current indentation level and indent one additional level.
	          prefix = indentation;
	          indentation += whitespace;
	          if (className == arrayClass) {
	            // Recursively serialize array elements.
	            for (index = 0, length = value.length; index < length; index++) {
	              element = serialize(index, value, callback, properties, whitespace, indentation, stack);
	              results.push(element === undef ? "null" : element);
	            }
	            result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
	          } else {
	            // Recursively serialize object members. Members are selected from
	            // either a user-specified list of property names, or the object
	            // itself.
	            forEach(properties || value, function (property) {
	              var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
	              if (element !== undef) {
	                // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
	                // is not the empty string, let `member` {quote(property) + ":"}
	                // be the concatenation of `member` and the `space` character."
	                // The "`space` character" refers to the literal space
	                // character, not the `space` {width} argument provided to
	                // `JSON.stringify`.
	                results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
	              }
	            });
	            result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
	          }
	          // Remove the object from the traversed object stack.
	          stack.pop();
	          return result;
	        }
	      };
	
	      // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
	      JSON3.stringify = function (source, filter, width) {
	        var whitespace, callback, properties, className;
	        if (typeof filter == "function" || typeof filter == "object" && filter) {
	          if ((className = getClass.call(filter)) == functionClass) {
	            callback = filter;
	          } else if (className == arrayClass) {
	            // Convert the property names array into a makeshift set.
	            properties = {};
	            for (var index = 0, length = filter.length, value; index < length; value = filter[index++], ((className = getClass.call(value)), className == stringClass || className == numberClass) && (properties[value] = 1));
	          }
	        }
	        if (width) {
	          if ((className = getClass.call(width)) == numberClass) {
	            // Convert the `width` to an integer and create a string containing
	            // `width` number of space characters.
	            if ((width -= width % 1) > 0) {
	              for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ");
	            }
	          } else if (className == stringClass) {
	            whitespace = width.length <= 10 ? width : width.slice(0, 10);
	          }
	        }
	        // Opera <= 7.54u2 discards the values associated with empty string keys
	        // (`""`) only if they are used directly within an object member list
	        // (e.g., `!("" in { "": 1})`).
	        return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
	      };
	    }
	
	    // Public: Parses a JSON source string.
	    if (!has("json-parse")) {
	      var fromCharCode = String.fromCharCode;
	
	      // Internal: A map of escaped control characters and their unescaped
	      // equivalents.
	      var Unescapes = {
	        92: "\\",
	        34: '"',
	        47: "/",
	        98: "\b",
	        116: "\t",
	        110: "\n",
	        102: "\f",
	        114: "\r"
	      };
	
	      // Internal: Stores the parser state.
	      var Index, Source;
	
	      // Internal: Resets the parser state and throws a `SyntaxError`.
	      var abort = function() {
	        Index = Source = null;
	        throw SyntaxError();
	      };
	
	      // Internal: Returns the next token, or `"$"` if the parser has reached
	      // the end of the source string. A token may be a string, number, `null`
	      // literal, or Boolean literal.
	      var lex = function () {
	        var source = Source, length = source.length, value, begin, position, isSigned, charCode;
	        while (Index < length) {
	          charCode = source.charCodeAt(Index);
	          switch (charCode) {
	            case 9: case 10: case 13: case 32:
	              // Skip whitespace tokens, including tabs, carriage returns, line
	              // feeds, and space characters.
	              Index++;
	              break;
	            case 123: case 125: case 91: case 93: case 58: case 44:
	              // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
	              // the current position.
	              value = charIndexBuggy ? source.charAt(Index) : source[Index];
	              Index++;
	              return value;
	            case 34:
	              // `"` delimits a JSON string; advance to the next character and
	              // begin parsing the string. String tokens are prefixed with the
	              // sentinel `@` character to distinguish them from punctuators and
	              // end-of-string tokens.
	              for (value = "@", Index++; Index < length;) {
	                charCode = source.charCodeAt(Index);
	                if (charCode < 32) {
	                  // Unescaped ASCII control characters (those with a code unit
	                  // less than the space character) are not permitted.
	                  abort();
	                } else if (charCode == 92) {
	                  // A reverse solidus (`\`) marks the beginning of an escaped
	                  // control character (including `"`, `\`, and `/`) or Unicode
	                  // escape sequence.
	                  charCode = source.charCodeAt(++Index);
	                  switch (charCode) {
	                    case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114:
	                      // Revive escaped control characters.
	                      value += Unescapes[charCode];
	                      Index++;
	                      break;
	                    case 117:
	                      // `\u` marks the beginning of a Unicode escape sequence.
	                      // Advance to the first character and validate the
	                      // four-digit code point.
	                      begin = ++Index;
	                      for (position = Index + 4; Index < position; Index++) {
	                        charCode = source.charCodeAt(Index);
	                        // A valid sequence comprises four hexdigits (case-
	                        // insensitive) that form a single hexadecimal value.
	                        if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
	                          // Invalid Unicode escape sequence.
	                          abort();
	                        }
	                      }
	                      // Revive the escaped character.
	                      value += fromCharCode("0x" + source.slice(begin, Index));
	                      break;
	                    default:
	                      // Invalid escape sequence.
	                      abort();
	                  }
	                } else {
	                  if (charCode == 34) {
	                    // An unescaped double-quote character marks the end of the
	                    // string.
	                    break;
	                  }
	                  charCode = source.charCodeAt(Index);
	                  begin = Index;
	                  // Optimize for the common case where a string is valid.
	                  while (charCode >= 32 && charCode != 92 && charCode != 34) {
	                    charCode = source.charCodeAt(++Index);
	                  }
	                  // Append the string as-is.
	                  value += source.slice(begin, Index);
	                }
	              }
	              if (source.charCodeAt(Index) == 34) {
	                // Advance to the next character and return the revived string.
	                Index++;
	                return value;
	              }
	              // Unterminated string.
	              abort();
	            default:
	              // Parse numbers and literals.
	              begin = Index;
	              // Advance past the negative sign, if one is specified.
	              if (charCode == 45) {
	                isSigned = true;
	                charCode = source.charCodeAt(++Index);
	              }
	              // Parse an integer or floating-point value.
	              if (charCode >= 48 && charCode <= 57) {
	                // Leading zeroes are interpreted as octal literals.
	                if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
	                  // Illegal octal literal.
	                  abort();
	                }
	                isSigned = false;
	                // Parse the integer component.
	                for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++);
	                // Floats cannot contain a leading decimal point; however, this
	                // case is already accounted for by the parser.
	                if (source.charCodeAt(Index) == 46) {
	                  position = ++Index;
	                  // Parse the decimal component.
	                  for (; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
	                  if (position == Index) {
	                    // Illegal trailing decimal.
	                    abort();
	                  }
	                  Index = position;
	                }
	                // Parse exponents. The `e` denoting the exponent is
	                // case-insensitive.
	                charCode = source.charCodeAt(Index);
	                if (charCode == 101 || charCode == 69) {
	                  charCode = source.charCodeAt(++Index);
	                  // Skip past the sign following the exponent, if one is
	                  // specified.
	                  if (charCode == 43 || charCode == 45) {
	                    Index++;
	                  }
	                  // Parse the exponential component.
	                  for (position = Index; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
	                  if (position == Index) {
	                    // Illegal empty exponent.
	                    abort();
	                  }
	                  Index = position;
	                }
	                // Coerce the parsed value to a JavaScript number.
	                return +source.slice(begin, Index);
	              }
	              // A negative sign may only precede numbers.
	              if (isSigned) {
	                abort();
	              }
	              // `true`, `false`, and `null` literals.
	              if (source.slice(Index, Index + 4) == "true") {
	                Index += 4;
	                return true;
	              } else if (source.slice(Index, Index + 5) == "false") {
	                Index += 5;
	                return false;
	              } else if (source.slice(Index, Index + 4) == "null") {
	                Index += 4;
	                return null;
	              }
	              // Unrecognized token.
	              abort();
	          }
	        }
	        // Return the sentinel `$` character if the parser has reached the end
	        // of the source string.
	        return "$";
	      };
	
	      // Internal: Parses a JSON `value` token.
	      var get = function (value) {
	        var results, hasMembers;
	        if (value == "$") {
	          // Unexpected end of input.
	          abort();
	        }
	        if (typeof value == "string") {
	          if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
	            // Remove the sentinel `@` character.
	            return value.slice(1);
	          }
	          // Parse object and array literals.
	          if (value == "[") {
	            // Parses a JSON array, returning a new JavaScript array.
	            results = [];
	            for (;; hasMembers || (hasMembers = true)) {
	              value = lex();
	              // A closing square bracket marks the end of the array literal.
	              if (value == "]") {
	                break;
	              }
	              // If the array literal contains elements, the current token
	              // should be a comma separating the previous element from the
	              // next.
	              if (hasMembers) {
	                if (value == ",") {
	                  value = lex();
	                  if (value == "]") {
	                    // Unexpected trailing `,` in array literal.
	                    abort();
	                  }
	                } else {
	                  // A `,` must separate each array element.
	                  abort();
	                }
	              }
	              // Elisions and leading commas are not permitted.
	              if (value == ",") {
	                abort();
	              }
	              results.push(get(value));
	            }
	            return results;
	          } else if (value == "{") {
	            // Parses a JSON object, returning a new JavaScript object.
	            results = {};
	            for (;; hasMembers || (hasMembers = true)) {
	              value = lex();
	              // A closing curly brace marks the end of the object literal.
	              if (value == "}") {
	                break;
	              }
	              // If the object literal contains members, the current token
	              // should be a comma separator.
	              if (hasMembers) {
	                if (value == ",") {
	                  value = lex();
	                  if (value == "}") {
	                    // Unexpected trailing `,` in object literal.
	                    abort();
	                  }
	                } else {
	                  // A `,` must separate each object member.
	                  abort();
	                }
	              }
	              // Leading commas are not permitted, object property names must be
	              // double-quoted strings, and a `:` must separate each property
	              // name and value.
	              if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
	                abort();
	              }
	              results[value.slice(1)] = get(lex());
	            }
	            return results;
	          }
	          // Unexpected token encountered.
	          abort();
	        }
	        return value;
	      };
	
	      // Internal: Updates a traversed object member.
	      var update = function(source, property, callback) {
	        var element = walk(source, property, callback);
	        if (element === undef) {
	          delete source[property];
	        } else {
	          source[property] = element;
	        }
	      };
	
	      // Internal: Recursively traverses a parsed JSON object, invoking the
	      // `callback` function for each value. This is an implementation of the
	      // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
	      var walk = function (source, property, callback) {
	        var value = source[property], length;
	        if (typeof value == "object" && value) {
	          // `forEach` can't be used to traverse an array in Opera <= 8.54
	          // because its `Object#hasOwnProperty` implementation returns `false`
	          // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
	          if (getClass.call(value) == arrayClass) {
	            for (length = value.length; length--;) {
	              update(value, length, callback);
	            }
	          } else {
	            forEach(value, function (property) {
	              update(value, property, callback);
	            });
	          }
	        }
	        return callback.call(source, property, value);
	      };
	
	      // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
	      JSON3.parse = function (source, callback) {
	        var result, value;
	        Index = 0;
	        Source = "" + source;
	        result = get(lex());
	        // If a JSON string contains multiple tokens, it is invalid.
	        if (lex() != "$") {
	          abort();
	        }
	        // Reset the parser state.
	        Index = Source = null;
	        return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
	      };
	    }
	  }
	
	  // Export for asynchronous module loaders.
	  if (isLoader) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return JSON3;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}(this));


/***/ },
/* 9 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;
	
	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};


/***/ },
/* 11 */
/***/ function(module, exports) {

	
	/**
	 * Expose `Emitter`.
	 */
	
	module.exports = Emitter;
	
	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */
	
	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};
	
	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */
	
	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}
	
	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks[event] = this._callbacks[event] || [])
	    .push(fn);
	  return this;
	};
	
	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.once = function(event, fn){
	  var self = this;
	  this._callbacks = this._callbacks || {};
	
	  function on() {
	    self.off(event, on);
	    fn.apply(this, arguments);
	  }
	
	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};
	
	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	
	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }
	
	  // specific event
	  var callbacks = this._callbacks[event];
	  if (!callbacks) return this;
	
	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks[event];
	    return this;
	  }
	
	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};
	
	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */
	
	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks[event];
	
	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }
	
	  return this;
	};
	
	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */
	
	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks[event] || [];
	};
	
	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */
	
	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*global Blob,File*/
	
	/**
	 * Module requirements
	 */
	
	var isArray = __webpack_require__(10);
	var isBuf = __webpack_require__(13);
	
	/**
	 * Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
	 * Anything with blobs or files should be fed through removeBlobs before coming
	 * here.
	 *
	 * @param {Object} packet - socket.io event packet
	 * @return {Object} with deconstructed packet and list of buffers
	 * @api public
	 */
	
	exports.deconstructPacket = function(packet){
	  var buffers = [];
	  var packetData = packet.data;
	
	  function _deconstructPacket(data) {
	    if (!data) return data;
	
	    if (isBuf(data)) {
	      var placeholder = { _placeholder: true, num: buffers.length };
	      buffers.push(data);
	      return placeholder;
	    } else if (isArray(data)) {
	      var newData = new Array(data.length);
	      for (var i = 0; i < data.length; i++) {
	        newData[i] = _deconstructPacket(data[i]);
	      }
	      return newData;
	    } else if ('object' == typeof data && !(data instanceof Date)) {
	      var newData = {};
	      for (var key in data) {
	        newData[key] = _deconstructPacket(data[key]);
	      }
	      return newData;
	    }
	    return data;
	  }
	
	  var pack = packet;
	  pack.data = _deconstructPacket(packetData);
	  pack.attachments = buffers.length; // number of binary 'attachments'
	  return {packet: pack, buffers: buffers};
	};
	
	/**
	 * Reconstructs a binary packet from its placeholder packet and buffers
	 *
	 * @param {Object} packet - event packet with placeholders
	 * @param {Array} buffers - binary buffers to put in placeholder positions
	 * @return {Object} reconstructed packet
	 * @api public
	 */
	
	exports.reconstructPacket = function(packet, buffers) {
	  var curPlaceHolder = 0;
	
	  function _reconstructPacket(data) {
	    if (data && data._placeholder) {
	      var buf = buffers[data.num]; // appropriate buffer (should be natural order anyway)
	      return buf;
	    } else if (isArray(data)) {
	      for (var i = 0; i < data.length; i++) {
	        data[i] = _reconstructPacket(data[i]);
	      }
	      return data;
	    } else if (data && 'object' == typeof data) {
	      for (var key in data) {
	        data[key] = _reconstructPacket(data[key]);
	      }
	      return data;
	    }
	    return data;
	  }
	
	  packet.data = _reconstructPacket(packet.data);
	  packet.attachments = undefined; // no longer useful
	  return packet;
	};
	
	/**
	 * Asynchronously removes Blobs or Files from data via
	 * FileReader's readAsArrayBuffer method. Used before encoding
	 * data as msgpack. Calls callback with the blobless data.
	 *
	 * @param {Object} data
	 * @param {Function} callback
	 * @api private
	 */
	
	exports.removeBlobs = function(data, callback) {
	  function _removeBlobs(obj, curKey, containingObject) {
	    if (!obj) return obj;
	
	    // convert any blob
	    if ((global.Blob && obj instanceof Blob) ||
	        (global.File && obj instanceof File)) {
	      pendingBlobs++;
	
	      // async filereader
	      var fileReader = new FileReader();
	      fileReader.onload = function() { // this.result == arraybuffer
	        if (containingObject) {
	          containingObject[curKey] = this.result;
	        }
	        else {
	          bloblessData = this.result;
	        }
	
	        // if nothing pending its callback time
	        if(! --pendingBlobs) {
	          callback(bloblessData);
	        }
	      };
	
	      fileReader.readAsArrayBuffer(obj); // blob -> arraybuffer
	    } else if (isArray(obj)) { // handle array
	      for (var i = 0; i < obj.length; i++) {
	        _removeBlobs(obj[i], i, obj);
	      }
	    } else if (obj && 'object' == typeof obj && !isBuf(obj)) { // and object
	      for (var key in obj) {
	        _removeBlobs(obj[key], key, obj);
	      }
	    }
	  }
	
	  var pendingBlobs = 0;
	  var bloblessData = data;
	  _removeBlobs(bloblessData);
	  if (!pendingBlobs) {
	    callback(bloblessData);
	  }
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 13 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {
	module.exports = isBuf;
	
	/**
	 * Returns true if obj is a buffer or an arraybuffer.
	 *
	 * @api private
	 */
	
	function isBuf(obj) {
	  return (global.Buffer && global.Buffer.isBuffer(obj)) ||
	         (global.ArrayBuffer && obj instanceof ArrayBuffer);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var url = __webpack_require__(4);
	var eio = __webpack_require__(15);
	var Socket = __webpack_require__(46);
	var Emitter = __webpack_require__(11);
	var parser = __webpack_require__(7);
	var on = __webpack_require__(48);
	var bind = __webpack_require__(49);
	var object = __webpack_require__(52);
	var debug = __webpack_require__(6)('socket.io-client:manager');
	var indexOf = __webpack_require__(43);
	var Backoff = __webpack_require__(53);
	
	/**
	 * Module exports
	 */
	
	module.exports = Manager;
	
	/**
	 * `Manager` constructor.
	 *
	 * @param {String} engine instance or engine uri/opts
	 * @param {Object} options
	 * @api public
	 */
	
	function Manager(uri, opts){
	  if (!(this instanceof Manager)) return new Manager(uri, opts);
	  if (uri && ('object' == typeof uri)) {
	    opts = uri;
	    uri = undefined;
	  }
	  opts = opts || {};
	
	  opts.path = opts.path || '/socket.io';
	  this.nsps = {};
	  this.subs = [];
	  this.opts = opts;
	  this.reconnection(opts.reconnection !== false);
	  this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
	  this.reconnectionDelay(opts.reconnectionDelay || 1000);
	  this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
	  this.randomizationFactor(opts.randomizationFactor || 0.5);
	  this.backoff = new Backoff({
	    min: this.reconnectionDelay(),
	    max: this.reconnectionDelayMax(),
	    jitter: this.randomizationFactor()
	  });
	  this.timeout(null == opts.timeout ? 20000 : opts.timeout);
	  this.readyState = 'closed';
	  this.uri = uri;
	  this.connected = [];
	  this.encoding = false;
	  this.packetBuffer = [];
	  this.encoder = new parser.Encoder();
	  this.decoder = new parser.Decoder();
	  this.autoConnect = opts.autoConnect !== false;
	  if (this.autoConnect) this.open();
	}
	
	/**
	 * Propagate given event to sockets and emit on `this`
	 *
	 * @api private
	 */
	
	Manager.prototype.emitAll = function() {
	  this.emit.apply(this, arguments);
	  for (var nsp in this.nsps) {
	    this.nsps[nsp].emit.apply(this.nsps[nsp], arguments);
	  }
	};
	
	/**
	 * Update `socket.id` of all sockets
	 *
	 * @api private
	 */
	
	Manager.prototype.updateSocketIds = function(){
	  for (var nsp in this.nsps) {
	    this.nsps[nsp].id = this.engine.id;
	  }
	};
	
	/**
	 * Mix in `Emitter`.
	 */
	
	Emitter(Manager.prototype);
	
	/**
	 * Sets the `reconnection` config.
	 *
	 * @param {Boolean} true/false if it should automatically reconnect
	 * @return {Manager} self or value
	 * @api public
	 */
	
	Manager.prototype.reconnection = function(v){
	  if (!arguments.length) return this._reconnection;
	  this._reconnection = !!v;
	  return this;
	};
	
	/**
	 * Sets the reconnection attempts config.
	 *
	 * @param {Number} max reconnection attempts before giving up
	 * @return {Manager} self or value
	 * @api public
	 */
	
	Manager.prototype.reconnectionAttempts = function(v){
	  if (!arguments.length) return this._reconnectionAttempts;
	  this._reconnectionAttempts = v;
	  return this;
	};
	
	/**
	 * Sets the delay between reconnections.
	 *
	 * @param {Number} delay
	 * @return {Manager} self or value
	 * @api public
	 */
	
	Manager.prototype.reconnectionDelay = function(v){
	  if (!arguments.length) return this._reconnectionDelay;
	  this._reconnectionDelay = v;
	  this.backoff && this.backoff.setMin(v);
	  return this;
	};
	
	Manager.prototype.randomizationFactor = function(v){
	  if (!arguments.length) return this._randomizationFactor;
	  this._randomizationFactor = v;
	  this.backoff && this.backoff.setJitter(v);
	  return this;
	};
	
	/**
	 * Sets the maximum delay between reconnections.
	 *
	 * @param {Number} delay
	 * @return {Manager} self or value
	 * @api public
	 */
	
	Manager.prototype.reconnectionDelayMax = function(v){
	  if (!arguments.length) return this._reconnectionDelayMax;
	  this._reconnectionDelayMax = v;
	  this.backoff && this.backoff.setMax(v);
	  return this;
	};
	
	/**
	 * Sets the connection timeout. `false` to disable
	 *
	 * @return {Manager} self or value
	 * @api public
	 */
	
	Manager.prototype.timeout = function(v){
	  if (!arguments.length) return this._timeout;
	  this._timeout = v;
	  return this;
	};
	
	/**
	 * Starts trying to reconnect if reconnection is enabled and we have not
	 * started reconnecting yet
	 *
	 * @api private
	 */
	
	Manager.prototype.maybeReconnectOnOpen = function() {
	  // Only try to reconnect if it's the first time we're connecting
	  if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
	    // keeps reconnection from firing twice for the same reconnection loop
	    this.reconnect();
	  }
	};
	
	
	/**
	 * Sets the current transport `socket`.
	 *
	 * @param {Function} optional, callback
	 * @return {Manager} self
	 * @api public
	 */
	
	Manager.prototype.open =
	Manager.prototype.connect = function(fn){
	  debug('readyState %s', this.readyState);
	  if (~this.readyState.indexOf('open')) return this;
	
	  debug('opening %s', this.uri);
	  this.engine = eio(this.uri, this.opts);
	  var socket = this.engine;
	  var self = this;
	  this.readyState = 'opening';
	  this.skipReconnect = false;
	
	  // emit `open`
	  var openSub = on(socket, 'open', function() {
	    self.onopen();
	    fn && fn();
	  });
	
	  // emit `connect_error`
	  var errorSub = on(socket, 'error', function(data){
	    debug('connect_error');
	    self.cleanup();
	    self.readyState = 'closed';
	    self.emitAll('connect_error', data);
	    if (fn) {
	      var err = new Error('Connection error');
	      err.data = data;
	      fn(err);
	    } else {
	      // Only do this if there is no fn to handle the error
	      self.maybeReconnectOnOpen();
	    }
	  });
	
	  // emit `connect_timeout`
	  if (false !== this._timeout) {
	    var timeout = this._timeout;
	    debug('connect attempt will timeout after %d', timeout);
	
	    // set timer
	    var timer = setTimeout(function(){
	      debug('connect attempt timed out after %d', timeout);
	      openSub.destroy();
	      socket.close();
	      socket.emit('error', 'timeout');
	      self.emitAll('connect_timeout', timeout);
	    }, timeout);
	
	    this.subs.push({
	      destroy: function(){
	        clearTimeout(timer);
	      }
	    });
	  }
	
	  this.subs.push(openSub);
	  this.subs.push(errorSub);
	
	  return this;
	};
	
	/**
	 * Called upon transport open.
	 *
	 * @api private
	 */
	
	Manager.prototype.onopen = function(){
	  debug('open');
	
	  // clear old subs
	  this.cleanup();
	
	  // mark as open
	  this.readyState = 'open';
	  this.emit('open');
	
	  // add new subs
	  var socket = this.engine;
	  this.subs.push(on(socket, 'data', bind(this, 'ondata')));
	  this.subs.push(on(this.decoder, 'decoded', bind(this, 'ondecoded')));
	  this.subs.push(on(socket, 'error', bind(this, 'onerror')));
	  this.subs.push(on(socket, 'close', bind(this, 'onclose')));
	};
	
	/**
	 * Called with data.
	 *
	 * @api private
	 */
	
	Manager.prototype.ondata = function(data){
	  this.decoder.add(data);
	};
	
	/**
	 * Called when parser fully decodes a packet.
	 *
	 * @api private
	 */
	
	Manager.prototype.ondecoded = function(packet) {
	  this.emit('packet', packet);
	};
	
	/**
	 * Called upon socket error.
	 *
	 * @api private
	 */
	
	Manager.prototype.onerror = function(err){
	  debug('error', err);
	  this.emitAll('error', err);
	};
	
	/**
	 * Creates a new socket for the given `nsp`.
	 *
	 * @return {Socket}
	 * @api public
	 */
	
	Manager.prototype.socket = function(nsp){
	  var socket = this.nsps[nsp];
	  if (!socket) {
	    socket = new Socket(this, nsp);
	    this.nsps[nsp] = socket;
	    var self = this;
	    socket.on('connect', function(){
	      socket.id = self.engine.id;
	      if (!~indexOf(self.connected, socket)) {
	        self.connected.push(socket);
	      }
	    });
	  }
	  return socket;
	};
	
	/**
	 * Called upon a socket close.
	 *
	 * @param {Socket} socket
	 */
	
	Manager.prototype.destroy = function(socket){
	  var index = indexOf(this.connected, socket);
	  if (~index) this.connected.splice(index, 1);
	  if (this.connected.length) return;
	
	  this.close();
	};
	
	/**
	 * Writes a packet.
	 *
	 * @param {Object} packet
	 * @api private
	 */
	
	Manager.prototype.packet = function(packet){
	  debug('writing packet %j', packet);
	  var self = this;
	
	  if (!self.encoding) {
	    // encode, then write to engine with result
	    self.encoding = true;
	    this.encoder.encode(packet, function(encodedPackets) {
	      for (var i = 0; i < encodedPackets.length; i++) {
	        self.engine.write(encodedPackets[i]);
	      }
	      self.encoding = false;
	      self.processPacketQueue();
	    });
	  } else { // add packet to the queue
	    self.packetBuffer.push(packet);
	  }
	};
	
	/**
	 * If packet buffer is non-empty, begins encoding the
	 * next packet in line.
	 *
	 * @api private
	 */
	
	Manager.prototype.processPacketQueue = function() {
	  if (this.packetBuffer.length > 0 && !this.encoding) {
	    var pack = this.packetBuffer.shift();
	    this.packet(pack);
	  }
	};
	
	/**
	 * Clean up transport subscriptions and packet buffer.
	 *
	 * @api private
	 */
	
	Manager.prototype.cleanup = function(){
	  var sub;
	  while (sub = this.subs.shift()) sub.destroy();
	
	  this.packetBuffer = [];
	  this.encoding = false;
	
	  this.decoder.destroy();
	};
	
	/**
	 * Close the current socket.
	 *
	 * @api private
	 */
	
	Manager.prototype.close =
	Manager.prototype.disconnect = function(){
	  this.skipReconnect = true;
	  this.backoff.reset();
	  this.readyState = 'closed';
	  this.engine && this.engine.close();
	};
	
	/**
	 * Called upon engine close.
	 *
	 * @api private
	 */
	
	Manager.prototype.onclose = function(reason){
	  debug('close');
	  this.cleanup();
	  this.backoff.reset();
	  this.readyState = 'closed';
	  this.emit('close', reason);
	  if (this._reconnection && !this.skipReconnect) {
	    this.reconnect();
	  }
	};
	
	/**
	 * Attempt a reconnection.
	 *
	 * @api private
	 */
	
	Manager.prototype.reconnect = function(){
	  if (this.reconnecting || this.skipReconnect) return this;
	
	  var self = this;
	
	  if (this.backoff.attempts >= this._reconnectionAttempts) {
	    debug('reconnect failed');
	    this.backoff.reset();
	    this.emitAll('reconnect_failed');
	    this.reconnecting = false;
	  } else {
	    var delay = this.backoff.duration();
	    debug('will wait %dms before reconnect attempt', delay);
	
	    this.reconnecting = true;
	    var timer = setTimeout(function(){
	      if (self.skipReconnect) return;
	
	      debug('attempting reconnect');
	      self.emitAll('reconnect_attempt', self.backoff.attempts);
	      self.emitAll('reconnecting', self.backoff.attempts);
	
	      // check again for the case socket closed in above events
	      if (self.skipReconnect) return;
	
	      self.open(function(err){
	        if (err) {
	          debug('reconnect attempt error');
	          self.reconnecting = false;
	          self.reconnect();
	          self.emitAll('reconnect_error', err.data);
	        } else {
	          debug('reconnect success');
	          self.onreconnect();
	        }
	      });
	    }, delay);
	
	    this.subs.push({
	      destroy: function(){
	        clearTimeout(timer);
	      }
	    });
	  }
	};
	
	/**
	 * Called upon successful reconnect.
	 *
	 * @api private
	 */
	
	Manager.prototype.onreconnect = function(){
	  var attempt = this.backoff.attempts;
	  this.reconnecting = false;
	  this.backoff.reset();
	  this.updateSocketIds();
	  this.emitAll('reconnect', attempt);
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	
	module.exports =  __webpack_require__(16);


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	
	module.exports = __webpack_require__(17);
	
	/**
	 * Exports parser
	 *
	 * @api public
	 *
	 */
	module.exports.parser = __webpack_require__(25);


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module dependencies.
	 */
	
	var transports = __webpack_require__(18);
	var Emitter = __webpack_require__(11);
	var debug = __webpack_require__(37)('engine.io-client:socket');
	var index = __webpack_require__(43);
	var parser = __webpack_require__(25);
	var parseuri = __webpack_require__(44);
	var parsejson = __webpack_require__(45);
	var parseqs = __webpack_require__(35);
	
	/**
	 * Module exports.
	 */
	
	module.exports = Socket;
	
	/**
	 * Noop function.
	 *
	 * @api private
	 */
	
	function noop(){}
	
	/**
	 * Socket constructor.
	 *
	 * @param {String|Object} uri or options
	 * @param {Object} options
	 * @api public
	 */
	
	function Socket(uri, opts){
	  if (!(this instanceof Socket)) return new Socket(uri, opts);
	
	  opts = opts || {};
	
	  if (uri && 'object' == typeof uri) {
	    opts = uri;
	    uri = null;
	  }
	
	  if (uri) {
	    uri = parseuri(uri);
	    opts.host = uri.host;
	    opts.secure = uri.protocol == 'https' || uri.protocol == 'wss';
	    opts.port = uri.port;
	    if (uri.query) opts.query = uri.query;
	  }
	
	  this.secure = null != opts.secure ? opts.secure :
	    (global.location && 'https:' == location.protocol);
	
	  if (opts.host) {
	    var pieces = opts.host.split(':');
	    opts.hostname = pieces.shift();
	    if (pieces.length) {
	      opts.port = pieces.pop();
	    } else if (!opts.port) {
	      // if no port is specified manually, use the protocol default
	      opts.port = this.secure ? '443' : '80';
	    }
	  }
	
	  this.agent = opts.agent || false;
	  this.hostname = opts.hostname ||
	    (global.location ? location.hostname : 'localhost');
	  this.port = opts.port || (global.location && location.port ?
	       location.port :
	       (this.secure ? 443 : 80));
	  this.query = opts.query || {};
	  if ('string' == typeof this.query) this.query = parseqs.decode(this.query);
	  this.upgrade = false !== opts.upgrade;
	  this.path = (opts.path || '/engine.io').replace(/\/$/, '') + '/';
	  this.forceJSONP = !!opts.forceJSONP;
	  this.jsonp = false !== opts.jsonp;
	  this.forceBase64 = !!opts.forceBase64;
	  this.enablesXDR = !!opts.enablesXDR;
	  this.timestampParam = opts.timestampParam || 't';
	  this.timestampRequests = opts.timestampRequests;
	  this.transports = opts.transports || ['polling', 'websocket'];
	  this.readyState = '';
	  this.writeBuffer = [];
	  this.callbackBuffer = [];
	  this.policyPort = opts.policyPort || 843;
	  this.rememberUpgrade = opts.rememberUpgrade || false;
	  this.binaryType = null;
	  this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;
	
	  // SSL options for Node.js client
	  this.pfx = opts.pfx || null;
	  this.key = opts.key || null;
	  this.passphrase = opts.passphrase || null;
	  this.cert = opts.cert || null;
	  this.ca = opts.ca || null;
	  this.ciphers = opts.ciphers || null;
	  this.rejectUnauthorized = opts.rejectUnauthorized || null;
	
	  this.open();
	}
	
	Socket.priorWebsocketSuccess = false;
	
	/**
	 * Mix in `Emitter`.
	 */
	
	Emitter(Socket.prototype);
	
	/**
	 * Protocol version.
	 *
	 * @api public
	 */
	
	Socket.protocol = parser.protocol; // this is an int
	
	/**
	 * Expose deps for legacy compatibility
	 * and standalone browser access.
	 */
	
	Socket.Socket = Socket;
	Socket.Transport = __webpack_require__(24);
	Socket.transports = __webpack_require__(18);
	Socket.parser = __webpack_require__(25);
	
	/**
	 * Creates transport of the given type.
	 *
	 * @param {String} transport name
	 * @return {Transport}
	 * @api private
	 */
	
	Socket.prototype.createTransport = function (name) {
	  debug('creating transport "%s"', name);
	  var query = clone(this.query);
	
	  // append engine.io protocol identifier
	  query.EIO = parser.protocol;
	
	  // transport name
	  query.transport = name;
	
	  // session id if we already have one
	  if (this.id) query.sid = this.id;
	
	  var transport = new transports[name]({
	    agent: this.agent,
	    hostname: this.hostname,
	    port: this.port,
	    secure: this.secure,
	    path: this.path,
	    query: query,
	    forceJSONP: this.forceJSONP,
	    jsonp: this.jsonp,
	    forceBase64: this.forceBase64,
	    enablesXDR: this.enablesXDR,
	    timestampRequests: this.timestampRequests,
	    timestampParam: this.timestampParam,
	    policyPort: this.policyPort,
	    socket: this,
	    pfx: this.pfx,
	    key: this.key,
	    passphrase: this.passphrase,
	    cert: this.cert,
	    ca: this.ca,
	    ciphers: this.ciphers,
	    rejectUnauthorized: this.rejectUnauthorized
	  });
	
	  return transport;
	};
	
	function clone (obj) {
	  var o = {};
	  for (var i in obj) {
	    if (obj.hasOwnProperty(i)) {
	      o[i] = obj[i];
	    }
	  }
	  return o;
	}
	
	/**
	 * Initializes transport to use and starts probe.
	 *
	 * @api private
	 */
	Socket.prototype.open = function () {
	  var transport;
	  if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') != -1) {
	    transport = 'websocket';
	  } else if (0 == this.transports.length) {
	    // Emit error on next tick so it can be listened to
	    var self = this;
	    setTimeout(function() {
	      self.emit('error', 'No transports available');
	    }, 0);
	    return;
	  } else {
	    transport = this.transports[0];
	  }
	  this.readyState = 'opening';
	
	  // Retry with the next transport if the transport is disabled (jsonp: false)
	  var transport;
	  try {
	    transport = this.createTransport(transport);
	  } catch (e) {
	    this.transports.shift();
	    this.open();
	    return;
	  }
	
	  transport.open();
	  this.setTransport(transport);
	};
	
	/**
	 * Sets the current transport. Disables the existing one (if any).
	 *
	 * @api private
	 */
	
	Socket.prototype.setTransport = function(transport){
	  debug('setting transport %s', transport.name);
	  var self = this;
	
	  if (this.transport) {
	    debug('clearing existing transport %s', this.transport.name);
	    this.transport.removeAllListeners();
	  }
	
	  // set up transport
	  this.transport = transport;
	
	  // set up transport listeners
	  transport
	  .on('drain', function(){
	    self.onDrain();
	  })
	  .on('packet', function(packet){
	    self.onPacket(packet);
	  })
	  .on('error', function(e){
	    self.onError(e);
	  })
	  .on('close', function(){
	    self.onClose('transport close');
	  });
	};
	
	/**
	 * Probes a transport.
	 *
	 * @param {String} transport name
	 * @api private
	 */
	
	Socket.prototype.probe = function (name) {
	  debug('probing transport "%s"', name);
	  var transport = this.createTransport(name, { probe: 1 })
	    , failed = false
	    , self = this;
	
	  Socket.priorWebsocketSuccess = false;
	
	  function onTransportOpen(){
	    if (self.onlyBinaryUpgrades) {
	      var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
	      failed = failed || upgradeLosesBinary;
	    }
	    if (failed) return;
	
	    debug('probe transport "%s" opened', name);
	    transport.send([{ type: 'ping', data: 'probe' }]);
	    transport.once('packet', function (msg) {
	      if (failed) return;
	      if ('pong' == msg.type && 'probe' == msg.data) {
	        debug('probe transport "%s" pong', name);
	        self.upgrading = true;
	        self.emit('upgrading', transport);
	        if (!transport) return;
	        Socket.priorWebsocketSuccess = 'websocket' == transport.name;
	
	        debug('pausing current transport "%s"', self.transport.name);
	        self.transport.pause(function () {
	          if (failed) return;
	          if ('closed' == self.readyState) return;
	          debug('changing transport and sending upgrade packet');
	
	          cleanup();
	
	          self.setTransport(transport);
	          transport.send([{ type: 'upgrade' }]);
	          self.emit('upgrade', transport);
	          transport = null;
	          self.upgrading = false;
	          self.flush();
	        });
	      } else {
	        debug('probe transport "%s" failed', name);
	        var err = new Error('probe error');
	        err.transport = transport.name;
	        self.emit('upgradeError', err);
	      }
	    });
	  }
	
	  function freezeTransport() {
	    if (failed) return;
	
	    // Any callback called by transport should be ignored since now
	    failed = true;
	
	    cleanup();
	
	    transport.close();
	    transport = null;
	  }
	
	  //Handle any error that happens while probing
	  function onerror(err) {
	    var error = new Error('probe error: ' + err);
	    error.transport = transport.name;
	
	    freezeTransport();
	
	    debug('probe transport "%s" failed because of error: %s', name, err);
	
	    self.emit('upgradeError', error);
	  }
	
	  function onTransportClose(){
	    onerror("transport closed");
	  }
	
	  //When the socket is closed while we're probing
	  function onclose(){
	    onerror("socket closed");
	  }
	
	  //When the socket is upgraded while we're probing
	  function onupgrade(to){
	    if (transport && to.name != transport.name) {
	      debug('"%s" works - aborting "%s"', to.name, transport.name);
	      freezeTransport();
	    }
	  }
	
	  //Remove all listeners on the transport and on self
	  function cleanup(){
	    transport.removeListener('open', onTransportOpen);
	    transport.removeListener('error', onerror);
	    transport.removeListener('close', onTransportClose);
	    self.removeListener('close', onclose);
	    self.removeListener('upgrading', onupgrade);
	  }
	
	  transport.once('open', onTransportOpen);
	  transport.once('error', onerror);
	  transport.once('close', onTransportClose);
	
	  this.once('close', onclose);
	  this.once('upgrading', onupgrade);
	
	  transport.open();
	
	};
	
	/**
	 * Called when connection is deemed open.
	 *
	 * @api public
	 */
	
	Socket.prototype.onOpen = function () {
	  debug('socket open');
	  this.readyState = 'open';
	  Socket.priorWebsocketSuccess = 'websocket' == this.transport.name;
	  this.emit('open');
	  this.flush();
	
	  // we check for `readyState` in case an `open`
	  // listener already closed the socket
	  if ('open' == this.readyState && this.upgrade && this.transport.pause) {
	    debug('starting upgrade probes');
	    for (var i = 0, l = this.upgrades.length; i < l; i++) {
	      this.probe(this.upgrades[i]);
	    }
	  }
	};
	
	/**
	 * Handles a packet.
	 *
	 * @api private
	 */
	
	Socket.prototype.onPacket = function (packet) {
	  if ('opening' == this.readyState || 'open' == this.readyState) {
	    debug('socket receive: type "%s", data "%s"', packet.type, packet.data);
	
	    this.emit('packet', packet);
	
	    // Socket is live - any packet counts
	    this.emit('heartbeat');
	
	    switch (packet.type) {
	      case 'open':
	        this.onHandshake(parsejson(packet.data));
	        break;
	
	      case 'pong':
	        this.setPing();
	        break;
	
	      case 'error':
	        var err = new Error('server error');
	        err.code = packet.data;
	        this.emit('error', err);
	        break;
	
	      case 'message':
	        this.emit('data', packet.data);
	        this.emit('message', packet.data);
	        break;
	    }
	  } else {
	    debug('packet received with socket readyState "%s"', this.readyState);
	  }
	};
	
	/**
	 * Called upon handshake completion.
	 *
	 * @param {Object} handshake obj
	 * @api private
	 */
	
	Socket.prototype.onHandshake = function (data) {
	  this.emit('handshake', data);
	  this.id = data.sid;
	  this.transport.query.sid = data.sid;
	  this.upgrades = this.filterUpgrades(data.upgrades);
	  this.pingInterval = data.pingInterval;
	  this.pingTimeout = data.pingTimeout;
	  this.onOpen();
	  // In case open handler closes socket
	  if  ('closed' == this.readyState) return;
	  this.setPing();
	
	  // Prolong liveness of socket on heartbeat
	  this.removeListener('heartbeat', this.onHeartbeat);
	  this.on('heartbeat', this.onHeartbeat);
	};
	
	/**
	 * Resets ping timeout.
	 *
	 * @api private
	 */
	
	Socket.prototype.onHeartbeat = function (timeout) {
	  clearTimeout(this.pingTimeoutTimer);
	  var self = this;
	  self.pingTimeoutTimer = setTimeout(function () {
	    if ('closed' == self.readyState) return;
	    self.onClose('ping timeout');
	  }, timeout || (self.pingInterval + self.pingTimeout));
	};
	
	/**
	 * Pings server every `this.pingInterval` and expects response
	 * within `this.pingTimeout` or closes connection.
	 *
	 * @api private
	 */
	
	Socket.prototype.setPing = function () {
	  var self = this;
	  clearTimeout(self.pingIntervalTimer);
	  self.pingIntervalTimer = setTimeout(function () {
	    debug('writing ping packet - expecting pong within %sms', self.pingTimeout);
	    self.ping();
	    self.onHeartbeat(self.pingTimeout);
	  }, self.pingInterval);
	};
	
	/**
	* Sends a ping packet.
	*
	* @api public
	*/
	
	Socket.prototype.ping = function () {
	  this.sendPacket('ping');
	};
	
	/**
	 * Called on `drain` event
	 *
	 * @api private
	 */
	
	Socket.prototype.onDrain = function() {
	  for (var i = 0; i < this.prevBufferLen; i++) {
	    if (this.callbackBuffer[i]) {
	      this.callbackBuffer[i]();
	    }
	  }
	
	  this.writeBuffer.splice(0, this.prevBufferLen);
	  this.callbackBuffer.splice(0, this.prevBufferLen);
	
	  // setting prevBufferLen = 0 is very important
	  // for example, when upgrading, upgrade packet is sent over,
	  // and a nonzero prevBufferLen could cause problems on `drain`
	  this.prevBufferLen = 0;
	
	  if (this.writeBuffer.length == 0) {
	    this.emit('drain');
	  } else {
	    this.flush();
	  }
	};
	
	/**
	 * Flush write buffers.
	 *
	 * @api private
	 */
	
	Socket.prototype.flush = function () {
	  if ('closed' != this.readyState && this.transport.writable &&
	    !this.upgrading && this.writeBuffer.length) {
	    debug('flushing %d packets in socket', this.writeBuffer.length);
	    this.transport.send(this.writeBuffer);
	    // keep track of current length of writeBuffer
	    // splice writeBuffer and callbackBuffer on `drain`
	    this.prevBufferLen = this.writeBuffer.length;
	    this.emit('flush');
	  }
	};
	
	/**
	 * Sends a message.
	 *
	 * @param {String} message.
	 * @param {Function} callback function.
	 * @return {Socket} for chaining.
	 * @api public
	 */
	
	Socket.prototype.write =
	Socket.prototype.send = function (msg, fn) {
	  this.sendPacket('message', msg, fn);
	  return this;
	};
	
	/**
	 * Sends a packet.
	 *
	 * @param {String} packet type.
	 * @param {String} data.
	 * @param {Function} callback function.
	 * @api private
	 */
	
	Socket.prototype.sendPacket = function (type, data, fn) {
	  if ('closing' == this.readyState || 'closed' == this.readyState) {
	    return;
	  }
	
	  var packet = { type: type, data: data };
	  this.emit('packetCreate', packet);
	  this.writeBuffer.push(packet);
	  this.callbackBuffer.push(fn);
	  this.flush();
	};
	
	/**
	 * Closes the connection.
	 *
	 * @api private
	 */
	
	Socket.prototype.close = function () {
	  if ('opening' == this.readyState || 'open' == this.readyState) {
	    this.readyState = 'closing';
	
	    var self = this;
	
	    function close() {
	      self.onClose('forced close');
	      debug('socket closing - telling transport to close');
	      self.transport.close();
	    }
	
	    function cleanupAndClose() {
	      self.removeListener('upgrade', cleanupAndClose);
	      self.removeListener('upgradeError', cleanupAndClose);
	      close();
	    }
	
	    function waitForUpgrade() {
	      // wait for upgrade to finish since we can't send packets while pausing a transport
	      self.once('upgrade', cleanupAndClose);
	      self.once('upgradeError', cleanupAndClose);
	    }
	
	    if (this.writeBuffer.length) {
	      this.once('drain', function() {
	        if (this.upgrading) {
	          waitForUpgrade();
	        } else {
	          close();
	        }
	      });
	    } else if (this.upgrading) {
	      waitForUpgrade();
	    } else {
	      close();
	    }
	  }
	
	  return this;
	};
	
	/**
	 * Called upon transport error
	 *
	 * @api private
	 */
	
	Socket.prototype.onError = function (err) {
	  debug('socket error %j', err);
	  Socket.priorWebsocketSuccess = false;
	  this.emit('error', err);
	  this.onClose('transport error', err);
	};
	
	/**
	 * Called upon transport close.
	 *
	 * @api private
	 */
	
	Socket.prototype.onClose = function (reason, desc) {
	  if ('opening' == this.readyState || 'open' == this.readyState || 'closing' == this.readyState) {
	    debug('socket close with reason: "%s"', reason);
	    var self = this;
	
	    // clear timers
	    clearTimeout(this.pingIntervalTimer);
	    clearTimeout(this.pingTimeoutTimer);
	
	    // clean buffers in next tick, so developers can still
	    // grab the buffers on `close` event
	    setTimeout(function() {
	      self.writeBuffer = [];
	      self.callbackBuffer = [];
	      self.prevBufferLen = 0;
	    }, 0);
	
	    // stop event from firing again for transport
	    this.transport.removeAllListeners('close');
	
	    // ensure transport won't stay open
	    this.transport.close();
	
	    // ignore further transport communication
	    this.transport.removeAllListeners();
	
	    // set ready state
	    this.readyState = 'closed';
	
	    // clear session id
	    this.id = null;
	
	    // emit close event
	    this.emit('close', reason, desc);
	  }
	};
	
	/**
	 * Filters upgrades, returning only those matching client transports.
	 *
	 * @param {Array} server upgrades
	 * @api private
	 *
	 */
	
	Socket.prototype.filterUpgrades = function (upgrades) {
	  var filteredUpgrades = [];
	  for (var i = 0, j = upgrades.length; i<j; i++) {
	    if (~index(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i]);
	  }
	  return filteredUpgrades;
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module dependencies
	 */
	
	var XMLHttpRequest = __webpack_require__(19);
	var XHR = __webpack_require__(22);
	var JSONP = __webpack_require__(40);
	var websocket = __webpack_require__(41);
	
	/**
	 * Export transports.
	 */
	
	exports.polling = polling;
	exports.websocket = websocket;
	
	/**
	 * Polling transport polymorphic constructor.
	 * Decides on xhr vs jsonp based on feature detection.
	 *
	 * @api private
	 */
	
	function polling(opts){
	  var xhr;
	  var xd = false;
	  var xs = false;
	  var jsonp = false !== opts.jsonp;
	
	  if (global.location) {
	    var isSSL = 'https:' == location.protocol;
	    var port = location.port;
	
	    // some user agents have empty `location.port`
	    if (!port) {
	      port = isSSL ? 443 : 80;
	    }
	
	    xd = opts.hostname != location.hostname || port != opts.port;
	    xs = opts.secure != isSSL;
	  }
	
	  opts.xdomain = xd;
	  opts.xscheme = xs;
	  xhr = new XMLHttpRequest(opts);
	
	  if ('open' in xhr && !opts.forceJSONP) {
	    return new XHR(opts);
	  } else {
	    if (!jsonp) throw new Error('JSONP disabled');
	    return new JSONP(opts);
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// browser shim for xmlhttprequest module
	var hasCORS = __webpack_require__(20);
	
	module.exports = function(opts) {
	  var xdomain = opts.xdomain;
	
	  // scheme must be same when usign XDomainRequest
	  // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
	  var xscheme = opts.xscheme;
	
	  // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
	  // https://github.com/Automattic/engine.io-client/pull/217
	  var enablesXDR = opts.enablesXDR;
	
	  // XMLHttpRequest can be disabled on IE
	  try {
	    if ('undefined' != typeof XMLHttpRequest && (!xdomain || hasCORS)) {
	      return new XMLHttpRequest();
	    }
	  } catch (e) { }
	
	  // Use XDomainRequest for IE8 if enablesXDR is true
	  // because loading bar keeps flashing when using jsonp-polling
	  // https://github.com/yujiosaka/socke.io-ie8-loading-example
	  try {
	    if ('undefined' != typeof XDomainRequest && !xscheme && enablesXDR) {
	      return new XDomainRequest();
	    }
	  } catch (e) { }
	
	  if (!xdomain) {
	    try {
	      return new ActiveXObject('Microsoft.XMLHTTP');
	    } catch(e) { }
	  }
	}


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var global = __webpack_require__(21);
	
	/**
	 * Module exports.
	 *
	 * Logic borrowed from Modernizr:
	 *
	 *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
	 */
	
	try {
	  module.exports = 'XMLHttpRequest' in global &&
	    'withCredentials' in new global.XMLHttpRequest();
	} catch (err) {
	  // if XMLHttp support is disabled in IE then it will throw
	  // when trying to create
	  module.exports = false;
	}


/***/ },
/* 21 */
/***/ function(module, exports) {

	
	/**
	 * Returns `this`. Execute this without a "context" (i.e. without it being
	 * attached to an object of the left-hand side), and `this` points to the
	 * "global" scope of the current JS execution.
	 */
	
	module.exports = (function () { return this; })();


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module requirements.
	 */
	
	var XMLHttpRequest = __webpack_require__(19);
	var Polling = __webpack_require__(23);
	var Emitter = __webpack_require__(11);
	var inherit = __webpack_require__(36);
	var debug = __webpack_require__(37)('engine.io-client:polling-xhr');
	
	/**
	 * Module exports.
	 */
	
	module.exports = XHR;
	module.exports.Request = Request;
	
	/**
	 * Empty function
	 */
	
	function empty(){}
	
	/**
	 * XHR Polling constructor.
	 *
	 * @param {Object} opts
	 * @api public
	 */
	
	function XHR(opts){
	  Polling.call(this, opts);
	
	  if (global.location) {
	    var isSSL = 'https:' == location.protocol;
	    var port = location.port;
	
	    // some user agents have empty `location.port`
	    if (!port) {
	      port = isSSL ? 443 : 80;
	    }
	
	    this.xd = opts.hostname != global.location.hostname ||
	      port != opts.port;
	    this.xs = opts.secure != isSSL;
	  }
	}
	
	/**
	 * Inherits from Polling.
	 */
	
	inherit(XHR, Polling);
	
	/**
	 * XHR supports binary
	 */
	
	XHR.prototype.supportsBinary = true;
	
	/**
	 * Creates a request.
	 *
	 * @param {String} method
	 * @api private
	 */
	
	XHR.prototype.request = function(opts){
	  opts = opts || {};
	  opts.uri = this.uri();
	  opts.xd = this.xd;
	  opts.xs = this.xs;
	  opts.agent = this.agent || false;
	  opts.supportsBinary = this.supportsBinary;
	  opts.enablesXDR = this.enablesXDR;
	
	  // SSL options for Node.js client
	  opts.pfx = this.pfx;
	  opts.key = this.key;
	  opts.passphrase = this.passphrase;
	  opts.cert = this.cert;
	  opts.ca = this.ca;
	  opts.ciphers = this.ciphers;
	  opts.rejectUnauthorized = this.rejectUnauthorized;
	
	  return new Request(opts);
	};
	
	/**
	 * Sends data.
	 *
	 * @param {String} data to send.
	 * @param {Function} called upon flush.
	 * @api private
	 */
	
	XHR.prototype.doWrite = function(data, fn){
	  var isBinary = typeof data !== 'string' && data !== undefined;
	  var req = this.request({ method: 'POST', data: data, isBinary: isBinary });
	  var self = this;
	  req.on('success', fn);
	  req.on('error', function(err){
	    self.onError('xhr post error', err);
	  });
	  this.sendXhr = req;
	};
	
	/**
	 * Starts a poll cycle.
	 *
	 * @api private
	 */
	
	XHR.prototype.doPoll = function(){
	  debug('xhr poll');
	  var req = this.request();
	  var self = this;
	  req.on('data', function(data){
	    self.onData(data);
	  });
	  req.on('error', function(err){
	    self.onError('xhr poll error', err);
	  });
	  this.pollXhr = req;
	};
	
	/**
	 * Request constructor
	 *
	 * @param {Object} options
	 * @api public
	 */
	
	function Request(opts){
	  this.method = opts.method || 'GET';
	  this.uri = opts.uri;
	  this.xd = !!opts.xd;
	  this.xs = !!opts.xs;
	  this.async = false !== opts.async;
	  this.data = undefined != opts.data ? opts.data : null;
	  this.agent = opts.agent;
	  this.isBinary = opts.isBinary;
	  this.supportsBinary = opts.supportsBinary;
	  this.enablesXDR = opts.enablesXDR;
	
	  // SSL options for Node.js client
	  this.pfx = opts.pfx;
	  this.key = opts.key;
	  this.passphrase = opts.passphrase;
	  this.cert = opts.cert;
	  this.ca = opts.ca;
	  this.ciphers = opts.ciphers;
	  this.rejectUnauthorized = opts.rejectUnauthorized;
	
	  this.create();
	}
	
	/**
	 * Mix in `Emitter`.
	 */
	
	Emitter(Request.prototype);
	
	/**
	 * Creates the XHR object and sends the request.
	 *
	 * @api private
	 */
	
	Request.prototype.create = function(){
	  var opts = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };
	
	  // SSL options for Node.js client
	  opts.pfx = this.pfx;
	  opts.key = this.key;
	  opts.passphrase = this.passphrase;
	  opts.cert = this.cert;
	  opts.ca = this.ca;
	  opts.ciphers = this.ciphers;
	  opts.rejectUnauthorized = this.rejectUnauthorized;
	
	  var xhr = this.xhr = new XMLHttpRequest(opts);
	  var self = this;
	
	  try {
	    debug('xhr open %s: %s', this.method, this.uri);
	    xhr.open(this.method, this.uri, this.async);
	    if (this.supportsBinary) {
	      // This has to be done after open because Firefox is stupid
	      // http://stackoverflow.com/questions/13216903/get-binary-data-with-xmlhttprequest-in-a-firefox-extension
	      xhr.responseType = 'arraybuffer';
	    }
	
	    if ('POST' == this.method) {
	      try {
	        if (this.isBinary) {
	          xhr.setRequestHeader('Content-type', 'application/octet-stream');
	        } else {
	          xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
	        }
	      } catch (e) {}
	    }
	
	    // ie6 check
	    if ('withCredentials' in xhr) {
	      xhr.withCredentials = true;
	    }
	
	    if (this.hasXDR()) {
	      xhr.onload = function(){
	        self.onLoad();
	      };
	      xhr.onerror = function(){
	        self.onError(xhr.responseText);
	      };
	    } else {
	      xhr.onreadystatechange = function(){
	        if (4 != xhr.readyState) return;
	        if (200 == xhr.status || 1223 == xhr.status) {
	          self.onLoad();
	        } else {
	          // make sure the `error` event handler that's user-set
	          // does not throw in the same tick and gets caught here
	          setTimeout(function(){
	            self.onError(xhr.status);
	          }, 0);
	        }
	      };
	    }
	
	    debug('xhr data %s', this.data);
	    xhr.send(this.data);
	  } catch (e) {
	    // Need to defer since .create() is called directly fhrom the constructor
	    // and thus the 'error' event can only be only bound *after* this exception
	    // occurs.  Therefore, also, we cannot throw here at all.
	    setTimeout(function() {
	      self.onError(e);
	    }, 0);
	    return;
	  }
	
	  if (global.document) {
	    this.index = Request.requestsCount++;
	    Request.requests[this.index] = this;
	  }
	};
	
	/**
	 * Called upon successful response.
	 *
	 * @api private
	 */
	
	Request.prototype.onSuccess = function(){
	  this.emit('success');
	  this.cleanup();
	};
	
	/**
	 * Called if we have data.
	 *
	 * @api private
	 */
	
	Request.prototype.onData = function(data){
	  this.emit('data', data);
	  this.onSuccess();
	};
	
	/**
	 * Called upon error.
	 *
	 * @api private
	 */
	
	Request.prototype.onError = function(err){
	  this.emit('error', err);
	  this.cleanup(true);
	};
	
	/**
	 * Cleans up house.
	 *
	 * @api private
	 */
	
	Request.prototype.cleanup = function(fromError){
	  if ('undefined' == typeof this.xhr || null === this.xhr) {
	    return;
	  }
	  // xmlhttprequest
	  if (this.hasXDR()) {
	    this.xhr.onload = this.xhr.onerror = empty;
	  } else {
	    this.xhr.onreadystatechange = empty;
	  }
	
	  if (fromError) {
	    try {
	      this.xhr.abort();
	    } catch(e) {}
	  }
	
	  if (global.document) {
	    delete Request.requests[this.index];
	  }
	
	  this.xhr = null;
	};
	
	/**
	 * Called upon load.
	 *
	 * @api private
	 */
	
	Request.prototype.onLoad = function(){
	  var data;
	  try {
	    var contentType;
	    try {
	      contentType = this.xhr.getResponseHeader('Content-Type').split(';')[0];
	    } catch (e) {}
	    if (contentType === 'application/octet-stream') {
	      data = this.xhr.response;
	    } else {
	      if (!this.supportsBinary) {
	        data = this.xhr.responseText;
	      } else {
	        data = 'ok';
	      }
	    }
	  } catch (e) {
	    this.onError(e);
	  }
	  if (null != data) {
	    this.onData(data);
	  }
	};
	
	/**
	 * Check if it has XDomainRequest.
	 *
	 * @api private
	 */
	
	Request.prototype.hasXDR = function(){
	  return 'undefined' !== typeof global.XDomainRequest && !this.xs && this.enablesXDR;
	};
	
	/**
	 * Aborts the request.
	 *
	 * @api public
	 */
	
	Request.prototype.abort = function(){
	  this.cleanup();
	};
	
	/**
	 * Aborts pending requests when unloading the window. This is needed to prevent
	 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
	 * emitted.
	 */
	
	if (global.document) {
	  Request.requestsCount = 0;
	  Request.requests = {};
	  if (global.attachEvent) {
	    global.attachEvent('onunload', unloadHandler);
	  } else if (global.addEventListener) {
	    global.addEventListener('beforeunload', unloadHandler, false);
	  }
	}
	
	function unloadHandler() {
	  for (var i in Request.requests) {
	    if (Request.requests.hasOwnProperty(i)) {
	      Request.requests[i].abort();
	    }
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var Transport = __webpack_require__(24);
	var parseqs = __webpack_require__(35);
	var parser = __webpack_require__(25);
	var inherit = __webpack_require__(36);
	var debug = __webpack_require__(37)('engine.io-client:polling');
	
	/**
	 * Module exports.
	 */
	
	module.exports = Polling;
	
	/**
	 * Is XHR2 supported?
	 */
	
	var hasXHR2 = (function() {
	  var XMLHttpRequest = __webpack_require__(19);
	  var xhr = new XMLHttpRequest({ xdomain: false });
	  return null != xhr.responseType;
	})();
	
	/**
	 * Polling interface.
	 *
	 * @param {Object} opts
	 * @api private
	 */
	
	function Polling(opts){
	  var forceBase64 = (opts && opts.forceBase64);
	  if (!hasXHR2 || forceBase64) {
	    this.supportsBinary = false;
	  }
	  Transport.call(this, opts);
	}
	
	/**
	 * Inherits from Transport.
	 */
	
	inherit(Polling, Transport);
	
	/**
	 * Transport name.
	 */
	
	Polling.prototype.name = 'polling';
	
	/**
	 * Opens the socket (triggers polling). We write a PING message to determine
	 * when the transport is open.
	 *
	 * @api private
	 */
	
	Polling.prototype.doOpen = function(){
	  this.poll();
	};
	
	/**
	 * Pauses polling.
	 *
	 * @param {Function} callback upon buffers are flushed and transport is paused
	 * @api private
	 */
	
	Polling.prototype.pause = function(onPause){
	  var pending = 0;
	  var self = this;
	
	  this.readyState = 'pausing';
	
	  function pause(){
	    debug('paused');
	    self.readyState = 'paused';
	    onPause();
	  }
	
	  if (this.polling || !this.writable) {
	    var total = 0;
	
	    if (this.polling) {
	      debug('we are currently polling - waiting to pause');
	      total++;
	      this.once('pollComplete', function(){
	        debug('pre-pause polling complete');
	        --total || pause();
	      });
	    }
	
	    if (!this.writable) {
	      debug('we are currently writing - waiting to pause');
	      total++;
	      this.once('drain', function(){
	        debug('pre-pause writing complete');
	        --total || pause();
	      });
	    }
	  } else {
	    pause();
	  }
	};
	
	/**
	 * Starts polling cycle.
	 *
	 * @api public
	 */
	
	Polling.prototype.poll = function(){
	  debug('polling');
	  this.polling = true;
	  this.doPoll();
	  this.emit('poll');
	};
	
	/**
	 * Overloads onData to detect payloads.
	 *
	 * @api private
	 */
	
	Polling.prototype.onData = function(data){
	  var self = this;
	  debug('polling got data %s', data);
	  var callback = function(packet, index, total) {
	    // if its the first message we consider the transport open
	    if ('opening' == self.readyState) {
	      self.onOpen();
	    }
	
	    // if its a close packet, we close the ongoing requests
	    if ('close' == packet.type) {
	      self.onClose();
	      return false;
	    }
	
	    // otherwise bypass onData and handle the message
	    self.onPacket(packet);
	  };
	
	  // decode payload
	  parser.decodePayload(data, this.socket.binaryType, callback);
	
	  // if an event did not trigger closing
	  if ('closed' != this.readyState) {
	    // if we got data we're not polling
	    this.polling = false;
	    this.emit('pollComplete');
	
	    if ('open' == this.readyState) {
	      this.poll();
	    } else {
	      debug('ignoring poll - transport state "%s"', this.readyState);
	    }
	  }
	};
	
	/**
	 * For polling, send a close packet.
	 *
	 * @api private
	 */
	
	Polling.prototype.doClose = function(){
	  var self = this;
	
	  function close(){
	    debug('writing close packet');
	    self.write([{ type: 'close' }]);
	  }
	
	  if ('open' == this.readyState) {
	    debug('transport open - closing');
	    close();
	  } else {
	    // in case we're trying to close while
	    // handshaking is in progress (GH-164)
	    debug('transport not open - deferring close');
	    this.once('open', close);
	  }
	};
	
	/**
	 * Writes a packets payload.
	 *
	 * @param {Array} data packets
	 * @param {Function} drain callback
	 * @api private
	 */
	
	Polling.prototype.write = function(packets){
	  var self = this;
	  this.writable = false;
	  var callbackfn = function() {
	    self.writable = true;
	    self.emit('drain');
	  };
	
	  var self = this;
	  parser.encodePayload(packets, this.supportsBinary, function(data) {
	    self.doWrite(data, callbackfn);
	  });
	};
	
	/**
	 * Generates uri for connection.
	 *
	 * @api private
	 */
	
	Polling.prototype.uri = function(){
	  var query = this.query || {};
	  var schema = this.secure ? 'https' : 'http';
	  var port = '';
	
	  // cache busting is forced
	  if (false !== this.timestampRequests) {
	    query[this.timestampParam] = +new Date + '-' + Transport.timestamps++;
	  }
	
	  if (!this.supportsBinary && !query.sid) {
	    query.b64 = 1;
	  }
	
	  query = parseqs.encode(query);
	
	  // avoid port if default for schema
	  if (this.port && (('https' == schema && this.port != 443) ||
	     ('http' == schema && this.port != 80))) {
	    port = ':' + this.port;
	  }
	
	  // prepend ? to query
	  if (query.length) {
	    query = '?' + query;
	  }
	
	  return schema + '://' + this.hostname + port + this.path + query;
	};


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var parser = __webpack_require__(25);
	var Emitter = __webpack_require__(11);
	
	/**
	 * Module exports.
	 */
	
	module.exports = Transport;
	
	/**
	 * Transport abstract constructor.
	 *
	 * @param {Object} options.
	 * @api private
	 */
	
	function Transport (opts) {
	  this.path = opts.path;
	  this.hostname = opts.hostname;
	  this.port = opts.port;
	  this.secure = opts.secure;
	  this.query = opts.query;
	  this.timestampParam = opts.timestampParam;
	  this.timestampRequests = opts.timestampRequests;
	  this.readyState = '';
	  this.agent = opts.agent || false;
	  this.socket = opts.socket;
	  this.enablesXDR = opts.enablesXDR;
	
	  // SSL options for Node.js client
	  this.pfx = opts.pfx;
	  this.key = opts.key;
	  this.passphrase = opts.passphrase;
	  this.cert = opts.cert;
	  this.ca = opts.ca;
	  this.ciphers = opts.ciphers;
	  this.rejectUnauthorized = opts.rejectUnauthorized;
	}
	
	/**
	 * Mix in `Emitter`.
	 */
	
	Emitter(Transport.prototype);
	
	/**
	 * A counter used to prevent collisions in the timestamps used
	 * for cache busting.
	 */
	
	Transport.timestamps = 0;
	
	/**
	 * Emits an error.
	 *
	 * @param {String} str
	 * @return {Transport} for chaining
	 * @api public
	 */
	
	Transport.prototype.onError = function (msg, desc) {
	  var err = new Error(msg);
	  err.type = 'TransportError';
	  err.description = desc;
	  this.emit('error', err);
	  return this;
	};
	
	/**
	 * Opens the transport.
	 *
	 * @api public
	 */
	
	Transport.prototype.open = function () {
	  if ('closed' == this.readyState || '' == this.readyState) {
	    this.readyState = 'opening';
	    this.doOpen();
	  }
	
	  return this;
	};
	
	/**
	 * Closes the transport.
	 *
	 * @api private
	 */
	
	Transport.prototype.close = function () {
	  if ('opening' == this.readyState || 'open' == this.readyState) {
	    this.doClose();
	    this.onClose();
	  }
	
	  return this;
	};
	
	/**
	 * Sends multiple packets.
	 *
	 * @param {Array} packets
	 * @api private
	 */
	
	Transport.prototype.send = function(packets){
	  if ('open' == this.readyState) {
	    this.write(packets);
	  } else {
	    throw new Error('Transport not open');
	  }
	};
	
	/**
	 * Called upon open
	 *
	 * @api private
	 */
	
	Transport.prototype.onOpen = function () {
	  this.readyState = 'open';
	  this.writable = true;
	  this.emit('open');
	};
	
	/**
	 * Called with data.
	 *
	 * @param {String} data
	 * @api private
	 */
	
	Transport.prototype.onData = function(data){
	  var packet = parser.decodePacket(data, this.socket.binaryType);
	  this.onPacket(packet);
	};
	
	/**
	 * Called with a decoded packet.
	 */
	
	Transport.prototype.onPacket = function (packet) {
	  this.emit('packet', packet);
	};
	
	/**
	 * Called upon close.
	 *
	 * @api private
	 */
	
	Transport.prototype.onClose = function () {
	  this.readyState = 'closed';
	  this.emit('close');
	};


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module dependencies.
	 */
	
	var keys = __webpack_require__(26);
	var hasBinary = __webpack_require__(27);
	var sliceBuffer = __webpack_require__(29);
	var base64encoder = __webpack_require__(30);
	var after = __webpack_require__(31);
	var utf8 = __webpack_require__(32);
	
	/**
	 * Check if we are running an android browser. That requires us to use
	 * ArrayBuffer with polling transports...
	 *
	 * http://ghinda.net/jpeg-blob-ajax-android/
	 */
	
	var isAndroid = navigator.userAgent.match(/Android/i);
	
	/**
	 * Check if we are running in PhantomJS.
	 * Uploading a Blob with PhantomJS does not work correctly, as reported here:
	 * https://github.com/ariya/phantomjs/issues/11395
	 * @type boolean
	 */
	var isPhantomJS = /PhantomJS/i.test(navigator.userAgent);
	
	/**
	 * When true, avoids using Blobs to encode payloads.
	 * @type boolean
	 */
	var dontSendBlobs = isAndroid || isPhantomJS;
	
	/**
	 * Current protocol version.
	 */
	
	exports.protocol = 3;
	
	/**
	 * Packet types.
	 */
	
	var packets = exports.packets = {
	    open:     0    // non-ws
	  , close:    1    // non-ws
	  , ping:     2
	  , pong:     3
	  , message:  4
	  , upgrade:  5
	  , noop:     6
	};
	
	var packetslist = keys(packets);
	
	/**
	 * Premade error packet.
	 */
	
	var err = { type: 'error', data: 'parser error' };
	
	/**
	 * Create a blob api even for blob builder when vendor prefixes exist
	 */
	
	var Blob = __webpack_require__(34);
	
	/**
	 * Encodes a packet.
	 *
	 *     <packet type id> [ <data> ]
	 *
	 * Example:
	 *
	 *     5hello world
	 *     3
	 *     4
	 *
	 * Binary is encoded in an identical principle
	 *
	 * @api private
	 */
	
	exports.encodePacket = function (packet, supportsBinary, utf8encode, callback) {
	  if ('function' == typeof supportsBinary) {
	    callback = supportsBinary;
	    supportsBinary = false;
	  }
	
	  if ('function' == typeof utf8encode) {
	    callback = utf8encode;
	    utf8encode = null;
	  }
	
	  var data = (packet.data === undefined)
	    ? undefined
	    : packet.data.buffer || packet.data;
	
	  if (global.ArrayBuffer && data instanceof ArrayBuffer) {
	    return encodeArrayBuffer(packet, supportsBinary, callback);
	  } else if (Blob && data instanceof global.Blob) {
	    return encodeBlob(packet, supportsBinary, callback);
	  }
	
	  // might be an object with { base64: true, data: dataAsBase64String }
	  if (data && data.base64) {
	    return encodeBase64Object(packet, callback);
	  }
	
	  // Sending data as a utf-8 string
	  var encoded = packets[packet.type];
	
	  // data fragment is optional
	  if (undefined !== packet.data) {
	    encoded += utf8encode ? utf8.encode(String(packet.data)) : String(packet.data);
	  }
	
	  return callback('' + encoded);
	
	};
	
	function encodeBase64Object(packet, callback) {
	  // packet data is an object { base64: true, data: dataAsBase64String }
	  var message = 'b' + exports.packets[packet.type] + packet.data.data;
	  return callback(message);
	}
	
	/**
	 * Encode packet helpers for binary types
	 */
	
	function encodeArrayBuffer(packet, supportsBinary, callback) {
	  if (!supportsBinary) {
	    return exports.encodeBase64Packet(packet, callback);
	  }
	
	  var data = packet.data;
	  var contentArray = new Uint8Array(data);
	  var resultBuffer = new Uint8Array(1 + data.byteLength);
	
	  resultBuffer[0] = packets[packet.type];
	  for (var i = 0; i < contentArray.length; i++) {
	    resultBuffer[i+1] = contentArray[i];
	  }
	
	  return callback(resultBuffer.buffer);
	}
	
	function encodeBlobAsArrayBuffer(packet, supportsBinary, callback) {
	  if (!supportsBinary) {
	    return exports.encodeBase64Packet(packet, callback);
	  }
	
	  var fr = new FileReader();
	  fr.onload = function() {
	    packet.data = fr.result;
	    exports.encodePacket(packet, supportsBinary, true, callback);
	  };
	  return fr.readAsArrayBuffer(packet.data);
	}
	
	function encodeBlob(packet, supportsBinary, callback) {
	  if (!supportsBinary) {
	    return exports.encodeBase64Packet(packet, callback);
	  }
	
	  if (dontSendBlobs) {
	    return encodeBlobAsArrayBuffer(packet, supportsBinary, callback);
	  }
	
	  var length = new Uint8Array(1);
	  length[0] = packets[packet.type];
	  var blob = new Blob([length.buffer, packet.data]);
	
	  return callback(blob);
	}
	
	/**
	 * Encodes a packet with binary data in a base64 string
	 *
	 * @param {Object} packet, has `type` and `data`
	 * @return {String} base64 encoded message
	 */
	
	exports.encodeBase64Packet = function(packet, callback) {
	  var message = 'b' + exports.packets[packet.type];
	  if (Blob && packet.data instanceof Blob) {
	    var fr = new FileReader();
	    fr.onload = function() {
	      var b64 = fr.result.split(',')[1];
	      callback(message + b64);
	    };
	    return fr.readAsDataURL(packet.data);
	  }
	
	  var b64data;
	  try {
	    b64data = String.fromCharCode.apply(null, new Uint8Array(packet.data));
	  } catch (e) {
	    // iPhone Safari doesn't let you apply with typed arrays
	    var typed = new Uint8Array(packet.data);
	    var basic = new Array(typed.length);
	    for (var i = 0; i < typed.length; i++) {
	      basic[i] = typed[i];
	    }
	    b64data = String.fromCharCode.apply(null, basic);
	  }
	  message += global.btoa(b64data);
	  return callback(message);
	};
	
	/**
	 * Decodes a packet. Changes format to Blob if requested.
	 *
	 * @return {Object} with `type` and `data` (if any)
	 * @api private
	 */
	
	exports.decodePacket = function (data, binaryType, utf8decode) {
	  // String data
	  if (typeof data == 'string' || data === undefined) {
	    if (data.charAt(0) == 'b') {
	      return exports.decodeBase64Packet(data.substr(1), binaryType);
	    }
	
	    if (utf8decode) {
	      try {
	        data = utf8.decode(data);
	      } catch (e) {
	        return err;
	      }
	    }
	    var type = data.charAt(0);
	
	    if (Number(type) != type || !packetslist[type]) {
	      return err;
	    }
	
	    if (data.length > 1) {
	      return { type: packetslist[type], data: data.substring(1) };
	    } else {
	      return { type: packetslist[type] };
	    }
	  }
	
	  var asArray = new Uint8Array(data);
	  var type = asArray[0];
	  var rest = sliceBuffer(data, 1);
	  if (Blob && binaryType === 'blob') {
	    rest = new Blob([rest]);
	  }
	  return { type: packetslist[type], data: rest };
	};
	
	/**
	 * Decodes a packet encoded in a base64 string
	 *
	 * @param {String} base64 encoded message
	 * @return {Object} with `type` and `data` (if any)
	 */
	
	exports.decodeBase64Packet = function(msg, binaryType) {
	  var type = packetslist[msg.charAt(0)];
	  if (!global.ArrayBuffer) {
	    return { type: type, data: { base64: true, data: msg.substr(1) } };
	  }
	
	  var data = base64encoder.decode(msg.substr(1));
	
	  if (binaryType === 'blob' && Blob) {
	    data = new Blob([data]);
	  }
	
	  return { type: type, data: data };
	};
	
	/**
	 * Encodes multiple messages (payload).
	 *
	 *     <length>:data
	 *
	 * Example:
	 *
	 *     11:hello world2:hi
	 *
	 * If any contents are binary, they will be encoded as base64 strings. Base64
	 * encoded strings are marked with a b before the length specifier
	 *
	 * @param {Array} packets
	 * @api private
	 */
	
	exports.encodePayload = function (packets, supportsBinary, callback) {
	  if (typeof supportsBinary == 'function') {
	    callback = supportsBinary;
	    supportsBinary = null;
	  }
	
	  var isBinary = hasBinary(packets);
	
	  if (supportsBinary && isBinary) {
	    if (Blob && !dontSendBlobs) {
	      return exports.encodePayloadAsBlob(packets, callback);
	    }
	
	    return exports.encodePayloadAsArrayBuffer(packets, callback);
	  }
	
	  if (!packets.length) {
	    return callback('0:');
	  }
	
	  function setLengthHeader(message) {
	    return message.length + ':' + message;
	  }
	
	  function encodeOne(packet, doneCallback) {
	    exports.encodePacket(packet, !isBinary ? false : supportsBinary, true, function(message) {
	      doneCallback(null, setLengthHeader(message));
	    });
	  }
	
	  map(packets, encodeOne, function(err, results) {
	    return callback(results.join(''));
	  });
	};
	
	/**
	 * Async array map using after
	 */
	
	function map(ary, each, done) {
	  var result = new Array(ary.length);
	  var next = after(ary.length, done);
	
	  var eachWithIndex = function(i, el, cb) {
	    each(el, function(error, msg) {
	      result[i] = msg;
	      cb(error, result);
	    });
	  };
	
	  for (var i = 0; i < ary.length; i++) {
	    eachWithIndex(i, ary[i], next);
	  }
	}
	
	/*
	 * Decodes data when a payload is maybe expected. Possible binary contents are
	 * decoded from their base64 representation
	 *
	 * @param {String} data, callback method
	 * @api public
	 */
	
	exports.decodePayload = function (data, binaryType, callback) {
	  if (typeof data != 'string') {
	    return exports.decodePayloadAsBinary(data, binaryType, callback);
	  }
	
	  if (typeof binaryType === 'function') {
	    callback = binaryType;
	    binaryType = null;
	  }
	
	  var packet;
	  if (data == '') {
	    // parser error - ignoring payload
	    return callback(err, 0, 1);
	  }
	
	  var length = ''
	    , n, msg;
	
	  for (var i = 0, l = data.length; i < l; i++) {
	    var chr = data.charAt(i);
	
	    if (':' != chr) {
	      length += chr;
	    } else {
	      if ('' == length || (length != (n = Number(length)))) {
	        // parser error - ignoring payload
	        return callback(err, 0, 1);
	      }
	
	      msg = data.substr(i + 1, n);
	
	      if (length != msg.length) {
	        // parser error - ignoring payload
	        return callback(err, 0, 1);
	      }
	
	      if (msg.length) {
	        packet = exports.decodePacket(msg, binaryType, true);
	
	        if (err.type == packet.type && err.data == packet.data) {
	          // parser error in individual packet - ignoring payload
	          return callback(err, 0, 1);
	        }
	
	        var ret = callback(packet, i + n, l);
	        if (false === ret) return;
	      }
	
	      // advance cursor
	      i += n;
	      length = '';
	    }
	  }
	
	  if (length != '') {
	    // parser error - ignoring payload
	    return callback(err, 0, 1);
	  }
	
	};
	
	/**
	 * Encodes multiple messages (payload) as binary.
	 *
	 * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
	 * 255><data>
	 *
	 * Example:
	 * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
	 *
	 * @param {Array} packets
	 * @return {ArrayBuffer} encoded payload
	 * @api private
	 */
	
	exports.encodePayloadAsArrayBuffer = function(packets, callback) {
	  if (!packets.length) {
	    return callback(new ArrayBuffer(0));
	  }
	
	  function encodeOne(packet, doneCallback) {
	    exports.encodePacket(packet, true, true, function(data) {
	      return doneCallback(null, data);
	    });
	  }
	
	  map(packets, encodeOne, function(err, encodedPackets) {
	    var totalLength = encodedPackets.reduce(function(acc, p) {
	      var len;
	      if (typeof p === 'string'){
	        len = p.length;
	      } else {
	        len = p.byteLength;
	      }
	      return acc + len.toString().length + len + 2; // string/binary identifier + separator = 2
	    }, 0);
	
	    var resultArray = new Uint8Array(totalLength);
	
	    var bufferIndex = 0;
	    encodedPackets.forEach(function(p) {
	      var isString = typeof p === 'string';
	      var ab = p;
	      if (isString) {
	        var view = new Uint8Array(p.length);
	        for (var i = 0; i < p.length; i++) {
	          view[i] = p.charCodeAt(i);
	        }
	        ab = view.buffer;
	      }
	
	      if (isString) { // not true binary
	        resultArray[bufferIndex++] = 0;
	      } else { // true binary
	        resultArray[bufferIndex++] = 1;
	      }
	
	      var lenStr = ab.byteLength.toString();
	      for (var i = 0; i < lenStr.length; i++) {
	        resultArray[bufferIndex++] = parseInt(lenStr[i]);
	      }
	      resultArray[bufferIndex++] = 255;
	
	      var view = new Uint8Array(ab);
	      for (var i = 0; i < view.length; i++) {
	        resultArray[bufferIndex++] = view[i];
	      }
	    });
	
	    return callback(resultArray.buffer);
	  });
	};
	
	/**
	 * Encode as Blob
	 */
	
	exports.encodePayloadAsBlob = function(packets, callback) {
	  function encodeOne(packet, doneCallback) {
	    exports.encodePacket(packet, true, true, function(encoded) {
	      var binaryIdentifier = new Uint8Array(1);
	      binaryIdentifier[0] = 1;
	      if (typeof encoded === 'string') {
	        var view = new Uint8Array(encoded.length);
	        for (var i = 0; i < encoded.length; i++) {
	          view[i] = encoded.charCodeAt(i);
	        }
	        encoded = view.buffer;
	        binaryIdentifier[0] = 0;
	      }
	
	      var len = (encoded instanceof ArrayBuffer)
	        ? encoded.byteLength
	        : encoded.size;
	
	      var lenStr = len.toString();
	      var lengthAry = new Uint8Array(lenStr.length + 1);
	      for (var i = 0; i < lenStr.length; i++) {
	        lengthAry[i] = parseInt(lenStr[i]);
	      }
	      lengthAry[lenStr.length] = 255;
	
	      if (Blob) {
	        var blob = new Blob([binaryIdentifier.buffer, lengthAry.buffer, encoded]);
	        doneCallback(null, blob);
	      }
	    });
	  }
	
	  map(packets, encodeOne, function(err, results) {
	    return callback(new Blob(results));
	  });
	};
	
	/*
	 * Decodes data when a payload is maybe expected. Strings are decoded by
	 * interpreting each byte as a key code for entries marked to start with 0. See
	 * description of encodePayloadAsBinary
	 *
	 * @param {ArrayBuffer} data, callback method
	 * @api public
	 */
	
	exports.decodePayloadAsBinary = function (data, binaryType, callback) {
	  if (typeof binaryType === 'function') {
	    callback = binaryType;
	    binaryType = null;
	  }
	
	  var bufferTail = data;
	  var buffers = [];
	
	  var numberTooLong = false;
	  while (bufferTail.byteLength > 0) {
	    var tailArray = new Uint8Array(bufferTail);
	    var isString = tailArray[0] === 0;
	    var msgLength = '';
	
	    for (var i = 1; ; i++) {
	      if (tailArray[i] == 255) break;
	
	      if (msgLength.length > 310) {
	        numberTooLong = true;
	        break;
	      }
	
	      msgLength += tailArray[i];
	    }
	
	    if(numberTooLong) return callback(err, 0, 1);
	
	    bufferTail = sliceBuffer(bufferTail, 2 + msgLength.length);
	    msgLength = parseInt(msgLength);
	
	    var msg = sliceBuffer(bufferTail, 0, msgLength);
	    if (isString) {
	      try {
	        msg = String.fromCharCode.apply(null, new Uint8Array(msg));
	      } catch (e) {
	        // iPhone Safari doesn't let you apply to typed arrays
	        var typed = new Uint8Array(msg);
	        msg = '';
	        for (var i = 0; i < typed.length; i++) {
	          msg += String.fromCharCode(typed[i]);
	        }
	      }
	    }
	
	    buffers.push(msg);
	    bufferTail = sliceBuffer(bufferTail, msgLength);
	  }
	
	  var total = buffers.length;
	  buffers.forEach(function(buffer, i) {
	    callback(exports.decodePacket(buffer, binaryType, true), i, total);
	  });
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 26 */
/***/ function(module, exports) {

	
	/**
	 * Gets the keys for an object.
	 *
	 * @return {Array} keys
	 * @api private
	 */
	
	module.exports = Object.keys || function keys (obj){
	  var arr = [];
	  var has = Object.prototype.hasOwnProperty;
	
	  for (var i in obj) {
	    if (has.call(obj, i)) {
	      arr.push(i);
	    }
	  }
	  return arr;
	};


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {
	/*
	 * Module requirements.
	 */
	
	var isArray = __webpack_require__(28);
	
	/**
	 * Module exports.
	 */
	
	module.exports = hasBinary;
	
	/**
	 * Checks for binary data.
	 *
	 * Right now only Buffer and ArrayBuffer are supported..
	 *
	 * @param {Object} anything
	 * @api public
	 */
	
	function hasBinary(data) {
	
	  function _hasBinary(obj) {
	    if (!obj) return false;
	
	    if ( (global.Buffer && global.Buffer.isBuffer(obj)) ||
	         (global.ArrayBuffer && obj instanceof ArrayBuffer) ||
	         (global.Blob && obj instanceof Blob) ||
	         (global.File && obj instanceof File)
	        ) {
	      return true;
	    }
	
	    if (isArray(obj)) {
	      for (var i = 0; i < obj.length; i++) {
	          if (_hasBinary(obj[i])) {
	              return true;
	          }
	      }
	    } else if (obj && 'object' == typeof obj) {
	      if (obj.toJSON) {
	        obj = obj.toJSON();
	      }
	
	      for (var key in obj) {
	        if (obj.hasOwnProperty(key) && _hasBinary(obj[key])) {
	          return true;
	        }
	      }
	    }
	
	    return false;
	  }
	
	  return _hasBinary(data);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};


/***/ },
/* 29 */
/***/ function(module, exports) {

	/**
	 * An abstraction for slicing an arraybuffer even when
	 * ArrayBuffer.prototype.slice is not supported
	 *
	 * @api public
	 */
	
	module.exports = function(arraybuffer, start, end) {
	  var bytes = arraybuffer.byteLength;
	  start = start || 0;
	  end = end || bytes;
	
	  if (arraybuffer.slice) { return arraybuffer.slice(start, end); }
	
	  if (start < 0) { start += bytes; }
	  if (end < 0) { end += bytes; }
	  if (end > bytes) { end = bytes; }
	
	  if (start >= bytes || start >= end || bytes === 0) {
	    return new ArrayBuffer(0);
	  }
	
	  var abv = new Uint8Array(arraybuffer);
	  var result = new Uint8Array(end - start);
	  for (var i = start, ii = 0; i < end; i++, ii++) {
	    result[ii] = abv[i];
	  }
	  return result.buffer;
	};


/***/ },
/* 30 */
/***/ function(module, exports) {

	/*
	 * base64-arraybuffer
	 * https://github.com/niklasvh/base64-arraybuffer
	 *
	 * Copyright (c) 2012 Niklas von Hertzen
	 * Licensed under the MIT license.
	 */
	(function(chars){
	  "use strict";
	
	  exports.encode = function(arraybuffer) {
	    var bytes = new Uint8Array(arraybuffer),
	    i, len = bytes.length, base64 = "";
	
	    for (i = 0; i < len; i+=3) {
	      base64 += chars[bytes[i] >> 2];
	      base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
	      base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
	      base64 += chars[bytes[i + 2] & 63];
	    }
	
	    if ((len % 3) === 2) {
	      base64 = base64.substring(0, base64.length - 1) + "=";
	    } else if (len % 3 === 1) {
	      base64 = base64.substring(0, base64.length - 2) + "==";
	    }
	
	    return base64;
	  };
	
	  exports.decode =  function(base64) {
	    var bufferLength = base64.length * 0.75,
	    len = base64.length, i, p = 0,
	    encoded1, encoded2, encoded3, encoded4;
	
	    if (base64[base64.length - 1] === "=") {
	      bufferLength--;
	      if (base64[base64.length - 2] === "=") {
	        bufferLength--;
	      }
	    }
	
	    var arraybuffer = new ArrayBuffer(bufferLength),
	    bytes = new Uint8Array(arraybuffer);
	
	    for (i = 0; i < len; i+=4) {
	      encoded1 = chars.indexOf(base64[i]);
	      encoded2 = chars.indexOf(base64[i+1]);
	      encoded3 = chars.indexOf(base64[i+2]);
	      encoded4 = chars.indexOf(base64[i+3]);
	
	      bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
	      bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
	      bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
	    }
	
	    return arraybuffer;
	  };
	})("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");


/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = after
	
	function after(count, callback, err_cb) {
	    var bail = false
	    err_cb = err_cb || noop
	    proxy.count = count
	
	    return (count === 0) ? callback() : proxy
	
	    function proxy(err, result) {
	        if (proxy.count <= 0) {
	            throw new Error('after called too many times')
	        }
	        --proxy.count
	
	        // after first error, rest are passed to err_cb
	        if (err) {
	            bail = true
	            callback(err)
	            // future error callbacks will go to error handler
	            callback = err_cb
	        } else if (proxy.count === 0 && !bail) {
	            callback(null, result)
	        }
	    }
	}
	
	function noop() {}


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! http://mths.be/utf8js v2.0.0 by @mathias */
	;(function(root) {
	
		// Detect free variables `exports`
		var freeExports = typeof exports == 'object' && exports;
	
		// Detect free variable `module`
		var freeModule = typeof module == 'object' && module &&
			module.exports == freeExports && module;
	
		// Detect free variable `global`, from Node.js or Browserified code,
		// and use it as `root`
		var freeGlobal = typeof global == 'object' && global;
		if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
			root = freeGlobal;
		}
	
		/*--------------------------------------------------------------------------*/
	
		var stringFromCharCode = String.fromCharCode;
	
		// Taken from http://mths.be/punycode
		function ucs2decode(string) {
			var output = [];
			var counter = 0;
			var length = string.length;
			var value;
			var extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}
	
		// Taken from http://mths.be/punycode
		function ucs2encode(array) {
			var length = array.length;
			var index = -1;
			var value;
			var output = '';
			while (++index < length) {
				value = array[index];
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
			}
			return output;
		}
	
		/*--------------------------------------------------------------------------*/
	
		function createByte(codePoint, shift) {
			return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
		}
	
		function encodeCodePoint(codePoint) {
			if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
				return stringFromCharCode(codePoint);
			}
			var symbol = '';
			if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
				symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
			}
			else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
				symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
				symbol += createByte(codePoint, 6);
			}
			else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
				symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
				symbol += createByte(codePoint, 12);
				symbol += createByte(codePoint, 6);
			}
			symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
			return symbol;
		}
	
		function utf8encode(string) {
			var codePoints = ucs2decode(string);
	
			// console.log(JSON.stringify(codePoints.map(function(x) {
			// 	return 'U+' + x.toString(16).toUpperCase();
			// })));
	
			var length = codePoints.length;
			var index = -1;
			var codePoint;
			var byteString = '';
			while (++index < length) {
				codePoint = codePoints[index];
				byteString += encodeCodePoint(codePoint);
			}
			return byteString;
		}
	
		/*--------------------------------------------------------------------------*/
	
		function readContinuationByte() {
			if (byteIndex >= byteCount) {
				throw Error('Invalid byte index');
			}
	
			var continuationByte = byteArray[byteIndex] & 0xFF;
			byteIndex++;
	
			if ((continuationByte & 0xC0) == 0x80) {
				return continuationByte & 0x3F;
			}
	
			// If we end up here, it’s not a continuation byte
			throw Error('Invalid continuation byte');
		}
	
		function decodeSymbol() {
			var byte1;
			var byte2;
			var byte3;
			var byte4;
			var codePoint;
	
			if (byteIndex > byteCount) {
				throw Error('Invalid byte index');
			}
	
			if (byteIndex == byteCount) {
				return false;
			}
	
			// Read first byte
			byte1 = byteArray[byteIndex] & 0xFF;
			byteIndex++;
	
			// 1-byte sequence (no continuation bytes)
			if ((byte1 & 0x80) == 0) {
				return byte1;
			}
	
			// 2-byte sequence
			if ((byte1 & 0xE0) == 0xC0) {
				var byte2 = readContinuationByte();
				codePoint = ((byte1 & 0x1F) << 6) | byte2;
				if (codePoint >= 0x80) {
					return codePoint;
				} else {
					throw Error('Invalid continuation byte');
				}
			}
	
			// 3-byte sequence (may include unpaired surrogates)
			if ((byte1 & 0xF0) == 0xE0) {
				byte2 = readContinuationByte();
				byte3 = readContinuationByte();
				codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
				if (codePoint >= 0x0800) {
					return codePoint;
				} else {
					throw Error('Invalid continuation byte');
				}
			}
	
			// 4-byte sequence
			if ((byte1 & 0xF8) == 0xF0) {
				byte2 = readContinuationByte();
				byte3 = readContinuationByte();
				byte4 = readContinuationByte();
				codePoint = ((byte1 & 0x0F) << 0x12) | (byte2 << 0x0C) |
					(byte3 << 0x06) | byte4;
				if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
					return codePoint;
				}
			}
	
			throw Error('Invalid UTF-8 detected');
		}
	
		var byteArray;
		var byteCount;
		var byteIndex;
		function utf8decode(byteString) {
			byteArray = ucs2decode(byteString);
			byteCount = byteArray.length;
			byteIndex = 0;
			var codePoints = [];
			var tmp;
			while ((tmp = decodeSymbol()) !== false) {
				codePoints.push(tmp);
			}
			return ucs2encode(codePoints);
		}
	
		/*--------------------------------------------------------------------------*/
	
		var utf8 = {
			'version': '2.0.0',
			'encode': utf8encode,
			'decode': utf8decode
		};
	
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return utf8;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		}	else if (freeExports && !freeExports.nodeType) {
			if (freeModule) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = utf8;
			} else { // in Narwhal or RingoJS v0.7.0-
				var object = {};
				var hasOwnProperty = object.hasOwnProperty;
				for (var key in utf8) {
					hasOwnProperty.call(utf8, key) && (freeExports[key] = utf8[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.utf8 = utf8;
		}
	
	}(this));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(33)(module), (function() { return this; }())))

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 34 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Create a blob builder even when vendor prefixes exist
	 */
	
	var BlobBuilder = global.BlobBuilder
	  || global.WebKitBlobBuilder
	  || global.MSBlobBuilder
	  || global.MozBlobBuilder;
	
	/**
	 * Check if Blob constructor is supported
	 */
	
	var blobSupported = (function() {
	  try {
	    var b = new Blob(['hi']);
	    return b.size == 2;
	  } catch(e) {
	    return false;
	  }
	})();
	
	/**
	 * Check if BlobBuilder is supported
	 */
	
	var blobBuilderSupported = BlobBuilder
	  && BlobBuilder.prototype.append
	  && BlobBuilder.prototype.getBlob;
	
	function BlobBuilderConstructor(ary, options) {
	  options = options || {};
	
	  var bb = new BlobBuilder();
	  for (var i = 0; i < ary.length; i++) {
	    bb.append(ary[i]);
	  }
	  return (options.type) ? bb.getBlob(options.type) : bb.getBlob();
	};
	
	module.exports = (function() {
	  if (blobSupported) {
	    return global.Blob;
	  } else if (blobBuilderSupported) {
	    return BlobBuilderConstructor;
	  } else {
	    return undefined;
	  }
	})();
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 35 */
/***/ function(module, exports) {

	/**
	 * Compiles a querystring
	 * Returns string representation of the object
	 *
	 * @param {Object}
	 * @api private
	 */
	
	exports.encode = function (obj) {
	  var str = '';
	
	  for (var i in obj) {
	    if (obj.hasOwnProperty(i)) {
	      if (str.length) str += '&';
	      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
	    }
	  }
	
	  return str;
	};
	
	/**
	 * Parses a simple querystring into an object
	 *
	 * @param {String} qs
	 * @api private
	 */
	
	exports.decode = function(qs){
	  var qry = {};
	  var pairs = qs.split('&');
	  for (var i = 0, l = pairs.length; i < l; i++) {
	    var pair = pairs[i].split('=');
	    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
	  }
	  return qry;
	};


/***/ },
/* 36 */
/***/ function(module, exports) {

	
	module.exports = function(a, b){
	  var fn = function(){};
	  fn.prototype = b.prototype;
	  a.prototype = new fn;
	  a.prototype.constructor = a;
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = __webpack_require__(38);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	
	/**
	 * Colors.
	 */
	
	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];
	
	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */
	
	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  return ('WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
	}
	
	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */
	
	exports.formatters.j = function(v) {
	  return JSON.stringify(v);
	};
	
	
	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */
	
	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;
	
	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);
	
	  if (!useColors) return args;
	
	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));
	
	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });
	
	  args.splice(lastC, 0, c);
	  return args;
	}
	
	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */
	
	function log() {
	  // This hackery is required for IE8,
	  // where the `console.log` function doesn't have 'apply'
	  return 'object' == typeof console
	    && 'function' == typeof console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}
	
	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */
	
	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      localStorage.removeItem('debug');
	    } else {
	      localStorage.debug = namespaces;
	    }
	  } catch(e) {}
	}
	
	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */
	
	function load() {
	  var r;
	  try {
	    r = localStorage.debug;
	  } catch(e) {}
	  return r;
	}
	
	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */
	
	exports.enable(load());


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(39);
	
	/**
	 * The currently active debug mode names, and names to skip.
	 */
	
	exports.names = [];
	exports.skips = [];
	
	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */
	
	exports.formatters = {};
	
	/**
	 * Previously assigned color.
	 */
	
	var prevColor = 0;
	
	/**
	 * Previous log timestamp.
	 */
	
	var prevTime;
	
	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */
	
	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}
	
	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */
	
	function debug(namespace) {
	
	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;
	
	  // define the `enabled` version
	  function enabled() {
	
	    var self = enabled;
	
	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;
	
	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();
	
	    var args = Array.prototype.slice.call(arguments);
	
	    args[0] = exports.coerce(args[0]);
	
	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }
	
	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);
	
	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });
	
	    if ('function' === typeof exports.formatArgs) {
	      args = exports.formatArgs.apply(self, args);
	    }
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;
	
	  var fn = exports.enabled(namespace) ? enabled : disabled;
	
	  fn.namespace = namespace;
	
	  return fn;
	}
	
	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */
	
	function enable(namespaces) {
	  exports.save(namespaces);
	
	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;
	
	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}
	
	/**
	 * Disable debug output.
	 *
	 * @api public
	 */
	
	function disable() {
	  exports.enable('');
	}
	
	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */
	
	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */
	
	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ },
/* 39 */
/***/ function(module, exports) {

	/**
	 * Helpers.
	 */
	
	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;
	
	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @return {String|Number}
	 * @api public
	 */
	
	module.exports = function(val, options){
	  options = options || {};
	  if ('string' == typeof val) return parse(val);
	  return options.long
	    ? long(val)
	    : short(val);
	};
	
	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */
	
	function parse(str) {
	  var match = /^((?:\d+)?\.?\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)?$/i.exec(str);
	  if (!match) return;
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 's':
	      return n * s;
	    case 'ms':
	      return n;
	  }
	}
	
	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function short(ms) {
	  if (ms >= d) return Math.round(ms / d) + 'd';
	  if (ms >= h) return Math.round(ms / h) + 'h';
	  if (ms >= m) return Math.round(ms / m) + 'm';
	  if (ms >= s) return Math.round(ms / s) + 's';
	  return ms + 'ms';
	}
	
	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function long(ms) {
	  return plural(ms, d, 'day')
	    || plural(ms, h, 'hour')
	    || plural(ms, m, 'minute')
	    || plural(ms, s, 'second')
	    || ms + ' ms';
	}
	
	/**
	 * Pluralization helper.
	 */
	
	function plural(ms, n, name) {
	  if (ms < n) return;
	  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {
	/**
	 * Module requirements.
	 */
	
	var Polling = __webpack_require__(23);
	var inherit = __webpack_require__(36);
	
	/**
	 * Module exports.
	 */
	
	module.exports = JSONPPolling;
	
	/**
	 * Cached regular expressions.
	 */
	
	var rNewline = /\n/g;
	var rEscapedNewline = /\\n/g;
	
	/**
	 * Global JSONP callbacks.
	 */
	
	var callbacks;
	
	/**
	 * Callbacks count.
	 */
	
	var index = 0;
	
	/**
	 * Noop.
	 */
	
	function empty () { }
	
	/**
	 * JSONP Polling constructor.
	 *
	 * @param {Object} opts.
	 * @api public
	 */
	
	function JSONPPolling (opts) {
	  Polling.call(this, opts);
	
	  this.query = this.query || {};
	
	  // define global callbacks array if not present
	  // we do this here (lazily) to avoid unneeded global pollution
	  if (!callbacks) {
	    // we need to consider multiple engines in the same page
	    if (!global.___eio) global.___eio = [];
	    callbacks = global.___eio;
	  }
	
	  // callback identifier
	  this.index = callbacks.length;
	
	  // add callback to jsonp global
	  var self = this;
	  callbacks.push(function (msg) {
	    self.onData(msg);
	  });
	
	  // append to query string
	  this.query.j = this.index;
	
	  // prevent spurious errors from being emitted when the window is unloaded
	  if (global.document && global.addEventListener) {
	    global.addEventListener('beforeunload', function () {
	      if (self.script) self.script.onerror = empty;
	    }, false);
	  }
	}
	
	/**
	 * Inherits from Polling.
	 */
	
	inherit(JSONPPolling, Polling);
	
	/*
	 * JSONP only supports binary as base64 encoded strings
	 */
	
	JSONPPolling.prototype.supportsBinary = false;
	
	/**
	 * Closes the socket.
	 *
	 * @api private
	 */
	
	JSONPPolling.prototype.doClose = function () {
	  if (this.script) {
	    this.script.parentNode.removeChild(this.script);
	    this.script = null;
	  }
	
	  if (this.form) {
	    this.form.parentNode.removeChild(this.form);
	    this.form = null;
	    this.iframe = null;
	  }
	
	  Polling.prototype.doClose.call(this);
	};
	
	/**
	 * Starts a poll cycle.
	 *
	 * @api private
	 */
	
	JSONPPolling.prototype.doPoll = function () {
	  var self = this;
	  var script = document.createElement('script');
	
	  if (this.script) {
	    this.script.parentNode.removeChild(this.script);
	    this.script = null;
	  }
	
	  script.async = true;
	  script.src = this.uri();
	  script.onerror = function(e){
	    self.onError('jsonp poll error',e);
	  };
	
	  var insertAt = document.getElementsByTagName('script')[0];
	  insertAt.parentNode.insertBefore(script, insertAt);
	  this.script = script;
	
	  var isUAgecko = 'undefined' != typeof navigator && /gecko/i.test(navigator.userAgent);
	  
	  if (isUAgecko) {
	    setTimeout(function () {
	      var iframe = document.createElement('iframe');
	      document.body.appendChild(iframe);
	      document.body.removeChild(iframe);
	    }, 100);
	  }
	};
	
	/**
	 * Writes with a hidden iframe.
	 *
	 * @param {String} data to send
	 * @param {Function} called upon flush.
	 * @api private
	 */
	
	JSONPPolling.prototype.doWrite = function (data, fn) {
	  var self = this;
	
	  if (!this.form) {
	    var form = document.createElement('form');
	    var area = document.createElement('textarea');
	    var id = this.iframeId = 'eio_iframe_' + this.index;
	    var iframe;
	
	    form.className = 'socketio';
	    form.style.position = 'absolute';
	    form.style.top = '-1000px';
	    form.style.left = '-1000px';
	    form.target = id;
	    form.method = 'POST';
	    form.setAttribute('accept-charset', 'utf-8');
	    area.name = 'd';
	    form.appendChild(area);
	    document.body.appendChild(form);
	
	    this.form = form;
	    this.area = area;
	  }
	
	  this.form.action = this.uri();
	
	  function complete () {
	    initIframe();
	    fn();
	  }
	
	  function initIframe () {
	    if (self.iframe) {
	      try {
	        self.form.removeChild(self.iframe);
	      } catch (e) {
	        self.onError('jsonp polling iframe removal error', e);
	      }
	    }
	
	    try {
	      // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
	      var html = '<iframe src="javascript:0" name="'+ self.iframeId +'">';
	      iframe = document.createElement(html);
	    } catch (e) {
	      iframe = document.createElement('iframe');
	      iframe.name = self.iframeId;
	      iframe.src = 'javascript:0';
	    }
	
	    iframe.id = self.iframeId;
	
	    self.form.appendChild(iframe);
	    self.iframe = iframe;
	  }
	
	  initIframe();
	
	  // escape \n to prevent it from being converted into \r\n by some UAs
	  // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
	  data = data.replace(rEscapedNewline, '\\\n');
	  this.area.value = data.replace(rNewline, '\\n');
	
	  try {
	    this.form.submit();
	  } catch(e) {}
	
	  if (this.iframe.attachEvent) {
	    this.iframe.onreadystatechange = function(){
	      if (self.iframe.readyState == 'complete') {
	        complete();
	      }
	    };
	  } else {
	    this.iframe.onload = complete;
	  }
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var Transport = __webpack_require__(24);
	var parser = __webpack_require__(25);
	var parseqs = __webpack_require__(35);
	var inherit = __webpack_require__(36);
	var debug = __webpack_require__(37)('engine.io-client:websocket');
	
	/**
	 * `ws` exposes a WebSocket-compatible interface in
	 * Node, or the `WebSocket` or `MozWebSocket` globals
	 * in the browser.
	 */
	
	var WebSocket = __webpack_require__(42);
	
	/**
	 * Module exports.
	 */
	
	module.exports = WS;
	
	/**
	 * WebSocket transport constructor.
	 *
	 * @api {Object} connection options
	 * @api public
	 */
	
	function WS(opts){
	  var forceBase64 = (opts && opts.forceBase64);
	  if (forceBase64) {
	    this.supportsBinary = false;
	  }
	  Transport.call(this, opts);
	}
	
	/**
	 * Inherits from Transport.
	 */
	
	inherit(WS, Transport);
	
	/**
	 * Transport name.
	 *
	 * @api public
	 */
	
	WS.prototype.name = 'websocket';
	
	/*
	 * WebSockets support binary
	 */
	
	WS.prototype.supportsBinary = true;
	
	/**
	 * Opens socket.
	 *
	 * @api private
	 */
	
	WS.prototype.doOpen = function(){
	  if (!this.check()) {
	    // let probe timeout
	    return;
	  }
	
	  var self = this;
	  var uri = this.uri();
	  var protocols = void(0);
	  var opts = { agent: this.agent };
	
	  // SSL options for Node.js client
	  opts.pfx = this.pfx;
	  opts.key = this.key;
	  opts.passphrase = this.passphrase;
	  opts.cert = this.cert;
	  opts.ca = this.ca;
	  opts.ciphers = this.ciphers;
	  opts.rejectUnauthorized = this.rejectUnauthorized;
	
	  this.ws = new WebSocket(uri, protocols, opts);
	
	  if (this.ws.binaryType === undefined) {
	    this.supportsBinary = false;
	  }
	
	  this.ws.binaryType = 'arraybuffer';
	  this.addEventListeners();
	};
	
	/**
	 * Adds event listeners to the socket
	 *
	 * @api private
	 */
	
	WS.prototype.addEventListeners = function(){
	  var self = this;
	
	  this.ws.onopen = function(){
	    self.onOpen();
	  };
	  this.ws.onclose = function(){
	    self.onClose();
	  };
	  this.ws.onmessage = function(ev){
	    self.onData(ev.data);
	  };
	  this.ws.onerror = function(e){
	    self.onError('websocket error', e);
	  };
	};
	
	/**
	 * Override `onData` to use a timer on iOS.
	 * See: https://gist.github.com/mloughran/2052006
	 *
	 * @api private
	 */
	
	if ('undefined' != typeof navigator
	  && /iPad|iPhone|iPod/i.test(navigator.userAgent)) {
	  WS.prototype.onData = function(data){
	    var self = this;
	    setTimeout(function(){
	      Transport.prototype.onData.call(self, data);
	    }, 0);
	  };
	}
	
	/**
	 * Writes data to socket.
	 *
	 * @param {Array} array of packets.
	 * @api private
	 */
	
	WS.prototype.write = function(packets){
	  var self = this;
	  this.writable = false;
	  // encodePacket efficient as it uses WS framing
	  // no need for encodePayload
	  for (var i = 0, l = packets.length; i < l; i++) {
	    parser.encodePacket(packets[i], this.supportsBinary, function(data) {
	      //Sometimes the websocket has already been closed but the browser didn't
	      //have a chance of informing us about it yet, in that case send will
	      //throw an error
	      try {
	        self.ws.send(data);
	      } catch (e){
	        debug('websocket closed before onclose event');
	      }
	    });
	  }
	
	  function ondrain() {
	    self.writable = true;
	    self.emit('drain');
	  }
	  // fake drain
	  // defer to next tick to allow Socket to clear writeBuffer
	  setTimeout(ondrain, 0);
	};
	
	/**
	 * Called upon close
	 *
	 * @api private
	 */
	
	WS.prototype.onClose = function(){
	  Transport.prototype.onClose.call(this);
	};
	
	/**
	 * Closes socket.
	 *
	 * @api private
	 */
	
	WS.prototype.doClose = function(){
	  if (typeof this.ws !== 'undefined') {
	    this.ws.close();
	  }
	};
	
	/**
	 * Generates uri for connection.
	 *
	 * @api private
	 */
	
	WS.prototype.uri = function(){
	  var query = this.query || {};
	  var schema = this.secure ? 'wss' : 'ws';
	  var port = '';
	
	  // avoid port if default for schema
	  if (this.port && (('wss' == schema && this.port != 443)
	    || ('ws' == schema && this.port != 80))) {
	    port = ':' + this.port;
	  }
	
	  // append timestamp to URI
	  if (this.timestampRequests) {
	    query[this.timestampParam] = +new Date;
	  }
	
	  // communicate binary support capabilities
	  if (!this.supportsBinary) {
	    query.b64 = 1;
	  }
	
	  query = parseqs.encode(query);
	
	  // prepend ? to query
	  if (query.length) {
	    query = '?' + query;
	  }
	
	  return schema + '://' + this.hostname + port + this.path + query;
	};
	
	/**
	 * Feature detection for WebSocket.
	 *
	 * @return {Boolean} whether this transport is available.
	 * @api public
	 */
	
	WS.prototype.check = function(){
	  return !!WebSocket && !('__initialize' in WebSocket && this.name === WS.prototype.name);
	};


/***/ },
/* 42 */
/***/ function(module, exports) {

	
	/**
	 * Module dependencies.
	 */
	
	var global = (function() { return this; })();
	
	/**
	 * WebSocket constructor.
	 */
	
	var WebSocket = global.WebSocket || global.MozWebSocket;
	
	/**
	 * Module exports.
	 */
	
	module.exports = WebSocket ? ws : null;
	
	/**
	 * WebSocket constructor.
	 *
	 * The third `opts` options object gets ignored in web browsers, since it's
	 * non-standard, and throws a TypeError if passed to the constructor.
	 * See: https://github.com/einaros/ws/issues/227
	 *
	 * @param {String} uri
	 * @param {Array} protocols (optional)
	 * @param {Object) opts (optional)
	 * @api public
	 */
	
	function ws(uri, protocols, opts) {
	  var instance;
	  if (protocols) {
	    instance = new WebSocket(uri, protocols);
	  } else {
	    instance = new WebSocket(uri);
	  }
	  return instance;
	}
	
	if (WebSocket) ws.prototype = WebSocket.prototype;


/***/ },
/* 43 */
/***/ function(module, exports) {

	
	var indexOf = [].indexOf;
	
	module.exports = function(arr, obj){
	  if (indexOf) return arr.indexOf(obj);
	  for (var i = 0; i < arr.length; ++i) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	};

/***/ },
/* 44 */
/***/ function(module, exports) {

	/**
	 * Parses an URI
	 *
	 * @author Steven Levithan <stevenlevithan.com> (MIT license)
	 * @api private
	 */
	
	var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
	
	var parts = [
	    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
	];
	
	module.exports = function parseuri(str) {
	    var src = str,
	        b = str.indexOf('['),
	        e = str.indexOf(']');
	
	    if (b != -1 && e != -1) {
	        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
	    }
	
	    var m = re.exec(str || ''),
	        uri = {},
	        i = 14;
	
	    while (i--) {
	        uri[parts[i]] = m[i] || '';
	    }
	
	    if (b != -1 && e != -1) {
	        uri.source = src;
	        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
	        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
	        uri.ipv6uri = true;
	    }
	
	    return uri;
	};


/***/ },
/* 45 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * JSON parse.
	 *
	 * @see Based on jQuery#parseJSON (MIT) and JSON2
	 * @api private
	 */
	
	var rvalidchars = /^[\],:{}\s]*$/;
	var rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
	var rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
	var rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;
	var rtrimLeft = /^\s+/;
	var rtrimRight = /\s+$/;
	
	module.exports = function parsejson(data) {
	  if ('string' != typeof data || !data) {
	    return null;
	  }
	
	  data = data.replace(rtrimLeft, '').replace(rtrimRight, '');
	
	  // Attempt to parse using the native JSON parser first
	  if (global.JSON && JSON.parse) {
	    return JSON.parse(data);
	  }
	
	  if (rvalidchars.test(data.replace(rvalidescape, '@')
	      .replace(rvalidtokens, ']')
	      .replace(rvalidbraces, ''))) {
	    return (new Function('return ' + data))();
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var parser = __webpack_require__(7);
	var Emitter = __webpack_require__(11);
	var toArray = __webpack_require__(47);
	var on = __webpack_require__(48);
	var bind = __webpack_require__(49);
	var debug = __webpack_require__(6)('socket.io-client:socket');
	var hasBin = __webpack_require__(50);
	
	/**
	 * Module exports.
	 */
	
	module.exports = exports = Socket;
	
	/**
	 * Internal events (blacklisted).
	 * These events can't be emitted by the user.
	 *
	 * @api private
	 */
	
	var events = {
	  connect: 1,
	  connect_error: 1,
	  connect_timeout: 1,
	  disconnect: 1,
	  error: 1,
	  reconnect: 1,
	  reconnect_attempt: 1,
	  reconnect_failed: 1,
	  reconnect_error: 1,
	  reconnecting: 1
	};
	
	/**
	 * Shortcut to `Emitter#emit`.
	 */
	
	var emit = Emitter.prototype.emit;
	
	/**
	 * `Socket` constructor.
	 *
	 * @api public
	 */
	
	function Socket(io, nsp){
	  this.io = io;
	  this.nsp = nsp;
	  this.json = this; // compat
	  this.ids = 0;
	  this.acks = {};
	  if (this.io.autoConnect) this.open();
	  this.receiveBuffer = [];
	  this.sendBuffer = [];
	  this.connected = false;
	  this.disconnected = true;
	}
	
	/**
	 * Mix in `Emitter`.
	 */
	
	Emitter(Socket.prototype);
	
	/**
	 * Subscribe to open, close and packet events
	 *
	 * @api private
	 */
	
	Socket.prototype.subEvents = function() {
	  if (this.subs) return;
	
	  var io = this.io;
	  this.subs = [
	    on(io, 'open', bind(this, 'onopen')),
	    on(io, 'packet', bind(this, 'onpacket')),
	    on(io, 'close', bind(this, 'onclose'))
	  ];
	};
	
	/**
	 * "Opens" the socket.
	 *
	 * @api public
	 */
	
	Socket.prototype.open =
	Socket.prototype.connect = function(){
	  if (this.connected) return this;
	
	  this.subEvents();
	  this.io.open(); // ensure open
	  if ('open' == this.io.readyState) this.onopen();
	  return this;
	};
	
	/**
	 * Sends a `message` event.
	 *
	 * @return {Socket} self
	 * @api public
	 */
	
	Socket.prototype.send = function(){
	  var args = toArray(arguments);
	  args.unshift('message');
	  this.emit.apply(this, args);
	  return this;
	};
	
	/**
	 * Override `emit`.
	 * If the event is in `events`, it's emitted normally.
	 *
	 * @param {String} event name
	 * @return {Socket} self
	 * @api public
	 */
	
	Socket.prototype.emit = function(ev){
	  if (events.hasOwnProperty(ev)) {
	    emit.apply(this, arguments);
	    return this;
	  }
	
	  var args = toArray(arguments);
	  var parserType = parser.EVENT; // default
	  if (hasBin(args)) { parserType = parser.BINARY_EVENT; } // binary
	  var packet = { type: parserType, data: args };
	
	  // event ack callback
	  if ('function' == typeof args[args.length - 1]) {
	    debug('emitting packet with ack id %d', this.ids);
	    this.acks[this.ids] = args.pop();
	    packet.id = this.ids++;
	  }
	
	  if (this.connected) {
	    this.packet(packet);
	  } else {
	    this.sendBuffer.push(packet);
	  }
	
	  return this;
	};
	
	/**
	 * Sends a packet.
	 *
	 * @param {Object} packet
	 * @api private
	 */
	
	Socket.prototype.packet = function(packet){
	  packet.nsp = this.nsp;
	  this.io.packet(packet);
	};
	
	/**
	 * Called upon engine `open`.
	 *
	 * @api private
	 */
	
	Socket.prototype.onopen = function(){
	  debug('transport is open - connecting');
	
	  // write connect packet if necessary
	  if ('/' != this.nsp) {
	    this.packet({ type: parser.CONNECT });
	  }
	};
	
	/**
	 * Called upon engine `close`.
	 *
	 * @param {String} reason
	 * @api private
	 */
	
	Socket.prototype.onclose = function(reason){
	  debug('close (%s)', reason);
	  this.connected = false;
	  this.disconnected = true;
	  delete this.id;
	  this.emit('disconnect', reason);
	};
	
	/**
	 * Called with socket packet.
	 *
	 * @param {Object} packet
	 * @api private
	 */
	
	Socket.prototype.onpacket = function(packet){
	  if (packet.nsp != this.nsp) return;
	
	  switch (packet.type) {
	    case parser.CONNECT:
	      this.onconnect();
	      break;
	
	    case parser.EVENT:
	      this.onevent(packet);
	      break;
	
	    case parser.BINARY_EVENT:
	      this.onevent(packet);
	      break;
	
	    case parser.ACK:
	      this.onack(packet);
	      break;
	
	    case parser.BINARY_ACK:
	      this.onack(packet);
	      break;
	
	    case parser.DISCONNECT:
	      this.ondisconnect();
	      break;
	
	    case parser.ERROR:
	      this.emit('error', packet.data);
	      break;
	  }
	};
	
	/**
	 * Called upon a server event.
	 *
	 * @param {Object} packet
	 * @api private
	 */
	
	Socket.prototype.onevent = function(packet){
	  var args = packet.data || [];
	  debug('emitting event %j', args);
	
	  if (null != packet.id) {
	    debug('attaching ack callback to event');
	    args.push(this.ack(packet.id));
	  }
	
	  if (this.connected) {
	    emit.apply(this, args);
	  } else {
	    this.receiveBuffer.push(args);
	  }
	};
	
	/**
	 * Produces an ack callback to emit with an event.
	 *
	 * @api private
	 */
	
	Socket.prototype.ack = function(id){
	  var self = this;
	  var sent = false;
	  return function(){
	    // prevent double callbacks
	    if (sent) return;
	    sent = true;
	    var args = toArray(arguments);
	    debug('sending ack %j', args);
	
	    var type = hasBin(args) ? parser.BINARY_ACK : parser.ACK;
	    self.packet({
	      type: type,
	      id: id,
	      data: args
	    });
	  };
	};
	
	/**
	 * Called upon a server acknowlegement.
	 *
	 * @param {Object} packet
	 * @api private
	 */
	
	Socket.prototype.onack = function(packet){
	  debug('calling ack %s with %j', packet.id, packet.data);
	  var fn = this.acks[packet.id];
	  fn.apply(this, packet.data);
	  delete this.acks[packet.id];
	};
	
	/**
	 * Called upon server connect.
	 *
	 * @api private
	 */
	
	Socket.prototype.onconnect = function(){
	  this.connected = true;
	  this.disconnected = false;
	  this.emit('connect');
	  this.emitBuffered();
	};
	
	/**
	 * Emit buffered events (received and emitted).
	 *
	 * @api private
	 */
	
	Socket.prototype.emitBuffered = function(){
	  var i;
	  for (i = 0; i < this.receiveBuffer.length; i++) {
	    emit.apply(this, this.receiveBuffer[i]);
	  }
	  this.receiveBuffer = [];
	
	  for (i = 0; i < this.sendBuffer.length; i++) {
	    this.packet(this.sendBuffer[i]);
	  }
	  this.sendBuffer = [];
	};
	
	/**
	 * Called upon server disconnect.
	 *
	 * @api private
	 */
	
	Socket.prototype.ondisconnect = function(){
	  debug('server disconnect (%s)', this.nsp);
	  this.destroy();
	  this.onclose('io server disconnect');
	};
	
	/**
	 * Called upon forced client/server side disconnections,
	 * this method ensures the manager stops tracking us and
	 * that reconnections don't get triggered for this.
	 *
	 * @api private.
	 */
	
	Socket.prototype.destroy = function(){
	  if (this.subs) {
	    // clean subscriptions to avoid reconnections
	    for (var i = 0; i < this.subs.length; i++) {
	      this.subs[i].destroy();
	    }
	    this.subs = null;
	  }
	
	  this.io.destroy(this);
	};
	
	/**
	 * Disconnects the socket manually.
	 *
	 * @return {Socket} self
	 * @api public
	 */
	
	Socket.prototype.close =
	Socket.prototype.disconnect = function(){
	  if (this.connected) {
	    debug('performing disconnect (%s)', this.nsp);
	    this.packet({ type: parser.DISCONNECT });
	  }
	
	  // remove socket from pool
	  this.destroy();
	
	  if (this.connected) {
	    // fire events
	    this.onclose('io client disconnect');
	  }
	  return this;
	};


/***/ },
/* 47 */
/***/ function(module, exports) {

	module.exports = toArray
	
	function toArray(list, index) {
	    var array = []
	
	    index = index || 0
	
	    for (var i = index || 0; i < list.length; i++) {
	        array[i - index] = list[i]
	    }
	
	    return array
	}


/***/ },
/* 48 */
/***/ function(module, exports) {

	
	/**
	 * Module exports.
	 */
	
	module.exports = on;
	
	/**
	 * Helper for subscriptions.
	 *
	 * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
	 * @param {String} event name
	 * @param {Function} callback
	 * @api public
	 */
	
	function on(obj, ev, fn) {
	  obj.on(ev, fn);
	  return {
	    destroy: function(){
	      obj.removeListener(ev, fn);
	    }
	  };
	}


/***/ },
/* 49 */
/***/ function(module, exports) {

	/**
	 * Slice reference.
	 */
	
	var slice = [].slice;
	
	/**
	 * Bind `obj` to `fn`.
	 *
	 * @param {Object} obj
	 * @param {Function|String} fn or string
	 * @return {Function}
	 * @api public
	 */
	
	module.exports = function(obj, fn){
	  if ('string' == typeof fn) fn = obj[fn];
	  if ('function' != typeof fn) throw new Error('bind() requires a function');
	  var args = slice.call(arguments, 2);
	  return function(){
	    return fn.apply(obj, args.concat(slice.call(arguments)));
	  }
	};


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {
	/*
	 * Module requirements.
	 */
	
	var isArray = __webpack_require__(51);
	
	/**
	 * Module exports.
	 */
	
	module.exports = hasBinary;
	
	/**
	 * Checks for binary data.
	 *
	 * Right now only Buffer and ArrayBuffer are supported..
	 *
	 * @param {Object} anything
	 * @api public
	 */
	
	function hasBinary(data) {
	
	  function _hasBinary(obj) {
	    if (!obj) return false;
	
	    if ( (global.Buffer && global.Buffer.isBuffer(obj)) ||
	         (global.ArrayBuffer && obj instanceof ArrayBuffer) ||
	         (global.Blob && obj instanceof Blob) ||
	         (global.File && obj instanceof File)
	        ) {
	      return true;
	    }
	
	    if (isArray(obj)) {
	      for (var i = 0; i < obj.length; i++) {
	          if (_hasBinary(obj[i])) {
	              return true;
	          }
	      }
	    } else if (obj && 'object' == typeof obj) {
	      if (obj.toJSON) {
	        obj = obj.toJSON();
	      }
	
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key) && _hasBinary(obj[key])) {
	          return true;
	        }
	      }
	    }
	
	    return false;
	  }
	
	  return _hasBinary(data);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};


/***/ },
/* 52 */
/***/ function(module, exports) {

	
	/**
	 * HOP ref.
	 */
	
	var has = Object.prototype.hasOwnProperty;
	
	/**
	 * Return own keys in `obj`.
	 *
	 * @param {Object} obj
	 * @return {Array}
	 * @api public
	 */
	
	exports.keys = Object.keys || function(obj){
	  var keys = [];
	  for (var key in obj) {
	    if (has.call(obj, key)) {
	      keys.push(key);
	    }
	  }
	  return keys;
	};
	
	/**
	 * Return own values in `obj`.
	 *
	 * @param {Object} obj
	 * @return {Array}
	 * @api public
	 */
	
	exports.values = function(obj){
	  var vals = [];
	  for (var key in obj) {
	    if (has.call(obj, key)) {
	      vals.push(obj[key]);
	    }
	  }
	  return vals;
	};
	
	/**
	 * Merge `b` into `a`.
	 *
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object} a
	 * @api public
	 */
	
	exports.merge = function(a, b){
	  for (var key in b) {
	    if (has.call(b, key)) {
	      a[key] = b[key];
	    }
	  }
	  return a;
	};
	
	/**
	 * Return length of `obj`.
	 *
	 * @param {Object} obj
	 * @return {Number}
	 * @api public
	 */
	
	exports.length = function(obj){
	  return exports.keys(obj).length;
	};
	
	/**
	 * Check if `obj` is empty.
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api public
	 */
	
	exports.isEmpty = function(obj){
	  return 0 == exports.length(obj);
	};

/***/ },
/* 53 */
/***/ function(module, exports) {

	
	/**
	 * Expose `Backoff`.
	 */
	
	module.exports = Backoff;
	
	/**
	 * Initialize backoff timer with `opts`.
	 *
	 * - `min` initial timeout in milliseconds [100]
	 * - `max` max timeout [10000]
	 * - `jitter` [0]
	 * - `factor` [2]
	 *
	 * @param {Object} opts
	 * @api public
	 */
	
	function Backoff(opts) {
	  opts = opts || {};
	  this.ms = opts.min || 100;
	  this.max = opts.max || 10000;
	  this.factor = opts.factor || 2;
	  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
	  this.attempts = 0;
	}
	
	/**
	 * Return the backoff duration.
	 *
	 * @return {Number}
	 * @api public
	 */
	
	Backoff.prototype.duration = function(){
	  var ms = this.ms * Math.pow(this.factor, this.attempts++);
	  if (this.jitter) {
	    var rand =  Math.random();
	    var deviation = Math.floor(rand * this.jitter * ms);
	    ms = (Math.floor(rand * 10) & 1) == 0  ? ms - deviation : ms + deviation;
	  }
	  return Math.min(ms, this.max) | 0;
	};
	
	/**
	 * Reset the number of attempts.
	 *
	 * @api public
	 */
	
	Backoff.prototype.reset = function(){
	  this.attempts = 0;
	};
	
	/**
	 * Set the minimum duration
	 *
	 * @api public
	 */
	
	Backoff.prototype.setMin = function(min){
	  this.ms = min;
	};
	
	/**
	 * Set the maximum duration
	 *
	 * @api public
	 */
	
	Backoff.prototype.setMax = function(max){
	  this.max = max;
	};
	
	/**
	 * Set the jitter
	 *
	 * @api public
	 */
	
	Backoff.prototype.setJitter = function(jitter){
	  this.jitter = jitter;
	};
	


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ansiRegex = __webpack_require__(55)();
	
	module.exports = function (str) {
		return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
	};


/***/ },
/* 55 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function () {
		return /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/g;
	};


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("C:\\Users\\nerush\\Documents\\Qlik\\Sense\\Extensions\\qsSimpleKPI\\node_modules\\react-hot-loader\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("C:\\Users\\nerush\\Documents\\Qlik\\Sense\\Extensions\\qsSimpleKPI\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _loadcss = __webpack_require__(57);
	
	var _loadcss2 = _interopRequireDefault(_loadcss);
	
	var global = window;
	var define = global.define || define;
	
	var dependencies = ['module', 'qlik', 'client.utils/routing', 'client.utils/state', 'objects.utils/number-formatter', 'general.services/show-service/show-service']; // 'css!./styles.css'
	
	if (!global.React) dependencies.push('./vendors/react.min');
	
	define(dependencies, function (module, qlik, Routing, State, NumberFormatter, ShowService, React) {
	  var ROOT_URI = module.uri.split('/').slice(0, -1).join('/');
	  (0, _loadcss2['default'])(ROOT_URI + '/styles.css');
	
	  if (React && !global.React) global.React = React;
	
	  var initialProperties = __webpack_require__(58);
	  var definition = __webpack_require__(59)({ ShowService: ShowService });
	  var paint = __webpack_require__(63)({ qlik: qlik, Routing: Routing, State: State, NumberFormatter: NumberFormatter }); // NumberFormatter: global.NumberFormatter
	  return {
	    initialProperties: initialProperties,
	    definition: definition,
	    paint: paint,
	    snapshot: {
	      canTakeSnapshot: true
	    }
	  };
	});
	
	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("C:\\Users\\nerush\\Documents\\Qlik\\Sense\\Extensions\\qsSimpleKPI\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "component.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("C:\\Users\\nerush\\Documents\\Qlik\\Sense\\Extensions\\qsSimpleKPI\\node_modules\\react-hot-loader\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("C:\\Users\\nerush\\Documents\\Qlik\\Sense\\Extensions\\qsSimpleKPI\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = loadCSS;
	
	function loadCSS(url) {
	    var link = document.createElement("link");
	    link.type = "text/css";
	    link.rel = "stylesheet";
	    link.href = url;
	    document.getElementsByTagName("head")[0].appendChild(link);
	}
	
	module.exports = exports["default"];

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("C:\\Users\\nerush\\Documents\\Qlik\\Sense\\Extensions\\qsSimpleKPI\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "loadcss.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("C:\\Users\\nerush\\Documents\\Qlik\\Sense\\Extensions\\qsSimpleKPI\\node_modules\\react-hot-loader\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("C:\\Users\\nerush\\Documents\\Qlik\\Sense\\Extensions\\qsSimpleKPI\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = {
	  version: 1.0,
	  qHyperCubeDef: {
	    qDimensions: [],
	    qMeasures: [],
	    qInitialDataFetch: [{
	      qWidth: 25,
	      qHeight: 255
	    }]
	  },
	  options: {}
	};
	module.exports = exports["default"];

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("C:\\Users\\nerush\\Documents\\Qlik\\Sense\\Extensions\\qsSimpleKPI\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "initialProperties.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("C:\\Users\\nerush\\Documents\\Qlik\\Sense\\Extensions\\qsSimpleKPI\\node_modules\\react-hot-loader\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("C:\\Users\\nerush\\Documents\\Qlik\\Sense\\Extensions\\qsSimpleKPI\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _definitionComponents = __webpack_require__(60);
	
	var _iconsDefinitions = __webpack_require__(61);
	
	var _options = __webpack_require__(62);
	
	exports['default'] = function (options) {
	
	  // let Dialog = options.Dialog;
	  var ShowService = options.ShowService;
	
	  // Dimensions array
	  var dims = {
	    type: 'items',
	    uses: 'dimensions',
	    ref: 'qHyperCubeDef.qDimensions',
	    min: 0,
	    max: 1,
	    allowAdd: true,
	    allowRemove: true
	  };
	
	  // Kpi array
	  var kpis = {
	    type: "items",
	    uses: "measures",
	    ref: "qHyperCubeDef.qMeasures",
	    disabledRef: "qHyperCubeDef.qLayoutExclude.qHyperCubeDef.qMeasures",
	    min: 1,
	    max: 256,
	    allowAdd: true,
	    allowRemove: true,
	    allowMove: true,
	    items: {
	      autoFormatTemplate: {
	        type: "string",
	        label: "Auto format",
	        translation: "properties.numberFormatting.formatPattern",
	        ref: "qDef.autoFormatTemplate",
	        defaultValue: "0A",
	        show: function show(a) {
	          return a.qDef.qNumFormat.qType === "U";
	        }
	      },
	      labelColor: {
	        type: "string",
	        ref: "qDef.labelColor",
	        label: "Label color",
	        expression: "always",
	        defaultValue: "#545352"
	      },
	      pickLabelColor: {
	        type: "string",
	        component: _definitionComponents.ColorsPickerComponent,
	        ref: "qDef.labelColor",
	        defaultValue: "#545352",
	        options: _options.COLOR_OPTIONS
	      },
	      itemColor: {
	        type: "string",
	        ref: "qDef.valueColor",
	        label: "Value color",
	        expression: "always",
	        defaultValue: "#808080"
	      },
	      pickItemColor: {
	        type: "string",
	        component: _definitionComponents.ColorsPickerComponent,
	        ref: "qDef.valueColor",
	        defaultValue: "#808080",
	        options: _options.COLOR_OPTIONS
	      },
	      linkToSheet: {
	        type: "items",
	        items: {
	          useLink: {
	            ref: "qDef.useLink",
	            type: "boolean",
	            component: "switch",
	            translation: "properties.kpi.linkToSheet",
	            defaultValue: !1,
	            options: [{
	              value: !0,
	              translation: "properties.on"
	            }, {
	              value: !1,
	              translation: "properties.off"
	            }]
	          },
	          kpiLink: {
	            ref: "qDef.kpiLink",
	            type: "items",
	            component: "sheet-dropdown",
	            items: {
	              id: {
	                ref: "qDef.kpiLink.id",
	                type: "string"
	              },
	              title: {
	                ref: "qDef.kpiLink.title",
	                type: "string"
	              }
	            },
	            show: function show(data) {
	              return data.qDef.useLink; //data.qDef.useLink
	            }
	          }
	        }
	      },
	      groupByDimension: {
	        type: "boolean",
	        label: "Group by dimension",
	        ref: "qDef.groupByDimension",
	        defaultValue: false
	      },
	      groupByDimensionValue: {
	        type: "string",
	        ref: "qDef.groupByDimensionValue",
	        label: "Dimension Value",
	        expression: "always",
	        defaultValue: "",
	        show: function show(a) {
	          return a.qDef.groupByDimension;
	        }
	      },
	      overrideParams: {
	        type: "boolean",
	        label: "Override parameters",
	        ref: "qDef.ovParams",
	        defaultValue: false
	      },
	      size: {
	        type: "string",
	        component: "dropdown",
	        label: "Size",
	        ref: "qDef.size",
	        options: _options.SIZE_OPTIONS,
	        defaultValue: "",
	        show: function show(a) {
	          return a.qDef.ovParams;
	        }
	      },
	      hideLabel: {
	        type: "boolean",
	        label: "Hide label",
	        ref: "qDef.hideLabel",
	        defaultValue: false
	      },
	      labelOrientation: {
	        type: "string",
	        component: "buttongroup",
	        label: "Labels orientation",
	        ref: "qDef.labelOrientation",
	        options: [{
	          value: "horizontal",
	          label: "Horizontal",
	          tooltip: "Horizontal"
	        }, {
	          value: "",
	          label: "Vertical",
	          tooltip: "Vertical"
	        }],
	        defaultValue: "",
	        show: function show(a) {
	          return a.qDef.ovParams && !a.qDef.hideLabel;
	        }
	      },
	      labelOrder: {
	        type: "string",
	        component: "buttongroup",
	        label: "Labels order",
	        ref: "qDef.labelOrder",
	        options: [{
	          value: "first",
	          label: "Label, Value",
	          tooltip: "Label, Value"
	        }, {
	          value: "last",
	          label: "Value, Label",
	          tooltip: "Value, Label"
	        }],
	        defaultValue: "first",
	        show: function show(a) {
	          return a.qDef.ovParams && !a.qDef.hideLabel;
	        }
	      },
	      fontStyle: {
	        type: "string",
	        ref: "qDef.fontStyles",
	        label: "Font style",
	        expression: "always",
	        defaultValue: "",
	        show: true
	      },
	      pickFontStyle: {
	        type: "string",
	        component: _definitionComponents.FontStylesComponent,
	        ref: "qDef.fontStyles",
	        defaultValue: "",
	        show: function show(a) {
	          return typeof a.qDef.fontStyles !== "object";
	        }
	      },
	      itemIcon: {
	        type: "string",
	        ref: "qDef.valueIcon",
	        label: "Icon",
	        expression: "always",
	        defaultValue: "",
	        show: true
	      },
	      pickItemIcon: {
	        type: "string",
	        component: (0, _definitionComponents.SelectIconDialogComponent)(ShowService), //IconsPickerComponent,
	        ref: "qDef.valueIcon",
	        defaultValue: "",
	        options: _iconsDefinitions.FULL_ICONS_SET
	      },
	      /*
	      testItemIcon: {
	        type: "string",
	        ref: "qDef.testValueIcon",
	        icon(c, e) {
	          return c.value; // selected icon
	        }, // property or function
	        component: SelectIconDialogComponent(ShowService),
	        defaultValue: "",
	        options: FULL_ICONS_SET
	      },
	      */
	      iconPosition: {
	        type: "string",
	        component: "buttongroup",
	        label: "Icon position",
	        ref: "qDef.iconPosition",
	        options: [{
	          value: "value",
	          label: "Value",
	          tooltip: "Value"
	        }, {
	          value: "label",
	          label: "Label",
	          tooltip: "Label"
	        }],
	        defaultValue: "label",
	        show: function show(a) {
	          return a.qDef.valueIcon;
	        }
	      },
	      iconOrder: {
	        type: "string",
	        component: "buttongroup",
	        label: "Icon order",
	        ref: "qDef.iconOrder",
	        options: [{
	          value: "first",
	          label: "Icon, Value",
	          tooltip: "Icon, Value"
	        }, {
	          value: "last",
	          label: "Value, Icon",
	          tooltip: "Value, Icon"
	        }],
	        defaultValue: "first",
	        show: function show(a) {
	          return a.qDef.valueIcon;
	        }
	      },
	      iconSize: {
	        type: "string",
	        component: "dropdown",
	        label: "Icon size",
	        ref: "qDef.iconSize",
	        show: function show(a) {
	          return a.qDef.valueIcon;
	        },
	        options: _options.SIZE_OPTIONS,
	        defaultValue: ""
	      }
	    }
	  };
	
	  // Additional settings
	  var settings = {
	    type: "items",
	    uses: "settings",
	    items: {
	      dimensionsOptions: {
	        type: "items",
	        label: "Dimensions",
	        translation: "Common.Dimensions",
	        items: {
	          showAs: {
	            type: "string",
	            component: "dropdown",
	            label: "Show as",
	            ref: "options.dimShowAs",
	            options: _options.DIM_VIEW_OPTIONS,
	            defaultValue: "segment"
	          },
	          divideBy: {
	            type: "string",
	            component: "dropdown",
	            label: "Items per row",
	            ref: "options.dimDivideBy",
	            defaultValue: "auto",
	            show: function show(a) {
	              return a.options.dimShowAs === 'card';
	            },
	            options: [{
	              value: "auto",
	              label: "Auto",
	              tooltip: "Auto"
	            }, {
	              value: "one",
	              label: "1",
	              tooltip: "One"
	            }, {
	              value: "two",
	              label: "2",
	              tooltip: "Two"
	            }, {
	              value: "three",
	              label: "3",
	              tooltip: "Three"
	            }, {
	              value: "four",
	              label: "4",
	              tooltip: "Four"
	            }, {
	              value: "five",
	              label: "5",
	              tooltip: "Four"
	            }, {
	              value: "six",
	              label: "6",
	              tooltip: "Six"
	            }, {
	              value: "seven",
	              label: "7",
	              tooltip: "Seven"
	            }, {
	              value: "eight",
	              label: "8",
	              tooltip: "Eight"
	            }, {
	              value: "nine",
	              label: "9",
	              tooltip: "Nine"
	            }, {
	              value: "ten",
	              label: "10",
	              tooltip: "Ten"
	            }]
	          },
	          dimensionsOrientation: {
	            type: "string",
	            component: "buttongroup",
	            label: "Orientation",
	            ref: "options.dimensionsOrientation",
	            show: function show(a) {
	              return a.options.dimShowAs === 'segment';
	            },
	            options: [{
	              value: "horizontal",
	              label: "Horizontal",
	              tooltip: "Horizontal"
	            }, {
	              value: "vertical",
	              label: "Vertical",
	              tooltip: "Vertical"
	            }],
	            defaultValue: "horizontal"
	          },
	          labelOrientation: {
	            type: "string",
	            component: "dropdown",
	            label: "Labels",
	            ref: "options.dimLabelOrientation",
	            options: _options.DIM_LABEL_OPTIONS,
	            defaultValue: "top attached"
	          },
	          labelSize: {
	            type: "string",
	            component: "dropdown",
	            label: "Size",
	            ref: "options.dimLabelSize",
	            options: _options.SIZE_OPTIONS,
	            defaultValue: ""
	          },
	          hideLabel: {
	            type: "boolean",
	            label: "Hide labels",
	            ref: "options.dimHideLabels",
	            defaultValue: false
	          },
	          centeredLabel: {
	            type: "boolean",
	            label: "Center aligned labels",
	            ref: "options.dimCenteredLabels",
	            defaultValue: false
	          },
	          hideBorders: {
	            type: "boolean",
	            label: "Hide external borders",
	            ref: "options.dimHideBorders",
	            defaultValue: false
	          },
	          // show: function(a) {
	          //   return a.options.dimShowAs === 'segment'
	          // },
	          hideInternalBorders: {
	            type: "boolean",
	            label: "Hide internal borders",
	            ref: "options.dimHideInternalBorders",
	            defaultValue: false,
	            show: function show(a) {
	              return a.options.dimShowAs === 'segment';
	            }
	          }
	        }
	      },
	      measuresOptions: {
	        type: "items",
	        label: "Measures",
	        translation: "Common.Measures", //"properties.presentation",
	        items: {
	          labelOrientation: {
	            type: "string",
	            component: "buttongroup",
	            label: "Labels orientation",
	            ref: "options.labelOrientation",
	            options: [{
	              value: "horizontal",
	              label: "Horizontal",
	              tooltip: "Horizontal"
	            }, {
	              value: "",
	              label: "Vertical",
	              tooltip: "Vertical"
	            }],
	            defaultValue: ""
	          },
	
	          labelOrder: {
	            type: "string",
	            component: "buttongroup",
	            label: "Labels order",
	            ref: "options.labelOrder",
	            options: [{
	              value: "first",
	              label: "Label, Value",
	              tooltip: "Label, Value"
	            }, {
	              value: "last",
	              label: "Value, Label",
	              tooltip: "Value, Label"
	            }],
	            defaultValue: "first"
	          },
	
	          size: {
	            type: "string",
	            component: "dropdown",
	            label: "Size",
	            ref: "options.size",
	            options: _options.SIZE_OPTIONS,
	            defaultValue: ""
	          },
	
	          autoSize: {
	            type: "boolean",
	            component: "switch",
	            label: "Responsive size",
	            ref: "options.autoSize",
	            defaultValue: false,
	            options: [{
	              value: true,
	              label: "On"
	            }, {
	              value: false,
	              label: "Off"
	            }]
	          },
	
	          divideBy: {
	            type: "string",
	            component: "dropdown",
	            label: "Items per row",
	            ref: "options.divideBy",
	            defaultValue: "auto",
	            options: [{
	              value: "",
	              label: "Not set",
	              tooltip: "Not set"
	            }, {
	              value: "auto",
	              label: "Auto",
	              tooltip: "Auto"
	            }, {
	              value: "one",
	              label: "1",
	              tooltip: "One"
	            }, {
	              value: "two",
	              label: "2",
	              tooltip: "Two"
	            }, {
	              value: "three",
	              label: "3",
	              tooltip: "Three"
	            }, {
	              value: "four",
	              label: "4",
	              tooltip: "Four"
	            }, {
	              value: "five",
	              label: "5",
	              tooltip: "Four"
	            }, {
	              value: "six",
	              label: "6",
	              tooltip: "Six"
	            }, {
	              value: "seven",
	              label: "7",
	              tooltip: "Seven"
	            }, {
	              value: "eight",
	              label: "8",
	              tooltip: "Eight"
	            }, {
	              value: "nine",
	              label: "9",
	              tooltip: "Nine"
	            }, {
	              value: "ten",
	              label: "10",
	              tooltip: "Ten"
	            }]
	          }
	        }
	      },
	      stylingOptions: {
	        type: "items",
	        label: "Styles",
	        translation: "Styles",
	        items: {
	          styles: {
	            type: "string",
	            component: _definitionComponents.TextEditorComponent,
	            label: "Styles (CSS)",
	            ref: "options.styles",
	            defaultValue: ""
	          }
	        }
	      }
	    }
	  };
	
	  var sorting = {
	    uses: "sorting"
	  };
	
	  return {
	    type: "items",
	    component: "accordion",
	    items: {
	      dims: dims,
	      kpis: kpis,
	      sorting: sorting,
	      settings: settings
	    }
	  };
	};
	
	module.exports = exports['default'];

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("C:\\Users\\nerush\\Documents\\Qlik\\Sense\\Extensions\\qsSimpleKPI\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "definition.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("C:\\Users\\nerush\\Documents\\Qlik\\Sense\\Extensions\\qsSimpleKPI\\node_modules\\react-hot-loader\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("C:\\Users\\nerush\\Documents\\Qlik\\Sense\\Extensions\\qsSimpleKPI\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var _utils = __webpack_require__(68);
	
	var _dialogComponent = __webpack_require__(69);
	
	var _dialogComponent2 = _interopRequireDefault(_dialogComponent);
	
	var ColorsPickerComponent = {
	  template: '\n    <div class="pp-component" ng-if="visible">\n          <div class="label" ng-if="label" ng-class="{ \'disabled\': readOnly }">\n            {{label}}\n          </div>\n          <div class="value">\n            <div class="qv-object-qsstatistic" ng-if="!loading">\n              <div class="ui mini right labeled">\n                <input type="color" ng-model="t.value" ng-change="onColorChange()">\n                <a title="{{colorExpression}}" class="ui tag label" qva-activate="showPallete()" style="color: #00; background-color: {{t.value}};">\n                  <span ng-if="!isColorExpression" style="color: #ffffff; font-size: 16px;">{{t.value}}</span>\n                  <i class="icon-expression" ng-if="isColorExpression" style="font-size: 16px;"></i>\n                </a>\n              </div>\n              <div ng-if="showColorPallete">\n                <button ng-repeat="option in options track by option.value"\n                  class="ui mini icon button"\n                  ng-disabled="readOnly"\n                  style="margin: 1px; background-color: {{option.value}};"\n                  qva-activate="onColorChange(option.value)" tid="{{option.value}}" data-icon="{{definition.icon}}"\n                  q-title-translation="{{option.tooltip || option.label}}">\n                  <i class="checkmark icon" style="color: #ffffff; font-size:17px;" ng-if="option.value == t.value"></i>\n                  <i class="icon" style="font-size:17px;" ng-if="option.value != t.value"></i>\n                </button>\n              </div>\n            </div>\n            <div class="pp-loading-container" ng-if="loading">\n              <div class="pp-loader qv-loader"></div>\n            </div>\n            <div ng-if="errorMessage" class="pp-invalid error">{{errorMessage}}</div>\n          </div>\n    </div>\n    ',
	
	  controller: ["$scope", "$element", function (c, e) {
	    function initOptions() {
	      c.loading = true;
	      c.errorMessage = "";
	      c.label = c.definition.label;
	      c.options = c.definition.options;
	      c.isColorExpression = false;
	      c.colorExpression = '';
	
	      var val = (0, _utils.getRefValue)(c.data, c.definition.ref);
	      if (typeof val === "object") {
	        c.isColorExpression = true;
	        c.colorExpression = val && val.qStringExpression && val.qStringExpression.qExpr || "";
	        val = c.definition.defaultValue;
	      }
	
	      c.t = {
	        value: val
	      };
	
	      c.visible = true;
	      c.showColorPallete = false;
	      c.loading = false;
	    }
	    initOptions();
	    c.onColorChange = function (color) {
	      if (color) {
	        c.t.value = color;
	      }
	
	      if (c.isColorExpression) {
	        var val = (0, _utils.getRefValue)(c.data, c.definition.ref);
	        if (val && val.qStringExpression && val.qStringExpression.qExpr) {
	          val.qStringExpression.qExpr += c.t.value;
	        } else (0, _utils.setRefValue)(c.data, c.definition.ref, c.t.value);
	      } else (0, _utils.setRefValue)(c.data, c.definition.ref, c.t.value);
	
	      "function" == typeof c.definition.change && c.definition.change(c.data, c.args.handler);
	      c.$emit("saveProperties");
	      c.showColorPallete = false;
	    };
	    c.showPallete = function () {
	      c.showColorPallete = !c.showColorPallete;
	    };
	    c.$on("datachanged", function () {
	      initOptions();
	      //console.log('changed!');
	    });
	  }]
	};
	
	/*
	let IconsPickerComponent = {
	  template:
	    `<div class="pp-component pp-buttongroup-component" ng-if="visible">
	      <div class="label" ng-if="label" ng-class="{ \'disabled\': readOnly }">
	        {{label}}
	      </div>
	      <div class="value">
	        <div class="qv-object-qsstatistic" ng-if="!loading">
	          <button
	            class="qui-button"
	            title="{{iconExpression}}"
	            ng-class="{'qui-active': isShowIcons}"
	            qva-activate="showHideIcons()"
	            ng-disabled="readOnly">
	            <i class="{{value}}" ng-if="!isExpression" style="font-size:18px;"></i>
	            <i class="icon-expression" ng-if="isExpression" style="font-size:18px;"></i>
	          </button>
	          <span ng-if="!isExpression">{{value}}</span>
	          <div style="margin-top: 5px;">
	            <label class="qui-checkboxicon"
	              title="Disabled icon style"
	              ng-class="{ \'qui-hover\': hover }"
	              ng-mouseenter="hover = true"
	              ng-mouseleave="hover = false">
	              <input type="checkbox"
	                ng-model="opts.disabled"
	                ng-change="checkIconStyles('disabled')">
	              <div class="check-wrap">
	                <span class="check"></span>
	                <span class="check-text">Disabled</span>
	              </div>
	            </label>
	
	            <label class="qui-checkboxicon"
	              title="Loading icon style"
	              ng-class="{ \'qui-hover\': hover }"
	              ng-mouseenter="hover = true"
	              ng-mouseleave="hover = false">
	              <input type="checkbox"
	                ng-model="opts.loading"
	                ng-change="checkIconStyles('loading')">
	              <div class="check-wrap">
	                <span class="check"></span>
	                <span class="check-text">Loading</span>
	              </div>
	            </label>
	          </div>
	
	          <div ng-if="isShowIcons">
	            <button ng-repeat="option in options track by option.value"
	              class="ui tiny icon button"
	              ng-disabled="readOnly"
	              style="margin: 2px;"
	              qva-activate="select(option.value)">
	              <div><i class="{{option.value}}"></i></div>
	            </button>
	          </div>
	        </div>
	        <div class="pp-loading-container" ng-if="loading">
	          <div class="pp-loader qv-loader"></div>
	        </div>
	        <div ng-if="errorMessage" class="pp-invalid error">{{errorMessage}}</div>
	      </div>
	    </div>`
	  ,
	  controller:
	    ["$scope", function(c){
	      function initOptions() {
	        c.loading = true;
	        c.errorMessage = "";
	        c.isShowIcons = false;
	        c.isExpression = false;
	        c.iconExpression = "";
	        c.label = c.definition.label;
	        c.options = c.definition.options;
	        c.value = getRefValue(c.data, c.definition.ref);
	        if(typeof c.value === "object"
	          && c.value.qStringExpression) {
	          c.isExpression = true;
	          c.iconExpression = (c.value.qStringExpression.qExpr) || "";
	        }
	        c.opts = {};
	        c.opts.disabled = (c.getValueIndex('disabled') != -1);
	        c.opts.loading = (c.getValueIndex('loading') != -1);
	        c.visible = true;
	        c.loading = false;
	      }
	
	      c.getValueIndex = function(styleName){
	        let indx = -1;
	        if(!c.isExpression && typeof c.value === 'string')  {
	          let styles = (c.value && c.value.split(' ')) || [];
	          indx = styles.indexOf(styleName);
	        }
	        return indx;
	      };
	
	      // see template
	      c.select = function (a) {
	        c.value = a;
	
	        if(c.isExpression) {
	          let val = getRefValue(c.data, c.definition.ref);
	          if(val && val.qStringExpression && val.qStringExpression.qExpr){
	            val.qStringExpression.qExpr += c.value;
	          } else
	            setRefValue(c.data, c.definition.ref, c.value);
	        }
	        else
	          setRefValue(c.data, c.definition.ref, a);
	
	        "function" == typeof c.definition.change && c.definition.change(c.data, c.args.handler);
	        c.$emit("saveProperties");
	      };
	
	      c.checkIconStyles = function (styleName) {
	        if(!c.isExpression && typeof c.value === 'string')  {
	          let isDisabled = c.opts[styleName];
	          let styles = (c.value && c.value.split(' ')) || [];
	          let indx = styles.indexOf(styleName);
	          if(isDisabled && indx === -1)
	            styles.push(styleName);
	          else if(!isDisabled && (indx != -1))
	            styles.splice(indx, 1);
	
	          let value = styles.join(' ');
	          c.select(value);
	        }
	      };
	
	      c.showHideIcons = function(){
	        c.isShowIcons = !c.isShowIcons;
	      };
	
	      c.$on("datachanged", function () {
	        initOptions();
	      });
	
	      initOptions();
	    }]
	};
	*/
	
	var FontStylesComponent = {
	  template: '<div class="pp-component pp-buttongroup-component qv-object-qsstatistic" ng-if="visible">\n      <div class="label" ng-if="label" ng-class="{ \'disabled\': readOnly }">\n        {{label}}\n      </div>\n      <div class="qui-buttongroup" ng-if="!loading && !isExpression">\n        <button\n          class="qui-button"\n          ng-class="{\'qui-active\':states.bold}"\n          ng-disabled="readOnly"\n          qva-activate="select(\'bold\')"\n          q-title-translation="Bold">\n          <i class="icon bold" style="font-color: white; font-size:18px;"></i>\n        </button>\n        <button\n          class="qui-button"\n          ng-class="{\'qui-active\':states.italic}"\n          ng-disabled="readOnly"\n          qva-activate="select(\'italic\')"\n          q-title-translation="Italic">\n          <i class="icon italic" style="font-color: white; font-size:18px;"></i>\n        </button>\n        <button\n          class="qui-button"\n          ng-class="{\'qui-active\':states.underline}"\n          ng-disabled="readOnly"\n          qva-activate="select(\'underline\')"\n          q-title-translation="Underline">\n          <i class="icon underline" style="font-color: white; font-size:18px;"></i>\n        </button>\n      </div>\n\n      <div class="pp-loading-container" ng-if="loading">\n        <div class="pp-loader qv-loader"></div>\n      </div>\n\n      <div ng-if="errorMessage" class="pp-invalid error">{{errorMessage}}</div>\n    </div>',
	
	  controller: ["$scope", function (c) {
	    function initOptions() {
	      c.loading = true;
	      c.errorMessage = "";
	      c.label = c.definition.label;
	      c.isExpression = false;
	      var value = (0, _utils.getRefValue)(c.data, c.definition.ref);
	      c.states = {};
	      if (value) {
	        if (typeof value === "object" && value.qStringExpression) {
	          c.isExpression = true;
	          value = value.qStringExpression.qExpr || "";
	        }
	
	        var values = value.split(',');
	        values.forEach(function (value) {
	          c.states[value] = value;
	        });
	      }
	      c.visible = true;
	      c.loading = false;
	    }
	
	    c.select = function (a) {
	      if (c.states[a]) delete c.states[a];else c.states[a] = a;
	
	      var value = Object.keys(c.states).join(',');
	
	      if (c.isExpression) {
	        var valueRef = (0, _utils.getRefValue)(c.data, c.definition.ref);
	        if (valueRef && valueRef.qStringExpression && valueRef.qStringExpression.qExpr) {
	          valueRef.qStringExpression.qExpr += value;
	        } else (0, _utils.setRefValue)(c.data, c.definition.ref, value);
	      } else (0, _utils.setRefValue)(c.data, c.definition.ref, value);
	
	      "function" == typeof c.definition.change && c.definition.change(c.data, c.args.handler);
	      c.$emit("saveProperties");
	    };
	
	    c.$on("datachanged", function () {
	      initOptions();
	    });
	
	    initOptions();
	  }]
	};
	
	var TextEditorComponent = {
	  template: '\n  <div class="pp-component" ng-if="visible">\n        <div class="label" ng-if="label" ng-class="{ \'disabled\': readOnly }">\n          {{label}}\n        </div>\n        <div class="value">\n          <div class="qv-object-qsstatistic" ng-if="!loading">\n            <textarea rows="5" ng-model="t.value" ng-change="onTextChange()" style="width: 100%; max-width: 100%;">\n            </textarea>\n          </div>\n        </div>\n        <div class="pp-loading-container" ng-if="loading">\n          <div class="pp-loader qv-loader"></div>\n        </div>\n        <div ng-if="errorMessage" class="pp-invalid error">{{errorMessage}}</div>\n  </div>\n  ',
	  controller: ["$scope", function (c) {
	    function initOptions() {
	      c.loading = true;
	      c.errorMessage = "";
	      c.label = c.definition.label;
	      c.t = {
	        value: (0, _utils.getRefValue)(c.data, c.definition.ref)
	      };
	      c.visible = true;
	      c.loading = false;
	    }
	
	    c.onTextChange = function () {
	      (0, _utils.setRefValue)(c.data, c.definition.ref, c.t.value);
	      "function" == typeof c.definition.change && c.definition.change(c.data, c.args.handler);
	      c.$emit("saveProperties");
	    };
	
	    c.$on("datachanged", function () {
	      initOptions();
	    });
	
	    initOptions();
	  }]
	};
	
	// Select icon dialog component
	var SelectIconDialogComponent = function SelectIconDialogComponent(ShowService) {
	  return (0, _dialogComponent2['default'])(ShowService, (function () {
	
	    function getValueIndex(c, styleName) {
	      var indx = -1;
	      if (!c.isExpression && typeof c.value === 'string') {
	        // let styles = (c.value && c.value.split(' ')) || [];
	        indx = c.value.search(new RegExp('\\s' + styleName));
	      }
	      return indx;
	    }
	
	    var docWidth = $(document).width();
	    var docHeight = $(document).height();
	
	    return {
	      text: 'Icons',
	      icon: '', // dialog icon
	      initContext: function initContext(c, e) {
	        // component's context initialization
	        c.isExpression = false;
	        if (typeof c.value === "object" && c.value.qStringExpression) {
	          c.isExpression = true;
	          c.iconExpression = c.value.qStringExpression.qExpr || "";
	        }
	      },
	      controlComponent: '\n    <button\n      class="qui-button"\n      title="{{iconExpression}}"\n      qva-activate="showDialog()"\n      ng-disabled="readOnly">\n      <i class="{{value}}" ng-if="!isExpression" style="font-size:18px;"></i>\n      <i class="icon-expression" ng-if="isExpression" style="font-size:18px;"></i>\n    </button>\n    <span ng-if="!isExpression">{{value}}</span>\n    ',
	      initDialogContext: function initDialogContext(c, dc) {
	        var _dc$iconOptions;
	
	        // c - component context (see initContext),
	        // dc - dialog context (see dialogContent)
	        dc.iconOptions = (_dc$iconOptions = {
	          disabled: 'Disabled',
	          loading: 'Loading'
	        }, _defineProperty(_dc$iconOptions, 'horizontally flipped', 'Horizontally flipped'), _defineProperty(_dc$iconOptions, 'vertically flipped', 'Vertically flipped'), _defineProperty(_dc$iconOptions, 'clockwise rotated', 'Clockwise rotated'), _defineProperty(_dc$iconOptions, 'counterclockwise rotated', 'Counterclockwise rotated'), _dc$iconOptions);
	        dc.opts = {};
	        for (var iconOption in dc.iconOptions) {
	          dc.opts[iconOption] = getValueIndex(c, iconOption) != -1;
	        }
	
	        dc.isExpression = c.isExpression;
	        // Icons as options property:
	        dc.options = c.definition.options;
	      },
	      selectValue: function selectValue(c, newValue) {
	        c.isExpression = false;
	        if (c.iconOptions[newValue]) {
	          //let values = (c.value && c.value.split(' ')) || [];
	          var values = c.value || "";
	          var isDisabled = c.opts[newValue];
	          var searchRe = new RegExp('\\s' + newValue);
	          var indx = values.search(searchRe);
	          if (isDisabled && indx === -1) {
	            // add
	            //values.push(newValue);
	            values = values.concat(' ', newValue);
	            c.opts[newValue] = true;
	          } else if (!isDisabled && indx != -1) {
	            // remove
	            // values.splice(indx, 1);
	            values = values.replace(searchRe, '');
	            c.opts[newValue] = false;
	          }
	          return values;
	        } else {
	          var returnValue = newValue;
	          for (var iconOption in c.iconOptions) {
	            if (c.opts[iconOption]) returnValue += ' ' + iconOption;
	          }
	          return returnValue;
	        }
	      },
	      dialogContent: '\n    <div class="qv-object-qsstatistic">\n      <div style="height: auto; font-size:3em;">\n        <i class="{{value}}" ng-if="!isExpression"></i><span ng-if="!isExpression" style="font-size:0.5em;">{{value}}</span>\n        <i class="icon-expression" ng-if="isExpression" style="font-size:18px;"></i>\n      </div>\n      <div style="overflow:auto; height:' + docHeight / 2 + 'px; border: solid 1px #f2f2f2;border-radius:5px;padding:5px">\n      <div ng-repeat="(category, icons) in options">\n        <h1 style="margin-top:1em;">{{category}}</h1>\n        <button ng-repeat="icon in icons track by $index"\n          class="ui tiny icon button"\n          title="{{icon}}"\n          ng-disabled="readOnly"\n          qva-activate="select(icon)"\n          style="width: 40px; height: 40px; padding: 1px; margin: 2px;">\n          <div><i class="{{icon}}" style="margin: 0; font-size: 1.3em"></i></div>\n        </button>\n      </div>\n      </div>\n      <div style="margin-top: 10px;">\n        <span ng-repeat-start="(iconOption, iconOptLabel) in iconOptions track by iconOption" />\n        <label\n          class="qui-checkboxicon"\n          title="{{iconOptLabel}}"\n          ng-class="{ \'qui-hover\': hover }"\n          ng-mouseenter="hover = true"\n          ng-mouseleave="hover = false">\n          <input type="checkbox"\n            ng-model="opts[iconOption]"\n            ng-change="select(iconOption)">\n          <div class="check-wrap">\n            <span class="check"></span>\n            <span class="check-text" style="max-width: 200px">{{iconOptLabel}}</span>\n          </div>\n        </label>\n        <span ng-repeat-end>&nbsp;</span>\n      </div>\n    </div>\n    ',
	      width: docWidth - docWidth / 8 + 'px'
	    };
	  })());
	}; // SelectIconDialogComponent
	
	exports['default'] = {
	  ColorsPickerComponent: ColorsPickerComponent,
	  FontStylesComponent: FontStylesComponent,
	  TextEditorComponent: TextEditorComponent,
	  SelectIconDialogComponent: SelectIconDialogComponent
	};
	module.exports = exports['default'];
	//circular: 'Circular',
	//bordered: 'Bordered',

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("C:\\Users\\nerush\\Documents\\Qlik\\Sense\\Extensions\\qsSimpleKPI\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "definitionComponents.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("C:\\Users\\nerush\\Documents\\Qlik\\Sense\\Extensions\\qsSimpleKPI\\node_modules\\react-hot-loader\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("C:\\Users\\nerush\\Documents\\Qlik\\Sense\\Extensions\\qsSimpleKPI\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var FULL_ICONS_SET = {
	  "Web content": ["alarm icon", "alarm slash icon", "alarm outline icon", "alarm slash outline icon", "at icon", "browser icon", "bug icon", "calendar outline icon", "calendar icon", "cloud icon", "comment icon", "comments icon", "comment outline icon", "comments outline icon", "copyright icon", "dashboard icon", "dropdown icon", "external square icon", "external icon", "eyedropper icon", "feed icon", "find icon", "heartbeat icon", "history icon", "home icon", "idea icon", "inbox icon", "lab icon", "mail icon", "mail outline icon", "mail square icon", "map icon", "options icon", "paint brush icon", "payment icon", "phone icon", "phone square icon", "privacy icon", "protect icon", "search icon", "setting icon", "settings icon", "shop icon", "sidebar icon", "signal icon", "sitemap icon", "tag icon", "tags icon", "tasks icon", "terminal icon", "text telephone icon", "ticket icon", "trophy icon", "wifi icon"],
	
	  "User actions": ["adjust icon", "add user icon", "add to cart icon", "archive icon", "ban icon", "bookmark icon", "call icon", "call square icon", "cloud download icon", "cloud upload icon", "compress icon", "configure icon", "download icon", "edit icon", "erase icon", "exchange icon", "external share icon", "expand icon", "filter icon", "flag icon", "flag outline icon", "forward mail icon", "hide icon", "in cart icon", "lock icon", "pin icon", "print icon", "random icon", "recycle icon", "refresh icon", "remove bookmark icon", "remove user icon", "repeat icon", "reply all icon", "reply icon", "retweet icon", "send icon", "send outline icon", "share alternate icon", "share alternate square icon", "share icon", "share square icon", "sign in icon", "sign out icon", "theme icon", "translate icon", "undo icon", "unhide icon", "unlock alternate icon", "unlock icon", "upload icon", "wait icon", "wizard icon", "write icon", "write square icon"],
	
	  "Message": ["announcement icon", "birthday icon", "help icon", "help circle icon", "info icon", "info circle icon", "warning icon", "warning circle icon", "warning sign icon"],
	
	  "User Types": ["child icon", "doctor icon", "handicap icon", "spy icon", "student icon", "user icon", "users icon"],
	
	  "Gender": ["female icon", "heterosexual icon", "male icon", "man icon", "neuter icon", "other gender icon", "other gender horizontal icon", "other gender vertical icon", "woman icon"],
	
	  "Layout Adjustment": ["grid layout icon", "list layout icon", "block layout icon", "zoom icon", "zoom out icon", "resize vertical icon", "resize horizontal icon", "maximize icon", "crop icon"],
	
	  "Objects": ["anchor icon", "bar icon", "bomb icon", "book icon", "bullseye icon", "calculator icon", "checkered flag icon", "cocktail icon", "diamond icon", "fax icon", "fire extinguisher icon", "fire icon", "gift icon", "leaf icon", "legal icon", "lemon icon", "life ring icon", "lightning icon", "magnet icon", "money icon", "moon icon", "plane icon", "puzzle icon", "rain icon", "road icon", "rocket icon", "shipping icon", "soccer icon", "suitcase icon", "sun icon", "travel icon", "treatment icon", "world icon"],
	
	  "Shapes": ["asterisk icon", "certificate icon", "circle icon", "circle notched icon", "circle thin icon", "crosshairs icon", "cube icon", "cubes icon", "ellipsis horizontal icon", "ellipsis vertical icon", "quote left icon", "quote right icon", "spinner icon", "square icon", "square outline icon"],
	
	  "Item Selection": ["add circle icon", "add square icon", "check circle icon", "check circle outline icon", "check square icon", "checkmark box icon", "checkmark icon", "minus circle icon", "minus icon", "minus square icon", "minus square outline icon", "move icon", "plus icon", "plus square outline icon", "radio icon", "remove circle icon", "remove circle outline icon", "remove icon", "selected radio icon", "toggle off icon", "toggle on icon"],
	
	  "Media": ["area chart icon", "bar chart icon", "camera retro icon", "newspaper icon", "film icon", "line chart icon", "photo icon", "pie chart icon", "sound icon"],
	
	  "Pointers": ["angle double down icon", "angle double left icon", "angle double right icon", "angle double up icon", "angle down icon", "angle left icon", "angle right icon", "angle up icon", "arrow circle down icon", "arrow circle left icon", "arrow circle outline down icon", "arrow circle outline left icon", "arrow circle outline right icon", "arrow circle outline up icon", "arrow circle right icon", "arrow circle up icon", "arrow down icon", "arrow left icon", "arrow right icon", "arrow up icon", "caret down icon", "caret left icon", "caret right icon", "caret up icon", "chevron circle down icon", "chevron circle left icon", "chevron circle right icon", "chevron circle up icon", "chevron down icon", "chevron left icon", "chevron right icon", "chevron up icon", "long arrow down icon", "long arrow left icon", "long arrow right icon", "long arrow up icon", "pointing down icon", "pointing left icon", "pointing right icon", "pointing up icon", "toggle down icon", "toggle left icon", "toggle right icon", "toggle up icon"],
	
	  "Computer and File System": ["desktop icon", "disk outline icon", "file archive outline icon", "file audio outline icon", "file code outline icon", "file excel outline icon", "file icon", "file image outline icon", "file outline icon", "file pdf outline icon", "file powerpoint outline icon", "file text icon", "file text outline icon", "file video outline icon", "file word outline icon", "folder icon", "folder open icon", "folder open outline icon", "folder outline icon", "game icon", "keyboard icon", "laptop icon", "level down icon", "level up icon", "mobile icon", "power icon", "plug icon", "tablet icon", "trash icon", "trash outline icon"],
	
	  "Technologies": ["barcode icon", "css3 icon", "database icon", "fork icon", "html5 icon", "openid icon", "qrcode icon", "rss icon", "rss square icon", "server icon"],
	
	  "Rating": ["empty heart icon", "empty star icon", "frown icon", "heart icon", "meh icon", "smile icon", "star half empty icon", "star half icon", "star icon", "thumbs down icon", "thumbs outline down icon", "thumbs outline up icon", "thumbs up icon"],
	
	  "Audio": ["backward icon", "eject icon", "fast backward icon", "fast forward icon", "forward icon", "music icon", "mute icon", "pause icon", "play icon", "record icon", "step backward icon", "step forward icon", "stop icon", "unmute icon", "video play icon", "video play outline icon", "volume down icon", "volume off icon", "volume up icon"],
	
	  "Map": ["building icon", "building outline icon", "car icon", "coffee icon", "emergency icon", "first aid icon", "food icon", "h icon", "hospital icon", "location arrow icon", "marker icon", "military icon", "paw icon", "space shuttle icon", "spoon icon", "taxi icon", "tree icon", "university icon"],
	
	  "Tables": ["columns icon", "sort alphabet ascending icon", "sort alphabet descending icon", "sort ascending icon", "sort content ascending icon", "sort content descending icon", "sort descending icon", "sort icon", "sort numeric ascending icon", "sort numeric descending icon", "table icon"],
	
	  "Text Editor": ["align center icon", "align justify icon", "align left icon", "align right icon", "attach icon", "bold icon", "copy icon", "cut icon", "font icon", "header icon", "indent icon", "italic icon", "linkify icon", "list icon", "ordered list icon", "outdent icon", "paragraph icon", "paste icon", "save icon", "strikethrough icon", "subscript icon", "superscript icon", "text height icon", "text width icon", "underline icon", "unlink icon", "unordered list icon"],
	
	  "Currency": ["dollar icon", "euro icon", "lira icon", "pound icon", "ruble icon", "rupee icon", "won icon", "shekel icon", "yen icon"],
	
	  "Payment Options": ["american express icon", "discover icon", "google wallet icon", "mastercard icon", "paypal card icon", "paypal icon", "stripe icon", "visa icon"],
	
	  "Brands": ["adn icon", "android icon", "angellist icon", "apple icon", "behance icon", "behance square icon", "bitbucket icon", "bitbucket square icon", "bitcoin icon", "buysellads icon", "codepen icon", "connectdevelop icon", "dashcube icon", "delicious icon", "deviantart icon", "digg icon", "dribbble icon", "dropbox icon", "drupal icon", "empire icon", "facebook icon", "facebook square icon", "flickr icon", "forumbee icon", "foursquare icon", "git icon", "git square icon", "github alternate icon", "github icon", "github square icon", "gittip icon", "google icon", "google plus icon", "google plus square icon", "hacker news icon", "instagram icon", "ioxhost icon", "joomla icon", "jsfiddle icon", "lastfm icon", "lastfm square icon", "leanpub icon", "linkedin icon", "linkedin square icon", "linux icon", "maxcdn icon", "meanpath icon", "medium icon", "pagelines icon", "pied piper alternate icon", "pied piper icon", "pinterest icon", "pinterest square icon", "qq icon", "rebel icon", "reddit icon", "reddit square icon", "renren icon", "sellsy icon", "shirtsinbulk icon", "simplybuilt icon", "skyatlas icon", "skype icon", "slack icon", "slideshare icon", "soundcloud icon", "spotify icon", "stack exchange icon", "stack overflow icon", "steam icon", "steam square icon", "stumbleupon circle icon", "stumbleupon icon", "tencent weibo icon", "trello icon", "tumblr icon", "tumblr square icon", "twitch icon", "twitter icon", "twitter square icon", "viacoin icon", "vimeo icon", "vine icon", "vk icon", "wechat icon", "weibo icon", "whatsapp icon", "windows icon", "wordpress icon", "xing icon", "xing square icon", "yahoo icon", "yelp icon", "youtube icon", "youtube play icon", "youtube square icon"]
	};
	
	/*
	const MESSAGE_ICONS = [
	  "announcement icon",
	//  "birthday icon",
	  "help icon",
	  "help circle icon",
	  "info icon",
	  "info circle icon",
	  "warning icon",
	  "warning circle icon",
	  "warning sign icon"
	];
	
	const ITEMSELECTIONS_ICONS = [
	  "add circle icon",
	  "add square icon",
	  "check circle icon",
	  "check circle outline icon",
	  "check square icon",
	  "checkmark box icon",
	  "checkmark icon",
	  "minus circle icon",
	  "minus icon",
	  "minus square icon",
	  "minus square outline icon",
	  "move icon",
	  "plus icon",
	  "plus square outline icon",
	  "radio icon",
	  "remove circle icon",
	  "remove circle outline icon",
	  "remove icon",
	  "selected radio icon",
	  "toggle off icon",
	  "toggle on icon"
	];
	
	const POINTERS_ICONS = [
	  "angle double down icon",
	  "angle double left icon",
	  "angle double right icon",
	  "angle double up icon",
	  "angle down icon",
	  "angle left icon",
	  "angle right icon",
	  "angle up icon",
	  "arrow circle down icon",
	  "arrow circle left icon",
	  "arrow circle outline down icon",
	  "arrow circle outline left icon",
	  "arrow circle outline right icon",
	  "arrow circle outline up icon",
	  "arrow circle right icon",
	  "arrow circle up icon",
	  "arrow down icon",
	  "arrow left icon",
	  "arrow right icon",
	  "arrow up icon",
	  "caret down icon",
	  "caret left icon",
	  "caret right icon",
	  "caret up icon",
	  "chevron circle down icon",
	  "chevron circle left icon",
	  "chevron circle right icon",
	  "chevron circle up icon",
	  "chevron down icon",
	  "chevron left icon",
	  "chevron right icon",
	  "chevron up icon",
	];
	
	const RATINGS_ICONS = [
	  "empty heart icon",
	  "empty star icon",
	  "frown icon",
	  "heart icon",
	  "meh icon",
	  "smile icon",
	  "star half empty icon",
	  "star half icon",
	  "star icon",
	  "thumbs down icon",
	  "thumbs outline down icon",
	  "thumbs outline up icon",
	  "thumbs up icon",
	];
	
	const CURRENCY_ICONS = [
	  "dollar icon",
	  "euro icon",
	  "lira icon",
	  "pound icon",
	  "ruble icon",
	  "rupee icon",
	  "won icon",
	  "shekel icon",
	  "yen icon",
	];
	
	const SHAPES_ICONS = [
	  "asterisk icon",
	  "certificate icon",
	  "circle icon",
	  "circle notched icon",
	  "circle thin icon",
	  "crosshairs icon",
	  "cube icon",
	  "cubes icon",
	  "ellipsis horizontal icon",
	  "ellipsis vertical icon",
	  "quote left icon",
	  "quote right icon",
	  "spinner icon",
	  "square icon",
	  "square outline icon",
	];
	
	const WEBCONTENT_ICONS = [
	  "adjust icon",
	  "add user icon",
	  "add to cart icon",
	  "archive icon",
	  "ban icon",
	  "bookmark icon",
	  "call icon",
	  "call square icon",
	  "cloud download icon",
	  "cloud upload icon",
	  "compress icon",
	  "configure icon",
	  "download icon",
	  "edit icon",
	  "erase icon",
	  "exchange icon",
	  "external share icon",
	  "expand icon",
	  "filter icon",
	  "flag icon",
	  "flag outline icon",
	  "forward mail icon",
	  "hide icon",
	  "in cart icon",
	  "lock icon",
	  "pin icon",
	  "print icon",
	  "random icon",
	  "recycle icon",
	  "refresh icon",
	  "remove bookmark icon",
	  "remove user icon",
	  "repeat icon",
	  "reply all icon",
	  "reply icon",
	  "retweet icon",
	  "send icon",
	  "send outline icon",
	  "share alternate icon",
	  "share alternate square icon",
	  "share icon",
	  "share square icon",
	  "sign in icon",
	  "sign out icon",
	  "theme icon",
	  "translate icon",
	  "undo icon",
	  "unhide icon",
	  "unlock alternate icon",
	  "unlock icon",
	  "upload icon",
	  "wait icon",
	  "wizard icon",
	  "write icon",
	  "write square icon",
	];
	*/
	
	exports["default"] = {
	  FULL_ICONS_SET: FULL_ICONS_SET
	  /*
	  ALL_ICONS: []
	    .concat(MESSAGE_ICONS)
	    .concat(ITEMSELECTIONS_ICONS)
	    .concat(POINTERS_ICONS)
	    .concat(RATINGS_ICONS)
	    .concat(CURRENCY_ICONS)
	    .concat(SHAPES_ICONS)
	    .concat(WEBCONTENT_ICONS)
	    ,
	    MESSAGE_ICONS,
	  ITEMSELECTIONS_ICONS,
	  POINTERS_ICONS,
	  SHAPES_ICONS
	  */
	};
	module.exports = exports["default"];

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("C:\\Users\\nerush\\Documents\\Qlik\\Sense\\Extensions\\qsSimpleKPI\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "iconsDefinitions.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("C:\\Users\\nerush\\Documents\\Qlik\\Sense\\Extensions\\qsSimpleKPI\\node_modules\\react-hot-loader\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("C:\\Users\\nerush\\Documents\\Qlik\\Sense\\Extensions\\qsSimpleKPI\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var COLOR_OPTIONS = [
	// Qlik colors
	{
	  value: "#B0AFAE",
	  label: "",
	  tooltip: ""
	}, {
	  value: "#7B7A78",
	  label: "",
	  tooltip: ""
	}, {
	  value: "#545352",
	  label: "",
	  tooltip: ""
	}, {
	  value: "#4477AA",
	  label: "",
	  tooltip: ""
	}, {
	  value: "#7DB8DA",
	  label: "",
	  tooltip: ""
	}, {
	  value: "#B6D7EA",
	  label: "",
	  tooltip: ""
	}, {
	  value: "#46C646",
	  label: "",
	  tooltip: ""
	}, {
	  value: "#F93F17",
	  label: "",
	  tooltip: ""
	}, {
	  value: "#FFCF02",
	  label: "",
	  tooltip: ""
	}, {
	  value: "#276E27",
	  label: "",
	  tooltip: ""
	}, {
	  value: "#FFFFFF",
	  label: "white",
	  tooltip: "white"
	}, {
	  value: "#d01919",
	  label: "red",
	  tooltip: "red"
	}, {
	  value: "#f2711c",
	  label: "orange",
	  tooltip: "orange"
	}, {
	  value: "#fbbd08",
	  label: "yellow",
	  tooltip: "yellow"
	}, {
	  value: "#b5cc18",
	  label: "olive",
	  tooltip: "olive"
	}, {
	  value: "#21ba45",
	  label: "green",
	  tooltip: "green"
	}, {
	  value: "#009c95",
	  label: "teal",
	  tooltip: "teal"
	}, {
	  value: "#2185d0",
	  label: "blue",
	  tooltip: "blue"
	}, {
	  value: "#6435c9",
	  label: "violet",
	  tooltip: "violet"
	}, {
	  value: "#a333c8",
	  label: "purple",
	  tooltip: "purple"
	}, {
	  value: "#e03997",
	  label: "pink",
	  tooltip: "pink"
	}, {
	  value: "#975b33",
	  label: "brown",
	  tooltip: "brown"
	}, {
	  value: "#767676",
	  label: "grey",
	  tooltip: "grey"
	}, {
	  value: "#1b1c1d",
	  label: "black",
	  tooltip: "black"
	}];
	
	var SIZE_OPTIONS = [{
	  value: "mini",
	  label: "Mini",
	  tooltip: "Mini"
	}, {
	  value: "tiny",
	  label: "Tiny",
	  tooltip: "Tiny"
	}, {
	  value: "small",
	  label: "Small",
	  tooltip: "Small"
	}, {
	  value: "",
	  label: "Normal",
	  tooltip: "Normal"
	}, {
	  value: "large",
	  label: "Large",
	  tooltip: "Large"
	}, {
	  value: "huge",
	  label: "Huge",
	  tooltip: "Huge"
	}];
	
	function getSizeIndex(value) {
	  return SIZE_OPTIONS.map(function (item) {
	    return item.value;
	  }).indexOf(value);
	}
	
	var DIVIDE_BY = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
	
	function getDivideByValue(value) {
	  var divs = DIVIDE_BY.indexOf(value);
	  if (divs !== -1) return 100 / divs;else return null;
	}
	
	var DIM_LABEL_OPTIONS = [{
	  value: "top attached",
	  label: "top attached"
	}, {
	  value: "bottom attached",
	  label: "bottom attached"
	}, {
	  value: "top right attached",
	  label: "top right attached"
	}, {
	  value: "top left attached",
	  label: "top left attached"
	}, {
	  value: "bottom left attached",
	  label: "bottom left attached"
	}, {
	  value: "bottom right attached",
	  label: "bottom right attached"
	}];
	
	var DIM_VIEW_OPTIONS = [{
	  value: "segment",
	  label: "Segment"
	}, {
	  value: "card",
	  label: "Card"
	}];
	
	var FONT_SIZE_OPTIONS = [
	//  'xx-small', // too small
	's-small', 'small', 'medium', 'large', 'x-large', 'xx-large'];
	
	exports["default"] = {
	  COLOR_OPTIONS: COLOR_OPTIONS,
	  SIZE_OPTIONS: SIZE_OPTIONS,
	  DIVIDE_BY: DIVIDE_BY,
	  DIM_LABEL_OPTIONS: DIM_LABEL_OPTIONS,
	  DIM_VIEW_OPTIONS: DIM_VIEW_OPTIONS,
	  FONT_SIZE_OPTIONS: FONT_SIZE_OPTIONS,
	  getSizeIndex: getSizeIndex,
	  getDivideByValue: getDivideByValue
	};
	module.exports = exports["default"];

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("C:\\Users\\nerush\\Documents\\Qlik\\Sense\\Extensions\\qsSimpleKPI\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "options.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("C:\\Users\\nerush\\Documents\\Qlik\\Sense\\Extensions\\qsSimpleKPI\\node_modules\\react-hot-loader\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("C:\\Users\\nerush\\Documents\\Qlik\\Sense\\Extensions\\qsSimpleKPI\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports['default'] = setupPaint;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(64);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _statisticBlock = __webpack_require__(65);
	
	var _statisticBlock2 = _interopRequireDefault(_statisticBlock);
	
	function setupPaint(paramaters) {
	  var DEFAULT_AUTO_FORMAT = '0A';
	  var numberFormatter = undefined;
	  if (paramaters.NumberFormatter && paramaters.qlik) {
	    var localeInfo = undefined;
	    try {
	      localeInfo = paramaters.qlik.currApp().model.layout.qLocaleInfo;
	    } finally {
	      var decimalSeparator = localeInfo && localeInfo.qDecimalSep || ".";
	      var thousandSep = localeInfo && localeInfo.qThousandSep || ",";
	      numberFormatter = new NumberFormatter(localeInfo, DEFAULT_AUTO_FORMAT, thousandSep, decimalSeparator, 'U'); // '', '', 'U'
	    }
	  }
	
	  return function paint($element, layout) {
	    _react2['default'].render(_react2['default'].createElement(_statisticBlock2['default'], {
	      kpis: layout.qHyperCube,
	      options: _extends({}, layout.options, {
	        numberFormatter: numberFormatter,
	        DEFAULT_AUTO_FORMAT: DEFAULT_AUTO_FORMAT
	      }),
	      services: {
	        Routing: paramaters.Routing,
	        State: paramaters.State
	      },
	      element: $element[0] }), $element[0]);
	  };
	}
	
	module.exports = exports['default'];

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("C:\\Users\\nerush\\Documents\\Qlik\\Sense\\Extensions\\qsSimpleKPI\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "paint.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },
/* 64 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("C:\\Users\\nerush\\Documents\\Qlik\\Sense\\Extensions\\qsSimpleKPI\\node_modules\\react-hot-loader\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("C:\\Users\\nerush\\Documents\\Qlik\\Sense\\Extensions\\qsSimpleKPI\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(64);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactInlineCss = __webpack_require__(66);
	
	var _reactInlineCss2 = _interopRequireDefault(_reactInlineCss);
	
	var _options = __webpack_require__(62);
	
	var _statisticItem = __webpack_require__(67);
	
	var _statisticItem2 = _interopRequireDefault(_statisticItem);
	
	var StatisticBlock = (function (_Component) {
	  _inherits(StatisticBlock, _Component);
	
	  function StatisticBlock(props) {
	    _classCallCheck(this, StatisticBlock);
	
	    _get(Object.getPrototypeOf(StatisticBlock.prototype), 'constructor', this).call(this, props);
	    this.state = {
	      size: props.options.size,
	      clientWidth: props.element.clientWidth,
	      clientHeight: props.element.clientHeight,
	      overflow: null,
	      valueFontStyleIndex: null
	    };
	  }
	
	  _createClass(StatisticBlock, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var self = this;
	      setTimeout(function () {
	        self.checkRequiredSize();
	      }, 100);
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      this.checkRequiredSize();
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      this.restoreSize();
	    }
	  }, {
	    key: 'restoreSize',
	    value: function restoreSize() {
	      var elementClientWidth = this.props.element.clientWidth;
	      var elementClientHeight = this.props.element.clientHeight;
	      var size = this.props.options.size;
	      this.setState({
	        size: size,
	        overflow: null,
	        clientWidth: elementClientWidth,
	        clientHeight: elementClientHeight,
	        valueFontStyleIndex: null
	      });
	    }
	  }, {
	    key: 'kpiItemResizeHandler',
	    value: function kpiItemResizeHandler() {
	      if (this.props.options.autoSize) {
	        var size = this.state.size;
	        var index = (0, _options.getSizeIndex)(size);
	        if (index > 0) {
	          this.setState({
	            size: _options.SIZE_OPTIONS[index - 1].value
	          });
	        } else {
	          if (this.state.valueFontStyleIndex) this.setState({ valueFontStyleIndex: this.state.valueFontStyleIndex - 1 });else if (this.state.valueFontStyleIndex !== 0) this.setState({ valueFontStyleIndex: _options.FONT_SIZE_OPTIONS.length - 1 });
	        }
	      }
	    }
	  }, {
	    key: 'checkRequiredSize',
	    value: function checkRequiredSize() {
	      var element = this.props.element;
	      var scrollWidth = element.scrollWidth * 0.95;
	      var scrollHeight = element.scrollHeight * 0.95;
	
	      if (this.props.options.autoSize) {
	        var size = this.state.size;
	        var elementClientWidth = this.props.element.clientWidth;
	        var elementClientHeight = this.props.element.clientHeight;
	        var clientWidth = this.state.clientWidth;
	        var clientHeight = this.state.clientHeight;
	        var childHeight = 0;
	
	        if (element.clientHeight == element.scrollHeight && this.state.size == this.props.options.size && !this.state.overflow) return;
	
	        if (this.refs['child-0']) {
	          childHeight = _react2['default'].findDOMNode(this.refs['child-0']).clientHeight;
	        }
	
	        if (element && (element.clientHeight < scrollHeight || childHeight && element.clientHeight < childHeight || (clientWidth != element.clientWidth || clientHeight != element.clientHeight) && size != this.props.options.size)) {
	          if (element.clientHeight < scrollHeight || element.clientHeight < childHeight || element.clientWidth < scrollWidth) {
	            if (this.state.size == _options.SIZE_OPTIONS[0].value && this.state.overflow === "auto") return;
	
	            var index = (0, _options.getSizeIndex)(size);
	            if (index > 0) this.setState({
	              size: _options.SIZE_OPTIONS[index - 1].value,
	              clientWidth: elementClientWidth,
	              clientHeight: elementClientHeight,
	              prevClientWidth: this.state.clientWidth,
	              prevClientHeight: this.state.clientHeight
	            });else if (index == 0) {
	              if (this.state.overflow !== "auto") this.setState({ overflow: "auto" });
	            }
	          } else {
	            if (this.state.prevClientWidth > this.state.clientWidth || this.state.prevClientHeight > this.state.clientHeight) this.restoreSize();
	          }
	        }
	      } else {
	        if (this.state.overflow !== "auto" && (element.clientHeight < scrollHeight || element.clientWidth < scrollWidth)) this.setState({ overflow: "auto" });
	      }
	    }
	  }, {
	    key: 'renderKpis',
	    value: function renderKpis(kpis, rowindex) {
	      var self = this;
	      var numberFormatter = this.props.options.numberFormatter;
	      var labelOrientation = this.props.options.labelOrientation; //this.state.labelOrientation;
	
	      var options = this.props.options;
	      var size = this.state.size;
	
	      var currentSizeIndex = (0, _options.getSizeIndex)(size);
	      var originalSizeIndex = (0, _options.getSizeIndex)(this.props.options.size);
	      var deltaSizeIndex = 0;
	      if (originalSizeIndex !== -1 && currentSizeIndex !== -1) {
	        deltaSizeIndex = originalSizeIndex - currentSizeIndex;
	      }
	
	      var measuresShift = kpis.qDimensionInfo.length;
	      var qMeasureInfo = kpis.qMeasureInfo;
	      var data = kpis.qDataPages[0].qMatrix.length > 0 && kpis.qDataPages[0].qMatrix[rowindex];
	      var dimensionValue = measuresShift > 0 && data[0].qText; // first dimension only
	      return qMeasureInfo.map(function (item, mindex) {
	        var index = measuresShift + mindex;
	        var itemSize = item.size;
	        if (deltaSizeIndex > 0) {
	          var itemSizeIndex = (0, _options.getSizeIndex)(itemSize);
	          itemSizeIndex = Math.max(0, deltaSizeIndex > 0 ? itemSizeIndex - deltaSizeIndex : itemSizeIndex);
	          itemSize = _options.SIZE_OPTIONS[itemSizeIndex].value;
	        }
	        var params = {
	          label: item.qFallbackTitle,
	          value: "",
	          hideLabel: item.hideLabel,
	          labelColor: item.labelColor,
	          valueColor: item.valueColor,
	          valueIcon: item.valueIcon,
	          iconPosition: item.iconPosition,
	          iconOrder: item.iconOrder,
	          iconSize: item.iconSize,
	          ovParams: item.ovParams,
	          size: item.ovParams ? itemSize : size,
	          labelOrder: item.ovParams ? item.labelOrder : options.labelOrder,
	          labelOrientation: item.ovParams ? item.labelOrientation : labelOrientation,
	          fontStyles: {},
	          kpiLink: item.kpiLink,
	          useLink: item.useLink
	        };
	        params.onClick = self.onKPIClick.bind(self, params);
	
	        var fontStyles = item.fontStyles && item.fontStyles.split(',');
	        fontStyles && fontStyles.forEach(function (value) {
	          params.fontStyles[value] = value;
	        });
	
	        if (self.state.valueFontStyleIndex >= 0 && self.state.valueFontStyleIndex < _options.FONT_SIZE_OPTIONS.length) params.fontStyles.fontSize = _options.FONT_SIZE_OPTIONS[self.state.valueFontStyleIndex];
	
	        if (index < data.length) {
	          params.value = data[index].qText;
	          if (item.qIsAutoFormat && numberFormatter) {
	            var value = data[index].qNum;
	            if (!isNaN(value) && isFinite(value)) {
	              if (item.autoFormatTemplate) params.value = numberFormatter.format(value, item.autoFormatTemplate);else params.value = numberFormatter.format(value, options.DEFAULT_AUTO_FORMAT); //formatValue
	            }
	          }
	        }
	
	        if (!item.groupByDimension || item.groupByDimension && item.groupByDimensionValue === dimensionValue) {
	          var itemIndex = rowindex * (measuresShift + qMeasureInfo.length) + mindex;
	          return _react2['default'].createElement(_statisticItem2['default'], { ref: "child-" + itemIndex,
	            index: itemIndex,
	            key: item.cId,
	            item: params,
	            options: options,
	            onNeedResize: self.kpiItemResizeHandler.bind(self) });
	        } else return null;
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var self = this;
	      var kpis = this.props.kpis;
	      var _props$options = this.props.options;
	      var dimLabelOrientation = _props$options.dimLabelOrientation;
	      var dimLabelSize = _props$options.dimLabelSize;
	      var dimHideLabels = _props$options.dimHideLabels;
	      var dimCenteredLabels = _props$options.dimCenteredLabels;
	      var dimensionsOrientation = _props$options.dimensionsOrientation;
	      var dimHideBorders = _props$options.dimHideBorders;
	      var dimHideInternalBorders = _props$options.dimHideInternalBorders;
	      var _props$options$dimShowAs = _props$options.dimShowAs;
	      var dimShowAs = _props$options$dimShowAs === undefined ? 'segment' : _props$options$dimShowAs;
	      var _props$options$dimDivideBy = _props$options.dimDivideBy;
	      var dimDivideBy = _props$options$dimDivideBy === undefined ? 'auto' : _props$options$dimDivideBy;
	      var divideBy = _props$options.divideBy;
	      var _props$options$styles = _props$options.styles;
	      var styles = _props$options$styles === undefined ? '' : _props$options$styles;
	
	      var items = undefined;
	
	      if (kpis.qMeasureInfo.length > 0 && kpis.qDataPages.length > 0) {
	
	        if (divideBy === "auto") divideBy = _options.DIVIDE_BY[Math.min(10, kpis.qDataPages[0].qMatrix[0].length - kpis.qDimensionInfo.length)];
	
	        // Dimension:
	        if (kpis.qDimensionInfo.length > 0) {
	          (function () {
	            if (dimDivideBy === "auto") dimDivideBy = _options.DIVIDE_BY[Math.min(10, kpis.qDimensionInfo[0].qCardinal)];
	
	            var dimShowAsContainer = dimShowAs === 'card' ? dimDivideBy + ' stackable cards' : 'segments';
	            var dimLabelsAlignment = '';
	            if (dimCenteredLabels) dimLabelsAlignment = 'center aligned';
	            var segmentsStyle = {}; //{margin: 0, height: '100%'};
	            var segmentStyle = {};
	            if (dimHideInternalBorders) segmentStyle.border = "0";
	            if (dimHideBorders) {
	              segmentsStyle.border = "0";
	              segmentsStyle.boxShadow = "none";
	              segmentStyle.boxShadow = "none";
	              if (dimShowAs === 'card') {
	                segmentStyle.border = "0";
	              }
	            }
	            items = _react2['default'].createElement(
	              'div',
	              { className: 'ui ' + dimensionsOrientation + ' ' + dimShowAsContainer, style: segmentsStyle },
	              kpis.qDataPages[0].qMatrix.map(function (dim, dindex) {
	                var dimensionLabel = dim[0].qText; // could be only one dimension!
	                var measures = self.renderKpis(kpis, dindex);
	                return _react2['default'].createElement(
	                  'div',
	                  { className: 'ui ' + dimShowAs, style: segmentStyle },
	                  dimHideLabels ? null : _react2['default'].createElement(
	                    'a',
	                    { className: 'ui ' + dimLabelSize + ' ' + dimLabelOrientation + ' ' + dimLabelsAlignment + ' label' },
	                    dimensionLabel
	                  ),
	                  _react2['default'].createElement(
	                    'div',
	                    { ref: 'statistics', className: 'ui ' + divideBy + ' statistics' },
	                    measures
	                  )
	                );
	              })
	            );
	          })();
	        } else {
	          // ${size}
	          items = _react2['default'].createElement(
	            'div',
	            { ref: 'statistics', className: 'ui ' + divideBy + ' statistics' },
	            self.renderKpis(kpis, 0)
	          );
	        }
	      }
	
	      var objectStyle = {};
	      if (this.state.overflow) objectStyle.overflow = this.state.overflow;
	
	      return _react2['default'].createElement(
	        'div',
	        { className: 'qv-object-qsstatistic', style: objectStyle },
	        _react2['default'].createElement(
	          _reactInlineCss2['default'],
	          { stylesheet: styles },
	          items
	        )
	      );
	    }
	  }, {
	    key: 'onKPIClick',
	    value: function onKPIClick(kpi) {
	      var services = this.props.services;
	      var isAllowOpenSheet = this.props.services.State && !this.props.services.State.isInEditMode();
	      if (kpi.useLink && isAllowOpenSheet && services.Routing) {
	        var linkId = undefined;
	        if (typeof kpi.kpiLink === "string") linkId = kpi.kpiLink;else linkId = kpi.kpiLink && kpi.kpiLink.id;
	
	        if (linkId) services.Routing.goToSheet(linkId, 'analysis');
	      }
	    }
	  }]);
	
	  return StatisticBlock;
	})(_react.Component);
	
	exports['default'] = StatisticBlock;
	module.exports = exports['default'];

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("C:\\Users\\nerush\\Documents\\Qlik\\Sense\\Extensions\\qsSimpleKPI\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "statisticBlock.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @copyright © 2015, Rick Wong. All rights reserved.
	 */
	var React      = __webpack_require__(64);
	var assign     = React.__spread;
	var refCounter = 0;
	
	/**
	 * @module InlineCss
	 */
	var InlineCss = React.createClass({
		displayName: "InlineCss",
		propTypes: {
			namespace:     React.PropTypes.string,
			componentName: React.PropTypes.string,
			stylesheet:    React.PropTypes.string.isRequired,
			className:     React.PropTypes.string,
			wrapper:       React.PropTypes.string
		},
		_transformSheet: function (stylesheet, componentName, namespace) {
			return stylesheet.
				// Prettier output.
				replace(/}\s*/ig, '\n}\n').
				// Regular rules are namespaced.
				replace(
					/(^|{|}|;|,)\s*([&a-z0-9\-_\.:#\(\),>*\s]+)\s*(\{)/ig,
					function (matched) {
						return matched.replace(new RegExp(componentName, "g"), "#" + namespace);
					}
				);
		},
		render: function () {
			var namespace     = this.props.namespace || "InlineCss-" + refCounter++;
			var componentName = this.props.componentName || "&";
			var stylesheet    = this._transformSheet(this.props.stylesheet, componentName, namespace);
			var Wrapper       = this.props.wrapper || "div";
	
			var wrapperProps = assign({}, this.props, {
				namespace:     undefined,
				componentName: undefined,
				stylesheet:    undefined,
				wrapper:       undefined,
				id:            namespace
			});
	
			return React.createElement(
				Wrapper,
				wrapperProps,
				this.props.children,
				React.createElement("style", {
					scoped:                  true,
					dangerouslySetInnerHTML: {__html: stylesheet}
				})
			);
		}
	});
	
	module.exports = InlineCss;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("C:\\Users\\nerush\\Documents\\Qlik\\Sense\\Extensions\\qsSimpleKPI\\node_modules\\react-hot-loader\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("C:\\Users\\nerush\\Documents\\Qlik\\Sense\\Extensions\\qsSimpleKPI\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(64);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _options = __webpack_require__(62);
	
	var StatisticItem = (function (_Component) {
	  _inherits(StatisticItem, _Component);
	
	  function StatisticItem(props) {
	    _classCallCheck(this, StatisticItem);
	
	    _get(Object.getPrototypeOf(StatisticItem.prototype), 'constructor', this).call(this, props);
	  }
	
	  _createClass(StatisticItem, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var self = this;
	      setTimeout(function () {
	        self.checkRequiredSize();
	      }, 100);
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      this.checkRequiredSize();
	    }
	  }, {
	    key: 'checkRequiredSize',
	    value: function checkRequiredSize() {
	      if (!this.props.onNeedResize) return;
	
	      var valueElement = _react2['default'].findDOMNode(this.refs['value']);
	      if (valueElement.firstChild) {
	        var valueChild = valueElement.firstChild;
	        var childWidth = $(valueChild).width();
	        //let childHeight = $(valueChild).height();
	        if (childWidth > valueElement.clientWidth) {
	          this.props.onNeedResize();
	        }
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      //let size = this.props.item.size || "";
	      var index = this.props.index;
	      var _props$item = this.props.item;
	      var hideLabel = _props$item.hideLabel;
	      var _props$item$labelOrientation = _props$item.labelOrientation;
	      var labelOrientation = _props$item$labelOrientation === undefined ? "" : _props$item$labelOrientation;
	      var labelOrder = _props$item.labelOrder;
	      var iconOrder = _props$item.iconOrder;
	      var labelColor = _props$item.labelColor;
	      var _props$item$valueColor = _props$item.valueColor;
	      var valueColor = _props$item$valueColor === undefined ? "" : _props$item$valueColor;
	      var valueIcon = _props$item.valueIcon;
	      var _props$item$iconSize = _props$item.iconSize;
	      var iconSize = _props$item$iconSize === undefined ? "" : _props$item$iconSize;
	      var _props$item$size = _props$item.size;
	      var size = _props$item$size === undefined ? "" : _props$item$size;
	      var fontStyles = _props$item.fontStyles;
	      var onClick = _props$item.onClick;
	
	      //let labelOrderFirst = labelOrder === "first";
	      // const hideLabel = this.props.item.hideLabel;
	      // const onItemClick = this.props.item.onClick;
	      //let labelOrientation = this.props.item.labelOrientation || "";
	      //let labelColor = this.props.item.labelColor;
	      // let valueColor = this.props.item.valueColor || "";
	      //let valueIcon = this.props.item.valueIcon || "";
	      // let iconSize = this.props.item.iconSize;
	      // let fontStyles = this.props.item.fontStyles;
	
	      var labelStyles = { padding: "0px 5px" };
	      var valueStyles = { padding: "0px 5px", color: valueColor };
	
	      if (labelColor) labelStyles.color = labelColor;
	
	      if (fontStyles.bold) valueStyles.fontWeight = 'bold';
	
	      if (fontStyles.italic) valueStyles.fontStyle = 'italic';
	
	      if (fontStyles.underline) valueStyles.textDecoration = 'underline';
	
	      if (fontStyles.fontSize) valueStyles.fontSize = fontStyles.fontSize;
	
	      // valueStyles.color = valueColor;
	      var classes = 'ui ' + labelOrientation + ' ' + size + ' statistic';
	      classes = classes.split(" ").filter(function (item) {
	        return item.trim().length > 0;
	      }).join(" ");
	
	      var iconOrderFirst = iconOrder === "first";
	      var labelComponent = hideLabel ? null : _react2['default'].createElement(
	        'div',
	        { key: 'lbl', className: 'label', style: labelStyles },
	        iconOrderFirst && this.props.item.iconPosition === 'label' ? _react2['default'].createElement('i', { className: valueIcon + ' ' + iconSize }) : null,
	        this.props.item.label,
	        !iconOrderFirst && this.props.item.iconPosition === 'label' ? _react2['default'].createElement('i', { className: valueIcon + ' ' + iconSize }) : null
	      );
	
	      var valueComponent = _react2['default'].createElement(
	        'div',
	        { key: 'val', ref: 'value', className: 'value', style: valueStyles },
	        iconOrderFirst && this.props.item.iconPosition === 'value' ? _react2['default'].createElement('i', { className: valueIcon + ' ' + iconSize }) : null,
	        this.props.item.value,
	        !iconOrderFirst && this.props.item.iconPosition === 'value' ? _react2['default'].createElement('i', { className: valueIcon + ' ' + iconSize }) : null
	      );
	
	      var content = [];
	      if (labelOrder === "first") {
	        content.push(labelComponent);
	        content.push(valueComponent);
	      } else {
	        content.push(valueComponent);
	        content.push(labelComponent);
	      }
	
	      var statisticStyles = {};
	      if (onClick) {
	        statisticStyles.cursor = "pointer";
	      }
	      // *** patch for ios devices ***
	      var divPercent = (0, _options.getDivideByValue)(this.props.options.divideBy);
	      if (divPercent) {
	        statisticStyles.width = divPercent + '%';
	      }
	      // *** patch for ios dev ***
	      // statistic-${index} - allows to use custom style to each measures element
	      var statisticItem = _react2['default'].createElement(
	        'div',
	        { className: 'statistic statistic-' + (index + 1),
	          style: statisticStyles,
	          onClick: onClick },
	        _react2['default'].createElement(
	          'div',
	          { className: 'ui one ' + size + ' statistics' },
	          _react2['default'].createElement(
	            'div',
	            { className: classes },
	            content
	          )
	        )
	      );
	
	      return statisticItem;
	    }
	  }]);
	
	  return StatisticItem;
	})(_react.Component);
	
	exports['default'] = StatisticItem;
	module.exports = exports['default'];

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("C:\\Users\\nerush\\Documents\\Qlik\\Sense\\Extensions\\qsSimpleKPI\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "statisticItem.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("C:\\Users\\nerush\\Documents\\Qlik\\Sense\\Extensions\\qsSimpleKPI\\node_modules\\react-hot-loader\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("C:\\Users\\nerush\\Documents\\Qlik\\Sense\\Extensions\\qsSimpleKPI\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.setRefValue = setRefValue;
	exports.getRefValue = getRefValue;
	function _getRefs(data, refName) {
	  var ref = data;
	  var name = refName;
	  var props = refName.split('.');
	  if (props.length > 0) {
	    for (var i = 0; i < props.length - 1; ++i) {
	      if (ref[props[i]]) ref = ref[props[i]];
	    }
	    name = props[props.length - 1];
	  }
	  return { ref: ref, name: name };
	}
	
	function setRefValue(data, refName, value) {
	  var _getRefs2 = _getRefs(data, refName);
	
	  var ref = _getRefs2.ref;
	  var name = _getRefs2.name;
	
	  ref[name] = value;
	}
	
	function getRefValue(data, refName) {
	  var _getRefs3 = _getRefs(data, refName);
	
	  var ref = _getRefs3.ref;
	  var name = _getRefs3.name;
	
	  return ref[name];
	}

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("C:\\Users\\nerush\\Documents\\Qlik\\Sense\\Extensions\\qsSimpleKPI\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "utils.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("C:\\Users\\nerush\\Documents\\Qlik\\Sense\\Extensions\\qsSimpleKPI\\node_modules\\react-hot-loader\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("C:\\Users\\nerush\\Documents\\Qlik\\Sense\\Extensions\\qsSimpleKPI\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = DialogComponentFactory;
	
	var _utils = __webpack_require__(68);
	
	function DialogComponentFactory(ShowService, dialogOptions) {
	  var defaultComponentView = dialogOptions.controlComponent || "\n  <button\n    class=\"qui-button\"\n    title=\"Show dialog\"\n    qva-activate=\"showDialog()\">\n    <i class=\"{{icon}}\" style=\"font-size:18px;\"></i>\n  </button>\n  ";
	  return {
	    template: "<div class=\"pp-component pp-buttongroup-component\">\n      <div class=\"label\" ng-if=\"label\" ng-class=\"{ 'disabled': readOnly }\">\n        {{label}}\n      </div>\n      <div class=\"value\">\n        <div class=\"qv-object-qsstatistic\" ng-if=\"!loading\">\n        " + defaultComponentView + "\n        </div>\n      </div>\n      <div class=\"pp-loading-container\" ng-if=\"loading\">\n        <div class=\"pp-loader qv-loader\"></div>\n      </div>\n      <div ng-if=\"errorMessage\" class=\"pp-invalid error\">{{errorMessage}}</div>\n    </div>",
	    controller: ["$scope", "$element", function (c, e) {
	      function init(c, e) {
	        c.visible = false;
	        c.loading = true;
	        c.label = c.definition.label;
	        c.value = (0, _utils.getRefValue)(c.data, c.definition.ref) || c.definition.defaultValue;
	        c.icon = typeof c.definition.icon == "function" && c.definition.icon(c, e) || c.definition.icon || "";
	
	        c.visible = true;
	
	        if (dialogOptions && dialogOptions.initContext && typeof dialogOptions.initContext == 'function') {
	          dialogOptions.initContext(c, e);
	        }
	
	        c.loading = false;
	      }
	      init(c, e);
	
	      c.changeValue = function (value) {
	        c.value = value;
	
	        if (c.isExpression) {
	          var val = (0, _utils.getRefValue)(c.data, c.definition.ref);
	          if (val && val.qStringExpression && val.qStringExpression.qExpr) {
	            val.qStringExpression.qExpr += c.value;
	          } else (0, _utils.setRefValue)(c.data, c.definition.ref, c.value);
	        } else (0, _utils.setRefValue)(c.data, c.definition.ref, value);
	
	        "function" == typeof c.definition.change && c.definition.change(c.data, c.args.handler);
	        (0, _utils.setRefValue)(c.data, c.definition.ref, value);
	        c.$emit("saveProperties");
	      };
	
	      c.$on("datachanged", function () {
	        init(c, e);
	      });
	
	      function show(component, options) {
	        var text = options.text,
	            icon = void 0 !== options.icon ? options.icon : "cogwheel",
	            confirmLabel = options.confirm || "Common.OK",
	            width = options.width || "320px",
	            height = options.height || "auto",
	            input = {
	          text: text,
	          header: options.header,
	          icon: icon,
	          confirmLabel: confirmLabel,
	          width: width,
	          height: height
	        };
	        return ShowService.show(component, input);
	      }
	
	      c.showDialog = function () {
	        var component = {
	          template: "\n              <qv-modal-dialog qv-id=\"my-confirm-dialog\"\n                qv-cancel=\"cancel()\"\n                qv-confirm=\"confirm()\">\n                <header ng-if=\"header\" class=\"dm-header\" q-translation=\"{{header}}\"></header>\n                <main class=\"dm-main\">\n                  <div class=\"qv-mvc-dialog-content\">\n                    <div class=\"qv-mvc-dialog-icon icon-{{icon}}\" ng-show=\"icon\">\n                    </div>\n                    <p><span q-translation=\"{{text}}\"></span></p>\n                  </div>\n                  <div style=\"width:{{width}};height:{{height}}\">" + (dialogOptions.dialogContent || "") + "</div>\n                </main>\n                <qv-confirm-cancel-footer qv-confirm=\"confirm()\" qv-cancel=\"cancel()\" qv-confirm-label=\"{{$parent.confirmLabel}}\"></qv-confirm-cancel-footer>\n              </qv-modal-dialog>",
	          scope: {
	            text: "=",
	            header: "=",
	            icon: "=",
	            confirmLabel: "=",
	            width: "=",
	            height: "="
	          },
	          controller: ["$scope", function ($scope) {
	            $scope.value = c.value;
	            $scope.select = function (newValue) {
	              if (dialogOptions.selectValue) $scope.value = dialogOptions.selectValue($scope, newValue);else $scope.value = newValue;
	              //setRefValue(c.data, c.definition.ref, value);
	            };
	            $scope.confirm = function () {
	              // setRefValue(c.data, c.definition.ref, $scope.value);
	              // c.$emit("saveProperties");
	              c.changeValue($scope.value);
	              $scope.destroyComponent(), $scope.deferredResult.resolve();
	            };
	            $scope.cancel = function () {
	              $scope.destroyComponent(), $scope.deferredResult.reject();
	            };
	
	            if (dialogOptions && dialogOptions.initDialogContext && typeof dialogOptions.initDialogContext == 'function') {
	              dialogOptions.initDialogContext(c, $scope);
	            }
	          }]
	        };
	
	        show(component, dialogOptions);
	      };
	    }]
	  };
	}
	
	;
	module.exports = exports["default"];

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("C:\\Users\\nerush\\Documents\\Qlik\\Sense\\Extensions\\qsSimpleKPI\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "dialogComponent.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjMzMzQyZmMyNjI0NDU0OGU2NzEiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS1kZXYtc2VydmVyL2NsaWVudCIsIndlYnBhY2s6Ly8vKHdlYnBhY2spLWRldi1zZXJ2ZXIvY2xpZW50P2NkMTciLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc29ja2V0LmlvLWNsaWVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spLWRldi1zZXJ2ZXIvfi9zb2NrZXQuaW8tY2xpZW50L2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spLWRldi1zZXJ2ZXIvfi9zb2NrZXQuaW8tY2xpZW50L2xpYi91cmwuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc29ja2V0LmlvLWNsaWVudC9+L3BhcnNldXJpL2luZGV4LmpzIiwid2VicGFjazovLy8od2VicGFjayktZGV2LXNlcnZlci9+L3NvY2tldC5pby1jbGllbnQvfi9kZWJ1Zy9kZWJ1Zy5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spLWRldi1zZXJ2ZXIvfi9zb2NrZXQuaW8tY2xpZW50L34vc29ja2V0LmlvLXBhcnNlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spLWRldi1zZXJ2ZXIvfi9zb2NrZXQuaW8tY2xpZW50L34vc29ja2V0LmlvLXBhcnNlci9+L2pzb24zL2xpYi9qc29uMy5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vYW1kLW9wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc29ja2V0LmlvLWNsaWVudC9+L3NvY2tldC5pby1wYXJzZXIvfi9pc2FycmF5L2luZGV4LmpzIiwid2VicGFjazovLy8od2VicGFjayktZGV2LXNlcnZlci9+L3NvY2tldC5pby1jbGllbnQvfi9jb21wb25lbnQtZW1pdHRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spLWRldi1zZXJ2ZXIvfi9zb2NrZXQuaW8tY2xpZW50L34vc29ja2V0LmlvLXBhcnNlci9iaW5hcnkuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc29ja2V0LmlvLWNsaWVudC9+L3NvY2tldC5pby1wYXJzZXIvaXMtYnVmZmVyLmpzIiwid2VicGFjazovLy8od2VicGFjayktZGV2LXNlcnZlci9+L3NvY2tldC5pby1jbGllbnQvbGliL21hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc29ja2V0LmlvLWNsaWVudC9+L2VuZ2luZS5pby1jbGllbnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc29ja2V0LmlvLWNsaWVudC9+L2VuZ2luZS5pby1jbGllbnQvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8od2VicGFjayktZGV2LXNlcnZlci9+L3NvY2tldC5pby1jbGllbnQvfi9lbmdpbmUuaW8tY2xpZW50L2xpYi9zb2NrZXQuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc29ja2V0LmlvLWNsaWVudC9+L2VuZ2luZS5pby1jbGllbnQvbGliL3RyYW5zcG9ydHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc29ja2V0LmlvLWNsaWVudC9+L2VuZ2luZS5pby1jbGllbnQvbGliL3htbGh0dHByZXF1ZXN0LmpzIiwid2VicGFjazovLy8od2VicGFjayktZGV2LXNlcnZlci9+L3NvY2tldC5pby1jbGllbnQvfi9lbmdpbmUuaW8tY2xpZW50L34vaGFzLWNvcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc29ja2V0LmlvLWNsaWVudC9+L2VuZ2luZS5pby1jbGllbnQvfi9oYXMtY29ycy9+L2dsb2JhbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spLWRldi1zZXJ2ZXIvfi9zb2NrZXQuaW8tY2xpZW50L34vZW5naW5lLmlvLWNsaWVudC9saWIvdHJhbnNwb3J0cy9wb2xsaW5nLXhoci5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spLWRldi1zZXJ2ZXIvfi9zb2NrZXQuaW8tY2xpZW50L34vZW5naW5lLmlvLWNsaWVudC9saWIvdHJhbnNwb3J0cy9wb2xsaW5nLmpzIiwid2VicGFjazovLy8od2VicGFjayktZGV2LXNlcnZlci9+L3NvY2tldC5pby1jbGllbnQvfi9lbmdpbmUuaW8tY2xpZW50L2xpYi90cmFuc3BvcnQuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc29ja2V0LmlvLWNsaWVudC9+L2VuZ2luZS5pby1jbGllbnQvfi9lbmdpbmUuaW8tcGFyc2VyL2xpYi9icm93c2VyLmpzIiwid2VicGFjazovLy8od2VicGFjayktZGV2LXNlcnZlci9+L3NvY2tldC5pby1jbGllbnQvfi9lbmdpbmUuaW8tY2xpZW50L34vZW5naW5lLmlvLXBhcnNlci9saWIva2V5cy5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spLWRldi1zZXJ2ZXIvfi9zb2NrZXQuaW8tY2xpZW50L34vZW5naW5lLmlvLWNsaWVudC9+L2VuZ2luZS5pby1wYXJzZXIvfi9oYXMtYmluYXJ5L2luZGV4LmpzIiwid2VicGFjazovLy8od2VicGFjayktZGV2LXNlcnZlci9+L3NvY2tldC5pby1jbGllbnQvfi9lbmdpbmUuaW8tY2xpZW50L34vZW5naW5lLmlvLXBhcnNlci9+L2hhcy1iaW5hcnkvfi9pc2FycmF5L2luZGV4LmpzIiwid2VicGFjazovLy8od2VicGFjayktZGV2LXNlcnZlci9+L3NvY2tldC5pby1jbGllbnQvfi9lbmdpbmUuaW8tY2xpZW50L34vZW5naW5lLmlvLXBhcnNlci9+L2FycmF5YnVmZmVyLnNsaWNlL2luZGV4LmpzIiwid2VicGFjazovLy8od2VicGFjayktZGV2LXNlcnZlci9+L3NvY2tldC5pby1jbGllbnQvfi9lbmdpbmUuaW8tY2xpZW50L34vZW5naW5lLmlvLXBhcnNlci9+L2Jhc2U2NC1hcnJheWJ1ZmZlci9saWIvYmFzZTY0LWFycmF5YnVmZmVyLmpzIiwid2VicGFjazovLy8od2VicGFjayktZGV2LXNlcnZlci9+L3NvY2tldC5pby1jbGllbnQvfi9lbmdpbmUuaW8tY2xpZW50L34vZW5naW5lLmlvLXBhcnNlci9+L2FmdGVyL2luZGV4LmpzIiwid2VicGFjazovLy8od2VicGFjayktZGV2LXNlcnZlci9+L3NvY2tldC5pby1jbGllbnQvfi9lbmdpbmUuaW8tY2xpZW50L34vZW5naW5lLmlvLXBhcnNlci9+L3V0ZjgvdXRmOC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8od2VicGFjayktZGV2LXNlcnZlci9+L3NvY2tldC5pby1jbGllbnQvfi9lbmdpbmUuaW8tY2xpZW50L34vZW5naW5lLmlvLXBhcnNlci9+L2Jsb2IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc29ja2V0LmlvLWNsaWVudC9+L2VuZ2luZS5pby1jbGllbnQvfi9wYXJzZXFzL2luZGV4LmpzIiwid2VicGFjazovLy8od2VicGFjayktZGV2LXNlcnZlci9+L3NvY2tldC5pby1jbGllbnQvfi9lbmdpbmUuaW8tY2xpZW50L34vY29tcG9uZW50LWluaGVyaXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc29ja2V0LmlvLWNsaWVudC9+L2VuZ2luZS5pby1jbGllbnQvfi9kZWJ1Zy9icm93c2VyLmpzIiwid2VicGFjazovLy8od2VicGFjayktZGV2LXNlcnZlci9+L3NvY2tldC5pby1jbGllbnQvfi9lbmdpbmUuaW8tY2xpZW50L34vZGVidWcvZGVidWcuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc29ja2V0LmlvLWNsaWVudC9+L2VuZ2luZS5pby1jbGllbnQvfi9kZWJ1Zy9+L21zL2luZGV4LmpzIiwid2VicGFjazovLy8od2VicGFjayktZGV2LXNlcnZlci9+L3NvY2tldC5pby1jbGllbnQvfi9lbmdpbmUuaW8tY2xpZW50L2xpYi90cmFuc3BvcnRzL3BvbGxpbmctanNvbnAuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc29ja2V0LmlvLWNsaWVudC9+L2VuZ2luZS5pby1jbGllbnQvbGliL3RyYW5zcG9ydHMvd2Vic29ja2V0LmpzIiwid2VicGFjazovLy8od2VicGFjayktZGV2LXNlcnZlci9+L3NvY2tldC5pby1jbGllbnQvfi9lbmdpbmUuaW8tY2xpZW50L34vd3MvbGliL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc29ja2V0LmlvLWNsaWVudC9+L2luZGV4b2YvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc29ja2V0LmlvLWNsaWVudC9+L2VuZ2luZS5pby1jbGllbnQvfi9wYXJzZXVyaS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spLWRldi1zZXJ2ZXIvfi9zb2NrZXQuaW8tY2xpZW50L34vZW5naW5lLmlvLWNsaWVudC9+L3BhcnNlanNvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spLWRldi1zZXJ2ZXIvfi9zb2NrZXQuaW8tY2xpZW50L2xpYi9zb2NrZXQuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc29ja2V0LmlvLWNsaWVudC9+L3RvLWFycmF5L2luZGV4LmpzIiwid2VicGFjazovLy8od2VicGFjayktZGV2LXNlcnZlci9+L3NvY2tldC5pby1jbGllbnQvbGliL29uLmpzIiwid2VicGFjazovLy8od2VicGFjayktZGV2LXNlcnZlci9+L3NvY2tldC5pby1jbGllbnQvfi9jb21wb25lbnQtYmluZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spLWRldi1zZXJ2ZXIvfi9zb2NrZXQuaW8tY2xpZW50L34vaGFzLWJpbmFyeS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spLWRldi1zZXJ2ZXIvfi9zb2NrZXQuaW8tY2xpZW50L34vaGFzLWJpbmFyeS9+L2lzYXJyYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc29ja2V0LmlvLWNsaWVudC9+L29iamVjdC1jb21wb25lbnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc29ja2V0LmlvLWNsaWVudC9+L2JhY2tvMi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spLWRldi1zZXJ2ZXIvfi9zdHJpcC1hbnNpL2luZGV4LmpzIiwid2VicGFjazovLy8od2VicGFjayktZGV2LXNlcnZlci9+L3N0cmlwLWFuc2kvfi9hbnNpLXJlZ2V4L2luZGV4LmpzIiwid2VicGFjazovLy9DOi9Vc2Vycy9uZXJ1c2gvRG9jdW1lbnRzL1FsaWsvU2Vuc2UvRXh0ZW5zaW9ucy9xc1NpbXBsZUtQSS9zcmMvY29tcG9uZW50LmpzIiwid2VicGFjazovLy9DOi9Vc2Vycy9uZXJ1c2gvRG9jdW1lbnRzL1FsaWsvU2Vuc2UvRXh0ZW5zaW9ucy9xc1NpbXBsZUtQSS9zcmMvbG9hZGNzcy5qcyIsIndlYnBhY2s6Ly8vQzovVXNlcnMvbmVydXNoL0RvY3VtZW50cy9RbGlrL1NlbnNlL0V4dGVuc2lvbnMvcXNTaW1wbGVLUEkvc3JjL2luaXRpYWxQcm9wZXJ0aWVzLmpzIiwid2VicGFjazovLy9DOi9Vc2Vycy9uZXJ1c2gvRG9jdW1lbnRzL1FsaWsvU2Vuc2UvRXh0ZW5zaW9ucy9xc1NpbXBsZUtQSS9zcmMvZGVmaW5pdGlvbi5qcyIsIndlYnBhY2s6Ly8vQzovVXNlcnMvbmVydXNoL0RvY3VtZW50cy9RbGlrL1NlbnNlL0V4dGVuc2lvbnMvcXNTaW1wbGVLUEkvc3JjL2RlZmluaXRpb25Db21wb25lbnRzLmpzIiwid2VicGFjazovLy9DOi9Vc2Vycy9uZXJ1c2gvRG9jdW1lbnRzL1FsaWsvU2Vuc2UvRXh0ZW5zaW9ucy9xc1NpbXBsZUtQSS9zcmMvaWNvbnNEZWZpbml0aW9ucy5qcyIsIndlYnBhY2s6Ly8vQzovVXNlcnMvbmVydXNoL0RvY3VtZW50cy9RbGlrL1NlbnNlL0V4dGVuc2lvbnMvcXNTaW1wbGVLUEkvc3JjL29wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vL0M6L1VzZXJzL25lcnVzaC9Eb2N1bWVudHMvUWxpay9TZW5zZS9FeHRlbnNpb25zL3FzU2ltcGxlS1BJL3NyYy9wYWludC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJSZWFjdFwiIiwid2VicGFjazovLy9DOi9Vc2Vycy9uZXJ1c2gvRG9jdW1lbnRzL1FsaWsvU2Vuc2UvRXh0ZW5zaW9ucy9xc1NpbXBsZUtQSS9zcmMvc3RhdGlzdGljQmxvY2suanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1pbmxpbmUtY3NzL3NyYy9yZWFjdC1pbmxpbmUtY3NzLmpzIiwid2VicGFjazovLy9DOi9Vc2Vycy9uZXJ1c2gvRG9jdW1lbnRzL1FsaWsvU2Vuc2UvRXh0ZW5zaW9ucy9xc1NpbXBsZUtQSS9zcmMvc3RhdGlzdGljSXRlbS5qcyIsIndlYnBhY2s6Ly8vQzovVXNlcnMvbmVydXNoL0RvY3VtZW50cy9RbGlrL1NlbnNlL0V4dGVuc2lvbnMvcXNTaW1wbGVLUEkvc3JjL3V0aWxzLmpzIiwid2VicGFjazovLy9DOi9Vc2Vycy9uZXJ1c2gvRG9jdW1lbnRzL1FsaWsvU2Vuc2UvRXh0ZW5zaW9ucy9xc1NpbXBsZUtQSS9zcmMvZGlhbG9nQ29tcG9uZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN0Q0Esd0RDQUEsU0RBQSxtQkNBQSxDREFBLENDQUE7QUFDQSxpQkRBQSxtQkNBQSxD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QTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixZQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxRQUFRO0FBQ25CLGFBQVksUUFBUTtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLGFBQVksUUFBUTtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLGFBQVksUUFBUTtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLGFBQVksUUFBUTtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFZLFFBQVE7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxTQUFTO0FBQ3BCLGFBQVksUUFBUTtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQiwyQkFBMkI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsSUFBRyxPQUFPO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3JmQTs7Ozs7Ozs7QUNBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1RBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsY0FBYztBQUN6QixZQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1DQUFrQzs7QUFFbEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLGFBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsUUFBTztBQUNQLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE1BQU07QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1Q0FBc0MsS0FBSztBQUMzQztBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNoc0JBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3BEQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRyxZQUFZOztBQUVmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRyxZQUFZOztBQUVmO0FBQ0E7QUFDQTtBQUNBLE1BQUssV0FBVztBQUNoQjtBQUNBOzs7Ozs7OztBQ2xDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdDQUErQixhQUFhLEVBQUU7Ozs7Ozs7QUNQOUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsWUFBVyxTQUFTO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDJCQUEwQixpREFBaUQ7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFjOztBQUVkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULDREQUEyRDtBQUMzRDtBQUNBLFFBQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdFQUF1RTtBQUN2RSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUMvWEE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUNBQWdDLGlCQUFpQjtBQUNqRDtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsU0FBUztBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWlCLGdCQUFnQjtBQUNqQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsTUFBTTtBQUNqQixZQUFXLFNBQVM7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDcFBBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsYUFBWSxVQUFVO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxNQUFNO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDOUpBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFlBQVc7O0FBRVg7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUEsK0JBQThCO0FBQzlCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDO0FBQ3JDO0FBQ0EsTUFBSztBQUNMLDZCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUNBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBLHVDQUFzQztBQUN0QztBQUNBO0FBQ0EsNENBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLDRDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FB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QUFFLFNBQVM7QUFDaEIsUUFBSyxFQUFFLEVBQUU7QUFDVCxVQUFPLEVBQUUsRUFBRTtFQUNaLEVBQ0Q7QUFDRSxRQUFLLEVBQUUsU0FBUztBQUNoQixRQUFLLEVBQUUsRUFBRTtBQUNULFVBQU8sRUFBRSxFQUFFO0VBQ1osRUFDRDtBQUNFLFFBQUssRUFBRSxTQUFTO0FBQ2hCLFFBQUssRUFBRSxFQUFFO0FBQ1QsVUFBTyxFQUFFLEVBQUU7RUFDWixFQUNEO0FBQ0UsUUFBSyxFQUFFLFNBQVM7QUFDaEIsUUFBSyxFQUFFLEVBQUU7QUFDVCxVQUFPLEVBQUUsRUFBRTtFQUNaLEVBQ0Q7QUFDRSxRQUFLLEVBQUUsU0FBUztBQUNoQixRQUFLLEVBQUUsRUFBRTtBQUNULFVBQU8sRUFBRSxFQUFFO0VBQ1osRUFDRDtBQUNFLFFBQUssRUFBRSxTQUFTO0FBQ2hCLFFBQUssRUFBRSxFQUFFO0FBQ1QsVUFBTyxFQUFFLEVBQUU7RUFDWixFQUNEO0FBQ0UsUUFBSyxFQUFFLFNBQVM7QUFDaEIsUUFBSyxFQUFFLEVBQUU7QUFDVCxVQUFPLEVBQUUsRUFBRTtFQUNaLEVBQ0Q7QUFDRSxRQUFLLEVBQUUsU0FBUztBQUNoQixRQUFLLEVBQUUsRUFBRTtBQUNULFVBQU8sRUFBRSxFQUFFO0VBQ1osRUFDRDtBQUNFLFFBQUssRUFBRSxTQUFTO0FBQ2hCLFFBQUssRUFBRSxFQUFFO0FBQ1QsVUFBTyxFQUFFLEVBQUU7RUFDWixFQUNEO0FBQ0UsUUFBSyxFQUFFLFNBQVM7QUFDaEIsUUFBSyxFQUFFLE9BQU87QUFDZCxVQUFPLEVBQUUsT0FBTztFQUNqQixFQUNEO0FBQ0UsUUFBSyxFQUFFLFNBQVM7QUFDaEIsUUFBSyxFQUFFLEtBQUs7QUFDWixVQUFPLEVBQUUsS0FBSztFQUNmLEVBQ0Q7QUFDRSxRQUFLLEVBQUUsU0FBUztBQUNoQixRQUFLLEVBQUUsUUFBUTtBQUNmLFVBQU8sRUFBRSxRQUFRO0VBQ2xCLEVBQ0Q7QUFDRSxRQUFLLEVBQUUsU0FBUztBQUNoQixRQUFLLEVBQUUsUUFBUTtBQUNmLFVBQU8sRUFBRSxRQUFRO0VBQ2xCLEVBQ0Q7QUFDRSxRQUFLLEVBQUUsU0FBUztBQUNoQixRQUFLLEVBQUUsT0FBTztBQUNkLFVBQU8sRUFBRSxPQUFPO0VBQ2pCLEVBQ0Q7QUFDRSxRQUFLLEVBQUUsU0FBUztBQUNoQixRQUFLLEVBQUUsT0FBTztBQUNkLFVBQU8sRUFBRSxPQUFPO0VBQ2pCLEVBQ0Q7QUFDRSxRQUFLLEVBQUUsU0FBUztBQUNoQixRQUFLLEVBQUUsTUFBTTtBQUNiLFVBQU8sRUFBRSxNQUFNO0VBQ2hCLEVBQ0Q7QUFDRSxRQUFLLEVBQUUsU0FBUztBQUNoQixRQUFLLEVBQUUsTUFBTTtBQUNiLFVBQU8sRUFBRSxNQUFNO0VBQ2hCLEVBQ0Q7QUFDRSxRQUFLLEVBQUUsU0FBUztBQUNoQixRQUFLLEVBQUUsUUFBUTtBQUNmLFVBQU8sRUFBRSxRQUFRO0VBQ2xCLEVBQ0Q7QUFDRSxRQUFLLEVBQUUsU0FBUztBQUNoQixRQUFLLEVBQUUsUUFBUTtBQUNmLFVBQU8sRUFBRSxRQUFRO0VBQ2xCLEVBQ0Q7QUFDRSxRQUFLLEVBQUUsU0FBUztBQUNoQixRQUFLLEVBQUUsTUFBTTtBQUNiLFVBQU8sRUFBRSxNQUFNO0VBQ2hCLEVBQ0Q7QUFDRSxRQUFLLEVBQUUsU0FBUztBQUNoQixRQUFLLEVBQUUsT0FBTztBQUNkLFVBQU8sRUFBRSxPQUFPO0VBQ2pCLEVBQ0Q7QUFDRSxRQUFLLEVBQUUsU0FBUztBQUNoQixRQUFLLEVBQUUsTUFBTTtBQUNiLFVBQU8sRUFBRSxNQUFNO0VBQ2hCLEVBQ0Q7QUFDRSxRQUFLLEVBQUUsU0FBUztBQUNoQixRQUFLLEVBQUUsT0FBTztBQUNkLFVBQU8sRUFBRSxPQUFPO0VBQ2pCLENBQ0YsQ0FBQzs7QUFFRixLQUFNLFlBQVksR0FBRyxDQUNuQjtBQUNFLFFBQUssRUFBRSxNQUFNO0FBQ2IsUUFBSyxFQUFFLE1BQU07QUFDYixVQUFPLEVBQUUsTUFBTTtFQUNoQixFQUNEO0FBQ0UsUUFBSyxFQUFFLE1BQU07QUFDYixRQUFLLEVBQUUsTUFBTTtBQUNiLFVBQU8sRUFBRSxNQUFNO0VB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QixNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRTtjQUMvQixDQUFDOztBQUVGLGlCQUFHLGFBQWEsSUFDWCxhQUFhLENBQUMsaUJBQWlCLElBQy9CLE9BQU8sYUFBYSxDQUFDLGlCQUFrQixJQUFJLFVBQVUsRUFBRTtBQUN4RCw0QkFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztjQUM5QztZQUNGLENBQ0Y7VUFDRixDQUFDOztBQUVKLGFBQUksQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDaEM7TUFDRixDQUFDO0lBQ0w7RUFDRjs7QUFBQSxFQUFDIiwiZmlsZSI6InFzU2ltcGxlS1BJLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA2MzMzNDJmYzI2MjQ0NTQ4ZTY3MVxuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAod2VicGFjayktZGV2LXNlcnZlci9jbGllbnQ/aHR0cDovbG9jYWxob3N0OjgwODBcbiAqKi8iLCJ2YXIgaW8gPSByZXF1aXJlKFwic29ja2V0LmlvLWNsaWVudFwiKTtcclxudmFyIHN0cmlwQW5zaSA9IHJlcXVpcmUoJ3N0cmlwLWFuc2knKTtcclxudmFyIHNjcmlwdEVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XHJcbmlvID0gaW8uY29ubmVjdCh0eXBlb2YgX19yZXNvdXJjZVF1ZXJ5ID09PSBcInN0cmluZ1wiICYmIF9fcmVzb3VyY2VRdWVyeSA/XHJcblx0X19yZXNvdXJjZVF1ZXJ5LnN1YnN0cigxKSA6XHJcblx0c2NyaXB0RWxlbWVudHNbc2NyaXB0RWxlbWVudHMubGVuZ3RoLTFdLmdldEF0dHJpYnV0ZShcInNyY1wiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiXCIpXHJcbik7XHJcblxyXG52YXIgaG90ID0gZmFsc2U7XHJcbnZhciBpbml0aWFsID0gdHJ1ZTtcclxudmFyIGN1cnJlbnRIYXNoID0gXCJcIjtcclxuXHJcbmlvLm9uKFwiaG90XCIsIGZ1bmN0aW9uKCkge1xyXG5cdGhvdCA9IHRydWU7XHJcblx0Y29uc29sZS5sb2coXCJbV0RTXSBIb3QgTW9kdWxlIFJlcGxhY2VtZW50IGVuYWJsZWQuXCIpO1xyXG59KTtcclxuXHJcbmlvLm9uKFwiaW52YWxpZFwiLCBmdW5jdGlvbigpIHtcclxuXHRjb25zb2xlLmxvZyhcIltXRFNdIEFwcCB1cGRhdGVkLiBSZWNvbXBpbGluZy4uLlwiKTtcclxufSk7XHJcblxyXG5pby5vbihcImhhc2hcIiwgZnVuY3Rpb24oaGFzaCkge1xyXG5cdGN1cnJlbnRIYXNoID0gaGFzaDtcclxufSk7XHJcblxyXG5pby5vbihcInN0aWxsLW9rXCIsIGZ1bmN0aW9uKCkge1xyXG5cdGNvbnNvbGUubG9nKFwiW1dEU10gTm90aGluZyBjaGFuZ2VkLlwiKVxyXG59KTtcclxuXHJcbmlvLm9uKFwib2tcIiwgZnVuY3Rpb24oKSB7XHJcblx0aWYoaW5pdGlhbCkgcmV0dXJuIGluaXRpYWwgPSBmYWxzZTtcclxuXHRyZWxvYWRBcHAoKTtcclxufSk7XHJcblxyXG5pby5vbihcIndhcm5pbmdzXCIsIGZ1bmN0aW9uKHdhcm5pbmdzKSB7XHJcblx0Y29uc29sZS5sb2coXCJbV0RTXSBXYXJuaW5ncyB3aGlsZSBjb21waWxpbmcuXCIpO1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCB3YXJuaW5ncy5sZW5ndGg7IGkrKylcclxuXHRcdGNvbnNvbGUud2FybihzdHJpcEFuc2kod2FybmluZ3NbaV0pKTtcclxuXHRpZihpbml0aWFsKSByZXR1cm4gaW5pdGlhbCA9IGZhbHNlO1xyXG5cdHJlbG9hZEFwcCgpO1xyXG59KTtcclxuXHJcbmlvLm9uKFwiZXJyb3JzXCIsIGZ1bmN0aW9uKGVycm9ycykge1xyXG5cdGNvbnNvbGUubG9nKFwiW1dEU10gRXJyb3JzIHdoaWxlIGNvbXBpbGluZy5cIik7XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IGVycm9ycy5sZW5ndGg7IGkrKylcclxuXHRcdGNvbnNvbGUuZXJyb3Ioc3RyaXBBbnNpKGVycm9yc1tpXSkpO1xyXG5cdGlmKGluaXRpYWwpIHJldHVybiBpbml0aWFsID0gZmFsc2U7XHJcblx0cmVsb2FkQXBwKCk7XHJcbn0pO1xyXG5cclxuaW8ub24oXCJwcm94eS1lcnJvclwiLCBmdW5jdGlvbihlcnJvcnMpIHtcclxuXHRjb25zb2xlLmxvZyhcIltXRFNdIFByb3h5IGVycm9yLlwiKTtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgZXJyb3JzLmxlbmd0aDsgaSsrKVxyXG5cdFx0Y29uc29sZS5lcnJvcihzdHJpcEFuc2koZXJyb3JzW2ldKSk7XHJcblx0aWYoaW5pdGlhbCkgcmV0dXJuIGluaXRpYWwgPSBmYWxzZTtcclxuXHRyZWxvYWRBcHAoKTtcclxufSk7XHJcblxyXG5pby5vbihcImRpc2Nvbm5lY3RcIiwgZnVuY3Rpb24oKSB7XHJcblx0Y29uc29sZS5lcnJvcihcIltXRFNdIERpc2Nvbm5lY3RlZCFcIik7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gcmVsb2FkQXBwKCkge1xyXG5cdGlmKGhvdCkge1xyXG5cdFx0Y29uc29sZS5sb2coXCJbV0RTXSBBcHAgaG90IHVwZGF0ZS4uLlwiKTtcclxuXHRcdHdpbmRvdy5wb3N0TWVzc2FnZShcIndlYnBhY2tIb3RVcGRhdGVcIiArIGN1cnJlbnRIYXNoLCBcIipcIik7XHJcblx0fSBlbHNlIHtcclxuXHRcdGNvbnNvbGUubG9nKFwiW1dEU10gQXBwIHVwZGF0ZWQuIFJlbG9hZGluZy4uLlwiKTtcclxuXHRcdHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuXHR9XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjayktZGV2LXNlcnZlci9jbGllbnQ/aHR0cDovL2xvY2FsaG9zdDo4MDgwXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliLycpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjayktZGV2LXNlcnZlci9+L3NvY2tldC5pby1jbGllbnQvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcbi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgdXJsID0gcmVxdWlyZSgnLi91cmwnKTtcbnZhciBwYXJzZXIgPSByZXF1aXJlKCdzb2NrZXQuaW8tcGFyc2VyJyk7XG52YXIgTWFuYWdlciA9IHJlcXVpcmUoJy4vbWFuYWdlcicpO1xudmFyIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc29ja2V0LmlvLWNsaWVudCcpO1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGxvb2t1cDtcblxuLyoqXG4gKiBNYW5hZ2VycyBjYWNoZS5cbiAqL1xuXG52YXIgY2FjaGUgPSBleHBvcnRzLm1hbmFnZXJzID0ge307XG5cbi8qKlxuICogTG9va3MgdXAgYW4gZXhpc3RpbmcgYE1hbmFnZXJgIGZvciBtdWx0aXBsZXhpbmcuXG4gKiBJZiB0aGUgdXNlciBzdW1tb25zOlxuICpcbiAqICAgYGlvKCdodHRwOi8vbG9jYWxob3N0L2EnKTtgXG4gKiAgIGBpbygnaHR0cDovL2xvY2FsaG9zdC9iJyk7YFxuICpcbiAqIFdlIHJldXNlIHRoZSBleGlzdGluZyBpbnN0YW5jZSBiYXNlZCBvbiBzYW1lIHNjaGVtZS9wb3J0L2hvc3QsXG4gKiBhbmQgd2UgaW5pdGlhbGl6ZSBzb2NrZXRzIGZvciBlYWNoIG5hbWVzcGFjZS5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGxvb2t1cCh1cmksIG9wdHMpIHtcbiAgaWYgKHR5cGVvZiB1cmkgPT0gJ29iamVjdCcpIHtcbiAgICBvcHRzID0gdXJpO1xuICAgIHVyaSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIG9wdHMgPSBvcHRzIHx8IHt9O1xuXG4gIHZhciBwYXJzZWQgPSB1cmwodXJpKTtcbiAgdmFyIHNvdXJjZSA9IHBhcnNlZC5zb3VyY2U7XG4gIHZhciBpZCA9IHBhcnNlZC5pZDtcbiAgdmFyIGlvO1xuXG4gIGlmIChvcHRzLmZvcmNlTmV3IHx8IG9wdHNbJ2ZvcmNlIG5ldyBjb25uZWN0aW9uJ10gfHwgZmFsc2UgPT09IG9wdHMubXVsdGlwbGV4KSB7XG4gICAgZGVidWcoJ2lnbm9yaW5nIHNvY2tldCBjYWNoZSBmb3IgJXMnLCBzb3VyY2UpO1xuICAgIGlvID0gTWFuYWdlcihzb3VyY2UsIG9wdHMpO1xuICB9IGVsc2Uge1xuICAgIGlmICghY2FjaGVbaWRdKSB7XG4gICAgICBkZWJ1ZygnbmV3IGlvIGluc3RhbmNlIGZvciAlcycsIHNvdXJjZSk7XG4gICAgICBjYWNoZVtpZF0gPSBNYW5hZ2VyKHNvdXJjZSwgb3B0cyk7XG4gICAgfVxuICAgIGlvID0gY2FjaGVbaWRdO1xuICB9XG5cbiAgcmV0dXJuIGlvLnNvY2tldChwYXJzZWQucGF0aCk7XG59XG5cbi8qKlxuICogUHJvdG9jb2wgdmVyc2lvbi5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMucHJvdG9jb2wgPSBwYXJzZXIucHJvdG9jb2w7XG5cbi8qKlxuICogYGNvbm5lY3RgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmlcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5jb25uZWN0ID0gbG9va3VwO1xuXG4vKipcbiAqIEV4cG9zZSBjb25zdHJ1Y3RvcnMgZm9yIHN0YW5kYWxvbmUgYnVpbGQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLk1hbmFnZXIgPSByZXF1aXJlKCcuL21hbmFnZXInKTtcbmV4cG9ydHMuU29ja2V0ID0gcmVxdWlyZSgnLi9zb2NrZXQnKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spLWRldi1zZXJ2ZXIvfi9zb2NrZXQuaW8tY2xpZW50L2xpYi9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlxuLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBwYXJzZXVyaSA9IHJlcXVpcmUoJ3BhcnNldXJpJyk7XG52YXIgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzb2NrZXQuaW8tY2xpZW50OnVybCcpO1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gdXJsO1xuXG4vKipcbiAqIFVSTCBwYXJzZXIuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtPYmplY3R9IEFuIG9iamVjdCBtZWFudCB0byBtaW1pYyB3aW5kb3cubG9jYXRpb24uXG4gKiAgICAgICAgICAgICAgICAgRGVmYXVsdHMgdG8gd2luZG93LmxvY2F0aW9uLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiB1cmwodXJpLCBsb2Mpe1xuICB2YXIgb2JqID0gdXJpO1xuXG4gIC8vIGRlZmF1bHQgdG8gd2luZG93LmxvY2F0aW9uXG4gIHZhciBsb2MgPSBsb2MgfHwgZ2xvYmFsLmxvY2F0aW9uO1xuICBpZiAobnVsbCA9PSB1cmkpIHVyaSA9IGxvYy5wcm90b2NvbCArICcvLycgKyBsb2MuaG9zdDtcblxuICAvLyByZWxhdGl2ZSBwYXRoIHN1cHBvcnRcbiAgaWYgKCdzdHJpbmcnID09IHR5cGVvZiB1cmkpIHtcbiAgICBpZiAoJy8nID09IHVyaS5jaGFyQXQoMCkpIHtcbiAgICAgIGlmICgnLycgPT0gdXJpLmNoYXJBdCgxKSkge1xuICAgICAgICB1cmkgPSBsb2MucHJvdG9jb2wgKyB1cmk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1cmkgPSBsb2MuaG9zdG5hbWUgKyB1cmk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCEvXihodHRwcz98d3NzPyk6XFwvXFwvLy50ZXN0KHVyaSkpIHtcbiAgICAgIGRlYnVnKCdwcm90b2NvbC1sZXNzIHVybCAlcycsIHVyaSk7XG4gICAgICBpZiAoJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGxvYykge1xuICAgICAgICB1cmkgPSBsb2MucHJvdG9jb2wgKyAnLy8nICsgdXJpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdXJpID0gJ2h0dHBzOi8vJyArIHVyaTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBwYXJzZVxuICAgIGRlYnVnKCdwYXJzZSAlcycsIHVyaSk7XG4gICAgb2JqID0gcGFyc2V1cmkodXJpKTtcbiAgfVxuXG4gIC8vIG1ha2Ugc3VyZSB3ZSB0cmVhdCBgbG9jYWxob3N0OjgwYCBhbmQgYGxvY2FsaG9zdGAgZXF1YWxseVxuICBpZiAoIW9iai5wb3J0KSB7XG4gICAgaWYgKC9eKGh0dHB8d3MpJC8udGVzdChvYmoucHJvdG9jb2wpKSB7XG4gICAgICBvYmoucG9ydCA9ICc4MCc7XG4gICAgfVxuICAgIGVsc2UgaWYgKC9eKGh0dHB8d3MpcyQvLnRlc3Qob2JqLnByb3RvY29sKSkge1xuICAgICAgb2JqLnBvcnQgPSAnNDQzJztcbiAgICB9XG4gIH1cblxuICBvYmoucGF0aCA9IG9iai5wYXRoIHx8ICcvJztcblxuICAvLyBkZWZpbmUgdW5pcXVlIGlkXG4gIG9iai5pZCA9IG9iai5wcm90b2NvbCArICc6Ly8nICsgb2JqLmhvc3QgKyAnOicgKyBvYmoucG9ydDtcbiAgLy8gZGVmaW5lIGhyZWZcbiAgb2JqLmhyZWYgPSBvYmoucHJvdG9jb2wgKyAnOi8vJyArIG9iai5ob3N0ICsgKGxvYyAmJiBsb2MucG9ydCA9PSBvYmoucG9ydCA/ICcnIDogKCc6JyArIG9iai5wb3J0KSk7XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spLWRldi1zZXJ2ZXIvfi9zb2NrZXQuaW8tY2xpZW50L2xpYi91cmwuanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIFBhcnNlcyBhbiBVUklcbiAqXG4gKiBAYXV0aG9yIFN0ZXZlbiBMZXZpdGhhbiA8c3RldmVubGV2aXRoYW4uY29tPiAoTUlUIGxpY2Vuc2UpXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG52YXIgcmUgPSAvXig/Oig/IVteOkBdKzpbXjpAXFwvXSpAKShodHRwfGh0dHBzfHdzfHdzcyk6XFwvXFwvKT8oKD86KChbXjpAXSopKD86OihbXjpAXSopKT8pP0ApPygoPzpbYS1mMC05XXswLDR9Oil7Miw3fVthLWYwLTldezAsNH18W146XFwvPyNdKikoPzo6KFxcZCopKT8pKCgoXFwvKD86W14/I10oPyFbXj8jXFwvXSpcXC5bXj8jXFwvLl0rKD86Wz8jXXwkKSkpKlxcLz8pPyhbXj8jXFwvXSopKSg/OlxcPyhbXiNdKikpPyg/OiMoLiopKT8pLztcblxudmFyIHBhcnRzID0gW1xuICAgICdzb3VyY2UnLCAncHJvdG9jb2wnLCAnYXV0aG9yaXR5JywgJ3VzZXJJbmZvJywgJ3VzZXInLCAncGFzc3dvcmQnLCAnaG9zdCdcbiAgLCAncG9ydCcsICdyZWxhdGl2ZScsICdwYXRoJywgJ2RpcmVjdG9yeScsICdmaWxlJywgJ3F1ZXJ5JywgJ2FuY2hvcidcbl07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2V1cmkoc3RyKSB7XG4gIHZhciBtID0gcmUuZXhlYyhzdHIgfHwgJycpXG4gICAgLCB1cmkgPSB7fVxuICAgICwgaSA9IDE0O1xuXG4gIHdoaWxlIChpLS0pIHtcbiAgICB1cmlbcGFydHNbaV1dID0gbVtpXSB8fCAnJztcbiAgfVxuXG4gIHJldHVybiB1cmk7XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjayktZGV2LXNlcnZlci9+L3NvY2tldC5pby1jbGllbnQvfi9wYXJzZXVyaS9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlxuLyoqXG4gKiBFeHBvc2UgYGRlYnVnKClgIGFzIHRoZSBtb2R1bGUuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBkZWJ1ZztcblxuLyoqXG4gKiBDcmVhdGUgYSBkZWJ1Z2dlciB3aXRoIHRoZSBnaXZlbiBgbmFtZWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEByZXR1cm4ge1R5cGV9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGRlYnVnKG5hbWUpIHtcbiAgaWYgKCFkZWJ1Zy5lbmFibGVkKG5hbWUpKSByZXR1cm4gZnVuY3Rpb24oKXt9O1xuXG4gIHJldHVybiBmdW5jdGlvbihmbXQpe1xuICAgIGZtdCA9IGNvZXJjZShmbXQpO1xuXG4gICAgdmFyIGN1cnIgPSBuZXcgRGF0ZTtcbiAgICB2YXIgbXMgPSBjdXJyIC0gKGRlYnVnW25hbWVdIHx8IGN1cnIpO1xuICAgIGRlYnVnW25hbWVdID0gY3VycjtcblxuICAgIGZtdCA9IG5hbWVcbiAgICAgICsgJyAnXG4gICAgICArIGZtdFxuICAgICAgKyAnICsnICsgZGVidWcuaHVtYW5pemUobXMpO1xuXG4gICAgLy8gVGhpcyBoYWNrZXJ5IGlzIHJlcXVpcmVkIGZvciBJRThcbiAgICAvLyB3aGVyZSBgY29uc29sZS5sb2dgIGRvZXNuJ3QgaGF2ZSAnYXBwbHknXG4gICAgd2luZG93LmNvbnNvbGVcbiAgICAgICYmIGNvbnNvbGUubG9nXG4gICAgICAmJiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChjb25zb2xlLmxvZywgY29uc29sZSwgYXJndW1lbnRzKTtcbiAgfVxufVxuXG4vKipcbiAqIFRoZSBjdXJyZW50bHkgYWN0aXZlIGRlYnVnIG1vZGUgbmFtZXMuXG4gKi9cblxuZGVidWcubmFtZXMgPSBbXTtcbmRlYnVnLnNraXBzID0gW107XG5cbi8qKlxuICogRW5hYmxlcyBhIGRlYnVnIG1vZGUgYnkgbmFtZS4gVGhpcyBjYW4gaW5jbHVkZSBtb2Rlc1xuICogc2VwYXJhdGVkIGJ5IGEgY29sb24gYW5kIHdpbGRjYXJkcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5kZWJ1Zy5lbmFibGUgPSBmdW5jdGlvbihuYW1lKSB7XG4gIHRyeSB7XG4gICAgbG9jYWxTdG9yYWdlLmRlYnVnID0gbmFtZTtcbiAgfSBjYXRjaChlKXt9XG5cbiAgdmFyIHNwbGl0ID0gKG5hbWUgfHwgJycpLnNwbGl0KC9bXFxzLF0rLylcbiAgICAsIGxlbiA9IHNwbGl0Lmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgbmFtZSA9IHNwbGl0W2ldLnJlcGxhY2UoJyonLCAnLio/Jyk7XG4gICAgaWYgKG5hbWVbMF0gPT09ICctJykge1xuICAgICAgZGVidWcuc2tpcHMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWUuc3Vic3RyKDEpICsgJyQnKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZGVidWcubmFtZXMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWUgKyAnJCcpKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogRGlzYWJsZSBkZWJ1ZyBvdXRwdXQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5kZWJ1Zy5kaXNhYmxlID0gZnVuY3Rpb24oKXtcbiAgZGVidWcuZW5hYmxlKCcnKTtcbn07XG5cbi8qKlxuICogSHVtYW5pemUgdGhlIGdpdmVuIGBtc2AuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1cbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmRlYnVnLmh1bWFuaXplID0gZnVuY3Rpb24obXMpIHtcbiAgdmFyIHNlYyA9IDEwMDBcbiAgICAsIG1pbiA9IDYwICogMTAwMFxuICAgICwgaG91ciA9IDYwICogbWluO1xuXG4gIGlmIChtcyA+PSBob3VyKSByZXR1cm4gKG1zIC8gaG91cikudG9GaXhlZCgxKSArICdoJztcbiAgaWYgKG1zID49IG1pbikgcmV0dXJuIChtcyAvIG1pbikudG9GaXhlZCgxKSArICdtJztcbiAgaWYgKG1zID49IHNlYykgcmV0dXJuIChtcyAvIHNlYyB8IDApICsgJ3MnO1xuICByZXR1cm4gbXMgKyAnbXMnO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIG1vZGUgbmFtZSBpcyBlbmFibGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmRlYnVnLmVuYWJsZWQgPSBmdW5jdGlvbihuYW1lKSB7XG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBkZWJ1Zy5za2lwcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChkZWJ1Zy5za2lwc1tpXS50ZXN0KG5hbWUpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBkZWJ1Zy5uYW1lcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChkZWJ1Zy5uYW1lc1tpXS50ZXN0KG5hbWUpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiBDb2VyY2UgYHZhbGAuXG4gKi9cblxuZnVuY3Rpb24gY29lcmNlKHZhbCkge1xuICBpZiAodmFsIGluc3RhbmNlb2YgRXJyb3IpIHJldHVybiB2YWwuc3RhY2sgfHwgdmFsLm1lc3NhZ2U7XG4gIHJldHVybiB2YWw7XG59XG5cbi8vIHBlcnNpc3RcblxudHJ5IHtcbiAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UpIGRlYnVnLmVuYWJsZShsb2NhbFN0b3JhZ2UuZGVidWcpO1xufSBjYXRjaChlKXt9XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc29ja2V0LmlvLWNsaWVudC9+L2RlYnVnL2RlYnVnLmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc29ja2V0LmlvLXBhcnNlcicpO1xudmFyIGpzb24gPSByZXF1aXJlKCdqc29uMycpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCdpc2FycmF5Jyk7XG52YXIgRW1pdHRlciA9IHJlcXVpcmUoJ2NvbXBvbmVudC1lbWl0dGVyJyk7XG52YXIgYmluYXJ5ID0gcmVxdWlyZSgnLi9iaW5hcnknKTtcbnZhciBpc0J1ZiA9IHJlcXVpcmUoJy4vaXMtYnVmZmVyJyk7XG5cbi8qKlxuICogUHJvdG9jb2wgdmVyc2lvbi5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMucHJvdG9jb2wgPSA0O1xuXG4vKipcbiAqIFBhY2tldCB0eXBlcy5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMudHlwZXMgPSBbXG4gICdDT05ORUNUJyxcbiAgJ0RJU0NPTk5FQ1QnLFxuICAnRVZFTlQnLFxuICAnQklOQVJZX0VWRU5UJyxcbiAgJ0FDSycsXG4gICdCSU5BUllfQUNLJyxcbiAgJ0VSUk9SJ1xuXTtcblxuLyoqXG4gKiBQYWNrZXQgdHlwZSBgY29ubmVjdGAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLkNPTk5FQ1QgPSAwO1xuXG4vKipcbiAqIFBhY2tldCB0eXBlIGBkaXNjb25uZWN0YC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuRElTQ09OTkVDVCA9IDE7XG5cbi8qKlxuICogUGFja2V0IHR5cGUgYGV2ZW50YC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuRVZFTlQgPSAyO1xuXG4vKipcbiAqIFBhY2tldCB0eXBlIGBhY2tgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5BQ0sgPSAzO1xuXG4vKipcbiAqIFBhY2tldCB0eXBlIGBlcnJvcmAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLkVSUk9SID0gNDtcblxuLyoqXG4gKiBQYWNrZXQgdHlwZSAnYmluYXJ5IGV2ZW50J1xuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5CSU5BUllfRVZFTlQgPSA1O1xuXG4vKipcbiAqIFBhY2tldCB0eXBlIGBiaW5hcnkgYWNrYC4gRm9yIGFja3Mgd2l0aCBiaW5hcnkgYXJndW1lbnRzLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5CSU5BUllfQUNLID0gNjtcblxuLyoqXG4gKiBFbmNvZGVyIGNvbnN0cnVjdG9yLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5FbmNvZGVyID0gRW5jb2RlcjtcblxuLyoqXG4gKiBEZWNvZGVyIGNvbnN0cnVjdG9yLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5EZWNvZGVyID0gRGVjb2RlcjtcblxuLyoqXG4gKiBBIHNvY2tldC5pbyBFbmNvZGVyIGluc3RhbmNlXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBFbmNvZGVyKCkge31cblxuLyoqXG4gKiBFbmNvZGUgYSBwYWNrZXQgYXMgYSBzaW5nbGUgc3RyaW5nIGlmIG5vbi1iaW5hcnksIG9yIGFzIGFcbiAqIGJ1ZmZlciBzZXF1ZW5jZSwgZGVwZW5kaW5nIG9uIHBhY2tldCB0eXBlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogLSBwYWNrZXQgb2JqZWN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIGZ1bmN0aW9uIHRvIGhhbmRsZSBlbmNvZGluZ3MgKGxpa2VseSBlbmdpbmUud3JpdGUpXG4gKiBAcmV0dXJuIENhbGxzIGNhbGxiYWNrIHdpdGggQXJyYXkgb2YgZW5jb2RpbmdzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVuY29kZXIucHJvdG90eXBlLmVuY29kZSA9IGZ1bmN0aW9uKG9iaiwgY2FsbGJhY2spe1xuICBkZWJ1ZygnZW5jb2RpbmcgcGFja2V0ICVqJywgb2JqKTtcblxuICBpZiAoZXhwb3J0cy5CSU5BUllfRVZFTlQgPT0gb2JqLnR5cGUgfHwgZXhwb3J0cy5CSU5BUllfQUNLID09IG9iai50eXBlKSB7XG4gICAgZW5jb2RlQXNCaW5hcnkob2JqLCBjYWxsYmFjayk7XG4gIH1cbiAgZWxzZSB7XG4gICAgdmFyIGVuY29kaW5nID0gZW5jb2RlQXNTdHJpbmcob2JqKTtcbiAgICBjYWxsYmFjayhbZW5jb2RpbmddKTtcbiAgfVxufTtcblxuLyoqXG4gKiBFbmNvZGUgcGFja2V0IGFzIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XG4gKiBAcmV0dXJuIHtTdHJpbmd9IGVuY29kZWRcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGVuY29kZUFzU3RyaW5nKG9iaikge1xuICB2YXIgc3RyID0gJyc7XG4gIHZhciBuc3AgPSBmYWxzZTtcblxuICAvLyBmaXJzdCBpcyB0eXBlXG4gIHN0ciArPSBvYmoudHlwZTtcblxuICAvLyBhdHRhY2htZW50cyBpZiB3ZSBoYXZlIHRoZW1cbiAgaWYgKGV4cG9ydHMuQklOQVJZX0VWRU5UID09IG9iai50eXBlIHx8IGV4cG9ydHMuQklOQVJZX0FDSyA9PSBvYmoudHlwZSkge1xuICAgIHN0ciArPSBvYmouYXR0YWNobWVudHM7XG4gICAgc3RyICs9ICctJztcbiAgfVxuXG4gIC8vIGlmIHdlIGhhdmUgYSBuYW1lc3BhY2Ugb3RoZXIgdGhhbiBgL2BcbiAgLy8gd2UgYXBwZW5kIGl0IGZvbGxvd2VkIGJ5IGEgY29tbWEgYCxgXG4gIGlmIChvYmoubnNwICYmICcvJyAhPSBvYmoubnNwKSB7XG4gICAgbnNwID0gdHJ1ZTtcbiAgICBzdHIgKz0gb2JqLm5zcDtcbiAgfVxuXG4gIC8vIGltbWVkaWF0ZWx5IGZvbGxvd2VkIGJ5IHRoZSBpZFxuICBpZiAobnVsbCAhPSBvYmouaWQpIHtcbiAgICBpZiAobnNwKSB7XG4gICAgICBzdHIgKz0gJywnO1xuICAgICAgbnNwID0gZmFsc2U7XG4gICAgfVxuICAgIHN0ciArPSBvYmouaWQ7XG4gIH1cblxuICAvLyBqc29uIGRhdGFcbiAgaWYgKG51bGwgIT0gb2JqLmRhdGEpIHtcbiAgICBpZiAobnNwKSBzdHIgKz0gJywnO1xuICAgIHN0ciArPSBqc29uLnN0cmluZ2lmeShvYmouZGF0YSk7XG4gIH1cblxuICBkZWJ1ZygnZW5jb2RlZCAlaiBhcyAlcycsIG9iaiwgc3RyKTtcbiAgcmV0dXJuIHN0cjtcbn1cblxuLyoqXG4gKiBFbmNvZGUgcGFja2V0IGFzICdidWZmZXIgc2VxdWVuY2UnIGJ5IHJlbW92aW5nIGJsb2JzLCBhbmRcbiAqIGRlY29uc3RydWN0aW5nIHBhY2tldCBpbnRvIG9iamVjdCB3aXRoIHBsYWNlaG9sZGVycyBhbmRcbiAqIGEgbGlzdCBvZiBidWZmZXJzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcbiAqIEByZXR1cm4ge0J1ZmZlcn0gZW5jb2RlZFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZW5jb2RlQXNCaW5hcnkob2JqLCBjYWxsYmFjaykge1xuXG4gIGZ1bmN0aW9uIHdyaXRlRW5jb2RpbmcoYmxvYmxlc3NEYXRhKSB7XG4gICAgdmFyIGRlY29uc3RydWN0aW9uID0gYmluYXJ5LmRlY29uc3RydWN0UGFja2V0KGJsb2JsZXNzRGF0YSk7XG4gICAgdmFyIHBhY2sgPSBlbmNvZGVBc1N0cmluZyhkZWNvbnN0cnVjdGlvbi5wYWNrZXQpO1xuICAgIHZhciBidWZmZXJzID0gZGVjb25zdHJ1Y3Rpb24uYnVmZmVycztcblxuICAgIGJ1ZmZlcnMudW5zaGlmdChwYWNrKTsgLy8gYWRkIHBhY2tldCBpbmZvIHRvIGJlZ2lubmluZyBvZiBkYXRhIGxpc3RcbiAgICBjYWxsYmFjayhidWZmZXJzKTsgLy8gd3JpdGUgYWxsIHRoZSBidWZmZXJzXG4gIH1cblxuICBiaW5hcnkucmVtb3ZlQmxvYnMob2JqLCB3cml0ZUVuY29kaW5nKTtcbn1cblxuLyoqXG4gKiBBIHNvY2tldC5pbyBEZWNvZGVyIGluc3RhbmNlXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSBkZWNvZGVyXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIERlY29kZXIoKSB7XG4gIHRoaXMucmVjb25zdHJ1Y3RvciA9IG51bGw7XG59XG5cbi8qKlxuICogTWl4IGluIGBFbWl0dGVyYCB3aXRoIERlY29kZXIuXG4gKi9cblxuRW1pdHRlcihEZWNvZGVyLnByb3RvdHlwZSk7XG5cbi8qKlxuICogRGVjb2RlcyBhbiBlY29kZWQgcGFja2V0IHN0cmluZyBpbnRvIHBhY2tldCBKU09OLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBvYmogLSBlbmNvZGVkIHBhY2tldFxuICogQHJldHVybiB7T2JqZWN0fSBwYWNrZXRcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRGVjb2Rlci5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24ob2JqKSB7XG4gIHZhciBwYWNrZXQ7XG4gIGlmICgnc3RyaW5nJyA9PSB0eXBlb2Ygb2JqKSB7XG4gICAgcGFja2V0ID0gZGVjb2RlU3RyaW5nKG9iaik7XG4gICAgaWYgKGV4cG9ydHMuQklOQVJZX0VWRU5UID09IHBhY2tldC50eXBlIHx8IGV4cG9ydHMuQklOQVJZX0FDSyA9PSBwYWNrZXQudHlwZSkgeyAvLyBiaW5hcnkgcGFja2V0J3MganNvblxuICAgICAgdGhpcy5yZWNvbnN0cnVjdG9yID0gbmV3IEJpbmFyeVJlY29uc3RydWN0b3IocGFja2V0KTtcblxuICAgICAgLy8gbm8gYXR0YWNobWVudHMsIGxhYmVsZWQgYmluYXJ5IGJ1dCBubyBiaW5hcnkgZGF0YSB0byBmb2xsb3dcbiAgICAgIGlmICh0aGlzLnJlY29uc3RydWN0b3IucmVjb25QYWNrLmF0dGFjaG1lbnRzID09PSAwKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnZGVjb2RlZCcsIHBhY2tldCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHsgLy8gbm9uLWJpbmFyeSBmdWxsIHBhY2tldFxuICAgICAgdGhpcy5lbWl0KCdkZWNvZGVkJywgcGFja2V0KTtcbiAgICB9XG4gIH1cbiAgZWxzZSBpZiAoaXNCdWYob2JqKSB8fCBvYmouYmFzZTY0KSB7IC8vIHJhdyBiaW5hcnkgZGF0YVxuICAgIGlmICghdGhpcy5yZWNvbnN0cnVjdG9yKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2dvdCBiaW5hcnkgZGF0YSB3aGVuIG5vdCByZWNvbnN0cnVjdGluZyBhIHBhY2tldCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYWNrZXQgPSB0aGlzLnJlY29uc3RydWN0b3IudGFrZUJpbmFyeURhdGEob2JqKTtcbiAgICAgIGlmIChwYWNrZXQpIHsgLy8gcmVjZWl2ZWQgZmluYWwgYnVmZmVyXG4gICAgICAgIHRoaXMucmVjb25zdHJ1Y3RvciA9IG51bGw7XG4gICAgICAgIHRoaXMuZW1pdCgnZGVjb2RlZCcsIHBhY2tldCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biB0eXBlOiAnICsgb2JqKTtcbiAgfVxufTtcblxuLyoqXG4gKiBEZWNvZGUgYSBwYWNrZXQgU3RyaW5nIChKU09OIGRhdGEpXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7T2JqZWN0fSBwYWNrZXRcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGRlY29kZVN0cmluZyhzdHIpIHtcbiAgdmFyIHAgPSB7fTtcbiAgdmFyIGkgPSAwO1xuXG4gIC8vIGxvb2sgdXAgdHlwZVxuICBwLnR5cGUgPSBOdW1iZXIoc3RyLmNoYXJBdCgwKSk7XG4gIGlmIChudWxsID09IGV4cG9ydHMudHlwZXNbcC50eXBlXSkgcmV0dXJuIGVycm9yKCk7XG5cbiAgLy8gbG9vayB1cCBhdHRhY2htZW50cyBpZiB0eXBlIGJpbmFyeVxuICBpZiAoZXhwb3J0cy5CSU5BUllfRVZFTlQgPT0gcC50eXBlIHx8IGV4cG9ydHMuQklOQVJZX0FDSyA9PSBwLnR5cGUpIHtcbiAgICB2YXIgYnVmID0gJyc7XG4gICAgd2hpbGUgKHN0ci5jaGFyQXQoKytpKSAhPSAnLScpIHtcbiAgICAgIGJ1ZiArPSBzdHIuY2hhckF0KGkpO1xuICAgICAgaWYgKGkgPT0gc3RyLmxlbmd0aCkgYnJlYWs7XG4gICAgfVxuICAgIGlmIChidWYgIT0gTnVtYmVyKGJ1ZikgfHwgc3RyLmNoYXJBdChpKSAhPSAnLScpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSWxsZWdhbCBhdHRhY2htZW50cycpO1xuICAgIH1cbiAgICBwLmF0dGFjaG1lbnRzID0gTnVtYmVyKGJ1Zik7XG4gIH1cblxuICAvLyBsb29rIHVwIG5hbWVzcGFjZSAoaWYgYW55KVxuICBpZiAoJy8nID09IHN0ci5jaGFyQXQoaSArIDEpKSB7XG4gICAgcC5uc3AgPSAnJztcbiAgICB3aGlsZSAoKytpKSB7XG4gICAgICB2YXIgYyA9IHN0ci5jaGFyQXQoaSk7XG4gICAgICBpZiAoJywnID09IGMpIGJyZWFrO1xuICAgICAgcC5uc3AgKz0gYztcbiAgICAgIGlmIChpID09IHN0ci5sZW5ndGgpIGJyZWFrO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBwLm5zcCA9ICcvJztcbiAgfVxuXG4gIC8vIGxvb2sgdXAgaWRcbiAgdmFyIG5leHQgPSBzdHIuY2hhckF0KGkgKyAxKTtcbiAgaWYgKCcnICE9PSBuZXh0ICYmIE51bWJlcihuZXh0KSA9PSBuZXh0KSB7XG4gICAgcC5pZCA9ICcnO1xuICAgIHdoaWxlICgrK2kpIHtcbiAgICAgIHZhciBjID0gc3RyLmNoYXJBdChpKTtcbiAgICAgIGlmIChudWxsID09IGMgfHwgTnVtYmVyKGMpICE9IGMpIHtcbiAgICAgICAgLS1pO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHAuaWQgKz0gc3RyLmNoYXJBdChpKTtcbiAgICAgIGlmIChpID09IHN0ci5sZW5ndGgpIGJyZWFrO1xuICAgIH1cbiAgICBwLmlkID0gTnVtYmVyKHAuaWQpO1xuICB9XG5cbiAgLy8gbG9vayB1cCBqc29uIGRhdGFcbiAgaWYgKHN0ci5jaGFyQXQoKytpKSkge1xuICAgIHRyeSB7XG4gICAgICBwLmRhdGEgPSBqc29uLnBhcnNlKHN0ci5zdWJzdHIoaSkpO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICByZXR1cm4gZXJyb3IoKTtcbiAgICB9XG4gIH1cblxuICBkZWJ1ZygnZGVjb2RlZCAlcyBhcyAlaicsIHN0ciwgcCk7XG4gIHJldHVybiBwO1xufVxuXG4vKipcbiAqIERlYWxsb2NhdGVzIGEgcGFyc2VyJ3MgcmVzb3VyY2VzXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5EZWNvZGVyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLnJlY29uc3RydWN0b3IpIHtcbiAgICB0aGlzLnJlY29uc3RydWN0b3IuZmluaXNoZWRSZWNvbnN0cnVjdGlvbigpO1xuICB9XG59O1xuXG4vKipcbiAqIEEgbWFuYWdlciBvZiBhIGJpbmFyeSBldmVudCdzICdidWZmZXIgc2VxdWVuY2UnLiBTaG91bGRcbiAqIGJlIGNvbnN0cnVjdGVkIHdoZW5ldmVyIGEgcGFja2V0IG9mIHR5cGUgQklOQVJZX0VWRU5UIGlzXG4gKiBkZWNvZGVkLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcbiAqIEByZXR1cm4ge0JpbmFyeVJlY29uc3RydWN0b3J9IGluaXRpYWxpemVkIHJlY29uc3RydWN0b3JcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIEJpbmFyeVJlY29uc3RydWN0b3IocGFja2V0KSB7XG4gIHRoaXMucmVjb25QYWNrID0gcGFja2V0O1xuICB0aGlzLmJ1ZmZlcnMgPSBbXTtcbn1cblxuLyoqXG4gKiBNZXRob2QgdG8gYmUgY2FsbGVkIHdoZW4gYmluYXJ5IGRhdGEgcmVjZWl2ZWQgZnJvbSBjb25uZWN0aW9uXG4gKiBhZnRlciBhIEJJTkFSWV9FVkVOVCBwYWNrZXQuXG4gKlxuICogQHBhcmFtIHtCdWZmZXIgfCBBcnJheUJ1ZmZlcn0gYmluRGF0YSAtIHRoZSByYXcgYmluYXJ5IGRhdGEgcmVjZWl2ZWRcbiAqIEByZXR1cm4ge251bGwgfCBPYmplY3R9IHJldHVybnMgbnVsbCBpZiBtb3JlIGJpbmFyeSBkYXRhIGlzIGV4cGVjdGVkIG9yXG4gKiAgIGEgcmVjb25zdHJ1Y3RlZCBwYWNrZXQgb2JqZWN0IGlmIGFsbCBidWZmZXJzIGhhdmUgYmVlbiByZWNlaXZlZC5cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbkJpbmFyeVJlY29uc3RydWN0b3IucHJvdG90eXBlLnRha2VCaW5hcnlEYXRhID0gZnVuY3Rpb24oYmluRGF0YSkge1xuICB0aGlzLmJ1ZmZlcnMucHVzaChiaW5EYXRhKTtcbiAgaWYgKHRoaXMuYnVmZmVycy5sZW5ndGggPT0gdGhpcy5yZWNvblBhY2suYXR0YWNobWVudHMpIHsgLy8gZG9uZSB3aXRoIGJ1ZmZlciBsaXN0XG4gICAgdmFyIHBhY2tldCA9IGJpbmFyeS5yZWNvbnN0cnVjdFBhY2tldCh0aGlzLnJlY29uUGFjaywgdGhpcy5idWZmZXJzKTtcbiAgICB0aGlzLmZpbmlzaGVkUmVjb25zdHJ1Y3Rpb24oKTtcbiAgICByZXR1cm4gcGFja2V0O1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuLyoqXG4gKiBDbGVhbnMgdXAgYmluYXJ5IHBhY2tldCByZWNvbnN0cnVjdGlvbiB2YXJpYWJsZXMuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuQmluYXJ5UmVjb25zdHJ1Y3Rvci5wcm90b3R5cGUuZmluaXNoZWRSZWNvbnN0cnVjdGlvbiA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnJlY29uUGFjayA9IG51bGw7XG4gIHRoaXMuYnVmZmVycyA9IFtdO1xufTtcblxuZnVuY3Rpb24gZXJyb3IoZGF0YSl7XG4gIHJldHVybiB7XG4gICAgdHlwZTogZXhwb3J0cy5FUlJPUixcbiAgICBkYXRhOiAncGFyc2VyIGVycm9yJ1xuICB9O1xufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjayktZGV2LXNlcnZlci9+L3NvY2tldC5pby1jbGllbnQvfi9zb2NrZXQuaW8tcGFyc2VyL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyohIEpTT04gdjMuMi42IHwgaHR0cDovL2Jlc3RpZWpzLmdpdGh1Yi5pby9qc29uMyB8IENvcHlyaWdodCAyMDEyLTIwMTMsIEtpdCBDYW1icmlkZ2UgfCBodHRwOi8va2l0Lm1pdC1saWNlbnNlLm9yZyAqL1xuOyhmdW5jdGlvbiAod2luZG93KSB7XG4gIC8vIENvbnZlbmllbmNlIGFsaWFzZXMuXG4gIHZhciBnZXRDbGFzcyA9IHt9LnRvU3RyaW5nLCBpc1Byb3BlcnR5LCBmb3JFYWNoLCB1bmRlZjtcblxuICAvLyBEZXRlY3QgdGhlIGBkZWZpbmVgIGZ1bmN0aW9uIGV4cG9zZWQgYnkgYXN5bmNocm9ub3VzIG1vZHVsZSBsb2FkZXJzLiBUaGVcbiAgLy8gc3RyaWN0IGBkZWZpbmVgIGNoZWNrIGlzIG5lY2Vzc2FyeSBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIGByLmpzYC5cbiAgdmFyIGlzTG9hZGVyID0gdHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQ7XG5cbiAgLy8gRGV0ZWN0IG5hdGl2ZSBpbXBsZW1lbnRhdGlvbnMuXG4gIHZhciBuYXRpdmVKU09OID0gdHlwZW9mIEpTT04gPT0gXCJvYmplY3RcIiAmJiBKU09OO1xuXG4gIC8vIFNldCB1cCB0aGUgSlNPTiAzIG5hbWVzcGFjZSwgcHJlZmVycmluZyB0aGUgQ29tbW9uSlMgYGV4cG9ydHNgIG9iamVjdCBpZlxuICAvLyBhdmFpbGFibGUuXG4gIHZhciBKU09OMyA9IHR5cGVvZiBleHBvcnRzID09IFwib2JqZWN0XCIgJiYgZXhwb3J0cyAmJiAhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXG4gIGlmIChKU09OMyAmJiBuYXRpdmVKU09OKSB7XG4gICAgLy8gRXhwbGljaXRseSBkZWxlZ2F0ZSB0byB0aGUgbmF0aXZlIGBzdHJpbmdpZnlgIGFuZCBgcGFyc2VgXG4gICAgLy8gaW1wbGVtZW50YXRpb25zIGluIENvbW1vbkpTIGVudmlyb25tZW50cy5cbiAgICBKU09OMy5zdHJpbmdpZnkgPSBuYXRpdmVKU09OLnN0cmluZ2lmeTtcbiAgICBKU09OMy5wYXJzZSA9IG5hdGl2ZUpTT04ucGFyc2U7XG4gIH0gZWxzZSB7XG4gICAgLy8gRXhwb3J0IGZvciB3ZWIgYnJvd3NlcnMsIEphdmFTY3JpcHQgZW5naW5lcywgYW5kIGFzeW5jaHJvbm91cyBtb2R1bGVcbiAgICAvLyBsb2FkZXJzLCB1c2luZyB0aGUgZ2xvYmFsIGBKU09OYCBvYmplY3QgaWYgYXZhaWxhYmxlLlxuICAgIEpTT04zID0gd2luZG93LkpTT04gPSBuYXRpdmVKU09OIHx8IHt9O1xuICB9XG5cbiAgLy8gVGVzdCB0aGUgYERhdGUjZ2V0VVRDKmAgbWV0aG9kcy4gQmFzZWQgb24gd29yayBieSBAWWFmZmxlLlxuICB2YXIgaXNFeHRlbmRlZCA9IG5ldyBEYXRlKC0zNTA5ODI3MzM0NTczMjkyKTtcbiAgdHJ5IHtcbiAgICAvLyBUaGUgYGdldFVUQ0Z1bGxZZWFyYCwgYE1vbnRoYCwgYW5kIGBEYXRlYCBtZXRob2RzIHJldHVybiBub25zZW5zaWNhbFxuICAgIC8vIHJlc3VsdHMgZm9yIGNlcnRhaW4gZGF0ZXMgaW4gT3BlcmEgPj0gMTAuNTMuXG4gICAgaXNFeHRlbmRlZCA9IGlzRXh0ZW5kZWQuZ2V0VVRDRnVsbFllYXIoKSA9PSAtMTA5MjUyICYmIGlzRXh0ZW5kZWQuZ2V0VVRDTW9udGgoKSA9PT0gMCAmJiBpc0V4dGVuZGVkLmdldFVUQ0RhdGUoKSA9PT0gMSAmJlxuICAgICAgLy8gU2FmYXJpIDwgMi4wLjIgc3RvcmVzIHRoZSBpbnRlcm5hbCBtaWxsaXNlY29uZCB0aW1lIHZhbHVlIGNvcnJlY3RseSxcbiAgICAgIC8vIGJ1dCBjbGlwcyB0aGUgdmFsdWVzIHJldHVybmVkIGJ5IHRoZSBkYXRlIG1ldGhvZHMgdG8gdGhlIHJhbmdlIG9mXG4gICAgICAvLyBzaWduZWQgMzItYml0IGludGVnZXJzIChbLTIgKiogMzEsIDIgKiogMzEgLSAxXSkuXG4gICAgICBpc0V4dGVuZGVkLmdldFVUQ0hvdXJzKCkgPT0gMTAgJiYgaXNFeHRlbmRlZC5nZXRVVENNaW51dGVzKCkgPT0gMzcgJiYgaXNFeHRlbmRlZC5nZXRVVENTZWNvbmRzKCkgPT0gNiAmJiBpc0V4dGVuZGVkLmdldFVUQ01pbGxpc2Vjb25kcygpID09IDcwODtcbiAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7fVxuXG4gIC8vIEludGVybmFsOiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIG5hdGl2ZSBgSlNPTi5zdHJpbmdpZnlgIGFuZCBgcGFyc2VgXG4gIC8vIGltcGxlbWVudGF0aW9ucyBhcmUgc3BlYy1jb21wbGlhbnQuIEJhc2VkIG9uIHdvcmsgYnkgS2VuIFNueWRlci5cbiAgZnVuY3Rpb24gaGFzKG5hbWUpIHtcbiAgICBpZiAoaGFzW25hbWVdICE9PSB1bmRlZikge1xuICAgICAgLy8gUmV0dXJuIGNhY2hlZCBmZWF0dXJlIHRlc3QgcmVzdWx0LlxuICAgICAgcmV0dXJuIGhhc1tuYW1lXTtcbiAgICB9XG5cbiAgICB2YXIgaXNTdXBwb3J0ZWQ7XG4gICAgaWYgKG5hbWUgPT0gXCJidWctc3RyaW5nLWNoYXItaW5kZXhcIikge1xuICAgICAgLy8gSUUgPD0gNyBkb2Vzbid0IHN1cHBvcnQgYWNjZXNzaW5nIHN0cmluZyBjaGFyYWN0ZXJzIHVzaW5nIHNxdWFyZVxuICAgICAgLy8gYnJhY2tldCBub3RhdGlvbi4gSUUgOCBvbmx5IHN1cHBvcnRzIHRoaXMgZm9yIHByaW1pdGl2ZXMuXG4gICAgICBpc1N1cHBvcnRlZCA9IFwiYVwiWzBdICE9IFwiYVwiO1xuICAgIH0gZWxzZSBpZiAobmFtZSA9PSBcImpzb25cIikge1xuICAgICAgLy8gSW5kaWNhdGVzIHdoZXRoZXIgYm90aCBgSlNPTi5zdHJpbmdpZnlgIGFuZCBgSlNPTi5wYXJzZWAgYXJlXG4gICAgICAvLyBzdXBwb3J0ZWQuXG4gICAgICBpc1N1cHBvcnRlZCA9IGhhcyhcImpzb24tc3RyaW5naWZ5XCIpICYmIGhhcyhcImpzb24tcGFyc2VcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB2YWx1ZSwgc2VyaWFsaXplZCA9ICd7XCJhXCI6WzEsdHJ1ZSxmYWxzZSxudWxsLFwiXFxcXHUwMDAwXFxcXGJcXFxcblxcXFxmXFxcXHJcXFxcdFwiXX0nO1xuICAgICAgLy8gVGVzdCBgSlNPTi5zdHJpbmdpZnlgLlxuICAgICAgaWYgKG5hbWUgPT0gXCJqc29uLXN0cmluZ2lmeVwiKSB7XG4gICAgICAgIHZhciBzdHJpbmdpZnkgPSBKU09OMy5zdHJpbmdpZnksIHN0cmluZ2lmeVN1cHBvcnRlZCA9IHR5cGVvZiBzdHJpbmdpZnkgPT0gXCJmdW5jdGlvblwiICYmIGlzRXh0ZW5kZWQ7XG4gICAgICAgIGlmIChzdHJpbmdpZnlTdXBwb3J0ZWQpIHtcbiAgICAgICAgICAvLyBBIHRlc3QgZnVuY3Rpb24gb2JqZWN0IHdpdGggYSBjdXN0b20gYHRvSlNPTmAgbWV0aG9kLlxuICAgICAgICAgICh2YWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgIH0pLnRvSlNPTiA9IHZhbHVlO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzdHJpbmdpZnlTdXBwb3J0ZWQgPVxuICAgICAgICAgICAgICAvLyBGaXJlZm94IDMuMWIxIGFuZCBiMiBzZXJpYWxpemUgc3RyaW5nLCBudW1iZXIsIGFuZCBib29sZWFuXG4gICAgICAgICAgICAgIC8vIHByaW1pdGl2ZXMgYXMgb2JqZWN0IGxpdGVyYWxzLlxuICAgICAgICAgICAgICBzdHJpbmdpZnkoMCkgPT09IFwiMFwiICYmXG4gICAgICAgICAgICAgIC8vIEZGIDMuMWIxLCBiMiwgYW5kIEpTT04gMiBzZXJpYWxpemUgd3JhcHBlZCBwcmltaXRpdmVzIGFzIG9iamVjdFxuICAgICAgICAgICAgICAvLyBsaXRlcmFscy5cbiAgICAgICAgICAgICAgc3RyaW5naWZ5KG5ldyBOdW1iZXIoKSkgPT09IFwiMFwiICYmXG4gICAgICAgICAgICAgIHN0cmluZ2lmeShuZXcgU3RyaW5nKCkpID09ICdcIlwiJyAmJlxuICAgICAgICAgICAgICAvLyBGRiAzLjFiMSwgMiB0aHJvdyBhbiBlcnJvciBpZiB0aGUgdmFsdWUgaXMgYG51bGxgLCBgdW5kZWZpbmVkYCwgb3JcbiAgICAgICAgICAgICAgLy8gZG9lcyBub3QgZGVmaW5lIGEgY2Fub25pY2FsIEpTT04gcmVwcmVzZW50YXRpb24gKHRoaXMgYXBwbGllcyB0b1xuICAgICAgICAgICAgICAvLyBvYmplY3RzIHdpdGggYHRvSlNPTmAgcHJvcGVydGllcyBhcyB3ZWxsLCAqdW5sZXNzKiB0aGV5IGFyZSBuZXN0ZWRcbiAgICAgICAgICAgICAgLy8gd2l0aGluIGFuIG9iamVjdCBvciBhcnJheSkuXG4gICAgICAgICAgICAgIHN0cmluZ2lmeShnZXRDbGFzcykgPT09IHVuZGVmICYmXG4gICAgICAgICAgICAgIC8vIElFIDggc2VyaWFsaXplcyBgdW5kZWZpbmVkYCBhcyBgXCJ1bmRlZmluZWRcImAuIFNhZmFyaSA8PSA1LjEuNyBhbmRcbiAgICAgICAgICAgICAgLy8gRkYgMy4xYjMgcGFzcyB0aGlzIHRlc3QuXG4gICAgICAgICAgICAgIHN0cmluZ2lmeSh1bmRlZikgPT09IHVuZGVmICYmXG4gICAgICAgICAgICAgIC8vIFNhZmFyaSA8PSA1LjEuNyBhbmQgRkYgMy4xYjMgdGhyb3cgYEVycm9yYHMgYW5kIGBUeXBlRXJyb3JgcyxcbiAgICAgICAgICAgICAgLy8gcmVzcGVjdGl2ZWx5LCBpZiB0aGUgdmFsdWUgaXMgb21pdHRlZCBlbnRpcmVseS5cbiAgICAgICAgICAgICAgc3RyaW5naWZ5KCkgPT09IHVuZGVmICYmXG4gICAgICAgICAgICAgIC8vIEZGIDMuMWIxLCAyIHRocm93IGFuIGVycm9yIGlmIHRoZSBnaXZlbiB2YWx1ZSBpcyBub3QgYSBudW1iZXIsXG4gICAgICAgICAgICAgIC8vIHN0cmluZywgYXJyYXksIG9iamVjdCwgQm9vbGVhbiwgb3IgYG51bGxgIGxpdGVyYWwuIFRoaXMgYXBwbGllcyB0b1xuICAgICAgICAgICAgICAvLyBvYmplY3RzIHdpdGggY3VzdG9tIGB0b0pTT05gIG1ldGhvZHMgYXMgd2VsbCwgdW5sZXNzIHRoZXkgYXJlIG5lc3RlZFxuICAgICAgICAgICAgICAvLyBpbnNpZGUgb2JqZWN0IG9yIGFycmF5IGxpdGVyYWxzLiBZVUkgMy4wLjBiMSBpZ25vcmVzIGN1c3RvbSBgdG9KU09OYFxuICAgICAgICAgICAgICAvLyBtZXRob2RzIGVudGlyZWx5LlxuICAgICAgICAgICAgICBzdHJpbmdpZnkodmFsdWUpID09PSBcIjFcIiAmJlxuICAgICAgICAgICAgICBzdHJpbmdpZnkoW3ZhbHVlXSkgPT0gXCJbMV1cIiAmJlxuICAgICAgICAgICAgICAvLyBQcm90b3R5cGUgPD0gMS42LjEgc2VyaWFsaXplcyBgW3VuZGVmaW5lZF1gIGFzIGBcIltdXCJgIGluc3RlYWQgb2ZcbiAgICAgICAgICAgICAgLy8gYFwiW251bGxdXCJgLlxuICAgICAgICAgICAgICBzdHJpbmdpZnkoW3VuZGVmXSkgPT0gXCJbbnVsbF1cIiAmJlxuICAgICAgICAgICAgICAvLyBZVUkgMy4wLjBiMSBmYWlscyB0byBzZXJpYWxpemUgYG51bGxgIGxpdGVyYWxzLlxuICAgICAgICAgICAgICBzdHJpbmdpZnkobnVsbCkgPT0gXCJudWxsXCIgJiZcbiAgICAgICAgICAgICAgLy8gRkYgMy4xYjEsIDIgaGFsdHMgc2VyaWFsaXphdGlvbiBpZiBhbiBhcnJheSBjb250YWlucyBhIGZ1bmN0aW9uOlxuICAgICAgICAgICAgICAvLyBgWzEsIHRydWUsIGdldENsYXNzLCAxXWAgc2VyaWFsaXplcyBhcyBcIlsxLHRydWUsXSxcIi4gRkYgMy4xYjNcbiAgICAgICAgICAgICAgLy8gZWxpZGVzIG5vbi1KU09OIHZhbHVlcyBmcm9tIG9iamVjdHMgYW5kIGFycmF5cywgdW5sZXNzIHRoZXlcbiAgICAgICAgICAgICAgLy8gZGVmaW5lIGN1c3RvbSBgdG9KU09OYCBtZXRob2RzLlxuICAgICAgICAgICAgICBzdHJpbmdpZnkoW3VuZGVmLCBnZXRDbGFzcywgbnVsbF0pID09IFwiW251bGwsbnVsbCxudWxsXVwiICYmXG4gICAgICAgICAgICAgIC8vIFNpbXBsZSBzZXJpYWxpemF0aW9uIHRlc3QuIEZGIDMuMWIxIHVzZXMgVW5pY29kZSBlc2NhcGUgc2VxdWVuY2VzXG4gICAgICAgICAgICAgIC8vIHdoZXJlIGNoYXJhY3RlciBlc2NhcGUgY29kZXMgYXJlIGV4cGVjdGVkIChlLmcuLCBgXFxiYCA9PiBgXFx1MDAwOGApLlxuICAgICAgICAgICAgICBzdHJpbmdpZnkoeyBcImFcIjogW3ZhbHVlLCB0cnVlLCBmYWxzZSwgbnVsbCwgXCJcXHgwMFxcYlxcblxcZlxcclxcdFwiXSB9KSA9PSBzZXJpYWxpemVkICYmXG4gICAgICAgICAgICAgIC8vIEZGIDMuMWIxIGFuZCBiMiBpZ25vcmUgdGhlIGBmaWx0ZXJgIGFuZCBgd2lkdGhgIGFyZ3VtZW50cy5cbiAgICAgICAgICAgICAgc3RyaW5naWZ5KG51bGwsIHZhbHVlKSA9PT0gXCIxXCIgJiZcbiAgICAgICAgICAgICAgc3RyaW5naWZ5KFsxLCAyXSwgbnVsbCwgMSkgPT0gXCJbXFxuIDEsXFxuIDJcXG5dXCIgJiZcbiAgICAgICAgICAgICAgLy8gSlNPTiAyLCBQcm90b3R5cGUgPD0gMS43LCBhbmQgb2xkZXIgV2ViS2l0IGJ1aWxkcyBpbmNvcnJlY3RseVxuICAgICAgICAgICAgICAvLyBzZXJpYWxpemUgZXh0ZW5kZWQgeWVhcnMuXG4gICAgICAgICAgICAgIHN0cmluZ2lmeShuZXcgRGF0ZSgtOC42NGUxNSkpID09ICdcIi0yNzE4MjEtMDQtMjBUMDA6MDA6MDAuMDAwWlwiJyAmJlxuICAgICAgICAgICAgICAvLyBUaGUgbWlsbGlzZWNvbmRzIGFyZSBvcHRpb25hbCBpbiBFUyA1LCBidXQgcmVxdWlyZWQgaW4gNS4xLlxuICAgICAgICAgICAgICBzdHJpbmdpZnkobmV3IERhdGUoOC42NGUxNSkpID09ICdcIisyNzU3NjAtMDktMTNUMDA6MDA6MDAuMDAwWlwiJyAmJlxuICAgICAgICAgICAgICAvLyBGaXJlZm94IDw9IDExLjAgaW5jb3JyZWN0bHkgc2VyaWFsaXplcyB5ZWFycyBwcmlvciB0byAwIGFzIG5lZ2F0aXZlXG4gICAgICAgICAgICAgIC8vIGZvdXItZGlnaXQgeWVhcnMgaW5zdGVhZCBvZiBzaXgtZGlnaXQgeWVhcnMuIENyZWRpdHM6IEBZYWZmbGUuXG4gICAgICAgICAgICAgIHN0cmluZ2lmeShuZXcgRGF0ZSgtNjIxOTg3NTUyZTUpKSA9PSAnXCItMDAwMDAxLTAxLTAxVDAwOjAwOjAwLjAwMFpcIicgJiZcbiAgICAgICAgICAgICAgLy8gU2FmYXJpIDw9IDUuMS41IGFuZCBPcGVyYSA+PSAxMC41MyBpbmNvcnJlY3RseSBzZXJpYWxpemUgbWlsbGlzZWNvbmRcbiAgICAgICAgICAgICAgLy8gdmFsdWVzIGxlc3MgdGhhbiAxMDAwLiBDcmVkaXRzOiBAWWFmZmxlLlxuICAgICAgICAgICAgICBzdHJpbmdpZnkobmV3IERhdGUoLTEpKSA9PSAnXCIxOTY5LTEyLTMxVDIzOjU5OjU5Ljk5OVpcIic7XG4gICAgICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgICAgICBzdHJpbmdpZnlTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaXNTdXBwb3J0ZWQgPSBzdHJpbmdpZnlTdXBwb3J0ZWQ7XG4gICAgICB9XG4gICAgICAvLyBUZXN0IGBKU09OLnBhcnNlYC5cbiAgICAgIGlmIChuYW1lID09IFwianNvbi1wYXJzZVwiKSB7XG4gICAgICAgIHZhciBwYXJzZSA9IEpTT04zLnBhcnNlO1xuICAgICAgICBpZiAodHlwZW9mIHBhcnNlID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBGRiAzLjFiMSwgYjIgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYSBiYXJlIGxpdGVyYWwgaXMgcHJvdmlkZWQuXG4gICAgICAgICAgICAvLyBDb25mb3JtaW5nIGltcGxlbWVudGF0aW9ucyBzaG91bGQgYWxzbyBjb2VyY2UgdGhlIGluaXRpYWwgYXJndW1lbnQgdG9cbiAgICAgICAgICAgIC8vIGEgc3RyaW5nIHByaW9yIHRvIHBhcnNpbmcuXG4gICAgICAgICAgICBpZiAocGFyc2UoXCIwXCIpID09PSAwICYmICFwYXJzZShmYWxzZSkpIHtcbiAgICAgICAgICAgICAgLy8gU2ltcGxlIHBhcnNpbmcgdGVzdC5cbiAgICAgICAgICAgICAgdmFsdWUgPSBwYXJzZShzZXJpYWxpemVkKTtcbiAgICAgICAgICAgICAgdmFyIHBhcnNlU3VwcG9ydGVkID0gdmFsdWVbXCJhXCJdLmxlbmd0aCA9PSA1ICYmIHZhbHVlW1wiYVwiXVswXSA9PT0gMTtcbiAgICAgICAgICAgICAgaWYgKHBhcnNlU3VwcG9ydGVkKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgIC8vIFNhZmFyaSA8PSA1LjEuMiBhbmQgRkYgMy4xYjEgYWxsb3cgdW5lc2NhcGVkIHRhYnMgaW4gc3RyaW5ncy5cbiAgICAgICAgICAgICAgICAgIHBhcnNlU3VwcG9ydGVkID0gIXBhcnNlKCdcIlxcdFwiJyk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7fVxuICAgICAgICAgICAgICAgIGlmIChwYXJzZVN1cHBvcnRlZCkge1xuICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gRkYgNC4wIGFuZCA0LjAuMSBhbGxvdyBsZWFkaW5nIGArYCBzaWducyBhbmQgbGVhZGluZ1xuICAgICAgICAgICAgICAgICAgICAvLyBkZWNpbWFsIHBvaW50cy4gRkYgNC4wLCA0LjAuMSwgYW5kIElFIDktMTAgYWxzbyBhbGxvd1xuICAgICAgICAgICAgICAgICAgICAvLyBjZXJ0YWluIG9jdGFsIGxpdGVyYWxzLlxuICAgICAgICAgICAgICAgICAgICBwYXJzZVN1cHBvcnRlZCA9IHBhcnNlKFwiMDFcIikgIT09IDE7XG4gICAgICAgICAgICAgICAgICB9IGNhdGNoIChleGNlcHRpb24pIHt9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwYXJzZVN1cHBvcnRlZCkge1xuICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gRkYgNC4wLCA0LjAuMSwgYW5kIFJoaW5vIDEuN1IzLVI0IGFsbG93IHRyYWlsaW5nIGRlY2ltYWxcbiAgICAgICAgICAgICAgICAgICAgLy8gcG9pbnRzLiBUaGVzZSBlbnZpcm9ubWVudHMsIGFsb25nIHdpdGggRkYgMy4xYjEgYW5kIDIsXG4gICAgICAgICAgICAgICAgICAgIC8vIGFsc28gYWxsb3cgdHJhaWxpbmcgY29tbWFzIGluIEpTT04gb2JqZWN0cyBhbmQgYXJyYXlzLlxuICAgICAgICAgICAgICAgICAgICBwYXJzZVN1cHBvcnRlZCA9IHBhcnNlKFwiMS5cIikgIT09IDE7XG4gICAgICAgICAgICAgICAgICB9IGNhdGNoIChleGNlcHRpb24pIHt9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgICAgICBwYXJzZVN1cHBvcnRlZCA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpc1N1cHBvcnRlZCA9IHBhcnNlU3VwcG9ydGVkO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaGFzW25hbWVdID0gISFpc1N1cHBvcnRlZDtcbiAgfVxuXG4gIGlmICghaGFzKFwianNvblwiKSkge1xuICAgIC8vIENvbW1vbiBgW1tDbGFzc11dYCBuYW1lIGFsaWFzZXMuXG4gICAgdmFyIGZ1bmN0aW9uQ2xhc3MgPSBcIltvYmplY3QgRnVuY3Rpb25dXCI7XG4gICAgdmFyIGRhdGVDbGFzcyA9IFwiW29iamVjdCBEYXRlXVwiO1xuICAgIHZhciBudW1iZXJDbGFzcyA9IFwiW29iamVjdCBOdW1iZXJdXCI7XG4gICAgdmFyIHN0cmluZ0NsYXNzID0gXCJbb2JqZWN0IFN0cmluZ11cIjtcbiAgICB2YXIgYXJyYXlDbGFzcyA9IFwiW29iamVjdCBBcnJheV1cIjtcbiAgICB2YXIgYm9vbGVhbkNsYXNzID0gXCJbb2JqZWN0IEJvb2xlYW5dXCI7XG5cbiAgICAvLyBEZXRlY3QgaW5jb21wbGV0ZSBzdXBwb3J0IGZvciBhY2Nlc3Npbmcgc3RyaW5nIGNoYXJhY3RlcnMgYnkgaW5kZXguXG4gICAgdmFyIGNoYXJJbmRleEJ1Z2d5ID0gaGFzKFwiYnVnLXN0cmluZy1jaGFyLWluZGV4XCIpO1xuXG4gICAgLy8gRGVmaW5lIGFkZGl0aW9uYWwgdXRpbGl0eSBtZXRob2RzIGlmIHRoZSBgRGF0ZWAgbWV0aG9kcyBhcmUgYnVnZ3kuXG4gICAgaWYgKCFpc0V4dGVuZGVkKSB7XG4gICAgICB2YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xuICAgICAgLy8gQSBtYXBwaW5nIGJldHdlZW4gdGhlIG1vbnRocyBvZiB0aGUgeWVhciBhbmQgdGhlIG51bWJlciBvZiBkYXlzIGJldHdlZW5cbiAgICAgIC8vIEphbnVhcnkgMXN0IGFuZCB0aGUgZmlyc3Qgb2YgdGhlIHJlc3BlY3RpdmUgbW9udGguXG4gICAgICB2YXIgTW9udGhzID0gWzAsIDMxLCA1OSwgOTAsIDEyMCwgMTUxLCAxODEsIDIxMiwgMjQzLCAyNzMsIDMwNCwgMzM0XTtcbiAgICAgIC8vIEludGVybmFsOiBDYWxjdWxhdGVzIHRoZSBudW1iZXIgb2YgZGF5cyBiZXR3ZWVuIHRoZSBVbml4IGVwb2NoIGFuZCB0aGVcbiAgICAgIC8vIGZpcnN0IGRheSBvZiB0aGUgZ2l2ZW4gbW9udGguXG4gICAgICB2YXIgZ2V0RGF5ID0gZnVuY3Rpb24gKHllYXIsIG1vbnRoKSB7XG4gICAgICAgIHJldHVybiBNb250aHNbbW9udGhdICsgMzY1ICogKHllYXIgLSAxOTcwKSArIGZsb29yKCh5ZWFyIC0gMTk2OSArIChtb250aCA9ICsobW9udGggPiAxKSkpIC8gNCkgLSBmbG9vcigoeWVhciAtIDE5MDEgKyBtb250aCkgLyAxMDApICsgZmxvb3IoKHllYXIgLSAxNjAxICsgbW9udGgpIC8gNDAwKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gSW50ZXJuYWw6IERldGVybWluZXMgaWYgYSBwcm9wZXJ0eSBpcyBhIGRpcmVjdCBwcm9wZXJ0eSBvZiB0aGUgZ2l2ZW5cbiAgICAvLyBvYmplY3QuIERlbGVnYXRlcyB0byB0aGUgbmF0aXZlIGBPYmplY3QjaGFzT3duUHJvcGVydHlgIG1ldGhvZC5cbiAgICBpZiAoIShpc1Byb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHkpKSB7XG4gICAgICBpc1Byb3BlcnR5ID0gZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICAgIHZhciBtZW1iZXJzID0ge30sIGNvbnN0cnVjdG9yO1xuICAgICAgICBpZiAoKG1lbWJlcnMuX19wcm90b19fID0gbnVsbCwgbWVtYmVycy5fX3Byb3RvX18gPSB7XG4gICAgICAgICAgLy8gVGhlICpwcm90byogcHJvcGVydHkgY2Fubm90IGJlIHNldCBtdWx0aXBsZSB0aW1lcyBpbiByZWNlbnRcbiAgICAgICAgICAvLyB2ZXJzaW9ucyBvZiBGaXJlZm94IGFuZCBTZWFNb25rZXkuXG4gICAgICAgICAgXCJ0b1N0cmluZ1wiOiAxXG4gICAgICAgIH0sIG1lbWJlcnMpLnRvU3RyaW5nICE9IGdldENsYXNzKSB7XG4gICAgICAgICAgLy8gU2FmYXJpIDw9IDIuMC4zIGRvZXNuJ3QgaW1wbGVtZW50IGBPYmplY3QjaGFzT3duUHJvcGVydHlgLCBidXRcbiAgICAgICAgICAvLyBzdXBwb3J0cyB0aGUgbXV0YWJsZSAqcHJvdG8qIHByb3BlcnR5LlxuICAgICAgICAgIGlzUHJvcGVydHkgPSBmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgICAgIC8vIENhcHR1cmUgYW5kIGJyZWFrIHRoZSBvYmplY3QncyBwcm90b3R5cGUgY2hhaW4gKHNlZSBzZWN0aW9uIDguNi4yXG4gICAgICAgICAgICAvLyBvZiB0aGUgRVMgNS4xIHNwZWMpLiBUaGUgcGFyZW50aGVzaXplZCBleHByZXNzaW9uIHByZXZlbnRzIGFuXG4gICAgICAgICAgICAvLyB1bnNhZmUgdHJhbnNmb3JtYXRpb24gYnkgdGhlIENsb3N1cmUgQ29tcGlsZXIuXG4gICAgICAgICAgICB2YXIgb3JpZ2luYWwgPSB0aGlzLl9fcHJvdG9fXywgcmVzdWx0ID0gcHJvcGVydHkgaW4gKHRoaXMuX19wcm90b19fID0gbnVsbCwgdGhpcyk7XG4gICAgICAgICAgICAvLyBSZXN0b3JlIHRoZSBvcmlnaW5hbCBwcm90b3R5cGUgY2hhaW4uXG4gICAgICAgICAgICB0aGlzLl9fcHJvdG9fXyA9IG9yaWdpbmFsO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIENhcHR1cmUgYSByZWZlcmVuY2UgdG8gdGhlIHRvcC1sZXZlbCBgT2JqZWN0YCBjb25zdHJ1Y3Rvci5cbiAgICAgICAgICBjb25zdHJ1Y3RvciA9IG1lbWJlcnMuY29uc3RydWN0b3I7XG4gICAgICAgICAgLy8gVXNlIHRoZSBgY29uc3RydWN0b3JgIHByb3BlcnR5IHRvIHNpbXVsYXRlIGBPYmplY3QjaGFzT3duUHJvcGVydHlgIGluXG4gICAgICAgICAgLy8gb3RoZXIgZW52aXJvbm1lbnRzLlxuICAgICAgICAgIGlzUHJvcGVydHkgPSBmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgICAgIHZhciBwYXJlbnQgPSAodGhpcy5jb25zdHJ1Y3RvciB8fCBjb25zdHJ1Y3RvcikucHJvdG90eXBlO1xuICAgICAgICAgICAgcmV0dXJuIHByb3BlcnR5IGluIHRoaXMgJiYgIShwcm9wZXJ0eSBpbiBwYXJlbnQgJiYgdGhpc1twcm9wZXJ0eV0gPT09IHBhcmVudFtwcm9wZXJ0eV0pO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgbWVtYmVycyA9IG51bGw7XG4gICAgICAgIHJldHVybiBpc1Byb3BlcnR5LmNhbGwodGhpcywgcHJvcGVydHkpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBJbnRlcm5hbDogQSBzZXQgb2YgcHJpbWl0aXZlIHR5cGVzIHVzZWQgYnkgYGlzSG9zdFR5cGVgLlxuICAgIHZhciBQcmltaXRpdmVUeXBlcyA9IHtcbiAgICAgICdib29sZWFuJzogMSxcbiAgICAgICdudW1iZXInOiAxLFxuICAgICAgJ3N0cmluZyc6IDEsXG4gICAgICAndW5kZWZpbmVkJzogMVxuICAgIH07XG5cbiAgICAvLyBJbnRlcm5hbDogRGV0ZXJtaW5lcyBpZiB0aGUgZ2l2ZW4gb2JqZWN0IGBwcm9wZXJ0eWAgdmFsdWUgaXMgYVxuICAgIC8vIG5vbi1wcmltaXRpdmUuXG4gICAgdmFyIGlzSG9zdFR5cGUgPSBmdW5jdGlvbiAob2JqZWN0LCBwcm9wZXJ0eSkge1xuICAgICAgdmFyIHR5cGUgPSB0eXBlb2Ygb2JqZWN0W3Byb3BlcnR5XTtcbiAgICAgIHJldHVybiB0eXBlID09ICdvYmplY3QnID8gISFvYmplY3RbcHJvcGVydHldIDogIVByaW1pdGl2ZVR5cGVzW3R5cGVdO1xuICAgIH07XG5cbiAgICAvLyBJbnRlcm5hbDogTm9ybWFsaXplcyB0aGUgYGZvci4uLmluYCBpdGVyYXRpb24gYWxnb3JpdGhtIGFjcm9zc1xuICAgIC8vIGVudmlyb25tZW50cy4gRWFjaCBlbnVtZXJhdGVkIGtleSBpcyB5aWVsZGVkIHRvIGEgYGNhbGxiYWNrYCBmdW5jdGlvbi5cbiAgICBmb3JFYWNoID0gZnVuY3Rpb24gKG9iamVjdCwgY2FsbGJhY2spIHtcbiAgICAgIHZhciBzaXplID0gMCwgUHJvcGVydGllcywgbWVtYmVycywgcHJvcGVydHk7XG5cbiAgICAgIC8vIFRlc3RzIGZvciBidWdzIGluIHRoZSBjdXJyZW50IGVudmlyb25tZW50J3MgYGZvci4uLmluYCBhbGdvcml0aG0uIFRoZVxuICAgICAgLy8gYHZhbHVlT2ZgIHByb3BlcnR5IGluaGVyaXRzIHRoZSBub24tZW51bWVyYWJsZSBmbGFnIGZyb21cbiAgICAgIC8vIGBPYmplY3QucHJvdG90eXBlYCBpbiBvbGRlciB2ZXJzaW9ucyBvZiBJRSwgTmV0c2NhcGUsIGFuZCBNb3ppbGxhLlxuICAgICAgKFByb3BlcnRpZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudmFsdWVPZiA9IDA7XG4gICAgICB9KS5wcm90b3R5cGUudmFsdWVPZiA9IDA7XG5cbiAgICAgIC8vIEl0ZXJhdGUgb3ZlciBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgYFByb3BlcnRpZXNgIGNsYXNzLlxuICAgICAgbWVtYmVycyA9IG5ldyBQcm9wZXJ0aWVzKCk7XG4gICAgICBmb3IgKHByb3BlcnR5IGluIG1lbWJlcnMpIHtcbiAgICAgICAgLy8gSWdub3JlIGFsbCBwcm9wZXJ0aWVzIGluaGVyaXRlZCBmcm9tIGBPYmplY3QucHJvdG90eXBlYC5cbiAgICAgICAgaWYgKGlzUHJvcGVydHkuY2FsbChtZW1iZXJzLCBwcm9wZXJ0eSkpIHtcbiAgICAgICAgICBzaXplKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIFByb3BlcnRpZXMgPSBtZW1iZXJzID0gbnVsbDtcblxuICAgICAgLy8gTm9ybWFsaXplIHRoZSBpdGVyYXRpb24gYWxnb3JpdGhtLlxuICAgICAgaWYgKCFzaXplKSB7XG4gICAgICAgIC8vIEEgbGlzdCBvZiBub24tZW51bWVyYWJsZSBwcm9wZXJ0aWVzIGluaGVyaXRlZCBmcm9tIGBPYmplY3QucHJvdG90eXBlYC5cbiAgICAgICAgbWVtYmVycyA9IFtcInZhbHVlT2ZcIiwgXCJ0b1N0cmluZ1wiLCBcInRvTG9jYWxlU3RyaW5nXCIsIFwicHJvcGVydHlJc0VudW1lcmFibGVcIiwgXCJpc1Byb3RvdHlwZU9mXCIsIFwiaGFzT3duUHJvcGVydHlcIiwgXCJjb25zdHJ1Y3RvclwiXTtcbiAgICAgICAgLy8gSUUgPD0gOCwgTW96aWxsYSAxLjAsIGFuZCBOZXRzY2FwZSA2LjIgaWdub3JlIHNoYWRvd2VkIG5vbi1lbnVtZXJhYmxlXG4gICAgICAgIC8vIHByb3BlcnRpZXMuXG4gICAgICAgIGZvckVhY2ggPSBmdW5jdGlvbiAob2JqZWN0LCBjYWxsYmFjaykge1xuICAgICAgICAgIHZhciBpc0Z1bmN0aW9uID0gZ2V0Q2xhc3MuY2FsbChvYmplY3QpID09IGZ1bmN0aW9uQ2xhc3MsIHByb3BlcnR5LCBsZW5ndGg7XG4gICAgICAgICAgdmFyIGhhc1Byb3BlcnR5ID0gIWlzRnVuY3Rpb24gJiYgdHlwZW9mIG9iamVjdC5jb25zdHJ1Y3RvciAhPSAnZnVuY3Rpb24nICYmIGlzSG9zdFR5cGUob2JqZWN0LCAnaGFzT3duUHJvcGVydHknKSA/IG9iamVjdC5oYXNPd25Qcm9wZXJ0eSA6IGlzUHJvcGVydHk7XG4gICAgICAgICAgZm9yIChwcm9wZXJ0eSBpbiBvYmplY3QpIHtcbiAgICAgICAgICAgIC8vIEdlY2tvIDw9IDEuMCBlbnVtZXJhdGVzIHRoZSBgcHJvdG90eXBlYCBwcm9wZXJ0eSBvZiBmdW5jdGlvbnMgdW5kZXJcbiAgICAgICAgICAgIC8vIGNlcnRhaW4gY29uZGl0aW9uczsgSUUgZG9lcyBub3QuXG4gICAgICAgICAgICBpZiAoIShpc0Z1bmN0aW9uICYmIHByb3BlcnR5ID09IFwicHJvdG90eXBlXCIpICYmIGhhc1Byb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2socHJvcGVydHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBNYW51YWxseSBpbnZva2UgdGhlIGNhbGxiYWNrIGZvciBlYWNoIG5vbi1lbnVtZXJhYmxlIHByb3BlcnR5LlxuICAgICAgICAgIGZvciAobGVuZ3RoID0gbWVtYmVycy5sZW5ndGg7IHByb3BlcnR5ID0gbWVtYmVyc1stLWxlbmd0aF07IGhhc1Byb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSkgJiYgY2FsbGJhY2socHJvcGVydHkpKTtcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAoc2l6ZSA9PSAyKSB7XG4gICAgICAgIC8vIFNhZmFyaSA8PSAyLjAuNCBlbnVtZXJhdGVzIHNoYWRvd2VkIHByb3BlcnRpZXMgdHdpY2UuXG4gICAgICAgIGZvckVhY2ggPSBmdW5jdGlvbiAob2JqZWN0LCBjYWxsYmFjaykge1xuICAgICAgICAgIC8vIENyZWF0ZSBhIHNldCBvZiBpdGVyYXRlZCBwcm9wZXJ0aWVzLlxuICAgICAgICAgIHZhciBtZW1iZXJzID0ge30sIGlzRnVuY3Rpb24gPSBnZXRDbGFzcy5jYWxsKG9iamVjdCkgPT0gZnVuY3Rpb25DbGFzcywgcHJvcGVydHk7XG4gICAgICAgICAgZm9yIChwcm9wZXJ0eSBpbiBvYmplY3QpIHtcbiAgICAgICAgICAgIC8vIFN0b3JlIGVhY2ggcHJvcGVydHkgbmFtZSB0byBwcmV2ZW50IGRvdWJsZSBlbnVtZXJhdGlvbi4gVGhlXG4gICAgICAgICAgICAvLyBgcHJvdG90eXBlYCBwcm9wZXJ0eSBvZiBmdW5jdGlvbnMgaXMgbm90IGVudW1lcmF0ZWQgZHVlIHRvIGNyb3NzLVxuICAgICAgICAgICAgLy8gZW52aXJvbm1lbnQgaW5jb25zaXN0ZW5jaWVzLlxuICAgICAgICAgICAgaWYgKCEoaXNGdW5jdGlvbiAmJiBwcm9wZXJ0eSA9PSBcInByb3RvdHlwZVwiKSAmJiAhaXNQcm9wZXJ0eS5jYWxsKG1lbWJlcnMsIHByb3BlcnR5KSAmJiAobWVtYmVyc1twcm9wZXJ0eV0gPSAxKSAmJiBpc1Byb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2socHJvcGVydHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE5vIGJ1Z3MgZGV0ZWN0ZWQ7IHVzZSB0aGUgc3RhbmRhcmQgYGZvci4uLmluYCBhbGdvcml0aG0uXG4gICAgICAgIGZvckVhY2ggPSBmdW5jdGlvbiAob2JqZWN0LCBjYWxsYmFjaykge1xuICAgICAgICAgIHZhciBpc0Z1bmN0aW9uID0gZ2V0Q2xhc3MuY2FsbChvYmplY3QpID09IGZ1bmN0aW9uQ2xhc3MsIHByb3BlcnR5LCBpc0NvbnN0cnVjdG9yO1xuICAgICAgICAgIGZvciAocHJvcGVydHkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgICBpZiAoIShpc0Z1bmN0aW9uICYmIHByb3BlcnR5ID09IFwicHJvdG90eXBlXCIpICYmIGlzUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KSAmJiAhKGlzQ29uc3RydWN0b3IgPSBwcm9wZXJ0eSA9PT0gXCJjb25zdHJ1Y3RvclwiKSkge1xuICAgICAgICAgICAgICBjYWxsYmFjayhwcm9wZXJ0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIE1hbnVhbGx5IGludm9rZSB0aGUgY2FsbGJhY2sgZm9yIHRoZSBgY29uc3RydWN0b3JgIHByb3BlcnR5IGR1ZSB0b1xuICAgICAgICAgIC8vIGNyb3NzLWVudmlyb25tZW50IGluY29uc2lzdGVuY2llcy5cbiAgICAgICAgICBpZiAoaXNDb25zdHJ1Y3RvciB8fCBpc1Byb3BlcnR5LmNhbGwob2JqZWN0LCAocHJvcGVydHkgPSBcImNvbnN0cnVjdG9yXCIpKSkge1xuICAgICAgICAgICAgY2FsbGJhY2socHJvcGVydHkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmb3JFYWNoKG9iamVjdCwgY2FsbGJhY2spO1xuICAgIH07XG5cbiAgICAvLyBQdWJsaWM6IFNlcmlhbGl6ZXMgYSBKYXZhU2NyaXB0IGB2YWx1ZWAgYXMgYSBKU09OIHN0cmluZy4gVGhlIG9wdGlvbmFsXG4gICAgLy8gYGZpbHRlcmAgYXJndW1lbnQgbWF5IHNwZWNpZnkgZWl0aGVyIGEgZnVuY3Rpb24gdGhhdCBhbHRlcnMgaG93IG9iamVjdCBhbmRcbiAgICAvLyBhcnJheSBtZW1iZXJzIGFyZSBzZXJpYWxpemVkLCBvciBhbiBhcnJheSBvZiBzdHJpbmdzIGFuZCBudW1iZXJzIHRoYXRcbiAgICAvLyBpbmRpY2F0ZXMgd2hpY2ggcHJvcGVydGllcyBzaG91bGQgYmUgc2VyaWFsaXplZC4gVGhlIG9wdGlvbmFsIGB3aWR0aGBcbiAgICAvLyBhcmd1bWVudCBtYXkgYmUgZWl0aGVyIGEgc3RyaW5nIG9yIG51bWJlciB0aGF0IHNwZWNpZmllcyB0aGUgaW5kZW50YXRpb25cbiAgICAvLyBsZXZlbCBvZiB0aGUgb3V0cHV0LlxuICAgIGlmICghaGFzKFwianNvbi1zdHJpbmdpZnlcIikpIHtcbiAgICAgIC8vIEludGVybmFsOiBBIG1hcCBvZiBjb250cm9sIGNoYXJhY3RlcnMgYW5kIHRoZWlyIGVzY2FwZWQgZXF1aXZhbGVudHMuXG4gICAgICB2YXIgRXNjYXBlcyA9IHtcbiAgICAgICAgOTI6IFwiXFxcXFxcXFxcIixcbiAgICAgICAgMzQ6ICdcXFxcXCInLFxuICAgICAgICA4OiBcIlxcXFxiXCIsXG4gICAgICAgIDEyOiBcIlxcXFxmXCIsXG4gICAgICAgIDEwOiBcIlxcXFxuXCIsXG4gICAgICAgIDEzOiBcIlxcXFxyXCIsXG4gICAgICAgIDk6IFwiXFxcXHRcIlxuICAgICAgfTtcblxuICAgICAgLy8gSW50ZXJuYWw6IENvbnZlcnRzIGB2YWx1ZWAgaW50byBhIHplcm8tcGFkZGVkIHN0cmluZyBzdWNoIHRoYXQgaXRzXG4gICAgICAvLyBsZW5ndGggaXMgYXQgbGVhc3QgZXF1YWwgdG8gYHdpZHRoYC4gVGhlIGB3aWR0aGAgbXVzdCBiZSA8PSA2LlxuICAgICAgdmFyIGxlYWRpbmdaZXJvZXMgPSBcIjAwMDAwMFwiO1xuICAgICAgdmFyIHRvUGFkZGVkU3RyaW5nID0gZnVuY3Rpb24gKHdpZHRoLCB2YWx1ZSkge1xuICAgICAgICAvLyBUaGUgYHx8IDBgIGV4cHJlc3Npb24gaXMgbmVjZXNzYXJ5IHRvIHdvcmsgYXJvdW5kIGEgYnVnIGluXG4gICAgICAgIC8vIE9wZXJhIDw9IDcuNTR1MiB3aGVyZSBgMCA9PSAtMGAsIGJ1dCBgU3RyaW5nKC0wKSAhPT0gXCIwXCJgLlxuICAgICAgICByZXR1cm4gKGxlYWRpbmdaZXJvZXMgKyAodmFsdWUgfHwgMCkpLnNsaWNlKC13aWR0aCk7XG4gICAgICB9O1xuXG4gICAgICAvLyBJbnRlcm5hbDogRG91YmxlLXF1b3RlcyBhIHN0cmluZyBgdmFsdWVgLCByZXBsYWNpbmcgYWxsIEFTQ0lJIGNvbnRyb2xcbiAgICAgIC8vIGNoYXJhY3RlcnMgKGNoYXJhY3RlcnMgd2l0aCBjb2RlIHVuaXQgdmFsdWVzIGJldHdlZW4gMCBhbmQgMzEpIHdpdGhcbiAgICAgIC8vIHRoZWlyIGVzY2FwZWQgZXF1aXZhbGVudHMuIFRoaXMgaXMgYW4gaW1wbGVtZW50YXRpb24gb2YgdGhlXG4gICAgICAvLyBgUXVvdGUodmFsdWUpYCBvcGVyYXRpb24gZGVmaW5lZCBpbiBFUyA1LjEgc2VjdGlvbiAxNS4xMi4zLlxuICAgICAgdmFyIHVuaWNvZGVQcmVmaXggPSBcIlxcXFx1MDBcIjtcbiAgICAgIHZhciBxdW90ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gJ1wiJywgaW5kZXggPSAwLCBsZW5ndGggPSB2YWx1ZS5sZW5ndGgsIGlzTGFyZ2UgPSBsZW5ndGggPiAxMCAmJiBjaGFySW5kZXhCdWdneSwgc3ltYm9scztcbiAgICAgICAgaWYgKGlzTGFyZ2UpIHtcbiAgICAgICAgICBzeW1ib2xzID0gdmFsdWUuc3BsaXQoXCJcIik7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgdmFyIGNoYXJDb2RlID0gdmFsdWUuY2hhckNvZGVBdChpbmRleCk7XG4gICAgICAgICAgLy8gSWYgdGhlIGNoYXJhY3RlciBpcyBhIGNvbnRyb2wgY2hhcmFjdGVyLCBhcHBlbmQgaXRzIFVuaWNvZGUgb3JcbiAgICAgICAgICAvLyBzaG9ydGhhbmQgZXNjYXBlIHNlcXVlbmNlOyBvdGhlcndpc2UsIGFwcGVuZCB0aGUgY2hhcmFjdGVyIGFzLWlzLlxuICAgICAgICAgIHN3aXRjaCAoY2hhckNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgODogY2FzZSA5OiBjYXNlIDEwOiBjYXNlIDEyOiBjYXNlIDEzOiBjYXNlIDM0OiBjYXNlIDkyOlxuICAgICAgICAgICAgICByZXN1bHQgKz0gRXNjYXBlc1tjaGFyQ29kZV07XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgaWYgKGNoYXJDb2RlIDwgMzIpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gdW5pY29kZVByZWZpeCArIHRvUGFkZGVkU3RyaW5nKDIsIGNoYXJDb2RlLnRvU3RyaW5nKDE2KSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmVzdWx0ICs9IGlzTGFyZ2UgPyBzeW1ib2xzW2luZGV4XSA6IGNoYXJJbmRleEJ1Z2d5ID8gdmFsdWUuY2hhckF0KGluZGV4KSA6IHZhbHVlW2luZGV4XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdCArICdcIic7XG4gICAgICB9O1xuXG4gICAgICAvLyBJbnRlcm5hbDogUmVjdXJzaXZlbHkgc2VyaWFsaXplcyBhbiBvYmplY3QuIEltcGxlbWVudHMgdGhlXG4gICAgICAvLyBgU3RyKGtleSwgaG9sZGVyKWAsIGBKTyh2YWx1ZSlgLCBhbmQgYEpBKHZhbHVlKWAgb3BlcmF0aW9ucy5cbiAgICAgIHZhciBzZXJpYWxpemUgPSBmdW5jdGlvbiAocHJvcGVydHksIG9iamVjdCwgY2FsbGJhY2ssIHByb3BlcnRpZXMsIHdoaXRlc3BhY2UsIGluZGVudGF0aW9uLCBzdGFjaykge1xuICAgICAgICB2YXIgdmFsdWUsIGNsYXNzTmFtZSwgeWVhciwgbW9udGgsIGRhdGUsIHRpbWUsIGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzLCBtaWxsaXNlY29uZHMsIHJlc3VsdHMsIGVsZW1lbnQsIGluZGV4LCBsZW5ndGgsIHByZWZpeCwgcmVzdWx0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIE5lY2Vzc2FyeSBmb3IgaG9zdCBvYmplY3Qgc3VwcG9ydC5cbiAgICAgICAgICB2YWx1ZSA9IG9iamVjdFtwcm9wZXJ0eV07XG4gICAgICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge31cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSBcIm9iamVjdFwiICYmIHZhbHVlKSB7XG4gICAgICAgICAgY2xhc3NOYW1lID0gZ2V0Q2xhc3MuY2FsbCh2YWx1ZSk7XG4gICAgICAgICAgaWYgKGNsYXNzTmFtZSA9PSBkYXRlQ2xhc3MgJiYgIWlzUHJvcGVydHkuY2FsbCh2YWx1ZSwgXCJ0b0pTT05cIikpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA+IC0xIC8gMCAmJiB2YWx1ZSA8IDEgLyAwKSB7XG4gICAgICAgICAgICAgIC8vIERhdGVzIGFyZSBzZXJpYWxpemVkIGFjY29yZGluZyB0byB0aGUgYERhdGUjdG9KU09OYCBtZXRob2RcbiAgICAgICAgICAgICAgLy8gc3BlY2lmaWVkIGluIEVTIDUuMSBzZWN0aW9uIDE1LjkuNS40NC4gU2VlIHNlY3Rpb24gMTUuOS4xLjE1XG4gICAgICAgICAgICAgIC8vIGZvciB0aGUgSVNPIDg2MDEgZGF0ZSB0aW1lIHN0cmluZyBmb3JtYXQuXG4gICAgICAgICAgICAgIGlmIChnZXREYXkpIHtcbiAgICAgICAgICAgICAgICAvLyBNYW51YWxseSBjb21wdXRlIHRoZSB5ZWFyLCBtb250aCwgZGF0ZSwgaG91cnMsIG1pbnV0ZXMsXG4gICAgICAgICAgICAgICAgLy8gc2Vjb25kcywgYW5kIG1pbGxpc2Vjb25kcyBpZiB0aGUgYGdldFVUQypgIG1ldGhvZHMgYXJlXG4gICAgICAgICAgICAgICAgLy8gYnVnZ3kuIEFkYXB0ZWQgZnJvbSBAWWFmZmxlJ3MgYGRhdGUtc2hpbWAgcHJvamVjdC5cbiAgICAgICAgICAgICAgICBkYXRlID0gZmxvb3IodmFsdWUgLyA4NjRlNSk7XG4gICAgICAgICAgICAgICAgZm9yICh5ZWFyID0gZmxvb3IoZGF0ZSAvIDM2NS4yNDI1KSArIDE5NzAgLSAxOyBnZXREYXkoeWVhciArIDEsIDApIDw9IGRhdGU7IHllYXIrKyk7XG4gICAgICAgICAgICAgICAgZm9yIChtb250aCA9IGZsb29yKChkYXRlIC0gZ2V0RGF5KHllYXIsIDApKSAvIDMwLjQyKTsgZ2V0RGF5KHllYXIsIG1vbnRoICsgMSkgPD0gZGF0ZTsgbW9udGgrKyk7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IDEgKyBkYXRlIC0gZ2V0RGF5KHllYXIsIG1vbnRoKTtcbiAgICAgICAgICAgICAgICAvLyBUaGUgYHRpbWVgIHZhbHVlIHNwZWNpZmllcyB0aGUgdGltZSB3aXRoaW4gdGhlIGRheSAoc2VlIEVTXG4gICAgICAgICAgICAgICAgLy8gNS4xIHNlY3Rpb24gMTUuOS4xLjIpLiBUaGUgZm9ybXVsYSBgKEEgJSBCICsgQikgJSBCYCBpcyB1c2VkXG4gICAgICAgICAgICAgICAgLy8gdG8gY29tcHV0ZSBgQSBtb2R1bG8gQmAsIGFzIHRoZSBgJWAgb3BlcmF0b3IgZG9lcyBub3RcbiAgICAgICAgICAgICAgICAvLyBjb3JyZXNwb25kIHRvIHRoZSBgbW9kdWxvYCBvcGVyYXRpb24gZm9yIG5lZ2F0aXZlIG51bWJlcnMuXG4gICAgICAgICAgICAgICAgdGltZSA9ICh2YWx1ZSAlIDg2NGU1ICsgODY0ZTUpICUgODY0ZTU7XG4gICAgICAgICAgICAgICAgLy8gVGhlIGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzLCBhbmQgbWlsbGlzZWNvbmRzIGFyZSBvYnRhaW5lZCBieVxuICAgICAgICAgICAgICAgIC8vIGRlY29tcG9zaW5nIHRoZSB0aW1lIHdpdGhpbiB0aGUgZGF5LiBTZWUgc2VjdGlvbiAxNS45LjEuMTAuXG4gICAgICAgICAgICAgICAgaG91cnMgPSBmbG9vcih0aW1lIC8gMzZlNSkgJSAyNDtcbiAgICAgICAgICAgICAgICBtaW51dGVzID0gZmxvb3IodGltZSAvIDZlNCkgJSA2MDtcbiAgICAgICAgICAgICAgICBzZWNvbmRzID0gZmxvb3IodGltZSAvIDFlMykgJSA2MDtcbiAgICAgICAgICAgICAgICBtaWxsaXNlY29uZHMgPSB0aW1lICUgMWUzO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHllYXIgPSB2YWx1ZS5nZXRVVENGdWxsWWVhcigpO1xuICAgICAgICAgICAgICAgIG1vbnRoID0gdmFsdWUuZ2V0VVRDTW9udGgoKTtcbiAgICAgICAgICAgICAgICBkYXRlID0gdmFsdWUuZ2V0VVRDRGF0ZSgpO1xuICAgICAgICAgICAgICAgIGhvdXJzID0gdmFsdWUuZ2V0VVRDSG91cnMoKTtcbiAgICAgICAgICAgICAgICBtaW51dGVzID0gdmFsdWUuZ2V0VVRDTWludXRlcygpO1xuICAgICAgICAgICAgICAgIHNlY29uZHMgPSB2YWx1ZS5nZXRVVENTZWNvbmRzKCk7XG4gICAgICAgICAgICAgICAgbWlsbGlzZWNvbmRzID0gdmFsdWUuZ2V0VVRDTWlsbGlzZWNvbmRzKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gU2VyaWFsaXplIGV4dGVuZGVkIHllYXJzIGNvcnJlY3RseS5cbiAgICAgICAgICAgICAgdmFsdWUgPSAoeWVhciA8PSAwIHx8IHllYXIgPj0gMWU0ID8gKHllYXIgPCAwID8gXCItXCIgOiBcIitcIikgKyB0b1BhZGRlZFN0cmluZyg2LCB5ZWFyIDwgMCA/IC15ZWFyIDogeWVhcikgOiB0b1BhZGRlZFN0cmluZyg0LCB5ZWFyKSkgK1xuICAgICAgICAgICAgICAgIFwiLVwiICsgdG9QYWRkZWRTdHJpbmcoMiwgbW9udGggKyAxKSArIFwiLVwiICsgdG9QYWRkZWRTdHJpbmcoMiwgZGF0ZSkgK1xuICAgICAgICAgICAgICAgIC8vIE1vbnRocywgZGF0ZXMsIGhvdXJzLCBtaW51dGVzLCBhbmQgc2Vjb25kcyBzaG91bGQgaGF2ZSB0d29cbiAgICAgICAgICAgICAgICAvLyBkaWdpdHM7IG1pbGxpc2Vjb25kcyBzaG91bGQgaGF2ZSB0aHJlZS5cbiAgICAgICAgICAgICAgICBcIlRcIiArIHRvUGFkZGVkU3RyaW5nKDIsIGhvdXJzKSArIFwiOlwiICsgdG9QYWRkZWRTdHJpbmcoMiwgbWludXRlcykgKyBcIjpcIiArIHRvUGFkZGVkU3RyaW5nKDIsIHNlY29uZHMpICtcbiAgICAgICAgICAgICAgICAvLyBNaWxsaXNlY29uZHMgYXJlIG9wdGlvbmFsIGluIEVTIDUuMCwgYnV0IHJlcXVpcmVkIGluIDUuMS5cbiAgICAgICAgICAgICAgICBcIi5cIiArIHRvUGFkZGVkU3RyaW5nKDMsIG1pbGxpc2Vjb25kcykgKyBcIlpcIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZS50b0pTT04gPT0gXCJmdW5jdGlvblwiICYmICgoY2xhc3NOYW1lICE9IG51bWJlckNsYXNzICYmIGNsYXNzTmFtZSAhPSBzdHJpbmdDbGFzcyAmJiBjbGFzc05hbWUgIT0gYXJyYXlDbGFzcykgfHwgaXNQcm9wZXJ0eS5jYWxsKHZhbHVlLCBcInRvSlNPTlwiKSkpIHtcbiAgICAgICAgICAgIC8vIFByb3RvdHlwZSA8PSAxLjYuMSBhZGRzIG5vbi1zdGFuZGFyZCBgdG9KU09OYCBtZXRob2RzIHRvIHRoZVxuICAgICAgICAgICAgLy8gYE51bWJlcmAsIGBTdHJpbmdgLCBgRGF0ZWAsIGFuZCBgQXJyYXlgIHByb3RvdHlwZXMuIEpTT04gM1xuICAgICAgICAgICAgLy8gaWdub3JlcyBhbGwgYHRvSlNPTmAgbWV0aG9kcyBvbiB0aGVzZSBvYmplY3RzIHVubGVzcyB0aGV5IGFyZVxuICAgICAgICAgICAgLy8gZGVmaW5lZCBkaXJlY3RseSBvbiBhbiBpbnN0YW5jZS5cbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUudG9KU09OKHByb3BlcnR5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgLy8gSWYgYSByZXBsYWNlbWVudCBmdW5jdGlvbiB3YXMgcHJvdmlkZWQsIGNhbGwgaXQgdG8gb2J0YWluIHRoZSB2YWx1ZVxuICAgICAgICAgIC8vIGZvciBzZXJpYWxpemF0aW9uLlxuICAgICAgICAgIHZhbHVlID0gY2FsbGJhY2suY2FsbChvYmplY3QsIHByb3BlcnR5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIFwibnVsbFwiO1xuICAgICAgICB9XG4gICAgICAgIGNsYXNzTmFtZSA9IGdldENsYXNzLmNhbGwodmFsdWUpO1xuICAgICAgICBpZiAoY2xhc3NOYW1lID09IGJvb2xlYW5DbGFzcykge1xuICAgICAgICAgIC8vIEJvb2xlYW5zIGFyZSByZXByZXNlbnRlZCBsaXRlcmFsbHkuXG4gICAgICAgICAgcmV0dXJuIFwiXCIgKyB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChjbGFzc05hbWUgPT0gbnVtYmVyQ2xhc3MpIHtcbiAgICAgICAgICAvLyBKU09OIG51bWJlcnMgbXVzdCBiZSBmaW5pdGUuIGBJbmZpbml0eWAgYW5kIGBOYU5gIGFyZSBzZXJpYWxpemVkIGFzXG4gICAgICAgICAgLy8gYFwibnVsbFwiYC5cbiAgICAgICAgICByZXR1cm4gdmFsdWUgPiAtMSAvIDAgJiYgdmFsdWUgPCAxIC8gMCA/IFwiXCIgKyB2YWx1ZSA6IFwibnVsbFwiO1xuICAgICAgICB9IGVsc2UgaWYgKGNsYXNzTmFtZSA9PSBzdHJpbmdDbGFzcykge1xuICAgICAgICAgIC8vIFN0cmluZ3MgYXJlIGRvdWJsZS1xdW90ZWQgYW5kIGVzY2FwZWQuXG4gICAgICAgICAgcmV0dXJuIHF1b3RlKFwiXCIgKyB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUmVjdXJzaXZlbHkgc2VyaWFsaXplIG9iamVjdHMgYW5kIGFycmF5cy5cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgLy8gQ2hlY2sgZm9yIGN5Y2xpYyBzdHJ1Y3R1cmVzLiBUaGlzIGlzIGEgbGluZWFyIHNlYXJjaDsgcGVyZm9ybWFuY2VcbiAgICAgICAgICAvLyBpcyBpbnZlcnNlbHkgcHJvcG9ydGlvbmFsIHRvIHRoZSBudW1iZXIgb2YgdW5pcXVlIG5lc3RlZCBvYmplY3RzLlxuICAgICAgICAgIGZvciAobGVuZ3RoID0gc3RhY2subGVuZ3RoOyBsZW5ndGgtLTspIHtcbiAgICAgICAgICAgIGlmIChzdGFja1tsZW5ndGhdID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAvLyBDeWNsaWMgc3RydWN0dXJlcyBjYW5ub3QgYmUgc2VyaWFsaXplZCBieSBgSlNPTi5zdHJpbmdpZnlgLlxuICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gQWRkIHRoZSBvYmplY3QgdG8gdGhlIHN0YWNrIG9mIHRyYXZlcnNlZCBvYmplY3RzLlxuICAgICAgICAgIHN0YWNrLnB1c2godmFsdWUpO1xuICAgICAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgICAvLyBTYXZlIHRoZSBjdXJyZW50IGluZGVudGF0aW9uIGxldmVsIGFuZCBpbmRlbnQgb25lIGFkZGl0aW9uYWwgbGV2ZWwuXG4gICAgICAgICAgcHJlZml4ID0gaW5kZW50YXRpb247XG4gICAgICAgICAgaW5kZW50YXRpb24gKz0gd2hpdGVzcGFjZTtcbiAgICAgICAgICBpZiAoY2xhc3NOYW1lID09IGFycmF5Q2xhc3MpIHtcbiAgICAgICAgICAgIC8vIFJlY3Vyc2l2ZWx5IHNlcmlhbGl6ZSBhcnJheSBlbGVtZW50cy5cbiAgICAgICAgICAgIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSB2YWx1ZS5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQgPSBzZXJpYWxpemUoaW5kZXgsIHZhbHVlLCBjYWxsYmFjaywgcHJvcGVydGllcywgd2hpdGVzcGFjZSwgaW5kZW50YXRpb24sIHN0YWNrKTtcbiAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGVsZW1lbnQgPT09IHVuZGVmID8gXCJudWxsXCIgOiBlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdHMubGVuZ3RoID8gKHdoaXRlc3BhY2UgPyBcIltcXG5cIiArIGluZGVudGF0aW9uICsgcmVzdWx0cy5qb2luKFwiLFxcblwiICsgaW5kZW50YXRpb24pICsgXCJcXG5cIiArIHByZWZpeCArIFwiXVwiIDogKFwiW1wiICsgcmVzdWx0cy5qb2luKFwiLFwiKSArIFwiXVwiKSkgOiBcIltdXCI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFJlY3Vyc2l2ZWx5IHNlcmlhbGl6ZSBvYmplY3QgbWVtYmVycy4gTWVtYmVycyBhcmUgc2VsZWN0ZWQgZnJvbVxuICAgICAgICAgICAgLy8gZWl0aGVyIGEgdXNlci1zcGVjaWZpZWQgbGlzdCBvZiBwcm9wZXJ0eSBuYW1lcywgb3IgdGhlIG9iamVjdFxuICAgICAgICAgICAgLy8gaXRzZWxmLlxuICAgICAgICAgICAgZm9yRWFjaChwcm9wZXJ0aWVzIHx8IHZhbHVlLCBmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBzZXJpYWxpemUocHJvcGVydHksIHZhbHVlLCBjYWxsYmFjaywgcHJvcGVydGllcywgd2hpdGVzcGFjZSwgaW5kZW50YXRpb24sIHN0YWNrKTtcbiAgICAgICAgICAgICAgaWYgKGVsZW1lbnQgIT09IHVuZGVmKSB7XG4gICAgICAgICAgICAgICAgLy8gQWNjb3JkaW5nIHRvIEVTIDUuMSBzZWN0aW9uIDE1LjEyLjM6IFwiSWYgYGdhcGAge3doaXRlc3BhY2V9XG4gICAgICAgICAgICAgICAgLy8gaXMgbm90IHRoZSBlbXB0eSBzdHJpbmcsIGxldCBgbWVtYmVyYCB7cXVvdGUocHJvcGVydHkpICsgXCI6XCJ9XG4gICAgICAgICAgICAgICAgLy8gYmUgdGhlIGNvbmNhdGVuYXRpb24gb2YgYG1lbWJlcmAgYW5kIHRoZSBgc3BhY2VgIGNoYXJhY3Rlci5cIlxuICAgICAgICAgICAgICAgIC8vIFRoZSBcImBzcGFjZWAgY2hhcmFjdGVyXCIgcmVmZXJzIHRvIHRoZSBsaXRlcmFsIHNwYWNlXG4gICAgICAgICAgICAgICAgLy8gY2hhcmFjdGVyLCBub3QgdGhlIGBzcGFjZWAge3dpZHRofSBhcmd1bWVudCBwcm92aWRlZCB0b1xuICAgICAgICAgICAgICAgIC8vIGBKU09OLnN0cmluZ2lmeWAuXG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHF1b3RlKHByb3BlcnR5KSArIFwiOlwiICsgKHdoaXRlc3BhY2UgPyBcIiBcIiA6IFwiXCIpICsgZWxlbWVudCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0cy5sZW5ndGggPyAod2hpdGVzcGFjZSA/IFwie1xcblwiICsgaW5kZW50YXRpb24gKyByZXN1bHRzLmpvaW4oXCIsXFxuXCIgKyBpbmRlbnRhdGlvbikgKyBcIlxcblwiICsgcHJlZml4ICsgXCJ9XCIgOiAoXCJ7XCIgKyByZXN1bHRzLmpvaW4oXCIsXCIpICsgXCJ9XCIpKSA6IFwie31cIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gUmVtb3ZlIHRoZSBvYmplY3QgZnJvbSB0aGUgdHJhdmVyc2VkIG9iamVjdCBzdGFjay5cbiAgICAgICAgICBzdGFjay5wb3AoKTtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvLyBQdWJsaWM6IGBKU09OLnN0cmluZ2lmeWAuIFNlZSBFUyA1LjEgc2VjdGlvbiAxNS4xMi4zLlxuICAgICAgSlNPTjMuc3RyaW5naWZ5ID0gZnVuY3Rpb24gKHNvdXJjZSwgZmlsdGVyLCB3aWR0aCkge1xuICAgICAgICB2YXIgd2hpdGVzcGFjZSwgY2FsbGJhY2ssIHByb3BlcnRpZXMsIGNsYXNzTmFtZTtcbiAgICAgICAgaWYgKHR5cGVvZiBmaWx0ZXIgPT0gXCJmdW5jdGlvblwiIHx8IHR5cGVvZiBmaWx0ZXIgPT0gXCJvYmplY3RcIiAmJiBmaWx0ZXIpIHtcbiAgICAgICAgICBpZiAoKGNsYXNzTmFtZSA9IGdldENsYXNzLmNhbGwoZmlsdGVyKSkgPT0gZnVuY3Rpb25DbGFzcykge1xuICAgICAgICAgICAgY2FsbGJhY2sgPSBmaWx0ZXI7XG4gICAgICAgICAgfSBlbHNlIGlmIChjbGFzc05hbWUgPT0gYXJyYXlDbGFzcykge1xuICAgICAgICAgICAgLy8gQ29udmVydCB0aGUgcHJvcGVydHkgbmFtZXMgYXJyYXkgaW50byBhIG1ha2VzaGlmdCBzZXQuXG4gICAgICAgICAgICBwcm9wZXJ0aWVzID0ge307XG4gICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDAsIGxlbmd0aCA9IGZpbHRlci5sZW5ndGgsIHZhbHVlOyBpbmRleCA8IGxlbmd0aDsgdmFsdWUgPSBmaWx0ZXJbaW5kZXgrK10sICgoY2xhc3NOYW1lID0gZ2V0Q2xhc3MuY2FsbCh2YWx1ZSkpLCBjbGFzc05hbWUgPT0gc3RyaW5nQ2xhc3MgfHwgY2xhc3NOYW1lID09IG51bWJlckNsYXNzKSAmJiAocHJvcGVydGllc1t2YWx1ZV0gPSAxKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh3aWR0aCkge1xuICAgICAgICAgIGlmICgoY2xhc3NOYW1lID0gZ2V0Q2xhc3MuY2FsbCh3aWR0aCkpID09IG51bWJlckNsYXNzKSB7XG4gICAgICAgICAgICAvLyBDb252ZXJ0IHRoZSBgd2lkdGhgIHRvIGFuIGludGVnZXIgYW5kIGNyZWF0ZSBhIHN0cmluZyBjb250YWluaW5nXG4gICAgICAgICAgICAvLyBgd2lkdGhgIG51bWJlciBvZiBzcGFjZSBjaGFyYWN0ZXJzLlxuICAgICAgICAgICAgaWYgKCh3aWR0aCAtPSB3aWR0aCAlIDEpID4gMCkge1xuICAgICAgICAgICAgICBmb3IgKHdoaXRlc3BhY2UgPSBcIlwiLCB3aWR0aCA+IDEwICYmICh3aWR0aCA9IDEwKTsgd2hpdGVzcGFjZS5sZW5ndGggPCB3aWR0aDsgd2hpdGVzcGFjZSArPSBcIiBcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChjbGFzc05hbWUgPT0gc3RyaW5nQ2xhc3MpIHtcbiAgICAgICAgICAgIHdoaXRlc3BhY2UgPSB3aWR0aC5sZW5ndGggPD0gMTAgPyB3aWR0aCA6IHdpZHRoLnNsaWNlKDAsIDEwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gT3BlcmEgPD0gNy41NHUyIGRpc2NhcmRzIHRoZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGVtcHR5IHN0cmluZyBrZXlzXG4gICAgICAgIC8vIChgXCJcImApIG9ubHkgaWYgdGhleSBhcmUgdXNlZCBkaXJlY3RseSB3aXRoaW4gYW4gb2JqZWN0IG1lbWJlciBsaXN0XG4gICAgICAgIC8vIChlLmcuLCBgIShcIlwiIGluIHsgXCJcIjogMX0pYCkuXG4gICAgICAgIHJldHVybiBzZXJpYWxpemUoXCJcIiwgKHZhbHVlID0ge30sIHZhbHVlW1wiXCJdID0gc291cmNlLCB2YWx1ZSksIGNhbGxiYWNrLCBwcm9wZXJ0aWVzLCB3aGl0ZXNwYWNlLCBcIlwiLCBbXSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIFB1YmxpYzogUGFyc2VzIGEgSlNPTiBzb3VyY2Ugc3RyaW5nLlxuICAgIGlmICghaGFzKFwianNvbi1wYXJzZVwiKSkge1xuICAgICAgdmFyIGZyb21DaGFyQ29kZSA9IFN0cmluZy5mcm9tQ2hhckNvZGU7XG5cbiAgICAgIC8vIEludGVybmFsOiBBIG1hcCBvZiBlc2NhcGVkIGNvbnRyb2wgY2hhcmFjdGVycyBhbmQgdGhlaXIgdW5lc2NhcGVkXG4gICAgICAvLyBlcXVpdmFsZW50cy5cbiAgICAgIHZhciBVbmVzY2FwZXMgPSB7XG4gICAgICAgIDkyOiBcIlxcXFxcIixcbiAgICAgICAgMzQ6ICdcIicsXG4gICAgICAgIDQ3OiBcIi9cIixcbiAgICAgICAgOTg6IFwiXFxiXCIsXG4gICAgICAgIDExNjogXCJcXHRcIixcbiAgICAgICAgMTEwOiBcIlxcblwiLFxuICAgICAgICAxMDI6IFwiXFxmXCIsXG4gICAgICAgIDExNDogXCJcXHJcIlxuICAgICAgfTtcblxuICAgICAgLy8gSW50ZXJuYWw6IFN0b3JlcyB0aGUgcGFyc2VyIHN0YXRlLlxuICAgICAgdmFyIEluZGV4LCBTb3VyY2U7XG5cbiAgICAgIC8vIEludGVybmFsOiBSZXNldHMgdGhlIHBhcnNlciBzdGF0ZSBhbmQgdGhyb3dzIGEgYFN5bnRheEVycm9yYC5cbiAgICAgIHZhciBhYm9ydCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBJbmRleCA9IFNvdXJjZSA9IG51bGw7XG4gICAgICAgIHRocm93IFN5bnRheEVycm9yKCk7XG4gICAgICB9O1xuXG4gICAgICAvLyBJbnRlcm5hbDogUmV0dXJucyB0aGUgbmV4dCB0b2tlbiwgb3IgYFwiJFwiYCBpZiB0aGUgcGFyc2VyIGhhcyByZWFjaGVkXG4gICAgICAvLyB0aGUgZW5kIG9mIHRoZSBzb3VyY2Ugc3RyaW5nLiBBIHRva2VuIG1heSBiZSBhIHN0cmluZywgbnVtYmVyLCBgbnVsbGBcbiAgICAgIC8vIGxpdGVyYWwsIG9yIEJvb2xlYW4gbGl0ZXJhbC5cbiAgICAgIHZhciBsZXggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzb3VyY2UgPSBTb3VyY2UsIGxlbmd0aCA9IHNvdXJjZS5sZW5ndGgsIHZhbHVlLCBiZWdpbiwgcG9zaXRpb24sIGlzU2lnbmVkLCBjaGFyQ29kZTtcbiAgICAgICAgd2hpbGUgKEluZGV4IDwgbGVuZ3RoKSB7XG4gICAgICAgICAgY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChJbmRleCk7XG4gICAgICAgICAgc3dpdGNoIChjaGFyQ29kZSkge1xuICAgICAgICAgICAgY2FzZSA5OiBjYXNlIDEwOiBjYXNlIDEzOiBjYXNlIDMyOlxuICAgICAgICAgICAgICAvLyBTa2lwIHdoaXRlc3BhY2UgdG9rZW5zLCBpbmNsdWRpbmcgdGFicywgY2FycmlhZ2UgcmV0dXJucywgbGluZVxuICAgICAgICAgICAgICAvLyBmZWVkcywgYW5kIHNwYWNlIGNoYXJhY3RlcnMuXG4gICAgICAgICAgICAgIEluZGV4Kys7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxMjM6IGNhc2UgMTI1OiBjYXNlIDkxOiBjYXNlIDkzOiBjYXNlIDU4OiBjYXNlIDQ0OlxuICAgICAgICAgICAgICAvLyBQYXJzZSBhIHB1bmN0dWF0b3IgdG9rZW4gKGB7YCwgYH1gLCBgW2AsIGBdYCwgYDpgLCBvciBgLGApIGF0XG4gICAgICAgICAgICAgIC8vIHRoZSBjdXJyZW50IHBvc2l0aW9uLlxuICAgICAgICAgICAgICB2YWx1ZSA9IGNoYXJJbmRleEJ1Z2d5ID8gc291cmNlLmNoYXJBdChJbmRleCkgOiBzb3VyY2VbSW5kZXhdO1xuICAgICAgICAgICAgICBJbmRleCsrO1xuICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICBjYXNlIDM0OlxuICAgICAgICAgICAgICAvLyBgXCJgIGRlbGltaXRzIGEgSlNPTiBzdHJpbmc7IGFkdmFuY2UgdG8gdGhlIG5leHQgY2hhcmFjdGVyIGFuZFxuICAgICAgICAgICAgICAvLyBiZWdpbiBwYXJzaW5nIHRoZSBzdHJpbmcuIFN0cmluZyB0b2tlbnMgYXJlIHByZWZpeGVkIHdpdGggdGhlXG4gICAgICAgICAgICAgIC8vIHNlbnRpbmVsIGBAYCBjaGFyYWN0ZXIgdG8gZGlzdGluZ3Vpc2ggdGhlbSBmcm9tIHB1bmN0dWF0b3JzIGFuZFxuICAgICAgICAgICAgICAvLyBlbmQtb2Ytc3RyaW5nIHRva2Vucy5cbiAgICAgICAgICAgICAgZm9yICh2YWx1ZSA9IFwiQFwiLCBJbmRleCsrOyBJbmRleCA8IGxlbmd0aDspIHtcbiAgICAgICAgICAgICAgICBjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KEluZGV4KTtcbiAgICAgICAgICAgICAgICBpZiAoY2hhckNvZGUgPCAzMikge1xuICAgICAgICAgICAgICAgICAgLy8gVW5lc2NhcGVkIEFTQ0lJIGNvbnRyb2wgY2hhcmFjdGVycyAodGhvc2Ugd2l0aCBhIGNvZGUgdW5pdFxuICAgICAgICAgICAgICAgICAgLy8gbGVzcyB0aGFuIHRoZSBzcGFjZSBjaGFyYWN0ZXIpIGFyZSBub3QgcGVybWl0dGVkLlxuICAgICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNoYXJDb2RlID09IDkyKSB7XG4gICAgICAgICAgICAgICAgICAvLyBBIHJldmVyc2Ugc29saWR1cyAoYFxcYCkgbWFya3MgdGhlIGJlZ2lubmluZyBvZiBhbiBlc2NhcGVkXG4gICAgICAgICAgICAgICAgICAvLyBjb250cm9sIGNoYXJhY3RlciAoaW5jbHVkaW5nIGBcImAsIGBcXGAsIGFuZCBgL2ApIG9yIFVuaWNvZGVcbiAgICAgICAgICAgICAgICAgIC8vIGVzY2FwZSBzZXF1ZW5jZS5cbiAgICAgICAgICAgICAgICAgIGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoKytJbmRleCk7XG4gICAgICAgICAgICAgICAgICBzd2l0Y2ggKGNoYXJDb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgOTI6IGNhc2UgMzQ6IGNhc2UgNDc6IGNhc2UgOTg6IGNhc2UgMTE2OiBjYXNlIDExMDogY2FzZSAxMDI6IGNhc2UgMTE0OlxuICAgICAgICAgICAgICAgICAgICAgIC8vIFJldml2ZSBlc2NhcGVkIGNvbnRyb2wgY2hhcmFjdGVycy5cbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSArPSBVbmVzY2FwZXNbY2hhckNvZGVdO1xuICAgICAgICAgICAgICAgICAgICAgIEluZGV4Kys7XG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTE3OlxuICAgICAgICAgICAgICAgICAgICAgIC8vIGBcXHVgIG1hcmtzIHRoZSBiZWdpbm5pbmcgb2YgYSBVbmljb2RlIGVzY2FwZSBzZXF1ZW5jZS5cbiAgICAgICAgICAgICAgICAgICAgICAvLyBBZHZhbmNlIHRvIHRoZSBmaXJzdCBjaGFyYWN0ZXIgYW5kIHZhbGlkYXRlIHRoZVxuICAgICAgICAgICAgICAgICAgICAgIC8vIGZvdXItZGlnaXQgY29kZSBwb2ludC5cbiAgICAgICAgICAgICAgICAgICAgICBiZWdpbiA9ICsrSW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgZm9yIChwb3NpdGlvbiA9IEluZGV4ICsgNDsgSW5kZXggPCBwb3NpdGlvbjsgSW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBIHZhbGlkIHNlcXVlbmNlIGNvbXByaXNlcyBmb3VyIGhleGRpZ2l0cyAoY2FzZS1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGluc2Vuc2l0aXZlKSB0aGF0IGZvcm0gYSBzaW5nbGUgaGV4YWRlY2ltYWwgdmFsdWUuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShjaGFyQ29kZSA+PSA0OCAmJiBjaGFyQ29kZSA8PSA1NyB8fCBjaGFyQ29kZSA+PSA5NyAmJiBjaGFyQ29kZSA8PSAxMDIgfHwgY2hhckNvZGUgPj0gNjUgJiYgY2hhckNvZGUgPD0gNzApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEludmFsaWQgVW5pY29kZSBlc2NhcGUgc2VxdWVuY2UuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIC8vIFJldml2ZSB0aGUgZXNjYXBlZCBjaGFyYWN0ZXIuXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWUgKz0gZnJvbUNoYXJDb2RlKFwiMHhcIiArIHNvdXJjZS5zbGljZShiZWdpbiwgSW5kZXgpKTtcbiAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAvLyBJbnZhbGlkIGVzY2FwZSBzZXF1ZW5jZS5cbiAgICAgICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBpZiAoY2hhckNvZGUgPT0gMzQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQW4gdW5lc2NhcGVkIGRvdWJsZS1xdW90ZSBjaGFyYWN0ZXIgbWFya3MgdGhlIGVuZCBvZiB0aGVcbiAgICAgICAgICAgICAgICAgICAgLy8gc3RyaW5nLlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgYmVnaW4gPSBJbmRleDtcbiAgICAgICAgICAgICAgICAgIC8vIE9wdGltaXplIGZvciB0aGUgY29tbW9uIGNhc2Ugd2hlcmUgYSBzdHJpbmcgaXMgdmFsaWQuXG4gICAgICAgICAgICAgICAgICB3aGlsZSAoY2hhckNvZGUgPj0gMzIgJiYgY2hhckNvZGUgIT0gOTIgJiYgY2hhckNvZGUgIT0gMzQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdCgrK0luZGV4KTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIC8vIEFwcGVuZCB0aGUgc3RyaW5nIGFzLWlzLlxuICAgICAgICAgICAgICAgICAgdmFsdWUgKz0gc291cmNlLnNsaWNlKGJlZ2luLCBJbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChzb3VyY2UuY2hhckNvZGVBdChJbmRleCkgPT0gMzQpIHtcbiAgICAgICAgICAgICAgICAvLyBBZHZhbmNlIHRvIHRoZSBuZXh0IGNoYXJhY3RlciBhbmQgcmV0dXJuIHRoZSByZXZpdmVkIHN0cmluZy5cbiAgICAgICAgICAgICAgICBJbmRleCsrO1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBVbnRlcm1pbmF0ZWQgc3RyaW5nLlxuICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgLy8gUGFyc2UgbnVtYmVycyBhbmQgbGl0ZXJhbHMuXG4gICAgICAgICAgICAgIGJlZ2luID0gSW5kZXg7XG4gICAgICAgICAgICAgIC8vIEFkdmFuY2UgcGFzdCB0aGUgbmVnYXRpdmUgc2lnbiwgaWYgb25lIGlzIHNwZWNpZmllZC5cbiAgICAgICAgICAgICAgaWYgKGNoYXJDb2RlID09IDQ1KSB7XG4gICAgICAgICAgICAgICAgaXNTaWduZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoKytJbmRleCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gUGFyc2UgYW4gaW50ZWdlciBvciBmbG9hdGluZy1wb2ludCB2YWx1ZS5cbiAgICAgICAgICAgICAgaWYgKGNoYXJDb2RlID49IDQ4ICYmIGNoYXJDb2RlIDw9IDU3KSB7XG4gICAgICAgICAgICAgICAgLy8gTGVhZGluZyB6ZXJvZXMgYXJlIGludGVycHJldGVkIGFzIG9jdGFsIGxpdGVyYWxzLlxuICAgICAgICAgICAgICAgIGlmIChjaGFyQ29kZSA9PSA0OCAmJiAoKGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoSW5kZXggKyAxKSksIGNoYXJDb2RlID49IDQ4ICYmIGNoYXJDb2RlIDw9IDU3KSkge1xuICAgICAgICAgICAgICAgICAgLy8gSWxsZWdhbCBvY3RhbCBsaXRlcmFsLlxuICAgICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaXNTaWduZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAvLyBQYXJzZSB0aGUgaW50ZWdlciBjb21wb25lbnQuXG4gICAgICAgICAgICAgICAgZm9yICg7IEluZGV4IDwgbGVuZ3RoICYmICgoY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChJbmRleCkpLCBjaGFyQ29kZSA+PSA0OCAmJiBjaGFyQ29kZSA8PSA1Nyk7IEluZGV4KyspO1xuICAgICAgICAgICAgICAgIC8vIEZsb2F0cyBjYW5ub3QgY29udGFpbiBhIGxlYWRpbmcgZGVjaW1hbCBwb2ludDsgaG93ZXZlciwgdGhpc1xuICAgICAgICAgICAgICAgIC8vIGNhc2UgaXMgYWxyZWFkeSBhY2NvdW50ZWQgZm9yIGJ5IHRoZSBwYXJzZXIuXG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZS5jaGFyQ29kZUF0KEluZGV4KSA9PSA0Nikge1xuICAgICAgICAgICAgICAgICAgcG9zaXRpb24gPSArK0luZGV4O1xuICAgICAgICAgICAgICAgICAgLy8gUGFyc2UgdGhlIGRlY2ltYWwgY29tcG9uZW50LlxuICAgICAgICAgICAgICAgICAgZm9yICg7IHBvc2l0aW9uIDwgbGVuZ3RoICYmICgoY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChwb3NpdGlvbikpLCBjaGFyQ29kZSA+PSA0OCAmJiBjaGFyQ29kZSA8PSA1Nyk7IHBvc2l0aW9uKyspO1xuICAgICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uID09IEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElsbGVnYWwgdHJhaWxpbmcgZGVjaW1hbC5cbiAgICAgICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIEluZGV4ID0gcG9zaXRpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFBhcnNlIGV4cG9uZW50cy4gVGhlIGBlYCBkZW5vdGluZyB0aGUgZXhwb25lbnQgaXNcbiAgICAgICAgICAgICAgICAvLyBjYXNlLWluc2Vuc2l0aXZlLlxuICAgICAgICAgICAgICAgIGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoSW5kZXgpO1xuICAgICAgICAgICAgICAgIGlmIChjaGFyQ29kZSA9PSAxMDEgfHwgY2hhckNvZGUgPT0gNjkpIHtcbiAgICAgICAgICAgICAgICAgIGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoKytJbmRleCk7XG4gICAgICAgICAgICAgICAgICAvLyBTa2lwIHBhc3QgdGhlIHNpZ24gZm9sbG93aW5nIHRoZSBleHBvbmVudCwgaWYgb25lIGlzXG4gICAgICAgICAgICAgICAgICAvLyBzcGVjaWZpZWQuXG4gICAgICAgICAgICAgICAgICBpZiAoY2hhckNvZGUgPT0gNDMgfHwgY2hhckNvZGUgPT0gNDUpIHtcbiAgICAgICAgICAgICAgICAgICAgSW5kZXgrKztcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIC8vIFBhcnNlIHRoZSBleHBvbmVudGlhbCBjb21wb25lbnQuXG4gICAgICAgICAgICAgICAgICBmb3IgKHBvc2l0aW9uID0gSW5kZXg7IHBvc2l0aW9uIDwgbGVuZ3RoICYmICgoY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChwb3NpdGlvbikpLCBjaGFyQ29kZSA+PSA0OCAmJiBjaGFyQ29kZSA8PSA1Nyk7IHBvc2l0aW9uKyspO1xuICAgICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uID09IEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElsbGVnYWwgZW1wdHkgZXhwb25lbnQuXG4gICAgICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBJbmRleCA9IHBvc2l0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBDb2VyY2UgdGhlIHBhcnNlZCB2YWx1ZSB0byBhIEphdmFTY3JpcHQgbnVtYmVyLlxuICAgICAgICAgICAgICAgIHJldHVybiArc291cmNlLnNsaWNlKGJlZ2luLCBJbmRleCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gQSBuZWdhdGl2ZSBzaWduIG1heSBvbmx5IHByZWNlZGUgbnVtYmVycy5cbiAgICAgICAgICAgICAgaWYgKGlzU2lnbmVkKSB7XG4gICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBgdHJ1ZWAsIGBmYWxzZWAsIGFuZCBgbnVsbGAgbGl0ZXJhbHMuXG4gICAgICAgICAgICAgIGlmIChzb3VyY2Uuc2xpY2UoSW5kZXgsIEluZGV4ICsgNCkgPT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAgICAgICBJbmRleCArPSA0O1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNvdXJjZS5zbGljZShJbmRleCwgSW5kZXggKyA1KSA9PSBcImZhbHNlXCIpIHtcbiAgICAgICAgICAgICAgICBJbmRleCArPSA1O1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChzb3VyY2Uuc2xpY2UoSW5kZXgsIEluZGV4ICsgNCkgPT0gXCJudWxsXCIpIHtcbiAgICAgICAgICAgICAgICBJbmRleCArPSA0O1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIFVucmVjb2duaXplZCB0b2tlbi5cbiAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gUmV0dXJuIHRoZSBzZW50aW5lbCBgJGAgY2hhcmFjdGVyIGlmIHRoZSBwYXJzZXIgaGFzIHJlYWNoZWQgdGhlIGVuZFxuICAgICAgICAvLyBvZiB0aGUgc291cmNlIHN0cmluZy5cbiAgICAgICAgcmV0dXJuIFwiJFwiO1xuICAgICAgfTtcblxuICAgICAgLy8gSW50ZXJuYWw6IFBhcnNlcyBhIEpTT04gYHZhbHVlYCB0b2tlbi5cbiAgICAgIHZhciBnZXQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIHJlc3VsdHMsIGhhc01lbWJlcnM7XG4gICAgICAgIGlmICh2YWx1ZSA9PSBcIiRcIikge1xuICAgICAgICAgIC8vIFVuZXhwZWN0ZWQgZW5kIG9mIGlucHV0LlxuICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgaWYgKChjaGFySW5kZXhCdWdneSA/IHZhbHVlLmNoYXJBdCgwKSA6IHZhbHVlWzBdKSA9PSBcIkBcIikge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBzZW50aW5lbCBgQGAgY2hhcmFjdGVyLlxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnNsaWNlKDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBQYXJzZSBvYmplY3QgYW5kIGFycmF5IGxpdGVyYWxzLlxuICAgICAgICAgIGlmICh2YWx1ZSA9PSBcIltcIikge1xuICAgICAgICAgICAgLy8gUGFyc2VzIGEgSlNPTiBhcnJheSwgcmV0dXJuaW5nIGEgbmV3IEphdmFTY3JpcHQgYXJyYXkuXG4gICAgICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgICAgICBmb3IgKDs7IGhhc01lbWJlcnMgfHwgKGhhc01lbWJlcnMgPSB0cnVlKSkge1xuICAgICAgICAgICAgICB2YWx1ZSA9IGxleCgpO1xuICAgICAgICAgICAgICAvLyBBIGNsb3Npbmcgc3F1YXJlIGJyYWNrZXQgbWFya3MgdGhlIGVuZCBvZiB0aGUgYXJyYXkgbGl0ZXJhbC5cbiAgICAgICAgICAgICAgaWYgKHZhbHVlID09IFwiXVwiKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gSWYgdGhlIGFycmF5IGxpdGVyYWwgY29udGFpbnMgZWxlbWVudHMsIHRoZSBjdXJyZW50IHRva2VuXG4gICAgICAgICAgICAgIC8vIHNob3VsZCBiZSBhIGNvbW1hIHNlcGFyYXRpbmcgdGhlIHByZXZpb3VzIGVsZW1lbnQgZnJvbSB0aGVcbiAgICAgICAgICAgICAgLy8gbmV4dC5cbiAgICAgICAgICAgICAgaWYgKGhhc01lbWJlcnMpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gXCIsXCIpIHtcbiAgICAgICAgICAgICAgICAgIHZhbHVlID0gbGV4KCk7XG4gICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gXCJdXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVW5leHBlY3RlZCB0cmFpbGluZyBgLGAgaW4gYXJyYXkgbGl0ZXJhbC5cbiAgICAgICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgLy8gQSBgLGAgbXVzdCBzZXBhcmF0ZSBlYWNoIGFycmF5IGVsZW1lbnQuXG4gICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBFbGlzaW9ucyBhbmQgbGVhZGluZyBjb21tYXMgYXJlIG5vdCBwZXJtaXR0ZWQuXG4gICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBcIixcIikge1xuICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGdldCh2YWx1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PSBcIntcIikge1xuICAgICAgICAgICAgLy8gUGFyc2VzIGEgSlNPTiBvYmplY3QsIHJldHVybmluZyBhIG5ldyBKYXZhU2NyaXB0IG9iamVjdC5cbiAgICAgICAgICAgIHJlc3VsdHMgPSB7fTtcbiAgICAgICAgICAgIGZvciAoOzsgaGFzTWVtYmVycyB8fCAoaGFzTWVtYmVycyA9IHRydWUpKSB7XG4gICAgICAgICAgICAgIHZhbHVlID0gbGV4KCk7XG4gICAgICAgICAgICAgIC8vIEEgY2xvc2luZyBjdXJseSBicmFjZSBtYXJrcyB0aGUgZW5kIG9mIHRoZSBvYmplY3QgbGl0ZXJhbC5cbiAgICAgICAgICAgICAgaWYgKHZhbHVlID09IFwifVwiKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gSWYgdGhlIG9iamVjdCBsaXRlcmFsIGNvbnRhaW5zIG1lbWJlcnMsIHRoZSBjdXJyZW50IHRva2VuXG4gICAgICAgICAgICAgIC8vIHNob3VsZCBiZSBhIGNvbW1hIHNlcGFyYXRvci5cbiAgICAgICAgICAgICAgaWYgKGhhc01lbWJlcnMpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gXCIsXCIpIHtcbiAgICAgICAgICAgICAgICAgIHZhbHVlID0gbGV4KCk7XG4gICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gXCJ9XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVW5leHBlY3RlZCB0cmFpbGluZyBgLGAgaW4gb2JqZWN0IGxpdGVyYWwuXG4gICAgICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIC8vIEEgYCxgIG11c3Qgc2VwYXJhdGUgZWFjaCBvYmplY3QgbWVtYmVyLlxuICAgICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gTGVhZGluZyBjb21tYXMgYXJlIG5vdCBwZXJtaXR0ZWQsIG9iamVjdCBwcm9wZXJ0eSBuYW1lcyBtdXN0IGJlXG4gICAgICAgICAgICAgIC8vIGRvdWJsZS1xdW90ZWQgc3RyaW5ncywgYW5kIGEgYDpgIG11c3Qgc2VwYXJhdGUgZWFjaCBwcm9wZXJ0eVxuICAgICAgICAgICAgICAvLyBuYW1lIGFuZCB2YWx1ZS5cbiAgICAgICAgICAgICAgaWYgKHZhbHVlID09IFwiLFwiIHx8IHR5cGVvZiB2YWx1ZSAhPSBcInN0cmluZ1wiIHx8IChjaGFySW5kZXhCdWdneSA/IHZhbHVlLmNoYXJBdCgwKSA6IHZhbHVlWzBdKSAhPSBcIkBcIiB8fCBsZXgoKSAhPSBcIjpcIikge1xuICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmVzdWx0c1t2YWx1ZS5zbGljZSgxKV0gPSBnZXQobGV4KCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIFVuZXhwZWN0ZWQgdG9rZW4gZW5jb3VudGVyZWQuXG4gICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9O1xuXG4gICAgICAvLyBJbnRlcm5hbDogVXBkYXRlcyBhIHRyYXZlcnNlZCBvYmplY3QgbWVtYmVyLlxuICAgICAgdmFyIHVwZGF0ZSA9IGZ1bmN0aW9uKHNvdXJjZSwgcHJvcGVydHksIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gd2Fsayhzb3VyY2UsIHByb3BlcnR5LCBjYWxsYmFjayk7XG4gICAgICAgIGlmIChlbGVtZW50ID09PSB1bmRlZikge1xuICAgICAgICAgIGRlbGV0ZSBzb3VyY2VbcHJvcGVydHldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNvdXJjZVtwcm9wZXJ0eV0gPSBlbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvLyBJbnRlcm5hbDogUmVjdXJzaXZlbHkgdHJhdmVyc2VzIGEgcGFyc2VkIEpTT04gb2JqZWN0LCBpbnZva2luZyB0aGVcbiAgICAgIC8vIGBjYWxsYmFja2AgZnVuY3Rpb24gZm9yIGVhY2ggdmFsdWUuIFRoaXMgaXMgYW4gaW1wbGVtZW50YXRpb24gb2YgdGhlXG4gICAgICAvLyBgV2Fsayhob2xkZXIsIG5hbWUpYCBvcGVyYXRpb24gZGVmaW5lZCBpbiBFUyA1LjEgc2VjdGlvbiAxNS4xMi4yLlxuICAgICAgdmFyIHdhbGsgPSBmdW5jdGlvbiAoc291cmNlLCBwcm9wZXJ0eSwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIHZhbHVlID0gc291cmNlW3Byb3BlcnR5XSwgbGVuZ3RoO1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09IFwib2JqZWN0XCIgJiYgdmFsdWUpIHtcbiAgICAgICAgICAvLyBgZm9yRWFjaGAgY2FuJ3QgYmUgdXNlZCB0byB0cmF2ZXJzZSBhbiBhcnJheSBpbiBPcGVyYSA8PSA4LjU0XG4gICAgICAgICAgLy8gYmVjYXVzZSBpdHMgYE9iamVjdCNoYXNPd25Qcm9wZXJ0eWAgaW1wbGVtZW50YXRpb24gcmV0dXJucyBgZmFsc2VgXG4gICAgICAgICAgLy8gZm9yIGFycmF5IGluZGljZXMgKGUuZy4sIGAhWzEsIDIsIDNdLmhhc093blByb3BlcnR5KFwiMFwiKWApLlxuICAgICAgICAgIGlmIChnZXRDbGFzcy5jYWxsKHZhbHVlKSA9PSBhcnJheUNsYXNzKSB7XG4gICAgICAgICAgICBmb3IgKGxlbmd0aCA9IHZhbHVlLmxlbmd0aDsgbGVuZ3RoLS07KSB7XG4gICAgICAgICAgICAgIHVwZGF0ZSh2YWx1ZSwgbGVuZ3RoLCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvckVhY2godmFsdWUsIGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICB1cGRhdGUodmFsdWUsIHByb3BlcnR5LCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrLmNhbGwoc291cmNlLCBwcm9wZXJ0eSwgdmFsdWUpO1xuICAgICAgfTtcblxuICAgICAgLy8gUHVibGljOiBgSlNPTi5wYXJzZWAuIFNlZSBFUyA1LjEgc2VjdGlvbiAxNS4xMi4yLlxuICAgICAgSlNPTjMucGFyc2UgPSBmdW5jdGlvbiAoc291cmNlLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgcmVzdWx0LCB2YWx1ZTtcbiAgICAgICAgSW5kZXggPSAwO1xuICAgICAgICBTb3VyY2UgPSBcIlwiICsgc291cmNlO1xuICAgICAgICByZXN1bHQgPSBnZXQobGV4KCkpO1xuICAgICAgICAvLyBJZiBhIEpTT04gc3RyaW5nIGNvbnRhaW5zIG11bHRpcGxlIHRva2VucywgaXQgaXMgaW52YWxpZC5cbiAgICAgICAgaWYgKGxleCgpICE9IFwiJFwiKSB7XG4gICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBSZXNldCB0aGUgcGFyc2VyIHN0YXRlLlxuICAgICAgICBJbmRleCA9IFNvdXJjZSA9IG51bGw7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayAmJiBnZXRDbGFzcy5jYWxsKGNhbGxiYWNrKSA9PSBmdW5jdGlvbkNsYXNzID8gd2FsaygodmFsdWUgPSB7fSwgdmFsdWVbXCJcIl0gPSByZXN1bHQsIHZhbHVlKSwgXCJcIiwgY2FsbGJhY2spIDogcmVzdWx0O1xuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICAvLyBFeHBvcnQgZm9yIGFzeW5jaHJvbm91cyBtb2R1bGUgbG9hZGVycy5cbiAgaWYgKGlzTG9hZGVyKSB7XG4gICAgZGVmaW5lKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBKU09OMztcbiAgICB9KTtcbiAgfVxufSh0aGlzKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc29ja2V0LmlvLWNsaWVudC9+L3NvY2tldC5pby1wYXJzZXIvfi9qc29uMy9saWIvanNvbjMuanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19hbWRfb3B0aW9uc19fO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS9idWlsZGluL2FtZC1vcHRpb25zLmpzXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChhcnIpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcnIpID09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjayktZGV2LXNlcnZlci9+L3NvY2tldC5pby1jbGllbnQvfi9zb2NrZXQuaW8tcGFyc2VyL34vaXNhcnJheS9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcbi8qKlxuICogRXhwb3NlIGBFbWl0dGVyYC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVtaXR0ZXI7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgRW1pdHRlcmAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBFbWl0dGVyKG9iaikge1xuICBpZiAob2JqKSByZXR1cm4gbWl4aW4ob2JqKTtcbn07XG5cbi8qKlxuICogTWl4aW4gdGhlIGVtaXR0ZXIgcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBtaXhpbihvYmopIHtcbiAgZm9yICh2YXIga2V5IGluIEVtaXR0ZXIucHJvdG90eXBlKSB7XG4gICAgb2JqW2tleV0gPSBFbWl0dGVyLnByb3RvdHlwZVtrZXldO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogTGlzdGVuIG9uIHRoZSBnaXZlbiBgZXZlbnRgIHdpdGggYGZuYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5vbiA9XG5FbWl0dGVyLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICAodGhpcy5fY2FsbGJhY2tzW2V2ZW50XSA9IHRoaXMuX2NhbGxiYWNrc1tldmVudF0gfHwgW10pXG4gICAgLnB1c2goZm4pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWRkcyBhbiBgZXZlbnRgIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBpbnZva2VkIGEgc2luZ2xlXG4gKiB0aW1lIHRoZW4gYXV0b21hdGljYWxseSByZW1vdmVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbihldmVudCwgZm4pe1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcblxuICBmdW5jdGlvbiBvbigpIHtcbiAgICBzZWxmLm9mZihldmVudCwgb24pO1xuICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBvbi5mbiA9IGZuO1xuICB0aGlzLm9uKGV2ZW50LCBvbik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgdGhlIGdpdmVuIGNhbGxiYWNrIGZvciBgZXZlbnRgIG9yIGFsbFxuICogcmVnaXN0ZXJlZCBjYWxsYmFja3MuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUub2ZmID1cbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuXG4gIC8vIGFsbFxuICBpZiAoMCA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgdGhpcy5fY2FsbGJhY2tzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBzcGVjaWZpYyBldmVudFxuICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcbiAgaWYgKCFjYWxsYmFja3MpIHJldHVybiB0aGlzO1xuXG4gIC8vIHJlbW92ZSBhbGwgaGFuZGxlcnNcbiAgaWYgKDEgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gcmVtb3ZlIHNwZWNpZmljIGhhbmRsZXJcbiAgdmFyIGNiO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuICAgIGNiID0gY2FsbGJhY2tzW2ldO1xuICAgIGlmIChjYiA9PT0gZm4gfHwgY2IuZm4gPT09IGZuKSB7XG4gICAgICBjYWxsYmFja3Muc3BsaWNlKGksIDEpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBFbWl0IGBldmVudGAgd2l0aCB0aGUgZ2l2ZW4gYXJncy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7TWl4ZWR9IC4uLlxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24oZXZlbnQpe1xuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG4gIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG4gICAgLCBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdO1xuXG4gIGlmIChjYWxsYmFja3MpIHtcbiAgICBjYWxsYmFja3MgPSBjYWxsYmFja3Muc2xpY2UoMCk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNhbGxiYWNrcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgY2FsbGJhY2tzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYXJyYXkgb2YgY2FsbGJhY2tzIGZvciBgZXZlbnRgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHJldHVybiB7QXJyYXl9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICByZXR1cm4gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XSB8fCBbXTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhpcyBlbWl0dGVyIGhhcyBgZXZlbnRgIGhhbmRsZXJzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUuaGFzTGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe1xuICByZXR1cm4gISEgdGhpcy5saXN0ZW5lcnMoZXZlbnQpLmxlbmd0aDtcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc29ja2V0LmlvLWNsaWVudC9+L2NvbXBvbmVudC1lbWl0dGVyL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qZ2xvYmFsIEJsb2IsRmlsZSovXG5cbi8qKlxuICogTW9kdWxlIHJlcXVpcmVtZW50c1xuICovXG5cbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnaXNhcnJheScpO1xudmFyIGlzQnVmID0gcmVxdWlyZSgnLi9pcy1idWZmZXInKTtcblxuLyoqXG4gKiBSZXBsYWNlcyBldmVyeSBCdWZmZXIgfCBBcnJheUJ1ZmZlciBpbiBwYWNrZXQgd2l0aCBhIG51bWJlcmVkIHBsYWNlaG9sZGVyLlxuICogQW55dGhpbmcgd2l0aCBibG9icyBvciBmaWxlcyBzaG91bGQgYmUgZmVkIHRocm91Z2ggcmVtb3ZlQmxvYnMgYmVmb3JlIGNvbWluZ1xuICogaGVyZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0IC0gc29ja2V0LmlvIGV2ZW50IHBhY2tldFxuICogQHJldHVybiB7T2JqZWN0fSB3aXRoIGRlY29uc3RydWN0ZWQgcGFja2V0IGFuZCBsaXN0IG9mIGJ1ZmZlcnNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5kZWNvbnN0cnVjdFBhY2tldCA9IGZ1bmN0aW9uKHBhY2tldCl7XG4gIHZhciBidWZmZXJzID0gW107XG4gIHZhciBwYWNrZXREYXRhID0gcGFja2V0LmRhdGE7XG5cbiAgZnVuY3Rpb24gX2RlY29uc3RydWN0UGFja2V0KGRhdGEpIHtcbiAgICBpZiAoIWRhdGEpIHJldHVybiBkYXRhO1xuXG4gICAgaWYgKGlzQnVmKGRhdGEpKSB7XG4gICAgICB2YXIgcGxhY2Vob2xkZXIgPSB7IF9wbGFjZWhvbGRlcjogdHJ1ZSwgbnVtOiBidWZmZXJzLmxlbmd0aCB9O1xuICAgICAgYnVmZmVycy5wdXNoKGRhdGEpO1xuICAgICAgcmV0dXJuIHBsYWNlaG9sZGVyO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheShkYXRhKSkge1xuICAgICAgdmFyIG5ld0RhdGEgPSBuZXcgQXJyYXkoZGF0YS5sZW5ndGgpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG5ld0RhdGFbaV0gPSBfZGVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtpXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3RGF0YTtcbiAgICB9IGVsc2UgaWYgKCdvYmplY3QnID09IHR5cGVvZiBkYXRhICYmICEoZGF0YSBpbnN0YW5jZW9mIERhdGUpKSB7XG4gICAgICB2YXIgbmV3RGF0YSA9IHt9O1xuICAgICAgZm9yICh2YXIga2V5IGluIGRhdGEpIHtcbiAgICAgICAgbmV3RGF0YVtrZXldID0gX2RlY29uc3RydWN0UGFja2V0KGRhdGFba2V5XSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3RGF0YTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICB2YXIgcGFjayA9IHBhY2tldDtcbiAgcGFjay5kYXRhID0gX2RlY29uc3RydWN0UGFja2V0KHBhY2tldERhdGEpO1xuICBwYWNrLmF0dGFjaG1lbnRzID0gYnVmZmVycy5sZW5ndGg7IC8vIG51bWJlciBvZiBiaW5hcnkgJ2F0dGFjaG1lbnRzJ1xuICByZXR1cm4ge3BhY2tldDogcGFjaywgYnVmZmVyczogYnVmZmVyc307XG59O1xuXG4vKipcbiAqIFJlY29uc3RydWN0cyBhIGJpbmFyeSBwYWNrZXQgZnJvbSBpdHMgcGxhY2Vob2xkZXIgcGFja2V0IGFuZCBidWZmZXJzXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldCAtIGV2ZW50IHBhY2tldCB3aXRoIHBsYWNlaG9sZGVyc1xuICogQHBhcmFtIHtBcnJheX0gYnVmZmVycyAtIGJpbmFyeSBidWZmZXJzIHRvIHB1dCBpbiBwbGFjZWhvbGRlciBwb3NpdGlvbnNcbiAqIEByZXR1cm4ge09iamVjdH0gcmVjb25zdHJ1Y3RlZCBwYWNrZXRcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5yZWNvbnN0cnVjdFBhY2tldCA9IGZ1bmN0aW9uKHBhY2tldCwgYnVmZmVycykge1xuICB2YXIgY3VyUGxhY2VIb2xkZXIgPSAwO1xuXG4gIGZ1bmN0aW9uIF9yZWNvbnN0cnVjdFBhY2tldChkYXRhKSB7XG4gICAgaWYgKGRhdGEgJiYgZGF0YS5fcGxhY2Vob2xkZXIpIHtcbiAgICAgIHZhciBidWYgPSBidWZmZXJzW2RhdGEubnVtXTsgLy8gYXBwcm9wcmlhdGUgYnVmZmVyIChzaG91bGQgYmUgbmF0dXJhbCBvcmRlciBhbnl3YXkpXG4gICAgICByZXR1cm4gYnVmO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheShkYXRhKSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGRhdGFbaV0gPSBfcmVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtpXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9IGVsc2UgaWYgKGRhdGEgJiYgJ29iamVjdCcgPT0gdHlwZW9mIGRhdGEpIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiBkYXRhKSB7XG4gICAgICAgIGRhdGFba2V5XSA9IF9yZWNvbnN0cnVjdFBhY2tldChkYXRhW2tleV0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgcGFja2V0LmRhdGEgPSBfcmVjb25zdHJ1Y3RQYWNrZXQocGFja2V0LmRhdGEpO1xuICBwYWNrZXQuYXR0YWNobWVudHMgPSB1bmRlZmluZWQ7IC8vIG5vIGxvbmdlciB1c2VmdWxcbiAgcmV0dXJuIHBhY2tldDtcbn07XG5cbi8qKlxuICogQXN5bmNocm9ub3VzbHkgcmVtb3ZlcyBCbG9icyBvciBGaWxlcyBmcm9tIGRhdGEgdmlhXG4gKiBGaWxlUmVhZGVyJ3MgcmVhZEFzQXJyYXlCdWZmZXIgbWV0aG9kLiBVc2VkIGJlZm9yZSBlbmNvZGluZ1xuICogZGF0YSBhcyBtc2dwYWNrLiBDYWxscyBjYWxsYmFjayB3aXRoIHRoZSBibG9ibGVzcyBkYXRhLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5yZW1vdmVCbG9icyA9IGZ1bmN0aW9uKGRhdGEsIGNhbGxiYWNrKSB7XG4gIGZ1bmN0aW9uIF9yZW1vdmVCbG9icyhvYmosIGN1cktleSwgY29udGFpbmluZ09iamVjdCkge1xuICAgIGlmICghb2JqKSByZXR1cm4gb2JqO1xuXG4gICAgLy8gY29udmVydCBhbnkgYmxvYlxuICAgIGlmICgoZ2xvYmFsLkJsb2IgJiYgb2JqIGluc3RhbmNlb2YgQmxvYikgfHxcbiAgICAgICAgKGdsb2JhbC5GaWxlICYmIG9iaiBpbnN0YW5jZW9mIEZpbGUpKSB7XG4gICAgICBwZW5kaW5nQmxvYnMrKztcblxuICAgICAgLy8gYXN5bmMgZmlsZXJlYWRlclxuICAgICAgdmFyIGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgZmlsZVJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbigpIHsgLy8gdGhpcy5yZXN1bHQgPT0gYXJyYXlidWZmZXJcbiAgICAgICAgaWYgKGNvbnRhaW5pbmdPYmplY3QpIHtcbiAgICAgICAgICBjb250YWluaW5nT2JqZWN0W2N1cktleV0gPSB0aGlzLnJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBibG9ibGVzc0RhdGEgPSB0aGlzLnJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIG5vdGhpbmcgcGVuZGluZyBpdHMgY2FsbGJhY2sgdGltZVxuICAgICAgICBpZighIC0tcGVuZGluZ0Jsb2JzKSB7XG4gICAgICAgICAgY2FsbGJhY2soYmxvYmxlc3NEYXRhKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgZmlsZVJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihvYmopOyAvLyBibG9iIC0+IGFycmF5YnVmZmVyXG4gICAgfSBlbHNlIGlmIChpc0FycmF5KG9iaikpIHsgLy8gaGFuZGxlIGFycmF5XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xuICAgICAgICBfcmVtb3ZlQmxvYnMob2JqW2ldLCBpLCBvYmopO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob2JqICYmICdvYmplY3QnID09IHR5cGVvZiBvYmogJiYgIWlzQnVmKG9iaikpIHsgLy8gYW5kIG9iamVjdFxuICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICBfcmVtb3ZlQmxvYnMob2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgcGVuZGluZ0Jsb2JzID0gMDtcbiAgdmFyIGJsb2JsZXNzRGF0YSA9IGRhdGE7XG4gIF9yZW1vdmVCbG9icyhibG9ibGVzc0RhdGEpO1xuICBpZiAoIXBlbmRpbmdCbG9icykge1xuICAgIGNhbGxiYWNrKGJsb2JsZXNzRGF0YSk7XG4gIH1cbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc29ja2V0LmlvLWNsaWVudC9+L3NvY2tldC5pby1wYXJzZXIvYmluYXJ5LmpzXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlxubW9kdWxlLmV4cG9ydHMgPSBpc0J1ZjtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgb2JqIGlzIGEgYnVmZmVyIG9yIGFuIGFycmF5YnVmZmVyLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGlzQnVmKG9iaikge1xuICByZXR1cm4gKGdsb2JhbC5CdWZmZXIgJiYgZ2xvYmFsLkJ1ZmZlci5pc0J1ZmZlcihvYmopKSB8fFxuICAgICAgICAgKGdsb2JhbC5BcnJheUJ1ZmZlciAmJiBvYmogaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcik7XG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc29ja2V0LmlvLWNsaWVudC9+L3NvY2tldC5pby1wYXJzZXIvaXMtYnVmZmVyLmpzXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlxuLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciB1cmwgPSByZXF1aXJlKCcuL3VybCcpO1xudmFyIGVpbyA9IHJlcXVpcmUoJ2VuZ2luZS5pby1jbGllbnQnKTtcbnZhciBTb2NrZXQgPSByZXF1aXJlKCcuL3NvY2tldCcpO1xudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCdjb21wb25lbnQtZW1pdHRlcicpO1xudmFyIHBhcnNlciA9IHJlcXVpcmUoJ3NvY2tldC5pby1wYXJzZXInKTtcbnZhciBvbiA9IHJlcXVpcmUoJy4vb24nKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnY29tcG9uZW50LWJpbmQnKTtcbnZhciBvYmplY3QgPSByZXF1aXJlKCdvYmplY3QtY29tcG9uZW50Jyk7XG52YXIgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzb2NrZXQuaW8tY2xpZW50Om1hbmFnZXInKTtcbnZhciBpbmRleE9mID0gcmVxdWlyZSgnaW5kZXhvZicpO1xudmFyIEJhY2tvZmYgPSByZXF1aXJlKCdiYWNrbzInKTtcblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0c1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gTWFuYWdlcjtcblxuLyoqXG4gKiBgTWFuYWdlcmAgY29uc3RydWN0b3IuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGVuZ2luZSBpbnN0YW5jZSBvciBlbmdpbmUgdXJpL29wdHNcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIE1hbmFnZXIodXJpLCBvcHRzKXtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIE1hbmFnZXIpKSByZXR1cm4gbmV3IE1hbmFnZXIodXJpLCBvcHRzKTtcbiAgaWYgKHVyaSAmJiAoJ29iamVjdCcgPT0gdHlwZW9mIHVyaSkpIHtcbiAgICBvcHRzID0gdXJpO1xuICAgIHVyaSA9IHVuZGVmaW5lZDtcbiAgfVxuICBvcHRzID0gb3B0cyB8fCB7fTtcblxuICBvcHRzLnBhdGggPSBvcHRzLnBhdGggfHwgJy9zb2NrZXQuaW8nO1xuICB0aGlzLm5zcHMgPSB7fTtcbiAgdGhpcy5zdWJzID0gW107XG4gIHRoaXMub3B0cyA9IG9wdHM7XG4gIHRoaXMucmVjb25uZWN0aW9uKG9wdHMucmVjb25uZWN0aW9uICE9PSBmYWxzZSk7XG4gIHRoaXMucmVjb25uZWN0aW9uQXR0ZW1wdHMob3B0cy5yZWNvbm5lY3Rpb25BdHRlbXB0cyB8fCBJbmZpbml0eSk7XG4gIHRoaXMucmVjb25uZWN0aW9uRGVsYXkob3B0cy5yZWNvbm5lY3Rpb25EZWxheSB8fCAxMDAwKTtcbiAgdGhpcy5yZWNvbm5lY3Rpb25EZWxheU1heChvcHRzLnJlY29ubmVjdGlvbkRlbGF5TWF4IHx8IDUwMDApO1xuICB0aGlzLnJhbmRvbWl6YXRpb25GYWN0b3Iob3B0cy5yYW5kb21pemF0aW9uRmFjdG9yIHx8IDAuNSk7XG4gIHRoaXMuYmFja29mZiA9IG5ldyBCYWNrb2ZmKHtcbiAgICBtaW46IHRoaXMucmVjb25uZWN0aW9uRGVsYXkoKSxcbiAgICBtYXg6IHRoaXMucmVjb25uZWN0aW9uRGVsYXlNYXgoKSxcbiAgICBqaXR0ZXI6IHRoaXMucmFuZG9taXphdGlvbkZhY3RvcigpXG4gIH0pO1xuICB0aGlzLnRpbWVvdXQobnVsbCA9PSBvcHRzLnRpbWVvdXQgPyAyMDAwMCA6IG9wdHMudGltZW91dCk7XG4gIHRoaXMucmVhZHlTdGF0ZSA9ICdjbG9zZWQnO1xuICB0aGlzLnVyaSA9IHVyaTtcbiAgdGhpcy5jb25uZWN0ZWQgPSBbXTtcbiAgdGhpcy5lbmNvZGluZyA9IGZhbHNlO1xuICB0aGlzLnBhY2tldEJ1ZmZlciA9IFtdO1xuICB0aGlzLmVuY29kZXIgPSBuZXcgcGFyc2VyLkVuY29kZXIoKTtcbiAgdGhpcy5kZWNvZGVyID0gbmV3IHBhcnNlci5EZWNvZGVyKCk7XG4gIHRoaXMuYXV0b0Nvbm5lY3QgPSBvcHRzLmF1dG9Db25uZWN0ICE9PSBmYWxzZTtcbiAgaWYgKHRoaXMuYXV0b0Nvbm5lY3QpIHRoaXMub3BlbigpO1xufVxuXG4vKipcbiAqIFByb3BhZ2F0ZSBnaXZlbiBldmVudCB0byBzb2NrZXRzIGFuZCBlbWl0IG9uIGB0aGlzYFxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLmVtaXRBbGwgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5lbWl0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIGZvciAodmFyIG5zcCBpbiB0aGlzLm5zcHMpIHtcbiAgICB0aGlzLm5zcHNbbnNwXS5lbWl0LmFwcGx5KHRoaXMubnNwc1tuc3BdLCBhcmd1bWVudHMpO1xuICB9XG59O1xuXG4vKipcbiAqIFVwZGF0ZSBgc29ja2V0LmlkYCBvZiBhbGwgc29ja2V0c1xuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLnVwZGF0ZVNvY2tldElkcyA9IGZ1bmN0aW9uKCl7XG4gIGZvciAodmFyIG5zcCBpbiB0aGlzLm5zcHMpIHtcbiAgICB0aGlzLm5zcHNbbnNwXS5pZCA9IHRoaXMuZW5naW5lLmlkO1xuICB9XG59O1xuXG4vKipcbiAqIE1peCBpbiBgRW1pdHRlcmAuXG4gKi9cblxuRW1pdHRlcihNYW5hZ2VyLnByb3RvdHlwZSk7XG5cbi8qKlxuICogU2V0cyB0aGUgYHJlY29ubmVjdGlvbmAgY29uZmlnLlxuICpcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdHJ1ZS9mYWxzZSBpZiBpdCBzaG91bGQgYXV0b21hdGljYWxseSByZWNvbm5lY3RcbiAqIEByZXR1cm4ge01hbmFnZXJ9IHNlbGYgb3IgdmFsdWVcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUucmVjb25uZWN0aW9uID0gZnVuY3Rpb24odil7XG4gIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRoaXMuX3JlY29ubmVjdGlvbjtcbiAgdGhpcy5fcmVjb25uZWN0aW9uID0gISF2O1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgcmVjb25uZWN0aW9uIGF0dGVtcHRzIGNvbmZpZy5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbWF4IHJlY29ubmVjdGlvbiBhdHRlbXB0cyBiZWZvcmUgZ2l2aW5nIHVwXG4gKiBAcmV0dXJuIHtNYW5hZ2VyfSBzZWxmIG9yIHZhbHVlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLnJlY29ubmVjdGlvbkF0dGVtcHRzID0gZnVuY3Rpb24odil7XG4gIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRoaXMuX3JlY29ubmVjdGlvbkF0dGVtcHRzO1xuICB0aGlzLl9yZWNvbm5lY3Rpb25BdHRlbXB0cyA9IHY7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBkZWxheSBiZXR3ZWVuIHJlY29ubmVjdGlvbnMuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGRlbGF5XG4gKiBAcmV0dXJuIHtNYW5hZ2VyfSBzZWxmIG9yIHZhbHVlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLnJlY29ubmVjdGlvbkRlbGF5ID0gZnVuY3Rpb24odil7XG4gIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRoaXMuX3JlY29ubmVjdGlvbkRlbGF5O1xuICB0aGlzLl9yZWNvbm5lY3Rpb25EZWxheSA9IHY7XG4gIHRoaXMuYmFja29mZiAmJiB0aGlzLmJhY2tvZmYuc2V0TWluKHYpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbk1hbmFnZXIucHJvdG90eXBlLnJhbmRvbWl6YXRpb25GYWN0b3IgPSBmdW5jdGlvbih2KXtcbiAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGhpcy5fcmFuZG9taXphdGlvbkZhY3RvcjtcbiAgdGhpcy5fcmFuZG9taXphdGlvbkZhY3RvciA9IHY7XG4gIHRoaXMuYmFja29mZiAmJiB0aGlzLmJhY2tvZmYuc2V0Sml0dGVyKHYpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgbWF4aW11bSBkZWxheSBiZXR3ZWVuIHJlY29ubmVjdGlvbnMuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGRlbGF5XG4gKiBAcmV0dXJuIHtNYW5hZ2VyfSBzZWxmIG9yIHZhbHVlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLnJlY29ubmVjdGlvbkRlbGF5TWF4ID0gZnVuY3Rpb24odil7XG4gIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRoaXMuX3JlY29ubmVjdGlvbkRlbGF5TWF4O1xuICB0aGlzLl9yZWNvbm5lY3Rpb25EZWxheU1heCA9IHY7XG4gIHRoaXMuYmFja29mZiAmJiB0aGlzLmJhY2tvZmYuc2V0TWF4KHYpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgY29ubmVjdGlvbiB0aW1lb3V0LiBgZmFsc2VgIHRvIGRpc2FibGVcbiAqXG4gKiBAcmV0dXJuIHtNYW5hZ2VyfSBzZWxmIG9yIHZhbHVlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLnRpbWVvdXQgPSBmdW5jdGlvbih2KXtcbiAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGhpcy5fdGltZW91dDtcbiAgdGhpcy5fdGltZW91dCA9IHY7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTdGFydHMgdHJ5aW5nIHRvIHJlY29ubmVjdCBpZiByZWNvbm5lY3Rpb24gaXMgZW5hYmxlZCBhbmQgd2UgaGF2ZSBub3RcbiAqIHN0YXJ0ZWQgcmVjb25uZWN0aW5nIHlldFxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLm1heWJlUmVjb25uZWN0T25PcGVuID0gZnVuY3Rpb24oKSB7XG4gIC8vIE9ubHkgdHJ5IHRvIHJlY29ubmVjdCBpZiBpdCdzIHRoZSBmaXJzdCB0aW1lIHdlJ3JlIGNvbm5lY3RpbmdcbiAgaWYgKCF0aGlzLnJlY29ubmVjdGluZyAmJiB0aGlzLl9yZWNvbm5lY3Rpb24gJiYgdGhpcy5iYWNrb2ZmLmF0dGVtcHRzID09PSAwKSB7XG4gICAgLy8ga2VlcHMgcmVjb25uZWN0aW9uIGZyb20gZmlyaW5nIHR3aWNlIGZvciB0aGUgc2FtZSByZWNvbm5lY3Rpb24gbG9vcFxuICAgIHRoaXMucmVjb25uZWN0KCk7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBTZXRzIHRoZSBjdXJyZW50IHRyYW5zcG9ydCBgc29ja2V0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25hbCwgY2FsbGJhY2tcbiAqIEByZXR1cm4ge01hbmFnZXJ9IHNlbGZcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUub3BlbiA9XG5NYW5hZ2VyLnByb3RvdHlwZS5jb25uZWN0ID0gZnVuY3Rpb24oZm4pe1xuICBkZWJ1ZygncmVhZHlTdGF0ZSAlcycsIHRoaXMucmVhZHlTdGF0ZSk7XG4gIGlmICh+dGhpcy5yZWFkeVN0YXRlLmluZGV4T2YoJ29wZW4nKSkgcmV0dXJuIHRoaXM7XG5cbiAgZGVidWcoJ29wZW5pbmcgJXMnLCB0aGlzLnVyaSk7XG4gIHRoaXMuZW5naW5lID0gZWlvKHRoaXMudXJpLCB0aGlzLm9wdHMpO1xuICB2YXIgc29ja2V0ID0gdGhpcy5lbmdpbmU7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdGhpcy5yZWFkeVN0YXRlID0gJ29wZW5pbmcnO1xuICB0aGlzLnNraXBSZWNvbm5lY3QgPSBmYWxzZTtcblxuICAvLyBlbWl0IGBvcGVuYFxuICB2YXIgb3BlblN1YiA9IG9uKHNvY2tldCwgJ29wZW4nLCBmdW5jdGlvbigpIHtcbiAgICBzZWxmLm9ub3BlbigpO1xuICAgIGZuICYmIGZuKCk7XG4gIH0pO1xuXG4gIC8vIGVtaXQgYGNvbm5lY3RfZXJyb3JgXG4gIHZhciBlcnJvclN1YiA9IG9uKHNvY2tldCwgJ2Vycm9yJywgZnVuY3Rpb24oZGF0YSl7XG4gICAgZGVidWcoJ2Nvbm5lY3RfZXJyb3InKTtcbiAgICBzZWxmLmNsZWFudXAoKTtcbiAgICBzZWxmLnJlYWR5U3RhdGUgPSAnY2xvc2VkJztcbiAgICBzZWxmLmVtaXRBbGwoJ2Nvbm5lY3RfZXJyb3InLCBkYXRhKTtcbiAgICBpZiAoZm4pIHtcbiAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ0Nvbm5lY3Rpb24gZXJyb3InKTtcbiAgICAgIGVyci5kYXRhID0gZGF0YTtcbiAgICAgIGZuKGVycik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE9ubHkgZG8gdGhpcyBpZiB0aGVyZSBpcyBubyBmbiB0byBoYW5kbGUgdGhlIGVycm9yXG4gICAgICBzZWxmLm1heWJlUmVjb25uZWN0T25PcGVuKCk7XG4gICAgfVxuICB9KTtcblxuICAvLyBlbWl0IGBjb25uZWN0X3RpbWVvdXRgXG4gIGlmIChmYWxzZSAhPT0gdGhpcy5fdGltZW91dCkge1xuICAgIHZhciB0aW1lb3V0ID0gdGhpcy5fdGltZW91dDtcbiAgICBkZWJ1ZygnY29ubmVjdCBhdHRlbXB0IHdpbGwgdGltZW91dCBhZnRlciAlZCcsIHRpbWVvdXQpO1xuXG4gICAgLy8gc2V0IHRpbWVyXG4gICAgdmFyIHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgZGVidWcoJ2Nvbm5lY3QgYXR0ZW1wdCB0aW1lZCBvdXQgYWZ0ZXIgJWQnLCB0aW1lb3V0KTtcbiAgICAgIG9wZW5TdWIuZGVzdHJveSgpO1xuICAgICAgc29ja2V0LmNsb3NlKCk7XG4gICAgICBzb2NrZXQuZW1pdCgnZXJyb3InLCAndGltZW91dCcpO1xuICAgICAgc2VsZi5lbWl0QWxsKCdjb25uZWN0X3RpbWVvdXQnLCB0aW1lb3V0KTtcbiAgICB9LCB0aW1lb3V0KTtcblxuICAgIHRoaXMuc3Vicy5wdXNoKHtcbiAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCl7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICB0aGlzLnN1YnMucHVzaChvcGVuU3ViKTtcbiAgdGhpcy5zdWJzLnB1c2goZXJyb3JTdWIpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiB0cmFuc3BvcnQgb3Blbi5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5vbm9wZW4gPSBmdW5jdGlvbigpe1xuICBkZWJ1Zygnb3BlbicpO1xuXG4gIC8vIGNsZWFyIG9sZCBzdWJzXG4gIHRoaXMuY2xlYW51cCgpO1xuXG4gIC8vIG1hcmsgYXMgb3BlblxuICB0aGlzLnJlYWR5U3RhdGUgPSAnb3Blbic7XG4gIHRoaXMuZW1pdCgnb3BlbicpO1xuXG4gIC8vIGFkZCBuZXcgc3Vic1xuICB2YXIgc29ja2V0ID0gdGhpcy5lbmdpbmU7XG4gIHRoaXMuc3Vicy5wdXNoKG9uKHNvY2tldCwgJ2RhdGEnLCBiaW5kKHRoaXMsICdvbmRhdGEnKSkpO1xuICB0aGlzLnN1YnMucHVzaChvbih0aGlzLmRlY29kZXIsICdkZWNvZGVkJywgYmluZCh0aGlzLCAnb25kZWNvZGVkJykpKTtcbiAgdGhpcy5zdWJzLnB1c2gob24oc29ja2V0LCAnZXJyb3InLCBiaW5kKHRoaXMsICdvbmVycm9yJykpKTtcbiAgdGhpcy5zdWJzLnB1c2gob24oc29ja2V0LCAnY2xvc2UnLCBiaW5kKHRoaXMsICdvbmNsb3NlJykpKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHdpdGggZGF0YS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5vbmRhdGEgPSBmdW5jdGlvbihkYXRhKXtcbiAgdGhpcy5kZWNvZGVyLmFkZChkYXRhKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHdoZW4gcGFyc2VyIGZ1bGx5IGRlY29kZXMgYSBwYWNrZXQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUub25kZWNvZGVkID0gZnVuY3Rpb24ocGFja2V0KSB7XG4gIHRoaXMuZW1pdCgncGFja2V0JywgcGFja2V0KTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gc29ja2V0IGVycm9yLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLm9uZXJyb3IgPSBmdW5jdGlvbihlcnIpe1xuICBkZWJ1ZygnZXJyb3InLCBlcnIpO1xuICB0aGlzLmVtaXRBbGwoJ2Vycm9yJywgZXJyKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBzb2NrZXQgZm9yIHRoZSBnaXZlbiBgbnNwYC5cbiAqXG4gKiBAcmV0dXJuIHtTb2NrZXR9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLnNvY2tldCA9IGZ1bmN0aW9uKG5zcCl7XG4gIHZhciBzb2NrZXQgPSB0aGlzLm5zcHNbbnNwXTtcbiAgaWYgKCFzb2NrZXQpIHtcbiAgICBzb2NrZXQgPSBuZXcgU29ja2V0KHRoaXMsIG5zcCk7XG4gICAgdGhpcy5uc3BzW25zcF0gPSBzb2NrZXQ7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHNvY2tldC5vbignY29ubmVjdCcsIGZ1bmN0aW9uKCl7XG4gICAgICBzb2NrZXQuaWQgPSBzZWxmLmVuZ2luZS5pZDtcbiAgICAgIGlmICghfmluZGV4T2Yoc2VsZi5jb25uZWN0ZWQsIHNvY2tldCkpIHtcbiAgICAgICAgc2VsZi5jb25uZWN0ZWQucHVzaChzb2NrZXQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHJldHVybiBzb2NrZXQ7XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIGEgc29ja2V0IGNsb3NlLlxuICpcbiAqIEBwYXJhbSB7U29ja2V0fSBzb2NrZXRcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oc29ja2V0KXtcbiAgdmFyIGluZGV4ID0gaW5kZXhPZih0aGlzLmNvbm5lY3RlZCwgc29ja2V0KTtcbiAgaWYgKH5pbmRleCkgdGhpcy5jb25uZWN0ZWQuc3BsaWNlKGluZGV4LCAxKTtcbiAgaWYgKHRoaXMuY29ubmVjdGVkLmxlbmd0aCkgcmV0dXJuO1xuXG4gIHRoaXMuY2xvc2UoKTtcbn07XG5cbi8qKlxuICogV3JpdGVzIGEgcGFja2V0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLnBhY2tldCA9IGZ1bmN0aW9uKHBhY2tldCl7XG4gIGRlYnVnKCd3cml0aW5nIHBhY2tldCAlaicsIHBhY2tldCk7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICBpZiAoIXNlbGYuZW5jb2RpbmcpIHtcbiAgICAvLyBlbmNvZGUsIHRoZW4gd3JpdGUgdG8gZW5naW5lIHdpdGggcmVzdWx0XG4gICAgc2VsZi5lbmNvZGluZyA9IHRydWU7XG4gICAgdGhpcy5lbmNvZGVyLmVuY29kZShwYWNrZXQsIGZ1bmN0aW9uKGVuY29kZWRQYWNrZXRzKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVuY29kZWRQYWNrZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHNlbGYuZW5naW5lLndyaXRlKGVuY29kZWRQYWNrZXRzW2ldKTtcbiAgICAgIH1cbiAgICAgIHNlbGYuZW5jb2RpbmcgPSBmYWxzZTtcbiAgICAgIHNlbGYucHJvY2Vzc1BhY2tldFF1ZXVlKCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7IC8vIGFkZCBwYWNrZXQgdG8gdGhlIHF1ZXVlXG4gICAgc2VsZi5wYWNrZXRCdWZmZXIucHVzaChwYWNrZXQpO1xuICB9XG59O1xuXG4vKipcbiAqIElmIHBhY2tldCBidWZmZXIgaXMgbm9uLWVtcHR5LCBiZWdpbnMgZW5jb2RpbmcgdGhlXG4gKiBuZXh0IHBhY2tldCBpbiBsaW5lLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLnByb2Nlc3NQYWNrZXRRdWV1ZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5wYWNrZXRCdWZmZXIubGVuZ3RoID4gMCAmJiAhdGhpcy5lbmNvZGluZykge1xuICAgIHZhciBwYWNrID0gdGhpcy5wYWNrZXRCdWZmZXIuc2hpZnQoKTtcbiAgICB0aGlzLnBhY2tldChwYWNrKTtcbiAgfVxufTtcblxuLyoqXG4gKiBDbGVhbiB1cCB0cmFuc3BvcnQgc3Vic2NyaXB0aW9ucyBhbmQgcGFja2V0IGJ1ZmZlci5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5jbGVhbnVwID0gZnVuY3Rpb24oKXtcbiAgdmFyIHN1YjtcbiAgd2hpbGUgKHN1YiA9IHRoaXMuc3Vicy5zaGlmdCgpKSBzdWIuZGVzdHJveSgpO1xuXG4gIHRoaXMucGFja2V0QnVmZmVyID0gW107XG4gIHRoaXMuZW5jb2RpbmcgPSBmYWxzZTtcblxuICB0aGlzLmRlY29kZXIuZGVzdHJveSgpO1xufTtcblxuLyoqXG4gKiBDbG9zZSB0aGUgY3VycmVudCBzb2NrZXQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUuY2xvc2UgPVxuTWFuYWdlci5wcm90b3R5cGUuZGlzY29ubmVjdCA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMuc2tpcFJlY29ubmVjdCA9IHRydWU7XG4gIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICB0aGlzLnJlYWR5U3RhdGUgPSAnY2xvc2VkJztcbiAgdGhpcy5lbmdpbmUgJiYgdGhpcy5lbmdpbmUuY2xvc2UoKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gZW5naW5lIGNsb3NlLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLm9uY2xvc2UgPSBmdW5jdGlvbihyZWFzb24pe1xuICBkZWJ1ZygnY2xvc2UnKTtcbiAgdGhpcy5jbGVhbnVwKCk7XG4gIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICB0aGlzLnJlYWR5U3RhdGUgPSAnY2xvc2VkJztcbiAgdGhpcy5lbWl0KCdjbG9zZScsIHJlYXNvbik7XG4gIGlmICh0aGlzLl9yZWNvbm5lY3Rpb24gJiYgIXRoaXMuc2tpcFJlY29ubmVjdCkge1xuICAgIHRoaXMucmVjb25uZWN0KCk7XG4gIH1cbn07XG5cbi8qKlxuICogQXR0ZW1wdCBhIHJlY29ubmVjdGlvbi5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5yZWNvbm5lY3QgPSBmdW5jdGlvbigpe1xuICBpZiAodGhpcy5yZWNvbm5lY3RpbmcgfHwgdGhpcy5za2lwUmVjb25uZWN0KSByZXR1cm4gdGhpcztcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgaWYgKHRoaXMuYmFja29mZi5hdHRlbXB0cyA+PSB0aGlzLl9yZWNvbm5lY3Rpb25BdHRlbXB0cykge1xuICAgIGRlYnVnKCdyZWNvbm5lY3QgZmFpbGVkJyk7XG4gICAgdGhpcy5iYWNrb2ZmLnJlc2V0KCk7XG4gICAgdGhpcy5lbWl0QWxsKCdyZWNvbm5lY3RfZmFpbGVkJyk7XG4gICAgdGhpcy5yZWNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgZGVsYXkgPSB0aGlzLmJhY2tvZmYuZHVyYXRpb24oKTtcbiAgICBkZWJ1Zygnd2lsbCB3YWl0ICVkbXMgYmVmb3JlIHJlY29ubmVjdCBhdHRlbXB0JywgZGVsYXkpO1xuXG4gICAgdGhpcy5yZWNvbm5lY3RpbmcgPSB0cnVlO1xuICAgIHZhciB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIGlmIChzZWxmLnNraXBSZWNvbm5lY3QpIHJldHVybjtcblxuICAgICAgZGVidWcoJ2F0dGVtcHRpbmcgcmVjb25uZWN0Jyk7XG4gICAgICBzZWxmLmVtaXRBbGwoJ3JlY29ubmVjdF9hdHRlbXB0Jywgc2VsZi5iYWNrb2ZmLmF0dGVtcHRzKTtcbiAgICAgIHNlbGYuZW1pdEFsbCgncmVjb25uZWN0aW5nJywgc2VsZi5iYWNrb2ZmLmF0dGVtcHRzKTtcblxuICAgICAgLy8gY2hlY2sgYWdhaW4gZm9yIHRoZSBjYXNlIHNvY2tldCBjbG9zZWQgaW4gYWJvdmUgZXZlbnRzXG4gICAgICBpZiAoc2VsZi5za2lwUmVjb25uZWN0KSByZXR1cm47XG5cbiAgICAgIHNlbGYub3BlbihmdW5jdGlvbihlcnIpe1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgZGVidWcoJ3JlY29ubmVjdCBhdHRlbXB0IGVycm9yJyk7XG4gICAgICAgICAgc2VsZi5yZWNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgICAgICAgICBzZWxmLnJlY29ubmVjdCgpO1xuICAgICAgICAgIHNlbGYuZW1pdEFsbCgncmVjb25uZWN0X2Vycm9yJywgZXJyLmRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlYnVnKCdyZWNvbm5lY3Qgc3VjY2VzcycpO1xuICAgICAgICAgIHNlbGYub25yZWNvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgZGVsYXkpO1xuXG4gICAgdGhpcy5zdWJzLnB1c2goe1xuICAgICAgZGVzdHJveTogZnVuY3Rpb24oKXtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBzdWNjZXNzZnVsIHJlY29ubmVjdC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5vbnJlY29ubmVjdCA9IGZ1bmN0aW9uKCl7XG4gIHZhciBhdHRlbXB0ID0gdGhpcy5iYWNrb2ZmLmF0dGVtcHRzO1xuICB0aGlzLnJlY29ubmVjdGluZyA9IGZhbHNlO1xuICB0aGlzLmJhY2tvZmYucmVzZXQoKTtcbiAgdGhpcy51cGRhdGVTb2NrZXRJZHMoKTtcbiAgdGhpcy5lbWl0QWxsKCdyZWNvbm5lY3QnLCBhdHRlbXB0KTtcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc29ja2V0LmlvLWNsaWVudC9saWIvbWFuYWdlci5qc1xuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcbm1vZHVsZS5leHBvcnRzID0gIHJlcXVpcmUoJy4vbGliLycpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjayktZGV2LXNlcnZlci9+L3NvY2tldC5pby1jbGllbnQvfi9lbmdpbmUuaW8tY2xpZW50L2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3NvY2tldCcpO1xuXG4vKipcbiAqIEV4cG9ydHMgcGFyc2VyXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqXG4gKi9cbm1vZHVsZS5leHBvcnRzLnBhcnNlciA9IHJlcXVpcmUoJ2VuZ2luZS5pby1wYXJzZXInKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spLWRldi1zZXJ2ZXIvfi9zb2NrZXQuaW8tY2xpZW50L34vZW5naW5lLmlvLWNsaWVudC9saWIvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciB0cmFuc3BvcnRzID0gcmVxdWlyZSgnLi90cmFuc3BvcnRzJyk7XG52YXIgRW1pdHRlciA9IHJlcXVpcmUoJ2NvbXBvbmVudC1lbWl0dGVyJyk7XG52YXIgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdlbmdpbmUuaW8tY2xpZW50OnNvY2tldCcpO1xudmFyIGluZGV4ID0gcmVxdWlyZSgnaW5kZXhvZicpO1xudmFyIHBhcnNlciA9IHJlcXVpcmUoJ2VuZ2luZS5pby1wYXJzZXInKTtcbnZhciBwYXJzZXVyaSA9IHJlcXVpcmUoJ3BhcnNldXJpJyk7XG52YXIgcGFyc2Vqc29uID0gcmVxdWlyZSgncGFyc2Vqc29uJyk7XG52YXIgcGFyc2VxcyA9IHJlcXVpcmUoJ3BhcnNlcXMnKTtcblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNvY2tldDtcblxuLyoqXG4gKiBOb29wIGZ1bmN0aW9uLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIG5vb3AoKXt9XG5cbi8qKlxuICogU29ja2V0IGNvbnN0cnVjdG9yLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gdXJpIG9yIG9wdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIFNvY2tldCh1cmksIG9wdHMpe1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgU29ja2V0KSkgcmV0dXJuIG5ldyBTb2NrZXQodXJpLCBvcHRzKTtcblxuICBvcHRzID0gb3B0cyB8fCB7fTtcblxuICBpZiAodXJpICYmICdvYmplY3QnID09IHR5cGVvZiB1cmkpIHtcbiAgICBvcHRzID0gdXJpO1xuICAgIHVyaSA9IG51bGw7XG4gIH1cblxuICBpZiAodXJpKSB7XG4gICAgdXJpID0gcGFyc2V1cmkodXJpKTtcbiAgICBvcHRzLmhvc3QgPSB1cmkuaG9zdDtcbiAgICBvcHRzLnNlY3VyZSA9IHVyaS5wcm90b2NvbCA9PSAnaHR0cHMnIHx8IHVyaS5wcm90b2NvbCA9PSAnd3NzJztcbiAgICBvcHRzLnBvcnQgPSB1cmkucG9ydDtcbiAgICBpZiAodXJpLnF1ZXJ5KSBvcHRzLnF1ZXJ5ID0gdXJpLnF1ZXJ5O1xuICB9XG5cbiAgdGhpcy5zZWN1cmUgPSBudWxsICE9IG9wdHMuc2VjdXJlID8gb3B0cy5zZWN1cmUgOlxuICAgIChnbG9iYWwubG9jYXRpb24gJiYgJ2h0dHBzOicgPT0gbG9jYXRpb24ucHJvdG9jb2wpO1xuXG4gIGlmIChvcHRzLmhvc3QpIHtcbiAgICB2YXIgcGllY2VzID0gb3B0cy5ob3N0LnNwbGl0KCc6Jyk7XG4gICAgb3B0cy5ob3N0bmFtZSA9IHBpZWNlcy5zaGlmdCgpO1xuICAgIGlmIChwaWVjZXMubGVuZ3RoKSB7XG4gICAgICBvcHRzLnBvcnQgPSBwaWVjZXMucG9wKCk7XG4gICAgfSBlbHNlIGlmICghb3B0cy5wb3J0KSB7XG4gICAgICAvLyBpZiBubyBwb3J0IGlzIHNwZWNpZmllZCBtYW51YWxseSwgdXNlIHRoZSBwcm90b2NvbCBkZWZhdWx0XG4gICAgICBvcHRzLnBvcnQgPSB0aGlzLnNlY3VyZSA/ICc0NDMnIDogJzgwJztcbiAgICB9XG4gIH1cblxuICB0aGlzLmFnZW50ID0gb3B0cy5hZ2VudCB8fCBmYWxzZTtcbiAgdGhpcy5ob3N0bmFtZSA9IG9wdHMuaG9zdG5hbWUgfHxcbiAgICAoZ2xvYmFsLmxvY2F0aW9uID8gbG9jYXRpb24uaG9zdG5hbWUgOiAnbG9jYWxob3N0Jyk7XG4gIHRoaXMucG9ydCA9IG9wdHMucG9ydCB8fCAoZ2xvYmFsLmxvY2F0aW9uICYmIGxvY2F0aW9uLnBvcnQgP1xuICAgICAgIGxvY2F0aW9uLnBvcnQgOlxuICAgICAgICh0aGlzLnNlY3VyZSA/IDQ0MyA6IDgwKSk7XG4gIHRoaXMucXVlcnkgPSBvcHRzLnF1ZXJ5IHx8IHt9O1xuICBpZiAoJ3N0cmluZycgPT0gdHlwZW9mIHRoaXMucXVlcnkpIHRoaXMucXVlcnkgPSBwYXJzZXFzLmRlY29kZSh0aGlzLnF1ZXJ5KTtcbiAgdGhpcy51cGdyYWRlID0gZmFsc2UgIT09IG9wdHMudXBncmFkZTtcbiAgdGhpcy5wYXRoID0gKG9wdHMucGF0aCB8fCAnL2VuZ2luZS5pbycpLnJlcGxhY2UoL1xcLyQvLCAnJykgKyAnLyc7XG4gIHRoaXMuZm9yY2VKU09OUCA9ICEhb3B0cy5mb3JjZUpTT05QO1xuICB0aGlzLmpzb25wID0gZmFsc2UgIT09IG9wdHMuanNvbnA7XG4gIHRoaXMuZm9yY2VCYXNlNjQgPSAhIW9wdHMuZm9yY2VCYXNlNjQ7XG4gIHRoaXMuZW5hYmxlc1hEUiA9ICEhb3B0cy5lbmFibGVzWERSO1xuICB0aGlzLnRpbWVzdGFtcFBhcmFtID0gb3B0cy50aW1lc3RhbXBQYXJhbSB8fCAndCc7XG4gIHRoaXMudGltZXN0YW1wUmVxdWVzdHMgPSBvcHRzLnRpbWVzdGFtcFJlcXVlc3RzO1xuICB0aGlzLnRyYW5zcG9ydHMgPSBvcHRzLnRyYW5zcG9ydHMgfHwgWydwb2xsaW5nJywgJ3dlYnNvY2tldCddO1xuICB0aGlzLnJlYWR5U3RhdGUgPSAnJztcbiAgdGhpcy53cml0ZUJ1ZmZlciA9IFtdO1xuICB0aGlzLmNhbGxiYWNrQnVmZmVyID0gW107XG4gIHRoaXMucG9saWN5UG9ydCA9IG9wdHMucG9saWN5UG9ydCB8fCA4NDM7XG4gIHRoaXMucmVtZW1iZXJVcGdyYWRlID0gb3B0cy5yZW1lbWJlclVwZ3JhZGUgfHwgZmFsc2U7XG4gIHRoaXMuYmluYXJ5VHlwZSA9IG51bGw7XG4gIHRoaXMub25seUJpbmFyeVVwZ3JhZGVzID0gb3B0cy5vbmx5QmluYXJ5VXBncmFkZXM7XG5cbiAgLy8gU1NMIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG4gIHRoaXMucGZ4ID0gb3B0cy5wZnggfHwgbnVsbDtcbiAgdGhpcy5rZXkgPSBvcHRzLmtleSB8fCBudWxsO1xuICB0aGlzLnBhc3NwaHJhc2UgPSBvcHRzLnBhc3NwaHJhc2UgfHwgbnVsbDtcbiAgdGhpcy5jZXJ0ID0gb3B0cy5jZXJ0IHx8IG51bGw7XG4gIHRoaXMuY2EgPSBvcHRzLmNhIHx8IG51bGw7XG4gIHRoaXMuY2lwaGVycyA9IG9wdHMuY2lwaGVycyB8fCBudWxsO1xuICB0aGlzLnJlamVjdFVuYXV0aG9yaXplZCA9IG9wdHMucmVqZWN0VW5hdXRob3JpemVkIHx8IG51bGw7XG5cbiAgdGhpcy5vcGVuKCk7XG59XG5cblNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSBmYWxzZTtcblxuLyoqXG4gKiBNaXggaW4gYEVtaXR0ZXJgLlxuICovXG5cbkVtaXR0ZXIoU29ja2V0LnByb3RvdHlwZSk7XG5cbi8qKlxuICogUHJvdG9jb2wgdmVyc2lvbi5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblNvY2tldC5wcm90b2NvbCA9IHBhcnNlci5wcm90b2NvbDsgLy8gdGhpcyBpcyBhbiBpbnRcblxuLyoqXG4gKiBFeHBvc2UgZGVwcyBmb3IgbGVnYWN5IGNvbXBhdGliaWxpdHlcbiAqIGFuZCBzdGFuZGFsb25lIGJyb3dzZXIgYWNjZXNzLlxuICovXG5cblNvY2tldC5Tb2NrZXQgPSBTb2NrZXQ7XG5Tb2NrZXQuVHJhbnNwb3J0ID0gcmVxdWlyZSgnLi90cmFuc3BvcnQnKTtcblNvY2tldC50cmFuc3BvcnRzID0gcmVxdWlyZSgnLi90cmFuc3BvcnRzJyk7XG5Tb2NrZXQucGFyc2VyID0gcmVxdWlyZSgnZW5naW5lLmlvLXBhcnNlcicpO1xuXG4vKipcbiAqIENyZWF0ZXMgdHJhbnNwb3J0IG9mIHRoZSBnaXZlbiB0eXBlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0cmFuc3BvcnQgbmFtZVxuICogQHJldHVybiB7VHJhbnNwb3J0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5jcmVhdGVUcmFuc3BvcnQgPSBmdW5jdGlvbiAobmFtZSkge1xuICBkZWJ1ZygnY3JlYXRpbmcgdHJhbnNwb3J0IFwiJXNcIicsIG5hbWUpO1xuICB2YXIgcXVlcnkgPSBjbG9uZSh0aGlzLnF1ZXJ5KTtcblxuICAvLyBhcHBlbmQgZW5naW5lLmlvIHByb3RvY29sIGlkZW50aWZpZXJcbiAgcXVlcnkuRUlPID0gcGFyc2VyLnByb3RvY29sO1xuXG4gIC8vIHRyYW5zcG9ydCBuYW1lXG4gIHF1ZXJ5LnRyYW5zcG9ydCA9IG5hbWU7XG5cbiAgLy8gc2Vzc2lvbiBpZCBpZiB3ZSBhbHJlYWR5IGhhdmUgb25lXG4gIGlmICh0aGlzLmlkKSBxdWVyeS5zaWQgPSB0aGlzLmlkO1xuXG4gIHZhciB0cmFuc3BvcnQgPSBuZXcgdHJhbnNwb3J0c1tuYW1lXSh7XG4gICAgYWdlbnQ6IHRoaXMuYWdlbnQsXG4gICAgaG9zdG5hbWU6IHRoaXMuaG9zdG5hbWUsXG4gICAgcG9ydDogdGhpcy5wb3J0LFxuICAgIHNlY3VyZTogdGhpcy5zZWN1cmUsXG4gICAgcGF0aDogdGhpcy5wYXRoLFxuICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICBmb3JjZUpTT05QOiB0aGlzLmZvcmNlSlNPTlAsXG4gICAganNvbnA6IHRoaXMuanNvbnAsXG4gICAgZm9yY2VCYXNlNjQ6IHRoaXMuZm9yY2VCYXNlNjQsXG4gICAgZW5hYmxlc1hEUjogdGhpcy5lbmFibGVzWERSLFxuICAgIHRpbWVzdGFtcFJlcXVlc3RzOiB0aGlzLnRpbWVzdGFtcFJlcXVlc3RzLFxuICAgIHRpbWVzdGFtcFBhcmFtOiB0aGlzLnRpbWVzdGFtcFBhcmFtLFxuICAgIHBvbGljeVBvcnQ6IHRoaXMucG9saWN5UG9ydCxcbiAgICBzb2NrZXQ6IHRoaXMsXG4gICAgcGZ4OiB0aGlzLnBmeCxcbiAgICBrZXk6IHRoaXMua2V5LFxuICAgIHBhc3NwaHJhc2U6IHRoaXMucGFzc3BocmFzZSxcbiAgICBjZXJ0OiB0aGlzLmNlcnQsXG4gICAgY2E6IHRoaXMuY2EsXG4gICAgY2lwaGVyczogdGhpcy5jaXBoZXJzLFxuICAgIHJlamVjdFVuYXV0aG9yaXplZDogdGhpcy5yZWplY3RVbmF1dGhvcml6ZWRcbiAgfSk7XG5cbiAgcmV0dXJuIHRyYW5zcG9ydDtcbn07XG5cbmZ1bmN0aW9uIGNsb25lIChvYmopIHtcbiAgdmFyIG8gPSB7fTtcbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICBvW2ldID0gb2JqW2ldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbztcbn1cblxuLyoqXG4gKiBJbml0aWFsaXplcyB0cmFuc3BvcnQgdG8gdXNlIGFuZCBzdGFydHMgcHJvYmUuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblNvY2tldC5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRyYW5zcG9ydDtcbiAgaWYgKHRoaXMucmVtZW1iZXJVcGdyYWRlICYmIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgJiYgdGhpcy50cmFuc3BvcnRzLmluZGV4T2YoJ3dlYnNvY2tldCcpICE9IC0xKSB7XG4gICAgdHJhbnNwb3J0ID0gJ3dlYnNvY2tldCc7XG4gIH0gZWxzZSBpZiAoMCA9PSB0aGlzLnRyYW5zcG9ydHMubGVuZ3RoKSB7XG4gICAgLy8gRW1pdCBlcnJvciBvbiBuZXh0IHRpY2sgc28gaXQgY2FuIGJlIGxpc3RlbmVkIHRvXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBzZWxmLmVtaXQoJ2Vycm9yJywgJ05vIHRyYW5zcG9ydHMgYXZhaWxhYmxlJyk7XG4gICAgfSwgMCk7XG4gICAgcmV0dXJuO1xuICB9IGVsc2Uge1xuICAgIHRyYW5zcG9ydCA9IHRoaXMudHJhbnNwb3J0c1swXTtcbiAgfVxuICB0aGlzLnJlYWR5U3RhdGUgPSAnb3BlbmluZyc7XG5cbiAgLy8gUmV0cnkgd2l0aCB0aGUgbmV4dCB0cmFuc3BvcnQgaWYgdGhlIHRyYW5zcG9ydCBpcyBkaXNhYmxlZCAoanNvbnA6IGZhbHNlKVxuICB2YXIgdHJhbnNwb3J0O1xuICB0cnkge1xuICAgIHRyYW5zcG9ydCA9IHRoaXMuY3JlYXRlVHJhbnNwb3J0KHRyYW5zcG9ydCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB0aGlzLnRyYW5zcG9ydHMuc2hpZnQoKTtcbiAgICB0aGlzLm9wZW4oKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB0cmFuc3BvcnQub3BlbigpO1xuICB0aGlzLnNldFRyYW5zcG9ydCh0cmFuc3BvcnQpO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBjdXJyZW50IHRyYW5zcG9ydC4gRGlzYWJsZXMgdGhlIGV4aXN0aW5nIG9uZSAoaWYgYW55KS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLnNldFRyYW5zcG9ydCA9IGZ1bmN0aW9uKHRyYW5zcG9ydCl7XG4gIGRlYnVnKCdzZXR0aW5nIHRyYW5zcG9ydCAlcycsIHRyYW5zcG9ydC5uYW1lKTtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIGlmICh0aGlzLnRyYW5zcG9ydCkge1xuICAgIGRlYnVnKCdjbGVhcmluZyBleGlzdGluZyB0cmFuc3BvcnQgJXMnLCB0aGlzLnRyYW5zcG9ydC5uYW1lKTtcbiAgICB0aGlzLnRyYW5zcG9ydC5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIC8vIHNldCB1cCB0cmFuc3BvcnRcbiAgdGhpcy50cmFuc3BvcnQgPSB0cmFuc3BvcnQ7XG5cbiAgLy8gc2V0IHVwIHRyYW5zcG9ydCBsaXN0ZW5lcnNcbiAgdHJhbnNwb3J0XG4gIC5vbignZHJhaW4nLCBmdW5jdGlvbigpe1xuICAgIHNlbGYub25EcmFpbigpO1xuICB9KVxuICAub24oJ3BhY2tldCcsIGZ1bmN0aW9uKHBhY2tldCl7XG4gICAgc2VsZi5vblBhY2tldChwYWNrZXQpO1xuICB9KVxuICAub24oJ2Vycm9yJywgZnVuY3Rpb24oZSl7XG4gICAgc2VsZi5vbkVycm9yKGUpO1xuICB9KVxuICAub24oJ2Nsb3NlJywgZnVuY3Rpb24oKXtcbiAgICBzZWxmLm9uQ2xvc2UoJ3RyYW5zcG9ydCBjbG9zZScpO1xuICB9KTtcbn07XG5cbi8qKlxuICogUHJvYmVzIGEgdHJhbnNwb3J0LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0cmFuc3BvcnQgbmFtZVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5wcm9iZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIGRlYnVnKCdwcm9iaW5nIHRyYW5zcG9ydCBcIiVzXCInLCBuYW1lKTtcbiAgdmFyIHRyYW5zcG9ydCA9IHRoaXMuY3JlYXRlVHJhbnNwb3J0KG5hbWUsIHsgcHJvYmU6IDEgfSlcbiAgICAsIGZhaWxlZCA9IGZhbHNlXG4gICAgLCBzZWxmID0gdGhpcztcblxuICBTb2NrZXQucHJpb3JXZWJzb2NrZXRTdWNjZXNzID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gb25UcmFuc3BvcnRPcGVuKCl7XG4gICAgaWYgKHNlbGYub25seUJpbmFyeVVwZ3JhZGVzKSB7XG4gICAgICB2YXIgdXBncmFkZUxvc2VzQmluYXJ5ID0gIXRoaXMuc3VwcG9ydHNCaW5hcnkgJiYgc2VsZi50cmFuc3BvcnQuc3VwcG9ydHNCaW5hcnk7XG4gICAgICBmYWlsZWQgPSBmYWlsZWQgfHwgdXBncmFkZUxvc2VzQmluYXJ5O1xuICAgIH1cbiAgICBpZiAoZmFpbGVkKSByZXR1cm47XG5cbiAgICBkZWJ1ZygncHJvYmUgdHJhbnNwb3J0IFwiJXNcIiBvcGVuZWQnLCBuYW1lKTtcbiAgICB0cmFuc3BvcnQuc2VuZChbeyB0eXBlOiAncGluZycsIGRhdGE6ICdwcm9iZScgfV0pO1xuICAgIHRyYW5zcG9ydC5vbmNlKCdwYWNrZXQnLCBmdW5jdGlvbiAobXNnKSB7XG4gICAgICBpZiAoZmFpbGVkKSByZXR1cm47XG4gICAgICBpZiAoJ3BvbmcnID09IG1zZy50eXBlICYmICdwcm9iZScgPT0gbXNnLmRhdGEpIHtcbiAgICAgICAgZGVidWcoJ3Byb2JlIHRyYW5zcG9ydCBcIiVzXCIgcG9uZycsIG5hbWUpO1xuICAgICAgICBzZWxmLnVwZ3JhZGluZyA9IHRydWU7XG4gICAgICAgIHNlbGYuZW1pdCgndXBncmFkaW5nJywgdHJhbnNwb3J0KTtcbiAgICAgICAgaWYgKCF0cmFuc3BvcnQpIHJldHVybjtcbiAgICAgICAgU29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9ICd3ZWJzb2NrZXQnID09IHRyYW5zcG9ydC5uYW1lO1xuXG4gICAgICAgIGRlYnVnKCdwYXVzaW5nIGN1cnJlbnQgdHJhbnNwb3J0IFwiJXNcIicsIHNlbGYudHJhbnNwb3J0Lm5hbWUpO1xuICAgICAgICBzZWxmLnRyYW5zcG9ydC5wYXVzZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKGZhaWxlZCkgcmV0dXJuO1xuICAgICAgICAgIGlmICgnY2xvc2VkJyA9PSBzZWxmLnJlYWR5U3RhdGUpIHJldHVybjtcbiAgICAgICAgICBkZWJ1ZygnY2hhbmdpbmcgdHJhbnNwb3J0IGFuZCBzZW5kaW5nIHVwZ3JhZGUgcGFja2V0Jyk7XG5cbiAgICAgICAgICBjbGVhbnVwKCk7XG5cbiAgICAgICAgICBzZWxmLnNldFRyYW5zcG9ydCh0cmFuc3BvcnQpO1xuICAgICAgICAgIHRyYW5zcG9ydC5zZW5kKFt7IHR5cGU6ICd1cGdyYWRlJyB9XSk7XG4gICAgICAgICAgc2VsZi5lbWl0KCd1cGdyYWRlJywgdHJhbnNwb3J0KTtcbiAgICAgICAgICB0cmFuc3BvcnQgPSBudWxsO1xuICAgICAgICAgIHNlbGYudXBncmFkaW5nID0gZmFsc2U7XG4gICAgICAgICAgc2VsZi5mbHVzaCgpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlYnVnKCdwcm9iZSB0cmFuc3BvcnQgXCIlc1wiIGZhaWxlZCcsIG5hbWUpO1xuICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdwcm9iZSBlcnJvcicpO1xuICAgICAgICBlcnIudHJhbnNwb3J0ID0gdHJhbnNwb3J0Lm5hbWU7XG4gICAgICAgIHNlbGYuZW1pdCgndXBncmFkZUVycm9yJywgZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZyZWV6ZVRyYW5zcG9ydCgpIHtcbiAgICBpZiAoZmFpbGVkKSByZXR1cm47XG5cbiAgICAvLyBBbnkgY2FsbGJhY2sgY2FsbGVkIGJ5IHRyYW5zcG9ydCBzaG91bGQgYmUgaWdub3JlZCBzaW5jZSBub3dcbiAgICBmYWlsZWQgPSB0cnVlO1xuXG4gICAgY2xlYW51cCgpO1xuXG4gICAgdHJhbnNwb3J0LmNsb3NlKCk7XG4gICAgdHJhbnNwb3J0ID0gbnVsbDtcbiAgfVxuXG4gIC8vSGFuZGxlIGFueSBlcnJvciB0aGF0IGhhcHBlbnMgd2hpbGUgcHJvYmluZ1xuICBmdW5jdGlvbiBvbmVycm9yKGVycikge1xuICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcigncHJvYmUgZXJyb3I6ICcgKyBlcnIpO1xuICAgIGVycm9yLnRyYW5zcG9ydCA9IHRyYW5zcG9ydC5uYW1lO1xuXG4gICAgZnJlZXplVHJhbnNwb3J0KCk7XG5cbiAgICBkZWJ1ZygncHJvYmUgdHJhbnNwb3J0IFwiJXNcIiBmYWlsZWQgYmVjYXVzZSBvZiBlcnJvcjogJXMnLCBuYW1lLCBlcnIpO1xuXG4gICAgc2VsZi5lbWl0KCd1cGdyYWRlRXJyb3InLCBlcnJvcik7XG4gIH1cblxuICBmdW5jdGlvbiBvblRyYW5zcG9ydENsb3NlKCl7XG4gICAgb25lcnJvcihcInRyYW5zcG9ydCBjbG9zZWRcIik7XG4gIH1cblxuICAvL1doZW4gdGhlIHNvY2tldCBpcyBjbG9zZWQgd2hpbGUgd2UncmUgcHJvYmluZ1xuICBmdW5jdGlvbiBvbmNsb3NlKCl7XG4gICAgb25lcnJvcihcInNvY2tldCBjbG9zZWRcIik7XG4gIH1cblxuICAvL1doZW4gdGhlIHNvY2tldCBpcyB1cGdyYWRlZCB3aGlsZSB3ZSdyZSBwcm9iaW5nXG4gIGZ1bmN0aW9uIG9udXBncmFkZSh0byl7XG4gICAgaWYgKHRyYW5zcG9ydCAmJiB0by5uYW1lICE9IHRyYW5zcG9ydC5uYW1lKSB7XG4gICAgICBkZWJ1ZygnXCIlc1wiIHdvcmtzIC0gYWJvcnRpbmcgXCIlc1wiJywgdG8ubmFtZSwgdHJhbnNwb3J0Lm5hbWUpO1xuICAgICAgZnJlZXplVHJhbnNwb3J0KCk7XG4gICAgfVxuICB9XG5cbiAgLy9SZW1vdmUgYWxsIGxpc3RlbmVycyBvbiB0aGUgdHJhbnNwb3J0IGFuZCBvbiBzZWxmXG4gIGZ1bmN0aW9uIGNsZWFudXAoKXtcbiAgICB0cmFuc3BvcnQucmVtb3ZlTGlzdGVuZXIoJ29wZW4nLCBvblRyYW5zcG9ydE9wZW4pO1xuICAgIHRyYW5zcG9ydC5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBvbmVycm9yKTtcbiAgICB0cmFuc3BvcnQucmVtb3ZlTGlzdGVuZXIoJ2Nsb3NlJywgb25UcmFuc3BvcnRDbG9zZSk7XG4gICAgc2VsZi5yZW1vdmVMaXN0ZW5lcignY2xvc2UnLCBvbmNsb3NlKTtcbiAgICBzZWxmLnJlbW92ZUxpc3RlbmVyKCd1cGdyYWRpbmcnLCBvbnVwZ3JhZGUpO1xuICB9XG5cbiAgdHJhbnNwb3J0Lm9uY2UoJ29wZW4nLCBvblRyYW5zcG9ydE9wZW4pO1xuICB0cmFuc3BvcnQub25jZSgnZXJyb3InLCBvbmVycm9yKTtcbiAgdHJhbnNwb3J0Lm9uY2UoJ2Nsb3NlJywgb25UcmFuc3BvcnRDbG9zZSk7XG5cbiAgdGhpcy5vbmNlKCdjbG9zZScsIG9uY2xvc2UpO1xuICB0aGlzLm9uY2UoJ3VwZ3JhZGluZycsIG9udXBncmFkZSk7XG5cbiAgdHJhbnNwb3J0Lm9wZW4oKTtcblxufTtcblxuLyoqXG4gKiBDYWxsZWQgd2hlbiBjb25uZWN0aW9uIGlzIGRlZW1lZCBvcGVuLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vbk9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gIGRlYnVnKCdzb2NrZXQgb3BlbicpO1xuICB0aGlzLnJlYWR5U3RhdGUgPSAnb3Blbic7XG4gIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSAnd2Vic29ja2V0JyA9PSB0aGlzLnRyYW5zcG9ydC5uYW1lO1xuICB0aGlzLmVtaXQoJ29wZW4nKTtcbiAgdGhpcy5mbHVzaCgpO1xuXG4gIC8vIHdlIGNoZWNrIGZvciBgcmVhZHlTdGF0ZWAgaW4gY2FzZSBhbiBgb3BlbmBcbiAgLy8gbGlzdGVuZXIgYWxyZWFkeSBjbG9zZWQgdGhlIHNvY2tldFxuICBpZiAoJ29wZW4nID09IHRoaXMucmVhZHlTdGF0ZSAmJiB0aGlzLnVwZ3JhZGUgJiYgdGhpcy50cmFuc3BvcnQucGF1c2UpIHtcbiAgICBkZWJ1Zygnc3RhcnRpbmcgdXBncmFkZSBwcm9iZXMnKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMudXBncmFkZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICB0aGlzLnByb2JlKHRoaXMudXBncmFkZXNbaV0pO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBIYW5kbGVzIGEgcGFja2V0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25QYWNrZXQgPSBmdW5jdGlvbiAocGFja2V0KSB7XG4gIGlmICgnb3BlbmluZycgPT0gdGhpcy5yZWFkeVN0YXRlIHx8ICdvcGVuJyA9PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICBkZWJ1Zygnc29ja2V0IHJlY2VpdmU6IHR5cGUgXCIlc1wiLCBkYXRhIFwiJXNcIicsIHBhY2tldC50eXBlLCBwYWNrZXQuZGF0YSk7XG5cbiAgICB0aGlzLmVtaXQoJ3BhY2tldCcsIHBhY2tldCk7XG5cbiAgICAvLyBTb2NrZXQgaXMgbGl2ZSAtIGFueSBwYWNrZXQgY291bnRzXG4gICAgdGhpcy5lbWl0KCdoZWFydGJlYXQnKTtcblxuICAgIHN3aXRjaCAocGFja2V0LnR5cGUpIHtcbiAgICAgIGNhc2UgJ29wZW4nOlxuICAgICAgICB0aGlzLm9uSGFuZHNoYWtlKHBhcnNlanNvbihwYWNrZXQuZGF0YSkpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAncG9uZyc6XG4gICAgICAgIHRoaXMuc2V0UGluZygpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdzZXJ2ZXIgZXJyb3InKTtcbiAgICAgICAgZXJyLmNvZGUgPSBwYWNrZXQuZGF0YTtcbiAgICAgICAgdGhpcy5lbWl0KCdlcnJvcicsIGVycik7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdtZXNzYWdlJzpcbiAgICAgICAgdGhpcy5lbWl0KCdkYXRhJywgcGFja2V0LmRhdGEpO1xuICAgICAgICB0aGlzLmVtaXQoJ21lc3NhZ2UnLCBwYWNrZXQuZGF0YSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBkZWJ1ZygncGFja2V0IHJlY2VpdmVkIHdpdGggc29ja2V0IHJlYWR5U3RhdGUgXCIlc1wiJywgdGhpcy5yZWFkeVN0YXRlKTtcbiAgfVxufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBoYW5kc2hha2UgY29tcGxldGlvbi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaGFuZHNoYWtlIG9ialxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vbkhhbmRzaGFrZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gIHRoaXMuZW1pdCgnaGFuZHNoYWtlJywgZGF0YSk7XG4gIHRoaXMuaWQgPSBkYXRhLnNpZDtcbiAgdGhpcy50cmFuc3BvcnQucXVlcnkuc2lkID0gZGF0YS5zaWQ7XG4gIHRoaXMudXBncmFkZXMgPSB0aGlzLmZpbHRlclVwZ3JhZGVzKGRhdGEudXBncmFkZXMpO1xuICB0aGlzLnBpbmdJbnRlcnZhbCA9IGRhdGEucGluZ0ludGVydmFsO1xuICB0aGlzLnBpbmdUaW1lb3V0ID0gZGF0YS5waW5nVGltZW91dDtcbiAgdGhpcy5vbk9wZW4oKTtcbiAgLy8gSW4gY2FzZSBvcGVuIGhhbmRsZXIgY2xvc2VzIHNvY2tldFxuICBpZiAgKCdjbG9zZWQnID09IHRoaXMucmVhZHlTdGF0ZSkgcmV0dXJuO1xuICB0aGlzLnNldFBpbmcoKTtcblxuICAvLyBQcm9sb25nIGxpdmVuZXNzIG9mIHNvY2tldCBvbiBoZWFydGJlYXRcbiAgdGhpcy5yZW1vdmVMaXN0ZW5lcignaGVhcnRiZWF0JywgdGhpcy5vbkhlYXJ0YmVhdCk7XG4gIHRoaXMub24oJ2hlYXJ0YmVhdCcsIHRoaXMub25IZWFydGJlYXQpO1xufTtcblxuLyoqXG4gKiBSZXNldHMgcGluZyB0aW1lb3V0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25IZWFydGJlYXQgPSBmdW5jdGlvbiAodGltZW91dCkge1xuICBjbGVhclRpbWVvdXQodGhpcy5waW5nVGltZW91dFRpbWVyKTtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBzZWxmLnBpbmdUaW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoJ2Nsb3NlZCcgPT0gc2VsZi5yZWFkeVN0YXRlKSByZXR1cm47XG4gICAgc2VsZi5vbkNsb3NlKCdwaW5nIHRpbWVvdXQnKTtcbiAgfSwgdGltZW91dCB8fCAoc2VsZi5waW5nSW50ZXJ2YWwgKyBzZWxmLnBpbmdUaW1lb3V0KSk7XG59O1xuXG4vKipcbiAqIFBpbmdzIHNlcnZlciBldmVyeSBgdGhpcy5waW5nSW50ZXJ2YWxgIGFuZCBleHBlY3RzIHJlc3BvbnNlXG4gKiB3aXRoaW4gYHRoaXMucGluZ1RpbWVvdXRgIG9yIGNsb3NlcyBjb25uZWN0aW9uLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUuc2V0UGluZyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBjbGVhclRpbWVvdXQoc2VsZi5waW5nSW50ZXJ2YWxUaW1lcik7XG4gIHNlbGYucGluZ0ludGVydmFsVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBkZWJ1Zygnd3JpdGluZyBwaW5nIHBhY2tldCAtIGV4cGVjdGluZyBwb25nIHdpdGhpbiAlc21zJywgc2VsZi5waW5nVGltZW91dCk7XG4gICAgc2VsZi5waW5nKCk7XG4gICAgc2VsZi5vbkhlYXJ0YmVhdChzZWxmLnBpbmdUaW1lb3V0KTtcbiAgfSwgc2VsZi5waW5nSW50ZXJ2YWwpO1xufTtcblxuLyoqXG4qIFNlbmRzIGEgcGluZyBwYWNrZXQuXG4qXG4qIEBhcGkgcHVibGljXG4qL1xuXG5Tb2NrZXQucHJvdG90eXBlLnBpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuc2VuZFBhY2tldCgncGluZycpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgb24gYGRyYWluYCBldmVudFxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25EcmFpbiA9IGZ1bmN0aW9uKCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucHJldkJ1ZmZlckxlbjsgaSsrKSB7XG4gICAgaWYgKHRoaXMuY2FsbGJhY2tCdWZmZXJbaV0pIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tCdWZmZXJbaV0oKTtcbiAgICB9XG4gIH1cblxuICB0aGlzLndyaXRlQnVmZmVyLnNwbGljZSgwLCB0aGlzLnByZXZCdWZmZXJMZW4pO1xuICB0aGlzLmNhbGxiYWNrQnVmZmVyLnNwbGljZSgwLCB0aGlzLnByZXZCdWZmZXJMZW4pO1xuXG4gIC8vIHNldHRpbmcgcHJldkJ1ZmZlckxlbiA9IDAgaXMgdmVyeSBpbXBvcnRhbnRcbiAgLy8gZm9yIGV4YW1wbGUsIHdoZW4gdXBncmFkaW5nLCB1cGdyYWRlIHBhY2tldCBpcyBzZW50IG92ZXIsXG4gIC8vIGFuZCBhIG5vbnplcm8gcHJldkJ1ZmZlckxlbiBjb3VsZCBjYXVzZSBwcm9ibGVtcyBvbiBgZHJhaW5gXG4gIHRoaXMucHJldkJ1ZmZlckxlbiA9IDA7XG5cbiAgaWYgKHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoID09IDApIHtcbiAgICB0aGlzLmVtaXQoJ2RyYWluJyk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5mbHVzaCgpO1xuICB9XG59O1xuXG4vKipcbiAqIEZsdXNoIHdyaXRlIGJ1ZmZlcnMuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5mbHVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCdjbG9zZWQnICE9IHRoaXMucmVhZHlTdGF0ZSAmJiB0aGlzLnRyYW5zcG9ydC53cml0YWJsZSAmJlxuICAgICF0aGlzLnVwZ3JhZGluZyAmJiB0aGlzLndyaXRlQnVmZmVyLmxlbmd0aCkge1xuICAgIGRlYnVnKCdmbHVzaGluZyAlZCBwYWNrZXRzIGluIHNvY2tldCcsIHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoKTtcbiAgICB0aGlzLnRyYW5zcG9ydC5zZW5kKHRoaXMud3JpdGVCdWZmZXIpO1xuICAgIC8vIGtlZXAgdHJhY2sgb2YgY3VycmVudCBsZW5ndGggb2Ygd3JpdGVCdWZmZXJcbiAgICAvLyBzcGxpY2Ugd3JpdGVCdWZmZXIgYW5kIGNhbGxiYWNrQnVmZmVyIG9uIGBkcmFpbmBcbiAgICB0aGlzLnByZXZCdWZmZXJMZW4gPSB0aGlzLndyaXRlQnVmZmVyLmxlbmd0aDtcbiAgICB0aGlzLmVtaXQoJ2ZsdXNoJyk7XG4gIH1cbn07XG5cbi8qKlxuICogU2VuZHMgYSBtZXNzYWdlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgZnVuY3Rpb24uXG4gKiBAcmV0dXJuIHtTb2NrZXR9IGZvciBjaGFpbmluZy5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS53cml0ZSA9XG5Tb2NrZXQucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAobXNnLCBmbikge1xuICB0aGlzLnNlbmRQYWNrZXQoJ21lc3NhZ2UnLCBtc2csIGZuKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNlbmRzIGEgcGFja2V0LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYWNrZXQgdHlwZS5cbiAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgZnVuY3Rpb24uXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLnNlbmRQYWNrZXQgPSBmdW5jdGlvbiAodHlwZSwgZGF0YSwgZm4pIHtcbiAgaWYgKCdjbG9zaW5nJyA9PSB0aGlzLnJlYWR5U3RhdGUgfHwgJ2Nsb3NlZCcgPT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHBhY2tldCA9IHsgdHlwZTogdHlwZSwgZGF0YTogZGF0YSB9O1xuICB0aGlzLmVtaXQoJ3BhY2tldENyZWF0ZScsIHBhY2tldCk7XG4gIHRoaXMud3JpdGVCdWZmZXIucHVzaChwYWNrZXQpO1xuICB0aGlzLmNhbGxiYWNrQnVmZmVyLnB1c2goZm4pO1xuICB0aGlzLmZsdXNoKCk7XG59O1xuXG4vKipcbiAqIENsb3NlcyB0aGUgY29ubmVjdGlvbi5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICBpZiAoJ29wZW5pbmcnID09IHRoaXMucmVhZHlTdGF0ZSB8fCAnb3BlbicgPT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgdGhpcy5yZWFkeVN0YXRlID0gJ2Nsb3NpbmcnO1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgICBzZWxmLm9uQ2xvc2UoJ2ZvcmNlZCBjbG9zZScpO1xuICAgICAgZGVidWcoJ3NvY2tldCBjbG9zaW5nIC0gdGVsbGluZyB0cmFuc3BvcnQgdG8gY2xvc2UnKTtcbiAgICAgIHNlbGYudHJhbnNwb3J0LmNsb3NlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYW51cEFuZENsb3NlKCkge1xuICAgICAgc2VsZi5yZW1vdmVMaXN0ZW5lcigndXBncmFkZScsIGNsZWFudXBBbmRDbG9zZSk7XG4gICAgICBzZWxmLnJlbW92ZUxpc3RlbmVyKCd1cGdyYWRlRXJyb3InLCBjbGVhbnVwQW5kQ2xvc2UpO1xuICAgICAgY2xvc2UoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3YWl0Rm9yVXBncmFkZSgpIHtcbiAgICAgIC8vIHdhaXQgZm9yIHVwZ3JhZGUgdG8gZmluaXNoIHNpbmNlIHdlIGNhbid0IHNlbmQgcGFja2V0cyB3aGlsZSBwYXVzaW5nIGEgdHJhbnNwb3J0XG4gICAgICBzZWxmLm9uY2UoJ3VwZ3JhZGUnLCBjbGVhbnVwQW5kQ2xvc2UpO1xuICAgICAgc2VsZi5vbmNlKCd1cGdyYWRlRXJyb3InLCBjbGVhbnVwQW5kQ2xvc2UpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLndyaXRlQnVmZmVyLmxlbmd0aCkge1xuICAgICAgdGhpcy5vbmNlKCdkcmFpbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy51cGdyYWRpbmcpIHtcbiAgICAgICAgICB3YWl0Rm9yVXBncmFkZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy51cGdyYWRpbmcpIHtcbiAgICAgIHdhaXRGb3JVcGdyYWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIHRyYW5zcG9ydCBlcnJvclxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25FcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgZGVidWcoJ3NvY2tldCBlcnJvciAlaicsIGVycik7XG4gIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSBmYWxzZTtcbiAgdGhpcy5lbWl0KCdlcnJvcicsIGVycik7XG4gIHRoaXMub25DbG9zZSgndHJhbnNwb3J0IGVycm9yJywgZXJyKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gdHJhbnNwb3J0IGNsb3NlLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25DbG9zZSA9IGZ1bmN0aW9uIChyZWFzb24sIGRlc2MpIHtcbiAgaWYgKCdvcGVuaW5nJyA9PSB0aGlzLnJlYWR5U3RhdGUgfHwgJ29wZW4nID09IHRoaXMucmVhZHlTdGF0ZSB8fCAnY2xvc2luZycgPT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgZGVidWcoJ3NvY2tldCBjbG9zZSB3aXRoIHJlYXNvbjogXCIlc1wiJywgcmVhc29uKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvLyBjbGVhciB0aW1lcnNcbiAgICBjbGVhclRpbWVvdXQodGhpcy5waW5nSW50ZXJ2YWxUaW1lcik7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucGluZ1RpbWVvdXRUaW1lcik7XG5cbiAgICAvLyBjbGVhbiBidWZmZXJzIGluIG5leHQgdGljaywgc28gZGV2ZWxvcGVycyBjYW4gc3RpbGxcbiAgICAvLyBncmFiIHRoZSBidWZmZXJzIG9uIGBjbG9zZWAgZXZlbnRcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi53cml0ZUJ1ZmZlciA9IFtdO1xuICAgICAgc2VsZi5jYWxsYmFja0J1ZmZlciA9IFtdO1xuICAgICAgc2VsZi5wcmV2QnVmZmVyTGVuID0gMDtcbiAgICB9LCAwKTtcblxuICAgIC8vIHN0b3AgZXZlbnQgZnJvbSBmaXJpbmcgYWdhaW4gZm9yIHRyYW5zcG9ydFxuICAgIHRoaXMudHJhbnNwb3J0LnJlbW92ZUFsbExpc3RlbmVycygnY2xvc2UnKTtcblxuICAgIC8vIGVuc3VyZSB0cmFuc3BvcnQgd29uJ3Qgc3RheSBvcGVuXG4gICAgdGhpcy50cmFuc3BvcnQuY2xvc2UoKTtcblxuICAgIC8vIGlnbm9yZSBmdXJ0aGVyIHRyYW5zcG9ydCBjb21tdW5pY2F0aW9uXG4gICAgdGhpcy50cmFuc3BvcnQucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG5cbiAgICAvLyBzZXQgcmVhZHkgc3RhdGVcbiAgICB0aGlzLnJlYWR5U3RhdGUgPSAnY2xvc2VkJztcblxuICAgIC8vIGNsZWFyIHNlc3Npb24gaWRcbiAgICB0aGlzLmlkID0gbnVsbDtcblxuICAgIC8vIGVtaXQgY2xvc2UgZXZlbnRcbiAgICB0aGlzLmVtaXQoJ2Nsb3NlJywgcmVhc29uLCBkZXNjKTtcbiAgfVxufTtcblxuLyoqXG4gKiBGaWx0ZXJzIHVwZ3JhZGVzLCByZXR1cm5pbmcgb25seSB0aG9zZSBtYXRjaGluZyBjbGllbnQgdHJhbnNwb3J0cy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBzZXJ2ZXIgdXBncmFkZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICpcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLmZpbHRlclVwZ3JhZGVzID0gZnVuY3Rpb24gKHVwZ3JhZGVzKSB7XG4gIHZhciBmaWx0ZXJlZFVwZ3JhZGVzID0gW107XG4gIGZvciAodmFyIGkgPSAwLCBqID0gdXBncmFkZXMubGVuZ3RoOyBpPGo7IGkrKykge1xuICAgIGlmICh+aW5kZXgodGhpcy50cmFuc3BvcnRzLCB1cGdyYWRlc1tpXSkpIGZpbHRlcmVkVXBncmFkZXMucHVzaCh1cGdyYWRlc1tpXSk7XG4gIH1cbiAgcmV0dXJuIGZpbHRlcmVkVXBncmFkZXM7XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjayktZGV2LXNlcnZlci9+L3NvY2tldC5pby1jbGllbnQvfi9lbmdpbmUuaW8tY2xpZW50L2xpYi9zb2NrZXQuanNcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzXG4gKi9cblxudmFyIFhNTEh0dHBSZXF1ZXN0ID0gcmVxdWlyZSgneG1saHR0cHJlcXVlc3QnKTtcbnZhciBYSFIgPSByZXF1aXJlKCcuL3BvbGxpbmcteGhyJyk7XG52YXIgSlNPTlAgPSByZXF1aXJlKCcuL3BvbGxpbmctanNvbnAnKTtcbnZhciB3ZWJzb2NrZXQgPSByZXF1aXJlKCcuL3dlYnNvY2tldCcpO1xuXG4vKipcbiAqIEV4cG9ydCB0cmFuc3BvcnRzLlxuICovXG5cbmV4cG9ydHMucG9sbGluZyA9IHBvbGxpbmc7XG5leHBvcnRzLndlYnNvY2tldCA9IHdlYnNvY2tldDtcblxuLyoqXG4gKiBQb2xsaW5nIHRyYW5zcG9ydCBwb2x5bW9ycGhpYyBjb25zdHJ1Y3Rvci5cbiAqIERlY2lkZXMgb24geGhyIHZzIGpzb25wIGJhc2VkIG9uIGZlYXR1cmUgZGV0ZWN0aW9uLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBvbGxpbmcob3B0cyl7XG4gIHZhciB4aHI7XG4gIHZhciB4ZCA9IGZhbHNlO1xuICB2YXIgeHMgPSBmYWxzZTtcbiAgdmFyIGpzb25wID0gZmFsc2UgIT09IG9wdHMuanNvbnA7XG5cbiAgaWYgKGdsb2JhbC5sb2NhdGlvbikge1xuICAgIHZhciBpc1NTTCA9ICdodHRwczonID09IGxvY2F0aW9uLnByb3RvY29sO1xuICAgIHZhciBwb3J0ID0gbG9jYXRpb24ucG9ydDtcblxuICAgIC8vIHNvbWUgdXNlciBhZ2VudHMgaGF2ZSBlbXB0eSBgbG9jYXRpb24ucG9ydGBcbiAgICBpZiAoIXBvcnQpIHtcbiAgICAgIHBvcnQgPSBpc1NTTCA/IDQ0MyA6IDgwO1xuICAgIH1cblxuICAgIHhkID0gb3B0cy5ob3N0bmFtZSAhPSBsb2NhdGlvbi5ob3N0bmFtZSB8fCBwb3J0ICE9IG9wdHMucG9ydDtcbiAgICB4cyA9IG9wdHMuc2VjdXJlICE9IGlzU1NMO1xuICB9XG5cbiAgb3B0cy54ZG9tYWluID0geGQ7XG4gIG9wdHMueHNjaGVtZSA9IHhzO1xuICB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3Qob3B0cyk7XG5cbiAgaWYgKCdvcGVuJyBpbiB4aHIgJiYgIW9wdHMuZm9yY2VKU09OUCkge1xuICAgIHJldHVybiBuZXcgWEhSKG9wdHMpO1xuICB9IGVsc2Uge1xuICAgIGlmICghanNvbnApIHRocm93IG5ldyBFcnJvcignSlNPTlAgZGlzYWJsZWQnKTtcbiAgICByZXR1cm4gbmV3IEpTT05QKG9wdHMpO1xuICB9XG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc29ja2V0LmlvLWNsaWVudC9+L2VuZ2luZS5pby1jbGllbnQvbGliL3RyYW5zcG9ydHMvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gYnJvd3NlciBzaGltIGZvciB4bWxodHRwcmVxdWVzdCBtb2R1bGVcbnZhciBoYXNDT1JTID0gcmVxdWlyZSgnaGFzLWNvcnMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvcHRzKSB7XG4gIHZhciB4ZG9tYWluID0gb3B0cy54ZG9tYWluO1xuXG4gIC8vIHNjaGVtZSBtdXN0IGJlIHNhbWUgd2hlbiB1c2lnbiBYRG9tYWluUmVxdWVzdFxuICAvLyBodHRwOi8vYmxvZ3MubXNkbi5jb20vYi9pZWludGVybmFscy9hcmNoaXZlLzIwMTAvMDUvMTMveGRvbWFpbnJlcXVlc3QtcmVzdHJpY3Rpb25zLWxpbWl0YXRpb25zLWFuZC13b3JrYXJvdW5kcy5hc3B4XG4gIHZhciB4c2NoZW1lID0gb3B0cy54c2NoZW1lO1xuXG4gIC8vIFhEb21haW5SZXF1ZXN0IGhhcyBhIGZsb3cgb2Ygbm90IHNlbmRpbmcgY29va2llLCB0aGVyZWZvcmUgaXQgc2hvdWxkIGJlIGRpc2FibGVkIGFzIGEgZGVmYXVsdC5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL0F1dG9tYXR0aWMvZW5naW5lLmlvLWNsaWVudC9wdWxsLzIxN1xuICB2YXIgZW5hYmxlc1hEUiA9IG9wdHMuZW5hYmxlc1hEUjtcblxuICAvLyBYTUxIdHRwUmVxdWVzdCBjYW4gYmUgZGlzYWJsZWQgb24gSUVcbiAgdHJ5IHtcbiAgICBpZiAoJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICYmICgheGRvbWFpbiB8fCBoYXNDT1JTKSkge1xuICAgICAgcmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkgeyB9XG5cbiAgLy8gVXNlIFhEb21haW5SZXF1ZXN0IGZvciBJRTggaWYgZW5hYmxlc1hEUiBpcyB0cnVlXG4gIC8vIGJlY2F1c2UgbG9hZGluZyBiYXIga2VlcHMgZmxhc2hpbmcgd2hlbiB1c2luZyBqc29ucC1wb2xsaW5nXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS95dWppb3Nha2Evc29ja2UuaW8taWU4LWxvYWRpbmctZXhhbXBsZVxuICB0cnkge1xuICAgIGlmICgndW5kZWZpbmVkJyAhPSB0eXBlb2YgWERvbWFpblJlcXVlc3QgJiYgIXhzY2hlbWUgJiYgZW5hYmxlc1hEUikge1xuICAgICAgcmV0dXJuIG5ldyBYRG9tYWluUmVxdWVzdCgpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkgeyB9XG5cbiAgaWYgKCF4ZG9tYWluKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTWljcm9zb2Z0LlhNTEhUVFAnKTtcbiAgICB9IGNhdGNoKGUpIHsgfVxuICB9XG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc29ja2V0LmlvLWNsaWVudC9+L2VuZ2luZS5pby1jbGllbnQvbGliL3htbGh0dHByZXF1ZXN0LmpzXG4gKiogbW9kdWxlIGlkID0gMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlxuLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBnbG9iYWwgPSByZXF1aXJlKCdnbG9iYWwnKTtcblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqXG4gKiBMb2dpYyBib3Jyb3dlZCBmcm9tIE1vZGVybml6cjpcbiAqXG4gKiAgIC0gaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvYmxvYi9tYXN0ZXIvZmVhdHVyZS1kZXRlY3RzL2NvcnMuanNcbiAqL1xuXG50cnkge1xuICBtb2R1bGUuZXhwb3J0cyA9ICdYTUxIdHRwUmVxdWVzdCcgaW4gZ2xvYmFsICYmXG4gICAgJ3dpdGhDcmVkZW50aWFscycgaW4gbmV3IGdsb2JhbC5YTUxIdHRwUmVxdWVzdCgpO1xufSBjYXRjaCAoZXJyKSB7XG4gIC8vIGlmIFhNTEh0dHAgc3VwcG9ydCBpcyBkaXNhYmxlZCBpbiBJRSB0aGVuIGl0IHdpbGwgdGhyb3dcbiAgLy8gd2hlbiB0cnlpbmcgdG8gY3JlYXRlXG4gIG1vZHVsZS5leHBvcnRzID0gZmFsc2U7XG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc29ja2V0LmlvLWNsaWVudC9+L2VuZ2luZS5pby1jbGllbnQvfi9oYXMtY29ycy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDIwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcbi8qKlxuICogUmV0dXJucyBgdGhpc2AuIEV4ZWN1dGUgdGhpcyB3aXRob3V0IGEgXCJjb250ZXh0XCIgKGkuZS4gd2l0aG91dCBpdCBiZWluZ1xuICogYXR0YWNoZWQgdG8gYW4gb2JqZWN0IG9mIHRoZSBsZWZ0LWhhbmQgc2lkZSksIGFuZCBgdGhpc2AgcG9pbnRzIHRvIHRoZVxuICogXCJnbG9iYWxcIiBzY29wZSBvZiB0aGUgY3VycmVudCBKUyBleGVjdXRpb24uXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSkoKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spLWRldi1zZXJ2ZXIvfi9zb2NrZXQuaW8tY2xpZW50L34vZW5naW5lLmlvLWNsaWVudC9+L2hhcy1jb3JzL34vZ2xvYmFsL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogTW9kdWxlIHJlcXVpcmVtZW50cy5cbiAqL1xuXG52YXIgWE1MSHR0cFJlcXVlc3QgPSByZXF1aXJlKCd4bWxodHRwcmVxdWVzdCcpO1xudmFyIFBvbGxpbmcgPSByZXF1aXJlKCcuL3BvbGxpbmcnKTtcbnZhciBFbWl0dGVyID0gcmVxdWlyZSgnY29tcG9uZW50LWVtaXR0ZXInKTtcbnZhciBpbmhlcml0ID0gcmVxdWlyZSgnY29tcG9uZW50LWluaGVyaXQnKTtcbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ2VuZ2luZS5pby1jbGllbnQ6cG9sbGluZy14aHInKTtcblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFhIUjtcbm1vZHVsZS5leHBvcnRzLlJlcXVlc3QgPSBSZXF1ZXN0O1xuXG4vKipcbiAqIEVtcHR5IGZ1bmN0aW9uXG4gKi9cblxuZnVuY3Rpb24gZW1wdHkoKXt9XG5cbi8qKlxuICogWEhSIFBvbGxpbmcgY29uc3RydWN0b3IuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gWEhSKG9wdHMpe1xuICBQb2xsaW5nLmNhbGwodGhpcywgb3B0cyk7XG5cbiAgaWYgKGdsb2JhbC5sb2NhdGlvbikge1xuICAgIHZhciBpc1NTTCA9ICdodHRwczonID09IGxvY2F0aW9uLnByb3RvY29sO1xuICAgIHZhciBwb3J0ID0gbG9jYXRpb24ucG9ydDtcblxuICAgIC8vIHNvbWUgdXNlciBhZ2VudHMgaGF2ZSBlbXB0eSBgbG9jYXRpb24ucG9ydGBcbiAgICBpZiAoIXBvcnQpIHtcbiAgICAgIHBvcnQgPSBpc1NTTCA/IDQ0MyA6IDgwO1xuICAgIH1cblxuICAgIHRoaXMueGQgPSBvcHRzLmhvc3RuYW1lICE9IGdsb2JhbC5sb2NhdGlvbi5ob3N0bmFtZSB8fFxuICAgICAgcG9ydCAhPSBvcHRzLnBvcnQ7XG4gICAgdGhpcy54cyA9IG9wdHMuc2VjdXJlICE9IGlzU1NMO1xuICB9XG59XG5cbi8qKlxuICogSW5oZXJpdHMgZnJvbSBQb2xsaW5nLlxuICovXG5cbmluaGVyaXQoWEhSLCBQb2xsaW5nKTtcblxuLyoqXG4gKiBYSFIgc3VwcG9ydHMgYmluYXJ5XG4gKi9cblxuWEhSLnByb3RvdHlwZS5zdXBwb3J0c0JpbmFyeSA9IHRydWU7XG5cbi8qKlxuICogQ3JlYXRlcyBhIHJlcXVlc3QuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuWEhSLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24ob3B0cyl7XG4gIG9wdHMgPSBvcHRzIHx8IHt9O1xuICBvcHRzLnVyaSA9IHRoaXMudXJpKCk7XG4gIG9wdHMueGQgPSB0aGlzLnhkO1xuICBvcHRzLnhzID0gdGhpcy54cztcbiAgb3B0cy5hZ2VudCA9IHRoaXMuYWdlbnQgfHwgZmFsc2U7XG4gIG9wdHMuc3VwcG9ydHNCaW5hcnkgPSB0aGlzLnN1cHBvcnRzQmluYXJ5O1xuICBvcHRzLmVuYWJsZXNYRFIgPSB0aGlzLmVuYWJsZXNYRFI7XG5cbiAgLy8gU1NMIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG4gIG9wdHMucGZ4ID0gdGhpcy5wZng7XG4gIG9wdHMua2V5ID0gdGhpcy5rZXk7XG4gIG9wdHMucGFzc3BocmFzZSA9IHRoaXMucGFzc3BocmFzZTtcbiAgb3B0cy5jZXJ0ID0gdGhpcy5jZXJ0O1xuICBvcHRzLmNhID0gdGhpcy5jYTtcbiAgb3B0cy5jaXBoZXJzID0gdGhpcy5jaXBoZXJzO1xuICBvcHRzLnJlamVjdFVuYXV0aG9yaXplZCA9IHRoaXMucmVqZWN0VW5hdXRob3JpemVkO1xuXG4gIHJldHVybiBuZXcgUmVxdWVzdChvcHRzKTtcbn07XG5cbi8qKlxuICogU2VuZHMgZGF0YS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZGF0YSB0byBzZW5kLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGVkIHVwb24gZmx1c2guXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5YSFIucHJvdG90eXBlLmRvV3JpdGUgPSBmdW5jdGlvbihkYXRhLCBmbil7XG4gIHZhciBpc0JpbmFyeSA9IHR5cGVvZiBkYXRhICE9PSAnc3RyaW5nJyAmJiBkYXRhICE9PSB1bmRlZmluZWQ7XG4gIHZhciByZXEgPSB0aGlzLnJlcXVlc3QoeyBtZXRob2Q6ICdQT1NUJywgZGF0YTogZGF0YSwgaXNCaW5hcnk6IGlzQmluYXJ5IH0pO1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHJlcS5vbignc3VjY2VzcycsIGZuKTtcbiAgcmVxLm9uKCdlcnJvcicsIGZ1bmN0aW9uKGVycil7XG4gICAgc2VsZi5vbkVycm9yKCd4aHIgcG9zdCBlcnJvcicsIGVycik7XG4gIH0pO1xuICB0aGlzLnNlbmRYaHIgPSByZXE7XG59O1xuXG4vKipcbiAqIFN0YXJ0cyBhIHBvbGwgY3ljbGUuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuWEhSLnByb3RvdHlwZS5kb1BvbGwgPSBmdW5jdGlvbigpe1xuICBkZWJ1ZygneGhyIHBvbGwnKTtcbiAgdmFyIHJlcSA9IHRoaXMucmVxdWVzdCgpO1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHJlcS5vbignZGF0YScsIGZ1bmN0aW9uKGRhdGEpe1xuICAgIHNlbGYub25EYXRhKGRhdGEpO1xuICB9KTtcbiAgcmVxLm9uKCdlcnJvcicsIGZ1bmN0aW9uKGVycil7XG4gICAgc2VsZi5vbkVycm9yKCd4aHIgcG9sbCBlcnJvcicsIGVycik7XG4gIH0pO1xuICB0aGlzLnBvbGxYaHIgPSByZXE7XG59O1xuXG4vKipcbiAqIFJlcXVlc3QgY29uc3RydWN0b3JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBSZXF1ZXN0KG9wdHMpe1xuICB0aGlzLm1ldGhvZCA9IG9wdHMubWV0aG9kIHx8ICdHRVQnO1xuICB0aGlzLnVyaSA9IG9wdHMudXJpO1xuICB0aGlzLnhkID0gISFvcHRzLnhkO1xuICB0aGlzLnhzID0gISFvcHRzLnhzO1xuICB0aGlzLmFzeW5jID0gZmFsc2UgIT09IG9wdHMuYXN5bmM7XG4gIHRoaXMuZGF0YSA9IHVuZGVmaW5lZCAhPSBvcHRzLmRhdGEgPyBvcHRzLmRhdGEgOiBudWxsO1xuICB0aGlzLmFnZW50ID0gb3B0cy5hZ2VudDtcbiAgdGhpcy5pc0JpbmFyeSA9IG9wdHMuaXNCaW5hcnk7XG4gIHRoaXMuc3VwcG9ydHNCaW5hcnkgPSBvcHRzLnN1cHBvcnRzQmluYXJ5O1xuICB0aGlzLmVuYWJsZXNYRFIgPSBvcHRzLmVuYWJsZXNYRFI7XG5cbiAgLy8gU1NMIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG4gIHRoaXMucGZ4ID0gb3B0cy5wZng7XG4gIHRoaXMua2V5ID0gb3B0cy5rZXk7XG4gIHRoaXMucGFzc3BocmFzZSA9IG9wdHMucGFzc3BocmFzZTtcbiAgdGhpcy5jZXJ0ID0gb3B0cy5jZXJ0O1xuICB0aGlzLmNhID0gb3B0cy5jYTtcbiAgdGhpcy5jaXBoZXJzID0gb3B0cy5jaXBoZXJzO1xuICB0aGlzLnJlamVjdFVuYXV0aG9yaXplZCA9IG9wdHMucmVqZWN0VW5hdXRob3JpemVkO1xuXG4gIHRoaXMuY3JlYXRlKCk7XG59XG5cbi8qKlxuICogTWl4IGluIGBFbWl0dGVyYC5cbiAqL1xuXG5FbWl0dGVyKFJlcXVlc3QucHJvdG90eXBlKTtcblxuLyoqXG4gKiBDcmVhdGVzIHRoZSBYSFIgb2JqZWN0IGFuZCBzZW5kcyB0aGUgcmVxdWVzdC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbigpe1xuICB2YXIgb3B0cyA9IHsgYWdlbnQ6IHRoaXMuYWdlbnQsIHhkb21haW46IHRoaXMueGQsIHhzY2hlbWU6IHRoaXMueHMsIGVuYWJsZXNYRFI6IHRoaXMuZW5hYmxlc1hEUiB9O1xuXG4gIC8vIFNTTCBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxuICBvcHRzLnBmeCA9IHRoaXMucGZ4O1xuICBvcHRzLmtleSA9IHRoaXMua2V5O1xuICBvcHRzLnBhc3NwaHJhc2UgPSB0aGlzLnBhc3NwaHJhc2U7XG4gIG9wdHMuY2VydCA9IHRoaXMuY2VydDtcbiAgb3B0cy5jYSA9IHRoaXMuY2E7XG4gIG9wdHMuY2lwaGVycyA9IHRoaXMuY2lwaGVycztcbiAgb3B0cy5yZWplY3RVbmF1dGhvcml6ZWQgPSB0aGlzLnJlamVjdFVuYXV0aG9yaXplZDtcblxuICB2YXIgeGhyID0gdGhpcy54aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3Qob3B0cyk7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICB0cnkge1xuICAgIGRlYnVnKCd4aHIgb3BlbiAlczogJXMnLCB0aGlzLm1ldGhvZCwgdGhpcy51cmkpO1xuICAgIHhoci5vcGVuKHRoaXMubWV0aG9kLCB0aGlzLnVyaSwgdGhpcy5hc3luYyk7XG4gICAgaWYgKHRoaXMuc3VwcG9ydHNCaW5hcnkpIHtcbiAgICAgIC8vIFRoaXMgaGFzIHRvIGJlIGRvbmUgYWZ0ZXIgb3BlbiBiZWNhdXNlIEZpcmVmb3ggaXMgc3R1cGlkXG4gICAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEzMjE2OTAzL2dldC1iaW5hcnktZGF0YS13aXRoLXhtbGh0dHByZXF1ZXN0LWluLWEtZmlyZWZveC1leHRlbnNpb25cbiAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xuICAgIH1cblxuICAgIGlmICgnUE9TVCcgPT0gdGhpcy5tZXRob2QpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICh0aGlzLmlzQmluYXJ5KSB7XG4gICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCcpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7fVxuICAgIH1cblxuICAgIC8vIGllNiBjaGVja1xuICAgIGlmICgnd2l0aENyZWRlbnRpYWxzJyBpbiB4aHIpIHtcbiAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmhhc1hEUigpKSB7XG4gICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24oKXtcbiAgICAgICAgc2VsZi5vbkxvYWQoKTtcbiAgICAgIH07XG4gICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHNlbGYub25FcnJvcih4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpe1xuICAgICAgICBpZiAoNCAhPSB4aHIucmVhZHlTdGF0ZSkgcmV0dXJuO1xuICAgICAgICBpZiAoMjAwID09IHhoci5zdGF0dXMgfHwgMTIyMyA9PSB4aHIuc3RhdHVzKSB7XG4gICAgICAgICAgc2VsZi5vbkxvYWQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBtYWtlIHN1cmUgdGhlIGBlcnJvcmAgZXZlbnQgaGFuZGxlciB0aGF0J3MgdXNlci1zZXRcbiAgICAgICAgICAvLyBkb2VzIG5vdCB0aHJvdyBpbiB0aGUgc2FtZSB0aWNrIGFuZCBnZXRzIGNhdWdodCBoZXJlXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2VsZi5vbkVycm9yKHhoci5zdGF0dXMpO1xuICAgICAgICAgIH0sIDApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIGRlYnVnKCd4aHIgZGF0YSAlcycsIHRoaXMuZGF0YSk7XG4gICAgeGhyLnNlbmQodGhpcy5kYXRhKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIE5lZWQgdG8gZGVmZXIgc2luY2UgLmNyZWF0ZSgpIGlzIGNhbGxlZCBkaXJlY3RseSBmaHJvbSB0aGUgY29uc3RydWN0b3JcbiAgICAvLyBhbmQgdGh1cyB0aGUgJ2Vycm9yJyBldmVudCBjYW4gb25seSBiZSBvbmx5IGJvdW5kICphZnRlciogdGhpcyBleGNlcHRpb25cbiAgICAvLyBvY2N1cnMuICBUaGVyZWZvcmUsIGFsc28sIHdlIGNhbm5vdCB0aHJvdyBoZXJlIGF0IGFsbC5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5vbkVycm9yKGUpO1xuICAgIH0sIDApO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChnbG9iYWwuZG9jdW1lbnQpIHtcbiAgICB0aGlzLmluZGV4ID0gUmVxdWVzdC5yZXF1ZXN0c0NvdW50Kys7XG4gICAgUmVxdWVzdC5yZXF1ZXN0c1t0aGlzLmluZGV4XSA9IHRoaXM7XG4gIH1cbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gc3VjY2Vzc2Z1bCByZXNwb25zZS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5vblN1Y2Nlc3MgPSBmdW5jdGlvbigpe1xuICB0aGlzLmVtaXQoJ3N1Y2Nlc3MnKTtcbiAgdGhpcy5jbGVhbnVwKCk7XG59O1xuXG4vKipcbiAqIENhbGxlZCBpZiB3ZSBoYXZlIGRhdGEuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUub25EYXRhID0gZnVuY3Rpb24oZGF0YSl7XG4gIHRoaXMuZW1pdCgnZGF0YScsIGRhdGEpO1xuICB0aGlzLm9uU3VjY2VzcygpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBlcnJvci5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5vbkVycm9yID0gZnVuY3Rpb24oZXJyKXtcbiAgdGhpcy5lbWl0KCdlcnJvcicsIGVycik7XG4gIHRoaXMuY2xlYW51cCh0cnVlKTtcbn07XG5cbi8qKlxuICogQ2xlYW5zIHVwIGhvdXNlLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmNsZWFudXAgPSBmdW5jdGlvbihmcm9tRXJyb3Ipe1xuICBpZiAoJ3VuZGVmaW5lZCcgPT0gdHlwZW9mIHRoaXMueGhyIHx8IG51bGwgPT09IHRoaXMueGhyKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIHhtbGh0dHByZXF1ZXN0XG4gIGlmICh0aGlzLmhhc1hEUigpKSB7XG4gICAgdGhpcy54aHIub25sb2FkID0gdGhpcy54aHIub25lcnJvciA9IGVtcHR5O1xuICB9IGVsc2Uge1xuICAgIHRoaXMueGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGVtcHR5O1xuICB9XG5cbiAgaWYgKGZyb21FcnJvcikge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnhoci5hYm9ydCgpO1xuICAgIH0gY2F0Y2goZSkge31cbiAgfVxuXG4gIGlmIChnbG9iYWwuZG9jdW1lbnQpIHtcbiAgICBkZWxldGUgUmVxdWVzdC5yZXF1ZXN0c1t0aGlzLmluZGV4XTtcbiAgfVxuXG4gIHRoaXMueGhyID0gbnVsbDtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gbG9hZC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5vbkxvYWQgPSBmdW5jdGlvbigpe1xuICB2YXIgZGF0YTtcbiAgdHJ5IHtcbiAgICB2YXIgY29udGVudFR5cGU7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnRlbnRUeXBlID0gdGhpcy54aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ0NvbnRlbnQtVHlwZScpLnNwbGl0KCc7JylbMF07XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICBpZiAoY29udGVudFR5cGUgPT09ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nKSB7XG4gICAgICBkYXRhID0gdGhpcy54aHIucmVzcG9uc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5zdXBwb3J0c0JpbmFyeSkge1xuICAgICAgICBkYXRhID0gdGhpcy54aHIucmVzcG9uc2VUZXh0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF0YSA9ICdvayc7XG4gICAgICB9XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgdGhpcy5vbkVycm9yKGUpO1xuICB9XG4gIGlmIChudWxsICE9IGRhdGEpIHtcbiAgICB0aGlzLm9uRGF0YShkYXRhKTtcbiAgfVxufTtcblxuLyoqXG4gKiBDaGVjayBpZiBpdCBoYXMgWERvbWFpblJlcXVlc3QuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuaGFzWERSID0gZnVuY3Rpb24oKXtcbiAgcmV0dXJuICd1bmRlZmluZWQnICE9PSB0eXBlb2YgZ2xvYmFsLlhEb21haW5SZXF1ZXN0ICYmICF0aGlzLnhzICYmIHRoaXMuZW5hYmxlc1hEUjtcbn07XG5cbi8qKlxuICogQWJvcnRzIHRoZSByZXF1ZXN0LlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuYWJvcnQgPSBmdW5jdGlvbigpe1xuICB0aGlzLmNsZWFudXAoKTtcbn07XG5cbi8qKlxuICogQWJvcnRzIHBlbmRpbmcgcmVxdWVzdHMgd2hlbiB1bmxvYWRpbmcgdGhlIHdpbmRvdy4gVGhpcyBpcyBuZWVkZWQgdG8gcHJldmVudFxuICogbWVtb3J5IGxlYWtzIChlLmcuIHdoZW4gdXNpbmcgSUUpIGFuZCB0byBlbnN1cmUgdGhhdCBubyBzcHVyaW91cyBlcnJvciBpc1xuICogZW1pdHRlZC5cbiAqL1xuXG5pZiAoZ2xvYmFsLmRvY3VtZW50KSB7XG4gIFJlcXVlc3QucmVxdWVzdHNDb3VudCA9IDA7XG4gIFJlcXVlc3QucmVxdWVzdHMgPSB7fTtcbiAgaWYgKGdsb2JhbC5hdHRhY2hFdmVudCkge1xuICAgIGdsb2JhbC5hdHRhY2hFdmVudCgnb251bmxvYWQnLCB1bmxvYWRIYW5kbGVyKTtcbiAgfSBlbHNlIGlmIChnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCB1bmxvYWRIYW5kbGVyLCBmYWxzZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdW5sb2FkSGFuZGxlcigpIHtcbiAgZm9yICh2YXIgaSBpbiBSZXF1ZXN0LnJlcXVlc3RzKSB7XG4gICAgaWYgKFJlcXVlc3QucmVxdWVzdHMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgIFJlcXVlc3QucmVxdWVzdHNbaV0uYWJvcnQoKTtcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spLWRldi1zZXJ2ZXIvfi9zb2NrZXQuaW8tY2xpZW50L34vZW5naW5lLmlvLWNsaWVudC9saWIvdHJhbnNwb3J0cy9wb2xsaW5nLXhoci5qc1xuICoqIG1vZHVsZSBpZCA9IDIyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIFRyYW5zcG9ydCA9IHJlcXVpcmUoJy4uL3RyYW5zcG9ydCcpO1xudmFyIHBhcnNlcXMgPSByZXF1aXJlKCdwYXJzZXFzJyk7XG52YXIgcGFyc2VyID0gcmVxdWlyZSgnZW5naW5lLmlvLXBhcnNlcicpO1xudmFyIGluaGVyaXQgPSByZXF1aXJlKCdjb21wb25lbnQtaW5oZXJpdCcpO1xudmFyIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnZW5naW5lLmlvLWNsaWVudDpwb2xsaW5nJyk7XG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBQb2xsaW5nO1xuXG4vKipcbiAqIElzIFhIUjIgc3VwcG9ydGVkP1xuICovXG5cbnZhciBoYXNYSFIyID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgWE1MSHR0cFJlcXVlc3QgPSByZXF1aXJlKCd4bWxodHRwcmVxdWVzdCcpO1xuICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KHsgeGRvbWFpbjogZmFsc2UgfSk7XG4gIHJldHVybiBudWxsICE9IHhoci5yZXNwb25zZVR5cGU7XG59KSgpO1xuXG4vKipcbiAqIFBvbGxpbmcgaW50ZXJmYWNlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBQb2xsaW5nKG9wdHMpe1xuICB2YXIgZm9yY2VCYXNlNjQgPSAob3B0cyAmJiBvcHRzLmZvcmNlQmFzZTY0KTtcbiAgaWYgKCFoYXNYSFIyIHx8IGZvcmNlQmFzZTY0KSB7XG4gICAgdGhpcy5zdXBwb3J0c0JpbmFyeSA9IGZhbHNlO1xuICB9XG4gIFRyYW5zcG9ydC5jYWxsKHRoaXMsIG9wdHMpO1xufVxuXG4vKipcbiAqIEluaGVyaXRzIGZyb20gVHJhbnNwb3J0LlxuICovXG5cbmluaGVyaXQoUG9sbGluZywgVHJhbnNwb3J0KTtcblxuLyoqXG4gKiBUcmFuc3BvcnQgbmFtZS5cbiAqL1xuXG5Qb2xsaW5nLnByb3RvdHlwZS5uYW1lID0gJ3BvbGxpbmcnO1xuXG4vKipcbiAqIE9wZW5zIHRoZSBzb2NrZXQgKHRyaWdnZXJzIHBvbGxpbmcpLiBXZSB3cml0ZSBhIFBJTkcgbWVzc2FnZSB0byBkZXRlcm1pbmVcbiAqIHdoZW4gdGhlIHRyYW5zcG9ydCBpcyBvcGVuLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblBvbGxpbmcucHJvdG90eXBlLmRvT3BlbiA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMucG9sbCgpO1xufTtcblxuLyoqXG4gKiBQYXVzZXMgcG9sbGluZy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayB1cG9uIGJ1ZmZlcnMgYXJlIGZsdXNoZWQgYW5kIHRyYW5zcG9ydCBpcyBwYXVzZWRcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblBvbGxpbmcucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24ob25QYXVzZSl7XG4gIHZhciBwZW5kaW5nID0gMDtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIHRoaXMucmVhZHlTdGF0ZSA9ICdwYXVzaW5nJztcblxuICBmdW5jdGlvbiBwYXVzZSgpe1xuICAgIGRlYnVnKCdwYXVzZWQnKTtcbiAgICBzZWxmLnJlYWR5U3RhdGUgPSAncGF1c2VkJztcbiAgICBvblBhdXNlKCk7XG4gIH1cblxuICBpZiAodGhpcy5wb2xsaW5nIHx8ICF0aGlzLndyaXRhYmxlKSB7XG4gICAgdmFyIHRvdGFsID0gMDtcblxuICAgIGlmICh0aGlzLnBvbGxpbmcpIHtcbiAgICAgIGRlYnVnKCd3ZSBhcmUgY3VycmVudGx5IHBvbGxpbmcgLSB3YWl0aW5nIHRvIHBhdXNlJyk7XG4gICAgICB0b3RhbCsrO1xuICAgICAgdGhpcy5vbmNlKCdwb2xsQ29tcGxldGUnLCBmdW5jdGlvbigpe1xuICAgICAgICBkZWJ1ZygncHJlLXBhdXNlIHBvbGxpbmcgY29tcGxldGUnKTtcbiAgICAgICAgLS10b3RhbCB8fCBwYXVzZSgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLndyaXRhYmxlKSB7XG4gICAgICBkZWJ1Zygnd2UgYXJlIGN1cnJlbnRseSB3cml0aW5nIC0gd2FpdGluZyB0byBwYXVzZScpO1xuICAgICAgdG90YWwrKztcbiAgICAgIHRoaXMub25jZSgnZHJhaW4nLCBmdW5jdGlvbigpe1xuICAgICAgICBkZWJ1ZygncHJlLXBhdXNlIHdyaXRpbmcgY29tcGxldGUnKTtcbiAgICAgICAgLS10b3RhbCB8fCBwYXVzZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHBhdXNlKCk7XG4gIH1cbn07XG5cbi8qKlxuICogU3RhcnRzIHBvbGxpbmcgY3ljbGUuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5Qb2xsaW5nLnByb3RvdHlwZS5wb2xsID0gZnVuY3Rpb24oKXtcbiAgZGVidWcoJ3BvbGxpbmcnKTtcbiAgdGhpcy5wb2xsaW5nID0gdHJ1ZTtcbiAgdGhpcy5kb1BvbGwoKTtcbiAgdGhpcy5lbWl0KCdwb2xsJyk7XG59O1xuXG4vKipcbiAqIE92ZXJsb2FkcyBvbkRhdGEgdG8gZGV0ZWN0IHBheWxvYWRzLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblBvbGxpbmcucHJvdG90eXBlLm9uRGF0YSA9IGZ1bmN0aW9uKGRhdGEpe1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIGRlYnVnKCdwb2xsaW5nIGdvdCBkYXRhICVzJywgZGF0YSk7XG4gIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKHBhY2tldCwgaW5kZXgsIHRvdGFsKSB7XG4gICAgLy8gaWYgaXRzIHRoZSBmaXJzdCBtZXNzYWdlIHdlIGNvbnNpZGVyIHRoZSB0cmFuc3BvcnQgb3BlblxuICAgIGlmICgnb3BlbmluZycgPT0gc2VsZi5yZWFkeVN0YXRlKSB7XG4gICAgICBzZWxmLm9uT3BlbigpO1xuICAgIH1cblxuICAgIC8vIGlmIGl0cyBhIGNsb3NlIHBhY2tldCwgd2UgY2xvc2UgdGhlIG9uZ29pbmcgcmVxdWVzdHNcbiAgICBpZiAoJ2Nsb3NlJyA9PSBwYWNrZXQudHlwZSkge1xuICAgICAgc2VsZi5vbkNsb3NlKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gb3RoZXJ3aXNlIGJ5cGFzcyBvbkRhdGEgYW5kIGhhbmRsZSB0aGUgbWVzc2FnZVxuICAgIHNlbGYub25QYWNrZXQocGFja2V0KTtcbiAgfTtcblxuICAvLyBkZWNvZGUgcGF5bG9hZFxuICBwYXJzZXIuZGVjb2RlUGF5bG9hZChkYXRhLCB0aGlzLnNvY2tldC5iaW5hcnlUeXBlLCBjYWxsYmFjayk7XG5cbiAgLy8gaWYgYW4gZXZlbnQgZGlkIG5vdCB0cmlnZ2VyIGNsb3NpbmdcbiAgaWYgKCdjbG9zZWQnICE9IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgIC8vIGlmIHdlIGdvdCBkYXRhIHdlJ3JlIG5vdCBwb2xsaW5nXG4gICAgdGhpcy5wb2xsaW5nID0gZmFsc2U7XG4gICAgdGhpcy5lbWl0KCdwb2xsQ29tcGxldGUnKTtcblxuICAgIGlmICgnb3BlbicgPT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICB0aGlzLnBvbGwoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVidWcoJ2lnbm9yaW5nIHBvbGwgLSB0cmFuc3BvcnQgc3RhdGUgXCIlc1wiJywgdGhpcy5yZWFkeVN0YXRlKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogRm9yIHBvbGxpbmcsIHNlbmQgYSBjbG9zZSBwYWNrZXQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUG9sbGluZy5wcm90b3R5cGUuZG9DbG9zZSA9IGZ1bmN0aW9uKCl7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICBmdW5jdGlvbiBjbG9zZSgpe1xuICAgIGRlYnVnKCd3cml0aW5nIGNsb3NlIHBhY2tldCcpO1xuICAgIHNlbGYud3JpdGUoW3sgdHlwZTogJ2Nsb3NlJyB9XSk7XG4gIH1cblxuICBpZiAoJ29wZW4nID09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgIGRlYnVnKCd0cmFuc3BvcnQgb3BlbiAtIGNsb3NpbmcnKTtcbiAgICBjbG9zZSgpO1xuICB9IGVsc2Uge1xuICAgIC8vIGluIGNhc2Ugd2UncmUgdHJ5aW5nIHRvIGNsb3NlIHdoaWxlXG4gICAgLy8gaGFuZHNoYWtpbmcgaXMgaW4gcHJvZ3Jlc3MgKEdILTE2NClcbiAgICBkZWJ1ZygndHJhbnNwb3J0IG5vdCBvcGVuIC0gZGVmZXJyaW5nIGNsb3NlJyk7XG4gICAgdGhpcy5vbmNlKCdvcGVuJywgY2xvc2UpO1xuICB9XG59O1xuXG4vKipcbiAqIFdyaXRlcyBhIHBhY2tldHMgcGF5bG9hZC5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBkYXRhIHBhY2tldHNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGRyYWluIGNhbGxiYWNrXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Qb2xsaW5nLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uKHBhY2tldHMpe1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHRoaXMud3JpdGFibGUgPSBmYWxzZTtcbiAgdmFyIGNhbGxiYWNrZm4gPSBmdW5jdGlvbigpIHtcbiAgICBzZWxmLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBzZWxmLmVtaXQoJ2RyYWluJyk7XG4gIH07XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBwYXJzZXIuZW5jb2RlUGF5bG9hZChwYWNrZXRzLCB0aGlzLnN1cHBvcnRzQmluYXJ5LCBmdW5jdGlvbihkYXRhKSB7XG4gICAgc2VsZi5kb1dyaXRlKGRhdGEsIGNhbGxiYWNrZm4pO1xuICB9KTtcbn07XG5cbi8qKlxuICogR2VuZXJhdGVzIHVyaSBmb3IgY29ubmVjdGlvbi5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Qb2xsaW5nLnByb3RvdHlwZS51cmkgPSBmdW5jdGlvbigpe1xuICB2YXIgcXVlcnkgPSB0aGlzLnF1ZXJ5IHx8IHt9O1xuICB2YXIgc2NoZW1hID0gdGhpcy5zZWN1cmUgPyAnaHR0cHMnIDogJ2h0dHAnO1xuICB2YXIgcG9ydCA9ICcnO1xuXG4gIC8vIGNhY2hlIGJ1c3RpbmcgaXMgZm9yY2VkXG4gIGlmIChmYWxzZSAhPT0gdGhpcy50aW1lc3RhbXBSZXF1ZXN0cykge1xuICAgIHF1ZXJ5W3RoaXMudGltZXN0YW1wUGFyYW1dID0gK25ldyBEYXRlICsgJy0nICsgVHJhbnNwb3J0LnRpbWVzdGFtcHMrKztcbiAgfVxuXG4gIGlmICghdGhpcy5zdXBwb3J0c0JpbmFyeSAmJiAhcXVlcnkuc2lkKSB7XG4gICAgcXVlcnkuYjY0ID0gMTtcbiAgfVxuXG4gIHF1ZXJ5ID0gcGFyc2Vxcy5lbmNvZGUocXVlcnkpO1xuXG4gIC8vIGF2b2lkIHBvcnQgaWYgZGVmYXVsdCBmb3Igc2NoZW1hXG4gIGlmICh0aGlzLnBvcnQgJiYgKCgnaHR0cHMnID09IHNjaGVtYSAmJiB0aGlzLnBvcnQgIT0gNDQzKSB8fFxuICAgICAoJ2h0dHAnID09IHNjaGVtYSAmJiB0aGlzLnBvcnQgIT0gODApKSkge1xuICAgIHBvcnQgPSAnOicgKyB0aGlzLnBvcnQ7XG4gIH1cblxuICAvLyBwcmVwZW5kID8gdG8gcXVlcnlcbiAgaWYgKHF1ZXJ5Lmxlbmd0aCkge1xuICAgIHF1ZXJ5ID0gJz8nICsgcXVlcnk7XG4gIH1cblxuICByZXR1cm4gc2NoZW1hICsgJzovLycgKyB0aGlzLmhvc3RuYW1lICsgcG9ydCArIHRoaXMucGF0aCArIHF1ZXJ5O1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spLWRldi1zZXJ2ZXIvfi9zb2NrZXQuaW8tY2xpZW50L34vZW5naW5lLmlvLWNsaWVudC9saWIvdHJhbnNwb3J0cy9wb2xsaW5nLmpzXG4gKiogbW9kdWxlIGlkID0gMjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgcGFyc2VyID0gcmVxdWlyZSgnZW5naW5lLmlvLXBhcnNlcicpO1xudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCdjb21wb25lbnQtZW1pdHRlcicpO1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gVHJhbnNwb3J0O1xuXG4vKipcbiAqIFRyYW5zcG9ydCBhYnN0cmFjdCBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIFRyYW5zcG9ydCAob3B0cykge1xuICB0aGlzLnBhdGggPSBvcHRzLnBhdGg7XG4gIHRoaXMuaG9zdG5hbWUgPSBvcHRzLmhvc3RuYW1lO1xuICB0aGlzLnBvcnQgPSBvcHRzLnBvcnQ7XG4gIHRoaXMuc2VjdXJlID0gb3B0cy5zZWN1cmU7XG4gIHRoaXMucXVlcnkgPSBvcHRzLnF1ZXJ5O1xuICB0aGlzLnRpbWVzdGFtcFBhcmFtID0gb3B0cy50aW1lc3RhbXBQYXJhbTtcbiAgdGhpcy50aW1lc3RhbXBSZXF1ZXN0cyA9IG9wdHMudGltZXN0YW1wUmVxdWVzdHM7XG4gIHRoaXMucmVhZHlTdGF0ZSA9ICcnO1xuICB0aGlzLmFnZW50ID0gb3B0cy5hZ2VudCB8fCBmYWxzZTtcbiAgdGhpcy5zb2NrZXQgPSBvcHRzLnNvY2tldDtcbiAgdGhpcy5lbmFibGVzWERSID0gb3B0cy5lbmFibGVzWERSO1xuXG4gIC8vIFNTTCBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxuICB0aGlzLnBmeCA9IG9wdHMucGZ4O1xuICB0aGlzLmtleSA9IG9wdHMua2V5O1xuICB0aGlzLnBhc3NwaHJhc2UgPSBvcHRzLnBhc3NwaHJhc2U7XG4gIHRoaXMuY2VydCA9IG9wdHMuY2VydDtcbiAgdGhpcy5jYSA9IG9wdHMuY2E7XG4gIHRoaXMuY2lwaGVycyA9IG9wdHMuY2lwaGVycztcbiAgdGhpcy5yZWplY3RVbmF1dGhvcml6ZWQgPSBvcHRzLnJlamVjdFVuYXV0aG9yaXplZDtcbn1cblxuLyoqXG4gKiBNaXggaW4gYEVtaXR0ZXJgLlxuICovXG5cbkVtaXR0ZXIoVHJhbnNwb3J0LnByb3RvdHlwZSk7XG5cbi8qKlxuICogQSBjb3VudGVyIHVzZWQgdG8gcHJldmVudCBjb2xsaXNpb25zIGluIHRoZSB0aW1lc3RhbXBzIHVzZWRcbiAqIGZvciBjYWNoZSBidXN0aW5nLlxuICovXG5cblRyYW5zcG9ydC50aW1lc3RhbXBzID0gMDtcblxuLyoqXG4gKiBFbWl0cyBhbiBlcnJvci5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtUcmFuc3BvcnR9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5UcmFuc3BvcnQucHJvdG90eXBlLm9uRXJyb3IgPSBmdW5jdGlvbiAobXNnLCBkZXNjKSB7XG4gIHZhciBlcnIgPSBuZXcgRXJyb3IobXNnKTtcbiAgZXJyLnR5cGUgPSAnVHJhbnNwb3J0RXJyb3InO1xuICBlcnIuZGVzY3JpcHRpb24gPSBkZXNjO1xuICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIE9wZW5zIHRoZSB0cmFuc3BvcnQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5UcmFuc3BvcnQucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gIGlmICgnY2xvc2VkJyA9PSB0aGlzLnJlYWR5U3RhdGUgfHwgJycgPT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgdGhpcy5yZWFkeVN0YXRlID0gJ29wZW5pbmcnO1xuICAgIHRoaXMuZG9PcGVuKCk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQ2xvc2VzIHRoZSB0cmFuc3BvcnQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuVHJhbnNwb3J0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCdvcGVuaW5nJyA9PSB0aGlzLnJlYWR5U3RhdGUgfHwgJ29wZW4nID09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgIHRoaXMuZG9DbG9zZSgpO1xuICAgIHRoaXMub25DbG9zZSgpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNlbmRzIG11bHRpcGxlIHBhY2tldHMuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gcGFja2V0c1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuVHJhbnNwb3J0LnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24ocGFja2V0cyl7XG4gIGlmICgnb3BlbicgPT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgdGhpcy53cml0ZShwYWNrZXRzKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyYW5zcG9ydCBub3Qgb3BlbicpO1xuICB9XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIG9wZW5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5UcmFuc3BvcnQucHJvdG90eXBlLm9uT3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5yZWFkeVN0YXRlID0gJ29wZW4nO1xuICB0aGlzLndyaXRhYmxlID0gdHJ1ZTtcbiAgdGhpcy5lbWl0KCdvcGVuJyk7XG59O1xuXG4vKipcbiAqIENhbGxlZCB3aXRoIGRhdGEuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGRhdGFcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblRyYW5zcG9ydC5wcm90b3R5cGUub25EYXRhID0gZnVuY3Rpb24oZGF0YSl7XG4gIHZhciBwYWNrZXQgPSBwYXJzZXIuZGVjb2RlUGFja2V0KGRhdGEsIHRoaXMuc29ja2V0LmJpbmFyeVR5cGUpO1xuICB0aGlzLm9uUGFja2V0KHBhY2tldCk7XG59O1xuXG4vKipcbiAqIENhbGxlZCB3aXRoIGEgZGVjb2RlZCBwYWNrZXQuXG4gKi9cblxuVHJhbnNwb3J0LnByb3RvdHlwZS5vblBhY2tldCA9IGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgdGhpcy5lbWl0KCdwYWNrZXQnLCBwYWNrZXQpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBjbG9zZS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5UcmFuc3BvcnQucHJvdG90eXBlLm9uQ2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMucmVhZHlTdGF0ZSA9ICdjbG9zZWQnO1xuICB0aGlzLmVtaXQoJ2Nsb3NlJyk7XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjayktZGV2LXNlcnZlci9+L3NvY2tldC5pby1jbGllbnQvfi9lbmdpbmUuaW8tY2xpZW50L2xpYi90cmFuc3BvcnQuanNcbiAqKiBtb2R1bGUgaWQgPSAyNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBrZXlzID0gcmVxdWlyZSgnLi9rZXlzJyk7XG52YXIgaGFzQmluYXJ5ID0gcmVxdWlyZSgnaGFzLWJpbmFyeScpO1xudmFyIHNsaWNlQnVmZmVyID0gcmVxdWlyZSgnYXJyYXlidWZmZXIuc2xpY2UnKTtcbnZhciBiYXNlNjRlbmNvZGVyID0gcmVxdWlyZSgnYmFzZTY0LWFycmF5YnVmZmVyJyk7XG52YXIgYWZ0ZXIgPSByZXF1aXJlKCdhZnRlcicpO1xudmFyIHV0ZjggPSByZXF1aXJlKCd1dGY4Jyk7XG5cbi8qKlxuICogQ2hlY2sgaWYgd2UgYXJlIHJ1bm5pbmcgYW4gYW5kcm9pZCBicm93c2VyLiBUaGF0IHJlcXVpcmVzIHVzIHRvIHVzZVxuICogQXJyYXlCdWZmZXIgd2l0aCBwb2xsaW5nIHRyYW5zcG9ydHMuLi5cbiAqXG4gKiBodHRwOi8vZ2hpbmRhLm5ldC9qcGVnLWJsb2ItYWpheC1hbmRyb2lkL1xuICovXG5cbnZhciBpc0FuZHJvaWQgPSBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9BbmRyb2lkL2kpO1xuXG4vKipcbiAqIENoZWNrIGlmIHdlIGFyZSBydW5uaW5nIGluIFBoYW50b21KUy5cbiAqIFVwbG9hZGluZyBhIEJsb2Igd2l0aCBQaGFudG9tSlMgZG9lcyBub3Qgd29yayBjb3JyZWN0bHksIGFzIHJlcG9ydGVkIGhlcmU6XG4gKiBodHRwczovL2dpdGh1Yi5jb20vYXJpeWEvcGhhbnRvbWpzL2lzc3Vlcy8xMTM5NVxuICogQHR5cGUgYm9vbGVhblxuICovXG52YXIgaXNQaGFudG9tSlMgPSAvUGhhbnRvbUpTL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuLyoqXG4gKiBXaGVuIHRydWUsIGF2b2lkcyB1c2luZyBCbG9icyB0byBlbmNvZGUgcGF5bG9hZHMuXG4gKiBAdHlwZSBib29sZWFuXG4gKi9cbnZhciBkb250U2VuZEJsb2JzID0gaXNBbmRyb2lkIHx8IGlzUGhhbnRvbUpTO1xuXG4vKipcbiAqIEN1cnJlbnQgcHJvdG9jb2wgdmVyc2lvbi5cbiAqL1xuXG5leHBvcnRzLnByb3RvY29sID0gMztcblxuLyoqXG4gKiBQYWNrZXQgdHlwZXMuXG4gKi9cblxudmFyIHBhY2tldHMgPSBleHBvcnRzLnBhY2tldHMgPSB7XG4gICAgb3BlbjogICAgIDAgICAgLy8gbm9uLXdzXG4gICwgY2xvc2U6ICAgIDEgICAgLy8gbm9uLXdzXG4gICwgcGluZzogICAgIDJcbiAgLCBwb25nOiAgICAgM1xuICAsIG1lc3NhZ2U6ICA0XG4gICwgdXBncmFkZTogIDVcbiAgLCBub29wOiAgICAgNlxufTtcblxudmFyIHBhY2tldHNsaXN0ID0ga2V5cyhwYWNrZXRzKTtcblxuLyoqXG4gKiBQcmVtYWRlIGVycm9yIHBhY2tldC5cbiAqL1xuXG52YXIgZXJyID0geyB0eXBlOiAnZXJyb3InLCBkYXRhOiAncGFyc2VyIGVycm9yJyB9O1xuXG4vKipcbiAqIENyZWF0ZSBhIGJsb2IgYXBpIGV2ZW4gZm9yIGJsb2IgYnVpbGRlciB3aGVuIHZlbmRvciBwcmVmaXhlcyBleGlzdFxuICovXG5cbnZhciBCbG9iID0gcmVxdWlyZSgnYmxvYicpO1xuXG4vKipcbiAqIEVuY29kZXMgYSBwYWNrZXQuXG4gKlxuICogICAgIDxwYWNrZXQgdHlwZSBpZD4gWyA8ZGF0YT4gXVxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICAgIDVoZWxsbyB3b3JsZFxuICogICAgIDNcbiAqICAgICA0XG4gKlxuICogQmluYXJ5IGlzIGVuY29kZWQgaW4gYW4gaWRlbnRpY2FsIHByaW5jaXBsZVxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMuZW5jb2RlUGFja2V0ID0gZnVuY3Rpb24gKHBhY2tldCwgc3VwcG9ydHNCaW5hcnksIHV0ZjhlbmNvZGUsIGNhbGxiYWNrKSB7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBzdXBwb3J0c0JpbmFyeSkge1xuICAgIGNhbGxiYWNrID0gc3VwcG9ydHNCaW5hcnk7XG4gICAgc3VwcG9ydHNCaW5hcnkgPSBmYWxzZTtcbiAgfVxuXG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiB1dGY4ZW5jb2RlKSB7XG4gICAgY2FsbGJhY2sgPSB1dGY4ZW5jb2RlO1xuICAgIHV0ZjhlbmNvZGUgPSBudWxsO1xuICB9XG5cbiAgdmFyIGRhdGEgPSAocGFja2V0LmRhdGEgPT09IHVuZGVmaW5lZClcbiAgICA/IHVuZGVmaW5lZFxuICAgIDogcGFja2V0LmRhdGEuYnVmZmVyIHx8IHBhY2tldC5kYXRhO1xuXG4gIGlmIChnbG9iYWwuQXJyYXlCdWZmZXIgJiYgZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgcmV0dXJuIGVuY29kZUFycmF5QnVmZmVyKHBhY2tldCwgc3VwcG9ydHNCaW5hcnksIGNhbGxiYWNrKTtcbiAgfSBlbHNlIGlmIChCbG9iICYmIGRhdGEgaW5zdGFuY2VvZiBnbG9iYWwuQmxvYikge1xuICAgIHJldHVybiBlbmNvZGVCbG9iKHBhY2tldCwgc3VwcG9ydHNCaW5hcnksIGNhbGxiYWNrKTtcbiAgfVxuXG4gIC8vIG1pZ2h0IGJlIGFuIG9iamVjdCB3aXRoIHsgYmFzZTY0OiB0cnVlLCBkYXRhOiBkYXRhQXNCYXNlNjRTdHJpbmcgfVxuICBpZiAoZGF0YSAmJiBkYXRhLmJhc2U2NCkge1xuICAgIHJldHVybiBlbmNvZGVCYXNlNjRPYmplY3QocGFja2V0LCBjYWxsYmFjayk7XG4gIH1cblxuICAvLyBTZW5kaW5nIGRhdGEgYXMgYSB1dGYtOCBzdHJpbmdcbiAgdmFyIGVuY29kZWQgPSBwYWNrZXRzW3BhY2tldC50eXBlXTtcblxuICAvLyBkYXRhIGZyYWdtZW50IGlzIG9wdGlvbmFsXG4gIGlmICh1bmRlZmluZWQgIT09IHBhY2tldC5kYXRhKSB7XG4gICAgZW5jb2RlZCArPSB1dGY4ZW5jb2RlID8gdXRmOC5lbmNvZGUoU3RyaW5nKHBhY2tldC5kYXRhKSkgOiBTdHJpbmcocGFja2V0LmRhdGEpO1xuICB9XG5cbiAgcmV0dXJuIGNhbGxiYWNrKCcnICsgZW5jb2RlZCk7XG5cbn07XG5cbmZ1bmN0aW9uIGVuY29kZUJhc2U2NE9iamVjdChwYWNrZXQsIGNhbGxiYWNrKSB7XG4gIC8vIHBhY2tldCBkYXRhIGlzIGFuIG9iamVjdCB7IGJhc2U2NDogdHJ1ZSwgZGF0YTogZGF0YUFzQmFzZTY0U3RyaW5nIH1cbiAgdmFyIG1lc3NhZ2UgPSAnYicgKyBleHBvcnRzLnBhY2tldHNbcGFja2V0LnR5cGVdICsgcGFja2V0LmRhdGEuZGF0YTtcbiAgcmV0dXJuIGNhbGxiYWNrKG1lc3NhZ2UpO1xufVxuXG4vKipcbiAqIEVuY29kZSBwYWNrZXQgaGVscGVycyBmb3IgYmluYXJ5IHR5cGVzXG4gKi9cblxuZnVuY3Rpb24gZW5jb2RlQXJyYXlCdWZmZXIocGFja2V0LCBzdXBwb3J0c0JpbmFyeSwgY2FsbGJhY2spIHtcbiAgaWYgKCFzdXBwb3J0c0JpbmFyeSkge1xuICAgIHJldHVybiBleHBvcnRzLmVuY29kZUJhc2U2NFBhY2tldChwYWNrZXQsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHZhciBkYXRhID0gcGFja2V0LmRhdGE7XG4gIHZhciBjb250ZW50QXJyYXkgPSBuZXcgVWludDhBcnJheShkYXRhKTtcbiAgdmFyIHJlc3VsdEJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KDEgKyBkYXRhLmJ5dGVMZW5ndGgpO1xuXG4gIHJlc3VsdEJ1ZmZlclswXSA9IHBhY2tldHNbcGFja2V0LnR5cGVdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRlbnRBcnJheS5sZW5ndGg7IGkrKykge1xuICAgIHJlc3VsdEJ1ZmZlcltpKzFdID0gY29udGVudEFycmF5W2ldO1xuICB9XG5cbiAgcmV0dXJuIGNhbGxiYWNrKHJlc3VsdEJ1ZmZlci5idWZmZXIpO1xufVxuXG5mdW5jdGlvbiBlbmNvZGVCbG9iQXNBcnJheUJ1ZmZlcihwYWNrZXQsIHN1cHBvcnRzQmluYXJ5LCBjYWxsYmFjaykge1xuICBpZiAoIXN1cHBvcnRzQmluYXJ5KSB7XG4gICAgcmV0dXJuIGV4cG9ydHMuZW5jb2RlQmFzZTY0UGFja2V0KHBhY2tldCwgY2FsbGJhY2spO1xuICB9XG5cbiAgdmFyIGZyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgZnIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgcGFja2V0LmRhdGEgPSBmci5yZXN1bHQ7XG4gICAgZXhwb3J0cy5lbmNvZGVQYWNrZXQocGFja2V0LCBzdXBwb3J0c0JpbmFyeSwgdHJ1ZSwgY2FsbGJhY2spO1xuICB9O1xuICByZXR1cm4gZnIucmVhZEFzQXJyYXlCdWZmZXIocGFja2V0LmRhdGEpO1xufVxuXG5mdW5jdGlvbiBlbmNvZGVCbG9iKHBhY2tldCwgc3VwcG9ydHNCaW5hcnksIGNhbGxiYWNrKSB7XG4gIGlmICghc3VwcG9ydHNCaW5hcnkpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5lbmNvZGVCYXNlNjRQYWNrZXQocGFja2V0LCBjYWxsYmFjayk7XG4gIH1cblxuICBpZiAoZG9udFNlbmRCbG9icykge1xuICAgIHJldHVybiBlbmNvZGVCbG9iQXNBcnJheUJ1ZmZlcihwYWNrZXQsIHN1cHBvcnRzQmluYXJ5LCBjYWxsYmFjayk7XG4gIH1cblxuICB2YXIgbGVuZ3RoID0gbmV3IFVpbnQ4QXJyYXkoMSk7XG4gIGxlbmd0aFswXSA9IHBhY2tldHNbcGFja2V0LnR5cGVdO1xuICB2YXIgYmxvYiA9IG5ldyBCbG9iKFtsZW5ndGguYnVmZmVyLCBwYWNrZXQuZGF0YV0pO1xuXG4gIHJldHVybiBjYWxsYmFjayhibG9iKTtcbn1cblxuLyoqXG4gKiBFbmNvZGVzIGEgcGFja2V0IHdpdGggYmluYXJ5IGRhdGEgaW4gYSBiYXNlNjQgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldCwgaGFzIGB0eXBlYCBhbmQgYGRhdGFgXG4gKiBAcmV0dXJuIHtTdHJpbmd9IGJhc2U2NCBlbmNvZGVkIG1lc3NhZ2VcbiAqL1xuXG5leHBvcnRzLmVuY29kZUJhc2U2NFBhY2tldCA9IGZ1bmN0aW9uKHBhY2tldCwgY2FsbGJhY2spIHtcbiAgdmFyIG1lc3NhZ2UgPSAnYicgKyBleHBvcnRzLnBhY2tldHNbcGFja2V0LnR5cGVdO1xuICBpZiAoQmxvYiAmJiBwYWNrZXQuZGF0YSBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICB2YXIgZnIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIGZyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGI2NCA9IGZyLnJlc3VsdC5zcGxpdCgnLCcpWzFdO1xuICAgICAgY2FsbGJhY2sobWVzc2FnZSArIGI2NCk7XG4gICAgfTtcbiAgICByZXR1cm4gZnIucmVhZEFzRGF0YVVSTChwYWNrZXQuZGF0YSk7XG4gIH1cblxuICB2YXIgYjY0ZGF0YTtcbiAgdHJ5IHtcbiAgICBiNjRkYXRhID0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBuZXcgVWludDhBcnJheShwYWNrZXQuZGF0YSkpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gaVBob25lIFNhZmFyaSBkb2Vzbid0IGxldCB5b3UgYXBwbHkgd2l0aCB0eXBlZCBhcnJheXNcbiAgICB2YXIgdHlwZWQgPSBuZXcgVWludDhBcnJheShwYWNrZXQuZGF0YSk7XG4gICAgdmFyIGJhc2ljID0gbmV3IEFycmF5KHR5cGVkLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0eXBlZC5sZW5ndGg7IGkrKykge1xuICAgICAgYmFzaWNbaV0gPSB0eXBlZFtpXTtcbiAgICB9XG4gICAgYjY0ZGF0YSA9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgYmFzaWMpO1xuICB9XG4gIG1lc3NhZ2UgKz0gZ2xvYmFsLmJ0b2EoYjY0ZGF0YSk7XG4gIHJldHVybiBjYWxsYmFjayhtZXNzYWdlKTtcbn07XG5cbi8qKlxuICogRGVjb2RlcyBhIHBhY2tldC4gQ2hhbmdlcyBmb3JtYXQgdG8gQmxvYiBpZiByZXF1ZXN0ZWQuXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSB3aXRoIGB0eXBlYCBhbmQgYGRhdGFgIChpZiBhbnkpXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLmRlY29kZVBhY2tldCA9IGZ1bmN0aW9uIChkYXRhLCBiaW5hcnlUeXBlLCB1dGY4ZGVjb2RlKSB7XG4gIC8vIFN0cmluZyBkYXRhXG4gIGlmICh0eXBlb2YgZGF0YSA9PSAnc3RyaW5nJyB8fCBkYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICBpZiAoZGF0YS5jaGFyQXQoMCkgPT0gJ2InKSB7XG4gICAgICByZXR1cm4gZXhwb3J0cy5kZWNvZGVCYXNlNjRQYWNrZXQoZGF0YS5zdWJzdHIoMSksIGJpbmFyeVR5cGUpO1xuICAgIH1cblxuICAgIGlmICh1dGY4ZGVjb2RlKSB7XG4gICAgICB0cnkge1xuICAgICAgICBkYXRhID0gdXRmOC5kZWNvZGUoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBlcnI7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciB0eXBlID0gZGF0YS5jaGFyQXQoMCk7XG5cbiAgICBpZiAoTnVtYmVyKHR5cGUpICE9IHR5cGUgfHwgIXBhY2tldHNsaXN0W3R5cGVdKSB7XG4gICAgICByZXR1cm4gZXJyO1xuICAgIH1cblxuICAgIGlmIChkYXRhLmxlbmd0aCA+IDEpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IHBhY2tldHNsaXN0W3R5cGVdLCBkYXRhOiBkYXRhLnN1YnN0cmluZygxKSB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBwYWNrZXRzbGlzdFt0eXBlXSB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBhc0FycmF5ID0gbmV3IFVpbnQ4QXJyYXkoZGF0YSk7XG4gIHZhciB0eXBlID0gYXNBcnJheVswXTtcbiAgdmFyIHJlc3QgPSBzbGljZUJ1ZmZlcihkYXRhLCAxKTtcbiAgaWYgKEJsb2IgJiYgYmluYXJ5VHlwZSA9PT0gJ2Jsb2InKSB7XG4gICAgcmVzdCA9IG5ldyBCbG9iKFtyZXN0XSk7XG4gIH1cbiAgcmV0dXJuIHsgdHlwZTogcGFja2V0c2xpc3RbdHlwZV0sIGRhdGE6IHJlc3QgfTtcbn07XG5cbi8qKlxuICogRGVjb2RlcyBhIHBhY2tldCBlbmNvZGVkIGluIGEgYmFzZTY0IHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBiYXNlNjQgZW5jb2RlZCBtZXNzYWdlXG4gKiBAcmV0dXJuIHtPYmplY3R9IHdpdGggYHR5cGVgIGFuZCBgZGF0YWAgKGlmIGFueSlcbiAqL1xuXG5leHBvcnRzLmRlY29kZUJhc2U2NFBhY2tldCA9IGZ1bmN0aW9uKG1zZywgYmluYXJ5VHlwZSkge1xuICB2YXIgdHlwZSA9IHBhY2tldHNsaXN0W21zZy5jaGFyQXQoMCldO1xuICBpZiAoIWdsb2JhbC5BcnJheUJ1ZmZlcikge1xuICAgIHJldHVybiB7IHR5cGU6IHR5cGUsIGRhdGE6IHsgYmFzZTY0OiB0cnVlLCBkYXRhOiBtc2cuc3Vic3RyKDEpIH0gfTtcbiAgfVxuXG4gIHZhciBkYXRhID0gYmFzZTY0ZW5jb2Rlci5kZWNvZGUobXNnLnN1YnN0cigxKSk7XG5cbiAgaWYgKGJpbmFyeVR5cGUgPT09ICdibG9iJyAmJiBCbG9iKSB7XG4gICAgZGF0YSA9IG5ldyBCbG9iKFtkYXRhXSk7XG4gIH1cblxuICByZXR1cm4geyB0eXBlOiB0eXBlLCBkYXRhOiBkYXRhIH07XG59O1xuXG4vKipcbiAqIEVuY29kZXMgbXVsdGlwbGUgbWVzc2FnZXMgKHBheWxvYWQpLlxuICpcbiAqICAgICA8bGVuZ3RoPjpkYXRhXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiAgICAgMTE6aGVsbG8gd29ybGQyOmhpXG4gKlxuICogSWYgYW55IGNvbnRlbnRzIGFyZSBiaW5hcnksIHRoZXkgd2lsbCBiZSBlbmNvZGVkIGFzIGJhc2U2NCBzdHJpbmdzLiBCYXNlNjRcbiAqIGVuY29kZWQgc3RyaW5ncyBhcmUgbWFya2VkIHdpdGggYSBiIGJlZm9yZSB0aGUgbGVuZ3RoIHNwZWNpZmllclxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHBhY2tldHNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMuZW5jb2RlUGF5bG9hZCA9IGZ1bmN0aW9uIChwYWNrZXRzLCBzdXBwb3J0c0JpbmFyeSwgY2FsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiBzdXBwb3J0c0JpbmFyeSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FsbGJhY2sgPSBzdXBwb3J0c0JpbmFyeTtcbiAgICBzdXBwb3J0c0JpbmFyeSA9IG51bGw7XG4gIH1cblxuICB2YXIgaXNCaW5hcnkgPSBoYXNCaW5hcnkocGFja2V0cyk7XG5cbiAgaWYgKHN1cHBvcnRzQmluYXJ5ICYmIGlzQmluYXJ5KSB7XG4gICAgaWYgKEJsb2IgJiYgIWRvbnRTZW5kQmxvYnMpIHtcbiAgICAgIHJldHVybiBleHBvcnRzLmVuY29kZVBheWxvYWRBc0Jsb2IocGFja2V0cywgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHJldHVybiBleHBvcnRzLmVuY29kZVBheWxvYWRBc0FycmF5QnVmZmVyKHBhY2tldHMsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGlmICghcGFja2V0cy5sZW5ndGgpIHtcbiAgICByZXR1cm4gY2FsbGJhY2soJzA6Jyk7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRMZW5ndGhIZWFkZXIobWVzc2FnZSkge1xuICAgIHJldHVybiBtZXNzYWdlLmxlbmd0aCArICc6JyArIG1lc3NhZ2U7XG4gIH1cblxuICBmdW5jdGlvbiBlbmNvZGVPbmUocGFja2V0LCBkb25lQ2FsbGJhY2spIHtcbiAgICBleHBvcnRzLmVuY29kZVBhY2tldChwYWNrZXQsICFpc0JpbmFyeSA/IGZhbHNlIDogc3VwcG9ydHNCaW5hcnksIHRydWUsIGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICAgIGRvbmVDYWxsYmFjayhudWxsLCBzZXRMZW5ndGhIZWFkZXIobWVzc2FnZSkpO1xuICAgIH0pO1xuICB9XG5cbiAgbWFwKHBhY2tldHMsIGVuY29kZU9uZSwgZnVuY3Rpb24oZXJyLCByZXN1bHRzKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrKHJlc3VsdHMuam9pbignJykpO1xuICB9KTtcbn07XG5cbi8qKlxuICogQXN5bmMgYXJyYXkgbWFwIHVzaW5nIGFmdGVyXG4gKi9cblxuZnVuY3Rpb24gbWFwKGFyeSwgZWFjaCwgZG9uZSkge1xuICB2YXIgcmVzdWx0ID0gbmV3IEFycmF5KGFyeS5sZW5ndGgpO1xuICB2YXIgbmV4dCA9IGFmdGVyKGFyeS5sZW5ndGgsIGRvbmUpO1xuXG4gIHZhciBlYWNoV2l0aEluZGV4ID0gZnVuY3Rpb24oaSwgZWwsIGNiKSB7XG4gICAgZWFjaChlbCwgZnVuY3Rpb24oZXJyb3IsIG1zZykge1xuICAgICAgcmVzdWx0W2ldID0gbXNnO1xuICAgICAgY2IoZXJyb3IsIHJlc3VsdCk7XG4gICAgfSk7XG4gIH07XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnkubGVuZ3RoOyBpKyspIHtcbiAgICBlYWNoV2l0aEluZGV4KGksIGFyeVtpXSwgbmV4dCk7XG4gIH1cbn1cblxuLypcbiAqIERlY29kZXMgZGF0YSB3aGVuIGEgcGF5bG9hZCBpcyBtYXliZSBleHBlY3RlZC4gUG9zc2libGUgYmluYXJ5IGNvbnRlbnRzIGFyZVxuICogZGVjb2RlZCBmcm9tIHRoZWlyIGJhc2U2NCByZXByZXNlbnRhdGlvblxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLCBjYWxsYmFjayBtZXRob2RcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5kZWNvZGVQYXlsb2FkID0gZnVuY3Rpb24gKGRhdGEsIGJpbmFyeVR5cGUsIGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2YgZGF0YSAhPSAnc3RyaW5nJykge1xuICAgIHJldHVybiBleHBvcnRzLmRlY29kZVBheWxvYWRBc0JpbmFyeShkYXRhLCBiaW5hcnlUeXBlLCBjYWxsYmFjayk7XG4gIH1cblxuICBpZiAodHlwZW9mIGJpbmFyeVR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayA9IGJpbmFyeVR5cGU7XG4gICAgYmluYXJ5VHlwZSA9IG51bGw7XG4gIH1cblxuICB2YXIgcGFja2V0O1xuICBpZiAoZGF0YSA9PSAnJykge1xuICAgIC8vIHBhcnNlciBlcnJvciAtIGlnbm9yaW5nIHBheWxvYWRcbiAgICByZXR1cm4gY2FsbGJhY2soZXJyLCAwLCAxKTtcbiAgfVxuXG4gIHZhciBsZW5ndGggPSAnJ1xuICAgICwgbiwgbXNnO1xuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gZGF0YS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICB2YXIgY2hyID0gZGF0YS5jaGFyQXQoaSk7XG5cbiAgICBpZiAoJzonICE9IGNocikge1xuICAgICAgbGVuZ3RoICs9IGNocjtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCcnID09IGxlbmd0aCB8fCAobGVuZ3RoICE9IChuID0gTnVtYmVyKGxlbmd0aCkpKSkge1xuICAgICAgICAvLyBwYXJzZXIgZXJyb3IgLSBpZ25vcmluZyBwYXlsb2FkXG4gICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIsIDAsIDEpO1xuICAgICAgfVxuXG4gICAgICBtc2cgPSBkYXRhLnN1YnN0cihpICsgMSwgbik7XG5cbiAgICAgIGlmIChsZW5ndGggIT0gbXNnLmxlbmd0aCkge1xuICAgICAgICAvLyBwYXJzZXIgZXJyb3IgLSBpZ25vcmluZyBwYXlsb2FkXG4gICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIsIDAsIDEpO1xuICAgICAgfVxuXG4gICAgICBpZiAobXNnLmxlbmd0aCkge1xuICAgICAgICBwYWNrZXQgPSBleHBvcnRzLmRlY29kZVBhY2tldChtc2csIGJpbmFyeVR5cGUsIHRydWUpO1xuXG4gICAgICAgIGlmIChlcnIudHlwZSA9PSBwYWNrZXQudHlwZSAmJiBlcnIuZGF0YSA9PSBwYWNrZXQuZGF0YSkge1xuICAgICAgICAgIC8vIHBhcnNlciBlcnJvciBpbiBpbmRpdmlkdWFsIHBhY2tldCAtIGlnbm9yaW5nIHBheWxvYWRcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyLCAwLCAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZXQgPSBjYWxsYmFjayhwYWNrZXQsIGkgKyBuLCBsKTtcbiAgICAgICAgaWYgKGZhbHNlID09PSByZXQpIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gYWR2YW5jZSBjdXJzb3JcbiAgICAgIGkgKz0gbjtcbiAgICAgIGxlbmd0aCA9ICcnO1xuICAgIH1cbiAgfVxuXG4gIGlmIChsZW5ndGggIT0gJycpIHtcbiAgICAvLyBwYXJzZXIgZXJyb3IgLSBpZ25vcmluZyBwYXlsb2FkXG4gICAgcmV0dXJuIGNhbGxiYWNrKGVyciwgMCwgMSk7XG4gIH1cblxufTtcblxuLyoqXG4gKiBFbmNvZGVzIG11bHRpcGxlIG1lc3NhZ2VzIChwYXlsb2FkKSBhcyBiaW5hcnkuXG4gKlxuICogPDEgPSBiaW5hcnksIDAgPSBzdHJpbmc+PG51bWJlciBmcm9tIDAtOT48bnVtYmVyIGZyb20gMC05PlsuLi5dPG51bWJlclxuICogMjU1PjxkYXRhPlxuICpcbiAqIEV4YW1wbGU6XG4gKiAxIDMgMjU1IDEgMiAzLCBpZiB0aGUgYmluYXJ5IGNvbnRlbnRzIGFyZSBpbnRlcnByZXRlZCBhcyA4IGJpdCBpbnRlZ2Vyc1xuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHBhY2tldHNcbiAqIEByZXR1cm4ge0FycmF5QnVmZmVyfSBlbmNvZGVkIHBheWxvYWRcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMuZW5jb2RlUGF5bG9hZEFzQXJyYXlCdWZmZXIgPSBmdW5jdGlvbihwYWNrZXRzLCBjYWxsYmFjaykge1xuICBpZiAoIXBhY2tldHMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrKG5ldyBBcnJheUJ1ZmZlcigwKSk7XG4gIH1cblxuICBmdW5jdGlvbiBlbmNvZGVPbmUocGFja2V0LCBkb25lQ2FsbGJhY2spIHtcbiAgICBleHBvcnRzLmVuY29kZVBhY2tldChwYWNrZXQsIHRydWUsIHRydWUsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHJldHVybiBkb25lQ2FsbGJhY2sobnVsbCwgZGF0YSk7XG4gICAgfSk7XG4gIH1cblxuICBtYXAocGFja2V0cywgZW5jb2RlT25lLCBmdW5jdGlvbihlcnIsIGVuY29kZWRQYWNrZXRzKSB7XG4gICAgdmFyIHRvdGFsTGVuZ3RoID0gZW5jb2RlZFBhY2tldHMucmVkdWNlKGZ1bmN0aW9uKGFjYywgcCkge1xuICAgICAgdmFyIGxlbjtcbiAgICAgIGlmICh0eXBlb2YgcCA9PT0gJ3N0cmluZycpe1xuICAgICAgICBsZW4gPSBwLmxlbmd0aDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxlbiA9IHAuYnl0ZUxlbmd0aDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhY2MgKyBsZW4udG9TdHJpbmcoKS5sZW5ndGggKyBsZW4gKyAyOyAvLyBzdHJpbmcvYmluYXJ5IGlkZW50aWZpZXIgKyBzZXBhcmF0b3IgPSAyXG4gICAgfSwgMCk7XG5cbiAgICB2YXIgcmVzdWx0QXJyYXkgPSBuZXcgVWludDhBcnJheSh0b3RhbExlbmd0aCk7XG5cbiAgICB2YXIgYnVmZmVySW5kZXggPSAwO1xuICAgIGVuY29kZWRQYWNrZXRzLmZvckVhY2goZnVuY3Rpb24ocCkge1xuICAgICAgdmFyIGlzU3RyaW5nID0gdHlwZW9mIHAgPT09ICdzdHJpbmcnO1xuICAgICAgdmFyIGFiID0gcDtcbiAgICAgIGlmIChpc1N0cmluZykge1xuICAgICAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KHAubGVuZ3RoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmlld1tpXSA9IHAuY2hhckNvZGVBdChpKTtcbiAgICAgICAgfVxuICAgICAgICBhYiA9IHZpZXcuYnVmZmVyO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNTdHJpbmcpIHsgLy8gbm90IHRydWUgYmluYXJ5XG4gICAgICAgIHJlc3VsdEFycmF5W2J1ZmZlckluZGV4KytdID0gMDtcbiAgICAgIH0gZWxzZSB7IC8vIHRydWUgYmluYXJ5XG4gICAgICAgIHJlc3VsdEFycmF5W2J1ZmZlckluZGV4KytdID0gMTtcbiAgICAgIH1cblxuICAgICAgdmFyIGxlblN0ciA9IGFiLmJ5dGVMZW5ndGgudG9TdHJpbmcoKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuU3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdEFycmF5W2J1ZmZlckluZGV4KytdID0gcGFyc2VJbnQobGVuU3RyW2ldKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdEFycmF5W2J1ZmZlckluZGV4KytdID0gMjU1O1xuXG4gICAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGFiKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmlldy5sZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHRBcnJheVtidWZmZXJJbmRleCsrXSA9IHZpZXdbaV07XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY2FsbGJhY2socmVzdWx0QXJyYXkuYnVmZmVyKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIEVuY29kZSBhcyBCbG9iXG4gKi9cblxuZXhwb3J0cy5lbmNvZGVQYXlsb2FkQXNCbG9iID0gZnVuY3Rpb24ocGFja2V0cywgY2FsbGJhY2spIHtcbiAgZnVuY3Rpb24gZW5jb2RlT25lKHBhY2tldCwgZG9uZUNhbGxiYWNrKSB7XG4gICAgZXhwb3J0cy5lbmNvZGVQYWNrZXQocGFja2V0LCB0cnVlLCB0cnVlLCBmdW5jdGlvbihlbmNvZGVkKSB7XG4gICAgICB2YXIgYmluYXJ5SWRlbnRpZmllciA9IG5ldyBVaW50OEFycmF5KDEpO1xuICAgICAgYmluYXJ5SWRlbnRpZmllclswXSA9IDE7XG4gICAgICBpZiAodHlwZW9mIGVuY29kZWQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoZW5jb2RlZC5sZW5ndGgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVuY29kZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2aWV3W2ldID0gZW5jb2RlZC5jaGFyQ29kZUF0KGkpO1xuICAgICAgICB9XG4gICAgICAgIGVuY29kZWQgPSB2aWV3LmJ1ZmZlcjtcbiAgICAgICAgYmluYXJ5SWRlbnRpZmllclswXSA9IDA7XG4gICAgICB9XG5cbiAgICAgIHZhciBsZW4gPSAoZW5jb2RlZCBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKVxuICAgICAgICA/IGVuY29kZWQuYnl0ZUxlbmd0aFxuICAgICAgICA6IGVuY29kZWQuc2l6ZTtcblxuICAgICAgdmFyIGxlblN0ciA9IGxlbi50b1N0cmluZygpO1xuICAgICAgdmFyIGxlbmd0aEFyeSA9IG5ldyBVaW50OEFycmF5KGxlblN0ci5sZW5ndGggKyAxKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuU3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxlbmd0aEFyeVtpXSA9IHBhcnNlSW50KGxlblN0cltpXSk7XG4gICAgICB9XG4gICAgICBsZW5ndGhBcnlbbGVuU3RyLmxlbmd0aF0gPSAyNTU7XG5cbiAgICAgIGlmIChCbG9iKSB7XG4gICAgICAgIHZhciBibG9iID0gbmV3IEJsb2IoW2JpbmFyeUlkZW50aWZpZXIuYnVmZmVyLCBsZW5ndGhBcnkuYnVmZmVyLCBlbmNvZGVkXSk7XG4gICAgICAgIGRvbmVDYWxsYmFjayhudWxsLCBibG9iKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG1hcChwYWNrZXRzLCBlbmNvZGVPbmUsIGZ1bmN0aW9uKGVyciwgcmVzdWx0cykge1xuICAgIHJldHVybiBjYWxsYmFjayhuZXcgQmxvYihyZXN1bHRzKSk7XG4gIH0pO1xufTtcblxuLypcbiAqIERlY29kZXMgZGF0YSB3aGVuIGEgcGF5bG9hZCBpcyBtYXliZSBleHBlY3RlZC4gU3RyaW5ncyBhcmUgZGVjb2RlZCBieVxuICogaW50ZXJwcmV0aW5nIGVhY2ggYnl0ZSBhcyBhIGtleSBjb2RlIGZvciBlbnRyaWVzIG1hcmtlZCB0byBzdGFydCB3aXRoIDAuIFNlZVxuICogZGVzY3JpcHRpb24gb2YgZW5jb2RlUGF5bG9hZEFzQmluYXJ5XG4gKlxuICogQHBhcmFtIHtBcnJheUJ1ZmZlcn0gZGF0YSwgY2FsbGJhY2sgbWV0aG9kXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuZGVjb2RlUGF5bG9hZEFzQmluYXJ5ID0gZnVuY3Rpb24gKGRhdGEsIGJpbmFyeVR5cGUsIGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2YgYmluYXJ5VHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhbGxiYWNrID0gYmluYXJ5VHlwZTtcbiAgICBiaW5hcnlUeXBlID0gbnVsbDtcbiAgfVxuXG4gIHZhciBidWZmZXJUYWlsID0gZGF0YTtcbiAgdmFyIGJ1ZmZlcnMgPSBbXTtcblxuICB2YXIgbnVtYmVyVG9vTG9uZyA9IGZhbHNlO1xuICB3aGlsZSAoYnVmZmVyVGFpbC5ieXRlTGVuZ3RoID4gMCkge1xuICAgIHZhciB0YWlsQXJyYXkgPSBuZXcgVWludDhBcnJheShidWZmZXJUYWlsKTtcbiAgICB2YXIgaXNTdHJpbmcgPSB0YWlsQXJyYXlbMF0gPT09IDA7XG4gICAgdmFyIG1zZ0xlbmd0aCA9ICcnO1xuXG4gICAgZm9yICh2YXIgaSA9IDE7IDsgaSsrKSB7XG4gICAgICBpZiAodGFpbEFycmF5W2ldID09IDI1NSkgYnJlYWs7XG5cbiAgICAgIGlmIChtc2dMZW5ndGgubGVuZ3RoID4gMzEwKSB7XG4gICAgICAgIG51bWJlclRvb0xvbmcgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgbXNnTGVuZ3RoICs9IHRhaWxBcnJheVtpXTtcbiAgICB9XG5cbiAgICBpZihudW1iZXJUb29Mb25nKSByZXR1cm4gY2FsbGJhY2soZXJyLCAwLCAxKTtcblxuICAgIGJ1ZmZlclRhaWwgPSBzbGljZUJ1ZmZlcihidWZmZXJUYWlsLCAyICsgbXNnTGVuZ3RoLmxlbmd0aCk7XG4gICAgbXNnTGVuZ3RoID0gcGFyc2VJbnQobXNnTGVuZ3RoKTtcblxuICAgIHZhciBtc2cgPSBzbGljZUJ1ZmZlcihidWZmZXJUYWlsLCAwLCBtc2dMZW5ndGgpO1xuICAgIGlmIChpc1N0cmluZykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbXNnID0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBuZXcgVWludDhBcnJheShtc2cpKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaVBob25lIFNhZmFyaSBkb2Vzbid0IGxldCB5b3UgYXBwbHkgdG8gdHlwZWQgYXJyYXlzXG4gICAgICAgIHZhciB0eXBlZCA9IG5ldyBVaW50OEFycmF5KG1zZyk7XG4gICAgICAgIG1zZyA9ICcnO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHR5cGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgbXNnICs9IFN0cmluZy5mcm9tQ2hhckNvZGUodHlwZWRbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgYnVmZmVycy5wdXNoKG1zZyk7XG4gICAgYnVmZmVyVGFpbCA9IHNsaWNlQnVmZmVyKGJ1ZmZlclRhaWwsIG1zZ0xlbmd0aCk7XG4gIH1cblxuICB2YXIgdG90YWwgPSBidWZmZXJzLmxlbmd0aDtcbiAgYnVmZmVycy5mb3JFYWNoKGZ1bmN0aW9uKGJ1ZmZlciwgaSkge1xuICAgIGNhbGxiYWNrKGV4cG9ydHMuZGVjb2RlUGFja2V0KGJ1ZmZlciwgYmluYXJ5VHlwZSwgdHJ1ZSksIGksIHRvdGFsKTtcbiAgfSk7XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjayktZGV2LXNlcnZlci9+L3NvY2tldC5pby1jbGllbnQvfi9lbmdpbmUuaW8tY2xpZW50L34vZW5naW5lLmlvLXBhcnNlci9saWIvYnJvd3Nlci5qc1xuICoqIG1vZHVsZSBpZCA9IDI1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcbi8qKlxuICogR2V0cyB0aGUga2V5cyBmb3IgYW4gb2JqZWN0LlxuICpcbiAqIEByZXR1cm4ge0FycmF5fSBrZXlzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMgKG9iail7XG4gIHZhciBhcnIgPSBbXTtcbiAgdmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcbiAgICBpZiAoaGFzLmNhbGwob2JqLCBpKSkge1xuICAgICAgYXJyLnB1c2goaSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBhcnI7XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjayktZGV2LXNlcnZlci9+L3NvY2tldC5pby1jbGllbnQvfi9lbmdpbmUuaW8tY2xpZW50L34vZW5naW5lLmlvLXBhcnNlci9saWIva2V5cy5qc1xuICoqIG1vZHVsZSBpZCA9IDI2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcbi8qXG4gKiBNb2R1bGUgcmVxdWlyZW1lbnRzLlxuICovXG5cbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnaXNhcnJheScpO1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gaGFzQmluYXJ5O1xuXG4vKipcbiAqIENoZWNrcyBmb3IgYmluYXJ5IGRhdGEuXG4gKlxuICogUmlnaHQgbm93IG9ubHkgQnVmZmVyIGFuZCBBcnJheUJ1ZmZlciBhcmUgc3VwcG9ydGVkLi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYW55dGhpbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gaGFzQmluYXJ5KGRhdGEpIHtcblxuICBmdW5jdGlvbiBfaGFzQmluYXJ5KG9iaikge1xuICAgIGlmICghb2JqKSByZXR1cm4gZmFsc2U7XG5cbiAgICBpZiAoIChnbG9iYWwuQnVmZmVyICYmIGdsb2JhbC5CdWZmZXIuaXNCdWZmZXIob2JqKSkgfHxcbiAgICAgICAgIChnbG9iYWwuQXJyYXlCdWZmZXIgJiYgb2JqIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHx8XG4gICAgICAgICAoZ2xvYmFsLkJsb2IgJiYgb2JqIGluc3RhbmNlb2YgQmxvYikgfHxcbiAgICAgICAgIChnbG9iYWwuRmlsZSAmJiBvYmogaW5zdGFuY2VvZiBGaWxlKVxuICAgICAgICApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKF9oYXNCaW5hcnkob2JqW2ldKSkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvYmogJiYgJ29iamVjdCcgPT0gdHlwZW9mIG9iaikge1xuICAgICAgaWYgKG9iai50b0pTT04pIHtcbiAgICAgICAgb2JqID0gb2JqLnRvSlNPTigpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSAmJiBfaGFzQmluYXJ5KG9ialtrZXldKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIF9oYXNCaW5hcnkoZGF0YSk7XG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc29ja2V0LmlvLWNsaWVudC9+L2VuZ2luZS5pby1jbGllbnQvfi9lbmdpbmUuaW8tcGFyc2VyL34vaGFzLWJpbmFyeS9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDI3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGFycikge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFycikgPT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc29ja2V0LmlvLWNsaWVudC9+L2VuZ2luZS5pby1jbGllbnQvfi9lbmdpbmUuaW8tcGFyc2VyL34vaGFzLWJpbmFyeS9+L2lzYXJyYXkvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAyOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBBbiBhYnN0cmFjdGlvbiBmb3Igc2xpY2luZyBhbiBhcnJheWJ1ZmZlciBldmVuIHdoZW5cbiAqIEFycmF5QnVmZmVyLnByb3RvdHlwZS5zbGljZSBpcyBub3Qgc3VwcG9ydGVkXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFycmF5YnVmZmVyLCBzdGFydCwgZW5kKSB7XG4gIHZhciBieXRlcyA9IGFycmF5YnVmZmVyLmJ5dGVMZW5ndGg7XG4gIHN0YXJ0ID0gc3RhcnQgfHwgMDtcbiAgZW5kID0gZW5kIHx8IGJ5dGVzO1xuXG4gIGlmIChhcnJheWJ1ZmZlci5zbGljZSkgeyByZXR1cm4gYXJyYXlidWZmZXIuc2xpY2Uoc3RhcnQsIGVuZCk7IH1cblxuICBpZiAoc3RhcnQgPCAwKSB7IHN0YXJ0ICs9IGJ5dGVzOyB9XG4gIGlmIChlbmQgPCAwKSB7IGVuZCArPSBieXRlczsgfVxuICBpZiAoZW5kID4gYnl0ZXMpIHsgZW5kID0gYnl0ZXM7IH1cblxuICBpZiAoc3RhcnQgPj0gYnl0ZXMgfHwgc3RhcnQgPj0gZW5kIHx8IGJ5dGVzID09PSAwKSB7XG4gICAgcmV0dXJuIG5ldyBBcnJheUJ1ZmZlcigwKTtcbiAgfVxuXG4gIHZhciBhYnYgPSBuZXcgVWludDhBcnJheShhcnJheWJ1ZmZlcik7XG4gIHZhciByZXN1bHQgPSBuZXcgVWludDhBcnJheShlbmQgLSBzdGFydCk7XG4gIGZvciAodmFyIGkgPSBzdGFydCwgaWkgPSAwOyBpIDwgZW5kOyBpKyssIGlpKyspIHtcbiAgICByZXN1bHRbaWldID0gYWJ2W2ldO1xuICB9XG4gIHJldHVybiByZXN1bHQuYnVmZmVyO1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spLWRldi1zZXJ2ZXIvfi9zb2NrZXQuaW8tY2xpZW50L34vZW5naW5lLmlvLWNsaWVudC9+L2VuZ2luZS5pby1wYXJzZXIvfi9hcnJheWJ1ZmZlci5zbGljZS9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDI5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKlxuICogYmFzZTY0LWFycmF5YnVmZmVyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbmlrbGFzdmgvYmFzZTY0LWFycmF5YnVmZmVyXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEyIE5pa2xhcyB2b24gSGVydHplblxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICovXG4oZnVuY3Rpb24oY2hhcnMpe1xuICBcInVzZSBzdHJpY3RcIjtcblxuICBleHBvcnRzLmVuY29kZSA9IGZ1bmN0aW9uKGFycmF5YnVmZmVyKSB7XG4gICAgdmFyIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpLFxuICAgIGksIGxlbiA9IGJ5dGVzLmxlbmd0aCwgYmFzZTY0ID0gXCJcIjtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrPTMpIHtcbiAgICAgIGJhc2U2NCArPSBjaGFyc1tieXRlc1tpXSA+PiAyXTtcbiAgICAgIGJhc2U2NCArPSBjaGFyc1soKGJ5dGVzW2ldICYgMykgPDwgNCkgfCAoYnl0ZXNbaSArIDFdID4+IDQpXTtcbiAgICAgIGJhc2U2NCArPSBjaGFyc1soKGJ5dGVzW2kgKyAxXSAmIDE1KSA8PCAyKSB8IChieXRlc1tpICsgMl0gPj4gNildO1xuICAgICAgYmFzZTY0ICs9IGNoYXJzW2J5dGVzW2kgKyAyXSAmIDYzXTtcbiAgICB9XG5cbiAgICBpZiAoKGxlbiAlIDMpID09PSAyKSB7XG4gICAgICBiYXNlNjQgPSBiYXNlNjQuc3Vic3RyaW5nKDAsIGJhc2U2NC5sZW5ndGggLSAxKSArIFwiPVwiO1xuICAgIH0gZWxzZSBpZiAobGVuICUgMyA9PT0gMSkge1xuICAgICAgYmFzZTY0ID0gYmFzZTY0LnN1YnN0cmluZygwLCBiYXNlNjQubGVuZ3RoIC0gMikgKyBcIj09XCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJhc2U2NDtcbiAgfTtcblxuICBleHBvcnRzLmRlY29kZSA9ICBmdW5jdGlvbihiYXNlNjQpIHtcbiAgICB2YXIgYnVmZmVyTGVuZ3RoID0gYmFzZTY0Lmxlbmd0aCAqIDAuNzUsXG4gICAgbGVuID0gYmFzZTY0Lmxlbmd0aCwgaSwgcCA9IDAsXG4gICAgZW5jb2RlZDEsIGVuY29kZWQyLCBlbmNvZGVkMywgZW5jb2RlZDQ7XG5cbiAgICBpZiAoYmFzZTY0W2Jhc2U2NC5sZW5ndGggLSAxXSA9PT0gXCI9XCIpIHtcbiAgICAgIGJ1ZmZlckxlbmd0aC0tO1xuICAgICAgaWYgKGJhc2U2NFtiYXNlNjQubGVuZ3RoIC0gMl0gPT09IFwiPVwiKSB7XG4gICAgICAgIGJ1ZmZlckxlbmd0aC0tO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBhcnJheWJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihidWZmZXJMZW5ndGgpLFxuICAgIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSs9NCkge1xuICAgICAgZW5jb2RlZDEgPSBjaGFycy5pbmRleE9mKGJhc2U2NFtpXSk7XG4gICAgICBlbmNvZGVkMiA9IGNoYXJzLmluZGV4T2YoYmFzZTY0W2krMV0pO1xuICAgICAgZW5jb2RlZDMgPSBjaGFycy5pbmRleE9mKGJhc2U2NFtpKzJdKTtcbiAgICAgIGVuY29kZWQ0ID0gY2hhcnMuaW5kZXhPZihiYXNlNjRbaSszXSk7XG5cbiAgICAgIGJ5dGVzW3ArK10gPSAoZW5jb2RlZDEgPDwgMikgfCAoZW5jb2RlZDIgPj4gNCk7XG4gICAgICBieXRlc1twKytdID0gKChlbmNvZGVkMiAmIDE1KSA8PCA0KSB8IChlbmNvZGVkMyA+PiAyKTtcbiAgICAgIGJ5dGVzW3ArK10gPSAoKGVuY29kZWQzICYgMykgPDwgNikgfCAoZW5jb2RlZDQgJiA2Myk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycmF5YnVmZmVyO1xuICB9O1xufSkoXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvXCIpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjayktZGV2LXNlcnZlci9+L3NvY2tldC5pby1jbGllbnQvfi9lbmdpbmUuaW8tY2xpZW50L34vZW5naW5lLmlvLXBhcnNlci9+L2Jhc2U2NC1hcnJheWJ1ZmZlci9saWIvYmFzZTY0LWFycmF5YnVmZmVyLmpzXG4gKiogbW9kdWxlIGlkID0gMzBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gYWZ0ZXJcblxuZnVuY3Rpb24gYWZ0ZXIoY291bnQsIGNhbGxiYWNrLCBlcnJfY2IpIHtcbiAgICB2YXIgYmFpbCA9IGZhbHNlXG4gICAgZXJyX2NiID0gZXJyX2NiIHx8IG5vb3BcbiAgICBwcm94eS5jb3VudCA9IGNvdW50XG5cbiAgICByZXR1cm4gKGNvdW50ID09PSAwKSA/IGNhbGxiYWNrKCkgOiBwcm94eVxuXG4gICAgZnVuY3Rpb24gcHJveHkoZXJyLCByZXN1bHQpIHtcbiAgICAgICAgaWYgKHByb3h5LmNvdW50IDw9IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYWZ0ZXIgY2FsbGVkIHRvbyBtYW55IHRpbWVzJylcbiAgICAgICAgfVxuICAgICAgICAtLXByb3h5LmNvdW50XG5cbiAgICAgICAgLy8gYWZ0ZXIgZmlyc3QgZXJyb3IsIHJlc3QgYXJlIHBhc3NlZCB0byBlcnJfY2JcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgYmFpbCA9IHRydWVcbiAgICAgICAgICAgIGNhbGxiYWNrKGVycilcbiAgICAgICAgICAgIC8vIGZ1dHVyZSBlcnJvciBjYWxsYmFja3Mgd2lsbCBnbyB0byBlcnJvciBoYW5kbGVyXG4gICAgICAgICAgICBjYWxsYmFjayA9IGVycl9jYlxuICAgICAgICB9IGVsc2UgaWYgKHByb3h5LmNvdW50ID09PSAwICYmICFiYWlsKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXN1bHQpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjayktZGV2LXNlcnZlci9+L3NvY2tldC5pby1jbGllbnQvfi9lbmdpbmUuaW8tY2xpZW50L34vZW5naW5lLmlvLXBhcnNlci9+L2FmdGVyL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMzFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qISBodHRwOi8vbXRocy5iZS91dGY4anMgdjIuMC4wIGJ5IEBtYXRoaWFzICovXG47KGZ1bmN0aW9uKHJvb3QpIHtcblxuXHQvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZXMgYGV4cG9ydHNgXG5cdHZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHM7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWBcblx0dmFyIGZyZWVNb2R1bGUgPSB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJlxuXHRcdG1vZHVsZS5leHBvcnRzID09IGZyZWVFeHBvcnRzICYmIG1vZHVsZTtcblxuXHQvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCwgZnJvbSBOb2RlLmpzIG9yIEJyb3dzZXJpZmllZCBjb2RlLFxuXHQvLyBhbmQgdXNlIGl0IGFzIGByb290YFxuXHR2YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsO1xuXHRpZiAoZnJlZUdsb2JhbC5nbG9iYWwgPT09IGZyZWVHbG9iYWwgfHwgZnJlZUdsb2JhbC53aW5kb3cgPT09IGZyZWVHbG9iYWwpIHtcblx0XHRyb290ID0gZnJlZUdsb2JhbDtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHZhciBzdHJpbmdGcm9tQ2hhckNvZGUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlO1xuXG5cdC8vIFRha2VuIGZyb20gaHR0cDovL210aHMuYmUvcHVueWNvZGVcblx0ZnVuY3Rpb24gdWNzMmRlY29kZShzdHJpbmcpIHtcblx0XHR2YXIgb3V0cHV0ID0gW107XG5cdFx0dmFyIGNvdW50ZXIgPSAwO1xuXHRcdHZhciBsZW5ndGggPSBzdHJpbmcubGVuZ3RoO1xuXHRcdHZhciB2YWx1ZTtcblx0XHR2YXIgZXh0cmE7XG5cdFx0d2hpbGUgKGNvdW50ZXIgPCBsZW5ndGgpIHtcblx0XHRcdHZhbHVlID0gc3RyaW5nLmNoYXJDb2RlQXQoY291bnRlcisrKTtcblx0XHRcdGlmICh2YWx1ZSA+PSAweEQ4MDAgJiYgdmFsdWUgPD0gMHhEQkZGICYmIGNvdW50ZXIgPCBsZW5ndGgpIHtcblx0XHRcdFx0Ly8gaGlnaCBzdXJyb2dhdGUsIGFuZCB0aGVyZSBpcyBhIG5leHQgY2hhcmFjdGVyXG5cdFx0XHRcdGV4dHJhID0gc3RyaW5nLmNoYXJDb2RlQXQoY291bnRlcisrKTtcblx0XHRcdFx0aWYgKChleHRyYSAmIDB4RkMwMCkgPT0gMHhEQzAwKSB7IC8vIGxvdyBzdXJyb2dhdGVcblx0XHRcdFx0XHRvdXRwdXQucHVzaCgoKHZhbHVlICYgMHgzRkYpIDw8IDEwKSArIChleHRyYSAmIDB4M0ZGKSArIDB4MTAwMDApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIHVubWF0Y2hlZCBzdXJyb2dhdGU7IG9ubHkgYXBwZW5kIHRoaXMgY29kZSB1bml0LCBpbiBjYXNlIHRoZSBuZXh0XG5cdFx0XHRcdFx0Ly8gY29kZSB1bml0IGlzIHRoZSBoaWdoIHN1cnJvZ2F0ZSBvZiBhIHN1cnJvZ2F0ZSBwYWlyXG5cdFx0XHRcdFx0b3V0cHV0LnB1c2godmFsdWUpO1xuXHRcdFx0XHRcdGNvdW50ZXItLTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0b3V0cHV0LnB1c2godmFsdWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gb3V0cHV0O1xuXHR9XG5cblx0Ly8gVGFrZW4gZnJvbSBodHRwOi8vbXRocy5iZS9wdW55Y29kZVxuXHRmdW5jdGlvbiB1Y3MyZW5jb2RlKGFycmF5KSB7XG5cdFx0dmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblx0XHR2YXIgaW5kZXggPSAtMTtcblx0XHR2YXIgdmFsdWU7XG5cdFx0dmFyIG91dHB1dCA9ICcnO1xuXHRcdHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG5cdFx0XHR2YWx1ZSA9IGFycmF5W2luZGV4XTtcblx0XHRcdGlmICh2YWx1ZSA+IDB4RkZGRikge1xuXHRcdFx0XHR2YWx1ZSAtPSAweDEwMDAwO1xuXHRcdFx0XHRvdXRwdXQgKz0gc3RyaW5nRnJvbUNoYXJDb2RlKHZhbHVlID4+PiAxMCAmIDB4M0ZGIHwgMHhEODAwKTtcblx0XHRcdFx0dmFsdWUgPSAweERDMDAgfCB2YWx1ZSAmIDB4M0ZGO1xuXHRcdFx0fVxuXHRcdFx0b3V0cHV0ICs9IHN0cmluZ0Zyb21DaGFyQ29kZSh2YWx1ZSk7XG5cdFx0fVxuXHRcdHJldHVybiBvdXRwdXQ7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmdW5jdGlvbiBjcmVhdGVCeXRlKGNvZGVQb2ludCwgc2hpZnQpIHtcblx0XHRyZXR1cm4gc3RyaW5nRnJvbUNoYXJDb2RlKCgoY29kZVBvaW50ID4+IHNoaWZ0KSAmIDB4M0YpIHwgMHg4MCk7XG5cdH1cblxuXHRmdW5jdGlvbiBlbmNvZGVDb2RlUG9pbnQoY29kZVBvaW50KSB7XG5cdFx0aWYgKChjb2RlUG9pbnQgJiAweEZGRkZGRjgwKSA9PSAwKSB7IC8vIDEtYnl0ZSBzZXF1ZW5jZVxuXHRcdFx0cmV0dXJuIHN0cmluZ0Zyb21DaGFyQ29kZShjb2RlUG9pbnQpO1xuXHRcdH1cblx0XHR2YXIgc3ltYm9sID0gJyc7XG5cdFx0aWYgKChjb2RlUG9pbnQgJiAweEZGRkZGODAwKSA9PSAwKSB7IC8vIDItYnl0ZSBzZXF1ZW5jZVxuXHRcdFx0c3ltYm9sID0gc3RyaW5nRnJvbUNoYXJDb2RlKCgoY29kZVBvaW50ID4+IDYpICYgMHgxRikgfCAweEMwKTtcblx0XHR9XG5cdFx0ZWxzZSBpZiAoKGNvZGVQb2ludCAmIDB4RkZGRjAwMDApID09IDApIHsgLy8gMy1ieXRlIHNlcXVlbmNlXG5cdFx0XHRzeW1ib2wgPSBzdHJpbmdGcm9tQ2hhckNvZGUoKChjb2RlUG9pbnQgPj4gMTIpICYgMHgwRikgfCAweEUwKTtcblx0XHRcdHN5bWJvbCArPSBjcmVhdGVCeXRlKGNvZGVQb2ludCwgNik7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKChjb2RlUG9pbnQgJiAweEZGRTAwMDAwKSA9PSAwKSB7IC8vIDQtYnl0ZSBzZXF1ZW5jZVxuXHRcdFx0c3ltYm9sID0gc3RyaW5nRnJvbUNoYXJDb2RlKCgoY29kZVBvaW50ID4+IDE4KSAmIDB4MDcpIHwgMHhGMCk7XG5cdFx0XHRzeW1ib2wgKz0gY3JlYXRlQnl0ZShjb2RlUG9pbnQsIDEyKTtcblx0XHRcdHN5bWJvbCArPSBjcmVhdGVCeXRlKGNvZGVQb2ludCwgNik7XG5cdFx0fVxuXHRcdHN5bWJvbCArPSBzdHJpbmdGcm9tQ2hhckNvZGUoKGNvZGVQb2ludCAmIDB4M0YpIHwgMHg4MCk7XG5cdFx0cmV0dXJuIHN5bWJvbDtcblx0fVxuXG5cdGZ1bmN0aW9uIHV0ZjhlbmNvZGUoc3RyaW5nKSB7XG5cdFx0dmFyIGNvZGVQb2ludHMgPSB1Y3MyZGVjb2RlKHN0cmluZyk7XG5cblx0XHQvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShjb2RlUG9pbnRzLm1hcChmdW5jdGlvbih4KSB7XG5cdFx0Ly8gXHRyZXR1cm4gJ1UrJyArIHgudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG5cdFx0Ly8gfSkpKTtcblxuXHRcdHZhciBsZW5ndGggPSBjb2RlUG9pbnRzLmxlbmd0aDtcblx0XHR2YXIgaW5kZXggPSAtMTtcblx0XHR2YXIgY29kZVBvaW50O1xuXHRcdHZhciBieXRlU3RyaW5nID0gJyc7XG5cdFx0d2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcblx0XHRcdGNvZGVQb2ludCA9IGNvZGVQb2ludHNbaW5kZXhdO1xuXHRcdFx0Ynl0ZVN0cmluZyArPSBlbmNvZGVDb2RlUG9pbnQoY29kZVBvaW50KTtcblx0XHR9XG5cdFx0cmV0dXJuIGJ5dGVTdHJpbmc7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmdW5jdGlvbiByZWFkQ29udGludWF0aW9uQnl0ZSgpIHtcblx0XHRpZiAoYnl0ZUluZGV4ID49IGJ5dGVDb3VudCkge1xuXHRcdFx0dGhyb3cgRXJyb3IoJ0ludmFsaWQgYnl0ZSBpbmRleCcpO1xuXHRcdH1cblxuXHRcdHZhciBjb250aW51YXRpb25CeXRlID0gYnl0ZUFycmF5W2J5dGVJbmRleF0gJiAweEZGO1xuXHRcdGJ5dGVJbmRleCsrO1xuXG5cdFx0aWYgKChjb250aW51YXRpb25CeXRlICYgMHhDMCkgPT0gMHg4MCkge1xuXHRcdFx0cmV0dXJuIGNvbnRpbnVhdGlvbkJ5dGUgJiAweDNGO1xuXHRcdH1cblxuXHRcdC8vIElmIHdlIGVuZCB1cCBoZXJlLCBpdOKAmXMgbm90IGEgY29udGludWF0aW9uIGJ5dGVcblx0XHR0aHJvdyBFcnJvcignSW52YWxpZCBjb250aW51YXRpb24gYnl0ZScpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZGVjb2RlU3ltYm9sKCkge1xuXHRcdHZhciBieXRlMTtcblx0XHR2YXIgYnl0ZTI7XG5cdFx0dmFyIGJ5dGUzO1xuXHRcdHZhciBieXRlNDtcblx0XHR2YXIgY29kZVBvaW50O1xuXG5cdFx0aWYgKGJ5dGVJbmRleCA+IGJ5dGVDb3VudCkge1xuXHRcdFx0dGhyb3cgRXJyb3IoJ0ludmFsaWQgYnl0ZSBpbmRleCcpO1xuXHRcdH1cblxuXHRcdGlmIChieXRlSW5kZXggPT0gYnl0ZUNvdW50KSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gUmVhZCBmaXJzdCBieXRlXG5cdFx0Ynl0ZTEgPSBieXRlQXJyYXlbYnl0ZUluZGV4XSAmIDB4RkY7XG5cdFx0Ynl0ZUluZGV4Kys7XG5cblx0XHQvLyAxLWJ5dGUgc2VxdWVuY2UgKG5vIGNvbnRpbnVhdGlvbiBieXRlcylcblx0XHRpZiAoKGJ5dGUxICYgMHg4MCkgPT0gMCkge1xuXHRcdFx0cmV0dXJuIGJ5dGUxO1xuXHRcdH1cblxuXHRcdC8vIDItYnl0ZSBzZXF1ZW5jZVxuXHRcdGlmICgoYnl0ZTEgJiAweEUwKSA9PSAweEMwKSB7XG5cdFx0XHR2YXIgYnl0ZTIgPSByZWFkQ29udGludWF0aW9uQnl0ZSgpO1xuXHRcdFx0Y29kZVBvaW50ID0gKChieXRlMSAmIDB4MUYpIDw8IDYpIHwgYnl0ZTI7XG5cdFx0XHRpZiAoY29kZVBvaW50ID49IDB4ODApIHtcblx0XHRcdFx0cmV0dXJuIGNvZGVQb2ludDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRocm93IEVycm9yKCdJbnZhbGlkIGNvbnRpbnVhdGlvbiBieXRlJyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gMy1ieXRlIHNlcXVlbmNlIChtYXkgaW5jbHVkZSB1bnBhaXJlZCBzdXJyb2dhdGVzKVxuXHRcdGlmICgoYnl0ZTEgJiAweEYwKSA9PSAweEUwKSB7XG5cdFx0XHRieXRlMiA9IHJlYWRDb250aW51YXRpb25CeXRlKCk7XG5cdFx0XHRieXRlMyA9IHJlYWRDb250aW51YXRpb25CeXRlKCk7XG5cdFx0XHRjb2RlUG9pbnQgPSAoKGJ5dGUxICYgMHgwRikgPDwgMTIpIHwgKGJ5dGUyIDw8IDYpIHwgYnl0ZTM7XG5cdFx0XHRpZiAoY29kZVBvaW50ID49IDB4MDgwMCkge1xuXHRcdFx0XHRyZXR1cm4gY29kZVBvaW50O1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhyb3cgRXJyb3IoJ0ludmFsaWQgY29udGludWF0aW9uIGJ5dGUnKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyA0LWJ5dGUgc2VxdWVuY2Vcblx0XHRpZiAoKGJ5dGUxICYgMHhGOCkgPT0gMHhGMCkge1xuXHRcdFx0Ynl0ZTIgPSByZWFkQ29udGludWF0aW9uQnl0ZSgpO1xuXHRcdFx0Ynl0ZTMgPSByZWFkQ29udGludWF0aW9uQnl0ZSgpO1xuXHRcdFx0Ynl0ZTQgPSByZWFkQ29udGludWF0aW9uQnl0ZSgpO1xuXHRcdFx0Y29kZVBvaW50ID0gKChieXRlMSAmIDB4MEYpIDw8IDB4MTIpIHwgKGJ5dGUyIDw8IDB4MEMpIHxcblx0XHRcdFx0KGJ5dGUzIDw8IDB4MDYpIHwgYnl0ZTQ7XG5cdFx0XHRpZiAoY29kZVBvaW50ID49IDB4MDEwMDAwICYmIGNvZGVQb2ludCA8PSAweDEwRkZGRikge1xuXHRcdFx0XHRyZXR1cm4gY29kZVBvaW50O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRocm93IEVycm9yKCdJbnZhbGlkIFVURi04IGRldGVjdGVkJyk7XG5cdH1cblxuXHR2YXIgYnl0ZUFycmF5O1xuXHR2YXIgYnl0ZUNvdW50O1xuXHR2YXIgYnl0ZUluZGV4O1xuXHRmdW5jdGlvbiB1dGY4ZGVjb2RlKGJ5dGVTdHJpbmcpIHtcblx0XHRieXRlQXJyYXkgPSB1Y3MyZGVjb2RlKGJ5dGVTdHJpbmcpO1xuXHRcdGJ5dGVDb3VudCA9IGJ5dGVBcnJheS5sZW5ndGg7XG5cdFx0Ynl0ZUluZGV4ID0gMDtcblx0XHR2YXIgY29kZVBvaW50cyA9IFtdO1xuXHRcdHZhciB0bXA7XG5cdFx0d2hpbGUgKCh0bXAgPSBkZWNvZGVTeW1ib2woKSkgIT09IGZhbHNlKSB7XG5cdFx0XHRjb2RlUG9pbnRzLnB1c2godG1wKTtcblx0XHR9XG5cdFx0cmV0dXJuIHVjczJlbmNvZGUoY29kZVBvaW50cyk7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR2YXIgdXRmOCA9IHtcblx0XHQndmVyc2lvbic6ICcyLjAuMCcsXG5cdFx0J2VuY29kZSc6IHV0ZjhlbmNvZGUsXG5cdFx0J2RlY29kZSc6IHV0ZjhkZWNvZGVcblx0fTtcblxuXHQvLyBTb21lIEFNRCBidWlsZCBvcHRpbWl6ZXJzLCBsaWtlIHIuanMsIGNoZWNrIGZvciBzcGVjaWZpYyBjb25kaXRpb24gcGF0dGVybnNcblx0Ly8gbGlrZSB0aGUgZm9sbG93aW5nOlxuXHRpZiAoXG5cdFx0dHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmXG5cdFx0dHlwZW9mIGRlZmluZS5hbWQgPT0gJ29iamVjdCcgJiZcblx0XHRkZWZpbmUuYW1kXG5cdCkge1xuXHRcdGRlZmluZShmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB1dGY4O1xuXHRcdH0pO1xuXHR9XHRlbHNlIGlmIChmcmVlRXhwb3J0cyAmJiAhZnJlZUV4cG9ydHMubm9kZVR5cGUpIHtcblx0XHRpZiAoZnJlZU1vZHVsZSkgeyAvLyBpbiBOb2RlLmpzIG9yIFJpbmdvSlMgdjAuOC4wK1xuXHRcdFx0ZnJlZU1vZHVsZS5leHBvcnRzID0gdXRmODtcblx0XHR9IGVsc2UgeyAvLyBpbiBOYXJ3aGFsIG9yIFJpbmdvSlMgdjAuNy4wLVxuXHRcdFx0dmFyIG9iamVjdCA9IHt9O1xuXHRcdFx0dmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0Lmhhc093blByb3BlcnR5O1xuXHRcdFx0Zm9yICh2YXIga2V5IGluIHV0ZjgpIHtcblx0XHRcdFx0aGFzT3duUHJvcGVydHkuY2FsbCh1dGY4LCBrZXkpICYmIChmcmVlRXhwb3J0c1trZXldID0gdXRmOFtrZXldKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7IC8vIGluIFJoaW5vIG9yIGEgd2ViIGJyb3dzZXJcblx0XHRyb290LnV0ZjggPSB1dGY4O1xuXHR9XG5cbn0odGhpcykpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjayktZGV2LXNlcnZlci9+L3NvY2tldC5pby1jbGllbnQvfi9lbmdpbmUuaW8tY2xpZW50L34vZW5naW5lLmlvLXBhcnNlci9+L3V0ZjgvdXRmOC5qc1xuICoqIG1vZHVsZSBpZCA9IDMyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cdGlmKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XHJcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcclxuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xyXG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XHJcblx0XHRtb2R1bGUuY2hpbGRyZW4gPSBbXTtcclxuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xyXG5cdH1cclxuXHRyZXR1cm4gbW9kdWxlO1xyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzXG4gKiogbW9kdWxlIGlkID0gMzNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ3JlYXRlIGEgYmxvYiBidWlsZGVyIGV2ZW4gd2hlbiB2ZW5kb3IgcHJlZml4ZXMgZXhpc3RcbiAqL1xuXG52YXIgQmxvYkJ1aWxkZXIgPSBnbG9iYWwuQmxvYkJ1aWxkZXJcbiAgfHwgZ2xvYmFsLldlYktpdEJsb2JCdWlsZGVyXG4gIHx8IGdsb2JhbC5NU0Jsb2JCdWlsZGVyXG4gIHx8IGdsb2JhbC5Nb3pCbG9iQnVpbGRlcjtcblxuLyoqXG4gKiBDaGVjayBpZiBCbG9iIGNvbnN0cnVjdG9yIGlzIHN1cHBvcnRlZFxuICovXG5cbnZhciBibG9iU3VwcG9ydGVkID0gKGZ1bmN0aW9uKCkge1xuICB0cnkge1xuICAgIHZhciBiID0gbmV3IEJsb2IoWydoaSddKTtcbiAgICByZXR1cm4gYi5zaXplID09IDI7XG4gIH0gY2F0Y2goZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufSkoKTtcblxuLyoqXG4gKiBDaGVjayBpZiBCbG9iQnVpbGRlciBpcyBzdXBwb3J0ZWRcbiAqL1xuXG52YXIgYmxvYkJ1aWxkZXJTdXBwb3J0ZWQgPSBCbG9iQnVpbGRlclxuICAmJiBCbG9iQnVpbGRlci5wcm90b3R5cGUuYXBwZW5kXG4gICYmIEJsb2JCdWlsZGVyLnByb3RvdHlwZS5nZXRCbG9iO1xuXG5mdW5jdGlvbiBCbG9iQnVpbGRlckNvbnN0cnVjdG9yKGFyeSwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB2YXIgYmIgPSBuZXcgQmxvYkJ1aWxkZXIoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnkubGVuZ3RoOyBpKyspIHtcbiAgICBiYi5hcHBlbmQoYXJ5W2ldKTtcbiAgfVxuICByZXR1cm4gKG9wdGlvbnMudHlwZSkgPyBiYi5nZXRCbG9iKG9wdGlvbnMudHlwZSkgOiBiYi5nZXRCbG9iKCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcbiAgaWYgKGJsb2JTdXBwb3J0ZWQpIHtcbiAgICByZXR1cm4gZ2xvYmFsLkJsb2I7XG4gIH0gZWxzZSBpZiAoYmxvYkJ1aWxkZXJTdXBwb3J0ZWQpIHtcbiAgICByZXR1cm4gQmxvYkJ1aWxkZXJDb25zdHJ1Y3RvcjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59KSgpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjayktZGV2LXNlcnZlci9+L3NvY2tldC5pby1jbGllbnQvfi9lbmdpbmUuaW8tY2xpZW50L34vZW5naW5lLmlvLXBhcnNlci9+L2Jsb2IvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAzNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb21waWxlcyBhIHF1ZXJ5c3RyaW5nXG4gKiBSZXR1cm5zIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLmVuY29kZSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgdmFyIHN0ciA9ICcnO1xuXG4gIGZvciAodmFyIGkgaW4gb2JqKSB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgaWYgKHN0ci5sZW5ndGgpIHN0ciArPSAnJic7XG4gICAgICBzdHIgKz0gZW5jb2RlVVJJQ29tcG9uZW50KGkpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KG9ialtpXSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHN0cjtcbn07XG5cbi8qKlxuICogUGFyc2VzIGEgc2ltcGxlIHF1ZXJ5c3RyaW5nIGludG8gYW4gb2JqZWN0XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHFzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLmRlY29kZSA9IGZ1bmN0aW9uKHFzKXtcbiAgdmFyIHFyeSA9IHt9O1xuICB2YXIgcGFpcnMgPSBxcy5zcGxpdCgnJicpO1xuICBmb3IgKHZhciBpID0gMCwgbCA9IHBhaXJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIHZhciBwYWlyID0gcGFpcnNbaV0uc3BsaXQoJz0nKTtcbiAgICBxcnlbZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMF0pXSA9IGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdKTtcbiAgfVxuICByZXR1cm4gcXJ5O1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spLWRldi1zZXJ2ZXIvfi9zb2NrZXQuaW8tY2xpZW50L34vZW5naW5lLmlvLWNsaWVudC9+L3BhcnNlcXMvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAzNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGEsIGIpe1xuICB2YXIgZm4gPSBmdW5jdGlvbigpe307XG4gIGZuLnByb3RvdHlwZSA9IGIucHJvdG90eXBlO1xuICBhLnByb3RvdHlwZSA9IG5ldyBmbjtcbiAgYS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBhO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc29ja2V0LmlvLWNsaWVudC9+L2VuZ2luZS5pby1jbGllbnQvfi9jb21wb25lbnQtaW5oZXJpdC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDM2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcbi8qKlxuICogVGhpcyBpcyB0aGUgd2ViIGJyb3dzZXIgaW1wbGVtZW50YXRpb24gb2YgYGRlYnVnKClgLlxuICpcbiAqIEV4cG9zZSBgZGVidWcoKWAgYXMgdGhlIG1vZHVsZS5cbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2RlYnVnJyk7XG5leHBvcnRzLmxvZyA9IGxvZztcbmV4cG9ydHMuZm9ybWF0QXJncyA9IGZvcm1hdEFyZ3M7XG5leHBvcnRzLnNhdmUgPSBzYXZlO1xuZXhwb3J0cy5sb2FkID0gbG9hZDtcbmV4cG9ydHMudXNlQ29sb3JzID0gdXNlQ29sb3JzO1xuXG4vKipcbiAqIENvbG9ycy5cbiAqL1xuXG5leHBvcnRzLmNvbG9ycyA9IFtcbiAgJ2xpZ2h0c2VhZ3JlZW4nLFxuICAnZm9yZXN0Z3JlZW4nLFxuICAnZ29sZGVucm9kJyxcbiAgJ2RvZGdlcmJsdWUnLFxuICAnZGFya29yY2hpZCcsXG4gICdjcmltc29uJ1xuXTtcblxuLyoqXG4gKiBDdXJyZW50bHkgb25seSBXZWJLaXQtYmFzZWQgV2ViIEluc3BlY3RvcnMsIEZpcmVmb3ggPj0gdjMxLFxuICogYW5kIHRoZSBGaXJlYnVnIGV4dGVuc2lvbiAoYW55IEZpcmVmb3ggdmVyc2lvbikgYXJlIGtub3duXG4gKiB0byBzdXBwb3J0IFwiJWNcIiBDU1MgY3VzdG9taXphdGlvbnMuXG4gKlxuICogVE9ETzogYWRkIGEgYGxvY2FsU3RvcmFnZWAgdmFyaWFibGUgdG8gZXhwbGljaXRseSBlbmFibGUvZGlzYWJsZSBjb2xvcnNcbiAqL1xuXG5mdW5jdGlvbiB1c2VDb2xvcnMoKSB7XG4gIC8vIGlzIHdlYmtpdD8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTY0NTk2MDYvMzc2NzczXG4gIHJldHVybiAoJ1dlYmtpdEFwcGVhcmFuY2UnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSkgfHxcbiAgICAvLyBpcyBmaXJlYnVnPyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zOTgxMjAvMzc2NzczXG4gICAgKHdpbmRvdy5jb25zb2xlICYmIChjb25zb2xlLmZpcmVidWcgfHwgKGNvbnNvbGUuZXhjZXB0aW9uICYmIGNvbnNvbGUudGFibGUpKSkgfHxcbiAgICAvLyBpcyBmaXJlZm94ID49IHYzMT9cbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1Rvb2xzL1dlYl9Db25zb2xlI1N0eWxpbmdfbWVzc2FnZXNcbiAgICAobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9maXJlZm94XFwvKFxcZCspLykgJiYgcGFyc2VJbnQoUmVnRXhwLiQxLCAxMCkgPj0gMzEpO1xufVxuXG4vKipcbiAqIE1hcCAlaiB0byBgSlNPTi5zdHJpbmdpZnkoKWAsIHNpbmNlIG5vIFdlYiBJbnNwZWN0b3JzIGRvIHRoYXQgYnkgZGVmYXVsdC5cbiAqL1xuXG5leHBvcnRzLmZvcm1hdHRlcnMuaiA9IGZ1bmN0aW9uKHYpIHtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHYpO1xufTtcblxuXG4vKipcbiAqIENvbG9yaXplIGxvZyBhcmd1bWVudHMgaWYgZW5hYmxlZC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGZvcm1hdEFyZ3MoKSB7XG4gIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICB2YXIgdXNlQ29sb3JzID0gdGhpcy51c2VDb2xvcnM7XG5cbiAgYXJnc1swXSA9ICh1c2VDb2xvcnMgPyAnJWMnIDogJycpXG4gICAgKyB0aGlzLm5hbWVzcGFjZVxuICAgICsgKHVzZUNvbG9ycyA/ICcgJWMnIDogJyAnKVxuICAgICsgYXJnc1swXVxuICAgICsgKHVzZUNvbG9ycyA/ICclYyAnIDogJyAnKVxuICAgICsgJysnICsgZXhwb3J0cy5odW1hbml6ZSh0aGlzLmRpZmYpO1xuXG4gIGlmICghdXNlQ29sb3JzKSByZXR1cm4gYXJncztcblxuICB2YXIgYyA9ICdjb2xvcjogJyArIHRoaXMuY29sb3I7XG4gIGFyZ3MgPSBbYXJnc1swXSwgYywgJ2NvbG9yOiBpbmhlcml0J10uY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MsIDEpKTtcblxuICAvLyB0aGUgZmluYWwgXCIlY1wiIGlzIHNvbWV3aGF0IHRyaWNreSwgYmVjYXVzZSB0aGVyZSBjb3VsZCBiZSBvdGhlclxuICAvLyBhcmd1bWVudHMgcGFzc2VkIGVpdGhlciBiZWZvcmUgb3IgYWZ0ZXIgdGhlICVjLCBzbyB3ZSBuZWVkIHRvXG4gIC8vIGZpZ3VyZSBvdXQgdGhlIGNvcnJlY3QgaW5kZXggdG8gaW5zZXJ0IHRoZSBDU1MgaW50b1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgbGFzdEMgPSAwO1xuICBhcmdzWzBdLnJlcGxhY2UoLyVbYS16JV0vZywgZnVuY3Rpb24obWF0Y2gpIHtcbiAgICBpZiAoJyUlJyA9PT0gbWF0Y2gpIHJldHVybjtcbiAgICBpbmRleCsrO1xuICAgIGlmICgnJWMnID09PSBtYXRjaCkge1xuICAgICAgLy8gd2Ugb25seSBhcmUgaW50ZXJlc3RlZCBpbiB0aGUgKmxhc3QqICVjXG4gICAgICAvLyAodGhlIHVzZXIgbWF5IGhhdmUgcHJvdmlkZWQgdGhlaXIgb3duKVxuICAgICAgbGFzdEMgPSBpbmRleDtcbiAgICB9XG4gIH0pO1xuXG4gIGFyZ3Muc3BsaWNlKGxhc3RDLCAwLCBjKTtcbiAgcmV0dXJuIGFyZ3M7XG59XG5cbi8qKlxuICogSW52b2tlcyBgY29uc29sZS5sb2coKWAgd2hlbiBhdmFpbGFibGUuXG4gKiBOby1vcCB3aGVuIGBjb25zb2xlLmxvZ2AgaXMgbm90IGEgXCJmdW5jdGlvblwiLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gbG9nKCkge1xuICAvLyBUaGlzIGhhY2tlcnkgaXMgcmVxdWlyZWQgZm9yIElFOCxcbiAgLy8gd2hlcmUgdGhlIGBjb25zb2xlLmxvZ2AgZnVuY3Rpb24gZG9lc24ndCBoYXZlICdhcHBseSdcbiAgcmV0dXJuICdvYmplY3QnID09IHR5cGVvZiBjb25zb2xlXG4gICAgJiYgJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgY29uc29sZS5sb2dcbiAgICAmJiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChjb25zb2xlLmxvZywgY29uc29sZSwgYXJndW1lbnRzKTtcbn1cblxuLyoqXG4gKiBTYXZlIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2F2ZShuYW1lc3BhY2VzKSB7XG4gIHRyeSB7XG4gICAgaWYgKG51bGwgPT0gbmFtZXNwYWNlcykge1xuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2RlYnVnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5kZWJ1ZyA9IG5hbWVzcGFjZXM7XG4gICAgfVxuICB9IGNhdGNoKGUpIHt9XG59XG5cbi8qKlxuICogTG9hZCBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSByZXR1cm5zIHRoZSBwcmV2aW91c2x5IHBlcnNpc3RlZCBkZWJ1ZyBtb2Rlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbG9hZCgpIHtcbiAgdmFyIHI7XG4gIHRyeSB7XG4gICAgciA9IGxvY2FsU3RvcmFnZS5kZWJ1ZztcbiAgfSBjYXRjaChlKSB7fVxuICByZXR1cm4gcjtcbn1cblxuLyoqXG4gKiBFbmFibGUgbmFtZXNwYWNlcyBsaXN0ZWQgaW4gYGxvY2FsU3RvcmFnZS5kZWJ1Z2AgaW5pdGlhbGx5LlxuICovXG5cbmV4cG9ydHMuZW5hYmxlKGxvYWQoKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc29ja2V0LmlvLWNsaWVudC9+L2VuZ2luZS5pby1jbGllbnQvfi9kZWJ1Zy9icm93c2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMzdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlxuLyoqXG4gKiBUaGlzIGlzIHRoZSBjb21tb24gbG9naWMgZm9yIGJvdGggdGhlIE5vZGUuanMgYW5kIHdlYiBicm93c2VyXG4gKiBpbXBsZW1lbnRhdGlvbnMgb2YgYGRlYnVnKClgLlxuICpcbiAqIEV4cG9zZSBgZGVidWcoKWAgYXMgdGhlIG1vZHVsZS5cbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBkZWJ1ZztcbmV4cG9ydHMuY29lcmNlID0gY29lcmNlO1xuZXhwb3J0cy5kaXNhYmxlID0gZGlzYWJsZTtcbmV4cG9ydHMuZW5hYmxlID0gZW5hYmxlO1xuZXhwb3J0cy5lbmFibGVkID0gZW5hYmxlZDtcbmV4cG9ydHMuaHVtYW5pemUgPSByZXF1aXJlKCdtcycpO1xuXG4vKipcbiAqIFRoZSBjdXJyZW50bHkgYWN0aXZlIGRlYnVnIG1vZGUgbmFtZXMsIGFuZCBuYW1lcyB0byBza2lwLlxuICovXG5cbmV4cG9ydHMubmFtZXMgPSBbXTtcbmV4cG9ydHMuc2tpcHMgPSBbXTtcblxuLyoqXG4gKiBNYXAgb2Ygc3BlY2lhbCBcIiVuXCIgaGFuZGxpbmcgZnVuY3Rpb25zLCBmb3IgdGhlIGRlYnVnIFwiZm9ybWF0XCIgYXJndW1lbnQuXG4gKlxuICogVmFsaWQga2V5IG5hbWVzIGFyZSBhIHNpbmdsZSwgbG93ZXJjYXNlZCBsZXR0ZXIsIGkuZS4gXCJuXCIuXG4gKi9cblxuZXhwb3J0cy5mb3JtYXR0ZXJzID0ge307XG5cbi8qKlxuICogUHJldmlvdXNseSBhc3NpZ25lZCBjb2xvci5cbiAqL1xuXG52YXIgcHJldkNvbG9yID0gMDtcblxuLyoqXG4gKiBQcmV2aW91cyBsb2cgdGltZXN0YW1wLlxuICovXG5cbnZhciBwcmV2VGltZTtcblxuLyoqXG4gKiBTZWxlY3QgYSBjb2xvci5cbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBzZWxlY3RDb2xvcigpIHtcbiAgcmV0dXJuIGV4cG9ydHMuY29sb3JzW3ByZXZDb2xvcisrICUgZXhwb3J0cy5jb2xvcnMubGVuZ3RoXTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBkZWJ1Z2dlciB3aXRoIHRoZSBnaXZlbiBgbmFtZXNwYWNlYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZGVidWcobmFtZXNwYWNlKSB7XG5cbiAgLy8gZGVmaW5lIHRoZSBgZGlzYWJsZWRgIHZlcnNpb25cbiAgZnVuY3Rpb24gZGlzYWJsZWQoKSB7XG4gIH1cbiAgZGlzYWJsZWQuZW5hYmxlZCA9IGZhbHNlO1xuXG4gIC8vIGRlZmluZSB0aGUgYGVuYWJsZWRgIHZlcnNpb25cbiAgZnVuY3Rpb24gZW5hYmxlZCgpIHtcblxuICAgIHZhciBzZWxmID0gZW5hYmxlZDtcblxuICAgIC8vIHNldCBgZGlmZmAgdGltZXN0YW1wXG4gICAgdmFyIGN1cnIgPSArbmV3IERhdGUoKTtcbiAgICB2YXIgbXMgPSBjdXJyIC0gKHByZXZUaW1lIHx8IGN1cnIpO1xuICAgIHNlbGYuZGlmZiA9IG1zO1xuICAgIHNlbGYucHJldiA9IHByZXZUaW1lO1xuICAgIHNlbGYuY3VyciA9IGN1cnI7XG4gICAgcHJldlRpbWUgPSBjdXJyO1xuXG4gICAgLy8gYWRkIHRoZSBgY29sb3JgIGlmIG5vdCBzZXRcbiAgICBpZiAobnVsbCA9PSBzZWxmLnVzZUNvbG9ycykgc2VsZi51c2VDb2xvcnMgPSBleHBvcnRzLnVzZUNvbG9ycygpO1xuICAgIGlmIChudWxsID09IHNlbGYuY29sb3IgJiYgc2VsZi51c2VDb2xvcnMpIHNlbGYuY29sb3IgPSBzZWxlY3RDb2xvcigpO1xuXG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuXG4gICAgYXJnc1swXSA9IGV4cG9ydHMuY29lcmNlKGFyZ3NbMF0pO1xuXG4gICAgaWYgKCdzdHJpbmcnICE9PSB0eXBlb2YgYXJnc1swXSkge1xuICAgICAgLy8gYW55dGhpbmcgZWxzZSBsZXQncyBpbnNwZWN0IHdpdGggJW9cbiAgICAgIGFyZ3MgPSBbJyVvJ10uY29uY2F0KGFyZ3MpO1xuICAgIH1cblxuICAgIC8vIGFwcGx5IGFueSBgZm9ybWF0dGVyc2AgdHJhbnNmb3JtYXRpb25zXG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICBhcmdzWzBdID0gYXJnc1swXS5yZXBsYWNlKC8lKFthLXolXSkvZywgZnVuY3Rpb24obWF0Y2gsIGZvcm1hdCkge1xuICAgICAgLy8gaWYgd2UgZW5jb3VudGVyIGFuIGVzY2FwZWQgJSB0aGVuIGRvbid0IGluY3JlYXNlIHRoZSBhcnJheSBpbmRleFxuICAgICAgaWYgKG1hdGNoID09PSAnJSUnKSByZXR1cm4gbWF0Y2g7XG4gICAgICBpbmRleCsrO1xuICAgICAgdmFyIGZvcm1hdHRlciA9IGV4cG9ydHMuZm9ybWF0dGVyc1tmb3JtYXRdO1xuICAgICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBmb3JtYXR0ZXIpIHtcbiAgICAgICAgdmFyIHZhbCA9IGFyZ3NbaW5kZXhdO1xuICAgICAgICBtYXRjaCA9IGZvcm1hdHRlci5jYWxsKHNlbGYsIHZhbCk7XG5cbiAgICAgICAgLy8gbm93IHdlIG5lZWQgdG8gcmVtb3ZlIGBhcmdzW2luZGV4XWAgc2luY2UgaXQncyBpbmxpbmVkIGluIHRoZSBgZm9ybWF0YFxuICAgICAgICBhcmdzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGluZGV4LS07XG4gICAgICB9XG4gICAgICByZXR1cm4gbWF0Y2g7XG4gICAgfSk7XG5cbiAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGV4cG9ydHMuZm9ybWF0QXJncykge1xuICAgICAgYXJncyA9IGV4cG9ydHMuZm9ybWF0QXJncy5hcHBseShzZWxmLCBhcmdzKTtcbiAgICB9XG4gICAgdmFyIGxvZ0ZuID0gZW5hYmxlZC5sb2cgfHwgZXhwb3J0cy5sb2cgfHwgY29uc29sZS5sb2cuYmluZChjb25zb2xlKTtcbiAgICBsb2dGbi5hcHBseShzZWxmLCBhcmdzKTtcbiAgfVxuICBlbmFibGVkLmVuYWJsZWQgPSB0cnVlO1xuXG4gIHZhciBmbiA9IGV4cG9ydHMuZW5hYmxlZChuYW1lc3BhY2UpID8gZW5hYmxlZCA6IGRpc2FibGVkO1xuXG4gIGZuLm5hbWVzcGFjZSA9IG5hbWVzcGFjZTtcblxuICByZXR1cm4gZm47XG59XG5cbi8qKlxuICogRW5hYmxlcyBhIGRlYnVnIG1vZGUgYnkgbmFtZXNwYWNlcy4gVGhpcyBjYW4gaW5jbHVkZSBtb2Rlc1xuICogc2VwYXJhdGVkIGJ5IGEgY29sb24gYW5kIHdpbGRjYXJkcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBlbmFibGUobmFtZXNwYWNlcykge1xuICBleHBvcnRzLnNhdmUobmFtZXNwYWNlcyk7XG5cbiAgdmFyIHNwbGl0ID0gKG5hbWVzcGFjZXMgfHwgJycpLnNwbGl0KC9bXFxzLF0rLyk7XG4gIHZhciBsZW4gPSBzcGxpdC5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGlmICghc3BsaXRbaV0pIGNvbnRpbnVlOyAvLyBpZ25vcmUgZW1wdHkgc3RyaW5nc1xuICAgIG5hbWVzcGFjZXMgPSBzcGxpdFtpXS5yZXBsYWNlKC9cXCovZywgJy4qPycpO1xuICAgIGlmIChuYW1lc3BhY2VzWzBdID09PSAnLScpIHtcbiAgICAgIGV4cG9ydHMuc2tpcHMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMuc3Vic3RyKDEpICsgJyQnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cG9ydHMubmFtZXMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMgKyAnJCcpKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNhYmxlIGRlYnVnIG91dHB1dC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gIGV4cG9ydHMuZW5hYmxlKCcnKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIG1vZGUgbmFtZSBpcyBlbmFibGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGVuYWJsZWQobmFtZSkge1xuICB2YXIgaSwgbGVuO1xuICBmb3IgKGkgPSAwLCBsZW4gPSBleHBvcnRzLnNraXBzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGV4cG9ydHMuc2tpcHNbaV0udGVzdChuYW1lKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICBmb3IgKGkgPSAwLCBsZW4gPSBleHBvcnRzLm5hbWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGV4cG9ydHMubmFtZXNbaV0udGVzdChuYW1lKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDb2VyY2UgYHZhbGAuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gdmFsXG4gKiBAcmV0dXJuIHtNaXhlZH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGNvZXJjZSh2YWwpIHtcbiAgaWYgKHZhbCBpbnN0YW5jZW9mIEVycm9yKSByZXR1cm4gdmFsLnN0YWNrIHx8IHZhbC5tZXNzYWdlO1xuICByZXR1cm4gdmFsO1xufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjayktZGV2LXNlcnZlci9+L3NvY2tldC5pby1jbGllbnQvfi9lbmdpbmUuaW8tY2xpZW50L34vZGVidWcvZGVidWcuanNcbiAqKiBtb2R1bGUgaWQgPSAzOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBIZWxwZXJzLlxuICovXG5cbnZhciBzID0gMTAwMDtcbnZhciBtID0gcyAqIDYwO1xudmFyIGggPSBtICogNjA7XG52YXIgZCA9IGggKiAyNDtcbnZhciB5ID0gZCAqIDM2NS4yNTtcblxuLyoqXG4gKiBQYXJzZSBvciBmb3JtYXQgdGhlIGdpdmVuIGB2YWxgLlxuICpcbiAqIE9wdGlvbnM6XG4gKlxuICogIC0gYGxvbmdgIHZlcmJvc2UgZm9ybWF0dGluZyBbZmFsc2VdXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSB2YWxcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHtTdHJpbmd8TnVtYmVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZhbCwgb3B0aW9ucyl7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBpZiAoJ3N0cmluZycgPT0gdHlwZW9mIHZhbCkgcmV0dXJuIHBhcnNlKHZhbCk7XG4gIHJldHVybiBvcHRpb25zLmxvbmdcbiAgICA/IGxvbmcodmFsKVxuICAgIDogc2hvcnQodmFsKTtcbn07XG5cbi8qKlxuICogUGFyc2UgdGhlIGdpdmVuIGBzdHJgIGFuZCByZXR1cm4gbWlsbGlzZWNvbmRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBhcnNlKHN0cikge1xuICB2YXIgbWF0Y2ggPSAvXigoPzpcXGQrKT9cXC4/XFxkKykgKihtc3xzZWNvbmRzP3xzfG1pbnV0ZXM/fG18aG91cnM/fGh8ZGF5cz98ZHx5ZWFycz98eSk/JC9pLmV4ZWMoc3RyKTtcbiAgaWYgKCFtYXRjaCkgcmV0dXJuO1xuICB2YXIgbiA9IHBhcnNlRmxvYXQobWF0Y2hbMV0pO1xuICB2YXIgdHlwZSA9IChtYXRjaFsyXSB8fCAnbXMnKS50b0xvd2VyQ2FzZSgpO1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICd5ZWFycyc6XG4gICAgY2FzZSAneWVhcic6XG4gICAgY2FzZSAneSc6XG4gICAgICByZXR1cm4gbiAqIHk7XG4gICAgY2FzZSAnZGF5cyc6XG4gICAgY2FzZSAnZGF5JzpcbiAgICBjYXNlICdkJzpcbiAgICAgIHJldHVybiBuICogZDtcbiAgICBjYXNlICdob3Vycyc6XG4gICAgY2FzZSAnaG91cic6XG4gICAgY2FzZSAnaCc6XG4gICAgICByZXR1cm4gbiAqIGg7XG4gICAgY2FzZSAnbWludXRlcyc6XG4gICAgY2FzZSAnbWludXRlJzpcbiAgICBjYXNlICdtJzpcbiAgICAgIHJldHVybiBuICogbTtcbiAgICBjYXNlICdzZWNvbmRzJzpcbiAgICBjYXNlICdzZWNvbmQnOlxuICAgIGNhc2UgJ3MnOlxuICAgICAgcmV0dXJuIG4gKiBzO1xuICAgIGNhc2UgJ21zJzpcbiAgICAgIHJldHVybiBuO1xuICB9XG59XG5cbi8qKlxuICogU2hvcnQgZm9ybWF0IGZvciBgbXNgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2hvcnQobXMpIHtcbiAgaWYgKG1zID49IGQpIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gZCkgKyAnZCc7XG4gIGlmIChtcyA+PSBoKSByZXR1cm4gTWF0aC5yb3VuZChtcyAvIGgpICsgJ2gnO1xuICBpZiAobXMgPj0gbSkgcmV0dXJuIE1hdGgucm91bmQobXMgLyBtKSArICdtJztcbiAgaWYgKG1zID49IHMpIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gcykgKyAncyc7XG4gIHJldHVybiBtcyArICdtcyc7XG59XG5cbi8qKlxuICogTG9uZyBmb3JtYXQgZm9yIGBtc2AuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1zXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBsb25nKG1zKSB7XG4gIHJldHVybiBwbHVyYWwobXMsIGQsICdkYXknKVxuICAgIHx8IHBsdXJhbChtcywgaCwgJ2hvdXInKVxuICAgIHx8IHBsdXJhbChtcywgbSwgJ21pbnV0ZScpXG4gICAgfHwgcGx1cmFsKG1zLCBzLCAnc2Vjb25kJylcbiAgICB8fCBtcyArICcgbXMnO1xufVxuXG4vKipcbiAqIFBsdXJhbGl6YXRpb24gaGVscGVyLlxuICovXG5cbmZ1bmN0aW9uIHBsdXJhbChtcywgbiwgbmFtZSkge1xuICBpZiAobXMgPCBuKSByZXR1cm47XG4gIGlmIChtcyA8IG4gKiAxLjUpIHJldHVybiBNYXRoLmZsb29yKG1zIC8gbikgKyAnICcgKyBuYW1lO1xuICByZXR1cm4gTWF0aC5jZWlsKG1zIC8gbikgKyAnICcgKyBuYW1lICsgJ3MnO1xufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjayktZGV2LXNlcnZlci9+L3NvY2tldC5pby1jbGllbnQvfi9lbmdpbmUuaW8tY2xpZW50L34vZGVidWcvfi9tcy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDM5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcbi8qKlxuICogTW9kdWxlIHJlcXVpcmVtZW50cy5cbiAqL1xuXG52YXIgUG9sbGluZyA9IHJlcXVpcmUoJy4vcG9sbGluZycpO1xudmFyIGluaGVyaXQgPSByZXF1aXJlKCdjb21wb25lbnQtaW5oZXJpdCcpO1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gSlNPTlBQb2xsaW5nO1xuXG4vKipcbiAqIENhY2hlZCByZWd1bGFyIGV4cHJlc3Npb25zLlxuICovXG5cbnZhciByTmV3bGluZSA9IC9cXG4vZztcbnZhciByRXNjYXBlZE5ld2xpbmUgPSAvXFxcXG4vZztcblxuLyoqXG4gKiBHbG9iYWwgSlNPTlAgY2FsbGJhY2tzLlxuICovXG5cbnZhciBjYWxsYmFja3M7XG5cbi8qKlxuICogQ2FsbGJhY2tzIGNvdW50LlxuICovXG5cbnZhciBpbmRleCA9IDA7XG5cbi8qKlxuICogTm9vcC5cbiAqL1xuXG5mdW5jdGlvbiBlbXB0eSAoKSB7IH1cblxuLyoqXG4gKiBKU09OUCBQb2xsaW5nIGNvbnN0cnVjdG9yLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBKU09OUFBvbGxpbmcgKG9wdHMpIHtcbiAgUG9sbGluZy5jYWxsKHRoaXMsIG9wdHMpO1xuXG4gIHRoaXMucXVlcnkgPSB0aGlzLnF1ZXJ5IHx8IHt9O1xuXG4gIC8vIGRlZmluZSBnbG9iYWwgY2FsbGJhY2tzIGFycmF5IGlmIG5vdCBwcmVzZW50XG4gIC8vIHdlIGRvIHRoaXMgaGVyZSAobGF6aWx5KSB0byBhdm9pZCB1bm5lZWRlZCBnbG9iYWwgcG9sbHV0aW9uXG4gIGlmICghY2FsbGJhY2tzKSB7XG4gICAgLy8gd2UgbmVlZCB0byBjb25zaWRlciBtdWx0aXBsZSBlbmdpbmVzIGluIHRoZSBzYW1lIHBhZ2VcbiAgICBpZiAoIWdsb2JhbC5fX19laW8pIGdsb2JhbC5fX19laW8gPSBbXTtcbiAgICBjYWxsYmFja3MgPSBnbG9iYWwuX19fZWlvO1xuICB9XG5cbiAgLy8gY2FsbGJhY2sgaWRlbnRpZmllclxuICB0aGlzLmluZGV4ID0gY2FsbGJhY2tzLmxlbmd0aDtcblxuICAvLyBhZGQgY2FsbGJhY2sgdG8ganNvbnAgZ2xvYmFsXG4gIHZhciBzZWxmID0gdGhpcztcbiAgY2FsbGJhY2tzLnB1c2goZnVuY3Rpb24gKG1zZykge1xuICAgIHNlbGYub25EYXRhKG1zZyk7XG4gIH0pO1xuXG4gIC8vIGFwcGVuZCB0byBxdWVyeSBzdHJpbmdcbiAgdGhpcy5xdWVyeS5qID0gdGhpcy5pbmRleDtcblxuICAvLyBwcmV2ZW50IHNwdXJpb3VzIGVycm9ycyBmcm9tIGJlaW5nIGVtaXR0ZWQgd2hlbiB0aGUgd2luZG93IGlzIHVubG9hZGVkXG4gIGlmIChnbG9iYWwuZG9jdW1lbnQgJiYgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHNlbGYuc2NyaXB0KSBzZWxmLnNjcmlwdC5vbmVycm9yID0gZW1wdHk7XG4gICAgfSwgZmFsc2UpO1xuICB9XG59XG5cbi8qKlxuICogSW5oZXJpdHMgZnJvbSBQb2xsaW5nLlxuICovXG5cbmluaGVyaXQoSlNPTlBQb2xsaW5nLCBQb2xsaW5nKTtcblxuLypcbiAqIEpTT05QIG9ubHkgc3VwcG9ydHMgYmluYXJ5IGFzIGJhc2U2NCBlbmNvZGVkIHN0cmluZ3NcbiAqL1xuXG5KU09OUFBvbGxpbmcucHJvdG90eXBlLnN1cHBvcnRzQmluYXJ5ID0gZmFsc2U7XG5cbi8qKlxuICogQ2xvc2VzIHRoZSBzb2NrZXQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuSlNPTlBQb2xsaW5nLnByb3RvdHlwZS5kb0Nsb3NlID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5zY3JpcHQpIHtcbiAgICB0aGlzLnNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuc2NyaXB0KTtcbiAgICB0aGlzLnNjcmlwdCA9IG51bGw7XG4gIH1cblxuICBpZiAodGhpcy5mb3JtKSB7XG4gICAgdGhpcy5mb3JtLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5mb3JtKTtcbiAgICB0aGlzLmZvcm0gPSBudWxsO1xuICAgIHRoaXMuaWZyYW1lID0gbnVsbDtcbiAgfVxuXG4gIFBvbGxpbmcucHJvdG90eXBlLmRvQ2xvc2UuY2FsbCh0aGlzKTtcbn07XG5cbi8qKlxuICogU3RhcnRzIGEgcG9sbCBjeWNsZS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5KU09OUFBvbGxpbmcucHJvdG90eXBlLmRvUG9sbCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cbiAgaWYgKHRoaXMuc2NyaXB0KSB7XG4gICAgdGhpcy5zY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnNjcmlwdCk7XG4gICAgdGhpcy5zY3JpcHQgPSBudWxsO1xuICB9XG5cbiAgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiAgc2NyaXB0LnNyYyA9IHRoaXMudXJpKCk7XG4gIHNjcmlwdC5vbmVycm9yID0gZnVuY3Rpb24oZSl7XG4gICAgc2VsZi5vbkVycm9yKCdqc29ucCBwb2xsIGVycm9yJyxlKTtcbiAgfTtcblxuICB2YXIgaW5zZXJ0QXQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XG4gIGluc2VydEF0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHNjcmlwdCwgaW5zZXJ0QXQpO1xuICB0aGlzLnNjcmlwdCA9IHNjcmlwdDtcblxuICB2YXIgaXNVQWdlY2tvID0gJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIG5hdmlnYXRvciAmJiAvZ2Vja28vaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICBcbiAgaWYgKGlzVUFnZWNrbykge1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICAgIH0sIDEwMCk7XG4gIH1cbn07XG5cbi8qKlxuICogV3JpdGVzIHdpdGggYSBoaWRkZW4gaWZyYW1lLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhIHRvIHNlbmRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxlZCB1cG9uIGZsdXNoLlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuSlNPTlBQb2xsaW5nLnByb3RvdHlwZS5kb1dyaXRlID0gZnVuY3Rpb24gKGRhdGEsIGZuKSB7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICBpZiAoIXRoaXMuZm9ybSkge1xuICAgIHZhciBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgIHZhciBhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgICB2YXIgaWQgPSB0aGlzLmlmcmFtZUlkID0gJ2Vpb19pZnJhbWVfJyArIHRoaXMuaW5kZXg7XG4gICAgdmFyIGlmcmFtZTtcblxuICAgIGZvcm0uY2xhc3NOYW1lID0gJ3NvY2tldGlvJztcbiAgICBmb3JtLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBmb3JtLnN0eWxlLnRvcCA9ICctMTAwMHB4JztcbiAgICBmb3JtLnN0eWxlLmxlZnQgPSAnLTEwMDBweCc7XG4gICAgZm9ybS50YXJnZXQgPSBpZDtcbiAgICBmb3JtLm1ldGhvZCA9ICdQT1NUJztcbiAgICBmb3JtLnNldEF0dHJpYnV0ZSgnYWNjZXB0LWNoYXJzZXQnLCAndXRmLTgnKTtcbiAgICBhcmVhLm5hbWUgPSAnZCc7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChhcmVhKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvcm0pO1xuXG4gICAgdGhpcy5mb3JtID0gZm9ybTtcbiAgICB0aGlzLmFyZWEgPSBhcmVhO1xuICB9XG5cbiAgdGhpcy5mb3JtLmFjdGlvbiA9IHRoaXMudXJpKCk7XG5cbiAgZnVuY3Rpb24gY29tcGxldGUgKCkge1xuICAgIGluaXRJZnJhbWUoKTtcbiAgICBmbigpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdElmcmFtZSAoKSB7XG4gICAgaWYgKHNlbGYuaWZyYW1lKSB7XG4gICAgICB0cnkge1xuICAgICAgICBzZWxmLmZvcm0ucmVtb3ZlQ2hpbGQoc2VsZi5pZnJhbWUpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBzZWxmLm9uRXJyb3IoJ2pzb25wIHBvbGxpbmcgaWZyYW1lIHJlbW92YWwgZXJyb3InLCBlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgLy8gaWU2IGR5bmFtaWMgaWZyYW1lcyB3aXRoIHRhcmdldD1cIlwiIHN1cHBvcnQgKHRoYW5rcyBDaHJpcyBMYW1iYWNoZXIpXG4gICAgICB2YXIgaHRtbCA9ICc8aWZyYW1lIHNyYz1cImphdmFzY3JpcHQ6MFwiIG5hbWU9XCInKyBzZWxmLmlmcmFtZUlkICsnXCI+JztcbiAgICAgIGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaHRtbCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gICAgICBpZnJhbWUubmFtZSA9IHNlbGYuaWZyYW1lSWQ7XG4gICAgICBpZnJhbWUuc3JjID0gJ2phdmFzY3JpcHQ6MCc7XG4gICAgfVxuXG4gICAgaWZyYW1lLmlkID0gc2VsZi5pZnJhbWVJZDtcblxuICAgIHNlbGYuZm9ybS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAgIHNlbGYuaWZyYW1lID0gaWZyYW1lO1xuICB9XG5cbiAgaW5pdElmcmFtZSgpO1xuXG4gIC8vIGVzY2FwZSBcXG4gdG8gcHJldmVudCBpdCBmcm9tIGJlaW5nIGNvbnZlcnRlZCBpbnRvIFxcclxcbiBieSBzb21lIFVBc1xuICAvLyBkb3VibGUgZXNjYXBpbmcgaXMgcmVxdWlyZWQgZm9yIGVzY2FwZWQgbmV3IGxpbmVzIGJlY2F1c2UgdW5lc2NhcGluZyBvZiBuZXcgbGluZXMgY2FuIGJlIGRvbmUgc2FmZWx5IG9uIHNlcnZlci1zaWRlXG4gIGRhdGEgPSBkYXRhLnJlcGxhY2UockVzY2FwZWROZXdsaW5lLCAnXFxcXFxcbicpO1xuICB0aGlzLmFyZWEudmFsdWUgPSBkYXRhLnJlcGxhY2Uock5ld2xpbmUsICdcXFxcbicpO1xuXG4gIHRyeSB7XG4gICAgdGhpcy5mb3JtLnN1Ym1pdCgpO1xuICB9IGNhdGNoKGUpIHt9XG5cbiAgaWYgKHRoaXMuaWZyYW1lLmF0dGFjaEV2ZW50KSB7XG4gICAgdGhpcy5pZnJhbWUub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKXtcbiAgICAgIGlmIChzZWxmLmlmcmFtZS5yZWFkeVN0YXRlID09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgY29tcGxldGUoKTtcbiAgICAgIH1cbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIHRoaXMuaWZyYW1lLm9ubG9hZCA9IGNvbXBsZXRlO1xuICB9XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjayktZGV2LXNlcnZlci9+L3NvY2tldC5pby1jbGllbnQvfi9lbmdpbmUuaW8tY2xpZW50L2xpYi90cmFuc3BvcnRzL3BvbGxpbmctanNvbnAuanNcbiAqKiBtb2R1bGUgaWQgPSA0MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBUcmFuc3BvcnQgPSByZXF1aXJlKCcuLi90cmFuc3BvcnQnKTtcbnZhciBwYXJzZXIgPSByZXF1aXJlKCdlbmdpbmUuaW8tcGFyc2VyJyk7XG52YXIgcGFyc2VxcyA9IHJlcXVpcmUoJ3BhcnNlcXMnKTtcbnZhciBpbmhlcml0ID0gcmVxdWlyZSgnY29tcG9uZW50LWluaGVyaXQnKTtcbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ2VuZ2luZS5pby1jbGllbnQ6d2Vic29ja2V0Jyk7XG5cbi8qKlxuICogYHdzYCBleHBvc2VzIGEgV2ViU29ja2V0LWNvbXBhdGlibGUgaW50ZXJmYWNlIGluXG4gKiBOb2RlLCBvciB0aGUgYFdlYlNvY2tldGAgb3IgYE1veldlYlNvY2tldGAgZ2xvYmFsc1xuICogaW4gdGhlIGJyb3dzZXIuXG4gKi9cblxudmFyIFdlYlNvY2tldCA9IHJlcXVpcmUoJ3dzJyk7XG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBXUztcblxuLyoqXG4gKiBXZWJTb2NrZXQgdHJhbnNwb3J0IGNvbnN0cnVjdG9yLlxuICpcbiAqIEBhcGkge09iamVjdH0gY29ubmVjdGlvbiBvcHRpb25zXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIFdTKG9wdHMpe1xuICB2YXIgZm9yY2VCYXNlNjQgPSAob3B0cyAmJiBvcHRzLmZvcmNlQmFzZTY0KTtcbiAgaWYgKGZvcmNlQmFzZTY0KSB7XG4gICAgdGhpcy5zdXBwb3J0c0JpbmFyeSA9IGZhbHNlO1xuICB9XG4gIFRyYW5zcG9ydC5jYWxsKHRoaXMsIG9wdHMpO1xufVxuXG4vKipcbiAqIEluaGVyaXRzIGZyb20gVHJhbnNwb3J0LlxuICovXG5cbmluaGVyaXQoV1MsIFRyYW5zcG9ydCk7XG5cbi8qKlxuICogVHJhbnNwb3J0IG5hbWUuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5XUy5wcm90b3R5cGUubmFtZSA9ICd3ZWJzb2NrZXQnO1xuXG4vKlxuICogV2ViU29ja2V0cyBzdXBwb3J0IGJpbmFyeVxuICovXG5cbldTLnByb3RvdHlwZS5zdXBwb3J0c0JpbmFyeSA9IHRydWU7XG5cbi8qKlxuICogT3BlbnMgc29ja2V0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbldTLnByb3RvdHlwZS5kb09wZW4gPSBmdW5jdGlvbigpe1xuICBpZiAoIXRoaXMuY2hlY2soKSkge1xuICAgIC8vIGxldCBwcm9iZSB0aW1lb3V0XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgdXJpID0gdGhpcy51cmkoKTtcbiAgdmFyIHByb3RvY29scyA9IHZvaWQoMCk7XG4gIHZhciBvcHRzID0geyBhZ2VudDogdGhpcy5hZ2VudCB9O1xuXG4gIC8vIFNTTCBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxuICBvcHRzLnBmeCA9IHRoaXMucGZ4O1xuICBvcHRzLmtleSA9IHRoaXMua2V5O1xuICBvcHRzLnBhc3NwaHJhc2UgPSB0aGlzLnBhc3NwaHJhc2U7XG4gIG9wdHMuY2VydCA9IHRoaXMuY2VydDtcbiAgb3B0cy5jYSA9IHRoaXMuY2E7XG4gIG9wdHMuY2lwaGVycyA9IHRoaXMuY2lwaGVycztcbiAgb3B0cy5yZWplY3RVbmF1dGhvcml6ZWQgPSB0aGlzLnJlamVjdFVuYXV0aG9yaXplZDtcblxuICB0aGlzLndzID0gbmV3IFdlYlNvY2tldCh1cmksIHByb3RvY29scywgb3B0cyk7XG5cbiAgaWYgKHRoaXMud3MuYmluYXJ5VHlwZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5zdXBwb3J0c0JpbmFyeSA9IGZhbHNlO1xuICB9XG5cbiAgdGhpcy53cy5iaW5hcnlUeXBlID0gJ2FycmF5YnVmZmVyJztcbiAgdGhpcy5hZGRFdmVudExpc3RlbmVycygpO1xufTtcblxuLyoqXG4gKiBBZGRzIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgc29ja2V0XG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuV1MucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24oKXtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIHRoaXMud3Mub25vcGVuID0gZnVuY3Rpb24oKXtcbiAgICBzZWxmLm9uT3BlbigpO1xuICB9O1xuICB0aGlzLndzLm9uY2xvc2UgPSBmdW5jdGlvbigpe1xuICAgIHNlbGYub25DbG9zZSgpO1xuICB9O1xuICB0aGlzLndzLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGV2KXtcbiAgICBzZWxmLm9uRGF0YShldi5kYXRhKTtcbiAgfTtcbiAgdGhpcy53cy5vbmVycm9yID0gZnVuY3Rpb24oZSl7XG4gICAgc2VsZi5vbkVycm9yKCd3ZWJzb2NrZXQgZXJyb3InLCBlKTtcbiAgfTtcbn07XG5cbi8qKlxuICogT3ZlcnJpZGUgYG9uRGF0YWAgdG8gdXNlIGEgdGltZXIgb24gaU9TLlxuICogU2VlOiBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9tbG91Z2hyYW4vMjA1MjAwNlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmlmICgndW5kZWZpbmVkJyAhPSB0eXBlb2YgbmF2aWdhdG9yXG4gICYmIC9pUGFkfGlQaG9uZXxpUG9kL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkge1xuICBXUy5wcm90b3R5cGUub25EYXRhID0gZnVuY3Rpb24oZGF0YSl7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIFRyYW5zcG9ydC5wcm90b3R5cGUub25EYXRhLmNhbGwoc2VsZiwgZGF0YSk7XG4gICAgfSwgMCk7XG4gIH07XG59XG5cbi8qKlxuICogV3JpdGVzIGRhdGEgdG8gc29ja2V0LlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IG9mIHBhY2tldHMuXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5XUy5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbihwYWNrZXRzKXtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB0aGlzLndyaXRhYmxlID0gZmFsc2U7XG4gIC8vIGVuY29kZVBhY2tldCBlZmZpY2llbnQgYXMgaXQgdXNlcyBXUyBmcmFtaW5nXG4gIC8vIG5vIG5lZWQgZm9yIGVuY29kZVBheWxvYWRcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBwYWNrZXRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIHBhcnNlci5lbmNvZGVQYWNrZXQocGFja2V0c1tpXSwgdGhpcy5zdXBwb3J0c0JpbmFyeSwgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgLy9Tb21ldGltZXMgdGhlIHdlYnNvY2tldCBoYXMgYWxyZWFkeSBiZWVuIGNsb3NlZCBidXQgdGhlIGJyb3dzZXIgZGlkbid0XG4gICAgICAvL2hhdmUgYSBjaGFuY2Ugb2YgaW5mb3JtaW5nIHVzIGFib3V0IGl0IHlldCwgaW4gdGhhdCBjYXNlIHNlbmQgd2lsbFxuICAgICAgLy90aHJvdyBhbiBlcnJvclxuICAgICAgdHJ5IHtcbiAgICAgICAgc2VsZi53cy5zZW5kKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIGRlYnVnKCd3ZWJzb2NrZXQgY2xvc2VkIGJlZm9yZSBvbmNsb3NlIGV2ZW50Jyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBvbmRyYWluKCkge1xuICAgIHNlbGYud3JpdGFibGUgPSB0cnVlO1xuICAgIHNlbGYuZW1pdCgnZHJhaW4nKTtcbiAgfVxuICAvLyBmYWtlIGRyYWluXG4gIC8vIGRlZmVyIHRvIG5leHQgdGljayB0byBhbGxvdyBTb2NrZXQgdG8gY2xlYXIgd3JpdGVCdWZmZXJcbiAgc2V0VGltZW91dChvbmRyYWluLCAwKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gY2xvc2VcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5XUy5wcm90b3R5cGUub25DbG9zZSA9IGZ1bmN0aW9uKCl7XG4gIFRyYW5zcG9ydC5wcm90b3R5cGUub25DbG9zZS5jYWxsKHRoaXMpO1xufTtcblxuLyoqXG4gKiBDbG9zZXMgc29ja2V0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbldTLnByb3RvdHlwZS5kb0Nsb3NlID0gZnVuY3Rpb24oKXtcbiAgaWYgKHR5cGVvZiB0aGlzLndzICE9PSAndW5kZWZpbmVkJykge1xuICAgIHRoaXMud3MuY2xvc2UoKTtcbiAgfVxufTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgdXJpIGZvciBjb25uZWN0aW9uLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbldTLnByb3RvdHlwZS51cmkgPSBmdW5jdGlvbigpe1xuICB2YXIgcXVlcnkgPSB0aGlzLnF1ZXJ5IHx8IHt9O1xuICB2YXIgc2NoZW1hID0gdGhpcy5zZWN1cmUgPyAnd3NzJyA6ICd3cyc7XG4gIHZhciBwb3J0ID0gJyc7XG5cbiAgLy8gYXZvaWQgcG9ydCBpZiBkZWZhdWx0IGZvciBzY2hlbWFcbiAgaWYgKHRoaXMucG9ydCAmJiAoKCd3c3MnID09IHNjaGVtYSAmJiB0aGlzLnBvcnQgIT0gNDQzKVxuICAgIHx8ICgnd3MnID09IHNjaGVtYSAmJiB0aGlzLnBvcnQgIT0gODApKSkge1xuICAgIHBvcnQgPSAnOicgKyB0aGlzLnBvcnQ7XG4gIH1cblxuICAvLyBhcHBlbmQgdGltZXN0YW1wIHRvIFVSSVxuICBpZiAodGhpcy50aW1lc3RhbXBSZXF1ZXN0cykge1xuICAgIHF1ZXJ5W3RoaXMudGltZXN0YW1wUGFyYW1dID0gK25ldyBEYXRlO1xuICB9XG5cbiAgLy8gY29tbXVuaWNhdGUgYmluYXJ5IHN1cHBvcnQgY2FwYWJpbGl0aWVzXG4gIGlmICghdGhpcy5zdXBwb3J0c0JpbmFyeSkge1xuICAgIHF1ZXJ5LmI2NCA9IDE7XG4gIH1cblxuICBxdWVyeSA9IHBhcnNlcXMuZW5jb2RlKHF1ZXJ5KTtcblxuICAvLyBwcmVwZW5kID8gdG8gcXVlcnlcbiAgaWYgKHF1ZXJ5Lmxlbmd0aCkge1xuICAgIHF1ZXJ5ID0gJz8nICsgcXVlcnk7XG4gIH1cblxuICByZXR1cm4gc2NoZW1hICsgJzovLycgKyB0aGlzLmhvc3RuYW1lICsgcG9ydCArIHRoaXMucGF0aCArIHF1ZXJ5O1xufTtcblxuLyoqXG4gKiBGZWF0dXJlIGRldGVjdGlvbiBmb3IgV2ViU29ja2V0LlxuICpcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHdoZXRoZXIgdGhpcyB0cmFuc3BvcnQgaXMgYXZhaWxhYmxlLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5XUy5wcm90b3R5cGUuY2hlY2sgPSBmdW5jdGlvbigpe1xuICByZXR1cm4gISFXZWJTb2NrZXQgJiYgISgnX19pbml0aWFsaXplJyBpbiBXZWJTb2NrZXQgJiYgdGhpcy5uYW1lID09PSBXUy5wcm90b3R5cGUubmFtZSk7XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjayktZGV2LXNlcnZlci9+L3NvY2tldC5pby1jbGllbnQvfi9lbmdpbmUuaW8tY2xpZW50L2xpYi90cmFuc3BvcnRzL3dlYnNvY2tldC5qc1xuICoqIG1vZHVsZSBpZCA9IDQxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcbi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgZ2xvYmFsID0gKGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSkoKTtcblxuLyoqXG4gKiBXZWJTb2NrZXQgY29uc3RydWN0b3IuXG4gKi9cblxudmFyIFdlYlNvY2tldCA9IGdsb2JhbC5XZWJTb2NrZXQgfHwgZ2xvYmFsLk1veldlYlNvY2tldDtcblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdlYlNvY2tldCA/IHdzIDogbnVsbDtcblxuLyoqXG4gKiBXZWJTb2NrZXQgY29uc3RydWN0b3IuXG4gKlxuICogVGhlIHRoaXJkIGBvcHRzYCBvcHRpb25zIG9iamVjdCBnZXRzIGlnbm9yZWQgaW4gd2ViIGJyb3dzZXJzLCBzaW5jZSBpdCdzXG4gKiBub24tc3RhbmRhcmQsIGFuZCB0aHJvd3MgYSBUeXBlRXJyb3IgaWYgcGFzc2VkIHRvIHRoZSBjb25zdHJ1Y3Rvci5cbiAqIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2VpbmFyb3Mvd3MvaXNzdWVzLzIyN1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmlcbiAqIEBwYXJhbSB7QXJyYXl9IHByb3RvY29scyAob3B0aW9uYWwpXG4gKiBAcGFyYW0ge09iamVjdCkgb3B0cyAob3B0aW9uYWwpXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIHdzKHVyaSwgcHJvdG9jb2xzLCBvcHRzKSB7XG4gIHZhciBpbnN0YW5jZTtcbiAgaWYgKHByb3RvY29scykge1xuICAgIGluc3RhbmNlID0gbmV3IFdlYlNvY2tldCh1cmksIHByb3RvY29scyk7XG4gIH0gZWxzZSB7XG4gICAgaW5zdGFuY2UgPSBuZXcgV2ViU29ja2V0KHVyaSk7XG4gIH1cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG5pZiAoV2ViU29ja2V0KSB3cy5wcm90b3R5cGUgPSBXZWJTb2NrZXQucHJvdG90eXBlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjayktZGV2LXNlcnZlci9+L3NvY2tldC5pby1jbGllbnQvfi9lbmdpbmUuaW8tY2xpZW50L34vd3MvbGliL2Jyb3dzZXIuanNcbiAqKiBtb2R1bGUgaWQgPSA0MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXG52YXIgaW5kZXhPZiA9IFtdLmluZGV4T2Y7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXJyLCBvYmope1xuICBpZiAoaW5kZXhPZikgcmV0dXJuIGFyci5pbmRleE9mKG9iaik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKGFycltpXSA9PT0gb2JqKSByZXR1cm4gaTtcbiAgfVxuICByZXR1cm4gLTE7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spLWRldi1zZXJ2ZXIvfi9zb2NrZXQuaW8tY2xpZW50L34vaW5kZXhvZi9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDQzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIFBhcnNlcyBhbiBVUklcbiAqXG4gKiBAYXV0aG9yIFN0ZXZlbiBMZXZpdGhhbiA8c3RldmVubGV2aXRoYW4uY29tPiAoTUlUIGxpY2Vuc2UpXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG52YXIgcmUgPSAvXig/Oig/IVteOkBdKzpbXjpAXFwvXSpAKShodHRwfGh0dHBzfHdzfHdzcyk6XFwvXFwvKT8oKD86KChbXjpAXSopKD86OihbXjpAXSopKT8pP0ApPygoPzpbYS1mMC05XXswLDR9Oil7Miw3fVthLWYwLTldezAsNH18W146XFwvPyNdKikoPzo6KFxcZCopKT8pKCgoXFwvKD86W14/I10oPyFbXj8jXFwvXSpcXC5bXj8jXFwvLl0rKD86Wz8jXXwkKSkpKlxcLz8pPyhbXj8jXFwvXSopKSg/OlxcPyhbXiNdKikpPyg/OiMoLiopKT8pLztcblxudmFyIHBhcnRzID0gW1xuICAgICdzb3VyY2UnLCAncHJvdG9jb2wnLCAnYXV0aG9yaXR5JywgJ3VzZXJJbmZvJywgJ3VzZXInLCAncGFzc3dvcmQnLCAnaG9zdCcsICdwb3J0JywgJ3JlbGF0aXZlJywgJ3BhdGgnLCAnZGlyZWN0b3J5JywgJ2ZpbGUnLCAncXVlcnknLCAnYW5jaG9yJ1xuXTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZXVyaShzdHIpIHtcbiAgICB2YXIgc3JjID0gc3RyLFxuICAgICAgICBiID0gc3RyLmluZGV4T2YoJ1snKSxcbiAgICAgICAgZSA9IHN0ci5pbmRleE9mKCddJyk7XG5cbiAgICBpZiAoYiAhPSAtMSAmJiBlICE9IC0xKSB7XG4gICAgICAgIHN0ciA9IHN0ci5zdWJzdHJpbmcoMCwgYikgKyBzdHIuc3Vic3RyaW5nKGIsIGUpLnJlcGxhY2UoLzovZywgJzsnKSArIHN0ci5zdWJzdHJpbmcoZSwgc3RyLmxlbmd0aCk7XG4gICAgfVxuXG4gICAgdmFyIG0gPSByZS5leGVjKHN0ciB8fCAnJyksXG4gICAgICAgIHVyaSA9IHt9LFxuICAgICAgICBpID0gMTQ7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIHVyaVtwYXJ0c1tpXV0gPSBtW2ldIHx8ICcnO1xuICAgIH1cblxuICAgIGlmIChiICE9IC0xICYmIGUgIT0gLTEpIHtcbiAgICAgICAgdXJpLnNvdXJjZSA9IHNyYztcbiAgICAgICAgdXJpLmhvc3QgPSB1cmkuaG9zdC5zdWJzdHJpbmcoMSwgdXJpLmhvc3QubGVuZ3RoIC0gMSkucmVwbGFjZSgvOy9nLCAnOicpO1xuICAgICAgICB1cmkuYXV0aG9yaXR5ID0gdXJpLmF1dGhvcml0eS5yZXBsYWNlKCdbJywgJycpLnJlcGxhY2UoJ10nLCAnJykucmVwbGFjZSgvOy9nLCAnOicpO1xuICAgICAgICB1cmkuaXB2NnVyaSA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVyaTtcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc29ja2V0LmlvLWNsaWVudC9+L2VuZ2luZS5pby1jbGllbnQvfi9wYXJzZXVyaS9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDQ0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIEpTT04gcGFyc2UuXG4gKlxuICogQHNlZSBCYXNlZCBvbiBqUXVlcnkjcGFyc2VKU09OIChNSVQpIGFuZCBKU09OMlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxudmFyIHJ2YWxpZGNoYXJzID0gL15bXFxdLDp7fVxcc10qJC87XG52YXIgcnZhbGlkZXNjYXBlID0gL1xcXFwoPzpbXCJcXFxcXFwvYmZucnRdfHVbMC05YS1mQS1GXXs0fSkvZztcbnZhciBydmFsaWR0b2tlbnMgPSAvXCJbXlwiXFxcXFxcblxccl0qXCJ8dHJ1ZXxmYWxzZXxudWxsfC0/XFxkKyg/OlxcLlxcZCopPyg/OltlRV1bK1xcLV0/XFxkKyk/L2c7XG52YXIgcnZhbGlkYnJhY2VzID0gLyg/Ol58OnwsKSg/OlxccypcXFspKy9nO1xudmFyIHJ0cmltTGVmdCA9IC9eXFxzKy87XG52YXIgcnRyaW1SaWdodCA9IC9cXHMrJC87XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2Vqc29uKGRhdGEpIHtcbiAgaWYgKCdzdHJpbmcnICE9IHR5cGVvZiBkYXRhIHx8ICFkYXRhKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBkYXRhID0gZGF0YS5yZXBsYWNlKHJ0cmltTGVmdCwgJycpLnJlcGxhY2UocnRyaW1SaWdodCwgJycpO1xuXG4gIC8vIEF0dGVtcHQgdG8gcGFyc2UgdXNpbmcgdGhlIG5hdGl2ZSBKU09OIHBhcnNlciBmaXJzdFxuICBpZiAoZ2xvYmFsLkpTT04gJiYgSlNPTi5wYXJzZSkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEpO1xuICB9XG5cbiAgaWYgKHJ2YWxpZGNoYXJzLnRlc3QoZGF0YS5yZXBsYWNlKHJ2YWxpZGVzY2FwZSwgJ0AnKVxuICAgICAgLnJlcGxhY2UocnZhbGlkdG9rZW5zLCAnXScpXG4gICAgICAucmVwbGFjZShydmFsaWRicmFjZXMsICcnKSkpIHtcbiAgICByZXR1cm4gKG5ldyBGdW5jdGlvbigncmV0dXJuICcgKyBkYXRhKSkoKTtcbiAgfVxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc29ja2V0LmlvLWNsaWVudC9+L2VuZ2luZS5pby1jbGllbnQvfi9wYXJzZWpzb24vaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA0NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIHBhcnNlciA9IHJlcXVpcmUoJ3NvY2tldC5pby1wYXJzZXInKTtcbnZhciBFbWl0dGVyID0gcmVxdWlyZSgnY29tcG9uZW50LWVtaXR0ZXInKTtcbnZhciB0b0FycmF5ID0gcmVxdWlyZSgndG8tYXJyYXknKTtcbnZhciBvbiA9IHJlcXVpcmUoJy4vb24nKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnY29tcG9uZW50LWJpbmQnKTtcbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tldC5pby1jbGllbnQ6c29ja2V0Jyk7XG52YXIgaGFzQmluID0gcmVxdWlyZSgnaGFzLWJpbmFyeScpO1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IFNvY2tldDtcblxuLyoqXG4gKiBJbnRlcm5hbCBldmVudHMgKGJsYWNrbGlzdGVkKS5cbiAqIFRoZXNlIGV2ZW50cyBjYW4ndCBiZSBlbWl0dGVkIGJ5IHRoZSB1c2VyLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbnZhciBldmVudHMgPSB7XG4gIGNvbm5lY3Q6IDEsXG4gIGNvbm5lY3RfZXJyb3I6IDEsXG4gIGNvbm5lY3RfdGltZW91dDogMSxcbiAgZGlzY29ubmVjdDogMSxcbiAgZXJyb3I6IDEsXG4gIHJlY29ubmVjdDogMSxcbiAgcmVjb25uZWN0X2F0dGVtcHQ6IDEsXG4gIHJlY29ubmVjdF9mYWlsZWQ6IDEsXG4gIHJlY29ubmVjdF9lcnJvcjogMSxcbiAgcmVjb25uZWN0aW5nOiAxXG59O1xuXG4vKipcbiAqIFNob3J0Y3V0IHRvIGBFbWl0dGVyI2VtaXRgLlxuICovXG5cbnZhciBlbWl0ID0gRW1pdHRlci5wcm90b3R5cGUuZW1pdDtcblxuLyoqXG4gKiBgU29ja2V0YCBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIFNvY2tldChpbywgbnNwKXtcbiAgdGhpcy5pbyA9IGlvO1xuICB0aGlzLm5zcCA9IG5zcDtcbiAgdGhpcy5qc29uID0gdGhpczsgLy8gY29tcGF0XG4gIHRoaXMuaWRzID0gMDtcbiAgdGhpcy5hY2tzID0ge307XG4gIGlmICh0aGlzLmlvLmF1dG9Db25uZWN0KSB0aGlzLm9wZW4oKTtcbiAgdGhpcy5yZWNlaXZlQnVmZmVyID0gW107XG4gIHRoaXMuc2VuZEJ1ZmZlciA9IFtdO1xuICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICB0aGlzLmRpc2Nvbm5lY3RlZCA9IHRydWU7XG59XG5cbi8qKlxuICogTWl4IGluIGBFbWl0dGVyYC5cbiAqL1xuXG5FbWl0dGVyKFNvY2tldC5wcm90b3R5cGUpO1xuXG4vKipcbiAqIFN1YnNjcmliZSB0byBvcGVuLCBjbG9zZSBhbmQgcGFja2V0IGV2ZW50c1xuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUuc3ViRXZlbnRzID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLnN1YnMpIHJldHVybjtcblxuICB2YXIgaW8gPSB0aGlzLmlvO1xuICB0aGlzLnN1YnMgPSBbXG4gICAgb24oaW8sICdvcGVuJywgYmluZCh0aGlzLCAnb25vcGVuJykpLFxuICAgIG9uKGlvLCAncGFja2V0JywgYmluZCh0aGlzLCAnb25wYWNrZXQnKSksXG4gICAgb24oaW8sICdjbG9zZScsIGJpbmQodGhpcywgJ29uY2xvc2UnKSlcbiAgXTtcbn07XG5cbi8qKlxuICogXCJPcGVuc1wiIHRoZSBzb2NrZXQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9wZW4gPVxuU29ja2V0LnByb3RvdHlwZS5jb25uZWN0ID0gZnVuY3Rpb24oKXtcbiAgaWYgKHRoaXMuY29ubmVjdGVkKSByZXR1cm4gdGhpcztcblxuICB0aGlzLnN1YkV2ZW50cygpO1xuICB0aGlzLmlvLm9wZW4oKTsgLy8gZW5zdXJlIG9wZW5cbiAgaWYgKCdvcGVuJyA9PSB0aGlzLmlvLnJlYWR5U3RhdGUpIHRoaXMub25vcGVuKCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZW5kcyBhIGBtZXNzYWdlYCBldmVudC5cbiAqXG4gKiBAcmV0dXJuIHtTb2NrZXR9IHNlbGZcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24oKXtcbiAgdmFyIGFyZ3MgPSB0b0FycmF5KGFyZ3VtZW50cyk7XG4gIGFyZ3MudW5zaGlmdCgnbWVzc2FnZScpO1xuICB0aGlzLmVtaXQuYXBwbHkodGhpcywgYXJncyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBPdmVycmlkZSBgZW1pdGAuXG4gKiBJZiB0aGUgZXZlbnQgaXMgaW4gYGV2ZW50c2AsIGl0J3MgZW1pdHRlZCBub3JtYWxseS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgbmFtZVxuICogQHJldHVybiB7U29ja2V0fSBzZWxmXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblNvY2tldC5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKGV2KXtcbiAgaWYgKGV2ZW50cy5oYXNPd25Qcm9wZXJ0eShldikpIHtcbiAgICBlbWl0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB2YXIgYXJncyA9IHRvQXJyYXkoYXJndW1lbnRzKTtcbiAgdmFyIHBhcnNlclR5cGUgPSBwYXJzZXIuRVZFTlQ7IC8vIGRlZmF1bHRcbiAgaWYgKGhhc0JpbihhcmdzKSkgeyBwYXJzZXJUeXBlID0gcGFyc2VyLkJJTkFSWV9FVkVOVDsgfSAvLyBiaW5hcnlcbiAgdmFyIHBhY2tldCA9IHsgdHlwZTogcGFyc2VyVHlwZSwgZGF0YTogYXJncyB9O1xuXG4gIC8vIGV2ZW50IGFjayBjYWxsYmFja1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgYXJnc1thcmdzLmxlbmd0aCAtIDFdKSB7XG4gICAgZGVidWcoJ2VtaXR0aW5nIHBhY2tldCB3aXRoIGFjayBpZCAlZCcsIHRoaXMuaWRzKTtcbiAgICB0aGlzLmFja3NbdGhpcy5pZHNdID0gYXJncy5wb3AoKTtcbiAgICBwYWNrZXQuaWQgPSB0aGlzLmlkcysrO1xuICB9XG5cbiAgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgdGhpcy5wYWNrZXQocGFja2V0KTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnNlbmRCdWZmZXIucHVzaChwYWNrZXQpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNlbmRzIGEgcGFja2V0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUucGFja2V0ID0gZnVuY3Rpb24ocGFja2V0KXtcbiAgcGFja2V0Lm5zcCA9IHRoaXMubnNwO1xuICB0aGlzLmlvLnBhY2tldChwYWNrZXQpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBlbmdpbmUgYG9wZW5gLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25vcGVuID0gZnVuY3Rpb24oKXtcbiAgZGVidWcoJ3RyYW5zcG9ydCBpcyBvcGVuIC0gY29ubmVjdGluZycpO1xuXG4gIC8vIHdyaXRlIGNvbm5lY3QgcGFja2V0IGlmIG5lY2Vzc2FyeVxuICBpZiAoJy8nICE9IHRoaXMubnNwKSB7XG4gICAgdGhpcy5wYWNrZXQoeyB0eXBlOiBwYXJzZXIuQ09OTkVDVCB9KTtcbiAgfVxufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBlbmdpbmUgYGNsb3NlYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcmVhc29uXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uY2xvc2UgPSBmdW5jdGlvbihyZWFzb24pe1xuICBkZWJ1ZygnY2xvc2UgKCVzKScsIHJlYXNvbik7XG4gIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gIHRoaXMuZGlzY29ubmVjdGVkID0gdHJ1ZTtcbiAgZGVsZXRlIHRoaXMuaWQ7XG4gIHRoaXMuZW1pdCgnZGlzY29ubmVjdCcsIHJlYXNvbik7XG59O1xuXG4vKipcbiAqIENhbGxlZCB3aXRoIHNvY2tldCBwYWNrZXQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vbnBhY2tldCA9IGZ1bmN0aW9uKHBhY2tldCl7XG4gIGlmIChwYWNrZXQubnNwICE9IHRoaXMubnNwKSByZXR1cm47XG5cbiAgc3dpdGNoIChwYWNrZXQudHlwZSkge1xuICAgIGNhc2UgcGFyc2VyLkNPTk5FQ1Q6XG4gICAgICB0aGlzLm9uY29ubmVjdCgpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIHBhcnNlci5FVkVOVDpcbiAgICAgIHRoaXMub25ldmVudChwYWNrZXQpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIHBhcnNlci5CSU5BUllfRVZFTlQ6XG4gICAgICB0aGlzLm9uZXZlbnQocGFja2V0KTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBwYXJzZXIuQUNLOlxuICAgICAgdGhpcy5vbmFjayhwYWNrZXQpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIHBhcnNlci5CSU5BUllfQUNLOlxuICAgICAgdGhpcy5vbmFjayhwYWNrZXQpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIHBhcnNlci5ESVNDT05ORUNUOlxuICAgICAgdGhpcy5vbmRpc2Nvbm5lY3QoKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBwYXJzZXIuRVJST1I6XG4gICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgcGFja2V0LmRhdGEpO1xuICAgICAgYnJlYWs7XG4gIH1cbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gYSBzZXJ2ZXIgZXZlbnQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vbmV2ZW50ID0gZnVuY3Rpb24ocGFja2V0KXtcbiAgdmFyIGFyZ3MgPSBwYWNrZXQuZGF0YSB8fCBbXTtcbiAgZGVidWcoJ2VtaXR0aW5nIGV2ZW50ICVqJywgYXJncyk7XG5cbiAgaWYgKG51bGwgIT0gcGFja2V0LmlkKSB7XG4gICAgZGVidWcoJ2F0dGFjaGluZyBhY2sgY2FsbGJhY2sgdG8gZXZlbnQnKTtcbiAgICBhcmdzLnB1c2godGhpcy5hY2socGFja2V0LmlkKSk7XG4gIH1cblxuICBpZiAodGhpcy5jb25uZWN0ZWQpIHtcbiAgICBlbWl0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMucmVjZWl2ZUJ1ZmZlci5wdXNoKGFyZ3MpO1xuICB9XG59O1xuXG4vKipcbiAqIFByb2R1Y2VzIGFuIGFjayBjYWxsYmFjayB0byBlbWl0IHdpdGggYW4gZXZlbnQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5hY2sgPSBmdW5jdGlvbihpZCl7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHNlbnQgPSBmYWxzZTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgLy8gcHJldmVudCBkb3VibGUgY2FsbGJhY2tzXG4gICAgaWYgKHNlbnQpIHJldHVybjtcbiAgICBzZW50ID0gdHJ1ZTtcbiAgICB2YXIgYXJncyA9IHRvQXJyYXkoYXJndW1lbnRzKTtcbiAgICBkZWJ1Zygnc2VuZGluZyBhY2sgJWonLCBhcmdzKTtcblxuICAgIHZhciB0eXBlID0gaGFzQmluKGFyZ3MpID8gcGFyc2VyLkJJTkFSWV9BQ0sgOiBwYXJzZXIuQUNLO1xuICAgIHNlbGYucGFja2V0KHtcbiAgICAgIHR5cGU6IHR5cGUsXG4gICAgICBpZDogaWQsXG4gICAgICBkYXRhOiBhcmdzXG4gICAgfSk7XG4gIH07XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIGEgc2VydmVyIGFja25vd2xlZ2VtZW50LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25hY2sgPSBmdW5jdGlvbihwYWNrZXQpe1xuICBkZWJ1ZygnY2FsbGluZyBhY2sgJXMgd2l0aCAlaicsIHBhY2tldC5pZCwgcGFja2V0LmRhdGEpO1xuICB2YXIgZm4gPSB0aGlzLmFja3NbcGFja2V0LmlkXTtcbiAgZm4uYXBwbHkodGhpcywgcGFja2V0LmRhdGEpO1xuICBkZWxldGUgdGhpcy5hY2tzW3BhY2tldC5pZF07XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIHNlcnZlciBjb25uZWN0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25jb25uZWN0ID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5jb25uZWN0ZWQgPSB0cnVlO1xuICB0aGlzLmRpc2Nvbm5lY3RlZCA9IGZhbHNlO1xuICB0aGlzLmVtaXQoJ2Nvbm5lY3QnKTtcbiAgdGhpcy5lbWl0QnVmZmVyZWQoKTtcbn07XG5cbi8qKlxuICogRW1pdCBidWZmZXJlZCBldmVudHMgKHJlY2VpdmVkIGFuZCBlbWl0dGVkKS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLmVtaXRCdWZmZXJlZCA9IGZ1bmN0aW9uKCl7XG4gIHZhciBpO1xuICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5yZWNlaXZlQnVmZmVyLmxlbmd0aDsgaSsrKSB7XG4gICAgZW1pdC5hcHBseSh0aGlzLCB0aGlzLnJlY2VpdmVCdWZmZXJbaV0pO1xuICB9XG4gIHRoaXMucmVjZWl2ZUJ1ZmZlciA9IFtdO1xuXG4gIGZvciAoaSA9IDA7IGkgPCB0aGlzLnNlbmRCdWZmZXIubGVuZ3RoOyBpKyspIHtcbiAgICB0aGlzLnBhY2tldCh0aGlzLnNlbmRCdWZmZXJbaV0pO1xuICB9XG4gIHRoaXMuc2VuZEJ1ZmZlciA9IFtdO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBzZXJ2ZXIgZGlzY29ubmVjdC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uZGlzY29ubmVjdCA9IGZ1bmN0aW9uKCl7XG4gIGRlYnVnKCdzZXJ2ZXIgZGlzY29ubmVjdCAoJXMpJywgdGhpcy5uc3ApO1xuICB0aGlzLmRlc3Ryb3koKTtcbiAgdGhpcy5vbmNsb3NlKCdpbyBzZXJ2ZXIgZGlzY29ubmVjdCcpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBmb3JjZWQgY2xpZW50L3NlcnZlciBzaWRlIGRpc2Nvbm5lY3Rpb25zLFxuICogdGhpcyBtZXRob2QgZW5zdXJlcyB0aGUgbWFuYWdlciBzdG9wcyB0cmFja2luZyB1cyBhbmRcbiAqIHRoYXQgcmVjb25uZWN0aW9ucyBkb24ndCBnZXQgdHJpZ2dlcmVkIGZvciB0aGlzLlxuICpcbiAqIEBhcGkgcHJpdmF0ZS5cbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpe1xuICBpZiAodGhpcy5zdWJzKSB7XG4gICAgLy8gY2xlYW4gc3Vic2NyaXB0aW9ucyB0byBhdm9pZCByZWNvbm5lY3Rpb25zXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnN1YnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuc3Vic1tpXS5kZXN0cm95KCk7XG4gICAgfVxuICAgIHRoaXMuc3VicyA9IG51bGw7XG4gIH1cblxuICB0aGlzLmlvLmRlc3Ryb3kodGhpcyk7XG59O1xuXG4vKipcbiAqIERpc2Nvbm5lY3RzIHRoZSBzb2NrZXQgbWFudWFsbHkuXG4gKlxuICogQHJldHVybiB7U29ja2V0fSBzZWxmXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblNvY2tldC5wcm90b3R5cGUuY2xvc2UgPVxuU29ja2V0LnByb3RvdHlwZS5kaXNjb25uZWN0ID0gZnVuY3Rpb24oKXtcbiAgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgZGVidWcoJ3BlcmZvcm1pbmcgZGlzY29ubmVjdCAoJXMpJywgdGhpcy5uc3ApO1xuICAgIHRoaXMucGFja2V0KHsgdHlwZTogcGFyc2VyLkRJU0NPTk5FQ1QgfSk7XG4gIH1cblxuICAvLyByZW1vdmUgc29ja2V0IGZyb20gcG9vbFxuICB0aGlzLmRlc3Ryb3koKTtcblxuICBpZiAodGhpcy5jb25uZWN0ZWQpIHtcbiAgICAvLyBmaXJlIGV2ZW50c1xuICAgIHRoaXMub25jbG9zZSgnaW8gY2xpZW50IGRpc2Nvbm5lY3QnKTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc29ja2V0LmlvLWNsaWVudC9saWIvc29ja2V0LmpzXG4gKiogbW9kdWxlIGlkID0gNDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gdG9BcnJheVxuXG5mdW5jdGlvbiB0b0FycmF5KGxpc3QsIGluZGV4KSB7XG4gICAgdmFyIGFycmF5ID0gW11cblxuICAgIGluZGV4ID0gaW5kZXggfHwgMFxuXG4gICAgZm9yICh2YXIgaSA9IGluZGV4IHx8IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGFycmF5W2kgLSBpbmRleF0gPSBsaXN0W2ldXG4gICAgfVxuXG4gICAgcmV0dXJuIGFycmF5XG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc29ja2V0LmlvLWNsaWVudC9+L3RvLWFycmF5L2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gNDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IG9uO1xuXG4vKipcbiAqIEhlbHBlciBmb3Igc3Vic2NyaXB0aW9ucy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxFdmVudEVtaXR0ZXJ9IG9iaiB3aXRoIGBFbWl0dGVyYCBtaXhpbiBvciBgRXZlbnRFbWl0dGVyYFxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IG5hbWVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIG9uKG9iaiwgZXYsIGZuKSB7XG4gIG9iai5vbihldiwgZm4pO1xuICByZXR1cm4ge1xuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCl7XG4gICAgICBvYmoucmVtb3ZlTGlzdGVuZXIoZXYsIGZuKTtcbiAgICB9XG4gIH07XG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc29ja2V0LmlvLWNsaWVudC9saWIvb24uanNcbiAqKiBtb2R1bGUgaWQgPSA0OFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBTbGljZSByZWZlcmVuY2UuXG4gKi9cblxudmFyIHNsaWNlID0gW10uc2xpY2U7XG5cbi8qKlxuICogQmluZCBgb2JqYCB0byBgZm5gLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7RnVuY3Rpb258U3RyaW5nfSBmbiBvciBzdHJpbmdcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaiwgZm4pe1xuICBpZiAoJ3N0cmluZycgPT0gdHlwZW9mIGZuKSBmbiA9IG9ialtmbl07XG4gIGlmICgnZnVuY3Rpb24nICE9IHR5cGVvZiBmbikgdGhyb3cgbmV3IEVycm9yKCdiaW5kKCkgcmVxdWlyZXMgYSBmdW5jdGlvbicpO1xuICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIGZuLmFwcGx5KG9iaiwgYXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gIH1cbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc29ja2V0LmlvLWNsaWVudC9+L2NvbXBvbmVudC1iaW5kL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gNDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlxuLypcbiAqIE1vZHVsZSByZXF1aXJlbWVudHMuXG4gKi9cblxudmFyIGlzQXJyYXkgPSByZXF1aXJlKCdpc2FycmF5Jyk7XG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBoYXNCaW5hcnk7XG5cbi8qKlxuICogQ2hlY2tzIGZvciBiaW5hcnkgZGF0YS5cbiAqXG4gKiBSaWdodCBub3cgb25seSBCdWZmZXIgYW5kIEFycmF5QnVmZmVyIGFyZSBzdXBwb3J0ZWQuLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhbnl0aGluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBoYXNCaW5hcnkoZGF0YSkge1xuXG4gIGZ1bmN0aW9uIF9oYXNCaW5hcnkob2JqKSB7XG4gICAgaWYgKCFvYmopIHJldHVybiBmYWxzZTtcblxuICAgIGlmICggKGdsb2JhbC5CdWZmZXIgJiYgZ2xvYmFsLkJ1ZmZlci5pc0J1ZmZlcihvYmopKSB8fFxuICAgICAgICAgKGdsb2JhbC5BcnJheUJ1ZmZlciAmJiBvYmogaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikgfHxcbiAgICAgICAgIChnbG9iYWwuQmxvYiAmJiBvYmogaW5zdGFuY2VvZiBCbG9iKSB8fFxuICAgICAgICAgKGdsb2JhbC5GaWxlICYmIG9iaiBpbnN0YW5jZW9mIEZpbGUpXG4gICAgICAgICkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoX2hhc0JpbmFyeShvYmpbaV0pKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9iaiAmJiAnb2JqZWN0JyA9PSB0eXBlb2Ygb2JqKSB7XG4gICAgICBpZiAob2JqLnRvSlNPTikge1xuICAgICAgICBvYmogPSBvYmoudG9KU09OKCk7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkgJiYgX2hhc0JpbmFyeShvYmpba2V5XSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBfaGFzQmluYXJ5KGRhdGEpO1xufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjayktZGV2LXNlcnZlci9+L3NvY2tldC5pby1jbGllbnQvfi9oYXMtYmluYXJ5L2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gNTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoYXJyKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJyKSA9PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spLWRldi1zZXJ2ZXIvfi9zb2NrZXQuaW8tY2xpZW50L34vaGFzLWJpbmFyeS9+L2lzYXJyYXkvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA1MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXG4vKipcbiAqIEhPUCByZWYuXG4gKi9cblxudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogUmV0dXJuIG93biBrZXlzIGluIGBvYmpgLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge0FycmF5fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLmtleXMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbihvYmope1xuICB2YXIga2V5cyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKGhhcy5jYWxsKG9iaiwga2V5KSkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBrZXlzO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gb3duIHZhbHVlcyBpbiBgb2JqYC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy52YWx1ZXMgPSBmdW5jdGlvbihvYmope1xuICB2YXIgdmFscyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKGhhcy5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgdmFscy5wdXNoKG9ialtrZXldKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHZhbHM7XG59O1xuXG4vKipcbiAqIE1lcmdlIGBiYCBpbnRvIGBhYC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYVxuICogQHBhcmFtIHtPYmplY3R9IGJcbiAqIEByZXR1cm4ge09iamVjdH0gYVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLm1lcmdlID0gZnVuY3Rpb24oYSwgYil7XG4gIGZvciAodmFyIGtleSBpbiBiKSB7XG4gICAgaWYgKGhhcy5jYWxsKGIsIGtleSkpIHtcbiAgICAgIGFba2V5XSA9IGJba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGE7XG59O1xuXG4vKipcbiAqIFJldHVybiBsZW5ndGggb2YgYG9iamAuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLmxlbmd0aCA9IGZ1bmN0aW9uKG9iail7XG4gIHJldHVybiBleHBvcnRzLmtleXMob2JqKS5sZW5ndGg7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIGBvYmpgIGlzIGVtcHR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuaXNFbXB0eSA9IGZ1bmN0aW9uKG9iail7XG4gIHJldHVybiAwID09IGV4cG9ydHMubGVuZ3RoKG9iaik7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spLWRldi1zZXJ2ZXIvfi9zb2NrZXQuaW8tY2xpZW50L34vb2JqZWN0LWNvbXBvbmVudC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDUyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcbi8qKlxuICogRXhwb3NlIGBCYWNrb2ZmYC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJhY2tvZmY7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBiYWNrb2ZmIHRpbWVyIHdpdGggYG9wdHNgLlxuICpcbiAqIC0gYG1pbmAgaW5pdGlhbCB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyBbMTAwXVxuICogLSBgbWF4YCBtYXggdGltZW91dCBbMTAwMDBdXG4gKiAtIGBqaXR0ZXJgIFswXVxuICogLSBgZmFjdG9yYCBbMl1cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBCYWNrb2ZmKG9wdHMpIHtcbiAgb3B0cyA9IG9wdHMgfHwge307XG4gIHRoaXMubXMgPSBvcHRzLm1pbiB8fCAxMDA7XG4gIHRoaXMubWF4ID0gb3B0cy5tYXggfHwgMTAwMDA7XG4gIHRoaXMuZmFjdG9yID0gb3B0cy5mYWN0b3IgfHwgMjtcbiAgdGhpcy5qaXR0ZXIgPSBvcHRzLmppdHRlciA+IDAgJiYgb3B0cy5qaXR0ZXIgPD0gMSA/IG9wdHMuaml0dGVyIDogMDtcbiAgdGhpcy5hdHRlbXB0cyA9IDA7XG59XG5cbi8qKlxuICogUmV0dXJuIHRoZSBiYWNrb2ZmIGR1cmF0aW9uLlxuICpcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQmFja29mZi5wcm90b3R5cGUuZHVyYXRpb24gPSBmdW5jdGlvbigpe1xuICB2YXIgbXMgPSB0aGlzLm1zICogTWF0aC5wb3codGhpcy5mYWN0b3IsIHRoaXMuYXR0ZW1wdHMrKyk7XG4gIGlmICh0aGlzLmppdHRlcikge1xuICAgIHZhciByYW5kID0gIE1hdGgucmFuZG9tKCk7XG4gICAgdmFyIGRldmlhdGlvbiA9IE1hdGguZmxvb3IocmFuZCAqIHRoaXMuaml0dGVyICogbXMpO1xuICAgIG1zID0gKE1hdGguZmxvb3IocmFuZCAqIDEwKSAmIDEpID09IDAgID8gbXMgLSBkZXZpYXRpb24gOiBtcyArIGRldmlhdGlvbjtcbiAgfVxuICByZXR1cm4gTWF0aC5taW4obXMsIHRoaXMubWF4KSB8IDA7XG59O1xuXG4vKipcbiAqIFJlc2V0IHRoZSBudW1iZXIgb2YgYXR0ZW1wdHMuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5CYWNrb2ZmLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMuYXR0ZW1wdHMgPSAwO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIG1pbmltdW0gZHVyYXRpb25cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkJhY2tvZmYucHJvdG90eXBlLnNldE1pbiA9IGZ1bmN0aW9uKG1pbil7XG4gIHRoaXMubXMgPSBtaW47XG59O1xuXG4vKipcbiAqIFNldCB0aGUgbWF4aW11bSBkdXJhdGlvblxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQmFja29mZi5wcm90b3R5cGUuc2V0TWF4ID0gZnVuY3Rpb24obWF4KXtcbiAgdGhpcy5tYXggPSBtYXg7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgaml0dGVyXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5CYWNrb2ZmLnByb3RvdHlwZS5zZXRKaXR0ZXIgPSBmdW5jdGlvbihqaXR0ZXIpe1xuICB0aGlzLmppdHRlciA9IGppdHRlcjtcbn07XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spLWRldi1zZXJ2ZXIvfi9zb2NrZXQuaW8tY2xpZW50L34vYmFja28yL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gNTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBhbnNpUmVnZXggPSByZXF1aXJlKCdhbnNpLXJlZ2V4JykoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc3RyKSB7XG5cdHJldHVybiB0eXBlb2Ygc3RyID09PSAnc3RyaW5nJyA/IHN0ci5yZXBsYWNlKGFuc2lSZWdleCwgJycpIDogc3RyO1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spLWRldi1zZXJ2ZXIvfi9zdHJpcC1hbnNpL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gNTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gLyg/Oig/OlxcdTAwMWJcXFspfFxcdTAwOWIpKD86KD86WzAtOV17MSwzfSk/KD86KD86O1swLTldezAsM30pKik/W0EtTXxmLW1dKXxcXHUwMDFiW0EtTV0vZztcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS1kZXYtc2VydmVyL34vc3RyaXAtYW5zaS9+L2Fuc2ktcmVnZXgvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA1NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IGxvYWRDU1MgZnJvbSAnLi9sb2FkY3NzJztcclxuXHJcbmNvbnN0IGdsb2JhbCA9IHdpbmRvdztcclxuY29uc3QgZGVmaW5lID0gZ2xvYmFsLmRlZmluZSB8fCBkZWZpbmU7XHJcblxyXG5sZXQgZGVwZW5kZW5jaWVzID0gW1xyXG4gICdtb2R1bGUnLFxyXG4gICdxbGlrJyxcclxuICAnY2xpZW50LnV0aWxzL3JvdXRpbmcnLFxyXG4gICdjbGllbnQudXRpbHMvc3RhdGUnLFxyXG4gICdvYmplY3RzLnV0aWxzL251bWJlci1mb3JtYXR0ZXInLFxyXG4gICdnZW5lcmFsLnNlcnZpY2VzL3Nob3ctc2VydmljZS9zaG93LXNlcnZpY2UnXHJcbl07IC8vICdjc3MhLi9zdHlsZXMuY3NzJ1xyXG5cclxuaWYoIWdsb2JhbC5SZWFjdClcclxuICBkZXBlbmRlbmNpZXMucHVzaCgnLi92ZW5kb3JzL3JlYWN0Lm1pbicpO1xyXG5cclxuZGVmaW5lKGRlcGVuZGVuY2llcyxcclxuICBmdW5jdGlvbiAobW9kdWxlLCBxbGlrLCBSb3V0aW5nLCBTdGF0ZSwgTnVtYmVyRm9ybWF0dGVyLCBTaG93U2VydmljZSwgUmVhY3QpIHtcclxuICAgIGNvbnN0IFJPT1RfVVJJID0gbW9kdWxlLnVyaS5zcGxpdCgnLycpLnNsaWNlKDAsIC0xKS5qb2luKCcvJyk7XHJcbiAgICBsb2FkQ1NTKGAke1JPT1RfVVJJfS9zdHlsZXMuY3NzYCk7XHJcblxyXG4gICAgaWYoUmVhY3QgJiYgIWdsb2JhbC5SZWFjdClcclxuICAgICAgZ2xvYmFsLlJlYWN0ID0gUmVhY3Q7XHJcblxyXG4gICAgbGV0IGluaXRpYWxQcm9wZXJ0aWVzID0gcmVxdWlyZSgnLi9pbml0aWFsUHJvcGVydGllcycpO1xyXG4gICAgbGV0IGRlZmluaXRpb24gPSByZXF1aXJlKCcuL2RlZmluaXRpb24nKSh7IFNob3dTZXJ2aWNlIH0pO1xyXG4gICAgbGV0IHBhaW50ID0gcmVxdWlyZSgnLi9wYWludCcpKHtxbGlrLCBSb3V0aW5nLCBTdGF0ZSwgTnVtYmVyRm9ybWF0dGVyfSk7IC8vIE51bWJlckZvcm1hdHRlcjogZ2xvYmFsLk51bWJlckZvcm1hdHRlclxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaW5pdGlhbFByb3BlcnRpZXMsXHJcbiAgICAgIGRlZmluaXRpb24sXHJcbiAgICAgIHBhaW50LFxyXG4gICAgICBzbmFwc2hvdDoge1xyXG4gICAgICAgIGNhblRha2VTbmFwc2hvdCA6IHRydWVcclxuICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQzovVXNlcnMvbmVydXNoL0RvY3VtZW50cy9RbGlrL1NlbnNlL0V4dGVuc2lvbnMvcXNTaW1wbGVLUEkvc3JjL2NvbXBvbmVudC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvYWRDU1ModXJsKSB7XHJcbiAgICB2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xyXG4gICAgbGluay50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xyXG4gICAgbGluay5yZWwgPSBcInN0eWxlc2hlZXRcIjtcclxuICAgIGxpbmsuaHJlZiA9IHVybDtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChsaW5rKTtcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBDOi9Vc2Vycy9uZXJ1c2gvRG9jdW1lbnRzL1FsaWsvU2Vuc2UvRXh0ZW5zaW9ucy9xc1NpbXBsZUtQSS9zcmMvbG9hZGNzcy5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IHtcclxuICB2ZXJzaW9uIDogMS4wLFxyXG4gIHFIeXBlckN1YmVEZWY6IHtcclxuICAgIHFEaW1lbnNpb25zOiBbXSxcclxuICAgIHFNZWFzdXJlczogW10sXHJcbiAgICBxSW5pdGlhbERhdGFGZXRjaDogW3tcclxuICAgICAgcVdpZHRoOiAyNSxcclxuICAgICAgcUhlaWdodDogMjU1XHJcbiAgICB9XVxyXG4gIH0sXHJcbiAgb3B0aW9uczoge31cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBDOi9Vc2Vycy9uZXJ1c2gvRG9jdW1lbnRzL1FsaWsvU2Vuc2UvRXh0ZW5zaW9ucy9xc1NpbXBsZUtQSS9zcmMvaW5pdGlhbFByb3BlcnRpZXMuanNcbiAqKi8iLCJpbXBvcnQge1xyXG4gIENvbG9yc1BpY2tlckNvbXBvbmVudCxcclxuICBGb250U3R5bGVzQ29tcG9uZW50LFxyXG4gIFRleHRFZGl0b3JDb21wb25lbnQsXHJcbiAgU2VsZWN0SWNvbkRpYWxvZ0NvbXBvbmVudFxyXG59IGZyb20gJy4vZGVmaW5pdGlvbkNvbXBvbmVudHMnO1xyXG5cclxuaW1wb3J0IHsgRlVMTF9JQ09OU19TRVQgfSBmcm9tICcuL2ljb25zRGVmaW5pdGlvbnMnO1xyXG5pbXBvcnQge0NPTE9SX09QVElPTlMsIFNJWkVfT1BUSU9OUywgRElNX0xBQkVMX09QVElPTlMsIERJTV9WSUVXX09QVElPTlN9IGZyb20gJy4vb3B0aW9ucyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAob3B0aW9ucykge1xyXG5cclxuLy8gbGV0IERpYWxvZyA9IG9wdGlvbnMuRGlhbG9nO1xyXG5sZXQgU2hvd1NlcnZpY2UgPSBvcHRpb25zLlNob3dTZXJ2aWNlO1xyXG5cclxuLy8gRGltZW5zaW9ucyBhcnJheVxyXG5sZXQgZGltcyA9IHtcclxuICB0eXBlOiAnaXRlbXMnLFxyXG4gIHVzZXM6ICdkaW1lbnNpb25zJyxcclxuICByZWY6ICdxSHlwZXJDdWJlRGVmLnFEaW1lbnNpb25zJyxcclxuICBtaW46IDAsXHJcbiAgbWF4OiAxLFxyXG4gIGFsbG93QWRkOiB0cnVlLFxyXG4gIGFsbG93UmVtb3ZlOiB0cnVlXHJcbn07XHJcblxyXG4vLyBLcGkgYXJyYXlcclxubGV0IGtwaXMgPSB7XHJcbiAgICB0eXBlOiBcIml0ZW1zXCIsXHJcbiAgICB1c2VzIDogXCJtZWFzdXJlc1wiLFxyXG4gICAgcmVmOiBcInFIeXBlckN1YmVEZWYucU1lYXN1cmVzXCIsXHJcbiAgICBkaXNhYmxlZFJlZiA6IFwicUh5cGVyQ3ViZURlZi5xTGF5b3V0RXhjbHVkZS5xSHlwZXJDdWJlRGVmLnFNZWFzdXJlc1wiLFxyXG4gICAgbWluOiAxLFxyXG4gICAgbWF4OiAyNTYsXHJcbiAgICBhbGxvd0FkZDogdHJ1ZSxcclxuICAgIGFsbG93UmVtb3ZlOiB0cnVlLFxyXG4gICAgYWxsb3dNb3ZlOiB0cnVlLFxyXG4gICAgaXRlbXMgOiB7XHJcbiAgICAgIGF1dG9Gb3JtYXRUZW1wbGF0ZToge1xyXG4gICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXHJcbiAgICAgICAgbGFiZWw6IFwiQXV0byBmb3JtYXRcIixcclxuICAgICAgICB0cmFuc2xhdGlvbjogXCJwcm9wZXJ0aWVzLm51bWJlckZvcm1hdHRpbmcuZm9ybWF0UGF0dGVyblwiLFxyXG4gICAgICAgIHJlZjogXCJxRGVmLmF1dG9Gb3JtYXRUZW1wbGF0ZVwiLFxyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogXCIwQVwiLFxyXG4gICAgICAgIHNob3c6IGZ1bmN0aW9uKGEpIHtcclxuICAgICAgICAgIHJldHVybiBhLnFEZWYucU51bUZvcm1hdC5xVHlwZSA9PT0gXCJVXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBsYWJlbENvbG9yOiB7XHJcbiAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcclxuICAgICAgICByZWY6IFwicURlZi5sYWJlbENvbG9yXCIsXHJcbiAgICAgICAgbGFiZWw6IFwiTGFiZWwgY29sb3JcIixcclxuICAgICAgICBleHByZXNzaW9uOiBcImFsd2F5c1wiLFxyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogXCIjNTQ1MzUyXCJcclxuICAgICAgfSxcclxuICAgICAgcGlja0xhYmVsQ29sb3I6IHtcclxuICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxyXG4gICAgICAgIGNvbXBvbmVudDogQ29sb3JzUGlja2VyQ29tcG9uZW50LFxyXG4gICAgICAgIHJlZjogXCJxRGVmLmxhYmVsQ29sb3JcIixcclxuICAgICAgICBkZWZhdWx0VmFsdWU6IFwiIzU0NTM1MlwiLFxyXG4gICAgICAgIG9wdGlvbnM6IENPTE9SX09QVElPTlNcclxuICAgICAgfSxcclxuICAgICAgaXRlbUNvbG9yOiB7XHJcbiAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcclxuICAgICAgICByZWY6IFwicURlZi52YWx1ZUNvbG9yXCIsXHJcbiAgICAgICAgbGFiZWw6IFwiVmFsdWUgY29sb3JcIixcclxuICAgICAgICBleHByZXNzaW9uOiBcImFsd2F5c1wiLFxyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogXCIjODA4MDgwXCJcclxuICAgICAgfSxcclxuICAgICAgcGlja0l0ZW1Db2xvcjoge1xyXG4gICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXHJcbiAgICAgICAgY29tcG9uZW50OiBDb2xvcnNQaWNrZXJDb21wb25lbnQsXHJcbiAgICAgICAgcmVmOiBcInFEZWYudmFsdWVDb2xvclwiLFxyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogXCIjODA4MDgwXCIsXHJcbiAgICAgICAgb3B0aW9uczogQ09MT1JfT1BUSU9OU1xyXG4gICAgICB9LFxyXG4gICAgICBsaW5rVG9TaGVldCA6IHtcclxuICAgICAgICB0eXBlIDogXCJpdGVtc1wiLFxyXG4gICAgICAgIGl0ZW1zIDoge1xyXG4gICAgICAgICAgdXNlTGluayA6IHtcclxuICAgICAgICAgICAgcmVmIDogXCJxRGVmLnVzZUxpbmtcIixcclxuICAgICAgICAgICAgdHlwZSA6IFwiYm9vbGVhblwiLFxyXG4gICAgICAgICAgICBjb21wb25lbnQgOiBcInN3aXRjaFwiLFxyXG4gICAgICAgICAgICB0cmFuc2xhdGlvbiA6IFwicHJvcGVydGllcy5rcGkubGlua1RvU2hlZXRcIixcclxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlIDogITEsXHJcbiAgICAgICAgICAgIG9wdGlvbnMgOiBbe1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgOiAhMCxcclxuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uIDogXCJwcm9wZXJ0aWVzLm9uXCJcclxuICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA6ICExLFxyXG4gICAgICAgICAgICAgICAgdHJhbnNsYXRpb24gOiBcInByb3BlcnRpZXMub2ZmXCJcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBrcGlMaW5rIDoge1xyXG4gICAgICAgICAgICByZWYgOiBcInFEZWYua3BpTGlua1wiLFxyXG4gICAgICAgICAgICB0eXBlIDogXCJpdGVtc1wiLFxyXG4gICAgICAgICAgICBjb21wb25lbnQgOiBcInNoZWV0LWRyb3Bkb3duXCIsXHJcbiAgICAgICAgICAgIGl0ZW1zIDoge1xyXG4gICAgICAgICAgICAgIGlkIDoge1xyXG4gICAgICAgICAgICAgICAgcmVmIDogXCJxRGVmLmtwaUxpbmsuaWRcIixcclxuICAgICAgICAgICAgICAgIHR5cGUgOiBcInN0cmluZ1wiXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB0aXRsZSA6IHtcclxuICAgICAgICAgICAgICAgIHJlZiA6IFwicURlZi5rcGlMaW5rLnRpdGxlXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlIDogXCJzdHJpbmdcIlxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2hvdyA6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGRhdGEucURlZi51c2VMaW5rIC8vZGF0YS5xRGVmLnVzZUxpbmtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgZ3JvdXBCeURpbWVuc2lvbjoge1xyXG4gICAgICAgIHR5cGU6IFwiYm9vbGVhblwiLFxyXG4gICAgICAgIGxhYmVsOiBcIkdyb3VwIGJ5IGRpbWVuc2lvblwiLFxyXG4gICAgICAgIHJlZjogXCJxRGVmLmdyb3VwQnlEaW1lbnNpb25cIixcclxuICAgICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlXHJcbiAgICAgIH0sXHJcbiAgICAgIGdyb3VwQnlEaW1lbnNpb25WYWx1ZToge1xyXG4gICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXHJcbiAgICAgICAgcmVmOiBcInFEZWYuZ3JvdXBCeURpbWVuc2lvblZhbHVlXCIsXHJcbiAgICAgICAgbGFiZWw6IFwiRGltZW5zaW9uIFZhbHVlXCIsXHJcbiAgICAgICAgZXhwcmVzc2lvbjogXCJhbHdheXNcIixcclxuICAgICAgICBkZWZhdWx0VmFsdWU6IFwiXCIsXHJcbiAgICAgICAgc2hvdzogZnVuY3Rpb24oYSkge1xyXG4gICAgICAgICAgICByZXR1cm4gYS5xRGVmLmdyb3VwQnlEaW1lbnNpb247XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBvdmVycmlkZVBhcmFtczoge1xyXG4gICAgICAgIHR5cGU6IFwiYm9vbGVhblwiLFxyXG4gICAgICAgIGxhYmVsOiBcIk92ZXJyaWRlIHBhcmFtZXRlcnNcIixcclxuICAgICAgICByZWY6IFwicURlZi5vdlBhcmFtc1wiLFxyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2VcclxuICAgICAgfSxcclxuICAgICAgc2l6ZToge1xyXG4gICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXHJcbiAgICAgICAgY29tcG9uZW50OiBcImRyb3Bkb3duXCIsXHJcbiAgICAgICAgbGFiZWw6IFwiU2l6ZVwiLFxyXG4gICAgICAgIHJlZjogXCJxRGVmLnNpemVcIixcclxuICAgICAgICBvcHRpb25zOiBTSVpFX09QVElPTlMsXHJcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBcIlwiLFxyXG4gICAgICAgIHNob3c6IGZ1bmN0aW9uKGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGEucURlZi5vdlBhcmFtcztcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGhpZGVMYWJlbDoge1xyXG4gICAgICAgIHR5cGU6IFwiYm9vbGVhblwiLFxyXG4gICAgICAgIGxhYmVsOiBcIkhpZGUgbGFiZWxcIixcclxuICAgICAgICByZWY6IFwicURlZi5oaWRlTGFiZWxcIixcclxuICAgICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlXHJcbiAgICAgIH0sXHJcbiAgICAgIGxhYmVsT3JpZW50YXRpb246IHtcclxuICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxyXG4gICAgICAgIGNvbXBvbmVudDogXCJidXR0b25ncm91cFwiLFxyXG4gICAgICAgIGxhYmVsOiBcIkxhYmVscyBvcmllbnRhdGlvblwiLFxyXG4gICAgICAgIHJlZjogXCJxRGVmLmxhYmVsT3JpZW50YXRpb25cIixcclxuICAgICAgICBvcHRpb25zOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBcImhvcml6b250YWxcIixcclxuICAgICAgICAgICAgbGFiZWw6IFwiSG9yaXpvbnRhbFwiLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcIkhvcml6b250YWxcIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgIGxhYmVsOiBcIlZlcnRpY2FsXCIsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiVmVydGljYWxcIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBcIlwiLFxyXG4gICAgICAgIHNob3c6IGZ1bmN0aW9uKGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGEucURlZi5vdlBhcmFtcyAmJiAhYS5xRGVmLmhpZGVMYWJlbDtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGxhYmVsT3JkZXI6IHtcclxuICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxyXG4gICAgICAgIGNvbXBvbmVudDogXCJidXR0b25ncm91cFwiLFxyXG4gICAgICAgIGxhYmVsOiBcIkxhYmVscyBvcmRlclwiLFxyXG4gICAgICAgIHJlZjogXCJxRGVmLmxhYmVsT3JkZXJcIixcclxuICAgICAgICBvcHRpb25zOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBcImZpcnN0XCIsXHJcbiAgICAgICAgICAgIGxhYmVsOiBcIkxhYmVsLCBWYWx1ZVwiLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcIkxhYmVsLCBWYWx1ZVwiXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTogXCJsYXN0XCIsXHJcbiAgICAgICAgICAgIGxhYmVsOiBcIlZhbHVlLCBMYWJlbFwiLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcIlZhbHVlLCBMYWJlbFwiXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBkZWZhdWx0VmFsdWU6IFwiZmlyc3RcIixcclxuICAgICAgICBzaG93OiBmdW5jdGlvbihhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhLnFEZWYub3ZQYXJhbXMgJiYgIWEucURlZi5oaWRlTGFiZWw7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBmb250U3R5bGU6IHtcclxuICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxyXG4gICAgICAgIHJlZjogXCJxRGVmLmZvbnRTdHlsZXNcIixcclxuICAgICAgICBsYWJlbDogXCJGb250IHN0eWxlXCIsXHJcbiAgICAgICAgZXhwcmVzc2lvbjogXCJhbHdheXNcIixcclxuICAgICAgICBkZWZhdWx0VmFsdWU6IFwiXCIsXHJcbiAgICAgICAgc2hvdzogdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgICBwaWNrRm9udFN0eWxlOiB7XHJcbiAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcclxuICAgICAgICBjb21wb25lbnQ6IEZvbnRTdHlsZXNDb21wb25lbnQsXHJcbiAgICAgICAgcmVmOiBcInFEZWYuZm9udFN0eWxlc1wiLFxyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogXCJcIixcclxuICAgICAgICBzaG93OiBmdW5jdGlvbihhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgYS5xRGVmLmZvbnRTdHlsZXMgIT09IFwib2JqZWN0XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBpdGVtSWNvbjoge1xyXG4gICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXHJcbiAgICAgICAgcmVmOiBcInFEZWYudmFsdWVJY29uXCIsXHJcbiAgICAgICAgbGFiZWw6IFwiSWNvblwiLFxyXG4gICAgICAgIGV4cHJlc3Npb246IFwiYWx3YXlzXCIsXHJcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBcIlwiLFxyXG4gICAgICAgIHNob3c6IHRydWVcclxuICAgICAgfSxcclxuICAgICAgcGlja0l0ZW1JY29uOiB7XHJcbiAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcclxuICAgICAgICBjb21wb25lbnQ6IFNlbGVjdEljb25EaWFsb2dDb21wb25lbnQoU2hvd1NlcnZpY2UpLCAvL0ljb25zUGlja2VyQ29tcG9uZW50LFxyXG4gICAgICAgIHJlZjogXCJxRGVmLnZhbHVlSWNvblwiLFxyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogXCJcIixcclxuICAgICAgICBvcHRpb25zOiBGVUxMX0lDT05TX1NFVFxyXG4gICAgICB9LFxyXG4gICAgICAvKlxyXG4gICAgICB0ZXN0SXRlbUljb246IHtcclxuICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxyXG4gICAgICAgIHJlZjogXCJxRGVmLnRlc3RWYWx1ZUljb25cIixcclxuICAgICAgICBpY29uKGMsIGUpIHtcclxuICAgICAgICAgIHJldHVybiBjLnZhbHVlOyAvLyBzZWxlY3RlZCBpY29uXHJcbiAgICAgICAgfSwgLy8gcHJvcGVydHkgb3IgZnVuY3Rpb25cclxuICAgICAgICBjb21wb25lbnQ6IFNlbGVjdEljb25EaWFsb2dDb21wb25lbnQoU2hvd1NlcnZpY2UpLFxyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogXCJcIixcclxuICAgICAgICBvcHRpb25zOiBGVUxMX0lDT05TX1NFVFxyXG4gICAgICB9LFxyXG4gICAgICAqL1xyXG4gICAgICBpY29uUG9zaXRpb246IHtcclxuICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxyXG4gICAgICAgIGNvbXBvbmVudDogXCJidXR0b25ncm91cFwiLFxyXG4gICAgICAgIGxhYmVsOiBcIkljb24gcG9zaXRpb25cIixcclxuICAgICAgICByZWY6IFwicURlZi5pY29uUG9zaXRpb25cIixcclxuICAgICAgICBvcHRpb25zOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBcInZhbHVlXCIsXHJcbiAgICAgICAgICAgIGxhYmVsOiBcIlZhbHVlXCIsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiVmFsdWVcIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWU6IFwibGFiZWxcIixcclxuICAgICAgICAgICAgbGFiZWw6IFwiTGFiZWxcIixcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJMYWJlbFwiXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBkZWZhdWx0VmFsdWU6IFwibGFiZWxcIixcclxuICAgICAgICBzaG93IDogZnVuY3Rpb24gKGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGEucURlZi52YWx1ZUljb247XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBpY29uT3JkZXI6IHtcclxuICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxyXG4gICAgICAgIGNvbXBvbmVudDogXCJidXR0b25ncm91cFwiLFxyXG4gICAgICAgIGxhYmVsOiBcIkljb24gb3JkZXJcIixcclxuICAgICAgICByZWY6IFwicURlZi5pY29uT3JkZXJcIixcclxuICAgICAgICBvcHRpb25zOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBcImZpcnN0XCIsXHJcbiAgICAgICAgICAgIGxhYmVsOiBcIkljb24sIFZhbHVlXCIsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiSWNvbiwgVmFsdWVcIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWU6IFwibGFzdFwiLFxyXG4gICAgICAgICAgICBsYWJlbDogXCJWYWx1ZSwgSWNvblwiLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcIlZhbHVlLCBJY29uXCJcclxuICAgICAgICAgIH1cclxuICAgICAgICBdLFxyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogXCJmaXJzdFwiLFxyXG4gICAgICAgIHNob3cgOiBmdW5jdGlvbiAoYSkge1xyXG4gICAgICAgICAgICByZXR1cm4gYS5xRGVmLnZhbHVlSWNvbjtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGljb25TaXplOiB7XHJcbiAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcclxuICAgICAgICBjb21wb25lbnQ6IFwiZHJvcGRvd25cIixcclxuICAgICAgICBsYWJlbDogXCJJY29uIHNpemVcIixcclxuICAgICAgICByZWY6IFwicURlZi5pY29uU2l6ZVwiLFxyXG4gICAgICAgIHNob3c6IGZ1bmN0aW9uKGEpIHtcclxuICAgICAgICAgIHJldHVybiBhLnFEZWYudmFsdWVJY29uO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3B0aW9uczogU0laRV9PUFRJT05TLFxyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogXCJcIlxyXG4gICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG4vLyBBZGRpdGlvbmFsIHNldHRpbmdzXHJcbmxldCBzZXR0aW5ncyA9IHtcclxuICB0eXBlOiBcIml0ZW1zXCIsXHJcbiAgdXNlczogXCJzZXR0aW5nc1wiLFxyXG4gIGl0ZW1zOiB7XHJcbiAgICBkaW1lbnNpb25zT3B0aW9uczoge1xyXG4gICAgICB0eXBlOiBcIml0ZW1zXCIsXHJcbiAgICAgIGxhYmVsOiBcIkRpbWVuc2lvbnNcIixcclxuICAgICAgdHJhbnNsYXRpb246IFwiQ29tbW9uLkRpbWVuc2lvbnNcIixcclxuICAgICAgaXRlbXM6IHtcclxuICAgICAgICBzaG93QXM6IHtcclxuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXHJcbiAgICAgICAgICBjb21wb25lbnQ6IFwiZHJvcGRvd25cIixcclxuICAgICAgICAgIGxhYmVsOiBcIlNob3cgYXNcIixcclxuICAgICAgICAgIHJlZjogXCJvcHRpb25zLmRpbVNob3dBc1wiLFxyXG4gICAgICAgICAgb3B0aW9uczogRElNX1ZJRVdfT1BUSU9OUyxcclxuICAgICAgICAgIGRlZmF1bHRWYWx1ZTogXCJzZWdtZW50XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRpdmlkZUJ5OiB7XHJcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxyXG4gICAgICAgICAgY29tcG9uZW50OiBcImRyb3Bkb3duXCIsXHJcbiAgICAgICAgICBsYWJlbDogXCJJdGVtcyBwZXIgcm93XCIsXHJcbiAgICAgICAgICByZWY6IFwib3B0aW9ucy5kaW1EaXZpZGVCeVwiLFxyXG4gICAgICAgICAgZGVmYXVsdFZhbHVlOiBcImF1dG9cIixcclxuICAgICAgICAgIHNob3c6IGZ1bmN0aW9uKGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGEub3B0aW9ucy5kaW1TaG93QXMgPT09ICdjYXJkJ1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIG9wdGlvbnM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiBcImF1dG9cIixcclxuICAgICAgICAgICAgICBsYWJlbDogXCJBdXRvXCIsXHJcbiAgICAgICAgICAgICAgdG9vbHRpcDogXCJBdXRvXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiBcIm9uZVwiLFxyXG4gICAgICAgICAgICAgIGxhYmVsOiBcIjFcIixcclxuICAgICAgICAgICAgICB0b29sdGlwOiBcIk9uZVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB2YWx1ZTogXCJ0d29cIixcclxuICAgICAgICAgICAgICBsYWJlbDogXCIyXCIsXHJcbiAgICAgICAgICAgICAgdG9vbHRpcDogXCJUd29cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IFwidGhyZWVcIixcclxuICAgICAgICAgICAgICBsYWJlbDogXCIzXCIsXHJcbiAgICAgICAgICAgICAgdG9vbHRpcDogXCJUaHJlZVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB2YWx1ZTogXCJmb3VyXCIsXHJcbiAgICAgICAgICAgICAgbGFiZWw6IFwiNFwiLFxyXG4gICAgICAgICAgICAgIHRvb2x0aXA6IFwiRm91clwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB2YWx1ZTogXCJmaXZlXCIsXHJcbiAgICAgICAgICAgICAgbGFiZWw6IFwiNVwiLFxyXG4gICAgICAgICAgICAgIHRvb2x0aXA6IFwiRm91clwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB2YWx1ZTogXCJzaXhcIixcclxuICAgICAgICAgICAgICBsYWJlbDogXCI2XCIsXHJcbiAgICAgICAgICAgICAgdG9vbHRpcDogXCJTaXhcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IFwic2V2ZW5cIixcclxuICAgICAgICAgICAgICBsYWJlbDogXCI3XCIsXHJcbiAgICAgICAgICAgICAgdG9vbHRpcDogXCJTZXZlblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB2YWx1ZTogXCJlaWdodFwiLFxyXG4gICAgICAgICAgICAgIGxhYmVsOiBcIjhcIixcclxuICAgICAgICAgICAgICB0b29sdGlwOiBcIkVpZ2h0XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiBcIm5pbmVcIixcclxuICAgICAgICAgICAgICBsYWJlbDogXCI5XCIsXHJcbiAgICAgICAgICAgICAgdG9vbHRpcDogXCJOaW5lXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiBcInRlblwiLFxyXG4gICAgICAgICAgICAgIGxhYmVsOiBcIjEwXCIsXHJcbiAgICAgICAgICAgICAgdG9vbHRpcDogXCJUZW5cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkaW1lbnNpb25zT3JpZW50YXRpb246IHtcclxuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXHJcbiAgICAgICAgICBjb21wb25lbnQ6IFwiYnV0dG9uZ3JvdXBcIixcclxuICAgICAgICAgIGxhYmVsOiBcIk9yaWVudGF0aW9uXCIsXHJcbiAgICAgICAgICByZWY6IFwib3B0aW9ucy5kaW1lbnNpb25zT3JpZW50YXRpb25cIixcclxuICAgICAgICAgIHNob3c6IGZ1bmN0aW9uKGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGEub3B0aW9ucy5kaW1TaG93QXMgPT09ICdzZWdtZW50J1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIG9wdGlvbnM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiBcImhvcml6b250YWxcIixcclxuICAgICAgICAgICAgICBsYWJlbDogXCJIb3Jpem9udGFsXCIsXHJcbiAgICAgICAgICAgICAgdG9vbHRpcDogXCJIb3Jpem9udGFsXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiBcInZlcnRpY2FsXCIsXHJcbiAgICAgICAgICAgICAgbGFiZWw6IFwiVmVydGljYWxcIixcclxuICAgICAgICAgICAgICB0b29sdGlwOiBcIlZlcnRpY2FsXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXSxcclxuICAgICAgICAgIGRlZmF1bHRWYWx1ZTogXCJob3Jpem9udGFsXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxhYmVsT3JpZW50YXRpb246IHtcclxuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXHJcbiAgICAgICAgICBjb21wb25lbnQ6IFwiZHJvcGRvd25cIixcclxuICAgICAgICAgIGxhYmVsOiBcIkxhYmVsc1wiLFxyXG4gICAgICAgICAgcmVmOiBcIm9wdGlvbnMuZGltTGFiZWxPcmllbnRhdGlvblwiLFxyXG4gICAgICAgICAgb3B0aW9uczogRElNX0xBQkVMX09QVElPTlMsXHJcbiAgICAgICAgICBkZWZhdWx0VmFsdWU6IFwidG9wIGF0dGFjaGVkXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxhYmVsU2l6ZToge1xyXG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcclxuICAgICAgICAgIGNvbXBvbmVudDogXCJkcm9wZG93blwiLFxyXG4gICAgICAgICAgbGFiZWw6IFwiU2l6ZVwiLFxyXG4gICAgICAgICAgcmVmOiBcIm9wdGlvbnMuZGltTGFiZWxTaXplXCIsXHJcbiAgICAgICAgICBvcHRpb25zOiBTSVpFX09QVElPTlMsXHJcbiAgICAgICAgICBkZWZhdWx0VmFsdWU6IFwiXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhpZGVMYWJlbDoge1xyXG4gICAgICAgICAgdHlwZTogXCJib29sZWFuXCIsXHJcbiAgICAgICAgICBsYWJlbDogXCJIaWRlIGxhYmVsc1wiLFxyXG4gICAgICAgICAgcmVmOiBcIm9wdGlvbnMuZGltSGlkZUxhYmVsc1wiLFxyXG4gICAgICAgICAgZGVmYXVsdFZhbHVlOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2VudGVyZWRMYWJlbDoge1xyXG4gICAgICAgICAgdHlwZTogXCJib29sZWFuXCIsXHJcbiAgICAgICAgICBsYWJlbDogXCJDZW50ZXIgYWxpZ25lZCBsYWJlbHNcIixcclxuICAgICAgICAgIHJlZjogXCJvcHRpb25zLmRpbUNlbnRlcmVkTGFiZWxzXCIsXHJcbiAgICAgICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBoaWRlQm9yZGVyczoge1xyXG4gICAgICAgICAgdHlwZTogXCJib29sZWFuXCIsXHJcbiAgICAgICAgICBsYWJlbDogXCJIaWRlIGV4dGVybmFsIGJvcmRlcnNcIixcclxuICAgICAgICAgIHJlZjogXCJvcHRpb25zLmRpbUhpZGVCb3JkZXJzXCIsXHJcbiAgICAgICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxyXG4gICAgICAgICAgLy8gc2hvdzogZnVuY3Rpb24oYSkge1xyXG4gICAgICAgICAgLy8gICByZXR1cm4gYS5vcHRpb25zLmRpbVNob3dBcyA9PT0gJ3NlZ21lbnQnXHJcbiAgICAgICAgICAvLyB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGlkZUludGVybmFsQm9yZGVyczoge1xyXG4gICAgICAgICAgdHlwZTogXCJib29sZWFuXCIsXHJcbiAgICAgICAgICBsYWJlbDogXCJIaWRlIGludGVybmFsIGJvcmRlcnNcIixcclxuICAgICAgICAgIHJlZjogXCJvcHRpb25zLmRpbUhpZGVJbnRlcm5hbEJvcmRlcnNcIixcclxuICAgICAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXHJcbiAgICAgICAgICBzaG93OiBmdW5jdGlvbihhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhLm9wdGlvbnMuZGltU2hvd0FzID09PSAnc2VnbWVudCdcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgbWVhc3VyZXNPcHRpb25zOiB7XHJcbiAgICAgIHR5cGU6IFwiaXRlbXNcIixcclxuICAgICAgbGFiZWw6IFwiTWVhc3VyZXNcIixcclxuICAgICAgdHJhbnNsYXRpb246IFwiQ29tbW9uLk1lYXN1cmVzXCIsIC8vXCJwcm9wZXJ0aWVzLnByZXNlbnRhdGlvblwiLFxyXG4gICAgICBpdGVtczoge1xyXG4gICAgICAgIGxhYmVsT3JpZW50YXRpb246IHtcclxuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXHJcbiAgICAgICAgICBjb21wb25lbnQ6IFwiYnV0dG9uZ3JvdXBcIixcclxuICAgICAgICAgIGxhYmVsOiBcIkxhYmVscyBvcmllbnRhdGlvblwiLFxyXG4gICAgICAgICAgcmVmOiBcIm9wdGlvbnMubGFiZWxPcmllbnRhdGlvblwiLFxyXG4gICAgICAgICAgb3B0aW9uczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IFwiaG9yaXpvbnRhbFwiLFxyXG4gICAgICAgICAgICAgIGxhYmVsOiBcIkhvcml6b250YWxcIixcclxuICAgICAgICAgICAgICB0b29sdGlwOiBcIkhvcml6b250YWxcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgbGFiZWw6IFwiVmVydGljYWxcIixcclxuICAgICAgICAgICAgICB0b29sdGlwOiBcIlZlcnRpY2FsXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXSxcclxuICAgICAgICAgIGRlZmF1bHRWYWx1ZTogXCJcIlxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGxhYmVsT3JkZXI6IHtcclxuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXHJcbiAgICAgICAgICBjb21wb25lbnQ6IFwiYnV0dG9uZ3JvdXBcIixcclxuICAgICAgICAgIGxhYmVsOiBcIkxhYmVscyBvcmRlclwiLFxyXG4gICAgICAgICAgcmVmOiBcIm9wdGlvbnMubGFiZWxPcmRlclwiLFxyXG4gICAgICAgICAgb3B0aW9uczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IFwiZmlyc3RcIixcclxuICAgICAgICAgICAgICBsYWJlbDogXCJMYWJlbCwgVmFsdWVcIixcclxuICAgICAgICAgICAgICB0b29sdGlwOiBcIkxhYmVsLCBWYWx1ZVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB2YWx1ZTogXCJsYXN0XCIsXHJcbiAgICAgICAgICAgICAgbGFiZWw6IFwiVmFsdWUsIExhYmVsXCIsXHJcbiAgICAgICAgICAgICAgdG9vbHRpcDogXCJWYWx1ZSwgTGFiZWxcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgICAgZGVmYXVsdFZhbHVlOiBcImZpcnN0XCJcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzaXplOiB7XHJcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxyXG4gICAgICAgICAgY29tcG9uZW50OiBcImRyb3Bkb3duXCIsXHJcbiAgICAgICAgICBsYWJlbDogXCJTaXplXCIsXHJcbiAgICAgICAgICByZWY6IFwib3B0aW9ucy5zaXplXCIsXHJcbiAgICAgICAgICBvcHRpb25zOiBTSVpFX09QVElPTlMsXHJcbiAgICAgICAgICBkZWZhdWx0VmFsdWU6IFwiXCJcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBhdXRvU2l6ZToge1xyXG4gICAgICAgICAgdHlwZTogXCJib29sZWFuXCIsXHJcbiAgICAgICAgICBjb21wb25lbnQ6IFwic3dpdGNoXCIsXHJcbiAgICAgICAgICBsYWJlbDogXCJSZXNwb25zaXZlIHNpemVcIixcclxuICAgICAgICAgIHJlZjogXCJvcHRpb25zLmF1dG9TaXplXCIsXHJcbiAgICAgICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxyXG4gICAgICAgICAgb3B0aW9uczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IHRydWUsXHJcbiAgICAgICAgICAgICAgbGFiZWw6IFwiT25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgIGxhYmVsOiBcIk9mZlwiXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGl2aWRlQnk6IHtcclxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcclxuICAgICAgICAgICAgY29tcG9uZW50OiBcImRyb3Bkb3duXCIsXHJcbiAgICAgICAgICAgIGxhYmVsOiBcIkl0ZW1zIHBlciByb3dcIixcclxuICAgICAgICAgICAgcmVmOiBcIm9wdGlvbnMuZGl2aWRlQnlcIixcclxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBcImF1dG9cIixcclxuICAgICAgICAgICAgb3B0aW9uczogW1xyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IFwiTm90IHNldFwiLFxyXG4gICAgICAgICAgICAgICAgdG9vbHRpcDogXCJOb3Qgc2V0XCJcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImF1dG9cIixcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBcIkF1dG9cIixcclxuICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiQXV0b1wiXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJvbmVcIixcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBcIjFcIixcclxuICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiT25lXCJcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcInR3b1wiLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IFwiMlwiLFxyXG4gICAgICAgICAgICAgICAgdG9vbHRpcDogXCJUd29cIlxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwidGhyZWVcIixcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBcIjNcIixcclxuICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiVGhyZWVcIlxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiZm91clwiLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IFwiNFwiLFxyXG4gICAgICAgICAgICAgICAgdG9vbHRpcDogXCJGb3VyXCJcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImZpdmVcIixcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBcIjVcIixcclxuICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiRm91clwiXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJzaXhcIixcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBcIjZcIixcclxuICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiU2l4XCJcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcInNldmVuXCIsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogXCI3XCIsXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlNldmVuXCJcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcImVpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogXCI4XCIsXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwOiBcIkVpZ2h0XCJcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIm5pbmVcIixcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBcIjlcIixcclxuICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiTmluZVwiXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJ0ZW5cIixcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBcIjEwXCIsXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlRlblwiXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgc3R5bGluZ09wdGlvbnM6IHtcclxuICAgICAgdHlwZTogXCJpdGVtc1wiLFxyXG4gICAgICBsYWJlbDogXCJTdHlsZXNcIixcclxuICAgICAgdHJhbnNsYXRpb246IFwiU3R5bGVzXCIsXHJcbiAgICAgIGl0ZW1zOiB7XHJcbiAgICAgICAgc3R5bGVzOiB7XHJcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxyXG4gICAgICAgICAgY29tcG9uZW50OiBUZXh0RWRpdG9yQ29tcG9uZW50LFxyXG4gICAgICAgICAgbGFiZWw6IFwiU3R5bGVzIChDU1MpXCIsXHJcbiAgICAgICAgICByZWY6IFwib3B0aW9ucy5zdHlsZXNcIixcclxuICAgICAgICAgIGRlZmF1bHRWYWx1ZTogXCJcIlxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbmxldCBzb3J0aW5nID0ge1xyXG4gIHVzZXM6IFwic29ydGluZ1wiXHJcbn1cclxuXHJcbnJldHVybiB7XHJcbiAgdHlwZTogXCJpdGVtc1wiLFxyXG4gIGNvbXBvbmVudDogXCJhY2NvcmRpb25cIixcclxuICBpdGVtczoge1xyXG4gICAgZGltcyxcclxuICAgIGtwaXMsXHJcbiAgICBzb3J0aW5nLFxyXG4gICAgc2V0dGluZ3NcclxuICB9XHJcbn1cclxuXHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQzovVXNlcnMvbmVydXNoL0RvY3VtZW50cy9RbGlrL1NlbnNlL0V4dGVuc2lvbnMvcXNTaW1wbGVLUEkvc3JjL2RlZmluaXRpb24uanNcbiAqKi8iLCJpbXBvcnQgeyBnZXRSZWZWYWx1ZSwgc2V0UmVmVmFsdWUgfSBmcm9tICcuL3V0aWxzJztcclxuaW1wb3J0IERpYWxvZ0NvbXBvbmVudEZhY3RvcnkgZnJvbSAnLi9kaWFsb2dDb21wb25lbnQnO1xyXG5cclxubGV0IENvbG9yc1BpY2tlckNvbXBvbmVudCA9IHtcclxuICB0ZW1wbGF0ZTpcclxuICAgIGBcclxuICAgIDxkaXYgY2xhc3M9XCJwcC1jb21wb25lbnRcIiBuZy1pZj1cInZpc2libGVcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbFwiIG5nLWlmPVwibGFiZWxcIiBuZy1jbGFzcz1cInsgXFwnZGlzYWJsZWRcXCc6IHJlYWRPbmx5IH1cIj5cclxuICAgICAgICAgICAge3tsYWJlbH19XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2YWx1ZVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicXYtb2JqZWN0LXFzc3RhdGlzdGljXCIgbmctaWY9XCIhbG9hZGluZ1wiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aSBtaW5pIHJpZ2h0IGxhYmVsZWRcIj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY29sb3JcIiBuZy1tb2RlbD1cInQudmFsdWVcIiBuZy1jaGFuZ2U9XCJvbkNvbG9yQ2hhbmdlKClcIj5cclxuICAgICAgICAgICAgICAgIDxhIHRpdGxlPVwie3tjb2xvckV4cHJlc3Npb259fVwiIGNsYXNzPVwidWkgdGFnIGxhYmVsXCIgcXZhLWFjdGl2YXRlPVwic2hvd1BhbGxldGUoKVwiIHN0eWxlPVwiY29sb3I6ICMwMDsgYmFja2dyb3VuZC1jb2xvcjoge3t0LnZhbHVlfX07XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIG5nLWlmPVwiIWlzQ29sb3JFeHByZXNzaW9uXCIgc3R5bGU9XCJjb2xvcjogI2ZmZmZmZjsgZm9udC1zaXplOiAxNnB4O1wiPnt7dC52YWx1ZX19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImljb24tZXhwcmVzc2lvblwiIG5nLWlmPVwiaXNDb2xvckV4cHJlc3Npb25cIiBzdHlsZT1cImZvbnQtc2l6ZTogMTZweDtcIj48L2k+XHJcbiAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBuZy1pZj1cInNob3dDb2xvclBhbGxldGVcIj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gbmctcmVwZWF0PVwib3B0aW9uIGluIG9wdGlvbnMgdHJhY2sgYnkgb3B0aW9uLnZhbHVlXCJcclxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ1aSBtaW5pIGljb24gYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgICAgbmctZGlzYWJsZWQ9XCJyZWFkT25seVwiXHJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPVwibWFyZ2luOiAxcHg7IGJhY2tncm91bmQtY29sb3I6IHt7b3B0aW9uLnZhbHVlfX07XCJcclxuICAgICAgICAgICAgICAgICAgcXZhLWFjdGl2YXRlPVwib25Db2xvckNoYW5nZShvcHRpb24udmFsdWUpXCIgdGlkPVwie3tvcHRpb24udmFsdWV9fVwiIGRhdGEtaWNvbj1cInt7ZGVmaW5pdGlvbi5pY29ufX1cIlxyXG4gICAgICAgICAgICAgICAgICBxLXRpdGxlLXRyYW5zbGF0aW9uPVwie3tvcHRpb24udG9vbHRpcCB8fCBvcHRpb24ubGFiZWx9fVwiPlxyXG4gICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImNoZWNrbWFyayBpY29uXCIgc3R5bGU9XCJjb2xvcjogI2ZmZmZmZjsgZm9udC1zaXplOjE3cHg7XCIgbmctaWY9XCJvcHRpb24udmFsdWUgPT0gdC52YWx1ZVwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJpY29uXCIgc3R5bGU9XCJmb250LXNpemU6MTdweDtcIiBuZy1pZj1cIm9wdGlvbi52YWx1ZSAhPSB0LnZhbHVlXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHAtbG9hZGluZy1jb250YWluZXJcIiBuZy1pZj1cImxvYWRpbmdcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHAtbG9hZGVyIHF2LWxvYWRlclwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBuZy1pZj1cImVycm9yTWVzc2FnZVwiIGNsYXNzPVwicHAtaW52YWxpZCBlcnJvclwiPnt7ZXJyb3JNZXNzYWdlfX08L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICBgXHJcbiAgLFxyXG4gIGNvbnRyb2xsZXI6XHJcbiAgICBbXCIkc2NvcGVcIiwgXCIkZWxlbWVudFwiLCBmdW5jdGlvbihjLCBlKXtcclxuICAgICAgZnVuY3Rpb24gaW5pdE9wdGlvbnMoKSB7XHJcbiAgICAgICAgYy5sb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICBjLmVycm9yTWVzc2FnZSA9IFwiXCI7XHJcbiAgICAgICAgYy5sYWJlbCA9IGMuZGVmaW5pdGlvbi5sYWJlbDtcclxuICAgICAgICBjLm9wdGlvbnMgPSBjLmRlZmluaXRpb24ub3B0aW9ucztcclxuICAgICAgICBjLmlzQ29sb3JFeHByZXNzaW9uID0gZmFsc2U7XHJcbiAgICAgICAgYy5jb2xvckV4cHJlc3Npb24gPSAnJztcclxuXHJcbiAgICAgICAgbGV0IHZhbCA9IGdldFJlZlZhbHVlKGMuZGF0YSwgYy5kZWZpbml0aW9uLnJlZik7XHJcbiAgICAgICAgaWYodHlwZW9mIHZhbCA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgYy5pc0NvbG9yRXhwcmVzc2lvbiA9IHRydWU7XHJcbiAgICAgICAgICBjLmNvbG9yRXhwcmVzc2lvbiA9ICh2YWwgJiYgdmFsLnFTdHJpbmdFeHByZXNzaW9uICYmIHZhbC5xU3RyaW5nRXhwcmVzc2lvbi5xRXhwcikgfHwgXCJcIjtcclxuICAgICAgICAgIHZhbCA9IGMuZGVmaW5pdGlvbi5kZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjLnQgPSB7XHJcbiAgICAgICAgICB2YWx1ZTogdmFsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICBjLnNob3dDb2xvclBhbGxldGUgPSBmYWxzZTtcclxuICAgICAgICBjLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBpbml0T3B0aW9ucygpO1xyXG4gICAgICBjLm9uQ29sb3JDaGFuZ2UgPSBmdW5jdGlvbihjb2xvcikge1xyXG4gICAgICAgIGlmKGNvbG9yKSB7XHJcbiAgICAgICAgICBjLnQudmFsdWUgPSBjb2xvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGMuaXNDb2xvckV4cHJlc3Npb24pIHtcclxuICAgICAgICAgIGxldCB2YWwgPSBnZXRSZWZWYWx1ZShjLmRhdGEsIGMuZGVmaW5pdGlvbi5yZWYpO1xyXG4gICAgICAgICAgaWYodmFsICYmIHZhbC5xU3RyaW5nRXhwcmVzc2lvbiAmJiB2YWwucVN0cmluZ0V4cHJlc3Npb24ucUV4cHIpe1xyXG4gICAgICAgICAgICB2YWwucVN0cmluZ0V4cHJlc3Npb24ucUV4cHIgKz0gYy50LnZhbHVlO1xyXG4gICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgIHNldFJlZlZhbHVlKGMuZGF0YSwgYy5kZWZpbml0aW9uLnJlZiwgYy50LnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgc2V0UmVmVmFsdWUoYy5kYXRhLCBjLmRlZmluaXRpb24ucmVmLCBjLnQudmFsdWUpO1xyXG5cclxuICAgICAgICBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIGMuZGVmaW5pdGlvbi5jaGFuZ2UgJiYgYy5kZWZpbml0aW9uLmNoYW5nZShjLmRhdGEsIGMuYXJncy5oYW5kbGVyKTtcclxuICAgICAgICBjLiRlbWl0KFwic2F2ZVByb3BlcnRpZXNcIik7XHJcbiAgICAgICAgYy5zaG93Q29sb3JQYWxsZXRlID0gZmFsc2U7XHJcbiAgICAgIH07XHJcbiAgICAgIGMuc2hvd1BhbGxldGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBjLnNob3dDb2xvclBhbGxldGUgPSAhYy5zaG93Q29sb3JQYWxsZXRlO1xyXG4gICAgICB9O1xyXG4gICAgICBjLiRvbihcImRhdGFjaGFuZ2VkXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpbml0T3B0aW9ucygpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ2NoYW5nZWQhJyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfV1cclxufTtcclxuXHJcbi8qXHJcbmxldCBJY29uc1BpY2tlckNvbXBvbmVudCA9IHtcclxuICB0ZW1wbGF0ZTpcclxuICAgIGA8ZGl2IGNsYXNzPVwicHAtY29tcG9uZW50IHBwLWJ1dHRvbmdyb3VwLWNvbXBvbmVudFwiIG5nLWlmPVwidmlzaWJsZVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibGFiZWxcIiBuZy1pZj1cImxhYmVsXCIgbmctY2xhc3M9XCJ7IFxcJ2Rpc2FibGVkXFwnOiByZWFkT25seSB9XCI+XHJcbiAgICAgICAge3tsYWJlbH19XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwidmFsdWVcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicXYtb2JqZWN0LXFzc3RhdGlzdGljXCIgbmctaWY9XCIhbG9hZGluZ1wiPlxyXG4gICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICBjbGFzcz1cInF1aS1idXR0b25cIlxyXG4gICAgICAgICAgICB0aXRsZT1cInt7aWNvbkV4cHJlc3Npb259fVwiXHJcbiAgICAgICAgICAgIG5nLWNsYXNzPVwieydxdWktYWN0aXZlJzogaXNTaG93SWNvbnN9XCJcclxuICAgICAgICAgICAgcXZhLWFjdGl2YXRlPVwic2hvd0hpZGVJY29ucygpXCJcclxuICAgICAgICAgICAgbmctZGlzYWJsZWQ9XCJyZWFkT25seVwiPlxyXG4gICAgICAgICAgICA8aSBjbGFzcz1cInt7dmFsdWV9fVwiIG5nLWlmPVwiIWlzRXhwcmVzc2lvblwiIHN0eWxlPVwiZm9udC1zaXplOjE4cHg7XCI+PC9pPlxyXG4gICAgICAgICAgICA8aSBjbGFzcz1cImljb24tZXhwcmVzc2lvblwiIG5nLWlmPVwiaXNFeHByZXNzaW9uXCIgc3R5bGU9XCJmb250LXNpemU6MThweDtcIj48L2k+XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDxzcGFuIG5nLWlmPVwiIWlzRXhwcmVzc2lvblwiPnt7dmFsdWV9fTwvc3Bhbj5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJtYXJnaW4tdG9wOiA1cHg7XCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cInF1aS1jaGVja2JveGljb25cIlxyXG4gICAgICAgICAgICAgIHRpdGxlPVwiRGlzYWJsZWQgaWNvbiBzdHlsZVwiXHJcbiAgICAgICAgICAgICAgbmctY2xhc3M9XCJ7IFxcJ3F1aS1ob3ZlclxcJzogaG92ZXIgfVwiXHJcbiAgICAgICAgICAgICAgbmctbW91c2VlbnRlcj1cImhvdmVyID0gdHJ1ZVwiXHJcbiAgICAgICAgICAgICAgbmctbW91c2VsZWF2ZT1cImhvdmVyID0gZmFsc2VcIj5cclxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCJcclxuICAgICAgICAgICAgICAgIG5nLW1vZGVsPVwib3B0cy5kaXNhYmxlZFwiXHJcbiAgICAgICAgICAgICAgICBuZy1jaGFuZ2U9XCJjaGVja0ljb25TdHlsZXMoJ2Rpc2FibGVkJylcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hlY2std3JhcFwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjaGVja1wiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2hlY2stdGV4dFwiPkRpc2FibGVkPC9zcGFuPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2xhYmVsPlxyXG5cclxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwicXVpLWNoZWNrYm94aWNvblwiXHJcbiAgICAgICAgICAgICAgdGl0bGU9XCJMb2FkaW5nIGljb24gc3R5bGVcIlxyXG4gICAgICAgICAgICAgIG5nLWNsYXNzPVwieyBcXCdxdWktaG92ZXJcXCc6IGhvdmVyIH1cIlxyXG4gICAgICAgICAgICAgIG5nLW1vdXNlZW50ZXI9XCJob3ZlciA9IHRydWVcIlxyXG4gICAgICAgICAgICAgIG5nLW1vdXNlbGVhdmU9XCJob3ZlciA9IGZhbHNlXCI+XHJcbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiXHJcbiAgICAgICAgICAgICAgICBuZy1tb2RlbD1cIm9wdHMubG9hZGluZ1wiXHJcbiAgICAgICAgICAgICAgICBuZy1jaGFuZ2U9XCJjaGVja0ljb25TdHlsZXMoJ2xvYWRpbmcnKVwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGVjay13cmFwXCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNoZWNrXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjaGVjay10ZXh0XCI+TG9hZGluZzwvc3Bhbj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgIDxkaXYgbmctaWY9XCJpc1Nob3dJY29uc1wiPlxyXG4gICAgICAgICAgICA8YnV0dG9uIG5nLXJlcGVhdD1cIm9wdGlvbiBpbiBvcHRpb25zIHRyYWNrIGJ5IG9wdGlvbi52YWx1ZVwiXHJcbiAgICAgICAgICAgICAgY2xhc3M9XCJ1aSB0aW55IGljb24gYnV0dG9uXCJcclxuICAgICAgICAgICAgICBuZy1kaXNhYmxlZD1cInJlYWRPbmx5XCJcclxuICAgICAgICAgICAgICBzdHlsZT1cIm1hcmdpbjogMnB4O1wiXHJcbiAgICAgICAgICAgICAgcXZhLWFjdGl2YXRlPVwic2VsZWN0KG9wdGlvbi52YWx1ZSlcIj5cclxuICAgICAgICAgICAgICA8ZGl2PjxpIGNsYXNzPVwie3tvcHRpb24udmFsdWV9fVwiPjwvaT48L2Rpdj5cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicHAtbG9hZGluZy1jb250YWluZXJcIiBuZy1pZj1cImxvYWRpbmdcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcC1sb2FkZXIgcXYtbG9hZGVyXCI+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBuZy1pZj1cImVycm9yTWVzc2FnZVwiIGNsYXNzPVwicHAtaW52YWxpZCBlcnJvclwiPnt7ZXJyb3JNZXNzYWdlfX08L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5gXHJcbiAgLFxyXG4gIGNvbnRyb2xsZXI6XHJcbiAgICBbXCIkc2NvcGVcIiwgZnVuY3Rpb24oYyl7XHJcbiAgICAgIGZ1bmN0aW9uIGluaXRPcHRpb25zKCkge1xyXG4gICAgICAgIGMubG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgYy5lcnJvck1lc3NhZ2UgPSBcIlwiO1xyXG4gICAgICAgIGMuaXNTaG93SWNvbnMgPSBmYWxzZTtcclxuICAgICAgICBjLmlzRXhwcmVzc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgIGMuaWNvbkV4cHJlc3Npb24gPSBcIlwiO1xyXG4gICAgICAgIGMubGFiZWwgPSBjLmRlZmluaXRpb24ubGFiZWw7XHJcbiAgICAgICAgYy5vcHRpb25zID0gYy5kZWZpbml0aW9uLm9wdGlvbnM7XHJcbiAgICAgICAgYy52YWx1ZSA9IGdldFJlZlZhbHVlKGMuZGF0YSwgYy5kZWZpbml0aW9uLnJlZik7XHJcbiAgICAgICAgaWYodHlwZW9mIGMudmFsdWUgPT09IFwib2JqZWN0XCJcclxuICAgICAgICAgICYmIGMudmFsdWUucVN0cmluZ0V4cHJlc3Npb24pIHtcclxuICAgICAgICAgIGMuaXNFeHByZXNzaW9uID0gdHJ1ZTtcclxuICAgICAgICAgIGMuaWNvbkV4cHJlc3Npb24gPSAoYy52YWx1ZS5xU3RyaW5nRXhwcmVzc2lvbi5xRXhwcikgfHwgXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgYy5vcHRzID0ge307XHJcbiAgICAgICAgYy5vcHRzLmRpc2FibGVkID0gKGMuZ2V0VmFsdWVJbmRleCgnZGlzYWJsZWQnKSAhPSAtMSk7XHJcbiAgICAgICAgYy5vcHRzLmxvYWRpbmcgPSAoYy5nZXRWYWx1ZUluZGV4KCdsb2FkaW5nJykgIT0gLTEpO1xyXG4gICAgICAgIGMudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgYy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGMuZ2V0VmFsdWVJbmRleCA9IGZ1bmN0aW9uKHN0eWxlTmFtZSl7XHJcbiAgICAgICAgbGV0IGluZHggPSAtMTtcclxuICAgICAgICBpZighYy5pc0V4cHJlc3Npb24gJiYgdHlwZW9mIGMudmFsdWUgPT09ICdzdHJpbmcnKSAge1xyXG4gICAgICAgICAgbGV0IHN0eWxlcyA9IChjLnZhbHVlICYmIGMudmFsdWUuc3BsaXQoJyAnKSkgfHwgW107XHJcbiAgICAgICAgICBpbmR4ID0gc3R5bGVzLmluZGV4T2Yoc3R5bGVOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGluZHg7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBzZWUgdGVtcGxhdGVcclxuICAgICAgYy5zZWxlY3QgPSBmdW5jdGlvbiAoYSkge1xyXG4gICAgICAgIGMudmFsdWUgPSBhO1xyXG5cclxuICAgICAgICBpZihjLmlzRXhwcmVzc2lvbikge1xyXG4gICAgICAgICAgbGV0IHZhbCA9IGdldFJlZlZhbHVlKGMuZGF0YSwgYy5kZWZpbml0aW9uLnJlZik7XHJcbiAgICAgICAgICBpZih2YWwgJiYgdmFsLnFTdHJpbmdFeHByZXNzaW9uICYmIHZhbC5xU3RyaW5nRXhwcmVzc2lvbi5xRXhwcil7XHJcbiAgICAgICAgICAgIHZhbC5xU3RyaW5nRXhwcmVzc2lvbi5xRXhwciArPSBjLnZhbHVlO1xyXG4gICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgIHNldFJlZlZhbHVlKGMuZGF0YSwgYy5kZWZpbml0aW9uLnJlZiwgYy52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgIHNldFJlZlZhbHVlKGMuZGF0YSwgYy5kZWZpbml0aW9uLnJlZiwgYSk7XHJcblxyXG4gICAgICAgIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgYy5kZWZpbml0aW9uLmNoYW5nZSAmJiBjLmRlZmluaXRpb24uY2hhbmdlKGMuZGF0YSwgYy5hcmdzLmhhbmRsZXIpO1xyXG4gICAgICAgIGMuJGVtaXQoXCJzYXZlUHJvcGVydGllc1wiKTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGMuY2hlY2tJY29uU3R5bGVzID0gZnVuY3Rpb24gKHN0eWxlTmFtZSkge1xyXG4gICAgICAgIGlmKCFjLmlzRXhwcmVzc2lvbiAmJiB0eXBlb2YgYy52YWx1ZSA9PT0gJ3N0cmluZycpICB7XHJcbiAgICAgICAgICBsZXQgaXNEaXNhYmxlZCA9IGMub3B0c1tzdHlsZU5hbWVdO1xyXG4gICAgICAgICAgbGV0IHN0eWxlcyA9IChjLnZhbHVlICYmIGMudmFsdWUuc3BsaXQoJyAnKSkgfHwgW107XHJcbiAgICAgICAgICBsZXQgaW5keCA9IHN0eWxlcy5pbmRleE9mKHN0eWxlTmFtZSk7XHJcbiAgICAgICAgICBpZihpc0Rpc2FibGVkICYmIGluZHggPT09IC0xKVxyXG4gICAgICAgICAgICBzdHlsZXMucHVzaChzdHlsZU5hbWUpO1xyXG4gICAgICAgICAgZWxzZSBpZighaXNEaXNhYmxlZCAmJiAoaW5keCAhPSAtMSkpXHJcbiAgICAgICAgICAgIHN0eWxlcy5zcGxpY2UoaW5keCwgMSk7XHJcblxyXG4gICAgICAgICAgbGV0IHZhbHVlID0gc3R5bGVzLmpvaW4oJyAnKTtcclxuICAgICAgICAgIGMuc2VsZWN0KHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBjLnNob3dIaWRlSWNvbnMgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIGMuaXNTaG93SWNvbnMgPSAhYy5pc1Nob3dJY29ucztcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGMuJG9uKFwiZGF0YWNoYW5nZWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGluaXRPcHRpb25zKCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaW5pdE9wdGlvbnMoKTtcclxuICAgIH1dXHJcbn07XHJcbiovXHJcblxyXG5sZXQgRm9udFN0eWxlc0NvbXBvbmVudCA9IHtcclxuICB0ZW1wbGF0ZTpcclxuICAgIGA8ZGl2IGNsYXNzPVwicHAtY29tcG9uZW50IHBwLWJ1dHRvbmdyb3VwLWNvbXBvbmVudCBxdi1vYmplY3QtcXNzdGF0aXN0aWNcIiBuZy1pZj1cInZpc2libGVcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cImxhYmVsXCIgbmctaWY9XCJsYWJlbFwiIG5nLWNsYXNzPVwieyBcXCdkaXNhYmxlZFxcJzogcmVhZE9ubHkgfVwiPlxyXG4gICAgICAgIHt7bGFiZWx9fVxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cInF1aS1idXR0b25ncm91cFwiIG5nLWlmPVwiIWxvYWRpbmcgJiYgIWlzRXhwcmVzc2lvblwiPlxyXG4gICAgICAgIDxidXR0b25cclxuICAgICAgICAgIGNsYXNzPVwicXVpLWJ1dHRvblwiXHJcbiAgICAgICAgICBuZy1jbGFzcz1cInsncXVpLWFjdGl2ZSc6c3RhdGVzLmJvbGR9XCJcclxuICAgICAgICAgIG5nLWRpc2FibGVkPVwicmVhZE9ubHlcIlxyXG4gICAgICAgICAgcXZhLWFjdGl2YXRlPVwic2VsZWN0KCdib2xkJylcIlxyXG4gICAgICAgICAgcS10aXRsZS10cmFuc2xhdGlvbj1cIkJvbGRcIj5cclxuICAgICAgICAgIDxpIGNsYXNzPVwiaWNvbiBib2xkXCIgc3R5bGU9XCJmb250LWNvbG9yOiB3aGl0ZTsgZm9udC1zaXplOjE4cHg7XCI+PC9pPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDxidXR0b25cclxuICAgICAgICAgIGNsYXNzPVwicXVpLWJ1dHRvblwiXHJcbiAgICAgICAgICBuZy1jbGFzcz1cInsncXVpLWFjdGl2ZSc6c3RhdGVzLml0YWxpY31cIlxyXG4gICAgICAgICAgbmctZGlzYWJsZWQ9XCJyZWFkT25seVwiXHJcbiAgICAgICAgICBxdmEtYWN0aXZhdGU9XCJzZWxlY3QoJ2l0YWxpYycpXCJcclxuICAgICAgICAgIHEtdGl0bGUtdHJhbnNsYXRpb249XCJJdGFsaWNcIj5cclxuICAgICAgICAgIDxpIGNsYXNzPVwiaWNvbiBpdGFsaWNcIiBzdHlsZT1cImZvbnQtY29sb3I6IHdoaXRlOyBmb250LXNpemU6MThweDtcIj48L2k+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgY2xhc3M9XCJxdWktYnV0dG9uXCJcclxuICAgICAgICAgIG5nLWNsYXNzPVwieydxdWktYWN0aXZlJzpzdGF0ZXMudW5kZXJsaW5lfVwiXHJcbiAgICAgICAgICBuZy1kaXNhYmxlZD1cInJlYWRPbmx5XCJcclxuICAgICAgICAgIHF2YS1hY3RpdmF0ZT1cInNlbGVjdCgndW5kZXJsaW5lJylcIlxyXG4gICAgICAgICAgcS10aXRsZS10cmFuc2xhdGlvbj1cIlVuZGVybGluZVwiPlxyXG4gICAgICAgICAgPGkgY2xhc3M9XCJpY29uIHVuZGVybGluZVwiIHN0eWxlPVwiZm9udC1jb2xvcjogd2hpdGU7IGZvbnQtc2l6ZToxOHB4O1wiPjwvaT5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzPVwicHAtbG9hZGluZy1jb250YWluZXJcIiBuZy1pZj1cImxvYWRpbmdcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicHAtbG9hZGVyIHF2LWxvYWRlclwiPjwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgbmctaWY9XCJlcnJvck1lc3NhZ2VcIiBjbGFzcz1cInBwLWludmFsaWQgZXJyb3JcIj57e2Vycm9yTWVzc2FnZX19PC9kaXY+XHJcbiAgICA8L2Rpdj5gXHJcbiAgLFxyXG4gIGNvbnRyb2xsZXI6XHJcbiAgICBbXCIkc2NvcGVcIiwgZnVuY3Rpb24oYyl7XHJcbiAgICAgIGZ1bmN0aW9uIGluaXRPcHRpb25zKCkge1xyXG4gICAgICAgIGMubG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgYy5lcnJvck1lc3NhZ2UgPSBcIlwiO1xyXG4gICAgICAgIGMubGFiZWwgPSBjLmRlZmluaXRpb24ubGFiZWw7XHJcbiAgICAgICAgYy5pc0V4cHJlc3Npb24gPSBmYWxzZTtcclxuICAgICAgICBsZXQgdmFsdWUgPSBnZXRSZWZWYWx1ZShjLmRhdGEsIGMuZGVmaW5pdGlvbi5yZWYpO1xyXG4gICAgICAgIGMuc3RhdGVzID0ge307XHJcbiAgICAgICAgaWYodmFsdWUpIHtcclxuICAgICAgICAgIGlmKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIlxyXG4gICAgICAgICAgJiYgdmFsdWUucVN0cmluZ0V4cHJlc3Npb24pIHtcclxuICAgICAgICAgICAgYy5pc0V4cHJlc3Npb24gPSB0cnVlO1xyXG4gICAgICAgICAgICB2YWx1ZSA9ICh2YWx1ZS5xU3RyaW5nRXhwcmVzc2lvbi5xRXhwcikgfHwgXCJcIjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBsZXQgdmFsdWVzID0gdmFsdWUuc3BsaXQoJywnKTtcclxuICAgICAgICAgIHZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKXtcclxuICAgICAgICAgICAgYy5zdGF0ZXNbdmFsdWVdID0gdmFsdWU7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICBjLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgYy5zZWxlY3QgPSBmdW5jdGlvbiAoYSkge1xyXG4gICAgICAgIGlmKGMuc3RhdGVzW2FdKVxyXG4gICAgICAgICAgZGVsZXRlIGMuc3RhdGVzW2FdO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgIGMuc3RhdGVzW2FdID0gYTtcclxuXHJcbiAgICAgICAgbGV0IHZhbHVlID0gT2JqZWN0LmtleXMoYy5zdGF0ZXMpLmpvaW4oJywnKTtcclxuXHJcbiAgICAgICAgaWYoYy5pc0V4cHJlc3Npb24pIHtcclxuICAgICAgICAgIGxldCB2YWx1ZVJlZiA9IGdldFJlZlZhbHVlKGMuZGF0YSwgYy5kZWZpbml0aW9uLnJlZik7XHJcbiAgICAgICAgICBpZih2YWx1ZVJlZiAmJiB2YWx1ZVJlZi5xU3RyaW5nRXhwcmVzc2lvbiAmJiB2YWx1ZVJlZi5xU3RyaW5nRXhwcmVzc2lvbi5xRXhwcil7XHJcbiAgICAgICAgICAgIHZhbHVlUmVmLnFTdHJpbmdFeHByZXNzaW9uLnFFeHByICs9IHZhbHVlO1xyXG4gICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgIHNldFJlZlZhbHVlKGMuZGF0YSwgYy5kZWZpbml0aW9uLnJlZiwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICBzZXRSZWZWYWx1ZShjLmRhdGEsIGMuZGVmaW5pdGlvbi5yZWYsIHZhbHVlKTtcclxuXHJcbiAgICAgICAgXCJmdW5jdGlvblwiID09IHR5cGVvZiBjLmRlZmluaXRpb24uY2hhbmdlICYmIGMuZGVmaW5pdGlvbi5jaGFuZ2UoYy5kYXRhLCBjLmFyZ3MuaGFuZGxlcik7XHJcbiAgICAgICAgYy4kZW1pdChcInNhdmVQcm9wZXJ0aWVzXCIpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgYy4kb24oXCJkYXRhY2hhbmdlZFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaW5pdE9wdGlvbnMoKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpbml0T3B0aW9ucygpO1xyXG4gICAgfV1cclxufTtcclxuXHJcbmxldCBUZXh0RWRpdG9yQ29tcG9uZW50ID0ge1xyXG4gIHRlbXBsYXRlOlxyXG4gIGBcclxuICA8ZGl2IGNsYXNzPVwicHAtY29tcG9uZW50XCIgbmctaWY9XCJ2aXNpYmxlXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsXCIgbmctaWY9XCJsYWJlbFwiIG5nLWNsYXNzPVwieyBcXCdkaXNhYmxlZFxcJzogcmVhZE9ubHkgfVwiPlxyXG4gICAgICAgICAge3tsYWJlbH19XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInZhbHVlXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicXYtb2JqZWN0LXFzc3RhdGlzdGljXCIgbmctaWY9XCIhbG9hZGluZ1wiPlxyXG4gICAgICAgICAgICA8dGV4dGFyZWEgcm93cz1cIjVcIiBuZy1tb2RlbD1cInQudmFsdWVcIiBuZy1jaGFuZ2U9XCJvblRleHRDaGFuZ2UoKVwiIHN0eWxlPVwid2lkdGg6IDEwMCU7IG1heC13aWR0aDogMTAwJTtcIj5cclxuICAgICAgICAgICAgPC90ZXh0YXJlYT5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwcC1sb2FkaW5nLWNvbnRhaW5lclwiIG5nLWlmPVwibG9hZGluZ1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInBwLWxvYWRlciBxdi1sb2FkZXJcIj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IG5nLWlmPVwiZXJyb3JNZXNzYWdlXCIgY2xhc3M9XCJwcC1pbnZhbGlkIGVycm9yXCI+e3tlcnJvck1lc3NhZ2V9fTwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gIGAsXHJcbiAgY29udHJvbGxlcjpcclxuICAgIFtcIiRzY29wZVwiLCBmdW5jdGlvbihjKXtcclxuICAgICAgZnVuY3Rpb24gaW5pdE9wdGlvbnMoKSB7XHJcbiAgICAgICAgYy5sb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICBjLmVycm9yTWVzc2FnZSA9IFwiXCI7XHJcbiAgICAgICAgYy5sYWJlbCA9IGMuZGVmaW5pdGlvbi5sYWJlbDtcclxuICAgICAgICBjLnQgPSB7XHJcbiAgICAgICAgICB2YWx1ZTogZ2V0UmVmVmFsdWUoYy5kYXRhLCBjLmRlZmluaXRpb24ucmVmKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgYy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICBjLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgYy5vblRleHRDaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBzZXRSZWZWYWx1ZShjLmRhdGEsIGMuZGVmaW5pdGlvbi5yZWYsIGMudC52YWx1ZSk7XHJcbiAgICAgICAgXCJmdW5jdGlvblwiID09IHR5cGVvZiBjLmRlZmluaXRpb24uY2hhbmdlICYmIGMuZGVmaW5pdGlvbi5jaGFuZ2UoYy5kYXRhLCBjLmFyZ3MuaGFuZGxlcik7XHJcbiAgICAgICAgYy4kZW1pdChcInNhdmVQcm9wZXJ0aWVzXCIpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgYy4kb24oXCJkYXRhY2hhbmdlZFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaW5pdE9wdGlvbnMoKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpbml0T3B0aW9ucygpO1xyXG4gICAgfV1cclxufTtcclxuXHJcbi8vIFNlbGVjdCBpY29uIGRpYWxvZyBjb21wb25lbnRcclxubGV0IFNlbGVjdEljb25EaWFsb2dDb21wb25lbnQgPSBmdW5jdGlvbihTaG93U2VydmljZSkge1xyXG5yZXR1cm4gRGlhbG9nQ29tcG9uZW50RmFjdG9yeShTaG93U2VydmljZSwgKCgpID0+IHtcclxuXHJcbiAgZnVuY3Rpb24gZ2V0VmFsdWVJbmRleChjLCBzdHlsZU5hbWUpIHtcclxuICAgIGxldCBpbmR4ID0gLTE7XHJcbiAgICBpZighYy5pc0V4cHJlc3Npb24gJiYgdHlwZW9mIGMudmFsdWUgPT09ICdzdHJpbmcnKSAge1xyXG4gICAgICAvLyBsZXQgc3R5bGVzID0gKGMudmFsdWUgJiYgYy52YWx1ZS5zcGxpdCgnICcpKSB8fCBbXTtcclxuICAgICAgaW5keCA9IGMudmFsdWUuc2VhcmNoKG5ldyBSZWdFeHAoYFxcXFxzJHtzdHlsZU5hbWV9YCkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGluZHg7XHJcbiAgfVxyXG5cclxuICBsZXQgZG9jV2lkdGggPSAkKGRvY3VtZW50KS53aWR0aCgpO1xyXG4gIGxldCBkb2NIZWlnaHQgPSAkKGRvY3VtZW50KS5oZWlnaHQoKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHRleHQ6ICdJY29ucycsXHJcbiAgICBpY29uOiAnJywgLy8gZGlhbG9nIGljb25cclxuICAgIGluaXRDb250ZXh0KGMsIGUpIHsgLy8gY29tcG9uZW50J3MgY29udGV4dCBpbml0aWFsaXphdGlvblxyXG4gICAgICBjLmlzRXhwcmVzc2lvbiA9IGZhbHNlO1xyXG4gICAgICBpZih0eXBlb2YgYy52YWx1ZSA9PT0gXCJvYmplY3RcIlxyXG4gICAgICAgICYmIGMudmFsdWUucVN0cmluZ0V4cHJlc3Npb24pIHtcclxuICAgICAgICBjLmlzRXhwcmVzc2lvbiA9IHRydWU7XHJcbiAgICAgICAgYy5pY29uRXhwcmVzc2lvbiA9IChjLnZhbHVlLnFTdHJpbmdFeHByZXNzaW9uLnFFeHByKSB8fCBcIlwiO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgY29udHJvbENvbXBvbmVudDogYFxyXG4gICAgPGJ1dHRvblxyXG4gICAgICBjbGFzcz1cInF1aS1idXR0b25cIlxyXG4gICAgICB0aXRsZT1cInt7aWNvbkV4cHJlc3Npb259fVwiXHJcbiAgICAgIHF2YS1hY3RpdmF0ZT1cInNob3dEaWFsb2coKVwiXHJcbiAgICAgIG5nLWRpc2FibGVkPVwicmVhZE9ubHlcIj5cclxuICAgICAgPGkgY2xhc3M9XCJ7e3ZhbHVlfX1cIiBuZy1pZj1cIiFpc0V4cHJlc3Npb25cIiBzdHlsZT1cImZvbnQtc2l6ZToxOHB4O1wiPjwvaT5cclxuICAgICAgPGkgY2xhc3M9XCJpY29uLWV4cHJlc3Npb25cIiBuZy1pZj1cImlzRXhwcmVzc2lvblwiIHN0eWxlPVwiZm9udC1zaXplOjE4cHg7XCI+PC9pPlxyXG4gICAgPC9idXR0b24+XHJcbiAgICA8c3BhbiBuZy1pZj1cIiFpc0V4cHJlc3Npb25cIj57e3ZhbHVlfX08L3NwYW4+XHJcbiAgICBgLFxyXG4gICAgaW5pdERpYWxvZ0NvbnRleHQoYywgZGMpIHtcclxuICAgICAgLy8gYyAtIGNvbXBvbmVudCBjb250ZXh0IChzZWUgaW5pdENvbnRleHQpLFxyXG4gICAgICAvLyBkYyAtIGRpYWxvZyBjb250ZXh0IChzZWUgZGlhbG9nQ29udGVudClcclxuICAgICAgZGMuaWNvbk9wdGlvbnMgPSB7XHJcbiAgICAgICAgZGlzYWJsZWQ6ICdEaXNhYmxlZCcsXHJcbiAgICAgICAgbG9hZGluZzogJ0xvYWRpbmcnLFxyXG4gICAgICAgIC8vY2lyY3VsYXI6ICdDaXJjdWxhcicsXHJcbiAgICAgICAgLy9ib3JkZXJlZDogJ0JvcmRlcmVkJyxcclxuICAgICAgICBbJ2hvcml6b250YWxseSBmbGlwcGVkJ106ICdIb3Jpem9udGFsbHkgZmxpcHBlZCcsXHJcbiAgICAgICAgWyd2ZXJ0aWNhbGx5IGZsaXBwZWQnXTogJ1ZlcnRpY2FsbHkgZmxpcHBlZCcsXHJcbiAgICAgICAgWydjbG9ja3dpc2Ugcm90YXRlZCddOiAnQ2xvY2t3aXNlIHJvdGF0ZWQnLFxyXG4gICAgICAgIFsnY291bnRlcmNsb2Nrd2lzZSByb3RhdGVkJ106ICdDb3VudGVyY2xvY2t3aXNlIHJvdGF0ZWQnXHJcbiAgICAgIH07XHJcbiAgICAgIGRjLm9wdHMgPSB7fTtcclxuICAgICAgZm9yKGxldCBpY29uT3B0aW9uIGluIGRjLmljb25PcHRpb25zKSB7XHJcbiAgICAgICAgZGMub3B0c1tpY29uT3B0aW9uXSA9IChnZXRWYWx1ZUluZGV4KGMsIGljb25PcHRpb24pICE9IC0xKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZGMuaXNFeHByZXNzaW9uID0gYy5pc0V4cHJlc3Npb247XHJcbiAgICAgIC8vIEljb25zIGFzIG9wdGlvbnMgcHJvcGVydHk6XHJcbiAgICAgIGRjLm9wdGlvbnMgPSBjLmRlZmluaXRpb24ub3B0aW9ucztcclxuICAgIH0sXHJcbiAgICBzZWxlY3RWYWx1ZShjLCBuZXdWYWx1ZSkge1xyXG4gICAgICBjLmlzRXhwcmVzc2lvbiA9IGZhbHNlO1xyXG4gICAgICBpZihjLmljb25PcHRpb25zW25ld1ZhbHVlXSkge1xyXG4gICAgICAgIC8vbGV0IHZhbHVlcyA9IChjLnZhbHVlICYmIGMudmFsdWUuc3BsaXQoJyAnKSkgfHwgW107XHJcbiAgICAgICAgbGV0IHZhbHVlcyA9IGMudmFsdWUgfHwgXCJcIjtcclxuICAgICAgICBsZXQgaXNEaXNhYmxlZCA9IGMub3B0c1tuZXdWYWx1ZV07XHJcbiAgICAgICAgbGV0IHNlYXJjaFJlID0gbmV3IFJlZ0V4cChgXFxcXHMke25ld1ZhbHVlfWApO1xyXG4gICAgICAgIGxldCBpbmR4ID0gdmFsdWVzLnNlYXJjaChzZWFyY2hSZSk7XHJcbiAgICAgICAgaWYoaXNEaXNhYmxlZCAmJiBpbmR4ID09PSAtMSkge1xyXG4gICAgICAgICAgLy8gYWRkXHJcbiAgICAgICAgICAvL3ZhbHVlcy5wdXNoKG5ld1ZhbHVlKTtcclxuICAgICAgICAgIHZhbHVlcyA9IHZhbHVlcy5jb25jYXQoJyAnLCBuZXdWYWx1ZSk7XHJcbiAgICAgICAgICBjLm9wdHNbbmV3VmFsdWVdID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZighaXNEaXNhYmxlZCAmJiAoaW5keCAhPSAtMSkpIHtcclxuICAgICAgICAgIC8vIHJlbW92ZVxyXG4gICAgICAgICAgLy8gdmFsdWVzLnNwbGljZShpbmR4LCAxKTtcclxuICAgICAgICAgIHZhbHVlcyA9IHZhbHVlcy5yZXBsYWNlKHNlYXJjaFJlLCAnJyk7XHJcbiAgICAgICAgICBjLm9wdHNbbmV3VmFsdWVdID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWx1ZXM7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IHJldHVyblZhbHVlID0gbmV3VmFsdWU7XHJcbiAgICAgICAgZm9yKGxldCBpY29uT3B0aW9uIGluIGMuaWNvbk9wdGlvbnMpIHtcclxuICAgICAgICAgIGlmKGMub3B0c1tpY29uT3B0aW9uXSlcclxuICAgICAgICAgICAgcmV0dXJuVmFsdWUgKz0gYCAke2ljb25PcHRpb259YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZGlhbG9nQ29udGVudDogYFxyXG4gICAgPGRpdiBjbGFzcz1cInF2LW9iamVjdC1xc3N0YXRpc3RpY1wiPlxyXG4gICAgICA8ZGl2IHN0eWxlPVwiaGVpZ2h0OiBhdXRvOyBmb250LXNpemU6M2VtO1wiPlxyXG4gICAgICAgIDxpIGNsYXNzPVwie3t2YWx1ZX19XCIgbmctaWY9XCIhaXNFeHByZXNzaW9uXCI+PC9pPjxzcGFuIG5nLWlmPVwiIWlzRXhwcmVzc2lvblwiIHN0eWxlPVwiZm9udC1zaXplOjAuNWVtO1wiPnt7dmFsdWV9fTwvc3Bhbj5cclxuICAgICAgICA8aSBjbGFzcz1cImljb24tZXhwcmVzc2lvblwiIG5nLWlmPVwiaXNFeHByZXNzaW9uXCIgc3R5bGU9XCJmb250LXNpemU6MThweDtcIj48L2k+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IHN0eWxlPVwib3ZlcmZsb3c6YXV0bzsgaGVpZ2h0OiR7ZG9jSGVpZ2h0IC8gMn1weDsgYm9yZGVyOiBzb2xpZCAxcHggI2YyZjJmMjtib3JkZXItcmFkaXVzOjVweDtwYWRkaW5nOjVweFwiPlxyXG4gICAgICA8ZGl2IG5nLXJlcGVhdD1cIihjYXRlZ29yeSwgaWNvbnMpIGluIG9wdGlvbnNcIj5cclxuICAgICAgICA8aDEgc3R5bGU9XCJtYXJnaW4tdG9wOjFlbTtcIj57e2NhdGVnb3J5fX08L2gxPlxyXG4gICAgICAgIDxidXR0b24gbmctcmVwZWF0PVwiaWNvbiBpbiBpY29ucyB0cmFjayBieSAkaW5kZXhcIlxyXG4gICAgICAgICAgY2xhc3M9XCJ1aSB0aW55IGljb24gYnV0dG9uXCJcclxuICAgICAgICAgIHRpdGxlPVwie3tpY29ufX1cIlxyXG4gICAgICAgICAgbmctZGlzYWJsZWQ9XCJyZWFkT25seVwiXHJcbiAgICAgICAgICBxdmEtYWN0aXZhdGU9XCJzZWxlY3QoaWNvbilcIlxyXG4gICAgICAgICAgc3R5bGU9XCJ3aWR0aDogNDBweDsgaGVpZ2h0OiA0MHB4OyBwYWRkaW5nOiAxcHg7IG1hcmdpbjogMnB4O1wiPlxyXG4gICAgICAgICAgPGRpdj48aSBjbGFzcz1cInt7aWNvbn19XCIgc3R5bGU9XCJtYXJnaW46IDA7IGZvbnQtc2l6ZTogMS4zZW1cIj48L2k+PC9kaXY+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBzdHlsZT1cIm1hcmdpbi10b3A6IDEwcHg7XCI+XHJcbiAgICAgICAgPHNwYW4gbmctcmVwZWF0LXN0YXJ0PVwiKGljb25PcHRpb24sIGljb25PcHRMYWJlbCkgaW4gaWNvbk9wdGlvbnMgdHJhY2sgYnkgaWNvbk9wdGlvblwiIC8+XHJcbiAgICAgICAgPGxhYmVsXHJcbiAgICAgICAgICBjbGFzcz1cInF1aS1jaGVja2JveGljb25cIlxyXG4gICAgICAgICAgdGl0bGU9XCJ7e2ljb25PcHRMYWJlbH19XCJcclxuICAgICAgICAgIG5nLWNsYXNzPVwieyBcXCdxdWktaG92ZXJcXCc6IGhvdmVyIH1cIlxyXG4gICAgICAgICAgbmctbW91c2VlbnRlcj1cImhvdmVyID0gdHJ1ZVwiXHJcbiAgICAgICAgICBuZy1tb3VzZWxlYXZlPVwiaG92ZXIgPSBmYWxzZVwiPlxyXG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiXHJcbiAgICAgICAgICAgIG5nLW1vZGVsPVwib3B0c1tpY29uT3B0aW9uXVwiXHJcbiAgICAgICAgICAgIG5nLWNoYW5nZT1cInNlbGVjdChpY29uT3B0aW9uKVwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNoZWNrLXdyYXBcIj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjaGVja1wiPjwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjaGVjay10ZXh0XCIgc3R5bGU9XCJtYXgtd2lkdGg6IDIwMHB4XCI+e3tpY29uT3B0TGFiZWx9fTwvc3Bhbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgPHNwYW4gbmctcmVwZWF0LWVuZD4mbmJzcDs8L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgd2lkdGg6IGAke2RvY1dpZHRoIC0gZG9jV2lkdGggLyA4fXB4YFxyXG4gIH1cclxufSkoKSk7XHJcbn07IC8vIFNlbGVjdEljb25EaWFsb2dDb21wb25lbnRcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBDb2xvcnNQaWNrZXJDb21wb25lbnQsXHJcbiAgRm9udFN0eWxlc0NvbXBvbmVudCxcclxuICBUZXh0RWRpdG9yQ29tcG9uZW50LFxyXG4gIFNlbGVjdEljb25EaWFsb2dDb21wb25lbnRcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBDOi9Vc2Vycy9uZXJ1c2gvRG9jdW1lbnRzL1FsaWsvU2Vuc2UvRXh0ZW5zaW9ucy9xc1NpbXBsZUtQSS9zcmMvZGVmaW5pdGlvbkNvbXBvbmVudHMuanNcbiAqKi8iLCJjb25zdCBGVUxMX0lDT05TX1NFVCA9IHtcclxuICBcIldlYiBjb250ZW50XCI6IFtcclxuICBcImFsYXJtIGljb25cIixcclxuICBcImFsYXJtIHNsYXNoIGljb25cIixcclxuICBcImFsYXJtIG91dGxpbmUgaWNvblwiLFxyXG4gIFwiYWxhcm0gc2xhc2ggb3V0bGluZSBpY29uXCIsXHJcbiAgXCJhdCBpY29uXCIsXHJcbiAgXCJicm93c2VyIGljb25cIixcclxuICBcImJ1ZyBpY29uXCIsXHJcbiAgXCJjYWxlbmRhciBvdXRsaW5lIGljb25cIixcclxuICBcImNhbGVuZGFyIGljb25cIixcclxuICBcImNsb3VkIGljb25cIixcclxuICBcImNvbW1lbnQgaWNvblwiLFxyXG4gIFwiY29tbWVudHMgaWNvblwiLFxyXG4gIFwiY29tbWVudCBvdXRsaW5lIGljb25cIixcclxuICBcImNvbW1lbnRzIG91dGxpbmUgaWNvblwiLFxyXG4gIFwiY29weXJpZ2h0IGljb25cIixcclxuICBcImRhc2hib2FyZCBpY29uXCIsXHJcbiAgXCJkcm9wZG93biBpY29uXCIsXHJcbiAgXCJleHRlcm5hbCBzcXVhcmUgaWNvblwiLFxyXG4gIFwiZXh0ZXJuYWwgaWNvblwiLFxyXG4gIFwiZXllZHJvcHBlciBpY29uXCIsXHJcbiAgXCJmZWVkIGljb25cIixcclxuICBcImZpbmQgaWNvblwiLFxyXG4gIFwiaGVhcnRiZWF0IGljb25cIixcclxuICBcImhpc3RvcnkgaWNvblwiLFxyXG4gIFwiaG9tZSBpY29uXCIsXHJcbiAgXCJpZGVhIGljb25cIixcclxuICBcImluYm94IGljb25cIixcclxuICBcImxhYiBpY29uXCIsXHJcbiAgXCJtYWlsIGljb25cIixcclxuICBcIm1haWwgb3V0bGluZSBpY29uXCIsXHJcbiAgXCJtYWlsIHNxdWFyZSBpY29uXCIsXHJcbiAgXCJtYXAgaWNvblwiLFxyXG4gIFwib3B0aW9ucyBpY29uXCIsXHJcbiAgXCJwYWludCBicnVzaCBpY29uXCIsXHJcbiAgXCJwYXltZW50IGljb25cIixcclxuICBcInBob25lIGljb25cIixcclxuICBcInBob25lIHNxdWFyZSBpY29uXCIsXHJcbiAgXCJwcml2YWN5IGljb25cIixcclxuICBcInByb3RlY3QgaWNvblwiLFxyXG4gIFwic2VhcmNoIGljb25cIixcclxuICBcInNldHRpbmcgaWNvblwiLFxyXG4gIFwic2V0dGluZ3MgaWNvblwiLFxyXG4gIFwic2hvcCBpY29uXCIsXHJcbiAgXCJzaWRlYmFyIGljb25cIixcclxuICBcInNpZ25hbCBpY29uXCIsXHJcbiAgXCJzaXRlbWFwIGljb25cIixcclxuICBcInRhZyBpY29uXCIsXHJcbiAgXCJ0YWdzIGljb25cIixcclxuICBcInRhc2tzIGljb25cIixcclxuICBcInRlcm1pbmFsIGljb25cIixcclxuICBcInRleHQgdGVsZXBob25lIGljb25cIixcclxuICBcInRpY2tldCBpY29uXCIsXHJcbiAgXCJ0cm9waHkgaWNvblwiLFxyXG4gIFwid2lmaSBpY29uXCJcclxuICBdLFxyXG5cclxuICBcIlVzZXIgYWN0aW9uc1wiOiBbXHJcbiAgICBcImFkanVzdCBpY29uXCIsXHJcbiAgICBcImFkZCB1c2VyIGljb25cIixcclxuICAgIFwiYWRkIHRvIGNhcnQgaWNvblwiLFxyXG4gICAgXCJhcmNoaXZlIGljb25cIixcclxuICAgIFwiYmFuIGljb25cIixcclxuICAgIFwiYm9va21hcmsgaWNvblwiLFxyXG4gICAgXCJjYWxsIGljb25cIixcclxuICAgIFwiY2FsbCBzcXVhcmUgaWNvblwiLFxyXG4gICAgXCJjbG91ZCBkb3dubG9hZCBpY29uXCIsXHJcbiAgICBcImNsb3VkIHVwbG9hZCBpY29uXCIsXHJcbiAgICBcImNvbXByZXNzIGljb25cIixcclxuICAgIFwiY29uZmlndXJlIGljb25cIixcclxuICAgIFwiZG93bmxvYWQgaWNvblwiLFxyXG4gICAgXCJlZGl0IGljb25cIixcclxuICAgIFwiZXJhc2UgaWNvblwiLFxyXG4gICAgXCJleGNoYW5nZSBpY29uXCIsXHJcbiAgICBcImV4dGVybmFsIHNoYXJlIGljb25cIixcclxuICAgIFwiZXhwYW5kIGljb25cIixcclxuICAgIFwiZmlsdGVyIGljb25cIixcclxuICAgIFwiZmxhZyBpY29uXCIsXHJcbiAgICBcImZsYWcgb3V0bGluZSBpY29uXCIsXHJcbiAgICBcImZvcndhcmQgbWFpbCBpY29uXCIsXHJcbiAgICBcImhpZGUgaWNvblwiLFxyXG4gICAgXCJpbiBjYXJ0IGljb25cIixcclxuICAgIFwibG9jayBpY29uXCIsXHJcbiAgICBcInBpbiBpY29uXCIsXHJcbiAgICBcInByaW50IGljb25cIixcclxuICAgIFwicmFuZG9tIGljb25cIixcclxuICAgIFwicmVjeWNsZSBpY29uXCIsXHJcbiAgICBcInJlZnJlc2ggaWNvblwiLFxyXG4gICAgXCJyZW1vdmUgYm9va21hcmsgaWNvblwiLFxyXG4gICAgXCJyZW1vdmUgdXNlciBpY29uXCIsXHJcbiAgICBcInJlcGVhdCBpY29uXCIsXHJcbiAgICBcInJlcGx5IGFsbCBpY29uXCIsXHJcbiAgICBcInJlcGx5IGljb25cIixcclxuICAgIFwicmV0d2VldCBpY29uXCIsXHJcbiAgICBcInNlbmQgaWNvblwiLFxyXG4gICAgXCJzZW5kIG91dGxpbmUgaWNvblwiLFxyXG4gICAgXCJzaGFyZSBhbHRlcm5hdGUgaWNvblwiLFxyXG4gICAgXCJzaGFyZSBhbHRlcm5hdGUgc3F1YXJlIGljb25cIixcclxuICAgIFwic2hhcmUgaWNvblwiLFxyXG4gICAgXCJzaGFyZSBzcXVhcmUgaWNvblwiLFxyXG4gICAgXCJzaWduIGluIGljb25cIixcclxuICAgIFwic2lnbiBvdXQgaWNvblwiLFxyXG4gICAgXCJ0aGVtZSBpY29uXCIsXHJcbiAgICBcInRyYW5zbGF0ZSBpY29uXCIsXHJcbiAgICBcInVuZG8gaWNvblwiLFxyXG4gICAgXCJ1bmhpZGUgaWNvblwiLFxyXG4gICAgXCJ1bmxvY2sgYWx0ZXJuYXRlIGljb25cIixcclxuICAgIFwidW5sb2NrIGljb25cIixcclxuICAgIFwidXBsb2FkIGljb25cIixcclxuICAgIFwid2FpdCBpY29uXCIsXHJcbiAgICBcIndpemFyZCBpY29uXCIsXHJcbiAgICBcIndyaXRlIGljb25cIixcclxuICAgIFwid3JpdGUgc3F1YXJlIGljb25cIlxyXG4gIF0sXHJcblxyXG4gIFwiTWVzc2FnZVwiOiBbXHJcbiAgICBcImFubm91bmNlbWVudCBpY29uXCIsXHJcbiAgICBcImJpcnRoZGF5IGljb25cIixcclxuICAgIFwiaGVscCBpY29uXCIsXHJcbiAgICBcImhlbHAgY2lyY2xlIGljb25cIixcclxuICAgIFwiaW5mbyBpY29uXCIsXHJcbiAgICBcImluZm8gY2lyY2xlIGljb25cIixcclxuICAgIFwid2FybmluZyBpY29uXCIsXHJcbiAgICBcIndhcm5pbmcgY2lyY2xlIGljb25cIixcclxuICAgIFwid2FybmluZyBzaWduIGljb25cIlxyXG4gIF0sXHJcblxyXG4gIFwiVXNlciBUeXBlc1wiOiBbXHJcbiAgICBcImNoaWxkIGljb25cIixcclxuICAgIFwiZG9jdG9yIGljb25cIixcclxuICAgIFwiaGFuZGljYXAgaWNvblwiLFxyXG4gICAgXCJzcHkgaWNvblwiLFxyXG4gICAgXCJzdHVkZW50IGljb25cIixcclxuICAgIFwidXNlciBpY29uXCIsXHJcbiAgICBcInVzZXJzIGljb25cIlxyXG4gIF0sXHJcblxyXG4gIFwiR2VuZGVyXCI6IFtcclxuICAgIFwiZmVtYWxlIGljb25cIixcclxuICAgIFwiaGV0ZXJvc2V4dWFsIGljb25cIixcclxuICAgIFwibWFsZSBpY29uXCIsXHJcbiAgICBcIm1hbiBpY29uXCIsXHJcbiAgICBcIm5ldXRlciBpY29uXCIsXHJcbiAgICBcIm90aGVyIGdlbmRlciBpY29uXCIsXHJcbiAgICBcIm90aGVyIGdlbmRlciBob3Jpem9udGFsIGljb25cIixcclxuICAgIFwib3RoZXIgZ2VuZGVyIHZlcnRpY2FsIGljb25cIixcclxuICAgIFwid29tYW4gaWNvblwiXHJcbiAgXSxcclxuXHJcbiAgXCJMYXlvdXQgQWRqdXN0bWVudFwiOiBbXHJcbiAgICBcImdyaWQgbGF5b3V0IGljb25cIixcclxuICAgIFwibGlzdCBsYXlvdXQgaWNvblwiLFxyXG4gICAgXCJibG9jayBsYXlvdXQgaWNvblwiLFxyXG4gICAgXCJ6b29tIGljb25cIixcclxuICAgIFwiem9vbSBvdXQgaWNvblwiLFxyXG4gICAgXCJyZXNpemUgdmVydGljYWwgaWNvblwiLFxyXG4gICAgXCJyZXNpemUgaG9yaXpvbnRhbCBpY29uXCIsXHJcbiAgICBcIm1heGltaXplIGljb25cIixcclxuICAgIFwiY3JvcCBpY29uXCJcclxuICBdLFxyXG5cclxuICBcIk9iamVjdHNcIjogW1xyXG4gICAgXCJhbmNob3IgaWNvblwiLFxyXG4gICAgXCJiYXIgaWNvblwiLFxyXG4gICAgXCJib21iIGljb25cIixcclxuICAgIFwiYm9vayBpY29uXCIsXHJcbiAgICBcImJ1bGxzZXllIGljb25cIixcclxuICAgIFwiY2FsY3VsYXRvciBpY29uXCIsXHJcbiAgICBcImNoZWNrZXJlZCBmbGFnIGljb25cIixcclxuICAgIFwiY29ja3RhaWwgaWNvblwiLFxyXG4gICAgXCJkaWFtb25kIGljb25cIixcclxuICAgIFwiZmF4IGljb25cIixcclxuICAgIFwiZmlyZSBleHRpbmd1aXNoZXIgaWNvblwiLFxyXG4gICAgXCJmaXJlIGljb25cIixcclxuICAgIFwiZ2lmdCBpY29uXCIsXHJcbiAgICBcImxlYWYgaWNvblwiLFxyXG4gICAgXCJsZWdhbCBpY29uXCIsXHJcbiAgICBcImxlbW9uIGljb25cIixcclxuICAgIFwibGlmZSByaW5nIGljb25cIixcclxuICAgIFwibGlnaHRuaW5nIGljb25cIixcclxuICAgIFwibWFnbmV0IGljb25cIixcclxuICAgIFwibW9uZXkgaWNvblwiLFxyXG4gICAgXCJtb29uIGljb25cIixcclxuICAgIFwicGxhbmUgaWNvblwiLFxyXG4gICAgXCJwdXp6bGUgaWNvblwiLFxyXG4gICAgXCJyYWluIGljb25cIixcclxuICAgIFwicm9hZCBpY29uXCIsXHJcbiAgICBcInJvY2tldCBpY29uXCIsXHJcbiAgICBcInNoaXBwaW5nIGljb25cIixcclxuICAgIFwic29jY2VyIGljb25cIixcclxuICAgIFwic3VpdGNhc2UgaWNvblwiLFxyXG4gICAgXCJzdW4gaWNvblwiLFxyXG4gICAgXCJ0cmF2ZWwgaWNvblwiLFxyXG4gICAgXCJ0cmVhdG1lbnQgaWNvblwiLFxyXG4gICAgXCJ3b3JsZCBpY29uXCJcclxuICBdLFxyXG5cclxuICBcIlNoYXBlc1wiOiBbXHJcbiAgICBcImFzdGVyaXNrIGljb25cIixcclxuICAgIFwiY2VydGlmaWNhdGUgaWNvblwiLFxyXG4gICAgXCJjaXJjbGUgaWNvblwiLFxyXG4gICAgXCJjaXJjbGUgbm90Y2hlZCBpY29uXCIsXHJcbiAgICBcImNpcmNsZSB0aGluIGljb25cIixcclxuICAgIFwiY3Jvc3NoYWlycyBpY29uXCIsXHJcbiAgICBcImN1YmUgaWNvblwiLFxyXG4gICAgXCJjdWJlcyBpY29uXCIsXHJcbiAgICBcImVsbGlwc2lzIGhvcml6b250YWwgaWNvblwiLFxyXG4gICAgXCJlbGxpcHNpcyB2ZXJ0aWNhbCBpY29uXCIsXHJcbiAgICBcInF1b3RlIGxlZnQgaWNvblwiLFxyXG4gICAgXCJxdW90ZSByaWdodCBpY29uXCIsXHJcbiAgICBcInNwaW5uZXIgaWNvblwiLFxyXG4gICAgXCJzcXVhcmUgaWNvblwiLFxyXG4gICAgXCJzcXVhcmUgb3V0bGluZSBpY29uXCJcclxuICBdLFxyXG5cclxuICBcIkl0ZW0gU2VsZWN0aW9uXCI6IFtcclxuICAgIFwiYWRkIGNpcmNsZSBpY29uXCIsXHJcbiAgICBcImFkZCBzcXVhcmUgaWNvblwiLFxyXG4gICAgXCJjaGVjayBjaXJjbGUgaWNvblwiLFxyXG4gICAgXCJjaGVjayBjaXJjbGUgb3V0bGluZSBpY29uXCIsXHJcbiAgICBcImNoZWNrIHNxdWFyZSBpY29uXCIsXHJcbiAgICBcImNoZWNrbWFyayBib3ggaWNvblwiLFxyXG4gICAgXCJjaGVja21hcmsgaWNvblwiLFxyXG4gICAgXCJtaW51cyBjaXJjbGUgaWNvblwiLFxyXG4gICAgXCJtaW51cyBpY29uXCIsXHJcbiAgICBcIm1pbnVzIHNxdWFyZSBpY29uXCIsXHJcbiAgICBcIm1pbnVzIHNxdWFyZSBvdXRsaW5lIGljb25cIixcclxuICAgIFwibW92ZSBpY29uXCIsXHJcbiAgICBcInBsdXMgaWNvblwiLFxyXG4gICAgXCJwbHVzIHNxdWFyZSBvdXRsaW5lIGljb25cIixcclxuICAgIFwicmFkaW8gaWNvblwiLFxyXG4gICAgXCJyZW1vdmUgY2lyY2xlIGljb25cIixcclxuICAgIFwicmVtb3ZlIGNpcmNsZSBvdXRsaW5lIGljb25cIixcclxuICAgIFwicmVtb3ZlIGljb25cIixcclxuICAgIFwic2VsZWN0ZWQgcmFkaW8gaWNvblwiLFxyXG4gICAgXCJ0b2dnbGUgb2ZmIGljb25cIixcclxuICAgIFwidG9nZ2xlIG9uIGljb25cIlxyXG4gIF0sXHJcblxyXG4gIFwiTWVkaWFcIjogW1xyXG4gICAgXCJhcmVhIGNoYXJ0IGljb25cIixcclxuICAgIFwiYmFyIGNoYXJ0IGljb25cIixcclxuICAgIFwiY2FtZXJhIHJldHJvIGljb25cIixcclxuICAgIFwibmV3c3BhcGVyIGljb25cIixcclxuICAgIFwiZmlsbSBpY29uXCIsXHJcbiAgICBcImxpbmUgY2hhcnQgaWNvblwiLFxyXG4gICAgXCJwaG90byBpY29uXCIsXHJcbiAgICBcInBpZSBjaGFydCBpY29uXCIsXHJcbiAgICBcInNvdW5kIGljb25cIlxyXG4gIF0sXHJcblxyXG4gIFwiUG9pbnRlcnNcIjogW1xyXG4gICAgXCJhbmdsZSBkb3VibGUgZG93biBpY29uXCIsXHJcbiAgICBcImFuZ2xlIGRvdWJsZSBsZWZ0IGljb25cIixcclxuICAgIFwiYW5nbGUgZG91YmxlIHJpZ2h0IGljb25cIixcclxuICAgIFwiYW5nbGUgZG91YmxlIHVwIGljb25cIixcclxuICAgIFwiYW5nbGUgZG93biBpY29uXCIsXHJcbiAgICBcImFuZ2xlIGxlZnQgaWNvblwiLFxyXG4gICAgXCJhbmdsZSByaWdodCBpY29uXCIsXHJcbiAgICBcImFuZ2xlIHVwIGljb25cIixcclxuICAgIFwiYXJyb3cgY2lyY2xlIGRvd24gaWNvblwiLFxyXG4gICAgXCJhcnJvdyBjaXJjbGUgbGVmdCBpY29uXCIsXHJcbiAgICBcImFycm93IGNpcmNsZSBvdXRsaW5lIGRvd24gaWNvblwiLFxyXG4gICAgXCJhcnJvdyBjaXJjbGUgb3V0bGluZSBsZWZ0IGljb25cIixcclxuICAgIFwiYXJyb3cgY2lyY2xlIG91dGxpbmUgcmlnaHQgaWNvblwiLFxyXG4gICAgXCJhcnJvdyBjaXJjbGUgb3V0bGluZSB1cCBpY29uXCIsXHJcbiAgICBcImFycm93IGNpcmNsZSByaWdodCBpY29uXCIsXHJcbiAgICBcImFycm93IGNpcmNsZSB1cCBpY29uXCIsXHJcbiAgICBcImFycm93IGRvd24gaWNvblwiLFxyXG4gICAgXCJhcnJvdyBsZWZ0IGljb25cIixcclxuICAgIFwiYXJyb3cgcmlnaHQgaWNvblwiLFxyXG4gICAgXCJhcnJvdyB1cCBpY29uXCIsXHJcbiAgICBcImNhcmV0IGRvd24gaWNvblwiLFxyXG4gICAgXCJjYXJldCBsZWZ0IGljb25cIixcclxuICAgIFwiY2FyZXQgcmlnaHQgaWNvblwiLFxyXG4gICAgXCJjYXJldCB1cCBpY29uXCIsXHJcbiAgICBcImNoZXZyb24gY2lyY2xlIGRvd24gaWNvblwiLFxyXG4gICAgXCJjaGV2cm9uIGNpcmNsZSBsZWZ0IGljb25cIixcclxuICAgIFwiY2hldnJvbiBjaXJjbGUgcmlnaHQgaWNvblwiLFxyXG4gICAgXCJjaGV2cm9uIGNpcmNsZSB1cCBpY29uXCIsXHJcbiAgICBcImNoZXZyb24gZG93biBpY29uXCIsXHJcbiAgICBcImNoZXZyb24gbGVmdCBpY29uXCIsXHJcbiAgICBcImNoZXZyb24gcmlnaHQgaWNvblwiLFxyXG4gICAgXCJjaGV2cm9uIHVwIGljb25cIixcclxuICAgIFwibG9uZyBhcnJvdyBkb3duIGljb25cIixcclxuICAgIFwibG9uZyBhcnJvdyBsZWZ0IGljb25cIixcclxuICAgIFwibG9uZyBhcnJvdyByaWdodCBpY29uXCIsXHJcbiAgICBcImxvbmcgYXJyb3cgdXAgaWNvblwiLFxyXG4gICAgXCJwb2ludGluZyBkb3duIGljb25cIixcclxuICAgIFwicG9pbnRpbmcgbGVmdCBpY29uXCIsXHJcbiAgICBcInBvaW50aW5nIHJpZ2h0IGljb25cIixcclxuICAgIFwicG9pbnRpbmcgdXAgaWNvblwiLFxyXG4gICAgXCJ0b2dnbGUgZG93biBpY29uXCIsXHJcbiAgICBcInRvZ2dsZSBsZWZ0IGljb25cIixcclxuICAgIFwidG9nZ2xlIHJpZ2h0IGljb25cIixcclxuICAgIFwidG9nZ2xlIHVwIGljb25cIlxyXG4gIF0sXHJcblxyXG4gIFwiQ29tcHV0ZXIgYW5kIEZpbGUgU3lzdGVtXCI6IFtcclxuICAgIFwiZGVza3RvcCBpY29uXCIsXHJcbiAgICBcImRpc2sgb3V0bGluZSBpY29uXCIsXHJcbiAgICBcImZpbGUgYXJjaGl2ZSBvdXRsaW5lIGljb25cIixcclxuICAgIFwiZmlsZSBhdWRpbyBvdXRsaW5lIGljb25cIixcclxuICAgIFwiZmlsZSBjb2RlIG91dGxpbmUgaWNvblwiLFxyXG4gICAgXCJmaWxlIGV4Y2VsIG91dGxpbmUgaWNvblwiLFxyXG4gICAgXCJmaWxlIGljb25cIixcclxuICAgIFwiZmlsZSBpbWFnZSBvdXRsaW5lIGljb25cIixcclxuICAgIFwiZmlsZSBvdXRsaW5lIGljb25cIixcclxuICAgIFwiZmlsZSBwZGYgb3V0bGluZSBpY29uXCIsXHJcbiAgICBcImZpbGUgcG93ZXJwb2ludCBvdXRsaW5lIGljb25cIixcclxuICAgIFwiZmlsZSB0ZXh0IGljb25cIixcclxuICAgIFwiZmlsZSB0ZXh0IG91dGxpbmUgaWNvblwiLFxyXG4gICAgXCJmaWxlIHZpZGVvIG91dGxpbmUgaWNvblwiLFxyXG4gICAgXCJmaWxlIHdvcmQgb3V0bGluZSBpY29uXCIsXHJcbiAgICBcImZvbGRlciBpY29uXCIsXHJcbiAgICBcImZvbGRlciBvcGVuIGljb25cIixcclxuICAgIFwiZm9sZGVyIG9wZW4gb3V0bGluZSBpY29uXCIsXHJcbiAgICBcImZvbGRlciBvdXRsaW5lIGljb25cIixcclxuICAgIFwiZ2FtZSBpY29uXCIsXHJcbiAgICBcImtleWJvYXJkIGljb25cIixcclxuICAgIFwibGFwdG9wIGljb25cIixcclxuICAgIFwibGV2ZWwgZG93biBpY29uXCIsXHJcbiAgICBcImxldmVsIHVwIGljb25cIixcclxuICAgIFwibW9iaWxlIGljb25cIixcclxuICAgIFwicG93ZXIgaWNvblwiLFxyXG4gICAgXCJwbHVnIGljb25cIixcclxuICAgIFwidGFibGV0IGljb25cIixcclxuICAgIFwidHJhc2ggaWNvblwiLFxyXG4gICAgXCJ0cmFzaCBvdXRsaW5lIGljb25cIlxyXG4gIF0sXHJcblxyXG4gIFwiVGVjaG5vbG9naWVzXCI6IFtcclxuICAgIFwiYmFyY29kZSBpY29uXCIsXHJcbiAgICBcImNzczMgaWNvblwiLFxyXG4gICAgXCJkYXRhYmFzZSBpY29uXCIsXHJcbiAgICBcImZvcmsgaWNvblwiLFxyXG4gICAgXCJodG1sNSBpY29uXCIsXHJcbiAgICBcIm9wZW5pZCBpY29uXCIsXHJcbiAgICBcInFyY29kZSBpY29uXCIsXHJcbiAgICBcInJzcyBpY29uXCIsXHJcbiAgICBcInJzcyBzcXVhcmUgaWNvblwiLFxyXG4gICAgXCJzZXJ2ZXIgaWNvblwiXHJcbiAgXSxcclxuXHJcbiAgXCJSYXRpbmdcIjogW1xyXG4gICAgXCJlbXB0eSBoZWFydCBpY29uXCIsXHJcbiAgICBcImVtcHR5IHN0YXIgaWNvblwiLFxyXG4gICAgXCJmcm93biBpY29uXCIsXHJcbiAgICBcImhlYXJ0IGljb25cIixcclxuICAgIFwibWVoIGljb25cIixcclxuICAgIFwic21pbGUgaWNvblwiLFxyXG4gICAgXCJzdGFyIGhhbGYgZW1wdHkgaWNvblwiLFxyXG4gICAgXCJzdGFyIGhhbGYgaWNvblwiLFxyXG4gICAgXCJzdGFyIGljb25cIixcclxuICAgIFwidGh1bWJzIGRvd24gaWNvblwiLFxyXG4gICAgXCJ0aHVtYnMgb3V0bGluZSBkb3duIGljb25cIixcclxuICAgIFwidGh1bWJzIG91dGxpbmUgdXAgaWNvblwiLFxyXG4gICAgXCJ0aHVtYnMgdXAgaWNvblwiXHJcbiAgXSxcclxuXHJcbiAgXCJBdWRpb1wiOiBbXHJcbiAgICBcImJhY2t3YXJkIGljb25cIixcclxuICAgIFwiZWplY3QgaWNvblwiLFxyXG4gICAgXCJmYXN0IGJhY2t3YXJkIGljb25cIixcclxuICAgIFwiZmFzdCBmb3J3YXJkIGljb25cIixcclxuICAgIFwiZm9yd2FyZCBpY29uXCIsXHJcbiAgICBcIm11c2ljIGljb25cIixcclxuICAgIFwibXV0ZSBpY29uXCIsXHJcbiAgICBcInBhdXNlIGljb25cIixcclxuICAgIFwicGxheSBpY29uXCIsXHJcbiAgICBcInJlY29yZCBpY29uXCIsXHJcbiAgICBcInN0ZXAgYmFja3dhcmQgaWNvblwiLFxyXG4gICAgXCJzdGVwIGZvcndhcmQgaWNvblwiLFxyXG4gICAgXCJzdG9wIGljb25cIixcclxuICAgIFwidW5tdXRlIGljb25cIixcclxuICAgIFwidmlkZW8gcGxheSBpY29uXCIsXHJcbiAgICBcInZpZGVvIHBsYXkgb3V0bGluZSBpY29uXCIsXHJcbiAgICBcInZvbHVtZSBkb3duIGljb25cIixcclxuICAgIFwidm9sdW1lIG9mZiBpY29uXCIsXHJcbiAgICBcInZvbHVtZSB1cCBpY29uXCJcclxuICBdLFxyXG5cclxuICBcIk1hcFwiOiBbXHJcbiAgICBcImJ1aWxkaW5nIGljb25cIixcclxuICAgIFwiYnVpbGRpbmcgb3V0bGluZSBpY29uXCIsXHJcbiAgICBcImNhciBpY29uXCIsXHJcbiAgICBcImNvZmZlZSBpY29uXCIsXHJcbiAgICBcImVtZXJnZW5jeSBpY29uXCIsXHJcbiAgICBcImZpcnN0IGFpZCBpY29uXCIsXHJcbiAgICBcImZvb2QgaWNvblwiLFxyXG4gICAgXCJoIGljb25cIixcclxuICAgIFwiaG9zcGl0YWwgaWNvblwiLFxyXG4gICAgXCJsb2NhdGlvbiBhcnJvdyBpY29uXCIsXHJcbiAgICBcIm1hcmtlciBpY29uXCIsXHJcbiAgICBcIm1pbGl0YXJ5IGljb25cIixcclxuICAgIFwicGF3IGljb25cIixcclxuICAgIFwic3BhY2Ugc2h1dHRsZSBpY29uXCIsXHJcbiAgICBcInNwb29uIGljb25cIixcclxuICAgIFwidGF4aSBpY29uXCIsXHJcbiAgICBcInRyZWUgaWNvblwiLFxyXG4gICAgXCJ1bml2ZXJzaXR5IGljb25cIixcclxuICBdLFxyXG5cclxuICBcIlRhYmxlc1wiOiBbXHJcbiAgICBcImNvbHVtbnMgaWNvblwiLFxyXG4gICAgXCJzb3J0IGFscGhhYmV0IGFzY2VuZGluZyBpY29uXCIsXHJcbiAgICBcInNvcnQgYWxwaGFiZXQgZGVzY2VuZGluZyBpY29uXCIsXHJcbiAgICBcInNvcnQgYXNjZW5kaW5nIGljb25cIixcclxuICAgIFwic29ydCBjb250ZW50IGFzY2VuZGluZyBpY29uXCIsXHJcbiAgICBcInNvcnQgY29udGVudCBkZXNjZW5kaW5nIGljb25cIixcclxuICAgIFwic29ydCBkZXNjZW5kaW5nIGljb25cIixcclxuICAgIFwic29ydCBpY29uXCIsXHJcbiAgICBcInNvcnQgbnVtZXJpYyBhc2NlbmRpbmcgaWNvblwiLFxyXG4gICAgXCJzb3J0IG51bWVyaWMgZGVzY2VuZGluZyBpY29uXCIsXHJcbiAgICBcInRhYmxlIGljb25cIlxyXG4gIF0sXHJcblxyXG4gIFwiVGV4dCBFZGl0b3JcIjogW1xyXG4gICAgXCJhbGlnbiBjZW50ZXIgaWNvblwiLFxyXG4gICAgXCJhbGlnbiBqdXN0aWZ5IGljb25cIixcclxuICAgIFwiYWxpZ24gbGVmdCBpY29uXCIsXHJcbiAgICBcImFsaWduIHJpZ2h0IGljb25cIixcclxuICAgIFwiYXR0YWNoIGljb25cIixcclxuICAgIFwiYm9sZCBpY29uXCIsXHJcbiAgICBcImNvcHkgaWNvblwiLFxyXG4gICAgXCJjdXQgaWNvblwiLFxyXG4gICAgXCJmb250IGljb25cIixcclxuICAgIFwiaGVhZGVyIGljb25cIixcclxuICAgIFwiaW5kZW50IGljb25cIixcclxuICAgIFwiaXRhbGljIGljb25cIixcclxuICAgIFwibGlua2lmeSBpY29uXCIsXHJcbiAgICBcImxpc3QgaWNvblwiLFxyXG4gICAgXCJvcmRlcmVkIGxpc3QgaWNvblwiLFxyXG4gICAgXCJvdXRkZW50IGljb25cIixcclxuICAgIFwicGFyYWdyYXBoIGljb25cIixcclxuICAgIFwicGFzdGUgaWNvblwiLFxyXG4gICAgXCJzYXZlIGljb25cIixcclxuICAgIFwic3RyaWtldGhyb3VnaCBpY29uXCIsXHJcbiAgICBcInN1YnNjcmlwdCBpY29uXCIsXHJcbiAgICBcInN1cGVyc2NyaXB0IGljb25cIixcclxuICAgIFwidGV4dCBoZWlnaHQgaWNvblwiLFxyXG4gICAgXCJ0ZXh0IHdpZHRoIGljb25cIixcclxuICAgIFwidW5kZXJsaW5lIGljb25cIixcclxuICAgIFwidW5saW5rIGljb25cIixcclxuICAgIFwidW5vcmRlcmVkIGxpc3QgaWNvblwiXHJcbiAgXSxcclxuXHJcbiAgXCJDdXJyZW5jeVwiOiBbXHJcbiAgICBcImRvbGxhciBpY29uXCIsXHJcbiAgICBcImV1cm8gaWNvblwiLFxyXG4gICAgXCJsaXJhIGljb25cIixcclxuICAgIFwicG91bmQgaWNvblwiLFxyXG4gICAgXCJydWJsZSBpY29uXCIsXHJcbiAgICBcInJ1cGVlIGljb25cIixcclxuICAgIFwid29uIGljb25cIixcclxuICAgIFwic2hla2VsIGljb25cIixcclxuICAgIFwieWVuIGljb25cIlxyXG4gIF0sXHJcblxyXG4gIFwiUGF5bWVudCBPcHRpb25zXCI6IFtcclxuICAgIFwiYW1lcmljYW4gZXhwcmVzcyBpY29uXCIsXHJcbiAgICBcImRpc2NvdmVyIGljb25cIixcclxuICAgIFwiZ29vZ2xlIHdhbGxldCBpY29uXCIsXHJcbiAgICBcIm1hc3RlcmNhcmQgaWNvblwiLFxyXG4gICAgXCJwYXlwYWwgY2FyZCBpY29uXCIsXHJcbiAgICBcInBheXBhbCBpY29uXCIsXHJcbiAgICBcInN0cmlwZSBpY29uXCIsXHJcbiAgICBcInZpc2EgaWNvblwiXHJcbiAgXSxcclxuXHJcbiAgXCJCcmFuZHNcIjogW1xyXG4gICAgXCJhZG4gaWNvblwiLFxyXG4gICAgXCJhbmRyb2lkIGljb25cIixcclxuICAgIFwiYW5nZWxsaXN0IGljb25cIixcclxuICAgIFwiYXBwbGUgaWNvblwiLFxyXG4gICAgXCJiZWhhbmNlIGljb25cIixcclxuICAgIFwiYmVoYW5jZSBzcXVhcmUgaWNvblwiLFxyXG4gICAgXCJiaXRidWNrZXQgaWNvblwiLFxyXG4gICAgXCJiaXRidWNrZXQgc3F1YXJlIGljb25cIixcclxuICAgIFwiYml0Y29pbiBpY29uXCIsXHJcbiAgICBcImJ1eXNlbGxhZHMgaWNvblwiLFxyXG4gICAgXCJjb2RlcGVuIGljb25cIixcclxuICAgIFwiY29ubmVjdGRldmVsb3AgaWNvblwiLFxyXG4gICAgXCJkYXNoY3ViZSBpY29uXCIsXHJcbiAgICBcImRlbGljaW91cyBpY29uXCIsXHJcbiAgICBcImRldmlhbnRhcnQgaWNvblwiLFxyXG4gICAgXCJkaWdnIGljb25cIixcclxuICAgIFwiZHJpYmJibGUgaWNvblwiLFxyXG4gICAgXCJkcm9wYm94IGljb25cIixcclxuICAgIFwiZHJ1cGFsIGljb25cIixcclxuICAgIFwiZW1waXJlIGljb25cIixcclxuICAgIFwiZmFjZWJvb2sgaWNvblwiLFxyXG4gICAgXCJmYWNlYm9vayBzcXVhcmUgaWNvblwiLFxyXG4gICAgXCJmbGlja3IgaWNvblwiLFxyXG4gICAgXCJmb3J1bWJlZSBpY29uXCIsXHJcbiAgICBcImZvdXJzcXVhcmUgaWNvblwiLFxyXG4gICAgXCJnaXQgaWNvblwiLFxyXG4gICAgXCJnaXQgc3F1YXJlIGljb25cIixcclxuICAgIFwiZ2l0aHViIGFsdGVybmF0ZSBpY29uXCIsXHJcbiAgICBcImdpdGh1YiBpY29uXCIsXHJcbiAgICBcImdpdGh1YiBzcXVhcmUgaWNvblwiLFxyXG4gICAgXCJnaXR0aXAgaWNvblwiLFxyXG4gICAgXCJnb29nbGUgaWNvblwiLFxyXG4gICAgXCJnb29nbGUgcGx1cyBpY29uXCIsXHJcbiAgICBcImdvb2dsZSBwbHVzIHNxdWFyZSBpY29uXCIsXHJcbiAgICBcImhhY2tlciBuZXdzIGljb25cIixcclxuICAgIFwiaW5zdGFncmFtIGljb25cIixcclxuICAgIFwiaW94aG9zdCBpY29uXCIsXHJcbiAgICBcImpvb21sYSBpY29uXCIsXHJcbiAgICBcImpzZmlkZGxlIGljb25cIixcclxuICAgIFwibGFzdGZtIGljb25cIixcclxuICAgIFwibGFzdGZtIHNxdWFyZSBpY29uXCIsXHJcbiAgICBcImxlYW5wdWIgaWNvblwiLFxyXG4gICAgXCJsaW5rZWRpbiBpY29uXCIsXHJcbiAgICBcImxpbmtlZGluIHNxdWFyZSBpY29uXCIsXHJcbiAgICBcImxpbnV4IGljb25cIixcclxuICAgIFwibWF4Y2RuIGljb25cIixcclxuICAgIFwibWVhbnBhdGggaWNvblwiLFxyXG4gICAgXCJtZWRpdW0gaWNvblwiLFxyXG4gICAgXCJwYWdlbGluZXMgaWNvblwiLFxyXG4gICAgXCJwaWVkIHBpcGVyIGFsdGVybmF0ZSBpY29uXCIsXHJcbiAgICBcInBpZWQgcGlwZXIgaWNvblwiLFxyXG4gICAgXCJwaW50ZXJlc3QgaWNvblwiLFxyXG4gICAgXCJwaW50ZXJlc3Qgc3F1YXJlIGljb25cIixcclxuICAgIFwicXEgaWNvblwiLFxyXG4gICAgXCJyZWJlbCBpY29uXCIsXHJcbiAgICBcInJlZGRpdCBpY29uXCIsXHJcbiAgICBcInJlZGRpdCBzcXVhcmUgaWNvblwiLFxyXG4gICAgXCJyZW5yZW4gaWNvblwiLFxyXG4gICAgXCJzZWxsc3kgaWNvblwiLFxyXG4gICAgXCJzaGlydHNpbmJ1bGsgaWNvblwiLFxyXG4gICAgXCJzaW1wbHlidWlsdCBpY29uXCIsXHJcbiAgICBcInNreWF0bGFzIGljb25cIixcclxuICAgIFwic2t5cGUgaWNvblwiLFxyXG4gICAgXCJzbGFjayBpY29uXCIsXHJcbiAgICBcInNsaWRlc2hhcmUgaWNvblwiLFxyXG4gICAgXCJzb3VuZGNsb3VkIGljb25cIixcclxuICAgIFwic3BvdGlmeSBpY29uXCIsXHJcbiAgICBcInN0YWNrIGV4Y2hhbmdlIGljb25cIixcclxuICAgIFwic3RhY2sgb3ZlcmZsb3cgaWNvblwiLFxyXG4gICAgXCJzdGVhbSBpY29uXCIsXHJcbiAgICBcInN0ZWFtIHNxdWFyZSBpY29uXCIsXHJcbiAgICBcInN0dW1ibGV1cG9uIGNpcmNsZSBpY29uXCIsXHJcbiAgICBcInN0dW1ibGV1cG9uIGljb25cIixcclxuICAgIFwidGVuY2VudCB3ZWlibyBpY29uXCIsXHJcbiAgICBcInRyZWxsbyBpY29uXCIsXHJcbiAgICBcInR1bWJsciBpY29uXCIsXHJcbiAgICBcInR1bWJsciBzcXVhcmUgaWNvblwiLFxyXG4gICAgXCJ0d2l0Y2ggaWNvblwiLFxyXG4gICAgXCJ0d2l0dGVyIGljb25cIixcclxuICAgIFwidHdpdHRlciBzcXVhcmUgaWNvblwiLFxyXG4gICAgXCJ2aWFjb2luIGljb25cIixcclxuICAgIFwidmltZW8gaWNvblwiLFxyXG4gICAgXCJ2aW5lIGljb25cIixcclxuICAgIFwidmsgaWNvblwiLFxyXG4gICAgXCJ3ZWNoYXQgaWNvblwiLFxyXG4gICAgXCJ3ZWlibyBpY29uXCIsXHJcbiAgICBcIndoYXRzYXBwIGljb25cIixcclxuICAgIFwid2luZG93cyBpY29uXCIsXHJcbiAgICBcIndvcmRwcmVzcyBpY29uXCIsXHJcbiAgICBcInhpbmcgaWNvblwiLFxyXG4gICAgXCJ4aW5nIHNxdWFyZSBpY29uXCIsXHJcbiAgICBcInlhaG9vIGljb25cIixcclxuICAgIFwieWVscCBpY29uXCIsXHJcbiAgICBcInlvdXR1YmUgaWNvblwiLFxyXG4gICAgXCJ5b3V0dWJlIHBsYXkgaWNvblwiLFxyXG4gICAgXCJ5b3V0dWJlIHNxdWFyZSBpY29uXCJcclxuICBdXHJcbn07XHJcblxyXG4vKlxyXG5jb25zdCBNRVNTQUdFX0lDT05TID0gW1xyXG4gIFwiYW5ub3VuY2VtZW50IGljb25cIixcclxuLy8gIFwiYmlydGhkYXkgaWNvblwiLFxyXG4gIFwiaGVscCBpY29uXCIsXHJcbiAgXCJoZWxwIGNpcmNsZSBpY29uXCIsXHJcbiAgXCJpbmZvIGljb25cIixcclxuICBcImluZm8gY2lyY2xlIGljb25cIixcclxuICBcIndhcm5pbmcgaWNvblwiLFxyXG4gIFwid2FybmluZyBjaXJjbGUgaWNvblwiLFxyXG4gIFwid2FybmluZyBzaWduIGljb25cIlxyXG5dO1xyXG5cclxuY29uc3QgSVRFTVNFTEVDVElPTlNfSUNPTlMgPSBbXHJcbiAgXCJhZGQgY2lyY2xlIGljb25cIixcclxuICBcImFkZCBzcXVhcmUgaWNvblwiLFxyXG4gIFwiY2hlY2sgY2lyY2xlIGljb25cIixcclxuICBcImNoZWNrIGNpcmNsZSBvdXRsaW5lIGljb25cIixcclxuICBcImNoZWNrIHNxdWFyZSBpY29uXCIsXHJcbiAgXCJjaGVja21hcmsgYm94IGljb25cIixcclxuICBcImNoZWNrbWFyayBpY29uXCIsXHJcbiAgXCJtaW51cyBjaXJjbGUgaWNvblwiLFxyXG4gIFwibWludXMgaWNvblwiLFxyXG4gIFwibWludXMgc3F1YXJlIGljb25cIixcclxuICBcIm1pbnVzIHNxdWFyZSBvdXRsaW5lIGljb25cIixcclxuICBcIm1vdmUgaWNvblwiLFxyXG4gIFwicGx1cyBpY29uXCIsXHJcbiAgXCJwbHVzIHNxdWFyZSBvdXRsaW5lIGljb25cIixcclxuICBcInJhZGlvIGljb25cIixcclxuICBcInJlbW92ZSBjaXJjbGUgaWNvblwiLFxyXG4gIFwicmVtb3ZlIGNpcmNsZSBvdXRsaW5lIGljb25cIixcclxuICBcInJlbW92ZSBpY29uXCIsXHJcbiAgXCJzZWxlY3RlZCByYWRpbyBpY29uXCIsXHJcbiAgXCJ0b2dnbGUgb2ZmIGljb25cIixcclxuICBcInRvZ2dsZSBvbiBpY29uXCJcclxuXTtcclxuXHJcbmNvbnN0IFBPSU5URVJTX0lDT05TID0gW1xyXG4gIFwiYW5nbGUgZG91YmxlIGRvd24gaWNvblwiLFxyXG4gIFwiYW5nbGUgZG91YmxlIGxlZnQgaWNvblwiLFxyXG4gIFwiYW5nbGUgZG91YmxlIHJpZ2h0IGljb25cIixcclxuICBcImFuZ2xlIGRvdWJsZSB1cCBpY29uXCIsXHJcbiAgXCJhbmdsZSBkb3duIGljb25cIixcclxuICBcImFuZ2xlIGxlZnQgaWNvblwiLFxyXG4gIFwiYW5nbGUgcmlnaHQgaWNvblwiLFxyXG4gIFwiYW5nbGUgdXAgaWNvblwiLFxyXG4gIFwiYXJyb3cgY2lyY2xlIGRvd24gaWNvblwiLFxyXG4gIFwiYXJyb3cgY2lyY2xlIGxlZnQgaWNvblwiLFxyXG4gIFwiYXJyb3cgY2lyY2xlIG91dGxpbmUgZG93biBpY29uXCIsXHJcbiAgXCJhcnJvdyBjaXJjbGUgb3V0bGluZSBsZWZ0IGljb25cIixcclxuICBcImFycm93IGNpcmNsZSBvdXRsaW5lIHJpZ2h0IGljb25cIixcclxuICBcImFycm93IGNpcmNsZSBvdXRsaW5lIHVwIGljb25cIixcclxuICBcImFycm93IGNpcmNsZSByaWdodCBpY29uXCIsXHJcbiAgXCJhcnJvdyBjaXJjbGUgdXAgaWNvblwiLFxyXG4gIFwiYXJyb3cgZG93biBpY29uXCIsXHJcbiAgXCJhcnJvdyBsZWZ0IGljb25cIixcclxuICBcImFycm93IHJpZ2h0IGljb25cIixcclxuICBcImFycm93IHVwIGljb25cIixcclxuICBcImNhcmV0IGRvd24gaWNvblwiLFxyXG4gIFwiY2FyZXQgbGVmdCBpY29uXCIsXHJcbiAgXCJjYXJldCByaWdodCBpY29uXCIsXHJcbiAgXCJjYXJldCB1cCBpY29uXCIsXHJcbiAgXCJjaGV2cm9uIGNpcmNsZSBkb3duIGljb25cIixcclxuICBcImNoZXZyb24gY2lyY2xlIGxlZnQgaWNvblwiLFxyXG4gIFwiY2hldnJvbiBjaXJjbGUgcmlnaHQgaWNvblwiLFxyXG4gIFwiY2hldnJvbiBjaXJjbGUgdXAgaWNvblwiLFxyXG4gIFwiY2hldnJvbiBkb3duIGljb25cIixcclxuICBcImNoZXZyb24gbGVmdCBpY29uXCIsXHJcbiAgXCJjaGV2cm9uIHJpZ2h0IGljb25cIixcclxuICBcImNoZXZyb24gdXAgaWNvblwiLFxyXG5dO1xyXG5cclxuY29uc3QgUkFUSU5HU19JQ09OUyA9IFtcclxuICBcImVtcHR5IGhlYXJ0IGljb25cIixcclxuICBcImVtcHR5IHN0YXIgaWNvblwiLFxyXG4gIFwiZnJvd24gaWNvblwiLFxyXG4gIFwiaGVhcnQgaWNvblwiLFxyXG4gIFwibWVoIGljb25cIixcclxuICBcInNtaWxlIGljb25cIixcclxuICBcInN0YXIgaGFsZiBlbXB0eSBpY29uXCIsXHJcbiAgXCJzdGFyIGhhbGYgaWNvblwiLFxyXG4gIFwic3RhciBpY29uXCIsXHJcbiAgXCJ0aHVtYnMgZG93biBpY29uXCIsXHJcbiAgXCJ0aHVtYnMgb3V0bGluZSBkb3duIGljb25cIixcclxuICBcInRodW1icyBvdXRsaW5lIHVwIGljb25cIixcclxuICBcInRodW1icyB1cCBpY29uXCIsXHJcbl07XHJcblxyXG5jb25zdCBDVVJSRU5DWV9JQ09OUyA9IFtcclxuICBcImRvbGxhciBpY29uXCIsXHJcbiAgXCJldXJvIGljb25cIixcclxuICBcImxpcmEgaWNvblwiLFxyXG4gIFwicG91bmQgaWNvblwiLFxyXG4gIFwicnVibGUgaWNvblwiLFxyXG4gIFwicnVwZWUgaWNvblwiLFxyXG4gIFwid29uIGljb25cIixcclxuICBcInNoZWtlbCBpY29uXCIsXHJcbiAgXCJ5ZW4gaWNvblwiLFxyXG5dO1xyXG5cclxuY29uc3QgU0hBUEVTX0lDT05TID0gW1xyXG4gIFwiYXN0ZXJpc2sgaWNvblwiLFxyXG4gIFwiY2VydGlmaWNhdGUgaWNvblwiLFxyXG4gIFwiY2lyY2xlIGljb25cIixcclxuICBcImNpcmNsZSBub3RjaGVkIGljb25cIixcclxuICBcImNpcmNsZSB0aGluIGljb25cIixcclxuICBcImNyb3NzaGFpcnMgaWNvblwiLFxyXG4gIFwiY3ViZSBpY29uXCIsXHJcbiAgXCJjdWJlcyBpY29uXCIsXHJcbiAgXCJlbGxpcHNpcyBob3Jpem9udGFsIGljb25cIixcclxuICBcImVsbGlwc2lzIHZlcnRpY2FsIGljb25cIixcclxuICBcInF1b3RlIGxlZnQgaWNvblwiLFxyXG4gIFwicXVvdGUgcmlnaHQgaWNvblwiLFxyXG4gIFwic3Bpbm5lciBpY29uXCIsXHJcbiAgXCJzcXVhcmUgaWNvblwiLFxyXG4gIFwic3F1YXJlIG91dGxpbmUgaWNvblwiLFxyXG5dO1xyXG5cclxuY29uc3QgV0VCQ09OVEVOVF9JQ09OUyA9IFtcclxuICBcImFkanVzdCBpY29uXCIsXHJcbiAgXCJhZGQgdXNlciBpY29uXCIsXHJcbiAgXCJhZGQgdG8gY2FydCBpY29uXCIsXHJcbiAgXCJhcmNoaXZlIGljb25cIixcclxuICBcImJhbiBpY29uXCIsXHJcbiAgXCJib29rbWFyayBpY29uXCIsXHJcbiAgXCJjYWxsIGljb25cIixcclxuICBcImNhbGwgc3F1YXJlIGljb25cIixcclxuICBcImNsb3VkIGRvd25sb2FkIGljb25cIixcclxuICBcImNsb3VkIHVwbG9hZCBpY29uXCIsXHJcbiAgXCJjb21wcmVzcyBpY29uXCIsXHJcbiAgXCJjb25maWd1cmUgaWNvblwiLFxyXG4gIFwiZG93bmxvYWQgaWNvblwiLFxyXG4gIFwiZWRpdCBpY29uXCIsXHJcbiAgXCJlcmFzZSBpY29uXCIsXHJcbiAgXCJleGNoYW5nZSBpY29uXCIsXHJcbiAgXCJleHRlcm5hbCBzaGFyZSBpY29uXCIsXHJcbiAgXCJleHBhbmQgaWNvblwiLFxyXG4gIFwiZmlsdGVyIGljb25cIixcclxuICBcImZsYWcgaWNvblwiLFxyXG4gIFwiZmxhZyBvdXRsaW5lIGljb25cIixcclxuICBcImZvcndhcmQgbWFpbCBpY29uXCIsXHJcbiAgXCJoaWRlIGljb25cIixcclxuICBcImluIGNhcnQgaWNvblwiLFxyXG4gIFwibG9jayBpY29uXCIsXHJcbiAgXCJwaW4gaWNvblwiLFxyXG4gIFwicHJpbnQgaWNvblwiLFxyXG4gIFwicmFuZG9tIGljb25cIixcclxuICBcInJlY3ljbGUgaWNvblwiLFxyXG4gIFwicmVmcmVzaCBpY29uXCIsXHJcbiAgXCJyZW1vdmUgYm9va21hcmsgaWNvblwiLFxyXG4gIFwicmVtb3ZlIHVzZXIgaWNvblwiLFxyXG4gIFwicmVwZWF0IGljb25cIixcclxuICBcInJlcGx5IGFsbCBpY29uXCIsXHJcbiAgXCJyZXBseSBpY29uXCIsXHJcbiAgXCJyZXR3ZWV0IGljb25cIixcclxuICBcInNlbmQgaWNvblwiLFxyXG4gIFwic2VuZCBvdXRsaW5lIGljb25cIixcclxuICBcInNoYXJlIGFsdGVybmF0ZSBpY29uXCIsXHJcbiAgXCJzaGFyZSBhbHRlcm5hdGUgc3F1YXJlIGljb25cIixcclxuICBcInNoYXJlIGljb25cIixcclxuICBcInNoYXJlIHNxdWFyZSBpY29uXCIsXHJcbiAgXCJzaWduIGluIGljb25cIixcclxuICBcInNpZ24gb3V0IGljb25cIixcclxuICBcInRoZW1lIGljb25cIixcclxuICBcInRyYW5zbGF0ZSBpY29uXCIsXHJcbiAgXCJ1bmRvIGljb25cIixcclxuICBcInVuaGlkZSBpY29uXCIsXHJcbiAgXCJ1bmxvY2sgYWx0ZXJuYXRlIGljb25cIixcclxuICBcInVubG9jayBpY29uXCIsXHJcbiAgXCJ1cGxvYWQgaWNvblwiLFxyXG4gIFwid2FpdCBpY29uXCIsXHJcbiAgXCJ3aXphcmQgaWNvblwiLFxyXG4gIFwid3JpdGUgaWNvblwiLFxyXG4gIFwid3JpdGUgc3F1YXJlIGljb25cIixcclxuXTtcclxuKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBGVUxMX0lDT05TX1NFVFxyXG4gIC8qXHJcbiAgQUxMX0lDT05TOiBbXVxyXG4gICAgLmNvbmNhdChNRVNTQUdFX0lDT05TKVxyXG4gICAgLmNvbmNhdChJVEVNU0VMRUNUSU9OU19JQ09OUylcclxuICAgIC5jb25jYXQoUE9JTlRFUlNfSUNPTlMpXHJcbiAgICAuY29uY2F0KFJBVElOR1NfSUNPTlMpXHJcbiAgICAuY29uY2F0KENVUlJFTkNZX0lDT05TKVxyXG4gICAgLmNvbmNhdChTSEFQRVNfSUNPTlMpXHJcbiAgICAuY29uY2F0KFdFQkNPTlRFTlRfSUNPTlMpXHJcbiAgICAsXHJcblxyXG4gIE1FU1NBR0VfSUNPTlMsXHJcbiAgSVRFTVNFTEVDVElPTlNfSUNPTlMsXHJcbiAgUE9JTlRFUlNfSUNPTlMsXHJcbiAgU0hBUEVTX0lDT05TXHJcbiAgKi9cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBDOi9Vc2Vycy9uZXJ1c2gvRG9jdW1lbnRzL1FsaWsvU2Vuc2UvRXh0ZW5zaW9ucy9xc1NpbXBsZUtQSS9zcmMvaWNvbnNEZWZpbml0aW9ucy5qc1xuICoqLyIsImNvbnN0IENPTE9SX09QVElPTlMgPSBbXHJcbiAgLy8gUWxpayBjb2xvcnNcclxuICB7XHJcbiAgICB2YWx1ZTogXCIjQjBBRkFFXCIsXHJcbiAgICBsYWJlbDogXCJcIixcclxuICAgIHRvb2x0aXA6IFwiXCJcclxuICB9LFxyXG4gIHtcclxuICAgIHZhbHVlOiBcIiM3QjdBNzhcIixcclxuICAgIGxhYmVsOiBcIlwiLFxyXG4gICAgdG9vbHRpcDogXCJcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgdmFsdWU6IFwiIzU0NTM1MlwiLFxyXG4gICAgbGFiZWw6IFwiXCIsXHJcbiAgICB0b29sdGlwOiBcIlwiXHJcbiAgfSxcclxuICB7XHJcbiAgICB2YWx1ZTogXCIjNDQ3N0FBXCIsXHJcbiAgICBsYWJlbDogXCJcIixcclxuICAgIHRvb2x0aXA6IFwiXCJcclxuICB9LFxyXG4gIHtcclxuICAgIHZhbHVlOiBcIiM3REI4REFcIixcclxuICAgIGxhYmVsOiBcIlwiLFxyXG4gICAgdG9vbHRpcDogXCJcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgdmFsdWU6IFwiI0I2RDdFQVwiLFxyXG4gICAgbGFiZWw6IFwiXCIsXHJcbiAgICB0b29sdGlwOiBcIlwiXHJcbiAgfSxcclxuICB7XHJcbiAgICB2YWx1ZTogXCIjNDZDNjQ2XCIsXHJcbiAgICBsYWJlbDogXCJcIixcclxuICAgIHRvb2x0aXA6IFwiXCJcclxuICB9LFxyXG4gIHtcclxuICAgIHZhbHVlOiBcIiNGOTNGMTdcIixcclxuICAgIGxhYmVsOiBcIlwiLFxyXG4gICAgdG9vbHRpcDogXCJcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgdmFsdWU6IFwiI0ZGQ0YwMlwiLFxyXG4gICAgbGFiZWw6IFwiXCIsXHJcbiAgICB0b29sdGlwOiBcIlwiXHJcbiAgfSxcclxuICB7XHJcbiAgICB2YWx1ZTogXCIjMjc2RTI3XCIsXHJcbiAgICBsYWJlbDogXCJcIixcclxuICAgIHRvb2x0aXA6IFwiXCJcclxuICB9LFxyXG4gIHtcclxuICAgIHZhbHVlOiBcIiNGRkZGRkZcIixcclxuICAgIGxhYmVsOiBcIndoaXRlXCIsXHJcbiAgICB0b29sdGlwOiBcIndoaXRlXCJcclxuICB9LFxyXG4gIHtcclxuICAgIHZhbHVlOiBcIiNkMDE5MTlcIixcclxuICAgIGxhYmVsOiBcInJlZFwiLFxyXG4gICAgdG9vbHRpcDogXCJyZWRcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgdmFsdWU6IFwiI2YyNzExY1wiLFxyXG4gICAgbGFiZWw6IFwib3JhbmdlXCIsXHJcbiAgICB0b29sdGlwOiBcIm9yYW5nZVwiXHJcbiAgfSxcclxuICB7XHJcbiAgICB2YWx1ZTogXCIjZmJiZDA4XCIsXHJcbiAgICBsYWJlbDogXCJ5ZWxsb3dcIixcclxuICAgIHRvb2x0aXA6IFwieWVsbG93XCJcclxuICB9LFxyXG4gIHtcclxuICAgIHZhbHVlOiBcIiNiNWNjMThcIixcclxuICAgIGxhYmVsOiBcIm9saXZlXCIsXHJcbiAgICB0b29sdGlwOiBcIm9saXZlXCJcclxuICB9LFxyXG4gIHtcclxuICAgIHZhbHVlOiBcIiMyMWJhNDVcIixcclxuICAgIGxhYmVsOiBcImdyZWVuXCIsXHJcbiAgICB0b29sdGlwOiBcImdyZWVuXCJcclxuICB9LFxyXG4gIHtcclxuICAgIHZhbHVlOiBcIiMwMDljOTVcIixcclxuICAgIGxhYmVsOiBcInRlYWxcIixcclxuICAgIHRvb2x0aXA6IFwidGVhbFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICB2YWx1ZTogXCIjMjE4NWQwXCIsXHJcbiAgICBsYWJlbDogXCJibHVlXCIsXHJcbiAgICB0b29sdGlwOiBcImJsdWVcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgdmFsdWU6IFwiIzY0MzVjOVwiLFxyXG4gICAgbGFiZWw6IFwidmlvbGV0XCIsXHJcbiAgICB0b29sdGlwOiBcInZpb2xldFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICB2YWx1ZTogXCIjYTMzM2M4XCIsXHJcbiAgICBsYWJlbDogXCJwdXJwbGVcIixcclxuICAgIHRvb2x0aXA6IFwicHVycGxlXCJcclxuICB9LFxyXG4gIHtcclxuICAgIHZhbHVlOiBcIiNlMDM5OTdcIixcclxuICAgIGxhYmVsOiBcInBpbmtcIixcclxuICAgIHRvb2x0aXA6IFwicGlua1wiXHJcbiAgfSxcclxuICB7XHJcbiAgICB2YWx1ZTogXCIjOTc1YjMzXCIsXHJcbiAgICBsYWJlbDogXCJicm93blwiLFxyXG4gICAgdG9vbHRpcDogXCJicm93blwiXHJcbiAgfSxcclxuICB7XHJcbiAgICB2YWx1ZTogXCIjNzY3Njc2XCIsXHJcbiAgICBsYWJlbDogXCJncmV5XCIsXHJcbiAgICB0b29sdGlwOiBcImdyZXlcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgdmFsdWU6IFwiIzFiMWMxZFwiLFxyXG4gICAgbGFiZWw6IFwiYmxhY2tcIixcclxuICAgIHRvb2x0aXA6IFwiYmxhY2tcIlxyXG4gIH1cclxuXTtcclxuXHJcbmNvbnN0IFNJWkVfT1BUSU9OUyA9IFtcclxuICB7XHJcbiAgICB2YWx1ZTogXCJtaW5pXCIsXHJcbiAgICBsYWJlbDogXCJNaW5pXCIsXHJcbiAgICB0b29sdGlwOiBcIk1pbmlcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgdmFsdWU6IFwidGlueVwiLFxyXG4gICAgbGFiZWw6IFwiVGlueVwiLFxyXG4gICAgdG9vbHRpcDogXCJUaW55XCJcclxuICB9LFxyXG4gIHtcclxuICAgIHZhbHVlOiBcInNtYWxsXCIsXHJcbiAgICBsYWJlbDogXCJTbWFsbFwiLFxyXG4gICAgdG9vbHRpcDogXCJTbWFsbFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICB2YWx1ZTogXCJcIixcclxuICAgIGxhYmVsOiBcIk5vcm1hbFwiLFxyXG4gICAgdG9vbHRpcDogXCJOb3JtYWxcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgdmFsdWU6IFwibGFyZ2VcIixcclxuICAgIGxhYmVsOiBcIkxhcmdlXCIsXHJcbiAgICB0b29sdGlwOiBcIkxhcmdlXCJcclxuICB9LFxyXG4gIHtcclxuICAgIHZhbHVlOiBcImh1Z2VcIixcclxuICAgIGxhYmVsOiBcIkh1Z2VcIixcclxuICAgIHRvb2x0aXA6IFwiSHVnZVwiXHJcbiAgfVxyXG5dO1xyXG5cclxuZnVuY3Rpb24gZ2V0U2l6ZUluZGV4KHZhbHVlKSB7XHJcbiAgcmV0dXJuIFNJWkVfT1BUSU9OUy5tYXAoZnVuY3Rpb24oaXRlbSl7XHJcbiAgICByZXR1cm4gaXRlbS52YWx1ZTtcclxuICB9KS5pbmRleE9mKHZhbHVlKVxyXG59XHJcblxyXG5jb25zdCBESVZJREVfQlkgPSBbXHJcbiAgJycsICdvbmUnLCAndHdvJywgJ3RocmVlJywgJ2ZvdXInLCAnZml2ZScsICdzaXgnLCAnc2V2ZW4nLCAnZWlnaHQnLCAnbmluZScsICd0ZW4nXHJcbl07XHJcblxyXG5mdW5jdGlvbiBnZXREaXZpZGVCeVZhbHVlKHZhbHVlKSB7XHJcbiAgdmFyIGRpdnMgPSBESVZJREVfQlkuaW5kZXhPZih2YWx1ZSk7XHJcbiAgaWYoZGl2cyAhPT0gLTEpXHJcbiAgICByZXR1cm4gMTAwIC8gZGl2cztcclxuICBlbHNlXHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxyXG5cclxuY29uc3QgRElNX0xBQkVMX09QVElPTlMgPSBbXHJcbiAge1xyXG4gICAgdmFsdWU6IFwidG9wIGF0dGFjaGVkXCIsXHJcbiAgICBsYWJlbDogXCJ0b3AgYXR0YWNoZWRcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgdmFsdWU6IFwiYm90dG9tIGF0dGFjaGVkXCIsXHJcbiAgICBsYWJlbDogXCJib3R0b20gYXR0YWNoZWRcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgdmFsdWU6IFwidG9wIHJpZ2h0IGF0dGFjaGVkXCIsXHJcbiAgICBsYWJlbDogXCJ0b3AgcmlnaHQgYXR0YWNoZWRcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgdmFsdWU6IFwidG9wIGxlZnQgYXR0YWNoZWRcIixcclxuICAgIGxhYmVsOiBcInRvcCBsZWZ0IGF0dGFjaGVkXCJcclxuICB9LFxyXG4gIHtcclxuICAgIHZhbHVlOiBcImJvdHRvbSBsZWZ0IGF0dGFjaGVkXCIsXHJcbiAgICBsYWJlbDogXCJib3R0b20gbGVmdCBhdHRhY2hlZFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICB2YWx1ZTogXCJib3R0b20gcmlnaHQgYXR0YWNoZWRcIixcclxuICAgIGxhYmVsOiBcImJvdHRvbSByaWdodCBhdHRhY2hlZFwiXHJcbiAgfVxyXG5dO1xyXG5cclxuY29uc3QgRElNX1ZJRVdfT1BUSU9OUyA9IFtcclxuICB7XHJcbiAgICB2YWx1ZTogXCJzZWdtZW50XCIsXHJcbiAgICBsYWJlbDogXCJTZWdtZW50XCJcclxuICB9LFxyXG4gIHtcclxuICAgIHZhbHVlOiBcImNhcmRcIixcclxuICAgIGxhYmVsOiBcIkNhcmRcIlxyXG4gIH1cclxuXTtcclxuXHJcbmNvbnN0IEZPTlRfU0laRV9PUFRJT05TID0gW1xyXG4vLyAgJ3h4LXNtYWxsJywgLy8gdG9vIHNtYWxsXHJcbiAgJ3Mtc21hbGwnLFxyXG4gICdzbWFsbCcsXHJcbiAgJ21lZGl1bScsXHJcbiAgJ2xhcmdlJyxcclxuICAneC1sYXJnZScsXHJcbiAgJ3h4LWxhcmdlJ1xyXG5dO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIENPTE9SX09QVElPTlMsXHJcbiAgU0laRV9PUFRJT05TLFxyXG4gIERJVklERV9CWSxcclxuICBESU1fTEFCRUxfT1BUSU9OUyxcclxuICBESU1fVklFV19PUFRJT05TLFxyXG4gIEZPTlRfU0laRV9PUFRJT05TLFxyXG4gIGdldFNpemVJbmRleCxcclxuICBnZXREaXZpZGVCeVZhbHVlXHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQzovVXNlcnMvbmVydXNoL0RvY3VtZW50cy9RbGlrL1NlbnNlL0V4dGVuc2lvbnMvcXNTaW1wbGVLUEkvc3JjL29wdGlvbnMuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgU3RhdGlzdGljQmxvY2sgZnJvbSAnLi9zdGF0aXN0aWNCbG9jayc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXR1cFBhaW50KHBhcmFtYXRlcnMpIHtcclxuICBjb25zdCBERUZBVUxUX0FVVE9fRk9STUFUID0gJzBBJztcclxuICBsZXQgbnVtYmVyRm9ybWF0dGVyO1xyXG4gIGlmKHBhcmFtYXRlcnMuTnVtYmVyRm9ybWF0dGVyICYmIHBhcmFtYXRlcnMucWxpaykge1xyXG4gICAgbGV0IGxvY2FsZUluZm87XHJcbiAgICB0cnkge1xyXG4gICAgICBsb2NhbGVJbmZvID0gcGFyYW1hdGVycy5xbGlrLmN1cnJBcHAoKS5tb2RlbC5sYXlvdXQucUxvY2FsZUluZm87XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBsZXQgZGVjaW1hbFNlcGFyYXRvciA9IChsb2NhbGVJbmZvICYmIGxvY2FsZUluZm8ucURlY2ltYWxTZXApIHx8IFwiLlwiO1xyXG4gICAgICBsZXQgdGhvdXNhbmRTZXAgPSAobG9jYWxlSW5mbyAmJiBsb2NhbGVJbmZvLnFUaG91c2FuZFNlcCkgfHwgXCIsXCI7XHJcbiAgICAgIG51bWJlckZvcm1hdHRlciA9IG5ldyBOdW1iZXJGb3JtYXR0ZXIobG9jYWxlSW5mbywgREVGQVVMVF9BVVRPX0ZPUk1BVCwgdGhvdXNhbmRTZXAsIGRlY2ltYWxTZXBhcmF0b3IsICdVJyk7IC8vICcnLCAnJywgJ1UnXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZnVuY3Rpb24gcGFpbnQoJGVsZW1lbnQsIGxheW91dCkge1xyXG4gICAgUmVhY3QucmVuZGVyKFxyXG4gICAgICA8U3RhdGlzdGljQmxvY2tcclxuICAgICAgICBrcGlzPXtsYXlvdXQucUh5cGVyQ3ViZX1cclxuICAgICAgICBvcHRpb25zPXt7XHJcbiAgICAgICAgICAuLi5sYXlvdXQub3B0aW9ucyxcclxuICAgICAgICAgIG51bWJlckZvcm1hdHRlcixcclxuICAgICAgICAgIERFRkFVTFRfQVVUT19GT1JNQVRcclxuICAgICAgICB9fVxyXG4gICAgICAgIHNlcnZpY2VzPXt7XHJcbiAgICAgICAgICBSb3V0aW5nOiBwYXJhbWF0ZXJzLlJvdXRpbmcsXHJcbiAgICAgICAgICBTdGF0ZTogcGFyYW1hdGVycy5TdGF0ZVxyXG4gICAgICAgIH19XHJcbiAgICAgICAgZWxlbWVudD17KCRlbGVtZW50KVswXX0vPlxyXG4gICAgICAsKCRlbGVtZW50KVswXVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQzovVXNlcnMvbmVydXNoL0RvY3VtZW50cy9RbGlrL1NlbnNlL0V4dGVuc2lvbnMvcXNTaW1wbGVLUEkvc3JjL3BhaW50LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBSZWFjdDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiUmVhY3RcIlxuICoqIG1vZHVsZSBpZCA9IDY0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IElubGluZUNTUyBmcm9tICdyZWFjdC1pbmxpbmUtY3NzJztcclxuaW1wb3J0IHtESVZJREVfQlksIFNJWkVfT1BUSU9OUywgRk9OVF9TSVpFX09QVElPTlMsIGdldFNpemVJbmRleH0gZnJvbSAnLi9vcHRpb25zJztcclxuaW1wb3J0IFN0YXRpc3RpY0l0ZW0gZnJvbSAnLi9zdGF0aXN0aWNJdGVtJztcclxuXHJcbmNsYXNzIFN0YXRpc3RpY0Jsb2NrIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBzaXplOiBwcm9wcy5vcHRpb25zLnNpemUsXHJcbiAgICAgIGNsaWVudFdpZHRoOiBwcm9wcy5lbGVtZW50LmNsaWVudFdpZHRoLFxyXG4gICAgICBjbGllbnRIZWlnaHQ6IHByb3BzLmVsZW1lbnQuY2xpZW50SGVpZ2h0LFxyXG4gICAgICBvdmVyZmxvdzogbnVsbCxcclxuICAgICAgdmFsdWVGb250U3R5bGVJbmRleDogbnVsbFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudERpZE1vdW50KCl7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7c2VsZi5jaGVja1JlcXVpcmVkU2l6ZSgpO30sIDEwMCk7XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XHJcbiAgICB0aGlzLmNoZWNrUmVxdWlyZWRTaXplKCk7XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xyXG4gICAgdGhpcy5yZXN0b3JlU2l6ZSgpO1xyXG4gIH1cclxuXHJcbiAgcmVzdG9yZVNpemUoKXtcclxuICAgIGxldCBlbGVtZW50Q2xpZW50V2lkdGggPSB0aGlzLnByb3BzLmVsZW1lbnQuY2xpZW50V2lkdGg7XHJcbiAgICBsZXQgZWxlbWVudENsaWVudEhlaWdodCA9IHRoaXMucHJvcHMuZWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcbiAgICBsZXQgc2l6ZSA9IHRoaXMucHJvcHMub3B0aW9ucy5zaXplO1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIHNpemU6IHNpemUsXHJcbiAgICAgIG92ZXJmbG93OiBudWxsLFxyXG4gICAgICBjbGllbnRXaWR0aDogZWxlbWVudENsaWVudFdpZHRoLFxyXG4gICAgICBjbGllbnRIZWlnaHQ6IGVsZW1lbnRDbGllbnRIZWlnaHQsXHJcbiAgICAgIHZhbHVlRm9udFN0eWxlSW5kZXg6IG51bGxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAga3BpSXRlbVJlc2l6ZUhhbmRsZXIoKSB7XHJcbiAgICBpZih0aGlzLnByb3BzLm9wdGlvbnMuYXV0b1NpemUpIHtcclxuICAgICAgbGV0IHNpemUgPSB0aGlzLnN0YXRlLnNpemU7XHJcbiAgICAgIGxldCBpbmRleCA9IGdldFNpemVJbmRleChzaXplKTtcclxuICAgICAgaWYoaW5kZXggPiAwKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICBzaXplOiBTSVpFX09QVElPTlNbaW5kZXggLSAxXS52YWx1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmKHRoaXMuc3RhdGUudmFsdWVGb250U3R5bGVJbmRleClcclxuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlRm9udFN0eWxlSW5kZXg6IHRoaXMuc3RhdGUudmFsdWVGb250U3R5bGVJbmRleCAtIDF9KTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgaWYodGhpcy5zdGF0ZS52YWx1ZUZvbnRTdHlsZUluZGV4ICE9PSAwKVxyXG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWVGb250U3R5bGVJbmRleDogRk9OVF9TSVpFX09QVElPTlMubGVuZ3RoIC0gMX0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjaGVja1JlcXVpcmVkU2l6ZSgpe1xyXG4gICAgbGV0IGVsZW1lbnQgPSB0aGlzLnByb3BzLmVsZW1lbnQ7XHJcbiAgICBsZXQgc2Nyb2xsV2lkdGggPSBlbGVtZW50LnNjcm9sbFdpZHRoICogMC45NTtcclxuICAgIGxldCBzY3JvbGxIZWlnaHQgPSBlbGVtZW50LnNjcm9sbEhlaWdodCAqIDAuOTU7XHJcblxyXG4gICAgaWYodGhpcy5wcm9wcy5vcHRpb25zLmF1dG9TaXplKSB7XHJcbiAgICAgIGxldCBzaXplID0gdGhpcy5zdGF0ZS5zaXplO1xyXG4gICAgICBsZXQgZWxlbWVudENsaWVudFdpZHRoID0gdGhpcy5wcm9wcy5lbGVtZW50LmNsaWVudFdpZHRoO1xyXG4gICAgICBsZXQgZWxlbWVudENsaWVudEhlaWdodCA9IHRoaXMucHJvcHMuZWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcbiAgICAgIGxldCBjbGllbnRXaWR0aCA9IHRoaXMuc3RhdGUuY2xpZW50V2lkdGg7XHJcbiAgICAgIGxldCBjbGllbnRIZWlnaHQgPSB0aGlzLnN0YXRlLmNsaWVudEhlaWdodDtcclxuICAgICAgbGV0IGNoaWxkSGVpZ2h0ID0gMDtcclxuXHJcbiAgICAgIGlmKGVsZW1lbnQuY2xpZW50SGVpZ2h0ID09IGVsZW1lbnQuc2Nyb2xsSGVpZ2h0XHJcbiAgICAgICYmIHRoaXMuc3RhdGUuc2l6ZSA9PSB0aGlzLnByb3BzLm9wdGlvbnMuc2l6ZVxyXG4gICAgICAmJiAhdGhpcy5zdGF0ZS5vdmVyZmxvdykgcmV0dXJuO1xyXG5cclxuICAgICAgaWYodGhpcy5yZWZzWydjaGlsZC0wJ10pIHtcclxuICAgICAgICBjaGlsZEhlaWdodCA9IFJlYWN0LmZpbmRET01Ob2RlKHRoaXMucmVmc1snY2hpbGQtMCddKS5jbGllbnRIZWlnaHQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmKGVsZW1lbnQgJiZcclxuICAgICAgICAoKGVsZW1lbnQuY2xpZW50SGVpZ2h0IDwgc2Nyb2xsSGVpZ2h0XHJcbiAgICAgICAgICB8fCBjaGlsZEhlaWdodCAmJiBlbGVtZW50LmNsaWVudEhlaWdodCA8IGNoaWxkSGVpZ2h0KVxyXG4gICAgICAgIHx8ICgoY2xpZW50V2lkdGggIT0gZWxlbWVudC5jbGllbnRXaWR0aFxyXG4gICAgICAgICAgfHwgY2xpZW50SGVpZ2h0ICE9IGVsZW1lbnQuY2xpZW50SGVpZ2h0KVxyXG4gICAgICAgICAgICYmIHNpemUgIT0gdGhpcy5wcm9wcy5vcHRpb25zLnNpemUpXHJcbiAgICAgICAgKSlcclxuICAgICAge1xyXG4gICAgICAgIGlmKGVsZW1lbnQuY2xpZW50SGVpZ2h0IDwgc2Nyb2xsSGVpZ2h0XHJcbiAgICAgICAgICB8fCBlbGVtZW50LmNsaWVudEhlaWdodCA8IGNoaWxkSGVpZ2h0XHJcbiAgICAgICAgICB8fCBlbGVtZW50LmNsaWVudFdpZHRoIDwgc2Nyb2xsV2lkdGgpIHtcclxuICAgICAgICAgIGlmKHRoaXMuc3RhdGUuc2l6ZSA9PSBTSVpFX09QVElPTlNbMF0udmFsdWVcclxuICAgICAgICAgICYmIHRoaXMuc3RhdGUub3ZlcmZsb3cgPT09IFwiYXV0b1wiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgbGV0IGluZGV4ID0gZ2V0U2l6ZUluZGV4KHNpemUpO1xyXG4gICAgICAgICAgaWYoaW5kZXggPiAwKVxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICBzaXplOiBTSVpFX09QVElPTlNbaW5kZXggLSAxXS52YWx1ZSxcclxuICAgICAgICAgICAgICBjbGllbnRXaWR0aDogZWxlbWVudENsaWVudFdpZHRoLFxyXG4gICAgICAgICAgICAgIGNsaWVudEhlaWdodDogZWxlbWVudENsaWVudEhlaWdodCxcclxuICAgICAgICAgICAgICBwcmV2Q2xpZW50V2lkdGg6IHRoaXMuc3RhdGUuY2xpZW50V2lkdGgsXHJcbiAgICAgICAgICAgICAgcHJldkNsaWVudEhlaWdodDogdGhpcy5zdGF0ZS5jbGllbnRIZWlnaHRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICBlbHNlIGlmKGluZGV4ID09IDApe1xyXG4gICAgICAgICAgICBpZih0aGlzLnN0YXRlLm92ZXJmbG93ICE9PSBcImF1dG9cIilcclxuICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtvdmVyZmxvdzogXCJhdXRvXCJ9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGlmKHRoaXMuc3RhdGUucHJldkNsaWVudFdpZHRoID4gdGhpcy5zdGF0ZS5jbGllbnRXaWR0aFxyXG4gICAgICAgICAgfHwgdGhpcy5zdGF0ZS5wcmV2Q2xpZW50SGVpZ2h0ID4gdGhpcy5zdGF0ZS5jbGllbnRIZWlnaHQpXHJcbiAgICAgICAgICAgIHRoaXMucmVzdG9yZVNpemUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYoKHRoaXMuc3RhdGUub3ZlcmZsb3cgIT09IFwiYXV0b1wiKVxyXG4gICAgICAgICYmIChlbGVtZW50LmNsaWVudEhlaWdodCA8IHNjcm9sbEhlaWdodFxyXG4gICAgICAgICAgfHwgZWxlbWVudC5jbGllbnRXaWR0aCA8IHNjcm9sbFdpZHRoKSlcclxuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe292ZXJmbG93OiBcImF1dG9cIn0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVuZGVyS3BpcyhrcGlzLCByb3dpbmRleCl7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIGNvbnN0IG51bWJlckZvcm1hdHRlciA9IHRoaXMucHJvcHMub3B0aW9ucy5udW1iZXJGb3JtYXR0ZXI7XHJcbiAgICBjb25zdCBsYWJlbE9yaWVudGF0aW9uID0gdGhpcy5wcm9wcy5vcHRpb25zLmxhYmVsT3JpZW50YXRpb247IC8vdGhpcy5zdGF0ZS5sYWJlbE9yaWVudGF0aW9uO1xyXG5cclxuICAgIGxldCBvcHRpb25zID0gdGhpcy5wcm9wcy5vcHRpb25zO1xyXG4gICAgbGV0IHNpemUgPSB0aGlzLnN0YXRlLnNpemU7XHJcblxyXG4gICAgY29uc3QgY3VycmVudFNpemVJbmRleCA9IGdldFNpemVJbmRleChzaXplKTtcclxuICAgIGNvbnN0IG9yaWdpbmFsU2l6ZUluZGV4ID0gZ2V0U2l6ZUluZGV4KHRoaXMucHJvcHMub3B0aW9ucy5zaXplKTtcclxuICAgIGxldCBkZWx0YVNpemVJbmRleCA9IDA7XHJcbiAgICBpZihvcmlnaW5hbFNpemVJbmRleCAhPT0gLTEgJiYgY3VycmVudFNpemVJbmRleCAhPT0gLTEpIHtcclxuICAgICAgZGVsdGFTaXplSW5kZXggPSBvcmlnaW5hbFNpemVJbmRleCAtIGN1cnJlbnRTaXplSW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbWVhc3VyZXNTaGlmdCA9IGtwaXMucURpbWVuc2lvbkluZm8ubGVuZ3RoO1xyXG4gICAgY29uc3QgcU1lYXN1cmVJbmZvID0ga3Bpcy5xTWVhc3VyZUluZm87XHJcbiAgICBsZXQgZGF0YSA9IGtwaXMucURhdGFQYWdlc1swXS5xTWF0cml4Lmxlbmd0aCA+IDAgJiYga3Bpcy5xRGF0YVBhZ2VzWzBdLnFNYXRyaXhbcm93aW5kZXhdO1xyXG4gICAgY29uc3QgZGltZW5zaW9uVmFsdWUgPSBtZWFzdXJlc1NoaWZ0ID4gMCAmJiBkYXRhWzBdLnFUZXh0OyAvLyBmaXJzdCBkaW1lbnNpb24gb25seVxyXG4gICAgcmV0dXJuIHFNZWFzdXJlSW5mby5tYXAoZnVuY3Rpb24oaXRlbSwgbWluZGV4KXtcclxuICAgICAgbGV0IGluZGV4ID0gbWVhc3VyZXNTaGlmdCArIG1pbmRleDtcclxuICAgICAgbGV0IGl0ZW1TaXplID0gaXRlbS5zaXplO1xyXG4gICAgICBpZihkZWx0YVNpemVJbmRleCA+IDApIHtcclxuICAgICAgICBsZXQgaXRlbVNpemVJbmRleCA9IGdldFNpemVJbmRleChpdGVtU2l6ZSk7XHJcbiAgICAgICAgaXRlbVNpemVJbmRleCA9IE1hdGgubWF4KDAsIGRlbHRhU2l6ZUluZGV4ID4gMCA/IGl0ZW1TaXplSW5kZXggLSBkZWx0YVNpemVJbmRleCA6IGl0ZW1TaXplSW5kZXgpO1xyXG4gICAgICAgIGl0ZW1TaXplID0gU0laRV9PUFRJT05TW2l0ZW1TaXplSW5kZXhdLnZhbHVlO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCBwYXJhbXMgPSB7XHJcbiAgICAgICAgbGFiZWw6IGl0ZW0ucUZhbGxiYWNrVGl0bGUsXHJcbiAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgaGlkZUxhYmVsOiBpdGVtLmhpZGVMYWJlbCxcclxuICAgICAgICBsYWJlbENvbG9yOiBpdGVtLmxhYmVsQ29sb3IsXHJcbiAgICAgICAgdmFsdWVDb2xvcjogaXRlbS52YWx1ZUNvbG9yLFxyXG4gICAgICAgIHZhbHVlSWNvbjogaXRlbS52YWx1ZUljb24sXHJcbiAgICAgICAgaWNvblBvc2l0aW9uOiBpdGVtLmljb25Qb3NpdGlvbixcclxuICAgICAgICBpY29uT3JkZXI6IGl0ZW0uaWNvbk9yZGVyLFxyXG4gICAgICAgIGljb25TaXplOiBpdGVtLmljb25TaXplLFxyXG4gICAgICAgIG92UGFyYW1zOiBpdGVtLm92UGFyYW1zLFxyXG4gICAgICAgIHNpemU6IGl0ZW0ub3ZQYXJhbXMgPyBpdGVtU2l6ZSA6IHNpemUsXHJcbiAgICAgICAgbGFiZWxPcmRlcjogaXRlbS5vdlBhcmFtcyA/IGl0ZW0ubGFiZWxPcmRlciA6IG9wdGlvbnMubGFiZWxPcmRlcixcclxuICAgICAgICBsYWJlbE9yaWVudGF0aW9uOiBpdGVtLm92UGFyYW1zID8gaXRlbS5sYWJlbE9yaWVudGF0aW9uIDogbGFiZWxPcmllbnRhdGlvbixcclxuICAgICAgICBmb250U3R5bGVzOiB7fSxcclxuICAgICAgICBrcGlMaW5rOiBpdGVtLmtwaUxpbmssXHJcbiAgICAgICAgdXNlTGluazogaXRlbS51c2VMaW5rXHJcbiAgICAgIH07XHJcbiAgICAgIHBhcmFtcy5vbkNsaWNrID0gc2VsZi5vbktQSUNsaWNrLmJpbmQoc2VsZiwgcGFyYW1zKTtcclxuXHJcblxyXG4gICAgICBsZXQgZm9udFN0eWxlcyA9IGl0ZW0uZm9udFN0eWxlcyAmJiBpdGVtLmZvbnRTdHlsZXMuc3BsaXQoJywnKTtcclxuICAgICAgZm9udFN0eWxlcyAmJiBmb250U3R5bGVzLmZvckVhY2goZnVuY3Rpb24odmFsdWUpe1xyXG4gICAgICAgIHBhcmFtcy5mb250U3R5bGVzW3ZhbHVlXSA9IHZhbHVlO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmKHNlbGYuc3RhdGUudmFsdWVGb250U3R5bGVJbmRleCA+PSAwXHJcbiAgICAgICYmIHNlbGYuc3RhdGUudmFsdWVGb250U3R5bGVJbmRleCA8IEZPTlRfU0laRV9PUFRJT05TLmxlbmd0aClcclxuICAgICAgICBwYXJhbXMuZm9udFN0eWxlcy5mb250U2l6ZSA9IEZPTlRfU0laRV9PUFRJT05TW3NlbGYuc3RhdGUudmFsdWVGb250U3R5bGVJbmRleF07XHJcblxyXG4gICAgICBpZihpbmRleCA8IGRhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgcGFyYW1zLnZhbHVlID0gZGF0YVtpbmRleF0ucVRleHQ7XHJcbiAgICAgICAgaWYoaXRlbS5xSXNBdXRvRm9ybWF0ICYmIG51bWJlckZvcm1hdHRlcikge1xyXG4gICAgICAgICAgbGV0IHZhbHVlID0gZGF0YVtpbmRleF0ucU51bTtcclxuICAgICAgICAgIGlmKCFpc05hTih2YWx1ZSkgJiYgaXNGaW5pdGUodmFsdWUpKSB7XHJcbiAgICAgICAgICAgIGlmKGl0ZW0uYXV0b0Zvcm1hdFRlbXBsYXRlKVxyXG4gICAgICAgICAgICAgIHBhcmFtcy52YWx1ZSA9IG51bWJlckZvcm1hdHRlci5mb3JtYXQodmFsdWUsIGl0ZW0uYXV0b0Zvcm1hdFRlbXBsYXRlKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgIHBhcmFtcy52YWx1ZSA9IG51bWJlckZvcm1hdHRlci5mb3JtYXQodmFsdWUsIG9wdGlvbnMuREVGQVVMVF9BVVRPX0ZPUk1BVCk7IC8vZm9ybWF0VmFsdWVcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmKCFpdGVtLmdyb3VwQnlEaW1lbnNpb25cclxuICAgICAgfHwgKGl0ZW0uZ3JvdXBCeURpbWVuc2lvbiAmJiBpdGVtLmdyb3VwQnlEaW1lbnNpb25WYWx1ZSA9PT0gZGltZW5zaW9uVmFsdWUpKSB7XHJcbiAgICAgICAgbGV0IGl0ZW1JbmRleCA9IHJvd2luZGV4ICogKG1lYXN1cmVzU2hpZnQgKyBxTWVhc3VyZUluZm8ubGVuZ3RoKSArIG1pbmRleDtcclxuICAgICAgICByZXR1cm4gPFN0YXRpc3RpY0l0ZW0gcmVmPXtcImNoaWxkLVwiICsgaXRlbUluZGV4fVxyXG4gICAgICAgICAgaW5kZXg9e2l0ZW1JbmRleH1cclxuICAgICAgICAgIGtleT17aXRlbS5jSWR9XHJcbiAgICAgICAgICBpdGVtPXtwYXJhbXN9XHJcbiAgICAgICAgICBvcHRpb25zPXtvcHRpb25zfVxyXG4gICAgICAgICAgb25OZWVkUmVzaXplPXtzZWxmLmtwaUl0ZW1SZXNpemVIYW5kbGVyLmJpbmQoc2VsZil9IC8+XHJcbiAgICAgICAgfVxyXG4gICAgICBlbHNlXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpe1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICBjb25zdCBrcGlzID0gdGhpcy5wcm9wcy5rcGlzO1xyXG4gICAgbGV0IHtcclxuICAgICAgZGltTGFiZWxPcmllbnRhdGlvbixcclxuICAgICAgZGltTGFiZWxTaXplLFxyXG4gICAgICBkaW1IaWRlTGFiZWxzLFxyXG4gICAgICBkaW1DZW50ZXJlZExhYmVscyxcclxuICAgICAgZGltZW5zaW9uc09yaWVudGF0aW9uLFxyXG4gICAgICBkaW1IaWRlQm9yZGVycyxcclxuICAgICAgZGltSGlkZUludGVybmFsQm9yZGVycyxcclxuICAgICAgZGltU2hvd0FzID0gJ3NlZ21lbnQnLFxyXG4gICAgICBkaW1EaXZpZGVCeSA9ICdhdXRvJyxcclxuICAgICAgZGl2aWRlQnksXHJcbiAgICAgIHN0eWxlcyA9ICcnXHJcbiAgICB9ID0gdGhpcy5wcm9wcy5vcHRpb25zO1xyXG5cclxuICAgIGxldCBpdGVtcztcclxuXHJcbiAgICBpZihrcGlzLnFNZWFzdXJlSW5mby5sZW5ndGggPiAwICYmIGtwaXMucURhdGFQYWdlcy5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICBpZihkaXZpZGVCeSA9PT0gXCJhdXRvXCIpXHJcbiAgICAgICAgZGl2aWRlQnkgPSBESVZJREVfQllbTWF0aC5taW4oMTAsIGtwaXMucURhdGFQYWdlc1swXS5xTWF0cml4WzBdLmxlbmd0aCAtIGtwaXMucURpbWVuc2lvbkluZm8ubGVuZ3RoKV07XHJcblxyXG4gICAgICAvLyBEaW1lbnNpb246XHJcbiAgICAgIGlmKGtwaXMucURpbWVuc2lvbkluZm8ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGlmKGRpbURpdmlkZUJ5ID09PSBcImF1dG9cIilcclxuICAgICAgICAgIGRpbURpdmlkZUJ5ID0gRElWSURFX0JZW01hdGgubWluKDEwLCBrcGlzLnFEaW1lbnNpb25JbmZvWzBdLnFDYXJkaW5hbCldO1xyXG5cclxuICAgICAgICBsZXQgZGltU2hvd0FzQ29udGFpbmVyID0gZGltU2hvd0FzID09PSAnY2FyZCcgPyBgJHtkaW1EaXZpZGVCeX0gc3RhY2thYmxlIGNhcmRzYCAgOiAnc2VnbWVudHMnO1xyXG4gICAgICAgIGxldCBkaW1MYWJlbHNBbGlnbm1lbnQgPSAnJztcclxuICAgICAgICBpZihkaW1DZW50ZXJlZExhYmVscykgZGltTGFiZWxzQWxpZ25tZW50ID0gJ2NlbnRlciBhbGlnbmVkJztcclxuICAgICAgICBsZXQgc2VnbWVudHNTdHlsZSA9IHt9OyAvL3ttYXJnaW46IDAsIGhlaWdodDogJzEwMCUnfTtcclxuICAgICAgICBsZXQgc2VnbWVudFN0eWxlID0ge307XHJcbiAgICAgICAgaWYoZGltSGlkZUludGVybmFsQm9yZGVycykgc2VnbWVudFN0eWxlLmJvcmRlciA9IFwiMFwiO1xyXG4gICAgICAgIGlmKGRpbUhpZGVCb3JkZXJzKSB7XHJcbiAgICAgICAgICBzZWdtZW50c1N0eWxlLmJvcmRlciA9IFwiMFwiO1xyXG4gICAgICAgICAgc2VnbWVudHNTdHlsZS5ib3hTaGFkb3cgPSBcIm5vbmVcIjtcclxuICAgICAgICAgIHNlZ21lbnRTdHlsZS5ib3hTaGFkb3cgPSBcIm5vbmVcIjtcclxuICAgICAgICAgIGlmKGRpbVNob3dBcyA9PT0gJ2NhcmQnKSB7XHJcbiAgICAgICAgICAgIHNlZ21lbnRTdHlsZS5ib3JkZXIgPSBcIjBcIjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaXRlbXMgPSAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHVpICR7ZGltZW5zaW9uc09yaWVudGF0aW9ufSAke2RpbVNob3dBc0NvbnRhaW5lcn1gfSBzdHlsZT17c2VnbWVudHNTdHlsZX0+XHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGtwaXMucURhdGFQYWdlc1swXS5xTWF0cml4Lm1hcChmdW5jdGlvbihkaW0sIGRpbmRleCl7XHJcbiAgICAgICAgICAgICAgY29uc3QgZGltZW5zaW9uTGFiZWwgPSBkaW1bMF0ucVRleHQ7IC8vIGNvdWxkIGJlIG9ubHkgb25lIGRpbWVuc2lvbiFcclxuICAgICAgICAgICAgICBsZXQgbWVhc3VyZXMgPSBzZWxmLnJlbmRlcktwaXMoa3BpcywgZGluZGV4KTtcclxuICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgdWkgJHtkaW1TaG93QXN9YH0gc3R5bGU9e3NlZ21lbnRTdHlsZX0+XHJcbiAgICAgICAgICAgICAgICB7ZGltSGlkZUxhYmVscyA/IG51bGwgOiA8YSBjbGFzc05hbWU9e2B1aSAke2RpbUxhYmVsU2l6ZX0gJHtkaW1MYWJlbE9yaWVudGF0aW9ufSAke2RpbUxhYmVsc0FsaWdubWVudH0gbGFiZWxgfT57ZGltZW5zaW9uTGFiZWx9PC9hPn1cclxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPVwic3RhdGlzdGljc1wiIGNsYXNzTmFtZT17YHVpICR7ZGl2aWRlQnl9IHN0YXRpc3RpY3NgfT5cclxuICAgICAgICAgICAgICAgIHttZWFzdXJlc31cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PilcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gJHtzaXplfVxyXG4gICAgICAgIGl0ZW1zID0gKFxyXG4gICAgICAgICAgPGRpdiByZWY9XCJzdGF0aXN0aWNzXCIgY2xhc3NOYW1lPXtgdWkgJHtkaXZpZGVCeX0gc3RhdGlzdGljc2B9PlxyXG4gICAgICAgICAgICB7c2VsZi5yZW5kZXJLcGlzKGtwaXMsIDApfVxyXG4gICAgICAgICAgPC9kaXY+KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBvYmplY3RTdHlsZSA9IHt9O1xyXG4gICAgaWYodGhpcy5zdGF0ZS5vdmVyZmxvdylcclxuICAgICAgb2JqZWN0U3R5bGUub3ZlcmZsb3cgPSB0aGlzLnN0YXRlLm92ZXJmbG93O1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicXYtb2JqZWN0LXFzc3RhdGlzdGljXCIgc3R5bGU9e29iamVjdFN0eWxlfT5cclxuICAgICAgICA8SW5saW5lQ1NTIHN0eWxlc2hlZXQ9e3N0eWxlc30+XHJcbiAgICAgICAgICB7aXRlbXN9XHJcbiAgICAgICAgPC9JbmxpbmVDU1M+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIG9uS1BJQ2xpY2soa3BpKSB7XHJcbiAgICBjb25zdCBzZXJ2aWNlcyA9IHRoaXMucHJvcHMuc2VydmljZXM7XHJcbiAgICBjb25zdCBpc0FsbG93T3BlblNoZWV0ID0gKHRoaXMucHJvcHMuc2VydmljZXMuU3RhdGVcclxuICAgICAgJiYgIXRoaXMucHJvcHMuc2VydmljZXMuU3RhdGUuaXNJbkVkaXRNb2RlKCkpO1xyXG4gICAgaWYoa3BpLnVzZUxpbmsgJiYgaXNBbGxvd09wZW5TaGVldCAmJiBzZXJ2aWNlcy5Sb3V0aW5nKSB7XHJcbiAgICAgIGxldCBsaW5rSWQ7XHJcbiAgICAgIGlmICh0eXBlb2Yoa3BpLmtwaUxpbmspID09PSBcInN0cmluZ1wiKVxyXG4gICAgICAgIGxpbmtJZCA9IGtwaS5rcGlMaW5rXHJcbiAgICAgIGVsc2VcclxuICAgICAgICBsaW5rSWQgPSBrcGkua3BpTGluayAmJiBrcGkua3BpTGluay5pZDtcclxuXHJcbiAgICAgIGlmKGxpbmtJZClcclxuICAgICAgICBzZXJ2aWNlcy5Sb3V0aW5nLmdvVG9TaGVldChsaW5rSWQsICdhbmFseXNpcycpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3RhdGlzdGljQmxvY2s7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEM6L1VzZXJzL25lcnVzaC9Eb2N1bWVudHMvUWxpay9TZW5zZS9FeHRlbnNpb25zL3FzU2ltcGxlS1BJL3NyYy9zdGF0aXN0aWNCbG9jay5qc1xuICoqLyIsIi8qKlxuICogQGNvcHlyaWdodCDCqSAyMDE1LCBSaWNrIFdvbmcuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cbnZhciBSZWFjdCAgICAgID0gcmVxdWlyZShcInJlYWN0XCIpO1xudmFyIGFzc2lnbiAgICAgPSBSZWFjdC5fX3NwcmVhZDtcbnZhciByZWZDb3VudGVyID0gMDtcblxuLyoqXG4gKiBAbW9kdWxlIElubGluZUNzc1xuICovXG52YXIgSW5saW5lQ3NzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRkaXNwbGF5TmFtZTogXCJJbmxpbmVDc3NcIixcblx0cHJvcFR5cGVzOiB7XG5cdFx0bmFtZXNwYWNlOiAgICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0XHRjb21wb25lbnROYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHN0eWxlc2hlZXQ6ICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblx0XHRjbGFzc05hbWU6ICAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHdyYXBwZXI6ICAgICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcblx0fSxcblx0X3RyYW5zZm9ybVNoZWV0OiBmdW5jdGlvbiAoc3R5bGVzaGVldCwgY29tcG9uZW50TmFtZSwgbmFtZXNwYWNlKSB7XG5cdFx0cmV0dXJuIHN0eWxlc2hlZXQuXG5cdFx0XHQvLyBQcmV0dGllciBvdXRwdXQuXG5cdFx0XHRyZXBsYWNlKC99XFxzKi9pZywgJ1xcbn1cXG4nKS5cblx0XHRcdC8vIFJlZ3VsYXIgcnVsZXMgYXJlIG5hbWVzcGFjZWQuXG5cdFx0XHRyZXBsYWNlKFxuXHRcdFx0XHQvKF58e3x9fDt8LClcXHMqKFsmYS16MC05XFwtX1xcLjojXFwoXFwpLD4qXFxzXSspXFxzKihcXHspL2lnLFxuXHRcdFx0XHRmdW5jdGlvbiAobWF0Y2hlZCkge1xuXHRcdFx0XHRcdHJldHVybiBtYXRjaGVkLnJlcGxhY2UobmV3IFJlZ0V4cChjb21wb25lbnROYW1lLCBcImdcIiksIFwiI1wiICsgbmFtZXNwYWNlKTtcblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0fSxcblx0cmVuZGVyOiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIG5hbWVzcGFjZSAgICAgPSB0aGlzLnByb3BzLm5hbWVzcGFjZSB8fCBcIklubGluZUNzcy1cIiArIHJlZkNvdW50ZXIrKztcblx0XHR2YXIgY29tcG9uZW50TmFtZSA9IHRoaXMucHJvcHMuY29tcG9uZW50TmFtZSB8fCBcIiZcIjtcblx0XHR2YXIgc3R5bGVzaGVldCAgICA9IHRoaXMuX3RyYW5zZm9ybVNoZWV0KHRoaXMucHJvcHMuc3R5bGVzaGVldCwgY29tcG9uZW50TmFtZSwgbmFtZXNwYWNlKTtcblx0XHR2YXIgV3JhcHBlciAgICAgICA9IHRoaXMucHJvcHMud3JhcHBlciB8fCBcImRpdlwiO1xuXG5cdFx0dmFyIHdyYXBwZXJQcm9wcyA9IGFzc2lnbih7fSwgdGhpcy5wcm9wcywge1xuXHRcdFx0bmFtZXNwYWNlOiAgICAgdW5kZWZpbmVkLFxuXHRcdFx0Y29tcG9uZW50TmFtZTogdW5kZWZpbmVkLFxuXHRcdFx0c3R5bGVzaGVldDogICAgdW5kZWZpbmVkLFxuXHRcdFx0d3JhcHBlcjogICAgICAgdW5kZWZpbmVkLFxuXHRcdFx0aWQ6ICAgICAgICAgICAgbmFtZXNwYWNlXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcblx0XHRcdFdyYXBwZXIsXG5cdFx0XHR3cmFwcGVyUHJvcHMsXG5cdFx0XHR0aGlzLnByb3BzLmNoaWxkcmVuLFxuXHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcInN0eWxlXCIsIHtcblx0XHRcdFx0c2NvcGVkOiAgICAgICAgICAgICAgICAgIHRydWUsXG5cdFx0XHRcdGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MOiB7X19odG1sOiBzdHlsZXNoZWV0fVxuXHRcdFx0fSlcblx0XHQpO1xuXHR9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbmxpbmVDc3M7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC1pbmxpbmUtY3NzL3NyYy9yZWFjdC1pbmxpbmUtY3NzLmpzXG4gKiogbW9kdWxlIGlkID0gNjZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge2dldERpdmlkZUJ5VmFsdWV9IGZyb20gJy4vb3B0aW9ucyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0aXN0aWNJdGVtIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50RGlkTW91bnQoKXtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtzZWxmLmNoZWNrUmVxdWlyZWRTaXplKCk7fSwgMTAwKTtcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcclxuICAgIHRoaXMuY2hlY2tSZXF1aXJlZFNpemUoKTtcclxuICB9XHJcblxyXG4gIGNoZWNrUmVxdWlyZWRTaXplKCl7XHJcbiAgICBpZighdGhpcy5wcm9wcy5vbk5lZWRSZXNpemUpXHJcbiAgICAgIHJldHVybjtcclxuXHJcbiAgICBsZXQgdmFsdWVFbGVtZW50ID0gUmVhY3QuZmluZERPTU5vZGUodGhpcy5yZWZzWyd2YWx1ZSddKTtcclxuICAgIGlmKHZhbHVlRWxlbWVudC5maXJzdENoaWxkKSB7XHJcbiAgICAgIGxldCB2YWx1ZUNoaWxkID0gdmFsdWVFbGVtZW50LmZpcnN0Q2hpbGQ7XHJcbiAgICAgIGxldCBjaGlsZFdpZHRoID0gJCh2YWx1ZUNoaWxkKS53aWR0aCgpO1xyXG4gICAgICAvL2xldCBjaGlsZEhlaWdodCA9ICQodmFsdWVDaGlsZCkuaGVpZ2h0KCk7XHJcbiAgICAgIGlmKGNoaWxkV2lkdGggPiB2YWx1ZUVsZW1lbnQuY2xpZW50V2lkdGgpIHtcclxuICAgICAgICAgIHRoaXMucHJvcHMub25OZWVkUmVzaXplKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbmRlcigpe1xyXG4gICAgLy9sZXQgc2l6ZSA9IHRoaXMucHJvcHMuaXRlbS5zaXplIHx8IFwiXCI7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMucHJvcHMuaW5kZXg7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGhpZGVMYWJlbCxcclxuICAgICAgbGFiZWxPcmllbnRhdGlvbiA9IFwiXCIsXHJcbiAgICAgIGxhYmVsT3JkZXIsXHJcbiAgICAgIGljb25PcmRlcixcclxuICAgICAgbGFiZWxDb2xvcixcclxuICAgICAgdmFsdWVDb2xvciA9IFwiXCIsXHJcbiAgICAgIHZhbHVlSWNvbixcclxuICAgICAgaWNvblNpemUgPSBcIlwiLFxyXG4gICAgICBzaXplID0gXCJcIixcclxuICAgICAgZm9udFN0eWxlcyxcclxuICAgICAgb25DbGlja1xyXG4gICAgfSA9IHRoaXMucHJvcHMuaXRlbTtcclxuXHJcbiAgICAvL2xldCBsYWJlbE9yZGVyRmlyc3QgPSBsYWJlbE9yZGVyID09PSBcImZpcnN0XCI7XHJcbiAgICAvLyBjb25zdCBoaWRlTGFiZWwgPSB0aGlzLnByb3BzLml0ZW0uaGlkZUxhYmVsO1xyXG4gICAgLy8gY29uc3Qgb25JdGVtQ2xpY2sgPSB0aGlzLnByb3BzLml0ZW0ub25DbGljaztcclxuICAgIC8vbGV0IGxhYmVsT3JpZW50YXRpb24gPSB0aGlzLnByb3BzLml0ZW0ubGFiZWxPcmllbnRhdGlvbiB8fCBcIlwiO1xyXG4gICAgLy9sZXQgbGFiZWxDb2xvciA9IHRoaXMucHJvcHMuaXRlbS5sYWJlbENvbG9yO1xyXG4gICAgLy8gbGV0IHZhbHVlQ29sb3IgPSB0aGlzLnByb3BzLml0ZW0udmFsdWVDb2xvciB8fCBcIlwiO1xyXG4gICAgLy9sZXQgdmFsdWVJY29uID0gdGhpcy5wcm9wcy5pdGVtLnZhbHVlSWNvbiB8fCBcIlwiO1xyXG4gICAgLy8gbGV0IGljb25TaXplID0gdGhpcy5wcm9wcy5pdGVtLmljb25TaXplO1xyXG4gICAgLy8gbGV0IGZvbnRTdHlsZXMgPSB0aGlzLnByb3BzLml0ZW0uZm9udFN0eWxlcztcclxuXHJcbiAgICBsZXQgbGFiZWxTdHlsZXMgPSB7cGFkZGluZzogXCIwcHggNXB4XCJ9O1xyXG4gICAgbGV0IHZhbHVlU3R5bGVzID0ge3BhZGRpbmc6IFwiMHB4IDVweFwiLCBjb2xvcjogdmFsdWVDb2xvcn07XHJcblxyXG4gICAgaWYobGFiZWxDb2xvcilcclxuICAgICAgbGFiZWxTdHlsZXMuY29sb3IgPSBsYWJlbENvbG9yO1xyXG5cclxuICAgIGlmKGZvbnRTdHlsZXMuYm9sZClcclxuICAgICAgdmFsdWVTdHlsZXMuZm9udFdlaWdodCA9ICdib2xkJztcclxuXHJcbiAgICBpZihmb250U3R5bGVzLml0YWxpYylcclxuICAgICAgdmFsdWVTdHlsZXMuZm9udFN0eWxlID0gJ2l0YWxpYyc7XHJcblxyXG4gICAgaWYoZm9udFN0eWxlcy51bmRlcmxpbmUpXHJcbiAgICAgIHZhbHVlU3R5bGVzLnRleHREZWNvcmF0aW9uID0gJ3VuZGVybGluZSc7XHJcblxyXG4gICAgaWYoZm9udFN0eWxlcy5mb250U2l6ZSlcclxuICAgICAgdmFsdWVTdHlsZXMuZm9udFNpemUgPSBmb250U3R5bGVzLmZvbnRTaXplO1xyXG5cclxuICAgICAgLy8gdmFsdWVTdHlsZXMuY29sb3IgPSB2YWx1ZUNvbG9yO1xyXG4gICAgbGV0IGNsYXNzZXMgPSBgdWkgJHtsYWJlbE9yaWVudGF0aW9ufSAke3NpemV9IHN0YXRpc3RpY2A7XHJcbiAgICBjbGFzc2VzID0gY2xhc3Nlcy5zcGxpdChcIiBcIikuZmlsdGVyKGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICByZXR1cm4gaXRlbS50cmltKCkubGVuZ3RoID4gMDtcclxuICAgIH0pLmpvaW4oXCIgXCIpO1xyXG5cclxuICAgIGxldCBpY29uT3JkZXJGaXJzdCA9IGljb25PcmRlciA9PT0gXCJmaXJzdFwiO1xyXG4gICAgbGV0IGxhYmVsQ29tcG9uZW50ID0gaGlkZUxhYmVsID8gbnVsbCA6IChcclxuICAgICAgPGRpdiBrZXk9XCJsYmxcIiBjbGFzc05hbWU9XCJsYWJlbFwiIHN0eWxlPXtsYWJlbFN0eWxlc30+XHJcbiAgICAgICAge2ljb25PcmRlckZpcnN0ICYmIHRoaXMucHJvcHMuaXRlbS5pY29uUG9zaXRpb24gPT09ICdsYWJlbCcgPyA8aSBjbGFzc05hbWU9e2Ake3ZhbHVlSWNvbn0gJHtpY29uU2l6ZX1gfT48L2k+IDogbnVsbH1cclxuICAgICAgICB7dGhpcy5wcm9wcy5pdGVtLmxhYmVsfVxyXG4gICAgICAgIHshaWNvbk9yZGVyRmlyc3QgJiYgdGhpcy5wcm9wcy5pdGVtLmljb25Qb3NpdGlvbiA9PT0gJ2xhYmVsJyA/IDxpIGNsYXNzTmFtZT17YCR7dmFsdWVJY29ufSAke2ljb25TaXplfWB9PjwvaT4gOiBudWxsfVxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcblxyXG4gICAgbGV0IHZhbHVlQ29tcG9uZW50ID0gKFxyXG4gICAgICAgIDxkaXYga2V5PVwidmFsXCIgcmVmPVwidmFsdWVcIiBjbGFzc05hbWU9XCJ2YWx1ZVwiIHN0eWxlPXt2YWx1ZVN0eWxlc30+XHJcbiAgICAgICAgICB7aWNvbk9yZGVyRmlyc3QgJiYgdGhpcy5wcm9wcy5pdGVtLmljb25Qb3NpdGlvbiA9PT0gJ3ZhbHVlJyA/IDxpIGNsYXNzTmFtZT17YCR7dmFsdWVJY29ufSAke2ljb25TaXplfWB9PjwvaT4gOiBudWxsfVxyXG4gICAgICAgICAge3RoaXMucHJvcHMuaXRlbS52YWx1ZX1cclxuICAgICAgICAgIHshaWNvbk9yZGVyRmlyc3QgJiYgdGhpcy5wcm9wcy5pdGVtLmljb25Qb3NpdGlvbiA9PT0gJ3ZhbHVlJyA/IDxpIGNsYXNzTmFtZT17YCR7dmFsdWVJY29ufSAke2ljb25TaXplfWB9PjwvaT4gOiBudWxsfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApO1xyXG5cclxuICAgIGxldCBjb250ZW50ID0gW107XHJcbiAgICBpZihsYWJlbE9yZGVyID09PSBcImZpcnN0XCIpIHtcclxuICAgICAgY29udGVudC5wdXNoKGxhYmVsQ29tcG9uZW50KTtcclxuICAgICAgY29udGVudC5wdXNoKHZhbHVlQ29tcG9uZW50KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnRlbnQucHVzaCh2YWx1ZUNvbXBvbmVudCk7XHJcbiAgICAgIGNvbnRlbnQucHVzaChsYWJlbENvbXBvbmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHN0YXRpc3RpY1N0eWxlcyA9IHt9O1xyXG4gICAgaWYgKG9uQ2xpY2spIHtcclxuICAgICAgc3RhdGlzdGljU3R5bGVzLmN1cnNvciA9IFwicG9pbnRlclwiO1xyXG4gICAgfVxyXG4gICAgLy8gKioqIHBhdGNoIGZvciBpb3MgZGV2aWNlcyAqKipcclxuICAgIGxldCBkaXZQZXJjZW50ID0gZ2V0RGl2aWRlQnlWYWx1ZSh0aGlzLnByb3BzLm9wdGlvbnMuZGl2aWRlQnkpO1xyXG4gICAgaWYoZGl2UGVyY2VudCkge1xyXG4gICAgICBzdGF0aXN0aWNTdHlsZXMud2lkdGggPSBkaXZQZXJjZW50ICsgJyUnO1xyXG4gICAgfVxyXG4gICAgLy8gKioqIHBhdGNoIGZvciBpb3MgZGV2ICoqKlxyXG4gICAgLy8gc3RhdGlzdGljLSR7aW5kZXh9IC0gYWxsb3dzIHRvIHVzZSBjdXN0b20gc3R5bGUgdG8gZWFjaCBtZWFzdXJlcyBlbGVtZW50XHJcbiAgICBsZXQgc3RhdGlzdGljSXRlbSA9IChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9e2BzdGF0aXN0aWMgc3RhdGlzdGljLSR7aW5kZXgrMX1gfVxyXG4gICAgICAgICAgc3R5bGU9e3N0YXRpc3RpY1N0eWxlc31cclxuICAgICAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgdWkgb25lICR7c2l6ZX0gc3RhdGlzdGljc2B9PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXN9PlxyXG4gICAgICAgICAgICB7Y29udGVudH1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIHN0YXRpc3RpY0l0ZW07XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEM6L1VzZXJzL25lcnVzaC9Eb2N1bWVudHMvUWxpay9TZW5zZS9FeHRlbnNpb25zL3FzU2ltcGxlS1BJL3NyYy9zdGF0aXN0aWNJdGVtLmpzXG4gKiovIiwiZnVuY3Rpb24gX2dldFJlZnMoZGF0YSwgcmVmTmFtZSkge1xyXG4gIGxldCByZWYgPSBkYXRhO1xyXG4gIGxldCBuYW1lID0gcmVmTmFtZTtcclxuICBsZXQgcHJvcHMgPSByZWZOYW1lLnNwbGl0KCcuJyk7XHJcbiAgaWYocHJvcHMubGVuZ3RoID4gMCkge1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHByb3BzLmxlbmd0aCAtIDE7ICsraSkge1xyXG4gICAgICBpZihyZWZbcHJvcHNbaV1dKVxyXG4gICAgICAgIHJlZiA9IHJlZltwcm9wc1tpXV07XHJcbiAgICB9XHJcbiAgICBuYW1lID0gcHJvcHNbcHJvcHMubGVuZ3RoIC0gMV07XHJcbiAgfVxyXG4gIHJldHVybiB7cmVmLCBuYW1lfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFJlZlZhbHVlKGRhdGEsIHJlZk5hbWUsIHZhbHVlKSB7XHJcbiAgbGV0IHtyZWYsIG5hbWV9ID0gX2dldFJlZnMoZGF0YSwgcmVmTmFtZSk7XHJcbiAgcmVmW25hbWVdID0gdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRSZWZWYWx1ZShkYXRhLCByZWZOYW1lKSB7XHJcbiAgbGV0IHtyZWYsIG5hbWV9ID0gX2dldFJlZnMoZGF0YSwgcmVmTmFtZSk7XHJcbiAgcmV0dXJuIHJlZltuYW1lXTtcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBDOi9Vc2Vycy9uZXJ1c2gvRG9jdW1lbnRzL1FsaWsvU2Vuc2UvRXh0ZW5zaW9ucy9xc1NpbXBsZUtQSS9zcmMvdXRpbHMuanNcbiAqKi8iLCJpbXBvcnQgeyBnZXRSZWZWYWx1ZSwgc2V0UmVmVmFsdWUgfSBmcm9tICcuL3V0aWxzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIERpYWxvZ0NvbXBvbmVudEZhY3RvcnkoU2hvd1NlcnZpY2UsIGRpYWxvZ09wdGlvbnMpIHtcclxuICBsZXQgZGVmYXVsdENvbXBvbmVudFZpZXcgPSBkaWFsb2dPcHRpb25zLmNvbnRyb2xDb21wb25lbnQgfHxcclxuICBgXHJcbiAgPGJ1dHRvblxyXG4gICAgY2xhc3M9XCJxdWktYnV0dG9uXCJcclxuICAgIHRpdGxlPVwiU2hvdyBkaWFsb2dcIlxyXG4gICAgcXZhLWFjdGl2YXRlPVwic2hvd0RpYWxvZygpXCI+XHJcbiAgICA8aSBjbGFzcz1cInt7aWNvbn19XCIgc3R5bGU9XCJmb250LXNpemU6MThweDtcIj48L2k+XHJcbiAgPC9idXR0b24+XHJcbiAgYDtcclxuICByZXR1cm4ge1xyXG4gICAgdGVtcGxhdGU6XHJcbiAgICBgPGRpdiBjbGFzcz1cInBwLWNvbXBvbmVudCBwcC1idXR0b25ncm91cC1jb21wb25lbnRcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cImxhYmVsXCIgbmctaWY9XCJsYWJlbFwiIG5nLWNsYXNzPVwieyBcXCdkaXNhYmxlZFxcJzogcmVhZE9ubHkgfVwiPlxyXG4gICAgICAgIHt7bGFiZWx9fVxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cInZhbHVlXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInF2LW9iamVjdC1xc3N0YXRpc3RpY1wiIG5nLWlmPVwiIWxvYWRpbmdcIj5cclxuICAgICAgICAke2RlZmF1bHRDb21wb25lbnRWaWV3fVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cInBwLWxvYWRpbmctY29udGFpbmVyXCIgbmctaWY9XCJsb2FkaW5nXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInBwLWxvYWRlciBxdi1sb2FkZXJcIj48L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgbmctaWY9XCJlcnJvck1lc3NhZ2VcIiBjbGFzcz1cInBwLWludmFsaWQgZXJyb3JcIj57e2Vycm9yTWVzc2FnZX19PC9kaXY+XHJcbiAgICA8L2Rpdj5gLFxyXG4gICAgY29udHJvbGxlcjpcclxuICAgICAgW1wiJHNjb3BlXCIsIFwiJGVsZW1lbnRcIiwgZnVuY3Rpb24oYywgZSl7XHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdChjLCBlKSB7XHJcbiAgICAgICAgICBjLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgIGMubG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgICBjLmxhYmVsID0gYy5kZWZpbml0aW9uLmxhYmVsO1xyXG4gICAgICAgICAgYy52YWx1ZSA9IGdldFJlZlZhbHVlKGMuZGF0YSwgYy5kZWZpbml0aW9uLnJlZilcclxuICAgICAgICAgICAgfHwgYy5kZWZpbml0aW9uLmRlZmF1bHRWYWx1ZTtcclxuICAgICAgICAgIGMuaWNvbiA9ICh0eXBlb2YoYy5kZWZpbml0aW9uLmljb24pID09IFwiZnVuY3Rpb25cIiAmJiBjLmRlZmluaXRpb24uaWNvbihjLCBlKSlcclxuICAgICAgICAgICAgfHwgYy5kZWZpbml0aW9uLmljb24gfHwgXCJcIjtcclxuXHJcbiAgICAgICAgICBjLnZpc2libGUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgIGlmKGRpYWxvZ09wdGlvbnNcclxuICAgICAgICAgICAgJiYgZGlhbG9nT3B0aW9ucy5pbml0Q29udGV4dFxyXG4gICAgICAgICAgICAmJiB0eXBlb2YoZGlhbG9nT3B0aW9ucy5pbml0Q29udGV4dCkgPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgIGRpYWxvZ09wdGlvbnMuaW5pdENvbnRleHQoYywgZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5pdChjLCBlKTtcclxuXHJcbiAgICAgICAgYy5jaGFuZ2VWYWx1ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICBjLnZhbHVlID0gdmFsdWU7XHJcblxyXG4gICAgICAgICAgaWYoYy5pc0V4cHJlc3Npb24pIHtcclxuICAgICAgICAgICAgbGV0IHZhbCA9IGdldFJlZlZhbHVlKGMuZGF0YSwgYy5kZWZpbml0aW9uLnJlZik7XHJcbiAgICAgICAgICAgIGlmKHZhbCAmJiB2YWwucVN0cmluZ0V4cHJlc3Npb24gJiYgdmFsLnFTdHJpbmdFeHByZXNzaW9uLnFFeHByKXtcclxuICAgICAgICAgICAgICB2YWwucVN0cmluZ0V4cHJlc3Npb24ucUV4cHIgKz0gYy52YWx1ZTtcclxuICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgc2V0UmVmVmFsdWUoYy5kYXRhLCBjLmRlZmluaXRpb24ucmVmLCBjLnZhbHVlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgc2V0UmVmVmFsdWUoYy5kYXRhLCBjLmRlZmluaXRpb24ucmVmLCB2YWx1ZSk7XHJcblxyXG4gICAgICAgICAgXCJmdW5jdGlvblwiID09IHR5cGVvZiBjLmRlZmluaXRpb24uY2hhbmdlICYmIGMuZGVmaW5pdGlvbi5jaGFuZ2UoYy5kYXRhLCBjLmFyZ3MuaGFuZGxlcik7XHJcbiAgICAgICAgICBzZXRSZWZWYWx1ZShjLmRhdGEsIGMuZGVmaW5pdGlvbi5yZWYsIHZhbHVlKTtcclxuICAgICAgICAgIGMuJGVtaXQoXCJzYXZlUHJvcGVydGllc1wiKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjLiRvbihcImRhdGFjaGFuZ2VkXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIGluaXQoYywgZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNob3coY29tcG9uZW50LCBvcHRpb25zKSB7XHJcbiAgICAgICAgICB2YXIgdGV4dCA9IG9wdGlvbnMudGV4dCxcclxuICAgICAgICAgIGljb24gPSB2b2lkIDAgIT09IG9wdGlvbnMuaWNvbiA/IG9wdGlvbnMuaWNvbiA6IFwiY29nd2hlZWxcIixcclxuICAgICAgICAgIGNvbmZpcm1MYWJlbCA9IG9wdGlvbnMuY29uZmlybSB8fCBcIkNvbW1vbi5PS1wiLFxyXG4gICAgICAgICAgd2lkdGggPSBvcHRpb25zLndpZHRoIHx8IFwiMzIwcHhcIixcclxuICAgICAgICAgIGhlaWdodCA9IG9wdGlvbnMuaGVpZ2h0IHx8IFwiYXV0b1wiLFxyXG4gICAgICAgICAgaW5wdXQgPSB7XHJcbiAgICAgICAgICAgIHRleHQgOiB0ZXh0LFxyXG4gICAgICAgICAgICBoZWFkZXIgOiBvcHRpb25zLmhlYWRlcixcclxuICAgICAgICAgICAgaWNvbiA6IGljb24sXHJcbiAgICAgICAgICAgIGNvbmZpcm1MYWJlbCA6IGNvbmZpcm1MYWJlbCxcclxuICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IGhlaWdodFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIHJldHVybiBTaG93U2VydmljZS5zaG93KGNvbXBvbmVudCwgaW5wdXQpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjLnNob3dEaWFsb2cgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICB2YXIgY29tcG9uZW50ID0ge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlIDogYFxyXG4gICAgICAgICAgICAgIDxxdi1tb2RhbC1kaWFsb2cgcXYtaWQ9XCJteS1jb25maXJtLWRpYWxvZ1wiXHJcbiAgICAgICAgICAgICAgICBxdi1jYW5jZWw9XCJjYW5jZWwoKVwiXHJcbiAgICAgICAgICAgICAgICBxdi1jb25maXJtPVwiY29uZmlybSgpXCI+XHJcbiAgICAgICAgICAgICAgICA8aGVhZGVyIG5nLWlmPVwiaGVhZGVyXCIgY2xhc3M9XCJkbS1oZWFkZXJcIiBxLXRyYW5zbGF0aW9uPVwie3toZWFkZXJ9fVwiPjwvaGVhZGVyPlxyXG4gICAgICAgICAgICAgICAgPG1haW4gY2xhc3M9XCJkbS1tYWluXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJxdi1tdmMtZGlhbG9nLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicXYtbXZjLWRpYWxvZy1pY29uIGljb24te3tpY29ufX1cIiBuZy1zaG93PVwiaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPjxzcGFuIHEtdHJhbnNsYXRpb249XCJ7e3RleHR9fVwiPjwvc3Bhbj48L3A+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6e3t3aWR0aH19O2hlaWdodDp7e2hlaWdodH19XCI+JHtkaWFsb2dPcHRpb25zLmRpYWxvZ0NvbnRlbnQgfHwgXCJcIn08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvbWFpbj5cclxuICAgICAgICAgICAgICAgIDxxdi1jb25maXJtLWNhbmNlbC1mb290ZXIgcXYtY29uZmlybT1cImNvbmZpcm0oKVwiIHF2LWNhbmNlbD1cImNhbmNlbCgpXCIgcXYtY29uZmlybS1sYWJlbD1cInt7JHBhcmVudC5jb25maXJtTGFiZWx9fVwiPjwvcXYtY29uZmlybS1jYW5jZWwtZm9vdGVyPlxyXG4gICAgICAgICAgICAgIDwvcXYtbW9kYWwtZGlhbG9nPmAsXHJcbiAgICAgICAgICAgICAgc2NvcGUgOiB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0IDogXCI9XCIsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXIgOiBcIj1cIixcclxuICAgICAgICAgICAgICAgIGljb24gOiBcIj1cIixcclxuICAgICAgICAgICAgICAgIGNvbmZpcm1MYWJlbCA6IFwiPVwiLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IFwiPVwiLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBcIj1cIlxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlciA6IFtcIiRzY29wZVwiLCBmdW5jdGlvbiAoJHNjb3BlKSB7XHJcbiAgICAgICAgICAgICAgICAgICRzY29wZS52YWx1ZSA9IGMudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3QgPSBmdW5jdGlvbihuZXdWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRpYWxvZ09wdGlvbnMuc2VsZWN0VmFsdWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUudmFsdWUgPSBkaWFsb2dPcHRpb25zLnNlbGVjdFZhbHVlKCRzY29wZSwgbmV3VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICRzY29wZS52YWx1ZSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vc2V0UmVmVmFsdWUoYy5kYXRhLCBjLmRlZmluaXRpb24ucmVmLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICRzY29wZS5jb25maXJtID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNldFJlZlZhbHVlKGMuZGF0YSwgYy5kZWZpbml0aW9uLnJlZiwgJHNjb3BlLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjLiRlbWl0KFwic2F2ZVByb3BlcnRpZXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYy5jaGFuZ2VWYWx1ZSgkc2NvcGUudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kZXN0cm95Q29tcG9uZW50KCksXHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRlZmVycmVkUmVzdWx0LnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGVzdHJveUNvbXBvbmVudCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kZWZlcnJlZFJlc3VsdC5yZWplY3QoKVxyXG4gICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgaWYoZGlhbG9nT3B0aW9uc1xyXG4gICAgICAgICAgICAgICAgICAgICYmIGRpYWxvZ09wdGlvbnMuaW5pdERpYWxvZ0NvbnRleHRcclxuICAgICAgICAgICAgICAgICAgICAmJiB0eXBlb2YoZGlhbG9nT3B0aW9ucy5pbml0RGlhbG9nQ29udGV4dCkgPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgZGlhbG9nT3B0aW9ucy5pbml0RGlhbG9nQ29udGV4dChjLCAkc2NvcGUpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgIHNob3coY29tcG9uZW50LCBkaWFsb2dPcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1dXHJcbiAgfVxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBDOi9Vc2Vycy9uZXJ1c2gvRG9jdW1lbnRzL1FsaWsvU2Vuc2UvRXh0ZW5zaW9ucy9xc1NpbXBsZUtQSS9zcmMvZGlhbG9nQ29tcG9uZW50LmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==