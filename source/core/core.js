var JSDK = {

    /**
     * @class js.core
     * @static
     */
    core: {},

    /**
     * @class js.lang
     * @static
     */
    lang: {}
};

/**
 * @class js.core.Version
 * @final
 * @static
 */
JSDK.core.Version = {
    /**
     * @constant {Int} major
     */
    major: 0,
    /**
     * @constant {Int} minor
     */
    minor: 6,
    /**
     * @constant {Int} update
     */
    update: 2,
    /**
     * @constant {String} stage AL|BT|RC|GA
     */
    stage: 'RC',
    /**
     * @constant {Int} night
     */
    night: 201406010,
    /**
     * @constant {String} mainVersion
     */
    mainVersion: this.major + '.' + this.minor + '.' + this.update,
    /**
     * @constant {String} fullVersion
     */
    fullVersion: this.mainVersion + '-' + this.stage + '-' + this.night
};

var LANG = JSDK.lang;
var CORE = JSDK.core;

/**
 * Alias as package. Must starts with: "a-z".
 *
 * @method namespace
 * @param {String} pkg
 * @static
 */
JSDK.lang.namespace = function (pkg) {
    var p = pkg.split(".");
    var len = p.length;
    if (len < 1) return;

    var p0 = p[0];
    if (typeof window[p0] == "undefined") window[p0] = {};
    var b = window[p0];
    for (var i = 1; i < len; i++) {
        var pi = p[i];
        if (!pi)
            break;
        b[pi] = b[pi] || {};
        b = b[pi];
    }
    return b;
};

/**
 * Returns a random number in [n,m).
 *
 * @method random
 * @param {Number} n
 * @param {Number} m
 * @param {Boolean} isFloat:optional
 * @return {Number} The default is Integer
 * @static
 */
JSDK.lang.random = function (n, m, isFloat) {
    var x = Math.random() * (m - n) + n;
    return isFloat ? x : Math.floor(x);
};

/**
 * Returns a random item in a array.
 *
 * @method randomEnum
 * @param {Array} array
 * @return {Object}
 * @static
 */
JSDK.lang.randomEnum = function (array) {
    if (!array || array.length <= 0) return null;
    if (array.length < 2) return array[0];

    return array[this.random(0, array.length)];
};

/**
 * Returns a random True or False.
 *
 * @method randomBoolean
 * @return {Boolean}
 * @static
 */
JSDK.lang.randomBoolean = function () {
    return this.randomEnum([true, false]);
};

/**
 * Returns a random color RGB value.
 *
 * @method randomColor
 * @return {String}
 * @static
 */
JSDK.lang.randomColor = function () {
    var a = "0123456789abcdef".split("");
    var c = [];
    for (var i = 0; i < 6; i++) {
        c.push(this.randomEnum(a));
    }
    return "#" + c.join("");
};

/**
 * Returns a new generating UUID.
 *
 * @method getUUID
 * @return {String} uuid
 * @static
 */
JSDK.lang.getUUID = function () {
    var t = new Date().getTime();
    return t + "" + Math.floor(Math.random() * t);
};

/*********************************************************
 *
 * The data type detection
 *
 *********************************************************/
JSDK.lang._TYPES = {
    'undefined': 'undefined',
    'number': 'number',
    'boolean': 'boolean',
    'string': 'string',
    '[object Function]': 'function',
    '[object RegExp]': 'regexp',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object Error]': 'error'
};
JSDK.lang._TOSTRING = Object.prototype.toString;
/**
 * Returns one of the following string, representing the type of the
 * passed in:
 *  "array"
 *  "boolean"
 *  "date"
 *  "error"
 *  "function"
 *  "number"
 *  "object"
 *  "regexp"
 *  "string"
 *  "undefined"
 *
 * @method type
 * @param {Object} obj the item to test
 * @returns {String} the detected type
 * @static
 */
JSDK.lang._type = function (obj) {
    return this._TYPES[typeof obj] || this._TYPES[this._TOSTRING.call(obj)] || (obj ? "object" : "null");
};

/**
 * Determines whether or not the provided object is an array.
 * @method isArray
 * @param {Object} obj The object being testing
 * @return {Boolean} the result
 * @static
 */
