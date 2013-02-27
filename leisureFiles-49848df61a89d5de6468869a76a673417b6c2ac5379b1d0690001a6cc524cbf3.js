/**
 * marked - A markdown parser (https://github.com/chjj/marked)
 * Copyright (c) 2011-2012, Christopher Jeffrey. (MIT Licensed)
 */

;(function() {

/**
 * Block-Level Grammar
 */

var block = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  fences: noop,
  hr: /^( *[-*_]){3,} *(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
  lheading: /^([^\n]+)\n *(=|-){3,} *\n*/,
  blockquote: /^( *>[^\n]+(\n[^\n]+)*\n*)+/,
  list: /^( *)(bull) [^\0]+?(?:hr|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: /^ *(?:comment|closed|closing) *(?:\n{2,}|\s*$)/,
  def: /^ *\[([^\]]+)\]: *([^\s]+)(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
  paragraph: /^([^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+\n*/,
  text: /^[^\n]+/
};

block.bullet = /(?:[*+-]|\d+\.)/;
block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
block.item = replace(block.item, 'gm')
  (/bull/g, block.bullet)
  ();

block.list = replace(block.list)
  (/bull/g, block.bullet)
  ('hr', /\n+(?=(?: *[-*_]){3,} *(?:\n+|$))/)
  ();

block.html = replace(block.html)
  ('comment', /<!--[^\0]*?-->/)
  ('closed', /<(tag)[^\0]+?<\/\1>/)
  ('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)
  (/tag/g, tag())
  ();

block.paragraph = replace(block.paragraph)
  ('hr', block.hr)
  ('heading', block.heading)
  ('lheading', block.lheading)
  ('blockquote', block.blockquote)
  ('tag', '<' + tag())
  ('def', block.def)
  ();

block.normal = {
  fences: block.fences,
  paragraph: block.paragraph
};

block.gfm = {
  fences: /^ *(```|~~~) *(\w+)? *\n([^\0]+?)\s*\1 *(?:\n+|$)/,
  paragraph: /^/
};

block.gfm.paragraph = replace(block.paragraph)
  ('(?!', '(?!' + block.gfm.fences.source.replace('\\1', '\\2') + '|')
  ();

/**
 * Block Lexer
 */

block.lexer = function(src) {
  var tokens = [];

  tokens.links = {};

  src = src
    .replace(/\r\n|\r/g, '\n')
    .replace(/\t/g, '    ');

  return block.token(src, tokens, true);
};

block.token = function(src, tokens, top) {
  var src = src.replace(/^ +$/gm, '')
    , next
    , loose
    , cap
    , item
    , space
    , i
    , l
    , start;

  while (src) {
    start = src.length;
    // newline
    if (cap = block.newline.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[0].length > 1) {
        tokens.push({
          type: 'space'
        });
      }
    }

    // code
    if (cap = block.code.exec(src)) {
      src = src.substring(cap[0].length);
      cap = cap[0].replace(/^ {4}/gm, '');
      tokens.push({
        type: 'code',
        text: !options.pedantic
          ? cap.replace(/\n+$/, '')
          : cap,
        textLen: start - src.length,
        remain: src.length
      });
      continue;
    }

    // fences (gfm)
    if (cap = block.fences.exec(src)) {
      src = src.substring(cap[0].length);
      tokens.push({
        type: 'code',
        lang: cap[2],
        text: cap[3],
        textLen: start - src.length,
        remain: src.length
      });
      continue;
    }

    // heading
    if (cap = block.heading.exec(src)) {
      src = src.substring(cap[0].length);
      tokens.push({
        type: 'heading',
        depth: cap[1].length,
        text: cap[2]
      });
      continue;
    }

    // lheading
    if (cap = block.lheading.exec(src)) {
      src = src.substring(cap[0].length);
      tokens.push({
        type: 'heading',
        depth: cap[2] === '=' ? 1 : 2,
        text: cap[1]
      });
      continue;
    }

    // hr
    if (cap = block.hr.exec(src)) {
      src = src.substring(cap[0].length);
      tokens.push({
        type: 'hr'
      });
      continue;
    }

    // blockquote
    if (cap = block.blockquote.exec(src)) {
      src = src.substring(cap[0].length);

      tokens.push({
        type: 'blockquote_start'
      });

      cap = cap[0].replace(/^ *> ?/gm, '');

      // Pass `top` to keep the current
      // "toplevel" state. This is exactly
      // how markdown.pl works.
      block.token(cap, tokens, top);

      tokens.push({
        type: 'blockquote_end'
      });

      continue;
    }

    // list
    if (cap = block.list.exec(src)) {
      src = src.substring(cap[0].length);

      tokens.push({
        type: 'list_start',
        ordered: isFinite(cap[2])
      });

      // Get each top-level item.
      cap = cap[0].match(block.item);

      next = false;
      l = cap.length;
      i = 0;

      for (; i < l; i++) {
        item = cap[i];

        // Remove the list item's bullet
        // so it is seen as the next token.
        space = item.length;
        item = item.replace(/^ *([*+-]|\d+\.) +/, '');

        // Outdent whatever the
        // list item contains. Hacky.
        if (~item.indexOf('\n ')) {
          space -= item.length;
          item = !options.pedantic
            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
            : item.replace(/^ {1,4}/gm, '');
        }

        // Determine whether item is loose or not.
        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
        // for discount behavior.
        loose = next || /\n\n(?!\s*$)/.test(item);
        if (i !== l - 1) {
          next = item[item.length-1] === '\n';
          if (!loose) loose = next;
        }

        tokens.push({
          type: loose
            ? 'loose_item_start'
            : 'list_item_start'
        });

        // Recurse.
        block.token(item, tokens);

        tokens.push({
          type: 'list_item_end'
        });
      }

      tokens.push({
        type: 'list_end'
      });

      continue;
    }

    // html
    if (cap = block.html.exec(src)) {
      src = src.substring(cap[0].length);
      tokens.push({
        type: options.sanitize
          ? 'paragraph'
          : 'html',
        pre: cap[1] === 'pre',
        text: cap[0]
      });
      continue;
    }

    // def
    if (top && (cap = block.def.exec(src))) {
      src = src.substring(cap[0].length);
      tokens.links[cap[1].toLowerCase()] = {
        href: cap[2],
        title: cap[3]
      };
      continue;
    }

    // top-level paragraph
    if (top && (cap = block.paragraph.exec(src))) {
      src = src.substring(cap[0].length);
      tokens.push({
        type: 'paragraph',
        text: cap[0]
      });
      continue;
    }

    // text
    if (cap = block.text.exec(src)) {
      // Top-level should never reach here.
      src = src.substring(cap[0].length);
      tokens.push({
        type: 'text',
        text: cap[0]
      });
      continue;
    }
  }

  return tokens;
};

/**
 * Inline Processing
 */

var inline = {
  escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
  autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
  url: noop,
  tag: /^<!--[^\0]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
  link: /^!?\[(inside)\]\(href\)/,
  reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
  nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
  strong: /^__([^\0]+?)__(?!_)|^\*\*([^\0]+?)\*\*(?!\*)/,
  em: /^\b_((?:__|[^\0])+?)_\b|^\*((?:\*\*|[^\0])+?)\*(?!\*)/,
  code: /^(`+)([^\0]*?[^`])\1(?!`)/,
  br: /^ {2,}\n(?!\s*$)/,
  text: /^[^\0]+?(?=[\\<!\[_*`]| {2,}\n|$)/
};

inline._linkInside = /(?:\[[^\]]*\]|[^\]]|\](?=[^\[]*\]))*/;
inline._linkHref = /\s*<?([^\s]*?)>?(?:\s+['"]([^\0]*?)['"])?\s*/;

inline.link = replace(inline.link)
  ('inside', inline._linkInside)
  ('href', inline._linkHref)
  ();

inline.reflink = replace(inline.reflink)
  ('inside', inline._linkInside)
  ();

inline.normal = {
  url: inline.url,
  strong: inline.strong,
  em: inline.em,
  text: inline.text
};

inline.pedantic = {
  strong: /^__(?=\S)([^\0]*?\S)__(?!_)|^\*\*(?=\S)([^\0]*?\S)\*\*(?!\*)/,
  em: /^_(?=\S)([^\0]*?\S)_(?!_)|^\*(?=\S)([^\0]*?\S)\*(?!\*)/
};

inline.gfm = {
  url: /^(https?:\/\/[^\s]+[^.,:;"')\]\s])/,
  text: /^[^\0]+?(?=[\\<!\[_*`]|https?:\/\/| {2,}\n|$)/
};

/**
 * Inline Lexer
 */

inline.lexer = function(src) {
  var out = ''
    , links = tokens.links
    , link
    , text
    , href
    , cap;

  while (src) {
    // escape
    if (cap = inline.escape.exec(src)) {
      src = src.substring(cap[0].length);
      out += cap[1];
      continue;
    }

    // autolink
    if (cap = inline.autolink.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = cap[1][6] === ':'
          ? mangle(cap[1].substring(7))
          : mangle(cap[1]);
        href = mangle('mailto:') + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      out += '<a href="'
        + href
        + '">'
        + text
        + '</a>';
      continue;
    }

    // url (gfm)
    if (cap = inline.url.exec(src)) {
      src = src.substring(cap[0].length);
      text = escape(cap[1]);
      href = text;
      out += '<a href="'
        + href
        + '">'
        + text
        + '</a>';
      continue;
    }

    // tag
    if (cap = inline.tag.exec(src)) {
      src = src.substring(cap[0].length);
      out += options.sanitize
        ? escape(cap[0])
        : cap[0];
      continue;
    }

    // link
    if (cap = inline.link.exec(src)) {
      src = src.substring(cap[0].length);
      out += outputLink(cap, {
        href: cap[2],
        title: cap[3]
      });
      continue;
    }

    // reflink, nolink
    if ((cap = inline.reflink.exec(src))
        || (cap = inline.nolink.exec(src))) {
      src = src.substring(cap[0].length);
      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
      link = links[link.toLowerCase()];
      if (!link || !link.href) {
        out += cap[0][0];
        src = cap[0].substring(1) + src;
        continue;
      }
      out += outputLink(cap, link);
      continue;
    }

    // strong
    if (cap = inline.strong.exec(src)) {
      src = src.substring(cap[0].length);
      out += '<strong>'
        + inline.lexer(cap[2] || cap[1])
        + '</strong>';
      continue;
    }

    // em
    if (cap = inline.em.exec(src)) {
      src = src.substring(cap[0].length);
      out += '<em>'
        + inline.lexer(cap[2] || cap[1])
        + '</em>';
      continue;
    }

    // code
    if (cap = inline.code.exec(src)) {
      src = src.substring(cap[0].length);
      out += '<code>'
        + escape(cap[2], true)
        + '</code>';
      continue;
    }

    // br
    if (cap = inline.br.exec(src)) {
      src = src.substring(cap[0].length);
      out += '<br>';
      continue;
    }

    // text
    if (cap = inline.text.exec(src)) {
      src = src.substring(cap[0].length);
      out += escape(cap[0]);
      continue;
    }
  }

  return out;
};

function outputLink(cap, link) {
  if (cap[0][0] !== '!') {
    return '<a href="'
      + escape(link.href)
      + '"'
      + (link.title
      ? ' title="'
      + escape(link.title)
      + '"'
      : '')
      + '>'
      + inline.lexer(cap[1])
      + '</a>';
  } else {
    return '<img src="'
      + escape(link.href)
      + '" alt="'
      + escape(cap[1])
      + '"'
      + (link.title
      ? ' title="'
      + escape(link.title)
      + '"'
      : '')
      + '>';
  }
}

/**
 * Parsing
 */

var tokens
  , token;

function next() {
  return token = tokens.pop();
}

function tok() {
  switch (token.type) {
    case 'space': {
      return '';
    }
    case 'hr': {
      return '<hr>\n';
    }
    case 'heading': {
      return '<h'
        + token.depth
        + '>'
        + inline.lexer(token.text)
        + '</h'
        + token.depth
        + '>\n';
    }
    case 'code': {
      if (options.highlight) {
        token.code = options.highlight(token.text, token.lang);
        if (token.code != null && token.code !== token.text) {
          token.escaped = true;
          token.text = token.code;
        }
      }

      if (!token.escaped) {
        token.text = escape(token.text, true);
      }

      return '<pre><code'
        + (token.lang
        ? ' class="lang-'
        + token.lang
        + '"'
        : '')
        + '>'
        + token.text
        + '</code></pre>\n';
    }
    case 'blockquote_start': {
      var body = '';

      while (next().type !== 'blockquote_end') {
        body += tok();
      }

      return '<blockquote>\n'
        + body
        + '</blockquote>\n';
    }
    case 'list_start': {
      var type = token.ordered ? 'ol' : 'ul'
        , body = '';

      while (next().type !== 'list_end') {
        body += tok();
      }

      return '<'
        + type
        + '>\n'
        + body
        + '</'
        + type
        + '>\n';
    }
    case 'list_item_start': {
      var body = '';

      while (next().type !== 'list_item_end') {
        body += token.type === 'text'
          ? parseText()
          : tok();
      }

      return '<li>'
        + body
        + '</li>\n';
    }
    case 'loose_item_start': {
      var body = '';

      while (next().type !== 'list_item_end') {
        body += tok();
      }

      return '<li>'
        + body
        + '</li>\n';
    }
    case 'html': {
      return !token.pre && !options.pedantic
        ? inline.lexer(token.text)
        : token.text;
    }
    case 'paragraph': {
      return '<p>'
        + inline.lexer(token.text)
        + '</p>\n';
    }
    case 'text': {
      return '<p>'
        + parseText()
        + '</p>\n';
    }
  }
}

function parseText() {
  var body = token.text
    , top;

  while ((top = tokens[tokens.length-1])
         && top.type === 'text') {
    body += '\n' + next().text;
  }

  return inline.lexer(body);
}

function parse(src) {
  tokens = src.reverse();

  var out = '';
  while (next()) {
    out += tok();
  }

  tokens = null;
  token = null;

  return out;
}

/**
 * Helpers
 */

function escape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function mangle(text) {
  var out = ''
    , l = text.length
    , i = 0
    , ch;

  for (; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = 'x' + ch.toString(16);
    }
    out += '&#' + ch + ';';
  }

  return out;
}

function tag() {
  var tag = '(?!(?:'
    + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'
    + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'
    + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|@)\\b';

  return tag;
}

function replace(regex, opt) {
  regex = regex.source;
  opt = opt || '';
  return function self(name, val) {
    if (!name) return new RegExp(regex, opt);
    val = val.source || val;
    val = val.replace(/(^|[^\[])\^/g, '$1');
    regex = regex.replace(name, val);
    return self;
  };
}

function noop() {}
noop.exec = noop;

/**
 * Marked
 */

function marked(src, opt) {
  setOptions(opt);
  if (opt && opt.saveLex) {
    return [parse(block.lexer(src)), block.lexer(src)];
  } else {
    return parse(block.lexer(src));
  }
}

/**
 * Options
 */

var options
  , defaults;

function setOptions(opt) {
  if (!opt) opt = defaults;
  if (options === opt) return;
  options = opt;

  if (options.gfm) {
    block.fences = block.gfm.fences;
    block.paragraph = block.gfm.paragraph;
    inline.text = inline.gfm.text;
    inline.url = inline.gfm.url;
  } else {
    block.fences = block.normal.fences;
    block.paragraph = block.normal.paragraph;
    inline.text = inline.normal.text;
    inline.url = inline.normal.url;
  }

  if (options.pedantic) {
    inline.em = inline.pedantic.em;
    inline.strong = inline.pedantic.strong;
  } else {
    inline.em = inline.normal.em;
    inline.strong = inline.normal.strong;
  }
}

marked.options =
marked.setOptions = function(opt) {
  defaults = opt;
  setOptions(opt);
  return marked;
};

marked.setOptions({
  gfm: true,
  pedantic: false,
  sanitize: false,
  highlight: null
});

/**
 * Expose
 */

marked.parser = function(src, opt) {
  setOptions(opt);
  return parse(src);
};

marked.lexer = function(src, opt) {
  setOptions(opt);
  return block.lexer(src);
};

marked.parse = marked;

if (typeof module !== 'undefined') {
  module.exports = marked;
} else {
  this.marked = marked;
}

}).call(function() {
  return this || (typeof window !== 'undefined' ? window : global);
}());
;
(function(){var require = function (file, cwd) {
    var resolved = require.resolve(file, cwd || '/');
    var mod = require.modules[resolved];
    if (!mod) throw new Error(
        'Failed to resolve module ' + file + ', tried ' + resolved
    );
    var cached = require.cache[resolved];
    var res = cached? cached.exports : mod();
    return res;
};

require.paths = [];
require.modules = {};
require.cache = {};
require.extensions = [".js",".coffee",".json"];

require._core = {
    'assert': true,
    'events': true,
    'fs': true,
    'path': true,
    'vm': true
};

require.resolve = (function () {
    return function (x, cwd) {
        if (!cwd) cwd = '/';
        
        if (require._core[x]) return x;
        var path = require.modules.path();
        cwd = path.resolve('/', cwd);
        var y = cwd || '/';
        
        if (x.match(/^(?:\.\.?\/|\/)/)) {
            var m = loadAsFileSync(path.resolve(y, x))
                || loadAsDirectorySync(path.resolve(y, x));
            if (m) return m;
        }
        
        var n = loadNodeModulesSync(x, y);
        if (n) return n;
        
        throw new Error("Cannot find module '" + x + "'");
        
        function loadAsFileSync (x) {
            x = path.normalize(x);
            if (require.modules[x]) {
                return x;
            }
            
            for (var i = 0; i < require.extensions.length; i++) {
                var ext = require.extensions[i];
                if (require.modules[x + ext]) return x + ext;
            }
        }
        
        function loadAsDirectorySync (x) {
            x = x.replace(/\/+$/, '');
            var pkgfile = path.normalize(x + '/package.json');
            if (require.modules[pkgfile]) {
                var pkg = require.modules[pkgfile]();
                var b = pkg.browserify;
                if (typeof b === 'object' && b.main) {
                    var m = loadAsFileSync(path.resolve(x, b.main));
                    if (m) return m;
                }
                else if (typeof b === 'string') {
                    var m = loadAsFileSync(path.resolve(x, b));
                    if (m) return m;
                }
                else if (pkg.main) {
                    var m = loadAsFileSync(path.resolve(x, pkg.main));
                    if (m) return m;
                }
            }
            
            return loadAsFileSync(x + '/index');
        }
        
        function loadNodeModulesSync (x, start) {
            var dirs = nodeModulesPathsSync(start);
            for (var i = 0; i < dirs.length; i++) {
                var dir = dirs[i];
                var m = loadAsFileSync(dir + '/' + x);
                if (m) return m;
                var n = loadAsDirectorySync(dir + '/' + x);
                if (n) return n;
            }
            
            var m = loadAsFileSync(x);
            if (m) return m;
        }
        
        function nodeModulesPathsSync (start) {
            var parts;
            if (start === '/') parts = [ '' ];
            else parts = path.normalize(start).split('/');
            
            var dirs = [];
            for (var i = parts.length - 1; i >= 0; i--) {
                if (parts[i] === 'node_modules') continue;
                var dir = parts.slice(0, i + 1).join('/') + '/node_modules';
                dirs.push(dir);
            }
            
            return dirs;
        }
    };
})();

require.alias = function (from, to) {
    var path = require.modules.path();
    var res = null;
    try {
        res = require.resolve(from + '/package.json', '/');
    }
    catch (err) {
        res = require.resolve(from, '/');
    }
    var basedir = path.dirname(res);
    
    var keys = (Object.keys || function (obj) {
        var res = [];
        for (var key in obj) res.push(key);
        return res;
    })(require.modules);
    
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (key.slice(0, basedir.length + 1) === basedir + '/') {
            var f = key.slice(basedir.length);
            require.modules[to + f] = require.modules[basedir + f];
        }
        else if (key === basedir) {
            require.modules[to] = require.modules[basedir];
        }
    }
};

(function () {
    var process = {};
    
    require.define = function (filename, fn) {
        if (require.modules.__browserify_process) {
            process = require.modules.__browserify_process();
        }
        
        var dirname = require._core[filename]
            ? ''
            : require.modules.path().dirname(filename)
        ;
        
        var require_ = function (file) {
            var requiredModule = require(file, dirname);
            var cached = require.cache[require.resolve(file, dirname)];

            if (cached && cached.parent === null) {
                cached.parent = module_;
            }

            return requiredModule;
        };
        require_.resolve = function (name) {
            return require.resolve(name, dirname);
        };
        require_.modules = require.modules;
        require_.define = require.define;
        require_.cache = require.cache;
        var module_ = {
            id : filename,
            filename: filename,
            exports : {},
            loaded : false,
            parent: null
        };
        
        require.modules[filename] = function () {
            require.cache[filename] = module_;
            fn.call(
                module_.exports,
                require_,
                module_,
                module_.exports,
                dirname,
                filename,
                process
            );
            module_.loaded = true;
            return module_.exports;
        };
    };
})();


require.define("path",function(require,module,exports,__dirname,__filename,process){function filter (xs, fn) {
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (fn(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length; i >= 0; i--) {
    var last = parts[i];
    if (last == '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Regex to split a filename into [*, dir, basename, ext]
// posix version
var splitPathRe = /^(.+\/(?!$)|\/)?((?:.+?)?(\.[^.]*)?)$/;

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
var resolvedPath = '',
    resolvedAbsolute = false;

for (var i = arguments.length; i >= -1 && !resolvedAbsolute; i--) {
  var path = (i >= 0)
      ? arguments[i]
      : process.cwd();

  // Skip empty and invalid entries
  if (typeof path !== 'string' || !path) {
    continue;
  }

  resolvedPath = path + '/' + resolvedPath;
  resolvedAbsolute = path.charAt(0) === '/';
}

// At this point the path should be resolved to a full absolute path, but
// handle relative paths to be safe (might happen when process.cwd() fails)

// Normalize the path
resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
var isAbsolute = path.charAt(0) === '/',
    trailingSlash = path.slice(-1) === '/';

// Normalize the path
path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }
  
  return (isAbsolute ? '/' : '') + path;
};


// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    return p && typeof p === 'string';
  }).join('/'));
};


exports.dirname = function(path) {
  var dir = splitPathRe.exec(path)[1] || '';
  var isWindows = false;
  if (!dir) {
    // No dirname
    return '.';
  } else if (dir.length === 1 ||
      (isWindows && dir.length <= 3 && dir.charAt(1) === ':')) {
    // It is just a slash or a drive letter with a slash
    return dir;
  } else {
    // It is a full dirname, strip trailing slash
    return dir.substring(0, dir.length - 1);
  }
};


exports.basename = function(path, ext) {
  var f = splitPathRe.exec(path)[2] || '';
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPathRe.exec(path)[3] || '';
};

});

require.define("__browserify_process",function(require,module,exports,__dirname,__filename,process){var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
        && window.setImmediate;
    var canPost = typeof window !== 'undefined'
        && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return window.setImmediate;
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            if (ev.source === window && ev.data === 'browserify-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('browserify-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    if (name === 'evals') return (require)('vm')
    else throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    process.cwd = function () { return cwd };
    process.chdir = function (dir) {
        if (!path) path = require('path');
        cwd = path.resolve(dir, cwd);
    };
})();

});

require.define("/base.js",function(require,module,exports,__dirname,__filename,process){// Generated by CoffeeScript 1.3.3
(function() {
  var exports;

  exports = module.exports;

  exports.d = function(obj) {
    return obj.constructor.name;
  };

  exports.log = function(str) {
    return console.log(str);
  };

}).call(this);

});

require.define("/proto.js",function(require,module,exports,__dirname,__filename,process){// Generated by CoffeeScript 1.3.3
(function() {
  var Server, VarStorage, caresAbout, cmds, error_bad_master, error_bad_message, error_bad_peer_request, error_bad_storage_mode, error_duplicate_peer_name, error_private_variable, error_variable_not_array, error_variable_not_object, exports, keysForPrefix, prefixes, renameVars, setCmds, storageModes, storage_memory, storage_peer, storage_permanent, storage_transient, warning_no_storage, warning_peer_request, _,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __slice = [].slice;

  exports = module.exports = require('./base');

  require('./transport');

  _ = require('./lodash.min');

  cmds = ['response', 'value', 'set', 'put', 'splice', 'removeFirst', 'removeAll'];

  exports.setCmds = setCmds = ['set', 'put', 'splice', 'removeFirst', 'removeAll'];

  warning_no_storage = 'warning_no_storage';

  warning_peer_request = 'warning_peer_request';

  error_bad_message = 'error_bad_message';

  error_bad_storage_mode = 'error_bad_storage_mode';

  error_variable_not_object = 'error_variable_not_object';

  error_variable_not_array = 'error_variable_not_array';

  error_duplicate_peer_name = 'error_duplicate_peer_name';

  error_private_variable = 'error_private_variable';

  error_bad_master = 'error_bad_master';

  error_bad_peer_request = 'error_bad_peer_request';

  storage_memory = 'memory';

  storage_transient = 'transient';

  storage_permanent = 'permanent';

  storage_peer = 'peer';

  storageModes = [storage_transient, storage_memory, storage_permanent, storage_peer];

  exports.Server = Server = (function() {

    Server.prototype.verbose = function() {};

    Server.prototype.newKeys = false;

    Server.prototype.anonymousPeerCount = 0;

    function Server() {
      this.connections = [];
      this.peers = {};
      this.varStorage = new VarStorage(this);
      this.storageModes = {};
      this.linksToPeers = {};
      this.changedLinks = null;
      this.pendingRequests = {};
      this.pendingRequestNum = 0;
    }

    Server.prototype.createPeer = function(peerFactory) {
      return exports.createDirectPeer(this, peerFactory);
    };

    Server.prototype.newPeer = function() {
      return this.createPeer(function(con) {
        return new xus.Peer(con);
      });
    };

    Server.prototype.processBatch = function(con, batch, nolinks) {
      var c, msg, _i, _j, _len, _len1, _ref, _results;
      while (batch.length) {
        this.nextBatch = [];
        for (_i = 0, _len = batch.length; _i < _len; _i++) {
          msg = batch[_i];
          this.verbose("RECEIVED " + (JSON.stringify(msg)));
          this.processMsg(con, msg, msg, nolinks);
        }
        nolinks = true;
        this.varStorage.sortKeys();
        if (this.newListens) {
          this.setListens(con);
          this.newListens = false;
        }
        if (this.newConLinks) {
          this.setLinks(con);
          this.newConLinks = false;
        }
        if (this.changedLinks) {
          this.processLinks(con, this.changedLinks);
          this.changedLinks = null;
        }
        batch = this.nextBatch;
      }
      _ref = this.connections;
      _results = [];
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        c = _ref[_j];
        _results.push(c != null ? c.send() : void 0);
      }
      return _results;
    };

    Server.prototype.processMsg = function(con, _arg, msg, noLinks) {
      var isMyPeerKey, key, name, tmpMsg, x, x1, x2,
        _this = this;
      name = _arg[0];
      if (con.isConnected()) {
        if (__indexOf.call(cmds, name) >= 0) {
          if (name === 'response') {
            x1 = msg[0], x2 = msg[1], tmpMsg = msg[2];
          } else {
            tmpMsg = msg;
          }
          x = tmpMsg[0], key = tmpMsg[1];
          if (typeof key === 'string') {
            key = tmpMsg[1] = key.replace(new RegExp('^this/'), "" + con.peerPath + "/");
          }
          isMyPeerKey = key.match("^" + con.peerPath + "/");
          if (!isMyPeerKey && !noLinks && key.match("^peer/") && !key.match("^.*/public(/|$)")) {
            return this.primDisconnect(con, error_private_variable, "Error, " + con.name + " (key = " + key + ", peerPath = " + con.peerPath + ", match = " + (key.match("^" + con.peerPath)) + ") attempted to change another peer's private variable: '" + key + "' in message: " + (JSON.stringify(msg)));
          } else {
            if (isMyPeerKey) {
              switch (key) {
                case con.listenPath:
                  this.newListens = true;
                  break;
                case !noLinks && con.linksPath:
                  this.verbose("Setting links: " + msg);
                  this.newConLinks = true;
              }
            }
            if (!noLinks && this.linksToPeers[key]) {
              if (!this.changedLinks) {
                this.changedLinks = {};
              }
              this.changedLinks[key] = true;
            }
            if (name !== 'response' && this.shouldDelegate(con, key)) {
              return this.delegate(con, msg);
            } else {
              this.verbose("EXECUTING: " + (JSON.stringify(msg)));
              return this[name](con, msg, function() {
                var c, _i, _len, _ref;
                if (__indexOf.call(setCmds, name) >= 0) {
                  if (key === con.namePath) {
                    _this.name(con, msg[2]);
                  } else if (key === con.masterPath) {
                    _this.setMaster(con, msg[2]);
                  }
                  _ref = _this.relevantConnections(prefixes(key));
                  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    c = _ref[_i];
                    c.addCmd(msg);
                  }
                  if (_this.varStorage.keyInfo[key] === storage_permanent) {
                    return _this.store(con, key, value);
                  }
                }
              });
            }
          }
        } else {
          return this.primDisconnect(con, error_bad_message, "Unknown command, '" + name + "' in message: " + (JSON.stringify(msg)));
        }
      } else if (noLinks) {
        x = msg[0], key = msg[1];
        if (!key.match(new RegExp("^this|^peer/" + con.peerPath + "/"))) {
          return this[name](con, msg, function() {
            var c, _i, _len, _ref, _results;
            _this.verbose("EXECUTED: " + msg);
            _ref = _this.relevantConnections(prefixes(key));
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              c = _ref[_i];
              _results.push(c.addCmd(msg));
            }
            return _results;
          });
        }
      }
    };

    Server.prototype.shouldDelegate = function(con, key) {
      var match;
      if (this.isPeerVar(key)) {
        match = key.match(/^peer\/([^/]+)\//);
        return this.peers[match[1]] !== con;
      } else {
        return false;
      }
    };

    Server.prototype.isPeerVar = function(key) {
      var _this = this;
      return _.any(prefixes(key), function(k) {
        return _this.varStorage.keyInfo[k] === storage_peer;
      });
    };

    Server.prototype.relevantConnections = function(keyPrefixes) {
      return _.filter(this.connections, function(c) {
        return caresAbout(c, keyPrefixes);
      });
    };

    Server.prototype.setConName = function(con, name) {
      con.name = name;
      con.peerPath = "peer/" + name;
      con.namePath = "" + con.peerPath + "/name";
      con.listenPath = "" + con.peerPath + "/listen";
      con.linksPath = "" + con.peerPath + "/links";
      con.masterPath = "" + con.peerPath + "/master";
      con.requests = {};
      this.peers[name] = con;
      return this.varStorage.setKey(con.namePath, name);
    };

    Server.prototype.addConnection = function(con) {
      this.verbose("Xus add connection");
      this.setConName(con, "@anonymous-" + (this.anonymousPeerCount++));
      con.listening = {};
      con.links = {};
      this.connections.push(con);
      this.varStorage.setKey(con.listenPath, []);
      con.date = new Date().getTime();
      con.addCmd(['set', 'this/name', con.name, con.date]);
      return con.send();
    };

    Server.prototype.renamePeerKeys = function(con, oldName, newName) {
      var l, newCL, newPrefix, newVL, oldPrefixPat;
      this.varStorage.keys = renameVars(this.varStorage.keys, this.varStorage.values, this.varStorage.handlers, oldName, newName)[0];
      newCL = {};
      newVL = [];
      newPrefix = "peer/" + newName;
      oldPrefixPat = new RegExp("^peer/" + oldName + "(?=/|$)");
      for (l in con.listening) {
        l = l.replace(oldPrefixPat, newPrefix);
        newCL[l] = true;
        newVL.push(l);
      }
      con.listening = newCL;
      newVL.sort();
      return this.varStorage.setKey("" + newPrefix + "/listen", newVL);
    };

    Server.prototype.disconnect = function(con, errorType, msg) {
      this.primDisconnect(con, errorType, msg);
      if (this.nextBatch) {
        return this.processBatch(con, this.nextBatch, true);
      }
    };

    Server.prototype.primDisconnect = function(con, errorType, msg) {
      var batch, idx, key, num, peerKey, peerKeys, _i, _j, _len, _len1, _ref;
      idx = this.connections.indexOf(con);
      batch = [];
      if (idx > -1) {
        this.varStorage.setKey(con.linksPath, []);
        batch = this.setLinks(con);
        peerKey = con.peerPath;
        peerKeys = this.varStorage.keysForPrefix(peerKey);
        if (con.name) {
          delete this.peers[con.name];
        }
        for (_i = 0, _len = peerKeys.length; _i < _len; _i++) {
          key = peerKeys[_i];
          this.varStorage.removeKey(key);
        }
        this.connections.splice(idx, 1);
        if (msg) {
          this.error(con, errorType, msg);
        }
        con.send();
        con.close();
        _ref = con.requests;
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          num = _ref[_j];
          delete this.pendingRequests[num];
        }
        if (con === this.master) {
          this.exit();
        }
      }
      return false;
    };

    Server.prototype.exit = function() {
      return console.log("No custom exit function");
    };

    Server.prototype.setListens = function(con) {
      var conPath, finalListen, old, path, thisPath, _i, _len, _ref;
      thisPath = new RegExp("^this/");
      conPath = "" + con.peerPath + "/";
      old = con.listening;
      con.listening = {};
      finalListen = [];
      _ref = this.varStorage.values[con.listenPath];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        path = _ref[_i];
        if (path.match("^peer/") && !path.match("^peer/[^/]+/public") && !path.match("^" + con.peerPath)) {
          this.primDisconnect(con, error_private_variable, "Error, " + con.name + " attempted to listen to a peer's private variables in message: " + (JSON.stringify(msg)));
          return;
        }
        path = path.replace(thisPath, conPath);
        finalListen.push(path);
        con.listening[path] = true;
        if (_.all(prefixes(path), (function(p) {
          return !old[p];
        }))) {
          this.sendTree(con, path, ['value', path, null, true]);
        }
        old[path] = true;
      }
      return this.varStorage.setKey(con.listenPath, finalListen);
    };

    Server.prototype.setLinks = function(con) {
      var l, old, _i, _len, _ref, _results;
      this.verbose("PRIM SET LINKS, LINKS PATH: " + con.linksPath + ", NEW " + (JSON.stringify(this.varStorage.values[con.linksPath])) + ", OLD: " + (JSON.stringify(con.links)));
      old = {};
      for (l in con.links) {
        old[l] = true;
      }
      _ref = this.varStorage.values[con.linksPath];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        l = _ref[_i];
        if (!old[l]) {
          this.addLink(con, l);
        } else {
          delete old[l];
        }
      }
      _results = [];
      for (l in old) {
        _results.push(this.removeLink(con, l));
      }
      return _results;
    };

    Server.prototype.processLinks = function(con, changed) {
      var l, link, old, p, _i, _len, _ref, _results;
      _results = [];
      for (link in changed) {
        old = {};
        for (l in this.linksToPeers[link]) {
          old[l] = true;
        }
        _ref = this.varStorage.values[link];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          if (!old[p]) {
            this.addLink(this.peers[p], link);
          } else {
            delete old[p];
          }
        }
        _results.push((function() {
          var _results1;
          _results1 = [];
          for (p in old) {
            _results1.push(this.removeLink(this.peers[p], link));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    Server.prototype.addLink = function(con, link) {
      this.verbose("ADDING LINK: " + (JSON.stringify(link)));
      if (!this.linksToPeers[link]) {
        this.linksToPeers[link] = {};
      }
      this.linksToPeers[link][con.name] = con.links[link] = true;
      this.nextBatch.push(['splice', link, -1, 0, con.name]);
      return this.nextBatch.push(['splice', "peer/" + con.name + "/links", -1, 0, link]);
    };

    Server.prototype.removeLink = function(con, link) {
      var _ref;
      this.verbose("REMOVING LINK: " + (JSON.stringify(link)));
      delete con.links[link];
      if ((_ref = this.linksToPeers[link]) != null) {
        delete _ref[con.name];
      }
      if (this.linksToPeers[link] && !this.linksToPeers[link].length) {
        delete this.linksToPeers[link];
      }
      this.nextBatch.push(['removeAll', link, con.name]);
      return this.nextBatch.push(['removeAll', "peer/" + con.name + "/links", link]);
    };

    Server.prototype.error = function(con, errorType, msg) {
      con.addCmd(['error', errorType, msg]);
      return false;
    };

    Server.prototype.sendTree = function(con, path, cmd) {
      return this.handleStorageCommand(con, cmd, function() {
        return con.addCmd(cmd);
      });
    };

    Server.prototype.delegate = function(con, cmd) {
      var key, match, num, peer, x;
      x = cmd[0], key = cmd[1];
      if (match = key.match(/^peer\/([^/]+)\//)) {
        this.verbose("DELEGATING: " + (JSON.stringify(cmd)));
        peer = this.peers[match[1]];
        num = this.pendingRequestNum++;
        peer.requests[num] = true;
        this.pendingRequests[num] = [peer, con];
        return peer.addCmd(['request', con.name, num, cmd]);
      } else {
        return this.error(con, error_bad_peer_request, "Bad request: " + cmd);
      }
    };

    Server.prototype.get = function(key) {
      return this.varStorage.values[key];
    };

    Server.prototype.name = function(con, name) {
      if (!(name != null)) {
        return this.primDisconnect(con, error_bad_message, "No name given in name message");
      } else if (this.peers[name]) {
        return this.primDisconnect(con, error_duplicate_peer_name, "Duplicate peer name: " + name);
      } else {
        delete this.peers[con.name];
        this.renamePeerKeys(con, con.name, name);
        this.setConName(con, name);
        return con.addCmd(['set', 'this/name', name]);
      }
    };

    Server.prototype.setMaster = function(con, value) {
      if ((this.master != null) && this.master !== con) {
        return this.primDisconnect(con, error_bad_master, "Xus cannot serve two masters");
      } else {
        this.master = value ? con : null;
        return con.addCmd(['set', 'this/master', value]);
      }
    };

    Server.prototype.value = function(con, cmd, cont) {
      var key, x;
      x = cmd[0], key = cmd[1];
      if (this.isPeerVar(key)) {
        return this.delegate(con, [cmd], cont);
      } else {
        return this.handleStorageCommand(con, cmd, function() {
          con.addCmd(cmd);
          return cont();
        });
      }
    };

    Server.prototype.set = function(con, cmd, cont) {
      var key, storageMode, value, x;
      x = cmd[0], key = cmd[1], value = cmd[2], storageMode = cmd[3];
      if (storageMode && storageModes.indexOf(storageMode) === -1) {
        return this.error(con, error_bad_storage_mode, "" + storageMode + " is not a valid storage mode");
      } else if (this.varStorage.values[key] === value) {
        return false;
      } else {
        if (storageMode && storageMode !== this.varStorage.keyInfo[key] && this.varStorage.keyInfo[key] === storage_permanent) {
          this.remove(con, key);
        }
        this.varStorage.keyInfo[key] = storageMode = storageMode || this.varStorage.keyInfo[key] || storage_memory;
        if (storageMode !== storage_transient) {
          if (!this.varStorage.keyInfo[key]) {
            this.varStorage.keys.push(key);
            this.newKeys = true;
          }
          return this.handleStorageCommand(con, cmd, function() {
            cmd[2] = value;
            return cont();
          });
        } else {
          return cont();
        }
      }
    };

    Server.prototype.put = function(con, cmd, cont) {
      return this.handleStorageCommand(con, cmd, cont);
    };

    Server.prototype.splice = function(con, cmd, cont) {
      return this.handleStorageCommand(con, cmd, cont);
    };

    Server.prototype.removeFirst = function(con, cmd, cont) {
      var key, value, x;
      x = cmd[0], key = cmd[1], value = cmd[2];
      if (!this.varStorage.canRemove(key)) {
        return this.primDisconnect(con, error_variable_not_array, "Can't insert into " + key + " because it does not support splice and indexOf");
      } else {
        return this.handleStorageCommand(con, cmd, cont);
      }
    };

    Server.prototype.removeAll = function(con, cmd, cont) {
      return this.handleStorageCommand(con, cmd, cont);
    };

    Server.prototype.response = function(con, rcmd, cont) {
      var arg, c, cmd, cmdName, id, key, peer, receiver, x, _i, _len, _ref, _ref1;
      x = rcmd[0], id = rcmd[1], cmd = rcmd[2];
      _ref = this.pendingRequests[id], peer = _ref[0], receiver = _ref[1];
      delete this.pendingRequests[id];
      if (peer !== con) {
        return this.primDisconnect(peer, error_bad_peer_request, "Attempt to responsd to an invalid request");
      } else {
        delete peer.requests[id];
        if (cmd != null) {
          cmdName = cmd[0], key = cmd[1], arg = cmd[2];
          if (cmdName === 'error' && key === error_bad_peer_request) {
            this.primDisconnect(receiver, key, arg);
          } else if (cmdName === 'error' || cmdName === 'value') {
            receiver.addCmd(cmd);
          } else {
            _ref1 = this.relevantConnections(prefixes(key));
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
              c = _ref1[_i];
              c.addCmd(msg);
            }
          }
        }
        return cont();
      }
    };

    Server.prototype.handleStorageCommand = function(con, cmd, cont) {
      var _this = this;
      return this.varStorage.handle(cmd, (function(type, msg) {
        return _this.primDisconnect(con, type, msg);
      }), cont);
    };

    return Server;

  })();

  exports.VarStorage = VarStorage = (function() {

    function VarStorage(owner) {
      this.owner = owner;
      this.keys = [];
      this.values = {};
      this.handlers = {};
      this.keyInfo = {};
      this.newKeys = false;
    }

    VarStorage.prototype.toString = function() {
      return "A VarStorage";
    };

    VarStorage.prototype.verbose = function() {
      var args, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (_ref = this.owner).verbose.apply(_ref, args);
    };

    VarStorage.prototype.handle = function(cmd, errBlock, cont) {
      var args, key, name;
      name = cmd[0], key = cmd[1], args = 3 <= cmd.length ? __slice.call(cmd, 2) : [];
      return this.handlerFor(key)[name](cmd, errBlock, cont);
    };

    VarStorage.prototype.handlerFor = function(key) {
      var handler, k,
        _this = this;
      k = _.find(prefixes(key), function(p) {
        return _this.handlers[p];
      });
      handler = k ? this.handlers[k] : this;
      return handler;
    };

    VarStorage.prototype.addKey = function(key, info) {
      if (!this.keyInfo[key]) {
        this.newKeys = true;
        this.keyInfo[key] = info;
        return this.keys.push(key);
      }
    };

    VarStorage.prototype.sortKeys = function() {
      if (this.newKeys) {
        this.keys.sort();
        return this.newKeys = false;
      }
    };

    VarStorage.prototype.setKey = function(key, value, info) {
      var obj;
      if (typeof value === 'function') {
        obj = this.addHandler(key, {
          put: function(_arg, errBlock, cont) {
            var args, result, x;
            x = _arg[0], args = 2 <= _arg.length ? __slice.call(_arg, 1) : [];
            try {
              result = value.apply(null, args);
            } catch (err) {
              return errBlock(error_bad_peer_request, "Error in computed value: " + (err.stack ? err.stack.join('\n') : err));
            }
            return cont(result);
          }
        });
        obj.set = obj.get = obj.put;
      } else {
        this.values[key] = value;
      }
      this.addKey(key, info || storage_memory);
      return value;
    };

    VarStorage.prototype.removeKey = function(key) {
      var idx;
      delete this.keyInfo[key];
      delete this.varStorage.values[key];
      idx = _.sortedIndex(key, this.keys);
      if (idx > -1) {
        return this.keys.splice(idx, 1);
      }
    };

    VarStorage.prototype.isObject = function(key) {
      return typeof this.values[key] === 'object';
    };

    VarStorage.prototype.canSplice = function(key) {
      return !this.values[key] || ((this.values[key].splice != null) && (this.values[key].length != null));
    };

    VarStorage.prototype.canRemove = function(key) {
      return canSplice(key) && (this.values[key].indexOf != null);
    };

    VarStorage.prototype.contains = function(key) {
      return this.values[key] != null;
    };

    VarStorage.prototype.keysForPrefix = function(pref) {
      return keysForPrefix(this.keys, this.values, pref);
    };

    VarStorage.prototype.addHandler = function(path, obj) {
      obj.__proto__ = this;
      obj.toString = function() {
        return "A Handler for " + path;
      };
      this.handlers[path] = obj;
      this.addKey(path, 'handler');
      return obj;
    };

    VarStorage.prototype.value = function(cmd, errBlock, cont) {
      var blk, cookie, counter, key, keys, path, tree, x, _i, _len;
      x = cmd[0], path = cmd[1], cookie = cmd[2], tree = cmd[3];
      if (tree) {
        keys = [path].concat(__slice.call(this.keysForPrefix(path)));
        console.log("GETTING VALUES FOR PATH: " + path + " KEYS: " + (JSON.stringify(keys)));
        counter = keys.length;
        blk = function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          counter = 0;
          return errBlock.apply(null, args);
        };
        if (counter) {
          for (_i = 0, _len = keys.length; _i < _len; _i++) {
            key = keys[_i];
            this.handle(['get', key], blk, function(v) {
              console.log("VALUE FOR " + key + " IS " + v);
              if (v) {
                cmd.push(key, v);
              }
              if (--counter === 0) {
                return cont(cmd);
              }
            });
            if (counter < 1) {
              return;
            }
          }
        } else {
          cont(cmd);
        }
      } else {
        this.handle(['get', path], errBlock, function(v) {
          if (v) {
            cmd.push(path, v);
          }
          return cont(cmd);
        });
      }
      return cmd;
    };

    VarStorage.prototype.get = function(_arg, errBlock, cont) {
      var key, x;
      x = _arg[0], key = _arg[1];
      return cont(this.values[key]);
    };

    VarStorage.prototype.set = function(cmd, errBlock, cont) {
      var info, key, storageMode, value, x;
      x = cmd[0], key = cmd[1], value = cmd[2], info = cmd[3];
      if (storageMode && storageModes.indexOf(storageMode) === -1) {
        return errBlock(error_bad_storage_mode, "" + storageMode + " is not a valid storage mode");
      } else {
        this.keyInfo[key] = storageMode = storageMode || this.keyInfo[key] || storage_memory;
        cmd[2] = value;
        if (storageMode !== storage_transient) {
          if (!this.keyInfo[key]) {
            this.keys.push(key);
          }
          return cont(this.setKey(key, value, info));
        }
      }
    };

    VarStorage.prototype.put = function(_arg, errBlock, cont) {
      var index, key, value, x;
      x = _arg[0], key = _arg[1], value = _arg[2], index = _arg[3];
      if (!this.values[key]) {
        this.values[key] = {};
      }
      if (typeof this.values[key] !== 'object' || this.values[key] instanceof Array) {
        return errBlock(error_variable_not_object("" + key + " is not an object"));
      } else {
        return cont(this.values[key][index] = value);
      }
    };

    VarStorage.prototype.splice = function(_arg, errBlock, cont) {
      var args, key, x, _ref;
      x = _arg[0], key = _arg[1], args = 3 <= _arg.length ? __slice.call(_arg, 2) : [];
      this.verbose("SPLICING: " + (JSON.stringify([x, key].concat(__slice.call(args)))));
      if (!this.values[key]) {
        this.values[key] = [];
      }
      if (typeof this.values[key] !== 'object' || !(this.values[key] instanceof Array)) {
        return errBlock(error_variable_not_array, "" + key + " is not an array");
      } else {
        if (args[0] < 0) {
          args[0] = this.values[key].length + args[0] + 1;
        }
        (_ref = this.values[key]).splice.apply(_ref, args);
        return cont(this.values[key]);
      }
    };

    VarStorage.prototype.removeFirst = function(_arg, errBlock, cont) {
      var idx, key, val, value, x;
      x = _arg[0], key = _arg[1], value = _arg[2];
      if (typeof this.values[key] !== 'object' || !(this.values[key] instanceof Array)) {
        return errBlock(error_variable_not_array, "" + key + " is not an array");
      } else {
        val = this.values[key];
        idx = val.indexOf(value);
        if (idx > -1) {
          val.splice(idx, 1);
        }
        return cont(val);
      }
    };

    VarStorage.prototype.removeAll = function(_arg, errBlock, cont) {
      var idx, key, val, value, x;
      x = _arg[0], key = _arg[1], value = _arg[2];
      if (typeof this.values[key] !== 'object' || !(this.values[key] instanceof Array)) {
        return errBlock(error_variable_not_array, "" + key + " is not an array");
      } else {
        val = this.values[key];
        while ((idx = val.indexOf(value)) > -1) {
          val.splice(idx, 1);
        }
        return cont(val);
      }
    };

    return VarStorage;

  })();

  exports.renameVars = renameVars = function(keys, values, handlers, oldName, newName) {
    var k, key, newKey, newPrefix, oldPrefix, oldPrefixPat, trans, _i, _len, _ref;
    oldPrefix = "peer/" + oldName;
    newPrefix = "peer/" + newName;
    oldPrefixPat = new RegExp("^" + oldPrefix + "(?=/|$)");
    trans = {};
    _ref = keysForPrefix(keys, values, oldPrefix);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      newKey = key.replace(oldPrefixPat, newPrefix);
      values[newKey] = values[key];
      handlers[newKey] = handlers[key];
      trans[key] = newKey;
      delete values[key];
      delete handlers[key];
    }
    keys = (function() {
      var _results;
      _results = [];
      for (k in values) {
        _results.push(k);
      }
      return _results;
    })();
    keys.sort();
    return [keys, trans];
  };

  keysForPrefix = function(keys, values, prefix) {
    var idx, initialPattern, prefixPattern, result, _i, _ref, _ref1, _results;
    initialPattern = "^" + prefix + "(/|$)";
    result = [];
    idx = _.find((function() {
      _results = [];
      for (var _i = 0, _ref = keys.length; 0 <= _ref ? _i < _ref : _i > _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
      return _results;
    }).apply(this), function(i) {
      return keys[i].match(initialPattern);
    });
    if (idx > -1) {
      prefixPattern = "^" + prefix + "/";
      if (values[prefix] != null) {
        result.push(prefix);
      }
      while ((_ref1 = keys[++idx]) != null ? _ref1.match(prefixPattern) : void 0) {
        if (values[prefix] != null) {
          result.push(keys[idx]);
        }
      }
    }
    return result;
  };

  caresAbout = function(con, keyPrefixes) {
    return _.any(keyPrefixes, function(p) {
      return con.listening[p];
    });
  };

  exports.prefixes = prefixes = function(key) {
    var result, splitKey;
    result = [];
    splitKey = _.without(key.split('/'), '');
    while (splitKey.length) {
      result.push(splitKey.join('/'));
      splitKey.pop();
    }
    return result;
  };

}).call(this);

});

require.define("/transport.js",function(require,module,exports,__dirname,__filename,process){// Generated by CoffeeScript 1.3.3
(function() {
  var CometClientConnection, CometConnection, Connection, ConnectionEndpoint, FdConnection, JSONCodec, ProxyMux, SocketConnection, WebSocketConnection, XusEndpoint, d, deadComets, error_bad_connection, exports, fs, _,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  d = (exports = module.exports = require('./base')).d;

  error_bad_connection = require('./proto').error_bad_connection;

  _ = require('./lodash.min');

  fs = require('fs');

  exports.JSONCodec = JSONCodec = {
    prepare: function(con) {},
    send: function(con, obj) {
      return con.write("" + (JSON.stringify(obj)) + "\n");
    },
    newData: function(con, data) {
      var batch, msgs, _i, _len, _ref, _results;
      if (typeof data !== 'string') {
        data = data.toString();
      }
      msgs = (con.saved + data).trim().split('\n');
      con.saved = data[data.length - 1] === '\n' ? '' : msgs.pop();
      _ref = _.map(msgs, function(m) {
        try {
          con.verbose("PROCESSING BATCH: " + m);
          return JSON.parse(m);
        } catch (err) {
          con.addCmd(['error', "Could not parse message: " + m]);
          return con.send();
        }
      });
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        batch = _ref[_i];
        _results.push(con.processBatch(batch));
      }
      return _results;
    }
  };

  exports.Connection = Connection = (function() {

    Connection.prototype.write = function(str) {
      return this.master.disconnect(this, error_bad_connection, "Connection has no 'write' method");
    };

    Connection.prototype.basicClose = function() {
      return this.master.disconnect(this, error_bad_connection, "Connection has no 'disconnect' method");
    };

    function Connection(master, codec, saved) {
      var _ref;
      this.codec = codec;
      this.saved = saved != null ? saved : '';
      this.codec = (_ref = this.codec) != null ? _ref : JSONCodec;
      try {
        this.codec.prepare(this);
      } catch (err) {
        console.log(err.stack);
      }
      this.q = [];
      this.connected = true;
      this.setMaster(master);
    }

    Connection.prototype.setMaster = function(master) {
      this.master = master;
    };

    Connection.prototype.verbose = function(str) {
      return this.master.verbose(str);
    };

    Connection.prototype.isConnected = function() {
      return this.connected;
    };

    Connection.prototype.close = function() {
      this.connected = false;
      this.q = null;
      return this.basicClose();
    };

    Connection.prototype.addCmd = function(cmd) {
      return this.q.push(cmd);
    };

    Connection.prototype.send = function() {
      var q, _ref;
      if (this.connected && this.q.length) {
        this.verbose("" + (d(this)) + " SENDING " + (JSON.stringify(this.q)));
        _ref = [this.q, []], q = _ref[0], this.q = _ref[1];
        return this.codec.send(this, q);
      }
    };

    Connection.prototype.newData = function(data) {
      this.verbose("" + (d(this)) + " read data: " + data);
      return this.codec.newData(this, data);
    };

    Connection.prototype.processBatch = function(batch) {
      return this.master.processBatch(this, batch);
    };

    return Connection;

  })();

  exports.FdConnection = FdConnection = (function(_super) {

    __extends(FdConnection, _super);

    function FdConnection(input, output) {
      this.input = input;
      this.output = output;
      FdConnection.__super__.constructor.call(this, null, this["null"]);
      this.q = [];
      this.writing = false;
    }

    FdConnection.prototype.setMaster = function(master) {
      this.master = master;
      if (this.master) {
        this.master.addConnection(this);
        return this.read(new Buffer(65536));
      }
    };

    FdConnection.prototype.basicClose = function() {
      fs.close(this.input, function(err) {
        return console.log("Error closing connection: " + err.stack);
      });
      return fs.close(this.output, function(err) {
        return console.log("Error closing connection: " + err.stack);
      });
    };

    FdConnection.prototype.connected = true;

    FdConnection.prototype.read = function(buf) {
      var _this = this;
      return fs.read(this.input, buf, 0, buf.length, null, function(err, bytesRead) {
        if (err) {
          _this.verbose("" + (d(_this)) + " disconnect");
          return _this.master.disconnect(_this);
        } else {
          _this.verbose("" + (d(_this)) + " data '" + data + "'");
          _this.newData(buf.toString(null, 0, bytesRead));
          return _this.read(buf);
        }
      });
    };

    FdConnection.prototype.write = function(str) {
      if (str.length) {
        this.q.push(str);
        if (!this.writing) {
          this.writing = true;
          return this.writeNext();
        }
      }
    };

    FdConnection.prototype.writeNext = function() {
      var buf;
      buf = new Buffer(this.q[0]);
      splice(this.q, 0, 1);
      return writeBuffer(buf);
    };

    FdConnection.prototype.writeBuffer = function(buf) {
      var _this = this;
      return fs.write(this.output, buf, 0, buf.length, null, function(err, written) {
        if (err) {
          _this.verbose("" + (d(_this)) + " disconnect");
          return _this.master.disconnect(_this);
        } else if (written < buf.length) {
          return _this.writeBuffer(buf.slice(written));
        } else if (_this.q.length) {
          return _this.writeNext();
        } else {
          return _this.writing = false;
        }
      });
    };

    return FdConnection;

  })(Connection);

  exports.SocketConnection = SocketConnection = (function(_super) {

    __extends(SocketConnection, _super);

    function SocketConnection(master, con, initialData) {
      var _this = this;
      this.master = master;
      this.con = con;
      SocketConnection.__super__.constructor.call(this, this.master, null, (initialData != null ? initialData : '').toString());
      this.con.on('data', function(data) {
        _this.verbose("" + (d(_this)) + " data: '" + data + "'");
        return _this.newData(data);
      });
      this.con.on('end', function(hadError) {
        _this.verbose("" + (d(_this)) + " disconnect");
        return _this.master.disconnect(_this);
      });
      this.con.on('close', function(hadError) {
        _this.verbose("" + (d(_this)) + " disconnect");
        return _this.master.disconnect(_this);
      });
      this.con.on('error', function(hadError) {
        _this.verbose("" + (d(_this)) + " disconnect");
        return _this.master.disconnect(_this);
      });
      this.master.addConnection(this);
    }

    SocketConnection.prototype.connected = true;

    SocketConnection.prototype.write = function(str) {
      return this.con.write(str);
    };

    SocketConnection.prototype.basicClose = function() {
      try {
        return this.con.destroy();
      } catch (err) {
        return console.log("Error closing connection: " + err.stack);
      }
    };

    return SocketConnection;

  })(Connection);

  exports.WebSocketConnection = WebSocketConnection = (function(_super) {

    __extends(WebSocketConnection, _super);

    function WebSocketConnection(master, con) {
      this.master = master;
      this.con = con;
      this.pending = [];
      WebSocketConnection.__super__.constructor.call(this, this.master);
    }

    WebSocketConnection.prototype.setMaster = function(master) {
      var _this = this;
      this.master = master;
      if (this.master) {
        this.con.onopen = function(evt) {
          return _this.sendPending();
        };
        this.con.onmessage = function(evt) {
          console.log("MESSAGE: " + (JSON.stringify(evt.data)));
          return _this.newData(evt.data);
        };
        this.con.onend = function(hadError) {
          return _this.master.disconnect(_this);
        };
        this.con.onclose = function(hadError) {
          return _this.master.disconnect(_this);
        };
        this.con.onerror = function(hadError) {
          return _this.master.disconnect(_this);
        };
        return this.master.addConnection(this);
      }
    };

    WebSocketConnection.prototype.connected = true;

    WebSocketConnection.prototype.write = function(str) {
      return this.pending.push(str);
    };

    WebSocketConnection.prototype.sendPending = function() {
      var msg, _i, _len, _ref;
      console.log("CHANGING WRITE METHOD");
      this.write = function(str) {
        this.verbose("" + (d(this)) + " writing: " + str);
        return this.con.send(str);
      };
      _ref = this.pending;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        msg = _ref[_i];
        this.write(msg);
      }
      return this.pending = null;
    };

    WebSocketConnection.prototype.basicClose = function() {
      try {
        return this.con.terminate();
      } catch (err) {
        return console.log("Error closing connection: " + err.stack);
      }
    };

    return WebSocketConnection;

  })(Connection);

  deadComets = {};

  exports.CometConnection = CometConnection = (function(_super) {

    __extends(CometConnection, _super);

    function CometConnection(master, socket) {
      this.master = master;
      this.socket = socket;
      CometConnection.__super__.constructor.call(this, this.master);
    }

    CometConnection.prototype.setMaster = function(master) {
      var _this = this;
      this.master = master;
      console.log("MASTER: " + this.master);
      this.master.addConnection(this);
      this.socket.on('disconnect', function() {
        return _this.master.disconnect(_this);
      });
      return this.socket.on('xusCmd', function(data) {
        _this.verbose("MESSAGE: " + data.str);
        return _this.newData(data.str);
      });
    };

    CometConnection.prototype.connected = true;

    CometConnection.prototype.write = function(str) {
      this.verbose("" + (d(this)) + " writing: " + str);
      return this.socket.emit('xusCmd', {
        str: str
      });
    };

    CometConnection.prototype.basicClose = function() {
      if (!this.socket._zombi) {
        this.socket.emit('xusTerminate', '');
      }
      return deadComets[this.socket._uuid] = true;
    };

    return CometConnection;

  })(Connection);

  exports.CometClientConnection = CometClientConnection = (function(_super) {

    __extends(CometClientConnection, _super);

    function CometClientConnection(master, url) {
      var _this = this;
      this.master = master;
      CometClientConnection.__super__.constructor.call(this, this.master);
      this.pending = [];
      this.socket = comet.connect(url).on('connect', function() {
        return _this.sendPending();
      }).on('xusCmd', function(data) {
        _this.verbose("MESSAGE: " + data.str);
        return _this.newData(data.str);
      }).on('xusTerminate', function() {
        return _this.master.disconnect(_this);
      });
    }

    CometClientConnection.prototype.connected = true;

    CometClientConnection.prototype.write = function(str) {
      return this.pending.push(str);
    };

    CometClientConnection.prototype.sendPending = function() {
      var msg, _i, _len, _ref;
      console.log("CHANGING WRITE METHOD");
      this.write = function(str) {
        this.verbose("" + (d(this)) + " writing: " + str);
        return this.socket.emit('xusCmd', {
          str: str
        });
      };
      _ref = this.pending;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        msg = _ref[_i];
        this.write(msg);
      }
      return this.pending = null;
    };

    CometClientConnection.prototype.basicClose = function() {
      if (!this.socket._zombi) {
        this.socket.emit('xus.terminate', '');
      }
      return deadComets[this.socket._uuid] = true;
    };

    return CometClientConnection;

  })(Connection);

  exports.ProxyMux = ProxyMux = (function() {

    function ProxyMux(handler) {
      this.handler = handler;
      this.currentId = 0;
      this.connections = {};
    }

    ProxyMux.prototype.verbose = function() {};

    ProxyMux.prototype.prepare = function() {};

    ProxyMux.prototype.addConnection = function(con) {
      this.verbose("proxy main connection");
      return this.mainConnection = con;
    };

    ProxyMux.prototype.newConnectionEndpoint = function(conFactory) {
      var _this = this;
      return this.newConnection(function(id) {
        var endPoint;
        endPoint = new ConnectionEndpoint(_this, id);
        conFactory(endPoint);
        return endPoint;
      });
    };

    ProxyMux.prototype.newPeer = function() {
      var peer,
        _this = this;
      peer = new exports.Peer;
      console.log("SETTING CONNECTION");
      this.newConnection(function(id) {
        peer.setConnection(new XusEndpoint(peer, _this, id));
        return peer;
      });
      this.mainSend([['connect', peer.con.id]]);
      peer.con.newconnection = false;
      return peer;
    };

    ProxyMux.prototype.newConnection = function(factory) {
      var con, id;
      id = this.currentId++;
      con = factory(id);
      this.verbose("proxy got new connection: " + (d(con)) + ", id: " + id);
      this.connections[id] = con;
      return con;
    };

    ProxyMux.prototype.processBatch = function(muxedCon, batch) {
      var b, cmd, con, id, _ref;
      this.verbose("proxy demuxing batch: " + (JSON.stringify(batch)));
      _ref = batch[0], cmd = _ref[0], id = _ref[1];
      con = this.connections[id];
      switch (cmd) {
        case 'connect':
          this.verbose("MUX connect");
          con = new XusEndpoint(this.handler, this, id);
          this.connections[id] = con;
          this.handler.addConnection(con);
          break;
        case 'disconnect':
          this.verbose("MUX disconnect");
          if (con) {
            this.removeConnection(con);
            con.disconnect();
          }
          break;
        case 'data':
          this.verbose("MUX data: " + (JSON.stringify(batch.slice(1))));
      }
      b = batch.slice(1);
      if (b.length) {
        return this.handler.processBatch(con, b);
      }
    };

    ProxyMux.prototype.disconnect = function(con) {
      if (con === this.mainConnection) {
        return this.mainDisconnect(con);
      } else {
        this.mainSend([['disconnect', con.id]]);
        return this.removeConnection(con);
      }
    };

    ProxyMux.prototype.mainDisconnect = function(con) {
      console.log("Disconnecting mux connection");
      return process.exit();
    };

    ProxyMux.prototype.removeConnection = function(con) {
      var connected;
      if (connected) {
        connected = false;
        return delete this.connections[con.id];
      }
    };

    ProxyMux.prototype.mux = function(endpoint, batch) {
      var b;
      b = batch.slice(0);
      b.splice(0, 0, ['data', endpoint.id]);
      endpoint.newConnection = false;
      return this.mainSend(b);
    };

    ProxyMux.prototype.mainSend = function(batch) {
      this.verbose("" + (d(this)) + " proxy forwarding muxed batch: " + (JSON.stringify(batch)) + " to " + this.mainConnection.constructor.name);
      this.mainConnection.q = batch;
      return this.mainConnection.send();
    };

    ProxyMux.prototype.prepare = function(con) {};

    return ProxyMux;

  })();

  ConnectionEndpoint = (function() {

    function ConnectionEndpoint(mux, id) {
      this.mux = mux;
      this.id = id;
      this.verbose("New ConnectionEndpoint");
      this.newConnection = true;
    }

    ConnectionEndpoint.prototype.verbose = function(str) {
      return this.mux.verbose(str);
    };

    ConnectionEndpoint.prototype.addConnection = function(con) {
      this.con = con;
      this.verbose("ConnectionEndpoint connection: " + this.con.constructor.name);
      this.mux.mainSend([['connect', this.id]]);
      return this.newconnection = false;
    };

    ConnectionEndpoint.prototype.disconnect = function(con) {
      this.verbose("ConnectionEndpoint disconnecting");
      return this.mux.disconnect(this);
    };

    ConnectionEndpoint.prototype.send = function(demuxedBatch) {
      this.verbose("ConnectionEndpoint writing: " + (JSON.stringify(demuxedBatch)));
      this.con.q = demuxedBatch;
      return this.con.send();
    };

    ConnectionEndpoint.prototype.processBatch = function(con, batch) {
      this.verbose("Socket endpoint read: " + batch);
      return this.mux.mux(this, batch);
    };

    return ConnectionEndpoint;

  })();

  XusEndpoint = (function(_super) {

    __extends(XusEndpoint, _super);

    function XusEndpoint(master, proxy, id) {
      this.master = master;
      this.proxy = proxy;
      this.id = id;
      XusEndpoint.__super__.constructor.call(this, this.master, this.proxy);
      this.verbose = this.proxy.verbose;
    }

    XusEndpoint.prototype.newConnection = false;

    XusEndpoint.prototype.basicClose = function() {
      return this.proxy.disconnect(this);
    };

    XusEndpoint.prototype.send = function() {
      var q, _ref;
      this.verbose("SEND " + (JSON.stringify(this.q)));
      _ref = [this.q, []], q = _ref[0], this.q = _ref[1];
      return this.proxy.mux(this, q);
    };

    XusEndpoint.prototype.disconnect = function() {
      return this.master.disconnect(this);
    };

    return XusEndpoint;

  })(Connection);

}).call(this);

});

require.define("/lodash.min.js",function(require,module,exports,__dirname,__filename,process){/*!
 Lo-Dash 0.7.0 lodash.com/license
 Underscore.js 1.3.3 github.com/documentcloud/underscore/blob/master/LICENSE
*/
;(function(e,t){function s(e){return new o(e)}function o(e){if(e&&e.__wrapped__)return e;this.__wrapped__=e}function u(e,t){return function(n,r,i){return e.call(t,n,r,i)}}function a(e,t,n){t||(t=0);var r=e.length,i=r-t>=(n||W),s=i?{}:e;if(i)for(var o=t-1;++o<r;)n=e[o]+"",(at.call(s,n)?s[n]:s[n]=[]).push(e[o]);return function(e){if(i){var n=e+"";return at.call(s,n)&&-1<L(s[n],e)}return-1<L(s,e,t)}}function f(e,n){var r=e.b,i=n.b,e=e.a,n=n.a;if(e!==n){if(e>n||e===t)return 1;if(e<n||n===t)return-1}return r<
i?-1:1}function l(e,t,n){function r(){var u=arguments,a=s?this:t;return i||(e=t[o]),n.length&&(u=u.length?n.concat(ct.call(u)):n),this instanceof r?(v.prototype=e.prototype,a=new v,(u=e.apply(a,u))&&$t[typeof u]?u:a):e.apply(a,u)}var i=E(e),s=!n,o=e;return s&&(n=t),r}function c(){for(var e,t,n,s=-1,o=arguments.length,a={e:"",f:"",j:"",q:"",c:{d:""},m:{d:""}};++s<o;)for(t in e=arguments[s],e)n=(n=e[t])==r?"":n,/d|i/.test(t)?("string"==typeof n&&(n={b:n,l:n}),a.c[t]=n.b||"",a.m[t]=n.l||""):a[t]=n;e=
a.a,t=/^[^,]+/.exec(e)[0],n=a.s,a.g=t,a.h=Mt,a.k=Rt,a.n=Pt,a.p=rt,a.r=a.r!==i,a.s=n==r?Ut:n,a.o==r&&(a.o=jt),a.f||(a.f="if(!"+t+")return u");if("e"!=t||!a.c.i)a.c=r;t="",a.s&&(t+="'use strict';"),t+="var j,A,k="+a.g+",u",a.j&&(t+="="+a.j),t+=";"+a.f+";"+a.q+";",a.c&&(t+="var l=k.length;j=-1;",a.m&&(t+="if(l===+l){"),a.o&&(t+="if(z.call(k)==x){k=k.split('')}"),t+=a.c.d+";while(++j<l){A=k[j];"+a.c.i+"}",a.m&&(t+="}"));if(a.m){a.c?t+="else{":a.n&&(t+="var l=k.length;j=-1;if(l&&O(k)){while(++j<l){A=k[j+=''];"+
a.m.i+"}}else{"),a.h||(t+="var v=typeof k=='function'&&r.call(k,'prototype');");if(a.k&&a.r)t+="var o=-1,p=X[typeof k]?m(k):[],l=p.length;"+a.m.d+";while(++o<l){j=p[o];",a.h||(t+="if(!(v&&j=='prototype')){"),t+="A=k[j];"+a.m.i+"",a.h||(t+="}");else{t+=a.m.d+";for(j in k){";if(!a.h||a.r)t+="if(",a.h||(t+="!(v&&j=='prototype')"),!a.h&&a.r&&(t+="&&"),a.r&&(t+="h.call(k,j)"),t+="){";t+="A=k[j];"+a.m.i+";";if(!a.h||a.r)t+="}"}t+="}";if(a.h){t+="var g=k.constructor;";for(n=0;7>n;n++)t+="j='"+a.p[n]+"';if("
,"constructor"==a.p[n]&&(t+="!(g&&g.prototype===k)&&"),t+="h.call(k,j)){A=k[j];"+a.m.i+"}"}if(a.c||a.n)t+="}"}return t+=a.e+";return u",Function("D,E,F,c,I,f,J,h,i,M,O,Q,S,T,W,X,m,r,w,x,z","var G=function("+e+"){"+t+"};return G")(zt,R,D,u,f,ut,ln,at,P,L,w,sn,E,on,Ct,$t,gt,lt,ct,Lt,ht)}function h(e,t){return ot[t]}function p(e){return"\\"+Jt[e]}function d(e){return Xt[e]}function v(){}function m(e,t){if(e&&V.test(t))return"<e%-"+t+"%>";var n=ot.length;return ot[n]="'+__e("+t+")+'",it+n+st}function g
(e,t,n,i){return i?(e=ot.length,ot[e]="';"+i+";__p+='",it+e+st):t?m(r,t):y(r,n)}function y(e,t){if(e&&V.test(t))return"<e%="+t+"%>";var n=ot.length;return ot[n]="'+((__t=("+t+"))==null?'':__t)+'",it+n+st}function b(e){return Vt[e]}function w(e){return ht.call(e)==Et}function E(e){return"function"==typeof e}function S(e,t){var n=i;if(!e||"object"!=typeof e||!t&&w(e))return n;var r=e.constructor;return(!Ft||"function"==typeof e.toString||"string"!=typeof (e+""))&&(!E(r)||r instanceof r)?Dt?(ln(e,function(
e,t,r){return n=!at.call(r,t),i}),n===i):(ln(e,function(e,t){n=t}),n===i||at.call(e,n)):n}function x(e,t,s,o,u){if(e==r)return e;s&&(t=i);if(s=$t[typeof e]){var a=ht.call(e);if(!Wt[a]||Ht&&w(e))return e;var f=a==St,s=f||(a==Ct?on(e,n):s)}if(!s||!t)return s?f?ct.call(e):fn({},e):e;s=e.constructor;switch(a){case xt:return new s(e==n);case Tt:return new s(+e);case Nt:case Lt:return new s(e);case kt:return s(e.source,G.exec(e))}o||(o=[]),u||(u=[]);for(a=o.length;a--;)if(o[a]==e)return u[a];var l=f?s(
a=e.length):{};o.push(e),u.push(l);if(f)for(f=-1;++f<a;)l[f]=x(e[f],t,r,o,u);else cn(e,function(e,n){l[n]=x(e,t,r,o,u)});return l}function T(e,t,s,o){if(e==r||t==r)return e===t;if(e===t)return 0!==e||1/e==1/t;if($t[typeof e]||$t[typeof t])e=e.__wrapped__||e,t=t.__wrapped__||t;var u=ht.call(e);if(u!=ht.call(t))return i;switch(u){case xt:case Tt:return+e==+t;case Nt:return e!=+e?t!=+t:0==e?1/e==1/t:e==+t;case kt:case Lt:return e==t+""}var a=zt[u];if(Ht&&!a&&(a=w(e))&&!w(t)||!a&&(u!=Ct||Ft&&("function"!=typeof 
e.toString&&"string"==typeof (e+"")||"function"!=typeof t.toString&&"string"==typeof (t+""))))return i;s||(s=[]),o||(o=[]);for(u=s.length;u--;)if(s[u]==e)return o[u]==t;var u=-1,f=n,l=0;s.push(e),o.push(t);if(a){l=e.length;if(f=l==t.length)for(;l--&&(f=T(e[l],t[l],s,o)););return f}a=e.constructor,f=t.constructor;if(a!=f&&(!E(a)||!(a instanceof a&&E(f)&&f instanceof f)))return i;for(var c in e)if(at.call(e,c)&&(l++,!at.call(t,c)||!T(e[c],t[c],s,o)))return i;for(c in t)if(at.call(t,c)&&!(l--))return i
;if(Mt)for(;7>++u;)if(c=rt[u],at.call(e,c)&&(!at.call(t,c)||!T(e[c],t[c],s,o)))return i;return n}function N(e,t,n,r){if(!e)return n;var i=e.length,s=3>arguments.length;r&&(t=u(t,r));if(i===+i){var o=jt&&ht.call(e)==Lt?e.split(""):e;for(i&&s&&(n=o[--i]);i--;)n=t(n,o[i],i,e);return n}o=vn(e);for((i=o.length)&&s&&(n=e[o[--i]]);i--;)s=o[i],n=t(n,e[s],s,e);return n}function C(e,t,n){if(e)return t==r||n?e[0]:ct.call(e,0,t)}function k(e,t){var n=[];if(!e)return n;for(var r,i=-1,s=e.length;++i<s;)r=e[i],
sn(r)?ft.apply(n,t?r:k(r)):n.push(r);return n}function L(e,t,n){if(!e)return-1;var r=-1,i=e.length;if(n){if("number"!=typeof n)return r=M(e,t),e[r]===t?r:-1;r=(0>n?yt(0,i+n):n)-1}for(;++r<i;)if(e[r]===t)return r;return-1}function A(e,t,n){var r=-Infinity,i=r;if(!e)return i;var s=-1,o=e.length;if(!t){for(;++s<o;)e[s]>i&&(i=e[s]);return i}for(n&&(t=u(t,n));++s<o;)n=t(e[s],s,e),n>r&&(r=n,i=e[s]);return i}function O(e,t,n){return e?ct.call(e,t==r||n?1:t):[]}function M(e,t,n,r){if(!e)return 0;var i=0,
s=e.length;if(n){r&&(n=D(n,r));for(t=n(t);i<s;)r=i+s>>>1,n(e[r])<t?i=r+1:s=r}else for(;i<s;)r=i+s>>>1,e[r]<t?i=r+1:s=r;return i}function _(e,t,n,r){var s=[];if(!e)return s;var o=-1,a=e.length,f=[];"function"==typeof t&&(r=n,n=t,t=i);for(n?r&&(n=u(n,r)):n=P;++o<a;)if(r=n(e[o],o,e),t?!o||f[f.length-1]!==r:0>L(f,r))f.push(r),s.push(e[o]);return s}function D(e,t){return qt||pt&&2<arguments.length?pt.call.apply(pt,arguments):l(e,t,ct.call(arguments,2))}function P(e){return e}function H(e){Cn(hn(e),function(
t){var r=s[t]=e[t];o.prototype[t]=function(){var e=[this.__wrapped__];return arguments.length&&ft.apply(e,arguments),e=r.apply(s,e),this.__chain__&&(e=new o(e),e.__chain__=n),e}})}var n=!0,r=null,i=!1,B,j,F,I,q="object"==typeof exports&&exports&&("object"==typeof global&&global&&global==global.global&&(e=global),exports),R=Array.prototype,U=Object.prototype,z=0,W=30,X=e._,V=/[-?+=!~*%&^<>|{(\/]|\[\D|\b(?:delete|in|instanceof|new|typeof|void)\b/,$=/&(?:amp|lt|gt|quot|#x27);/g,J=/\b__p\+='';/g,K=/\b(__p\+=)''\+/g
,Q=/(__e\(.*?\)|\b__t\))\+'';/g,G=/\w*$/,Y=/(?:__e|__t=)\(\s*(?![\d\s"']|this\.)/g,Z=RegExp("^"+(U.valueOf+"").replace(/[.*+?^=!:${}()|[\]\/\\]/g,"\\$&").replace(/valueOf|for [^\]]+/g,".+?")+"$"),et=/__token(\d+)__/g,tt=/[&<>"']/g,nt=/['\n\r\t\u2028\u2029\\]/g,rt="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),it="__token",st="__",ot=[],ut=R.concat,at=U.hasOwnProperty,ft=R.push,lt=U.propertyIsEnumerable,ct=R.slice,ht=U.toString,pt=Z.test(
pt=ct.bind)&&pt,dt=Math.floor,vt=Z.test(vt=Array.isArray)&&vt,mt=e.isFinite,gt=Z.test(gt=Object.keys)&&gt,yt=Math.max,bt=Math.min,wt=Math.random,Et="[object Arguments]",St="[object Array]",xt="[object Boolean]",Tt="[object Date]",Nt="[object Number]",Ct="[object Object]",kt="[object RegExp]",Lt="[object String]",At=e.clearTimeout,Ot=e.setTimeout,Mt,_t,Dt,Pt=n;(function(){function e(){this.x=1}var t={0:1,length:1},n=[];e.prototype={valueOf:1,y:1};for(var r in new e)n.push(r);for(r in arguments)Pt=!r;Mt=4>
(n+"").length,Dt="x"!=n[0],_t=(n.splice.call(t,0,1),t[0])})(1);var Ht=!w(arguments),Bt="x"!=ct.call("x")[0],jt="xx"!="x"[0]+Object("x")[0];try{var Ft=("[object Object]",ht.call(e.document||0)==Ct)}catch(It){}var qt=pt&&/\n|Opera/.test(pt+ht.call(e.opera)),Rt=gt&&/^.+$|true/.test(gt+!!e.attachEvent),Ut=!qt,zt={};zt[xt]=zt[Tt]=zt["[object Function]"]=zt[Nt]=zt[Ct]=zt[kt]=i,zt[Et]=zt[St]=zt[Lt]=n;var Wt={};Wt[Et]=Wt["[object Function]"]=i,Wt[St]=Wt[xt]=Wt[Tt]=Wt[Nt]=Wt[Ct]=Wt[kt]=Wt[Lt]=n;var Xt={"&"
:"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"},Vt={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#x27;":"'"},$t={"boolean":i,"function":n,object:n,number:i,string:i,"undefined":i,unknown:n},Jt={"\\":"\\","'":"'","\n":"n","\r":"r","	":"t","\u2028":"u2028","\u2029":"u2029"};s.templateSettings={escape:/<%-([\s\S]+?)%>/g,evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,variable:""};var Kt={a:"e,d,y",j:"e",q:"if(!d)d=i;else if(y)d=c(d,y)",i:"if(d(A,j,e)===false)return u"},Qt={j:"{}"
,q:"var q;if(typeof d!='function'){var hh=d;d=function(A){return A[hh]}}else if(y)d=c(d,y)",i:"q=d(A,j,e);(h.call(u,q)?u[q]++:u[q]=1)"},Gt={j:"true",i:"if(!d(A,j,e))return!u"},Yt={r:i,s:i,a:"n",j:"n",q:"for(var a=1,b=arguments.length;a<b;a++){if(k=arguments[a]){",i:"u[j]=A",e:"}}"},Zt={j:"[]",i:"d(A,j,e)&&u.push(A)"},en={q:"if(y)d=c(d,y)"},tn={i:{l:Kt.i}},nn={j:"",f:"if(!e)return[]",d:{b:"u=Array(l)",l:"u="+(Rt?"Array(l)":"[]")},i:{b:"u[j]=d(A,j,e)",l:"u"+(Rt?"[o]=":".push")+"(d(A,j,e))"}},rn={r:
i,a:"n,d,y",j:"{}",q:"var R=typeof d=='function';if(!R){var t=f.apply(E,arguments)}else if(y)d=c(d,y)",i:"if(R?!d(A,j,n):M(t,j)<0)u[j]=A"};Ht&&(w=function(e){return!!e&&!!at.call(e,"callee")});var sn=vt||function(e){return ht.call(e)==St};E(/x/)&&(E=function(e){return"[object Function]"==ht.call(e)});var on=$t.__proto__!=U?S:function(e,t){if(!e)return i;var n=e.valueOf,r="function"==typeof n&&(r=n.__proto__)&&r.__proto__;return r?e==r||e.__proto__==r&&(t||!w(e)):S(e)},un=c({a:"n",j:"[]",i:"u.push(j)"
}),an=c(Yt,{i:"if(u[j]==null)"+Yt.i}),fn=c(Yt),ln=c(Kt,en,tn,{r:i}),cn=c(Kt,en,tn),hn=c({r:i,a:"n",j:"[]",i:"if(S(A))u.push(j)",e:"u.sort()"}),pn=c({a:"n",j:"{}",i:"u[A]=j"}),dn=c({a:"A",j:"true",q:"var H=z.call(A),l=A.length;if(D[H]"+(Ht?"||O(A)":"")+"||(H==W&&l===+l&&S(A.splice)))return!l",i:{l:"return false"}}),vn=gt?function(e){var t=typeof e;return"function"==t&&lt.call(e,"prototype")?un(e):e&&$t[t]?gt(e):[]}:un,mn=c(Yt,{a:"n,cc,N",q:"var b,P,dd,ee,C=arguments,a=0;if(N==T){b=2;dd=C[3];ee=C[4]}else{b=C.length;dd=[];ee=[]}while(++a<b){if(k=C[a]){"
,i:"if((cc=A)&&((P=Q(cc))||T(cc))){var K=false,ff=dd.length;while(ff--)if(K=dd[ff]==cc)break;if(K){u[j]=ee[ff]}else{dd.push(cc);ee.push(A=(A=u[j])&&P?(Q(A)?A:[]):(T(A)?A:{}));u[j]=G(A,cc,T,dd,ee)}}else if(cc!=null)u[j]=cc"}),gn=c(rn),yn=c({a:"n",j:"[]",i:"u"+(Rt?"[o]=":".push")+"([j,A])"}),bn=c(rn,{q:"if(typeof d!='function'){var q,t=f.apply(E,arguments),l=t.length;for(j=1;j<l;j++){q=t[j];if(q in n)u[q]=n[q]}}else{if(y)d=c(d,y)",i:"if(d(A,j,n))u[j]=A",e:"}"}),wn=c({a:"n",j:"[]",i:"u.push(A)"}),En=
c({a:"e,gg",j:"false",o:i,d:{b:"if(z.call(e)==x)return e.indexOf(gg)>-1"},i:"if(A===gg)return true"}),Sn=c(Kt,Qt),xn=c(Kt,Gt),Tn=c(Kt,Zt),Nn=c(Kt,en,{j:"",i:"if(d(A,j,e))return A"}),Cn=c(Kt,en),kn=c(Kt,Qt,{i:"q=d(A,j,e);(h.call(u,q)?u[q]:u[q]=[]).push(A)"}),Ln=c(nn,{a:"e,U",q:"var C=w.call(arguments,2),R=typeof U=='function'",i:{b:"u[j]=(R?U:A[U]).apply(A,C)",l:"u"+(Rt?"[o]=":".push")+"((R?U:A[U]).apply(A,C))"}}),An=c(Kt,nn),On=c(nn,{a:"e,aa",i:{b:"u[j]=A[aa]",l:"u"+(Rt?"[o]=":".push")+"(A[aa])"}
}),Mn=c({a:"e,d,B,y",j:"B",q:"var V=arguments.length<3;if(y)d=c(d,y)",d:{b:"if(V)u=k[++j]"},i:{b:"u=d(u,A,j,e)",l:"u=V?(V=false,A):d(u,A,j,e)"}}),_n=c(Kt,Zt,{i:"!"+Zt.i}),Dn=c(Kt,Gt,{j:"false",i:Gt.i.replace("!","")}),Pn=c(Kt,Qt,nn,{i:{b:"u[j]={a:d(A,j,e),b:j,c:A}",l:"u"+(Rt?"[o]=":".push")+"({a:d(A,j,e),b:j,c:A})"},e:"u.sort(I);l=u.length;while(l--)u[l]=u[l].c"}),Hn=c(Zt,{a:"e,Z",q:"var t=[];J(Z,function(A,q){t.push(q)});var bb=t.length",i:"for(var q,Y=true,s=0;s<bb;s++){q=t[s];if(!(Y=A[q]===Z[q]))break}Y&&u.push(A)"
}),Bn=c({r:i,s:i,a:"n",j:"n",q:"var L=arguments,l=L.length;if(l>1){for(var j=1;j<l;j++)u[L[j]]=F(u[L[j]],u);return u}",i:"if(S(u[j]))u[j]=F(u[j],u)"});s.VERSION="0.7.0",s.after=function(e,t){return 1>e?t():function(){if(1>--e)return t.apply(this,arguments)}},s.bind=D,s.bindAll=Bn,s.chain=function(e){return e=new o(e),e.__chain__=n,e},s.clone=x,s.compact=function(e){var t=[];if(!e)return t;for(var n=-1,r=e.length;++n<r;)e[n]&&t.push(e[n]);return t},s.compose=function(){var e=arguments;return function(
){for(var t=arguments,n=e.length;n--;)t=[e[n].apply(this,t)];return t[0]}},s.contains=En,s.countBy=Sn,s.debounce=function(e,t,n){function i(){a=r,n||(o=e.apply(u,s))}var s,o,u,a;return function(){var r=n&&!a;return s=arguments,u=this,At(a),a=Ot(i,t),r&&(o=e.apply(u,s)),o}},s.defaults=an,s.defer=function(e){var n=ct.call(arguments,1);return Ot(function(){return e.apply(t,n)},1)},s.delay=function(e,n){var r=ct.call(arguments,2);return Ot(function(){return e.apply(t,r)},n)},s.difference=function(e){
var t=[];if(!e)return t;for(var n=-1,r=e.length,i=ut.apply(t,arguments),i=a(i,r);++n<r;)i(e[n])||t.push(e[n]);return t},s.escape=function(e){return e==r?"":(e+"").replace(tt,d)},s.every=xn,s.extend=fn,s.filter=Tn,s.find=Nn,s.first=C,s.flatten=k,s.forEach=Cn,s.forIn=ln,s.forOwn=cn,s.functions=hn,s.groupBy=kn,s.has=function(e,t){return e?at.call(e,t):i},s.identity=P,s.indexOf=L,s.initial=function(e,t,n){return e?ct.call(e,0,-(t==r||n?1:t)):[]},s.intersection=function(e){var t=[];if(!e)return t;var n
,r=arguments.length,i=[],s=-1,o=e.length;e:for(;++s<o;)if(n=e[s],0>L(t,n)){for(var u=1;u<r;u++)if(!(i[u]||(i[u]=a(arguments[u])))(n))continue e;t.push(n)}return t},s.invert=pn,s.invoke=Ln,s.isArguments=w,s.isArray=sn,s.isBoolean=function(e){return e===n||e===i||ht.call(e)==xt},s.isElement=function(e){return e?1===e.nodeType:i},s.isEmpty=dn,s.isEqual=T,s.isFinite=function(e){return mt(e)&&ht.call(e)==Nt},s.isFunction=E,s.isNaN=function(e){return ht.call(e)==Nt&&e!=+e},s.isNull=function(e){return e===
r},s.isObject=function(e){return e?$t[typeof e]:i},s.isUndefined=function(e){return e===t},s.keys=vn,s.last=function(e,t,n){if(e){var i=e.length;return t==r||n?e[i-1]:ct.call(e,-t||i)}},s.lastIndexOf=function(e,t,n){if(!e)return-1;var r=e.length;for(n&&"number"==typeof n&&(r=(0>n?yt(0,r+n):bt(n,r-1))+1);r--;)if(e[r]===t)return r;return-1},s.lateBind=function(e,t){return l(t,e,ct.call(arguments,2))},s.map=An,s.max=A,s.memoize=function(e,t){var n={};return function(){var r=t?t.apply(this,arguments)
:arguments[0];return at.call(n,r)?n[r]:n[r]=e.apply(this,arguments)}},s.merge=mn,s.min=function(e,t,n){var r=Infinity,i=r;if(!e)return i;var s=-1,o=e.length;if(!t){for(;++s<o;)e[s]<i&&(i=e[s]);return i}for(n&&(t=u(t,n));++s<o;)n=t(e[s],s,e),n<r&&(r=n,i=e[s]);return i},s.mixin=H,s.noConflict=function(){return e._=X,this},s.object=function(e,t){if(!e)return{};for(var n=-1,r=e.length,i={};++n<r;)t?i[e[n]]=t[n]:i[e[n][0]]=e[n][1];return i},s.omit=gn,s.once=function(e){var t,s=i;return function(){return s?
t:(s=n,t=e.apply(this,arguments),e=r,t)}},s.pairs=yn,s.partial=function(e){return l(e,ct.call(arguments,1))},s.pick=bn,s.pluck=On,s.random=function(e,t){return e==r&&t==r?wt():(e=+e||0,t==r&&(t=e,e=0),e+dt(wt()*((+t||0)-e+1)))},s.range=function(e,t,n){e=+e||0,n=+n||1,t==r&&(t=e,e=0);for(var i=-1,t=yt(0,Math.ceil((t-e)/n)),s=Array(t);++i<t;)s[i]=e,e+=n;return s},s.reduce=Mn,s.reduceRight=N,s.reject=_n,s.rest=O,s.result=function(e,t){if(!e)return r;var n=e[t];return E(n)?e[t]():n},s.shuffle=function(
e){if(!e)return[];for(var t,n=-1,r=e.length,i=Array(r);++n<r;)t=dt(wt()*(n+1)),i[n]=i[t],i[t]=e[n];return i},s.size=function(e){if(!e)return 0;var t=e.length;return t===+t?t:vn(e).length},s.some=Dn,s.sortBy=Pn,s.sortedIndex=M,s.tap=function(e,t){return t(e),e},s.template=function(e,t,n){n||(n={});var e=e+"",o,u;o=n.escape;var a=n.evaluate,f=n.interpolate,l=s.templateSettings,c=n=n.variable||l.variable;o==r&&(o=l.escape),a==r&&(a=l.evaluate||i),f==r&&(f=l.interpolate),o&&(e=e.replace(o,m)),f&&(e=e
.replace(f,y)),a!=B&&(B=a,I=RegExp("<e%-([\\s\\S]+?)%>|<e%=([\\s\\S]+?)%>"+(a?"|"+a.source:""),"g")),o=ot.length,e=e.replace(I,g),o=o!=ot.length,e="__p += '"+e.replace(nt,p).replace(et,h)+"';",ot.length=0,c||(n=j||"obj",o?e="with("+n+"){"+e+"}":(n!=j&&(j=n,F=RegExp("(\\(\\s*)"+n+"\\."+n+"\\b","g")),e=e.replace(Y,"$&"+n+".").replace(F,"$1__d"))),e=(o?e.replace(J,""):e).replace(K,"$1").replace(Q,"$1;"),e="function("+n+"){"+(c?"":n+"||("+n+"={});")+"var __t,__p='',__e=_.escape"+(o?",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}"
:(c?"":",__d="+n+"."+n+"||"+n)+";")+e+"return __p}";try{u=Function("_","return "+e)(s)}catch(d){throw d.source=e,d}return t?u(t):(u.source=e,u)},s.throttle=function(e,t){function n(){a=new Date,u=r,s=e.apply(o,i)}var i,s,o,u,a=0;return function(){var r=new Date,f=t-(r-a);return i=arguments,o=this,0>=f?(a=r,s=e.apply(o,i)):u||(u=Ot(n,f)),s}},s.times=function(e,t,n){var r=-1;if(n)for(;++r<e;)t.call(n,r);else for(;++r<e;)t(r)},s.toArray=function(e){if(!e)return[];var t=e.length;return t===+t?(Bt?ht.
call(e)==Lt:"string"==typeof e)?e.split(""):ct.call(e):wn(e)},s.unescape=function(e){return e==r?"":(e+"").replace($,b)},s.union=function(){for(var e=-1,t=[],n=ut.apply(t,arguments),r=n.length;++e<r;)0>L(t,n[e])&&t.push(n[e]);return t},s.uniq=_,s.uniqueId=function(e){var t=z++;return e?e+t:t},s.values=wn,s.where=Hn,s.without=function(e){var t=[];if(!e)return t;for(var n=-1,r=e.length,i=a(arguments,1,20);++n<r;)i(e[n])||t.push(e[n]);return t},s.wrap=function(e,t){return function(){var n=[e];return arguments
.length&&ft.apply(n,arguments),t.apply(this,n)}},s.zip=function(e){if(!e)return[];for(var t=-1,n=A(On(arguments,"length")),r=Array(n);++t<n;)r[t]=On(arguments,t);return r},s.all=xn,s.any=Dn,s.collect=An,s.detect=Nn,s.drop=O,s.each=Cn,s.foldl=Mn,s.foldr=N,s.head=C,s.include=En,s.inject=Mn,s.methods=hn,s.select=Tn,s.tail=O,s.take=C,s.unique=_,Cn({Date:Tt,Number:Nt,RegExp:kt,String:Lt},function(e,t){s["is"+t]=function(t){return ht.call(t)==e}}),o.prototype=s.prototype,H(s),o.prototype.chain=function(
){return this.__chain__=n,this},o.prototype.value=function(){return this.__wrapped__},Cn("pop push reverse shift sort splice unshift".split(" "),function(e){var t=R[e];o.prototype[e]=function(){var e=this.__wrapped__;return t.apply(e,arguments),_t&&e.length===0&&delete e[0],this.__chain__&&(e=new o(e),e.__chain__=n),e}}),Cn(["concat","join","slice"],function(e){var t=R[e];o.prototype[e]=function(){var e=t.apply(this.__wrapped__,arguments);return this.__chain__&&(e=new o(e),e.__chain__=n),e}}),typeof 
define=="function"&&typeof define.amd=="object"&&define.amd?(e._=s,define(function(){return s})):q?"object"==typeof module&&module&&module.exports==q?(module.exports=s)._=s:q._=s:e._=s})(this);
});

require.define("fs",function(require,module,exports,__dirname,__filename,process){// nothing to see here... no file methods for the browser

});

require.define("/peer.js",function(require,module,exports,__dirname,__filename,process){// Generated by CoffeeScript 1.3.3
(function() {
  var DelegationHandler, DirectConnection, Peer, VarStorage, connectedPeerMethods, d, exports, prefixes, setCmds, _, _ref,
    __slice = [].slice,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  d = (exports = module.exports = require('./base')).d;

  _ref = require('./proto'), setCmds = _ref.setCmds, prefixes = _ref.prefixes, VarStorage = _ref.VarStorage;

  _ = require('./lodash.min');

  exports.Peer = Peer = (function() {

    function Peer(con) {
      var defaultHandler, peer;
      this.setConnection(con);
      this.inTransaction = false;
      this.changeListeners = {};
      this.treeListeners = {};
      this.valueListeners = {};
      this.queuedListeners = [];
      this.name = null;
      this.namePrefixPat = /^$/;
      this.varStorage = new VarStorage(this);
      peer = this;
      defaultHandler = this.varStorage.handlerFor;
      this.varStorage.handlerFor = function(key) {
        return defaultHandler.call(this, key.replace(peer.namePrefixPat, 'this/'));
      };
      this.pendingBlocks = [];
    }

    Peer.prototype.addConnection = function(con) {};

    Peer.prototype.afterConnect = function(block) {
      if (this.name) {
        return block();
      } else {
        return this.pendingBlocks.push(block);
      }
    };

    Peer.prototype.setConnection = function(con) {
      var _ref1, _ref2;
      this.con = con;
      if ((_ref1 = this.con) != null) {
        _ref1.setMaster(this);
      }
      this.verbose = ((_ref2 = this.con) != null ? _ref2.verbose : void 0) || (function() {});
      return this.verbose("ADDED CONNECTION: " + this.con + ", verbose: " + (this.verbose.toString()));
    };

    Peer.prototype.verbose = function() {};

    Peer.prototype.transaction = function(block) {
      this.inTransaction = true;
      block();
      this.inTransaction = false;
      return this.con.send();
    };

    Peer.prototype.send = function(batch) {
      return this.processBatch(this.con, batch);
    };

    Peer.prototype.get = function(key) {
      return this.varStorage.values[key];
    };

    Peer.prototype.listen = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.queuedListeners.push(args);
    };

    Peer.prototype.name = function(n) {
      return this.addCmd(['name', n]);
    };

    Peer.prototype.value = function(key, cookie, isTree, callback) {
      this.grabTree(key, callback);
      return this.addCmd(['value', key, cookie, isTree]);
    };

    Peer.prototype.set = function(key, value, storage) {
      return this.addCmd((storage ? ['set', key, value, storage] : ['set', key, value]));
    };

    Peer.prototype.put = function(key, index, value) {
      return this.addCmd(['put', key, value, index]);
    };

    Peer.prototype.splice = function() {
      var key, spliceArgs;
      key = arguments[0], spliceArgs = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return this.addCmd(['splice', key].concat(__slice.call(spliceArgs)));
    };

    Peer.prototype.removeFirst = function(key, value) {
      return this.addCmd(['removeFirst', key, value]);
    };

    Peer.prototype.removeAll = function(key, value) {
      return this.addCmd(['removeAll', key, value]);
    };

    Peer.prototype.manage = function(key, handler) {};

    Peer.prototype.processBatch = function(con, batch) {
      var block, cmd, k, v, _i, _j, _len, _len1, _ref1, _ref2, _results;
      if (batch[0][0] === 'set' && batch[0][1] === 'this/name') {
        this.name = batch[0][2];
        this.date = batch[0][3];
        for (k in connectedPeerMethods) {
          v = connectedPeerMethods[k];
          this[k] = v;
        }
        _ref1 = this.queuedListeners;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          cmd = _ref1[_i];
          this.listen.apply(this, cmd);
        }
        this.queuedListeners = null;
        this.processBatch(con, batch.slice(1));
        _ref2 = this.pendingBlocks;
        _results = [];
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          block = _ref2[_j];
          _results.push(block());
        }
        return _results;
      }
    };

    Peer.prototype.rename = function(newName) {
      var c, k, listen, newPath, oldName, oldPat, t, thisPat, v, _ref1, _ref2, _ref3;
      if (this.name !== newName) {
        newPath = "peer/" + newName;
        thisPat = new RegExp("^this(?=/|$)");
        oldName = (_ref1 = this.name) != null ? _ref1 : 'this';
        this.name = newName;
        this.varStorage.sortKeys();
        exports.renameVars(this.varStorage.keys, this.varStorage.values, this.varStorage.handlers, oldName, newName);
        t = {};
        _ref2 = this.treeListeners;
        for (k in _ref2) {
          v = _ref2[k];
          t[k.replace(thisPat, newPath)] = v;
        }
        this.treeListeners = t;
        c = {};
        _ref3 = this.changeListeners;
        for (k in _ref3) {
          v = _ref3[k];
          c[k.replace(thisPat, newPath)] = v;
        }
        this.changeListeners = c;
        listen = "peer/" + newName + "/listen";
        if (this.varStorage.values[listen]) {
          oldPat = new RegExp("^peer/" + oldName + "(?=/|$)");
          return this.varStorage.values[listen] = (k.replace(oldPat, newPath)).replace(thisPat, newPath);
        }
      }
    };

    Peer.prototype.sendTreeSets = function(sets, callback) {
      var k, msg, v, x, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = sets.length; _i < _len; _i++) {
        msg = sets[_i];
        x = msg[0], k = msg[1], v = msg[2];
        _results.push(callback(k, v, null, msg, sets));
      }
      return _results;
    };

    Peer.prototype.tree = function(key, simulate, callback) {
      var idx, msg, msgs, prefix, _ref1;
      prefix = "^" + key + "(/|$)";
      idx = _.sortedIndex(this.varStorage.keys, key);
      if (simulate) {
        msgs = [];
        while ((_ref1 = this.varStorage.keys[idx]) != null ? _ref1.match(prefix) : void 0) {
          msgs.push(['set', this.varStorage.keys[idx], this.varStorage.values[this.varStorage.keys[idx]]]);
        }
        return this.sendTreeSets(msgs, callback);
      } else {
        msg = ['value', key, null, true];
        while (this.varStorage.keys[idx].match(prefix)) {
          msg.push(this.varStorage.keys[idx], this.varStorage.values[this.varStorage.keys[idx]]);
        }
        return callback(null, null, null, msg, [msg]);
      }
    };

    Peer.prototype.setsForTree = function(msg) {
      var i, key, _i, _len, _ref1, _results, _step;
      _ref1 = msg.slice(4);
      _results = [];
      for (i = _i = 0, _len = _ref1.length, _step = 2; _i < _len; i = _i += _step) {
        key = _ref1[i];
        _results.push(['set', key, msg[i + 1]]);
      }
      return _results;
    };

    Peer.prototype.grabTree = function(key, callback) {
      if (!this.treeListeners[key]) {
        this.treeListeners[key] = [];
      }
      return this.treeListeners[key].push(callback);
    };

    Peer.prototype.addCmd = function(cmd) {
      this.con.addCmd(cmd);
      if (!this.inTransaction) {
        return this.con.send();
      }
    };

    Peer.prototype.disconnect = function() {
      return this.con.close();
    };

    Peer.prototype.listenersFor = function(key) {
      var _this = this;
      return _.flatten(_.map(prefixes(key), function(k) {
        return _this.changeListeners[k] || [];
      }));
    };

    Peer.prototype.handleDelegation = function(name, num, cmd) {
      var _this = this;
      return this.varStorage.handle(cmd, (function(type, msg) {
        return _this.sendCmd(['error', type, msg]);
      }), function() {
        return _this.sendCmd(['response', num, cmd]);
      });
    };

    Peer.prototype.sendCmd = function(cmd) {
      this.con.addCmd(cmd);
      return this.con.send();
    };

    Peer.prototype.addHandler = function(path, obj) {
      return this.varStorage.addHandler(path, obj);
    };

    Peer.prototype.personalize = function(path) {
      return path.replace(new RegExp('^this(?=\/|$)'), "peer/" + this.name);
    };

    return Peer;

  })();

  connectedPeerMethods = {
    processBatch: function(con, batch) {
      var block, cb, cmd, dcmd, index, key, name, num, numKeys, value, x, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref1, _ref2;
      this.verbose("PEER BATCH: " + (JSON.stringify(batch)));
      numKeys = this.varStorage.keys.length;
      for (_i = 0, _len = batch.length; _i < _len; _i++) {
        cmd = batch[_i];
        name = cmd[0], key = cmd[1], value = cmd[2], index = cmd[3];
        if (key.match(this.namePrefixPat)) {
          key = key.replace(this.namePrefixPat, 'this/');
        }
        if (__indexOf.call(setCmds, name) >= 0 && !this.varStorage.contains(key)) {
          this.varStorage.keys.push(key);
        }
        switch (name) {
          case 'error':
            console.log("ERROR '" + key + "': value");
            break;
          case 'request':
            this.verbose("GOT REQUEST: " + (JSON.stringify(cmd)) + ", batch: " + (JSON.stringify(batch)));
            x = cmd[0], name = cmd[1], num = cmd[2], dcmd = cmd[3];
            this.handleDelegation(name, num, dcmd);
            break;
          default:
            this.varStorage.handle(cmd, (function(type, msg) {
              return console.log("Error, '" + type + "': " + msg);
            }), function() {});
        }
      }
      if (numKeys !== this.varStorage.keys.length) {
        this.varStorage.keys.sort();
      }
      for (_j = 0, _len1 = batch.length; _j < _len1; _j++) {
        cmd = batch[_j];
        name = cmd[0], key = cmd[1], value = cmd[2], index = cmd[3];
        if (key.match(this.namePrefixPat)) {
          key = key.replace(this.namePrefixPat, 'this/');
        }
        if (name === 'set' && key === 'this/name') {
          this.name = value;
          this.namePrefixPat = new RegExp("^peer/" + value + "/");
        }
        if (__indexOf.call(setCmds, name) >= 0) {
          _ref1 = this.listenersFor(key);
          for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
            block = _ref1[_k];
            block(key, this.varStorage.values[key], cmd, batch);
          }
        } else if (name === 'value' && this.treeListeners[key]) {
          _ref2 = this.treeListeners[key];
          for (_l = 0, _len3 = _ref2.length; _l < _len3; _l++) {
            cb = _ref2[_l];
            cb(cmd, batch);
          }
          delete this.treeListeners[key];
        }
      }
      return null;
    },
    listen: function(key, simulateSetsForTree, noChildren, callback) {
      var _ref1,
        _this = this;
      key = key.replace(/^this\//, "peer/" + this.name + "/");
      if (typeof simulateSetsForTree === 'function') {
        noChildren = simulateSetsForTree;
        simulateSetsForTree = false;
      }
      if (typeof noChildren === 'function') {
        callback = noChildren;
        noChildren = false;
      }
      if (noChildren) {
        callback = function(changedKey, value, oldValue, cmd, batch) {
          if (key === changedKey) {
            return callback(changedKey, value, oldValue, cmd, batch);
          }
        };
      }
      if (!callback) {
        _ref1 = [null, simulateSetsForTree], simulateSetsForTree = _ref1[0], callback = _ref1[1];
      }
      if (!this.changeListeners[key]) {
        this.changeListeners[key] = [];
        this.grabTree(key, function(msg, batch) {
          if (simulateSetsForTree) {
            _this.sendTreeSets(_this.setsForTree(msg), callback);
          } else {
            callback(key, (msg[4] === key ? msg[5] : null), null, msg, batch);
          }
          return _this.changeListeners[key].push(callback);
        });
        return this.splice("this/listen", -1, 0, key);
      } else {
        return this.tree(key, simulateSetsForTree, callback);
      }
    }
  };

  exports.createDirectPeer = function(xus, peerFactory) {
    var ctx, peer, peerConnection, xusConnection;
    ctx = {
      connected: true,
      server: xus
    };
    xusConnection = new DirectConnection;
    peerConnection = new DirectConnection;
    peerConnection.verbose = xusConnection.verbose = xus.verbose;
    peer = (peerFactory != null ? peerFactory : function(con) {
      return new Peer(con);
    })(peerConnection);
    peerConnection.connect(xusConnection, xus, ctx);
    xusConnection.connect(peerConnection, peer, ctx);
    xus.addConnection(xusConnection);
    return peer;
  };

  DirectConnection = (function() {

    function DirectConnection() {
      this.q = [];
    }

    DirectConnection.prototype.connect = function(otherConnection, otherMaster, ctx) {
      this.otherConnection = otherConnection;
      this.otherMaster = otherMaster;
      this.ctx = ctx;
    };

    DirectConnection.prototype.isConnected = function() {
      return this.ctx.connected;
    };

    DirectConnection.prototype.close = function() {
      this.ctx.connected = false;
      return this.q = this.otherConnection.q = null;
    };

    DirectConnection.prototype.addCmd = function(cmd) {
      return this.q.push(cmd);
    };

    DirectConnection.prototype.send = function() {
      var q, _ref1;
      if (this.ctx.connected && this.q.length) {
        this.ctx.server.verbose("" + (d(this)) + " SENDING " + this.name + ", " + (JSON.stringify(this.q)));
        _ref1 = [this.q, []], q = _ref1[0], this.q = _ref1[1];
        return this.otherMaster.processBatch(this.otherConnection, q);
      }
    };

    DirectConnection.prototype.setMaster = function() {};

    return DirectConnection;

  })();

  DelegationHandler = (function() {

    function DelegationHandler(peer) {
      this.peer = peer;
      this.values = {};
    }

    DelegationHandler.prototype.value = function(reqId, cmd) {};

    DelegationHandler.prototype.set = function(reqId, cmd) {};

    DelegationHandler.prototype.put = function(reqId, cmd) {};

    DelegationHandler.prototype.splice = function(reqId, cmd) {};

    DelegationHandler.prototype.removeFirst = function(reqId, cmd) {};

    DelegationHandler.prototype.removeAll = function(reqId, cmd) {};

    return DelegationHandler;

  })();

}).call(this);

});

require.define("/browser.js",function(require,module,exports,__dirname,__filename,process){// Generated by CoffeeScript 1.3.3
(function() {
  var ProxyMux, WebSocketConnection, exports, log, _, _ref;

  window.Xus = exports = module.exports = require('./base');

  require('./proto');

  _ref = require('./transport'), log = _ref.log, ProxyMux = _ref.ProxyMux, WebSocketConnection = _ref.WebSocketConnection;

  require('./peer');

  window._ = _ = require('./lodash.min');

  if (window.MozWebSocket) {
    window.WebSocket = window.MozWebSocket;
  }

  exports.xusToProxy = function(xus, url, verbose) {
    var proxy, sock;
    proxy = new ProxyMux(xus);
    proxy.mainDisconnect = function(con) {
      console.log("Disconnecting mux connection and closing");
      window.open('', '_self', '');
      return window.close();
    };
    if (verbose != null) {
      proxy.verbose = log;
    }
    sock = new WebSocket(url);
    return sock.onopen = function() {
      return new WebSocketConnection(proxy, sock);
    };
  };

}).call(this);

});
require("/browser.js");
})();
;
(function() {
  var DONE, Notebook, Parse, Prim, addOpenButton, addPath, auth, checkDriveAuth, clientId, computePaths, createAuthButton, fetchFile, finishAuth, handleAuthResult, id2File, id2Paths, initFileList, initGdrive, initStorage, leisureDir, listFiles, loadFile, makeLeisureDir, mimePart, mkdir, openFile, openFromGdrive, path2Ids, readFile, readFile2, readUrl, replaceAuth, root, runOpen, showDelay, updateFile, writeFile, _ref, _ref2, _ref3, _ref4;

  if ((typeof window !== "undefined" && window !== null) && (!(typeof global !== "undefined" && global !== null) || global === window)) {
    root = (_ref = window.GdriveStorage) != null ? _ref : (window.GdriveStorage = {});
    Prim = (_ref2 = window.Prim) != null ? _ref2 : (window.Prim = {});
    Parse = (_ref3 = window.Parse) != null ? _ref3 : (window.Parse = {});
    Notebook = (_ref4 = window.Notebook) != null ? _ref4 : (window.Notebook = {});
    window.global = window;
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    Prim = require('./prim');
  }

  if (!(typeof window !== "undefined" && window !== null)) {
    initStorage = function initStorage() {};
    return;
  }

  clientId = '270759921607';

  initStorage = function initStorage(callback) {
    return Prim.newUriHandler('googledrive', {
      read: function read(uri, cont, err, next) {
        var file, files, id, m, _ref5,
          _this = this;
        if ((m = (_ref5 = uri.host) != null ? _ref5.match(/^id:(.*)$/) : void 0)) {
          id = decodeURIComponent(m[1]);
          return readUrl("https://docs.google.com/uc?id=" + id + "&export=download", function(error, data) {
            if (!error) {
              return cont(data);
            } else {
              return readUrl("https://docs.google.com/feeds/download/documents/export/Export?id=" + id + "&exportFormat=txt", function(error, data) {
                if (!error) {
                  return cont(data);
                } else if (!auth.finished) {
                  return initGdrive(function() {
                    return fetchFile(id, function(error, file) {
                      if (!error) {
                        return readFile(file, function(error, data) {
                          if (data) {
                            return cont(data);
                          } else {
                            return err("Error: Could not download file " + id, _this.fallbackHtml(file));
                          }
                        });
                      } else {
                        return err("Error " + error.status + ": " + error.statusText, _this.noFile(id));
                      }
                    });
                  });
                } else {
                  return err("Error " + error.status + ": " + error.statusText);
                }
              });
            }
          });
        } else {
          files = path2Ids["/LeisureStorage" + uri.path];
          if (!files) {
            next();
          } else if (files.length > 1) {
            err(new Error("More than one file for uri: " + uri));
          } else {
            file = id2File[files[0]];
          }
          return readFile(file, function(error, result) {
            if (!error) {
              return cont(result);
            } else {
              return err(new Error("Error reading file " + uri + ": " + error.statusText));
            }
          });
        }
      },
      write: function write(uri, data, cont, err) {
        return initGdrive(function() {
          var files;
          files = path2Ids["/LeisureStorage" + uri.path];
          if (!files) {
            return writeFile(uri.path.substring(1), data, [
              {
                id: leisureDir
              }
            ], function(json) {
              if (json) {
                return cont();
              } else {
                return err(new Error("Problem writing file"));
              }
            });
          } else if ((files != null ? files.length : void 0) > 1) {
            return err(new Error("More than one file for uri: " + uri));
          } else {
            return updateFile(id2File[files[0]], data, function(json) {
              if (json) {
                return cont();
              } else {
                return err(new Error("Problem writing file"));
              }
            });
          }
        });
      },
      link: function link(uri) {
        var _this = this;
        return initGdrive(function() {
          var files;
          if (uri.host.match(/^id:.*/)) {
            return _this.basicLink(uri);
          } else {
            files = path2Ids["/LeisureStorage" + uri.path];
            if (!files) {
              return null;
            } else {
              return _this.basicLink("googledrive://id:" + (encodeURIComponent(files[0])));
            }
          }
        });
      },
      fallbackHtml: function fallbackHtml(file) {
        return "<h1>Couldn't open " + file.title + "</h1>\n<h2>Leisure needs your authorization to open " + file.title + " -- all you have to do is open it from your Google Drive Console, once.</h2>\nWhen you installed Leisure, it requrested the minimum privileges it could, in order to keep your documents safe.  To allow Leisure to open the file, you just have to open the file from your Google Drive console, once.  Here's what to do:\n<ol><li>Click <a href='" + file.alternateLink + "'>here</a> to view the file\n<li>Add the file to your 'starred files' by clicking the star at the top of the file's page\n<li>Go to your 'starred' files in your <a href='https://drive.google.com/?authuser=0#starred'>Google Drive console</a>\n<li>Click on " + file.title + " to open it in Leisure\n</ol>\nAfter you do this, you can unstar the file and the normal <a href='" + document.location.href + "'>Leisure link</a>, and it should work just fine.";
      },
      noFile: function noFile(id) {
        return "<h1>Couldn't find file for id, " + id + "</h1><h2>Perhaps it has not been shared with you, it does not exist, or there is a mistake in the URL.</h2>";
      }
    });
  };

  openFromGdrive = function openFromGdrive(callback) {
    var action, exportIds, frag, ids, state, _ref5, _ref6;
    frag = ((_ref5 = Boot.documentFragment) != null ? _ref5 : '#').substring(1);
    state = new Prim.URI("" + document.location.href + frag).getFragParams().state;
    if (state) {
      _ref6 = JSON.parse(state), exportIds = _ref6.exportIds, ids = _ref6.ids, action = _ref6.action;
      if (action !== "open") {
        $('[maindoc]')[0].innerHTML = "<h1>Unknwn action from Google Drive: " + action + "</h1>";
      }
      ids = ids != null ? ids : exportIds;
      if (!ids || ids.length !== 1) {
        return $('[maindoc]')[0].innerHTML = "<h1>More than one file to open: " + (JSON.stringify(ids)) + ", fragment: " + frag + "</h1>";
      } else {
        return loadFile(ids[0], callback);
      }
    } else {
      window.leisureAutoRunAll = true;
      Notebook.replaceContents();
      return callback();
    }
  };

  loadFile = function loadFile(id, cont) {
    $('[maindoc]')[0].innerHTML = "<h1>LOADING Google Drive file... </h1>";
    return initGdrive(function() {
      var file;
      file = id2File[id];
      if (!file) {
        return $('[maindoc]')[0].innerHTML = "<h1>Unknown file id: " + ids[0] + "</h1>";
      } else {
        $('[maindoc]')[0].innerHTML = "<h1>LOADING " + file.title + "... </h1>";
        return readFile(file, function(err, text) {
          var filename, path, _i, _len, _ref5;
          if (err) {
            return $('[maindoc]')[0].innerHTML = "<h1>Error loading " + file.title + ": " + err.statusText + "</h1>";
          } else if (file.fileExtension === 'lmd' || file.title.match(/\.lmd$/)) {
            if (id2Paths[file.id].length > 1) {
              _ref5 = id2Paths[file.id];
              for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
                path = _ref5[_i];
                if (path.match('^/LeisureStorage/')) {
                  if (filename) {
                    $('[maindoc]')[0].innerHTML = "<h1>Error loading " + file.title + ": More than one path to file in LeisureStorage, " + (JSON.stringify(id2Paths[file.id])) + "</h1>";
                  }
                  return;
                } else {
                  filename = path;
                }
              }
            } else {
              filename = id2Paths[file.id][0];
            }
            Boot.addLoadToDocument("googledrive://id:" + file.id);
            Notebook.replaceContents("googledrive://" + (filename.substring('/LeisureStorage'.length)), text);
            return (cont != null ? cont : function() {})();
          } else {
            return $('[maindoc]')[0].innerHTML = "<h1>Error loading " + file.title + "; can only load *.lmd files.</h1>";
          }
        });
      }
    });
  };

  id2Paths = {};

  path2Ids = {};

  id2File = {};

  leisureDir = null;

  addPath = function addPath(id, path) {
    if (path2Ids[path]) {
      path2Ids[path].push(id);
    } else {
      path2Ids[path] = [id];
    }
    if (id2Paths[id]) {
      return id2Paths[id].push(path);
    } else {
      return id2Paths[id] = [path];
    }
  };

  computePaths = function computePaths(file) {
    var parent, parentPath, _i, _j, _len, _len2, _ref5, _ref6;
    if (!file) {
      return [];
    } else if (id2Paths[file.id]) {
      return id2Paths[file.id];
    } else {
      id2File[file.id] = file;
      if (file.parents.length === 0) {
        addPath(file.id, "/" + file.title);
      } else {
        _ref5 = file.parents;
        for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
          parent = _ref5[_i];
          if (parent.isRoot) {
            addPath(file.id, "/" + file.title);
          } else {
            _ref6 = computePaths(id2File[parent.id]);
            for (_j = 0, _len2 = _ref6.length; _j < _len2; _j++) {
              parentPath = _ref6[_j];
              addPath(file.id, "" + parentPath + "/" + file.title);
            }
          }
        }
      }
      return id2Paths[file.id];
    }
  };

  auth = {
    finished: false,
    succeeded: false,
    started: false,
    cont: [],
    err: null,
    status: null,
    token: null
  };

  showDelay = function showDelay() {
    var widget, _ref5;
    if (widget = (_ref5 = Notebook.lastEnv) != null ? _ref5.getWidget() : void 0) {
      widget.appendChild(Notebook.createNode("<img src='loading.gif'>"));
      return function() {
        return Notebook.lastEnv.destroyWidget();
      };
    } else {
      return function() {};
    }
  };

  initGdrive = function initGdrive(cont) {
    var del;
    if (auth.finished) {
      return cont();
    } else if (auth.started) {
      return auth.cont.push(cont);
    } else {
      del = showDelay();
      return Notebook.delay(function() {
        Boot.loadThen(["https://apis.google.com/js/client.js?onload=gapiClientLoaded"], function() {});
        auth.started = true;
        return auth.cont.push(function() {
          if (typeof del === "function") del();
          return cont();
        });
      });
    }
  };

  initFileList = function initFileList(cont) {
    return listFiles(function(json) {
      var dirs, item, key, name, names, _i, _j, _k, _len, _len2, _len3, _ref5, _ref6;
      _ref5 = json.items;
      for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
        item = _ref5[_i];
        if (!item.explicitlyTrashed) id2File[item.id] = item;
      }
      _ref6 = json.items;
      for (_j = 0, _len2 = _ref6.length; _j < _len2; _j++) {
        item = _ref6[_j];
        computePaths(item);
      }
      names = (function() {
        var _results;
        _results = [];
        for (key in path2Ids) {
          _results.push(key);
        }
        return _results;
      })();
      names.sort();
      for (_k = 0, _len3 = names.length; _k < _len3; _k++) {
        name = names[_k];
        console.log(name);
      }
      dirs = path2Ids["/LeisureStorage"];
      if (!dirs) {
        return makeLeisureDir(cont);
      } else {
        if (dirs.length > 1) {
          replaceAuth({
            succeeded: false,
            err: "More than one LeisureStorage directory"
          });
        } else {
          console.log("SETTING DIR TO " + dirs[0]);
          leisureDir = dirs[0];
        }
        return cont();
      }
    });
  };

  window.gapiClientLoaded = function gapiClientLoaded() {
    return window.setTimeout((function() {
      return checkDriveAuth(true);
    }), 100);
  };

  window.handleAuthClick = function handleAuthClick(event) {
    checkDriveAuth(false);
    return false;
  };

  checkDriveAuth = function checkDriveAuth(immediate) {
    console.log("AUTH");
    try {
      return gapi.auth.authorize({
        client_id: clientId,
        scope: ['https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive.install'].join(' '),
        immediate: immediate
      }, handleAuthResult);
    } catch (err) {
      finishAuth({
        status: 'failed',
        err: err
      });
      return console.log("Authentication not allowed by security");
    }
  };

  handleAuthResult = function handleAuthResult(authResult) {
    var authorizeButton;
    authorizeButton = document.getElementById('authorize-button');
    if (!authResult) {
      console.log("Not authenticated, yet -- creating button");
      return createAuthButton();
    } else {
      if (authResult.error) {
        console.log("Authentication failed: " + authResult.error);
        return finishAuth({
          succeeded: false,
          err: authResult != null ? authResult.error : void 0
        });
      } else {
        console.log("Authenticated: " + (JSON.stringify(authResult)));
        return finishAuth({
          succeeded: true,
          token: authResult.access_token
        });
      }
    }
  };

  createAuthButton = function createAuthButton() {
    if (!auth.buttonDiv) {
      auth.buttonDiv = document.createElement('div');
      auth.buttonDiv.setAttribute('style', 'background: white; z-index: 10000; position: absolute; left: 0; top: 0; width: 100%; height: 100%');
      auth.buttonDiv.innerHTML = '<span>Would you like to authorize Leisure to create files and access them in a LeisureStorage directory in your Google drive?  <button onclick="handleAuthClick()">Yes</button> <button onclick="denyAuth()">No</button></span>';
      return document.body.insertBefore(auth.buttonDiv, document.body.firstChild);
    }
  };

  window.denyAuth = function denyAuth() {
    return finishAuth({
      succeeded: false,
      err: 'User denied authorization'
    });
  };

  finishAuth = function finishAuth(obj) {
    var cont, _i, _len, _ref5, _ref6, _results;
    if (!auth.finished) {
      replaceAuth(obj);
      if (obj.succeeded) {
        return initFileList(function() {
          var cont, _i, _len, _ref5, _ref6, _results;
          _ref6 = (_ref5 = auth.cont) != null ? _ref5 : [];
          _results = [];
          for (_i = 0, _len = _ref6.length; _i < _len; _i++) {
            cont = _ref6[_i];
            _results.push(cont());
          }
          return _results;
        });
      } else {
        _ref6 = (_ref5 = auth.cont) != null ? _ref5 : [];
        _results = [];
        for (_i = 0, _len = _ref6.length; _i < _len; _i++) {
          cont = _ref6[_i];
          _results.push(cont());
        }
        return _results;
      }
    }
  };

  replaceAuth = function replaceAuth(obj) {
    var _ref5, _ref6;
    if (auth.buttonDiv) document.body.removeChild(auth.buttonDiv);
    obj.cont = ((_ref6 = auth.cont) != null ? _ref6 : []).concat((_ref5 = obj.cont) != null ? _ref5 : []);
    obj.finished = true;
    return auth = obj;
  };

  makeLeisureDir = function makeLeisureDir(cont) {
    console.log("No LeisureStorage directory.  Creating one");
    return mkdir('LeisureStorage', function(json, raw) {
      computePaths(json);
      console.log("SETTING DIR TO " + json.id);
      leisureDir = json.id;
      console.log("CREATED DIR: " + raw, json);
      return cont();
    });
  };

  addOpenButton = function addOpenButton() {
    var open, save;
    return;
    save = document.body.querySelector('[leisureId=saveButton]');
    open = Notebook.createNode("<button>Open</button>");
    save.parentNode.insertBefore(open, save.nextSibling);
    return open.addEventListener('click', function() {
      return runOpen();
    });
  };

  runOpen = function runOpen(arg, parent) {
    return initGdrive(function() {
      var picker, view;
      view = new google.picker.DocsView();
      view.setParent(parent != null ? parent : path2Ids["/LeisureStorage"]);
      picker = new google.picker.PickerBuilder().addView(view).setCallback(arg != null ? arg : openFile).build();
      return picker.setVisible(true);
    });
  };

  openFile = function openFile(json) {
    var _ref5;
    if ((json != null ? json.action : void 0) === 'picked' && ((_ref5 = json.docs) != null ? _ref5.length : void 0) > 0) {
      return loadFile(json.docs[0].id);
    }
  };

  mimePart = function mimePart(boundary, mimeType, content) {
    return ["\r\n--", boundary, "\r\n", "Content-Type: ", mimeType, "\r\n", "Content-Length: ", content.length, "\r\n", "\r\n", content].join('');
  };

  DONE = 4;

  fetchFile = function fetchFile(id, callback) {
    var del;
    del = showDelay();
    return Notebook.delay(function() {
      var xhr;
      xhr = new XMLHttpRequest();
      xhr.open('GET', "https://www.googleapis.com/drive/v2/files/" + id);
      xhr.setRequestHeader('Authorization', 'Bearer ' + auth.token);
      xhr.onreadystatechange = function onreadystatechange() {
        if (this.readyState === DONE) {
          del();
          console.log("XHR", xhr);
          if (this.status === 200) {
            return callback(null, JSON.parse(xhr.responseText));
          } else {
            return callback(xhr);
          }
        }
      };
      return xhr.send();
    });
  };

  readFile2 = function readFile2(fileID, callback) {
    return gapi.client.request({
      path: "/drive/v2/files/" + fileID,
      method: 'GET',
      callback: function callback(responseJson) {
        var myToken, myXHR;
        myToken = gapi.auth.getToken();
        myXHR = new XMLHttpRequest();
        myXHR.open('GET', responseJson.downloadUrl, true);
        myXHR.setRequestHeader('Authorization', 'Bearer ' + myToken.access_token);
        myXHR.onreadystatechange = function onreadystatechange() {
          if (myXHR.readyState === 4) {
            if (myXHR.status === 200) {
              return callback(null, myXHR.responseText);
            } else {
              return callback(myXHR);
            }
          }
        };
        return myXHR.send();
      }
    });
  };

  readFile = function readFile(file, callback) {
    var url, _ref5, _ref6;
    if (url = (_ref5 = file.downloadUrl) != null ? _ref5 : (_ref6 = file.exportLinks) != null ? _ref6['text/plain'] : void 0) {
      console.log("File:", file);
      return readUrl(url, callback);
    } else {
      return callback(null);
    }
  };

  readUrl = function readUrl(url, callback) {
    var del;
    del = showDelay();
    return Notebook.delay(function() {
      var xhr;
      xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.setRequestHeader('Authorization', 'Bearer ' + auth.token);
      xhr.onreadystatechange = function onreadystatechange() {
        if (this.readyState === DONE) {
          del();
          console.log("XHR", xhr);
          if (this.status === 200) {
            return callback(null, xhr.responseText);
          } else {
            return callback(xhr);
          }
        }
      };
      return xhr.send();
    });
  };

  writeFile = function writeFile(name, contents, parents, callback) {
    var del;
    del = showDelay();
    return Notebook.delay(function() {
      var json, req;
      console.log("WRITING " + name + " (del: " + del + "), parents:", JSON.stringify(parents));
      json = JSON.stringify({
        mimeType: 'text/plain',
        title: name,
        parents: parents != null ? parents : []
      });
      req = gapi.client.request({
        'path': '/upload/drive/v2/files?uploadType=multipart',
        'method': 'POST',
        'headers': {
          'Content-Type': 'multipart/mixed; boundary="END_OF_PART"',
          'Authorization': 'Bearer ' + auth.token
        },
        'body': [mimePart("END_OF_PART", "application/json", json), mimePart("END_OF_PART", "text/plain", contents), "\r\n--END_OF_PART--\r\n"].join('')
      });
      return req.execute(function(json) {
        del();
        if (json) computePaths(json);
        return callback(json);
      });
    });
  };

  updateFile = function updateFile(file, contents, callback) {
    var del;
    del = showDelay();
    return Notebook.delay(function() {
      console.log("UPDATING " + name + ", parents:", JSON.stringify(file.parents));
      return gapi.client.request({
        'path': "/upload/drive/v2/files/" + file.id + "?uploadType=multipart&alt=json",
        'method': 'PUT',
        'headers': {
          'Content-Type': 'multipart/mixed; boundary="END_OF_PART"',
          'Authorization': 'Bearer ' + auth.token
        },
        'body': [mimePart("END_OF_PART", "application/json", JSON.stringify(file)), mimePart("END_OF_PART", "text/plain", contents), "\r\n--END_OF_PART--\r\n"].join('')
      }).execute(function(json) {
        del();
        return callback(json);
      });
    });
  };

  listFiles = function listFiles(query, callback) {
    var q;
    if (!callback) {
      callback = query;
      q = '';
    } else {
      q = "&q=" + (encodeURIComponent(query));
    }
    return (gapi.client.request({
      path: "/drive/v2/files?maxResults=10000" + q,
      method: 'GET'
    })).execute(callback);
  };

  mkdir = function mkdir(name, callback) {
    return (gapi.client.request({
      path: '/drive/v2/files',
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + auth.token
      },
      body: JSON.stringify({
        title: name,
        parents: [],
        mimeType: "application/vnd.google-apps.folder"
      })
    })).execute(callback);
  };

  root.initStorage = initStorage;

  root.runOpen = runOpen;

  root.loadFile = loadFile;

  root.openFromGdrive = openFromGdrive;

}).call(this);
;

/*
Copyright (C) 2012, Bill Burdick, Tiny Concepts: https://github.com/zot/Leisure

(licensed with ZLIB license)

This software is provided 'as-is', without any express or implied
warranty. In no event will the authors be held liable for any damages
arising from the use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

1. The origin of this software must not be misrepresented; you must not
claim that you wrote the original software. If you use this software
in a product, an acknowledgment in the product documentation would be
appreciated but is not required.

2. Altered source versions must be plainly marked as such, and must not be
misrepresented as being the original software.

3. This notice may not be removed or altered from any source distribution.
*/

(function() {
  var DL, LeisureObject, Leisure_cons, Leisure_lexCons, Leisure_nil, Leisure_token, LexDL, Nil, Scanner, apply, badLambdaCont, baseTokenPat, charCodes, checkLambda, checkType, cleanupMacro, codeChars, collapseTrivial, cons, defGroup, defToken, defaultScanner, define, defineMacro, dlappend, dlempty, dlnew, elements, elementsLoop, elementsTail, ensureLeisureClass, escapeRegexpChars, evalFunc, foldLeft, getApplyArg, getApplyFunc, getAstType, getLambdaBody, getLambdaVar, getLitVal, getRefVar, getType, ifParsed, inspect, isLambdaToken, jsType, lambda, left, leisureAddFunc, lexCons, lexDlappend, lexDlempty, lexDlnew, lfunc, listToApply, listToAst, listToLambda, lit, makeToken, mkProto, nameSub, numberPat, parse, parseFull, parseOptional, pos, positionGroup, primCons, primFoldLeft, primLexCons, primListToAst, primToken, print, printApply, printLambda, ref, right, root, setDataType, setType, snip, subprint, substituteLambdaBody, substituteLambdaMacros, substituteMacros, tag, throwError, tokPos, tokenToAst,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  if ((typeof window !== "undefined" && window !== null) && (!(typeof global !== "undefined" && global !== null) || global === window)) {
    window.global = window;
    window.Parse = root = {};
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    inspect = require('util').inspect;
  }

  charCodes = {
    "'": '$a',
    ',': '$b',
    '$': '$$',
    '@': '$d',
    '?': '$e',
    '/': '$f',
    '*': '$g',
    '&': '$h',
    '^': '$i',
    '!': '$k',
    '`': '$l',
    '~': '$m',
    '-': '$_',
    '+': '$o',
    '=': '$p',
    '|': '$q',
    '[': '$r',
    ']': '$s',
    '{': '$t',
    '}': '$u',
    '"': '$v',
    ':': '$w',
    ';': '$x',
    '<': '$y',
    '>': '$z',
    '%': '$A',
    '.': '$B'
  };

  codeChars = new function() {
    var char, code;
    for (char in charCodes) {
      code = charCodes[char];
      this[code.substring(1)] = char;
    }
    return this;
  };

  nameSub = function nameSub(name) {
    var code, i, s, _ref;
    s = '_';
    for (i = 0, _ref = name.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
      code = charCodes[name[i]];
      s += code != null ? code : name[i];
    }
    return s;
  };

  setDataType = function setDataType(func, dataType) {
    if (dataType) func.dataType = dataType;
    return func;
  };

  setType = function setType(func, type) {
    if (type) func.type = type;
    func.__proto__ = (ensureLeisureClass(type)).prototype;
    return func;
  };

  LeisureObject = (function() {

    function LeisureObject() {}

    return LeisureObject;

  })();

  global.LeisureObject = LeisureObject;

  ensureLeisureClass = function ensureLeisureClass(leisureClass) {
    var cl;
    cl = "Leisure" + (nameSub(leisureClass));
    if (!(global[cl] != null)) {
      global[cl] = eval("(function " + cl + "(){})");
      global[cl].prototype.__proto__ = LeisureObject.prototype;
    }
    return global[cl];
  };

  Leisure_cons = (function(_super) {

    __extends(Leisure_cons, _super);

    function Leisure_cons() {
      Leisure_cons.__super__.constructor.apply(this, arguments);
    }

    Leisure_cons.prototype.head = function head() {
      return this(function() {
        return function(a) {
          return function(b) {
            return a();
          };
        };
      });
    };

    Leisure_cons.prototype.tail = function tail() {
      return this(function() {
        return function(a) {
          return function(b) {
            return b();
          };
        };
      });
    };

    Leisure_cons.prototype.find = function find(func) {
      return func(this.head()) || this.tail().find(func);
    };

    Leisure_cons.prototype.removeAll = function removeAll(func) {
      var t;
      t = this.tail().removeAll(func);
      if (func(this.head)) {
        return t;
      } else if (t === this.tail()) {
        return this;
      } else {
        return cons(this.head(), t);
      }
    };

    Leisure_cons.prototype.map = function map(func) {
      return cons(func(this.head()), this.tail().map(func));
    };

    Leisure_cons.prototype.foldl = function foldl(func, arg) {
      return this.tail().foldl(func, func(arg, this.head()));
    };

    Leisure_cons.prototype.foldl1 = function foldl1(func) {
      return this.tail().foldl(func, this.head());
    };

    Leisure_cons.prototype.foldr = function foldr(func, arg) {
      return func(this.head(), this.tail().foldr(func, arg));
    };

    Leisure_cons.prototype.foldr1 = function foldr1(func) {
      if (this.tail() === Nil) {
        return this.head();
      } else {
        return func(this.head(), this.tail().foldr1(func));
      }
    };

    Leisure_cons.prototype.toArray = function toArray() {
      return this.foldl((function(i, el) {
        i.push(el);
        return i;
      }), []);
    };

    Leisure_cons.prototype.join = function join(str) {
      return this.toArray().join(str);
    };

    Leisure_cons.prototype.toString = function toString() {
      return "Cons[" + (this.elementString()) + "]";
    };

    Leisure_cons.prototype.elementString = function elementString() {
      return "" + (this.head()) + (this.tail() === Nil ? '' : this.tail() instanceof Leisure_cons ? " " + (this.tail().elementString()) : " | " + (this.tail()));
    };

    Leisure_cons.prototype.reverse = function reverse() {
      return this.rev(Nil);
    };

    Leisure_cons.prototype.rev = function rev(result) {
      return this.tail().rev(cons(this.head(), result));
    };

    Leisure_cons.prototype.equals = function equals(other) {
      return this === other || (other instanceof Leisure_cons && (this.head() === other.head() || (this.head() instanceof Leisure_cons && this.head().equals(other.head()))) && (this.tail() === other.tail() || (this.tail() instanceof Leisure_cons && this.tail().equals(other.tail()))));
    };

    Leisure_cons.prototype.each = function each(block) {
      block(this.head());
      return this.tail().each(block);
    };

    Leisure_cons.prototype.last = function last() {
      var t;
      t = this.tail();
      if (t === Nil) {
        return t;
      } else {
        return t.last();
      }
    };

    Leisure_cons.prototype.append = function append(l) {
      return cons(this.head(), this.tail().append(l));
    };

    return Leisure_cons;

  })(LeisureObject);

  global.Leisure_cons = Leisure_cons;

  Leisure_nil = (function(_super) {

    __extends(Leisure_nil, _super);

    function Leisure_nil() {
      Leisure_nil.__super__.constructor.apply(this, arguments);
    }

    Leisure_nil.prototype.find = function find() {
      return false;
    };

    Leisure_nil.prototype.removeAll = function removeAll() {
      return this;
    };

    Leisure_nil.prototype.map = function map(func) {
      return Nil;
    };

    Leisure_nil.prototype.foldl = function foldl(func, arg) {
      return arg;
    };

    Leisure_nil.prototype.foldr = function foldr(func, arg) {
      return arg;
    };

    Leisure_nil.prototype.reverse = function reverse() {
      return this;
    };

    Leisure_nil.prototype.rev = function rev(result) {
      return result;
    };

    Leisure_nil.prototype.equals = function equals(other) {
      return other instanceof Leisure_nil;
    };

    Leisure_nil.prototype.each = function each() {};

    Leisure_nil.prototype.toArray = function toArray() {
      return [];
    };

    Leisure_nil.prototype.join = function join() {
      return '';
    };

    Leisure_nil.prototype.append = function append(l) {
      return l;
    };

    Leisure_nil.prototype.toString = function toString() {
      return "Cons[]";
    };

    return Leisure_nil;

  })(LeisureObject);

  global.Leisure_nil = Leisure_nil;

  DL = (function() {

    function DL() {}

    return DL;

  })();

  jsType = function jsType(v) {
    var t;
    t = typeof v;
    if (t === 'object') {
      return v.constructor || t;
    } else {
      return t;
    }
  };

  mkProto = function mkProto(protoFunc, value) {
    value.__proto__ = protoFunc.prototype;
    return value;
  };

  throwError = function throwError(msg) {
    throw (msg instanceof Error ? msg : new Error(String(msg)));
  };

  checkType = function checkType(value, type) {
    if (!(value instanceof type)) {
      return throwError("Type error: expected type: " + type + ", but got: " + (jsType(value)));
    }
  };

  primCons = setDataType((function(a) {
    return function(b) {
      return mkProto(Leisure_cons, setType((function(f) {
        return f()(a)(b);
      }), 'cons'));
    };
  }), 'cons');

  Nil = mkProto(Leisure_nil, setType((function(a) {
    return function(b) {
      return b();
    };
  }), 'nil'));

  cons = function cons(a, b) {
    return primCons(function() {
      return a;
    })(function() {
      return b;
    });
  };

  dlempty = mkProto(DL, function(x) {
    return x;
  });

  dlnew = function dlnew(a) {
    return mkProto(DL, function(b) {
      return cons(a, b);
    });
  };

  dlappend = function dlappend(a, b) {
    checkType(a, DL);
    checkType(b, DL);
    return mkProto(DL, function(c) {
      return a(b(c));
    });
  };

  foldLeft = function foldLeft(func, val, thing) {
    if (thing instanceof Leisure_cons) {
      return thing.foldl(func, val);
    } else {
      return primFoldLeft(func, val, thing, 0);
    }
  };

  primFoldLeft = function primFoldLeft(func, val, array, index) {
    if (index < array.length) {
      return primFoldLeft(func, func(val, array[index]), array, index + 1);
    } else {
      return val;
    }
  };

  Leisure_lexCons = (function(_super) {

    __extends(Leisure_lexCons, _super);

    function Leisure_lexCons() {
      Leisure_lexCons.__super__.constructor.apply(this, arguments);
    }

    Leisure_lexCons.prototype.head = function head() {
      return this(function() {
        return function(a) {
          return function(s) {
            return function(b) {
              return function(e) {
                return a();
              };
            };
          };
        };
      });
    };

    Leisure_lexCons.prototype.tail = function tail() {
      return this(function() {
        return function(a) {
          return function(s) {
            return function(b) {
              return function(e) {
                return b();
              };
            };
          };
        };
      });
    };

    Leisure_lexCons.prototype.start = function start() {
      return this(function() {
        return function(a) {
          return function(s) {
            return function(b) {
              return function(e) {
                return s();
              };
            };
          };
        };
      });
    };

    Leisure_lexCons.prototype.end = function end() {
      return this(function() {
        return function(a) {
          return function(s) {
            return function(b) {
              return function(e) {
                return e();
              };
            };
          };
        };
      });
    };

    Leisure_lexCons.prototype.map = function map(func) {
      return lexCons(func(this.head()), this.start(), this.tail().map(func), this.end());
    };

    Leisure_lexCons.prototype.withStart = function withStart(start) {
      return lexCons(this.head(), start, this.tail(), this.end());
    };

    Leisure_lexCons.prototype.toString = function toString() {
      return "LexCons(" + (this.start()) + ", " + (this.end()) + ")[" + (this.toArray().join(' ')) + "]";
    };

    return Leisure_lexCons;

  })(Leisure_cons);

  global.Leisure_lexCons = Leisure_lexCons;

  primLexCons = setDataType((function(a) {
    return function(start) {
      return function(b) {
        return function(end) {
          return mkProto(Leisure_lexCons, setType((function(f) {
            return f()(a)(b.start && Math.min(b.start(), start) || start)(b)(a.end && Math.max(a.end(), end) || end);
          }), 'lexCons'));
        };
      };
    };
  }), 'lexCons');

  LexDL = (function() {

    function LexDL() {}

    return LexDL;

  })();

  lexCons = function lexCons(a, start, b, end) {
    var e, s;
    s = b.start != null ? Math.min(start, b.start()) : start;
    e = a.end != null ? Math.max(end, a.end()) : end;
    return primLexCons(function() {
      return a;
    })(function() {
      return s;
    })(function() {
      return b;
    })(function() {
      return e;
    });
  };

  lexDlempty = mkProto(LexDL, function(x, end) {
    return x;
  });

  lexDlnew = function lexDlnew(a, start) {
    return mkProto(LexDL, function(b, end) {
      return lexCons(a, start, b, end);
    });
  };

  lexDlappend = function lexDlappend(a, b) {
    checkType(a, LexDL);
    checkType(b, LexDL);
    return mkProto(LexDL, function(c, end) {
      return a(b(c, end), end);
    });
  };

  global.leisureMacros = {};

  global.leisureFuncs = {};

  global.leisureFuncNames = Nil;

  leisureAddFunc = global.leisureAddFunc = function leisureAddFunc(nm) {
    return global.leisureFuncNames = cons(nm, global.leisureFuncNames);
  };

  root.evalFunc = evalFunc = eval;

  define = function define(name, func, arity, src, method) {
    var nm;
    func.src = src;
    func.leisureContexts = [];
    nm = nameSub(name);
    func.leisureName = name;
    func.leisureArity = arity;
    if (!method && global.noredefs && (global[nm] != null)) {
      throwError("[DEF] Attempt to redefine definition: " + name);
    }
    global[nm] = global.leisureFuncs[nm] = func;
    leisureAddFunc(name);
    return func;
  };

  define('cons', (function() {
    return primCons;
  }), 2, '\a b f . f a b');

  define('lexCons', (function() {
    return primLexCons;
  }), 4, '\a s b e f . f a s b e');

  define('lexStart', (function() {
    return function(l) {
      return l().start();
    };
  }), 1, '\l . l h s t e . s');

  define('lexEnd', (function() {
    return function(l) {
      return l().end();
    };
  }), 1, '\l . l h s t e . e');

  define('nil', (function() {
    return Nil;
  }), 0, '\a b . b');

  lfunc = function lfunc(f) {
    return function(v, el) {
      return f()(function() {
        return v;
      })(function() {
        return el;
      });
    };
  };

  Scanner = (function() {

    function Scanner() {
      this.tokenPat = new RegExp("\\n *|" + baseTokenPat.source);
      this.tokens = {};
      this.tokenTypes = [];
      this.groupOpens = {
        '(': ')'
      };
      this.groupCloses = {
        ')': 1
      };
      this.filters = [];
      this.filterInfo = Nil;
    }

    Scanner.prototype.addFilter = function addFilter(filter) {
      return this.filters.push(filter);
    };

    Scanner.prototype.defToken = function defToken(name) {
      var i, types;
      if (!(this.tokens[name] != null)) {
        this.tokens[name] = 1;
        this.tokenTypes.push(name);
        this.tokenTypes.sort(function(a, b) {
          return b.length - a.length;
        });
        types = (function() {
          var _i, _len, _ref, _results;
          _ref = this.tokenTypes;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            i = _ref[_i];
            _results.push(escapeRegexpChars(i));
          }
          return _results;
        }).call(this);
        return this.tokenPat = new RegExp("\\n *|" + (types.join('|')) + "|" + baseTokenPat.source);
      }
    };

    Scanner.prototype.defGroup = function defGroup(open, close) {
      if (!(this.tokens[open] != null)) {
        this.defToken(open);
        this.defToken(close);
        this.groupOpens[open] = close;
        return this.groupCloses[close] = 1;
      }
    };

    Scanner.prototype.nextTok = function nextTok(str) {
      var m, rest, tok;
      m = str.match(this.tokenPat);
      if (!m) {
        return [str, ''];
      } else if (m.index > 0) {
        return [str.substring(0, m.index), str.substring(m.index)];
      } else {
        tok = m[0];
        if (tok[0][0] === "'") {
          tok = '"' + tok.substring(1, tok.length - 1).replace(/[\\]?./g, function(s) {
            if (s[0] === '"') {
              return '\\"';
            } else {
              return s;
            }
          }) + '"';
        }
        rest = str.substring(m.index + m[0].length);
        if (tok[0] === '#' || tok[0] === ' ' || (tok[0] === '\n' && rest[0] === '\n')) {
          return this.nextTok(rest);
        } else {
          return [tok, rest];
        }
      }
    };

    Scanner.prototype.scan = function scan(str) {
      return this.filter(0, this.basicScan(str));
    };

    Scanner.prototype.basicScan = function basicScan(str) {
      return ifParsed(this.parseGroup(str, '\n', str.length), function(group, rest) {
        return [group(Nil, str.length - rest.length), null, rest];
      });
    };

    Scanner.prototype.filter = function filter(index, result) {
      var _this = this;
      return ifParsed(result, function(group, rest) {
        if (index < _this.filters.length) {
          try {
            return _this.filter(index + 1, [
              cleanupMacro(0, _this.filters[index](function() {
                return _this.filterInfo;
              })(function() {
                return group;
              })), null, rest
            ]);
          } catch (err) {
            return [null, err.toString(), null];
          }
        } else {
          return [group, null, rest];
        }
      });
    };

    Scanner.prototype.parseGroup = function parseGroup(str, indent, totalLen) {
      var rest, tok, _ref,
        _this = this;
      if (!str) {
        return [lexDlempty, null, str];
      } else {
        _ref = this.nextTok(str), tok = _ref[0], rest = _ref[1];
        if (!tok || (tok[0] === '\n' && tok.length <= indent.length) || this.groupCloses[tok]) {
          return [lexDlempty, null, str];
        } else {
          return ifParsed(this.parseGroupTerm(tok, rest, indent, totalLen), function(term, rest2) {
            return ifParsed(_this.parseGroup(rest2, indent, totalLen), function(group, rest3) {
              return [lexDlappend(term, group), null, rest3];
            });
          });
        }
      }
    };

    Scanner.prototype.parseGroupTerm = function parseGroupTerm(tok, rest, indent, totalLen) {
      var close, token, tp,
        _this = this;
      token = makeToken(tok, rest, totalLen);
      if (tok[0] === '\n') {
        return ifParsed(this.parseGroup(rest, tok, totalLen), function(group, rest2) {
          return [lexDlnew(collapseTrivial(group(Nil, totalLen - rest2.length)), token.start()), null, rest2];
        });
      } else {
        if (close = this.groupOpens[tok]) {
          return ifParsed(this.parseGroup(rest, indent, totalLen), function(group, rest2) {
            var closeToken, innerGroup, next, rest3, _ref;
            _ref = _this.nextTok(rest2), next = _ref[0], rest3 = _ref[1];
            closeToken = makeToken(next, rest3, totalLen);
            if (close !== next) {
              return [null, "Expecting group close: '" + close + "', but got " + (snip(rest2)) + "\n" + (new Error().stack), rest3];
            } else if (tok === '(') {
              return [lexDlnew(positionGroup(group, token, closeToken), token.start()), null, rest3];
            } else {
              innerGroup = lexDlappend(lexDlappend(lexDlnew(token, token.start()), group), lexDlnew(closeToken, closeToken.start()))(Nil, closeToken.end());
              return [lexDlnew(innerGroup, token.start()), null, rest3];
            }
          });
        } else {
          if (tok[0] === "`") {
            tp = token.start() + 1;
            tok = tok.substring(1, tok.length - 1);
            token = primToken(function() {
              return tok;
            })(function() {
              return tp;
            });
          }
          return [lexDlnew(token, token.start()), null, rest];
        }
      }
    };

    return Scanner;

  })();

  escapeRegexpChars = function escapeRegexpChars(str) {
    return str.replace(/([\][().\\*+?{}|])/g, '\\$1');
  };

  baseTokenPat = /[().\\\u03BB]| +|[0-9]+\.[0-9]+|`(\\[\\`]|[^`\n])*`|'(\\[\\']|[^'\n])*'|"(\\[\\"]|[^"\n])*"|#[^\n]*(\n|$)/;

  numberPat = /^[0-9]+\.[0-9]+$/;

  defaultScanner = new Scanner();

  defToken = function defToken(name) {
    return defaultScanner.defToken(name);
  };

  defGroup = function defGroup(open, close) {
    return defaultScanner.defGroup(open, close);
  };

  pos = function pos(str, totalLen) {
    return totalLen - str.length;
  };

  tokPos = function tokPos(tok, str, totalLen) {
    return totalLen - str.length - tok.length;
  };

  snip = function snip(str) {
    return "[" + (str.substring(0, 80)) + "]";
  };

  Leisure_token = (function(_super) {

    __extends(Leisure_token, _super);

    function Leisure_token() {
      Leisure_token.__super__.constructor.apply(this, arguments);
    }

    Leisure_token.prototype.tok = function tok() {
      return this(function() {
        return function(t) {
          return function(p) {
            return t();
          };
        };
      });
    };

    Leisure_token.prototype.start = function start() {
      return this(function() {
        return function(t) {
          return function(p) {
            return p();
          };
        };
      });
    };

    Leisure_token.prototype.end = function end() {
      return this.start() + this.tok().length;
    };

    Leisure_token.prototype.toString = function toString() {
      return "Token('" + (this.tok()) + "', " + (this.start()) + "-" + (this.end() - 1) + ")";
    };

    Leisure_token.prototype.zeroLen = function zeroLen() {
      var _this = this;
      this.end = function end() {
        return _this.start();
      };
      return this;
    };

    return Leisure_token;

  })(LeisureObject);

  global.Leisure_token = Leisure_token;

  primToken = setDataType((function(tok) {
    return function(pos) {
      return mkProto(Leisure_token, setType((function(f) {
        return f()(tok)(pos);
      }), 'token'));
    };
  }), 'token');

  makeToken = function makeToken(tok, rest, totalLen) {
    var tp;
    tp = totalLen - rest.length - tok.length;
    return primToken(function() {
      return tok;
    })(function() {
      return tp;
    });
  };

  define('token', (function() {
    return primToken;
  }), 2, '\tok pos f . f tok pos');

  define('tokenName', (function() {
    return function(t) {
      return t().tok();
    };
  }), 1, '\tok . tok \n p . n');

  define('tokenStart', (function() {
    return function(t) {
      return t().start();
    };
  }), 1, '\tok . tok \n p . p');

  ifParsed = function ifParsed(res, block) {
    if (res[1]) {
      return res;
    } else {
      return block(res[0], res[2]);
    }
  };

  collapseTrivial = function collapseTrivial(group) {
    if (group instanceof Leisure_cons && group.tail() === Nil) {
      return collapseTrivial(group.head());
    } else {
      return group;
    }
  };

  positionGroup = function positionGroup(groupDL, startTok, endTok) {
    var g;
    g = collapseTrivial(groupDL(Nil, endTok.end()));
    if (g instanceof Leisure_lexCons) {
      return g.withStart(startTok.start());
    } else {
      return g;
    }
  };

  defineMacro = function defineMacro(name, func) {
    return global.leisureMacros[name] = func();
  };

  substituteMacros = function substituteMacros(list) {
    var cleaned, macro;
    if (list === Nil || !(list instanceof Leisure_cons)) {
      return list;
    } else if (list.head() instanceof Leisure_token && (macro = global.leisureMacros[list.head().tok()])) {
      cleaned = cleanupMacro((list instanceof Leisure_cons ? list.end() : 0), macro(function() {
        return list;
      }));
      return substituteMacros(cleaned);
    } else {
      return substituteLambdaMacros(list);
    }
  };

  substituteLambdaMacros = function substituteLambdaMacros(list) {
    if (list === Nil) {
      return Nil;
    } else if (isLambdaToken(list.head())) {
      return substituteLambdaBody(list);
    } else {
      return lexCons(substituteMacros(list.head()), list.start(), substituteLambdaMacros(list.tail()), list.end());
    }
  };

  substituteLambdaBody = function substituteLambdaBody(list) {
    if (list === Nil) {
      return Nil;
    } else {
      return lexCons(list.head(), list.start(), ((list.head() instanceof Leisure_token) && list.head().tok() === '.' ? substituteMacros(list.tail()) : substituteLambdaBody(list.tail())), list.end());
    }
  };

  cleanupMacro = function cleanupMacro(nextOffset, list) {
    var head, tail, _ref;
    if ((_ref = typeof list) === 'string' || _ref === 'number') {
      return primToken(function() {
        return String(list);
      })(function() {
        return nextOffset;
      }).zeroLen();
    } else if (!(list instanceof Leisure_cons) || (list === Nil)) {
      return list;
    } else if (list instanceof Leisure_lexCons) {
      return list.foldr((function(el, res) {
        var cl;
        cl = cleanupMacro(res.start && res.start() || nextOffset, el);
        return lexCons(cl, cl.start(), res, (res.end ? res.end() : Math.max(cl.end(), nextOffset)));
      }), Nil);
    } else {
      tail = cleanupMacro(nextOffset, list.tail());
      head = cleanupMacro(tail.start && tail.start() || nextOffset, list.head());
      return lexCons(head, head.start(), tail, tail.end && tail.end() || Math.max(head.end(), nextOffset));
    }
  };

  define('lit', function() {
    return setDataType((function(_x) {
      return setType((function(_f) {
        return _f()(_x);
      }), 'lit');
    }), 'lit');
  });

  define('ref', function() {
    return setDataType((function(_x) {
      return setType((function(_f) {
        return _f()(_x);
      }), 'ref');
    }), 'ref');
  });

  define('lambda', function() {
    return setDataType((function(_v) {
      return function(_f) {
        return setType((function(_g) {
          return _g()(_v)(_f);
        }), 'lambda');
      };
    }), 'lambda');
  });

  define('apply', function() {
    return setDataType((function(_func) {
      return function(_arg) {
        return setType((function(_f) {
          return _f()(_func)(_arg);
        }), 'apply');
      };
    }), 'apply');
  });

  tag = function tag(ast, start, end) {
    ast.leisureStart = start;
    ast.leisureEnd = end;
    return ast;
  };

  getType = function getType(f) {
    var t;
    t = typeof f;
    return (t === 'function' && (f != null ? f.type : void 0)) || ("*" + t);
  };

  lit = function lit(l) {
    return _lit()(function() {
      return l;
    });
  };

  ref = function ref(r) {
    return _ref()(function() {
      return r;
    });
  };

  lambda = function lambda(v, body) {
    return _lambda()(function() {
      return v;
    })(function() {
      return body;
    });
  };

  apply = function apply(f, a) {
    return _apply()(function() {
      return f;
    })(function() {
      return a;
    });
  };

  getAstType = function getAstType(f) {
    return f.type;
  };

  getRefVar = function getRefVar(rf) {
    return rf(function() {
      return function(a) {
        return a();
      };
    });
  };

  getLitVal = function getLitVal(lt) {
    return lt(function() {
      return function(a) {
        return a();
      };
    });
  };

  getLambdaVar = function getLambdaVar(lam) {
    return lam(function() {
      return function(v) {
        return function(b) {
          return v();
        };
      };
    });
  };

  getLambdaBody = function getLambdaBody(lam) {
    return lam(function() {
      return function(v) {
        return function(b) {
          return b();
        };
      };
    });
  };

  getApplyFunc = function getApplyFunc(apl) {
    return apl(function() {
      return function(a) {
        return function(b) {
          return a();
        };
      };
    });
  };

  getApplyArg = function getApplyArg(apl) {
    return apl(function() {
      return function(a) {
        return function(b) {
          return b();
        };
      };
    });
  };

  listToAst = function listToAst(list) {
    return primListToAst(list, Nil);
  };

  primListToAst = function primListToAst(list, vars) {
    if (list === Nil) {
      return [null, "Expecting expression, but input is empty"];
    } else if (!(list instanceof Leisure_lexCons)) {
      return tokenToAst(list, vars);
    } else if (isLambdaToken(list.head())) {
      return checkLambda(list.tail(), vars);
    } else {
      return ifParsed(primListToAst(list.head(), vars), function(f) {
        return listToApply(f, list.start(), list.tail(), vars);
      });
    }
  };

  isLambdaToken = function isLambdaToken(tok) {
    var _ref;
    return (tok instanceof Leisure_token) && ((_ref = tok.tok()) === '\\' || _ref === '\u03BB');
  };

  checkLambda = function checkLambda(list, vars) {
    if (list.head() instanceof Leisure_token && list.head().tok() !== '.') {
      return listToLambda(list, vars);
    } else {
      return [null, "Bad lambda construct, expected names, followed by a dot", list];
    }
  };

  badLambdaCont = function badLambdaCont(tok) {
    return !(tok instanceof Leisure_token) || isLambdaToken(tok);
  };

  listToLambda = function listToLambda(list, vars) {
    var bodyRes, head, v;
    if (list === Nil) {
      return [null, "Bad lambda construct -- no variable or body"];
    } else if (list.tail() === Nil) {
      return [null, "Bad lambda construct -- no body"];
    } else {
      head = list.head();
      if (badLambdaCont(head) || badLambdaCont(list.tail().head())) {
        return [null, "Bad lambda construct", head];
      } else {
        v = cons(head.tok(), vars);
        bodyRes = list.tail().head().tok() === '.' ? primListToAst(list.tail().tail(), v) : listToLambda(list.tail(), v);
        return ifParsed(bodyRes, function(body) {
          return [tag(lambda(head.tok(), body), list.start(), list.end())];
        });
      }
    }
  };

  tokenToAst = function tokenToAst(tok, vars) {
    var l, t;
    try {
      l = JSON.parse(tok.tok());
      t = typeof l;
      return [
        tag((vars.find(function(n) {
          return n === l || n === tok.tok();
        }) ? ref(tok.tok()) : t === 'string' || t === 'number' ? lit(l) : ref(tok.tok())), tok.start(), tok.end())
      ];
    } catch (err) {
      return [tag(ref(tok.tok()), tok.start(), tok.end())];
    }
  };

  listToApply = function listToApply(f, start, rest, vars) {
    if (rest === Nil) {
      return [f];
    } else if (isLambdaToken(rest.head())) {
      return ifParsed(listToAst(rest), function(a) {
        return [tag(apply(f, a), start, Math.max(f.leisureEnd, rest.end()))];
      });
    } else {
      return ifParsed(listToAst(rest.head()), function(a) {
        return listToApply(tag(apply(f, a), Math.min(start, f.leisureStart, rest.head().start()), Math.max(f.leisureEnd, rest.head().end())), start, rest.tail());
      });
    }
  };

  parseOptional = function parseOptional(string, macros) {
    var err, res, rest, tok, _ref, _ref2;
    _ref = defaultScanner.scan(string), res = _ref[0], err = _ref[1], rest = _ref[2];
    if (err) {
      return [null, err, rest];
    } else {
      _ref2 = listToAst((macros ? substituteMacros(res) : res)), res = _ref2[0], err = _ref2[1], tok = _ref2[2];
      if (res) {
        return [res, null, rest];
      } else {
        return [null, err, (tok ? string.substring(tok.start()) : rest)];
      }
    }
  };

  right = function right(value) {
    return function(a) {
      return function(b) {
        return a()(function() {
          return value;
        });
      };
    };
  };

  left = function left(value) {
    return function(a) {
      return function(b) {
        return b()(function() {
          return value;
        });
      };
    };
  };

  define('scan', (function() {
    return function(string) {
      var err, res, rest, _ref;
      _ref = defaultScanner.scan(string()), res = _ref[0], err = _ref[1], rest = _ref[2];
      if (err) {
        return _left()(function() {
          return "Error at: " + (JSON.stringify(snip(rest))) + "..., " + err;
        });
      } else {
        return _right()(function() {
          return res;
        });
      }
    };
  }), 1);

  define('macro', (function() {
    return function(list) {
      return substituteMacros(list());
    };
  }), 1);

  parse = function parse(string) {
    return parseOptional(string, false);
  };

  parseFull = function parseFull(string) {
    return parseOptional(string, true);
  };

  /*
  tests
  
  TODO
  
  * get working with current ASTs
  * rewrite listToAst in Leisure?
  * write precedence parser in Leisure
  */

  print = function print(f) {
    if (!(f != null)) {
      return "UNDEFINED";
    } else if (f === null) {
      return 'NULL';
    } else {
      switch (getType(f)) {
        case 'lit':
        case 'ref':
        case 'lambda':
        case 'apply':
          return "AST(" + (subprint(f)) + ")";
        default:
          return subprint(f);
      }
    }
  };

  subprint = function subprint(f) {
    var _ref;
    if (!(f != null)) {
      return "UNDEFINED";
    } else if (f === null) {
      return 'NULL';
    } else if (f === _true()) {
      return 'true';
    } else if (f === _false()) {
      return 'false';
    } else {
      switch (getType(f)) {
        case 'lexCons':
          return "LexCons(" + (f.start()) + ", " + (f.end()) + ")[" + (elementsLoop(f)) + "]";
        case 'cons':
          return "[" + (elementsLoop(f)) + "]";
        case 'nil':
          return "[]";
        case 'token':
          return "" + f;
        case 'ioMonad':
          return "IO";
        case 'lit':
          return f(function() {
            return function(v) {
              return JSON.stringify(v());
            };
          });
        case 'ref':
          return f(function() {
            return function(v) {
              return v();
            };
          });
        case 'lambda':
          return f(function() {
            return function(v) {
              return function(bod) {
                return "\u03BB" + (printLambda(v(), bod()));
              };
            };
          });
        case 'apply':
          return f(function() {
            return function(func) {
              return function(arg) {
                return printApply(func(), arg());
              };
            };
          });
        case 'some':
          return f(function() {
            return function(v) {
              return "Some(" + (print(v())) + ")";
            };
          })(null);
        case 'some2':
          return f(function() {
            return function(a) {
              return function(b) {
                return "Some2(" + (print(a())) + ", " + (print(b())) + ")";
              };
            };
          })(null);
        case 'left':
          return f(function() {
            return function(l) {
              return "Left(" + (print(l())) + ")";
            };
          })(null);
        case 'right':
          return f(null)(function() {
            return function(r) {
              return "Right(" + (print(r())) + ")";
            };
          });
        case 'html':
          return f(function() {
            return function(txt) {
              return "HTML(" + (txt()) + ")";
            };
          });
        case 'svgNode':
          return f(function() {
            return function(txt) {
              return "SVG NODE(" + (txt()) + ")";
            };
          });
        default:
          if (f instanceof Error) {
            return f.stack;
          } else {
            return (_ref = f.leisureName) != null ? _ref : (inspect != null ? inspect : function(v) {
              return "" + v;
            })(f);
          }
      }
    }
  };

  printLambda = function printLambda(v, body) {
    if (body.type === 'lambda') {
      return body(function() {
        return function(v2) {
          return function(b) {
            return "" + v + " " + (printLambda(v2(), b()));
          };
        };
      });
    } else {
      return "" + v + " . " + (subprint(body));
    }
  };

  printApply = function printApply(func, arg) {
    var a, f;
    f = func.type === 'lambda' ? "(" + (subprint(func)) + ")" : subprint(func);
    a = arg.type === 'apply' ? "(" + (subprint(arg)) + ")" : subprint(arg);
    return "" + f + " " + a;
  };

  elements = function elements(l, first, nosubs) {
    if (l === Nil) {
      return '';
    } else if (!(l instanceof Leisure_cons)) {
      return " | " + (print(l));
    } else {
      return "" + (first ? '' : ' ') + (print(l.head()) + elements(l.tail(), false));
    }
  };

  elementsTail = function elementsTail(l, first, acc) {
    if (l === Nil) {
      return acc;
    } else if (!(l instanceof Leisure_cons)) {
      return "" + acc + " | " + (print(l));
    } else {
      return elementsTail(l.tail(), false, "" + acc + (first ? '' : ' ') + (print(l.head())));
    }
  };

  elementsLoop = function elementsLoop(l, nosubs) {
    var first, result;
    result = '';
    first = true;
    while (l !== Nil) {
      if (!(l instanceof Leisure_cons)) {
        result += " | " + (print(l));
        break;
      }
      if (first) {
        first = false;
      } else {
        result += ' ';
      }
      result += print(l.head());
      l = l.tail();
    }
    return result;
  };

  root.evalFunc = evalFunc;

  root.nameSub = nameSub;

  root.setDataType = setDataType;

  root.setType = setType;

  root.mkProto = mkProto;

  root.Nil = Nil;

  root.cons = cons;

  root.primCons = primCons;

  root.dlempty = dlempty;

  root.dlnew = dlnew;

  root.dlappend = dlappend;

  root.lexCons = lexCons;

  root.lexDlempty = lexDlempty;

  root.lexDlnew = lexDlnew;

  root.lexDlappend = lexDlappend;

  root.define = define;

  root.defineMacro = defineMacro;

  root.defGroup = defGroup;

  root.defToken = defToken;

  root.parse = parse;

  root.parseFull = parseFull;

  root.listToAst = listToAst;

  root.getType = getType;

  root.lit = lit;

  root.ref = ref;

  root.lambda = lambda;

  root.apply = apply;

  root.getAstType = getAstType;

  root.getRefVar = getRefVar;

  root.getLitVal = getLitVal;

  root.getLambdaBody = getLambdaBody;

  root.getLambdaVar = getLambdaVar;

  root.getApplyFunc = getApplyFunc;

  root.getApplyArg = getApplyArg;

  root.print = print;

  root.ifParsed = ifParsed;

  root.snip = snip;

  root.throwError = throwError;

  root.foldLeft = foldLeft;

  root.Scanner = Scanner;

  root.Leisure_token = Leisure_token;

  root.Leisure_lexCons = Leisure_lexCons;

  root.ensureLeisureClass = ensureLeisureClass;

  root.LeisureObject = LeisureObject;

  root.defaultScanner = defaultScanner;

}).call(this);
;

/*
Copyright (C) 2012, Bill Burdick, Tiny Concepts: http://tinyconcepts.com/fs.pl/lambda.fsl

(licensed with ZLIB license)

This software is provided 'as-is', without any express or implied
warranty. In no event will the authors be held liable for any damages
arising from the use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

1. The origin of this software must not be misrepresented; you must not
claim that you wrote the original software. If you use this software
in a product, an acknowledgment in the product documentation would be
appreciated but is not required.

2. Altered source versions must be plainly marked as such, and must not be
misrepresented as being the original software.

3. This notice may not be removed or altered from any source distribution.
*/

(function() {
  var Code, LeisureObject, Leisure_token, Nil, Parse, Scanner, Storage, allowRedefs, allowRedefsIn, astAtOffset, astBrackets, baseTokenPat, basicPaddedDecl, between, bracket, bracketApplyParts, brackets, bracketsForApply, checkClass, collectArgs, compileNext, cons, contexts, createMethod, ctx, declScanner, defFunc, define, defineForward, defineToken, dgen, displayTypeConstraintsFor, dlappend, dlempty, dlnew, escapeRegexpChars, evalCompiledAst, evalFunc, evalNext, findFuncApply, findFuncs, firstConstrainedArgumentType, foldLeft, forward, freeVar, funcAst, funcAstAtOffset, funcContext, funcContextSource, gen, genCode, genDispatchDefault, genDispatchFunc, generateDispatch, getApplyArg, getApplyFunc, getAstType, getLambdaBody, getLambdaVar, getLitVal, getNargs, getNthBody, getRefVar, ifParsed, indent, isAssertion, isEmpty, laz, lexCons, lexDlappend, lexDlempty, lexDlnew, linePat, listToAst, makeDispatchFunction, markLeisureErrors, mkProto, nameAst, nameSub, noDefaultError, numberAst, pad, padDecl, parse, parseDecl, parseFull, prefix, primFoldLeft, processDefs, receiverAndArgs, receiverFor, req, root, setDataType, setEvalFunc, setNumber, setType, snip, tokenPat, within, wrap;

  if ((typeof window !== "undefined" && window !== null) && (!(typeof global !== "undefined" && global !== null) || global === window)) {
    window.global = window;
    window.Leisure = root = {};
    Parse = window.Parse;
    Storage = window.Storage;
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    Parse = require('./parse');
    Storage = require('./storage');
  }

  LeisureObject = Parse.LeisureObject, nameSub = Parse.nameSub, setDataType = Parse.setDataType, setType = Parse.setType, mkProto = Parse.mkProto, cons = Parse.cons, dlempty = Parse.dlempty, dlnew = Parse.dlnew, dlappend = Parse.dlappend, lexCons = Parse.lexCons, lexDlempty = Parse.lexDlempty, lexDlnew = Parse.lexDlnew, lexDlappend = Parse.lexDlappend, define = Parse.define, listToAst = Parse.listToAst, evalFunc = Parse.evalFunc, Nil = Parse.Nil, cons = Parse.cons, getAstType = Parse.getAstType, getRefVar = Parse.getRefVar, getLitVal = Parse.getLitVal, getLambdaBody = Parse.getLambdaBody, getLambdaVar = Parse.getLambdaVar, getApplyFunc = Parse.getApplyFunc, getApplyArg = Parse.getApplyArg, ifParsed = Parse.ifParsed, snip = Parse.snip, Scanner = Parse.Scanner, Leisure_token = Parse.Leisure_token;

  declScanner = new Scanner();

  declScanner.defToken('::');

  allowRedefs = false;

  allowRedefsIn = function allowRedefsIn(block) {
    var old;
    old = allowRedefs;
    allowRedefs = true;
    try {
      return block();
    } finally {
      allowRedefs = old;
    }
  };

  escapeRegexpChars = function escapeRegexpChars(str) {
    return str.replace(/([\][().\\*+?{}|])/g, '\\$1');
  };

  forward = {};

  baseTokenPat = /[().\\]| +|[0-9]+\.[0-9]+|`(\\[\\`]|[^`\n])*`|'(\\[\\']|[^'\n])*'|"(\\[\\"]|[^"\n])*"|#[^\n]*(\n|$)/;

  tokenPat = new RegExp("\\n *|" + baseTokenPat.source);

  linePat = /^((?:\s*\n|#[^\n]*\n)*)([^=\n]*)(=[.)M]=|=\([^=]+=|=)?/;

  ctx = global;

  global.leisureGetFuncs = function leisureGetFuncs() {
    return global.leisureFuncNames;
  };

  global.noredefs = true;

  global.leisureContext = Nil;

  funcAstAtOffset = function funcAstAtOffset(func, nodeOffset) {
    var ast;
    ast = funcAst(func);
    if (ast) {
      return astAtOffset(ast, nodeOffset);
    } else {
      return null;
    }
  };

  funcAst = function funcAst(func) {
    var _ref;
    if (func.src) {
      return (_ref = func.ast) != null ? _ref : (func.ast = parseFull(func.src)[0]);
    } else {
      return null;
    }
  };

  astAtOffset = function astAtOffset(ast, offset) {
    if (ast.leisureNodeNumber === offset) {
      return ast;
    } else {
      switch (getAstType(ast)) {
        case 'lambda':
          return astAtOffset(getLambdaBody(ast), offset);
        case 'apply':
          if (ast.leisureNodeNumber > offset) {
            return astAtOffset(getApplyFunc(ast), offset);
          } else {
            return astAtOffset(getApplyArg(ast), offset);
          }
      }
    }
  };

  funcContextSource = function funcContextSource(funcName, offset) {
    var ast, end, func, start;
    func = global[nameSub(funcName)]();
    ast = Leisure.funcAstAtOffset(func, offset);
    start = ast.leisureStart;
    end = ast.leisureEnd;
    return [func.src, start, end, func, ast];
  };

  contexts = {};

  funcContext = function funcContext(funcName, offset) {
    var cur;
    cur = contexts[funcName];
    if (!(cur != null)) cur = contexts[funcName] = [];
    if (!cur[offset]) cur[offset] = [funcName, offset];
    return cur[offset];
  };

  nameAst = function nameAst(nm, ast) {
    if (!ast.leisureName) {
      ast.leisureName = nm;
      return ast.toString = function toString() {
        return "{" + nm + "}";
      };
    }
  };

  evalCompiledAst = function evalCompiledAst(ast) {
    if (ast.lits.length) {
      return evalFunc("(function(__lits){\nreturn " + ast.src + "})")(ast.lits);
    } else {
      return Parse.evalFunc(ast.src);
    }
  };

  define('eval', function() {
    return function(ast) {
      return evalCompiledAst(dgen(ast()));
    };
  });

  between = function between(start, end, pos) {
    return start <= pos && pos <= end;
  };

  within = function within(ast, pos) {
    return between(ast.leisureStart, ast.leisureEnd, pos);
  };

  brackets = function brackets(start, end) {
    return cons(start, cons(end, Nil));
  };

  astBrackets = function astBrackets(ast) {
    return brackets(ast.leisureStart, ast.leisureEnd);
  };

  bracket = function bracket(ast, pos) {
    if ((ast != null) && within(ast, pos)) {
      switch (getAstType(ast)) {
        case 'ref':
        case 'lit':
          if (within(ast, pos)) {
            return cons(astBrackets(ast), Nil);
          } else {
            return Nil;
          }
          break;
        case 'lambda':
          if (between(ast.leisureStart, ast.leisureNameEnd, pos)) {
            return cons(brackets(ast.leisureStart, ast.leisureNameEnd), Nil);
          } else {
            return bracket(getLambdaBody(ast, pos));
          }
          break;
        case 'apply':
          return bracketsForApply(ast, ast, pos);
      }
    } else {
      return Nil;
    }
  };

  bracketsForApply = function bracketsForApply(apply, part, pos) {
    var arg, func, _ref;
    arg = getApplyArg(part);
    if (within(arg, pos)) {
      if (arg.type === 'apply') {
        return bracketsForApply(arg, arg, pos);
      } else if (arg.type === 'lambda') {
        return bracket(arg, pos);
      } else {
        return (bracketApplyParts(apply))(Nil);
      }
    } else {
      func = getApplyFunc(part);
      if (func.type === 'apply') {
        return bracketsForApply(apply, getApplyFunc(part), pos);
      } else if ((_ref = func.type) === 'ref' || _ref === 'lit') {
        return (bracketApplyParts(apply))(Nil);
      } else {
        return bracket(func, pos);
      }
    }
  };

  bracketApplyParts = function bracketApplyParts(ast) {
    var astFunc, start;
    astFunc = getApplyFunc(ast);
    start = (function() {
      switch (getAstType(astFunc)) {
        case 'ref':
        case 'lit':
        case 'lambda':
          return dlnew(astBrackets(astFunc));
        case 'apply':
          return bracketApplyParts(astFunc);
      }
    })();
    return dlappend(start, dlnew(astBrackets(getApplyArg(ast))));
  };

  findFuncs = function findFuncs(ast) {
    if (!ast || (getAstType(ast)) !== 'apply') {
      return dlempty;
    } else {
      return findFuncApply(ast, 0);
    }
  };

  findFuncApply = function findFuncApply(apply, count) {
    if ((getAstType(apply)) === 'apply') {
      return dlappend(findFuncApply(getApplyFunc(apply), count + 1), findFuncs(getApplyArg(apply)));
    } else if ((getAstType(apply)) === 'ref') {
      return dlnew(cons(apply, cons(count, Nil)));
    } else {
      return dlempty;
    }
  };

  indent = function indent(str, amt) {
    var i, idt;
    amt = amt != null ? amt : 2;
    idt = '\n';
    for (i = 0; 0 <= amt ? i <= amt : i >= amt; 0 <= amt ? i++ : i--) {
      idt += ' ';
    }
    return str.replace(/\n/g, idt);
  };

  /*
  wrapContextVars = (name, ast, code, top)->"""
  (function(){
    var ctx = Leisure.contextStack
    #{indent code}
  })()
    """
  
  wrapContext = (name, ast, code, top)->
    if name? then wrapContextVars name, ast, wrapContextBody(name, ast, code, top), top
    else code
  
  wrapLazyContext = (name, ast, code, top)->
    if name? then wrapContextVars name, ast, "return function(){#{indent wrapContextBody(name, ast, code, top)}};", top
    else "(function(){return #{code}})"
  
  wrapContextBody = (name, ast, code, top)->"""
    #{if top then '' else "var oldCtx = ctx;\n  "}
    var ctx = Leisure.contextStack;
    Leisure.contextStack = Parse.cons(Leisure.funcContext('#{name}', #{ast.leisureNodeNumber}), #{if top then 'ctx' else 'oldCtx'})
    try {
      return #{indent code};
    } catch (err) {
      if (!err.leisureContext) {
        err.leisureContext = Leisure.contextStack;
      }
      throw err;
    } finally {
      Leisure.contextStack = ctx
    }
    """
  */

  Code = (function() {

    function Code(main, vars, err, global, debug, method, unmemoized) {
      var _ref, _ref2, _ref3, _ref4;
      this.main = main;
      this.vars = vars;
      this.err = err;
      this.global = global;
      this.debug = debug;
      this.method = method;
      this.unmemoized = unmemoized;
      this.main = (_ref = this.main) != null ? _ref : '';
      this.vars = (_ref2 = this.vars) != null ? _ref2 : Nil;
      this.err = (_ref3 = this.err) != null ? _ref3 : '';
      this.global = (_ref4 = this.global) != null ? _ref4 : Nil;
    }

    Code.prototype.copyWith = function copyWith(main, vars, err, global, debug, method, unmemoized) {
      return new Code(main != null ? main : this.main, vars != null ? vars : this.vars, err != null ? err : this.err, global != null ? global : this.global, debug != null ? debug : this.debug, method != null ? method : this.method, unmemoized != null ? unmemoized : (!main ? this.unmemoized : null));
    };

    Code.prototype.setVars = function setVars(v) {
      return this.copyWith(null, v);
    };

    Code.prototype.addVar = function addVar(v) {
      return this.copyWith(null, cons(v, this.vars));
    };

    Code.prototype.addErr = function addErr(e) {
      return this.copyWith(null, null, "" + this.err + e + "\n");
    };

    Code.prototype.setGlobal = function setGlobal(v) {
      return this.copyWith(null, null, null, v);
    };

    Code.prototype.setDebug = function setDebug(d) {
      return this.copyWith(null, null, null, null, d);
    };

    Code.prototype.setMethod = function setMethod(meth) {
      return this.copyWith(null, null, null, null, null, meth);
    };

    Code.prototype.setUnmemoized = function setUnmemoized(u) {
      return this.copyWith(null, null, null, null, null, null, u);
    };

    Code.prototype.unmemoize = function unmemoize() {
      return this.copyWith(this.unmemoized, null, null, null, null, null, '');
    };

    Code.prototype.reffedValue = function reffedValue(deref) {
      var tmp;
      if (!deref) {
        return this;
      } else {
        tmp = this;
        return tmp.copyWith("" + tmp.main + "()");
      }
    };

    Code.prototype.unreffedValue = function unreffedValue(deref, name, ast, top) {
      if (deref) {
        return this;
      } else {
        return this.lazy(name, ast, top);
      }
    };

    Code.prototype.memoize = function memoize(deref, name, ast, top) {
      var tmp;
      if (deref) {
        return this;
      } else {
        tmp = this.catchErrorsWithDebugContext(name, ast);
        tmp = tmp.copyWith("$m || ($m = " + tmp.main + ")").lazy(name, ast, top);
        return tmp.copyWith("function(" + (tmp.debug ? '$ctx' : '') + "){var $m; return " + tmp.main + "}").captureDebugContext(name).setUnmemoized(tmp.main);
      }
    };

    Code.prototype.captureDebugContext = function captureDebugContext(name) {
      if (this.debug) {
        return this.copyWith("(" + this.main + ")(leisureContext)");
      } else {
        return this.copyWith("(" + this.main + ")()");
      }
    };

    Code.prototype.catchErrorsWithDebugContext = function catchErrorsWithDebugContext(name, ast) {
      if (this.debug) {
        return this.copyWith("markLeisureErrors('" + name + "', $ctx, (function(){return " + this.main + "}))");
      } else {
        return this.copyWith("(" + this.main + ")");
      }
    };

    Code.prototype.lazy = function lazy(name, ast, top) {
      return this.copyWith("(function(){return " + this.main + "})");
    };

    Code.prototype.genTopLevelDebug = function genTopLevelDebug(name, ast) {
      var tmp;
      if (this.debug && name) {
        tmp = this.catchErrorsWithDebugContext(name, ast);
        return tmp.copyWith("function($ctx){" + tmp.main + "}").captureDebugContext(name);
      } else {
        return this;
      }
    };

    return Code;

  })();

  markLeisureErrors = function markLeisureErrors(name, ctx, func) {
    try {
      console.log("USING CONTEXT: " + name);
      global.leisureContext = cons([name, 0], ctx);
      return func();
    } catch (err) {
      err.leisureContext = global.leisureContext;
      throw err;
    } finally {
      global.leisureContext = global.leisureContext.tail();
    }
  };

  dgen = function dgen(ast, lazy, name, globals, tokenDef, namespace, src, debug) {
    var argNames, code, jsCode, methodCode, n, res, type, _ref;
    ast.lits = [];
    res = [];
    code = gen(ast, ast.leisurePrefixCount, ast, new Code().setDebug(debug).setGlobal(cons(name, globals != null ? globals : global.leisureFuncNames)), ast.lits, Nil, true, name, namespace, true, false);
    code = code.genTopLevelDebug(name, ast);
    if (code.err !== '') {
      ast.err = code.err;
    } else {
      jsCode = "(" + code.main + ")";
      if (name) {
        n = nameSub(name);
        jsCode = (getAstType(ast)) === 'lambda' ? "(function() {var f; return function " + n + "(){return f || (f = " + jsCode + ");}})()" : "(function " + n + "() {return (" + jsCode + ");})";
      }
      ast.src = name != null ? "" + (code.method != null ? ((_ref = code.method, type = _ref[0], name = _ref[1], argNames = _ref[2], methodCode = _ref[3], _ref), "" + (checkClass(name, n, ast)) + ";\nLeisure.createMethod('" + type + "', '" + name + "', " + (src ? JSON.stringify(src) : "''") + ", function(" + (argNames.slice(1).map(function(n) {
        return nameSub(n);
      }).join(", ")) + ") {return " + methodCode + ";})") : "" + (namespace != null ? namespace : '') + (defFunc(tokenDef)) + "('" + name + "', " + jsCode + ", " + (ast.leisurePrefixCount || 0) + ", " + (src ? JSON.stringify(src) : '""') + ");") : jsCode;
    }
    ast.globals = code.global;
    return ast;
  };

  defFunc = function defFunc(tok) {
    switch (tok) {
      case '=M=':
        return 'defineMacro';
      case '=P=':
        return 'definePattern';
      default:
        return 'define';
    }
  };

  checkClass = function checkClass(funcName, func, ast, src) {
    var args, receiver, _ref;
    _ref = receiverAndArgs(ast), receiver = _ref[0], args = _ref[1];
    return "Leisure.makeDispatchFunction('" + funcName + "', '" + func + "', '" + receiver + "', ['" + (ast.leisureArgNames.map(function(n) {
      return nameSub(n);
    }).join("', '")) + "'])";
  };

  receiverAndArgs = function receiverAndArgs(ast) {
    var args, receiver;
    receiver = nameSub(receiverFor(ast, 0));
    args = ast.leisureArgNames;
    return [
      receiver, args.slice(1, args.length).map(function(n) {
        return nameSub(n);
      }).filter(function(n) {
        return n !== receiver;
      })
    ];
  };

  receiverFor = function receiverFor(ast, index) {
    if (index < ast.leisureArgNames.length) {
      if (ast.leisureTypeAssertions[ast.leisureArgNames[index]]) {
        return ast.leisureArgNames[index];
      } else {
        return receiverFor(ast, index + 1);
      }
    } else {
      return null;
    }
  };

  makeDispatchFunction = function makeDispatchFunction(funcName, methodName, receiverName, argNames) {
    var disp, dispSrc;
    dispSrc = "(function(){return " + (genDispatchFunc(methodName, receiverName, 0, argNames.slice(1, argNames.length))) + ";})";
    disp = eval(dispSrc);
    if (!(LeisureObject.prototype[methodName] != null)) {
      LeisureObject.prototype[methodName] = global[methodName] != null ? genDispatchDefault(funcName, methodName, global[methodName], argNames) : true;
    }
    define(funcName, disp, argNames.length, null, true);
    return disp;
  };

  genDispatchFunc = function genDispatchFunc(methodName, receiverName, index, args) {
    var joined;
    if (index < args.length) {
      return "function(" + args[index] + ") {return " + (genDispatchFunc(methodName, receiverName, index + 1, args)) + ";}";
    } else {
      joined = args.join(', ');
      return "(" + receiverName + "() instanceof LeisureObject ? " + receiverName + "() : LeisureObject.prototype)." + methodName + "(" + joined + ")";
    }
  };

  genDispatchDefault = function genDispatchDefault(lsrName, name, func, args) {
    var ast, code, originalAst, v;
    originalAst = funcAst(func);
    v = getNargs(originalAst, args.length);
    ast = getNthBody(originalAst, args.length);
    code = gen(ast, 0, ast, new Code().setGlobal(cons(lsrName, global.leisureFuncNames)), originalAst.lits, v, true, '', "Parse.", true, true);
    if (code.err) throw new Error(code.err);
    code = code.main;
    code = "(function (" + ((collectArgs(originalAst, args.length - 1)).join(', ')) + "){return (" + code + ")})";
    return eval(code);
  };

  collectArgs = function collectArgs(ast, n) {
    var args, i;
    args = [];
    for (i = 0; 0 <= n ? i < n : i > n; 0 <= n ? i++ : i--) {
      args.push(Parse.nameSub(Parse.getLambdaVar(ast)));
      ast = Parse.getLambdaBody(ast);
    }
    return args;
  };

  getNargs = function getNargs(ast, n) {
    if (n === 0) {
      return Nil;
    } else {
      return cons(Parse.getLambdaVar(ast), getNargs(Parse.getLambdaBody(ast), n - 1));
    }
  };

  noDefaultError = function noDefaultError(methodName) {
    throw new Error("No default function " + methodName);
  };

  createMethod = function createMethod(leisureClass, methodName, src, definition) {
    var fun, meth;
    fun = Parse.ensureLeisureClass(leisureClass);
    meth = nameSub(methodName);
    if (!allowRedefs && fun.prototype.hasOwnProperty(meth)) {
      throw new Error("Attempt to redefine existing method: " + leisureClass + "." + methodName + ", current definition: " + (fun.prototype[meth]()) + ", class: " + fun);
    }
    fun.prototype[meth] = definition;
    return definition.src = src;
  };

  wrap = function wrap(name, ast, v, body, namespace, debug) {
    var _ref;
    body = "function(" + v + "){return " + body + ";}";
    if (!(ast.exprType != null) && !ast.exprDataType) {
      return body;
    } else {
      return "" + (namespace != null ? namespace : '') + (ast.exprType ? 'setType' : 'setDataType') + "(" + body + ", '" + ((_ref = ast.exprType) != null ? _ref : ast.exprDataType) + "')";
    }
  };

  gen = function gen(originalAst, prefixCount, ast, code, lits, vars, deref, name, namespace, top, ignoreUnknownNames) {
    var aplCode, arg, argCode, bodyCode, func, funcCode, src, v, val;
    switch (getAstType(ast)) {
      case 'ref':
        val = getRefVar(ast);
        if (val.lambda) {
          return code.addErr("attempt to use lambda as a variable");
        } else {
          code = code.copyWith(nameSub(val)).reffedValue(deref);
          if (ignoreUnknownNames || vars.find(function(v) {
            return v === val;
          })) {
            return code.addVar(val);
          } else if ((ctx[nameSub(val)] != null) || code.global.find(function(v) {
            return v === val;
          }) || (forward[nameSub(val)] != null)) {
            return code;
          } else if (typeof val === 'number') {
            return code.copyWith(val).unreffedValue(deref, name, ast, top);
          } else {
            return code.addErr("attempt to use free variable: " + val + " in " + (Parse.print(originalAst)));
          }
        }
        break;
      case 'lit':
        val = getLitVal(ast);
        src = typeof val === 'function' || typeof val === 'object' ? (lits.push(val), "(function(){\nreturn __lits[" + (lits.length - 1) + "]\n})") : JSON.stringify(val);
        return code.copyWith(src).unreffedValue(deref, name, ast, top);
      case 'lambda':
        v = getLambdaVar(ast);
        bodyCode = gen(originalAst, prefixCount - 1, getLambdaBody(ast), code, lits, cons(v, vars), true, name, namespace, false, ignoreUnknownNames);
        bodyCode = (originalAst.leisureTypeAssertions != null) && (prefixCount === 1) ? generateDispatch(name, originalAst, bodyCode) : bodyCode;
        bodyCode = bodyCode.setVars(bodyCode.vars.removeAll(function(bv) {
          return bv === v;
        }));
        bodyCode = bodyCode.copyWith(wrap(name, ast, nameSub(v), bodyCode.main, namespace)).memoize(deref, name, ast, top);
        return bodyCode;
      case 'apply':
        func = getApplyFunc(ast);
        if (getAstType(func) === 'lit') {
          return code.addErr("Attempt to use lit as function: " + (getLitVal(func)));
        } else if (!ignoreUnknownNames && freeVar(func, vars, code.global)) {
          return code.addErr("Attempt to use free variable as function: " + (getRefVar(func)) + ", globals: " + (global.leisureFuncNames.toArray().sort()));
        } else {
          arg = getApplyArg(ast);
          funcCode = gen(originalAst, prefixCount, func, code, lits, vars, true, name, namespace, false, ignoreUnknownNames);
          argCode = gen(originalAst, prefixCount, arg, funcCode, lits, vars, false, name, namespace, false, ignoreUnknownNames);
          aplCode = "" + funcCode.main + "(" + argCode.main + ")";
          return argCode.copyWith(aplCode).memoize(deref, name, ast, top);
        }
        break;
      default:
        return code.addErr("Unknown object type in gen: " + ast);
    }
  };

  generateDispatch = function generateDispatch(name, ast, code) {
    var type;
    type = firstConstrainedArgumentType(ast);
    code = code.setMethod([type, name, ast.leisureArgNames, code.main]);
    return code;
  };

  displayTypeConstraintsFor = function displayTypeConstraintsFor(name, ast) {
    return "method " + (firstConstrainedArgumentType(ast)) + "." + name + "(" + (ast.leisureArgNames.join(', ')) + ")";
  };

  firstConstrainedArgumentType = function firstConstrainedArgumentType(ast) {
    var arg, i, type, _ref;
    for (i = 0, _ref = ast.leisureArgNames.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
      arg = ast.leisureArgNames[i];
      type = ast.leisureTypeAssertions[arg];
      if (type != null) return type[1];
    }
    return 'null';
  };

  freeVar = function freeVar(ast, vars, globals) {
    var rv;
    if ((getAstType(ast)) === 'ref') {
      rv = getRefVar(ast);
      return !ctx[nameSub(rv)] && !vars.find(function(v) {
        return v === rv;
      }) && !globals.find(function(v) {
        return v === rv;
      }) && !forward[nameSub(rv)] && !global.leisureFuncNames.find(function(v) {
        return v === rv;
      });
    } else {
      return false;
    }
  };

  laz = function laz(val) {
    return function() {
      return val;
    };
  };

  defineToken = function defineToken(name, def) {
    if (def !== '=M=') {
      if (def[1] === '(') {
        return Parse.defGroup(name, def.substring(2, def.length - 1));
      } else if (def[1] !== ')') {
        return Parse.defToken(name);
      }
    }
  };

  prefix = function prefix(name, str, fullDecl, line) {
    return (name.length > 1 ? padDecl(fullDecl, line) : '') + str;
  };

  padDecl = function padDecl(decl, line) {
    var leading, p, res, rest, x, _ref;
    p = basicPaddedDecl(0, decl.tail());
    _ref = p.match(/^( *)([^ ].*$)/), x = _ref[0], leading = _ref[1], rest = _ref[2];
    res = "" + leading.slice(1) + "\\" + rest + " .";
    return res;
  };

  basicPaddedDecl = function basicPaddedDecl(offset, decl) {
    if (decl === Nil) {
      return '';
    } else if (decl.head().tok() === '::') {
      return pad(decl.tail().head().end() - offset) + basicPaddedDecl(decl.tail().head().end(), decl.tail().tail());
    } else {
      return pad(decl.head().start() - offset) + decl.head().tok() + basicPaddedDecl(decl.head().end(), decl.tail());
    }
  };

  pad = function pad(n) {
    var i, s;
    s = '';
    for (i = 0; 0 <= n ? i < n : i > n; 0 <= n ? i++ : i--) {
      s = s + ' ';
    }
    return s;
  };

  getNthBody = function getNthBody(ast, n) {
    if (n === 1) {
      return ast;
    } else {
      if (Parse.getType(ast) !== 'lambda') {
        throw new Error("Error: Expected lambda, but got " + (Parse.getType(ast)));
      }
      return getNthBody(getLambdaBody(ast), n - 1);
    }
  };

  defineForward = function defineForward(name) {
    return forward[nameSub(name())] = true;
  };

  compileNext = function compileNext(line, globals, parseOnly, check, nomacros, namespace, debug) {
    var def, defType, err, errPrefix, leading, matched, name, nm, pfx, rest1, scannedDecl, typeAssertions, _ref;
    if (line[0] === '=') {
      rest1 = line.substring(1);
      return ifParsed((nomacros ? parse(rest1) : parseFull(rest1)), (function(ast, rest) {
        ast.leisureCodeOffset = 0;
        return genCode(ast, null, globals, null, rest, parseOnly, namespace, rest1.substring(0, rest1.length - rest.length).trim(), debug);
      }), "Error compiling expr " + (snip(line)));
    } else if ((def = line.match(linePat)) && def[1].length !== line.length) {
      matched = def[0], leading = def[1], name = def[2], defType = def[3];
      if (!name || name[0] === ' ') {
        name = null;
        defType = null;
        nm = null;
      } else {
        _ref = defType ? parseDecl(name) : [], nm = _ref[0], typeAssertions = _ref[1], scannedDecl = _ref[2], err = _ref[3];
      }
      rest1 = line.substring((defType ? matched : leading).length);
      if (rest1[0] === '=') rest1 = rest1.substring(1);
      if (err) {
        return [null, err];
      } else if (nm) {
        if (!allowRedefs && check && globals.find(function(v) {
          return v === nm[0];
        })) {
          return [null, "Attempt to redefine function: " + nm[0] + " " + (snip(rest1)), null];
        } else {
          if (defType && defType !== '=') defineToken(nm[0], defType);
          pfx = prefix(nm, rest1, scannedDecl, matched.slice(leading.length));
          errPrefix = "Error while compiling " + nm + ": ";
          return ifParsed((nomacros ? parse(pfx) : parseFull(pfx)), (function(ast, rest) {
            var bod;
            ast.leisureCodeOffset = ast.leisureDefPrefix = line.length - pfx.length;
            ast.leisureBase = getNthBody(ast, nm.length);
            nameAst(nm[0], ast);
            bod = ast;
            if (nm.length > 1) bod = getNthBody(ast, nm.length);
            if (getAstType(bod) === 'lambda') {
              bod.exprType = nm[0];
              ast.exprDataType = nm[0];
            }
            if (nm.length === 1) nameAst(nm[0], ast);
            ast.leisurePrefixSrcLen = pfx.length;
            ast.leisurePrefixCount = nm.length - 1;
            ast.leisureSource = pfx.substring(0, pfx.length - rest.length).trim();
            if (!isEmpty(typeAssertions)) {
              ast.leisureTypeAssertions = typeAssertions;
              ast.leisureArgNames = nm;
            }
            return genCode(ast, nm[0], globals, defType, rest, parseOnly, namespace, ast.leisureSource, debug);
          }), errPrefix);
        }
      } else {
        return ifParsed((nomacros ? parse(rest1) : parseFull(rest1)), (function(ast, rest) {
          ast.leisureCodeOffset = line.length - rest1.length;
          ast.leisureBase = ast;
          ast.leisureSource = rest1.substring(0, rest1.length - rest.length).trim();
          return genCode(ast, null, globals, null, rest, parseOnly, namespace, ast.leisureSource, debug);
        }), "Error compiling expr:  " + (snip(line)));
      }
    } else {
      return [null, null, null];
    }
  };

  isEmpty = function isEmpty(obj) {
    var i;
    for (i in obj) {
      return false;
    }
    return true;
  };

  parseDecl = function parseDecl(name) {
    var all, assertions, err, names, rest, scanned, _ref;
    _ref = declScanner.scan(name), scanned = _ref[0], err = _ref[1], rest = _ref[2];
    all = scanned;
    if (err) {
      return [null, null, err];
    } else {
      names = [];
      assertions = {};
      while (scanned !== Nil) {
        if (isAssertion(scanned.head())) {
          return [null, null, null, "Badly type assertion in declaration: assertion must be on an argument name: " + name];
        }
        names.push(scanned.head().tok());
        if (scanned.tail() !== Nil && isAssertion(scanned.tail().head())) {
          if (scanned.tail().tail() === Nil) {
            return [null, null, "Badly type assertion in declaration -- no type: " + name];
          }
          assertions[scanned.head().tok()] = [scanned.tail().head().tok(), scanned.tail().tail().head().tok()];
          scanned = scanned.tail().tail().tail();
        } else {
          scanned = scanned.tail();
        }
      }
      return [names, assertions, all];
    }
  };

  isAssertion = function isAssertion(tok) {
    return tok instanceof Leisure_token && tok.tok() === '::';
  };

  genCode = function genCode(ast, name, globals, defType, rest, parseOnly, namespace, src, debug, auto) {
    if (!parseOnly) {
      dgen(ast, false, name, globals, defType, namespace, src, debug, auto);
    }
    if ((ast.err != null) && (name != null)) {
      ast.err = "Error while compiling " + name + ": " + ast.err;
    }
    return [ast, ast.err, rest];
  };

  evalNext = function evalNext(code, namespace, debug) {
    var ast, err, nm, rest, result, _ref;
    _ref = compileNext(code, null, null, null, null, namespace, debug), ast = _ref[0], err = _ref[1], rest = _ref[2];
    if (ast) {
      if (ast.leisureName) {
        try {
          nm = nameSub(ast.leisureName);
          if (ctx[nm]) evalFunc("" + nm + " = null");
          evalCompiledAst(ast);
          result = "Defined: " + ast.leisureName;
        } catch (err) {
          console.log(err.stack);
          result = err;
          ast.err = err;
        }
        return [ast, result];
      } else {
        try {
          result = evalCompiledAst(ast);
        } catch (err) {
          ast.err = err;
        }
        return [ast, result];
      }
    } else {
      return [
        {
          err: err
        }, err
      ];
    }
  };

  parse = function parse(str) {
    var ret;
    ret = Parse.parse(str);
    if (ret[0]) ret[0] = numberAst(ret[0], 0);
    return ret;
  };

  parseFull = function parseFull(str) {
    var ast, err, rest, _ref;
    _ref = Parse.parseFull(str), ast = _ref[0], err = _ref[1], rest = _ref[2];
    if (ast) ast = numberAst(ast, 0);
    return [ast, err, rest];
  };

  numberAst = function numberAst(ast, number) {
    switch (getAstType(ast)) {
      case 'ref':
      case 'lit':
        return setNumber(ast, number);
      case 'lambda':
        return setNumber(ast, (numberAst(getLambdaBody(ast), number)).leisureNodeNumber + 1);
      case 'apply':
        return setNumber(ast, (numberAst(getApplyArg(ast), (numberAst(getApplyFunc(ast), number)).leisureNodeNumber + 1)).leisureNodeNumber + 1);
    }
  };

  setNumber = function setNumber(ast, number) {
    ast.leisureNodeNumber = number;
    return ast;
  };

  setEvalFunc = function setEvalFunc(ct, func) {
    ctx = root.ctx = ct;
    return root.eval = evalFunc = Parse.evalFunc = func;
  };

  req = function req(name, gl) {
    return processDefs(require(name), gl);
  };

  processDefs = function processDefs(res, gl) {
    var i, v, _ref;
    if (res) {
      gl = gl != null ? gl : global;
      if (res.defs != null) {
        _ref = res.defs;
        for (i in _ref) {
          v = _ref[i];
          gl[i] = v;
        }
      }
      res.leisureFuncNames = ctx.leisureFuncNames;
      res.ctx = ctx;
    }
    return res;
  };

  foldLeft = function foldLeft(func, val, array) {
    return primFoldLeft(func, val, array, 0);
  };

  primFoldLeft = function primFoldLeft(func, val, array, index) {
    if (index < array.length) {
      return primFoldLeft(func, func(val, array[index]), array, index + 1);
    } else {
      return val;
    }
  };

  root.setEvalFunc = setEvalFunc;

  root.eval = evalFunc;

  root.gen = dgen;

  root.primGen = gen;

  root.laz = laz;

  root.compileNext = compileNext;

  root.evalNext = evalNext;

  root.astEval = function astEval(ast) {
    return evalCompiledAst(dgen(ast));
  };

  root.linePat = linePat;

  root.req = req;

  root.processDefs = processDefs;

  root.bracket = bracket;

  root.findFuncs = findFuncs;

  root.foldLeft = foldLeft;

  root.defineForward = defineForward;

  root.funcAstAtOffset = funcAstAtOffset;

  root.funcAst = funcAst;

  root.funcContext = funcContext;

  root.contextStack = Nil;

  root.funcContextSource = funcContextSource;

  root.indent = indent;

  root.parse = parse;

  root.parseFull = parseFull;

  root.makeDispatchFunction = makeDispatchFunction;

  root.createMethod = createMethod;

  root.noDefaultError = noDefaultError;

  root.Code = Code;

  root.getNthBody = getNthBody;

  root.allowRedefsIn = allowRedefsIn;

  root.markLeisureErrors = markLeisureErrors;

  global.markLeisureErrors = markLeisureErrors;

}).call(this);
;
(function() {
  var Leisure, Monad, Notebook, Parse, RL, ReplCore, U, URI, URIHandler, arrayRest, baseHandler, baseUriPat, codeMonad, concatList, defaultEnv, define, eventCont, fs, getMatches, getType, head, initFileSettings, installRealLocalHandler, isStorageUri, laz, leisureEvent, linkFor, loadFile, loadSource, loading, localHandler, localHandlerConts, makeMonad, newUriHandler, nextMonad, nextMonadOld, output, path, r, read, requireFile, required, root, runMonad, runRequire, setTty, sourceChoices, tail, throwError, tmpFalse, tryRead, tty, uriHandlerFor, uriHandlers, values, write, _ref, _ref2,
    __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __slice = Array.prototype.slice;

  defaultEnv = {
    handleError: function handleError(err, cont) {
      return console.log(err.stack);
    }
  };

  if (typeof window !== "undefined" && window !== null) {
    window.global = window;
    output = null;
    defaultEnv.write = function write(msg) {
      console.log(msg);
      if (!(output != null)) output = document.getElementById('output');
      if (output != null) {
        output.innerHTML += "<span>" + msg + "</span>";
        return output.lastChild.scrollIntoView();
      } else {
        return console.log(msg);
      }
    };
    defaultEnv.prompt = function prompt(msg, cont) {
      return cont(window.prompt(msg));
    };
    window.Prim = root = (_ref = window.Prim) != null ? _ref : {};
    Leisure = window.Leisure;
    Parse = window.Parse;
    Notebook = window.Notebook;
    ReplCore = window.ReplCore = (_ref2 = window.ReplCore) != null ? _ref2 : {};
    root.URI = URI = window.URI;
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    root.URI = URI = require('./uri');
    Parse = require('./parse');
    Leisure = require('./leisure');
    ReplCore = require('./replCore');
    U = require('util');
    RL = require('readline');
    tty = null;
    fs = require('fs');
    path = require('path');
    defaultEnv.write = function write(msg) {
      return process.stdout.write(msg);
    };
    defaultEnv.prompt = function prompt(msg, cont) {
      return tty.question(msg, function() {
        try {
          return cont();
        } catch (err) {
          return console.log("ERROR PRINTING VALUE: " + err.stack);
        }
      });
    };
    r = function r(file, cont) {
      var result;
      if (!(file.match(/^\.\//))) file = "./" + file;
      result = require(file);
      if (cont) return cont(result);
    };
    defaultEnv.require = r;
  }

  setTty = function setTty(rl) {
    return tty = rl;
  };

  define = Parse.define;

  getType = Parse.getType;

  throwError = Parse.throwError;

  laz = Leisure.laz;

  initFileSettings = function initFileSettings(env) {
    env.fileSettings = {
      parseFilters: {}
    };
    return env;
  };

  define('is', (function() {
    return function(value) {
      return function(type) {
        var _ref3;
        if (((_ref3 = value()) != null ? _ref3.type : void 0) === type().dataType) {
          return _true();
        } else {
          return _false();
        }
      };
    };
  }), 2);

  define('isFunc', function() {
    return function(value) {
      if (typeof value() === 'function') {
        return _true();
      } else {
        return _false();
      }
    };
  });

  define('eq', (function() {
    return function(a) {
      return function(b) {
        if (a() === b()) {
          return _true();
        } else {
          return  _false();
        }
      };
    };
  }), 2);

  define('getType', function() {
    return function(value) {
      var type;
      if (type = getType(value())) {
        return _some()(function() {
          return type;
        });
      } else {
        return _none();
      }
    };
  });

  define('parse', function() {
    return function(value) {
      var ast, err, rest, _ref3;
      _ref3 = Leisure.parseFull(value()), ast = _ref3[0], err = _ref3[1], rest = _ref3[2];
      if (err != null) {
        return _right()(laz("Error: " + err));
      } else if (rest != null ? rest.trim() : void 0) {
        return _right()(laz("Error, input left after parsing: '" + (rest.trim()) + "'"));
      } else {
        return _left()(laz(ast));
      }
    };
  });

  define('astStart', function() {
    return function(ast) {
      return ast().leisureStart;
    };
  });

  define('astEnd', function() {
    return function(ast) {
      return ast().leisureEnd;
    };
  });

  define('pretty', function() {
    return function(value) {
      return Parse.print(value());
    };
  });

  define('funcName', function() {
    return function(func) {
      if (func.leisureName != null) {
        return _some()(laz(func.leisureName));
      } else {
        return _none();
      }
    };
  });

  define('funcSource', function() {
    return function(func) {
      var f;
      f = func();
      if (f.src != null) {
        return _some()(laz(f.src));
      } else {
        return _none();
      }
    };
  });

  define('error', (function() {
    return function(str) {
      throw new Error(str());
    };
  }), 1);

  tmpFalse = function tmpFalse(a) {
    return function(b) {
      return b();
    };
  };

  define('defToken', function() {
    return function(token) {
      return makeMonad(function(env, cont) {
        Parse.defToken(token());
        return cont(tmpFalse);
      });
    };
  });

  define('defGroup', function() {
    return function(open) {
      return function(close) {
        return makeMonad(function(env, cont) {
          Parse.defGroup(open(), close());
          return cont(tmpFalse);
        });
      };
    };
  });

  define('addParseFilter', (function() {
    return function(filter) {
      return makeMonad(function(env, cont) {
        Parse.defaultScanner.addFilter(filter());
        return cont(tmpFalse);
      });
    };
  }), 1);

  define('getParseFilterInfo', (function() {
    return makeMonad(function(env, cont) {
      return cont(Parse.defaultScanner.filterInfo);
    });
  }), 0);

  define('setParseFilterInfo', (function() {
    return function(info) {
      return makeMonad(function(env, cont) {
        Parse.defaultScanner.filterInfo = info();
        return cont(tmpFalse);
      });
    };
  }), 1);

  define('+', function() {
    return function(a) {
      return function(b) {
        return a() + b();
      };
    };
  });

  define('-', function() {
    return function(a) {
      return function(b) {
        return a() - b();
      };
    };
  });

  define('*', function() {
    return function(a) {
      return function(b) {
        return a() * b();
      };
    };
  });

  define('/', function() {
    return function(a) {
      return function(b) {
        return a() / b();
      };
    };
  });

  define('%', function() {
    return function(a) {
      return function(b) {
        return a() % b();
      };
    };
  });

  define('floor', function() {
    return function(a) {
      return Math.floor(a());
    };
  });

  define('ceil', function() {
    return function(a) {
      return Math.ceil(a());
    };
  });

  define('round', function() {
    return function(a) {
      return Math.round(a());
    };
  });

  define('randInt', function() {
    return function(from) {
      return function(to) {
        return makeMonad(function(env, cont) {
          return cont(Math.floor(from() + Math.random() * (to() - from() + 1)));
        });
      };
    };
  });

  define('rand', function() {
    return makeMonad(function(env, cont) {
      return cont(Math.random());
    });
  });

  define('>', function() {
    return function(a) {
      return function(b) {
        if (a() > b()) {
          return _true();
        } else {
          return _false();
        }
      };
    };
  });

  define('<', function() {
    return function(a) {
      return function(b) {
        if (a() < b()) {
          return _true();
        } else {
          return _false();
        }
      };
    };
  });

  define('gt', function() {
    return function(a) {
      return function(b) {
        if (a() > b()) {
          return _true();
        } else {
          return _false();
        }
      };
    };
  });

  define('gte', function() {
    return function(a) {
      return function(b) {
        if (a() >= b()) {
          return _true();
        } else {
          return _false();
        }
      };
    };
  });

  define('lt', function() {
    return function(a) {
      return function(b) {
        if (a() < b()) {
          return _true();
        } else {
          return _false();
        }
      };
    };
  });

  define('lte', function() {
    return function(a) {
      return function(b) {
        if (a() <= b()) {
          return _true();
        } else {
          return _false();
        }
      };
    };
  });

  define('strlen', function() {
    return function(s) {
      return s().length;
    };
  });

  define('strtake', function() {
    return function(s) {
      return function(count) {
        return s().substring(0, count());
      };
    };
  });

  define('strdrop', function() {
    return function(s) {
      return function(count) {
        return s().substring(count());
      };
    };
  });

  define('log', function() {
    return function(msg) {
      return function(value) {
        if (msg().type !== 'cons') {
          defaultEnv.write("" + (msg()));
        } else {
          defaultEnv.write(concatList(msg()));
        }
        defaultEnv.write("\n");
        return value();
      };
    };
  });

  define('break', function() {
    return function(value) {
      console.log('breakpoint');
      return value();
    };
  });

  leisureEvent = function leisureEvent(leisureFuncName, evt, env, channel) {
    var currentEvent, monad;
    currentEvent = evt;
    monad = Leisure.eval("" + (Parse.nameSub(leisureFuncName)) + "()")(laz(evt));
    return runMonad(monad, env != null ? env : defaultEnv, function() {
      return (env != null ? env : defaultEnv).finishedEvent(evt, channel);
    });
  };

  eventCont = [];

  nextMonadOld = function nextMonadOld(cont) {
    var cell;
    eventCont.push(cell = [false, null, cont]);
    return function(value) {
      var cnt, ignore, val, _ref3;
      cell[0] = true;
      cell[1] = value;
      while (eventCont.length && eventCont[eventCont.length - 1][0]) {
        try {
          _ref3 = eventCont.pop(), ignore = _ref3[0], val = _ref3[1], cnt = _ref3[2];
          cnt(val);
        } catch (err) {
          console.log("ERROR RUNNING MONAD: " + err.stack);
        }
      }
      return null;
    };
  };

  nextMonad = function nextMonad(cont) {
    return cont;
  };

  runMonad = function runMonad(monad, env, cont) {
    try {
      if (monad.cmd != null) {
        return monad.cmd(env, nextMonad(cont));
      } else {
        return cont(monad);
      }
    } catch (err) {
      return console.log("ERROR RUNNING MONAD: " + err.stack);
    }
  };

  Monad = (function() {

    function Monad() {}

    Monad.prototype.andThen = function andThen(func) {
      var _this = this;
      return makeMonad(function(env, cont) {
        return runMonad(_this, env, function(value) {
          return runMonad(codeMonad(func), env, cont);
        });
      });
    };

    Monad.prototype.toString = function toString() {
      return "Monad: " + (this.cmd.toString());
    };

    return Monad;

  })();

  codeMonad = function codeMonad(code) {
    return makeMonad(function(env, cont) {
      var result;
      result = code(env);
      if (result instanceof Monad) {
        return runMonad(result, env, cont);
      } else {
        return cont(_false());
      }
    });
  };

  makeMonad = function makeMonad(guts) {
    var m;
    m = function m() {};
    m.__proto__ = Monad.prototype;
    m.cmd = guts;
    m.type = 'monad';
    return m;
  };

  define('eventContext', function() {
    return function(evt) {
      return evt().leisureContext;
    };
  });

  define('eventType', function() {
    return function(evt) {
      return evt().type;
    };
  });

  define('eventX', function() {
    return function(evt) {
      return evt().x;
    };
  });

  define('eventY', function() {
    return function(evt) {
      return evt().y;
    };
  });

  define('eventTargetId', function() {
    return function(evt) {
      return evt().target.id;
    };
  });

  define('eventKeyCode', function() {
    return function(evt) {
      var e;
      e = evt();
      return e.charCode || e.keyCode || e.which;
    };
  });

  define('eventPreventDefault', function() {
    return function(evt) {
      return makeMonad(function(env, cont) {
        evt().preventDefault();
        return cont(_false());
      });
    };
  });

  define('forward', function() {
    return function(name) {
      return makeMonad(function(env, cont) {
        Leisure.defineForward(name);
        return cont(_false());
      });
    };
  });

  define('return', function() {
    return function(v) {
      return makeMonad(function(env, cont) {
        return cont(v());
      });
    };
  });

  define('dump', function() {
    return function(file) {
      return makeMonad(function(env, cont) {
        return fs.readFile(file(), function(err, data) {
          console.log((err != null ? err : data).toString());
          return cont();
        });
      });
    };
  });

  define('fdump', function() {
    return function(file) {
      return makeMonad(function(env, cont) {
        return Notebook.peer.value("peer/local-storage/public/storage" + (file()), null, false, function(_arg) {
          var data, x1, x2, x3, x4, x5;
          x1 = _arg[0], x2 = _arg[1], x3 = _arg[2], x4 = _arg[3], x5 = _arg[4], data = _arg[5];
          console.log(data.toString());
          return cont();
        });
      });
    };
  });

  isStorageUri = function isStorageUri(uri) {
    var _ref3, _ref4, _ref5;
    return _ref3 = uri != null ? uri.scheme : void 0, __indexOf.call((_ref4 = Notebook != null ? (_ref5 = Notebook.xusServer) != null ? _ref5.varStorage.values['leisure/storage'] : void 0 : void 0) != null ? _ref4 : [], _ref3) >= 0;
  };

  URIHandler = (function() {

    function URIHandler(label) {
      this.label = label;
    }

    URIHandler.prototype.read = function read(uri, cont, errHandler, next) {
      return errHandler(new Error("Read not currently supported for " + this.label + " uris"));
    };

    URIHandler.prototype.write = function write(uri, data, cont, errHandler) {
      return errHandler(new Error("Write not currently supported for " + this.label + " uris"));
    };

    URIHandler.prototype.basicLink = function basicLink(uri) {
      var u;
      u = new URI(document.location.href);
      u.search = null;
      u.fragment = "#load=" + uri;
      return u;
    };

    URIHandler.prototype.link = function link(uri) {
      return this.basicLink(uri);
    };

    return URIHandler;

  })();

  baseHandler = new URIHandler('base');

  uriHandlers = {};

  newUriHandler = function newUriHandler(label, obj) {
    obj.__proto__ = baseHandler;
    obj.label = label;
    return uriHandlers[label] = obj;
  };

  newUriHandler('err', {
    read: function read(uri, cont, errHandler, next) {
      return errHandler(new Error("No uri handler for " + (uri != null ? uri.scheme : void 0) + " uris"));
    },
    write: function write(uri, data, cont, errHandler) {
      return errHandler(new Error("No uri handler for " + (uri != null ? uri.scheme : void 0) + " uris"));
    },
    link: function link(uri) {
      return '';
    }
  });

  newUriHandler('http', {
    read: function read(uri, cont, errHandler, next) {
      if (typeof window !== "undefined" && window !== null) {
        return jQuery.ajax(uri.toString(), {
          success: function success(data) {
            return cont(data);
          },
          error: function error() {
            return next();
          },
          dataType: 'text'
        });
      } else {
        return (http.get(uri.toString(), function(data) {
          return loadSource(uri, data, cont, errHandler);
        })).on('error', next);
      }
    }
  });

  localHandler = {
    read: function read() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return installRealLocalHandler(function() {
        return localHandler.read.apply(localHandler, args);
      });
    },
    write: function write() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return installRealLocalHandler(function() {
        return localHandler.write.apply(localHandler, args);
      });
    }
  };

  localHandlerConts = [];

  installRealLocalHandler = function installRealLocalHandler(cont) {
    var c, installingLocalHandler, _i, _len;
    if (cont) localHandlerConts.push(cont);
    console.log("leisure/storage: " + (Notebook.xusServer.get('leisure/storage')));
    if (__indexOf.call(Notebook.xusServer.get('leisure/storage'), 'local-storage') >= 0) {
      console.log("Executing local-storage operations");
      localHandler.read = function read(uri, cont, err, next) {
        var f;
        console.log("Reading local file: " + uri.path + ", using path: peer/local-storage/public/storage" + uri.path);
        f = "peer/local-storage/public/storage" + uri.path;
        return Notebook.peer.value(f, null, false, function(_arg) {
          var data, x1, x2, x3, x4, x5;
          x1 = _arg[0], x2 = _arg[1], x3 = _arg[2], x4 = _arg[3], x5 = _arg[4], data = _arg[5];
          console.log("Got data for local file: " + uri.path + ": " + data);
          if (data) {
            return cont(data);
          } else {
            return next();
          }
        });
      };
      localHandler.write = function write(uri, data, cont, err, next) {
        return Notebook.peer.set("peer/local-storage/public/storage" + uri.path, data.toString());
      };
      for (_i = 0, _len = localHandlerConts.length; _i < _len; _i++) {
        c = localHandlerConts[_i];
        c();
      }
      return localHandlerConts = null;
    } else if (installRealLocalHandler.length === 1) {
      console.log("Deferring local-storage operation");
      console.log("Installing local handler");
      installingLocalHandler = true;
      return window.setTimeout((function() {
        return installRealLocalHandler();
      }), 100);
    }
  };

  newUriHandler('local', localHandler);

  newUriHandler('file', {
    read: function read(uri, cont, err, next) {
      return fs.stat(uri.path, function(e) {
        if (e) {
          return next();
        } else {
          return fs.readFile(uri.path, function(e2, data) {
            if (e2) {
              return err(e2);
            } else {
              return cont(data);
            }
          });
        }
      });
    },
    write: function write(uri, data, cont, err) {
      var parent;
      parent = new URI("" + uri + "/..").path;
      return fs.stat(parent, function(e) {
        if (e) {
          return err(new Error("Parent directory of " + uri + " does not exist"));
        } else {
          return fs.writeFile(uri.path, data, function(e2) {
            if (e2) {
              return err(e2);
            } else {
              return cont();
            }
          });
        }
      });
    }
  });

  uriHandlerFor = function uriHandlerFor(uri) {
    var _ref3;
    if (isStorageUri(uri)) {
      return uriHandlers.xus;
    } else {
      return (_ref3 = uri && uriHandlers[uri != null ? uri.scheme : void 0]) != null ? _ref3 : uriHandlers.err;
    }
  };

  if (typeof window !== "undefined" && window !== null) {
    uriHandlers.file = new URIHandler('file');
  }

  loadSource = function loadSource(uri, data, cont, err) {
    try {
      if (uri.path.match(/\.lmd$|\.lsr$/)) {
        return ReplCore.compileString(uri.path, uri.path.match(/\.lmd$/), data, false, false, false, function() {
          return cont(null);
        });
      } else {
        return cont(eval("var module = {exports: {}};\n" + data + ";\nmodule.exports;"));
      }
    } catch (e) {
      console.log("ERROR EVALUATING SOURCE FOR " + uri + ": \n" + e.stack + "\n" + data);
      global.ERR = e;
      return err(e, cont);
    }
  };

  read = function read(uri, cont, err) {
    return uriHandlerFor(uri).read(uri, cont, err, function() {
      return err(new Error("File not found: " + uri));
    });
  };

  write = function write(uri, data, cont, err) {
    return uriHandlerFor(uri).write(uri, data, cont != null ? cont : (function() {}), err != null ? err : throwError);
  };

  linkFor = function linkFor(uri) {
    return uriHandlerFor(uri).link(uri);
  };

  tryRead = function tryRead(label, choices, handler, cont, err) {
    if (!choices.length) {
      return err(new Error("No loadable file found for " + label));
    } else {
      return handler.read(choices[0], (function(data) {
        return cont(choices[0], data);
      }), err, function() {
        return tryRead(label, choices.slice(1), handler, cont, err);
      });
    }
  };

  baseUriPat = /^(.*\/[^/]*)\.[^/.]*$/;

  sourceChoices = function sourceChoices(uri) {
    var ending, m, prefix, _i, _len, _ref3, _results;
    if (m = uri.toString().match(baseUriPat)) {
      return [uri];
    } else {
      prefix = uri.toString();
      _ref3 = ['.js', '.lmd', '.lsr'];
      _results = [];
      for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
        ending = _ref3[_i];
        _results.push(new URI(prefix + ending));
      }
      return _results;
    }
  };

  loadFile = function loadFile(uri, cont, err) {
    return tryRead(uri, sourceChoices(uri), uriHandlerFor(uri), (function(chosenUri, data) {
      return loadSource(chosenUri, data, cont, err);
    }), err);
  };

  define('load', function() {
    return function(file) {
      return makeMonad(function(env, cont) {
        var fileSettings, newCont, uri;
        uri = env.fileSettings.uri.relative(file());
        fileSettings = env.fileSettings;
        initFileSettings(env);
        env.fileSettings.uri = uri;
        newCont = function newCont() {
          env.fileSettings = fileSettings;
          return cont();
        };
        return loadFile(uri, (function(monad) {
          if (monad instanceof Monad) {
            return runMonad(monad, env, newCont);
          } else {
            return newCont();
          }
        }), function(err) {
          console.log("ERROR: " + err.stack);
          return env.fileSettings = fileSettings;
        });
      });
    };
  });

  requireFile = function requireFile(uri, cont, err) {
    var baseUri, m, uString;
    uString = uri.toString();
    baseUri = (m = uString.match(baseUriPat)) ? m[1] : uString;
    if (!required[baseUri]) {
      console.log("LOADING " + uri + "...");
      required[baseUri] = true;
      return loadFile(uri, cont, err);
    } else {
      return cont();
    }
  };

  define('require', function() {
    return function(file) {
      return makeMonad(function(env, cont) {
        var fileSettings, newCont, uri;
        uri = env.fileSettings.uri.relative(file());
        fileSettings = env.fileSettings;
        initFileSettings(env);
        env.fileSettings.uri = uri;
        newCont = function newCont() {
          env.fileSettings = fileSettings;
          return cont();
        };
        return requireFile(uri, (function(monad) {
          if (monad instanceof Monad) {
            return runMonad(monad, env, newCont);
          } else {
            return newCont();
          }
        }), function(err) {
          console.log("ERROR: " + err.stack);
          return env.fileSettings = fileSettings;
        });
      });
    };
  });

  required = {};

  loading = function loading(file) {
    var _ref3;
    file = file.replace(/^(.*?)(\.lsr|\.lmd|)$/, '$1');
    if (defaultEnv != null ? (_ref3 = defaultEnv.fileSettings) != null ? _ref3.uri : void 0 : void 0) {
      return required[defaultEnv.fileSettings.uri.relative(file).toString()] = true;
    }
  };

  runRequire = function runRequire(file, cont) {
    var m;
    if (!required["file://" + file]) {
      required["file://" + file] = true;
      m = require(file);
      if (!(m instanceof Monad)) {
        console.log("REQUIRE " + file + " WARNING: RESULT IS NOT A MONAD");
      }
      return runMonad(m, defaultEnv, function() {
        return (cont != null ? cont : function() {})();
      });
    } else {
      return (cont != null ? cont : function() {})();
    }
  };

  define('print', function() {
    return function(msg) {
      return makeMonad(function(env, cont) {
        var m;
        m = msg();
        env.write("" + (typeof m === 'string' ? m : Parse.print(m)) + "\n");
        return cont(_false());
      });
    };
  });

  define('printValue', function() {
    return function(value) {
      return makeMonad(function(env, cont) {
        if (value() !== _nil()) env.write("" + (env.presentValue(value())) + "\n");
        return cont(_false());
      });
    };
  });

  define('prompt', function() {
    return function(msg) {
      return makeMonad(function(env, cont) {
        return env.prompt(String(msg()), function(input) {
          return cont(input);
        });
      });
    };
  });

  define('bind', function() {
    return function(m) {
      return function(binding) {
        return makeMonad(function(env, cont) {
          return runMonad(m(), env, function(value) {
            return runMonad(binding()(function() {
              return value;
            }), env, cont);
          });
        });
      };
    };
  });

  head = function head(l) {
    return l(function() {
      return function(hh) {
        return function(tt) {
          return hh();
        };
      };
    });
  };

  tail = function tail(l) {
    return l(function() {
      return function(hh) {
        return function(tt) {
          return tt();
        };
      };
    });
  };

  concatList = function concatList(l) {
    if (l === _nil()) {
      return "";
    } else if (typeof (head(l)) === 'string') {
      return (head(l)) + concatList(tail(l));
    } else {
      return Parse.print(head(l)) + concatList(tail(l));
    }
  };

  define('concat', function() {
    return function(l) {
      return concatList(l());
    };
  });

  define('regexp', function() {
    return function(s) {
      return new RegExp(s());
    };
  });

  define('match', function() {
    return function(s) {
      return function(r) {
        var m;
        m = s().match(r());
        if (m) {
          return Parse.cons(getMatches(m, 0), Parse.cons(m.index, Parse.cons(m.input, Parse.Nil)));
        } else {
          return Parse.Nil;
        }
      };
    };
  });

  getMatches = function getMatches(m, index) {
    var _ref3;
    if (index < m.length) {
      return Parse.cons((_ref3 = m[index]) != null ? _ref3 : Parse.Nil, getMatches(m, index + 1));
    } else {
      return Parse.Nil;
    }
  };

  define('js', function() {
    return function(codeList) {
      return makeMonad(function(env, cont) {
        var cl;
        cl = codeList();
        if (cl !== _nil() && cl.type !== 'cons') {
          throwError("js expects a list for its code");
        }
        return cont(eval(concatList(cl)));
      });
    };
  });

  define('arrayLength', function() {
    return function(array) {
      return array().length;
    };
  });

  define('arrayElements', function() {
    return function(array) {
      return function(f) {
        return arrayRest(array(), 0, f());
      };
    };
  });

  arrayRest = function arrayRest(array, index, f) {
    if (index < array.length) {
      return arrayRest(array, index + 1, f(laz(array[index])));
    } else {
      return f;
    }
  };

  define('browser', function() {
    return function(codeList) {
      return makeMonad(function(env, cont) {
        var cl;
        if (typeof window !== "undefined" && window !== null) {
          cl = codeList();
          if (cl !== _nil() && cl.type !== 'cons') {
            throwError("js expects a list for its code");
          }
          return cont(eval(concatList(cl)));
        } else {
          return cont(null);
        }
      });
    };
  });

  global.LeisureValues = values = {};

  define('hasValue', function() {
    return function(name) {
      return makeMonad(function(env, cont) {
        return cont((values[name()] != null ? _true() : _false()));
      });
    };
  });

  define('getValueOr', function() {
    return function(name) {
      return function(defaultValue) {
        return makeMonad(function(env, cont) {
          var _ref3;
          return cont((_ref3 = values[name()]) != null ? _ref3 : defaultValue());
        });
      };
    };
  });

  define('getValue', function() {
    return function(name) {
      return makeMonad(function(env, cont) {
        return cont(values[name()]);
      });
    };
  });

  define('setValue', function() {
    return function(name) {
      return function(value) {
        return makeMonad(function(env, cont) {
          values[name()] = value();
          return cont(_false());
        });
      };
    };
  });

  define('createS', function() {
    return makeMonad(function(env, cont) {
      return cont({
        value: null
      });
    });
  });

  define('getS', function() {
    return function(state) {
      return makeMonad(function(env, cont) {
        return cont(state().value);
      });
    };
  });

  define('setS', function() {
    return function(state) {
      return function(value) {
        return makeMonad(function(env, cont) {
          state().value = value();
          return cont(_false());
        });
      };
    };
  });

  define('read', function() {
    return function(uri) {
      return makeMonad(function(env, cont) {
        return read(new URI(uri()), (function(data) {
          return cont(_left()(laz(data.toString())));
        }), function(err) {
          return cont(_right()(laz(err.stack.toString())));
        });
      });
    };
  });

  define('write', function() {
    return function(uri) {
      return function(data) {
        return makeMonad(function(env, cont) {
          return write(new URI(uri()), data(), (function() {
            return cont(_left()(laz("success")));
          }), function(err) {
            return cont(_right()(laz(err.stack.toString())));
          });
        });
      };
    };
  });

  define('svgMeasureText', (function() {
    return function(text) {
      return Notebook != null ? Notebook.svgMeasureText(text) : void 0;
    };
  }), 2);

  define('primSvgMeasure', (function() {
    return function(content) {
      return Notebook != null ? Notebook.svgMeasure(content) : void 0;
    };
  }), 1);

  initFileSettings(defaultEnv);

  root.setTty = setTty;

  root.runMonad = runMonad;

  root.makeMonad = makeMonad;

  root.tokenDefs = [];

  root.leisureEvent = leisureEvent;

  root.defaultEnv = defaultEnv;

  root.codeMonad = codeMonad;

  root.runRequire = runRequire;

  root.loading = loading;

  root.initFileSettings = initFileSettings;

  root.URI = URI;

  root.Monad = Monad;

  root.newUriHandler = newUriHandler;

  root.read = read;

  root.write = write;

  root.linkFor = linkFor;

  if (typeof window !== "undefined" && window !== null) {
    window.leisureEvent = leisureEvent;
  }

}).call(this);
;
(function() {
  var Leisure, Parse, Prim, U, compileFunc, compileLines, compileString, errString, escape, findDefs, formatContexts, generate, generateCode, getGlobals, getType, handleVar, handlerFunc, helpFunc, includeStd, localPrelude, nextFunc, prelude, print, processLine, processResult, resetFunc, root, runAutosThen, setCompiler, setHandler, setHelp, setIncludeStd, setNext, setResetFunc, showAst, substituteMarkdown, throwError, vars, write, _ref,
    __slice = Array.prototype.slice;

  if ((typeof window !== "undefined" && window !== null) && (!(typeof global !== "undefined" && global !== null) || global === window)) {
    window.global = window;
    root = window.ReplCore = (_ref = window.ReplCore) != null ? _ref : {};
    Parse = window.Parse;
    Leisure = window.Leisure;
    Prim = window.Prim;
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    Parse = require('./parse');
    Leisure = require('./leisure');
    Prim = require('./prim');
    U = require('util');
  }

  includeStd = true;

  setIncludeStd = function setIncludeStd(flag) {
    return includeStd = flag;
  };

  throwError = Parse.throwError;

  compileFunc = function compileFunc() {};

  setCompiler = function setCompiler(c) {
    return compileFunc = c;
  };

  nextFunc = function nextFunc() {};

  setNext = function setNext(n) {
    return nextFunc = n;
  };

  resetFunc = null;

  setResetFunc = function setResetFunc(func) {
    return resetFunc = func;
  };

  getType = Parse.getType;

  formatContexts = function formatContexts(stack) {
    var end, funcName, offset, src, start, _i, _len, _ref2, _ref3, _ref4, _results;
    _ref2 = stack.toArray();
    _results = [];
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      _ref3 = _ref2[_i], funcName = _ref3[0], offset = _ref3[1];
      console.log("FUNCNAME: " + funcName + ", OFFSET: " + offset);
      _ref4 = Leisure.funcContextSource(funcName, offset), src = _ref4[0], start = _ref4[1], end = _ref4[2];
      _results.push("" + funcName + ":" + start + "," + end + ": " + (Leisure.indent("" + (src.substring(0, start)) + " << " + (src.substring(start, end)) + " >> " + (src.substring(end)), 4)));
    }
    return _results;
  };

  errString = function errString(err) {
    if (err instanceof Error) {
      return "" + (err.leisureContext != null ? "\n" + err + ":\n  " + (formatContexts(err.leisureContext).join('\n  ')) + "\n\n" : '') + err.stack;
    } else {
      return err;
    }
  };

  handlerFunc = function handlerFunc(ast, result, a, c, r, src, env, next) {
    env = env != null ? env : Prim.defaultEnv;
    if ((ast != null ? ast.err : void 0) != null) {
      env.write(errString(ast.err));
      return typeof next === "function" ? next() : void 0;
    } else {
      if (a) env.write("FORMATTED: " + (Parse.print(ast)) + "\n");
      if (c) env.write("GEN: " + ast.src + "\n");
      if (r) {
        if (!(result != null)) {
          env.write("(No Result)\n");
          return typeof next === "function" ? next() : void 0;
        } else {
          global.$0 = result;
          env.write("" + (getType(result)) + ": " + (Parse.print(result)) + "\n");
          return processResult(result, env, next);
        }
      }
    }
  };

  setHandler = function setHandler(f) {
    return handlerFunc = f;
  };

  helpFunc = function helpFunc(env) {
    return (env != null ? env : Prim.defaultEnv).write("Type a Leisure expression or one of these commands and hit enter:\n\n:h -- display this help\n:c filename -- compile file\n:r -- reset the Leisure environment\n:v -- display variable values\n:v var value -- set a variable\n:q -- quit\n! code -- eval JavaScript code in the leisure environment\n!! code -- eval JavaScript code in the host environment\n");
  };

  setHelp = function setHelp(h) {
    return helpFunc = h;
  };

  vars = {
    c: [false, 'show generated code'],
    a: [false, 'show parsed AST'],
    r: [true, 'show evaluation result']
  };

  print = function print() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return writeFunc(U.format.apply(null, args));
  };

  write = function write() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return writeFunc(args.join(''));
  };

  processResult = function processResult(result, env, next) {
    next = next != null ? next : nextFunc;
    if (result instanceof Prim.Monad) {
      return Prim.runMonad(result, env != null ? env : Prim.defaultEnv, next);
    } else {
      return next();
    }
  };

  handleVar = function handleVar(name, value, env) {
    var k, prop, _i, _len, _ref2, _ref3, _results;
    if (!name) {
      _ref2 = ((function() {
        var _results2;
        _results2 = [];
        for (k in vars) {
          _results2.push(k);
        }
        return _results2;
      })()).sort();
      _results = [];
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        prop = _ref2[_i];
        _results.push(env.write("" + prop + " = " + vars[prop][0] + " -- " + vars[prop][1] + "\n"));
      }
      return _results;
    } else if (!value && !vars[name]) {
      return env.write("No variable named " + name + "\n");
    } else if (!value) {
      return env.write("" + name + " = " + vars[name] + " -- " + vars[prop][1] + "\n");
    } else {
      return vars[name][0] = !((_ref3 = value[0]) === 'f' || _ref3 === 'F');
    }
  };

  processLine = function processLine(line, env, namespace, next) {
    var a, ast, c, err, m, r, result, _ref2, _ref3, _ref4;
    env = env != null ? env : Prim.defaultEnv;
    try {
      if (line) {
        if (line[0] === '!') {
          if (line[1] === '!') {
            result = eval(line.substr(2));
            result = U != null ? U.inspect(result) : result;
            env.write("" + result + "\n");
          } else {
            result = Leisure.eval(line.substr(1));
            result = U != null ? U.inspect(result) : result;
            env.write("" + result + "\n");
          }
        } else if ((m = line.match(/^:v\s*(([^\s]*)\s*([^\s]*)\s*)$/))) {
          handleVar(m[2], m[3], env);
        } else if ((m = line.match(/^:c\s*([^\s]*)$/))) {
          return compileFunc(m[1], env);
        } else if ((m = line.match(/^:r/))) {
          resetFunc();
        } else if (line.trim() === ':h') {
          helpFunc(env);
        } else if (line.trim() === ':q') {
          process.exit(0);
        } else {
          _ref2 = [vars.a[0], vars.c[0], vars.r[0]], a = _ref2[0], c = _ref2[1], r = _ref2[2];
          _ref3 = Leisure.compileNext(line, getGlobals(), false, false, false, namespace, env.debug, true), ast = _ref3[0], err = _ref3[1];
          if (err != null) {
            if (ast != null) {
              ast.err = err;
            } else {
              ast = {
                err: err
              };
            }
          } else {
            _ref4 = r ? Leisure.evalNext(line, namespace, env.debug) : [ast, null], ast = _ref4[0], result = _ref4[1];
          }
          return handlerFunc(ast, result, a, c, r, line, env, next);
        }
      }
    } catch (err) {
      env.write(errString(err));
    }
    return (next != null ? next : nextFunc)();
  };

  escape = function escape(str) {
    return str.replace(/\n/g, '\\n');
  };

  prelude = "\nNil = Parse.Nil;\ncons = Parse.cons;\nprimCons = Parse.primCons;\nsetType = Parse.setType;\nsetDataType = Parse.setDataType;\ndefine = Parse.define;\nprocessResult = Repl.processResult;\nsetContext = Leisure.setContext;\nfuncContext = Leisure.funcContext;\ndefine = Parse.define;\nwrapContext = Leisure.wrapContext;\nmarkLeisureErrors = Leisure.markLeisureErrors;";

  localPrelude = prelude.replace(/\n/g, "\nvar ");

  generateCode = function generateCode(file, contents, loud, handle, nomacros, check, debug, allAuto, cont) {
    var auto, errs, globals, _ref2;
    if (!cont) throw new Error("No continuation block");
    _ref2 = findDefs(contents, nomacros, loud), globals = _ref2[0], errs = _ref2[1], auto = _ref2[2];
    return generate(file, contents, loud, handle, nomacros, check, globals, errs, debug, allAuto, cont);
  };

  substituteMarkdown = function substituteMarkdown(markdown, contents) {
    var c, s;
    if (!markdown) {
      return contents;
    } else {
      c = '';
      s = contents.split(/(?:^|\n)```[^\n]*\n/);
      while (s.length) {
        s.shift();
        if (s.length) c += s.shift() + "\n";
      }
      return c;
    }
  };

  compileString = function compileString(filename, markdown, contents, loud, nomacros, debug, cont) {
    var match, n, suffix, _ref2;
    if (!cont) throw new Error("No continuation block");
    _ref2 = filename.match(/^(.*?)(\.[^/]*)?$/), match = _ref2[0], n = _ref2[1], suffix = _ref2[2];
    return generateCode(filename, substituteMarkdown(markdown, contents.replace(/\r\n?/g, "\n")), loud, null, nomacros, null, debug, false, cont);
  };

  runAutosThen = function runAutosThen(autos, debug, cont) {
    if (autos === Parse.Nil) {
      return cont();
    } else {
      return processResult(Leisure.evalNext(autos.head(), 'Parse.', debug)[1], {}, function() {
        return runAutosThen(autos.tail(), debug, cont);
      });
    }
  };

  generate = function generate(file, contents, loud, handle, nomacros, check, globals, errs, debug, auto, cont) {
    var objName, out;
    if (!cont) throw new Error("No continuation block");
    if (loud) console.log("Compiling " + file + ":\n");
    objName = (file != null) && file.match(/\.lsr$|\.lmd$/) ? file.substring(0, file.length - 4) : file != null ? file : '_anonymous';
    out = "var " + (Parse.nameSub(objName).substring(1)) + " = (function(){\nvar root;\n\nif ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {\n  " + (file != null ? file.replace(/\.(lsr|lmd)/, '') + ' = ' : '') + "root = {};\n  global = window;\n  module = {};\n} else {\n  root = typeof exports !== 'undefined' && exports !== null ? exports : this;\n  Parse = require('./parse');\n  Leisure = require('./leisure');\n  Prim = require('./prim');\n  //" + (includeStd ? "Prim.runRequire('./prelude');\n  Prim.runRequire('./std')\n;" : '') + "\n  " + (includeStd ? "Prim.runRequire('./std')\n;" : '') + "\n  ReplCore = require('./replCore');\n  Repl = require('./repl');\n}\n\nPrim.loading('" + file + "')\n\n" + localPrelude + "\n\nmodule.exports = ";
    return compileLines(file, contents, loud, handle, nomacros, check, globals.append(getGlobals()), errs, debug, contents, globals, Parse.Nil, true, true, out, auto || (file != null ? file.match(/\.lsr$/) : void 0), cont);
  };

  compileLines = function compileLines(file, contents, loud, handle, nomacros, check, globals, errs, debug, rest, names, prev, inCode, initial, out, auto, cont) {
    var a, ast, c, code, err, leading, localAuto, matched, nm, oldRest, r, result, src, _ref2, _ref3, _ref4;
    if (!cont) throw new Error("No continuation block");
    if (rest && rest.trim()) {
      try {
        if (loud > 1 && prev !== names && names !== Parse.Nil) {
          console.log("Compiling function: " + (names.head()));
        }
        oldRest = rest;
        _ref2 = Leisure.compileNext(rest, globals, null, check, nomacros, 'Parse.', debug), ast = _ref2[0], err = _ref2[1], rest = _ref2[2];
        if ((ast != null ? ast.leisureName : void 0) != null) {
          prev = ast.leisureName;
          names = names.tail();
        }
        code = rest ? oldRest.substring(0, oldRest.length - rest.length) : '';
        localAuto = auto || ((_ref3 = code.match(Leisure.linePat), matched = _ref3[0], leading = _ref3[1], _ref3) && leading.match(/(^|\n) *#@auto *\n/m));
        err = err != null ? err : ast != null ? ast.err : void 0;
        if (err) {
          errs = "" + errs + ((ast != null ? ast.leisureName : void 0) ? "Error in " + ast.leisureName + (showAst(ast)) : "") + err + "\n";
          rest = '';
        } else if (ast) {
          globals = ast.globals;
          nm = ast.leisureName;
          ast.src = "  " + (nm != null ? "" + (Parse.nameSub(nm)) + " = " : "") + ast.src;
          src = ast.leisureName ? (!inCode ? (out += ".andThen(function(){\n", inCode = true) : initial ? out += "Prim.codeMonad(function(){\n" : void 0, eval(ast.src), initial = false, "" + ast.src + ";") : localAuto ? (inCode ? (!initial ? out += "})\n" : void 0, inCode = false) : void 0, initial ? (initial = false, ast.src) : ".andThen(function(){ return " + ast.src + "})") : '';
          out += "" + src + "\n";
          _ref4 = [vars.a[0], vars.c[0], vars.r[0]], a = _ref4[0], c = _ref4[1], r = _ref4[2];
          if (handle) handlerFunc(ast, null, a, c, r, code);
        } else {
          rest = '';
        }
      } catch (err) {
        throw new Error("Error compiling " + file + (ast.leisureName ? "." + ast.leisureName : "") + ": code:\n" + out + "\n>>> ERROR: " + err.message + "\n>>> CODE: " + ast.src);
      }
      if (localAuto && !ast.leisureName) {
        result = eval(ast.src);
        try {
          if (result instanceof Prim.Monad) {
            return Prim.runMonad(result, Prim.defaultEnv, function() {
              return compileLines(file, contents, loud, handle, nomacros, check, globals, errs, debug, rest, names, prev, inCode, initial, out, auto, cont);
            });
          } else {
            return compileLines(file, contents, loud, handle, nomacros, check, globals, errs, debug, rest, names, prev, inCode, initial, out, auto, cont);
          }
        } catch (err) {
          return console.log("ERR, typeof result: " + (typeof result) + ", typeof Monad: " + Monad + ", " + err.stack);
        }
      } else {
        return compileLines(file, contents, loud, handle, nomacros, check, globals, errs, debug, rest, names, prev, inCode, initial, out, auto, cont);
      }
    } else {
      if (initial) {
        cont('');
        return '';
      } else {
        if (inCode) out += "\n})";
        out += ";\nif (typeof window != 'undefined') Prim.runMonad(module.exports, Prim.defaultEnv, function(){});\n}).call(this)";
        if (errs !== '') throwError("Errors compiling " + file + ": " + errs);
        cont(out);
        return out;
      }
    }
  };

  getGlobals = function getGlobals() {
    return Leisure.eval('leisureGetFuncs()');
  };

  showAst = function showAst(ast) {
    if (ast != null) {
      return "(" + (Parse.print(ast)) + ")";
    } else {
      return "";
    }
  };

  findDefs = function findDefs(contents, nomacros, loud) {
    var ast, auto, err, errs, globals, line, oldRest, prevName, rest, _ref2;
    auto = Parse.dlempty;
    errs = '';
    globals = Parse.Nil;
    rest = contents;
    while (rest) {
      oldRest = rest;
      _ref2 = Leisure.compileNext(rest.trim(), globals, true, null, nomacros), ast = _ref2[0], err = _ref2[1], rest = _ref2[2];
      if (err) {
        if (ast != null ? ast.leisureName : void 0) {
          errs = "" + errs + "Error in " + ast.leisureName + (showAst(ast)) + ": " + err + "\n";
        } else if (typeof prevName !== "undefined" && prevName !== null) {
          errs = "" + errs + "Error after " + prevName + ": " + err + "\n";
        } else {
          errs = "" + errs + err + "\n";
        }
      } else {
        line = oldRest.substring(0, (rest != null ? oldRest.length - rest.length : oldRest.length));
        if (line.match(/(^|\n)#@auto/)) {
          auto = Parse.dlappend(auto, Parse.dlnew(line));
        }
      }
      if (ast != null ? ast.leisureName : void 0) {
        prevName = ast.leisureName;
        if (loud > 2) console.log("Found function: " + ast.leisureName);
        if (globals != null ? globals.find(function(v) {
          return v === ast.leisureName && !ast.leisureTypeAssertions;
        }) : void 0) {
          throwError("Attempt to redefine function: " + ast.leisureName + (showAst(ast)));
        }
        globals = Parse.cons(ast.leisureName, globals);
      }
    }
    return [globals.reverse(), errs, auto(Parse.Nil)];
  };

  root.processLine = processLine;

  root.setCompiler = setCompiler;

  root.setHelp = setHelp;

  root.setNext = setNext;

  root.setHandler = setHandler;

  root.next = function next() {
    return nextFunc();
  };

  root.help = function help() {
    return helpFunc();
  };

  root.getType = getType;

  root.generateCode = generateCode;

  root.processResult = processResult;

  root.setResetFunc = setResetFunc;

  root.findDefs = findDefs;

  root.prelude = prelude;

  root.errString = errString;

  root.setIncludeStd = setIncludeStd;

  root.compileString = compileString;

  root.substituteMarkdown = substituteMarkdown;

}).call(this);
;
(function() {
  var Parse, clearEnv, clearEnvX, clearOutput, envFrame, escapeHtml, evalLine, getHtml, handleFiles, init, input, lastLine, markupDef, markupLines, presentValue, processResult, reloadEnv, root, trimEq, useIframe, useMainWindow, write, writeOutput;

  if ((typeof window !== "undefined" && window !== null) && (!(typeof global !== "undefined" && global !== null) || global === window)) {
    window.global = window;
    window.Repl = root = {};
    Parse = window.Parse;
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
  }

  lastLine = null;

  input = null;

  write = null;

  envFrame = null;

  writeOutput = function writeOutput(line) {
    if (typeof output !== "undefined" && output !== null) {
      output.innerHTML += "<span>" + line + "</span>";
      return output.lastChild.scrollIntoView();
    }
  };

  getHtml = function getHtml(x) {
    return x(function() {
      return function(value) {
        return value();
      };
    });
  };

  escapeHtml = function escapeHtml(str) {
    if (typeof str === 'string') {
      return str.replace(/[<>]/g, function(c) {
        switch (c) {
          case '<':
            return '&lt;';
          case '>':
            return '&gt;';
        }
      });
    } else {
      return str;
    }
  };

  trimEq = function trimEq(str) {
    if (str[0] === '=') {
      return str.substring(1);
    } else {
      return str;
    }
  };

  init = function init(inputField, output) {
    clearEnv();
    Prim.defaultEnv.presentValue = presentValue;
    write = function write(line) {};
    ReplCore.setHandler(function(ast, result, a, c, r, src, env, next) {
      global.$0 = result;
      if (!(ast.leisureName != null) && (result != null)) {
        if (typeof env.processResult === "function") {
          env.processResult(result, ast);
        }
        env.write("<span><b> " + (escapeHtml(trimEq(src))) + " \u2192</b>\n  " + (ReplCore.getType(result)) + ": " + (env.presentValue(result)) + "</span>\n");
      } else if (ast.err && (env.processError != null)) {
        env.processError(ast);
      }
      return ReplCore.processResult(result, env, next);
    });
    return ReplCore.setResetFunc(clearEnv);
  };

  presentValue = function presentValue(value) {
    switch (ReplCore.getType(value)) {
      case 'html':
      case 'svg':
        return getHtml(value);
      default:
        return escapeHtml(Parse.print(value));
    }
  };

  evalLine = function evalLine(line) {
    lastLine = line.replace(/\\/g, '\u03BB');
    return ReplCore.processLine(lastLine);
  };

  reloadEnv = function reloadEnv() {};

  clearOutput = function clearOutput() {
    var o;
    o = document.getElementById('output');
    o.innerHTML = 'Click on <a id="stdDefsLink2" href="javascript:void(getStdDefs())">Standard Functions</a> to see Leisure\'s standard functions.\n\n';
    ReplCore.help();
    return o.innerHTML += '\n';
  };

  clearEnvX = function clearEnvX() {
    var env, newEnv;
    env = document.getElementById('env');
    if (env != null) document.body.removeChild(env);
    newEnv = document.createElement('iframe');
    newEnv.id = 'env';
    newEnv.setAttribute("style", "display: none");
    newEnv.setAttribute("onload", "Repl.useIframe(this)");
    return document.body.appendChild(newEnv);
  };

  clearEnv = function clearEnv() {};

  useMainWindow = function useMainWindow() {
    return Leisure.setEvalFunc(window, eval);
  };

  useIframe = function useIframe(envFr) {
    var env, i, k, macs, v, _ref;
    if (envFr) {
      root.envFrame = envFrame = envFr;
      env = envFrame.contentWindow;
      for (i in leisureFuncs) {
        v = leisureFuncs[i];
        env[i] = v;
      }
      Leisure.setEvalFunc(env, env.eval);
      macs = {};
      for (k in macros) {
        v = macros[k];
        macs[k] = v;
      }
      _ref = {
        Leisure: Leisure,
        ReplCore: ReplCore,
        Repl: Repl,
        leisureFuncs: {},
        macros: macs
      };
      for (i in _ref) {
        v = _ref[i];
        env[i] = v;
      }
      env.eval("global = window;\n" + ReplCore.prelude + "\n(function(){\nvar lll;\n\n  global.leisureGetFuncs = function leisureGetFuncs() {\n    return lll\n  }\n  global.leisureSetFuncs = function leisureSetFuncs(funcs) {\n    lll = funcs\n  }\n  global.leisureAddFunc = function leisureAddFunc(func) {\n    lll = Leisure.cons(func, lll)\n  }\n})()");
      return env.leisureSetFuncs(leisureFuncNames);
    }
  };

  markupDef = function markupDef(src, ast) {
    var defType, leading, match, matched, name;
    if (src.match(/^\s*#/)) src;
    if ((match = src.match(Leisure.linePat))) {
      matched = match[0], leading = match[1], name = match[2], defType = match[3];
      return "<div><b>" + name + "</b> " + defType + " " + (src.substring(matched.length)) + "</div>";
    } else {
      return line;
    }
  };

  markupLines = function markupLines(lines) {
    return lines.split('\n').map(markupDef).join('<br>');
  };

  handleFiles = function handleFiles(fileElement) {
    var files, reader;
    files = fileElement.files;
    reader = new FileReader();
    reader.onerror = function onerror(evt) {
      window.e = evt;
      alert('error' + evt);
      return fileElement.value = null;
    };
    reader.onload = function onload() {
      return ReplCore.generateCode(files[0], reader.result, false, true, false, false, false, false, function(code) {
        eval(code);
        return fileElement.value = null;
      });
    };
    reader.readAsText(files[0]);
    return input.select();
  };

  processResult = function processResult(result, next) {
    writeOutput("" + (ReplCore.getType(result)) + ": " + (escape(Parse.print(result))) + "\n");
    return ReplCore.processResult(result, null, next);
  };

  root.init = init;

  root.markupDef = markupDef;

  root.markupLines = markupLines;

  root.handleFiles = handleFiles;

  root.useIframe = useIframe;

  root.reloadEnv = reloadEnv;

  root.clearEnv = clearEnv;

  root.evalLine = evalLine;

  root.processResult = processResult;

  root.escapeHtml = escapeHtml;

  root.presentValue = presentValue;

}).call(this);
;
var std = (function(){
var root;

if ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {
  std = root = {};
  global = window;
  module = {};
} else {
  root = typeof exports !== 'undefined' && exports !== null ? exports : this;
  Parse = require('./parse');
  Leisure = require('./leisure');
  Prim = require('./prim');
  //
  
  ReplCore = require('./replCore');
  Repl = require('./repl');
}

Prim.loading('std.lsr')


var Nil = Parse.Nil;
var cons = Parse.cons;
var primCons = Parse.primCons;
var setType = Parse.setType;
var setDataType = Parse.setDataType;
var define = Parse.define;
var processResult = Repl.processResult;
var setContext = Leisure.setContext;
var funcContext = Leisure.funcContext;
var define = Parse.define;
var wrapContext = Leisure.wrapContext;
var markLeisureErrors = Leisure.markLeisureErrors;

module.exports =   (_defGroup()((function(){return "["}))((function(){return "]"})))
.andThen(function(){ return   (_defGroup()((function(){return "concat["}))((function(){return "]"})))})
.andThen(function(){ return   (_defToken()((function(){return "|"})))})
.andThen(function(){ return   (_defToken()((function(){return ","})))})
.andThen(function(){ return   (_defToken()((function(){return "<-"})))})
.andThen(function(){ return   (_defToken()((function(){return "::"})))})
.andThen(function(){
  _id = Parse.define('id', (function() {var f; return function _id(){return f || (f = (function(_x){return _x();}));}})(), 1, "\\x . x");;
  _flip = Parse.define('flip', (function() {var f; return function _flip(){return f || (f = (Parse.setDataType(function(_f){return Parse.setType(function(_a){return function(_b){return _f()(_b)(_a);};}, 'flip');}, 'flip')));}})(), 1, "\\f . \\a b . f b a");;
  _compose = Parse.define('compose', (function() {var f; return function _compose(){return f || (f = (Parse.setDataType(function(_f){return function(_g){return Parse.setType(function(_x){return _f()((function(){var $m; return (function(){return $m || ($m = (_g()(_x)))})})());}, 'compose');};}, 'compose')));}})(), 2, "\\f g . \\x . f ( g x)");;
  _true = Parse.define('true', (function() {var f; return function _true(){return f || (f = (Parse.setType(function(_a){return function(_b){return _a();};}, 'true')));}})(), 0, "\\a b . a");;
  _false = Parse.define('false', (function() {var f; return function _false(){return f || (f = (Parse.setType(function(_a){return function(_b){return _b();};}, 'false')));}})(), 0, "\\a b . b");;
  _and = Parse.define('and', (function() {var f; return function _and(){return f || (f = (function(_a){return function(_b){return _a()(_b)(_false);};}));}})(), 2, "\\a b . a b false");;
  _or = Parse.define('or', (function() {var f; return function _or(){return f || (f = (function(_a){return _a()(_true);}));}})(), 1, "\\a . a true");;
  _not = Parse.define('not', (function() {var f; return function _not(){return f || (f = (function(_a){return _a()(_false)(_true);}));}})(), 1, "\\a . a false true");;
  _neq = Parse.define('neq', (function() {var f; return function _neq(){return f || (f = (function(_a){return function(_b){return _not()((function(){var $m; return (function(){return $m || ($m = (_eq()(_a)(_b)))})})());};}));}})(), 2, "\\a b . not (eq a b)");;
  _left = Parse.define('left', (function() {var f; return function _left(){return f || (f = (Parse.setDataType(function(_v){return Parse.setType(function(_l){return function(_r){return _l()(_v);};}, 'left');}, 'left')));}})(), 1, "\\v . \\l r . l v");;
  _right = Parse.define('right', (function() {var f; return function _right(){return f || (f = (Parse.setDataType(function(_v){return Parse.setType(function(_l){return function(_r){return _r()(_v);};}, 'right');}, 'right')));}})(), 1, "\\v . \\l r . r v");;
  _some = Parse.define('some', (function() {var f; return function _some(){return f || (f = (Parse.setDataType(function(_x){return Parse.setType(function(_yes){return function(_no){return _yes()(_x);};}, 'some');}, 'some')));}})(), 1, "\\x . \\yes no . yes x");;
  _some2 = Parse.define('some2', (function() {var f; return function _some2(){return f || (f = (Parse.setDataType(function(_a){return function(_b){return Parse.setType(function(_yes){return function(_no){return _yes()(_a)(_b);};}, 'some2');};}, 'some2')));}})(), 2, "\\a b . \\yes no . yes a b");;
  _none = Parse.define('none', (function() {var f; return function _none(){return f || (f = (Parse.setType(function(_yes){return function(_no){return _no();};}, 'none')));}})(), 0, "\\yes no . no");;
  _iszero = Parse.define('iszero', (function _iszero() {return ((_eq()((function(){return 0}))));}), 0, "eq 0");;
  _positive = Parse.define('positive', (function _positive() {return ((_$y()((function(){return 0}))));}), 0, "< 0");;
  _$_$_ = Parse.define('--', (function _$_$_() {return ((_flip()(_$_)((function(){return 1}))));}), 0, "(flip -) 1");;
  _$o$o = Parse.define('++', (function _$o$o() {return ((_$o()((function(){return 1}))));}), 0, "+ 1");;
  _even$e = Parse.define('even?', (function() {var f; return function _even$e(){return f || (f = (function(_x){return _iszero()((function(){var $m; return (function(){return $m || ($m = (_$A()(_x)((function(){return 2}))))})})());}));}})(), 1, "\\x . iszero (% x 2)");;
  _odd$e = Parse.define('odd?', (function() {var f; return function _odd$e(){return f || (f = (function(_x){return _eq()((function(){return 1}))((function(){var $m; return (function(){return $m || ($m = (_$A()(_x)((function(){return 2}))))})})());}));}})(), 1, "\\x . eq 1 (% x 2)");;
  _max = Parse.define('max', (function() {var f; return function _max(){return f || (f = (function(_a){return function(_b){return _gt()(_a)(_b)(_a)(_b);};}));}})(), 2, "\\a b . (gt a b) a b");;
  _min = Parse.define('min', (function() {var f; return function _min(){return f || (f = (function(_a){return function(_b){return _lt()(_a)(_b)(_a)(_b);};}));}})(), 2, "\\a b . (lt a b) a b");;
  _isStream = Parse.define('isStream', (function() {var f; return function _isStream(){return f || (f = (function(_x){return _false();}));}})(), 1, "\\x . false");;
  _isStream = Leisure.makeDispatchFunction('isStream', '_isStream', '_x', ['_isStream', '_x']);
Leisure.createMethod('cons', 'isStream', "\\x       . true", function(_x) {return _true();});
  _isStream = Leisure.makeDispatchFunction('isStream', '_isStream', '_x', ['_isStream', '_x']);
Leisure.createMethod('lexCons', 'isStream', "\\x          . true", function(_x) {return _true();});
  _head = Leisure.makeDispatchFunction('head', '_head', '_l', ['_head', '_l']);
Leisure.createMethod('cons', 'head', "\\l       . l \\h t . h", function(_l) {return _l()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return _h();};}))})})());});
  _tail = Leisure.makeDispatchFunction('tail', '_tail', '_l', ['_tail', '_l']);
Leisure.createMethod('cons', 'tail', "\\l       . l \\h t . t", function(_l) {return _l()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return _t();};}))})})());});
  _head = Leisure.makeDispatchFunction('head', '_head', '_l', ['_head', '_l']);
Leisure.createMethod('lexCons', 'head', "\\l          . l \\h s t e . h", function(_l) {return _l()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_s){return function(_t){return function(_e){return _h();};};};}))})})());});
  _tail = Leisure.makeDispatchFunction('tail', '_tail', '_l', ['_tail', '_l']);
Leisure.createMethod('lexCons', 'tail', "\\l          . l \\h s t e . t", function(_l) {return _l()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_s){return function(_t){return function(_e){return _t();};};};}))})})());});
  _length = Parse.define('length', (function() {var f; return function _length(){return f || (f = (function(_l){return _eq()(_l)(_nil)((function(){return 0}))((function(){var $m; return (function(){return $m || ($m = (_$o$o()((function(){var $m; return (function(){return $m || ($m = (_length()((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())))})})())))})})());}));}})(), 1, "\\l . (eq l nil) 0 (++ (length (tail l) ) )");;
  _last = Parse.define('last', (function() {var f; return function _last(){return f || (f = (function(_l){return _eq()((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())(_nil)((function(){var $m; return (function(){return $m || ($m = (_head()(_l)))})})())((function(){var $m; return (function(){return $m || ($m = (_last()((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())))})})());}));}})(), 1, "\\l . eq (tail l) nil\n  head l\n  last (tail l)");;
  _startPos = Leisure.makeDispatchFunction('startPos', '_startPos', '_l', ['_startPos', '_l']);
Leisure.createMethod('lexCons', 'startPos', "\\l          . lexStart l", function(_l) {return _lexStart()(_l);});
  _startPos = Leisure.makeDispatchFunction('startPos', '_startPos', '_t', ['_startPos', '_t']);
Leisure.createMethod('token', 'startPos', "\\t        . t \\t p . p", function(_t) {return _t()((function(){var $m; return (function(){return $m || ($m = (function(_t){return function(_p){return _p();};}))})})());});
  _endPos = Leisure.makeDispatchFunction('endPos', '_endPos', '_l', ['_endPos', '_l']);
Leisure.createMethod('lexCons', 'endPos', "\\l          . lexEnd l", function(_l) {return _lexEnd()(_l);});
  _endPos = Leisure.makeDispatchFunction('endPos', '_endPos', '_t', ['_endPos', '_t']);
Leisure.createMethod('token', 'endPos', "\\t        . + (tokenStart t) (strlen (tokenName t))", function(_t) {return _$o()((function(){var $m; return (function(){return $m || ($m = (_tokenStart()(_t)))})})())((function(){var $m; return (function(){return $m || ($m = (_strlen()((function(){var $m; return (function(){return $m || ($m = (_tokenName()(_t)))})})())))})})());});
  _pairFunc = Parse.define('pairFunc', (function() {var f; return function _pairFunc(){return f || (f = (function(_l){return _false();}));}})(), 1, "\\l . false");;
  _pairFunc = Leisure.makeDispatchFunction('pairFunc', '_pairFunc', '_l', ['_pairFunc', '_l']);
Leisure.createMethod('cons', 'pairFunc', "\\l       . cons", function(_l) {return _cons();});
  _pairFunc = Leisure.makeDispatchFunction('pairFunc', '_pairFunc', '_l', ['_pairFunc', '_l']);
Leisure.createMethod('lexCons', 'pairFunc', "\\l          . lexConsFuzzy", function(_l) {return _lexConsFuzzy();});
  _pairFunc = Leisure.makeDispatchFunction('pairFunc', '_pairFunc', '_l', ['_pairFunc', '_l']);
Leisure.createMethod('token', 'pairFunc', "\\l        . lexConsFuzzy", function(_l) {return _lexConsFuzzy();});
  _lexConsFuzzy = Parse.define('lexConsFuzzy', (function() {var f; return function _lexConsFuzzy(){return f || (f = (function(_h){return function(_t){return _null$e()(_t)((function(){var $m; return (function(){return $m || ($m = (_lexCons()(_h)((function(){var $m; return (function(){return $m || ($m = (_startPos()(_h)))})})())(_nil)((function(){var $m; return (function(){return $m || ($m = (_endPos()(_h)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_lexCons()(_h)((function(){var $m; return (function(){return $m || ($m = (_startPos()(_h)))})})())(_t)((function(){var $m; return (function(){return $m || ($m = (_endPos()(_t)))})})())))})})());};}));}})(), 2, "\\h t . null? t\n  lexCons h (startPos h) nil (endPos h)\n  lexCons h (startPos h) t (endPos t)");;
  _null$e = Parse.define('null?', (function() {var f; return function _null$e(){return f || (f = (function(_x){return _false();}));}})(), 1, "\\x . false");;
  _null$e = Leisure.makeDispatchFunction('null?', '_null$e', '_x', ['_null$e', '_x']);
Leisure.createMethod('nil', 'null?', "\\x      . true", function(_x) {return _true();});
  _map = Parse.define('map', (function() {var f; return function _map(){return f || (f = (function(_func){return function(_list){return __map()((function(){var $m; return (function(){return $m || ($m = (_pairFunc()(_list)))})})())(_func)(_list);};}));}})(), 2, "\\func list . _map (pairFunc list) func list");;
  __map = Parse.define('_map', (function() {var f; return function __map(){return f || (f = (function(_pairF){return function(_func){return function(_list){return _null$e()(_list)(_nil)((function(){var $m; return (function(){return $m || ($m = (_pairF()((function(){var $m; return (function(){return $m || ($m = (_func()((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (__map()(_pairF)(_func)((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())))})})())))})})());};};}));}})(), 3, "\\pairF func list . null? list\n  nil\n  pairF (func (head list)) (_map pairF func (tail list))");;
  _foldl = Parse.define('foldl', (function() {var f; return function _foldl(){return f || (f = (function(_func){return function(_arg){return function(_list){return _foldl()(_func)((function(){var $m; return (function(){return $m || ($m = (_func()(_arg)((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})());};};}));}})(), 3, "\\func arg list . foldl func (func arg (head list)) (tail list)");;
  _foldl = Leisure.makeDispatchFunction('foldl', '_foldl', '_list', ['_foldl', '_func', '_arg', '_list']);
Leisure.createMethod('nil', 'foldl', "\\func arg list      . arg", function(_func, _arg, _list) {return _arg();});
  _foldl1 = Parse.define('foldl1', (function() {var f; return function _foldl1(){return f || (f = (function(_func){return function(_list){return _foldl()(_func)((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})());};}));}})(), 2, "\\func list . foldl func (head list) (tail list)");;
  _foldl1 = Leisure.makeDispatchFunction('foldl1', '_foldl1', '_list', ['_foldl1', '_func', '_list']);
Leisure.createMethod('nil', 'foldl1', "\\func list      . nil", function(_func, _list) {return _nil();});
  _foldr = Parse.define('foldr', (function() {var f; return function _foldr(){return f || (f = (function(_func){return function(_arg){return function(_list){return _null$e()(_list)(_arg)((function(){var $m; return (function(){return $m || ($m = (_func()((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())((function(){var $m; return (function(){return $m || ($m = (_foldr()(_func)(_arg)((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())))})})())))})})());};};}));}})(), 3, "\\func arg list . null? list\n  arg\n  func (head list) (foldr func arg (tail list))");;
  _foldr1 = Parse.define('foldr1', (function() {var f; return function _foldr1(){return f || (f = (function(_func){return function(_list){return _eq()((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())(_nil)((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())((function(){var $m; return (function(){return $m || ($m = (_func()((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())((function(){var $m; return (function(){return $m || ($m = (_foldr1()(_func)((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())))})})())))})})());};}));}})(), 2, "\\func list . eq (tail list) nil\n  head list\n  func (head list) (foldr1 func (tail list))");;
  _foldr1 = Leisure.makeDispatchFunction('foldr1', '_foldr1', '_list', ['_foldr1', '_func', '_list']);
Leisure.createMethod('nil', 'foldr1', "\\func list      . nil", function(_func, _list) {return _nil();});
  _append = Parse.define('append', (function() {var f; return function _append(){return f || (f = (function(_l1){return function(_l2){return __append()((function(){var $m; return (function(){return $m || ($m = (_pairFunc()(_l1)))})})())(_l1)(_l2);};}));}})(), 2, "\\l1 l2 . _append (pairFunc l1) l1 l2");;
  _append = Leisure.makeDispatchFunction('append', '_append', '_l1', ['_append', '_l1', '_l2']);
Leisure.createMethod('nil', 'append', "\\l1      l2 . l2", function(_l1, _l2) {return _l2();});
  __append = Parse.define('_append', (function() {var f; return function __append(){return f || (f = (function(_pairF){return function(_l1){return function(_l2){return _pairF()((function(){var $m; return (function(){return $m || ($m = (_head()(_l1)))})})())((function(){var $m; return (function(){return $m || ($m = (__append()(_pairF)((function(){var $m; return (function(){return $m || ($m = (_tail()(_l1)))})})())(_l2)))})})());};};}));}})(), 3, "\\pairF l1 l2 . pairF (head l1) (_append pairF (tail l1) l2)");;
  __append = Leisure.makeDispatchFunction('_append', '__append', '_l1', ['__append', '_pairF', '_l1', '_l2']);
Leisure.createMethod('nil', '_append', "\\pairF l1      l2 . l2", function(_pairF, _l1, _l2) {return _l2();});
  _reverse = Parse.define('reverse', (function() {var f; return function _reverse(){return f || (f = (function(_l){return _subreverse()(_l)(_nil);}));}})(), 1, "\\l . subreverse l nil");;
  _subreverse = Parse.define('subreverse', (function() {var f; return function _subreverse(){return f || (f = (function(_l){return function(_result){return _l()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _subreverse()(_t)((function(){var $m; return (function(){return $m || ($m = (_cons()(_h)(_result)))})})());};};}))})})())(_result);};}));}})(), 2, "\\l result . l (\\h t D . subreverse t (cons h result)) result");;
  _if = Parse.define('if', (function _if() {return ((_id()));}), 0, "id");;
  _at = Parse.define('at', (function() {var f; return function _at(){return f || (f = (function(_l){return function(_x){return _iszero()(_x)((function(){var $m; return (function(){return $m || ($m = (_head()(_l)))})})())((function(){var $m; return (function(){return $m || ($m = (_at()((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())((function(){var $m; return (function(){return $m || ($m = (_$_$_()(_x)))})})())))})})());};}));}})(), 2, "\\l x . (iszero (x)) (head l) (at (tail l) (-- (x) ) )");;
  _index_combine = Parse.define('index_combine', (function() {var f; return function _index_combine(){return f || (f = (function(_x){return function(_y){return _or()((function(){var $m; return (function(){return $m || ($m = (_eq()(_x)(_nil)))})})())((function(){var $m; return (function(){return $m || ($m = (_eq()(_y)(_nil)))})})())(_nil)((function(){var $m; return (function(){return $m || ($m = (_$o()(_x)(_y)))})})());};}));}})(), 2, "\\x y . (or (eq x nil) (eq y nil)) (nil) (+ x y)");;
  _indexof = Parse.define('indexof', (function() {var f; return function _indexof(){return f || (f = (function(_l){return function(_x){return _if()((function(){var $m; return (function(){return $m || ($m = (_eq()(_l)(_nil)))})})())(_nil)((function(){var $m; return (function(){return $m || ($m = (_if()((function(){var $m; return (function(){return $m || ($m = (_eq()(_x)((function(){var $m; return (function(){return $m || ($m = (_head()(_l)))})})())))})})())((function(){return 0}))((function(){var $m; return (function(){return $m || ($m = (_index_combine()((function(){return 1}))((function(){var $m; return (function(){return $m || ($m = (_indexof()((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())(_x)))})})())))})})())))})})());};}));}})(), 2, "\\l x . if (eq l nil) (nil) (if (eq x (head l)) (0) (index_combine 1 (indexof (tail l) x ) ) )");;
  _position = Parse.define('position', (function() {var f; return function _position(){return f || (f = (function(_l){return function(_x){return _indexof()(_x)(_l);};}));}})(), 2, "\\l x . indexof x l");;
  _$r = Parse.defineMacro('[', (function() {var f; return function _$r(){return f || (f = (function(_list){return _constructList()((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})());}));}})(), 1, "\\list . constructList (tail list)");;
  _constructList = Parse.define('constructList', (function() {var f; return function _constructList(){return f || (f = (function(_list){return _cl()((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())((function(){var $m; return (function(){return $m || ($m = (_tokString()((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})());}));}})(), 1, "\\list . cl (head list) (tokString (head list)) (tail list)");;
  _constructList = Leisure.makeDispatchFunction('constructList', '_constructList', '_list', ['_constructList', '_list']);
Leisure.createMethod('nil', 'constructList', "\\list      . nil", function(_list) {return _nil();});
  _cl = Parse.define('cl', (function() {var f; return function _cl(){return f || (f = (function(_h){return function(_hs){return function(_t){return _eq()(_hs)((function(){return "|"}))((function(){var $m; return (function(){return $m || ($m = (_eq()((function(){var $m; return (function(){return $m || ($m = (_length()(_t)))})})())((function(){return 2}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_head()(_t)))})})())(_nil)))})})())((function(){var $m; return (function(){return $m || ($m = (_error()((function(){return "Bad list format."}))))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_eq()(_hs)((function(){return "]"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "nil"}))(_nil)))})})())((function(){var $m; return (function(){return $m || ($m = (_eq()(_hs)((function(){return ","}))((function(){var $m; return (function(){return $m || ($m = (_constructList()(_t)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "cons"}))((function(){var $m; return (function(){return $m || ($m = (_cons()(_h)((function(){var $m; return (function(){return $m || ($m = (_constructList()(_t)))})})())))})})())))})})())(_nil)))})})())))})})())))})})());};};}));}})(), 3, "\\h hs t . eq hs '|'\n  eq (length t) 2\n    # -- scanner ensures: eq (tokString (head (tail t))) ']'\n    cons (head t) nil\n    error \"Bad list format.\"\n  eq hs ']'\n    # -- scanner ensures: eq t nil\n    cons 'nil' nil\n    eq hs ','\n      constructList t\n      cons (cons 'cons' (cons h (constructList t))) nil");;
  _tokString = Parse.define('tokString', (function() {var f; return function _tokString(){return f || (f = (function(_x){return _x();}));}})(), 1, "\\x . x");;
  _tokString = Leisure.makeDispatchFunction('tokString', '_tokString', '_t', ['_tokString', '_t']);
Leisure.createMethod('token', 'tokString', "\\t        . t \\t p . t", function(_t) {return _t()((function(){var $m; return (function(){return $m || ($m = (function(_t){return function(_p){return _t();};}))})})());});
  _identMacro = Parse.defineMacro('identMacro', (function() {var f; return function _identMacro(){return f || (f = (function(_list){return _tail()(_list);}));}})(), 1, "\\list . tail list");;
  _macroCons = Parse.defineMacro('macroCons', (function() {var f; return function _macroCons(){return f || (f = (function(_list){return _cons()((function(){return "cons"}))((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})());}));}})(), 1, "\\list . cons 'cons' (tail list)");;
  _concat$r = Parse.defineMacro('concat[', (function() {var f; return function _concat$r(){return f || (f = (function(_list){return _cons()((function(){var $m; return (function(){return $m || ($m = (_token()((function(){return "concat"}))((function(){var $m; return (function(){return $m || ($m = (_tokenStart()(_list)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_token()((function(){return "["}))((function(){var $m; return (function(){return $m || ($m = (_tokenStart()((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())))})})())(_nil)))})})());}));}})(), 1, "\\list . cons (token 'concat' (tokenStart list)) (cons (cons (token '[' (tokenStart (tail list))) (tail list)) nil)");;
  _intersperse = Parse.define('intersperse', (function() {var f; return function _intersperse(){return f || (f = (function(_x){return function(_l){return _or()((function(){var $m; return (function(){return $m || ($m = (_eq()(_l)(_nil)))})})())((function(){var $m; return (function(){return $m || ($m = (_eq()((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())(_nil)))})})())(_l)((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_head()(_l)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()(_x)((function(){var $m; return (function(){return $m || ($m = (_intersperse()(_x)((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())))})})())))})})())))})})());};}));}})(), 2, "\\x l . or (eq l nil) (eq (tail l) nil) l [(head l) x | (intersperse x (tail l))]");;
  _intercalate = Parse.define('intercalate', (function() {var f; return function _intercalate(){return f || (f = (function(_x){return function(_l){return _concat()((function(){var $m; return (function(){return $m || ($m = (_intersperse()(_x)(_l)))})})());};}));}})(), 2, "\\x l . concat (intersperse x l)");;
  _doFilter = Parse.define('doFilter', (function() {var f; return function _doFilter(){return f || (f = (function(_parseDefs){return function(_list){return _transformDo()(_list);};}));}})(), 2, "\\parseDefs list . transformDo list");;
  _transformDo = Parse.define('transformDo', (function() {var f; return function _transformDo(){return f || (f = (function(_list){return _list();}));}})(), 1, "\\list . list");;
  _transformDo = Leisure.makeDispatchFunction('transformDo', '_transformDo', '_list', ['_transformDo', '_list']);
Leisure.createMethod('cons', 'transformDo', "\\list       . subDos list", function(_list) {return _subDos()(_list);});
  _transformDo = Leisure.makeDispatchFunction('transformDo', '_transformDo', '_list', ['_transformDo', '_list']);
Leisure.createMethod('lexCons', 'transformDo', "\\list          . subDos list", function(_list) {return _subDos()(_list);});
  _subDos = Parse.define('subDos', (function() {var f; return function _subDos(){return f || (f = (function(_list){return _eq()((function(){return "do"}))((function(){var $m; return (function(){return $m || ($m = (_tokString()((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_foldr1()((function(){var $m; return (function(){return $m || ($m = (function(_el){return _doClause()(_el);}))})})())((function(){var $m; return (function(){return $m || ($m = (_subNextDos()((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_subNextDos()(_list)))})})());}));}})(), 1, "\\list . eq 'do' (tokString (head list))\n  foldr1 (\\el . doClause el) (subNextDos (tail list))\n  subNextDos list");;
  _subNextDos = Parse.define('subNextDos', (function() {var f; return function _subNextDos(){return f || (f = (function(_nonlist){return _nonlist();}));}})(), 1, "\\nonlist . nonlist");;
  _subNextDos = Leisure.makeDispatchFunction('subNextDos', '_subNextDos', '_list', ['_subNextDos', '_list']);
Leisure.createMethod('cons', 'subNextDos', "\\list       . listSubNextDos list", function(_list) {return _listSubNextDos()(_list);});
  _subNextDos = Leisure.makeDispatchFunction('subNextDos', '_subNextDos', '_list', ['_subNextDos', '_list']);
Leisure.createMethod('lexCons', 'subNextDos', "\\list          . listSubNextDos list", function(_list) {return _listSubNextDos()(_list);});
  _listSubNextDos = Parse.define('listSubNextDos', (function() {var f; return function _listSubNextDos(){return f || (f = (function(_list){return _eq()((function(){return "."}))((function(){var $m; return (function(){return $m || ($m = (_tokString()((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())((function(){var $m; return (function(){return $m || ($m = (_transformDo()((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_transformDo()((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_subNextDos()((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())))})})())))})})());}));}})(), 1, "\\list . eq '.' (tokString (head list))\n  cons (head list) (transformDo (tail list))\n  cons (transformDo (head list)) (subNextDos (tail list))");;
  _doClause = Parse.define('doClause', (function() {var f; return function _doClause(){return f || (f = (function(_clause){return function(_rest){return _doExtractVar()(_clause)((function(){return "<-"}))((function(){var $m; return (function(){return $m || ($m = (function(_var){return _cons()((function(){return "bind"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_tail()((function(){var $m; return (function(){return $m || ($m = (_tail()(_clause)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "\\"}))((function(){var $m; return (function(){return $m || ($m = (_cons()(_var)((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "."}))((function(){var $m; return (function(){return $m || ($m = (_cons()(_rest)(_nil)))})})())))})})())))})})())))})})())))})})());}))})})())((function(){var $m; return (function(){return $m || ($m = (_doExtractVar()(_clause)((function(){return "="}))((function(){var $m; return (function(){return $m || ($m = (function(_var){return _cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "\\"}))((function(){var $m; return (function(){return $m || ($m = (_cons()(_var)((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "."}))((function(){var $m; return (function(){return $m || ($m = (_cons()(_rest)(_nil)))})})())))})})())))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_tail()((function(){var $m; return (function(){return $m || ($m = (_tail()(_clause)))})})())))})})())(_nil)))})})());}))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "bind"}))((function(){var $m; return (function(){return $m || ($m = (_cons()(_clause)((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "\\"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "_"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "."}))((function(){var $m; return (function(){return $m || ($m = (_cons()(_rest)(_nil)))})})())))})})())))})})())))})})())))})})())))})})())))})})());};}));}})(), 2, "\\clause rest . doExtractVar clause '<-'\n  \\var . cons 'bind' (cons (tail (tail clause)) (cons '\\\\' (cons var (cons '.' (cons rest nil)))))\n  doExtractVar clause '='\n    \\var . cons (cons '\\\\' (cons var (cons '.' (cons rest nil)))) (cons (tail (tail clause)) nil)\n    cons 'bind' (cons clause (cons '\\\\' (cons '_' (cons '.' (cons rest nil)))))");;
  _doExtractVar = Parse.define('doExtractVar', (function() {var f; return function _doExtractVar(){return f || (f = (function(_list){return function(_tokName){return _none();};}));}})(), 2, "\\list tokName . none");;
  _doExtractVar = Leisure.makeDispatchFunction('doExtractVar', '_doExtractVar', '_list', ['_doExtractVar', '_list', '_tokName']);
Leisure.createMethod('cons', 'doExtractVar', "\\list       tokName . listDoExtractVar list tokName", function(_list, _tokName) {return _listDoExtractVar()(_list)(_tokName);});
  _doExtractVar = Leisure.makeDispatchFunction('doExtractVar', '_doExtractVar', '_list', ['_doExtractVar', '_list', '_tokName']);
Leisure.createMethod('lexCons', 'doExtractVar', "\\list          tokName . listDoExtractVar list tokName", function(_list, _tokName) {return _listDoExtractVar()(_list)(_tokName);});
  _listDoExtractVar = Parse.define('listDoExtractVar', (function() {var f; return function _listDoExtractVar(){return f || (f = (function(_list){return function(_tokName){return _or()((function(){var $m; return (function(){return $m || ($m = (_null$e()((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_neq()(_tokName)((function(){var $m; return (function(){return $m || ($m = (_tokString()((function(){var $m; return (function(){return $m || ($m = (_head()((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())))})})())))})})())))})})())(_none)((function(){var $m; return (function(){return $m || ($m = (_some()((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())))})})());};}));}})(), 2, "\\list tokName . or (null? (tail list)) (neq tokName (tokString (head (tail list))))\n  none\n  some (head list)");;
})
.andThen(function(){ return   (_addParseFilter()(_doFilter))})
.andThen(function(){ return   (_bind()((function(){var $m; return (function(){return $m || ($m = (_defGroup()((function(){return "or["}))((function(){return "]"}))))})})())((function(){var $m; return (function(){return $m || ($m = (function(__){return _defGroup()((function(){return "and["}))((function(){return "]"}));}))})})()))})
.andThen(function(){
  _dlempty = Parse.define('dlempty', (function _dlempty() {return ((_id()));}), 0, "id");;
  _dl = Parse.define('dl', (function() {var f; return function _dl(){return f || (f = (Parse.setDataType(function(_item){return Parse.setType(function(_rest){return _cons()(_item)(_rest);}, 'dl');}, 'dl')));}})(), 1, "\\item . \\rest . [item | rest]");;
  _dlPush = Parse.define('dlPush', (function() {var f; return function _dlPush(){return f || (f = (function(_list){return function(_item){return _dlAppend()(_list)((function(){var $m; return (function(){return $m || ($m = (_dl()(_item)))})})());};}));}})(), 2, "\\list item . dlAppend list (dl item)");;
  _dlAppend = Parse.define('dlAppend', (function() {var f; return function _dlAppend(){return f || (f = (Parse.setDataType(function(_a){return function(_b){return Parse.setType(function(_rest){return _a()((function(){var $m; return (function(){return $m || ($m = (_b()(_rest)))})})());}, 'dlAppend');};}, 'dlAppend')));}})(), 2, "\\a b . \\rest . a (b rest)");;
  _flatten = Parse.define('flatten', (function() {var f; return function _flatten(){return f || (f = (function(_list){return _subflatten()(_list)(_nil);}));}})(), 1, "\\list . subflatten list nil");;
  _subflatten = Parse.define('subflatten', (function() {var f; return function _subflatten(){return f || (f = (function(_list){return _isStream()(_list)((function(){var $m; return (function(){return $m || ($m = (_dlAppend()((function(){var $m; return (function(){return $m || ($m = (_subflatten()((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_subflatten()((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_dl()(_list)))})})());}));}})(), 1, "\\list . isStream list\n  dlAppend (subflatten (head list)) (subflatten (tail list))\n  dl list");;
  _subflatten = Leisure.makeDispatchFunction('subflatten', '_subflatten', '_list', ['_subflatten', '_list']);
Leisure.createMethod('nil', 'subflatten', "\\list      . dlempty", function(_list) {return _dlempty();});
  _remove = Parse.define('remove', (function() {var f; return function _remove(){return f || (f = (function(_x){return function(_l){return _removeIf()((function(){var $m; return (function(){return $m || ($m = (_eq()(_x)))})})())(_l);};}));}})(), 2, "\\x l . removeIf (eq x) l");;
  _removeIf = Parse.define('removeIf', (function() {var f; return function _removeIf(){return f || (f = (function(_f){return function(_l){return __removeIf()((function(){var $m; return (function(){return $m || ($m = (_pairFunc()(_l)))})})())(_f)(_l);};}));}})(), 2, "\\f l . _removeIf (pairFunc l) f l");;
  __removeIf = Parse.define('_removeIf', (function() {var f; return function __removeIf(){return f || (f = (function(_pairF){return function(_f){return function(_l){return _if()((function(){var $m; return (function(){return $m || ($m = (_eq()(_l)(_nil)))})})())(_nil)((function(){var $m; return (function(){return $m || ($m = (_if()((function(){var $m; return (function(){return $m || ($m = (_f()((function(){var $m; return (function(){return $m || ($m = (_head()(_l)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (__removeIf()(_pairF)(_f)((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_pairF()((function(){var $m; return (function(){return $m || ($m = (_head()(_l)))})})())((function(){var $m; return (function(){return $m || ($m = (__removeIf()(_pairF)(_f)((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())))})})())))})})())))})})());};};}));}})(), 3, "\\pairF f l . if (eq l nil) nil\n  if (f (head l)) (_removeIf pairF f (tail l))\n    pairF (head l) (_removeIf pairF f (tail l))");;
  _removeIfNot = Parse.define('removeIfNot', (function() {var f; return function _removeIfNot(){return f || (f = (function(_f){return function(_l){return _removeIf()((function(){var $m; return (function(){return $m || ($m = (function(_x){return _not()((function(){var $m; return (function(){return $m || ($m = (_f()(_x)))})})());}))})})())(_l);};}));}})(), 2, "\\f l . removeIf (\\x. not (f x)) l");;
  _filter = Parse.define('filter', (function() {var f; return function _filter(){return f || (f = (function(_f){return _removeIf()((function(){var $m; return (function(){return $m || ($m = (_compose()(_not)(_f)))})})());}));}})(), 1, "\\f . removeIf (compose not f)");;
  _any = Parse.define('any', (function() {var f; return function _any(){return f || (f = (function(_f){return function(_l){return __any()((function(){var $m; return (function(){return $m || ($m = (_pairFunc()(_l)))})})())(_f)(_l);};}));}})(), 2, "\\f l . _any (pairFunc l) f l");;
  __any = Parse.define('_any', (function() {var f; return function __any(){return f || (f = (function(_pairF){return function(_f){return function(_l){return _null$e()(_l)(_false)((function(){var $m; return (function(){return $m || ($m = (_or()((function(){var $m; return (function(){return $m || ($m = (_f()((function(){var $m; return (function(){return $m || ($m = (_head()(_l)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (__any()(_pairF)(_f)((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())))})})())))})})());};};}));}})(), 3, "\\pairF f l . null? l\n  false\n  or\n    f (head l)\n    _any pairF f (tail l)");;
  _all = Parse.define('all', (function() {var f; return function _all(){return f || (f = (function(_f){return function(_l){return __all()((function(){var $m; return (function(){return $m || ($m = (_pairFunc()(_l)))})})())(_f)(_l);};}));}})(), 2, "\\f l . _all (pairFunc l) f l");;
  __all = Parse.define('_all', (function() {var f; return function __all(){return f || (f = (function(_pairF){return function(_f){return function(_l){return _null$e()(_l)(_true)((function(){var $m; return (function(){return $m || ($m = (_and()((function(){var $m; return (function(){return $m || ($m = (_f()((function(){var $m; return (function(){return $m || ($m = (_head()(_l)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (__all()(_pairF)(_f)((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())))})})())))})})());};};}));}})(), 3, "\\pairF f l . null? l\n  true\n  and\n    f (head l)\n    _all pairF f (tail l)");;
  _find = Parse.define('find', (function() {var f; return function _find(){return f || (f = (function(_x){return function(_l){return _findIf()((function(){var $m; return (function(){return $m || ($m = (_eq()(_x)))})})())(_l);};}));}})(), 2, "\\x l . findIf (eq x) l");;
  _findIf = Parse.define('findIf', (function() {var f; return function _findIf(){return f || (f = (function(_f){return function(_l){return _null$e()(_l)(_nil)((function(){var $m; return (function(){return $m || ($m = (_f()((function(){var $m; return (function(){return $m || ($m = (_head()(_l)))})})())((function(){var $m; return (function(){return $m || ($m = (_head()(_l)))})})())((function(){var $m; return (function(){return $m || ($m = (_findIf()(_f)((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())))})})())))})})());};}));}})(), 2, "\\f l . null? l\n  nil\n  f (head l)\n    head l\n    findIf f (tail l)");;
  _findIfOpt = Parse.define('findIfOpt', (function() {var f; return function _findIfOpt(){return f || (f = (function(_f){return function(_l){return _null$e()(_l)(_none)((function(){var $m; return (function(){return $m || ($m = (_f()((function(){var $m; return (function(){return $m || ($m = (_head()(_l)))})})())((function(){var $m; return (function(){return $m || ($m = (_some()((function(){var $m; return (function(){return $m || ($m = (_head()(_l)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_findIfOpt()(_f)((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())))})})())))})})());};}));}})(), 2, "\\f l . null? l\n  none\n  f (head l)\n    some (head l)\n    findIfOpt f (tail l)");;
  _findIndex = Parse.define('findIndex', (function() {var f; return function _findIndex(){return f || (f = (function(_func){return function(_list){return _subFindIndex()((function(){return 0}))(_func)(_list);};}));}})(), 2, "\\func list . subFindIndex 0 func list");;
  _subFindIndex = Parse.define('subFindIndex', (function() {var f; return function _subFindIndex(){return f || (f = (function(_index){return function(_func){return function(_list){return _func()((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())(_index)((function(){var $m; return (function(){return $m || ($m = (_subFindIndex()((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){return 1}))(_index)))})})())(_func)((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())))})})());};};}));}})(), 3, "\\index func list . func (head list)\n  index\n  subFindIndex (+ 1 index) func (tail list)");;
  _subFindIndex = Leisure.makeDispatchFunction('subFindIndex', '_subFindIndex', '_list', ['_subFindIndex', '_index', '_func', '_list']);
Leisure.createMethod('nil', 'subFindIndex', "\\index func list      . -1", function(_index, _func, _list) {return -1;});
  _take = Parse.define('take', (function() {var f; return function _take(){return f || (f = (function(_n){return function(_list){return __take()((function(){var $m; return (function(){return $m || ($m = (_pairFunc()(_list)))})})())(_n)(_list);};}));}})(), 2, "\\n list . _take (pairFunc list) n list");;
  __take = Parse.define('_take', (function() {var f; return function __take(){return f || (f = (function(_pairF){return function(_n){return function(_list){return _positive()(_n)((function(){var $m; return (function(){return $m || ($m = (_null$e()(_list)(_nil)((function(){var $m; return (function(){return $m || ($m = (_pairF()((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())((function(){var $m; return (function(){return $m || ($m = (__take()(_pairF)((function(){var $m; return (function(){return $m || ($m = (_$_$_()(_n)))})})())((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())))})})())))})})())))})})())(_nil);};};}));}})(), 3, "\\pairF n list . positive n\n  null? list\n    nil\n    pairF (head list) (_take pairF (-- n) (tail list))\n  nil");;
  _takeWhile = Parse.define('takeWhile', (function() {var f; return function _takeWhile(){return f || (f = (function(_predicate){return function(_list){return __takeWhile()((function(){var $m; return (function(){return $m || ($m = (_pairFunc()(_list)))})})())(_predicate)(_list);};}));}})(), 2, "\\predicate list . _takeWhile (pairFunc list) predicate list");;
  __takeWhile = Parse.define('_takeWhile', (function() {var f; return function __takeWhile(){return f || (f = (function(_pairF){return function(_predicate){return function(_list){return _null$e()(_list)(_nil)((function(){var $m; return (function(){return $m || ($m = (_predicate()((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())((function(){var $m; return (function(){return $m || ($m = (_pairF()((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())((function(){var $m; return (function(){return $m || ($m = (__takeWhile()(_pairF)(_predicate)((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())))})})())))})})())(_nil)))})})());};};}));}})(), 3, "\\pairF predicate list . null? list\n  nil\n  predicate (head list)\n    pairF (head list) (_takeWhile pairF predicate (tail list))\n    nil");;
  _drop = Parse.define('drop', (function() {var f; return function _drop(){return f || (f = (function(_x){return function(_list){return _positive()(_x)((function(){var $m; return (function(){return $m || ($m = (_null$e()(_list)(_nil)((function(){var $m; return (function(){return $m || ($m = (_drop()((function(){var $m; return (function(){return $m || ($m = (_$_$_()(_x)))})})())((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())))})})())))})})())(_list);};}));}})(), 2, "\\x list . positive x\n  null? list\n    nil\n    drop (-- x) (tail list)\n  list");;
  _dropWhile = Parse.define('dropWhile', (function() {var f; return function _dropWhile(){return f || (f = (function(_predicate){return function(_list){return _null$e()(_list)(_nil)((function(){var $m; return (function(){return $m || ($m = (_predicate()((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())((function(){var $m; return (function(){return $m || ($m = (_dropWhile()(_predicate)((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())))})})())(_list)))})})());};}));}})(), 2, "\\predicate list . null? list\n  nil\n  predicate (head list)\n    dropWhile predicate (tail list)\n    list");;
  _dropLast = Parse.define('dropLast', (function() {var f; return function _dropLast(){return f || (f = (function(_n){return function(_list){return _tail()((function(){var $m; return (function(){return $m || ($m = (__dropLast()((function(){var $m; return (function(){return $m || ($m = (_pairFunc()(_list)))})})())(_n)(_list)))})})());};}));}})(), 2, "\\n list . tail (_dropLast (pairFunc list) n list)");;
  __dropLast = Parse.define('_dropLast', (function() {var f; return function __dropLast(){return f || (f = (function(_pairF){return function(_n){return function(_list){return _eq()(_list)(_nil)((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return 0}))(_nil)))})})())((function(){var $m; return (function(){return $m || ($m = (function(_next){return _gt()(_n)((function(){var $m; return (function(){return $m || ($m = (_head()(_next)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){return 1}))((function(){var $m; return (function(){return $m || ($m = (_head()(_next)))})})())))})})())(_nil)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()(_n)((function(){var $m; return (function(){return $m || ($m = (_pairF()((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())((function(){var $m; return (function(){return $m || ($m = (_tail()(_next)))})})())))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (__dropLast()(_pairF)(_n)((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())))})})())))})})());};};}));}})(), 3, "\\pairF n list . eq list nil\n  [0]\n  (\\next . gt n (head next)\n    [(+ 1 (head next))]\n    [n | (pairF (head list) (tail next))]) (_dropLast pairF n (tail list))");;
  _series = Parse.define('series', (function() {var f; return function _series(){return f || (f = (function(_func){return function(_n){return _cons()(_n)((function(){var $m; return (function(){return $m || ($m = (_series()(_func)((function(){var $m; return (function(){return $m || ($m = (_func()(_n)))})})())))})})());};}));}})(), 2, "\\func n . [n | (series func (func n))]");;
  _from = Parse.define('from', (function() {var f; return function _from(){return f || (f = (function(_n){return _series()(_$o$o)(_n);}));}})(), 1, "\\n . series ++ n");;
  _fromBy = Parse.define('fromBy', (function() {var f; return function _fromBy(){return f || (f = (function(_n){return function(_inc){return _series()((function(){var $m; return (function(){return $m || ($m = (_$o()(_inc)))})})())(_n);};}));}})(), 2, "\\n inc . series (+ inc) n");;
  _fromTo = Parse.define('fromTo', (function() {var f; return function _fromTo(){return f || (f = (function(_n){return function(_m){return _takeWhile()((function(){var $m; return (function(){return $m || ($m = (_$z()(_m)))})})())((function(){var $m; return (function(){return $m || ($m = (_from()(_n)))})})());};}));}})(), 2, "\\n m . takeWhile (> m) (from n)");;
  _fromToBy = Parse.define('fromToBy', (function() {var f; return function _fromToBy(){return f || (f = (function(_n){return function(_m){return function(_inc){return _takeWhile()((function(){var $m; return (function(){return $m || ($m = (_$z()(_m)))})})())((function(){var $m; return (function(){return $m || ($m = (_fromBy()(_n)(_inc)))})})());};};}));}})(), 3, "\\n m inc . takeWhile (> m) (fromBy n inc)");;
  _count = Parse.define('count', (function() {var f; return function _count(){return f || (f = (function(_x){return function(_l){return _countIf()((function(){var $m; return (function(){return $m || ($m = (_eq()(_x)))})})())(_l);};}));}})(), 2, "\\x l . countIf (eq x) l");;
  _countIf = Parse.define('countIf', (function() {var f; return function _countIf(){return f || (f = (function(_f){return function(_l){return _if()((function(){var $m; return (function(){return $m || ($m = (_eq()(_l)(_nil)))})})())((function(){return 0}))((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){var $m; return (function(){return $m || ($m = (_f()((function(){var $m; return (function(){return $m || ($m = (_head()(_l)))})})())((function(){return 1}))((function(){return 0}))))})})())((function(){var $m; return (function(){return $m || ($m = (_countIf()(_f)((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())))})})())))})})());};}));}})(), 2, "\\f l . if (eq l nil) 0\n  + (f (head l) 1 0) (countIf f (tail l))");;
  _countIfNot = Parse.define('countIfNot', (function() {var f; return function _countIfNot(){return f || (f = (function(_f){return function(_l){return _countIf()((function(){var $m; return (function(){return $m || ($m = (function(_x){return _not()((function(){var $m; return (function(){return $m || ($m = (_f()(_x)))})})());}))})})())(_l);};}));}})(), 2, "\\f l . countIf (\\x. not (f x)) l");;
  _odds = Parse.define('odds', (function() {var f; return function _odds(){return f || (f = (function(_l){return _cons()((function(){var $m; return (function(){return $m || ($m = (_head()(_l)))})})())((function(){var $m; return (function(){return $m || ($m = (_evens()((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())))})})());}));}})(), 1, "\\l . [(head l) | (evens (tail l))]");;
  _odds = Leisure.makeDispatchFunction('odds', '_odds', '_l', ['_odds', '_l']);
Leisure.createMethod('nil', 'odds', "\\l      . nil", function(_l) {return _nil();});
  _evens = Parse.define('evens', (function() {var f; return function _evens(){return f || (f = (function(_l){return _odds()((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})());}));}})(), 1, "\\l . odds (tail l)");;
  _evens = Leisure.makeDispatchFunction('evens', '_evens', '_l', ['_evens', '_l']);
Leisure.createMethod('nil', 'evens', "\\l      . nil", function(_l) {return _nil();});
  _cleave = Parse.define('cleave', (function() {var f; return function _cleave(){return f || (f = (function(_l){return _cons()((function(){var $m; return (function(){return $m || ($m = (_evens()(_l)))})})())((function(){var $m; return (function(){return $m || ($m = (_odds()(_l)))})})());}));}})(), 1, "\\l . [(evens l) | (odds l)]");;
  _merge = Parse.define('merge', (function() {var f; return function _merge(){return f || (f = (function(_cmp){return function(_a){return function(_b){return _submerge()(_cmp)(_b)(_a);};};}));}})(), 3, "\\cmp a b . submerge cmp b a");;
  _merge = Leisure.makeDispatchFunction('merge', '_merge', '_b', ['_merge', '_cmp', '_a', '_b']);
Leisure.createMethod('nil', 'merge', "\\cmp a b      . a", function(_cmp, _a, _b) {return _a();});
  _submerge = Parse.define('submerge', (function() {var f; return function _submerge(){return f || (f = (function(_cmp){return function(_a){return function(_b){return _cmp()((function(){var $m; return (function(){return $m || ($m = (_head()(_a)))})})())((function(){var $m; return (function(){return $m || ($m = (_head()(_b)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_head()(_a)))})})())((function(){var $m; return (function(){return $m || ($m = (_merge()(_cmp)((function(){var $m; return (function(){return $m || ($m = (_tail()(_a)))})})())(_b)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_head()(_b)))})})())((function(){var $m; return (function(){return $m || ($m = (_merge()(_cmp)(_a)((function(){var $m; return (function(){return $m || ($m = (_tail()(_b)))})})())))})})())))})})());};};}));}})(), 3, "\\cmp a b . cmp (head a) (head b)\n  [(head a) | (merge cmp (tail a) b)]\n  [(head b) | (merge cmp a (tail b))]");;
  _submerge = Leisure.makeDispatchFunction('submerge', '_submerge', '_b', ['_submerge', '_cmp', '_a', '_b']);
Leisure.createMethod('nil', 'submerge', "\\cmp a b      . a", function(_cmp, _a, _b) {return _a();});
  _mergeSort = Parse.define('mergeSort', (function() {var f; return function _mergeSort(){return f || (f = (function(_cmp){return function(_l){return _eq()((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())(_nil)(_l)((function(){var $m; return (function(){return $m || ($m = (function(_cl){return function(_e){return function(_o){return _merge()(_cmp)((function(){var $m; return (function(){return $m || ($m = (_mergeSort()(_cmp)(_e)))})})())((function(){var $m; return (function(){return $m || ($m = (_mergeSort()(_cmp)(_o)))})})());}((function(){var $m; return (function(){return $m || ($m = (_tail()(_cl)))})})());}((function(){var $m; return (function(){return $m || ($m = (_head()(_cl)))})})());}((function(){var $m; return (function(){return $m || ($m = (_cleave()(_l)))})})())))})})());};}));}})(), 2, "\\cmp l . eq (tail l) nil\n  l\n  do\n    cl = cleave l\n    e = head cl\n    o = tail cl\n    merge cmp (mergeSort cmp e) (mergeSort cmp o)");;
  _mergeSort = Leisure.makeDispatchFunction('mergeSort', '_mergeSort', '_l', ['_mergeSort', '_cmp', '_l']);
Leisure.createMethod('nil', 'mergeSort', "\\cmp l      . nil", function(_cmp, _l) {return _nil();});
  _sort = Parse.define('sort', (function() {var f; return function _sort(){return f || (f = (function(_l){return _sortBy()(_lte)(_l);}));}})(), 1, "\\l . sortBy lte l");;
  _sortBy = Parse.define('sortBy', (function() {var f; return function _sortBy(){return f || (f = (function(_cmp){return function(_l){return _mergeSort()(_cmp)(_l);};}));}})(), 2, "\\cmp l . mergeSort cmp l");;
  _assocFromList = Parse.define('assocFromList', (function() {var f; return function _assocFromList(){return f || (f = (function(_l){return _if()((function(){var $m; return (function(){return $m || ($m = (_null$e()(_l)))})})())(_nil)((function(){var $m; return (function(){return $m || ($m = (_assocSet()((function(){var $m; return (function(){return $m || ($m = (_head()(_l)))})})())((function(){var $m; return (function(){return $m || ($m = (_head()((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_assocFromList()((function(){var $m; return (function(){return $m || ($m = (_tail()((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())))})})())))})})())))})})());}));}})(), 1, "\\l . if (null? l) nil\n  assocSet (head l) (head (tail l)) (assocFromList (tail (tail l)))");;
  _assocKey = Parse.define('assocKey', (function() {var f; return function _assocKey(){return f || (f = (function(_cons){return _head()(_cons);}));}})(), 1, "\\cons . head cons");;
  _assocValue = Parse.define('assocValue', (function() {var f; return function _assocValue(){return f || (f = (function(_cons){return _tail()(_cons);}));}})(), 1, "\\cons . tail cons");;
  _assocGetPair = Parse.define('assocGetPair', (function() {var f; return function _assocGetPair(){return f || (f = (function(_k){return function(_anAssoc){return _findIf()((function(){var $m; return (function(){return $m || ($m = (function(_x){return _eq()((function(){var $m; return (function(){return $m || ($m = (_head()(_x)))})})())(_k);}))})})())(_anAssoc);};}));}})(), 2, "\\k anAssoc . findIf (\\x . eq (head x) k) anAssoc");;
  _assocGetPairOpt = Parse.define('assocGetPairOpt', (function() {var f; return function _assocGetPairOpt(){return f || (f = (function(_k){return function(_l){return _l()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _h()((function(){var $m; return (function(){return $m || ($m = (function(_kk){return function(_vv){return _eq()(_k)(_kk)((function(){var $m; return (function(){return $m || ($m = (_some2()(_kk)(_vv)))})})())((function(){var $m; return (function(){return $m || ($m = (_assocGetPairOpt()(_k)(_t)))})})());};}))})})());};};}))})})())(_none);};}));}})(), 2, "\\k l . l (\\h t D . h (\\kk vv . (eq k kk) (some2 kk vv) (assocGetPairOpt k t))) none");;
  _assocKeys = Parse.define('assocKeys', (function() {var f; return function _assocKeys(){return f || (f = (function(_anAssoc){return _map()((function(){var $m; return (function(){return $m || ($m = (function(_cell){return _assocKey()(_cell);}))})})())(_anAssoc);}));}})(), 1, "\\anAssoc . map (\\cell . (assocKey cell)) anAssoc");;
  _assocNumKeys = Parse.define('assocNumKeys', (function() {var f; return function _assocNumKeys(){return f || (f = (function(_anAssoc){return _length()((function(){var $m; return (function(){return $m || ($m = (_assocKeys()(_anAssoc)))})})());}));}})(), 1, "\\anAssoc . length (assocKeys anAssoc)");;
  _assocMergeKeys = Parse.define('assocMergeKeys', (function() {var f; return function _assocMergeKeys(){return f || (f = (function(_hm1){return function(_hm2){return function(_keys){return _if()((function(){var $m; return (function(){return $m || ($m = (_null$e()(_keys)))})})())(_hm1)((function(){var $m; return (function(){return $m || ($m = (_if()((function(){var $m; return (function(){return $m || ($m = (_null$e()((function(){var $m; return (function(){return $m || ($m = (_assocGetPair()((function(){var $m; return (function(){return $m || ($m = (_head()(_keys)))})})())(_hm1)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_assocGetPair()((function(){var $m; return (function(){return $m || ($m = (_head()(_keys)))})})())(_hm2)))})})())((function(){var $m; return (function(){return $m || ($m = (_assocMergeKeys()(_hm1)(_hm2)((function(){var $m; return (function(){return $m || ($m = (_tail()(_keys)))})})())))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_assocMergeKeys()(_hm1)(_hm2)((function(){var $m; return (function(){return $m || ($m = (_tail()(_keys)))})})())))})})())))})})());};};}));}})(), 3, "\\hm1 hm2 keys . if (null? keys) hm1\n  if (null? (assocGetPair (head keys) hm1) )\n    [(assocGetPair (head keys) hm2) | (assocMergeKeys hm1 hm2 (tail keys))]\n    assocMergeKeys hm1 hm2 (tail keys)");;
  _assocMerge = Parse.define('assocMerge', (function() {var f; return function _assocMerge(){return f || (f = (function(_hm1){return function(_hm2){return _assocMergeKeys()(_hm1)(_hm2)((function(){var $m; return (function(){return $m || ($m = (_assocKeys()(_hm2)))})})());};}));}})(), 2, "\\hm1 hm2 . assocMergeKeys hm1 hm2 (assocKeys hm2)");;
  _assocSet = Parse.define('assocSet', (function() {var f; return function _assocSet(){return f || (f = (function(_k){return function(_v){return function(_anAssoc){return _cons()((function(){var $m; return (function(){return $m || ($m = (_cons()(_k)(_v)))})})())((function(){var $m; return (function(){return $m || ($m = (_assocRemove()(_k)(_anAssoc)))})})());};};}));}})(), 3, "\\k v anAssoc . [(cons k v) | (assocRemove k anAssoc)]");;
  _assocGet = Parse.define('assocGet', (function() {var f; return function _assocGet(){return f || (f = (function(_k){return function(_anAssoc){return _assocGetPair()(_k)(_anAssoc)((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _some()(_h);};};}))})})())(_none);};}));}})(), 2, "\\k anAssoc . (assocGetPair k anAssoc) (\\h t D . some h) none");;
  _assocGetWithDefault = Parse.define('assocGetWithDefault', (function() {var f; return function _assocGetWithDefault(){return f || (f = (function(_k){return function(_default){return function(_anAssoc){return _assocGetPair()(_k)(_anAssoc)((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _t();};};}))})})())(_default);};};}));}})(), 3, "\\k default anAssoc . (assocGetPair k anAssoc) (\\h t D . t) default");;
  _assocRemove = Parse.define('assocRemove', (function() {var f; return function _assocRemove(){return f || (f = (function(_k){return function(_anAssoc){return _removeIf()((function(){var $m; return (function(){return $m || ($m = (function(_x){return _eq()((function(){var $m; return (function(){return $m || ($m = (_assocKey()(_x)))})})())(_k);}))})})())(_anAssoc);};}));}})(), 2, "\\k anAssoc . removeIf (\\x . eq (assocKey x) k) anAssoc");;
  _html = Parse.define('html', (function() {var f; return function _html(){return f || (f = (Parse.setDataType(function(_x){return Parse.setType(function(_f){return _f()(_x);}, 'html');}, 'html')));}})(), 1, "\\x . \\f . f x");;
  _or$r = Parse.defineMacro('or[', (function() {var f; return function _or$r(){return f || (f = (function(_list){return _primOrVar()(_list)((function(){var $m; return (function(){return $m || ($m = (_dropLast()((function(){return 1}))((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())))})})());}));}})(), 1, "\\list . primOrVar list (dropLast 1 (tail list))");;
  _primOrVar = Parse.define('primOrVar', (function() {var f; return function _primOrVar(){return f || (f = (function(_list){return function(_args){return _eq()(_args)(_nil)((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "true"}))(_nil)))})})())((function(){var $m; return (function(){return $m || ($m = (_eq()((function(){var $m; return (function(){return $m || ($m = (_tail()(_args)))})})())(_nil)(_args)((function(){var $m; return (function(){return $m || ($m = (_foldr1()((function(){var $m; return (function(){return $m || ($m = (function(_v){return function(_el){return _cons()((function(){return "or"}))((function(){var $m; return (function(){return $m || ($m = (_cons()(_v)((function(){var $m; return (function(){return $m || ($m = (_cons()(_el)(_nil)))})})())))})})());};}))})})())(_args)))})})())))})})());};}));}})(), 2, "\\list args . eq args nil\n  ['true']\n  eq (tail args) nil\n    args\n    foldr1 (\\v el . ['or' v el]) args");;
  _and$r = Parse.defineMacro('and[', (function() {var f; return function _and$r(){return f || (f = (function(_list){return _primAndVar()(_list)((function(){var $m; return (function(){return $m || ($m = (_dropLast()((function(){return 1}))((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())))})})());}));}})(), 1, "\\list . primAndVar list (dropLast 1 (tail list))");;
  _primAndVar = Parse.define('primAndVar', (function() {var f; return function _primAndVar(){return f || (f = (function(_list){return function(_args){return _eq()(_args)(_nil)((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "false"}))(_nil)))})})())((function(){var $m; return (function(){return $m || ($m = (_eq()((function(){var $m; return (function(){return $m || ($m = (_tail()(_args)))})})())(_nil)(_args)((function(){var $m; return (function(){return $m || ($m = (_foldr1()((function(){var $m; return (function(){return $m || ($m = (function(_v){return function(_el){return _cons()((function(){return "and"}))((function(){var $m; return (function(){return $m || ($m = (_cons()(_v)((function(){var $m; return (function(){return $m || ($m = (_cons()(_el)(_nil)))})})())))})})());};}))})})())(_args)))})})())))})})());};}));}})(), 2, "\\list args . eq args nil\n  ['false']\n  eq (tail args) nil\n    args\n    foldr1 (\\v el . ['and' v el]) args");;
  _defInfixToken = Parse.define('defInfixToken', (function() {var f; return function _defInfixToken(){return f || (f = (function(_tokenName){return function(_location){return function(_reference){return _bind()((function(){var $m; return (function(){return $m || ($m = (_defToken()(_tokenName)))})})())((function(){var $m; return (function(){return $m || ($m = (function(__){return _bind()(_getParseFilterInfo)((function(){var $m; return (function(){return $m || ($m = (function(_defs){return function(_operators){return function(_operators){return _setParseFilterInfo()((function(){var $m; return (function(){return $m || ($m = (_assocSet()((function(){return "infix"}))(_operators)(_defs)))})})());}((function(){var $m; return (function(){return $m || ($m = (_eq()(_reference)(_nil)((function(){var $m; return (function(){return $m || ($m = (_eq()(_location)((function(){return "before"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()(_tokenName)(_nil)))})})())(_operators)))})})())((function(){var $m; return (function(){return $m || ($m = (_append()(_operators)((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()(_tokenName)(_nil)))})})())(_nil)))})})())))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_insertOperator()(_tokenName)(_location)(_reference)(_operators)))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_assocGetWithDefault()((function(){return "infix"}))(_nil)(_defs)))})})());}))})})());}))})})());};};}));}})(), 3, "\\tokenName location reference . do\n  defToken tokenName\n  defs <- getParseFilterInfo\n  operators = assocGetWithDefault 'infix' nil defs\n  operators = eq reference nil\n    eq location 'before'\n      [[tokenName] | operators]\n      append operators [[tokenName]]\n    insertOperator tokenName location reference operators\n  setParseFilterInfo (assocSet 'infix' operators defs)");;
  _insertOperator = Parse.define('insertOperator', (function() {var f; return function _insertOperator(){return f || (f = (function(_tokenName){return function(_location){return function(_reference){return function(_operators){return _any()((function(){var $m; return (function(){return $m || ($m = (_eq()(_reference)))})})())((function(){var $m; return (function(){return $m || ($m = (_head()(_operators)))})})())((function(){var $m; return (function(){return $m || ($m = (_eq()(_location)((function(){return "before"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()(_tokenName)(_nil)))})})())(_operators)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()(_tokenName)((function(){var $m; return (function(){return $m || ($m = (_head()(_operators)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_tail()(_operators)))})})())))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_head()(_operators)))})})())((function(){var $m; return (function(){return $m || ($m = (_insertOperator()(_tokenName)(_location)(_reference)((function(){var $m; return (function(){return $m || ($m = (_tail()(_operators)))})})())))})})())))})})());};};};}));}})(), 4, "\\tokenName location reference operators . any (eq reference) (head operators)\n  eq location 'before'\n    [[tokenName] | operators]\n    [[tokenName | (head operators)] | (tail operators)]\n  [(head operators) | (insertOperator tokenName location reference (tail operators))]");;
  _insertOperator = Leisure.makeDispatchFunction('insertOperator', '_insertOperator', '_operators', ['_insertOperator', '_tokenName', '_location', '_reference', '_operators']);
Leisure.createMethod('nil', 'insertOperator', "\\tokenName location reference operators      . [[tokenName]]", function(_tokenName, _location, _reference, _operators) {return _cons()((function(){var $m; return (function(){return $m || ($m = (_cons()(_tokenName)(_nil)))})})())(_nil);});
  _testInfix = Parse.define('testInfix', (function() {var f; return function _testInfix(){return f || (f = (function(_str){return _bind()((function(){var $m; return (function(){return $m || ($m = (_getValueOr()((function(){return "parseFilter.defs"}))(_nil)))})})())((function(){var $m; return (function(){return $m || ($m = (function(_defs){return _bind()((function(){var $m; return (function(){return $m || ($m = (_print()((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "defs: "}))((function(){var $m; return (function(){return $m || ($m = (_cons()(_defs)(_nil)))})})())))})})())))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (function(__){return _print()((function(){var $m; return (function(){return $m || ($m = (_mainParseInfix()(_defs)((function(){var $m; return (function(){return $m || ($m = (_scan()(_str)(_id)(_id)))})})())))})})());}))})})());}))})})());}));}})(), 1, "\\str . do\n  defs <- getValueOr 'parseFilter.defs' nil\n  print concat['defs: ' defs]\n  print (mainParseInfix defs (scan str id id))");;
  _mainParseInfix = Parse.define('mainParseInfix', (function() {var f; return function _mainParseInfix(){return f || (f = (function(_parseDefs){return function(_list){return _parseInfix()((function(){var $m; return (function(){return $m || ($m = (_assocGetWithDefault()((function(){return "infix"}))(_nil)(_parseDefs)))})})())(_list);};}));}})(), 2, "\\parseDefs list . parseInfix (assocGetWithDefault 'infix' nil parseDefs) list");;
  _parseInfix = Parse.define('parseInfix', (function() {var f; return function _parseInfix(){return f || (f = (function(_tokens){return function(_list){return _list();};}));}})(), 2, "\\tokens list . list");;
  _parseInfix = Leisure.makeDispatchFunction('parseInfix', '_parseInfix', '_list', ['_parseInfix', '_tokens', '_list']);
Leisure.createMethod('cons', 'parseInfix', "\\tokens list       . callParseInfixList tokens list", function(_tokens, _list) {return _callParseInfixList()(_tokens)(_list);});
  _parseInfix = Leisure.makeDispatchFunction('parseInfix', '_parseInfix', '_list', ['_parseInfix', '_tokens', '_list']);
Leisure.createMethod('lexCons', 'parseInfix', "\\tokens list          . callParseInfixList tokens list", function(_tokens, _list) {return _callParseInfixList()(_tokens)(_list);});
  _callParseInfixList = Parse.define('callParseInfixList', (function() {var f; return function _callParseInfixList(){return f || (f = (function(_tokens){return function(_list){return function(_prep){return _parseInfixList()(_tokens)(_dlempty)((function(){var $m; return (function(){return $m || ($m = (_head()(_prep)))})})())((function(){var $m; return (function(){return $m || ($m = (_tail()(_prep)))})})());}((function(){var $m; return (function(){return $m || ($m = (_collapseInnerTokens()(_tokens)((function(){var $m; return (function(){return $m || ($m = (_collapseFirstTokens()(_tokens)((function(){var $m; return (function(){return $m || ($m = (_map()((function(){var $m; return (function(){return $m || ($m = (_parseInfix()(_tokens)))})})())(_list)))})})())))})})())))})})());};}));}})(), 2, "\\tokens list . do\n  prep = collapseInnerTokens tokens (collapseFirstTokens tokens (map (parseInfix tokens) list))\n  parseInfixList tokens dlempty (head prep) (tail prep)");;
  _collapseInnerTokens = Parse.define('collapseInnerTokens', (function() {var f; return function _collapseInnerTokens(){return f || (f = (function(_tokens){return function(_list){return _list();};}));}})(), 2, "\\tokens list . list");;
  _collapseInnerTokens = Leisure.makeDispatchFunction('collapseInnerTokens', '_collapseInnerTokens', '_list', ['_collapseInnerTokens', '_tokens', '_list']);
Leisure.createMethod('cons', 'collapseInnerTokens', "\\tokens list       . collapseInner1 tokens (head list) (tail list) list", function(_tokens, _list) {return _collapseInner1()(_tokens)((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())(_list);});
  _collapseInner1 = Parse.define('collapseInner1', (function() {var f; return function _collapseInner1(){return f || (f = (function(_tokens){return function(_op){return function(_rest){return function(_orig){return _orig();};};};}));}})(), 4, "\\tokens op rest orig . orig");;
  _collapseInner1 = Leisure.makeDispatchFunction('collapseInner1', '_collapseInner1', '_rest', ['_collapseInner1', '_tokens', '_op', '_rest', '_orig']);
Leisure.createMethod('cons', 'collapseInner1', "\\tokens op rest       orig . collapseInner2 tokens op (head rest) (tail rest)", function(_tokens, _op, _rest, _orig) {return _collapseInner2()(_tokens)(_op)((function(){var $m; return (function(){return $m || ($m = (_head()(_rest)))})})())((function(){var $m; return (function(){return $m || ($m = (_tail()(_rest)))})})());});
  _collapseInner2 = Parse.define('collapseInner2', (function() {var f; return function _collapseInner2(){return f || (f = (function(_tokens){return function(_op){return function(_2nd){return function(_rest){return _cons()(_op)((function(){var $m; return (function(){return $m || ($m = (_cons()(_2nd)(_rest)))})})());};};};}));}})(), 4, "\\tokens op 2nd rest . [op 2nd | rest]");;
  _collapseInner2 = Leisure.makeDispatchFunction('collapseInner2', '_collapseInner2', '_rest', ['_collapseInner2', '_tokens', '_op', '_2nd', '_rest']);
Leisure.createMethod('cons', 'collapseInner2', "\\tokens op 2nd rest       . collapseInner3 tokens op 2nd (head rest) (tail rest)", function(_tokens, _op, _2nd, _rest) {return _collapseInner3()(_tokens)(_op)(_2nd)((function(){var $m; return (function(){return $m || ($m = (_head()(_rest)))})})())((function(){var $m; return (function(){return $m || ($m = (_tail()(_rest)))})})());});
  _collapseInner3 = Parse.define('collapseInner3', (function() {var f; return function _collapseInner3(){return f || (f = (function(_tokens){return function(_op){return function(_2nd){return function(_3rd){return function(_rest){return _cons()(_op)((function(){var $m; return (function(){return $m || ($m = (_collapseInner2()(_tokens)(_2nd)(_3rd)(_rest)))})})());};};};};}));}})(), 5, "\\tokens op 2nd 3rd rest . [op | (collapseInner2 tokens 2nd 3rd rest)]");;
  _collapseInner3 = Leisure.makeDispatchFunction('collapseInner3', '_collapseInner3', '_op', ['_collapseInner3', '_tokens', '_op', '_2nd', '_3rd', '_rest']);
Leisure.createMethod('token', 'collapseInner3', "\\tokens op        2nd 3rd rest . collapseInner4 tokens op 2nd 3rd rest", function(_tokens, _op, _2nd, _3rd, _rest) {return _collapseInner4()(_tokens)(_op)(_2nd)(_3rd)(_rest);});
  _collapseInner4 = Parse.define('collapseInner4', (function() {var f; return function _collapseInner4(){return f || (f = (function(_tokens){return function(_op){return function(_2nd){return function(_3rd){return function(_rest){return _cons()(_op)((function(){var $m; return (function(){return $m || ($m = (_collapseInner2()(_tokens)(_2nd)(_3rd)(_rest)))})})());};};};};}));}})(), 5, "\\tokens op 2nd 3rd rest . [op | (collapseInner2 tokens 2nd 3rd rest)]");;
  _collapseInner4 = Leisure.makeDispatchFunction('collapseInner4', '_collapseInner4', '_2nd', ['_collapseInner4', '_tokens', '_op', '_2nd', '_3rd', '_rest']);
Leisure.createMethod('token', 'collapseInner4', "\\tokens op 2nd        3rd rest . collapseInner5 tokens op 2nd 3rd rest", function(_tokens, _op, _2nd, _3rd, _rest) {return _collapseInner5()(_tokens)(_op)(_2nd)(_3rd)(_rest);});
  _collapseInner5 = Parse.define('collapseInner5', (function() {var f; return function _collapseInner5(){return f || (f = (function(_tokens){return function(_op){return function(_2nd){return function(_3rd){return function(_rest){return _cons()(_op)((function(){var $m; return (function(){return $m || ($m = (_collapseInner2()(_tokens)(_2nd)(_3rd)(_rest)))})})());};};};};}));}})(), 5, "\\tokens op 2nd 3rd rest . [op | (collapseInner2 tokens 2nd 3rd rest)]");;
  _collapseInner5 = Leisure.makeDispatchFunction('collapseInner5', '_collapseInner5', '_3rd', ['_collapseInner5', '_tokens', '_op', '_2nd', '_3rd', '_rest']);
Leisure.createMethod('token', 'collapseInner5', "\\tokens op 2nd 3rd        rest . and\n  isOperator tokens op\n  and\n    isOperator tokens 2nd\n    adjacent 2nd 3rd\n  [op (collapseTokens 2nd 3rd) | (collapseInnerTokens tokens rest)]\n  [op | (collapseInner2 tokens 2nd 3rd rest)]", function(_tokens, _op, _2nd, _3rd, _rest) {return _and()((function(){var $m; return (function(){return $m || ($m = (_isOperator()(_tokens)(_op)))})})())((function(){var $m; return (function(){return $m || ($m = (_and()((function(){var $m; return (function(){return $m || ($m = (_isOperator()(_tokens)(_2nd)))})})())((function(){var $m; return (function(){return $m || ($m = (_adjacent()(_2nd)(_3rd)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()(_op)((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_collapseTokens()(_2nd)(_3rd)))})})())((function(){var $m; return (function(){return $m || ($m = (_collapseInnerTokens()(_tokens)(_rest)))})})())))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()(_op)((function(){var $m; return (function(){return $m || ($m = (_collapseInner2()(_tokens)(_2nd)(_3rd)(_rest)))})})())))})})());});
  _isOperator = Parse.define('isOperator', (function() {var f; return function _isOperator(){return f || (f = (function(_tokens){return function(_tok){return _$y()((function(){var $m; return (function(){return $m || ($m = (_getPrecedence()((function(){return 0}))(_tok)(_tokens)))})})())((function(){var $m; return (function(){return $m || ($m = (_length()(_tokens)))})})());};}));}})(), 2, "\\tokens tok . < (getPrecedence 0 tok tokens) (length tokens)");;
  _collapseFirstTokens = Parse.define('collapseFirstTokens', (function() {var f; return function _collapseFirstTokens(){return f || (f = (function(_tokens){return function(_list){return _list();};}));}})(), 2, "\\tokens list . list");;
  _collapseFirstTokens = Leisure.makeDispatchFunction('collapseFirstTokens', '_collapseFirstTokens', '_list', ['_collapseFirstTokens', '_tokens', '_list']);
Leisure.createMethod('cons', 'collapseFirstTokens', "\\tokens list       . null? (tail list)\n  list\n  collapseFirstTokens1 tokens (head list) (head (tail list)) (tail (tail list))\n    id\n    list", function(_tokens, _list) {return _null$e()((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())(_list)((function(){var $m; return (function(){return $m || ($m = (_collapseFirstTokens1()(_tokens)((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())((function(){var $m; return (function(){return $m || ($m = (_head()((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_tail()((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())))})})())(_id)(_list)))})})());});
  _collapseFirstTokens1 = Parse.define('collapseFirstTokens1', (function() {var f; return function _collapseFirstTokens1(){return f || (f = (function(_tokens){return function(_op){return function(_next){return function(_rest){return _none();};};};}));}})(), 4, "\\tokens op next rest . none");;
  _collapseFirstTokens1 = Leisure.makeDispatchFunction('collapseFirstTokens1', '_collapseFirstTokens1', '_op', ['_collapseFirstTokens1', '_tokens', '_op', '_next', '_rest']);
Leisure.createMethod('token', 'collapseFirstTokens1', "\\tokens op        next rest . isOperator tokens op\n  collapseFirstTokens2 tokens op next rest\n  none", function(_tokens, _op, _next, _rest) {return _isOperator()(_tokens)(_op)((function(){var $m; return (function(){return $m || ($m = (_collapseFirstTokens2()(_tokens)(_op)(_next)(_rest)))})})())(_none);});
  _collapseFirstTokens2 = Parse.define('collapseFirstTokens2', (function() {var f; return function _collapseFirstTokens2(){return f || (f = (function(_tokens){return function(_op){return function(_next){return function(_rest){return _none();};};};}));}})(), 4, "\\tokens op next rest . none");;
  _collapseFirstTokens2 = Leisure.makeDispatchFunction('collapseFirstTokens2', '_collapseFirstTokens2', '_next', ['_collapseFirstTokens2', '_tokens', '_op', '_next', '_rest']);
Leisure.createMethod('token', 'collapseFirstTokens2', "\\tokens op next        rest . adjacent op next\n  some [(collapseTokens op next) | rest]\n  none", function(_tokens, _op, _next, _rest) {return _adjacent()(_op)(_next)((function(){var $m; return (function(){return $m || ($m = (_some()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_collapseTokens()(_op)(_next)))})})())(_rest)))})})())))})})())(_none);});
  _adjacent = Parse.define('adjacent', (function() {var f; return function _adjacent(){return f || (f = (function(_tok1){return function(_tok2){return _eq()((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){var $m; return (function(){return $m || ($m = (_tokenStart()(_tok1)))})})())((function(){var $m; return (function(){return $m || ($m = (_strlen()((function(){var $m; return (function(){return $m || ($m = (_tokenName()(_tok1)))})})())))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_tokenStart()(_tok2)))})})());};}));}})(), 2, "\\tok1 tok2 . eq (+ (tokenStart tok1) (strlen (tokenName tok1))) (tokenStart tok2)");;
  _collapseTokens = Parse.define('collapseTokens', (function() {var f; return function _collapseTokens(){return f || (f = (function(_tok1){return function(_tok2){return _token()((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_tokenName()(_tok1)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_tokenName()(_tok2)))})})())(_nil)))})})())))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_tokenStart()(_tok1)))})})());};}));}})(), 2, "\\tok1 tok2 . token concat[(tokenName tok1) (tokenName tok2)] (tokenStart tok1)");;
  _printOperators = Parse.define('printOperators', (function _printOperators() {return ((_bind()(_getParseFilterInfo)((function(){var $m; return (function(){return $m || ($m = (function(_defs){return _print()((function(){var $m; return (function(){return $m || ($m = (_assocGetWithDefault()((function(){return "infix"}))(_nil)(_defs)))})})());}))})})())));}), 0, "do\n  defs <- getParseFilterInfo\n  print (assocGetWithDefault 'infix' nil defs)");;
  _parseInfixList = Parse.define('parseInfixList', (function() {var f; return function _parseInfixList(){return f || (f = (function(_tokens){return function(_firstList){return function(_token){return function(_restList){return function(_fullList){return function(_op){return function(_nextTok){return function(_nextRest){return function(_prec){return function(_nextPrec){return function(_nextParsed){return _null$e()(_tokens)(_fullList)((function(){var $m; return (function(){return $m || ($m = (_null$e()(_restList)((function(){var $m; return (function(){return $m || ($m = (_parseInfixList()((function(){var $m; return (function(){return $m || ($m = (_tail()(_tokens)))})})())(_dlempty)((function(){var $m; return (function(){return $m || ($m = (_head()(_fullList)))})})())((function(){var $m; return (function(){return $m || ($m = (_tail()(_fullList)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_eq()(_prec)((function(){var $m; return (function(){return $m || ($m = (_length()(_tokens)))})})())((function(){var $m; return (function(){return $m || ($m = (_parseInfixList()(_tokens)((function(){var $m; return (function(){return $m || ($m = (_dlPush()(_firstList)(_token)))})})())(_op)((function(){var $m; return (function(){return $m || ($m = (_tail()(_restList)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_null$e()((function(){var $m; return (function(){return $m || ($m = (_tail()(_restList)))})})())((function(){var $m; return (function(){return $m || ($m = (_error()((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "Parse error -- expected token after operator: "}))((function(){var $m; return (function(){return $m || ($m = (_cons()(_op)(_nil)))})})())))})})())))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_$y()(_prec)(_nextPrec)((function(){var $m; return (function(){return $m || ($m = (_parseInfixList()(_tokens)(_firstList)((function(){var $m; return (function(){return $m || ($m = (_cons()(_op)((function(){var $m; return (function(){return $m || ($m = (_cons()(_token)((function(){var $m; return (function(){return $m || ($m = (_cons()(_nextTok)(_nil)))})})())))})})())))})})())(_nextRest)))})})())((function(){var $m; return (function(){return $m || ($m = (_parseInfixList()(_tokens)(_firstList)((function(){var $m; return (function(){return $m || ($m = (_cons()(_op)((function(){var $m; return (function(){return $m || ($m = (_cons()(_token)((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_head()(_nextParsed)))})})())(_nil)))})})())))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_tail()(_nextParsed)))})})())))})})())))})})())))})})())))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_parseInfixList()(_tokens)(_dlempty)(_nextTok)(_nextRest)))})})());}((function(){var $m; return (function(){return $m || ($m = (_or()((function(){var $m; return (function(){return $m || ($m = (_null$e()(_restList)))})})())((function(){var $m; return (function(){return $m || ($m = (_or()((function(){var $m; return (function(){return $m || ($m = (_null$e()((function(){var $m; return (function(){return $m || ($m = (_tail()(_restList)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_null$e()(_nextRest)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_length()(_tokens)))})})())((function(){var $m; return (function(){return $m || ($m = (_getPrecedence()((function(){return 0}))((function(){var $m; return (function(){return $m || ($m = (_head()(_nextRest)))})})())(_tokens)))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_getPrecedence()((function(){return 0}))(_op)(_tokens)))})})());}((function(){var $m; return (function(){return $m || ($m = (_tail()((function(){var $m; return (function(){return $m || ($m = (_tail()(_restList)))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_head()((function(){var $m; return (function(){return $m || ($m = (_tail()(_restList)))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_head()(_restList)))})})());}((function(){var $m; return (function(){return $m || ($m = (_firstList()((function(){var $m; return (function(){return $m || ($m = (_cons()(_token)(_restList)))})})())))})})());};};};}));}})(), 4, "\\tokens firstList token restList . do\n  fullList = firstList [token | restList]\n  op = head restList\n  nextTok = head (tail restList)\n  nextRest = tail (tail restList)\n  prec = getPrecedence 0 op tokens\n  nextPrec = or (null? restList) (or (null? (tail restList)) (null? nextRest))\n    length tokens\n    getPrecedence 0 (head nextRest) tokens\n  nextParsed = parseInfixList tokens dlempty nextTok nextRest\n  null? tokens\n    fullList\n    null? restList\n      parseInfixList (tail tokens) dlempty (head fullList) (tail fullList)\n      eq prec (length tokens)\n        parseInfixList tokens (dlPush firstList token) op (tail restList)\n        null? (tail restList)\n          error concat['Parse error -- expected token after operator: ' op]\n          < prec nextPrec\n            parseInfixList tokens firstList [op token nextTok] nextRest\n            parseInfixList tokens firstList [op token (head nextParsed)] (tail nextParsed)");;
  _getPrecedence = Parse.define('getPrecedence', (function() {var f; return function _getPrecedence(){return f || (f = (function(_index){return function(_op){return function(_tokens){return _any()((function(){var $m; return (function(){return $m || ($m = (_eq()((function(){var $m; return (function(){return $m || ($m = (_tokString()(_op)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_head()(_tokens)))})})())(_index)((function(){var $m; return (function(){return $m || ($m = (_getPrecedence()((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){return 1}))(_index)))})})())(_op)((function(){var $m; return (function(){return $m || ($m = (_tail()(_tokens)))})})())))})})());};};}));}})(), 3, "\\index op tokens . any (eq (tokString op)) (head tokens)\n  index\n  getPrecedence (+ 1 index) op (tail tokens)");;
  _getPrecedence = Leisure.makeDispatchFunction('getPrecedence', '_getPrecedence', '_tokens', ['_getPrecedence', '_index', '_op', '_tokens']);
Leisure.createMethod('nil', 'getPrecedence', "\\index op tokens      . index", function(_index, _op, _tokens) {return _index();});
  _operatorIn = Parse.define('operatorIn', (function() {var f; return function _operatorIn(){return f || (f = (function(_op){return function(_tokens){return function(_opEq){return _any()((function(){var $m; return (function(){return $m || ($m = (function(_toks){return _any()(_opEq)(_toks);}))})})())(_tokens);}((function(){var $m; return (function(){return $m || ($m = (_eq()((function(){var $m; return (function(){return $m || ($m = (_tokString()(_op)))})})())))})})());};}));}})(), 2, "\\op tokens . do\n  opEq = eq (tokString op)\n  any (\\toks . any opEq toks) tokens");;
})
.andThen(function(){ return   (function(_x){return _bind()((function(){var $m; return (function(){return $m || ($m = (_defInfixToken()((function(){return "*"}))((function(){return "before"}))(_nil)))})})())((function(){var $m; return (function(){return $m || ($m = (function(__){return _bind()((function(){var $m; return (function(){return $m || ($m = (_defInfixToken()((function(){return "/"}))((function(){return "at"}))((function(){return "*"}))))})})())((function(){var $m; return (function(){return $m || ($m = (function(__){return _bind()((function(){var $m; return (function(){return $m || ($m = (_defInfixToken()((function(){return "+"}))((function(){return "at"}))(_nil)))})})())((function(){var $m; return (function(){return $m || ($m = (function(__){return _bind()((function(){var $m; return (function(){return $m || ($m = (_defInfixToken()((function(){return "-"}))((function(){return "at"}))((function(){return "+"}))))})})())((function(){var $m; return (function(){return $m || ($m = (function(__){return _bind()((function(){var $m; return (function(){return $m || ($m = (_defInfixToken()((function(){return "<"}))((function(){return "at"}))(_nil)))})})())((function(){var $m; return (function(){return $m || ($m = (function(__){return _bind()((function(){var $m; return (function(){return $m || ($m = (_defInfixToken()((function(){return ">"}))((function(){return "at"}))(_nil)))})})())((function(){var $m; return (function(){return $m || ($m = (function(__){return function(_x){return _bind()((function(){var $m; return (function(){return $m || ($m = (_addParseFilter()(_mainParseInfix)))})})())((function(){var $m; return (function(){return $m || ($m = (function(__){return _bind()((function(){var $m; return (function(){return $m || ($m = (_forward()((function(){return "getURI"}))))})})())((function(){var $m; return (function(){return $m || ($m = (function(__){return _bind()((function(){var $m; return (function(){return $m || ($m = (_forward()((function(){return "setURI"}))))})})())((function(){var $m; return (function(){return $m || ($m = (function(__){return _bind()((function(){var $m; return (function(){return $m || ($m = (_forward()((function(){return "getDocument"}))))})})())((function(){var $m; return (function(){return $m || ($m = (function(__){return _forward()((function(){return "replaceDocument"}));}))})})());}))})})());}))})})());}))})})());}((function(){var $m; return (function(){return $m || ($m = (_log()((function(){return "filter"}))((function(){return 2}))))})})());}))})})());}))})})());}))})})());}))})})());}))})})());}))})})());}((function(){var $m; return (function(){return $m || ($m = (_log()((function(){return "infix"}))((function(){return 1}))))})})()))})
.andThen(function(){
  _save = Parse.define('save', (function _save() {return ((_bind()(_getURI)((function(){var $m; return (function(){return $m || ($m = (function(_uri){return _bind()(_getDocument)((function(){var $m; return (function(){return $m || ($m = (function(_doc){return _write()(_uri)(_doc);}))})})());}))})})())));}), 0, "do\n  uri <- getURI\n  doc <- getDocument\n  write uri doc");;
  _saveAs = Parse.define('saveAs', (function() {var f; return function _saveAs(){return f || (f = (function(_newUri){return _bind()(_getDocument)((function(){var $m; return (function(){return $m || ($m = (function(_doc){return _write()(_newUri)(_doc);}))})})());}));}})(), 1, "\\newUri . do\n  doc <- getDocument\n  write newUri doc");;
  _open = Parse.define('open', (function() {var f; return function _open(){return f || (f = (function(_uri){return _bind()((function(){var $m; return (function(){return $m || ($m = (_read()(_uri)))})})())((function(){var $m; return (function(){return $m || ($m = (function(_contents$e){return _contents$e()((function(){var $m; return (function(){return $m || ($m = (function(_data){return _bind()((function(){var $m; return (function(){return $m || ($m = (_setURI()(_uri)))})})())((function(){var $m; return (function(){return $m || ($m = (function(__){return _replaceDocument()(_data);}))})})());}))})})())((function(){var $m; return (function(){return $m || ($m = (function(_err){return _print()((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "Error: "}))((function(){var $m; return (function(){return $m || ($m = (_cons()(_err)(_nil)))})})())))})})())))})})());}))})})());}))})})());}));}})(), 1, "\\uri . do\n  contents? <- read uri\n  contents?\n    \\data. do\n      setURI uri\n      replaceDocument data\n    \\err . print concat['Error: ' err]");;

});
if (typeof window != 'undefined') Prim.runMonad(module.exports, Prim.defaultEnv, function(){});
}).call(this);

/*
# use an element as a Leisure notebook
*/

(function() {
  var BS, DEL, DOWN_ARROW, END, ENTER, ESC, HOME, LEFT_ARROW, Leisure, PAGE_DOWN, PAGE_UP, Prim, RIGHT_ARROW, Repl, ReplCore, TAB, UP_ARROW, Xus, acceptCode, addBoxClasses, addDefControls, addsLine, allowEvents, arrows, autoRun, baseElements, basePresentValue, baseStrokeWidth, bindAll, bindNotebook, bootNotebook, box, boxClasses, buttonClasses, c, changeTheme, changeView, checkDeleteExpr, checkHideSource, checkMutateFromModification, cleanEmptyNodes, cleanOutput, clearAst, clearOutputBox, clearUpdates, clickTest, closeWindow, codeBox, codeFocus, codeSpan, configureSaveLink, continueRangePosition, createFragment, createNode, createPeer, createSlider, debug, delay, docFocus, envFor, evalBox, evalDoc, evalDocCode, evalDocCodeOld, evalOutput, filename, findCurrentCodeHolder, findDefs, findUpdateSelector, focusBox, getAst, getBox, getElementCode, getElements, getExprSource, getMDDocument, getMaxStrokeWidth, getRangePosition, getRangeText, getRanges, getSvgElement, grp, handleKey, hasFunc, hasMonadOutput, head, hideControlSection, hideOutputSource, hideSlider, highlightNotebookFunction, highlightPosition, id, ignoreDeleteOutputBox, initNotebook, insertControls, isDef, isLeisureCode, isOutput, isSlider, laz, leisureContextString, linkSource, loadProgram, loaded, makeId, makeLabel, makeOption, makeOutputBox, makeOutputControls, makeRange, makeTestBox, makeTestCase, markPartialApplies, markupButton, markupButtons, markupDefs, mergeLeisureCode, nextId, nextSibling, nodeEnd, nodeFor, nonprintable, numberEnd, numberStart, oldBrackets, owner, patchFuncAst, peer, peerGetDocument, peerGetFunctions, peerNotifySelection, postLoadQueue, prepExpr, presentLeisureCode, presentValue, previousBoxRangeInternal, previousBoxRangeStart, previousSibling, primSvgMeasure, primconcatNodes, printable, printableControlCharacters, processLine, psgn, queueAfterLoad, remove, removeBoxClasses, removeOldDefs, replaceContents, replaceRange, replicate, req, root, runTest, runTests, saveProgram, setAst, setFilename, setMinMax, setSnapper, setUpdate, showAst, showError, showFilename, showFilenames, showOutputSource, showResult, showSliderButton, showSource, skipLeftOverOutputBox, slider, snapshot, svgBetterMeasure, svgMeasure, svgMeasureText, tail, testPat, textNode, toDefBox, toExprBox, toggleEdit, transformStrokeWidth, transformedPoint, unwrap, update, updatePat, wrapRange, xusEnv, _ref,
    __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __slice = Array.prototype.slice;

  if ((typeof window !== "undefined" && window !== null) && (!(typeof global !== "undefined" && global !== null) || global === window)) {
    root = (_ref = window.Notebook) != null ? _ref : (window.Notebook = {});
    window.global = window;
    Leisure = window.Leisure;
    ReplCore = window.ReplCore;
    Prim = window.Prim;
    Repl = window.Repl;
    Xus = window.Xus;
    Prim.defaultEnv.fileSettings.uri = new Prim.URI(document.location.href);
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
  }

  debug = false;

  BS = 8;

  TAB = 9;

  ENTER = 13;

  ESC = 27;

  PAGE_UP = 33;

  PAGE_DOWN = 34;

  END = 35;

  HOME = 36;

  LEFT_ARROW = 37;

  UP_ARROW = 38;

  RIGHT_ARROW = 39;

  DOWN_ARROW = 40;

  DEL = 46;

  arrows = [37, 38, 39, 40];

  updatePat = /(^|\n)(#@update )([^\n]+)(?:^|\n)/;

  peer = null;

  nextId = 0;

  filename = null;

  snapshot = function snapshot(el, pgm) {};

  setSnapper = function setSnapper(snapFunc) {
    return snapshot = snapFunc;
  };

  delay = function delay(func) {
    return window.setTimeout(func, 1);
  };

  basePresentValue = null;

  presentValue = function presentValue(v) {
    var content;
    if ((ReplCore.getType(v)) === 'svgNode') {
      content = v(laz(id));
      return _svgPresent()(laz(content))(laz(id));
    } else {
      return basePresentValue(v);
    }
  };

  bootNotebook = function bootNotebook(el) {
    if (!((document.getElementById('channelList')) != null)) {
      document.body.appendChild(createNode("<datalist id='channelList'>\n   <option value=''></option>\n   <option value='app'>app</option>\n   <option value='compile'>compile</option>\n   <option value='editorFocus'>editorFocus</option>\n</datalist>"));
    }
    return createPeer();
  };

  closeWindow = function closeWindow() {
    console.log("CLOSING WINDOW");
    window.open('', '_self', '');
    return window.close();
  };

  createPeer = function createPeer() {
    var k, param, params, server, v, _i, _len, _ref2, _ref3;
    root.xusServer = server = new Xus.Server();
    server.exit = function exit() {
      return closeWindow();
    };
    peer = root.peer = Xus.createDirectPeer(server);
    peer.server = server;
    peer.listen('leisure/selection/contents', true, function(key, value) {
      var node, r, s;
      if (key === 'leisure/selection/contents') {
        s = window.getSelection();
        if (s.rangeCount && s.toString() !== value) {
          r = s.getRangeAt(0);
          r.deleteContents();
          node = textNode(value.toString());
          r.insertNode(node);
          s.removeAllRanges();
          r.selectNode(node);
          return s.addRange(r);
        }
      }
    });
    peer.set('leisure/evalExpr', null, 'transient');
    peer.listen('leisure/evalExpr', false, function(key, value) {
      var env, expr, result;
      if (key === 'leisure/evalExpr' && (value != null)) {
        expr = value[0], result = value[1];
        console.log("EVAL: " + expr + ", RESULT: " + result);
        env = xusEnv(result, expr);
        return processLine(expr, env, 'Parse.', function() {
          return typeof env.cleanup === "function" ? env.cleanup() : void 0;
        });
      }
    });
    peer.set('leisure/document', peerGetDocument);
    peer.set('leisure/functions', peerGetFunctions);
    peer.set('leisure/storage', []);
    if (Boot.documentFragment) {
      params = {};
      _ref2 = Boot.documentFragment.substring(1).split('&');
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        param = _ref2[_i];
        _ref3 = param.split('='), k = _ref3[0], v = _ref3[1];
        params[k.toLowerCase()] = decodeURIComponent(v);
      }
      if (params.xusproxy != null) return Xus.xusToProxy(server, params.xusproxy);
    }
  };

  replaceContents = function replaceContents(uri, contents) {
    if (!contents) {
      contents = uri;
      uri = null;
    }
    if (uri) setFilename(uri.toString());
    document.body.setAttribute('doc', '');
    window.leisureAutoRunAll = true;
    window.markup(contents);
    return bindAll();
  };

  bindAll = function bindAll() {
    var node, _i, _len, _ref2;
    _ref2 = document.querySelectorAll("[leisurenode='code']");
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      node = _ref2[_i];
      node.setAttribute('contentEditable', 'true');
      bindNotebook(node);
      changeTheme(node, 'thin');
      evalDoc(node);
    }
    return showFilenames();
  };

  xusEnv = function xusEnv(resultVar, expr) {
    var env, result;
    result = '';
    env = Prim.initFileSettings({
      debug: debug,
      finishedEvent: function finishedEvent() {},
      owner: null,
      require: req,
      write: function write(msg) {
        return result += "" + msg + "\n";
      },
      prompt: function prompt(msg, cont) {
        return result += "Attempt to prompt with " + msg;
      },
      processResult: function processResult(res, ast) {
        result += res;
        return peer.set(resultVar, JSON.stringify(result));
      },
      presentValue: function presentValue(x) {
        return x;
      },
      processError: function processError(ast) {
        result += ast.err.leisureContext ? "ERROR: " + ast.err + ":\n" + (leisureContextString(ast.err)) + "\n" + ast.err.stack : "Couldn't parse: " + expr;
        return peer.set(resultVar, result);
      }
    });
    env.__proto__ = Prim.defaultEnv;
    env.fileSettings.uri = new Prim.URI(document.location.href);
    return env;
  };

  peerGetDocument = function peerGetDocument() {
    var nodes;
    nodes = document.querySelectorAll("[leisurenode='code']");
    if (nodes.length > 1 || Notebook.md) {
      return getMDDocument();
    } else {
      return getSimpleDocument();
    }
  };

  peerGetFunctions = function peerGetFunctions() {
    return (_.uniq(window.leisureFuncNames.toArray().sort(), true)).sort();
  };

  getMDDocument = function getMDDocument() {
    var md, node, _i, _len, _ref2, _ref3;
    md = '';
    _ref2 = document.querySelectorAll('[doc] [leisureNode]');
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      node = _ref2[_i];
      md += isLeisureCode(node) ? "```\n" + (getElementCode(node)) + "\n```\n" : (_ref3 = node.md) != null ? _ref3 : '';
    }
    return md;
  };

  makeId = function makeId(el) {
    if (!el.id) return el.id = "Leisure-" + (nextId++);
  };

  allowEvents = true;

  bindNotebook = function bindNotebook(el) {
    if (!basePresentValue) {
      basePresentValue = Prim.defaultEnv.presentValue;
      Prim.defaultEnv.presentValue = presentValue;
      Prim.defaultEnv.write = function write(msg) {
        return console.log(msg);
      };
      Prim.defaultEnv.owner = document.body;
      Prim.defaultEnv.finishedEvent = function finishedEvent(evt, channel) {
        return update(channel != null ? channel : 'app', Prim.defaultEnv);
      };
      Prim.defaultEnv.debug = debug;
    }
    if (!(el.bound != null)) {
      makeId(el);
      el.bound = true;
      el.addEventListener('DOMCharacterDataModified', (function(evt) {
        if (allowEvents && !el.replacing) {
          return delay(function() {
            return checkMutateFromModification(evt);
          });
        }
      }), true);
      el.addEventListener('DOMSubtreeModified', (function(evt) {
        if (allowEvents && !el.replacing) {
          return delay(function() {
            return checkMutateFromModification(evt);
          });
        }
      }), true);
      el.addEventListener('mousedown', (function(e) {
        if (!isSlider(e.srcElement)) {
          return delay(function() {
            return highlightPosition(e);
          });
        }
      }), true);
      el.addEventListener('mousemove', (function(e) {
        if (!isSlider(e.srcElement)) {
          return delay(function() {
            return highlightPosition(e);
          });
        }
      }), true);
      el.addEventListener('mouseup', (function(e) {
        if (!isSlider(e.srcElement)) {
          return delay(function() {
            return highlightPosition(e);
          });
        }
      }), true);
      el.addEventListener('keydown', function(e) {
        var c, r, s;
        c = e.charCode || e.keyCode || e.which;
        if (c === DEL || c === BS) {
          s = window.getSelection();
          r = s.getRangeAt(0);
          if (c === BS) {
            checkDeleteExpr(getBox(r.startContainer));
            if (skipLeftOverOutputBox(el, r)) return e.preventDefault();
          } else if (c === DEL) {
            checkDeleteExpr(getBox(r.startContainer));
            if (ignoreDeleteOutputBox(el, r)) return e.preventDefault();
          }
        }
        if (printable(c)) clearAst(getBox(window.getSelection().focusNode));
        if ((__indexOf.call(arrows, c) >= 0) || printable(c)) {
          delay(function() {
            return highlightPosition(e);
          });
        }
        if (e.ctrlKey && c === ENTER) {
          return handleKey("C-ENTER");
        } else if (e.altKey && c === ENTER) {
          return handleKey("M-ENTER");
        } else if (c === TAB) {
          handleKey("TAB");
          return e.preventDefault();
        }
      });
      el.addEventListener('keypress', function(e) {
        var br, bx, r, s, sp;
        s = window.getSelection();
        r = s.getRangeAt(0);
        if ((e.charCode || e.keyCode || e.which) === ENTER) {
          br = textNode('\n');
          r.insertNode(br);
          r = document.createRange();
          r.setStart(br, 1);
          s.removeAllRanges();
          s.addRange(r);
          return e.preventDefault();
        } else if (r.startContainer.parentNode === el) {
          sp = codeSpan('\n', 'codeExpr');
          sp.setAttribute('generatedNL', '');
          bx = box(s.getRangeAt(0), 'codeMainExpr', true);
          bx.appendChild(sp);
          makeOutputBox(bx);
          r = document.createRange();
          r.setStart(sp, 0);
          s.removeAllRanges();
          return s.addRange(r);
        }
      });
      el.addEventListener('focus', (function() {
        if (allowEvents) return findCurrentCodeHolder();
      }), true);
      el.addEventListener('blur', (function() {
        if (allowEvents) return findCurrentCodeHolder();
      }), true);
      if (window.leisureAutoRunAll) {
        autoRun(el, true);
        return window.setTimeout((function() {
          return runTests(el);
        }), 1);
      } else {
        return el.autorunState = false;
      }
    }
  };

  checkDeleteExpr = function checkDeleteExpr(node) {
    var out;
    if (isOutput(node && node.output)) {
      out = node.output;
      return window.setTimeout((function() {
        if (!node.textContent.trim()) node.parentNode.removeChild(node);
        if (!(node.parentNode != null) && ((out != null ? out.parentNode : void 0) != null)) {
          return out.parentNode.removeChild(out);
        }
      }), 1);
    }
  };

  skipLeftOverOutputBox = function skipLeftOverOutputBox(el, r) {
    var box, s;
    el.normalize();
    box = previousBoxRangeInternal(r) || previousBoxRangeStart(r);
    if (isOutput(box)) {
      s = window.getSelection();
      r.selectNode(box);
      r.collapse(true);
      s.removeAllRanges();
      s.addRange(r);
      return true;
    } else {
      return false;
    }
  };

  previousBoxRangeInternal = function previousBoxRangeInternal(r) {
    return r.startContainer.nodeType === 1 && r.startOffset > 0 && r.startContainer.childNodes[r.startOffset - 1];
  };

  previousBoxRangeStart = function previousBoxRangeStart(r) {
    return r.startContainer.nodeType === 3 && r.startOffset === 0 && previousSibling(r.startContainer);
  };

  ignoreDeleteOutputBox = function ignoreDeleteOutputBox(el, r) {
    var n;
    el.normalize();
    if (r.startContainer.nodeType === 3 && r.startOffset === r.startContainer.length) {
      n = r.startContainer;
      while (n && n.nextSibling === null) {
        n = n.parentNode;
      }
      return isOutput(n != null ? n.nextSibling : void 0);
    } else {
      return false;
    }
  };

  isOutput = function isOutput(el) {
    return (el != null ? el.nodeType : void 0) === 1 && el.hasAttribute('LeisureOutput');
  };

  isLeisureCode = function isLeisureCode(el) {
    return (el != null ? el.nodeType : void 0) === 1 && el.getAttribute('leisureNode') === 'code';
  };

  peerNotifySelection = function peerNotifySelection(el, str) {
    peer.set('leisure/selection/id', (el ? el.id : null));
    return peer.set('leisure/selection/contents', str);
  };

  printableControlCharacters = (function() {
    var _i, _len, _ref2, _results;
    _ref2 = "\r\i\n\b";
    _results = [];
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      c = _ref2[_i];
      _results.push(c.charCodeAt(0));
    }
    return _results;
  })();

  printable = function printable(code) {
    return (code > 0xf && code < 37) || code > 40 || __indexOf.call(printableControlCharacters, code) >= 0;
  };

  nonprintable = null;

  (function() {
    var i, s;
    s = '';
    for (i = 0; 0 <= 0xf ? i <= 0xf : i >= 0xf; 0 <= 0xf ? i++ : i--) {
      s += String.fromCharCode(i);
    }
    s.replace(/[\i\r\f]/g, '');
    return nonprintable = new RegExp("[" + s + "]");
  })();

  handleKey = function handleKey(key) {
    var box;
    switch (key) {
      case "C-ENTER":
      case "TAB":
        box = getBox(window.getSelection().focusNode);
        if ((box.getAttribute('codeMainExpr')) != null) {
          return evalOutput(box.output);
        } else if ((box.getAttribute('codeMain')) != null) {
          return acceptCode(box);
        }
        break;
      case "M-ENTER":
        box = getBox(window.getSelection().focusNode);
        if ((box.getAttribute('codeMainExpr')) != null) {
          return clearOutputBox(box.output);
        }
    }
  };

  clearAst = function clearAst(box) {
    var cbox;
    cbox = getBox(box);
    return cbox != null ? cbox.ast = null : void 0;
  };

  oldBrackets = [null, Parse.Nil];

  cleanEmptyNodes = function cleanEmptyNodes(el) {
    var next, prev, _ref2;
    if (el.nodeType === 3 && (el.parentNode != null)) {
      return cleanEmptyNodes(el.parentNode);
    } else {
      prev = el.previousSibling;
      next = el.nextSibling;
      if (el.nodeType === 1 && el.textContent.trim() === '' && ((_ref2 = el.parentNode) != null ? _ref2.hasAttribute('doc') : void 0)) {
        el.parentNode.removeChild(el);
      }
      if (next === nextSibling(prev)) return mergeLeisureCode(prev, next);
    }
  };

  presentLeisureCode = function presentLeisureCode(node, doEval) {
    node.setAttribute('contentEditable', 'true');
    Notebook.bindNotebook(node);
    Notebook.changeTheme(node, 'thin');
    if (doEval) {
      return Notebook.evalDoc(node);
    } else {
      return Notebook.initNotebook(node);
    }
  };

  mergeLeisureCode = function mergeLeisureCode(el1, el2) {
    var newCode, r;
    if (el1 && el2) {
      if (el1.nodeType === 1 && el2.nodeType === 3) {
        el1.appendChild(el2);
        return el1.normalize();
      } else if (el1.nodeType === 3 && el2.nodeType === 1) {
        el2.insertBefore(el1, el2.firstChild);
        return el2.normalize();
      } else if (el1.hasAttribute('leisureNode') && el1.getAttribute('leisureNode') === el2.getAttribute('leisureNode')) {
        newCode = textNode(el1.md = el1.getAttribute('leisureNode') === 'code' ? "" + (getElementCode(el1)) + "\n" + (getElementCode(el2)) : "" + el1.md + "\n" + el2.md);
        r = document.createRange();
        r.selectNodeContents(el2);
        el1.appendChild(textNode('\n'));
        el1.appendChild(r.extractContents());
        return el2.parentNode.removeChild(el2);
      }
    }
  };

  highlightPosition = function highlightPosition(e) {
    var ast, b, brackets, changed, i, node, offset, parent, pos, r, ranges, s, span, _i, _j, _len, _len2, _len3, _ref2, _ref3, _ref4, _ref5, _ref6;
    parent = null;
    s = window.getSelection();
    if (s.rangeCount) {
      if (cleanEmptyNodes(s.getRangeAt(0).startContainer)) return;
      focusBox(s.focusNode);
      parent = getBox(s.focusNode);
      if ((_ref2 = s.getRangeAt(0)) != null ? _ref2.collapsed : void 0) {
        if (!parent || isOutput(parent)) return;
        if (parent.parentNode && (ast = getAst(parent))) {
          offset = (_ref3 = ast.leisureCodeOffset) != null ? _ref3 : 0;
          r = s.getRangeAt(0);
          r.setStart(parent, 0);
          pos = getRangeText(r).length;
          changed = false;
          if (false) {
            brackets = Leisure.bracket(ast.leisureBase, pos - offset);
            if (oldBrackets[0] !== parent || !oldBrackets[1].equals(brackets)) {
              oldBrackets = [parent, brackets];
              _ref4 = document.querySelectorAll("[LeisureBrackets]");
              for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
                node = _ref4[_i];
                unwrap(node);
              }
              _ref5 = parent.querySelectorAll(".partialApply");
              for (_j = 0, _len2 = _ref5.length; _j < _len2; _j++) {
                node = _ref5[_j];
                unwrap(node);
              }
              parent.normalize();
              markPartialApplies(parent);
              b = brackets;
              ranges = [];
              while (b !== Parse.Nil) {
                ranges.push(makeRange(parent, b.head().head() + offset, b.head().tail().head() + offset));
              }
              b = b.tail();
              for (i = 0, _len3 = ranges.length; i < _len3; i++) {
                r = ranges[i];
                span = document.createElement('span');
                span.setAttribute('LeisureBrackets', '');
                span.setAttribute('class', i === 0 ? 'LeisureFunc' : 'LeisureArg');
                wrapRange(r, span);
              }
              changed = true;
            }
          }
          if (e instanceof KeyboardEvent) {
            if (hideSlider()) pos += 1;
          } else if (e instanceof MouseEvent && e.type === 'mousedown' && (e.target === parent || parent.contains(e.target)) && showSliderButton(parent, pos, e)) {
            changed = true;
            pos += 1;
          }
          if (changed) {
            window.EVT = e;
            s.removeAllRanges();
            s.addRange(makeRange(parent, pos));
          }
        }
      }
      if ((parent != null ? (_ref6 = parent.ast) != null ? _ref6.leisureName : void 0 : void 0) != null) {
        update("sel-" + parent.ast.leisureName);
      }
      return peerNotifySelection(parent, s.toString());
    }
  };

  numberEnd = /(?:^|.*[^0-9.])([0-9]+\.?[0-9]*|\.[0-9]*)$/;

  numberStart = /^([0-9]+\.[0-9]+|[0-9]+|\.[0-9]+)/;

  slider = [];

  showSliderButton = function showSliderButton(parent, pos, e) {
    var changed, len, m, oldPos, r, sParent, sPos, sValue, span, text;
    if (slider.length) {
      hideSlider();
      return false;
    } else {
      text = parent.textContent;
      oldPos = pos;
      changed = 0;
      if (m = text.substring(0, pos).match(numberEnd)) pos -= m[1].length;
      if (m = text.substring(pos).match(numberStart)) {
        len = m[1].length;
        if (oldPos <= pos + len) {
          sParent = slider[0], sPos = slider[1], sValue = slider[2];
          if (parent !== sParent || pos !== sPos || m[1] !== sValue) {
            hideSlider();
            r = makeRange(parent, pos, pos + m[1].length);
            span = createNode("<span class='leisureRangeNumber ui-widget-content'></span>");
            wrapRange(r, span);
            changed = 1;
            span.normalize();
            slider = [parent, pos, m[1], span];
            createSlider();
          }
        }
        return changed;
      } else {
        return hideSlider();
      }
    }
  };

  isSlider = function isSlider(el) {
    while (el !== document) {
      if (el.hasAttribute('slider')) return true;
      el = el.parentNode;
    }
    return false;
  };

  createSlider = function createSlider() {
    var d, div, inside, max, min, parent, pos, sl, sliding, span, value;
    parent = slider[0], pos = slider[1], value = slider[2], span = slider[3], div = slider[4];
    if (div) return;
    inside = false;
    sliding = false;
    d = createNode("<div style='z-index: 1; position: absolute; width: 200px; background: white; border: solid green 1px' slider contentEditable='false'></div>");
    slider.push(d);
    d.style.top = "" + (span.offsetTop + span.offsetHeight + 5) + "px";
    d.style.minTop = '0px';
    d.style.left = "" + (Math.max(0, (span.offsetLeft + span.offsetWidth) / 2 - 100)) + "px";
    d.addEventListener('mouseover', function(e) {
      if (!inside) return inside = true;
    });
    d.addEventListener('mouseout', function(e) {
      if (e.toElement !== d && !d.contains(e.toElement)) {
        inside = false;
        if (!sliding) return hideSlider();
      }
    });
    value = Number(value);
    min = value < 0 ? value * 2 : value / 2;
    max = value === 0 ? 10 : value * 2;
    sl = $(d).slider({
      animate: 'fast',
      start: function start() {
        sliding = true;
        return delay(function() {
          return allowEvents = false;
        });
      },
      stop: function stop(event, ui) {
        setMinMax(sl);
        allowEvents = true;
        sliding = false;
        if (!inside) return hideSlider();
      },
      slide: function slide(event, ui) {
        var ast;
        if (span.firstChild) span.firstChild.nodeValue = String(ui.value);
        if (isDef(parent)) {
          parent.ast = null;
          acceptCode(parent);
          ast = getAst(parent);
          return update("sel-" + parent.ast.leisureName);
        } else {
          makeId(parent);
          if (!parent.getAttribute(parent.output, 'leisureUpdate')) {
            setUpdate(parent.output, "id-" + parent.id + " compile", true);
          }
          update("id-" + parent.id);
          return update("compile");
        }
      },
      value: value
    });
    setMinMax(sl, value);
    parent.insertBefore(d, parent.firstChild);
    return d.focus();
  };

  psgn = function psgn(x) {
    if (x < 0) {
      return -1;
    } else {
      return 1;
    }
  };

  setMinMax = function setMinMax(sl, value) {
    var max, min, step, _ref2;
    value = value || sl.slider("value");
    min = 0;
    max = (1 <= (_ref2 = Math.abs(value)) && _ref2 < 50) || value === 0 ? 100 * psgn(value) : value * 2;
    if (Math.round(value) === value) {
      step = Math.round((max - min) / 100);
      step = step - step % (max - min);
    } else {
      step = (max - min) / 100;
    }
    sl.slider("option", "min", min);
    sl.slider("option", "max", max);
    return sl.slider("option", "step", step);
  };

  hideSlider = function hideSlider() {
    var div, parent, sPos, sValue, span;
    if (slider.length) {
      parent = slider[0], sPos = slider[1], sValue = slider[2], span = slider[3], div = slider[4];
      unwrap(span);
      if (div) remove(div);
      parent.normalize();
      slider = [];
      return 2;
    } else {
      return 0;
    }
  };

  wrapRange = function wrapRange(range, node) {
    var contents;
    try {
      return range.surroundContents(node);
    } catch (err) {
      contents = range.cloneContents();
      replaceRange(range, node);
      return node.appendChild(contents);
    }
  };

  replaceRange = function replaceRange(range, node) {
    range.deleteContents();
    return range.insertNode(node);
  };

  getRangeText = function getRangeText(r) {
    return r.cloneContents().textContent;
  };

  getBox = function getBox(node) {
    while ((node != null) && !((typeof node.getAttribute === "function" ? node.getAttribute('LeisureBox') : void 0) != null)) {
      node = node.parentElement;
    }
    return node;
  };

  checkMutateFromModification = function checkMutateFromModification(evt) {
    var b, b2;
    b = getBox(evt.target);
    b2 = getBox(window.getSelection().focusNode);
    if (b && b === b2) {
      if ((isDef(b)) && b.classList.contains('codeMainExpr')) {
        toDefBox(b);
      } else if (!(isDef(b)) && b.classList.contains('codeMain')) {
        toExprBox(b);
      }
      return replicate(b);
    }
  };

  replicate = function replicate(b) {
    if (b.replicator) {
      return delay(function() {
        return b.replicator.replicate(b);
      });
    }
  };

  buttonClasses = 'ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only'.split(' ');

  boxClasses = {
    codeMainExpr: ['codeMainExpr', 'ui-widget', 'ui-widget-content', 'ui-corner-all'],
    codeMain: ['codeMain', 'ui-widget', 'ui-widget-content', 'ui-corner-all'],
    codeMainTest: ['codeMainTest'],
    output: ['output', 'ui-widget', 'ui-widget-content', 'ui-corner-all']
  };

  addBoxClasses = function addBoxClasses(box, type) {
    var cl, _i, _len, _ref2, _results;
    box.setAttribute(type, '');
    _ref2 = boxClasses[type];
    _results = [];
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      cl = _ref2[_i];
      _results.push(box.classList.add(cl));
    }
    return _results;
  };

  removeBoxClasses = function removeBoxClasses(box, type) {
    var cl, _i, _len, _ref2, _results;
    box.removeAttribute(type);
    _ref2 = boxClasses[type];
    _results = [];
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      cl = _ref2[_i];
      _results.push(box.classList.remove(cl));
    }
    return _results;
  };

  toExprBox = function toExprBox(b) {
    var node, _i, _j, _len, _len2, _ref2, _ref3;
    removeBoxClasses(b, 'codeMain');
    addBoxClasses(b, 'codeMainExpr');
    _ref2 = b.querySelectorAll('[codename]');
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      node = _ref2[_i];
      unwrap(node);
    }
    _ref3 = b.querySelectorAll('.astbutton');
    for (_j = 0, _len2 = _ref3.length; _j < _len2; _j++) {
      node = _ref3[_j];
      remove(node);
    }
    return makeOutputBox(b);
  };

  toDefBox = function toDefBox(b) {
    if (b.output) remove(b.output);
    removeBoxClasses(b, 'codeMainExpr');
    addBoxClasses(b, 'codeMain');
    return addDefControls(b);
  };

  addDefControls = function addDefControls(box) {
    var btn;
    btn = createNode("<button onclick='Notebook.showAst(this.parentNode)' class='astbutton' title='Show AST'></button>");
    markupButton(btn);
    return box.appendChild(btn);
  };

  remove = function remove(node) {
    var _ref2;
    return (_ref2 = node.parentNode) != null ? _ref2.removeChild(node) : void 0;
  };

  showAst = function showAst(box) {
    var name, node, output;
    name = (getAst(box)).leisureName;
    if (box.astOut != null) {
      remove(box.astOut.output);
      remove(box.astOut);
      return box.astOut = null;
    } else if (name != null) {
      node = codeBox('codeMainExpr');
      box.astOut = node;
      node.setAttribute('leisureOutput', '');
      box.parentNode.insertBefore(node, box.nextSibling);
      node.textContent = "#@update sel-" + name + "\ntreeForNotebook " + name;
      output = makeOutputBox(node);
      toggleEdit(output);
      return evalOutput(output, true);
    }
  };

  highlightNotebookFunction = function highlightNotebookFunction(funcName, start, stop) {
    var box, offset, sel, _ref2;
    box = document.body.querySelector("[leisurefunc=" + funcName + "]");
    offset = (_ref2 = getAst(box).leisureCodeOffset) != null ? _ref2 : 0;
    sel = window.getSelection();
    sel.removeAllRanges();
    return sel.addRange(makeRange(box, start + offset, stop + offset));
  };

  isDef = function isDef(box) {
    var defType, leading, m, matched, name, txt;
    txt = box.textContent;
    if ((m = txt.match(Leisure.linePat))) {
      matched = m[0], leading = m[1], name = m[2], defType = m[3];
      return (defType != null ? defType.length : void 0) > 0;
    }
    return false;
  };

  initNotebook = function initNotebook(el) {
    var pgm;
    ReplCore.setNext(function() {
      return 3;
    });
    el.replacing = true;
    removeOldDefs(el);
    pgm = markupDefs(el, findDefs(el));
    el.normalize();
    el.replacing = false;
    if (!el.hasAttribute('noLeisureBar')) {
      insertControls(el);
      el.testResults.innerHTML = pgm[2];
    }
    snapshot(el, pgm);
    return pgm;
  };

  makeLabel = function makeLabel(text, c) {
    var node;
    node = document.createElement('SPAN');
    node.innerHTML = text;
    node.setAttribute('class', c);
    return node;
  };

  makeOption = function makeOption(name) {
    var opt;
    opt = document.createElement('OPTION');
    opt.text = name;
    return opt;
  };

  createNode = function createNode(txt) {
    var scratch;
    scratch = document.createElement('DIV');
    scratch.innerHTML = txt;
    return scratch.firstChild;
  };

  createFragment = function createFragment(txt) {
    var frag, scratch;
    scratch = document.createElement('DIV');
    scratch.innerHTML = txt;
    frag = document.createDocumentFragment();
    while (scratch.firstChild) {
      frag.appendChild(scratch.firstChild);
    }
    return frag;
  };

  insertControls = function insertControls(el) {
    var controlDiv, saveButton, spacer, testButton, themeSelect, viewSelect, _ref2, _ref3;
    controlDiv = createNode("<div LeisureOutput contentEditable='false' class='leisure_bar'><div class=\"leisure_bar_contents\">\n  <button leisureId='saveButton' class=\"leisure_start\">Save</button>\n  <button leisureId='testButton'>Run Tests</button> <span leisureId='testResults' class=\"notrun\"></span>\n  <input type='checkbox' leisureId='autorunTests'><b>Auto</b></input>\n  <span class=\"leisure_theme\">Theme: </span>\n  <select leisureId='themeSelect'>\n    <option value=thin>Thin</option>\n    <option value=gaudy>Gaudy</option>\n    <option value=cthulhu>Cthulhu</option>\n  </select>\n  <span>View: </span>\n  <select leisureId='viewSelect'>\n    <option value=coding>Coding</option>\n    <option value=debugging>Debugging</option>\n    <option value=testing>Testing</option>\n    <option value=running>Running</option>\n  </select>\n</div>");
    spacer = createNode("<div LeisureOutput  contentEditable='false' class='leisure_space'></div>");
    el.insertBefore(spacer, el.firstChild);
    el.insertBefore(controlDiv, el.firstChild);
    _ref2 = getElements(el, ['downloadLink', 'viewLink', 'saveButton', 'testButton', 'testResults', 'autorunTests', 'themeSelect', 'viewSelect']), el.leisureDownloadLink = _ref2[0], el.leisureViewLink = _ref2[1], saveButton = _ref2[2], testButton = _ref2[3], el.testResults = _ref2[4], el.autorun = _ref2[5], themeSelect = _ref2[6], viewSelect = _ref2[7];
    controlDiv.addEventListener('click', function(evt) {
      if (document.body.classList.contains('hideControls')) {
        return document.body.classList.remove('hideControls');
      } else {
        return document.body.classList.add('hideControls');
      }
    });
    saveButton.addEventListener('click', function(evt) {
      return saveProgram(el);
    });
    testButton.addEventListener('click', function() {
      return runTests(el);
    });
    themeSelect.value = (_ref3 = el.leisureTheme) != null ? _ref3 : 'thin';
    themeSelect.addEventListener('change', function(evt) {
      return changeTheme(el, evt.target.value);
    });
    viewSelect.addEventListener('change', function(evt) {
      return changeView(el, evt.target.value);
    });
    el.autorun.checked = el.autorunState;
    el.autorun.addEventListener('change', function(evt) {
      el.autorunState = el.autorun.checked;
      if (el.autorunState) return runTests(el);
    });
    return markupButtons(controlDiv);
  };

  saveProgram = function saveProgram() {
    return Prim.write(filename, getMDDocument(), (function() {
      return alert("Saving " + filename);
    }), function(err) {
      console.log(err);
      alert(err.stack);
      throw err;
    });
  };

  showFilename = function showFilename(el) {
    if (el && filename) {
      el.innerHTML = "Save: " + (filename.pathName());
      return el.title = filename.toString();
    }
  };

  showFilenames = function showFilenames() {
    var node, _i, _len, _ref2, _results;
    _ref2 = document.body.querySelectorAll('[leisureId=saveButton]');
    _results = [];
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      node = _ref2[_i];
      _results.push(showFilename(node));
    }
    return _results;
  };

  setFilename = function setFilename(newName) {
    filename = newName instanceof URI ? newName : new URI(newName);
    return showFilenames();
  };

  markupButtons = function markupButtons(el) {
    var btn, _i, _len, _ref2, _results;
    _ref2 = el.querySelectorAll('button');
    _results = [];
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      btn = _ref2[_i];
      _results.push(markupButton(btn));
    }
    return _results;
  };

  markupButton = function markupButton(btn) {
    var cl, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = buttonClasses.length; _i < _len; _i++) {
      cl = buttonClasses[_i];
      _results.push(btn.classList.add(cl));
    }
    return _results;
  };

  getElements = function getElements(el, ids) {
    var els, id, node, _i, _j, _len, _len2, _ref2, _results;
    els = {};
    _ref2 = el.querySelectorAll('[leisureId]');
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      node = _ref2[_i];
      els[node.getAttribute('leisureId')] = node;
    }
    _results = [];
    for (_j = 0, _len2 = ids.length; _j < _len2; _j++) {
      id = ids[_j];
      _results.push(els[id]);
    }
    return _results;
  };

  loadProgram = function loadProgram(el, files) {
    var fr;
    el = getBox;
    fr = new FileReader();
    fr.onloadend = function onloadend(evt) {
      el.innerHTML = Repl.escapeHtml(fr.result);
      return initNotebook(el);
    };
    return fr.readAsBinaryString(files.item(0));
  };

  configureSaveLink = function configureSaveLink(el) {
    var blob, builder;
    window.URL = window.URL || window.webkitURL;
    builder = new WebKitBlobBuilder();
    builder.append(getElementCode(el));
    blob = builder.getBlob('text/plain');
    el.leisureDownloadLink.href = window.URL.createObjectURL(blob);
    return el.leisureViewLink.href = window.URL.createObjectURL(blob);
  };

  getElementCode = function getElementCode(el) {
    var r;
    r = document.createRange();
    r.selectNode(el);
    c = r.cloneContents().firstChild;
    removeOldDefs(c);
    return c.textContent;
  };

  runTests = function runTests(el) {
    var failed, passed, resultsClass, test, _i, _len, _ref2;
    passed = 0;
    failed = 0;
    _ref2 = el.querySelectorAll('.codeMainTest');
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      test = _ref2[_i];
      if (runTest(test)) {
        passed++;
      } else {
        failed++;
      }
    }
    if (el.testResults) {
      resultsClass = el.testResults.classList;
      resultsClass.remove('notrun');
      if (!failed) {
        resultsClass.remove('failed');
        resultsClass.add('passed');
        return el.testResults.innerHTML = passed;
      } else {
        resultsClass.remove('passed');
        resultsClass.add('failed');
        return el.testResults.innerHTML = "" + passed + "/" + failed;
      }
    }
  };

  changeTheme = function changeTheme(el, value) {
    var theme;
    theme = value;
    el.leisureTheme = theme;
    return el.className = theme;
  };

  changeView = function changeView(el, value) {
    debug = value === 'debugging';
    return alert('new view: ' + value + ", debug: " + debug);
  };

  unwrap = function unwrap(node) {
    var parent;
    parent = node.parentNode;
    if (parent) {
      while (node.firstChild != null) {
        parent.insertBefore(node.firstChild, node);
      }
      return parent.removeChild(node);
    }
  };

  removeOldDefs = function removeOldDefs(el) {
    var extracted, m, node, txt, _i, _j, _k, _l, _len, _len2, _len3, _len4, _ref2, _ref3, _ref4;
    el.leisureDownloadLink = null;
    el.leisureViewLink = null;
    extracted = [];
    _ref2 = el.querySelectorAll("[LeisureOutput]");
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      node = _ref2[_i];
      remove(node);
    }
    _ref3 = el.querySelectorAll("[generatednl]");
    for (_j = 0, _len2 = _ref3.length; _j < _len2; _j++) {
      node = _ref3[_j];
      txt = node.lastChild;
      if (txt.nodeType === 3 && txt.data[txt.data.length - 1] === '\n') {
        txt.data = txt.data.substring(0, txt.data.length - 1);
      }
    }
    _ref4 = el.querySelectorAll("[Leisure]");
    for (_k = 0, _len3 = _ref4.length; _k < _len3; _k++) {
      node = _ref4[_k];
      if (addsLine(node) && (node.firstChild != null)) {
        extracted.push(node.firstChild);
      }
      unwrap(node);
    }
    for (_l = 0, _len4 = extracted.length; _l < _len4; _l++) {
      node = extracted[_l];
      if ((node.parentNode != null) && !addsLine(node) && (node.previousSibling != null) && !addsLine(node.previousSibling)) {
        node.parentNode.insertBefore(text('\n'), node);
      }
    }
    el.textContent = el.textContent.replace(/\uFEFF/g, '');
    txt = el.lastChild;
    if ((txt != null ? txt.nodeType : void 0) === 3 && (m = txt.data.match(/(^|[^\n])(\n+)$/))) {
      return txt.data = txt.data.substring(0, txt.data.length - m[2].length);
    }
  };

  markupDefs = function markupDefs(el, defs) {
    var auto, bod, body, bx, def, i, main, name, notebookAutoNodes, pgm, s, test, tests, totalTests, _i, _j, _len, _len2, _ref2, _ref3;
    pgm = '';
    auto = '';
    totalTests = 0;
    notebookAutoNodes = [];
    for (_i = 0, _len = defs.length; _i < _len; _i++) {
      i = defs[_i];
      main = i.main, name = i.name, def = i.def, body = i.body, tests = i.tests;
      if (name) {
        bx = box(main, 'codeMain', true);
        bx.appendChild(codeSpan(name, 'codeName'));
        bx.appendChild(textNode(def));
        bod = codeSpan(textNode(body), 'codeBody');
        bod.appendChild(textNode('\n'));
        bod.setAttribute('generatedNL', '');
        bx.appendChild(bod);
        bx.addEventListener('blur', (function() {
          return evalDoc(el);
        }), true);
        markPartialApplies(bx);
        addDefControls(bx);
        pgm += "" + name + " " + def + " " + body + "\n";
      } else if (main != null) {
        bx = box(main, 'codeMainExpr', true);
        s = codeSpan(textNode(body), 'codeExpr');
        s.setAttribute('generatedNL', '');
        s.appendChild(textNode('\n'));
        bx.appendChild(s);
        markPartialApplies(bx);
        if (((_ref2 = main.leisureAuto) != null ? _ref2.mode : void 0) === 'silent') {
          auto += "" + body + "\n";
        } else {
          if (((_ref3 = main.leisureAuto) != null ? _ref3.mode : void 0) === 'notebook') {
            notebookAutoNodes.push(bx);
          }
          makeOutputBox(bx);
        }
      }
      for (_j = 0, _len2 = tests.length; _j < _len2; _j++) {
        test = tests[_j];
        replaceRange(test, makeTestBox(test.leisureTest));
        totalTests++;
      }
    }
    return [pgm, auto, totalTests, notebookAutoNodes];
  };

  getAst = function getAst(bx, def) {
    var _ref2;
    if (bx.ast != null) {
      patchFuncAst(bx.ast);
      bx.setAttribute('leisureFunc', (_ref2 = bx.ast.leisureName) != null ? _ref2 : '');
      return bx.ast;
    } else {
      def = def || bx.textContent;
      setAst(bx, (Leisure.compileNext(def, Parse.Nil, true, null))[0]);
      return bx.ast;
    }
  };

  setAst = function setAst(bx, ast) {
    bx.ast = ast;
    return patchFuncAst(ast);
  };

  patchFuncAst = function patchFuncAst(ast) {
    var parent;
    if ((ast != null ? ast.leisureName : void 0) != null) {
      parent = window[Parse.nameSub(ast.leisureName)];
      if (parent != null) {
        parent.ast = ast;
        parent.src = ast.leisureSource;
        return update("ast-" + ast.leisureName);
      }
    }
  };

  markPartialApplies = function markPartialApplies(bx, def) {
    var ast, info, offset, p, partial, r, ranges, s, t, _i, _j, _len, _len2, _ref2, _results;
    bx.normalize();
    def = def != null ? def : bx.textContent;
    ast = getAst(bx, def);
    partial = [];
    ((Leisure.findFuncs(ast))(Parse.Nil)).each(function(f) {
      var arity, name, _name, _ref2;
      name = Parse.getRefVar(f.head());
      arity = typeof global[_name = Parse.nameSub(name)] === "function" ? (_ref2 = global[_name]()) != null ? _ref2.leisureArity : void 0 : void 0;
      if (arity && f.tail().head() < arity) {
        return partial.push([f.head(), arity, f.tail().head()]);
      }
    });
    if (partial.length) {
      ranges = [];
      offset = (_ref2 = ast.leisureCodeOffset) != null ? _ref2 : 0;
      t = bx.lastChild.firstChild;
      for (_i = 0, _len = partial.length; _i < _len; _i++) {
        info = partial[_i];
        p = info[0];
        r = document.createRange();
        r.setStart(t, p.leisureStart + offset);
        r.setEnd(t, p.leisureEnd + offset);
        r.expected = info[1];
        r.actual = info[2];
        ranges.push(r);
      }
      _results = [];
      for (_j = 0, _len2 = ranges.length; _j < _len2; _j++) {
        r = ranges[_j];
        c = r.extractContents();
        s = document.createElement('span');
        s.setAttribute('Leisure', '');
        s.setAttribute('expected', String(r.expected));
        s.setAttribute('actual', String(r.actual));
        s.classList.add('partialApply');
        s.appendChild(c);
        _results.push(r.insertNode(s));
      }
      return _results;
    }
  };

  textNode = function textNode(text) {
    return document.createTextNode(text);
  };

  nodeFor = function nodeFor(text) {
    if (typeof text === 'string') {
      return textNode(text);
    } else {
      return text;
    }
  };

  evalOutput = function evalOutput(exBox, nofocus) {
    var selector, stopUpdates, updateSelector, _ref2;
    exBox = getBox(exBox);
    if (!nofocus) focusBox(exBox);
    cleanOutput(exBox, true);
    selector = findUpdateSelector(exBox.source);
    if (selector) exBox.setAttribute('leisureUpdate', selector);
    makeOutputControls(exBox);
    _ref2 = getElements(exBox.firstChild, ['chooseUpdate', 'stopUpdates']), updateSelector = _ref2[0], stopUpdates = _ref2[1];
    updateSelector.addEventListener('change', function(evt) {
      return setUpdate(exBox, evt.target.value, true);
    });
    updateSelector.addEventListener('keydown', function(e) {
      c = e.charCode || e.keyCode || e.which;
      if (c === ENTER) {
        e.preventDefault();
        return updateSelector.blur();
      }
    });
    updateSelector.value = (exBox.getAttribute('leisureUpdate')) || '';
    exBox.updateSelector = updateSelector;
    return evalBox(exBox.source, exBox);
  };

  findUpdateSelector = function findUpdateSelector(box) {
    var def, defType, leading, matched, name, u;
    if (def = box.textContent.match(Leisure.linePat)) {
      matched = def[0], leading = def[1], name = def[2], defType = def[3];
      if (u = leading.match(updatePat)) return u[3];
    }
  };

  getExprSource = function getExprSource(box) {
    var b, s;
    s = window.getSelection();
    b = getBox(s.focusNode);
    if (b !== box || !s.rangeCount || s.getRangeAt(0).collapsed) {
      return box.textContent;
    } else {
      return getRangeText(s.getRangeAt(0));
    }
  };

  setUpdate = function setUpdate(el, channel, preserveSource) {
    var ast, def, defType, index, leading, matched, name, r, txt, u;
    el.setAttribute('leisureUpdate', channel);
    if (channel) {
      el.classList.add('ui-state-highlight');
    } else {
      el.classList.remove('ui-state-highlight');
    }
    ast = getAst(el.source);
    txt = el.source.textContent;
    if (!preserveSource && (def = txt.match(Leisure.linePat))) {
      matched = def[0], leading = def[1], name = def[2], defType = def[3];
      index = def.index;
      if (u = leading.match(updatePat)) {
        index += u.index + u[1].length + u[2].length;
        r = makeRange(el.source, index, index + u[3].length);
        r.deleteContents();
      } else {
        r = makeRange(el.source, index + leading.length, index + leading.length);
      }
      r.insertNode(textNode(channel));
      return el.source.normalize();
    }
  };

  hasMonadOutput = function hasMonadOutput(box) {
    var _ref2, _ref3;
    return ((_ref2 = box.firstElementChild) != null ? (_ref3 = _ref2.nextElementSibling) != null ? _ref3.nextElementSibling : void 0 : void 0) != null;
  };

  checkHideSource = function checkHideSource(box) {
    var hs;
    if (!box.hideOutputSource && hasMonadOutput(box)) {
      box.hideOutputSource = true;
      hs = createNode("<button class='editToggle' style='float:right'></button>");
      markupButton(hs);
      hs.addEventListener('click', function() {
        return toggleEdit(hs);
      });
      return box.firstElementChild.appendChild(hs);
    }
  };

  makeOutputControls = function makeOutputControls(exBox) {
    if (exBox.firstChild.firstChild === exBox.firstChild.lastChild) {
      exBox.firstChild.insertBefore(createFragment("<button onclick='Notebook.clearOutputBox(this)'>X</button>"), exBox.firstChild.firstChild);
      exBox.firstChild.appendChild(createFragment("<button onclick='Notebook.makeTestCase(this)' leisureId='makeTestCase'>Make test\ncase</button><b>Update: </b><input type='text'\nplaceholder='Click for updating' list='channelList' leisureId='chooseUpdate'></input><button\nonclick='Notebook.clearUpdates(this)' leisureId='stopUpdates'>Stop Updates</button>"));
      markupButtons(exBox);
      return exBox.classList.add('fatControls');
    }
  };

  showOutputSource = function showOutputSource(output) {
    output.classList.remove('hidingSource');
    return output.source.style.display = '';
  };

  hideOutputSource = function hideOutputSource(output) {
    output.classList.add('hidingSource');
    return output.source.style.display = 'none';
  };

  toggleEdit = function toggleEdit(toggleButton) {
    var output;
    output = getBox(toggleButton);
    if (output.classList.contains('hidingSource')) {
      return showOutputSource(output);
    } else {
      return hideOutputSource(output);
    }
  };

  clearUpdates = function clearUpdates(widget, preserveSource) {
    var exBox;
    exBox = getBox(widget);
    exBox.updateSelector.value = '';
    return setUpdate(exBox, '', preserveSource);
  };

  update = function update(type, env) {
    var node, _i, _len, _ref2, _results;
    env = env != null ? env : Prim.defaultEnv;
    _ref2 = env.owner.querySelectorAll("[leisureUpdate~=" + type + "]");
    _results = [];
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      node = _ref2[_i];
      _results.push(evalOutput(node, true));
    }
    return _results;
  };

  clearOutputBox = function clearOutputBox(exBox) {
    clearUpdates(exBox, true);
    return cleanOutput(exBox);
  };

  cleanOutput = function cleanOutput(exBox, preserveControls) {
    var fc, _results;
    exBox = getBox(exBox);
    exBox.classList.remove('fatControls');
    if (!preserveControls) {
      exBox.hideOutputSource = null;
      fc = exBox.firstChild;
      fc.removeChild(fc.firstChild);
      while (fc.firstChild !== fc.lastChild) {
        fc.removeChild(fc.lastChild);
      }
    }
    _results = [];
    while (exBox.firstChild !== exBox.lastChild) {
      _results.push(exBox.removeChild(exBox.lastChild));
    }
    return _results;
  };

  makeTestCase = function makeTestCase(exBox) {
    var box, output, source, test;
    output = getBox(exBox);
    source = output.source;
    test = {
      expr: source.textContent.trim(),
      expected: Repl.escapeHtml(Parse.print(output.result))
    };
    box = makeTestBox(test, owner(exBox));
    source.parentNode.insertBefore(box, source);
    remove(source);
    remove(output);
    box.parentNode.insertBefore(textNode('\uFEFF'), box);
    box.parentNode.insertBefore(textNode('\uFEFF'), box.nextSibling);
    if (owner(box).autorunState) return clickTest(box);
  };

  makeTestBox = function makeTestBox(test, owner, src) {
    var bx, s;
    src = src != null ? src : "#@test " + (JSON.stringify(test.expr)) + "\n#@expected " + (JSON.stringify(test.expected));
    s = codeSpan(src, 'codeTest');
    s.appendChild(textNode('\n'));
    s.setAttribute('generatedNL', '');
    bx = codeBox('codeMainTest');
    bx.testSrc = s;
    bx.setAttribute('class', 'codeMainTest notrun');
    bx.setAttribute('contenteditable', 'false');
    bx.appendChild(s);
    bx.addEventListener('click', (function() {
      return clickTest(bx);
    }), true);
    bx.test = test;
    return bx;
  };

  clickTest = function clickTest(bx) {
    var exprBox, r, sp;
    if (bx.classList.contains('notrun')) {
      return runTest(bx);
    } else {
      r = document.createRange();
      r.setStartBefore(bx);
      r.setEndAfter(bx);
      r.deleteContents();
      sp = codeSpan(bx.test.expr, 'codeExpr');
      sp.setAttribute('generatedNL', '');
      exprBox = box(r, 'codeMainExpr', true);
      exprBox.appendChild(sp);
      return makeOutputBox(exprBox);
    }
  };

  runTest = function runTest(bx) {
    var passed, test;
    test = bx.test;
    passed = true;
    processLine(prepExpr(test.expr), {
      require: req,
      write: function write(str) {
        return console.log(str);
      },
      debug: debug,
      prompt: function prompt(msg, cont) {
        return cont(null);
      },
      processResult: function processResult(result, ast) {
        return passed = showResult(bx, Repl.escapeHtml(Parse.print(result)), Repl.escapeHtml(test.expected));
      },
      processError: passed = false,
      presentValue: function presentValue(x) {
        return x;
      }
    });
    return passed;
  };

  showResult = function showResult(bx, actual, expected) {
    var cl;
    cl = bx.classList;
    cl.remove('notrun');
    if (actual === expected) {
      cl.remove('failed');
      cl.add('passed');
      bx.testSrc.innerHTML = "#@test " + (JSON.stringify(bx.test.expr)) + "\n#@expected " + (JSON.stringify(bx.test.expected));
    } else {
      cl.remove('passed');
      cl.add('failed');
      bx.testSrc.innerHTML = "#@test " + (JSON.stringify(bx.test.expr)) + "\n#@expected " + (JSON.stringify(bx.test.expected)) + "\n#@result " + (JSON.stringify(actual));
      console.log("expected <" + expected + "> but got <" + actual + ">");
    }
    return actual === expected;
  };

  prepExpr = function prepExpr(txt) {
    var _ref2;
    if (_ref2 = txt[0], __indexOf.call('=!', _ref2) >= 0) {
      return txt;
    } else {
      return "=" + txt;
    }
  };

  envFor = function envFor(box) {
    var env, exBox, widget;
    exBox = getBox(box);
    widget = null;
    env = Prim.initFileSettings({
      debug: debug,
      finishedEvent: function finishedEvent(evt, channel) {
        return update(channel != null ? channel : 'app', this);
      },
      owner: owner(box),
      box: box,
      require: req,
      write: function write(msg) {
        var div;
        div = document.createElement('div');
        div.classList.add('outputDiv');
        div.innerHTML = "" + msg + "\n";
        exBox.appendChild(div);
        checkHideSource(exBox);
        return markupButtons(exBox);
      },
      getWidget: function getWidget() {
        if (!widget) {
          widget = document.createElement("DIV");
          exBox.appendChild(widget);
        }
        return widget;
      },
      destroyWidget: function destroyWidget() {
        if (widget) return remove(widget);
      },
      prompt: function prompt(msg, cont) {
        return cont(window.prompt(msg));
      },
      processResult: function processResult(result, ast) {
        box.result = result;
        return setAst(box, ast);
      },
      presentValue: presentValue,
      processError: function processError(ast) {
        var btn, _ref2;
        btn = box.querySelector('[leisureId="makeTestCase"]');
        if (btn) remove(btn);
        return this.write("<div class='errorDiv'>" + Repl.escapeHtml("ERROR: " + (ast.err.leisureContext ? "" + ast.err + ":\n" + (leisureContextString(ast.err)) + "\n" : '') + ((_ref2 = ast.err.stack) != null ? _ref2 : ast.err)) + "</div>");
      },
      cleanup: function cleanup() {
        this.destroyWidget();
        if (root.lastEnv === env) return root.lastEnv = null;
      }
    });
    env.__proto__ = Prim.defaultEnv;
    env.fileSettings.uri = new Prim.URI(document.location.href);
    root.lastEnv = env;
    return env;
  };

  leisureContextString = function leisureContextString(err) {
    var func, offset;
    return ((function() {
      var _i, _len, _ref2, _ref3, _results;
      _ref2 = err.leisureContext.toArray();
      _results = [];
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        _ref3 = _ref2[_i], func = _ref3[0], offset = _ref3[1];
        _results.push(linkSource(func, offset));
      }
      return _results;
    })()).join('\n');
  };

  linkSource = function linkSource(funcName, offset) {
    var end, src, start, _ref2;
    _ref2 = Leisure.funcContextSource(funcName, offset), src = _ref2[0], start = _ref2[1], end = _ref2[2];
    return "  <a href='javascript:void(Notebook.showSource(\"" + funcName + "\", " + offset + "))'>" + funcName + ":" + start + "," + end + "</a>";
  };

  showSource = function showSource(funcName, offset) {
    var end, src, start, _ref2;
    _ref2 = Leisure.funcContextSource(funcName, offset), src = _ref2[0], start = _ref2[1], end = _ref2[2];
    return alert("" + funcName + " = " + (src.substring(0, start)) + " << " + (src.substring(start, end)) + " >> " + (src.substring(end)));
  };

  makeOutputBox = function makeOutputBox(source) {
    var cl, node, _i, _len, _ref2;
    node = document.createElement('div');
    node.setAttribute('LeisureOutput', '');
    node.setAttribute('Leisure', '');
    node.setAttribute('LeisureBox', '');
    _ref2 = boxClasses.output;
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      cl = _ref2[_i];
      node.classList.add(cl);
    }
    node.setAttribute('contentEditable', 'false');
    node.source = source;
    source.output = node;
    node.innerHTML = "<div class='controls'><button onclick='Notebook.evalOutput(this)'>-&gt;</button></div>";
    markupButtons(node);
    source.parentNode.insertBefore(node, source.nextSibling);
    return node;
  };

  codeSpan = function codeSpan(text, boxType) {
    var node;
    node = document.createElement('span');
    node.setAttribute(boxType, '');
    node.setAttribute('Leisure', '');
    node.setAttribute('class', boxType);
    if (text) node.appendChild(nodeFor(text));
    return node;
  };

  codeBox = function codeBox(boxType) {
    var node;
    node = document.createElement('div');
    addBoxClasses(node, boxType);
    node.setAttribute('LeisureBox', '');
    node.setAttribute('Leisure', '');
    node.addEventListener('compositionstart', function(e) {
      return checkMutateFromModification(e);
    });
    return node;
  };

  box = function box(range, boxType, empty) {
    var node;
    node = codeBox(boxType);
    if (empty) {
      range.deleteContents();
    } else {
      node.appendChild(range.extractContents());
    }
    range.insertNode(node);
    return node;
  };

  findDefs = function findDefs(el) {
    var def, ranges, rest, rng, txt;
    txt = el.textContent;
    rest = txt;
    ranges = [];
    while ((def = rest.match(Leisure.linePat)) && def[1].length !== rest.length) {
      rng = getRanges(el, txt, rest, def, txt.length - rest.length);
      if (rng) {
        rest = rng.next;
        if (rng) {
          ranges.push(rng);
        } else {
          break;
        }
      } else {
        break;
      }
    }
    return ranges;
  };

  testPat = /(#@test([^\n]*)\n#@expected([^\n]*))\n/m;

  getRanges = function getRanges(el, txt, rest, def, restOff) {
    var body, bodyStart, defType, endPat, ex, exEnd, leadOff, leading, leadingSpaces, lm, m, m2, mainEnd, mainStart, matchStart, matched, name, nameEnd, nameRaw, next, outerRange, r, rest1, t, tOff, tests, textStart, _ref2, _ref3, _ref4, _ref5;
    _ref2 = m = def, matched = _ref2[0], leading = _ref2[1], nameRaw = _ref2[2], defType = _ref2[3];
    if (!rest.trim()) {
      return null;
    } else if (!(m != null)) {
      return [makeRange(el, restOff, txt.length), null, null, [], ''];
    } else {
      tests = [];
      matchStart = restOff + m.index;
      if (!(defType != null)) {
        name = null;
      } else if (nameRaw[0] === ' ') {
        name = null;
        defType = null;
      } else {
        name = nameRaw.trim() || null;
      }
      rest1 = rest.substring((defType ? matched : leading).length);
      endPat = rest1.match(/\n+[^\s]|\n?$/);
      next = endPat ? rest1.substring(endPat.index) : rest1;
      mainEnd = txt.length - next.length;
      t = leading;
      leadOff = tOff = restOff;
      while (m2 = t.match(testPat)) {
        r = makeRange(el, tOff + m2.index, tOff + m2.index + m2[1].length);
        r.leisureTest = {
          expr: JSON.parse(m2[2]),
          expected: JSON.parse(m2[3])
        };
        tests.push(r);
        tOff += m2.index + m2[1].length;
        t = leading.substring(tOff - leadOff);
      }
      if (name) {
        mainStart = matchStart + ((_ref3 = leading != null ? leading.length : void 0) != null ? _ref3 : 0);
        nameEnd = mainStart + name.length;
        leadingSpaces = (rest1.match(/^\s*/))[0].length;
        bodyStart = txt.length - (rest1.length - leadingSpaces);
        outerRange = makeRange(el, mainStart, mainEnd);
        return {
          main: outerRange,
          name: txt.substring(mainStart, nameEnd),
          def: defType,
          body: txt.substring(bodyStart, mainEnd),
          tests: tests,
          next: next
        };
      } else {
        mainStart = defType === '=' ? restOff + m.index + m[0].length : matchStart + ((_ref4 = leading != null ? leading.length : void 0) != null ? _ref4 : 0);
        ex = txt.substring(mainStart, mainEnd).match(/^(.*[^ \n])[ \n]*$/);
        exEnd = ex ? mainStart + ex[1].length : mainEnd;
        body = txt.substring(mainStart, exEnd);
        if (body.trim()) {
          textStart = restOff + m.index + (t ? leading.length - t.length : 0);
          if ((t != null) && (lm = t.match(/^[ \n]+/))) textStart += lm[0].length;
          console.log("CHECKING AUTO...");
          if (m = t.match(/(?:^|\n)#@auto( +[^\n]*)?(\n|$)/)) {
            outerRange = makeRange(el, textStart, exEnd);
            outerRange.leisureAuto = JSON.parse("{" + ((_ref5 = m[1]) != null ? _ref5 : '') + "}");
            if (outerRange.leisureAuto.mode === 'notebook') {
              outerRange.leisureNode = el;
              outerRange.leisureStart = textStart;
            }
            console.log("Auto expr: " + (txt.substring(textStart, exEnd)) + ", attrs: " + m[1]);
            return {
              main: outerRange,
              name: null,
              def: null,
              body: txt.substring(textStart, exEnd),
              tests: tests,
              fullText: txt.substring(textStart, exEnd),
              next: next
            };
          } else {
            outerRange = makeRange(el, textStart, exEnd);
            return {
              main: outerRange,
              name: null,
              def: null,
              body: txt.substring(textStart, exEnd),
              tests: tests,
              next: next
            };
          }
        } else {
          return {
            main: null,
            name: null,
            def: null,
            body: null,
            tests: tests,
            next: next
          };
        }
      }
    }
  };

  makeRange = function makeRange(el, off1, off2) {
    var node, offset, range, _ref2, _ref3;
    range = document.createRange();
    _ref2 = grp(el, off1, false), node = _ref2[0], offset = _ref2[1];
    if ((offset != null) && offset > 0) {
      range.setStart(node, offset);
    } else {
      range.setStartBefore(node);
    }
    if (off2 != null) {
      _ref3 = grp(el, off2, true), node = _ref3[0], offset = _ref3[1];
      if (offset != null) {
        range.setEnd(node, offset);
      } else {
        range.setEndAfter(node);
      }
    }
    return range;
  };

  grp = function grp(node, charOffset, end) {
    var child, offset, ret, _ref2;
    _ref2 = ret = getRangePosition(node.firstChild, charOffset, end), child = _ref2[0], offset = _ref2[1];
    if (child) {
      return ret;
    } else if (node.lastChild) {
      return nodeEnd(node.lastChild);
    } else {
      return [node, end ? 1 : 0];
    }
  };

  getRangePosition = function getRangePosition(node, charOffset, end) {
    var newNode, newOff, ret, _ref2;
    if (!node) {
      return [null, charOffset];
    } else if (node.nodeType === 3) {
      if (node.length > (end ? charOffset - 1 : charOffset)) {
        return [node, charOffset];
      } else {
        ret = continueRangePosition(node, charOffset - node.length, end);
        return ret;
      }
    } else if (node.nodeName === 'BR') {
      if (charOffset === (end ? 1 : 0)) {
        return [node];
      } else {
        return continueRangePosition(node, charOffset, end);
      }
    } else if (node.firstChild != null) {
      _ref2 = getRangePosition(node.firstChild, charOffset, end), newNode = _ref2[0], newOff = _ref2[1];
      if (newNode != null) {
        return [newNode, newOff];
      } else {
        return continueRangePosition(node, newOff, end);
      }
    } else {
      return continueRangePosition(node, charOffset, end);
    }
  };

  continueRangePosition = function continueRangePosition(node, charOffset, end) {
    var newOff;
    newOff = charOffset - ((addsLine(node)) || ((node.nextSibling != null) && (addsLine(node.nextSibling))) ? 1 : 0);
    if (end && (newOff === 1 || charOffset === 1)) {
      return nodeEnd(node);
    } else if (node.nextSibling != null) {
      return getRangePosition(node.nextSibling, newOff, end);
    } else {
      return continueRangePosition(node.parentNode, newOff, end);
    }
  };

  nodeEnd = function nodeEnd(node) {
    return [node, node.nodeType === 3 ? node.length : node.childNodes.length - 1];
  };

  addsLine = function addsLine(node) {
    return node.nodeName === 'BR' || (node.nodeType === 1 && getComputedStyle(node, null).display === 'block' && node.childNodes.length > 0);
  };

  req = function req(file, cont) {
    var name, s;
    if (!(file.match(/\.js$/))) file = "" + file + ".js";
    name = file.substring(0, file.length - 3);
    s = document.createElement('script');
    s.setAttribute('src', file);
    s.addEventListener('load', function() {
      Leisure.processDefs(global[name], global);
      if (cont) return cont(_false());
    });
    return document.head.appendChild(s);
  };

  postLoadQueue = [];

  loaded = false;

  queueAfterLoad = function queueAfterLoad(func) {
    if (loaded) {
      return func();
    } else {
      return postLoadQueue.push(func);
    }
  };

  /*
  # handle focus manually, because grabbing focus and blur events doesn't seem to work for the parent
  */

  docFocus = null;

  codeFocus = null;

  findCurrentCodeHolder = function findCurrentCodeHolder() {
    var _ref2;
    return focusBox((_ref2 = window.getSelection()) != null ? _ref2.focusNode : void 0);
  };

  focusBox = function focusBox(box) {
    var newCode, old, _ref2;
    newCode = null;
    while (box && (box.nodeType !== 1 || !isLeisureCode(box))) {
      if (box.nodeType === 1 && ((box.getAttribute('LeisureBox')) != null)) {
        newCode = box;
      }
      box = box.parentNode;
    }
    if (box !== docFocus) {
      if (docFocus != null) docFocus.classList.remove('focused');
      docFocus = box;
      if (box != null) if ((_ref2 = box.classList) != null) _ref2.add('focused');
    }
    if (newCode !== codeFocus) {
      old = codeFocus;
      codeFocus = newCode;
      if (old) return acceptCode(old);
    }
  };

  owner = function owner(box) {
    while (box && (box.nodeType !== 1 || !isLeisureCode(box))) {
      box = box.parentNode;
    }
    return box;
  };

  evalBox = function evalBox(box, envBox) {
    var env;
    env = envBox != null ? envFor(envBox) : null;
    processLine(box.textContent, env, 'Parse.', function() {
      return env != null ? typeof env.cleanup === "function" ? env.cleanup() : void 0 : void 0;
    });
    getAst(box);
    if (box.output && hasMonadOutput(box.output) && box.textContent.match(/(^|\n)#@hidden *(\n|$)/)) {
      return hideOutputSource(box.output);
    }
  };

  acceptCode = function acceptCode(box) {
    if ((box.getAttribute('codemain')) != null) {
      evalBox(box);
      update('compile');
      if (owner(box).autorunState) return runTests(owner(box));
    }
  };

  evalDoc = function evalDoc(el) {
    var auto, autoNodes, e, pgm, x, _ref2;
    _ref2 = initNotebook(el), pgm = _ref2[0], auto = _ref2[1], x = _ref2[2], autoNodes = _ref2[3];
    try {
      if (auto || autoNodes) {
        auto = "do\n  " + ((auto != null ? auto : '#\n').trim().replace(/\n/g, '\n  ')) + "\n  finishLoading 'fred'";
        global.noredefs = false;
        Notebook.queueAfterLoad(function() {
          var node, _i, _len, _results;
          evalDocCode(el, pgm);
          if (el.autorunState) runTests(el);
          _results = [];
          for (_i = 0, _len = autoNodes.length; _i < _len; _i++) {
            node = autoNodes[_i];
            console.log("evalOutput", node, node.output);
            _results.push(evalOutput(node.output));
          }
          return _results;
        });
        e = envFor(el);
        e.write = function write() {};
        e.processError = function processError(ast) {
          return alert('bubba ' + ReplCore.errString(ast.err));
        };
        return processLine(auto, e, 'Parse.');
      } else {
        return evalDocCode(el, pgm);
      }
    } catch (err) {
      return showError(err, "Error compiling " + pgm);
    }
  };

  processLine = function processLine() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return Leisure.allowRedefsIn(function() {
      return ReplCore.processLine.apply(ReplCore, args);
    });
  };

  showError = function showError(e, msg) {
    console.log(msg);
    console.log(e);
    console.log(e.stack);
    return alert(e.stack);
  };

  evalDocCodeOld = function evalDocCodeOld(el, pgm) {
    return ReplCore.generateCode('_doc', pgm, false, false, false, null, debug, false, function(code) {
      var defs, node, _i, _len, _ref2, _results;
      try {
        defs = Leisure.eval(code, global);
      } catch (err) {
        showError(err, "Error evaluating JS code: " + code);
        throw err;
      }
      Leisure.processDefs(defs);
      _ref2 = el.querySelectorAll('[codeMain]');
      _results = [];
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        node = _ref2[_i];
        _results.push(getAst(node));
      }
      return _results;
    });
  };

  evalDocCode = function evalDocCode(el, pgm) {
    return ReplCore.generateCode('_doc', pgm, false, false, false, null, debug, true, function(code) {
      var node, _i, _len, _ref2, _results;
      _ref2 = el.querySelectorAll('[codeMain]');
      _results = [];
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        node = _ref2[_i];
        _results.push(getAst(node));
      }
      return _results;
    });
  };

  Parse.define('getDocument', function() {
    return Prim.makeMonad(function(env, cont) {
      return cont(peerGetDocument());
    });
  });

  Parse.define('getLink', function() {
    return Prim.makeMonad(function(env, cont) {
      return cont(Prim.linkFor(filename));
    });
  });

  Parse.define('replaceDocument', function() {
    return function(str) {
      return Prim.makeMonad(function(env, cont) {
        replaceContents(str());
        return cont(_true());
      });
    };
  });

  Parse.define('gdriveOpen', function() {
    return Prim.makeMonad(function(env, cont) {
      return GdriveStorage.runOpen(function(json) {
        var _ref2;
        if ((json != null ? json.action : void 0) === 'picked' && ((_ref2 = json.docs) != null ? _ref2.length : void 0) > 0) {
          return GdriveStorage.loadFile(json.docs[0].id, function() {
            return cont(_some()(laz(json.docs[0].title)));
          });
        } else {
          return cont(_none());
        }
      });
    });
  });

  Parse.define('getFilename', function() {
    return Prim.makeMonad(function(env, cont) {
      var _ref2;
      return cont((_ref2 = filename != null ? filename.pathName() : void 0) != null ? _ref2 : '');
    });
  });

  Parse.define('setURI', function() {
    return function(uri) {
      return Prim.makeMonad(function(env, cont) {
        setFilename(uri());
        return cont(_true());
      });
    };
  });

  Parse.define('getURI', function() {
    return Prim.makeMonad(function(env, cont) {
      var _ref2;
      return cont((_ref2 = filename != null ? filename.toString() : void 0) != null ? _ref2 : '');
    });
  });

  Parse.define('finishLoading', function() {
    return function(bubba) {
      return Prim.makeMonad(function(env, cont) {
        var i, _i, _len;
        loaded = true;
        for (_i = 0, _len = postLoadQueue.length; _i < _len; _i++) {
          i = postLoadQueue[_i];
          i();
        }
        postLoadQueue = [];
        return cont(_false());
      });
    };
  });

  Parse.define('markupButtons', function() {
    return Prim.makeMonad(function(env, cont) {
      if (env.box) markupButtons(env.box);
      return cont(_false());
    });
  });

  Parse.define('alert', function() {
    return function(str) {
      return Prim.makeMonad(function(env, cont) {
        window.alert(str());
        return cont(_false());
      });
    };
  });

  Parse.define('bindEvent', function() {
    return function(selector) {
      return function(eventName) {
        return function(func) {
          return Prim.makeMonad(function(env, cont) {
            var node;
            node = env.box.querySelector(selector());
            if (node) {
              node.addEventListener(eventName(), function(e) {
                return Prim.runMonad(func()(laz(e)), envFor(e.target), function() {});
              });
            }
            return cont(_false());
          });
        };
      };
    };
  });

  Parse.define('quit', function() {
    return window.close();
  });

  Parse.define('config', function() {
    return function(expr) {
      return Prim.makeMonad(function(env, cont) {
        switch (expr()) {
          case 'autoTest':
            autoRun(env.owner, true);
        }
        return cont(_false());
      });
    };
  });

  Parse.define('notebookSelection', function() {
    return function(func) {
      return Prim.makeMonad(function(env, cont) {
        var bx, offset, p1, p2, r, r2, sel, _ref2;
        sel = window.getSelection();
        bx = getBox(sel.focusNode);
        if ((bx != null) && hasFunc(bx, func)) {
          offset = (_ref2 = bx.ast.leisureCodeOffset) != null ? _ref2 : 0;
          r = sel.getRangeAt(0);
          window.r = r;
          r2 = document.createRange();
          r2.setStart(bx, 0);
          r2.setEnd(r.startContainer, r.startOffset);
          p1 = r2.cloneContents().textContent.length - offset;
          if (!r.collapsed) r2.setEnd(r.endContainer, r.endOffset);
          p2 = r2.cloneContents().textContent.length - offset;
          return cont(_some2()(function() {
            return p1;
          })(function() {
            return p2;
          }));
        } else {
          return cont(_none());
        }
      });
    };
  });

  hasFunc = function hasFunc(bx, func) {
    var ast;
    ast = getAst(bx);
    return ast === func().ast || ast === func.ast;
  };

  Parse.define('notebookAst', function() {
    return function(func) {
      return Prim.makeMonad(function(env, cont) {
        var ast, node;
        if (func.leisureName != null) {
          node = document.querySelector("[LeisureFunc=" + func.leisureName + "]");
          if (node != null) {
            ast = getAst(node);
            return cont(_some()(function() {
              return ast;
            }));
          }
        }
        return cont(_none());
      });
    };
  });

  autoRun = function autoRun(el, state) {
    var _ref2;
    el.autorunState = state;
    return (_ref2 = el.autorun) != null ? _ref2.checked = state : void 0;
  };

  head = function head(l) {
    return l(function() {
      return function(hh) {
        return function(tt) {
          return hh();
        };
      };
    });
  };

  tail = function tail(l) {
    return l(function() {
      return function(hh) {
        return function(tt) {
          return tt();
        };
      };
    });
  };

  id = function id(v) {
    return v();
  };

  laz = Leisure.laz;

  getSvgElement = function getSvgElement(id) {
    var el, svg;
    if ((el = document.getElementById(id))) {
      return el;
    } else {
      svg = createNode("<svg id='HIDDEN_SVG' xmlns='http://www.w3.org/2000/svg' version='1.1' style='top: -100000; position: absolute'><text id='HIDDEN_TEXT'>bubba</text></svg>");
      document.body.appendChild(svg);
      return document.getElementById(id);
    }
  };

  svgMeasureText = function svgMeasureText(text) {
    return function(style) {
      return function(f) {
        var bx, txt;
        txt = getSvgElement('HIDDEN_TEXT');
        if (style()) txt.setAttribute('style', style());
        txt.lastChild.textContent = text();
        bx = txt.getBBox();
        return f()(laz(bx.width))(laz(bx.height));
      };
    };
  };

  primconcatNodes = function primconcatNodes(nodes) {
    if (nodes === _nil()) {
      return "";
    } else {
      return (head(nodes))(id) + concatNodes(tail(nodes));
    }
  };

  transformedPoint = function transformedPoint(pt, x, y, ctm, ictm) {
    pt.x = x;
    pt.y = y;
    return pt.matrixTransform(ctm).matrixTransform(ictm);
  };

  svgMeasure = function svgMeasure(content) {
    return primSvgMeasure(content, baseStrokeWidth);
  };

  svgBetterMeasure = function svgBetterMeasure(content) {
    return primSvgMeasure(content, transformStrokeWidth);
  };

  primSvgMeasure = function primSvgMeasure(content, transformFunc) {
    return function(f) {
      var bbox, g, pad, svg;
      svg = createNode("<svg xmlns='http://www.w3.org/2000/svg' version='1.1' style='top: -100000'><g>" + (content()) + "</g></svg>");
      document.body.appendChild(svg);
      g = svg.firstChild;
      bbox = g.getBBox();
      pad = getMaxStrokeWidth(g, g, svg, transformFunc);
      document.body.removeChild(svg);
      return f()(laz(bbox.x - Math.ceil(pad / 2)))(laz(bbox.y - Math.ceil(pad / 2)))(laz(bbox.width + pad))(laz(bbox.height + pad));
    };
  };

  baseElements = ['path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon'];

  getMaxStrokeWidth = function getMaxStrokeWidth(el, base, svg, transformFunc) {
    var _ref2, _ref3;
    if (_ref2 = base.nodeName, __indexOf.call(baseElements, _ref2) >= 0) {
      svg.setAttribute('width', (_ref3 = getComputedStyle(base).strokeWidth) != null ? _ref3 : '0', svg);
      return transformFunc(el, svg.width.baseVal.value);
    } else if (base.nodeName === 'use') {
      return getMaxStrokeWidth(base, base.instanceRoot.correspondingElement, svg, transformFunc);
    } else if (base.nodeName === 'g') {
      return Parse.foldLeft((function(v, n) {
        return Math.max(v, getMaxStrokeWidth(n, n, svg, transformFunc));
      }), 0, el.childNodes);
    } else {
      return 0;
    }
  };

  baseStrokeWidth = function baseStrokeWidth(el, w) {
    return w;
  };

  transformStrokeWidth = function transformStrokeWidth(el, w) {
    var ctm, tp1, tp2, x, y;
    if (w === 0) {
      return 0;
    } else {
      ctm = el.getScreenCTM();
      tp1 = transformedPoint(pt, bx.x - Math.ceil(w), bx.y - Math.ceil(w), ctm, isctm);
      tp2 = transformedPoint(pt, bx.x + bx.width + Math.ceil(w), bx.y + bx.height + Math.ceil(w), ctm, isctm);
      x = tp2.x - tp1.x;
      y = tp2.y - tp1.y;
      return Math.sqrt(x * x + y * y);
    }
  };

  previousSibling = function previousSibling(node) {
    while ((node != null ? node.parentNode : void 0) && !node.previousSibling) {
      node = node.parentNode;
    }
    return node != null ? node.previousSibling : void 0;
  };

  nextSibling = function nextSibling(node) {
    while ((node != null ? node.parentNode : void 0) && !node.nextSibling) {
      node = node.parentNode;
    }
    return node != null ? node.nextSibling : void 0;
  };

  hideControlSection = function hideControlSection() {
    var controlSection;
    controlSection = document.body.querySelector('[leisureSection="Leisure Controls"]');
    if (!controlSection) {
      controlSection = document.createElement('DIV');
      document.body.insertBefore(controlSection, document.body.firstChild);
      root.markupElement(controlSection, "# Leisure Controls\n\n## File Save and Load\n```\nsaveFile\n\nsaveAs 'filename'\n\nsaveAs pickFile\n\nloadFile\n\nemptyFile\n```");
      unwrap(controlSection);
    }
    controlSection.classList.add(leisure_controls);
    return controlSection.classList.add(hidden);
  };

  Prim.defaultEnv.require = req;

  root.svgMeasureText = svgMeasureText;

  root.svgMeasure = svgMeasure;

  root.initNotebook = initNotebook;

  root.bindNotebook = bindNotebook;

  root.bindAll = bindAll;

  root.evalOutput = evalOutput;

  root.makeTestCase = makeTestCase;

  root.cleanOutput = cleanOutput;

  root.clearOutputBox = clearOutputBox;

  root.envFor = envFor;

  root.queueAfterLoad = queueAfterLoad;

  root.evalDoc = evalDoc;

  root.getBox = getBox;

  root.makeRange = makeRange;

  root.grp = grp;

  root.changeTheme = changeTheme;

  root.setSnapper = setSnapper;

  root.update = update;

  root.clearUpdates = clearUpdates;

  root.showAst = showAst;

  root.toggleEdit = toggleEdit;

  root.showSource = showSource;

  root.bootNotebook = bootNotebook;

  root.createNode = createNode;

  root.ENTER = ENTER;

  root.textNode = textNode;

  root.cleanEmptyNodes = cleanEmptyNodes;

  root.isLeisureCode = isLeisureCode;

  root.getElementCode = getElementCode;

  root.runTests = runTests;

  root.previousSibling = previousSibling;

  root.nextSibling = nextSibling;

  root.presentLeisureCode = presentLeisureCode;

  root.mergeLeisureCode = mergeLeisureCode;

  root.highlightNotebookFunction = highlightNotebookFunction;

  root.ESC = ESC;

  root.HOME = HOME;

  root.END = END;

  root.PAGE_UP = PAGE_UP;

  root.PAGE_DOWN = PAGE_DOWN;

  root.LEFT_ARROW = LEFT_ARROW;

  root.UP_ARROW = UP_ARROW;

  root.RIGHT_ARROW = RIGHT_ARROW;

  root.DOWN_ARROW = DOWN_ARROW;

  root.arrows = arrows;

  root.closeWindow = closeWindow;

  root.markupButton = markupButton;

  root.markupButtons = markupButtons;

  root.getAst = getAst;

  root.insertControls = insertControls;

  root.delay = delay;

  root.setFilename = setFilename;

  root.unwrap = unwrap;

  root.remove = remove;

  root.wrapRange = wrapRange;

  root.replaceContents = replaceContents;

}).call(this);
;
/*! jQuery v1.7.2 jquery.com | jquery.org/license */
(function(a,b){function cy(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cu(a){if(!cj[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){ck||(ck=c.createElement("iframe"),ck.frameBorder=ck.width=ck.height=0),b.appendChild(ck);if(!cl||!ck.createElement)cl=(ck.contentWindow||ck.contentDocument).document,cl.write((f.support.boxModel?"<!doctype html>":"")+"<html><body>"),cl.close();d=cl.createElement(a),cl.body.appendChild(d),e=f.css(d,"display"),b.removeChild(ck)}cj[a]=e}return cj[a]}function ct(a,b){var c={};f.each(cp.concat.apply([],cp.slice(0,b)),function(){c[this]=a});return c}function cs(){cq=b}function cr(){setTimeout(cs,0);return cq=f.now()}function ci(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ch(){try{return new a.XMLHttpRequest}catch(b){}}function cb(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function ca(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function b_(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bD.test(a)?d(a,e):b_(a+"["+(typeof e=="object"?b:"")+"]",e,c,d)});else if(!c&&f.type(b)==="object")for(var e in b)b_(a+"["+e+"]",b[e],c,d);else d(a,b)}function b$(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function bZ(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bS,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=bZ(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=bZ(a,c,d,e,"*",g));return l}function bY(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bO),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bB(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?1:0,g=4;if(d>0){if(c!=="border")for(;e<g;e+=2)c||(d-=parseFloat(f.css(a,"padding"+bx[e]))||0),c==="margin"?d+=parseFloat(f.css(a,c+bx[e]))||0:d-=parseFloat(f.css(a,"border"+bx[e]+"Width"))||0;return d+"px"}d=by(a,b);if(d<0||d==null)d=a.style[b];if(bt.test(d))return d;d=parseFloat(d)||0;if(c)for(;e<g;e+=2)d+=parseFloat(f.css(a,"padding"+bx[e]))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+bx[e]+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+bx[e]))||0);return d+"px"}function bo(a){var b=c.createElement("div");bh.appendChild(b),b.innerHTML=a.outerHTML;return b.firstChild}function bn(a){var b=(a.nodeName||"").toLowerCase();b==="input"?bm(a):b!=="script"&&typeof a.getElementsByTagName!="undefined"&&f.grep(a.getElementsByTagName("input"),bm)}function bm(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bl(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bk(a,b){var c;b.nodeType===1&&(b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase(),c==="object"?b.outerHTML=a.outerHTML:c!=="input"||a.type!=="checkbox"&&a.type!=="radio"?c==="option"?b.selected=a.defaultSelected:c==="input"||c==="textarea"?b.defaultValue=a.defaultValue:c==="script"&&b.text!==a.text&&(b.text=a.text):(a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value)),b.removeAttribute(f.expando),b.removeAttribute("_submit_attached"),b.removeAttribute("_change_attached"))}function bj(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c,d,e,g=f._data(a),h=f._data(b,g),i=g.events;if(i){delete h.handle,h.events={};for(c in i)for(d=0,e=i[c].length;d<e;d++)f.event.add(b,c,i[c][d])}h.data&&(h.data=f.extend({},h.data))}}function bi(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function U(a){var b=V.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function T(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(O.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function S(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function K(){return!0}function J(){return!1}function n(a,b,c){var d=b+"defer",e=b+"queue",g=b+"mark",h=f._data(a,d);h&&(c==="queue"||!f._data(a,e))&&(c==="mark"||!f._data(a,g))&&setTimeout(function(){!f._data(a,e)&&!f._data(a,g)&&(f.removeData(a,d,!0),h.fire())},0)}function m(a){for(var b in a){if(b==="data"&&f.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function l(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(k,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNumeric(d)?+d:j.test(d)?f.parseJSON(d):d}catch(g){}f.data(a,c,d)}else d=b}return d}function h(a){var b=g[a]={},c,d;a=a.split(/\s+/);for(c=0,d=a.length;c<d;c++)b[a[c]]=!0;return b}var c=a.document,d=a.navigator,e=a.location,f=function(){function J(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(J,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,n=/^[\],:{}\s]*$/,o=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,p=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,q=/(?:^|:|,)(?:\s*\[)+/g,r=/(webkit)[ \/]([\w.]+)/,s=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(msie) ([\w.]+)/,u=/(mozilla)(?:.*? rv:([\w.]+))?/,v=/-([a-z]|[0-9])/ig,w=/^-ms-/,x=function(a,b){return(b+"").toUpperCase()},y=d.userAgent,z,A,B,C=Object.prototype.toString,D=Object.prototype.hasOwnProperty,E=Array.prototype.push,F=Array.prototype.slice,G=String.prototype.trim,H=Array.prototype.indexOf,I={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=m.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.7.2",length:0,size:function(){return this.length},toArray:function(){return F.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?E.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),A.add(a);return this},eq:function(a){a=+a;return a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(F.apply(this,arguments),"slice",F.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:E,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;A.fireWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").off("ready")}},bindReady:function(){if(!A){A=e.Callbacks("once memory");if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",B,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",B),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&J()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a!=null&&a==a.window},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):I[C.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!D.call(a,"constructor")&&!D.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||D.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw new Error(a)},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(n.test(b.replace(o,"@").replace(p,"]").replace(q,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){if(typeof c!="string"||!c)return null;var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(w,"ms-").replace(v,x)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:G?function(a){return a==null?"":G.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?E.call(c,a):e.merge(c,a)}return c},inArray:function(a,b,c){var d;if(b){if(H)return H.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=F.call(arguments,2),g=function(){return a.apply(c,f.concat(F.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h,i){var j,k=d==null,l=0,m=a.length;if(d&&typeof d=="object"){for(l in d)e.access(a,c,l,d[l],1,h,f);g=1}else if(f!==b){j=i===b&&e.isFunction(f),k&&(j?(j=c,c=function(a,b,c){return j.call(e(a),c)}):(c.call(a,f),c=null));if(c)for(;l<m;l++)c(a[l],d,j?f.call(a[l],l,c(a[l],d)):f,i);g=1}return g?a:k?c.call(a):m?c(a[0],d):h},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=r.exec(a)||s.exec(a)||t.exec(a)||a.indexOf("compatible")<0&&u.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){I["[object "+b+"]"]=b.toLowerCase()}),z=e.uaMatch(y),z.browser&&(e.browser[z.browser]=!0,e.browser.version=z.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?B=function(){c.removeEventListener("DOMContentLoaded",B,!1),e.ready()}:c.attachEvent&&(B=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",B),e.ready())});return e}(),g={};f.Callbacks=function(a){a=a?g[a]||h(a):{};var c=[],d=[],e,i,j,k,l,m,n=function(b){var d,e,g,h,i;for(d=0,e=b.length;d<e;d++)g=b[d],h=f.type(g),h==="array"?n(g):h==="function"&&(!a.unique||!p.has(g))&&c.push(g)},o=function(b,f){f=f||[],e=!a.memory||[b,f],i=!0,j=!0,m=k||0,k=0,l=c.length;for(;c&&m<l;m++)if(c[m].apply(b,f)===!1&&a.stopOnFalse){e=!0;break}j=!1,c&&(a.once?e===!0?p.disable():c=[]:d&&d.length&&(e=d.shift(),p.fireWith(e[0],e[1])))},p={add:function(){if(c){var a=c.length;n(arguments),j?l=c.length:e&&e!==!0&&(k=a,o(e[0],e[1]))}return this},remove:function(){if(c){var b=arguments,d=0,e=b.length;for(;d<e;d++)for(var f=0;f<c.length;f++)if(b[d]===c[f]){j&&f<=l&&(l--,f<=m&&m--),c.splice(f--,1);if(a.unique)break}}return this},has:function(a){if(c){var b=0,d=c.length;for(;b<d;b++)if(a===c[b])return!0}return!1},empty:function(){c=[];return this},disable:function(){c=d=e=b;return this},disabled:function(){return!c},lock:function(){d=b,(!e||e===!0)&&p.disable();return this},locked:function(){return!d},fireWith:function(b,c){d&&(j?a.once||d.push([b,c]):(!a.once||!e)&&o(b,c));return this},fire:function(){p.fireWith(this,arguments);return this},fired:function(){return!!i}};return p};var i=[].slice;f.extend({Deferred:function(a){var b=f.Callbacks("once memory"),c=f.Callbacks("once memory"),d=f.Callbacks("memory"),e="pending",g={resolve:b,reject:c,notify:d},h={done:b.add,fail:c.add,progress:d.add,state:function(){return e},isResolved:b.fired,isRejected:c.fired,then:function(a,b,c){i.done(a).fail(b).progress(c);return this},always:function(){i.done.apply(i,arguments).fail.apply(i,arguments);return this},pipe:function(a,b,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[b,"reject"],progress:[c,"notify"]},function(a,b){var c=b[0],e=b[1],g;f.isFunction(c)?i[a](function(){g=c.apply(this,arguments),g&&f.isFunction(g.promise)?g.promise().then(d.resolve,d.reject,d.notify):d[e+"With"](this===i?d:this,[g])}):i[a](d[e])})}).promise()},promise:function(a){if(a==null)a=h;else for(var b in h)a[b]=h[b];return a}},i=h.promise({}),j;for(j in g)i[j]=g[j].fire,i[j+"With"]=g[j].fireWith;i.done(function(){e="resolved"},c.disable,d.lock).fail(function(){e="rejected"},b.disable,d.lock),a&&a.call(i,i);return i},when:function(a){function m(a){return function(b){e[a]=arguments.length>1?i.call(arguments,0):b,j.notifyWith(k,e)}}function l(a){return function(c){b[a]=arguments.length>1?i.call(arguments,0):c,--g||j.resolveWith(j,b)}}var b=i.call(arguments,0),c=0,d=b.length,e=Array(d),g=d,h=d,j=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred(),k=j.promise();if(d>1){for(;c<d;c++)b[c]&&b[c].promise&&f.isFunction(b[c].promise)?b[c].promise().then(l(c),j.reject,m(c)):--g;g||j.resolveWith(j,b)}else j!==a&&j.resolveWith(j,d?[a]:[]);return k}}),f.support=function(){var b,d,e,g,h,i,j,k,l,m,n,o,p=c.createElement("div"),q=c.documentElement;p.setAttribute("className","t"),p.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=p.getElementsByTagName("*"),e=p.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=p.getElementsByTagName("input")[0],b={leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:p.className!=="t",enctype:!!c.createElement("form").enctype,html5Clone:c.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,pixelMargin:!0},f.boxModel=b.boxModel=c.compatMode==="CSS1Compat",i.checked=!0,b.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,b.optDisabled=!h.disabled;try{delete p.test}catch(r){b.deleteExpando=!1}!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",function(){b.noCloneEvent=!1}),p.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),b.radioValue=i.value==="t",i.setAttribute("checked","checked"),i.setAttribute("name","t"),p.appendChild(i),j=c.createDocumentFragment(),j.appendChild(p.lastChild),b.checkClone=j.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=i.checked,j.removeChild(i),j.appendChild(p);if(p.attachEvent)for(n in{submit:1,change:1,focusin:1})m="on"+n,o=m in p,o||(p.setAttribute(m,"return;"),o=typeof p[m]=="function"),b[n+"Bubbles"]=o;j.removeChild(p),j=g=h=p=i=null,f(function(){var d,e,g,h,i,j,l,m,n,q,r,s,t,u=c.getElementsByTagName("body")[0];!u||(m=1,t="padding:0;margin:0;border:",r="position:absolute;top:0;left:0;width:1px;height:1px;",s=t+"0;visibility:hidden;",n="style='"+r+t+"5px solid #000;",q="<div "+n+"display:block;'><div style='"+t+"0;display:block;overflow:hidden;'></div></div>"+"<table "+n+"' cellpadding='0' cellspacing='0'>"+"<tr><td></td></tr></table>",d=c.createElement("div"),d.style.cssText=s+"width:0;height:0;position:static;top:0;margin-top:"+m+"px",u.insertBefore(d,u.firstChild),p=c.createElement("div"),d.appendChild(p),p.innerHTML="<table><tr><td style='"+t+"0;display:none'></td><td>t</td></tr></table>",k=p.getElementsByTagName("td"),o=k[0].offsetHeight===0,k[0].style.display="",k[1].style.display="none",b.reliableHiddenOffsets=o&&k[0].offsetHeight===0,a.getComputedStyle&&(p.innerHTML="",l=c.createElement("div"),l.style.width="0",l.style.marginRight="0",p.style.width="2px",p.appendChild(l),b.reliableMarginRight=(parseInt((a.getComputedStyle(l,null)||{marginRight:0}).marginRight,10)||0)===0),typeof p.style.zoom!="undefined"&&(p.innerHTML="",p.style.width=p.style.padding="1px",p.style.border=0,p.style.overflow="hidden",p.style.display="inline",p.style.zoom=1,b.inlineBlockNeedsLayout=p.offsetWidth===3,p.style.display="block",p.style.overflow="visible",p.innerHTML="<div style='width:5px;'></div>",b.shrinkWrapBlocks=p.offsetWidth!==3),p.style.cssText=r+s,p.innerHTML=q,e=p.firstChild,g=e.firstChild,i=e.nextSibling.firstChild.firstChild,j={doesNotAddBorder:g.offsetTop!==5,doesAddBorderForTableAndCells:i.offsetTop===5},g.style.position="fixed",g.style.top="20px",j.fixedPosition=g.offsetTop===20||g.offsetTop===15,g.style.position=g.style.top="",e.style.overflow="hidden",e.style.position="relative",j.subtractsBorderForOverflowNotVisible=g.offsetTop===-5,j.doesNotIncludeMarginInBodyOffset=u.offsetTop!==m,a.getComputedStyle&&(p.style.marginTop="1%",b.pixelMargin=(a.getComputedStyle(p,null)||{marginTop:0}).marginTop!=="1%"),typeof d.style.zoom!="undefined"&&(d.style.zoom=1),u.removeChild(d),l=p=d=null,f.extend(b,j))});return b}();var j=/^(?:\{.*\}|\[.*\])$/,k=/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!m(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i,j=f.expando,k=typeof c=="string",l=a.nodeType,m=l?f.cache:a,n=l?a[j]:a[j]&&j,o=c==="events";if((!n||!m[n]||!o&&!e&&!m[n].data)&&k&&d===b)return;n||(l?a[j]=n=++f.uuid:n=j),m[n]||(m[n]={},l||(m[n].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?m[n]=f.extend(m[n],c):m[n].data=f.extend(m[n].data,c);g=h=m[n],e||(h.data||(h.data={}),h=h.data),d!==b&&(h[f.camelCase(c)]=d);if(o&&!h[c])return g.events;k?(i=h[c],i==null&&(i=h[f.camelCase(c)])):i=h;return i}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e,g,h=f.expando,i=a.nodeType,j=i?f.cache:a,k=i?a[h]:h;if(!j[k])return;if(b){d=c?j[k]:j[k].data;if(d){f.isArray(b)||(b in d?b=[b]:(b=f.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,g=b.length;e<g;e++)delete d[b[e]];if(!(c?m:f.isEmptyObject)(d))return}}if(!c){delete j[k].data;if(!m(j[k]))return}f.support.deleteExpando||!j.setInterval?delete j[k]:j[k]=null,i&&(f.support.deleteExpando?delete a[h]:a.removeAttribute?a.removeAttribute(h):a[h]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d,e,g,h,i,j=this[0],k=0,m=null;if(a===b){if(this.length){m=f.data(j);if(j.nodeType===1&&!f._data(j,"parsedAttrs")){g=j.attributes;for(i=g.length;k<i;k++)h=g[k].name,h.indexOf("data-")===0&&(h=f.camelCase(h.substring(5)),l(j,h,m[h]));f._data(j,"parsedAttrs",!0)}}return m}if(typeof a=="object")return this.each(function(){f.data(this,a)});d=a.split(".",2),d[1]=d[1]?"."+d[1]:"",e=d[1]+"!";return f.access(this,function(c){if(c===b){m=this.triggerHandler("getData"+e,[d[0]]),m===b&&j&&(m=f.data(j,a),m=l(j,a,m));return m===b&&d[1]?this.data(d[0]):m}d[1]=c,this.each(function(){var b=f(this);b.triggerHandler("setData"+e,d),f.data(this,a,c),b.triggerHandler("changeData"+e,d)})},null,c,arguments.length>1,null,!1)},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,b){a&&(b=(b||"fx")+"mark",f._data(a,b,(f._data(a,b)||0)+1))},_unmark:function(a,b,c){a!==!0&&(c=b,b=a,a=!1);if(b){c=c||"fx";var d=c+"mark",e=a?0:(f._data(b,d)||1)-1;e?f._data(b,d,e):(f.removeData(b,d,!0),n(b,c,"mark"))}},queue:function(a,b,c){var d;if(a){b=(b||"fx")+"queue",d=f._data(a,b),c&&(!d||f.isArray(c)?d=f._data(a,b,f.makeArray(c)):d.push(c));return d||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e={};d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),f._data(a,b+".run",e),d.call(a,function(){f.dequeue(a,b)},e)),c.length||(f.removeData(a,b+"queue "+b+".run",!0),n(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){var d=2;typeof a!="string"&&(c=a,a="fx",d--);if(arguments.length<d)return f.queue(this[0],a);return c===b?this:this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f.Callbacks("once memory"),!0))h++,l.add(m);m();return d.promise(c)}});var o=/[\n\t\r]/g,p=/\s+/,q=/\r/g,r=/^(?:button|input)$/i,s=/^(?:button|input|object|select|textarea)$/i,t=/^a(?:rea)?$/i,u=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,v=f.support.getSetAttribute,w,x,y;f.fn.extend({attr:function(a,b){return f.access(this,f.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,f.prop,a,b,arguments.length>1)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(p);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(p);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(o," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(p);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(o," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,g=this[0];{if(!!arguments.length){e=f.isFunction(a);return this.each(function(d){var g=f(this),h;if(this.nodeType===1){e?h=a.call(this,d,g.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.type]||f.valHooks[this.nodeName.toLowerCase()];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}if(g){c=f.valHooks[g.type]||f.valHooks[g.nodeName.toLowerCase()];if(c&&"get"in c&&(d=c.get(g,"value"))!==b)return d;d=g.value;return typeof d=="string"?d.replace(q,""):d==null?"":d}}}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,g=a.selectedIndex,h=[],i=a.options,j=a.type==="select-one";if(g<0)return null;c=j?g:0,d=j?g+1:i.length;for(;c<d;c++){e=i[c];if(e.selected&&(f.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!f.nodeName(e.parentNode,"optgroup"))){b=f(e).val();if(j)return b;h.push(b)}}if(j&&!h.length&&i.length)return f(i[g]).val();return h},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(a,c,d,e){var g,h,i,j=a.nodeType;if(!!a&&j!==3&&j!==8&&j!==2){if(e&&c in f.attrFn)return f(a)[c](d);if(typeof a.getAttribute=="undefined")return f.prop(a,c,d);i=j!==1||!f.isXMLDoc(a),i&&(c=c.toLowerCase(),h=f.attrHooks[c]||(u.test(c)?x:w));if(d!==b){if(d===null){f.removeAttr(a,c);return}if(h&&"set"in h&&i&&(g=h.set(a,d,c))!==b)return g;a.setAttribute(c,""+d);return d}if(h&&"get"in h&&i&&(g=h.get(a,c))!==null)return g;g=a.getAttribute(c);return g===null?b:g}},removeAttr:function(a,b){var c,d,e,g,h,i=0;if(b&&a.nodeType===1){d=b.toLowerCase().split(p),g=d.length;for(;i<g;i++)e=d[i],e&&(c=f.propFix[e]||e,h=u.test(e),h||f.attr(a,e,""),a.removeAttribute(v?e:c),h&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(r.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},value:{get:function(a,b){if(w&&f.nodeName(a,"button"))return w.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(w&&f.nodeName(a,"button"))return w.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,g,h,i=a.nodeType;if(!!a&&i!==3&&i!==8&&i!==2){h=i!==1||!f.isXMLDoc(a),h&&(c=f.propFix[c]||c,g=f.propHooks[c]);return d!==b?g&&"set"in g&&(e=g.set(a,d,c))!==b?e:a[c]=d:g&&"get"in g&&(e=g.get(a,c))!==null?e:a[c]}},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):s.test(a.nodeName)||t.test(a.nodeName)&&a.href?0:b}}}}),f.attrHooks.tabindex=f.propHooks.tabIndex,x={get:function(a,c){var d,e=f.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},v||(y={name:!0,id:!0,coords:!0},w=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&(y[c]?d.nodeValue!=="":d.specified)?d.nodeValue:b},set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}},f.attrHooks.tabindex.set=w.set,f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})}),f.attrHooks.contenteditable={get:w.get,set:function(a,b,c){b===""&&(b="false"),w.set(a,b,c)}}),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);return null}})),f.support.enctype||(f.propFix.enctype="encoding"),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var z=/^(?:textarea|input|select)$/i,A=/^([^\.]*)?(?:\.(.+))?$/,B=/(?:^|\s)hover(\.\S+)?\b/,C=/^key/,D=/^(?:mouse|contextmenu)|click/,E=/^(?:focusinfocus|focusoutblur)$/,F=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,G=function(
a){var b=F.exec(a);b&&(b[1]=(b[1]||"").toLowerCase(),b[3]=b[3]&&new RegExp("(?:^|\\s)"+b[3]+"(?:\\s|$)"));return b},H=function(a,b){var c=a.attributes||{};return(!b[1]||a.nodeName.toLowerCase()===b[1])&&(!b[2]||(c.id||{}).value===b[2])&&(!b[3]||b[3].test((c["class"]||{}).value))},I=function(a){return f.event.special.hover?a:a.replace(B,"mouseenter$1 mouseleave$1")};f.event={add:function(a,c,d,e,g){var h,i,j,k,l,m,n,o,p,q,r,s;if(!(a.nodeType===3||a.nodeType===8||!c||!d||!(h=f._data(a)))){d.handler&&(p=d,d=p.handler,g=p.selector),d.guid||(d.guid=f.guid++),j=h.events,j||(h.events=j={}),i=h.handle,i||(h.handle=i=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.dispatch.apply(i.elem,arguments):b},i.elem=a),c=f.trim(I(c)).split(" ");for(k=0;k<c.length;k++){l=A.exec(c[k])||[],m=l[1],n=(l[2]||"").split(".").sort(),s=f.event.special[m]||{},m=(g?s.delegateType:s.bindType)||m,s=f.event.special[m]||{},o=f.extend({type:m,origType:l[1],data:e,handler:d,guid:d.guid,selector:g,quick:g&&G(g),namespace:n.join(".")},p),r=j[m];if(!r){r=j[m]=[],r.delegateCount=0;if(!s.setup||s.setup.call(a,e,n,i)===!1)a.addEventListener?a.addEventListener(m,i,!1):a.attachEvent&&a.attachEvent("on"+m,i)}s.add&&(s.add.call(a,o),o.handler.guid||(o.handler.guid=d.guid)),g?r.splice(r.delegateCount++,0,o):r.push(o),f.event.global[m]=!0}a=null}},global:{},remove:function(a,b,c,d,e){var g=f.hasData(a)&&f._data(a),h,i,j,k,l,m,n,o,p,q,r,s;if(!!g&&!!(o=g.events)){b=f.trim(I(b||"")).split(" ");for(h=0;h<b.length;h++){i=A.exec(b[h])||[],j=k=i[1],l=i[2];if(!j){for(j in o)f.event.remove(a,j+b[h],c,d,!0);continue}p=f.event.special[j]||{},j=(d?p.delegateType:p.bindType)||j,r=o[j]||[],m=r.length,l=l?new RegExp("(^|\\.)"+l.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;for(n=0;n<r.length;n++)s=r[n],(e||k===s.origType)&&(!c||c.guid===s.guid)&&(!l||l.test(s.namespace))&&(!d||d===s.selector||d==="**"&&s.selector)&&(r.splice(n--,1),s.selector&&r.delegateCount--,p.remove&&p.remove.call(a,s));r.length===0&&m!==r.length&&((!p.teardown||p.teardown.call(a,l)===!1)&&f.removeEvent(a,j,g.handle),delete o[j])}f.isEmptyObject(o)&&(q=g.handle,q&&(q.elem=null),f.removeData(a,["events","handle"],!0))}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){if(!e||e.nodeType!==3&&e.nodeType!==8){var h=c.type||c,i=[],j,k,l,m,n,o,p,q,r,s;if(E.test(h+f.event.triggered))return;h.indexOf("!")>=0&&(h=h.slice(0,-1),k=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if((!e||f.event.customEvent[h])&&!f.event.global[h])return;c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.isTrigger=!0,c.exclusive=k,c.namespace=i.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)"):null,o=h.indexOf(":")<0?"on"+h:"";if(!e){j=f.cache;for(l in j)j[l].events&&j[l].events[h]&&f.event.trigger(c,d,j[l].handle.elem,!0);return}c.result=b,c.target||(c.target=e),d=d!=null?f.makeArray(d):[],d.unshift(c),p=f.event.special[h]||{};if(p.trigger&&p.trigger.apply(e,d)===!1)return;r=[[e,p.bindType||h]];if(!g&&!p.noBubble&&!f.isWindow(e)){s=p.delegateType||h,m=E.test(s+h)?e:e.parentNode,n=null;for(;m;m=m.parentNode)r.push([m,s]),n=m;n&&n===e.ownerDocument&&r.push([n.defaultView||n.parentWindow||a,s])}for(l=0;l<r.length&&!c.isPropagationStopped();l++)m=r[l][0],c.type=r[l][1],q=(f._data(m,"events")||{})[c.type]&&f._data(m,"handle"),q&&q.apply(m,d),q=o&&m[o],q&&f.acceptData(m)&&q.apply(m,d)===!1&&c.preventDefault();c.type=h,!g&&!c.isDefaultPrevented()&&(!p._default||p._default.apply(e.ownerDocument,d)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)&&o&&e[h]&&(h!=="focus"&&h!=="blur"||c.target.offsetWidth!==0)&&!f.isWindow(e)&&(n=e[o],n&&(e[o]=null),f.event.triggered=h,e[h](),f.event.triggered=b,n&&(e[o]=n));return c.result}},dispatch:function(c){c=f.event.fix(c||a.event);var d=(f._data(this,"events")||{})[c.type]||[],e=d.delegateCount,g=[].slice.call(arguments,0),h=!c.exclusive&&!c.namespace,i=f.event.special[c.type]||{},j=[],k,l,m,n,o,p,q,r,s,t,u;g[0]=c,c.delegateTarget=this;if(!i.preDispatch||i.preDispatch.call(this,c)!==!1){if(e&&(!c.button||c.type!=="click")){n=f(this),n.context=this.ownerDocument||this;for(m=c.target;m!=this;m=m.parentNode||this)if(m.disabled!==!0){p={},r=[],n[0]=m;for(k=0;k<e;k++)s=d[k],t=s.selector,p[t]===b&&(p[t]=s.quick?H(m,s.quick):n.is(t)),p[t]&&r.push(s);r.length&&j.push({elem:m,matches:r})}}d.length>e&&j.push({elem:this,matches:d.slice(e)});for(k=0;k<j.length&&!c.isPropagationStopped();k++){q=j[k],c.currentTarget=q.elem;for(l=0;l<q.matches.length&&!c.isImmediatePropagationStopped();l++){s=q.matches[l];if(h||!c.namespace&&!s.namespace||c.namespace_re&&c.namespace_re.test(s.namespace))c.data=s.data,c.handleObj=s,o=((f.event.special[s.origType]||{}).handle||s.handler).apply(q.elem,g),o!==b&&(c.result=o,o===!1&&(c.preventDefault(),c.stopPropagation()))}}i.postDispatch&&i.postDispatch.call(this,c);return c.result}},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode);return a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,d){var e,f,g,h=d.button,i=d.fromElement;a.pageX==null&&d.clientX!=null&&(e=a.target.ownerDocument||c,f=e.documentElement,g=e.body,a.pageX=d.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=d.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?d.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0);return a}},fix:function(a){if(a[f.expando])return a;var d,e,g=a,h=f.event.fixHooks[a.type]||{},i=h.props?this.props.concat(h.props):this.props;a=f.Event(g);for(d=i.length;d;)e=i[--d],a[e]=g[e];a.target||(a.target=g.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey===b&&(a.metaKey=a.ctrlKey);return h.filter?h.filter(a,g):a},special:{ready:{setup:f.bindReady},load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=f.extend(new f.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?f.event.trigger(e,null,b):f.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},f.event.handle=f.event.dispatch,f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!(this instanceof f.Event))return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?K:J):this.type=a,b&&f.extend(this,b),this.timeStamp=a&&a.timeStamp||f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=K;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=K;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=K,this.stopPropagation()},isDefaultPrevented:J,isPropagationStopped:J,isImmediatePropagationStopped:J},f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c=this,d=a.relatedTarget,e=a.handleObj,g=e.selector,h;if(!d||d!==c&&!f.contains(c,d))a.type=e.origType,h=e.handler.apply(this,arguments),a.type=b;return h}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(){if(f.nodeName(this,"form"))return!1;f.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=f.nodeName(c,"input")||f.nodeName(c,"button")?c.form:b;d&&!d._submit_attached&&(f.event.add(d,"submit._submit",function(a){a._submit_bubble=!0}),d._submit_attached=!0)})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&f.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){if(f.nodeName(this,"form"))return!1;f.event.remove(this,"._submit")}}),f.support.changeBubbles||(f.event.special.change={setup:function(){if(z.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")f.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),f.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1,f.event.simulate("change",this,a,!0))});return!1}f.event.add(this,"beforeactivate._change",function(a){var b=a.target;z.test(b.nodeName)&&!b._change_attached&&(f.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&f.event.simulate("change",this.parentNode,a,!0)}),b._change_attached=!0)})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){f.event.remove(this,"._change");return z.test(this.nodeName)}}),f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){var d=0,e=function(a){f.event.simulate(b,a.target,f.event.fix(a),!0)};f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.fn.extend({on:function(a,c,d,e,g){var h,i;if(typeof a=="object"){typeof c!="string"&&(d=d||c,c=b);for(i in a)this.on(i,c,d,a[i],g);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=J;else if(!e)return this;g===1&&(h=e,e=function(a){f().off(a);return h.apply(this,arguments)},e.guid=h.guid||(h.guid=f.guid++));return this.each(function(){f.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,c,d){if(a&&a.preventDefault&&a.handleObj){var e=a.handleObj;f(a.delegateTarget).off(e.namespace?e.origType+"."+e.namespace:e.origType,e.selector,e.handler);return this}if(typeof a=="object"){for(var g in a)this.off(g,c,a[g]);return this}if(c===!1||typeof c=="function")d=c,c=b;d===!1&&(d=J);return this.each(function(){f.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){f(this.context).on(a,this.selector,b,c);return this},die:function(a,b){f(this.context).off(a,this.selector||"**",b);return this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a,c)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f._data(this,"lastToggle"+a.guid)||0)%d;f._data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.on(b,null,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0),C.test(b)&&(f.event.fixHooks[b]=f.event.keyHooks),D.test(b)&&(f.event.fixHooks[b]=f.event.mouseHooks)}),function(){function x(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}if(j.nodeType===1){g||(j[d]=c,j.sizset=h);if(typeof b!="string"){if(j===b){k=!0;break}}else if(m.filter(b,[j]).length>0){k=j;break}}j=j[a]}e[h]=k}}}function w(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}j.nodeType===1&&!g&&(j[d]=c,j.sizset=h);if(j.nodeName.toLowerCase()===b){k=j;break}j=j[a]}e[h]=k}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d="sizcache"+(Math.random()+"").replace(".",""),e=0,g=Object.prototype.toString,h=!1,i=!0,j=/\\/g,k=/\r\n/g,l=/\W/;[0,0].sort(function(){i=!1;return 0});var m=function(b,d,e,f){e=e||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return e;var i,j,k,l,n,q,r,t,u=!0,v=m.isXML(d),w=[],x=b;do{a.exec(""),i=a.exec(x);if(i){x=i[3],w.push(i[1]);if(i[2]){l=i[3];break}}}while(i);if(w.length>1&&p.exec(b))if(w.length===2&&o.relative[w[0]])j=y(w[0]+w[1],d,f);else{j=o.relative[w[0]]?[d]:m(w.shift(),d);while(w.length)b=w.shift(),o.relative[b]&&(b+=w.shift()),j=y(b,j,f)}else{!f&&w.length>1&&d.nodeType===9&&!v&&o.match.ID.test(w[0])&&!o.match.ID.test(w[w.length-1])&&(n=m.find(w.shift(),d,v),d=n.expr?m.filter(n.expr,n.set)[0]:n.set[0]);if(d){n=f?{expr:w.pop(),set:s(f)}:m.find(w.pop(),w.length===1&&(w[0]==="~"||w[0]==="+")&&d.parentNode?d.parentNode:d,v),j=n.expr?m.filter(n.expr,n.set):n.set,w.length>0?k=s(j):u=!1;while(w.length)q=w.pop(),r=q,o.relative[q]?r=w.pop():q="",r==null&&(r=d),o.relative[q](k,r,v)}else k=w=[]}k||(k=j),k||m.error(q||b);if(g.call(k)==="[object Array]")if(!u)e.push.apply(e,k);else if(d&&d.nodeType===1)for(t=0;k[t]!=null;t++)k[t]&&(k[t]===!0||k[t].nodeType===1&&m.contains(d,k[t]))&&e.push(j[t]);else for(t=0;k[t]!=null;t++)k[t]&&k[t].nodeType===1&&e.push(j[t]);else s(k,e);l&&(m(l,h,e,f),m.uniqueSort(e));return e};m.uniqueSort=function(a){if(u){h=i,a.sort(u);if(h)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},m.matches=function(a,b){return m(a,null,null,b)},m.matchesSelector=function(a,b){return m(b,null,null,[a]).length>0},m.find=function(a,b,c){var d,e,f,g,h,i;if(!a)return[];for(e=0,f=o.order.length;e<f;e++){h=o.order[e];if(g=o.leftMatch[h].exec(a)){i=g[1],g.splice(1,1);if(i.substr(i.length-1)!=="\\"){g[1]=(g[1]||"").replace(j,""),d=o.find[h](g,b,c);if(d!=null){a=a.replace(o.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},m.filter=function(a,c,d,e){var f,g,h,i,j,k,l,n,p,q=a,r=[],s=c,t=c&&c[0]&&m.isXML(c[0]);while(a&&c.length){for(h in o.filter)if((f=o.leftMatch[h].exec(a))!=null&&f[2]){k=o.filter[h],l=f[1],g=!1,f.splice(1,1);if(l.substr(l.length-1)==="\\")continue;s===r&&(r=[]);if(o.preFilter[h]){f=o.preFilter[h](f,s,d,r,e,t);if(!f)g=i=!0;else if(f===!0)continue}if(f)for(n=0;(j=s[n])!=null;n++)j&&(i=k(j,f,n,s),p=e^i,d&&i!=null?p?g=!0:s[n]=!1:p&&(r.push(j),g=!0));if(i!==b){d||(s=r),a=a.replace(o.match[h],"");if(!g)return[];break}}if(a===q)if(g==null)m.error(a);else break;q=a}return s},m.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)};var n=m.getText=function(a){var b,c,d=a.nodeType,e="";if(d){if(d===1||d===9||d===11){if(typeof a.textContent=="string")return a.textContent;if(typeof a.innerText=="string")return a.innerText.replace(k,"");for(a=a.firstChild;a;a=a.nextSibling)e+=n(a)}else if(d===3||d===4)return a.nodeValue}else for(b=0;c=a[b];b++)c.nodeType!==8&&(e+=n(c));return e},o=m.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!l.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&m.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!l.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&m.filter(b,a,!0)}},"":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("parentNode",b,f,a,d,c)},"~":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("previousSibling",b,f,a,d,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(j,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(j,"")},TAG:function(a,b){return a[1].replace(j,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||m.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&m.error(a[0]);a[0]=e++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(j,"");!f&&o.attrMap[g]&&(a[1]=o.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(j,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=m(b[3],null,null,c);else{var g=m.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(o.match.POS.test(b[0])||o.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!m(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=o.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||n([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}m.error(e)},CHILD:function(a,b){var c,e,f,g,h,i,j,k=b[1],l=a;switch(k){case"only":case"first":while(l=l.previousSibling)if(l.nodeType===1)return!1;if(k==="first")return!0;l=a;case"last":while(l=l.nextSibling)if(l.nodeType===1)return!1;return!0;case"nth":c=b[2],e=b[3];if(c===1&&e===0)return!0;f=b[0],g=a.parentNode;if(g&&(g[d]!==f||!a.nodeIndex)){i=0;for(l=g.firstChild;l;l=l.nextSibling)l.nodeType===1&&(l.nodeIndex=++i);g[d]=f}j=a.nodeIndex-e;return c===0?j===0:j%c===0&&j/c>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||!!a.nodeName&&a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=m.attr?m.attr(a,c):o.attrHandle[c]?o.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":!f&&m.attr?d!=null:f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=o.setFilters[e];if(f)return f(a,c,b,d)}}},p=o.match.POS,q=function(a,b){return"\\"+(b-0+1)};for(var r in o.match)o.match[r]=new RegExp(o.match[r].source+/(?![^\[]*\])(?![^\(]*\))/.source),o.leftMatch[r]=new RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[r].source.replace(/\\(\d+)/g,q));o.match.globalPOS=p;var s=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(t){s=function(a,b){var c=0,d=b||[];if(g.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var e=a.length;c<e;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var u,v;c.documentElement.compareDocumentPosition?u=function(a,b){if(a===b){h=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(u=function(a,b){if(a===b){h=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,i=b.parentNode,j=g;if(g===i)return v(a,b);if(!g)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return v(e[k],f[k]);return k===c?v(a,f[k],-1):v(e[k],b,1)},v=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(o.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},o.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(o.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(o.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=m,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){m=function(b,e,f,g){e=e||c;if(!g&&!m.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return s(e.getElementsByTagName(b),f);if(h[2]&&o.find.CLASS&&e.getElementsByClassName)return s(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return s([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return s([],f);if(i.id===h[3])return s([i],f)}try{return s(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var k=e,l=e.getAttribute("id"),n=l||d,p=e.parentNode,q=/^\s*[+~]/.test(b);l?n=n.replace(/'/g,"\\$&"):e.setAttribute("id",n),q&&p&&(e=e.parentNode);try{if(!q||p)return s(e.querySelectorAll("[id='"+n+"'] "+b),f)}catch(r){}finally{l||k.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)m[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}m.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!m.isXML(a))try{if(e||!o.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return m(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;o.order.splice(1,0,"CLASS"),o.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?m.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?m.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:m.contains=function(){return!1},m.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var y=function(a,b,c){var d,e=[],f="",g=b.nodeType?[b]:b;while(d=o.match.PSEUDO.exec(a))f+=d[0],a=a.replace(o.match.PSEUDO,"");a=o.relative[a]?a+"*":a;for(var h=0,i=g.length;h<i;h++)m(a,g[h],e,c);return m.filter(f,e)};m.attr=f.attr,m.selectors.attrMap={},f.find=m,f.expr=m.selectors,f.expr[":"]=f.expr.filters,f.unique=m.uniqueSort,f.text=m.getText,f.isXMLDoc=m.isXML,f.contains=m.contains}();var L=/Until$/,M=/^(?:parents|prevUntil|prevAll)/,N=/,/,O=/^.[^:#\[\.,]*$/,P=Array.prototype.slice,Q=f.expr.match.globalPOS,R={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(T(this,a,!1),"not",a)},filter:function(a){return this.pushStack(T(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?Q.test(a)?f(a,this.context).index(this[0])>=0:f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h=1;while(g&&g.ownerDocument&&g!==b){for(d=0;d<a.length;d++)f(g).is(a[d])&&c.push({selector:a[d],elem:g,level:h});g=g.parentNode,h++}return c}var i=Q.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(i?i.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a)return this[0]&&this[0].parentNode?this.prevAll().length:-1;if(typeof a=="string")return f.inArray(this[0],f(a));return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(S(c[0])||S(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c);L.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!R[a]?f.unique(e):e,(this.length>1||N.test(d))&&M.test(a)&&(e=e.reverse());return this.pushStack(e,a,P.call(arguments).join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var V="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",W=/ jQuery\d+="(?:\d+|null)"/g,X=/^\s+/,Y=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Z=/<([\w:]+)/,$=/<tbody/i,_=/<|&#?\w+;/,ba=/<(?:script|style)/i,bb=/<(?:script|object|embed|option|style)/i,bc=new RegExp("<(?:"+V+")[\\s/>]","i"),bd=/checked\s*(?:[^=]|=\s*.checked.)/i,be=/\/(java|ecma)script/i,bf=/^\s*<!(?:\[CDATA\[|\-\-)/,bg={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bh=U(c);bg.optgroup=bg.option,bg.tbody=bg.tfoot=bg.colgroup=bg.caption=bg.thead,bg.th=bg.td,f.support.htmlSerialize||(bg._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){return f.access(this,function(a){return a===b?f.text(this):this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a))},null,a,arguments.length)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=f.isFunction(a);return this.each(function(c){f(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f
.clean(arguments);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f.clean(arguments));return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){return f.access(this,function(a){var c=this[0]||{},d=0,e=this.length;if(a===b)return c.nodeType===1?c.innerHTML.replace(W,""):null;if(typeof a=="string"&&!ba.test(a)&&(f.support.leadingWhitespace||!X.test(a))&&!bg[(Z.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Y,"<$1></$2>");try{for(;d<e;d++)c=this[d]||{},c.nodeType===1&&(f.cleanData(c.getElementsByTagName("*")),c.innerHTML=a);c=0}catch(g){}}c&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bd.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bi(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,function(a,b){b.src?f.ajax({type:"GET",global:!1,url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bf,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)})}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i,j=a[0];b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof j=="string"&&j.length<512&&i===c&&j.charAt(0)==="<"&&!bb.test(j)&&(f.support.checkClone||!bd.test(j))&&(f.support.html5Clone||!bc.test(j))&&(g=!0,h=f.fragments[j],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[j]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d,e,g,h=f.support.html5Clone||f.isXMLDoc(a)||!bc.test("<"+a.nodeName+">")?a.cloneNode(!0):bo(a);if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bk(a,h),d=bl(a),e=bl(h);for(g=0;d[g];++g)e[g]&&bk(d[g],e[g])}if(b){bj(a,h);if(c){d=bl(a),e=bl(h);for(g=0;d[g];++g)bj(d[g],e[g])}}d=e=null;return h},clean:function(a,b,d,e){var g,h,i,j=[];b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);for(var k=0,l;(l=a[k])!=null;k++){typeof l=="number"&&(l+="");if(!l)continue;if(typeof l=="string")if(!_.test(l))l=b.createTextNode(l);else{l=l.replace(Y,"<$1></$2>");var m=(Z.exec(l)||["",""])[1].toLowerCase(),n=bg[m]||bg._default,o=n[0],p=b.createElement("div"),q=bh.childNodes,r;b===c?bh.appendChild(p):U(b).appendChild(p),p.innerHTML=n[1]+l+n[2];while(o--)p=p.lastChild;if(!f.support.tbody){var s=$.test(l),t=m==="table"&&!s?p.firstChild&&p.firstChild.childNodes:n[1]==="<table>"&&!s?p.childNodes:[];for(i=t.length-1;i>=0;--i)f.nodeName(t[i],"tbody")&&!t[i].childNodes.length&&t[i].parentNode.removeChild(t[i])}!f.support.leadingWhitespace&&X.test(l)&&p.insertBefore(b.createTextNode(X.exec(l)[0]),p.firstChild),l=p.childNodes,p&&(p.parentNode.removeChild(p),q.length>0&&(r=q[q.length-1],r&&r.parentNode&&r.parentNode.removeChild(r)))}var u;if(!f.support.appendChecked)if(l[0]&&typeof (u=l.length)=="number")for(i=0;i<u;i++)bn(l[i]);else bn(l);l.nodeType?j.push(l):j=f.merge(j,l)}if(d){g=function(a){return!a.type||be.test(a.type)};for(k=0;j[k];k++){h=j[k];if(e&&f.nodeName(h,"script")&&(!h.type||be.test(h.type)))e.push(h.parentNode?h.parentNode.removeChild(h):h);else{if(h.nodeType===1){var v=f.grep(h.getElementsByTagName("script"),g);j.splice.apply(j,[k+1,0].concat(v))}d.appendChild(h)}}}return j},cleanData:function(a){var b,c,d=f.cache,e=f.event.special,g=f.support.deleteExpando;for(var h=0,i;(i=a[h])!=null;h++){if(i.nodeName&&f.noData[i.nodeName.toLowerCase()])continue;c=i[f.expando];if(c){b=d[c];if(b&&b.events){for(var j in b.events)e[j]?f.event.remove(i,j):f.removeEvent(i,j,b.handle);b.handle&&(b.handle.elem=null)}g?delete i[f.expando]:i.removeAttribute&&i.removeAttribute(f.expando),delete d[c]}}}});var bp=/alpha\([^)]*\)/i,bq=/opacity=([^)]*)/,br=/([A-Z]|^ms)/g,bs=/^[\-+]?(?:\d*\.)?\d+$/i,bt=/^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,bu=/^([\-+])=([\-+.\de]+)/,bv=/^margin/,bw={position:"absolute",visibility:"hidden",display:"block"},bx=["Top","Right","Bottom","Left"],by,bz,bA;f.fn.css=function(a,c){return f.access(this,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)},a,c,arguments.length>1)},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=by(a,"opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d,h==="string"&&(g=bu.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");if(d==null||h==="number"&&isNaN(d))return;h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(by)return by(a,c)},swap:function(a,b,c){var d={},e,f;for(f in b)d[f]=a.style[f],a.style[f]=b[f];e=c.call(a);for(f in b)a.style[f]=d[f];return e}}),f.curCSS=f.css,c.defaultView&&c.defaultView.getComputedStyle&&(bz=function(a,b){var c,d,e,g,h=a.style;b=b.replace(br,"-$1").toLowerCase(),(d=a.ownerDocument.defaultView)&&(e=d.getComputedStyle(a,null))&&(c=e.getPropertyValue(b),c===""&&!f.contains(a.ownerDocument.documentElement,a)&&(c=f.style(a,b))),!f.support.pixelMargin&&e&&bv.test(b)&&bt.test(c)&&(g=h.width,h.width=c,c=e.width,h.width=g);return c}),c.documentElement.currentStyle&&(bA=function(a,b){var c,d,e,f=a.currentStyle&&a.currentStyle[b],g=a.style;f==null&&g&&(e=g[b])&&(f=e),bt.test(f)&&(c=g.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),g.left=b==="fontSize"?"1em":f,f=g.pixelLeft+"px",g.left=c,d&&(a.runtimeStyle.left=d));return f===""?"auto":f}),by=bz||bA,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){if(c)return a.offsetWidth!==0?bB(a,b,d):f.swap(a,bw,function(){return bB(a,b,d)})},set:function(a,b){return bs.test(b)?b+"px":b}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return bq.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNumeric(b)?"alpha(opacity="+b*100+")":"",g=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&f.trim(g.replace(bp,""))===""){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bp.test(g)?g.replace(bp,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){return f.swap(a,{display:"inline-block"},function(){return b?by(a,"margin-right"):a.style.marginRight})}})}),f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style&&a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)}),f.each({margin:"",padding:"",border:"Width"},function(a,b){f.cssHooks[a+b]={expand:function(c){var d,e=typeof c=="string"?c.split(" "):[c],f={};for(d=0;d<4;d++)f[a+bx[d]+b]=e[d]||e[d-2]||e[0];return f}}});var bC=/%20/g,bD=/\[\]$/,bE=/\r?\n/g,bF=/#.*$/,bG=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bH=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bI=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bJ=/^(?:GET|HEAD)$/,bK=/^\/\//,bL=/\?/,bM=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bN=/^(?:select|textarea)/i,bO=/\s+/,bP=/([?&])_=[^&]*/,bQ=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bR=f.fn.load,bS={},bT={},bU,bV,bW=["*/"]+["*"];try{bU=e.href}catch(bX){bU=c.createElement("a"),bU.href="",bU=bU.href}bV=bQ.exec(bU.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bR)return bR.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bM,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bN.test(this.nodeName)||bH.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bE,"\r\n")}}):{name:b.name,value:c.replace(bE,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.on(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?b$(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),b$(a,b);return a},ajaxSettings:{url:bU,isLocal:bI.test(bV[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bW},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:bY(bS),ajaxTransport:bY(bT),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;var o,r,u,w=c,x=l?ca(d,v,l):b,y,z;if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified"))f.lastModified[k]=y;if(z=v.getResponseHeader("Etag"))f.etag[k]=z}if(a===304)w="notmodified",o=!0;else try{r=cb(d,x),w="success",o=!0}catch(A){w="parsererror",u=A}}else{u=w;if(!w||a)w="error",a<0&&(a=0)}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.fireWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f.Callbacks("once memory"),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bG.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.add,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bF,"").replace(bK,bV[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bO),d.crossDomain==null&&(r=bQ.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bV[1]&&r[2]==bV[2]&&(r[3]||(r[1]==="http:"?80:443))==(bV[3]||(bV[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),bZ(bS,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bJ.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bL.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bP,"$1_="+x);d.url=y+(y===d.url?(bL.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bW+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=bZ(bT,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){if(s<2)w(-1,z);else throw z}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)b_(g,a[g],c,e);return d.join("&").replace(bC,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var cc=f.now(),cd=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+cc++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=typeof b.data=="string"&&/^application\/x\-www\-form\-urlencoded/.test(b.contentType);if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(cd.test(b.url)||e&&cd.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(cd,l),b.url===j&&(e&&(k=k.replace(cd,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var ce=a.ActiveXObject?function(){for(var a in cg)cg[a](0,1)}:!1,cf=0,cg;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ch()||ci()}:ch,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,ce&&delete cg[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n);try{m.text=h.responseText}catch(a){}try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cf,ce&&(cg||(cg={},f(a).unload(ce)),cg[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var cj={},ck,cl,cm=/^(?:toggle|show|hide)$/,cn=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,co,cp=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cq;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(ct("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),(e===""&&f.css(d,"display")==="none"||!f.contains(d.ownerDocument.documentElement,d))&&f._data(d,"olddisplay",cu(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(ct("hide",3),a,b,c);var d,e,g=0,h=this.length;for(;g<h;g++)d=this[g],d.style&&(e=f.css(d,"display"),e!=="none"&&!f._data(d,"olddisplay")&&f._data(d,"olddisplay",e));for(g=0;g<h;g++)this[g].style&&(this[g].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(ct("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){function g(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o,p,q;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]);if((k=f.cssHooks[g])&&"expand"in k){l=k.expand(a[g]),delete a[g];for(i in l)i in a||(a[i]=l[i])}}for(g in a){h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(!f.support.inlineBlockNeedsLayout||cu(this.nodeName)==="inline"?this.style.display="inline-block":this.style.zoom=1))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)j=new f.fx(this,b,i),h=a[i],cm.test(h)?(q=f._data(this,"toggle"+i)||(h==="toggle"?d?"show":"hide":0),q?(f._data(this,"toggle"+i,q==="show"?"hide":"show"),j[q]()):j[h]()):(m=cn.exec(h),n=j.cur(),m?(o=parseFloat(m[2]),p=m[3]||(f.cssNumber[i]?"":"px"),p!=="px"&&(f.style(this,i,(o||1)+p),n=(o||1)/j.cur()*n,f.style(this,i,n+p)),m[1]&&(o=(m[1]==="-="?-1:1)*o+n),j.custom(n,o,p)):j.custom(n,h,""));return!0}var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return e.queue===!1?this.each(g):this.queue(e.queue,g)},stop:function(a,c,d){typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]);return this.each(function(){function h(a,b,c){var e=b[c];f.removeData(a,c,!0),e.stop(d)}var b,c=!1,e=f.timers,g=f._data(this);d||f._unmark(!0,this);if(a==null)for(b in g)g[b]&&g[b].stop&&b.indexOf(".run")===b.length-4&&h(this,g,b);else g[b=a+".run"]&&g[b].stop&&h(this,g,b);for(b=e.length;b--;)e[b].elem===this&&(a==null||e[b].queue===a)&&(d?e[b](!0):e[b].saveState(),c=!0,e.splice(b,1));(!d||!c)&&f.dequeue(this,a)})}}),f.each({slideDown:ct("show",1),slideUp:ct("hide",1),slideToggle:ct("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue?f.dequeue(this,d.queue):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a){return a},swing:function(a){return-Math.cos(a*Math.PI)/2+.5}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,c,d){function h(a){return e.step(a)}var e=this,g=f.fx;this.startTime=cq||cr(),this.end=c,this.now=this.start=a,this.pos=this.state=0,this.unit=d||this.unit||(f.cssNumber[this.prop]?"":"px"),h.queue=this.options.queue,h.elem=this.elem,h.saveState=function(){f._data(e.elem,"fxshow"+e.prop)===b&&(e.options.hide?f._data(e.elem,"fxshow"+e.prop,e.start):e.options.show&&f._data(e.elem,"fxshow"+e.prop,e.end))},h()&&f.timers.push(h)&&!co&&(co=setInterval(g.tick,g.interval))},show:function(){var a=f._data(this.elem,"fxshow"+this.prop);this.options.orig[this.prop]=a||f.style(this.elem,this.prop),this.options.show=!0,a!==b?this.custom(this.cur(),a):this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f._data(this.elem,"fxshow"+this.prop)||f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b,c,d,e=cq||cr(),g=!0,h=this.elem,i=this.options;if(a||e>=i.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),i.animatedProperties[this.prop]=!0;for(b in i.animatedProperties)i.animatedProperties[b]!==!0&&(g=!1);if(g){i.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){h.style["overflow"+b]=i.overflow[a]}),i.hide&&f(h).hide();if(i.hide||i.show)for(b in i.animatedProperties)f.style(h,b,i.orig[b]),f.removeData(h,"fxshow"+b,!0),f.removeData(h,"toggle"+b,!0);d=i.complete,d&&(i.complete=!1,d.call(h))}return!1}i.duration==Infinity?this.now=e:(c=e-this.startTime,this.state=c/i.duration,this.pos=f.easing[i.animatedProperties[this.prop]](this.state,c,0,1,i.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){var a,b=f.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||f.fx.stop()},interval:13,stop:function(){clearInterval(co),co=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=a.now+a.unit:a.elem[a.prop]=a.now}}}),f.each(cp.concat.apply([],cp),function(a,b){b.indexOf("margin")&&(f.fx.step[b]=function(a){f.style(a.elem,b,Math.max(0,a.now)+a.unit)})}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cv,cw=/^t(?:able|d|h)$/i,cx=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?cv=function(a,b,c,d){try{d=a.getBoundingClientRect()}catch(e){}if(!d||!f.contains(c,a))return d?{top:d.top,left:d.left}:{top:0,left:0};var g=b.body,h=cy(b),i=c.clientTop||g.clientTop||0,j=c.clientLeft||g.clientLeft||0,k=h.pageYOffset||f.support.boxModel&&c.scrollTop||g.scrollTop,l=h.pageXOffset||f.support.boxModel&&c.scrollLeft||g.scrollLeft,m=d.top+k-i,n=d.left+l-j;return{top:m,left:n}}:cv=function(a,b,c){var d,e=a.offsetParent,g=a,h=b.body,i=b.defaultView,j=i?i.getComputedStyle(a,null):a.currentStyle,k=a.offsetTop,l=a.offsetLeft;while((a=a.parentNode)&&a!==h&&a!==c){if(f.support.fixedPosition&&j.position==="fixed")break;d=i?i.getComputedStyle(a,null):a.currentStyle,k-=a.scrollTop,l-=a.scrollLeft,a===e&&(k+=a.offsetTop,l+=a.offsetLeft,f.support.doesNotAddBorder&&(!f.support.doesAddBorderForTableAndCells||!cw.test(a.nodeName))&&(k+=parseFloat(d.borderTopWidth)||0,l+=parseFloat(d.borderLeftWidth)||0),g=e,e=a.offsetParent),f.support.subtractsBorderForOverflowNotVisible&&d.overflow!=="visible"&&(k+=parseFloat(d.borderTopWidth)||0,l+=parseFloat(d.borderLeftWidth)||0),j=d}if(j.position==="relative"||j.position==="static")k+=h.offsetTop,l+=h.offsetLeft;f.support.fixedPosition&&j.position==="fixed"&&(k+=Math.max(c.scrollTop,h.scrollTop),l+=Math.max(c.scrollLeft,h.scrollLeft));return{top:k,left:l}},f.fn.offset=function(a){if(arguments.length)return a===b?this:this.each(function(b){f.offset.setOffset(this,a,b)});var c=this[0],d=c&&c.ownerDocument;if(!d)return null;if(c===d.body)return f.offset.bodyOffset(c);return cv(c,d,d.documentElement)},f.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cx.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cx.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,c){var d=/Y/.test(c);f.fn[a]=function(e){return f.access(this,function(a,e,g){var h=cy(a);if(g===b)return h?c in h?h[c]:f.support.boxModel&&h.document.documentElement[e]||h.document.body[e]:a[e];h?h.scrollTo(d?f(h).scrollLeft():g,d?g:f(h).scrollTop()):a[e]=g},a,e,arguments.length,null)}}),f.each({Height:"height",Width:"width"},function(a,c){var d="client"+a,e="scroll"+a,g="offset"+a;f.fn["inner"+a]=function(){var a=this[0];return a?a.style?parseFloat(f.css(a,c,"padding")):this[c]():null},f.fn["outer"+a]=function(a){var b=this[0];return b?b.style?parseFloat(f.css(b,c,a?"margin":"border")):this[c]():null},f.fn[c]=function(a){return f.access(this,function(a,c,h){var i,j,k,l;if(f.isWindow(a)){i=a.document,j=i.documentElement[d];return f.support.boxModel&&j||i.body&&i.body[d]||j}if(a.nodeType===9){i=a.documentElement;if(i[d]>=i[e])return i[d];return Math.max(a.body[e],i[e],a.body[g],i[g])}if(h===b){k=f.css(a,c),l=parseFloat(k);return f.isNumeric(l)?l:k}f(a).css(c,h)},c,a,arguments.length,null)}}),a.jQuery=a.$=f,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return f})})(window);;
/*! jQuery UI - v1.9.1 - 2012-10-26
* http://jqueryui.com
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.position.js, jquery.ui.draggable.js, jquery.ui.droppable.js, jquery.ui.resizable.js, jquery.ui.selectable.js, jquery.ui.sortable.js, jquery.ui.accordion.js, jquery.ui.autocomplete.js, jquery.ui.button.js, jquery.ui.datepicker.js, jquery.ui.dialog.js, jquery.ui.menu.js, jquery.ui.progressbar.js, jquery.ui.slider.js, jquery.ui.spinner.js, jquery.ui.tabs.js, jquery.ui.tooltip.js, jquery.ui.effect.js, jquery.ui.effect-blind.js, jquery.ui.effect-bounce.js, jquery.ui.effect-clip.js, jquery.ui.effect-drop.js, jquery.ui.effect-explode.js, jquery.ui.effect-fade.js, jquery.ui.effect-fold.js, jquery.ui.effect-highlight.js, jquery.ui.effect-pulsate.js, jquery.ui.effect-scale.js, jquery.ui.effect-shake.js, jquery.ui.effect-slide.js, jquery.ui.effect-transfer.js
* Copyright (c) 2012 jQuery Foundation and other contributors Licensed MIT */

(function(e,t){function i(t,n){var r,i,o,u=t.nodeName.toLowerCase();return"area"===u?(r=t.parentNode,i=r.name,!t.href||!i||r.nodeName.toLowerCase()!=="map"?!1:(o=e("img[usemap=#"+i+"]")[0],!!o&&s(o))):(/input|select|textarea|button|object/.test(u)?!t.disabled:"a"===u?t.href||n:n)&&s(t)}function s(t){return e.expr.filters.visible(t)&&!e(t).parents().andSelf().filter(function(){return e.css(this,"visibility")==="hidden"}).length}var n=0,r=/^ui-id-\d+$/;e.ui=e.ui||{};if(e.ui.version)return;e.extend(e.ui,{version:"1.9.1",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({_focus:e.fn.focus,focus:function(t,n){return typeof t=="number"?this.each(function(){var r=this;setTimeout(function(){e(r).focus(),n&&n.call(r)},t)}):this._focus.apply(this,arguments)},scrollParent:function(){var t;return e.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?t=this.parents().filter(function(){return/(relative|absolute|fixed)/.test(e.css(this,"position"))&&/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0):t=this.parents().filter(function(){return/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!t.length?e(document):t},zIndex:function(n){if(n!==t)return this.css("zIndex",n);if(this.length){var r=e(this[0]),i,s;while(r.length&&r[0]!==document){i=r.css("position");if(i==="absolute"||i==="relative"||i==="fixed"){s=parseInt(r.css("zIndex"),10);if(!isNaN(s)&&s!==0)return s}r=r.parent()}}return 0},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++n)})},removeUniqueId:function(){return this.each(function(){r.test(this.id)&&e(this).removeAttr("id")})}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(n,r){function u(t,n,r,s){return e.each(i,function(){n-=parseFloat(e.css(t,"padding"+this))||0,r&&(n-=parseFloat(e.css(t,"border"+this+"Width"))||0),s&&(n-=parseFloat(e.css(t,"margin"+this))||0)}),n}var i=r==="Width"?["Left","Right"]:["Top","Bottom"],s=r.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+r]=function(n){return n===t?o["inner"+r].call(this):this.each(function(){e(this).css(s,u(this,n)+"px")})},e.fn["outer"+r]=function(t,n){return typeof t!="number"?o["outer"+r].call(this,t):this.each(function(){e(this).css(s,u(this,t,!0,n)+"px")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(n){return!!e.data(n,t)}}):function(t,n,r){return!!e.data(t,r[3])},focusable:function(t){return i(t,!isNaN(e.attr(t,"tabindex")))},tabbable:function(t){var n=e.attr(t,"tabindex"),r=isNaN(n);return(r||n>=0)&&i(t,!r)}}),e(function(){var t=document.body,n=t.appendChild(n=document.createElement("div"));n.offsetHeight,e.extend(n.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0}),e.support.minHeight=n.offsetHeight===100,e.support.selectstart="onselectstart"in n,t.removeChild(n).style.display="none"}),function(){var t=/msie ([\w.]+)/.exec(navigator.userAgent.toLowerCase())||[];e.ui.ie=t.length?!0:!1,e.ui.ie6=parseFloat(t[1],10)===6}(),e.fn.extend({disableSelection:function(){return this.bind((e.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(e){e.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),e.extend(e.ui,{plugin:{add:function(t,n,r){var i,s=e.ui[t].prototype;for(i in r)s.plugins[i]=s.plugins[i]||[],s.plugins[i].push([n,r[i]])},call:function(e,t,n){var r,i=e.plugins[t];if(!i||!e.element[0].parentNode||e.element[0].parentNode.nodeType===11)return;for(r=0;r<i.length;r++)e.options[i[r][0]]&&i[r][1].apply(e.element,n)}},contains:e.contains,hasScroll:function(t,n){if(e(t).css("overflow")==="hidden")return!1;var r=n&&n==="left"?"scrollLeft":"scrollTop",i=!1;return t[r]>0?!0:(t[r]=1,i=t[r]>0,t[r]=0,i)},isOverAxis:function(e,t,n){return e>t&&e<t+n},isOver:function(t,n,r,i,s,o){return e.ui.isOverAxis(t,r,s)&&e.ui.isOverAxis(n,i,o)}})})(jQuery);(function(e,t){var n=0,r=Array.prototype.slice,i=e.cleanData;e.cleanData=function(t){for(var n=0,r;(r=t[n])!=null;n++)try{e(r).triggerHandler("remove")}catch(s){}i(t)},e.widget=function(t,n,r){var i,s,o,u,a=t.split(".")[0];t=t.split(".")[1],i=a+"-"+t,r||(r=n,n=e.Widget),e.expr[":"][i.toLowerCase()]=function(t){return!!e.data(t,i)},e[a]=e[a]||{},s=e[a][t],o=e[a][t]=function(e,t){if(!this._createWidget)return new o(e,t);arguments.length&&this._createWidget(e,t)},e.extend(o,s,{version:r.version,_proto:e.extend({},r),_childConstructors:[]}),u=new n,u.options=e.widget.extend({},u.options),e.each(r,function(t,i){e.isFunction(i)&&(r[t]=function(){var e=function(){return n.prototype[t].apply(this,arguments)},r=function(e){return n.prototype[t].apply(this,e)};return function(){var t=this._super,n=this._superApply,s;return this._super=e,this._superApply=r,s=i.apply(this,arguments),this._super=t,this._superApply=n,s}}())}),o.prototype=e.widget.extend(u,{widgetEventPrefix:u.widgetEventPrefix||t},r,{constructor:o,namespace:a,widgetName:t,widgetBaseClass:i,widgetFullName:i}),s?(e.each(s._childConstructors,function(t,n){var r=n.prototype;e.widget(r.namespace+"."+r.widgetName,o,n._proto)}),delete s._childConstructors):n._childConstructors.push(o),e.widget.bridge(t,o)},e.widget.extend=function(n){var i=r.call(arguments,1),s=0,o=i.length,u,a;for(;s<o;s++)for(u in i[s])a=i[s][u],i[s].hasOwnProperty(u)&&a!==t&&(e.isPlainObject(a)?n[u]=e.isPlainObject(n[u])?e.widget.extend({},n[u],a):e.widget.extend({},a):n[u]=a);return n},e.widget.bridge=function(n,i){var s=i.prototype.widgetFullName;e.fn[n]=function(o){var u=typeof o=="string",a=r.call(arguments,1),f=this;return o=!u&&a.length?e.widget.extend.apply(null,[o].concat(a)):o,u?this.each(function(){var r,i=e.data(this,s);if(!i)return e.error("cannot call methods on "+n+" prior to initialization; "+"attempted to call method '"+o+"'");if(!e.isFunction(i[o])||o.charAt(0)==="_")return e.error("no such method '"+o+"' for "+n+" widget instance");r=i[o].apply(i,a);if(r!==i&&r!==t)return f=r&&r.jquery?f.pushStack(r.get()):r,!1}):this.each(function(){var t=e.data(this,s);t?t.option(o||{})._init():new i(o,this)}),f}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,r){r=e(r||this.defaultElement||this)[0],this.element=e(r),this.uuid=n++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this.bindings=e(),this.hoverable=e(),this.focusable=e(),r!==this&&(e.data(r,this.widgetName,this),e.data(r,this.widgetFullName,this),this._on(this.element,{remove:function(e){e.target===r&&this.destroy()}}),this.document=e(r.style?r.ownerDocument:r.document||r),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(n,r){var i=n,s,o,u;if(arguments.length===0)return e.widget.extend({},this.options);if(typeof n=="string"){i={},s=n.split("."),n=s.shift();if(s.length){o=i[n]=e.widget.extend({},this.options[n]);for(u=0;u<s.length-1;u++)o[s[u]]=o[s[u]]||{},o=o[s[u]];n=s.pop();if(r===t)return o[n]===t?null:o[n];o[n]=r}else{if(r===t)return this.options[n]===t?null:this.options[n];i[n]=r}}return this._setOptions(i),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,e==="disabled"&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!t).attr("aria-disabled",t),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(t,n){var r,i=this;n?(t=r=e(t),this.bindings=this.bindings.add(t)):(n=t,t=this.element,r=this.widget()),e.each(n,function(n,s){function o(){if(i.options.disabled===!0||e(this).hasClass("ui-state-disabled"))return;return(typeof s=="string"?i[s]:s).apply(i,arguments)}typeof s!="string"&&(o.guid=s.guid=s.guid||o.guid||e.guid++);var u=n.match(/^(\w+)\s*(.*)$/),a=u[1]+i.eventNamespace,f=u[2];f?r.delegate(f,a,o):t.bind(a,o)})},_off:function(e,t){t=(t||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(t).undelegate(t)},_delay:function(e,t){function n(){return(typeof e=="string"?r[e]:e).apply(r,arguments)}var r=this;return setTimeout(n,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,n,r){var i,s,o=this.options[t];r=r||{},n=e.Event(n),n.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),n.target=this.element[0],s=n.originalEvent;if(s)for(i in s)i in n||(n[i]=s[i]);return this.element.trigger(n,r),!(e.isFunction(o)&&o.apply(this.element[0],[n].concat(r))===!1||n.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,n){e.Widget.prototype["_"+t]=function(r,i,s){typeof i=="string"&&(i={effect:i});var o,u=i?i===!0||typeof i=="number"?n:i.effect||n:t;i=i||{},typeof i=="number"&&(i={duration:i}),o=!e.isEmptyObject(i),i.complete=s,i.delay&&r.delay(i.delay),o&&e.effects&&(e.effects.effect[u]||e.uiBackCompat!==!1&&e.effects[u])?r[t](i):u!==t&&r[u]?r[u](i.duration,i.easing,s):r.queue(function(n){e(this)[t](),s&&s.call(r[0]),n()})}}),e.uiBackCompat!==!1&&(e.Widget.prototype._getCreateOptions=function(){return e.metadata&&e.metadata.get(this.element[0])[this.widgetName]})})(jQuery);(function(e,t){var n=!1;e(document).mouseup(function(e){n=!1}),e.widget("ui.mouse",{version:"1.9.1",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var t=this;this.element.bind("mousedown."+this.widgetName,function(e){return t._mouseDown(e)}).bind("click."+this.widgetName,function(n){if(!0===e.data(n.target,t.widgetName+".preventClickEvent"))return e.removeData(n.target,t.widgetName+".preventClickEvent"),n.stopImmediatePropagation(),!1}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(t){if(n)return;this._mouseStarted&&this._mouseUp(t),this._mouseDownEvent=t;var r=this,i=t.which===1,s=typeof this.options.cancel=="string"&&t.target.nodeName?e(t.target).closest(this.options.cancel).length:!1;if(!i||s||!this._mouseCapture(t))return!0;this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){r.mouseDelayMet=!0},this.options.delay));if(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)){this._mouseStarted=this._mouseStart(t)!==!1;if(!this._mouseStarted)return t.preventDefault(),!0}return!0===e.data(t.target,this.widgetName+".preventClickEvent")&&e.removeData(t.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(e){return r._mouseMove(e)},this._mouseUpDelegate=function(e){return r._mouseUp(e)},e(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),t.preventDefault(),n=!0,!0},_mouseMove:function(t){return!e.ui.ie||document.documentMode>=9||!!t.button?this._mouseStarted?(this._mouseDrag(t),t.preventDefault()):(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,t)!==!1,this._mouseStarted?this._mouseDrag(t):this._mouseUp(t)),!this._mouseStarted):this._mouseUp(t)},_mouseUp:function(t){return e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,t.target===this._mouseDownEvent.target&&e.data(t.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(t)),!1},_mouseDistanceMet:function(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance},_mouseDelayMet:function(e){return this.mouseDelayMet},_mouseStart:function(e){},_mouseDrag:function(e){},_mouseStop:function(e){},_mouseCapture:function(e){return!0}})})(jQuery);(function(e,t){function h(e,t,n){return[parseInt(e[0],10)*(l.test(e[0])?t/100:1),parseInt(e[1],10)*(l.test(e[1])?n/100:1)]}function p(t,n){return parseInt(e.css(t,n),10)||0}e.ui=e.ui||{};var n,r=Math.max,i=Math.abs,s=Math.round,o=/left|center|right/,u=/top|center|bottom/,a=/[\+\-]\d+%?/,f=/^\w+/,l=/%$/,c=e.fn.position;e.position={scrollbarWidth:function(){if(n!==t)return n;var r,i,s=e("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),o=s.children()[0];return e("body").append(s),r=o.offsetWidth,s.css("overflow","scroll"),i=o.offsetWidth,r===i&&(i=s[0].clientWidth),s.remove(),n=r-i},getScrollInfo:function(t){var n=t.isWindow?"":t.element.css("overflow-x"),r=t.isWindow?"":t.element.css("overflow-y"),i=n==="scroll"||n==="auto"&&t.width<t.element[0].scrollWidth,s=r==="scroll"||r==="auto"&&t.height<t.element[0].scrollHeight;return{width:i?e.position.scrollbarWidth():0,height:s?e.position.scrollbarWidth():0}},getWithinInfo:function(t){var n=e(t||window),r=e.isWindow(n[0]);return{element:n,isWindow:r,offset:n.offset()||{left:0,top:0},scrollLeft:n.scrollLeft(),scrollTop:n.scrollTop(),width:r?n.width():n.outerWidth(),height:r?n.height():n.outerHeight()}}},e.fn.position=function(t){if(!t||!t.of)return c.apply(this,arguments);t=e.extend({},t);var n,l,d,v,m,g=e(t.of),y=e.position.getWithinInfo(t.within),b=e.position.getScrollInfo(y),w=g[0],E=(t.collision||"flip").split(" "),S={};return w.nodeType===9?(l=g.width(),d=g.height(),v={top:0,left:0}):e.isWindow(w)?(l=g.width(),d=g.height(),v={top:g.scrollTop(),left:g.scrollLeft()}):w.preventDefault?(t.at="left top",l=d=0,v={top:w.pageY,left:w.pageX}):(l=g.outerWidth(),d=g.outerHeight(),v=g.offset()),m=e.extend({},v),e.each(["my","at"],function(){var e=(t[this]||"").split(" "),n,r;e.length===1&&(e=o.test(e[0])?e.concat(["center"]):u.test(e[0])?["center"].concat(e):["center","center"]),e[0]=o.test(e[0])?e[0]:"center",e[1]=u.test(e[1])?e[1]:"center",n=a.exec(e[0]),r=a.exec(e[1]),S[this]=[n?n[0]:0,r?r[0]:0],t[this]=[f.exec(e[0])[0],f.exec(e[1])[0]]}),E.length===1&&(E[1]=E[0]),t.at[0]==="right"?m.left+=l:t.at[0]==="center"&&(m.left+=l/2),t.at[1]==="bottom"?m.top+=d:t.at[1]==="center"&&(m.top+=d/2),n=h(S.at,l,d),m.left+=n[0],m.top+=n[1],this.each(function(){var o,u,a=e(this),f=a.outerWidth(),c=a.outerHeight(),w=p(this,"marginLeft"),x=p(this,"marginTop"),T=f+w+p(this,"marginRight")+b.width,N=c+x+p(this,"marginBottom")+b.height,C=e.extend({},m),k=h(S.my,a.outerWidth(),a.outerHeight());t.my[0]==="right"?C.left-=f:t.my[0]==="center"&&(C.left-=f/2),t.my[1]==="bottom"?C.top-=c:t.my[1]==="center"&&(C.top-=c/2),C.left+=k[0],C.top+=k[1],e.support.offsetFractions||(C.left=s(C.left),C.top=s(C.top)),o={marginLeft:w,marginTop:x},e.each(["left","top"],function(r,i){e.ui.position[E[r]]&&e.ui.position[E[r]][i](C,{targetWidth:l,targetHeight:d,elemWidth:f,elemHeight:c,collisionPosition:o,collisionWidth:T,collisionHeight:N,offset:[n[0]+k[0],n[1]+k[1]],my:t.my,at:t.at,within:y,elem:a})}),e.fn.bgiframe&&a.bgiframe(),t.using&&(u=function(e){var n=v.left-C.left,s=n+l-f,o=v.top-C.top,u=o+d-c,h={target:{element:g,left:v.left,top:v.top,width:l,height:d},element:{element:a,left:C.left,top:C.top,width:f,height:c},horizontal:s<0?"left":n>0?"right":"center",vertical:u<0?"top":o>0?"bottom":"middle"};l<f&&i(n+s)<l&&(h.horizontal="center"),d<c&&i(o+u)<d&&(h.vertical="middle"),r(i(n),i(s))>r(i(o),i(u))?h.important="horizontal":h.important="vertical",t.using.call(this,e,h)}),a.offset(e.extend(C,{using:u}))})},e.ui.position={fit:{left:function(e,t){var n=t.within,i=n.isWindow?n.scrollLeft:n.offset.left,s=n.width,o=e.left-t.collisionPosition.marginLeft,u=i-o,a=o+t.collisionWidth-s-i,f;t.collisionWidth>s?u>0&&a<=0?(f=e.left+u+t.collisionWidth-s-i,e.left+=u-f):a>0&&u<=0?e.left=i:u>a?e.left=i+s-t.collisionWidth:e.left=i:u>0?e.left+=u:a>0?e.left-=a:e.left=r(e.left-o,e.left)},top:function(e,t){var n=t.within,i=n.isWindow?n.scrollTop:n.offset.top,s=t.within.height,o=e.top-t.collisionPosition.marginTop,u=i-o,a=o+t.collisionHeight-s-i,f;t.collisionHeight>s?u>0&&a<=0?(f=e.top+u+t.collisionHeight-s-i,e.top+=u-f):a>0&&u<=0?e.top=i:u>a?e.top=i+s-t.collisionHeight:e.top=i:u>0?e.top+=u:a>0?e.top-=a:e.top=r(e.top-o,e.top)}},flip:{left:function(e,t){var n=t.within,r=n.offset.left+n.scrollLeft,s=n.width,o=n.isWindow?n.scrollLeft:n.offset.left,u=e.left-t.collisionPosition.marginLeft,a=u-o,f=u+t.collisionWidth-s-o,l=t.my[0]==="left"?-t.elemWidth:t.my[0]==="right"?t.elemWidth:0,c=t.at[0]==="left"?t.targetWidth:t.at[0]==="right"?-t.targetWidth:0,h=-2*t.offset[0],p,d;if(a<0){p=e.left+l+c+h+t.collisionWidth-s-r;if(p<0||p<i(a))e.left+=l+c+h}else if(f>0){d=e.left-t.collisionPosition.marginLeft+l+c+h-o;if(d>0||i(d)<f)e.left+=l+c+h}},top:function(e,t){var n=t.within,r=n.offset.top+n.scrollTop,s=n.height,o=n.isWindow?n.scrollTop:n.offset.top,u=e.top-t.collisionPosition.marginTop,a=u-o,f=u+t.collisionHeight-s-o,l=t.my[1]==="top",c=l?-t.elemHeight:t.my[1]==="bottom"?t.elemHeight:0,h=t.at[1]==="top"?t.targetHeight:t.at[1]==="bottom"?-t.targetHeight:0,p=-2*t.offset[1],d,v;a<0?(v=e.top+c+h+p+t.collisionHeight-s-r,e.top+c+h+p>a&&(v<0||v<i(a))&&(e.top+=c+h+p)):f>0&&(d=e.top-t.collisionPosition.marginTop+c+h+p-o,e.top+c+h+p>f&&(d>0||i(d)<f)&&(e.top+=c+h+p))}},flipfit:{left:function(){e.ui.position.flip.left.apply(this,arguments),e.ui.position.fit.left.apply(this,arguments)},top:function(){e.ui.position.flip.top.apply(this,arguments),e.ui.position.fit.top.apply(this,arguments)}}},function(){var t,n,r,i,s,o=document.getElementsByTagName("body")[0],u=document.createElement("div");t=document.createElement(o?"div":"body"),r={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},o&&e.extend(r,{position:"absolute",left:"-1000px",top:"-1000px"});for(s in r)t.style[s]=r[s];t.appendChild(u),n=o||document.documentElement,n.insertBefore(t,n.firstChild),u.style.cssText="position: absolute; left: 10.7432222px;",i=e(u).offset().left,e.support.offsetFractions=i>10&&i<11,t.innerHTML="",n.removeChild(t)}(),e.uiBackCompat!==!1&&function(e){var n=e.fn.position;e.fn.position=function(r){if(!r||!r.offset)return n.call(this,r);var i=r.offset.split(" "),s=r.at.split(" ");return i.length===1&&(i[1]=i[0]),/^\d/.test(i[0])&&(i[0]="+"+i[0]),/^\d/.test(i[1])&&(i[1]="+"+i[1]),s.length===1&&(/left|center|right/.test(s[0])?s[1]="center":(s[1]=s[0],s[0]="center")),n.call(this,e.extend(r,{at:s[0]+i[0]+" "+s[1]+i[1],offset:t}))}}(jQuery)})(jQuery);(function(e,t){e.widget("ui.draggable",e.ui.mouse,{version:"1.9.1",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1},_create:function(){this.options.helper=="original"&&!/^(?:r|a|f)/.test(this.element.css("position"))&&(this.element[0].style.position="relative"),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._mouseInit()},_destroy:function(){this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._mouseDestroy()},_mouseCapture:function(t){var n=this.options;return this.helper||n.disabled||e(t.target).is(".ui-resizable-handle")?!1:(this.handle=this._getHandle(t),this.handle?(e(n.iframeFix===!0?"iframe":n.iframeFix).each(function(){e('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1e3}).css(e(this).offset()).appendTo("body")}),!0):!1)},_mouseStart:function(t){var n=this.options;return this.helper=this._createHelper(t),this.helper.addClass("ui-draggable-dragging"),this._cacheHelperProportions(),e.ui.ddmanager&&(e.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(),this.offset=this.positionAbs=this.element.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},e.extend(this.offset,{click:{left:t.pageX-this.offset.left,top:t.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.originalPosition=this.position=this._generatePosition(t),this.originalPageX=t.pageX,this.originalPageY=t.pageY,n.cursorAt&&this._adjustOffsetFromHelper(n.cursorAt),n.containment&&this._setContainment(),this._trigger("start",t)===!1?(this._clear(),!1):(this._cacheHelperProportions(),e.ui.ddmanager&&!n.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this._mouseDrag(t,!0),e.ui.ddmanager&&e.ui.ddmanager.dragStart(this,t),!0)},_mouseDrag:function(t,n){this.position=this._generatePosition(t),this.positionAbs=this._convertPositionTo("absolute");if(!n){var r=this._uiHash();if(this._trigger("drag",t,r)===!1)return this._mouseUp({}),!1;this.position=r.position}if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";return e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),!1},_mouseStop:function(t){var n=!1;e.ui.ddmanager&&!this.options.dropBehaviour&&(n=e.ui.ddmanager.drop(this,t)),this.dropped&&(n=this.dropped,this.dropped=!1);var r=this.element[0],i=!1;while(r&&(r=r.parentNode))r==document&&(i=!0);if(!i&&this.options.helper==="original")return!1;if(this.options.revert=="invalid"&&!n||this.options.revert=="valid"&&n||this.options.revert===!0||e.isFunction(this.options.revert)&&this.options.revert.call(this.element,n)){var s=this;e(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){s._trigger("stop",t)!==!1&&s._clear()})}else this._trigger("stop",t)!==!1&&this._clear();return!1},_mouseUp:function(t){return e("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)}),e.ui.ddmanager&&e.ui.ddmanager.dragStop(this,t),e.ui.mouse.prototype._mouseUp.call(this,t)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this},_getHandle:function(t){var n=!this.options.handle||!e(this.options.handle,this.element).length?!0:!1;return e(this.options.handle,this.element).find("*").andSelf().each(function(){this==t.target&&(n=!0)}),n},_createHelper:function(t){var n=this.options,r=e.isFunction(n.helper)?e(n.helper.apply(this.element[0],[t])):n.helper=="clone"?this.element.clone().removeAttr("id"):this.element;return r.parents("body").length||r.appendTo(n.appendTo=="parent"?this.element[0].parentNode:n.appendTo),r[0]!=this.element[0]&&!/(fixed|absolute)/.test(r.css("position"))&&r.css("position","absolute"),r},_adjustOffsetFromHelper:function(t){typeof t=="string"&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var t=this.offsetParent.offset();this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop());if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&e.ui.ie)t={top:0,left:0};return{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var e=this.element.position();return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:e.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t=this.options;t.containment=="parent"&&(t.containment=this.helper[0].parentNode);if(t.containment=="document"||t.containment=="window")this.containment=[t.containment=="document"?0:e(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,t.containment=="document"?0:e(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,(t.containment=="document"?0:e(window).scrollLeft())+e(t.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(t.containment=="document"?0:e(window).scrollTop())+(e(t.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(t.containment)&&t.containment.constructor!=Array){var n=e(t.containment),r=n[0];if(!r)return;var i=n.offset(),s=e(r).css("overflow")!="hidden";this.containment=[(parseInt(e(r).css("borderLeftWidth"),10)||0)+(parseInt(e(r).css("paddingLeft"),10)||0),(parseInt(e(r).css("borderTopWidth"),10)||0)+(parseInt(e(r).css("paddingTop"),10)||0),(s?Math.max(r.scrollWidth,r.offsetWidth):r.offsetWidth)-(parseInt(e(r).css("borderLeftWidth"),10)||0)-(parseInt(e(r).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(s?Math.max(r.scrollHeight,r.offsetHeight):r.offsetHeight)-(parseInt(e(r).css("borderTopWidth"),10)||0)-(parseInt(e(r).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relative_container=n}else t.containment.constructor==Array&&(this.containment=t.containment)},_convertPositionTo:function(t,n){n||(n=this.position);var r=t=="absolute"?1:-1,i=this.options,s=this.cssPosition!="absolute"||this.scrollParent[0]!=document&&!!e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,o=/(html|body)/i.test(s[0].tagName);return{top:n.top+this.offset.relative.top*r+this.offset.parent.top*r-(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():o?0:s.scrollTop())*r,left:n.left+this.offset.relative.left*r+this.offset.parent.left*r-(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():o?0:s.scrollLeft())*r}},_generatePosition:function(t){var n=this.options,r=this.cssPosition!="absolute"||this.scrollParent[0]!=document&&!!e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,i=/(html|body)/i.test(r[0].tagName),s=t.pageX,o=t.pageY;if(this.originalPosition){var u;if(this.containment){if(this.relative_container){var a=this.relative_container.offset();u=[this.containment[0]+a.left,this.containment[1]+a.top,this.containment[2]+a.left,this.containment[3]+a.top]}else u=this.containment;t.pageX-this.offset.click.left<u[0]&&(s=u[0]+this.offset.click.left),t.pageY-this.offset.click.top<u[1]&&(o=u[1]+this.offset.click.top),t.pageX-this.offset.click.left>u[2]&&(s=u[2]+this.offset.click.left),t.pageY-this.offset.click.top>u[3]&&(o=u[3]+this.offset.click.top)}if(n.grid){var f=n.grid[1]?this.originalPageY+Math.round((o-this.originalPageY)/n.grid[1])*n.grid[1]:this.originalPageY;o=u?f-this.offset.click.top<u[1]||f-this.offset.click.top>u[3]?f-this.offset.click.top<u[1]?f+n.grid[1]:f-n.grid[1]:f:f;var l=n.grid[0]?this.originalPageX+Math.round((s-this.originalPageX)/n.grid[0])*n.grid[0]:this.originalPageX;s=u?l-this.offset.click.left<u[0]||l-this.offset.click.left>u[2]?l-this.offset.click.left<u[0]?l+n.grid[0]:l-n.grid[0]:l:l}}return{top:o-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():i?0:r.scrollTop()),left:s-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():i?0:r.scrollLeft())}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval&&this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1},_trigger:function(t,n,r){return r=r||this._uiHash(),e.ui.plugin.call(this,t,[n,r]),t=="drag"&&(this.positionAbs=this._convertPositionTo("absolute")),e.Widget.prototype._trigger.call(this,t,n,r)},plugins:{},_uiHash:function(e){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),e.ui.plugin.add("draggable","connectToSortable",{start:function(t,n){var r=e(this).data("draggable"),i=r.options,s=e.extend({},n,{item:r.element});r.sortables=[],e(i.connectToSortable).each(function(){var n=e.data(this,"sortable");n&&!n.options.disabled&&(r.sortables.push({instance:n,shouldRevert:n.options.revert}),n.refreshPositions(),n._trigger("activate",t,s))})},stop:function(t,n){var r=e(this).data("draggable"),i=e.extend({},n,{item:r.element});e.each(r.sortables,function(){this.instance.isOver?(this.instance.isOver=0,r.cancelHelperRemoval=!0,this.instance.cancelHelperRemoval=!1,this.shouldRevert&&(this.instance.options.revert=!0),this.instance._mouseStop(t),this.instance.options.helper=this.instance.options._helper,r.options.helper=="original"&&this.instance.currentItem.css({top:"auto",left:"auto"})):(this.instance.cancelHelperRemoval=!1,this.instance._trigger("deactivate",t,i))})},drag:function(t,n){var r=e(this).data("draggable"),i=this,s=function(t){var n=this.offset.click.top,r=this.offset.click.left,i=this.positionAbs.top,s=this.positionAbs.left,o=t.height,u=t.width,a=t.top,f=t.left;return e.ui.isOver(i+n,s+r,a,f,o,u)};e.each(r.sortables,function(s){var o=!1,u=this;this.instance.positionAbs=r.positionAbs,this.instance.helperProportions=r.helperProportions,this.instance.offset.click=r.offset.click,this.instance._intersectsWith(this.instance.containerCache)&&(o=!0,e.each(r.sortables,function(){return this.instance.positionAbs=r.positionAbs,this.instance.helperProportions=r.helperProportions,this.instance.offset.click=r.offset.click,this!=u&&this.instance._intersectsWith(this.instance.containerCache)&&e.ui.contains(u.instance.element[0],this.instance.element[0])&&(o=!1),o})),o?(this.instance.isOver||(this.instance.isOver=1,this.instance.currentItem=e(i).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item",!0),this.instance.options._helper=this.instance.options.helper,this.instance.options.helper=function(){return n.helper[0]},t.target=this.instance.currentItem[0],this.instance._mouseCapture(t,!0),this.instance._mouseStart(t,!0,!0),this.instance.offset.click.top=r.offset.click.top,this.instance.offset.click.left=r.offset.click.left,this.instance.offset.parent.left-=r.offset.parent.left-this.instance.offset.parent.left,this.instance.offset.parent.top-=r.offset.parent.top-this.instance.offset.parent.top,r._trigger("toSortable",t),r.dropped=this.instance.element,r.currentItem=r.element,this.instance.fromOutside=r),this.instance.currentItem&&this.instance._mouseDrag(t)):this.instance.isOver&&(this.instance.isOver=0,this.instance.cancelHelperRemoval=!0,this.instance.options.revert=!1,this.instance._trigger("out",t,this.instance._uiHash(this.instance)),this.instance._mouseStop(t,!0),this.instance.options.helper=this.instance.options._helper,this.instance.currentItem.remove(),this.instance.placeholder&&this.instance.placeholder.remove(),r._trigger("fromSortable",t),r.dropped=!1)})}}),e.ui.plugin.add("draggable","cursor",{start:function(t,n){var r=e("body"),i=e(this).data("draggable").options;r.css("cursor")&&(i._cursor=r.css("cursor")),r.css("cursor",i.cursor)},stop:function(t,n){var r=e(this).data("draggable").options;r._cursor&&e("body").css("cursor",r._cursor)}}),e.ui.plugin.add("draggable","opacity",{start:function(t,n){var r=e(n.helper),i=e(this).data("draggable").options;r.css("opacity")&&(i._opacity=r.css("opacity")),r.css("opacity",i.opacity)},stop:function(t,n){var r=e(this).data("draggable").options;r._opacity&&e(n.helper).css("opacity",r._opacity)}}),e.ui.plugin.add("draggable","scroll",{start:function(t,n){var r=e(this).data("draggable");r.scrollParent[0]!=document&&r.scrollParent[0].tagName!="HTML"&&(r.overflowOffset=r.scrollParent.offset())},drag:function(t,n){var r=e(this).data("draggable"),i=r.options,s=!1;if(r.scrollParent[0]!=document&&r.scrollParent[0].tagName!="HTML"){if(!i.axis||i.axis!="x")r.overflowOffset.top+r.scrollParent[0].offsetHeight-t.pageY<i.scrollSensitivity?r.scrollParent[0].scrollTop=s=r.scrollParent[0].scrollTop+i.scrollSpeed:t.pageY-r.overflowOffset.top<i.scrollSensitivity&&(r.scrollParent[0].scrollTop=s=r.scrollParent[0].scrollTop-i.scrollSpeed);if(!i.axis||i.axis!="y")r.overflowOffset.left+r.scrollParent[0].offsetWidth-t.pageX<i.scrollSensitivity?r.scrollParent[0].scrollLeft=s=r.scrollParent[0].scrollLeft+i.scrollSpeed:t.pageX-r.overflowOffset.left<i.scrollSensitivity&&(r.scrollParent[0].scrollLeft=s=r.scrollParent[0].scrollLeft-i.scrollSpeed)}else{if(!i.axis||i.axis!="x")t.pageY-e(document).scrollTop()<i.scrollSensitivity?s=e(document).scrollTop(e(document).scrollTop()-i.scrollSpeed):e(window).height()-(t.pageY-e(document).scrollTop())<i.scrollSensitivity&&(s=e(document).scrollTop(e(document).scrollTop()+i.scrollSpeed));if(!i.axis||i.axis!="y")t.pageX-e(document).scrollLeft()<i.scrollSensitivity?s=e(document).scrollLeft(e(document).scrollLeft()-i.scrollSpeed):e(window).width()-(t.pageX-e(document).scrollLeft())<i.scrollSensitivity&&(s=e(document).scrollLeft(e(document).scrollLeft()+i.scrollSpeed))}s!==!1&&e.ui.ddmanager&&!i.dropBehaviour&&e.ui.ddmanager.prepareOffsets(r,t)}}),e.ui.plugin.add("draggable","snap",{start:function(t,n){var r=e(this).data("draggable"),i=r.options;r.snapElements=[],e(i.snap.constructor!=String?i.snap.items||":data(draggable)":i.snap).each(function(){var t=e(this),n=t.offset();this!=r.element[0]&&r.snapElements.push({item:this,width:t.outerWidth(),height:t.outerHeight(),top:n.top,left:n.left})})},drag:function(t,n){var r=e(this).data("draggable"),i=r.options,s=i.snapTolerance,o=n.offset.left,u=o+r.helperProportions.width,a=n.offset.top,f=a+r.helperProportions.height;for(var l=r.snapElements.length-1;l>=0;l--){var c=r.snapElements[l].left,h=c+r.snapElements[l].width,p=r.snapElements[l].top,d=p+r.snapElements[l].height;if(!(c-s<o&&o<h+s&&p-s<a&&a<d+s||c-s<o&&o<h+s&&p-s<f&&f<d+s||c-s<u&&u<h+s&&p-s<a&&a<d+s||c-s<u&&u<h+s&&p-s<f&&f<d+s)){r.snapElements[l].snapping&&r.options.snap.release&&r.options.snap.release.call(r.element,t,e.extend(r._uiHash(),{snapItem:r.snapElements[l].item})),r.snapElements[l].snapping=!1;continue}if(i.snapMode!="inner"){var v=Math.abs(p-f)<=s,m=Math.abs(d-a)<=s,g=Math.abs(c-u)<=s,y=Math.abs(h-o)<=s;v&&(n.position.top=r._convertPositionTo("relative",{top:p-r.helperProportions.height,left:0}).top-r.margins.top),m&&(n.position.top=r._convertPositionTo("relative",{top:d,left:0}).top-r.margins.top),g&&(n.position.left=r._convertPositionTo("relative",{top:0,left:c-r.helperProportions.width}).left-r.margins.left),y&&(n.position.left=r._convertPositionTo("relative",{top:0,left:h}).left-r.margins.left)}var b=v||m||g||y;if(i.snapMode!="outer"){var v=Math.abs(p-a)<=s,m=Math.abs(d-f)<=s,g=Math.abs(c-o)<=s,y=Math.abs(h-u)<=s;v&&(n.position.top=r._convertPositionTo("relative",{top:p,left:0}).top-r.margins.top),m&&(n.position.top=r._convertPositionTo("relative",{top:d-r.helperProportions.height,left:0}).top-r.margins.top),g&&(n.position.left=r._convertPositionTo("relative",{top:0,left:c}).left-r.margins.left),y&&(n.position.left=r._convertPositionTo("relative",{top:0,left:h-r.helperProportions.width}).left-r.margins.left)}!r.snapElements[l].snapping&&(v||m||g||y||b)&&r.options.snap.snap&&r.options.snap.snap.call(r.element,t,e.extend(r._uiHash(),{snapItem:r.snapElements[l].item})),r.snapElements[l].snapping=v||m||g||y||b}}}),e.ui.plugin.add("draggable","stack",{start:function(t,n){var r=e(this).data("draggable").options,i=e.makeArray(e(r.stack)).sort(function(t,n){return(parseInt(e(t).css("zIndex"),10)||0)-(parseInt(e(n).css("zIndex"),10)||0)});if(!i.length)return;var s=parseInt(i[0].style.zIndex)||0;e(i).each(function(e){this.style.zIndex=s+e}),this[0].style.zIndex=s+i.length}}),e.ui.plugin.add("draggable","zIndex",{start:function(t,n){var r=e(n.helper),i=e(this).data("draggable").options;r.css("zIndex")&&(i._zIndex=r.css("zIndex")),r.css("zIndex",i.zIndex)},stop:function(t,n){var r=e(this).data("draggable").options;r._zIndex&&e(n.helper).css("zIndex",r._zIndex)}})})(jQuery);(function(e,t){e.widget("ui.droppable",{version:"1.9.1",widgetEventPrefix:"drop",options:{accept:"*",activeClass:!1,addClasses:!0,greedy:!1,hoverClass:!1,scope:"default",tolerance:"intersect"},_create:function(){var t=this.options,n=t.accept;this.isover=0,this.isout=1,this.accept=e.isFunction(n)?n:function(e){return e.is(n)},this.proportions={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight},e.ui.ddmanager.droppables[t.scope]=e.ui.ddmanager.droppables[t.scope]||[],e.ui.ddmanager.droppables[t.scope].push(this),t.addClasses&&this.element.addClass("ui-droppable")},_destroy:function(){var t=e.ui.ddmanager.droppables[this.options.scope];for(var n=0;n<t.length;n++)t[n]==this&&t.splice(n,1);this.element.removeClass("ui-droppable ui-droppable-disabled")},_setOption:function(t,n){t=="accept"&&(this.accept=e.isFunction(n)?n:function(e){return e.is(n)}),e.Widget.prototype._setOption.apply(this,arguments)},_activate:function(t){var n=e.ui.ddmanager.current;this.options.activeClass&&this.element.addClass(this.options.activeClass),n&&this._trigger("activate",t,this.ui(n))},_deactivate:function(t){var n=e.ui.ddmanager.current;this.options.activeClass&&this.element.removeClass(this.options.activeClass),n&&this._trigger("deactivate",t,this.ui(n))},_over:function(t){var n=e.ui.ddmanager.current;if(!n||(n.currentItem||n.element)[0]==this.element[0])return;this.accept.call(this.element[0],n.currentItem||n.element)&&(this.options.hoverClass&&this.element.addClass(this.options.hoverClass),this._trigger("over",t,this.ui(n)))},_out:function(t){var n=e.ui.ddmanager.current;if(!n||(n.currentItem||n.element)[0]==this.element[0])return;this.accept.call(this.element[0],n.currentItem||n.element)&&(this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("out",t,this.ui(n)))},_drop:function(t,n){var r=n||e.ui.ddmanager.current;if(!r||(r.currentItem||r.element)[0]==this.element[0])return!1;var i=!1;return this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function(){var t=e.data(this,"droppable");if(t.options.greedy&&!t.options.disabled&&t.options.scope==r.options.scope&&t.accept.call(t.element[0],r.currentItem||r.element)&&e.ui.intersect(r,e.extend(t,{offset:t.element.offset()}),t.options.tolerance))return i=!0,!1}),i?!1:this.accept.call(this.element[0],r.currentItem||r.element)?(this.options.activeClass&&this.element.removeClass(this.options.activeClass),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("drop",t,this.ui(r)),this.element):!1},ui:function(e){return{draggable:e.currentItem||e.element,helper:e.helper,position:e.position,offset:e.positionAbs}}}),e.ui.intersect=function(t,n,r){if(!n.offset)return!1;var i=(t.positionAbs||t.position.absolute).left,s=i+t.helperProportions.width,o=(t.positionAbs||t.position.absolute).top,u=o+t.helperProportions.height,a=n.offset.left,f=a+n.proportions.width,l=n.offset.top,c=l+n.proportions.height;switch(r){case"fit":return a<=i&&s<=f&&l<=o&&u<=c;case"intersect":return a<i+t.helperProportions.width/2&&s-t.helperProportions.width/2<f&&l<o+t.helperProportions.height/2&&u-t.helperProportions.height/2<c;case"pointer":var h=(t.positionAbs||t.position.absolute).left+(t.clickOffset||t.offset.click).left,p=(t.positionAbs||t.position.absolute).top+(t.clickOffset||t.offset.click).top,d=e.ui.isOver(p,h,l,a,n.proportions.height,n.proportions.width);return d;case"touch":return(o>=l&&o<=c||u>=l&&u<=c||o<l&&u>c)&&(i>=a&&i<=f||s>=a&&s<=f||i<a&&s>f);default:return!1}},e.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(t,n){var r=e.ui.ddmanager.droppables[t.options.scope]||[],i=n?n.type:null,s=(t.currentItem||t.element).find(":data(droppable)").andSelf();e:for(var o=0;o<r.length;o++){if(r[o].options.disabled||t&&!r[o].accept.call(r[o].element[0],t.currentItem||t.element))continue;for(var u=0;u<s.length;u++)if(s[u]==r[o].element[0]){r[o].proportions.height=0;continue e}r[o].visible=r[o].element.css("display")!="none";if(!r[o].visible)continue;i=="mousedown"&&r[o]._activate.call(r[o],n),r[o].offset=r[o].element.offset(),r[o].proportions={width:r[o].element[0].offsetWidth,height:r[o].element[0].offsetHeight}}},drop:function(t,n){var r=!1;return e.each(e.ui.ddmanager.droppables[t.options.scope]||[],function(){if(!this.options)return;!this.options.disabled&&this.visible&&e.ui.intersect(t,this,this.options.tolerance)&&(r=this._drop.call(this,n)||r),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],t.currentItem||t.element)&&(this.isout=1,this.isover=0,this._deactivate.call(this,n))}),r},dragStart:function(t,n){t.element.parentsUntil("body").bind("scroll.droppable",function(){t.options.refreshPositions||e.ui.ddmanager.prepareOffsets(t,n)})},drag:function(t,n){t.options.refreshPositions&&e.ui.ddmanager.prepareOffsets(t,n),e.each(e.ui.ddmanager.droppables[t.options.scope]||[],function(){if(this.options.disabled||this.greedyChild||!this.visible)return;var r=e.ui.intersect(t,this,this.options.tolerance),i=!r&&this.isover==1?"isout":r&&this.isover==0?"isover":null;if(!i)return;var s;if(this.options.greedy){var o=this.options.scope,u=this.element.parents(":data(droppable)").filter(function(){return e.data(this,"droppable").options.scope===o});u.length&&(s=e.data(u[0],"droppable"),s.greedyChild=i=="isover"?1:0)}s&&i=="isover"&&(s.isover=0,s.isout=1,s._out.call(s,n)),this[i]=1,this[i=="isout"?"isover":"isout"]=0,this[i=="isover"?"_over":"_out"].call(this,n),s&&i=="isout"&&(s.isout=0,s.isover=1,s._over.call(s,n))})},dragStop:function(t,n){t.element.parentsUntil("body").unbind("scroll.droppable"),t.options.refreshPositions||e.ui.ddmanager.prepareOffsets(t,n)}}})(jQuery);(function(e,t){e.widget("ui.resizable",e.ui.mouse,{version:"1.9.1",widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1e3},_create:function(){var t=this,n=this.options;this.element.addClass("ui-resizable"),e.extend(this,{_aspectRatio:!!n.aspectRatio,aspectRatio:n.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:n.helper||n.ghost||n.animate?n.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)&&(this.element.wrap(e('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("resizable",this.element.data("resizable")),this.elementIsWrapper=!0,this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")}),this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0}),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css({margin:this.originalElement.css("margin")}),this._proportionallyResize()),this.handles=n.handles||(e(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se");if(this.handles.constructor==String){this.handles=="all"&&(this.handles="n,e,s,w,se,sw,ne,nw");var r=this.handles.split(",");this.handles={};for(var i=0;i<r.length;i++){var s=e.trim(r[i]),o="ui-resizable-"+s,u=e('<div class="ui-resizable-handle '+o+'"></div>');u.css({zIndex:n.zIndex}),"se"==s&&u.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),this.handles[s]=".ui-resizable-"+s,this.element.append(u)}}this._renderAxis=function(t){t=t||this.element;for(var n in this.handles){this.handles[n].constructor==String&&(this.handles[n]=e(this.handles[n],this.element).show());if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var r=e(this.handles[n],this.element),i=0;i=/sw|ne|nw|se|n|s/.test(n)?r.outerHeight():r.outerWidth();var s=["padding",/ne|nw|n/.test(n)?"Top":/se|sw|s/.test(n)?"Bottom":/^e$/.test(n)?"Right":"Left"].join("");t.css(s,i),this._proportionallyResize()}if(!e(this.handles[n]).length)continue}},this._renderAxis(this.element),this._handles=e(".ui-resizable-handle",this.element).disableSelection(),this._handles.mouseover(function(){if(!t.resizing){if(this.className)var e=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);t.axis=e&&e[1]?e[1]:"se"}}),n.autoHide&&(this._handles.hide(),e(this.element).addClass("ui-resizable-autohide").mouseenter(function(){if(n.disabled)return;e(this).removeClass("ui-resizable-autohide"),t._handles.show()}).mouseleave(function(){if(n.disabled)return;t.resizing||(e(this).addClass("ui-resizable-autohide"),t._handles.hide())})),this._mouseInit()},_destroy:function(){this._mouseDestroy();var t=function(t){e(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};if(this.elementIsWrapper){t(this.element);var n=this.element;this.originalElement.css({position:n.css("position"),width:n.outerWidth(),height:n.outerHeight(),top:n.css("top"),left:n.css("left")}).insertAfter(n),n.remove()}return this.originalElement.css("resize",this.originalResizeStyle),t(this.originalElement),this},_mouseCapture:function(t){var n=!1;for(var r in this.handles)e(this.handles[r])[0]==t.target&&(n=!0);return!this.options.disabled&&n},_mouseStart:function(t){var r=this.options,i=this.element.position(),s=this.element;this.resizing=!0,this.documentScroll={top:e(document).scrollTop(),left:e(document).scrollLeft()},(s.is(".ui-draggable")||/absolute/.test(s.css("position")))&&s.css({position:"absolute",top:i.top,left:i.left}),this._renderProxy();var o=n(this.helper.css("left")),u=n(this.helper.css("top"));r.containment&&(o+=e(r.containment).scrollLeft()||0,u+=e(r.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:o,top:u},this.size=this._helper?{width:s.outerWidth(),height:s.outerHeight()}:{width:s.width(),height:s.height()},this.originalSize=this._helper?{width:s.outerWidth(),height:s.outerHeight()}:{width:s.width(),height:s.height()},this.originalPosition={left:o,top:u},this.sizeDiff={width:s.outerWidth()-s.width(),height:s.outerHeight()-s.height()},this.originalMousePosition={left:t.pageX,top:t.pageY},this.aspectRatio=typeof r.aspectRatio=="number"?r.aspectRatio:this.originalSize.width/this.originalSize.height||1;var a=e(".ui-resizable-"+this.axis).css("cursor");return e("body").css("cursor",a=="auto"?this.axis+"-resize":a),s.addClass("ui-resizable-resizing"),this._propagate("start",t),!0},_mouseDrag:function(e){var t=this.helper,n=this.options,r={},i=this,s=this.originalMousePosition,o=this.axis,u=e.pageX-s.left||0,a=e.pageY-s.top||0,f=this._change[o];if(!f)return!1;var l=f.apply(this,[e,u,a]);this._updateVirtualBoundaries(e.shiftKey);if(this._aspectRatio||e.shiftKey)l=this._updateRatio(l,e);return l=this._respectSize(l,e),this._propagate("resize",e),t.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"}),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),this._updateCache(l),this._trigger("resize",e,this.ui()),!1},_mouseStop:function(t){this.resizing=!1;var n=this.options,r=this;if(this._helper){var i=this._proportionallyResizeElements,s=i.length&&/textarea/i.test(i[0].nodeName),o=s&&e.ui.hasScroll(i[0],"left")?0:r.sizeDiff.height,u=s?0:r.sizeDiff.width,a={width:r.helper.width()-u,height:r.helper.height()-o},f=parseInt(r.element.css("left"),10)+(r.position.left-r.originalPosition.left)||null,l=parseInt(r.element.css("top"),10)+(r.position.top-r.originalPosition.top)||null;n.animate||this.element.css(e.extend(a,{top:l,left:f})),r.helper.height(r.size.height),r.helper.width(r.size.width),this._helper&&!n.animate&&this._proportionallyResize()}return e("body").css("cursor","auto"),this.element.removeClass("ui-resizable-resizing"),this._propagate("stop",t),this._helper&&this.helper.remove(),!1},_updateVirtualBoundaries:function(e){var t=this.options,n,i,s,o,u;u={minWidth:r(t.minWidth)?t.minWidth:0,maxWidth:r(t.maxWidth)?t.maxWidth:Infinity,minHeight:r(t.minHeight)?t.minHeight:0,maxHeight:r(t.maxHeight)?t.maxHeight:Infinity};if(this._aspectRatio||e)n=u.minHeight*this.aspectRatio,s=u.minWidth/this.aspectRatio,i=u.maxHeight*this.aspectRatio,o=u.maxWidth/this.aspectRatio,n>u.minWidth&&(u.minWidth=n),s>u.minHeight&&(u.minHeight=s),i<u.maxWidth&&(u.maxWidth=i),o<u.maxHeight&&(u.maxHeight=o);this._vBoundaries=u},_updateCache:function(e){var t=this.options;this.offset=this.helper.offset(),r(e.left)&&(this.position.left=e.left),r(e.top)&&(this.position.top=e.top),r(e.height)&&(this.size.height=e.height),r(e.width)&&(this.size.width=e.width)},_updateRatio:function(e,t){var n=this.options,i=this.position,s=this.size,o=this.axis;return r(e.height)?e.width=e.height*this.aspectRatio:r(e.width)&&(e.height=e.width/this.aspectRatio),o=="sw"&&(e.left=i.left+(s.width-e.width),e.top=null),o=="nw"&&(e.top=i.top+(s.height-e.height),e.left=i.left+(s.width-e.width)),e},_respectSize:function(e,t){var n=this.helper,i=this._vBoundaries,s=this._aspectRatio||t.shiftKey,o=this.axis,u=r(e.width)&&i.maxWidth&&i.maxWidth<e.width,a=r(e.height)&&i.maxHeight&&i.maxHeight<e.height,f=r(e.width)&&i.minWidth&&i.minWidth>e.width,l=r(e.height)&&i.minHeight&&i.minHeight>e.height;f&&(e.width=i.minWidth),l&&(e.height=i.minHeight),u&&(e.width=i.maxWidth),a&&(e.height=i.maxHeight);var c=this.originalPosition.left+this.originalSize.width,h=this.position.top+this.size.height,p=/sw|nw|w/.test(o),d=/nw|ne|n/.test(o);f&&p&&(e.left=c-i.minWidth),u&&p&&(e.left=c-i.maxWidth),l&&d&&(e.top=h-i.minHeight),a&&d&&(e.top=h-i.maxHeight);var v=!e.width&&!e.height;return v&&!e.left&&e.top?e.top=null:v&&!e.top&&e.left&&(e.left=null),e},_proportionallyResize:function(){var t=this.options;if(!this._proportionallyResizeElements.length)return;var n=this.helper||this.element;for(var r=0;r<this._proportionallyResizeElements.length;r++){var i=this._proportionallyResizeElements[r];if(!this.borderDif){var s=[i.css("borderTopWidth"),i.css("borderRightWidth"),i.css("borderBottomWidth"),i.css("borderLeftWidth")],o=[i.css("paddingTop"),i.css("paddingRight"),i.css("paddingBottom"),i.css("paddingLeft")];this.borderDif=e.map(s,function(e,t){var n=parseInt(e,10)||0,r=parseInt(o[t],10)||0;return n+r})}i.css({height:n.height()-this.borderDif[0]-this.borderDif[2]||0,width:n.width()-this.borderDif[1]-this.borderDif[3]||0})}},_renderProxy:function(){var t=this.element,n=this.options;this.elementOffset=t.offset();if(this._helper){this.helper=this.helper||e('<div style="overflow:hidden;"></div>');var r=e.ui.ie6?1:0,i=e.ui.ie6?2:-1;this.helper.addClass(this._helper).css({width:this.element.outerWidth()+i,height:this.element.outerHeight()+i,position:"absolute",left:this.elementOffset.left-r+"px",top:this.elementOffset.top-r+"px",zIndex:++n.zIndex}),this.helper.appendTo("body").disableSelection()}else this.helper=this.element},_change:{e:function(e,t,n){return{width:this.originalSize.width+t}},w:function(e,t,n){var r=this.options,i=this.originalSize,s=this.originalPosition;return{left:s.left+t,width:i.width-t}},n:function(e,t,n){var r=this.options,i=this.originalSize,s=this.originalPosition;return{top:s.top+n,height:i.height-n}},s:function(e,t,n){return{height:this.originalSize.height+n}},se:function(t,n,r){return e.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[t,n,r]))},sw:function(t,n,r){return e.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[t,n,r]))},ne:function(t,n,r){return e.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[t,n,r]))},nw:function(t,n,r){return e.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[t,n,r]))}},_propagate:function(t,n){e.ui.plugin.call(this,t,[n,this.ui()]),t!="resize"&&this._trigger(t,n,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),e.ui.plugin.add("resizable","alsoResize",{start:function(t,n){var r=e(this).data("resizable"),i=r.options,s=function(t){e(t).each(function(){var t=e(this);t.data("resizable-alsoresize",{width:parseInt(t.width(),10),height:parseInt(t.height(),10),left:parseInt(t.css("left"),10),top:parseInt(t.css("top"),10)})})};typeof i.alsoResize=="object"&&!i.alsoResize.parentNode?i.alsoResize.length?(i.alsoResize=i.alsoResize[0],s(i.alsoResize)):e.each(i.alsoResize,function(e){s(e)}):s(i.alsoResize)},resize:function(t,n){var r=e(this).data("resizable"),i=r.options,s=r.originalSize,o=r.originalPosition,u={height:r.size.height-s.height||0,width:r.size.width-s.width||0,top:r.position.top-o.top||0,left:r.position.left-o.left||0},a=function(t,r){e(t).each(function(){var t=e(this),i=e(this).data("resizable-alsoresize"),s={},o=r&&r.length?r:t.parents(n.originalElement[0]).length?["width","height"]:["width","height","top","left"];e.each(o,function(e,t){var n=(i[t]||0)+(u[t]||0);n&&n>=0&&(s[t]=n||null)}),t.css(s)})};typeof i.alsoResize=="object"&&!i.alsoResize.nodeType?e.each(i.alsoResize,function(e,t){a(e,t)}):a(i.alsoResize)},stop:function(t,n){e(this).removeData("resizable-alsoresize")}}),e.ui.plugin.add("resizable","animate",{stop:function(t,n){var r=e(this).data("resizable"),i=r.options,s=r._proportionallyResizeElements,o=s.length&&/textarea/i.test(s[0].nodeName),u=o&&e.ui.hasScroll(s[0],"left")?0:r.sizeDiff.height,a=o?0:r.sizeDiff.width,f={width:r.size.width-a,height:r.size.height-u},l=parseInt(r.element.css("left"),10)+(r.position.left-r.originalPosition.left)||null,c=parseInt(r.element.css("top"),10)+(r.position.top-r.originalPosition.top)||null;r.element.animate(e.extend(f,c&&l?{top:c,left:l}:{}),{duration:i.animateDuration,easing:i.animateEasing,step:function(){var n={width:parseInt(r.element.css("width"),10),height:parseInt(r.element.css("height"),10),top:parseInt(r.element.css("top"),10),left:parseInt(r.element.css("left"),10)};s&&s.length&&e(s[0]).css({width:n.width,height:n.height}),r._updateCache(n),r._propagate("resize",t)}})}}),e.ui.plugin.add("resizable","containment",{start:function(t,r){var i=e(this).data("resizable"),s=i.options,o=i.element,u=s.containment,a=u instanceof e?u.get(0):/parent/.test(u)?o.parent().get(0):u;if(!a)return;i.containerElement=e(a);if(/document/.test(u)||u==document)i.containerOffset={left:0,top:0},i.containerPosition={left:0,top:0},i.parentData={element:e(document),left:0,top:0,width:e(document).width(),height:e(document).height()||document.body.parentNode.scrollHeight};else{var f=e(a),l=[];e(["Top","Right","Left","Bottom"]).each(function(e,t){l[e]=n(f.css("padding"+t))}),i.containerOffset=f.offset(),i.containerPosition=f.position(),i.containerSize={height:f.innerHeight()-l[3],width:f.innerWidth()-l[1]};var c=i.containerOffset,h=i.containerSize.height,p=i.containerSize.width,d=e.ui.hasScroll(a,"left")?a.scrollWidth:p,v=e.ui.hasScroll(a)?a.scrollHeight:h;i.parentData={element:a,left:c.left,top:c.top,width:d,height:v}}},resize:function(t,n){var r=e(this).data("resizable"),i=r.options,s=r.containerSize,o=r.containerOffset,u=r.size,a=r.position,f=r._aspectRatio||t.shiftKey,l={top:0,left:0},c=r.containerElement;c[0]!=document&&/static/.test(c.css("position"))&&(l=o),a.left<(r._helper?o.left:0)&&(r.size.width=r.size.width+(r._helper?r.position.left-o.left:r.position.left-l.left),f&&(r.size.height=r.size.width/r.aspectRatio),r.position.left=i.helper?o.left:0),a.top<(r._helper?o.top:0)&&(r.size.height=r.size.height+(r._helper?r.position.top-o.top:r.position.top),f&&(r.size.width=r.size.height*r.aspectRatio),r.position.top=r._helper?o.top:0),r.offset.left=r.parentData.left+r.position.left,r.offset.top=r.parentData.top+r.position.top;var h=Math.abs((r._helper?r.offset.left-l.left:r.offset.left-l.left)+r.sizeDiff.width),p=Math.abs((r._helper?r.offset.top-l.top:r.offset.top-o.top)+r.sizeDiff.height),d=r.containerElement.get(0)==r.element.parent().get(0),v=/relative|absolute/.test(r.containerElement.css("position"));d&&v&&(h-=r.parentData.left),h+r.size.width>=r.parentData.width&&(r.size.width=r.parentData.width-h,f&&(r.size.height=r.size.width/r.aspectRatio)),p+r.size.height>=r.parentData.height&&(r.size.height=r.parentData.height-p,f&&(r.size.width=r.size.height*r.aspectRatio))},stop:function(t,n){var r=e(this).data("resizable"),i=r.options,s=r.position,o=r.containerOffset,u=r.containerPosition,a=r.containerElement,f=e(r.helper),l=f.offset(),c=f.outerWidth()-r.sizeDiff.width,h=f.outerHeight()-r.sizeDiff.height;r._helper&&!i.animate&&/relative/.test(a.css("position"))&&e(this).css({left:l.left-u.left-o.left,width:c,height:h}),r._helper&&!i.animate&&/static/.test(a.css("position"))&&e(this).css({left:l.left-u.left-o.left,width:c,height:h})}}),e.ui.plugin.add("resizable","ghost",{start:function(t,n){var r=e(this).data("resizable"),i=r.options,s=r.size;r.ghost=r.originalElement.clone(),r.ghost.css({opacity:.25,display:"block",position:"relative",height:s.height,width:s.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof i.ghost=="string"?i.ghost:""),r.ghost.appendTo(r.helper)},resize:function(t,n){var r=e(this).data("resizable"),i=r.options;r.ghost&&r.ghost.css({position:"relative",height:r.size.height,width:r.size.width})},stop:function(t,n){var r=e(this).data("resizable"),i=r.options;r.ghost&&r.helper&&r.helper.get(0).removeChild(r.ghost.get(0))}}),e.ui.plugin.add("resizable","grid",{resize:function(t,n){var r=e(this).data("resizable"),i=r.options,s=r.size,o=r.originalSize,u=r.originalPosition,a=r.axis,f=i._aspectRatio||t.shiftKey;i.grid=typeof i.grid=="number"?[i.grid,i.grid]:i.grid;var l=Math.round((s.width-o.width)/(i.grid[0]||1))*(i.grid[0]||1),c=Math.round((s.height-o.height)/(i.grid[1]||1))*(i.grid[1]||1);/^(se|s|e)$/.test(a)?(r.size.width=o.width+l,r.size.height=o.height+c):/^(ne)$/.test(a)?(r.size.width=o.width+l,r.size.height=o.height+c,r.position.top=u.top-c):/^(sw)$/.test(a)?(r.size.width=o.width+l,r.size.height=o.height+c,r.position.left=u.left-l):(r.size.width=o.width+l,r.size.height=o.height+c,r.position.top=u.top-c,r.position.left=u.left-l)}});var n=function(e){return parseInt(e,10)||0},r=function(e){return!isNaN(parseInt(e,10))}})(jQuery);(function(e,t){e.widget("ui.selectable",e.ui.mouse,{version:"1.9.1",options:{appendTo:"body",autoRefresh:!0,distance:0,filter:"*",tolerance:"touch"},_create:function(){var t=this;this.element.addClass("ui-selectable"),this.dragged=!1;var n;this.refresh=function(){n=e(t.options.filter,t.element[0]),n.addClass("ui-selectee"),n.each(function(){var t=e(this),n=t.offset();e.data(this,"selectable-item",{element:this,$element:t,left:n.left,top:n.top,right:n.left+t.outerWidth(),bottom:n.top+t.outerHeight(),startselected:!1,selected:t.hasClass("ui-selected"),selecting:t.hasClass("ui-selecting"),unselecting:t.hasClass("ui-unselecting")})})},this.refresh(),this.selectees=n.addClass("ui-selectee"),this._mouseInit(),this.helper=e("<div class='ui-selectable-helper'></div>")},_destroy:function(){this.selectees.removeClass("ui-selectee").removeData("selectable-item"),this.element.removeClass("ui-selectable ui-selectable-disabled"),this._mouseDestroy()},_mouseStart:function(t){var n=this;this.opos=[t.pageX,t.pageY];if(this.options.disabled)return;var r=this.options;this.selectees=e(r.filter,this.element[0]),this._trigger("start",t),e(r.appendTo).append(this.helper),this.helper.css({left:t.clientX,top:t.clientY,width:0,height:0}),r.autoRefresh&&this.refresh(),this.selectees.filter(".ui-selected").each(function(){var r=e.data(this,"selectable-item");r.startselected=!0,!t.metaKey&&!t.ctrlKey&&(r.$element.removeClass("ui-selected"),r.selected=!1,r.$element.addClass("ui-unselecting"),r.unselecting=!0,n._trigger("unselecting",t,{unselecting:r.element}))}),e(t.target).parents().andSelf().each(function(){var r=e.data(this,"selectable-item");if(r){var i=!t.metaKey&&!t.ctrlKey||!r.$element.hasClass("ui-selected");return r.$element.removeClass(i?"ui-unselecting":"ui-selected").addClass(i?"ui-selecting":"ui-unselecting"),r.unselecting=!i,r.selecting=i,r.selected=i,i?n._trigger("selecting",t,{selecting:r.element}):n._trigger("unselecting",t,{unselecting:r.element}),!1}})},_mouseDrag:function(t){var n=this;this.dragged=!0;if(this.options.disabled)return;var r=this.options,i=this.opos[0],s=this.opos[1],o=t.pageX,u=t.pageY;if(i>o){var a=o;o=i,i=a}if(s>u){var a=u;u=s,s=a}return this.helper.css({left:i,top:s,width:o-i,height:u-s}),this.selectees.each(function(){var a=e.data(this,"selectable-item");if(!a||a.element==n.element[0])return;var f=!1;r.tolerance=="touch"?f=!(a.left>o||a.right<i||a.top>u||a.bottom<s):r.tolerance=="fit"&&(f=a.left>i&&a.right<o&&a.top>s&&a.bottom<u),f?(a.selected&&(a.$element.removeClass("ui-selected"),a.selected=!1),a.unselecting&&(a.$element.removeClass("ui-unselecting"),a.unselecting=!1),a.selecting||(a.$element.addClass("ui-selecting"),a.selecting=!0,n._trigger("selecting",t,{selecting:a.element}))):(a.selecting&&((t.metaKey||t.ctrlKey)&&a.startselected?(a.$element.removeClass("ui-selecting"),a.selecting=!1,a.$element.addClass("ui-selected"),a.selected=!0):(a.$element.removeClass("ui-selecting"),a.selecting=!1,a.startselected&&(a.$element.addClass("ui-unselecting"),a.unselecting=!0),n._trigger("unselecting",t,{unselecting:a.element}))),a.selected&&!t.metaKey&&!t.ctrlKey&&!a.startselected&&(a.$element.removeClass("ui-selected"),a.selected=!1,a.$element.addClass("ui-unselecting"),a.unselecting=!0,n._trigger("unselecting",t,{unselecting:a.element})))}),!1},_mouseStop:function(t){var n=this;this.dragged=!1;var r=this.options;return e(".ui-unselecting",this.element[0]).each(function(){var r=e.data(this,"selectable-item");r.$element.removeClass("ui-unselecting"),r.unselecting=!1,r.startselected=!1,n._trigger("unselected",t,{unselected:r.element})}),e(".ui-selecting",this.element[0]).each(function(){var r=e.data(this,"selectable-item");r.$element.removeClass("ui-selecting").addClass("ui-selected"),r.selecting=!1,r.selected=!0,r.startselected=!0,n._trigger("selected",t,{selected:r.element})}),this._trigger("stop",t),this.helper.remove(),!1}})})(jQuery);(function(e,t){e.widget("ui.sortable",e.ui.mouse,{version:"1.9.1",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3},_create:function(){var e=this.options;this.containerCache={},this.element.addClass("ui-sortable"),this.refresh(),this.floating=this.items.length?e.axis==="x"||/left|right/.test(this.items[0].item.css("float"))||/inline|table-cell/.test(this.items[0].item.css("display")):!1,this.offset=this.element.offset(),this._mouseInit(),this.ready=!0},_destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled"),this._mouseDestroy();for(var e=this.items.length-1;e>=0;e--)this.items[e].item.removeData(this.widgetName+"-item");return this},_setOption:function(t,n){t==="disabled"?(this.options[t]=n,this.widget().toggleClass("ui-sortable-disabled",!!n)):e.Widget.prototype._setOption.apply(this,arguments)},_mouseCapture:function(t,n){var r=this;if(this.reverting)return!1;if(this.options.disabled||this.options.type=="static")return!1;this._refreshItems(t);var i=null,s=e(t.target).parents().each(function(){if(e.data(this,r.widgetName+"-item")==r)return i=e(this),!1});e.data(t.target,r.widgetName+"-item")==r&&(i=e(t.target));if(!i)return!1;if(this.options.handle&&!n){var o=!1;e(this.options.handle,i).find("*").andSelf().each(function(){this==t.target&&(o=!0)});if(!o)return!1}return this.currentItem=i,this._removeCurrentsFromItems(),!0},_mouseStart:function(t,n,r){var i=this.options;this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(t),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},e.extend(this.offset,{click:{left:t.pageX-this.offset.left,top:t.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),this.originalPosition=this._generatePosition(t),this.originalPageX=t.pageX,this.originalPageY=t.pageY,i.cursorAt&&this._adjustOffsetFromHelper(i.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!=this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),i.containment&&this._setContainment(),i.cursor&&(e("body").css("cursor")&&(this._storedCursor=e("body").css("cursor")),e("body").css("cursor",i.cursor)),i.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",i.opacity)),i.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",i.zIndex)),this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",t,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions();if(!r)for(var s=this.containers.length-1;s>=0;s--)this.containers[s]._trigger("activate",t,this._uiHash(this));return e.ui.ddmanager&&(e.ui.ddmanager.current=this),e.ui.ddmanager&&!i.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this.dragging=!0,this.helper.addClass("ui-sortable-helper"),this._mouseDrag(t),!0},_mouseDrag:function(t){this.position=this._generatePosition(t),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs);if(this.options.scroll){var n=this.options,r=!1;this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-t.pageY<n.scrollSensitivity?this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop+n.scrollSpeed:t.pageY-this.overflowOffset.top<n.scrollSensitivity&&(this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop-n.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-t.pageX<n.scrollSensitivity?this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft+n.scrollSpeed:t.pageX-this.overflowOffset.left<n.scrollSensitivity&&(this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft-n.scrollSpeed)):(t.pageY-e(document).scrollTop()<n.scrollSensitivity?r=e(document).scrollTop(e(document).scrollTop()-n.scrollSpeed):e(window).height()-(t.pageY-e(document).scrollTop())<n.scrollSensitivity&&(r=e(document).scrollTop(e(document).scrollTop()+n.scrollSpeed)),t.pageX-e(document).scrollLeft()<n.scrollSensitivity?r=e(document).scrollLeft(e(document).scrollLeft()-n.scrollSpeed):e(window).width()-(t.pageX-e(document).scrollLeft())<n.scrollSensitivity&&(r=e(document).scrollLeft(e(document).scrollLeft()+n.scrollSpeed))),r!==!1&&e.ui.ddmanager&&!n.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t)}this.positionAbs=this._convertPositionTo("absolute");if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";for(var i=this.items.length-1;i>=0;i--){var s=this.items[i],o=s.item[0],u=this._intersectsWithPointer(s);if(!u)continue;if(s.instance!==this.currentContainer)continue;if(o!=this.currentItem[0]&&this.placeholder[u==1?"next":"prev"]()[0]!=o&&!e.contains(this.placeholder[0],o)&&(this.options.type=="semi-dynamic"?!e.contains(this.element[0],o):!0)){this.direction=u==1?"down":"up";if(this.options.tolerance!="pointer"&&!this._intersectsWithSides(s))break;this._rearrange(t,s),this._trigger("change",t,this._uiHash());break}}return this._contactContainers(t),e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),this._trigger("sort",t,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(t,n){if(!t)return;e.ui.ddmanager&&!this.options.dropBehaviour&&e.ui.ddmanager.drop(this,t);if(this.options.revert){var r=this,i=this.placeholder.offset();this.reverting=!0,e(this.helper).animate({left:i.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:i.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){r._clear(t)})}else this._clear(t,n);return!1},cancel:function(){if(this.dragging){this._mouseUp({target:null}),this.options.helper=="original"?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var t=this.containers.length-1;t>=0;t--)this.containers[t]._trigger("deactivate",null,this._uiHash(this)),this.containers[t].containerCache.over&&(this.containers[t]._trigger("out",null,this._uiHash(this)),this.containers[t].containerCache.over=0)}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.options.helper!="original"&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),e.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?e(this.domPosition.prev).after(this.currentItem):e(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(t){var n=this._getItemsAsjQuery(t&&t.connected),r=[];return t=t||{},e(n).each(function(){var n=(e(t.item||this).attr(t.attribute||"id")||"").match(t.expression||/(.+)[-=_](.+)/);n&&r.push((t.key||n[1]+"[]")+"="+(t.key&&t.expression?n[1]:n[2]))}),!r.length&&t.key&&r.push(t.key+"="),r.join("&")},toArray:function(t){var n=this._getItemsAsjQuery(t&&t.connected),r=[];return t=t||{},n.each(function(){r.push(e(t.item||this).attr(t.attribute||"id")||"")}),r},_intersectsWith:function(e){var t=this.positionAbs.left,n=t+this.helperProportions.width,r=this.positionAbs.top,i=r+this.helperProportions.height,s=e.left,o=s+e.width,u=e.top,a=u+e.height,f=this.offset.click.top,l=this.offset.click.left,c=r+f>u&&r+f<a&&t+l>s&&t+l<o;return this.options.tolerance=="pointer"||this.options.forcePointerForContainers||this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>e[this.floating?"width":"height"]?c:s<t+this.helperProportions.width/2&&n-this.helperProportions.width/2<o&&u<r+this.helperProportions.height/2&&i-this.helperProportions.height/2<a},_intersectsWithPointer:function(t){var n=this.options.axis==="x"||e.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,t.top,t.height),r=this.options.axis==="y"||e.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,t.left,t.width),i=n&&r,s=this._getDragVerticalDirection(),o=this._getDragHorizontalDirection();return i?this.floating?o&&o=="right"||s=="down"?2:1:s&&(s=="down"?2:1):!1},_intersectsWithSides:function(t){var n=e.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,t.top+t.height/2,t.height),r=e.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,t.left+t.width/2,t.width),i=this._getDragVerticalDirection(),s=this._getDragHorizontalDirection();return this.floating&&s?s=="right"&&r||s=="left"&&!r:i&&(i=="down"&&n||i=="up"&&!n)},_getDragVerticalDirection:function(){var e=this.positionAbs.top-this.lastPositionAbs.top;return e!=0&&(e>0?"down":"up")},_getDragHorizontalDirection:function(){var e=this.positionAbs.left-this.lastPositionAbs.left;return e!=0&&(e>0?"right":"left")},refresh:function(e){return this._refreshItems(e),this.refreshPositions(),this},_connectWith:function(){var e=this.options;return e.connectWith.constructor==String?[e.connectWith]:e.connectWith},_getItemsAsjQuery:function(t){var n=[],r=[],i=this._connectWith();if(i&&t)for(var s=i.length-1;s>=0;s--){var o=e(i[s]);for(var u=o.length-1;u>=0;u--){var a=e.data(o[u],this.widgetName);a&&a!=this&&!a.options.disabled&&r.push([e.isFunction(a.options.items)?a.options.items.call(a.element):e(a.options.items,a.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),a])}}r.push([e.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):e(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]);for(var s=r.length-1;s>=0;s--)r[s][0].each(function(){n.push(this)});return e(n)},_removeCurrentsFromItems:function(){var t=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=e.grep(this.items,function(e){for(var n=0;n<t.length;n++)if(t[n]==e.item[0])return!1;return!0})},_refreshItems:function(t){this.items=[],this.containers=[this];var n=this.items,r=[[e.isFunction(this.options.items)?this.options.items.call(this.element[0],t,{item:this.currentItem}):e(this.options.items,this.element),this]],i=this._connectWith();if(i&&this.ready)for(var s=i.length-1;s>=0;s--){var o=e(i[s]);for(var u=o.length-1;u>=0;u--){var a=e.data(o[u],this.widgetName);a&&a!=this&&!a.options.disabled&&(r.push([e.isFunction(a.options.items)?a.options.items.call(a.element[0],t,{item:this.currentItem}):e(a.options.items,a.element),a]),this.containers.push(a))}}for(var s=r.length-1;s>=0;s--){var f=r[s][1],l=r[s][0];for(var u=0,c=l.length;u<c;u++){var h=e(l[u]);h.data(this.widgetName+"-item",f),n.push({item:h,instance:f,width:0,height:0,left:0,top:0})}}},refreshPositions:function(t){this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());for(var n=this.items.length-1;n>=0;n--){var r=this.items[n];if(r.instance!=this.currentContainer&&this.currentContainer&&r.item[0]!=this.currentItem[0])continue;var i=this.options.toleranceElement?e(this.options.toleranceElement,r.item):r.item;t||(r.width=i.outerWidth(),r.height=i.outerHeight());var s=i.offset();r.left=s.left,r.top=s.top}if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(var n=this.containers.length-1;n>=0;n--){var s=this.containers[n].element.offset();this.containers[n].containerCache.left=s.left,this.containers[n].containerCache.top=s.top,this.containers[n].containerCache.width=this.containers[n].element.outerWidth(),this.containers[n].containerCache.height=this.containers[n].element.outerHeight()}return this},_createPlaceholder:function(t){t=t||this;var n=t.options;if(!n.placeholder||n.placeholder.constructor==String){var r=n.placeholder;n.placeholder={element:function(){var n=e(document.createElement(t.currentItem[0].nodeName)).addClass(r||t.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];return r||(n.style.visibility="hidden"),n},update:function(e,i){if(r&&!n.forcePlaceholderSize)return;i.height()||i.height(t.currentItem.innerHeight()-parseInt(t.currentItem.css("paddingTop")||0,10)-parseInt(t.currentItem.css("paddingBottom")||0,10)),i.width()||i.width(t.currentItem.innerWidth()-parseInt(t.currentItem.css("paddingLeft")||0,10)-parseInt(t.currentItem.css("paddingRight")||0,10))}}}t.placeholder=e(n.placeholder.element.call(t.element,t.currentItem)),t.currentItem.after(t.placeholder),n.placeholder.update(t,t.placeholder)},_contactContainers:function(t){var n=null,r=null;for(var i=this.containers.length-1;i>=0;i--){if(e.contains(this.currentItem[0],this.containers[i].element[0]))continue;if(this._intersectsWith(this.containers[i].containerCache)){if(n&&e.contains(this.containers[i].element[0],n.element[0]))continue;n=this.containers[i],r=i}else this.containers[i].containerCache.over&&(this.containers[i]._trigger("out",t,this._uiHash(this)),this.containers[i].containerCache.over=0)}if(!n)return;if(this.containers.length===1)this.containers[r]._trigger("over",t,this._uiHash(this)),this.containers[r].containerCache.over=1;else{var s=1e4,o=null,u=this.containers[r].floating?"left":"top",a=this.containers[r].floating?"width":"height",f=this.positionAbs[u]+this.offset.click[u];for(var l=this.items.length-1;l>=0;l--){if(!e.contains(this.containers[r].element[0],this.items[l].item[0]))continue;if(this.items[l].item[0]==this.currentItem[0])continue;var c=this.items[l].item.offset()[u],h=!1;Math.abs(c-f)>Math.abs(c+this.items[l][a]-f)&&(h=!0,c+=this.items[l][a]),Math.abs(c-f)<s&&(s=Math.abs(c-f),o=this.items[l],this.direction=h?"up":"down")}if(!o&&!this.options.dropOnEmpty)return;this.currentContainer=this.containers[r],o?this._rearrange(t,o,null,!0):this._rearrange(t,null,this.containers[r].element,!0),this._trigger("change",t,this._uiHash()),this.containers[r]._trigger("change",t,this._uiHash(this)),this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[r]._trigger("over",t,this._uiHash(this)),this.containers[r].containerCache.over=1}},_createHelper:function(t){var n=this.options,r=e.isFunction(n.helper)?e(n.helper.apply(this.element[0],[t,this.currentItem])):n.helper=="clone"?this.currentItem.clone():this.currentItem;return r.parents("body").length||e(n.appendTo!="parent"?n.appendTo:this.currentItem[0].parentNode)[0].appendChild(r[0]),r[0]==this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(r[0].style.width==""||n.forceHelperSize)&&r.width(this.currentItem.width()),(r[0].style.height==""||n.forceHelperSize)&&r.height(this.currentItem.height()),r},_adjustOffsetFromHelper:function(t){typeof t=="string"&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var t=this.offsetParent.offset();this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop());if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&e.ui.ie)t={top:0,left:0};return{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var e=this.currentItem.position();return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:e.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t=this.options;t.containment=="parent"&&(t.containment=this.helper[0].parentNode);if(t.containment=="document"||t.containment=="window")this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,e(t.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(e(t.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(t.containment)){var n=e(t.containment)[0],r=e(t.containment).offset(),i=e(n).css("overflow")!="hidden";this.containment=[r.left+(parseInt(e(n).css("borderLeftWidth"),10)||0)+(parseInt(e(n).css("paddingLeft"),10)||0)-this.margins.left,r.top+(parseInt(e(n).css("borderTopWidth"),10)||0)+(parseInt(e(n).css("paddingTop"),10)||0)-this.margins.top,r.left+(i?Math.max(n.scrollWidth,n.offsetWidth):n.offsetWidth)-(parseInt(e(n).css("borderLeftWidth"),10)||0)-(parseInt(e(n).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,r.top+(i?Math.max(n.scrollHeight,n.offsetHeight):n.offsetHeight)-(parseInt(e(n).css("borderTopWidth"),10)||0)-(parseInt(e(n).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]}},_convertPositionTo:function(t,n){n||(n=this.position);var r=t=="absolute"?1:-1,i=this.options,s=this.cssPosition!="absolute"||this.scrollParent[0]!=document&&!!e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,o=/(html|body)/i.test(s[0].tagName);return{top:n.top+this.offset.relative.top*r+this.offset.parent.top*r-(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():o?0:s.scrollTop())*r,left:n.left+this.offset.relative.left*r+this.offset.parent.left*r-(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():o?0:s.scrollLeft())*r}},_generatePosition:function(t){var n=this.options,r=this.cssPosition!="absolute"||this.scrollParent[0]!=document&&!!e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,i=/(html|body)/i.test(r[0].tagName);this.cssPosition=="relative"&&(this.scrollParent[0]==document||this.scrollParent[0]==this.offsetParent[0])&&(this.offset.relative=this._getRelativeOffset());var s=t.pageX,o=t.pageY;if(this.originalPosition){this.containment&&(t.pageX-this.offset.click.left<this.containment[0]&&(s=this.containment[0]+this.offset.click.left),t.pageY-this.offset.click.top<this.containment[1]&&(o=this.containment[1]+this.offset.click.top),t.pageX-this.offset.click.left>this.containment[2]&&(s=this.containment[2]+this.offset.click.left),t.pageY-this.offset.click.top>this.containment[3]&&(o=this.containment[3]+this.offset.click.top));if(n.grid){var u=this.originalPageY+Math.round((o-this.originalPageY)/n.grid[1])*n.grid[1];o=this.containment?u-this.offset.click.top<this.containment[1]||u-this.offset.click.top>this.containment[3]?u-this.offset.click.top<this.containment[1]?u+n.grid[1]:u-n.grid[1]:u:u;var a=this.originalPageX+Math.round((s-this.originalPageX)/n.grid[0])*n.grid[0];s=this.containment?a-this.offset.click.left<this.containment[0]||a-this.offset.click.left>this.containment[2]?a-this.offset.click.left<this.containment[0]?a+n.grid[0]:a-n.grid[0]:a:a}}return{top:o-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():i?0:r.scrollTop()),left:s-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():i?0:r.scrollLeft())}},_rearrange:function(e,t,n,r){n?n[0].appendChild(this.placeholder[0]):t.item[0].parentNode.insertBefore(this.placeholder[0],this.direction=="down"?t.item[0]:t.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var i=this.counter;this._delay(function(){i==this.counter&&this.refreshPositions(!r)})},_clear:function(t,n){this.reverting=!1;var r=[];!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null;if(this.helper[0]==this.currentItem[0]){for(var i in this._storedCSS)if(this._storedCSS[i]=="auto"||this._storedCSS[i]=="static")this._storedCSS[i]="";this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();this.fromOutside&&!n&&r.push(function(e){this._trigger("receive",e,this._uiHash(this.fromOutside))}),(this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!n&&r.push(function(e){this._trigger("update",e,this._uiHash())}),this!==this.currentContainer&&(n||(r.push(function(e){this._trigger("remove",e,this._uiHash())}),r.push(function(e){return function(t){e._trigger("receive",t,this._uiHash(this))}}.call(this,this.currentContainer)),r.push(function(e){return function(t){e._trigger("update",t,this._uiHash(this))}}.call(this,this.currentContainer))));for(var i=this.containers.length-1;i>=0;i--)n||r.push(function(e){return function(t){e._trigger("deactivate",t,this._uiHash(this))}}.call(this,this.containers[i])),this.containers[i].containerCache.over&&(r.push(function(e){return function(t){e._trigger("out",t,this._uiHash(this))}}.call(this,this.containers[i])),this.containers[i].containerCache.over=0);this._storedCursor&&e("body").css("cursor",this._storedCursor),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex),this.dragging=!1;if(this.cancelHelperRemoval){if(!n){this._trigger("beforeStop",t,this._uiHash());for(var i=0;i<r.length;i++)r[i].call(this,t);this._trigger("stop",t,this._uiHash())}return this.fromOutside=!1,!1}n||this._trigger("beforeStop",t,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.helper[0]!=this.currentItem[0]&&this.helper.remove(),this.helper=null;if(!n){for(var i=0;i<r.length;i++)r[i].call(this,t);this._trigger("stop",t,this._uiHash())}return this.fromOutside=!1,!0},_trigger:function(){e.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(t){var n=t||this;return{helper:n.helper,placeholder:n.placeholder||e([]),position:n.position,originalPosition:n.originalPosition,offset:n.positionAbs,item:n.currentItem,sender:t?t.element:null}}})})(jQuery);(function(e,t){var n=0,r={},i={};r.height=r.paddingTop=r.paddingBottom=r.borderTopWidth=r.borderBottomWidth="hide",i.height=i.paddingTop=i.paddingBottom=i.borderTopWidth=i.borderBottomWidth="show",e.widget("ui.accordion",{version:"1.9.1",options:{active:0,animate:{},collapsible:!1,event:"click",header:"> li > :first-child,> :not(li):even",heightStyle:"auto",icons:{activeHeader:"ui-icon-triangle-1-s",header:"ui-icon-triangle-1-e"},activate:null,beforeActivate:null},_create:function(){var t=this.accordionId="ui-accordion-"+(this.element.attr("id")||++n),r=this.options;this.prevShow=this.prevHide=e(),this.element.addClass("ui-accordion ui-widget ui-helper-reset"),this.headers=this.element.find(r.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all"),this._hoverable(this.headers),this._focusable(this.headers),this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").hide(),!r.collapsible&&(r.active===!1||r.active==null)&&(r.active=0),r.active<0&&(r.active+=this.headers.length),this.active=this._findActive(r.active).addClass("ui-accordion-header-active ui-state-active").toggleClass("ui-corner-all ui-corner-top"),this.active.next().addClass("ui-accordion-content-active").show(),this._createIcons(),this.refresh(),this.element.attr("role","tablist"),this.headers.attr("role","tab").each(function(n){var r=e(this),i=r.attr("id"),s=r.next(),o=s.attr("id");i||(i=t+"-header-"+n,r.attr("id",i)),o||(o=t+"-panel-"+n,s.attr("id",o)),r.attr("aria-controls",o),s.attr("aria-labelledby",i)}).next().attr("role","tabpanel"),this.headers.not(this.active).attr({"aria-selected":"false",tabIndex:-1}).next().attr({"aria-expanded":"false","aria-hidden":"true"}).hide(),this.active.length?this.active.attr({"aria-selected":"true",tabIndex:0}).next().attr({"aria-expanded":"true","aria-hidden":"false"}):this.headers.eq(0).attr("tabIndex",0),this._on(this.headers,{keydown:"_keydown"}),this._on(this.headers.next(),{keydown:"_panelKeyDown"}),this._setupEvents(r.event)},_getCreateEventData:function(){return{header:this.active,content:this.active.length?this.active.next():e()}},_createIcons:function(){var t=this.options.icons;t&&(e("<span>").addClass("ui-accordion-header-icon ui-icon "+t.header).prependTo(this.headers),this.active.children(".ui-accordion-header-icon").removeClass(t.header).addClass(t.activeHeader),this.headers.addClass("ui-accordion-icons"))},_destroyIcons:function(){this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()},_destroy:function(){var e;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"),this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").each(function(){/^ui-accordion/.test(this.id)&&this.removeAttribute("id")}),this._destroyIcons(),e=this.headers.next().css("display","").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").each(function(){/^ui-accordion/.test(this.id)&&this.removeAttribute("id")}),this.options.heightStyle!=="content"&&e.css("height","")},_setOption:function(e,t){if(e==="active"){this._activate(t);return}e==="event"&&(this.options.event&&this._off(this.headers,this.options.event),this._setupEvents(t)),this._super(e,t),e==="collapsible"&&!t&&this.options.active===!1&&this._activate(0),e==="icons"&&(this._destroyIcons(),t&&this._createIcons()),e==="disabled"&&this.headers.add(this.headers.next()).toggleClass("ui-state-disabled",!!t)},_keydown:function(t){if(t.altKey||t.ctrlKey)return;var n=e.ui.keyCode,r=this.headers.length,i=this.headers.index(t.target),s=!1;switch(t.keyCode){case n.RIGHT:case n.DOWN:s=this.headers[(i+1)%r];break;case n.LEFT:case n.UP:s=this.headers[(i-1+r)%r];break;case n.SPACE:case n.ENTER:this._eventHandler(t);break;case n.HOME:s=this.headers[0];break;case n.END:s=this.headers[r-1]}s&&(e(t.target).attr("tabIndex",-1),e(s).attr("tabIndex",0),s.focus(),t.preventDefault())},_panelKeyDown:function(t){t.keyCode===e.ui.keyCode.UP&&t.ctrlKey&&e(t.currentTarget).prev().focus()},refresh:function(){var t,n,r=this.options.heightStyle,i=this.element.parent();r==="fill"?(e.support.minHeight||(n=i.css("overflow"),i.css("overflow","hidden")),t=i.height(),this.element.siblings(":visible").each(function(){var n=e(this),r=n.css("position");if(r==="absolute"||r==="fixed")return;t-=n.outerHeight(!0)}),n&&i.css("overflow",n),this.headers.each(function(){t-=e(this).outerHeight(!0)}),this.headers.next().each(function(){e(this).height(Math.max(0,t-e(this).innerHeight()+e(this).height()))}).css("overflow","auto")):r==="auto"&&(t=0,this.headers.next().each(function(){t=Math.max(t,e(this).height("").height())}).height(t))},_activate:function(t){var n=this._findActive(t)[0];if(n===this.active[0])return;n=n||this.active[0],this._eventHandler({target:n,currentTarget:n,preventDefault:e.noop})},_findActive:function(t){return typeof t=="number"?this.headers.eq(t):e()},_setupEvents:function(t){var n={};if(!t)return;e.each(t.split(" "),function(e,t){n[t]="_eventHandler"}),this._on(this.headers,n)},_eventHandler:function(t){var n=this.options,r=this.active,i=e(t.currentTarget),s=i[0]===r[0],o=s&&n.collapsible,u=o?e():i.next(),a=r.next(),f={oldHeader:r,oldPanel:a,newHeader:o?e():i,newPanel:u};t.preventDefault();if(s&&!n.collapsible||this._trigger("beforeActivate",t,f)===!1)return;n.active=o?!1:this.headers.index(i),this.active=s?e():i,this._toggle(f),r.removeClass("ui-accordion-header-active ui-state-active"),n.icons&&r.children(".ui-accordion-header-icon").removeClass(n.icons.activeHeader).addClass(n.icons.header),s||(i.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"),n.icons&&i.children(".ui-accordion-header-icon").removeClass(n.icons.header).addClass(n.icons.activeHeader),i.next().addClass("ui-accordion-content-active"))},_toggle:function(t){var n=t.newPanel,r=this.prevShow.length?this.prevShow:t.oldPanel;this.prevShow.add(this.prevHide).stop(!0,!0),this.prevShow=n,this.prevHide=r,this.options.animate?this._animate(n,r,t):(r.hide(),n.show(),this._toggleComplete(t)),r.attr({"aria-expanded":"false","aria-hidden":"true"}),r.prev().attr("aria-selected","false"),n.length&&r.length?r.prev().attr("tabIndex",-1):n.length&&this.headers.filter(function(){return e(this).attr("tabIndex")===0}).attr("tabIndex",-1),n.attr({"aria-expanded":"true","aria-hidden":"false"}).prev().attr({"aria-selected":"true",tabIndex:0})},_animate:function(e,t,n){var s,o,u,a=this,f=0,l=e.length&&(!t.length||e.index()<t.index()),c=this.options.animate||{},h=l&&c.down||c,p=function(){a._toggleComplete(n)};typeof h=="number"&&(u=h),typeof h=="string"&&(o=h),o=o||h.easing||c.easing,u=u||h.duration||c.duration;if(!t.length)return e.animate(i,u,o,p);if(!e.length)return t.animate(r,u,o,p);s=e.show().outerHeight(),t.animate(r,{duration:u,easing:o,step:function(e,t){t.now=Math.round(e)}}),e.hide().animate(i,{duration:u,easing:o,complete:p,step:function(e,n){n.now=Math.round(e),n.prop!=="height"?f+=n.now:a.options.heightStyle!=="content"&&(n.now=Math.round(s-t.outerHeight()-f),f=0)}})},_toggleComplete:function(e){var t=e.oldPanel;t.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"),t.length&&(t.parent()[0].className=t.parent()[0].className),this._trigger("activate",null,e)}}),e.uiBackCompat!==!1&&(function(e,t){e.extend(t.options,{navigation:!1,navigationFilter:function(){return this.href.toLowerCase()===location.href.toLowerCase()}});var n=t._create;t._create=function(){if(this.options.navigation){var t=this,r=this.element.find(this.options.header),i=r.next(),s=r.add(i).find("a").filter(this.options.navigationFilter)[0];s&&r.add(i).each(function(n){if(e.contains(this,s))return t.options.active=Math.floor(n/2),!1})}n.call(this)}}(jQuery,jQuery.ui.accordion.prototype),function(e,t){e.extend(t.options,{heightStyle:null,autoHeight:!0,clearStyle:!1,fillSpace:!1});var n=t._create,r=t._setOption;e.extend(t,{_create:function(){this.options.heightStyle=this.options.heightStyle||this._mergeHeightStyle(),n.call(this)},_setOption:function(e){if(e==="autoHeight"||e==="clearStyle"||e==="fillSpace")this.options.heightStyle=this._mergeHeightStyle();r.apply(this,arguments)},_mergeHeightStyle:function(){var e=this.options;if(e.fillSpace)return"fill";if(e.clearStyle)return"content";if(e.autoHeight)return"auto"}})}(jQuery,jQuery.ui.accordion.prototype),function(e,t){e.extend(t.options.icons,{activeHeader:null,headerSelected:"ui-icon-triangle-1-s"});var n=t._createIcons;t._createIcons=function(){this.options.icons&&(this.options.icons.activeHeader=this.options.icons.activeHeader||this.options.icons.headerSelected),n.call(this)}}(jQuery,jQuery.ui.accordion.prototype),function(e,t){t.activate=t._activate;var n=t._findActive;t._findActive=function(e){return e===-1&&(e=!1),e&&typeof e!="number"&&(e=this.headers.index(this.headers.filter(e)),e===-1&&(e=!1)),n.call(this,e)}}(jQuery,jQuery.ui.accordion.prototype),jQuery.ui.accordion.prototype.resize=jQuery.ui.accordion.prototype.refresh,function(e,t){e.extend(t.options,{change:null,changestart:null});var n=t._trigger;t._trigger=function(e,t,r){var i=n.apply(this,arguments);return i?(e==="beforeActivate"?i=n.call(this,"changestart",t,{oldHeader:r.oldHeader,oldContent:r.oldPanel,newHeader:r.newHeader,newContent:r.newPanel}):e==="activate"&&(i=n.call(this,"change",t,{oldHeader:r.oldHeader,oldContent:r.oldPanel,newHeader:r.newHeader,newContent:r.newPanel})),i):!1}}(jQuery,jQuery.ui.accordion.prototype),function(e,t){e.extend(t.options,{animate:null,animated:"slide"});var n=t._create;t._create=function(){var e=this.options;e.animate===null&&(e.animated?e.animated==="slide"?e.animate=300:e.animated==="bounceslide"?e.animate={duration:200,down:{easing:"easeOutBounce",duration:1e3}}:e.animate=e.animated:e.animate=!1),n.call(this)}}(jQuery,jQuery.ui.accordion.prototype))})(jQuery);(function(e,t){var n=0;e.widget("ui.autocomplete",{version:"1.9.1",defaultElement:"<input>",options:{appendTo:"body",autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},pending:0,_create:function(){var t,n,r;this.isMultiLine=this._isMultiLine(),this.valueMethod=this.element[this.element.is("input,textarea")?"val":"text"],this.isNewMenu=!0,this.element.addClass("ui-autocomplete-input").attr("autocomplete","off"),this._on(this.element,{keydown:function(i){if(this.element.prop("readOnly")){t=!0,r=!0,n=!0;return}t=!1,r=!1,n=!1;var s=e.ui.keyCode;switch(i.keyCode){case s.PAGE_UP:t=!0,this._move("previousPage",i);break;case s.PAGE_DOWN:t=!0,this._move("nextPage",i);break;case s.UP:t=!0,this._keyEvent("previous",i);break;case s.DOWN:t=!0,this._keyEvent("next",i);break;case s.ENTER:case s.NUMPAD_ENTER:this.menu.active&&(t=!0,i.preventDefault(),this.menu.select(i));break;case s.TAB:this.menu.active&&this.menu.select(i);break;case s.ESCAPE:this.menu.element.is(":visible")&&(this._value(this.term),this.close(i),i.preventDefault());break;default:n=!0,this._searchTimeout(i)}},keypress:function(r){if(t){t=!1,r.preventDefault();return}if(n)return;var i=e.ui.keyCode;switch(r.keyCode){case i.PAGE_UP:this._move("previousPage",r);break;case i.PAGE_DOWN:this._move("nextPage",r);break;case i.UP:this._keyEvent("previous",r);break;case i.DOWN:this._keyEvent("next",r)}},input:function(e){if(r){r=!1,e.preventDefault();return}this._searchTimeout(e)},focus:function(){this.selectedItem=null,this.previous=this._value()},blur:function(e){if(this.cancelBlur){delete this.cancelBlur;return}clearTimeout(this.searching),this.close(e),this._change(e)}}),this._initSource(),this.menu=e("<ul>").addClass("ui-autocomplete").appendTo(this.document.find(this.options.appendTo||"body")[0]).menu({input:e(),role:null}).zIndex(this.element.zIndex()+1).hide().data("menu"),this._on(this.menu.element,{mousedown:function(t){t.preventDefault(),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur});var n=this.menu.element[0];e(t.target).closest(".ui-menu-item").length||this._delay(function(){var t=this;this.document.one("mousedown",function(r){r.target!==t.element[0]&&r.target!==n&&!e.contains(n,r.target)&&t.close()})})},menufocus:function(t,n){if(this.isNewMenu){this.isNewMenu=!1;if(t.originalEvent&&/^mouse/.test(t.originalEvent.type)){this.menu.blur(),this.document.one("mousemove",function(){e(t.target).trigger(t.originalEvent)});return}}var r=n.item.data("ui-autocomplete-item")||n.item.data("item.autocomplete");!1!==this._trigger("focus",t,{item:r})?t.originalEvent&&/^key/.test(t.originalEvent.type)&&this._value(r.value):this.liveRegion.text(r.value)},menuselect:function(e,t){var n=t.item.data("ui-autocomplete-item")||t.item.data("item.autocomplete"),r=this.previous;this.element[0]!==this.document[0].activeElement&&(this.element.focus(),this.previous=r,this._delay(function(){this.previous=r,this.selectedItem=n})),!1!==this._trigger("select",e,{item:n})&&this._value(n.value),this.term=this._value(),this.close(e),this.selectedItem=n}}),this.liveRegion=e("<span>",{role:"status","aria-live":"polite"}).addClass("ui-helper-hidden-accessible").insertAfter(this.element),e.fn.bgiframe&&this.menu.element.bgiframe(),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching),this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"),this.menu.element.remove(),this.liveRegion.remove()},_setOption:function(e,t){this._super(e,t),e==="source"&&this._initSource(),e==="appendTo"&&this.menu.element.appendTo(this.document.find(t||"body")[0]),e==="disabled"&&t&&this.xhr&&this.xhr.abort()},_isMultiLine:function(){return this.element.is("textarea")?!0:this.element.is("input")?!1:this.element.prop("isContentEditable")},_initSource:function(){var t,n,r=this;e.isArray(this.options.source)?(t=this.options.source,this.source=function(n,r){r(e.ui.autocomplete.filter(t,n.term))}):typeof this.options.source=="string"?(n=this.options.source,this.source=function(t,i){r.xhr&&r.xhr.abort(),r.xhr=e.ajax({url:n,data:t,dataType:"json",success:function(e){i(e)},error:function(){i([])}})}):this.source=this.options.source},_searchTimeout:function(e){clearTimeout(this.searching),this.searching=this._delay(function(){this.term!==this._value()&&(this.selectedItem=null,this.search(null,e))},this.options.delay)},search:function(e,t){e=e!=null?e:this._value(),this.term=this._value();if(e.length<this.options.minLength)return this.close(t);if(this._trigger("search",t)===!1)return;return this._search(e)},_search:function(e){this.pending++,this.element.addClass("ui-autocomplete-loading"),this.cancelSearch=!1,this.source({term:e},this._response())},_response:function(){var e=this,t=++n;return function(r){t===n&&e.__response(r),e.pending--,e.pending||e.element.removeClass("ui-autocomplete-loading")}},__response:function(e){e&&(e=this._normalize(e)),this._trigger("response",null,{content:e}),!this.options.disabled&&e&&e.length&&!this.cancelSearch?(this._suggest(e),this._trigger("open")):this._close()},close:function(e){this.cancelSearch=!0,this._close(e)},_close:function(e){this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.blur(),this.isNewMenu=!0,this._trigger("close",e))},_change:function(e){this.previous!==this._value()&&this._trigger("change",e,{item:this.selectedItem})},_normalize:function(t){return t.length&&t[0].label&&t[0].value?t:e.map(t,function(t){return typeof t=="string"?{label:t,value:t}:e.extend({label:t.label||t.value,value:t.value||t.label},t)})},_suggest:function(t){var n=this.menu.element.empty().zIndex(this.element.zIndex()+1);this._renderMenu(n,t),this.menu.refresh(),n.show(),this._resizeMenu(),n.position(e.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next()},_resizeMenu:function(){var e=this.menu.element;e.outerWidth(Math.max(e.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(t,n){var r=this;e.each(n,function(e,n){r._renderItemData(t,n)})},_renderItemData:function(e,t){return this._renderItem(e,t).data("ui-autocomplete-item",t)},_renderItem:function(t,n){return e("<li>").append(e("<a>").text(n.label)).appendTo(t)},_move:function(e,t){if(!this.menu.element.is(":visible")){this.search(null,t);return}if(this.menu.isFirstItem()&&/^previous/.test(e)||this.menu.isLastItem()&&/^next/.test(e)){this._value(this.term),this.menu.blur();return}this.menu[e](t)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(e,t){if(!this.isMultiLine||this.menu.element.is(":visible"))this._move(e,t),t.preventDefault()}}),e.extend(e.ui.autocomplete,{escapeRegex:function(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(t,n){var r=new RegExp(e.ui.autocomplete.escapeRegex(n),"i");return e.grep(t,function(e){return r.test(e.label||e.value||e)})}}),e.widget("ui.autocomplete",e.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(e){return e+(e>1?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(e){var t;this._superApply(arguments);if(this.options.disabled||this.cancelSearch)return;e&&e.length?t=this.options.messages.results(e.length):t=this.options.messages.noResults,this.liveRegion.text(t)}})})(jQuery);(function(e,t){var n,r,i,s,o="ui-button ui-widget ui-state-default ui-corner-all",u="ui-state-hover ui-state-active ",a="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",f=function(){var t=e(this).find(":ui-button");setTimeout(function(){t.button("refresh")},1)},l=function(t){var n=t.name,r=t.form,i=e([]);return n&&(r?i=e(r).find("[name='"+n+"']"):i=e("[name='"+n+"']",t.ownerDocument).filter(function(){return!this.form})),i};e.widget("ui.button",{version:"1.9.1",defaultElement:"<button>",options:{disabled:null,text:!0,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset"+this.eventNamespace).bind("reset"+this.eventNamespace,f),typeof this.options.disabled!="boolean"?this.options.disabled=!!this.element.prop("disabled"):this.element.prop("disabled",this.options.disabled),this._determineButtonType(),this.hasTitle=!!this.buttonElement.attr("title");var t=this,u=this.options,a=this.type==="checkbox"||this.type==="radio",c="ui-state-hover"+(a?"":" ui-state-active"),h="ui-state-focus";u.label===null&&(u.label=this.type==="input"?this.buttonElement.val():this.buttonElement.html()),this.buttonElement.addClass(o).attr("role","button").bind("mouseenter"+this.eventNamespace,function(){if(u.disabled)return;e(this).addClass("ui-state-hover"),this===n&&e(this).addClass("ui-state-active")}).bind("mouseleave"+this.eventNamespace,function(){if(u.disabled)return;e(this).removeClass(c)}).bind("click"+this.eventNamespace,function(e){u.disabled&&(e.preventDefault(),e.stopImmediatePropagation())}),this.element.bind("focus"+this.eventNamespace,function(){t.buttonElement.addClass(h)}).bind("blur"+this.eventNamespace,function(){t.buttonElement.removeClass(h)}),a&&(this.element.bind("change"+this.eventNamespace,function(){if(s)return;t.refresh()}),this.buttonElement.bind("mousedown"+this.eventNamespace,function(e){if(u.disabled)return;s=!1,r=e.pageX,i=e.pageY}).bind("mouseup"+this.eventNamespace,function(e){if(u.disabled)return;if(r!==e.pageX||i!==e.pageY)s=!0})),this.type==="checkbox"?this.buttonElement.bind("click"+this.eventNamespace,function(){if(u.disabled||s)return!1;e(this).toggleClass("ui-state-active"),t.buttonElement.attr("aria-pressed",t.element[0].checked)}):this.type==="radio"?this.buttonElement.bind("click"+this.eventNamespace,function(){if(u.disabled||s)return!1;e(this).addClass("ui-state-active"),t.buttonElement.attr("aria-pressed","true");var n=t.element[0];l(n).not(n).map(function(){return e(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed","false")}):(this.buttonElement.bind("mousedown"+this.eventNamespace,function(){if(u.disabled)return!1;e(this).addClass("ui-state-active"),n=this,t.document.one("mouseup",function(){n=null})}).bind("mouseup"+this.eventNamespace,function(){if(u.disabled)return!1;e(this).removeClass("ui-state-active")}).bind("keydown"+this.eventNamespace,function(t){if(u.disabled)return!1;(t.keyCode===e.ui.keyCode.SPACE||t.keyCode===e.ui.keyCode.ENTER)&&e(this).addClass("ui-state-active")}).bind("keyup"+this.eventNamespace,function(){e(this).removeClass("ui-state-active")}),this.buttonElement.is("a")&&this.buttonElement.keyup(function(t){t.keyCode===e.ui.keyCode.SPACE&&e(this).click()})),this._setOption("disabled",u.disabled),this._resetButton()},_determineButtonType:function(){var e,t,n;this.element.is("[type=checkbox]")?this.type="checkbox":this.element.is("[type=radio]")?this.type="radio":this.element.is("input")?this.type="input":this.type="button",this.type==="checkbox"||this.type==="radio"?(e=this.element.parents().last(),t="label[for='"+this.element.attr("id")+"']",this.buttonElement=e.find(t),this.buttonElement.length||(e=e.length?e.siblings():this.element.siblings(),this.buttonElement=e.filter(t),this.buttonElement.length||(this.buttonElement=e.find(t))),this.element.addClass("ui-helper-hidden-accessible"),n=this.element.is(":checked"),n&&this.buttonElement.addClass("ui-state-active"),this.buttonElement.prop("aria-pressed",n)):this.buttonElement=this.element},widget:function(){return this.buttonElement},_destroy:function(){this.element.removeClass("ui-helper-hidden-accessible"),this.buttonElement.removeClass(o+" "+u+" "+a).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()),this.hasTitle||this.buttonElement.removeAttr("title")},_setOption:function(e,t){this._super(e,t);if(e==="disabled"){t?this.element.prop("disabled",!0):this.element.prop("disabled",!1);return}this._resetButton()},refresh:function(){var t=this.element.is(":disabled")||this.element.hasClass("ui-button-disabled");t!==this.options.disabled&&this._setOption("disabled",t),this.type==="radio"?l(this.element[0]).each(function(){e(this).is(":checked")?e(this).button("widget").addClass("ui-state-active").attr("aria-pressed","true"):e(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false")}):this.type==="checkbox"&&(this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true"):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false"))},_resetButton:function(){if(this.type==="input"){this.options.label&&this.element.val(this.options.label);return}var t=this.buttonElement.removeClass(a),n=e("<span></span>",this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(t.empty()).text(),r=this.options.icons,i=r.primary&&r.secondary,s=[];r.primary||r.secondary?(this.options.text&&s.push("ui-button-text-icon"+(i?"s":r.primary?"-primary":"-secondary")),r.primary&&t.prepend("<span class='ui-button-icon-primary ui-icon "+r.primary+"'></span>"),r.secondary&&t.append("<span class='ui-button-icon-secondary ui-icon "+r.secondary+"'></span>"),this.options.text||(s.push(i?"ui-button-icons-only":"ui-button-icon-only"),this.hasTitle||t.attr("title",e.trim(n)))):s.push("ui-button-text-only"),t.addClass(s.join(" "))}}),e.widget("ui.buttonset",{version:"1.9.1",options:{items:"button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(e,t){e==="disabled"&&this.buttons.button("option",e,t),this._super(e,t)},refresh:function(){var t=this.element.css("direction")==="rtl";this.buttons=this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return e(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(t?"ui-corner-right":"ui-corner-left").end().filter(":last").addClass(t?"ui-corner-left":"ui-corner-right").end().end()},_destroy:function(){this.element.removeClass("ui-buttonset"),this.buttons.map(function(){return e(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy")}})})(jQuery);(function($,undefined){function Datepicker(){this.debug=!1,this._curInst=null,this._keyEvent=!1,this._disabledInputs=[],this._datepickerShowing=!1,this._inDialog=!1,this._mainDivId="ui-datepicker-div",this._inlineClass="ui-datepicker-inline",this._appendClass="ui-datepicker-append",this._triggerClass="ui-datepicker-trigger",this._dialogClass="ui-datepicker-dialog",this._disableClass="ui-datepicker-disabled",this._unselectableClass="ui-datepicker-unselectable",this._currentClass="ui-datepicker-current-day",this._dayOverClass="ui-datepicker-days-cell-over",this.regional=[],this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:!1,hideIfNoPrevNext:!1,navigationAsDateFormat:!1,gotoCurrent:!1,changeMonth:!1,changeYear:!1,yearRange:"c-10:c+10",showOtherMonths:!1,selectOtherMonths:!1,showWeek:!1,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:!0,showButtonPanel:!1,autoSize:!1,disabled:!1},$.extend(this._defaults,this.regional[""]),this.dpDiv=bindHover($('<div id="'+this._mainDivId+'" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))}function bindHover(e){var t="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return e.delegate(t,"mouseout",function(){$(this).removeClass("ui-state-hover"),this.className.indexOf("ui-datepicker-prev")!=-1&&$(this).removeClass("ui-datepicker-prev-hover"),this.className.indexOf("ui-datepicker-next")!=-1&&$(this).removeClass("ui-datepicker-next-hover")}).delegate(t,"mouseover",function(){$.datepicker._isDisabledDatepicker(instActive.inline?e.parent()[0]:instActive.input[0])||($(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),$(this).addClass("ui-state-hover"),this.className.indexOf("ui-datepicker-prev")!=-1&&$(this).addClass("ui-datepicker-prev-hover"),this.className.indexOf("ui-datepicker-next")!=-1&&$(this).addClass("ui-datepicker-next-hover"))})}function extendRemove(e,t){$.extend(e,t);for(var n in t)if(t[n]==null||t[n]==undefined)e[n]=t[n];return e}$.extend($.ui,{datepicker:{version:"1.9.1"}});var PROP_NAME="datepicker",dpuuid=(new Date).getTime(),instActive;$.extend(Datepicker.prototype,{markerClassName:"hasDatepicker",maxRows:4,log:function(){this.debug&&console.log.apply("",arguments)},_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(e){return extendRemove(this._defaults,e||{}),this},_attachDatepicker:function(target,settings){var inlineSettings=null;for(var attrName in this._defaults){var attrValue=target.getAttribute("date:"+attrName);if(attrValue){inlineSettings=inlineSettings||{};try{inlineSettings[attrName]=eval(attrValue)}catch(err){inlineSettings[attrName]=attrValue}}}var nodeName=target.nodeName.toLowerCase(),inline=nodeName=="div"||nodeName=="span";target.id||(this.uuid+=1,target.id="dp"+this.uuid);var inst=this._newInst($(target),inline);inst.settings=$.extend({},settings||{},inlineSettings||{}),nodeName=="input"?this._connectDatepicker(target,inst):inline&&this._inlineDatepicker(target,inst)},_newInst:function(e,t){var n=e[0].id.replace(/([^A-Za-z0-9_-])/g,"\\\\$1");return{id:n,input:e,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:t,dpDiv:t?bindHover($('<div class="'+this._inlineClass+' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')):this.dpDiv}},_connectDatepicker:function(e,t){var n=$(e);t.append=$([]),t.trigger=$([]);if(n.hasClass(this.markerClassName))return;this._attachments(n,t),n.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker",function(e,n,r){t.settings[n]=r}).bind("getData.datepicker",function(e,n){return this._get(t,n)}),this._autoSize(t),$.data(e,PROP_NAME,t),t.settings.disabled&&this._disableDatepicker(e)},_attachments:function(e,t){var n=this._get(t,"appendText"),r=this._get(t,"isRTL");t.append&&t.append.remove(),n&&(t.append=$('<span class="'+this._appendClass+'">'+n+"</span>"),e[r?"before":"after"](t.append)),e.unbind("focus",this._showDatepicker),t.trigger&&t.trigger.remove();var i=this._get(t,"showOn");(i=="focus"||i=="both")&&e.focus(this._showDatepicker);if(i=="button"||i=="both"){var s=this._get(t,"buttonText"),o=this._get(t,"buttonImage");t.trigger=$(this._get(t,"buttonImageOnly")?$("<img/>").addClass(this._triggerClass).attr({src:o,alt:s,title:s}):$('<button type="button"></button>').addClass(this._triggerClass).html(o==""?s:$("<img/>").attr({src:o,alt:s,title:s}))),e[r?"before":"after"](t.trigger),t.trigger.click(function(){return $.datepicker._datepickerShowing&&$.datepicker._lastInput==e[0]?$.datepicker._hideDatepicker():$.datepicker._datepickerShowing&&$.datepicker._lastInput!=e[0]?($.datepicker._hideDatepicker(),$.datepicker._showDatepicker(e[0])):$.datepicker._showDatepicker(e[0]),!1})}},_autoSize:function(e){if(this._get(e,"autoSize")&&!e.inline){var t=new Date(2009,11,20),n=this._get(e,"dateFormat");if(n.match(/[DM]/)){var r=function(e){var t=0,n=0;for(var r=0;r<e.length;r++)e[r].length>t&&(t=e[r].length,n=r);return n};t.setMonth(r(this._get(e,n.match(/MM/)?"monthNames":"monthNamesShort"))),t.setDate(r(this._get(e,n.match(/DD/)?"dayNames":"dayNamesShort"))+20-t.getDay())}e.input.attr("size",this._formatDate(e,t).length)}},_inlineDatepicker:function(e,t){var n=$(e);if(n.hasClass(this.markerClassName))return;n.addClass(this.markerClassName).append(t.dpDiv).bind("setData.datepicker",function(e,n,r){t.settings[n]=r}).bind("getData.datepicker",function(e,n){return this._get(t,n)}),$.data(e,PROP_NAME,t),this._setDate(t,this._getDefaultDate(t),!0),this._updateDatepicker(t),this._updateAlternate(t),t.settings.disabled&&this._disableDatepicker(e),t.dpDiv.css("display","block")},_dialogDatepicker:function(e,t,n,r,i){var s=this._dialogInst;if(!s){this.uuid+=1;var o="dp"+this.uuid;this._dialogInput=$('<input type="text" id="'+o+'" style="position: absolute; top: -100px; width: 0px;"/>'),this._dialogInput.keydown(this._doKeyDown),$("body").append(this._dialogInput),s=this._dialogInst=this._newInst(this._dialogInput,!1),s.settings={},$.data(this._dialogInput[0],PROP_NAME,s)}extendRemove(s.settings,r||{}),t=t&&t.constructor==Date?this._formatDate(s,t):t,this._dialogInput.val(t),this._pos=i?i.length?i:[i.pageX,i.pageY]:null;if(!this._pos){var u=document.documentElement.clientWidth,a=document.documentElement.clientHeight,f=document.documentElement.scrollLeft||document.body.scrollLeft,l=document.documentElement.scrollTop||document.body.scrollTop;this._pos=[u/2-100+f,a/2-150+l]}return this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px"),s.settings.onSelect=n,this._inDialog=!0,this.dpDiv.addClass(this._dialogClass),this._showDatepicker(this._dialogInput[0]),$.blockUI&&$.blockUI(this.dpDiv),$.data(this._dialogInput[0],PROP_NAME,s),this},_destroyDatepicker:function(e){var t=$(e),n=$.data(e,PROP_NAME);if(!t.hasClass(this.markerClassName))return;var r=e.nodeName.toLowerCase();$.removeData(e,PROP_NAME),r=="input"?(n.append.remove(),n.trigger.remove(),t.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)):(r=="div"||r=="span")&&t.removeClass(this.markerClassName).empty()},_enableDatepicker:function(e){var t=$(e),n=$.data(e,PROP_NAME);if(!t.hasClass(this.markerClassName))return;var r=e.nodeName.toLowerCase();if(r=="input")e.disabled=!1,n.trigger.filter("button").each(function(){this.disabled=!1}).end().filter("img").css({opacity:"1.0",cursor:""});else if(r=="div"||r=="span"){var i=t.children("."+this._inlineClass);i.children().removeClass("ui-state-disabled"),i.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!1)}this._disabledInputs=$.map(this._disabledInputs,function(t){return t==e?null:t})},_disableDatepicker:function(e){var t=$(e),n=$.data(e,PROP_NAME);if(!t.hasClass(this.markerClassName))return;var r=e.nodeName.toLowerCase();if(r=="input")e.disabled=!0,n.trigger.filter("button").each(function(){this.disabled=!0}).end().filter("img").css({opacity:"0.5",cursor:"default"});else if(r=="div"||r=="span"){var i=t.children("."+this._inlineClass);i.children().addClass("ui-state-disabled"),i.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!0)}this._disabledInputs=$.map(this._disabledInputs,function(t){return t==e?null:t}),this._disabledInputs[this._disabledInputs.length]=e},_isDisabledDatepicker:function(e){if(!e)return!1;for(var t=0;t<this._disabledInputs.length;t++)if(this._disabledInputs[t]==e)return!0;return!1},_getInst:function(e){try{return $.data(e,PROP_NAME)}catch(t){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(e,t,n){var r=this._getInst(e);if(arguments.length==2&&typeof t=="string")return t=="defaults"?$.extend({},$.datepicker._defaults):r?t=="all"?$.extend({},r.settings):this._get(r,t):null;var i=t||{};typeof t=="string"&&(i={},i[t]=n);if(r){this._curInst==r&&this._hideDatepicker();var s=this._getDateDatepicker(e,!0),o=this._getMinMaxDate(r,"min"),u=this._getMinMaxDate(r,"max");extendRemove(r.settings,i),o!==null&&i.dateFormat!==undefined&&i.minDate===undefined&&(r.settings.minDate=this._formatDate(r,o)),u!==null&&i.dateFormat!==undefined&&i.maxDate===undefined&&(r.settings.maxDate=this._formatDate(r,u)),this._attachments($(e),r),this._autoSize(r),this._setDate(r,s),this._updateAlternate(r),this._updateDatepicker(r)}},_changeDatepicker:function(e,t,n){this._optionDatepicker(e,t,n)},_refreshDatepicker:function(e){var t=this._getInst(e);t&&this._updateDatepicker(t)},_setDateDatepicker:function(e,t){var n=this._getInst(e);n&&(this._setDate(n,t),this._updateDatepicker(n),this._updateAlternate(n))},_getDateDatepicker:function(e,t){var n=this._getInst(e);return n&&!n.inline&&this._setDateFromField(n,t),n?this._getDate(n):null},_doKeyDown:function(e){var t=$.datepicker._getInst(e.target),n=!0,r=t.dpDiv.is(".ui-datepicker-rtl");t._keyEvent=!0;if($.datepicker._datepickerShowing)switch(e.keyCode){case 9:$.datepicker._hideDatepicker(),n=!1;break;case 13:var i=$("td."+$.datepicker._dayOverClass+":not(."+$.datepicker._currentClass+")",t.dpDiv);i[0]&&$.datepicker._selectDay(e.target,t.selectedMonth,t.selectedYear,i[0]);var s=$.datepicker._get(t,"onSelect");if(s){var o=$.datepicker._formatDate(t);s.apply(t.input?t.input[0]:null,[o,t])}else $.datepicker._hideDatepicker();return!1;case 27:$.datepicker._hideDatepicker();break;case 33:$.datepicker._adjustDate(e.target,e.ctrlKey?-$.datepicker._get(t,"stepBigMonths"):-$.datepicker._get(t,"stepMonths"),"M");break;case 34:$.datepicker._adjustDate(e.target,e.ctrlKey?+$.datepicker._get(t,"stepBigMonths"):+$.datepicker._get(t,"stepMonths"),"M");break;case 35:(e.ctrlKey||e.metaKey)&&$.datepicker._clearDate(e.target),n=e.ctrlKey||e.metaKey;break;case 36:(e.ctrlKey||e.metaKey)&&$.datepicker._gotoToday(e.target),n=e.ctrlKey||e.metaKey;break;case 37:(e.ctrlKey||e.metaKey)&&$.datepicker._adjustDate(e.target,r?1:-1,"D"),n=e.ctrlKey||e.metaKey,e.originalEvent.altKey&&$.datepicker._adjustDate(e.target,e.ctrlKey?-$.datepicker._get(t,"stepBigMonths"):-$.datepicker._get(t,"stepMonths"),"M");break;case 38:(e.ctrlKey||e.metaKey)&&$.datepicker._adjustDate(e.target,-7,"D"),n=e.ctrlKey||e.metaKey;break;case 39:(e.ctrlKey||e.metaKey)&&$.datepicker._adjustDate(e.target,r?-1:1,"D"),n=e.ctrlKey||e.metaKey,e.originalEvent.altKey&&$.datepicker._adjustDate(e.target,e.ctrlKey?+$.datepicker._get(t,"stepBigMonths"):+$.datepicker._get(t,"stepMonths"),"M");break;case 40:(e.ctrlKey||e.metaKey)&&$.datepicker._adjustDate(e.target,7,"D"),n=e.ctrlKey||e.metaKey;break;default:n=!1}else e.keyCode==36&&e.ctrlKey?$.datepicker._showDatepicker(this):n=!1;n&&(e.preventDefault(),e.stopPropagation())},_doKeyPress:function(e){var t=$.datepicker._getInst(e.target);if($.datepicker._get(t,"constrainInput")){var n=$.datepicker._possibleChars($.datepicker._get(t,"dateFormat")),r=String.fromCharCode(e.charCode==undefined?e.keyCode:e.charCode);return e.ctrlKey||e.metaKey||r<" "||!n||n.indexOf(r)>-1}},_doKeyUp:function(e){var t=$.datepicker._getInst(e.target);if(t.input.val()!=t.lastVal)try{var n=$.datepicker.parseDate($.datepicker._get(t,"dateFormat"),t.input?t.input.val():null,$.datepicker._getFormatConfig(t));n&&($.datepicker._setDateFromField(t),$.datepicker._updateAlternate(t),$.datepicker._updateDatepicker(t))}catch(r){$.datepicker.log(r)}return!0},_showDatepicker:function(e){e=e.target||e,e.nodeName.toLowerCase()!="input"&&(e=$("input",e.parentNode)[0]);if($.datepicker._isDisabledDatepicker(e)||$.datepicker._lastInput==e)return;var t=$.datepicker._getInst(e);$.datepicker._curInst&&$.datepicker._curInst!=t&&($.datepicker._curInst.dpDiv.stop(!0,!0),t&&$.datepicker._datepickerShowing&&$.datepicker._hideDatepicker($.datepicker._curInst.input[0]));var n=$.datepicker._get(t,"beforeShow"),r=n?n.apply(e,[e,t]):{};if(r===!1)return;extendRemove(t.settings,r),t.lastVal=null,$.datepicker._lastInput=e,$.datepicker._setDateFromField(t),$.datepicker._inDialog&&(e.value=""),$.datepicker._pos||($.datepicker._pos=$.datepicker._findPos(e),$.datepicker._pos[1]+=e.offsetHeight);var i=!1;$(e).parents().each(function(){return i|=$(this).css("position")=="fixed",!i});var s={left:$.datepicker._pos[0],top:$.datepicker._pos[1]};$.datepicker._pos=null,t.dpDiv.empty(),t.dpDiv.css({position:"absolute",display:"block",top:"-1000px"}),$.datepicker._updateDatepicker(t),s=$.datepicker._checkOffset(t,s,i),t.dpDiv.css({position:$.datepicker._inDialog&&$.blockUI?"static":i?"fixed":"absolute",display:"none",left:s.left+"px",top:s.top+"px"});if(!t.inline){var o=$.datepicker._get(t,"showAnim"),u=$.datepicker._get(t,"duration"),a=function(){var e=t.dpDiv.find("iframe.ui-datepicker-cover");if(!!e.length){var n=$.datepicker._getBorders(t.dpDiv);e.css({left:-n[0],top:-n[1],width:t.dpDiv.outerWidth(),height:t.dpDiv.outerHeight()})}};t.dpDiv.zIndex($(e).zIndex()+1),$.datepicker._datepickerShowing=!0,$.effects&&($.effects.effect[o]||$.effects[o])?t.dpDiv.show(o,$.datepicker._get(t,"showOptions"),u,a):t.dpDiv[o||"show"](o?u:null,a),(!o||!u)&&a(),t.input.is(":visible")&&!t.input.is(":disabled")&&t.input.focus(),$.datepicker._curInst=t}},_updateDatepicker:function(e){this.maxRows=4;var t=$.datepicker._getBorders(e.dpDiv);instActive=e,e.dpDiv.empty().append(this._generateHTML(e)),this._attachHandlers(e);var n=e.dpDiv.find("iframe.ui-datepicker-cover");!n.length||n.css({left:-t[0],top:-t[1],width:e.dpDiv.outerWidth(),height:e.dpDiv.outerHeight()}),e.dpDiv.find("."+this._dayOverClass+" a").mouseover();var r=this._getNumberOfMonths(e),i=r[1],s=17;e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),i>1&&e.dpDiv.addClass("ui-datepicker-multi-"+i).css("width",s*i+"em"),e.dpDiv[(r[0]!=1||r[1]!=1?"add":"remove")+"Class"]("ui-datepicker-multi"),e.dpDiv[(this._get(e,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl"),e==$.datepicker._curInst&&$.datepicker._datepickerShowing&&e.input&&e.input.is(":visible")&&!e.input.is(":disabled")&&e.input[0]!=document.activeElement&&e.input.focus();if(e.yearshtml){var o=e.yearshtml;setTimeout(function(){o===e.yearshtml&&e.yearshtml&&e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml),o=e.yearshtml=null},0)}},_getBorders:function(e){var t=function(e){return{thin:1,medium:2,thick:3}[e]||e};return[parseFloat(t(e.css("border-left-width"))),parseFloat(t(e.css("border-top-width")))]},_checkOffset:function(e,t,n){var r=e.dpDiv.outerWidth(),i=e.dpDiv.outerHeight(),s=e.input?e.input.outerWidth():0,o=e.input?e.input.outerHeight():0,u=document.documentElement.clientWidth+(n?0:$(document).scrollLeft()),a=document.documentElement.clientHeight+(n?0:$(document).scrollTop());return t.left-=this._get(e,"isRTL")?r-s:0,t.left-=n&&t.left==e.input.offset().left?$(document).scrollLeft():0,t.top-=n&&t.top==e.input.offset().top+o?$(document).scrollTop():0,t.left-=Math.min(t.left,t.left+r>u&&u>r?Math.abs(t.left+r-u):0),t.top-=Math.min(t.top,t.top+i>a&&a>i?Math.abs(i+o):0),t},_findPos:function(e){var t=this._getInst(e),n=this._get(t,"isRTL");while(e&&(e.type=="hidden"||e.nodeType!=1||$.expr.filters.hidden(e)))e=e[n?"previousSibling":"nextSibling"];var r=$(e).offset();return[r.left,r.top]},_hideDatepicker:function(e){var t=this._curInst;if(!t||e&&t!=$.data(e,PROP_NAME))return;if(this._datepickerShowing){var n=this._get(t,"showAnim"),r=this._get(t,"duration"),i=function(){$.datepicker._tidyDialog(t)};$.effects&&($.effects.effect[n]||$.effects[n])?t.dpDiv.hide(n,$.datepicker._get(t,"showOptions"),r,i):t.dpDiv[n=="slideDown"?"slideUp":n=="fadeIn"?"fadeOut":"hide"](n?r:null,i),n||i(),this._datepickerShowing=!1;var s=this._get(t,"onClose");s&&s.apply(t.input?t.input[0]:null,[t.input?t.input.val():"",t]),this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),$.blockUI&&($.unblockUI(),$("body").append(this.dpDiv))),this._inDialog=!1}},_tidyDialog:function(e){e.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},_checkExternalClick:function(e){if(!$.datepicker._curInst)return;var t=$(e.target),n=$.datepicker._getInst(t[0]);(t[0].id!=$.datepicker._mainDivId&&t.parents("#"+$.datepicker._mainDivId).length==0&&!t.hasClass($.datepicker.markerClassName)&&!t.closest("."+$.datepicker._triggerClass).length&&$.datepicker._datepickerShowing&&(!$.datepicker._inDialog||!$.blockUI)||t.hasClass($.datepicker.markerClassName)&&$.datepicker._curInst!=n)&&$.datepicker._hideDatepicker()},_adjustDate:function(e,t,n){var r=$(e),i=this._getInst(r[0]);if(this._isDisabledDatepicker(r[0]))return;this._adjustInstDate(i,t+(n=="M"?this._get(i,"showCurrentAtPos"):0),n),this._updateDatepicker(i)},_gotoToday:function(e){var t=$(e),n=this._getInst(t[0]);if(this._get(n,"gotoCurrent")&&n.currentDay)n.selectedDay=n.currentDay,n.drawMonth=n.selectedMonth=n.currentMonth,n.drawYear=n.selectedYear=n.currentYear;else{var r=new Date;n.selectedDay=r.getDate(),n.drawMonth=n.selectedMonth=r.getMonth(),n.drawYear=n.selectedYear=r.getFullYear()}this._notifyChange(n),this._adjustDate(t)},_selectMonthYear:function(e,t,n){var r=$(e),i=this._getInst(r[0]);i["selected"+(n=="M"?"Month":"Year")]=i["draw"+(n=="M"?"Month":"Year")]=parseInt(t.options[t.selectedIndex].value,10),this._notifyChange(i),this._adjustDate(r)},_selectDay:function(e,t,n,r){var i=$(e);if($(r).hasClass(this._unselectableClass)||this._isDisabledDatepicker(i[0]))return;var s=this._getInst(i[0]);s.selectedDay=s.currentDay=$("a",r).html(),s.selectedMonth=s.currentMonth=t,s.selectedYear=s.currentYear=n,this._selectDate(e,this._formatDate(s,s.currentDay,s.currentMonth,s.currentYear))},_clearDate:function(e){var t=$(e),n=this._getInst(t[0]);this._selectDate(t,"")},_selectDate:function(e,t){var n=$(e),r=this._getInst(n[0]);t=t!=null?t:this._formatDate(r),r.input&&r.input.val(t),this._updateAlternate(r);var i=this._get(r,"onSelect");i?i.apply(r.input?r.input[0]:null,[t,r]):r.input&&r.input.trigger("change"),r.inline?this._updateDatepicker(r):(this._hideDatepicker(),this._lastInput=r.input[0],typeof r.input[0]!="object"&&r.input.focus(),this._lastInput=null)},_updateAlternate:function(e){var t=this._get(e,"altField");if(t){var n=this._get(e,"altFormat")||this._get(e,"dateFormat"),r=this._getDate(e),i=this.formatDate(n,r,this._getFormatConfig(e));$(t).each(function(){$(this).val(i)})}},noWeekends:function(e){var t=e.getDay();return[t>0&&t<6,""]},iso8601Week:function(e){var t=new Date(e.getTime());t.setDate(t.getDate()+4-(t.getDay()||7));var n=t.getTime();return t.setMonth(0),t.setDate(1),Math.floor(Math.round((n-t)/864e5)/7)+1},parseDate:function(e,t,n){if(e==null||t==null)throw"Invalid arguments";t=typeof t=="object"?t.toString():t+"";if(t=="")return null;var r=(n?n.shortYearCutoff:null)||this._defaults.shortYearCutoff;r=typeof r!="string"?r:(new Date).getFullYear()%100+parseInt(r,10);var i=(n?n.dayNamesShort:null)||this._defaults.dayNamesShort,s=(n?n.dayNames:null)||this._defaults.dayNames,o=(n?n.monthNamesShort:null)||this._defaults.monthNamesShort,u=(n?n.monthNames:null)||this._defaults.monthNames,a=-1,f=-1,l=-1,c=-1,h=!1,p=function(t){var n=y+1<e.length&&e.charAt(y+1)==t;return n&&y++,n},d=function(e){var n=p(e),r=e=="@"?14:e=="!"?20:e=="y"&&n?4:e=="o"?3:2,i=new RegExp("^\\d{1,"+r+"}"),s=t.substring(g).match(i);if(!s)throw"Missing number at position "+g;return g+=s[0].length,parseInt(s[0],10)},v=function(e,n,r){var i=$.map(p(e)?r:n,function(e,t){return[[t,e]]}).sort(function(e,t){return-(e[1].length-t[1].length)}),s=-1;$.each(i,function(e,n){var r=n[1];if(t.substr(g,r.length).toLowerCase()==r.toLowerCase())return s=n[0],g+=r.length,!1});if(s!=-1)return s+1;throw"Unknown name at position "+g},m=function(){if(t.charAt(g)!=e.charAt(y))throw"Unexpected literal at position "+g;g++},g=0;for(var y=0;y<e.length;y++)if(h)e.charAt(y)=="'"&&!p("'")?h=!1:m();else switch(e.charAt(y)){case"d":l=d("d");break;case"D":v("D",i,s);break;case"o":c=d("o");break;case"m":f=d("m");break;case"M":f=v("M",o,u);break;case"y":a=d("y");break;case"@":var b=new Date(d("@"));a=b.getFullYear(),f=b.getMonth()+1,l=b.getDate();break;case"!":var b=new Date((d("!")-this._ticksTo1970)/1e4);a=b.getFullYear(),f=b.getMonth()+1,l=b.getDate();break;case"'":p("'")?m():h=!0;break;default:m()}if(g<t.length){var w=t.substr(g);if(!/^\s+/.test(w))throw"Extra/unparsed characters found in date: "+w}a==-1?a=(new Date).getFullYear():a<100&&(a+=(new Date).getFullYear()-(new Date).getFullYear()%100+(a<=r?0:-100));if(c>-1){f=1,l=c;do{var E=this._getDaysInMonth(a,f-1);if(l<=E)break;f++,l-=E}while(!0)}var b=this._daylightSavingAdjust(new Date(a,f-1,l));if(b.getFullYear()!=a||b.getMonth()+1!=f||b.getDate()!=l)throw"Invalid date";return b},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925))*24*60*60*1e7,formatDate:function(e,t,n){if(!t)return"";var r=(n?n.dayNamesShort:null)||this._defaults.dayNamesShort,i=(n?n.dayNames:null)||this._defaults.dayNames,s=(n?n.monthNamesShort:null)||this._defaults.monthNamesShort,o=(n?n.monthNames:null)||this._defaults.monthNames,u=function(t){var n=h+1<e.length&&e.charAt(h+1)==t;return n&&h++,n},a=function(e,t,n){var r=""+t;if(u(e))while(r.length<n)r="0"+r;return r},f=function(e,t,n,r){return u(e)?r[t]:n[t]},l="",c=!1;if(t)for(var h=0;h<e.length;h++)if(c)e.charAt(h)=="'"&&!u("'")?c=!1:l+=e.charAt(h);else switch(e.charAt(h)){case"d":l+=a("d",t.getDate(),2);break;case"D":l+=f("D",t.getDay(),r,i);break;case"o":l+=a("o",Math.round(((new Date(t.getFullYear(),t.getMonth(),t.getDate())).getTime()-(new Date(t.getFullYear(),0,0)).getTime())/864e5),3);break;case"m":l+=a("m",t.getMonth()+1,2);break;case"M":l+=f("M",t.getMonth(),s,o);break;case"y":l+=u("y")?t.getFullYear():(t.getYear()%100<10?"0":"")+t.getYear()%100;break;case"@":l+=t.getTime();break;case"!":l+=t.getTime()*1e4+this._ticksTo1970;break;case"'":u("'")?l+="'":c=!0;break;default:l+=e.charAt(h)}return l},_possibleChars:function(e){var t="",n=!1,r=function(t){var n=i+1<e.length&&e.charAt(i+1)==t;return n&&i++,n};for(var i=0;i<e.length;i++)if(n)e.charAt(i)=="'"&&!r("'")?n=!1:t+=e.charAt(i);else switch(e.charAt(i)){case"d":case"m":case"y":case"@":t+="0123456789";break;case"D":case"M":return null;case"'":r("'")?t+="'":n=!0;break;default:t+=e.charAt(i)}return t},_get:function(e,t){return e.settings[t]!==undefined?e.settings[t]:this._defaults[t]},_setDateFromField:function(e,t){if(e.input.val()==e.lastVal)return;var n=this._get(e,"dateFormat"),r=e.lastVal=e.input?e.input.val():null,i,s;i=s=this._getDefaultDate(e);var o=this._getFormatConfig(e);try{i=this.parseDate(n,r,o)||s}catch(u){this.log(u),r=t?"":r}e.selectedDay=i.getDate(),e.drawMonth=e.selectedMonth=i.getMonth(),e.drawYear=e.selectedYear=i.getFullYear(),e.currentDay=r?i.getDate():0,e.currentMonth=r?i.getMonth():0,e.currentYear=r?i.getFullYear():0,this._adjustInstDate(e)},_getDefaultDate:function(e){return this._restrictMinMax(e,this._determineDate(e,this._get(e,"defaultDate"),new Date))},_determineDate:function(e,t,n){var r=function(e){var t=new Date;return t.setDate(t.getDate()+e),t},i=function(t){try{return $.datepicker.parseDate($.datepicker._get(e,"dateFormat"),t,$.datepicker._getFormatConfig(e))}catch(n){}var r=(t.toLowerCase().match(/^c/)?$.datepicker._getDate(e):null)||new Date,i=r.getFullYear(),s=r.getMonth(),o=r.getDate(),u=/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,a=u.exec(t);while(a){switch(a[2]||"d"){case"d":case"D":o+=parseInt(a[1],10);break;case"w":case"W":o+=parseInt(a[1],10)*7;break;case"m":case"M":s+=parseInt(a[1],10),o=Math.min(o,$.datepicker._getDaysInMonth(i,s));break;case"y":case"Y":i+=parseInt(a[1],10),o=Math.min(o,$.datepicker._getDaysInMonth(i,s))}a=u.exec(t)}return new Date(i,s,o)},s=t==null||t===""?n:typeof t=="string"?i(t):typeof t=="number"?isNaN(t)?n:r(t):new Date(t.getTime());return s=s&&s.toString()=="Invalid Date"?n:s,s&&(s.setHours(0),s.setMinutes(0),s.setSeconds(0),s.setMilliseconds(0)),this._daylightSavingAdjust(s)},_daylightSavingAdjust:function(e){return e?(e.setHours(e.getHours()>12?e.getHours()+2:0),e):null},_setDate:function(e,t,n){var r=!t,i=e.selectedMonth,s=e.selectedYear,o=this._restrictMinMax(e,this._determineDate(e,t,new Date));e.selectedDay=e.currentDay=o.getDate(),e.drawMonth=e.selectedMonth=e.currentMonth=o.getMonth(),e.drawYear=e.selectedYear=e.currentYear=o.getFullYear(),(i!=e.selectedMonth||s!=e.selectedYear)&&!n&&this._notifyChange(e),this._adjustInstDate(e),e.input&&e.input.val(r?"":this._formatDate(e))},_getDate:function(e){var t=!e.currentYear||e.input&&e.input.val()==""?null:this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));return t},_attachHandlers:function(e){var t=this._get(e,"stepMonths"),n="#"+e.id.replace(/\\\\/g,"\\");e.dpDiv.find("[data-handler]").map(function(){var e={prev:function(){window["DP_jQuery_"+dpuuid].datepicker._adjustDate(n,-t,"M")},next:function(){window["DP_jQuery_"+dpuuid].datepicker._adjustDate(n,+t,"M")},hide:function(){window["DP_jQuery_"+dpuuid].datepicker._hideDatepicker()},today:function(){window["DP_jQuery_"+dpuuid].datepicker._gotoToday(n)},selectDay:function(){return window["DP_jQuery_"+dpuuid].datepicker._selectDay(n,+this.getAttribute("data-month"),+this.getAttribute("data-year"),this),!1},selectMonth:function(){return window["DP_jQuery_"+dpuuid].datepicker._selectMonthYear(n,this,"M"),!1},selectYear:function(){return window["DP_jQuery_"+dpuuid].datepicker._selectMonthYear(n,this,"Y"),!1}};$(this).bind(this.getAttribute("data-event"),e[this.getAttribute("data-handler")])})},_generateHTML:function(e){var t=new Date;t=this._daylightSavingAdjust(new Date(t.getFullYear(),t.getMonth(),t.getDate()));var n=this._get(e,"isRTL"),r=this._get(e,"showButtonPanel"),i=this._get(e,"hideIfNoPrevNext"),s=this._get(e,"navigationAsDateFormat"),o=this._getNumberOfMonths(e),u=this._get(e,"showCurrentAtPos"),a=this._get(e,"stepMonths"),f=o[0]!=1||o[1]!=1,l=this._daylightSavingAdjust(e.currentDay?new Date(e.currentYear,e.currentMonth,e.currentDay):new Date(9999,9,9)),c=this._getMinMaxDate(e,"min"),h=this._getMinMaxDate(e,"max"),p=e.drawMonth-u,d=e.drawYear;p<0&&(p+=12,d--);if(h){var v=this._daylightSavingAdjust(new Date(h.getFullYear(),h.getMonth()-o[0]*o[1]+1,h.getDate()));v=c&&v<c?c:v;while(this._daylightSavingAdjust(new Date(d,p,1))>v)p--,p<0&&(p=11,d--)}e.drawMonth=p,e.drawYear=d;var m=this._get(e,"prevText");m=s?this.formatDate(m,this._daylightSavingAdjust(new Date(d,p-a,1)),this._getFormatConfig(e)):m;var g=this._canAdjustMonth(e,-1,d,p)?'<a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click" title="'+m+'"><span class="ui-icon ui-icon-circle-triangle-'+(n?"e":"w")+'">'+m+"</span></a>":i?"":'<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+m+'"><span class="ui-icon ui-icon-circle-triangle-'+(n?"e":"w")+'">'+m+"</span></a>",y=this._get(e,"nextText");y=s?this.formatDate(y,this._daylightSavingAdjust(new Date(d,p+a,1)),this._getFormatConfig(e)):y;var b=this._canAdjustMonth(e,1,d,p)?'<a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click" title="'+y+'"><span class="ui-icon ui-icon-circle-triangle-'+(n?"w":"e")+'">'+y+"</span></a>":i?"":'<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+y+'"><span class="ui-icon ui-icon-circle-triangle-'+(n?"w":"e")+'">'+y+"</span></a>",w=this._get(e,"currentText"),E=this._get(e,"gotoCurrent")&&e.currentDay?l:t;w=s?this.formatDate(w,E,this._getFormatConfig(e)):w;var S=e.inline?"":'<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">'+this._get(e,"closeText")+"</button>",x=r?'<div class="ui-datepicker-buttonpane ui-widget-content">'+(n?S:"")+(this._isInRange(e,E)?'<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-handler="today" data-event="click">'+w+"</button>":"")+(n?"":S)+"</div>":"",T=parseInt(this._get(e,"firstDay"),10);T=isNaN(T)?0:T;var N=this._get(e,"showWeek"),C=this._get(e,"dayNames"),k=this._get(e,"dayNamesShort"),L=this._get(e,"dayNamesMin"),A=this._get(e,"monthNames"),O=this._get(e,"monthNamesShort"),M=this._get(e,"beforeShowDay"),_=this._get(e,"showOtherMonths"),D=this._get(e,"selectOtherMonths"),P=this._get(e,"calculateWeek")||this.iso8601Week,H=this._getDefaultDate(e),B="";for(var j=0;j<o[0];j++){var F="";this.maxRows=4;for(var I=0;I<o[1];I++){var q=this._daylightSavingAdjust(new Date(d,p,e.selectedDay)),R=" ui-corner-all",U="";if(f){U+='<div class="ui-datepicker-group';if(o[1]>1)switch(I){case 0:U+=" ui-datepicker-group-first",R=" ui-corner-"+(n?"right":"left");break;case o[1]-1:U+=" ui-datepicker-group-last",R=" ui-corner-"+(n?"left":"right");break;default:U+=" ui-datepicker-group-middle",R=""}U+='">'}U+='<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix'+R+'">'+(/all|left/.test(R)&&j==0?n?b:g:"")+(/all|right/.test(R)&&j==0?n?g:b:"")+this._generateMonthYearHeader(e,p,d,c,h,j>0||I>0,A,O)+'</div><table class="ui-datepicker-calendar"><thead>'+"<tr>";var z=N?'<th class="ui-datepicker-week-col">'+this._get(e,"weekHeader")+"</th>":"";for(var W=0;W<7;W++){var X=(W+T)%7;z+="<th"+((W+T+6)%7>=5?' class="ui-datepicker-week-end"':"")+">"+'<span title="'+C[X]+'">'+L[X]+"</span></th>"}U+=z+"</tr></thead><tbody>";var V=this._getDaysInMonth(d,p);d==e.selectedYear&&p==e.selectedMonth&&(e.selectedDay=Math.min(e.selectedDay,V));var J=(this._getFirstDayOfMonth(d,p)-T+7)%7,K=Math.ceil((J+V)/7),Q=f?this.maxRows>K?this.maxRows:K:K;this.maxRows=Q;var G=this._daylightSavingAdjust(new Date(d,p,1-J));for(var Y=0;Y<Q;Y++){U+="<tr>";var Z=N?'<td class="ui-datepicker-week-col">'+this._get(e,"calculateWeek")(G)+"</td>":"";for(var W=0;W<7;W++){var et=M?M.apply(e.input?e.input[0]:null,[G]):[!0,""],tt=G.getMonth()!=p,nt=tt&&!D||!et[0]||c&&G<c||h&&G>h;Z+='<td class="'+((W+T+6)%7>=5?" ui-datepicker-week-end":"")+(tt?" ui-datepicker-other-month":"")+(G.getTime()==q.getTime()&&p==e.selectedMonth&&e._keyEvent||H.getTime()==G.getTime()&&H.getTime()==q.getTime()?" "+this._dayOverClass:"")+(nt?" "+this._unselectableClass+" ui-state-disabled":"")+(tt&&!_?"":" "+et[1]+(G.getTime()==l.getTime()?" "+this._currentClass:"")+(G.getTime()==t.getTime()?" ui-datepicker-today":""))+'"'+((!tt||_)&&et[2]?' title="'+et[2]+'"':"")+(nt?"":' data-handler="selectDay" data-event="click" data-month="'+G.getMonth()+'" data-year="'+G.getFullYear()+'"')+">"+(tt&&!_?"&#xa0;":nt?'<span class="ui-state-default">'+G.getDate()+"</span>":'<a class="ui-state-default'+(G.getTime()==t.getTime()?" ui-state-highlight":"")+(G.getTime()==l.getTime()?" ui-state-active":"")+(tt?" ui-priority-secondary":"")+'" href="#">'+G.getDate()+"</a>")+"</td>",G.setDate(G.getDate()+1),G=this._daylightSavingAdjust(G)}U+=Z+"</tr>"}p++,p>11&&(p=0,d++),U+="</tbody></table>"+(f?"</div>"+(o[0]>0&&I==o[1]-1?'<div class="ui-datepicker-row-break"></div>':""):""),F+=U}B+=F}return B+=x+($.ui.ie6&&!e.inline?'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>':""),e._keyEvent=!1,B},_generateMonthYearHeader:function(e,t,n,r,i,s,o,u){var a=this._get(e,"changeMonth"),f=this._get(e,"changeYear"),l=this._get(e,"showMonthAfterYear"),c='<div class="ui-datepicker-title">',h="";if(s||!a)h+='<span class="ui-datepicker-month">'+o[t]+"</span>";else{var p=r&&r.getFullYear()==n,d=i&&i.getFullYear()==n;h+='<select class="ui-datepicker-month" data-handler="selectMonth" data-event="change">';for(var v=0;v<12;v++)(!p||v>=r.getMonth())&&(!d||v<=i.getMonth())&&(h+='<option value="'+v+'"'+(v==t?' selected="selected"':"")+">"+u[v]+"</option>");h+="</select>"}l||(c+=h+(s||!a||!f?"&#xa0;":""));if(!e.yearshtml){e.yearshtml="";if(s||!f)c+='<span class="ui-datepicker-year">'+n+"</span>";else{var m=this._get(e,"yearRange").split(":"),g=(new Date).getFullYear(),y=function(e){var t=e.match(/c[+-].*/)?n+parseInt(e.substring(1),10):e.match(/[+-].*/)?g+parseInt(e,10):parseInt(e,10);return isNaN(t)?g:t},b=y(m[0]),w=Math.max(b,y(m[1]||""));b=r?Math.max(b,r.getFullYear()):b,w=i?Math.min(w,i.getFullYear()):w,e.yearshtml+='<select class="ui-datepicker-year" data-handler="selectYear" data-event="change">';for(;b<=w;b++)e.yearshtml+='<option value="'+b+'"'+(b==n?' selected="selected"':"")+">"+b+"</option>";e.yearshtml+="</select>",c+=e.yearshtml,e.yearshtml=null}}return c+=this._get(e,"yearSuffix"),l&&(c+=(s||!a||!f?"&#xa0;":"")+h),c+="</div>",c},_adjustInstDate:function(e,t,n){var r=e.drawYear+(n=="Y"?t:0),i=e.drawMonth+(n=="M"?t:0),s=Math.min(e.selectedDay,this._getDaysInMonth(r,i))+(n=="D"?t:0),o=this._restrictMinMax(e,this._daylightSavingAdjust(new Date(r,i,s)));e.selectedDay=o.getDate(),e.drawMonth=e.selectedMonth=o.getMonth(),e.drawYear=e.selectedYear=o.getFullYear(),(n=="M"||n=="Y")&&this._notifyChange(e)},_restrictMinMax:function(e,t){var n=this._getMinMaxDate(e,"min"),r=this._getMinMaxDate(e,"max"),i=n&&t<n?n:t;return i=r&&i>r?r:i,i},_notifyChange:function(e){var t=this._get(e,"onChangeMonthYear");t&&t.apply(e.input?e.input[0]:null,[e.selectedYear,e.selectedMonth+1,e])},_getNumberOfMonths:function(e){var t=this._get(e,"numberOfMonths");return t==null?[1,1]:typeof t=="number"?[1,t]:t},_getMinMaxDate:function(e,t){return this._determineDate(e,this._get(e,t+"Date"),null)},_getDaysInMonth:function(e,t){return 32-this._daylightSavingAdjust(new Date(e,t,32)).getDate()},_getFirstDayOfMonth:function(e,t){return(new Date(e,t,1)).getDay()},_canAdjustMonth:function(e,t,n,r){var i=this._getNumberOfMonths(e),s=this._daylightSavingAdjust(new Date(n,r+(t<0?t:i[0]*i[1]),1));return t<0&&s.setDate(this._getDaysInMonth(s.getFullYear(),s.getMonth())),this._isInRange(e,s)},_isInRange:function(e,t){var n=this._getMinMaxDate(e,"min"),r=this._getMinMaxDate(e,"max");return(!n||t.getTime()>=n.getTime())&&(!r||t.getTime()<=r.getTime())},_getFormatConfig:function(e){var t=this._get(e,"shortYearCutoff");return t=typeof t!="string"?t:(new Date).getFullYear()%100+parseInt(t,10),{shortYearCutoff:t,dayNamesShort:this._get(e,"dayNamesShort"),dayNames:this._get(e,"dayNames"),monthNamesShort:this._get(e,"monthNamesShort"),monthNames:this._get(e,"monthNames")}},_formatDate:function(e,t,n,r){t||(e.currentDay=e.selectedDay,e.currentMonth=e.selectedMonth,e.currentYear=e.selectedYear);var i=t?typeof t=="object"?t:this._daylightSavingAdjust(new Date(r,n,t)):this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));return this.formatDate(this._get(e,"dateFormat"),i,this._getFormatConfig(e))}}),$.fn.datepicker=function(e){if(!this.length)return this;$.datepicker.initialized||($(document).mousedown($.datepicker._checkExternalClick).find(document.body).append($.datepicker.dpDiv),$.datepicker.initialized=!0);var t=Array.prototype.slice.call(arguments,1);return typeof e!="string"||e!="isDisabled"&&e!="getDate"&&e!="widget"?e=="option"&&arguments.length==2&&typeof arguments[1]=="string"?$.datepicker["_"+e+"Datepicker"].apply($.datepicker,[this[0]].concat(t)):this.each(function(){typeof e=="string"?$.datepicker["_"+e+"Datepicker"].apply($.datepicker,[this].concat(t)):$.datepicker._attachDatepicker(this,e)}):$.datepicker["_"+e+"Datepicker"].apply($.datepicker,[this[0]].concat(t))},$.datepicker=new Datepicker,$.datepicker.initialized=!1,$.datepicker.uuid=(new Date).getTime(),$.datepicker.version="1.9.1",window["DP_jQuery_"+dpuuid]=$})(jQuery);(function(e,t){var n="ui-dialog ui-widget ui-widget-content ui-corner-all ",r={buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},i={maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0};e.widget("ui.dialog",{version:"1.9.1",options:{autoOpen:!0,buttons:{},closeOnEscape:!0,closeText:"close",dialogClass:"",draggable:!0,hide:null,height:"auto",maxHeight:!1,maxWidth:!1,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",of:window,collision:"fit",using:function(t){var n=e(this).css(t).offset().top;n<0&&e(this).css("top",t.top-n)}},resizable:!0,show:null,stack:!0,title:"",width:300,zIndex:1e3},_create:function(){this.originalTitle=this.element.attr("title"),typeof this.originalTitle!="string"&&(this.originalTitle=""),this.oldPosition={parent:this.element.parent(),index:this.element.parent().children().index(this.element)},this.options.title=this.options.title||this.originalTitle;var t=this,r=this.options,i=r.title||"&#160;",s,o,u,a,f;s=(this.uiDialog=e("<div>")).addClass(n+r.dialogClass).css({display:"none",outline:0,zIndex:r.zIndex}).attr("tabIndex",-1).keydown(function(n){r.closeOnEscape&&!n.isDefaultPrevented()&&n.keyCode&&n.keyCode===e.ui.keyCode.ESCAPE&&(t.close(n),n.preventDefault())}).mousedown(function(e){t.moveToTop(!1,e)}).appendTo("body"),this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(s),o=(this.uiDialogTitlebar=e("<div>")).addClass("ui-dialog-titlebar  ui-widget-header  ui-corner-all  ui-helper-clearfix").bind("mousedown",function(){s.focus()}).prependTo(s),u=e("<a href='#'></a>").addClass("ui-dialog-titlebar-close  ui-corner-all").attr("role","button").click(function(e){e.preventDefault(),t.close(e)}).appendTo(o),(this.uiDialogTitlebarCloseText=e("<span>")).addClass("ui-icon ui-icon-closethick").text(r.closeText).appendTo(u),a=e("<span>").uniqueId().addClass("ui-dialog-title").html(i).prependTo(o),f=(this.uiDialogButtonPane=e("<div>")).addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),(this.uiButtonSet=e("<div>")).addClass("ui-dialog-buttonset").appendTo(f),s.attr({role:"dialog","aria-labelledby":a.attr("id")}),o.find("*").add(o).disableSelection(),this._hoverable(u),this._focusable(u),r.draggable&&e.fn.draggable&&this._makeDraggable(),r.resizable&&e.fn.resizable&&this._makeResizable(),this._createButtons(r.buttons),this._isOpen=!1,e.fn.bgiframe&&s.bgiframe(),this._on(s,{keydown:function(t){if(!r.modal||t.keyCode!==e.ui.keyCode.TAB)return;var n=e(":tabbable",s),i=n.filter(":first"),o=n.filter(":last");if(t.target===o[0]&&!t.shiftKey)return i.focus(1),!1;if(t.target===i[0]&&t.shiftKey)return o.focus(1),!1}})},_init:function(){this.options.autoOpen&&this.open()},_destroy:function(){var e,t=this.oldPosition;this.overlay&&this.overlay.destroy(),this.uiDialog.hide(),this.element.removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"),this.uiDialog.remove(),this.originalTitle&&this.element.attr("title",this.originalTitle),e=t.parent.children().eq(t.index),e.length&&e[0]!==this.element[0]?e.before(this.element):t.parent.append(this.element)},widget:function(){return this.uiDialog},close:function(t){var n=this,r,i;if(!this._isOpen)return;if(!1===this._trigger("beforeClose",t))return;return this._isOpen=!1,this.overlay&&this.overlay.destroy(),this.options.hide?this._hide(this.uiDialog,this.options.hide,function(){n._trigger("close",t)}):(this.uiDialog.hide(),this._trigger("close",t)),e.ui.dialog.overlay.resize(),this.options.modal&&(r=0,e(".ui-dialog").each(function(){this!==n.uiDialog[0]&&(i=e(this).css("z-index"),isNaN(i)||(r=Math.max(r,i)))}),e.ui.dialog.maxZ=r),this},isOpen:function(){return this._isOpen},moveToTop:function(t,n){var r=this.options,i;return r.modal&&!t||!r.stack&&!r.modal?this._trigger("focus",n):(r.zIndex>e.ui.dialog.maxZ&&(e.ui.dialog.maxZ=r.zIndex),this.overlay&&(e.ui.dialog.maxZ+=1,e.ui.dialog.overlay.maxZ=e.ui.dialog.maxZ,this.overlay.$el.css("z-index",e.ui.dialog.overlay.maxZ)),i={scrollTop:this.element.scrollTop(),scrollLeft:this.element.scrollLeft()},e.ui.dialog.maxZ+=1,this.uiDialog.css("z-index",e.ui.dialog.maxZ),this.element.attr(i),this._trigger("focus",n),this)},open:function(){if(this._isOpen)return;var t,n=this.options,r=this.uiDialog;return this._size(),this._position(n.position),r.show(n.show),this.overlay=n.modal?new e.ui.dialog.overlay(this):null,this.moveToTop(!0),t=this.element.find(":tabbable"),t.length||(t=this.uiDialogButtonPane.find(":tabbable"),t.length||(t=r)),t.eq(0).focus(),this._isOpen=!0,this._trigger("open"),this},_createButtons:function(t){var n=this,r=!1;this.uiDialogButtonPane.remove(),this.uiButtonSet.empty(),typeof t=="object"&&t!==null&&e.each(t,function(){return!(r=!0)}),r?(e.each(t,function(t,r){r=e.isFunction(r)?{click:r,text:t}:r;var i=e("<button type='button'></button>").attr(r,!0).unbind("click").click(function(){r.click.apply(n.element[0],arguments)}).appendTo(n.uiButtonSet);e.fn.button&&i.button()}),this.uiDialog.addClass("ui-dialog-buttons"),this.uiDialogButtonPane.appendTo(this.uiDialog)):this.uiDialog.removeClass("ui-dialog-buttons")},_makeDraggable:function(){function r(e){return{position:e.position,offset:e.offset}}var t=this,n=this.options;this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(n,i){e(this).addClass("ui-dialog-dragging"),t._trigger("dragStart",n,r(i))},drag:function(e,n){t._trigger("drag",e,r(n))},stop:function(i,s){n.position=[s.position.left-t.document.scrollLeft(),s.position.top-t.document.scrollTop()],e(this).removeClass("ui-dialog-dragging"),t._trigger("dragStop",i,r(s)),e.ui.dialog.overlay.resize()}})},_makeResizable:function(n){function u(e){return{originalPosition:e.originalPosition,originalSize:e.originalSize,position:e.position,size:e.size}}n=n===t?this.options.resizable:n;var r=this,i=this.options,s=this.uiDialog.css("position"),o=typeof n=="string"?n:"n,e,s,w,se,sw,ne,nw";this.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:this.element,maxWidth:i.maxWidth,maxHeight:i.maxHeight,minWidth:i.minWidth,minHeight:this._minHeight(),handles:o,start:function(t,n){e(this).addClass("ui-dialog-resizing"),r._trigger("resizeStart",t,u(n))},resize:function(e,t){r._trigger("resize",e,u(t))},stop:function(t,n){e(this).removeClass("ui-dialog-resizing"),i.height=e(this).height(),i.width=e(this).width(),r._trigger("resizeStop",t,u(n)),e.ui.dialog.overlay.resize()}}).css("position",s).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")},_minHeight:function(){var e=this.options;return e.height==="auto"?e.minHeight:Math.min(e.minHeight,e.height)},_position:function(t){var n=[],r=[0,0],i;if(t){if(typeof t=="string"||typeof t=="object"&&"0"in t)n=t.split?t.split(" "):[t[0],t[1]],n.length===1&&(n[1]=n[0]),e.each(["left","top"],function(e,t){+n[e]===n[e]&&(r[e]=n[e],n[e]=t)}),t={my:n[0]+(r[0]<0?r[0]:"+"+r[0])+" "+n[1]+(r[1]<0?r[1]:"+"+r[1]),at:n.join(" ")};t=e.extend({},e.ui.dialog.prototype.options.position,t)}else t=e.ui.dialog.prototype.options.position;i=this.uiDialog.is(":visible"),i||this.uiDialog.show(),this.uiDialog.position(t),i||this.uiDialog.hide()},_setOptions:function(t){var n=this,s={},o=!1;e.each(t,function(e,t){n._setOption(e,t),e in r&&(o=!0),e in i&&(s[e]=t)}),o&&this._size(),this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option",s)},_setOption:function(t,r){var i,s,o=this.uiDialog;switch(t){case"buttons":this._createButtons(r);break;case"closeText":this.uiDialogTitlebarCloseText.text(""+r);break;case"dialogClass":o.removeClass(this.options.dialogClass).addClass(n+r);break;case"disabled":r?o.addClass("ui-dialog-disabled"):o.removeClass("ui-dialog-disabled");break;case"draggable":i=o.is(":data(draggable)"),i&&!r&&o.draggable("destroy"),!i&&r&&this._makeDraggable();break;case"position":this._position(r);break;case"resizable":s=o.is(":data(resizable)"),s&&!r&&o.resizable("destroy"),s&&typeof r=="string"&&o.resizable("option","handles",r),!s&&r!==!1&&this._makeResizable(r);break;case"title":e(".ui-dialog-title",this.uiDialogTitlebar).html(""+(r||"&#160;"))}this._super(t,r)},_size:function(){var t,n,r,i=this.options,s=this.uiDialog.is(":visible");this.element.show().css({width:"auto",minHeight:0,height:0}),i.minWidth>i.width&&(i.width=i.minWidth),t=this.uiDialog.css({height:"auto",width:i.width}).outerHeight(),n=Math.max(0,i.minHeight-t),i.height==="auto"?e.support.minHeight?this.element.css({minHeight:n,height:"auto"}):(this.uiDialog.show(),r=this.element.css("height","auto").height(),s||this.uiDialog.hide(),this.element.height(Math.max(r,n))):this.element.height(Math.max(i.height-t,0)),this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())}}),e.extend(e.ui.dialog,{uuid:0,maxZ:0,getTitleId:function(e){var t=e.attr("id");return t||(this.uuid+=1,t=this.uuid),"ui-dialog-title-"+t},overlay:function(t){this.$el=e.ui.dialog.overlay.create(t)}}),e.extend(e.ui.dialog.overlay,{instances:[],oldInstances:[],maxZ:0,events:e.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(e){return e+".dialog-overlay"}).join(" "),create:function(t){this.instances.length===0&&(setTimeout(function(){e.ui.dialog.overlay.instances.length&&e(document).bind(e.ui.dialog.overlay.events,function(t){if(e(t.target).zIndex()<e.ui.dialog.overlay.maxZ)return!1})},1),e(window).bind("resize.dialog-overlay",e.ui.dialog.overlay.resize));var n=this.oldInstances.pop()||e("<div>").addClass("ui-widget-overlay");return e(document).bind("keydown.dialog-overlay",function(r){var i=e.ui.dialog.overlay.instances;i.length!==0&&i[i.length-1]===n&&t.options.closeOnEscape&&!r.isDefaultPrevented()&&r.keyCode&&r.keyCode===e.ui.keyCode.ESCAPE&&(t.close(r),r.preventDefault())}),n.appendTo(document.body).css({width:this.width(),height:this.height()}),e.fn.bgiframe&&n.bgiframe(),this.instances.push(n),n},destroy:function(t){var n=e.inArray(t,this.instances),r=0;n!==-1&&this.oldInstances.push(this.instances.splice(n,1)[0]),this.instances.length===0&&e([document,window]).unbind(".dialog-overlay"),t.height(0).width(0).remove(),e.each(this.instances,function(){r=Math.max(r,this.css("z-index"))}),this.maxZ=r},height:function(){var t,n;return e.ui.ie?(t=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight),n=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight),t<n?e(window).height()+"px":t+"px"):e(document).height()+"px"},width:function(){var t,n;return e.ui.ie?(t=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth),n=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth),t<n?e(window).width()+"px":t+"px"):e(document).width()+"px"},resize:function(){var t=e([]);e.each(e.ui.dialog.overlay.instances,function(){t=t.add(this)}),t.css({width:0,height:0}).css({width:e.ui.dialog.overlay.width(),height:e.ui.dialog.overlay.height()})}}),e.extend(e.ui.dialog.overlay.prototype,{destroy:function(){e.ui.dialog.overlay.destroy(this.$el)}})})(jQuery);(function(e,t){var n=!1;e.widget("ui.menu",{version:"1.9.1",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-carat-1-e"},menus:"ul",position:{my:"left top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length).attr({role:this.options.role,tabIndex:0}).bind("click"+this.eventNamespace,e.proxy(function(e){this.options.disabled&&e.preventDefault()},this)),this.options.disabled&&this.element.addClass("ui-state-disabled").attr("aria-disabled","true"),this._on({"mousedown .ui-menu-item > a":function(e){e.preventDefault()},"click .ui-state-disabled > a":function(e){e.preventDefault()},"click .ui-menu-item:has(a)":function(t){var r=e(t.target).closest(".ui-menu-item");!n&&r.not(".ui-state-disabled").length&&(n=!0,this.select(t),r.has(".ui-menu").length?this.expand(t):this.element.is(":focus")||(this.element.trigger("focus",[!0]),this.active&&this.active.parents(".ui-menu").length===1&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":function(t){var n=e(t.currentTarget);n.siblings().children(".ui-state-active").removeClass("ui-state-active"),this.focus(t,n)},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(e,t){var n=this.active||this.element.children(".ui-menu-item").eq(0);t||this.focus(e,n)},blur:function(t){this._delay(function(){e.contains(this.element[0],this.document[0].activeElement)||this.collapseAll(t)})},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(t){e(t.target).closest(".ui-menu").length||this.collapseAll(t),n=!1}})},_destroy:function(){this.element.removeAttr("aria-activedescendant").find(".ui-menu").andSelf().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(),this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function(){var t=e(this);t.data("ui-menu-submenu-carat")&&t.remove()}),this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")},_keydown:function(t){function a(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}var n,r,i,s,o,u=!0;switch(t.keyCode){case e.ui.keyCode.PAGE_UP:this.previousPage(t);break;case e.ui.keyCode.PAGE_DOWN:this.nextPage(t);break;case e.ui.keyCode.HOME:this._move("first","first",t);break;case e.ui.keyCode.END:this._move("last","last",t);break;case e.ui.keyCode.UP:this.previous(t);break;case e.ui.keyCode.DOWN:this.next(t);break;case e.ui.keyCode.LEFT:this.collapse(t);break;case e.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(t);break;case e.ui.keyCode.ENTER:case e.ui.keyCode.SPACE:this._activate(t);break;case e.ui.keyCode.ESCAPE:this.collapse(t);break;default:u=!1,r=this.previousFilter||"",i=String.fromCharCode(t.keyCode),s=!1,clearTimeout(this.filterTimer),i===r?s=!0:i=r+i,o=new RegExp("^"+a(i),"i"),n=this.activeMenu.children(".ui-menu-item").filter(function(){return o.test(e(this).children("a").text())}),n=s&&n.index(this.active.next())!==-1?this.active.nextAll(".ui-menu-item"):n,n.length||(i=String.fromCharCode(t.keyCode),o=new RegExp("^"+a(i),"i"),n=this.activeMenu.children(".ui-menu-item").filter(function(){return o.test(e(this).children("a").text())})),n.length?(this.focus(t,n),n.length>1?(this.previousFilter=i,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter):delete this.previousFilter}u&&t.preventDefault()},_activate:function(e){this.active.is(".ui-state-disabled")||(this.active.children("a[aria-haspopup='true']").length?this.expand(e):this.select(e))},refresh:function(){var t,n=this.options.icons.submenu,r=this.element.find(this.options.menus+":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"});t=r.add(this.element),t.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","presentation").children("a").uniqueId().addClass("ui-corner-all").attr({tabIndex:-1,role:this._itemRole()}),t.children(":not(.ui-menu-item)").each(function(){var t=e(this);/[^\-—–\s]/.test(t.text())||t.addClass("ui-widget-content ui-menu-divider")}),t.children(".ui-state-disabled").attr("aria-disabled","true"),r.each(function(){var t=e(this),r=t.prev("a"),i=e("<span>").addClass("ui-menu-icon ui-icon "+n).data("ui-menu-submenu-carat",!0);r.attr("aria-haspopup","true").prepend(i),t.attr("aria-labelledby",r.attr("id"))}),this.active&&!e.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},focus:function(e,t){var n,r;this.blur(e,e&&e.type==="focus"),this._scrollIntoView(t),this.active=t.first(),r=this.active.children("a").addClass("ui-state-focus"),this.options.role&&this.element.attr("aria-activedescendant",r.attr("id")),this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"),e&&e.type==="keydown"?this._close():this.timer=this._delay(function(){this._close()},this.delay),n=t.children(".ui-menu"),n.length&&/^mouse/.test(e.type)&&this._startOpening(n),this.activeMenu=t.parent(),this._trigger("focus",e,{item:t})},_scrollIntoView:function(t){var n,r,i,s,o,u;this._hasScroll()&&(n=parseFloat(e.css(this.activeMenu[0],"borderTopWidth"))||0,r=parseFloat(e.css(this.activeMenu[0],"paddingTop"))||0,i=t.offset().top-this.activeMenu.offset().top-n-r,s=this.activeMenu.scrollTop(),o=this.activeMenu.height(),u=t.height(),i<0?this.activeMenu.scrollTop(s+i):i+u>o&&this.activeMenu.scrollTop(s+i-o+u))},blur:function(e,t){t||clearTimeout(this.timer);if(!this.active)return;this.active.children("a").removeClass("ui-state-focus"),this.active=null,this._trigger("blur",e,{item:this.active})},_startOpening:function(e){clearTimeout(this.timer);if(e.attr("aria-hidden")!=="true")return;this.timer=this._delay(function(){this._close(),this._open(e)},this.delay)},_open:function(t){var n=e.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden","true"),t.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(n)},collapseAll:function(t,n){clearTimeout(this.timer),this.timer=this._delay(function(){var r=n?this.element:e(t&&t.target).closest(this.element.find(".ui-menu"));r.length||(r=this.element),this._close(r),this.blur(t),this.activeMenu=r},this.delay)},_close:function(e){e||(e=this.active?this.active.parent():this.element),e.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false").end().find("a.ui-state-active").removeClass("ui-state-active")},collapse:function(e){var t=this.active&&this.active.parent().closest(".ui-menu-item",this.element);t&&t.length&&(this._close(),this.focus(e,t))},expand:function(e){var t=this.active&&this.active.children(".ui-menu ").children(".ui-menu-item").first();t&&t.length&&(this._open(t.parent()),this._delay(function(){this.focus(e,t)}))},next:function(e){this._move("next","first",e)},previous:function(e){this._move("prev","last",e)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(e,t,n){var r;this.active&&(e==="first"||e==="last"?r=this.active[e==="first"?"prevAll":"nextAll"](".ui-menu-item").eq(-1):r=this.active[e+"All"](".ui-menu-item").eq(0));if(!r||!r.length||!this.active)r=this.activeMenu.children(".ui-menu-item")[t]();this.focus(n,r)},nextPage:function(t){var n,r,i;if(!this.active){this.next(t);return}if(this.isLastItem())return;this._hasScroll()?(r=this.active.offset().top,i=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return n=e(this),n.offset().top-r-i<0}),this.focus(t,n)):this.focus(t,this.activeMenu.children(".ui-menu-item")[this.active?"last":"first"]())},previousPage:function(t){var n,r,i;if(!this.active){this.next(t);return}if(this.isFirstItem())return;this._hasScroll()?(r=this.active.offset().top,i=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return n=e(this),n.offset().top-r+i>0}),this.focus(t,n)):this.focus(t,this.activeMenu.children(".ui-menu-item").first())},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(t){this.active=this.active||e(t.target).closest(".ui-menu-item");var n={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(t,!0),this._trigger("select",t,n)}})})(jQuery);(function(e,t){e.widget("ui.progressbar",{version:"1.9.1",options:{value:0,max:100},min:0,_create:function(){this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min,"aria-valuemax":this.options.max,"aria-valuenow":this._value()}),this.valueDiv=e("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element),this.oldValue=this._value(),this._refreshValue()},_destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.valueDiv.remove()},value:function(e){return e===t?this._value():(this._setOption("value",e),this)},_setOption:function(e,t){e==="value"&&(this.options.value=t,this._refreshValue(),this._value()===this.options.max&&this._trigger("complete")),this._super(e,t)},_value:function(){var e=this.options.value;return typeof e!="number"&&(e=0),Math.min(this.options.max,Math.max(this.min,e))},_percentage:function(){return 100*this._value()/this.options.max},_refreshValue:function(){var e=this.value(),t=this._percentage();this.oldValue!==e&&(this.oldValue=e,this._trigger("change")),this.valueDiv.toggle(e>this.min).toggleClass("ui-corner-right",e===this.options.max).width(t.toFixed(0)+"%"),this.element.attr("aria-valuenow",e)}})})(jQuery);(function(e,t){var n=5;e.widget("ui.slider",e.ui.mouse,{version:"1.9.1",widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null},_create:function(){var t,r,i=this.options,s=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),o="<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",u=[];this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget"+" ui-widget-content"+" ui-corner-all"+(i.disabled?" ui-slider-disabled ui-disabled":"")),this.range=e([]),i.range&&(i.range===!0&&(i.values||(i.values=[this._valueMin(),this._valueMin()]),i.values.length&&i.values.length!==2&&(i.values=[i.values[0],i.values[0]])),this.range=e("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header"+(i.range==="min"||i.range==="max"?" ui-slider-range-"+i.range:""))),r=i.values&&i.values.length||1;for(t=s.length;t<r;t++)u.push(o);this.handles=s.add(e(u.join("")).appendTo(this.element)),this.handle=this.handles.eq(0),this.handles.add(this.range).filter("a").click(function(e){e.preventDefault()}).mouseenter(function(){i.disabled||e(this).addClass("ui-state-hover")}).mouseleave(function(){e(this).removeClass("ui-state-hover")}).focus(function(){i.disabled?e(this).blur():(e(".ui-slider .ui-state-focus").removeClass("ui-state-focus"),e(this).addClass("ui-state-focus"))}).blur(function(){e(this).removeClass("ui-state-focus")}),this.handles.each(function(t){e(this).data("ui-slider-handle-index",t)}),this._on(this.handles,{keydown:function(t){var r,i,s,o,u=e(t.target).data("ui-slider-handle-index");switch(t.keyCode){case e.ui.keyCode.HOME:case e.ui.keyCode.END:case e.ui.keyCode.PAGE_UP:case e.ui.keyCode.PAGE_DOWN:case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:t.preventDefault();if(!this._keySliding){this._keySliding=!0,e(t.target).addClass("ui-state-active"),r=this._start(t,u);if(r===!1)return}}o=this.options.step,this.options.values&&this.options.values.length?i=s=this.values(u):i=s=this.value();switch(t.keyCode){case e.ui.keyCode.HOME:s=this._valueMin();break;case e.ui.keyCode.END:s=this._valueMax();break;case e.ui.keyCode.PAGE_UP:s=this._trimAlignValue(i+(this._valueMax()-this._valueMin())/n);break;case e.ui.keyCode.PAGE_DOWN:s=this._trimAlignValue(i-(this._valueMax()-this._valueMin())/n);break;case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:if(i===this._valueMax())return;s=this._trimAlignValue(i+o);break;case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:if(i===this._valueMin())return;s=this._trimAlignValue(i-o)}this._slide(t,u,s)},keyup:function(t){var n=e(t.target).data("ui-slider-handle-index");this._keySliding&&(this._keySliding=!1,this._stop(t,n),this._change(t,n),e(t.target).removeClass("ui-state-active"))}}),this._refreshValue(),this._animateOff=!1},_destroy:function(){this.handles.remove(),this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all"),this._mouseDestroy()},_mouseCapture:function(t){var n,r,i,s,o,u,a,f,l=this,c=this.options;return c.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),n={x:t.pageX,y:t.pageY},r=this._normValueFromMouse(n),i=this._valueMax()-this._valueMin()+1,this.handles.each(function(t){var n=Math.abs(r-l.values(t));i>n&&(i=n,s=e(this),o=t)}),c.range===!0&&this.values(1)===c.min&&(o+=1,s=e(this.handles[o])),u=this._start(t,o),u===!1?!1:(this._mouseSliding=!0,this._handleIndex=o,s.addClass("ui-state-active").focus(),a=s.offset(),f=!e(t.target).parents().andSelf().is(".ui-slider-handle"),this._clickOffset=f?{left:0,top:0}:{left:t.pageX-a.left-s.width()/2,top:t.pageY-a.top-s.height()/2-(parseInt(s.css("borderTopWidth"),10)||0)-(parseInt(s.css("borderBottomWidth"),10)||0)+(parseInt(s.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(t,o,r),this._animateOff=!0,!0))},_mouseStart:function(){return!0},_mouseDrag:function(e){var t={x:e.pageX,y:e.pageY},n=this._normValueFromMouse(t);return this._slide(e,this._handleIndex,n),!1},_mouseStop:function(e){return this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(e,this._handleIndex),this._change(e,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation=this.options.orientation==="vertical"?"vertical":"horizontal"},_normValueFromMouse:function(e){var t,n,r,i,s;return this.orientation==="horizontal"?(t=this.elementSize.width,n=e.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(t=this.elementSize.height,n=e.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),r=n/t,r>1&&(r=1),r<0&&(r=0),this.orientation==="vertical"&&(r=1-r),i=this._valueMax()-this._valueMin(),s=this._valueMin()+r*i,this._trimAlignValue(s)},_start:function(e,t){var n={handle:this.handles[t],value:this.value()};return this.options.values&&this.options.values.length&&(n.value=this.values(t),n.values=this.values()),this._trigger("start",e,n)},_slide:function(e,t,n){var r,i,s;this.options.values&&this.options.values.length?(r=this.values(t?0:1),this.options.values.length===2&&this.options.range===!0&&(t===0&&n>r||t===1&&n<r)&&(n=r),n!==this.values(t)&&(i=this.values(),i[t]=n,s=this._trigger("slide",e,{handle:this.handles[t],value:n,values:i}),r=this.values(t?0:1),s!==!1&&this.values(t,n,!0))):n!==this.value()&&(s=this._trigger("slide",e,{handle:this.handles[t],value:n}),s!==!1&&this.value(n))},_stop:function(e,t){var n={handle:this.handles[t],value:this.value()};this.options.values&&this.options.values.length&&(n.value=this.values(t),n.values=this.values()),this._trigger("stop",e,n)},_change:function(e,t){if(!this._keySliding&&!this._mouseSliding){var n={handle:this.handles[t],value:this.value()};this.options.values&&this.options.values.length&&(n.value=this.values(t),n.values=this.values()),this._trigger("change",e,n)}},value:function(e){if(arguments.length){this.options.value=this._trimAlignValue(e),this._refreshValue(),this._change(null,0);return}return this._value()},values:function(t,n){var r,i,s;if(arguments.length>1){this.options.values[t]=this._trimAlignValue(n),this._refreshValue(),this._change(null,t);return}if(!arguments.length)return this._values();if(!e.isArray(arguments[0]))return this.options.values&&this.options.values.length?this._values(t):this.value();r=this.options.values,i=arguments[0];for(s=0;s<r.length;s+=1)r[s]=this._trimAlignValue(i[s]),this._change(null,s);this._refreshValue()},_setOption:function(t,n){var r,i=0;e.isArray(this.options.values)&&(i=this.options.values.length),e.Widget.prototype._setOption.apply(this,arguments);switch(t){case"disabled":n?(this.handles.filter(".ui-state-focus").blur(),this.handles.removeClass("ui-state-hover"),this.handles.prop("disabled",!0),this.element.addClass("ui-disabled")):(this.handles.prop("disabled",!1),this.element.removeClass("ui-disabled"));break;case"orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue();break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":this._animateOff=!0,this._refreshValue();for(r=0;r<i;r+=1)this._change(null,r);this._animateOff=!1;break;case"min":case"max":this._animateOff=!0,this._refreshValue(),this._animateOff=!1}},_value:function(){var e=this.options.value;return e=this._trimAlignValue(e),e},_values:function(e){var t,n,r;if(arguments.length)return t=this.options.values[e],t=this._trimAlignValue(t),t;n=this.options.values.slice();for(r=0;r<n.length;r+=1)n[r]=this._trimAlignValue(n[r]);return n},_trimAlignValue:function(e){if(e<=this._valueMin())return this._valueMin();if(e>=this._valueMax())return this._valueMax();var t=this.options.step>0?this.options.step:1,n=(e-this._valueMin())%t,r=e-n;return Math.abs(n)*2>=t&&(r+=n>0?t:-t),parseFloat(r.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},_refreshValue:function(){var t,n,r,i,s,o=this.options.range,u=this.options,a=this,f=this._animateOff?!1:u.animate,l={};this.options.values&&this.options.values.length?this.handles.each(function(r){n=(a.values(r)-a._valueMin())/(a._valueMax()-a._valueMin())*100,l[a.orientation==="horizontal"?"left":"bottom"]=n+"%",e(this).stop(1,1)[f?"animate":"css"](l,u.animate),a.options.range===!0&&(a.orientation==="horizontal"?(r===0&&a.range.stop(1,1)[f?"animate":"css"]({left:n+"%"},u.animate),r===1&&a.range[f?"animate":"css"]({width:n-t+"%"},{queue:!1,duration:u.animate})):(r===0&&a.range.stop(1,1)[f?"animate":"css"]({bottom:n+"%"},u.animate),r===1&&a.range[f?"animate":"css"]({height:n-t+"%"},{queue:!1,duration:u.animate}))),t=n}):(r=this.value(),i=this._valueMin(),s=this._valueMax(),n=s!==i?(r-i)/(s-i)*100:0,l[this.orientation==="horizontal"?"left":"bottom"]=n+"%",this.handle.stop(1,1)[f?"animate":"css"](l,u.animate),o==="min"&&this.orientation==="horizontal"&&this.range.stop(1,1)[f?"animate":"css"]({width:n+"%"},u.animate),o==="max"&&this.orientation==="horizontal"&&this.range[f?"animate":"css"]({width:100-n+"%"},{queue:!1,duration:u.animate}),o==="min"&&this.orientation==="vertical"&&this.range.stop(1,1)[f?"animate":"css"]({height:n+"%"},u.animate),o==="max"&&this.orientation==="vertical"&&this.range[f?"animate":"css"]({height:100-n+"%"},{queue:!1,duration:u.animate}))}})})(jQuery);(function(e){function t(e){return function(){var t=this.element.val();e.apply(this,arguments),this._refresh(),t!==this.element.val()&&this._trigger("change")}}e.widget("ui.spinner",{version:"1.9.1",defaultElement:"<input>",widgetEventPrefix:"spin",options:{culture:null,icons:{down:"ui-icon-triangle-1-s",up:"ui-icon-triangle-1-n"},incremental:!0,max:null,min:null,numberFormat:null,page:10,step:1,change:null,spin:null,start:null,stop:null},_create:function(){this._setOption("max",this.options.max),this._setOption("min",this.options.min),this._setOption("step",this.options.step),this._value(this.element.val(),!0),this._draw(),this._on(this._events),this._refresh(),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_getCreateOptions:function(){var t={},n=this.element;return e.each(["min","max","step"],function(e,r){var i=n.attr(r);i!==undefined&&i.length&&(t[r]=i)}),t},_events:{keydown:function(e){this._start(e)&&this._keydown(e)&&e.preventDefault()},keyup:"_stop",focus:function(){this.previous=this.element.val()},blur:function(e){if(this.cancelBlur){delete this.cancelBlur;return}this._refresh(),this.previous!==this.element.val()&&this._trigger("change",e)},mousewheel:function(e,t){if(!t)return;if(!this.spinning&&!this._start(e))return!1;this._spin((t>0?1:-1)*this.options.step,e),clearTimeout(this.mousewheelTimer),this.mousewheelTimer=this._delay(function(){this.spinning&&this._stop(e)},100),e.preventDefault()},"mousedown .ui-spinner-button":function(t){function r(){var e=this.element[0]===this.document[0].activeElement;e||(this.element.focus(),this.previous=n,this._delay(function(){this.previous=n}))}var n;n=this.element[0]===this.document[0].activeElement?this.previous:this.element.val(),t.preventDefault(),r.call(this),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur,r.call(this)});if(this._start(t)===!1)return;this._repeat(null,e(t.currentTarget).hasClass("ui-spinner-up")?1:-1,t)},"mouseup .ui-spinner-button":"_stop","mouseenter .ui-spinner-button":function(t){if(!e(t.currentTarget).hasClass("ui-state-active"))return;if(this._start(t)===!1)return!1;this._repeat(null,e(t.currentTarget).hasClass("ui-spinner-up")?1:-1,t)},"mouseleave .ui-spinner-button":"_stop"},_draw:function(){var e=this.uiSpinner=this.element.addClass("ui-spinner-input").attr("autocomplete","off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());this.element.attr("role","spinbutton"),this.buttons=e.find(".ui-spinner-button").attr("tabIndex",-1).button().removeClass("ui-corner-all"),this.buttons.height()>Math.ceil(e.height()*.5)&&e.height()>0&&e.height(e.height()),this.options.disabled&&this.disable()},_keydown:function(t){var n=this.options,r=e.ui.keyCode;switch(t.keyCode){case r.UP:return this._repeat(null,1,t),!0;case r.DOWN:return this._repeat(null,-1,t),!0;case r.PAGE_UP:return this._repeat(null,n.page,t),!0;case r.PAGE_DOWN:return this._repeat(null,-n.page,t),!0}return!1},_uiSpinnerHtml:function(){return"<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"},_buttonHtml:function(){return"<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon "+this.options.icons.up+"'>&#9650;</span>"+"</a>"+"<a class='ui-spinner-button ui-spinner-down ui-corner-br'>"+"<span class='ui-icon "+this.options.icons.down+"'>&#9660;</span>"+"</a>"},_start:function(e){return!this.spinning&&this._trigger("start",e)===!1?!1:(this.counter||(this.counter=1),this.spinning=!0,!0)},_repeat:function(e,t,n){e=e||500,clearTimeout(this.timer),this.timer=this._delay(function(){this._repeat(40,t,n)},e),this._spin(t*this.options.step,n)},_spin:function(e,t){var n=this.value()||0;this.counter||(this.counter=1),n=this._adjustValue(n+e*this._increment(this.counter));if(!this.spinning||this._trigger("spin",t,{value:n})!==!1)this._value(n),this.counter++},_increment:function(t){var n=this.options.incremental;return n?e.isFunction(n)?n(t):Math.floor(t*t*t/5e4-t*t/500+17*t/200+1):1},_precision:function(){var e=this._precisionOf(this.options.step);return this.options.min!==null&&(e=Math.max(e,this._precisionOf(this.options.min))),e},_precisionOf:function(e){var t=e.toString(),n=t.indexOf(".");return n===-1?0:t.length-n-1},_adjustValue:function(e){var t,n,r=this.options;return t=r.min!==null?r.min:0,n=e-t,n=Math.round(n/r.step)*r.step,e=t+n,e=parseFloat(e.toFixed(this._precision())),r.max!==null&&e>r.max?r.max:r.min!==null&&e<r.min?r.min:e},_stop:function(e){if(!this.spinning)return;clearTimeout(this.timer),clearTimeout(this.mousewheelTimer),this.counter=0,this.spinning=!1,this._trigger("stop",e)},_setOption:function(e,t){if(e==="culture"||e==="numberFormat"){var n=this._parse(this.element.val());this.options[e]=t,this.element.val(this._format(n));return}(e==="max"||e==="min"||e==="step")&&typeof t=="string"&&(t=this._parse(t)),this._super(e,t),e==="disabled"&&(t?(this.element.prop("disabled",!0),this.buttons.button("disable")):(this.element.prop("disabled",!1),this.buttons.button("enable")))},_setOptions:t(function(e){this._super(e),this._value(this.element.val())}),_parse:function(e){return typeof e=="string"&&e!==""&&(e=window.Globalize&&this.options.numberFormat?Globalize.parseFloat(e,10,this.options.culture):+e),e===""||isNaN(e)?null:e},_format:function(e){return e===""?"":window.Globalize&&this.options.numberFormat?Globalize.format(e,this.options.numberFormat,this.options.culture):e},_refresh:function(){this.element.attr({"aria-valuemin":this.options.min,"aria-valuemax":this.options.max,"aria-valuenow":this._parse(this.element.val())})},_value:function(e,t){var n;e!==""&&(n=this._parse(e),n!==null&&(t||(n=this._adjustValue(n)),e=this._format(n))),this.element.val(e),this._refresh()},_destroy:function(){this.element.removeClass("ui-spinner-input").prop("disabled",!1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.uiSpinner.replaceWith(this.element)},stepUp:t(function(e){this._stepUp(e)}),_stepUp:function(e){this._spin((e||1)*this.options.step)},stepDown:t(function(e){this._stepDown(e)}),_stepDown:function(e){this._spin((e||1)*-this.options.step)},pageUp:t(function(e){this._stepUp((e||1)*this.options.page)}),pageDown:t(function(e){this._stepDown((e||1)*this.options.page)}),value:function(e){if(!arguments.length)return this._parse(this.element.val());t(this._value).call(this,e)},widget:function(){return this.uiSpinner}})})(jQuery);(function(e,t){function i(){return++n}function s(e){return e.hash.length>1&&e.href.replace(r,"")===location.href.replace(r,"")}var n=0,r=/#.*$/;e.widget("ui.tabs",{version:"1.9.1",delay:300,options:{active:null,collapsible:!1,event:"click",heightStyle:"content",hide:null,show:null,activate:null,beforeActivate:null,beforeLoad:null,load:null},_create:function(){var t=this,n=this.options,r=n.active,i=location.hash.substring(1);this.running=!1,this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible",n.collapsible).delegate(".ui-tabs-nav > li","mousedown"+this.eventNamespace,function(t){e(this).is(".ui-state-disabled")&&t.preventDefault()}).delegate(".ui-tabs-anchor","focus"+this.eventNamespace,function(){e(this).closest("li").is(".ui-state-disabled")&&this.blur()}),this._processTabs();if(r===null){i&&this.tabs.each(function(t,n){if(e(n).attr("aria-controls")===i)return r=t,!1}),r===null&&(r=this.tabs.index(this.tabs.filter(".ui-tabs-active")));if(r===null||r===-1)r=this.tabs.length?0:!1}r!==!1&&(r=this.tabs.index(this.tabs.eq(r)),r===-1&&(r=n.collapsible?!1:0)),n.active=r,!n.collapsible&&n.active===!1&&this.anchors.length&&(n.active=0),e.isArray(n.disabled)&&(n.disabled=e.unique(n.disabled.concat(e.map(this.tabs.filter(".ui-state-disabled"),function(e){return t.tabs.index(e)}))).sort()),this.options.active!==!1&&this.anchors.length?this.active=this._findActive(this.options.active):this.active=e(),this._refresh(),this.active.length&&this.load(n.active)},_getCreateEventData:function(){return{tab:this.active,panel:this.active.length?this._getPanelForTab(this.active):e()}},_tabKeydown:function(t){var n=e(this.document[0].activeElement).closest("li"),r=this.tabs.index(n),i=!0;if(this._handlePageNav(t))return;switch(t.keyCode){case e.ui.keyCode.RIGHT:case e.ui.keyCode.DOWN:r++;break;case e.ui.keyCode.UP:case e.ui.keyCode.LEFT:i=!1,r--;break;case e.ui.keyCode.END:r=this.anchors.length-1;break;case e.ui.keyCode.HOME:r=0;break;case e.ui.keyCode.SPACE:t.preventDefault(),clearTimeout(this.activating),this._activate(r);return;case e.ui.keyCode.ENTER:t.preventDefault(),clearTimeout(this.activating),this._activate(r===this.options.active?!1:r);return;default:return}t.preventDefault(),clearTimeout(this.activating),r=this._focusNextTab(r,i),t.ctrlKey||(n.attr("aria-selected","false"),this.tabs.eq(r).attr("aria-selected","true"),this.activating=this._delay(function(){this.option("active",r)},this.delay))},_panelKeydown:function(t){if(this._handlePageNav(t))return;t.ctrlKey&&t.keyCode===e.ui.keyCode.UP&&(t.preventDefault(),this.active.focus())},_handlePageNav:function(t){if(t.altKey&&t.keyCode===e.ui.keyCode.PAGE_UP)return this._activate(this._focusNextTab(this.options.active-1,!1)),!0;if(t.altKey&&t.keyCode===e.ui.keyCode.PAGE_DOWN)return this._activate(this._focusNextTab(this.options.active+1,!0)),!0},_findNextTab:function(t,n){function i(){return t>r&&(t=0),t<0&&(t=r),t}var r=this.tabs.length-1;while(e.inArray(i(),this.options.disabled)!==-1)t=n?t+1:t-1;return t},_focusNextTab:function(e,t){return e=this._findNextTab(e,t),this.tabs.eq(e).focus(),e},_setOption:function(e,t){if(e==="active"){this._activate(t);return}if(e==="disabled"){this._setupDisabled(t);return}this._super(e,t),e==="collapsible"&&(this.element.toggleClass("ui-tabs-collapsible",t),!t&&this.options.active===!1&&this._activate(0)),e==="event"&&this._setupEvents(t),e==="heightStyle"&&this._setupHeightStyle(t)},_tabId:function(e){return e.attr("aria-controls")||"ui-tabs-"+i()},_sanitizeSelector:function(e){return e?e.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g,"\\$&"):""},refresh:function(){var t=this.options,n=this.tablist.children(":has(a[href])");t.disabled=e.map(n.filter(".ui-state-disabled"),function(e){return n.index(e)}),this._processTabs(),t.active===!1||!this.anchors.length?(t.active=!1,this.active=e()):this.active.length&&!e.contains(this.tablist[0],this.active[0])?this.tabs.length===t.disabled.length?(t.active=!1,this.active=e()):this._activate(this._findNextTab(Math.max(0,t.active-1),!1)):t.active=this.tabs.index(this.active),this._refresh()},_refresh:function(){this._setupDisabled(this.options.disabled),this._setupEvents(this.options.event),this._setupHeightStyle(this.options.heightStyle),this.tabs.not(this.active).attr({"aria-selected":"false",tabIndex:-1}),this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-expanded":"false","aria-hidden":"true"}),this.active.length?(this.active.addClass("ui-tabs-active ui-state-active").attr({"aria-selected":"true",tabIndex:0}),this._getPanelForTab(this.active).show().attr({"aria-expanded":"true","aria-hidden":"false"})):this.tabs.eq(0).attr("tabIndex",0)},_processTabs:function(){var t=this;this.tablist=this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role","tablist"),this.tabs=this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({role:"tab",tabIndex:-1}),this.anchors=this.tabs.map(function(){return e("a",this)[0]}).addClass("ui-tabs-anchor").attr({role:"presentation",tabIndex:-1}),this.panels=e(),this.anchors.each(function(n,r){var i,o,u,a=e(r).uniqueId().attr("id"),f=e(r).closest("li"),l=f.attr("aria-controls");s(r)?(i=r.hash,o=t.element.find(t._sanitizeSelector(i))):(u=t._tabId(f),i="#"+u,o=t.element.find(i),o.length||(o=t._createPanel(u),o.insertAfter(t.panels[n-1]||t.tablist)),o.attr("aria-live","polite")),o.length&&(t.panels=t.panels.add(o)),l&&f.data("ui-tabs-aria-controls",l),f.attr({"aria-controls":i.substring(1),"aria-labelledby":a}),o.attr("aria-labelledby",a)}),this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role","tabpanel")},_getList:function(){return this.element.find("ol,ul").eq(0)},_createPanel:function(t){return e("<div>").attr("id",t).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy",!0)},_setupDisabled:function(t){e.isArray(t)&&(t.length?t.length===this.anchors.length&&(t=!0):t=!1);for(var n=0,r;r=this.tabs[n];n++)t===!0||e.inArray(n,t)!==-1?e(r).addClass("ui-state-disabled").attr("aria-disabled","true"):e(r).removeClass("ui-state-disabled").removeAttr("aria-disabled");this.options.disabled=t},_setupEvents:function(t){var n={click:function(e){e.preventDefault()}};t&&e.each(t.split(" "),function(e,t){n[t]="_eventHandler"}),this._off(this.anchors.add(this.tabs).add(this.panels)),this._on(this.anchors,n),this._on(this.tabs,{keydown:"_tabKeydown"}),this._on(this.panels,{keydown:"_panelKeydown"}),this._focusable(this.tabs),this._hoverable(this.tabs)},_setupHeightStyle:function(t){var n,r,i=this.element.parent();t==="fill"?(e.support.minHeight||(r=i.css("overflow"),i.css("overflow","hidden")),n=i.height(),this.element.siblings(":visible").each(function(){var t=e(this),r=t.css("position");if(r==="absolute"||r==="fixed")return;n-=t.outerHeight(!0)}),r&&i.css("overflow",r),this.element.children().not(this.panels).each(function(){n-=e(this).outerHeight(!0)}),this.panels.each(function(){e(this).height(Math.max(0,n-e(this).innerHeight()+e(this).height()))}).css("overflow","auto")):t==="auto"&&(n=0,this.panels.each(function(){n=Math.max(n,e(this).height("").height())}).height(n))},_eventHandler:function(t){var n=this.options,r=this.active,i=e(t.currentTarget),s=i.closest("li"),o=s[0]===r[0],u=o&&n.collapsible,a=u?e():this._getPanelForTab(s),f=r.length?this._getPanelForTab(r):e(),l={oldTab:r,oldPanel:f,newTab:u?e():s,newPanel:a};t.preventDefault();if(s.hasClass("ui-state-disabled")||s.hasClass("ui-tabs-loading")||this.running||o&&!n.collapsible||this._trigger("beforeActivate",t,l)===!1)return;n.active=u?!1:this.tabs.index(s),this.active=o?e():s,this.xhr&&this.xhr.abort(),!f.length&&!a.length&&e.error("jQuery UI Tabs: Mismatching fragment identifier."),a.length&&this.load(this.tabs.index(s),t),this._toggle(t,l)},_toggle:function(t,n){function o(){r.running=!1,r._trigger("activate",t,n)}function u(){n.newTab.closest("li").addClass("ui-tabs-active ui-state-active"),i.length&&r.options.show?r._show(i,r.options.show,o):(i.show(),o())}var r=this,i=n.newPanel,s=n.oldPanel;this.running=!0,s.length&&this.options.hide?this._hide(s,this.options.hide,function(){n.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),u()}):(n.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),s.hide(),u()),s.attr({"aria-expanded":"false","aria-hidden":"true"}),n.oldTab.attr("aria-selected","false"),i.length&&s.length?n.oldTab.attr("tabIndex",-1):i.length&&this.tabs.filter(function(){return e(this).attr("tabIndex")===0}).attr("tabIndex",-1),i.attr({"aria-expanded":"true","aria-hidden":"false"}),n.newTab.attr({"aria-selected":"true",tabIndex:0})},_activate:function(t){var n,r=this._findActive(t);if(r[0]===this.active[0])return;r.length||(r=this.active),n=r.find(".ui-tabs-anchor")[0],this._eventHandler({target:n,currentTarget:n,preventDefault:e.noop})},_findActive:function(t){return t===!1?e():this.tabs.eq(t)},_getIndex:function(e){return typeof e=="string"&&(e=this.anchors.index(this.anchors.filter("[href$='"+e+"']"))),e},_destroy:function(){this.xhr&&this.xhr.abort(),this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"),this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"),this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeData("href.tabs").removeData("load.tabs").removeUniqueId(),this.tabs.add(this.panels).each(function(){e.data(this,"ui-tabs-destroy")?e(this).remove():e(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")}),this.tabs.each(function(){var t=e(this),n=t.data("ui-tabs-aria-controls");n?t.attr("aria-controls",n):t.removeAttr("aria-controls")}),this.options.heightStyle!=="content"&&this.panels.css("height","")},enable:function(n){var r=this.options.disabled;if(r===!1)return;n===t?r=!1:(n=this._getIndex(n),e.isArray(r)?r=e.map(r,function(e){return e!==n?e:null}):r=e.map(this.tabs,function(e,t){return t!==n?t:null})),this._setupDisabled(r)},disable:function(n){var r=this.options.disabled;if(r===!0)return;if(n===t)r=!0;else{n=this._getIndex(n);if(e.inArray(n,r)!==-1)return;e.isArray(r)?r=e.merge([n],r).sort():r=[n]}this._setupDisabled(r)},load:function(t,n){t=this._getIndex(t);var r=this,i=this.tabs.eq(t),o=i.find(".ui-tabs-anchor"),u=this._getPanelForTab(i),a={tab:i,panel:u};if(s(o[0]))return;this.xhr=e.ajax(this._ajaxSettings(o,n,a)),this.xhr&&this.xhr.statusText!=="canceled"&&(i.addClass("ui-tabs-loading"),u.attr("aria-busy","true"),this.xhr.success(function(e){setTimeout(function(){u.html(e),r._trigger("load",n,a)},1)}).complete(function(e,t){setTimeout(function(){t==="abort"&&r.panels.stop(!1,!0),i.removeClass("ui-tabs-loading"),u.removeAttr("aria-busy"),e===r.xhr&&delete r.xhr},1)}))},_ajaxSettings:function(t,n,r){var i=this;return{url:t.attr("href"),beforeSend:function(t,s){return i._trigger("beforeLoad",n,e.extend({jqXHR:t,ajaxSettings:s},r))}}},_getPanelForTab:function(t){var n=e(t).attr("aria-controls");return this.element.find(this._sanitizeSelector("#"+n))}}),e.uiBackCompat!==!1&&(e.ui.tabs.prototype._ui=function(e,t){return{tab:e,panel:t,index:this.anchors.index(e)}},e.widget("ui.tabs",e.ui.tabs,{url:function(e,t){this.anchors.eq(e).attr("href",t)}}),e.widget("ui.tabs",e.ui.tabs,{options:{ajaxOptions:null,cache:!1},_create:function(){this._super();var t=this;this._on({tabsbeforeload:function(n,r){if(e.data(r.tab[0],"cache.tabs")){n.preventDefault();return}r.jqXHR.success(function(){t.options.cache&&e.data(r.tab[0],"cache.tabs",!0)})}})},_ajaxSettings:function(t,n,r){var i=this.options.ajaxOptions;return e.extend({},i,{error:function(e,t){try{i.error(e,t,r.tab.closest("li").index(),r.tab[0])}catch(n){}}},this._superApply(arguments))},_setOption:function(e,t){e==="cache"&&t===!1&&this.anchors.removeData("cache.tabs"),this._super(e,t)},_destroy:function(){this.anchors.removeData("cache.tabs"),this._super()},url:function(e){this.anchors.eq(e).removeData("cache.tabs"),this._superApply(arguments)}}),e.widget("ui.tabs",e.ui.tabs,{abort:function(){this.xhr&&this.xhr.abort()}}),e.widget("ui.tabs",e.ui.tabs,{options:{spinner:"<em>Loading&#8230;</em>"},_create:function(){this._super(),this._on({tabsbeforeload:function(e,t){if(e.target!==this.element[0]||!this.options.spinner)return;var n=t.tab.find("span"),r=n.html();n.html(this.options.spinner),t.jqXHR.complete(function(){n.html(r)})}})}}),e.widget("ui.tabs",e.ui.tabs,{options:{enable:null,disable:null},enable:function(t){var n=this.options,r;if(t&&n.disabled===!0||e.isArray(n.disabled)&&e.inArray(t,n.disabled)!==-1)r=!0;this._superApply(arguments),r&&this._trigger("enable",null,this._ui(this.anchors[t],this.panels[t]))},disable:function(t){var n=this.options,r;if(t&&n.disabled===!1||e.isArray(n.disabled)&&e.inArray(t,n.disabled)===-1)r=!0;this._superApply(arguments),r&&this._trigger("disable",null,this._ui(this.anchors[t],this.panels[t]))}}),e.widget("ui.tabs",e.ui.tabs,{options:{add:null,remove:null,tabTemplate:"<li><a href='#{href}'><span>#{label}</span></a></li>"},add:function(n,r,i){i===t&&(i=this.anchors.length);var s,o,u=this.options,a=e(u.tabTemplate.replace(/#\{href\}/g,n).replace(/#\{label\}/g,r)),f=n.indexOf("#")?this._tabId(a):n.replace("#","");return a.addClass("ui-state-default ui-corner-top").data("ui-tabs-destroy",!0),a.attr("aria-controls",f),s=i>=this.tabs.length,o=this.element.find("#"+f),o.length||(o=this._createPanel(f),s?i>0?o.insertAfter(this.panels.eq(-1)):o.appendTo(this.element):o.insertBefore(this.panels[i])),o.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").hide(),s?a.appendTo(this.tablist):a.insertBefore(this.tabs[i]),u.disabled=e.map(u.disabled,function(e){return e>=i?++e:e}),this.refresh(),this.tabs.length===1&&u.active===!1&&this.option("active",0),this._trigger("add",null,this._ui(this.anchors[i],this.panels[i])),this},remove:function(t){t=this._getIndex(t);var n=this.options,r=this.tabs.eq(t).remove(),i=this._getPanelForTab(r).remove();return r.hasClass("ui-tabs-active")&&this.anchors.length>2&&this._activate(t+(t+1<this.anchors.length?1:-1)),n.disabled=e.map(e.grep(n.disabled,function(e){return e!==t}),function(e){return e>=t?--e:e}),this.refresh(),this._trigger("remove",null,this._ui(r.find("a")[0],i[0])),this}}),e.widget("ui.tabs",e.ui.tabs,{length:function(){return this.anchors.length}}),e.widget("ui.tabs",e.ui.tabs,{options:{idPrefix:"ui-tabs-"},_tabId:function(t){var n=t.is("li")?t.find("a[href]"):t;return n=n[0],e(n).closest("li").attr("aria-controls")||n.title&&n.title.replace(/\s/g,"_").replace(/[^\w\u00c0-\uFFFF\-]/g,"")||this.options.idPrefix+i()}}),e.widget("ui.tabs",e.ui.tabs,{options:{panelTemplate:"<div></div>"},_createPanel:function(t){return e(this.options.panelTemplate).attr("id",t).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy",!0)}}),e.widget("ui.tabs",e.ui.tabs,{_create:function(){var e=this.options;e.active===null&&e.selected!==t&&(e.active=e.selected===-1?!1:e.selected),this._super(),e.selected=e.active,e.selected===!1&&(e.selected=-1)},_setOption:function(e,t){if(e!=="selected")return this._super(e,t);var n=this.options;this._super("active",t===-1?!1:t),n.selected=n.active,n.selected===!1&&(n.selected=-1)},_eventHandler:function(){this._superApply(arguments),this.options.selected=this.options.active,this.options.selected===!1&&(this.options.selected=-1)}}),e.widget("ui.tabs",e.ui.tabs,{options:{show:null,select:null},_create:function(){this._super(),this.options.active!==!1&&this._trigger("show",null,this._ui(this.active.find(".ui-tabs-anchor")[0],this._getPanelForTab(this.active)[0]))},_trigger:function(e,t,n){var r=this._superApply(arguments);return r?(e==="beforeActivate"&&n.newTab.length?r=this._super("select",t,{tab:n.newTab.find(".ui-tabs-anchor")[0],panel:n.newPanel[0],index:n.newTab.closest("li").index()}):e==="activate"&&n.newTab.length&&(r=this._super("show",t,{tab:n.newTab.find(".ui-tabs-anchor")[0],panel:n.newPanel[0],index:n.newTab.closest("li").index()})),r):!1}}),e.widget("ui.tabs",e.ui.tabs,{select:function(e){e=this._getIndex(e);if(e===-1){if(!this.options.collapsible||this.options.selected===-1)return;e=this.options.selected}this.anchors.eq(e).trigger(this.options.event+this.eventNamespace)}}),function(){var t=0;e.widget("ui.tabs",e.ui.tabs,{options:{cookie:null},_create:function(){var e=this.options,t;e.active==null&&e.cookie&&(t=parseInt(this._cookie(),10),t===-1&&(t=!1),e.active=t),this._super()},_cookie:function(n){var r=[this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+ ++t)];return arguments.length&&(r.push(n===!1?-1:n),r.push(this.options.cookie)),e.cookie.apply(null,r)},_refresh:function(){this._super(),this.options.cookie&&this._cookie(this.options.active,this.options.cookie)},_eventHandler:function(){this._superApply(arguments),this.options.cookie&&this._cookie(this.options.active,this.options.cookie)},_destroy:function(){this._super(),this.options.cookie&&this._cookie(null,this.options.cookie)}})}(),e.widget("ui.tabs",e.ui.tabs,{_trigger:function(t,n,r){var i=e.extend({},r);return t==="load"&&(i.panel=i.panel[0],i.tab=i.tab.find(".ui-tabs-anchor")[0]),this._super(t,n,i)}}),e.widget("ui.tabs",e.ui.tabs,{options:{fx:null},_getFx:function(){var t,n,r=this.options.fx;return r&&(e.isArray(r)?(t=r[0],n=r[1]):t=n=r),r?{show:n,hide:t}:null},_toggle:function(e,t){function o(){n.running=!1,n._trigger("activate",e,t)}function u(){t.newTab.closest("li").addClass("ui-tabs-active ui-state-active"),r.length&&s.show?r.animate(s.show,s.show.duration,function(){o()}):(r.show(),o())}var n=this,r=t.newPanel,i=t.oldPanel,s=this._getFx();if(!s)return this._super(e,t);n.running=!0,i.length&&s.hide?i.animate(s.hide,s.hide.duration,function(){t.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),u()}):(t.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),i.hide(),u())}}))})(jQuery);(function(e){function n(t,n){var r=(t.attr("aria-describedby")||"").split(/\s+/);r.push(n),t.data("ui-tooltip-id",n).attr("aria-describedby",e.trim(r.join(" ")))}function r(t){var n=t.data("ui-tooltip-id"),r=(t.attr("aria-describedby")||"").split(/\s+/),i=e.inArray(n,r);i!==-1&&r.splice(i,1),t.removeData("ui-tooltip-id"),r=e.trim(r.join(" ")),r?t.attr("aria-describedby",r):t.removeAttr("aria-describedby")}var t=0;e.widget("ui.tooltip",{version:"1.9.1",options:{content:function(){return e(this).attr("title")},hide:!0,items:"[title]:not([disabled])",position:{my:"left top+15",at:"left bottom",collision:"flipfit flipfit"},show:!0,tooltipClass:null,track:!1,close:null,open:null},_create:function(){this._on({mouseover:"open",focusin:"open"}),this.tooltips={},this.parents={},this.options.disabled&&this._disable()},_setOption:function(t,n){var r=this;if(t==="disabled"){this[n?"_disable":"_enable"](),this.options[t]=n;return}this._super(t,n),t==="content"&&e.each(this.tooltips,function(e,t){r._updateContent(t)})},_disable:function(){var t=this;e.each(this.tooltips,function(n,r){var i=e.Event("blur");i.target=i.currentTarget=r[0],t.close(i,!0)}),this.element.find(this.options.items).andSelf().each(function(){var t=e(this);t.is("[title]")&&t.data("ui-tooltip-title",t.attr("title")).attr("title","")})},_enable:function(){this.element.find(this.options.items).andSelf().each(function(){var t=e(this);t.data("ui-tooltip-title")&&t.attr("title",t.data("ui-tooltip-title"))})},open:function(t){var n=this,r=e(t?t.target:this.element).closest(this.options.items);if(!r.length)return;if(this.options.track&&r.data("ui-tooltip-id")){this._find(r).position(e.extend({of:r},this.options.position)),this._off(this.document,"mousemove");return}r.attr("title")&&r.data("ui-tooltip-title",r.attr("title")),r.data("tooltip-open",!0),t&&t.type==="mouseover"&&r.parents().each(function(){var t;e(this).data("tooltip-open")&&(t=e.Event("blur"),t.target=t.currentTarget=this,n.close(t,!0)),this.title&&(e(this).uniqueId(),n.parents[this.id]={element:this,title:this.title},this.title="")}),this._updateContent(r,t)},_updateContent:function(e,t){var n,r=this.options.content,i=this;if(typeof r=="string")return this._open(t,e,r);n=r.call(e[0],function(n){if(!e.data("tooltip-open"))return;i._delay(function(){this._open(t,e,n)})}),n&&this._open(t,e,n)},_open:function(t,r,i){function f(e){a.of=e;if(s.is(":hidden"))return;s.position(a)}var s,o,u,a=e.extend({},this.options.position);if(!i)return;s=this._find(r);if(s.length){s.find(".ui-tooltip-content").html(i);return}r.is("[title]")&&(t&&t.type==="mouseover"?r.attr("title",""):r.removeAttr("title")),s=this._tooltip(r),n(r,s.attr("id")),s.find(".ui-tooltip-content").html(i),this.options.track&&t&&/^mouse/.test(t.originalEvent.type)?(this._on(this.document,{mousemove:f}),f(t)):s.position(e.extend({of:r},this.options.position)),s.hide(),this._show(s,this.options.show),this.options.show&&this.options.show.delay&&(u=setInterval(function(){s.is(":visible")&&(f(a.of),clearInterval(u))},e.fx.interval)),this._trigger("open",t,{tooltip:s}),o={keyup:function(t){if(t.keyCode===e.ui.keyCode.ESCAPE){var n=e.Event(t);n.currentTarget=r[0],this.close(n,!0)}},remove:function(){this._removeTooltip(s)}};if(!t||t.type==="mouseover")o.mouseleave="close";if(!t||t.type==="focusin")o.focusout="close";this._on(r,o)},close:function(t){var n=this,i=e(t?t.currentTarget:this.element),s=this._find(i);if(this.closing)return;i.data("ui-tooltip-title")&&i.attr("title",i.data("ui-tooltip-title")),r(i),s.stop(!0),this._hide(s,this.options.hide,function(){n._removeTooltip(e(this))}),i.removeData("tooltip-open"),this._off(i,"mouseleave focusout keyup"),i[0]!==this.element[0]&&this._off(i,"remove"),this._off(this.document,"mousemove"),t&&t.type==="mouseleave"&&e.each(this.parents,function(e,t){t.element.title=t.title,delete n.parents[e]}),this.closing=!0,this._trigger("close",t,{tooltip:s}),this.closing=!1},_tooltip:function(n){var r="ui-tooltip-"+t++,i=e("<div>").attr({id:r,role:"tooltip"}).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content "+(this.options.tooltipClass||""));return e("<div>").addClass("ui-tooltip-content").appendTo(i),i.appendTo(this.document[0].body),e.fn.bgiframe&&i.bgiframe(),this.tooltips[r]=n,i},_find:function(t){var n=t.data("ui-tooltip-id");return n?e("#"+n):e()},_removeTooltip:function(e){e.remove(),delete this.tooltips[e.attr("id")]},_destroy:function(){var t=this;e.each(this.tooltips,function(n,r){var i=e.Event("blur");i.target=i.currentTarget=r[0],t.close(i,!0),e("#"+n).remove(),r.data("ui-tooltip-title")&&(r.attr("title",r.data("ui-tooltip-title")),r.removeData("ui-tooltip-title"))})}})})(jQuery);jQuery.effects||function(e,t){var n=e.uiBackCompat!==!1,r="ui-effects-";e.effects={effect:{}},function(t,n){function p(e,t,n){var r=a[t.type]||{};return e==null?n||!t.def?null:t.def:(e=r.floor?~~e:parseFloat(e),isNaN(e)?t.def:r.mod?(e+r.mod)%r.mod:0>e?0:r.max<e?r.max:e)}function d(e){var n=o(),r=n._rgba=[];return e=e.toLowerCase(),h(s,function(t,i){var s,o=i.re.exec(e),a=o&&i.parse(o),f=i.space||"rgba";if(a)return s=n[f](a),n[u[f].cache]=s[u[f].cache],r=n._rgba=s._rgba,!1}),r.length?(r.join()==="0,0,0,0"&&t.extend(r,c.transparent),n):c[e]}function v(e,t,n){return n=(n+1)%1,n*6<1?e+(t-e)*n*6:n*2<1?t:n*3<2?e+(t-e)*(2/3-n)*6:e}var r="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor".split(" "),i=/^([\-+])=\s*(\d+\.?\d*)/,s=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,parse:function(e){return[e[1],e[2],e[3],e[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,parse:function(e){return[e[1]*2.55,e[2]*2.55,e[3]*2.55,e[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(e){return[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(e){return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(e){return[e[1],e[2]/100,e[3]/100,e[4]]}}],o=t.Color=function(e,n,r,i){return new t.Color.fn.parse(e,n,r,i)},u={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},a={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},f=o.support={},l=t("<p>")[0],c,h=t.each;l.style.cssText="background-color:rgba(1,1,1,.5)",f.rgba=l.style.backgroundColor.indexOf("rgba")>-1,h(u,function(e,t){t.cache="_"+e,t.props.alpha={idx:3,type:"percent",def:1}}),o.fn=t.extend(o.prototype,{parse:function(r,i,s,a){if(r===n)return this._rgba=[null,null,null,null],this;if(r.jquery||r.nodeType)r=t(r).css(i),i=n;var f=this,l=t.type(r),v=this._rgba=[];i!==n&&(r=[r,i,s,a],l="array");if(l==="string")return this.parse(d(r)||c._default);if(l==="array")return h(u.rgba.props,function(e,t){v[t.idx]=p(r[t.idx],t)}),this;if(l==="object")return r instanceof o?h(u,function(e,t){r[t.cache]&&(f[t.cache]=r[t.cache].slice())}):h(u,function(t,n){var i=n.cache;h(n.props,function(e,t){if(!f[i]&&n.to){if(e==="alpha"||r[e]==null)return;f[i]=n.to(f._rgba)}f[i][t.idx]=p(r[e],t,!0)}),f[i]&&e.inArray(null,f[i].slice(0,3))<0&&(f[i][3]=1,n.from&&(f._rgba=n.from(f[i])))}),this},is:function(e){var t=o(e),n=!0,r=this;return h(u,function(e,i){var s,o=t[i.cache];return o&&(s=r[i.cache]||i.to&&i.to(r._rgba)||[],h(i.props,function(e,t){if(o[t.idx]!=null)return n=o[t.idx]===s[t.idx],n})),n}),n},_space:function(){var e=[],t=this;return h(u,function(n,r){t[r.cache]&&e.push(n)}),e.pop()},transition:function(e,t){var n=o(e),r=n._space(),i=u[r],s=this.alpha()===0?o("transparent"):this,f=s[i.cache]||i.to(s._rgba),l=f.slice();return n=n[i.cache],h(i.props,function(e,r){var i=r.idx,s=f[i],o=n[i],u=a[r.type]||{};if(o===null)return;s===null?l[i]=o:(u.mod&&(o-s>u.mod/2?s+=u.mod:s-o>u.mod/2&&(s-=u.mod)),l[i]=p((o-s)*t+s,r))}),this[r](l)},blend:function(e){if(this._rgba[3]===1)return this;var n=this._rgba.slice(),r=n.pop(),i=o(e)._rgba;return o(t.map(n,function(e,t){return(1-r)*i[t]+r*e}))},toRgbaString:function(){var e="rgba(",n=t.map(this._rgba,function(e,t){return e==null?t>2?1:0:e});return n[3]===1&&(n.pop(),e="rgb("),e+n.join()+")"},toHslaString:function(){var e="hsla(",n=t.map(this.hsla(),function(e,t){return e==null&&(e=t>2?1:0),t&&t<3&&(e=Math.round(e*100)+"%"),e});return n[3]===1&&(n.pop(),e="hsl("),e+n.join()+")"},toHexString:function(e){var n=this._rgba.slice(),r=n.pop();return e&&n.push(~~(r*255)),"#"+t.map(n,function(e){return e=(e||0).toString(16),e.length===1?"0"+e:e}).join("")},toString:function(){return this._rgba[3]===0?"transparent":this.toRgbaString()}}),o.fn.parse.prototype=o.fn,u.hsla.to=function(e){if(e[0]==null||e[1]==null||e[2]==null)return[null,null,null,e[3]];var t=e[0]/255,n=e[1]/255,r=e[2]/255,i=e[3],s=Math.max(t,n,r),o=Math.min(t,n,r),u=s-o,a=s+o,f=a*.5,l,c;return o===s?l=0:t===s?l=60*(n-r)/u+360:n===s?l=60*(r-t)/u+120:l=60*(t-n)/u+240,f===0||f===1?c=f:f<=.5?c=u/a:c=u/(2-a),[Math.round(l)%360,c,f,i==null?1:i]},u.hsla.from=function(e){if(e[0]==null||e[1]==null||e[2]==null)return[null,null,null,e[3]];var t=e[0]/360,n=e[1],r=e[2],i=e[3],s=r<=.5?r*(1+n):r+n-r*n,o=2*r-s;return[Math.round(v(o,s,t+1/3)*255),Math.round(v(o,s,t)*255),Math.round(v(o,s,t-1/3)*255),i]},h(u,function(e,r){var s=r.props,u=r.cache,a=r.to,f=r.from;o.fn[e]=function(e){a&&!this[u]&&(this[u]=a(this._rgba));if(e===n)return this[u].slice();var r,i=t.type(e),l=i==="array"||i==="object"?e:arguments,c=this[u].slice();return h(s,function(e,t){var n=l[i==="object"?e:t.idx];n==null&&(n=c[t.idx]),c[t.idx]=p(n,t)}),f?(r=o(f(c)),r[u]=c,r):o(c)},h(s,function(n,r){if(o.fn[n])return;o.fn[n]=function(s){var o=t.type(s),u=n==="alpha"?this._hsla?"hsla":"rgba":e,a=this[u](),f=a[r.idx],l;return o==="undefined"?f:(o==="function"&&(s=s.call(this,f),o=t.type(s)),s==null&&r.empty?this:(o==="string"&&(l=i.exec(s),l&&(s=f+parseFloat(l[2])*(l[1]==="+"?1:-1))),a[r.idx]=s,this[u](a)))}})}),h(r,function(e,n){t.cssHooks[n]={set:function(e,r){var i,s,u="";if(t.type(r)!=="string"||(i=d(r))){r=o(i||r);if(!f.rgba&&r._rgba[3]!==1){s=n==="backgroundColor"?e.parentNode:e;while((u===""||u==="transparent")&&s&&s.style)try{u=t.css(s,"backgroundColor"),s=s.parentNode}catch(a){}r=r.blend(u&&u!=="transparent"?u:"_default")}r=r.toRgbaString()}try{e.style[n]=r}catch(l){}}},t.fx.step[n]=function(e){e.colorInit||(e.start=o(e.elem,n),e.end=o(e.end),e.colorInit=!0),t.cssHooks[n].set(e.elem,e.start.transition(e.end,e.pos))}}),t.cssHooks.borderColor={expand:function(e){var t={};return h(["Top","Right","Bottom","Left"],function(n,r){t["border"+r+"Color"]=e}),t}},c=t.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(jQuery),function(){function i(){var t=this.ownerDocument.defaultView?this.ownerDocument.defaultView.getComputedStyle(this,null):this.currentStyle,n={},r,i;if(t&&t.length&&t[0]&&t[t[0]]){i=t.length;while(i--)r=t[i],typeof t[r]=="string"&&(n[e.camelCase(r)]=t[r])}else for(r in t)typeof t[r]=="string"&&(n[r]=t[r]);return n}function s(t,n){var i={},s,o;for(s in n)o=n[s],t[s]!==o&&!r[s]&&(e.fx.step[s]||!isNaN(parseFloat(o)))&&(i[s]=o);return i}var n=["add","remove","toggle"],r={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};e.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(t,n){e.fx.step[n]=function(e){if(e.end!=="none"&&!e.setAttr||e.pos===1&&!e.setAttr)jQuery.style(e.elem,n,e.end),e.setAttr=!0}}),e.effects.animateClass=function(t,r,o,u){var a=e.speed(r,o,u);return this.queue(function(){var r=e(this),o=r.attr("class")||"",u,f=a.children?r.find("*").andSelf():r;f=f.map(function(){var t=e(this);return{el:t,start:i.call(this)}}),u=function(){e.each(n,function(e,n){t[n]&&r[n+"Class"](t[n])})},u(),f=f.map(function(){return this.end=i.call(this.el[0]),this.diff=s(this.start,this.end),this}),r.attr("class",o),f=f.map(function(){var t=this,n=e.Deferred(),r=jQuery.extend({},a,{queue:!1,complete:function(){n.resolve(t)}});return this.el.animate(this.diff,r),n.promise()}),e.when.apply(e,f.get()).done(function(){u(),e.each(arguments,function(){var t=this.el;e.each(this.diff,function(e){t.css(e,"")})}),a.complete.call(r[0])})})},e.fn.extend({_addClass:e.fn.addClass,addClass:function(t,n,r,i){return n?e.effects.animateClass.call(this,{add:t},n,r,i):this._addClass(t)},_removeClass:e.fn.removeClass,removeClass:function(t,n,r,i){return n?e.effects.animateClass.call(this,{remove:t},n,r,i):this._removeClass(t)},_toggleClass:e.fn.toggleClass,toggleClass:function(n,r,i,s,o){return typeof r=="boolean"||r===t?i?e.effects.animateClass.call(this,r?{add:n}:{remove:n},i,s,o):this._toggleClass(n,r):e.effects.animateClass.call(this,{toggle:n},r,i,s)},switchClass:function(t,n,r,i,s){return e.effects.animateClass.call(this,{add:n,remove:t},r,i,s)}})}(),function(){function i(t,n,r,i){e.isPlainObject(t)&&(n=t,t=t.effect),t={effect:t},n==null&&(n={}),e.isFunction(n)&&(i=n,r=null,n={});if(typeof n=="number"||e.fx.speeds[n])i=r,r=n,n={};return e.isFunction(r)&&(i=r,r=null),n&&e.extend(t,n),r=r||n.duration,t.duration=e.fx.off?0:typeof r=="number"?r:r in e.fx.speeds?e.fx.speeds[r]:e.fx.speeds._default,t.complete=i||n.complete,t}function s(t){return!t||typeof t=="number"||e.fx.speeds[t]?!0:typeof t=="string"&&!e.effects.effect[t]?n&&e.effects[t]?!1:!0:!1}e.extend(e.effects,{version:"1.9.1",save:function(e,t){for(var n=0;n<t.length;n++)t[n]!==null&&e.data(r+t[n],e[0].style[t[n]])},restore:function(e,n){var i,s;for(s=0;s<n.length;s++)n[s]!==null&&(i=e.data(r+n[s]),i===t&&(i=""),e.css(n[s],i))},setMode:function(e,t){return t==="toggle"&&(t=e.is(":hidden")?"show":"hide"),t},getBaseline:function(e,t){var n,r;switch(e[0]){case"top":n=0;break;case"middle":n=.5;break;case"bottom":n=1;break;default:n=e[0]/t.height}switch(e[1]){case"left":r=0;break;case"center":r=.5;break;case"right":r=1;break;default:r=e[1]/t.width}return{x:r,y:n}},createWrapper:function(t){if(t.parent().is(".ui-effects-wrapper"))return t.parent();var n={width:t.outerWidth(!0),height:t.outerHeight(!0),"float":t.css("float")},r=e("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),i={width:t.width(),height:t.height()},s=document.activeElement;try{s.id}catch(o){s=document.body}return t.wrap(r),(t[0]===s||e.contains(t[0],s))&&e(s).focus(),r=t.parent(),t.css("position")==="static"?(r.css({position:"relative"}),t.css({position:"relative"})):(e.extend(n,{position:t.css("position"),zIndex:t.css("z-index")}),e.each(["top","left","bottom","right"],function(e,r){n[r]=t.css(r),isNaN(parseInt(n[r],10))&&(n[r]="auto")}),t.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),t.css(i),r.css(n).show()},removeWrapper:function(t){var n=document.activeElement;return t.parent().is(".ui-effects-wrapper")&&(t.parent().replaceWith(t),(t[0]===n||e.contains(t[0],n))&&e(n).focus()),t},setTransition:function(t,n,r,i){return i=i||{},e.each(n,function(e,n){var s=t.cssUnit(n);s[0]>0&&(i[n]=s[0]*r+s[1])}),i}}),e.fn.extend({effect:function(){function a(n){function u(){e.isFunction(i)&&i.call(r[0]),e.isFunction(n)&&n()}var r=e(this),i=t.complete,s=t.mode;(r.is(":hidden")?s==="hide":s==="show")?u():o.call(r[0],t,u)}var t=i.apply(this,arguments),r=t.mode,s=t.queue,o=e.effects.effect[t.effect],u=!o&&n&&e.effects[t.effect];return e.fx.off||!o&&!u?r?this[r](t.duration,t.complete):this.each(function(){t.complete&&t.complete.call(this)}):o?s===!1?this.each(a):this.queue(s||"fx",a):u.call(this,{options:t,duration:t.duration,callback:t.complete,mode:t.mode})},_show:e.fn.show,show:function(e){if(s(e))return this._show.apply(this,arguments);var t=i.apply(this,arguments);return t.mode="show",this.effect.call(this,t)},_hide:e.fn.hide,hide:function(e){if(s(e))return this._hide.apply(this,arguments);var t=i.apply(this,arguments);return t.mode="hide",this.effect.call(this,t)},__toggle:e.fn.toggle,toggle:function(t){if(s(t)||typeof t=="boolean"||e.isFunction(t))return this.__toggle.apply(this,arguments);var n=i.apply(this,arguments);return n.mode="toggle",this.effect.call(this,n)},cssUnit:function(t){var n=this.css(t),r=[];return e.each(["em","px","%","pt"],function(e,t){n.indexOf(t)>0&&(r=[parseFloat(n),t])}),r}})}(),function(){var t={};e.each(["Quad","Cubic","Quart","Quint","Expo"],function(e,n){t[n]=function(t){return Math.pow(t,e+2)}}),e.extend(t,{Sine:function(e){return 1-Math.cos(e*Math.PI/2)},Circ:function(e){return 1-Math.sqrt(1-e*e)},Elastic:function(e){return e===0||e===1?e:-Math.pow(2,8*(e-1))*Math.sin(((e-1)*80-7.5)*Math.PI/15)},Back:function(e){return e*e*(3*e-2)},Bounce:function(e){var t,n=4;while(e<((t=Math.pow(2,--n))-1)/11);return 1/Math.pow(4,3-n)-7.5625*Math.pow((t*3-2)/22-e,2)}}),e.each(t,function(t,n){e.easing["easeIn"+t]=n,e.easing["easeOut"+t]=function(e){return 1-n(1-e)},e.easing["easeInOut"+t]=function(e){return e<.5?n(e*2)/2:1-n(e*-2+2)/2}})}()}(jQuery);(function(e,t){var n=/up|down|vertical/,r=/up|left|vertical|horizontal/;e.effects.effect.blind=function(t,i){var s=e(this),o=["position","top","bottom","left","right","height","width"],u=e.effects.setMode(s,t.mode||"hide"),a=t.direction||"up",f=n.test(a),l=f?"height":"width",c=f?"top":"left",h=r.test(a),p={},d=u==="show",v,m,g;s.parent().is(".ui-effects-wrapper")?e.effects.save(s.parent(),o):e.effects.save(s,o),s.show(),v=e.effects.createWrapper(s).css({overflow:"hidden"}),m=v[l](),g=parseFloat(v.css(c))||0,p[l]=d?m:0,h||(s.css(f?"bottom":"right",0).css(f?"top":"left","auto").css({position:"absolute"}),p[c]=d?g:m+g),d&&(v.css(l,0),h||v.css(c,g+m)),v.animate(p,{duration:t.duration,easing:t.easing,queue:!1,complete:function(){u==="hide"&&s.hide(),e.effects.restore(s,o),e.effects.removeWrapper(s),i()}})}})(jQuery);(function(e,t){e.effects.effect.bounce=function(t,n){var r=e(this),i=["position","top","bottom","left","right","height","width"],s=e.effects.setMode(r,t.mode||"effect"),o=s==="hide",u=s==="show",a=t.direction||"up",f=t.distance,l=t.times||5,c=l*2+(u||o?1:0),h=t.duration/c,p=t.easing,d=a==="up"||a==="down"?"top":"left",v=a==="up"||a==="left",m,g,y,b=r.queue(),w=b.length;(u||o)&&i.push("opacity"),e.effects.save(r,i),r.show(),e.effects.createWrapper(r),f||(f=r[d==="top"?"outerHeight":"outerWidth"]()/3),u&&(y={opacity:1},y[d]=0,r.css("opacity",0).css(d,v?-f*2:f*2).animate(y,h,p)),o&&(f/=Math.pow(2,l-1)),y={},y[d]=0;for(m=0;m<l;m++)g={},g[d]=(v?"-=":"+=")+f,r.animate(g,h,p).animate(y,h,p),f=o?f*2:f/2;o&&(g={opacity:0},g[d]=(v?"-=":"+=")+f,r.animate(g,h,p)),r.queue(function(){o&&r.hide(),e.effects.restore(r,i),e.effects.removeWrapper(r),n()}),w>1&&b.splice.apply(b,[1,0].concat(b.splice(w,c+1))),r.dequeue()}})(jQuery);(function(e,t){e.effects.effect.clip=function(t,n){var r=e(this),i=["position","top","bottom","left","right","height","width"],s=e.effects.setMode(r,t.mode||"hide"),o=s==="show",u=t.direction||"vertical",a=u==="vertical",f=a?"height":"width",l=a?"top":"left",c={},h,p,d;e.effects.save(r,i),r.show(),h=e.effects.createWrapper(r).css({overflow:"hidden"}),p=r[0].tagName==="IMG"?h:r,d=p[f](),o&&(p.css(f,0),p.css(l,d/2)),c[f]=o?d:0,c[l]=o?0:d/2,p.animate(c,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){o||r.hide(),e.effects.restore(r,i),e.effects.removeWrapper(r),n()}})}})(jQuery);(function(e,t){e.effects.effect.drop=function(t,n){var r=e(this),i=["position","top","bottom","left","right","opacity","height","width"],s=e.effects.setMode(r,t.mode||"hide"),o=s==="show",u=t.direction||"left",a=u==="up"||u==="down"?"top":"left",f=u==="up"||u==="left"?"pos":"neg",l={opacity:o?1:0},c;e.effects.save(r,i),r.show(),e.effects.createWrapper(r),c=t.distance||r[a==="top"?"outerHeight":"outerWidth"](!0)/2,o&&r.css("opacity",0).css(a,f==="pos"?-c:c),l[a]=(o?f==="pos"?"+=":"-=":f==="pos"?"-=":"+=")+c,r.animate(l,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){s==="hide"&&r.hide(),e.effects.restore(r,i),e.effects.removeWrapper(r),n()}})}})(jQuery);(function(e,t){e.effects.effect.explode=function(t,n){function y(){c.push(this),c.length===r*i&&b()}function b(){s.css({visibility:"visible"}),e(c).remove(),u||s.hide(),n()}var r=t.pieces?Math.round(Math.sqrt(t.pieces)):3,i=r,s=e(this),o=e.effects.setMode(s,t.mode||"hide"),u=o==="show",a=s.show().css("visibility","hidden").offset(),f=Math.ceil(s.outerWidth()/i),l=Math.ceil(s.outerHeight()/r),c=[],h,p,d,v,m,g;for(h=0;h<r;h++){v=a.top+h*l,g=h-(r-1)/2;for(p=0;p<i;p++)d=a.left+p*f,m=p-(i-1)/2,s.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-p*f,top:-h*l}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:f,height:l,left:d+(u?m*f:0),top:v+(u?g*l:0),opacity:u?0:1}).animate({left:d+(u?0:m*f),top:v+(u?0:g*l),opacity:u?1:0},t.duration||500,t.easing,y)}}})(jQuery);(function(e,t){e.effects.effect.fade=function(t,n){var r=e(this),i=e.effects.setMode(r,t.mode||"toggle");r.animate({opacity:i},{queue:!1,duration:t.duration,easing:t.easing,complete:n})}})(jQuery);(function(e,t){e.effects.effect.fold=function(t,n){var r=e(this),i=["position","top","bottom","left","right","height","width"],s=e.effects.setMode(r,t.mode||"hide"),o=s==="show",u=s==="hide",a=t.size||15,f=/([0-9]+)%/.exec(a),l=!!t.horizFirst,c=o!==l,h=c?["width","height"]:["height","width"],p=t.duration/2,d,v,m={},g={};e.effects.save(r,i),r.show(),d=e.effects.createWrapper(r).css({overflow:"hidden"}),v=c?[d.width(),d.height()]:[d.height(),d.width()],f&&(a=parseInt(f[1],10)/100*v[u?0:1]),o&&d.css(l?{height:0,width:a}:{height:a,width:0}),m[h[0]]=o?v[0]:a,g[h[1]]=o?v[1]:0,d.animate(m,p,t.easing).animate(g,p,t.easing,function(){u&&r.hide(),e.effects.restore(r,i),e.effects.removeWrapper(r),n()})}})(jQuery);(function(e,t){e.effects.effect.highlight=function(t,n){var r=e(this),i=["backgroundImage","backgroundColor","opacity"],s=e.effects.setMode(r,t.mode||"show"),o={backgroundColor:r.css("backgroundColor")};s==="hide"&&(o.opacity=0),e.effects.save(r,i),r.show().css({backgroundImage:"none",backgroundColor:t.color||"#ffff99"}).animate(o,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){s==="hide"&&r.hide(),e.effects.restore(r,i),n()}})}})(jQuery);(function(e,t){e.effects.effect.pulsate=function(t,n){var r=e(this),i=e.effects.setMode(r,t.mode||"show"),s=i==="show",o=i==="hide",u=s||i==="hide",a=(t.times||5)*2+(u?1:0),f=t.duration/a,l=0,c=r.queue(),h=c.length,p;if(s||!r.is(":visible"))r.css("opacity",0).show(),l=1;for(p=1;p<a;p++)r.animate({opacity:l},f,t.easing),l=1-l;r.animate({opacity:l},f,t.easing),r.queue(function(){o&&r.hide(),n()}),h>1&&c.splice.apply(c,[1,0].concat(c.splice(h,a+1))),r.dequeue()}})(jQuery);(function(e,t){e.effects.effect.puff=function(t,n){var r=e(this),i=e.effects.setMode(r,t.mode||"hide"),s=i==="hide",o=parseInt(t.percent,10)||150,u=o/100,a={height:r.height(),width:r.width()};e.extend(t,{effect:"scale",queue:!1,fade:!0,mode:i,complete:n,percent:s?o:100,from:s?a:{height:a.height*u,width:a.width*u}}),r.effect(t)},e.effects.effect.scale=function(t,n){var r=e(this),i=e.extend(!0,{},t),s=e.effects.setMode(r,t.mode||"effect"),o=parseInt(t.percent,10)||(parseInt(t.percent,10)===0?0:s==="hide"?0:100),u=t.direction||"both",a=t.origin,f={height:r.height(),width:r.width(),outerHeight:r.outerHeight(),outerWidth:r.outerWidth()},l={y:u!=="horizontal"?o/100:1,x:u!=="vertical"?o/100:1};i.effect="size",i.queue=!1,i.complete=n,s!=="effect"&&(i.origin=a||["middle","center"],i.restore=!0),i.from=t.from||(s==="show"?{height:0,width:0}:f),i.to={height:f.height*l.y,width:f.width*l.x,outerHeight:f.outerHeight*l.y,outerWidth:f.outerWidth*l.x},i.fade&&(s==="show"&&(i.from.opacity=0,i.to.opacity=1),s==="hide"&&(i.from.opacity=1,i.to.opacity=0)),r.effect(i)},e.effects.effect.size=function(t,n){var r,i,s,o=e(this),u=["position","top","bottom","left","right","width","height","overflow","opacity"],a=["position","top","bottom","left","right","overflow","opacity"],f=["width","height","overflow"],l=["fontSize"],c=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],h=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],p=e.effects.setMode(o,t.mode||"effect"),d=t.restore||p!=="effect",v=t.scale||"both",m=t.origin||["middle","center"],g=o.css("position"),y=d?u:a,b={height:0,width:0};p==="show"&&o.show(),r={height:o.height(),width:o.width(),outerHeight:o.outerHeight(),outerWidth:o.outerWidth()},t.mode==="toggle"&&p==="show"?(o.from=t.to||b,o.to=t.from||r):(o.from=t.from||(p==="show"?b:r),o.to=t.to||(p==="hide"?b:r)),s={from:{y:o.from.height/r.height,x:o.from.width/r.width},to:{y:o.to.height/r.height,x:o.to.width/r.width}};if(v==="box"||v==="both")s.from.y!==s.to.y&&(y=y.concat(c),o.from=e.effects.setTransition(o,c,s.from.y,o.from),o.to=e.effects.setTransition(o,c,s.to.y,o.to)),s.from.x!==s.to.x&&(y=y.concat(h),o.from=e.effects.setTransition(o,h,s.from.x,o.from),o.to=e.effects.setTransition(o,h,s.to.x,o.to));(v==="content"||v==="both")&&s.from.y!==s.to.y&&(y=y.concat(l).concat(f),o.from=e.effects.setTransition(o,l,s.from.y,o.from),o.to=e.effects.setTransition(o,l,s.to.y,o.to)),e.effects.save(o,y),o.show(),e.effects.createWrapper(o),o.css("overflow","hidden").css(o.from),m&&(i=e.effects.getBaseline(m,r),o.from.top=(r.outerHeight-o.outerHeight())*i.y,o.from.left=(r.outerWidth-o.outerWidth())*i.x,o.to.top=(r.outerHeight-o.to.outerHeight)*i.y,o.to.left=(r.outerWidth-o.to.outerWidth)*i.x),o.css(o.from);if(v==="content"||v==="both")c=c.concat(["marginTop","marginBottom"]).concat(l),h=h.concat(["marginLeft","marginRight"]),f=u.concat(c).concat(h),o.find("*[width]").each(function(){var n=e(this),r={height:n.height(),width:n.width()};d&&e.effects.save(n,f),n.from={height:r.height*s.from.y,width:r.width*s.from.x},n.to={height:r.height*s.to.y,width:r.width*s.to.x},s.from.y!==s.to.y&&(n.from=e.effects.setTransition(n,c,s.from.y,n.from),n.to=e.effects.setTransition(n,c,s.to.y,n.to)),s.from.x!==s.to.x&&(n.from=e.effects.setTransition(n,h,s.from.x,n.from),n.to=e.effects.setTransition(n,h,s.to.x,n.to)),n.css(n.from),n.animate(n.to,t.duration,t.easing,function(){d&&e.effects.restore(n,f)})});o.animate(o.to,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){o.to.opacity===0&&o.css("opacity",o.from.opacity),p==="hide"&&o.hide(),e.effects.restore(o,y),d||(g==="static"?o.css({position:"relative",top:o.to.top,left:o.to.left}):e.each(["top","left"],function(e,t){o.css(t,function(t,n){var r=parseInt(n,10),i=e?o.to.left:o.to.top;return n==="auto"?i+"px":r+i+"px"})})),e.effects.removeWrapper(o),n()}})}})(jQuery);(function(e,t){e.effects.effect.shake=function(t,n){var r=e(this),i=["position","top","bottom","left","right","height","width"],s=e.effects.setMode(r,t.mode||"effect"),o=t.direction||"left",u=t.distance||20,a=t.times||3,f=a*2+1,l=Math.round(t.duration/f),c=o==="up"||o==="down"?"top":"left",h=o==="up"||o==="left",p={},d={},v={},m,g=r.queue(),y=g.length;e.effects.save(r,i),r.show(),e.effects.createWrapper(r),p[c]=(h?"-=":"+=")+u,d[c]=(h?"+=":"-=")+u*2,v[c]=(h?"-=":"+=")+u*2,r.animate(p,l,t.easing);for(m=1;m<a;m++)r.animate(d,l,t.easing).animate(v,l,t.easing);r.animate(d,l,t.easing).animate(p,l/2,t.easing).queue(function(){s==="hide"&&r.hide(),e.effects.restore(r,i),e.effects.removeWrapper(r),n()}),y>1&&g.splice.apply(g,[1,0].concat(g.splice(y,f+1))),r.dequeue()}})(jQuery);(function(e,t){e.effects.effect.slide=function(t,n){var r=e(this),i=["position","top","bottom","left","right","width","height"],s=e.effects.setMode(r,t.mode||"show"),o=s==="show",u=t.direction||"left",a=u==="up"||u==="down"?"top":"left",f=u==="up"||u==="left",l,c={};e.effects.save(r,i),r.show(),l=t.distance||r[a==="top"?"outerHeight":"outerWidth"](!0),e.effects.createWrapper(r).css({overflow:"hidden"}),o&&r.css(a,f?isNaN(l)?"-"+l:-l:l),c[a]=(o?f?"+=":"-=":f?"-=":"+=")+l,r.animate(c,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){s==="hide"&&r.hide(),e.effects.restore(r,i),e.effects.removeWrapper(r),n()}})}})(jQuery);(function(e,t){e.effects.effect.transfer=function(t,n){var r=e(this),i=e(t.to),s=i.css("position")==="fixed",o=e("body"),u=s?o.scrollTop():0,a=s?o.scrollLeft():0,f=i.offset(),l={top:f.top-u,left:f.left-a,height:i.innerHeight(),width:i.innerWidth()},c=r.offset(),h=e('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(t.className).css({top:c.top-u,left:c.left-a,height:r.innerHeight(),width:r.innerWidth(),position:s?"fixed":"absolute"}).animate(l,t.duration,t.easing,function(){h.remove(),n()})}})(jQuery);;
(function() {
  var $, DOWN_ARROW, END, ENTER, ESC, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, Q, RIGHT_ARROW, UP_ARROW, arrows, bindMarkupDiv, bindSlider, chooseSlide, cleanEmptyNodes, closeWindow, countSlide, createNode, delay, getElementCode, handleInternalSections, hideSlide, insertControls, isLeisureCode, jQuery, lastSlide, makeMarkupDiv, makeSection, makeSlideDiv, markupButtons, markupElement, markupSlideContent, markupSlides, mergeLeisureCode, mergeUp, nextSibling, nthSlide, oldSlide, padSlide, presentLeisureCode, previousSibling, remove, showSlide, slideControls, slideKeyListener, slideName, slidePat, slides, sliding, textNode, unwrap, unwrapContent, _,
    __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  jQuery = window.jQuery, $ = window.$, _ = window._;

  ENTER = Notebook.ENTER, delay = Notebook.delay, textNode = Notebook.textNode, createNode = Notebook.createNode, remove = Notebook.remove, unwrap = Notebook.unwrap, insertControls = Notebook.insertControls, cleanEmptyNodes = Notebook.cleanEmptyNodes, isLeisureCode = Notebook.isLeisureCode, getElementCode = Notebook.getElementCode, previousSibling = Notebook.previousSibling, nextSibling = Notebook.nextSibling, presentLeisureCode = Notebook.presentLeisureCode, mergeLeisureCode = Notebook.mergeLeisureCode, closeWindow = Notebook.closeWindow, markupButtons = Notebook.markupButtons, ESC = Notebook.ESC, HOME = Notebook.HOME, END = Notebook.END, PAGE_UP = Notebook.PAGE_UP, PAGE_DOWN = Notebook.PAGE_DOWN, LEFT_ARROW = Notebook.LEFT_ARROW, RIGHT_ARROW = Notebook.RIGHT_ARROW, UP_ARROW = Notebook.UP_ARROW, DOWN_ARROW = Notebook.DOWN_ARROW, arrows = Notebook.arrows;

  Q = 81;

  window.markup = function markup(md) {
    var maindoc, nodes, _ref;
    nodes = document.querySelectorAll('[maindoc]');
    if (nodes.length === 0) {
      maindoc = createNode("<div maindoc></div>");
      document.body.insertBefore(maindoc, document.body.firstChild);
      nodes = [maindoc];
    } else {
      maindoc = nodes[0];
    }
    md = ((_ref = md != null ? md.replace(/\r\n/mg, '\n') : void 0) != null ? _ref : maindoc.innerHTML.replace(/^\s*<!--*/, '').replace(/-->\s*\n*/m, '')).trim();
    document.body.classList.add('hideControls');
    markupSlides(maindoc, md);
    return insertControls(maindoc);
  };

  lastSlide = null;

  if (typeof console !== "undefined" && console !== null) {
    if (typeof console.error === "function") {
      console.error(new Error("Incompatibility: using -webkit-calc").stack);
    }
  }

  slidePat = /^(\*\*\*[^\n]*\n(?:--?\n)?)/m;

  slideName = /^\*\*\*([^\n]*)\n(?:--?\n)?/m;

  sliding = false;

  markupSlides = function markupSlides(el, md) {
    var div, hasCode, slides;
    hasCode = markupSlideContent(el, md);
    slides = el.querySelectorAll('[leisureSection]');
    if (slides.length <= (el.querySelector('[leisureSection="Leisure Controls"]') ? 2 : 1)) {
      document.body.classList.add("oneSlide");
    }
    div = createNode("<div class='slide-controls'>\n  <div id='slide-killbutton' onclick='toggleSlideShow()' style='float: right'><button>Slides</button></div>\n  <div id='slide-num' style='float: right; margin-right: 10px'></div>\n</div>");
    markupButtons(div);
    el.appendChild(div);
    if (location.search && _.find(location.search.slice(1).split('&'), (function(p) {
      return p.match(/^slides=/);
    }))) {
      sliding = true;
      showSlide($(chooseSlide()));
    } else {
      document.body.classList.add('scroll');
    }
    return hasCode;
  };

  markupSlideContent = function markupSlideContent(el, md, noMain) {
    var content, hasCode, i, m, p, pageType, pages, _ref, _ref2;
    pages = md.split(slidePat);
    hasCode = false;
    if (pages.length > 1) {
      console.log("PAGES:", JSON.stringify(pages));
      document.body.classList.add('slide-container');
      el.innerHTML = '';
      bindSlider();
      el.removeAttribute('doc');
      if (pages.length === 3 && !pages[0] && !pages[2]) pages[2] = '\n';
      for (i = 0, _ref = pages.length; i < _ref; i += 2) {
        p = pages[i];
        if (p) {
          pageType = i > 0 ? (m = (_ref2 = pages[i - 1].match(slidePat)) != null ? _ref2[1] : void 0, m.match(/\n-\n/) ? ['continuation', 'hiddenPage'] : m.match(/\n--\n/) ? ['hiddenPage'] : []) : [];
          content = makeSlideDiv(el, pageType, (i > 0 ? pages[i - 1].match(slideName)[1].trim() : 'Main'));
          if (i > 0) {
            hasCode = (markupElement(content, pages[i - 1] + p)) || hasCode;
          } else {
            hasCode = (markupElement(content, '***\n' + p)) || hasCode;
          }
          padSlide(content, (i > 0 ? pages[i - 1] : '***\n'));
        }
      }
    } else {
      content = makeSlideDiv(el, ['page'], 'Main');
      while (el.firstChild !== content.parentNode) {
        content.appendChild(el.firstChild);
      }
      hasCode = markupElement(content, md);
      padSlide(content, '***\n');
      if (noMain) unwrapContent(content);
    }
    return hasCode;
  };

  padSlide = function padSlide(content, header) {
    var div, range;
    if (!content.firstChild || isLeisureCode(content.firstChild)) {
      range = document.createRange();
      range.setStart(content, 0);
      range.setEnd(content, 0);
      div = makeMarkupDiv(range, header);
      div.appendChild(createNode('<br>'));
    }
    if (isLeisureCode(content.lastChild)) {
      range = document.createRange();
      range.setStartAfter(content.lastChild);
      range.setEndAfter(content.lastChild);
      div = makeMarkupDiv(range, '\n');
      return div.appendChild(createNode('<br>'));
    }
  };

  unwrapContent = function unwrapContent(content) {
    var el, section;
    section = content.parentNode;
    el = section.parentNode;
    el.insertBefore(content, section);
    remove(section);
    return unwrap(content);
  };

  makeSlideDiv = function makeSlideDiv(el, pageTypes, title) {
    var content, div, pageType, sectionTitle, _i, _len;
    lastSlide = div = createNode("<div class='leisure_page'></div>");
    div.setAttribute('leisureSection', title);
    div.setAttribute('doc', '');
    div.setAttribute('slide', '');
    div.classList.add('slide');
    div.classList.add('ui-corner-all');
    div.classList.add('ui-widget');
    div.classList.add('ui-widget-content');
    for (_i = 0, _len = pageTypes.length; _i < _len; _i++) {
      pageType = pageTypes[_i];
      div.classList.add(pageType);
    }
    el.appendChild(div);
    sectionTitle = createNode("<div class='pageTitle'>" + title + "</div>");
    sectionTitle.setAttribute('leisureoutput', '');
    div.appendChild(sectionTitle);
    content = createNode("<div class='pageContent'></div>");
    div.appendChild(content);
    return content;
  };

  chooseSlide = function chooseSlide() {
    var param;
    param = _.find(location.search.slice(1).split('&'), (function(p) {
      return p.match(/^slide=.*/);
    }));
    console.log(param);
    if (param) {
      return document.querySelector("[slide='" + (param.split('=')[1]) + "']");
    } else {
      return document.querySelector('[maindoc]').firstElementChild;
    }
  };

  oldSlide = 0;

  window.toggleSlideShow = function toggleSlideShow() {
    sliding = $(document.body).is('.scroll');
    if (sliding) {
      $(document.body).removeClass('scroll');
      return showSlide(nthSlide(oldSlide));
    } else {
      oldSlide = $('.slide.showing').attr('slide');
      hideSlide($('.slide.showing'));
      $(document.body).addClass('scroll');
      return $('#slide-num').html('');
    }
  };

  bindSlider = function bindSlider() {
    return document.body.addEventListener('keydown', slideKeyListener);
  };

  slideControls = [Q, ESC, LEFT_ARROW, RIGHT_ARROW, HOME, END, PAGE_UP, PAGE_DOWN];

  slideKeyListener = function slideKeyListener(e) {
    var c, cur, n, next, s;
    if (sliding) {
      window.evt = e;
      c = e.charCode || e.keyCode || e.which;
      if ((__indexOf.call(slideControls, c) >= 0) && !$(e.target).is('[leisurenode=code],[leisurenode=code] *')) {
        e.preventDefault();
        if (c === ESC) {
          return toggleSlideShow();
        } else if (c === Q) {
          return closeWindow();
        } else {
          cur = $('.slide.showing');
          next = (function() {
            switch (c) {
              case HOME:
                return slides();
              case END:
                return s = slides().last();
              case LEFT_ARROW:
              case PAGE_UP:
                n = cur.prev('[slide]').not('[leisureSection="Leisure Controls"]');
                if (n.length) {
                  return n;
                } else {
                  return slides();
                }
                break;
              case RIGHT_ARROW:
              case PAGE_DOWN:
                n = cur.next('[slide]').not('[leisureSection="Leisure Controls"]');
                if (n.length) {
                  return n;
                } else {
                  return slides().last();
                }
            }
          })();
          hideSlide(cur);
          return showSlide(next);
        }
      }
    }
  };

  slides = function slides() {
    return $('[slide]').not('[leisureSection="Leisure Controls"]').not('.hiddenPage');
  };

  nthSlide = function nthSlide(n) {
    return slides().slice(n);
  };

  countSlide = function countSlide(el) {
    var count, n, slide, _i, _len, _ref;
    n = -1;
    count = 0;
    _ref = slides();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      slide = _ref[_i];
      count++;
      if (slide === el) n = count;
    }
    return [n, count];
  };

  showSlide = function showSlide(el) {
    var count, n, _ref;
    _ref = countSlide(el[0]), n = _ref[0], count = _ref[1];
    oldSlide = n;
    $('#slide-num').html("" + n + " / " + count);
    return $(el).first().removeClass('hidden').addClass('showing');
  };

  hideSlide = function hideSlide(el) {
    return $(el).first().addClass('hidden').removeClass('showing');
  };

  markupElement = function markupElement(el, md) {
    var code, codePos, len, lex, markup, node, prev, prevCodePos, range, slide, _i, _len, _ref, _ref2, _ref3;
    len = md.length;
    slide = (_ref = md.match(slidePat)) != null ? _ref : '';
    _ref2 = window.marked((slide ? md.slice(slide[0].length) : md), {
      saveLex: true,
      gfm: true
    }), markup = _ref2[0], lex = _ref2[1];
    el.innerHTML = markup.trim() || '<br>';
    prev = null;
    range = document.createRange();
    prevCodePos = -1;
    codePos = 0;
    _ref3 = el.querySelectorAll('code');
    for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
      node = _ref3[_i];
      while (lex[codePos].type !== 'code') {
        codePos++;
      }
      if (node.parentNode.tagName !== 'PRE') {
        code = node;
      } else {
        code = node.parentNode;
        code.innerHTML = node.innerHTML;
      }
      code.setAttribute('noLeisureBar', '');
      code.setAttribute('leisureNode', 'code');
      code.md = lex[codePos].text;
      if (code.parentNode.firstChild !== code) {
        if (prev === null || prev.parentNode !== code.parentNode) {
          range.setStart(code.parentNode, 0);
        } else {
          range.setStartAfter(prev);
        }
        range.setEndBefore(code);
        makeMarkupDiv(range, md.substring((prevCodePos === -1 ? 0 : len - lex[prevCodePos].remain), len - lex[codePos].remain - lex[codePos].textLen));
      }
      prevCodePos = codePos;
      codePos++;
      prev = code;
    }
    if (prevCodePos > -1) {
      if (lex[prevCodePos].remain > 0) {
        range.selectNodeContents(prev.parentNode);
        range.setStartAfter(prev);
        makeMarkupDiv(range, md.substring(len - lex[prevCodePos].remain));
      }
    } else {
      range.selectNodeContents(el);
      makeMarkupDiv(range, md);
    }
    return prevCodePos > -1;
  };

  handleInternalSections = function handleInternalSections(content) {
    var before, firstSlide, innerSections, marker, node, nodeContent, nodeTitle, prev, section, sectionHolder, title, _i, _j, _len, _len2, _ref;
    section = content.parentNode;
    sectionHolder = section.parentNode;
    innerSections = section.querySelectorAll('[leisureSection]');
    if (innerSections.length === 0) {
      if (!((_ref = content.firstChild.md) != null ? _ref.match(/^\*\*\*/) : void 0)) {
        if (!section.previousSibling) {
          return section.setAttribute('leisureSection', 'Main');
        } else {
          prev = section.previousSibling.querySelector('.pageContent');
          while (content.firstChild) {
            mergeUp(content.firstChild, prev);
          }
          return remove(section);
        }
      }
    } else {
      title = section.getAttribute('leisureSection');
      firstSlide = !section.previousSibling || section.previousSibling.getAttribute('leisureSection') === 'Leisure Controls';
      before = false;
      for (_i = 0, _len = innerSections.length; _i < _len; _i++) {
        node = innerSections[_i];
        if (node.getAttribute('leisureSection') === title) {
          before = true;
          break;
        }
      }
      before = before || (!innerSections[0].previousSibling);
      marker = section;
      for (_j = 0, _len2 = innerSections.length; _j < _len2; _j++) {
        node = innerSections[_j];
        nodeTitle = node.getAttribute('leisureSection');
        nodeContent = node.querySelector('.pageContent');
        if (nodeTitle === title || (node.previousSibling && nodeTitle === 'Main')) {
          if (nodeTitle === title) before = false;
          while (nodeContent.firstChild) {
            content.insertBefore(nodeContent.firstChild, node);
            mergeLeisureCode(node.previousSibling, node);
          }
          remove(node);
        } else {
          while (node.nextSibling && !node.nextSibling.getAttribute('leisureSection')) {
            mergeUp(node.nextSibling, nodeContent);
          }
          padSlide(nodeContent, "***" + nodeTitle + "\n");
          if (before) {
            section.parentNode.insertBefore(node, section);
          } else {
            section.parentNode.insertBefore(node, marker.nextSibling);
            marker = node;
          }
        }
      }
      if (!content.firstChild) {
        return remove(section);
      } else {
        return padSlide(content, "***" + title + "\n");
      }
    }
  };

  mergeUp = function mergeUp(el, newParent) {
    newParent.appendChild(el);
    return mergeLeisureCode(newParent.lastChild.previousSibling, newParent.lastChild);
  };

  makeSection = function makeSection(title, node, next) {
    var div;
    div = createNode("<div leisureSection='" + title + "'></div>");
    node.parentNode.insertBefore(div, node);
    while (div.nextSibling && div.nextSibling !== next) {
      div.appendChild(div.nextSibling);
    }
    return div;
  };

  makeMarkupDiv = function makeMarkupDiv(range, md) {
    var div;
    div = document.createElement('div');
    range.surroundContents(div);
    div.md = md;
    bindMarkupDiv(div);
    return div;
  };

  bindMarkupDiv = function bindMarkupDiv(div) {
    var editing;
    div.bound = true;
    div.setAttribute('leisureNode', 'markdown');
    div.setAttribute('contenteditable', 'false');
    editing = false;
    div.addEventListener('dblclick', function(e) {
      if (!editing) {
        div.innerHTML = '';
        div.appendChild(textNode(div.md));
        div.style.whiteSpace = 'pre-wrap';
        div.setAttribute('contenteditable', 'true');
        editing = true;
        div.parentNode.setAttribute('editing', 'true');
        return div.focus();
      }
    });
    div.addEventListener('keypress', function(e) {
      var br, r, s;
      if (editing) {
        s = window.getSelection();
        r = s.getRangeAt(0);
        if ((e.charCode || e.keyCode || e.which) === ENTER) {
          br = textNode('\n');
          r.insertNode(br);
          r = document.createRange();
          r.setStart(br, 1);
          s.removeAllRanges();
          s.addRange(r);
          return e.preventDefault();
        }
      }
    });
    return div.addEventListener('blur', function(e) {
      var first, frag, last, node, parent, prevSection, r, scroll, _i, _len, _ref, _ref2;
      if (editing) {
        scroll = document.body.scrollTop;
        div.style.whiteSpace = '';
        editing = false;
        div.parentNode.removeAttribute('editing');
        div.setAttribute('contenteditable', 'false');
        prevSection = (_ref = div.parentNode.parentNode.previousSibling) != null ? _ref.getAttribute('leisureSection') : void 0;
        parent = div.parentNode;
        if (markupSlideContent(div, div.textContent, prevSection && prevSection !== 'Leisure Controls')) {
          _ref2 = div.querySelectorAll("[leisurenode='code']");
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            node = _ref2[_i];
            presentLeisureCode(node, true);
          }
        } else if (div.textContent.trim() === '') {
          cleanEmptyNodes(div);
        }
        r = document.createRange();
        r.selectNodeContents(div);
        frag = r.extractContents();
        first = frag.childNodes[0];
        last = frag.childNodes[frag.childNodes.length - 1];
        parent.replaceChild(frag, div);
        mergeLeisureCode(previousSibling(first), first);
        mergeLeisureCode(last, nextSibling(last));
        handleInternalSections(parent);
        return delay(function() {
          return document.body.scrollTop = scroll;
        });
      }
    });
  };

  Notebook.markupElement = markupElement;

}).call(this);
;
var maps = (function(){
var root;

if ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {
  maps = root = {};
  global = window;
  module = {};
} else {
  root = typeof exports !== 'undefined' && exports !== null ? exports : this;
  Parse = require('./parse');
  Leisure = require('./leisure');
  Prim = require('./prim');
  //Prim.runRequire('./prelude');
  Prim.runRequire('./std')
;
  Prim.runRequire('./std')
;
  ReplCore = require('./replCore');
  Repl = require('./repl');
}

Prim.loading('maps.lsr')


var Nil = Parse.Nil;
var cons = Parse.cons;
var primCons = Parse.primCons;
var setType = Parse.setType;
var setDataType = Parse.setDataType;
var define = Parse.define;
var processResult = Repl.processResult;
var setContext = Leisure.setContext;
var funcContext = Leisure.funcContext;
var define = Parse.define;
var wrapContext = Leisure.wrapContext;
var markLeisureErrors = Leisure.markLeisureErrors;

module.exports = Prim.codeMonad(function(){
  _addHash = Parse.define('addHash', (function() {var f; return function _addHash(){return f || (f = (function(_k){return function(_v){return function(_hashmap){return _cons()((function(){var $m; return (function(){return $m || ($m = (_cons()(_k)(_v)))})})())((function(){var $m; return (function(){return $m || ($m = (_removeHash()(_k)(_hashmap)))})})());};};}));}})(), 3, "\\k v hashmap . cons (cons k v) (removeHash k hashmap)");;
  _hashFromList = Parse.define('hashFromList', (function() {var f; return function _hashFromList(){return f || (f = (function(_l){return _if()((function(){var $m; return (function(){return $m || ($m = (_null$e()(_l)))})})())(_nil)((function(){var $m; return (function(){return $m || ($m = (_addHash()((function(){var $m; return (function(){return $m || ($m = (_head()(_l)))})})())((function(){var $m; return (function(){return $m || ($m = (_head()((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_hashFromList()((function(){var $m; return (function(){return $m || ($m = (_tail()((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())))})})())))})})())))})})());}));}})(), 1, "\\l . if (null? l) nil\n  addHash (head l) (head (tail l)) (hashFromList (tail (tail l)))");;
  _key = Parse.define('key', (function() {var f; return function _key(){return f || (f = (function(_cons){return _head()(_cons);}));}})(), 1, "\\cons . head cons");;
  _value = Parse.define('value', (function() {var f; return function _value(){return f || (f = (function(_cons){return _tail()(_cons);}));}})(), 1, "\\cons . tail cons");;
  _getPair = Parse.define('getPair', (function() {var f; return function _getPair(){return f || (f = (function(_k){return function(_hashmap){return _findIf()((function(){var $m; return (function(){return $m || ($m = (function(_x){return _eq()((function(){var $m; return (function(){return $m || ($m = (_head()(_x)))})})())(_k);}))})})())(_hashmap);};}));}})(), 2, "\\k hashmap . findIf (\\x . eq (head x) k) hashmap");;
  _getPairOpt = Parse.define('getPairOpt', (function() {var f; return function _getPairOpt(){return f || (f = (function(_k){return function(_l){return _l()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _h()((function(){var $m; return (function(){return $m || ($m = (function(_kk){return function(_vv){return _eq()(_k)(_kk)((function(){var $m; return (function(){return $m || ($m = (_some2()(_kk)(_vv)))})})())((function(){var $m; return (function(){return $m || ($m = (_getPairOpt()(_k)(_t)))})})());};}))})})());};};}))})})())(_none);};}));}})(), 2, "\\k l . l (\\h t D . h (\\kk vv . (eq k kk) (some2 kk vv) (getPairOpt k t))) none");;
  _getHashValue = Parse.define('getHashValue', (function() {var f; return function _getHashValue(){return f || (f = (function(_k){return function(_hashmap){return function(_pair){return _if()((function(){var $m; return (function(){return $m || ($m = (_eq()(_pair)(_nil)))})})())(_nil)((function(){var $m; return (function(){return $m || ($m = (_value()(_pair)))})})());}((function(){var $m; return (function(){return $m || ($m = (_getPair()(_k)(_hashmap)))})})());};}));}})(), 2, "\\k hashmap . (\\pair. if (eq pair nil) nil (value pair)) (getPair k hashmap)");;
  _getHashValueDefault = Parse.define('getHashValueDefault', (function() {var f; return function _getHashValueDefault(){return f || (f = (function(_k){return function(_default){return function(_hashmap){return function(_val){return _if()((function(){var $m; return (function(){return $m || ($m = (_neq()(_val)(_nil)))})})())(_val)(_default);}((function(){var $m; return (function(){return $m || ($m = (_getHashValue()(_k)(_hashmap)))})})());};};}));}})(), 3, "\\k default hashmap . do\n  val = getHashValue k hashmap\n  if (neq val nil) val default");;
  _getKeys = Parse.define('getKeys', (function() {var f; return function _getKeys(){return f || (f = (function(_hashmap){return _map()((function(){var $m; return (function(){return $m || ($m = (function(_cell){return _key()(_cell);}))})})())(_hashmap);}));}})(), 1, "\\hashmap . map (\\cell . (key cell)) hashmap");;
  _numKeys = Parse.define('numKeys', (function() {var f; return function _numKeys(){return f || (f = (function(_hashmap){return _length()((function(){var $m; return (function(){return $m || ($m = (_getKeys()(_hashmap)))})})());}));}})(), 1, "\\hashmap . length (getKeys hashmap)");;
  _firstPair = Parse.define('firstPair', (function() {var f; return function _firstPair(){return f || (f = (function(_hashmap){return _head()(_hashmap);}));}})(), 1, "\\hashmap . head hashmap");;
  _restPairs = Parse.define('restPairs', (function() {var f; return function _restPairs(){return f || (f = (function(_hashmap){return _tail()(_hashmap);}));}})(), 1, "\\hashmap . tail hashmap");;
  _mergeHashKeys = Parse.define('mergeHashKeys', (function() {var f; return function _mergeHashKeys(){return f || (f = (function(_hm1){return function(_hm2){return function(_keys){return _if()((function(){var $m; return (function(){return $m || ($m = (_null$e()(_keys)))})})())(_hm1)((function(){var $m; return (function(){return $m || ($m = (_if()((function(){var $m; return (function(){return $m || ($m = (_null$e()((function(){var $m; return (function(){return $m || ($m = (_getPair()((function(){var $m; return (function(){return $m || ($m = (_head()(_keys)))})})())(_hm1)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_getPair()((function(){var $m; return (function(){return $m || ($m = (_head()(_keys)))})})())(_hm2)))})})())((function(){var $m; return (function(){return $m || ($m = (_mergeHashKeys()(_hm1)(_hm2)((function(){var $m; return (function(){return $m || ($m = (_tail()(_keys)))})})())))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_mergeHashKeys()(_hm1)(_hm2)((function(){var $m; return (function(){return $m || ($m = (_tail()(_keys)))})})())))})})())))})})());};};}));}})(), 3, "\\hm1 hm2 keys . if (null? keys) hm1\n  if (null? (getPair (head keys) hm1) )\n    cons (getPair (head keys) hm2) (mergeHashKeys hm1 hm2 (tail keys))\n    mergeHashKeys hm1 hm2 (tail keys)");;
  _mergeHash = Parse.define('mergeHash', (function() {var f; return function _mergeHash(){return f || (f = (function(_hm1){return function(_hm2){return _mergeHashKeys()(_hm1)(_hm2)((function(){var $m; return (function(){return $m || ($m = (_getKeys()(_hm2)))})})());};}));}})(), 2, "\\hm1 hm2 . mergeHashKeys hm1 hm2 (getKeys hm2)");;
  _removeHash = Parse.define('removeHash', (function() {var f; return function _removeHash(){return f || (f = (function(_k){return function(_hashmap){return _removeIf()((function(){var $m; return (function(){return $m || ($m = (function(_x){return _eq()((function(){var $m; return (function(){return $m || ($m = (_key()(_x)))})})())(_k);}))})})())(_hashmap);};}));}})(), 2, "\\k hashmap . removeIf (\\x . eq (key x) k) hashmap");;

});
if (typeof window != 'undefined') Prim.runMonad(module.exports, Prim.defaultEnv, function(){});
}).call(this);
var svg = (function(){
var root;

if ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {
  svg = root = {};
  global = window;
  module = {};
} else {
  root = typeof exports !== 'undefined' && exports !== null ? exports : this;
  Parse = require('./parse');
  Leisure = require('./leisure');
  Prim = require('./prim');
  //Prim.runRequire('./prelude');
  Prim.runRequire('./std')
;
  Prim.runRequire('./std')
;
  ReplCore = require('./replCore');
  Repl = require('./repl');
}

Prim.loading('svg.lsr')


var Nil = Parse.Nil;
var cons = Parse.cons;
var primCons = Parse.primCons;
var setType = Parse.setType;
var setDataType = Parse.setDataType;
var define = Parse.define;
var processResult = Repl.processResult;
var setContext = Leisure.setContext;
var funcContext = Leisure.funcContext;
var define = Parse.define;
var wrapContext = Leisure.wrapContext;
var markLeisureErrors = Leisure.markLeisureErrors;

module.exports =   (_require()((function(){return "maps"})))
.andThen(function(){
  _insertFields = Parse.define('insertFields', (function() {var f; return function _insertFields(){return f || (f = (function(_map){return _if()((function(){var $m; return (function(){return $m || ($m = (_null$e()(_map)))})})())((function(){return ""}))((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_field()((function(){var $m; return (function(){return $m || ($m = (_firstPair()(_map)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_insertFields()((function(){var $m; return (function(){return $m || ($m = (_restPairs()(_map)))})})())))})})())(_nil)))})})())))})})())))})})());}));}})(), 1, "\\map . if (null? map) ''\n  concat [ (field (firstPair map)), (insertFields (restPairs map)) ]");;
  _svgTemplate = Parse.define('svgTemplate', (function() {var f; return function _svgTemplate(){return f || (f = (function(_attrs){return function(_contents){return _html()((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" "}))((function(){var $m; return (function(){return $m || ($m = (_cons()(_attrs)((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return ">"}))((function(){var $m; return (function(){return $m || ($m = (_cons()(_contents)((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "</svg>"}))(_nil)))})})())))})})())))})})())))})})())))})})())))})})());};}));}})(), 2, "\\attrs contents . html (concat [ '<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" ', attrs, '>', contents, '</svg>'])");;
  _svg = Parse.define('svg', (function() {var f; return function _svg(){return f || (f = (function(_o){return function(_map){return _svgTemplate()((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "style=\"width: "}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_assocGetWithDefault()((function(){return "width"}))((function(){return 100}))(_map)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "; height: "}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_assocGetWithDefault()((function(){return "height"}))((function(){return 100}))(_map)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "\""}))(_nil)))})})())))})})())))})})())))})})())))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_o()(_id)))})})());};}));}})(), 2, "\\o map . svgTemplate (concat ['style=\"width: ', (assocGetWithDefault 'width' 100 map), '; height: ' , (assocGetWithDefault 'height' 100 map), '\"']) (o id)");;
  _svgFile = Parse.define('svgFile', (function() {var f; return function _svgFile(){return f || (f = (function(_map){return _html()((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "<object xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" "}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_insertFields()(_map)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "</object>"}))(_nil)))})})())))})})())))})})())))})})());}));}})(), 1, "\\map . html (concat [ '<object xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" ', (insertFields map), '</object>' ] )");;
  _field = Parse.define('field', (function() {var f; return function _field(){return f || (f = (function(_cell){return _concat()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_key()(_cell)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "=\""}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_value()(_cell)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "\" "}))(_nil)))})})())))})})())))})})())))})})());}));}})(), 1, "\\cell . concat [ (key cell), '=\"', (value cell), '\" ' ]");;
  _defaultCircleMap = Parse.define('defaultCircleMap', (function _defaultCircleMap() {return ((_assocFromList()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "cx"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return 50}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "cy"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return 50}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "r"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return 40}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "stroke"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "black"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "stroke-width"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return 2}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "fill"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "red"}))(_nil)))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())));}), 0, "assocFromList [ 'cx', 50, 'cy', 50, 'r', 40, 'stroke', 'black', 'stroke-width', 2, 'fill', 'red' ]");;
  _defaultRectMap = Parse.define('defaultRectMap', (function _defaultRectMap() {return ((_assocFromList()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "x"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return 1}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "y"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return 1}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "width"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return 50}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "height"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return 50}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "stroke"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "black"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "stroke-width"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return 2}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "fill"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "green"}))(_nil)))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())));}), 0, "assocFromList [ 'x', 1, 'y', 1, 'width', 50, 'height', 50, 'stroke', 'black', 'stroke-width', 2, 'fill', 'green' ]");;
  _defaultLineMap = Parse.define('defaultLineMap', (function _defaultLineMap() {return ((_assocFromList()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "x1"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return 0}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "y1"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return 0}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "x2"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return 50}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "y2"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return 50}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "stroke"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "black"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "stroke-width"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return 2}))(_nil)))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())));}), 0, "assocFromList [ 'x1', 0, 'y1', 0, 'x2', 50, 'y2', 50, 'stroke', 'black', 'stroke-width', 2 ]");;
  _defaultEllipseMap = Parse.define('defaultEllipseMap', (function _defaultEllipseMap() {return ((_assocFromList()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "cx"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return 50}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "cy"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return 50}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "rx"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return 40}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "ry"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return 40}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "stroke"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "black"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "stroke-width"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return 2}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "fill"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "blue"}))(_nil)))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())));}), 0, "assocFromList [ 'cx', 50, 'cy', 50, 'rx', 40, 'ry', 40, 'stroke', 'black', 'stroke-width', 2, 'fill', 'blue' ]");;
  _defaultTextMap = Parse.define('defaultTextMap', (function _defaultTextMap() {return ((_assocFromList()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "x"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return 0}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "y"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return 10}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "stroke"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "black"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "stroke-width"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return 2}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "fill"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "black"}))(_nil)))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())));}), 0, "assocFromList [ 'x', 0, 'y', 10, 'stroke', 'black', 'stroke-width', 2, 'fill', 'black' ]");;
  _defaultPolygonMap = Parse.define('defaultPolygonMap', (function _defaultPolygonMap() {return ((_assocFromList()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "points"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "350,75  379,161 469,161 397,215 423,301 350,250 277,301 303,215 231,161 321,161"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "stroke"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "black"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "stroke-width"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return 2}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "fill"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "yellow"}))(_nil)))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())));}), 0, "assocFromList [ 'points', '350,75  379,161 469,161 397,215 423,301 350,250 277,301 303,215 231,161 321,161', 'stroke', 'black', 'stroke-width', 2, 'fill', 'yellow' ]");;
  _svgNode = Parse.define('svgNode', (function() {var f; return function _svgNode(){return f || (f = (Parse.setDataType(function(_contents){return Parse.setType(function(_f){return _f()(_contents);}, 'svgNode');}, 'svgNode')));}})(), 1, "\\contents . \\f . f contents");;
  _svgNodes = Parse.define('svgNodes', (function() {var f; return function _svgNodes(){return f || (f = (function(_nodeList){return _nodeList()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _cons()((function(){var $m; return (function(){return $m || ($m = (_h()(_id)))})})())((function(){var $m; return (function(){return $m || ($m = (_svgNodes()(_t)))})})());};};}))})})())(_nil);}));}})(), 1, "\\nodeList . nodeList (\\h t D . cons (h id) (svgNodes t)) nil");;
  _svgConcat = Parse.define('svgConcat', (function() {var f; return function _svgConcat(){return f || (f = (function(_nodeList){return _svgNode()((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_svgNodes()(_nodeList)))})})())))})})());}));}})(), 1, "\\nodeList . svgNode (concat (svgNodes nodeList))");;
  _svgElement = Parse.define('svgElement', (function() {var f; return function _svgElement(){return f || (f = (function(_name){return function(_map){return _svgNode()((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "<"}))((function(){var $m; return (function(){return $m || ($m = (_cons()(_name)((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return " "}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_insertFields()(_map)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "/>"}))(_nil)))})})())))})})())))})})())))})})())))})})())))})})());};}));}})(), 2, "\\name map . svgNode (concat [ '<', name, ' ', (insertFields map), '/>' ])");;
  _svgMeasure = Parse.define('svgMeasure', (function() {var f; return function _svgMeasure(){return f || (f = (function(_content){return _primSvgMeasure()(_content);}));}})(), 1, "\\content . primSvgMeasure content");;
  _svgPresent = Parse.define('svgPresent', (function() {var f; return function _svgPresent(){return f || (f = (function(_content){return _svgMeasure()(_content)((function(){var $m; return (function(){return $m || ($m = (function(_x){return function(_y){return function(_w){return function(_h){return _svgTemplate()((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "width='"}))((function(){var $m; return (function(){return $m || ($m = (_cons()(_w)((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "' height='"}))((function(){var $m; return (function(){return $m || ($m = (_cons()(_h)((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "' viewbox='"}))((function(){var $m; return (function(){return $m || ($m = (_cons()(_x)((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return " "}))((function(){var $m; return (function(){return $m || ($m = (_cons()(_y)((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return " "}))((function(){var $m; return (function(){return $m || ($m = (_cons()(_w)((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return " "}))((function(){var $m; return (function(){return $m || ($m = (_cons()(_h)((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "'"}))(_nil)))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())(_content);};};};}))})})());}));}})(), 1, "\\content . svgMeasure content \\x y w h .\n  svgTemplate (concat [\"width='\", w, \"' height='\", h, \"' viewbox='\", x, ' ', y, ' ', w, ' ', h, \"'\"]) content");;
  _circle = Parse.define('circle', (function() {var f; return function _circle(){return f || (f = (function(_map){return _svgElement()((function(){return "circle"}))((function(){var $m; return (function(){return $m || ($m = (_if()((function(){var $m; return (function(){return $m || ($m = (_null$e()(_map)))})})())(_defaultCircleMap)(_map)))})})());}));}})(), 1, "\\map . svgElement 'circle' (if (null? map) defaultCircleMap map)");;
  _rect = Parse.define('rect', (function() {var f; return function _rect(){return f || (f = (function(_map){return _svgElement()((function(){return "rect"}))((function(){var $m; return (function(){return $m || ($m = (_if()((function(){var $m; return (function(){return $m || ($m = (_null$e()(_map)))})})())(_defaultRectMap)(_map)))})})());}));}})(), 1, "\\map . svgElement 'rect' (if (null? map) defaultRectMap map)");;
  _ellipse = Parse.define('ellipse', (function() {var f; return function _ellipse(){return f || (f = (function(_map){return _svgElement()((function(){return "ellipse"}))((function(){var $m; return (function(){return $m || ($m = (_if()((function(){var $m; return (function(){return $m || ($m = (_null$e()(_map)))})})())(_defaultEllipseMap)(_map)))})})());}));}})(), 1, "\\map . svgElement 'ellipse' (if (null? map) defaultEllipseMap map)");;
  _line = Parse.define('line', (function() {var f; return function _line(){return f || (f = (function(_map){return _svgElement()((function(){return "line"}))((function(){var $m; return (function(){return $m || ($m = (_if()((function(){var $m; return (function(){return $m || ($m = (_null$e()(_map)))})})())(_defaultLineMap)(_map)))})})());}));}})(), 1, "\\map . svgElement 'line' (if (null? map) defaultLineMap map)");;
  _text = Parse.define('text', (function() {var f; return function _text(){return f || (f = (function(_t){return function(_map){return _svgNode()((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "<text "}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_insertFields()((function(){var $m; return (function(){return $m || ($m = (_if()((function(){var $m; return (function(){return $m || ($m = (_null$e()(_map)))})})())(_defaultTextMap)(_map)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return ">"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_if()((function(){var $m; return (function(){return $m || ($m = (_null$e()(_t)))})})())((function(){return "undefined"}))(_t)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "</text>"}))(_nil)))})})())))})})())))})})())))})})())))})})())))})})());};}));}})(), 2, "\\t map . svgNode (concat [ '<text ', (insertFields (if (null? map) defaultTextMap map)), '>', (if (null? t) 'undefined' t), '</text>' ])");;
  _polygon = Parse.define('polygon', (function() {var f; return function _polygon(){return f || (f = (function(_map){return _svgElement()((function(){return "polygon"}))((function(){var $m; return (function(){return $m || ($m = (_if()((function(){var $m; return (function(){return $m || ($m = (_null$e()(_map)))})})())(_defaultPolygonMap)(_map)))})})());}));}})(), 1, "\\map . svgElement 'polygon' (if (null? map) defaultPolygonMap map)");;
  _group = Parse.define('group', (function() {var f; return function _group(){return f || (f = (function(_elem){return _svgNode()((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "<g>"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_elem()(_id)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "</g>"}))(_nil)))})})())))})})())))})})())))})})());}));}})(), 1, "\\elem . svgNode (concat [ '<g>', (elem id), '</g>' ])");;
  _translate = Parse.define('translate', (function() {var f; return function _translate(){return f || (f = (function(_elem){return function(_x){return function(_y){return _svgNode()((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "<g transform=\"translate("}))((function(){var $m; return (function(){return $m || ($m = (_cons()(_x)((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return ", "}))((function(){var $m; return (function(){return $m || ($m = (_cons()(_y)((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return ")\">"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_elem()(_id)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "</g>"}))(_nil)))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})());};};}));}})(), 3, "\\elem x y . svgNode (concat ['<g transform=\"translate(', x, ', ', y, ')\">', (elem id), '</g>' ])");;
  _rotate = Parse.define('rotate', (function() {var f; return function _rotate(){return f || (f = (function(_elem){return function(_r){return _svgNode()((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "<g transform=\"rotate("}))((function(){var $m; return (function(){return $m || ($m = (_cons()(_r)((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return ")\">"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_elem()(_id)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "</g>"}))(_nil)))})})())))})})())))})})())))})})())))})})())))})})());};}));}})(), 2, "\\elem r . svgNode (concat ['<g transform=\"rotate(', r, ')\">', (elem id), '</g>' ])");;
})
.andThen(function(){ return   (3)})
;
if (typeof window != 'undefined') Prim.runMonad(module.exports, Prim.defaultEnv, function(){});
}).call(this);
var parseAst = (function(){
var root;

if ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {
  parseAst = root = {};
  global = window;
  module = {};
} else {
  root = typeof exports !== 'undefined' && exports !== null ? exports : this;
  Parse = require('./parse');
  Leisure = require('./leisure');
  Prim = require('./prim');
  //Prim.runRequire('./prelude');
  Prim.runRequire('./std')
;
  Prim.runRequire('./std')
;
  ReplCore = require('./replCore');
  Repl = require('./repl');
}

Prim.loading('parseAst.lsr')


var Nil = Parse.Nil;
var cons = Parse.cons;
var primCons = Parse.primCons;
var setType = Parse.setType;
var setDataType = Parse.setDataType;
var define = Parse.define;
var processResult = Repl.processResult;
var setContext = Leisure.setContext;
var funcContext = Leisure.funcContext;
var define = Parse.define;
var wrapContext = Leisure.wrapContext;
var markLeisureErrors = Leisure.markLeisureErrors;

module.exports =   (_require()((function(){return "svg"})))
.andThen(function(){ return   (_bind()((function(){var $m; return (function(){return $m || ($m = (_forward()((function(){return "notebookSelection"}))))})})())((function(){var $m; return (function(){return $m || ($m = (function(__){return _forward()((function(){return "notebookAst"}));}))})})()))})
.andThen(function(){
  _makeNode = Parse.define('makeNode', (function() {var f; return function _makeNode(){return f || (f = (Parse.setDataType(function(_svg){return function(_width){return function(_height){return function(_rootX){return function(_rootY){return Parse.setType(function(_f){return _f()(_svg)(_width)(_height)(_rootX)(_rootY);}, 'makeNode');};};};};}, 'makeNode')));}})(), 5, "\\svg width height rootX rootY . \\f . f svg width height rootX rootY");;
  _nodeSvg = Parse.define('nodeSvg', (function() {var f; return function _nodeSvg(){return f || (f = (function(_st){return _st()((function(){var $m; return (function(){return $m || ($m = (function(_svg){return function(_width){return function(_height){return function(_rootX){return function(_rootY){return _svg();};};};};}))})})());}));}})(), 1, "\\st . st \\svg width height rootX rootY . svg");;
  _nodeWidth = Parse.define('nodeWidth', (function() {var f; return function _nodeWidth(){return f || (f = (function(_st){return _st()((function(){var $m; return (function(){return $m || ($m = (function(_svg){return function(_width){return function(_height){return function(_rootX){return function(_rootY){return _width();};};};};}))})})());}));}})(), 1, "\\st . st \\svg width height rootX rootY . width");;
  _nodeHeight = Parse.define('nodeHeight', (function() {var f; return function _nodeHeight(){return f || (f = (function(_st){return _st()((function(){var $m; return (function(){return $m || ($m = (function(_svg){return function(_width){return function(_height){return function(_rootX){return function(_rootY){return _height();};};};};}))})})());}));}})(), 1, "\\st . st \\svg width height rootX rootY . height");;
  _nodeRootX = Parse.define('nodeRootX', (function() {var f; return function _nodeRootX(){return f || (f = (function(_st){return _st()((function(){var $m; return (function(){return $m || ($m = (function(_svg){return function(_width){return function(_height){return function(_rootX){return function(_rootY){return _rootX();};};};};}))})})());}));}})(), 1, "\\st . st \\svg width height rootX rootY . rootX");;
  _nodeRootY = Parse.define('nodeRootY', (function() {var f; return function _nodeRootY(){return f || (f = (function(_st){return _st()((function(){var $m; return (function(){return $m || ($m = (function(_svg){return function(_width){return function(_height){return function(_rootX){return function(_rootY){return _rootY();};};};};}))})})());}));}})(), 1, "\\st . st \\svg width height rootX rootY . rootY");;
  _nodeTranslate = Parse.define('nodeTranslate', (function() {var f; return function _nodeTranslate(){return f || (f = (function(_st){return function(_x){return function(_y){return _st()((function(){var $m; return (function(){return $m || ($m = (function(_svg){return function(_width){return function(_height){return function(_rootX){return function(_rootY){return _makeNode()((function(){var $m; return (function(){return $m || ($m = (_translate()(_svg)(_x)(_y)))})})())(_width)(_height)((function(){var $m; return (function(){return $m || ($m = (_$o()(_rootX)(_x)))})})())((function(){var $m; return (function(){return $m || ($m = (_$o()(_rootY)(_y)))})})());};};};};}))})})());};};}));}})(), 3, "\\st x y . st \\svg width height rootX rootY . makeNode\n  translate svg x y\n  width\n  height\n  rootX + x\n  rootY + y");;
  _nodeLine = Parse.define('nodeLine', (function() {var f; return function _nodeLine(){return f || (f = (function(_n1){return function(_n2){return _n1()((function(){var $m; return (function(){return $m || ($m = (function(_s1){return function(_w1){return function(_h1){return function(_x1){return function(_y1){return _n2()((function(){var $m; return (function(){return $m || ($m = (function(_s2){return function(_w2){return function(_h2){return function(_x2){return function(_y2){return _line()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "x1"}))(_x1)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "y1"}))(_y1)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "x2"}))(_x2)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "y2"}))(_y2)))})})())(_defaultLineMap)))})})())))})})())))})})())))})})());};};};};}))})})());};};};};}))})})());};}));}})(), 2, "\\n1 n2 . n1 \\s1 w1 h1 x1 y1 . n2 \\s2 w2 h2 x2 y2 .\n  line [['x1'|x1] ['y1'|y1] ['x2'|x2] ['y2'|y2] | defaultLineMap]");;
  _astFor = Parse.define('astFor', (function() {var f; return function _astFor(){return f || (f = (function(_func){return _isFunc()(_func)((function(){var $m; return (function(){return $m || ($m = (_funcSource()(_func)((function(){var $m; return (function(){return $m || ($m = (function(_src){return _parse()(_src);}))})})())((function(){var $m; return (function(){return $m || ($m = (_right()((function(){return "no source"}))))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_left()((function(){var $m; return (function(){return $m || ($m = (_lit()(_func)))})})())))})})());}));}})(), 1, "\\func . isFunc func\n  funcSource func (\\src . parse src) (right 'no source')\n  left (lit func)");;
  _treeForNotebook = Parse.define('treeForNotebook', (function() {var f; return function _treeForNotebook(){return f || (f = (function(_func){return _subTreeForNotebook()(_func)((function(){var $m; return (function(){return $m || ($m = (function(_attrs){return function(_ast){return _cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "onclick"}))((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "Notebook.highlightNotebookFunction('"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_funcName()(_func)(_id)((function(){return ""}))))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "', "}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_astStart()(_ast)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return ", "}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_astEnd()(_ast)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return ")"}))(_nil)))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())(_attrs);};}))})})());}));}})(), 1, "\\func . subTreeForNotebook func\n  \\attrs ast .\n    [['onclick' | concat[\"Notebook.highlightNotebookFunction('\" (funcName func id '') \"', \" (astStart ast) \", \" (astEnd ast) \")\"]] | attrs]");;
  _subTreeForNotebook = Parse.define('subTreeForNotebook', (function() {var f; return function _subTreeForNotebook(){return f || (f = (function(_func){return function(_attrFunc){return _bind()((function(){var $m; return (function(){return $m || ($m = (_notebookSelection()(_func)))})})())((function(){var $m; return (function(){return $m || ($m = (function(_s){return _bind()((function(){var $m; return (function(){return $m || ($m = (_notebookAst()(_func)))})})())((function(){var $m; return (function(){return $m || ($m = (function(_ast){return _ast()((function(){var $m; return (function(){return $m || ($m = (function(_ast){return _printValue()((function(){var $m; return (function(){return $m || ($m = (_treeForWith()(_ast)((function(){var $m; return (function(){return $m || ($m = (function(_ast){return function(_map){return _attrFunc()((function(){var $m; return (function(){return $m || ($m = (_s()((function(){var $m; return (function(){return $m || ($m = (function(_start){return function(_end){return _shouldHighlight()(_ast)(_start)(_end)((function(){var $m; return (function(){return $m || ($m = (_highlight()(_map)))})})())(_map);};}))})})())(_map)))})})())(_ast);};}))})})())))})})());}))})})())((function(){var $m; return (function(){return $m || ($m = (function(_ignore){return _concat()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "no source for "}))((function(){var $m; return (function(){return $m || ($m = (_cons()(_func)(_nil)))})})())))})})());}))})})());}))})})());}))})})());};}));}})(), 2, "\\func attrFunc . do\n  s <- notebookSelection func\n  ast <- notebookAst func\n  ast\n    \\ast . printValue (treeForWith ast \\ast map . attrFunc (s (\\start end . (shouldHighlight ast start end) (highlight map) map) map) ast)\n    \\ignore . concat ['no source for ' func]");;
  _rangeContainsRange = Parse.define('rangeContainsRange', (function() {var f; return function _rangeContainsRange(){return f || (f = (function(_start){return function(_end){return function(_innerStart){return function(_innerEnd){return _and()((function(){var $m; return (function(){return $m || ($m = (_lte()(_start)(_innerStart)))})})())((function(){var $m; return (function(){return $m || ($m = (_lte()(_innerEnd)(_end)))})})());};};};}));}})(), 4, "\\start end innerStart innerEnd . and (lte start innerStart) (lte innerEnd end)");;
  _shouldHighlight = Parse.define('shouldHighlight', (function() {var f; return function _shouldHighlight(){return f || (f = (function(_ast){return function(_start){return function(_end){return function(_aStart){return function(_aEnd){return _or()((function(){var $m; return (function(){return $m || ($m = (_rangeContainsRange()(_start)(_end)(_aStart)(_aEnd)))})})())((function(){var $m; return (function(){return $m || ($m = (_or()((function(){var $m; return (function(){return $m || ($m = (_and()((function(){var $m; return (function(){return $m || ($m = (_or()((function(){var $m; return (function(){return $m || ($m = (_eq()((function(){return "lit"}))((function(){var $m; return (function(){return $m || ($m = (_getType()(_ast)(_id)(_id)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_eq()((function(){return "ref"}))((function(){var $m; return (function(){return $m || ($m = (_getType()(_ast)(_id)(_id)))})})())))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_rangeContainsRange()(_aStart)(_aEnd)(_start)(_end)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_and()((function(){var $m; return (function(){return $m || ($m = (_eq()((function(){return "lambda"}))((function(){var $m; return (function(){return $m || ($m = (_getType()(_ast)(_id)(_id)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_rangeContainsRange()(_aStart)((function(){var $m; return (function(){return $m || ($m = (_$o()(_aStart)((function(){var $m; return (function(){return $m || ($m = (_strlen()((function(){var $m; return (function(){return $m || ($m = (_ast()((function(){var $m; return (function(){return $m || ($m = (function(_v){return function(_b){return _v();};}))})})())))})})())))})})())))})})())(_start)(_end)))})})())))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_astEnd()(_ast)))})})());}((function(){var $m; return (function(){return $m || ($m = (_astStart()(_ast)))})})());};};}));}})(), 3, "\\ast start end . do\n  aStart = astStart ast\n  aEnd = astEnd ast\n  or\n    rangeContainsRange start end aStart aEnd\n    or\n      and\n        or (eq 'lit' (getType ast id id)) (eq 'ref' (getType ast id id))\n        rangeContainsRange aStart aEnd start end\n      and\n        eq 'lambda' (getType ast id id)\n        rangeContainsRange aStart (aStart + (strlen (ast \\v b . v))) start end");;
  _highlight = Parse.define('highlight', (function() {var f; return function _highlight(){return f || (f = (function(_map){return function(_c){return _eq()(_c)((function(){return "#fcc"}))((function(){var $m; return (function(){return $m || ($m = (_assocSet()((function(){return "fill"}))((function(){return "red"}))(_map)))})})())((function(){var $m; return (function(){return $m || ($m = (_eq()(_c)((function(){return "#cfc"}))((function(){var $m; return (function(){return $m || ($m = (_assocSet()((function(){return "fill"}))((function(){return "green"}))(_map)))})})())((function(){var $m; return (function(){return $m || ($m = (_eq()(_c)((function(){return "#ccf"}))((function(){var $m; return (function(){return $m || ($m = (_assocSet()((function(){return "fill"}))((function(){return "blue"}))(_map)))})})())(_map)))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_assocGetWithDefault()((function(){return "fill"}))(_map)(_nil)))})})());}));}})(), 1, "\\map . do\n  c = assocGetWithDefault 'fill' map nil\n  eq c '#fcc'\n    assocSet 'fill' 'red' map\n    eq c '#cfc'\n      assocSet 'fill' 'green' map\n      eq c '#ccf'\n        assocSet 'fill' 'blue' map\n        map");;
  _treeForFunc = Parse.define('treeForFunc', (function() {var f; return function _treeForFunc(){return f || (f = (function(_func){return _treeFor()((function(){var $m; return (function(){return $m || ($m = (_parse()((function(){var $m; return (function(){return $m || ($m = (_funcSource()(_func)(_id)(_false)))})})())(_id)(_false)))})})());}));}})(), 1, "\\func . treeFor (parse (funcSource func id false) id false)");;
  _treeFor = Parse.define('treeFor', (function() {var f; return function _treeFor(){return f || (f = (function(_ast){return _treeForWith()(_ast)((function(){var $m; return (function(){return $m || ($m = (function(_ast){return function(_map){return _map();};}))})})());}));}})(), 1, "\\ast . treeForWith ast \\ast map . map");;
  _treeForWith = Parse.define('treeForWith', (function() {var f; return function _treeForWith(){return f || (f = (function(_ast){return function(_mapFunc){return _nodeSvg()((function(){var $m; return (function(){return $m || ($m = (_nodeFor()(_ast)(_mapFunc)))})})());};}));}})(), 2, "\\ast mapFunc . nodeSvg (nodeFor ast mapFunc)");;
  _nodeFor = Parse.define('nodeFor', (function() {var f; return function _nodeFor(){return f || (f = (function(_ast){return function(_mapFunc){return function(_t){return _eq()(_t)((function(){return "lit"}))((function(){var $m; return (function(){return $m || ($m = (_createLitNode()(_ast)((function(){var $m; return (function(){return $m || ($m = (_pretty()((function(){var $m; return (function(){return $m || ($m = (_ast()(_id)))})})())))})})())(_mapFunc)))})})())((function(){var $m; return (function(){return $m || ($m = (_eq()(_t)((function(){return "ref"}))((function(){var $m; return (function(){return $m || ($m = (_createRefNode()(_ast)((function(){var $m; return (function(){return $m || ($m = (_pretty()((function(){var $m; return (function(){return $m || ($m = (_ast()(_id)))})})())))})})())(_mapFunc)))})})())((function(){var $m; return (function(){return $m || ($m = (_eq()(_t)((function(){return "lambda"}))((function(){var $m; return (function(){return $m || ($m = (_ast()((function(){var $m; return (function(){return $m || ($m = (function(_v){return function(_b){return _createLambdaNode()(_ast)(_v)(_b)(_mapFunc);};}))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_eq()(_t)((function(){return "apply"}))((function(){var $m; return (function(){return $m || ($m = (_ast()((function(){var $m; return (function(){return $m || ($m = (function(_f){return function(_a){return _createApplyNode()(_ast)(_f)(_a)(_mapFunc);};}))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_makeNode()((function(){var $m; return (function(){return $m || ($m = (_svgNode()((function(){return ""}))))})})())((function(){return 0}))((function(){return 0}))((function(){return 0}))((function(){return 0}))))})})())))})})())))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_typeof()(_ast)))})})());};}));}})(), 2, "\\ast mapFunc . do\n  t = typeof ast\n  eq t 'lit'\n    createLitNode ast (pretty (ast id)) mapFunc\n    eq t 'ref'\n      createRefNode ast (pretty (ast id)) mapFunc\n      eq t 'lambda'\n        ast (\\v b . createLambdaNode ast v b mapFunc)\n        eq t 'apply'\n          ast (\\f a . createApplyNode ast f a mapFunc)\n          makeNode (svgNode '') 0 0 0 0");;
  _redStyle = Parse.define('redStyle', (function _redStyle() {return ((_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "stroke"}))((function(){return "black"}))))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "stroke-width"}))((function(){return 2}))))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "fill"}))((function(){return "#fcc"}))))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "rx"}))((function(){return 8}))))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "ry"}))((function(){return 8}))))})})())(_nil)))})})())))})})())))})})())))})})())));}), 0, "[['stroke'|'black'] ['stroke-width'|2] ['fill'|'#fcc'] ['rx'|8] ['ry'|8]]");;
  _greenStyle = Parse.define('greenStyle', (function _greenStyle() {return ((_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "stroke"}))((function(){return "black"}))))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "stroke-width"}))((function(){return 2}))))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "fill"}))((function(){return "#cfc"}))))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "rx"}))((function(){return 8}))))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "ry"}))((function(){return 8}))))})})())(_nil)))})})())))})})())))})})())))})})())));}), 0, "[['stroke'|'black'] ['stroke-width'|2] ['fill'|'#cfc'] ['rx'|8] ['ry'|8]]");;
  _blueStyle = Parse.define('blueStyle', (function _blueStyle() {return ((_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "stroke"}))((function(){return "black"}))))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "stroke-width"}))((function(){return 2}))))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "fill"}))((function(){return "#ccf"}))))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "rx"}))((function(){return 8}))))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "ry"}))((function(){return 8}))))})})())(_nil)))})})())))})})())))})})())))})})())));}), 0, "[['stroke'|'black'] ['stroke-width'|2] ['fill'|'#ccf'] ['rx'|8] ['ry'|8]]");;
  _createLambdaNode = Parse.define('createLambdaNode', (function() {var f; return function _createLambdaNode(){return f || (f = (function(_ast){return function(_v){return function(_b){return function(_mapFunc){return function(_rootBox){return function(_varBox){return function(_bodyTree){return function(_childWidth){return function(_totalWidth){return function(_pad){return function(_rootBox){return function(_varBox){return function(_bodyTree){return _makeNode()((function(){var $m; return (function(){return $m || ($m = (_svgConcat()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_nodeLine()(_rootBox)(_varBox)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_nodeLine()(_rootBox)(_bodyTree)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_nodeSvg()(_varBox)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_nodeSvg()(_bodyTree)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_nodeSvg()(_rootBox)))})})())(_nil)))})})())))})})())))})})())))})})())))})})())))})})())(_totalWidth)((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){var $m; return (function(){return $m || ($m = (_nodeHeight()(_rootBox)))})})())((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){return 5}))((function(){var $m; return (function(){return $m || ($m = (_max()((function(){var $m; return (function(){return $m || ($m = (_nodeHeight()(_varBox)))})})())((function(){var $m; return (function(){return $m || ($m = (_nodeHeight()(_bodyTree)))})})())))})})())))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_$f()(_totalWidth)((function(){return 2}))))})})())((function(){var $m; return (function(){return $m || ($m = (_$f()((function(){var $m; return (function(){return $m || ($m = (_nodeHeight()(_rootBox)))})})())((function(){return 2}))))})})());}((function(){var $m; return (function(){return $m || ($m = (_nodeTranslate()(_bodyTree)((function(){var $m; return (function(){return $m || ($m = (_$o()(_pad)((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){var $m; return (function(){return $m || ($m = (_nodeWidth()(_varBox)))})})())((function(){return 5}))))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){var $m; return (function(){return $m || ($m = (_nodeHeight()(_rootBox)))})})())((function(){return 5}))))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_nodeTranslate()(_varBox)(_pad)((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){var $m; return (function(){return $m || ($m = (_nodeHeight()(_rootBox)))})})())((function(){return 5}))))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_nodeTranslate()(_rootBox)((function(){var $m; return (function(){return $m || ($m = (_$_()((function(){var $m; return (function(){return $m || ($m = (_$f()(_totalWidth)((function(){return 2}))))})})())((function(){var $m; return (function(){return $m || ($m = (_$f()((function(){var $m; return (function(){return $m || ($m = (_nodeWidth()(_rootBox)))})})())((function(){return 2}))))})})())))})})())((function(){return 0}))))})})());}((function(){var $m; return (function(){return $m || ($m = (_max()((function(){return 0}))((function(){var $m; return (function(){return $m || ($m = (_$f()((function(){var $m; return (function(){return $m || ($m = (_$_()(_totalWidth)(_childWidth)))})})())((function(){return 2}))))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_max()(_childWidth)((function(){var $m; return (function(){return $m || ($m = (_nodeWidth()(_rootBox)))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){var $m; return (function(){return $m || ($m = (_nodeWidth()(_varBox)))})})())((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){return 5}))((function(){var $m; return (function(){return $m || ($m = (_nodeWidth()(_bodyTree)))})})())))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_nodeFor()(_b)(_mapFunc)))})})());}((function(){var $m; return (function(){return $m || ($m = (_textNode()((function(){var $m; return (function(){return $m || ($m = (_mapFunc()(_ast)(_greenStyle)))})})())(_v)))})})());}((function(){var $m; return (function(){return $m || ($m = (_textNode()((function(){var $m; return (function(){return $m || ($m = (_mapFunc()(_ast)(_greenStyle)))})})())((function(){return "lambda"}))))})})());};};};}));}})(), 4, "\\ast v b mapFunc . do\n  rootBox = textNode (mapFunc ast greenStyle) 'lambda'\n  varBox = textNode (mapFunc ast greenStyle) v\n  bodyTree = nodeFor b mapFunc\n  childWidth = (nodeWidth varBox) + 5 + (nodeWidth bodyTree)\n  totalWidth = max childWidth (nodeWidth rootBox)\n  pad = max 0 (totalWidth - childWidth) / 2\n  rootBox = nodeTranslate rootBox (totalWidth / 2 - (nodeWidth rootBox) / 2) 0\n  varBox = nodeTranslate varBox pad (nodeHeight rootBox) + 5\n  bodyTree = nodeTranslate bodyTree (pad + (nodeWidth varBox) + 5) ((nodeHeight rootBox) + 5)\n  makeNode\n    svgConcat [(nodeLine rootBox varBox) (nodeLine rootBox bodyTree) (nodeSvg varBox) (nodeSvg bodyTree) (nodeSvg rootBox)]\n    totalWidth\n    (nodeHeight rootBox) + 5 + (max (nodeHeight varBox) (nodeHeight bodyTree))\n    totalWidth / 2\n    (nodeHeight rootBox) / 2");;
  _createApplyNode = Parse.define('createApplyNode', (function() {var f; return function _createApplyNode(){return f || (f = (function(_ast){return function(_f){return function(_a){return function(_mapFunc){return function(_rootBox){return function(_funcTree){return function(_argTree){return function(_childWidth){return function(_totalWidth){return function(_pad){return function(_rootBox){return function(_funcTree){return function(_argTree){return _makeNode()((function(){var $m; return (function(){return $m || ($m = (_svgConcat()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_nodeLine()(_rootBox)(_funcTree)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_nodeLine()(_rootBox)(_argTree)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_nodeSvg()(_rootBox)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_nodeSvg()(_funcTree)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_nodeSvg()(_argTree)))})})())(_nil)))})})())))})})())))})})())))})})())))})})())))})})())(_totalWidth)((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){var $m; return (function(){return $m || ($m = (_nodeHeight()(_rootBox)))})})())((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){return 5}))((function(){var $m; return (function(){return $m || ($m = (_max()((function(){var $m; return (function(){return $m || ($m = (_nodeHeight()(_argTree)))})})())((function(){var $m; return (function(){return $m || ($m = (_nodeHeight()(_funcTree)))})})())))})})())))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_$f()(_totalWidth)((function(){return 2}))))})})())((function(){var $m; return (function(){return $m || ($m = (_$f()((function(){var $m; return (function(){return $m || ($m = (_nodeHeight()(_rootBox)))})})())((function(){return 2}))))})})());}((function(){var $m; return (function(){return $m || ($m = (_nodeTranslate()(_argTree)((function(){var $m; return (function(){return $m || ($m = (_$o()(_pad)((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){var $m; return (function(){return $m || ($m = (_nodeWidth()(_funcTree)))})})())((function(){return 5}))))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){var $m; return (function(){return $m || ($m = (_nodeHeight()(_rootBox)))})})())((function(){return 5}))))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_nodeTranslate()(_funcTree)(_pad)((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){var $m; return (function(){return $m || ($m = (_nodeHeight()(_rootBox)))})})())((function(){return 5}))))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_nodeTranslate()(_rootBox)((function(){var $m; return (function(){return $m || ($m = (_$_()((function(){var $m; return (function(){return $m || ($m = (_$f()(_totalWidth)((function(){return 2}))))})})())((function(){var $m; return (function(){return $m || ($m = (_$f()((function(){var $m; return (function(){return $m || ($m = (_nodeWidth()(_rootBox)))})})())((function(){return 2}))))})})())))})})())((function(){return 0}))))})})());}((function(){var $m; return (function(){return $m || ($m = (_max()((function(){return 0}))((function(){var $m; return (function(){return $m || ($m = (_$f()((function(){var $m; return (function(){return $m || ($m = (_$_()(_totalWidth)(_childWidth)))})})())((function(){return 2}))))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_max()(_childWidth)((function(){var $m; return (function(){return $m || ($m = (_nodeWidth()(_rootBox)))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){var $m; return (function(){return $m || ($m = (_nodeWidth()(_argTree)))})})())((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){return 5}))((function(){var $m; return (function(){return $m || ($m = (_nodeWidth()(_funcTree)))})})())))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_nodeFor()(_a)(_mapFunc)))})})());}((function(){var $m; return (function(){return $m || ($m = (_nodeFor()(_f)(_mapFunc)))})})());}((function(){var $m; return (function(){return $m || ($m = (_textNode()((function(){var $m; return (function(){return $m || ($m = (_mapFunc()(_ast)(_blueStyle)))})})())((function(){return "apply"}))))})})());};};};}));}})(), 4, "\\ast f a mapFunc . do\n  rootBox = textNode (mapFunc ast blueStyle) 'apply'\n  funcTree = nodeFor f mapFunc\n  argTree = nodeFor a mapFunc\n  childWidth = (nodeWidth argTree) + 5 + (nodeWidth funcTree)\n  totalWidth = max childWidth (nodeWidth rootBox)\n  pad = max 0 (totalWidth - childWidth) / 2\n  rootBox = nodeTranslate rootBox (totalWidth / 2 - (nodeWidth rootBox) / 2) 0\n  funcTree = nodeTranslate funcTree pad (nodeHeight rootBox) + 5\n  argTree = nodeTranslate argTree (pad + (nodeWidth funcTree) + 5) ((nodeHeight rootBox) + 5)\n  makeNode\n    svgConcat [(nodeLine rootBox funcTree) (nodeLine rootBox argTree) (nodeSvg rootBox) (nodeSvg funcTree) (nodeSvg argTree)]\n    totalWidth\n    (nodeHeight rootBox) + 5 + (max (nodeHeight argTree) (nodeHeight funcTree))\n    totalWidth / 2\n    (nodeHeight rootBox) / 2");;
  _createRefNode = Parse.define('createRefNode', (function() {var f; return function _createRefNode(){return f || (f = (function(_ast){return function(_ref){return function(_mapFunc){return _textNode()((function(){var $m; return (function(){return $m || ($m = (_mapFunc()(_ast)(_redStyle)))})})())(_ref);};};}));}})(), 3, "\\ast ref mapFunc . textNode (mapFunc ast redStyle) ref");;
  _createLitNode = Parse.define('createLitNode', (function() {var f; return function _createLitNode(){return f || (f = (function(_ast){return function(_lit){return function(_mapFunc){return _textNode()((function(){var $m; return (function(){return $m || ($m = (_mapFunc()(_ast)(_greenStyle)))})})())(_lit);};};}));}})(), 3, "\\ast lit mapFunc . textNode (mapFunc ast greenStyle) lit");;
  _textNode = Parse.define('textNode', (function() {var f; return function _textNode(){return f || (f = (function(_map){return function(_txt){return _svgMeasureText()(_txt)((function(){return ""}))((function(){var $m; return (function(){return $m || ($m = (function(_w){return function(_h){return function(_nodeW){return function(_nodeH){return _makeNode()((function(){var $m; return (function(){return $m || ($m = (_svgConcat()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_rect()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "x"}))((function(){return 2}))))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "y"}))((function(){return 2}))))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "width"}))(_nodeW)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "height"}))(_nodeH)))})})())(_map)))})})())))})})())))})})())))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_text()(_txt)((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "pointer-events"}))((function(){return "none"}))))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "text-anchor"}))((function(){return "middle"}))))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "dominant-baseline"}))((function(){return "mathematical"}))))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "x"}))((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){return 14}))((function(){var $m; return (function(){return $m || ($m = (_$f()(_w)((function(){return 2}))))})})())))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "y"}))((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){return 5}))((function(){var $m; return (function(){return $m || ($m = (_$f()(_h)((function(){return 2}))))})})())))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "font-weight"}))((function(){return "bold"}))))})})())(_nil)))})})())))})})())))})})())))})})())))})})())))})})())))})})())(_nil)))})})())))})})())))})})())(_nodeW)(_nodeH)((function(){var $m; return (function(){return $m || ($m = (_$f()(_nodeW)((function(){return 2}))))})})())((function(){var $m; return (function(){return $m || ($m = (_$f()(_nodeH)((function(){return 2}))))})})());}((function(){var $m; return (function(){return $m || ($m = (_$o()(_h)((function(){return 14}))))})})());}((function(){var $m; return (function(){return $m || ($m = (_$o()(_w)((function(){return 24}))))})})());};}))})})());};}));}})(), 2, "\\map txt . (svgMeasureText txt '') \\w h . do\n  nodeW = w + 24\n  nodeH = h + 14\n  makeNode\n    (svgConcat [(rect [['x'|2] ['y'|2] ['width'|nodeW] ['height'|nodeH] | map]) (text txt [['pointer-events' | 'none'] ['text-anchor'|\"middle\"] ['dominant-baseline'|\"mathematical\"] ['x'| 14 + w / 2] ['y'| 5 + h / 2] ['font-weight'|'bold']])])\n    nodeW\n    nodeH\n    nodeW / 2\n    nodeH / 2");;
  _typeof = Parse.define('typeof', (function() {var f; return function _typeof(){return f || (f = (function(_x){return _getType()(_x)(_id)(_false);}));}})(), 1, "\\x . getType x id false");;

});
if (typeof window != 'undefined') Prim.runMonad(module.exports, Prim.defaultEnv, function(){});
}).call(this);
