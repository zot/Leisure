{
  resolve,
  lazy,
  defaultEnv,
} = root = module.exports = require './base'
{
  Headline,
  Meat,
  Keyword,
  Source,
  Results,
} = require 'org'
{
  loadOrg,
} = require './orgSupport'
{
  initCollaboration,
} = require './collaborate'

Github = require 'github'

connection = null
repo = null
commentIssues = {}
commentIssueURLs = {}

initStorage = ->
  uri = new URI document.location.toString()
  if load = uri.getFragParams().load then useUrl decodeURIComponent load
  else
    #$('#login').css 'display', ''
    #$('#panel').css 'display', 'none'
    $('#name').val localStorage.getItem 'githubName'
    $('#password').val localStorage.getItem 'githubPassword'
    $('#user').val localStorage.getItem 'githubUser'
    $('#repository').val localStorage.getItem 'githubRepository'
    $('#file').val localStorage.getItem 'githubFile'

currentFile = null

lastUpdate = 0

getContent = (data)-> atob data.content

useUrl = (url)->
  ($.get url, (data)->
    loadOrg $('[maindoc]')[0], data, (if url.match /^\w+:/ then new URI(url).path else url)
    initCollaboration url, data
    document.body.classList.remove 'not-logged-in'
    checkEvents lastUpdate, 1, []
  ).fail (err)-> alert("Couldn't load url: #{url}")

useFile = (file)->
  reader = new FileReader()
  reader.onload = (e)-> loadOrg $('[maindoc]')[0], e.target.result, file.path ? file.name
  reader.readAsText file
  document.body.classList.remove 'not-logged-in'
  checkEvents lastUpdate, 1, []

githubParams = null

connectStorage = ->
  localStorage.setItem 'githubName', name = decodeURIComponent $('#name').val()
  localStorage.setItem 'githubPassword', password = decodeURIComponent $('#password').val()
  localStorage.setItem 'githubUser', user = decodeURIComponent $('#user').val()
  localStorage.setItem 'githubRepository', repository = decodeURIComponent $('#repository').val()
  localStorage.setItem 'githubFile', currentFile = decodeURIComponent $('#file').val()
  # github api lib seems to use both name and repo for the respository name
  root.githubParams = githubParams =
    user: user
    name: repository
    repo: repository
    repository: repository
    file: currentFile
    username: name
    password: password
  connection = root.githubConnect username: name, password: password
  root.repo = repo = root.getRepo githubParams
  repo.getEvents null, (err, data)->
    if err then console.log "ERROR: #{JSON.stringify err, null, ' '}"; return
    lastUpdate = new Date(data[0].created_at).getTime()
    getAllIssuesAndCommentsThen connection, user, repository, (issueList)->
      if !(storageListener in root.reparseListeners) then root.reparseListeners.push storageListener
      contents = repo.contents 'master', currentFile, (err, data)->
        if !err then loadOrg $('[maindoc]')[0], data, currentFile
        else alert "ERROR: #{err}"
        document.body.classList.remove 'not-logged-in'
        checkEvents lastUpdate, 1, []

storeInGit = (contents, path, branch, cb)-> repo.setContents branch ? 'master', path ? githubParams.file, contents, cb

isIssueEvent = (event)-> event.type in ['IssueCommentEvent', 'IssuesEvent']

window.EVENTS = []

checkEvents = (lastUp, page, events)->
  if repo?
    repo.getEvents {page: page}, (err, data)->
      if err then console.log "ERROR: #{JSON.stringify err, null, ' '}"; return
      if data.length > 0 && data && (time = new Date(data[0].created_at).getTime()) > lastUp
        window.EVENTS.push data
        while data.length > 0 && isIssueEvent(data[0]) && (time = new Date(data[0].created_at).getTime()) > lastUp
          data[0].time = time
          if time > lastUpdate then lastUpdate = time
          if data[0].type == 'IssueCommentEvent' then addComment data[0].payload.comment
          events.push data.shift()
        checkEvents lastUp, page + 1, events
      else
        events.sort (a, b)-> a.time - b.time
        issues = {}
        for event in events
          issues[event.payload.issue.url] = true
        refreshIssueData 0, (url for url of issues), (i)->
          redrawIssues i
        setTimeout (-> checkEvents lastUpdate, 1, []), 1000

redrawAllIssues = ->
  for name, issue of commentIssues
    root.currentMode.redrawIssue issue

redrawIssues = (issues)->
  for issue in issues
    if issue
      for l in issue.labels
        if l.name == 'comment' then root.currentMode.redrawIssue issue
        break