JSDK.lang.isArray = Array.isArray || function (obj) {
    return this._type(obj) === "array";
};

/**
 * Determines whether or not the provided object is a boolean.
 * @method isBoolean
 * @param {Object} obj The object being testing
 * @return {Boolean} the result
 * @static
 */
JSDK.lang.isBoolean = function (obj) {
    return this._type(obj) === "boolean";
};

/**
 * Determines whether or not the provided object is a string.
 * @method isString
 * @param {Object} obj The object being testing
 * @return {Boolean} the result
 * @static
 */
JSDK.lang.isString = function (obj) {
    return this._type(obj) === "string";
};

/**
 * Determines whether or not the supplied item is a date instance.
 *
 * @method isDate
 * @param obj The object to test.
 * @return {Boolean} true if o is a date.
 * @static
 */
JSDK.lang.isDate = function (obj) {
    return this._type(obj) === "date" && obj.toString() !== "Invalid Date" && !isNaN(obj);
};

/**
 * <p>
 * Determines whether or not the provided item is a function.
 * Note: Internet Explorer thinks certain functions are objects:
 * </p>
 *
 * <pre>
 * var obj = document.createElement("object");
 * Y.Lang.isFunction(obj.getAttribute) // reports false in IE
 * &nbsp;
 * var input = document.createElement("input"); // append to body
 * Y.Lang.isFunction(input.focus) // reports false in IE
 * </pre>
 *
 * <p>
 * You will have to implement additional tests if these functions
 * matter to you.
 * </p>
 *
 * @method isFunction
 *
 * @param obj The object to test.
 * @return {Boolean} true if o is a function.
 * @static
 */
JSDK.lang.isFunction = function (obj) {
    return this._type(obj) === "function";
};

/**
 * Determines whether or not the provided item is null.
 * @method isNull
 * @static
 * @param obj The object to test.
 * @return {Boolean} true if o is null.
 */
JSDK.lang.isNull = function (obj) {
    return this._type(obj) === "null";
};

/**
 * Determines whether or not the provided item is undefined.
 * @method isUndefined
 * @static
 * @param o The object to test.
 * @return {Boolean} true if o is undefined.
 */
JSDK.lang.isUndefined = function (obj) {
    return this._type(obj) === "undefined";
};

/**
 * Determines whether or not the provided item is a legal number.
 * @method isNumber
 * @static
 * @param obj The object to test.
 * @return {Boolean} true if o is a number.
 */
JSDK.lang.isNumber = function (obj) {
    return this._type(obj) === "number" && isFinite(obj);
};

/**
 * Determines whether or not the provided value is a regexp.
 * @method isRegExp
 * @static
 * @param obj The value or object to test.
 * @return {boolean} true if value is a regexp.
 */
JSDK.lang.isRegExp = function (obj) {
    return this._type(obj) === "regexp";
};

/**
 * Determines whether or not the provided item is of type object
 * or function. Note that arrays are also objects, so
 * <code>isObject([]) === true</code>.
 *
 * @method isObject
 * @static
 * @param obj The object to test.
 * @param failfn {Boolean} fail if the input is a function.
 * @return {Boolean} true if o is an object.
 * @see JSDK.lang.isPlainObject
 */
JSDK.lang.isObject = function (obj, failfn) {
    var type = typeof obj;
    return (obj && ( type == "object" || !failfn && ( type === "function" || this.isFunction(obj) ) )) || false;
};

/**
 * Determines whether or not the provided item is a plain object
 *
 * @method isPlainObject
 * @static
 * @param obj The object to test.
 * @return {Boolean} true if o is a plain object.
 */
JSDK.lang.isPlainObject = function (obj) {

    if (!obj || this._type(obj) !== "object" || obj.nodeType || obj.window === obj) {
        return false;
    }

    var key, objConstructor;

    try {

        // Not own constructor property must be Object
        if (objConstructor == obj.constructor && !obj.hasOwnProperty("constructor") && !objConstructor.prototype.hasOwnProperty("isPrototypeOf")) {
            return false;
        }
    } catch (e) {
        // IE8,9 Will throw exceptions on certain host objects
        return false;
    }

    // Own properties are enumerated firstly, so to speed up,
    // if last one is own, then all properties are own.
    /*jshint noempty:false*/
    for (key in obj) {

    }

    return (key === undefined || obj.hasOwnProperty(key));
};

