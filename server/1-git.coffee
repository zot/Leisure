####
# fs-only storage until we get the git connection working again
####

root = global.Leisure

#git = Meteor.require 'nodegit'
fs = Meteor.require 'fs'
Fiber = Meteor.require 'fibers'
Future = Meteor.require 'fibers/future'
path = Meteor.require 'path'

docsDir = path.resolve '../../../../../../docs'
usingGit = false
#currentIndex = null

#fRepo = Future.wrap (dir, cb)-> git.Repo.open dir, cb
fStat = Future.wrap (name, cb)-> fs.stat name, cb
fReadFile = Future.wrap (name, cb)-> fs.readFile name, cb
fWriteFile = Future.wrap (name, contents, cb)-> fs.writeFile name, contents, cb

docFile = (name)-> "#{docsDir}/#{name}"
readFile = (name)-> fReadFile(name).wait()
writeFile = (name, contents)-> fWriteFile(name, contents).wait()
statFile = (name)-> fStat(name).wait()

snapshot = (doc)->
  objs = {}
  text = ''
  for obj in doc.find().fetch()
    objs[obj._id] = obj
    if obj.info then objs.info = obj
  cur = objs.info.head
  while cur
    text += objs[cur].text
    cur = objs[cur].next
  storeFile doc.leisure.name, text
  true

storeFile = (name, contents)-> writeFile docFile(name), contents

loadFile = (name)-> readFile docFile name

hasFile = (name)-> statFile(docFile(name))?

#git.Repo.fibers = open: (dir, owner, ownerEmail)->addRepoFibers fRepo(dir).wait(), owner, ownerEmail
#
#addRepoFibers = (r, owner, ownerEmail)->
#  console.log "OWNER: #{owner}, email: #{ownerEmail}"
#  r.fibers =
#    owner: owner
#    ownerEmail: ownerEmail
#    openIndex: -> addIndexFibers r, Future.wrap((cb)-> r.openIndex cb)().wait()
#    openAndReadIndex: ->
#      ind = r.fibers.openIndex()
#      ind.fibers.read()
#    referenceOidForName: (name)-> Future.wrap((cb)-> git.Reference.oidForName r, name, cb)().wait()
#    getCommit: (oid)-> Future.wrap((cb)-> r.getCommit oid, cb)().wait()
#    getBlob: (oid)-> Future.wrap((cb)-> r.getBlob oid, cb)().wait()
#    createCommit: (ref, author, committer, msg, treeOid, parents)->
#      Future.wrap((cb)-> r.createCommit ref, author, committer, msg, treeOid, parents, cb)().wait()
#  r
#
#addIndexFibers = (r, ind)->
#  ind.fibers =
#    repo: r
#    read: ->
#      Future.wrap((cb)-> ind.read cb)().wait()
#      ind
#    addByPath: (path)->
#      Future.wrap((cb)-> ind.addByPath path, cb)().wait()
#      ind
#    write: ->
#      Future.wrap((cb)-> ind.write cb)().wait()
#      ind
#    writeTree: -> Future.wrap((cb)-> ind.writeTree cb)().wait()
#    commit: (ref, msg, author, authorEmail, committer, committerEmail)->
#      ind.fibers.write()
#      treeOid = ind.fibers.writeTree()
#      headOid = r.fibers.referenceOidForName ref
#      parent = r.fibers.getCommit headOid
#      d = new Date()
#      time = Math.round(d.getTime() / 1000)
#      zone = d.getTimezoneOffset()
#      author = git.Signature.create (author ? r.fibers.owner), (authorEmail ? r.fibers.ownerEmail), time, zone
#      committer = git.Signature.create (committer ? r.fibers.owner), (committerEmail ? r.fibers.ownerEmail), time, zone
#      r.fibers.createCommit ref, author, committer, msg, treeOid, [parent]
#    getByPath: (path)->
#      i = ind.find path
#      if i > -1 then r.fibers.getBlob(ind.entry(i).oid())
#  ind
#
#storeFile = (name, contents)->
#  if ind = currentIndex
#    console.log "SNAPSHOT #{name}\n\n#{contents}"
#    writeFile path.resolve(docsDir, name), contents
#    ind.fibers.addByPath name
#    commitOid = ind.fibers.commit 'HEAD', 'snapshot'
#    console.log "COMMITED SNAPSHOT:", commitOid
#    true
#
#loadFile = (name)-> currentIndex?.fibers.read().fibers.getByPath(name).content()
#
#hasFile = (name)-> currentIndex?.find(name)?
#
#if (process.env.LEISURE_NO_GIT?.length ? 0) == 0
#  try
#    #currentIndex = git.Repo.fibers.open(docsDir, 'leisure', 'leisure@textcraft.org').fibers.openAndReadIndex()
#    usingGit = fStat(path.resolve "#{docsDir}/.git")?.isDirectory()
#  catch err
#    console.log err.stack

root.git =
  snapshot: snapshot
  hasFile: hasFile
  readFile: loadFile
  hasGit: usingGit
