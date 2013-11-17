root = module.exports = require './base'
Base64 = require './base64'
Github = require './github'

Ext = {}

connect = (options)->
  con = new Github options
  for k, v of Ext
    con[k] = v
  oldIssue = Github.Issue
  Github.Issue = (options)->
    oldIssue.call this, options
    @path = "/repos/" + options.user + "/" + options.repo + "/issues"
  Github.Issue.prototype = oldIssue.prototype
  Github.Issue.prototype =
    getComments: (number, options, cb)->
      Github._request "GET", "#{@path}/#{number}/comments#{if options?.page then '?page=' + options.page else ''}", options, cb
  oldRepository = Github.Repository
  Github.Repository = (options)->
    oldRepository.call this, options
    @path = "/repos/" + options.user + "/" + options.name
    @contents = Github.Repository.prototype.contents
    this
  Github.Repository.prototype = oldRepository.prototype
  Github.Repository.prototype =
    #contents: (branch, file, cb, sync)-> Github._request "GET", "#{@path}/contents/#{file}?ref=#{branch}", null, cb, false, sync
    contents: (branch, file, cb, sync)->
      url = "https://api.github.com#{@path}/contents/#{file}?ref=#{branch}"

      xhr = new XMLHttpRequest()
      xhr.dataType = "json"
      xhr.open "GET", url, !sync
      if !sync
        xhr.onreadystatechange = ->
          console.log "CHANGE: #{@readyState}"
          if this.readyState == 4
            console.log "RESPONSE: #{@responseText}"
            if this.status >= 200 && this.status < 300 || this.status == 304
              cb null, @responseText, this
              #cb null, (if @responseText then JSON.parse @responseText else true), @
            else
              cb
                path: path
                request: this
                error: this.status
      xhr.setRequestHeader 'Accept', 'application/vnd.github.raw+json'
      xhr.setRequestHeader 'Content-Type', 'application/json;charset=UTF-8'
      if (options.token) || (options.username && options.password)
        xhr.setRequestHeader 'Authorization', (if options.token
        then 'token '+ options.token
        else 'Basic ' + Base64.encode options.username + ':' + options.password)
      xhr.send()
      if sync then xhr.response
    getEvents: (options, cb)-> Github._request "GET", "#{@path}/events#{if options?.page then '?page=' + options.page else ''}", options, cb
  con

root.githubConnect = connect