/**
 * A convenience method for detecting a legitimate non-null value.
 * Returns false for null/undefined/NaN, true for other values,
 * including 0/false/''
 * @method isValue
 * @static
 * @param obj The item to test.
 * @return {boolean} true if it is not null/undefined/NaN || false.
 */
JSDK.lang.isValue = function (obj) {

    var type = this._type(obj);

    switch (type) {
        case "number":
            return isFinite(obj);
        case "null":
        case "undefined":
            return false;
        default:
            return !!type;
    }
};

/**
 * Determines whether or not the provided item is a empty object
 *
 * @method isEmptyObject
 * @static
 * @param obj The object to test.
 * @return {Boolean} true if o is an empty object.
 */
JSDK.lang.isEmptyObject = function (obj) {

    for (var p in obj) {
        if (this.isUndefined(p)) {
            return false;
        }
    }

    return true;
};

/**********************************************
 *
 * The Native Object Extension
 *
 * Note:
 * 1: Don't expand "Object"
 *
 * 2: Traversal a Array using "for in...", should write like this:
 *        for (k in arr){
 * 			if (arr.hasOwnProperty(k)) {...}
 * 		}
 *    Or use the "forEach" function.
 *
 *********************************************/

/***************
 * @native String
 ***************/
JSDK.lang._WHITESPACE = "\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF";
JSDK.lang._WHITESPACE_CLASS = "[\x09-\x0D\x20\xA0\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+";
JSDK.lang._TRIM_LEFT_REGEX = new RegExp("^" + JSDK.lang._WHITESPACE_CLASS);
JSDK.lang._TRIM_RIGHT_REGEX = new RegExp(JSDK.lang._WHITESPACE_CLASS + "$");
JSDK.lang._TRIM_REGEX = new RegExp(JSDK.lang._TRIM_LEFT_REGEX.source + "|" + JSDK.lang._TRIM_RIGHT_REGEX.source, "g");

/**
 * Trim the String's left empty chars.
 *
 * @method trimLeft
 * @return {String}
 */
if (!JSDK.lang.isFunction(String.prototype.trimLeft)) {
    String.prototype.trimLeft = function () {
        return this.replace(this._TRIM_LEFT_REGEX, "");
    };
}

/**
 * Trim the String's right empty chars.
 *
 * @method trimRight
 * @return {String}
 */
if (!JSDK.lang.isFunction(String.prototype.trimRight)) {
    String.prototype.trimRight = function () {
        return this.replace(this._TRIM_RIGHT_REGEX, "");
    };
}

/**
 * Trim the String's right and left empty chars.
 *
 * @method trim
 * @return {String}
 */
if (!JSDK.lang.isFunction(String.prototype.trim)) {
    String.prototype.trim = function () {
        try {
            return this.replace(this._TRIM_REGEX, "");
        } catch (e) {
            return this;
        }
    };
}


/**
 * Starts with the string.
 *
 * @method startsWith
 * @param {String} str
 * @return {Boolean}
 */
if (!JSDK.lang.isFunction(String.prototype.startsWith)) {
    String.prototype.startsWith = function (str) {
        if (!JSDK.lang.isString(str)) {
            return false;
        }
        return this.lastIndexOf(str, 0) === 0;
    };
}
/**
 * Ends with the string.
 *
 * @method endsWith
 * @param {String} str
 * @return {Boolean}
 */

if (!JSDK.lang.isFunction(String.prototype.endsWith)) {
    String.prototype.endsWith = function (str) {
        if (!JSDK.lang.isString(str)) {
            return false;
        }
        var ind = this.length - str.length;
        return ind >= 0 && this.indexOf(str, ind) === ind;
    };
}

/**
 * Returns the text between start word and end word.
 *
 * @method between
 * @param {String} startWord:optional
 * @param {String} endWord:optional
 * @return {String}
 */
