(function() {
  var URI, dotPat, parentPat, urlPat;

  urlPat = /^(([^:/]+):\/\/([^/]*))?(\/(.*?))?(\?.*?)?(#.*)?$/;

  dotPat = /\/\.(?=\/|$)/g;

  parentPat = /^\/\.\.|\/[^/]+?\/\.\./g;

  URI = (function() {

    function URI(src) {
      var match, _ref, _ref2;
      if (match = src.match(urlPat)) {
        if (match[2]) {
          this.scheme = match[2].toLowerCase();
          this.host = match[3].toLowerCase();
        }
        this.path = match[5] ? this.normalize(((this.scheme ? '/' : '') + match[5]).replace(dotPat, '')) : '/';
        this.search = (_ref = match[6]) != null ? _ref : '';
        this.fragment = (_ref2 = match[7]) != null ? _ref2 : '';
      }
    }

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
      var u;
      u = new URI(path);
      if (u.scheme) {
        return u;
      } else {
        return new URI((this.scheme ? "" + this.scheme + "://" + this.host : '') + (path.match(/^\//) ? path : this.path.match(/\/$/) ? "" + this.path + path : "" + this.path + "/../" + path));
      }
    };

    URI.prototype.toString = function toString() {
      var _ref, _ref2;
      return (this.scheme ? "" + this.scheme + "://" + this.host : "") + this.path + ((_ref = this.search) != null ? _ref : "") + ((_ref2 = this.fragment) != null ? _ref2 : "");
    };

    URI.prototype.getSearchParams = function getSearchParams() {
      var key, m, param, params, value, _i, _len, _ref, _ref2;
      if (!this.search) {
        return {};
      } else {
        params = {};
        _ref = this.search.substring(1).split('&');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          param = _ref[_i];
          _ref2 = param.match(/^([^=]+)=(.*)$/), m = _ref2[0], key = _ref2[1], value = _ref2[2];
          params[key] = decodeURIComponent(value);
        }
        return params;
      }
    };

    return URI;

  })();

  if (typeof window !== "undefined" && window !== null) {
    window.URI = URI;
  } else {
    module.exports = URI;
  }

}).call(this);
