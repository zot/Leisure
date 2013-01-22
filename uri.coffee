urlPat = /^(([^:/]+):\/\/([^/]*))?(\/(.*?))?(\?.*?)?(#.*)?$/
dotPat = /\/\.(?=\/|$)/g
parentPat = /^\/\.\.|\/[^/]+?\/\.\./g

class URI
  constructor: (src, relative)->
    if relative then src = new URI(src).relativePath relative
    if match = src.match urlPat
      if match[2]
        @scheme = match[2].toLowerCase()
        @host = match[3]
      @path = if match[5] then @normalize ((if @scheme then '/' else '') + match[5]).replace dotPat, '' else '/'
      @search = match[6] ? ''
      @fragment = match[7] ? ''
  appendParams: (char, old, str)-> "#{old}#{if old then '&' else char}#{str}"
  appendSearch: (str)-> @search = @appendParams '?', @search, str
  appendFragment: (str)-> @fragment = @appendParams '#', @fragment, str
  normalize: (path)->
    while true
      replaced = false
      path = path.replace parentPat, (match)->
        replaced = true
        ''
      if !replaced then break
    path
  relative: (path)-> new URI @relativePath path
  relativePath: (path)->
    u = new URI path
    if u.scheme then u.toString()
    else
      (if @scheme then "#{@scheme}://#{@host}" else '') + (
        if path.match /^\// then path
        else if @path.match /\/$/ then "#{@path}#{path}"
        else "#{@path}/../#{path}")
  toString: -> (if @scheme then "#{@scheme}://#{@host}" else "") + @path + (@search ? "") + (@fragment ? "")
  getSearchParams: -> getParams @search ? ''
  getFragParams: -> getParams @fragment ? ''
  paramString: (paramObj)-> ("#{k}=#{v}" for k, v of paramObj).join('&')
  setSearchParams: (paramObj)-> @search = "?#{@paramString paramObj}"; @
  setFragParams: (paramObj)-> @fragment = "##{@paramString paramObj}"; @
  pathName: -> (@path.match /\/[^/]*$/)[0].substring 1
  pathParent: -> (@path.match /^.*\/(?=[^/]*$)/)[0]

getParams = (str)->
  params = {}
  if str != ''
    for param in str.substring(1).split '&'
      match = param.match /^([^=]+)=(.*)$/
      if match
        [m, key, value] = match
        params[key] = decodeURIComponent value
  params

if window?
  window.URI = URI
else
  module.exports = URI