if (!JSDK.lang.isFunction(String.prototype.between)) {

    String.prototype.between = function (startWord, endWord) {

        var pos1 = 0, pos2 = this.length;

        if (startWord) {

            var p1 = this.indexOf(startWord);
            pos1 = p1 + startWord.length;
        }

        if (endWord) {

            var p2 = this.indexOf(endWord);
            if (p2 > 0) {
                pos2 = p2;
            }
        }

        return this.substring(pos1, pos2 - pos1);
    };
}

/**
 * Returns a json string.
 *
 * @method toJSONString
 * @return {String}
 */
if (!JSDK.lang.isFunction(String.prototype.toJSONString)) {
    String.prototype.toJSONString = function () {
        return JSDK.lang.stringifyJSON(this);
    };
}

/***************
 * @native Array
 ***************/

/**
 * Returns the index of a item in the array by asc order.
 *
 * @method indexOf
 * @param {Object} elt The compare element
 * @param {Function} elt The compare function
 * * @param {Int} from:optional The default is Zero
 * @param {Object} thisp:optional The function's this
 * @return {Int} returns -1 when not found
 */
Array.prototype.indexOf = function (elt, from, thisp) {

    var len = this.length >>> 0;
    var thisP = thisp || this;
    var fun = LANG.isFunction(elt) ? elt : null;
    from = isNaN(from) ? 0 : Math.round(from);
    if (from < 0) {
        from += len;
    } else if (from > len) {
        from = len;
    }

    for (; from < len; from++) {

        if (fun) {
            if (fun.call(thisP, this[from], from, this)) {
                return from;
            }
        } else {
            if (this[from] === elt) {
                return from;
            }
        }
    }

    return -1;
};

/**
 * Returns the index of a item in the array by desc order.
 *
 * @method lastIndexOf
 * @param {Object} elt The compare element
 * @param {Function} elt The compare function
 * * @param {Int} from:optional The default is Zero
 * @param {Object} thisp:optional The function's this
 * @return {Int} returns -1 when not found
 */
Array.prototype.lastIndexOf = function (elt, from, thisp) {

    var len = this.length >>> 0;
    var thisP = thisp || this;
    var fun = LANG.isFunction(elt) ? elt : null;
    from = isNaN(from) ? len - 1 : Math.round(from);
    if (from < 0) {
        from += len;
    } else if (from >= len) {
        from = len - 1;
    }

    for (; from >= 0; from--) {
        if (fun) {
            if (fun.call(thisP, this[from], from, this)) {
                return from;
            }
        } else {
            if (this[from] === elt) {
                return from;
            }
        }
    }

    return -1;
};

/**
 * Execute the callback function for every item.
 *
 * @method each
 * @param {Function} fn
 * @param {Object}   thisp:optional the function's this
 * @throws {TypeError} The argument<fn> is not function
 */
Array.prototype.each = function (fn, thisp) {

    var len = this.length >>> 0;
    var thisP = thisp || this;

    if (!LANG.isFunction(fn)) {
        throw new TypeError("[Array#each] The argument<fn> is not function");
    }

    for (var i = 0; i < len; i++) {
        fn.call(thisP, this[i], i, this);
    }
};

/**
 * Returns a JSONObject of all items for callback.
 *
 * @method toMap
 * @param {Function} fn returns a array like [key,value]
 * @param {Object} thisp:optional the function's this
 * @return {Object}
 * @throws {TypeError} The argument<fn> is not function
 */
Array.prototype.toMap = function (fn, thisp) {

    var len = this.length >>> 0;
    var thisP = thisp || this;

    if (!LANG.isFunction(fn)) {
        throw new TypeError("[Array#toMap The arguments<fn> is not function]");
    }

    var res = {};
    for (var i = 0; i < len; i++) {

        var rst = fn.call(thisP, this[i], i, this);
        if (rst && rst.length > 1) {
            res[rst[0]] = rst[1];
        }
    }

    return res;
};

/**
 * Mapping the array to a new array by using the callback(fn)
 *
 * @method mapping
 * @param {Function} fn returns a array like [key,value]
 * @param {Object} thisp:optional the function's this
 * @return {Object}
 * @throws {TypeError} The argument<fn> is not function
 */
