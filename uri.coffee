urlPat = /^(([^:/]+):\/\/([^/]*))?(\/(.*?))?(\?.*?)?(#.*)?$/
dotPat = /\/\.(?=\/|$)/g
parentPat = /^\/\.\.|\/[^/]+?\/\.\./g

class URI
  constructor: (src)->
    if match = src.match urlPat
      if match[2]
        @scheme = match[2].toLowerCase()
        @host = match[3].toLowerCase()
      @path = if match[5] then @normalize ((if @scheme then '/' else '') + match[5]).replace dotPat, '' else '/'
      @search = match[6] ? ''
      @fragment = match[7] ? ''
  normalize: (path)->
    while true
      replaced = false
      path = path.replace parentPat, (match)->
        replaced = true
        ''
      if !replaced then break
    path
  relative: (path)->
    u = new URI path
    if u.scheme then u
    else
      new URI (if @scheme then "#{@scheme}://#{@host}" else '') + (
        if path.match /^\// then path
        else if @path.match /\/$/ then "#{@path}#{path}"
        else "#{@path}/../#{path}")
  toString: -> (if @scheme then "#{@scheme}://#{@host}" else "") + @path + (@search ? "") + (@fragment ? "")
  getSearchParams: ->
    if !@search then {}
    else getParams @search
  getFragParams: ->
    if !@fragment then {}
    else getParams @fragment
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