getRelevantIssueName = (issue)->
  if match = issue.title.trim().match new RegExp "^#{currentFile}:(.*)$"
    issue.leisureName = match[1]
  else null

redrawIssue = (issue)->
  if issueName = getRelevantIssueName issue
    if !(name = $("[data-org-comments='#{issueName}']")).length
      nameEl = $("[data-org-name='#{issueName}']")
      if !nameEl.length then return
      name = $(nameEl).after("<span data-org-comments='#{issueName}'></span>").next()
      root = name[0].createShadowRoot()
      root.applyAuthorStyles=true
    console.log "first gravatar: #{issue.comments[0].gravatar_id}"
    name[0]?.shadowRoot.innerHTML = "#{commentHtml issue, 'main'}#{(commentHtml c, 'added' for c in issue.comments).join ''}"

commentHtml = (comment, type)->
  "<div class='commentbox'><img src='http://gravatar.com/avatar/#{comment.user.gravatar_id}?s=48'><div class='#{type}'>#{comment.body}</div></div>"

addComment = (comment)->
  if issue = commentIssueURLs[comment.issue_url]
    for i in [0...issue.comments.length]
      if issue.comments[i].url == comment.url
        issue.comments[i] = comment
        return
    issue.comments.push comment

addIssue = (issue)->
  if name = getRelevantIssueName issue
    for label in issue.labels
      if label.name == 'comment'
        commentIssues[name] = issue
        commentIssueURLs[issue.url] = issue
        return
    # if this not a comment issue, but it used to be, remove the old data
    if commentIssueURLs[issue.url]
      delete commentIssues[name]
      delete commentIssueURLs[issue.url]

refreshIssueData = (index, urls, cont)->
  if index < urls.length then Github._request "GET", urls[index], null, (err, data)->
    if err then console.log "ERROR: #{JSON.stringify err, null, ' '}"; return
    if data.comments_url?
      for l in data.labels
        if l.name == 'comment'
          data.comments = commentIssueURLs[data.url]?.comments ? []
          addIssue data
          break
    refreshIssueData index + 1, urls, cont
  else cont (commentIssueURLs[issue] for issue in urls)

createComment = (funcName, comment, user, repository, file)->
  if issue = commentIssues[funcName]
    Github._request "POST", "/repos/#{user ? githubParams.user}/#{repository ? githubParams.repository}/issues/#{issue.number}/comments", body: comment, (err, data)->
      console.log "GITHUB #{if err then 'ERROR' else 'SUCCESS'}: #{JSON.stringify err ? data}"
  else
    data =
      title: "#{file ? githubParams.file}:#{funcName}"
      body: comment
      labels: ['comment']
    Github._request "POST", "/repos/#{user ? githubParams.user}/#{repository ? githubParams.repository}/issues", data, (err, data)->
      console.log "GITHUB #{if err then 'ERROR' else 'SUCCESS'}: #{JSON.stringify err ? data}"

# handleGithubEvent = (event)->
#   if event.type == 'IssueCommentEvent'
#     event.payload.comment.body
#   name = event.payload.issue.title

getAllIssuesAndCommentsThen = (con, userName, repoName, block)->
  issues = con.getIssues(userName, repoName)
  issues.list {}, (err, issueList)->
    if !err
      num = 0
      processComments = ->
        if num < issueList.length
          found = false
          for l in issueList[num].labels ? []
            if l.name == 'comment'
              found = true
              addIssue issueList[num]
              issueList[num].comments = []
              getComments = (page)-> issues.getComments issueList[num].number, {page: page}, (err, comments)->
                if err then console.log "ERROR FETCHING COMMENTS FOR ISSUE #{num}: #{err}"
                else if comments.length == 0
                  num++
                  processComments()
                else
                  issueList[num].comments.push comments...
                  getComments page + 1
              getComments 1
          if !found
            num++
            processComments()
        else block issueList
      processComments()
    else block []

storageListener = (parent, orgNode, orgText)->
  orgNode.scan (node)->
    if node instanceof Source
      name = node.prev
      while name && !(name instanceof Keyword && name.name.match /name/i) && !(name instanceof Source) && !(name instanceof Headline)
        name = name.prev
      if name instanceof Keyword && name.name.match /name/i
        if (issue = commentIssues[name.info.trim()]) then root.currentMode.redrawIssue issue

root.initStorage = initStorage
root.connectStorage = connectStorage
root.redrawAllIssues = redrawAllIssues
root.useFile = useFile
root.createComment = createComment
root.storeInGit = storeInGit
root.repo = repo