Array.prototype.mapping = function (fn, thisp) {

    var len = this.length >>> 0;
    var thisP = thisp || this;

    if (!LANG.isFunction(fn)) {
        throw  new TypeError("[Array#mapping] The argument<fn> is not function");
    }

    var res = [];
    for (var i = 0; i < len; i++) {
        res[i] = fn.call(thisP, this[i], i, this);
    }

    return res;
};



var arr = [1, 2, 3, 4, 5];

console.dir(arr.mapping(function (elem) {

    return elem + 2;
}));

/**********************************************
 *
 * The JSON utility
 *
 *********************************************/
/***
 * JSON max depth
 *
 * @type {Number}
 * @private
 * @static
 */
JSDK.lang._JSON_MAX_DEPTH = 512;
/**
 * Escape String
 *
 * @param {String} str
 * @private
 * @static
 */
JSDK.lang._escapeString = function (str) {

    var JSON_ESCAPE = {
        '\b': '\\b',    // backspace        U+0008
        '\t': '\\t',    // tab              U+0009
        '\n': '\\n',    // line feed        U+000A
        '\f': '\\f',    // form feed        U+000C
        '\r': '\\r',    // carriage return  U+000D
        '"': '\\"',     // quotation mark   U+0022
        '\\': '\\\\'    // reverse solidus  U+005C
    };

    return str.replace(/(?:[\b\t\n\f\r"]|\\)/g, function (_) {
        return JSON_ESCAPE[_];
    }).replace(/(?:[\x00-\x1f])/g, function (_) {
        return "\\u00" + ("0" + _.charCodeAt(0).toString(16)).slice(-2);
    });
};

/**
 * Encode the JSONObject to a JSON String.
 *
 * @method stringifyJSON
 * @param  source: Any value
 * @param {Number} depth
 * @returns {String}
 * @static
 */
JSDK.lang.stringifyJSON = function (source, depth) {

    var rv = [];
    var depth = depth || 0;

    if (depth >= this._JSON_MAX_DEPTH) {
        throw new TypeError("CYCLIC_REFERENCE_ERROR");
    }

    // "null" or "undefined"
    if (null === source || undefined === source) {
        return source + "";
    }

    if (source["toJSON"]) {
        return source["toJSON"];
    }

    var type = typeof source;

    if (type === "boolean" || type === "number") {
        return source + "";
    }
    if (type === "string") {
        return '"' + this._escapeString(source) + '"';
    }

    var brackets = ["{", "}"];

    if (this.isArray(source)) {
        brackets = ["[", "]"];
        for (var i = 0, iz = source.length; i < iz; i++) {
            rv.push(this.stringifyJSON(source[i], depth + 1));
        }
    } else if (source.constructor === ({}).constructor) {
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                rv.push('"' + this._escapeString(key) + '":' + this.stringifyJSON(source[key], depth + 1));
            }
        }
    }

    return brackets[0] + rv.join(",") + brackets[1];
};

/**
 * Returns a JSON Object
 *
 * @method parseJSON
 * @param {String} source
 * @return {Object}
 * @static
 */
JSDK.lang.parseJSON = function (source) {

    var unescaped = source.trim().replace(/"(\\.|[^"\\])*"/g, "");

    if (/[^,:{}\[\]0-9\.\-+Eaeflnr-u \n\r\t]/.test(unescaped)) {
        throw new SyntaxError("Unexpected token:" + source);
    }

    return (new Function("return " + source))();
};

/*******************************************
 *
 * JSDK files(image/css/javascript) Loader
 *
 ******************************************/
