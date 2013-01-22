(function() {
  var URI, dotPat, getParams, parentPat, urlPat;

  urlPat = /^(([^:/]+):\/\/([^/]*))?(\/(.*?))?(\?.*?)?(#.*)?$/;

  dotPat = /\/\.(?=\/|$)/g;

  parentPat = /^\/\.\.|\/[^/]+?\/\.\./g;

  URI = (function() {

    function URI(src, relative) {
      var match, _ref, _ref2;
      if (relative) src = new URI(src).relativePath(relative);
      if (match = src.match(urlPat)) {
        if (match[2]) {
          this.scheme = match[2].toLowerCase();
          this.host = match[3];
        }
        this.path = match[5] ? this.normalize(((this.scheme ? '/' : '') + match[5]).replace(dotPat, '')) : '/';
        this.search = (_ref = match[6]) != null ? _ref : '';
        this.fragment = (_ref2 = match[7]) != null ? _ref2 : '';
      }
    }

    URI.prototype.appendParams = function appendParams(char, old, str) {
      return "" + old + (old ? '&' : char) + str;
    };

    URI.prototype.appendSearch = function appendSearch(str) {
      return this.search = this.appendParams('?', this.search, str);
    };

    URI.prototype.appendFragment = function appendFragment(str) {
      return this.fragment = this.appendParams('#', this.fragment, str);
    };

    URI.prototype.normalize = function normalize(path) {
      var replaced;
      while (true) {
        replaced = false;
        path = path.replace(parentPat, function(match) {
          replaced = true;
          return '';
        });
        if (!replaced) break;
      }
      return path;
    };

    URI.prototype.relative = function relative(path) {
      return new URI(this.relativePath(path));
    };

    URI.prototype.relativePath = function relativePath(path) {
      var u;
      u = new URI(path);
      if (u.scheme) {
        return u.toString();
      } else {
        return (this.scheme ? "" + this.scheme + "://" + this.host : '') + (path.match(/^\//) ? path : this.path.match(/\/$/) ? "" + this.path + path : "" + this.path + "/../" + path);
      }
    };

    URI.prototype.toString = function toString() {
      var _ref, _ref2;
      return (this.scheme ? "" + this.scheme + "://" + this.host : "") + this.path + ((_ref = this.search) != null ? _ref : "") + ((_ref2 = this.fragment) != null ? _ref2 : "");
    };

    URI.prototype.getSearchParams = function getSearchParams() {
      var _ref;
      return getParams((_ref = this.search) != null ? _ref : '');
    };

    URI.prototype.getFragParams = function getFragParams() {
      var _ref;
      return getParams((_ref = this.fragment) != null ? _ref : '');
    };

    URI.prototype.paramString = function paramString(paramObj) {
      var k, v;
      return ((function() {
        var _results;
        _results = [];
        for (k in paramObj) {
          v = paramObj[k];
          _results.push("" + k + "=" + v);
        }
        return _results;
      })()).join('&');
    };

    URI.prototype.setSearchParams = function setSearchParams(paramObj) {
      this.search = "?" + (this.paramString(paramObj));
      return this;
    };

    URI.prototype.setFragParams = function setFragParams(paramObj) {
      this.fragment = "#" + (this.paramString(paramObj));
      return this;
    };

    URI.prototype.pathName = function pathName() {
      return (this.path.match(/\/[^/]*$/))[0].substring(1);
    };

    URI.prototype.pathParent = function pathParent() {
      return (this.path.match(/^.*\/(?=[^/]*$)/))[0];
    };

    return URI;

  })();

  getParams = function getParams(str) {
    var key, m, match, param, params, value, _i, _len, _ref;
    params = {};
    if (str !== '') {
      _ref = str.substring(1).split('&');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        param = _ref[_i];
        match = param.match(/^([^=]+)=(.*)$/);
        if (match) {
          m = match[0], key = match[1], value = match[2];
          params[key] = decodeURIComponent(value);
        }
      }
    }
    return params;
  };

  if (typeof window !== "undefined" && window !== null) {
    window.URI = URI;
  } else {
    module.exports = URI;
  }

}).call(this);
