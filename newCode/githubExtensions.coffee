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
    @contents = contents options
    @setContents = setContents options
    this
  #Github.Repository.prototype = oldRepository.prototype
  Github.Repository.prototype.getEvents = (options, cb)-> Github._request "GET", "#{@path}/events#{if options?.page then '?page=' + options.page else ''}", options, cb
  con

getRepo = (params)->
  new Github.Repository params

#fixes error in path in github.js
#Sorry if (options)-> is arcane, here -- I needed contents to be a method with access to options
contents = (options)-> (branch, file, cb, sync)->
  url = "https://api.github.com#{@path}/contents/#{file}?ref=#{branch}"
  xhr = new XMLHttpRequest()
  xhr.open "GET", url, !sync
  xhr.setRequestHeader "Accept", "application/json"
  if !sync
    xhr.onreadystatechange = ->
      console.log "CHANGE: #{@readyState}"
      if this.readyState == 4
        console.log "RESPONSE: #{@responseText}"
        if this.status >= 200 && this.status < 300 || this.status == 304
          json = JSON.parse @responseText
          options.sha = json.sha
          cb null, atob(json.content.replace(/\n/g, '')), this
        else
          cb
            path: file
            request: this
            error: this.status
  if (options.token) || (options.username && options.password)
    xhr.setRequestHeader 'Authorization', (if options.token
    then 'token '+ options.token
    else 'Basic ' + Base64.encode options.username + ':' + options.password)
  xhr.send()
  if sync then xhr.response

setContents = (options)-> (branch, file, data, cb, sync)->
  #url = "https://api.github.com#{@path}/contents/#{file}?branch=#{branch}"
  url = "https://api.github.com#{@path}/contents/#{file}"
  xhr = new XMLHttpRequest()
  xhr.open "PUT", url, !sync
  xhr.setRequestHeader "Accept", "application/json"
  if !sync
    xhr.onreadystatechange = ->
      console.log "CHANGE: #{@readyState}"
      if this.readyState == 4
        console.log "RESPONSE: #{@responseText}"
        if this.status >= 200 && this.status < 300 || this.status == 304
          json = JSON.parse @responseText
          options.sha = json.sha
          (cb ? ->) null
        else
          (cb ? ->)
            path: file
            request: this
            error: this.status
  xhr.setRequestHeader 'Content-Type', 'application/json;charset=UTF-8'
  if (options.token) || (options.username && options.password)
    xhr.setRequestHeader 'Authorization', (if options.token
    then 'token '+ options.token
    else 'Basic ' + Base64.encode options.username + ':' + options.password)
  xhr.send JSON.stringify
    content: btoa(data)
    message: 'Commit from Leisure environment'
    sha: options.sha
    branch: branch
  if sync then xhr.response

root.githubConnect = connect
root.getRepo = getRepo