(function () {

    var JSDKModules;
    var head = document.head || document.getElementsByClassName("head")[0];

    var log = function (content) {
        if (LANG.isFunction(console.log)) {
            console.log(content);
        } else {
            alert(content);
        }
    };
    var debug = function (content) {
        if (LANG.isFunction(console.dir)) {
            console.dir(content);
        } else {
            alert(content);
        }
    };

    /**
     * @structure
     * jsConfig = {
     *      "description": "a js file's config",
     *      "type":"object",
     *      "properties":{
     *           "url":{"type":"string","required":true},
     *           "id":{"type":"string","required":false},
     *           "charset":{"type":"string","required":false},
     *           "defer":{"type":"boolean","required":false},
     *      }
     * }
     * @param jsConfig
     * @returns {HTMLElement}
     * @private
     */
    var _createScript = function (jsConfig) {

        var script = document.createElement("script");

        script.type = "text/javascript";
        script.src = jsConfig["url"];
        script.setAttribute("charset", jsConfig["charset"] || "utf-8");
        if (!LANG.isUndefined(jsConfig["id"])) {
            script.setAttribute("id", jsConfig["id"]);
        }
        if (!LANG.isUndefined(jsConfig["defer"])) {
            script.setAttribute("defer", jsConfig["defer"]);
        }

        return script;
    };
    /**
     * @structure
     * cssConfig = {
     *      "description": "a css file's config",
     *      "type":"object",
     *      "properties":{
     *           "url":{"type":"string","required":true},
     *           "id":{"type":"string","required":false},
     *      }
     * }
     * @param _createCss
     * @returns {HTMLElement}
     * @private
     */
    var _createCss = function (cssConfig) {

        var css = document.createElement("link");

        css.type = "text/css";
        css.href = cssConfig["url"];
        css.rel = "stylesheet";
        if (!LANG.isUndefined(cssConfig["id"])) {
            css.setAttribute("id", cssConfig["id"]);
        }

        return css;
    };

    var _load = function (name, callBackQueue) {
        if (false === JSDKModules[name].isLoad) {

            var url = JSDKModules[name].url;
            var pos1 = url.lastIndexOf(".") + 1;
            var pos2 = url.indexOf("?");
            var fileType = url.substring(pos1, pos2 == -1 ? url.length : pos2);

            var file;
            if ("js" === fileType) {
                file = _createScript(JSDKModules[name]);
            } else if ("css" === fileType) {
                file = _createCss(JSDKModules[name]);
            } else {
                throw new Error("模块【" + name + "】url错误");
                return;
            }

            file.onload = file.onreadystatechange = function () {
                if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                    JSDKModules[name].isLoad = true;
                    for (var i = 0, len = callBackQueue.length; i < len; i++) {
                        if (LANG.isFunction(callBackQueue[i])) callBackQueue[i]();
                    }
                }
            }

            head.appendChild(file);
        }
    };

    // 模块定义
    JSDK.define = function (name, config) {

        if (LANG.isUndefined(JSDKModules)) {
            JSDKModules = {};
        }
        if (!LANG.isUndefined(JSDKModules[name])) {
            log("模块已定义");
            return;
        }
        JSDKModules[name] = config;
        // 是否加载过
        JSDKModules[name].isLoad = false;
        // 是否使用过
        JSDKModules[name].isUse = false;
        // 回调队列
        JSDKModules[name].callBackQueue = [];
        return this;
    };

    // 模块使用
    JSDK.use = function (name, func) {

        if (LANG.isUndefined(JSDKModules[name])) {
            log("模块【" + name + "】不存在");
            return this;
        }
        // 回调队列，用于多次use同一个模块时的多个回调
        var callBackQueue = JSDKModules[name].callBackQueue;
        if (false === JSDKModules[name].isUse) {
            JSDKModules[name].isUse = true;
            // 推入队列
            callBackQueue.push(func);

            var requires = JSDKModules[name].requires;

            // 串行依赖
            if (LANG.isString(requires)) {
                this.use(requires, function () {
                    _load(name, callBackQueue);
                });
                return this;
            }

            // 并行依赖
            if (LANG.isArray(requires)) {
                var len = requires.length;
                JSDKModules[name].count = len;
                for (var i = 0; i < len; i++) {
                    this.use(requires[i], function () {
                        JSDKModules[name].count--;
                        // 串行依赖即：等待所有的文件加载完毕之后才执行回调
                        if (JSDKModules[name].count === 0) {
                            _load(name, callBackQueue);
                        }
                    });
                }
                return this;
            }
            _load(name, callBackQueue);
        } else {

            // 如果模块已经标记被使用，但是模块还未下载完毕时，加入队列，如果下载完毕则直接指定回调函数
            if (false === JSDKModules[name].isLoad) {
                if (LANG.isFunction(func)) {
                    callBackQueue.push(func);
                }
            } else {
                if (LANG.isFunction(func)) {
                    func();
                }
            }

            return this;
        }
    };
})();
