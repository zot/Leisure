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
} = require './org'
{
  reparse,
} = require './orgSupport'

Github = require './github'

connection = null
repo = null
commentIssues = {}
commentIssueURLs = {}

initStorage = ->
  #$('#login').css 'display', ''
  #$('#panel').css 'display', 'none'
  $('#name').val localStorage.getItem 'githubName'
  $('#password').val localStorage.getItem 'githubPassword'
  $('#user').val localStorage.getItem 'githubUser'
  $('#repository').val localStorage.getItem 'githubRepository'
  $('#file').val localStorage.getItem 'githubFile'

lastUpdate = 0

getContent = (data)-> atob data.content

connectStorage = ->
  localStorage.setItem 'githubName', name = $('#name').val()
  localStorage.setItem 'githubPassword', password = $('#password').val()
  localStorage.setItem 'githubUser', user = $('#user').val()
  localStorage.setItem 'githubRepository', repository = $('#repository').val()
  localStorage.setItem 'githubFile', file = $('#file').val()
  connection = root.githubConnect username: name, password: password
  repo = connection.getRepo user, repository
  repo.getEvents null, (err, data)->
    if err then console.log "ERROR: #{JSON.stringify err, null, ' '}"; return
    lastUpdate = new Date(data[0].created_at).getTime()
    getAllIssuesAndCommentsThen connection, user, repository, (issueList)->
      if !(storageListener in root.reparseListeners) then root.reparseListeners.push storageListener
      contents = repo.contents 'master', file, (err, data)->
        if !err then reparse $('[maindoc]')[0], data
        else alert "ERROR: #{err}"
        document.body.classList.remove 'not-logged-in'
        checkEvents lastUpdate, 1, []

isIssueEvent = (event)-> event.type in ['IssueCommentEvent', 'IssuesEvent']

window.EVENTS = []

checkEvents = (lastUp, page, events)->
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
    root.currentMode.redrawIssue issue

redrawIssue = (issue)->
  issueName = issue.title.trim()
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
  for label in issue.labels
    if label.name == 'comment'
      commentIssues[issue.title.trim()] = issue
      commentIssueURLs[issue.url] = issue
      return
  delete commentIssues[issue.title.trim()]
  delete commentIssueURLs[issue.url]

refreshIssueData = (index, urls, cont)->
  if index < urls.length then Github._request "GET", urls[index], null, (err, data)->
    if err then console.log "ERROR: #{JSON.stringify err, null, ' '}"; return
    if data.comments_url?
      data.comments = commentIssueURLs[data.url]?.comments ? []
      addIssue data
    refreshIssueData index + 1, urls, cont
  else cont (commentIssueURLs[issue] for issue in urls)

handleGithubEvent = (event)->
  if event.type == 'IssueCommentEvent'
    event.payload.comment.body
  name = event.payload.issue.title

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
