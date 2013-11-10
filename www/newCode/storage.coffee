{
  resolve,
  lazy,
  defaultEnv,
} = root = module.exports = require './base'

Github = require './github'

connection = null
repo = null

initStorage = ->
  $('#login').css 'display', ''
  $('#panel').css 'display', 'none'
  $('#name').val localStorage.getItem 'githubName'
  $('#password').val localStorage.getItem 'githubPassword'
  $('#repository').val localStorage.getItem 'githubRepository'
  $('#file').val localStorage.getItem 'githubFile'

connectStorage = ->
  localStorage.setItem 'githubName', name = $('#name').val()
  localStorage.setItem 'githubPassword', password = $('#password').val()
  localStorage.setItem 'githubRepository', repository = $('#repository').val()
  localStorage.setItem 'githubFile', file = $('#file').val()
  connection = new Github username: name, passwd: password
  repo = connection.getRepo name, repository
  getAllIssuesAndComentsThen connection, repo, ->
    if !(storageListener in root.reparseListeners) then root.reparseListeners.push storageListener
    contents = repo.contents 'master', file, (err, data)->
      if !err then root.reparse $('[maindoc]')[0], data
      else alert "ERROR: #{err}"
      $('#panel').css 'display', ''
      $('#login').css 'display', 'none'

getAllIssuesAndComentsThen = (con, repo, block)->
  block()

storageListener = (element, orgNode, orgText)->

root.initStorage = initStorage
root.connectStorage = connectStorage
