# Build script for local Leisure

path = require 'path'
fs = require "fs"
{spawn, exec} = require 'child_process'
allFiles = []
copyFiles = {}
buildFiles = []
changed = false

destFile = (f, removePrefix, replaceSuffix)->
  base = path.basename f
  if replaceSuffix then base = base.replace /\.(lit)?coffee$/, '.js'
  if removePrefix then "private/build/#{base.replace /^([0-9]+-)*/, ''}"
  else "private/build/#{base}"

isNewer = (src, dst)->
  sTime = dTime = null
  try sTime = fs.statSync(src)?.mtime
  try dTime = fs.statSync(dst)?.mtime
  sTime && (!dTime || sTime > dTime)

cp = (src, dst)-> fs.createReadStream(src).pipe(fs.createWriteStream(dst))

try
  whichMods = path.normalize "#{process.cwd()}/private/node_modules/which"
  which = require(whichMods).sync
catch err
  if process.platform.match(/^win/)?
    console.log 'WARNING: the which module is required for windows\ntry: npm install which'
  which = null

fileTree = [
  ['packages/leisure/build/lib',
    'lodash.min.js'],
  ['packages/org',
    'preamble.js',
    'registry.litcoffee',
    'lazy.js',
    'yaml.js',
    'org.coffee',
    'docOrg.litcoffee'],
  ['lib',
    '05-immutable.js',
    '10-namespace.litcoffee',
    #'11-l.litcoffee',
    #'15-libs.coffee',
    ],
  ['client',
    '10-bluebird.min.js',
    '10-jquery-1-8-2.min.js',
    #'11-adiff.js',
    #'11-start.js',
    #'12-browser.js',
    #'12-coffee-script.js',
    #'13-uri.coffee',
    #'14-shim.coffee',
    #'15-base.coffee',
    #'16-ast.coffee',
    #'17-runtime.coffee',
    #'18-gen.coffee',
    #'19-generatedPrelude.js',
    #'19-generatedPrelude.js.map',
    #'19-generatedPrelude.lsr',
    #'20-handlebars-v1.3.0.js',
    #'20-std.js',
    #'20-templating.litcoffee',
    #'21-browserSupport.coffee',
    #'22-svg.js',
    '22-domCursor.litcoffee',
    #'23-collaborate.litcoffee',
    '23-editor.litcoffee',
    '23-1-editorSupport.litcoffee',
    #'24-orgSupport.litcoffee',
    #'25-githubExtensions.coffee',
    #'26-storage.coffee',
    #'27-highlighting.litcoffee',
    #'27-notebook.coffee',
    #'28-fancyOrg.coffee',
    #'29-parseAst.js',
    #'30-mutation-summary.js',
    #'31-leisure-support.litcoffee',
    ],
  ['private/local',
    'diag.litcoffee',
    'local.litcoffee',
    ],
  ['packages/org',
    'source-map.js'],

]

for f in fileTree
  dir = f.shift()
  for child in f
    file = path.normalize "#{dir}/#{child}"
    if child.match(/^.*\.(lit)?coffee$/)
      allFiles.push destFile file, true, true
      if isNewer file, destFile file, true
        buildFiles.push destFile file, true
        copyFiles[file] = destFile file, true
        changed = true
        console.log "building #{file}"
    else
      allFiles.push destFile file, true
      if isNewer file, destFile file, true
        copyFiles[file] = destFile file, true
        changed = true
        console.log "copying #{file}"

# ANSI Terminal Colors
bold = '\x1b[0;1m'
green = '\x1b[0;32m'
reset = '\x1b[0m'
red = '\x1b[0;31m'

task 'build', 'compile source', (options) ->
  makeHtml 'index.html', allFiles
  for src, dst of copyFiles
    cp src, dst
  build false, (-> log ":-)", green)

# ## *log* 
# 
# **given** string as a message
# **and** string as a color
# **and** optional string as an explanation
# **then** builds a statement and logs to console.
# 
log = (message, color, explanation) -> console.log color + message + reset + ' ' + (explanation or '')

# ## *launch*
#
# **given** string as a cmd
# **and** optional array and option flags
# **and** optional callback
# **then** spawn cmd with options
# **and** pipe to process stdout and stderr respectively
# **and** on child process exit emit callback if set and status is 0
launch = (cmd, options=[], callback) ->
  cmd = which(cmd) if which
  app = spawn cmd, options
  app.stdout.pipe(process.stdout)
  app.stderr.pipe(process.stderr)
  app.on 'exit', (status) ->
    if status is 0
      callback()
    else
      process.exit(status)

# ## *build*
#
# **given** optional boolean as watch
# **and** optional function as callback
# **then** invoke launch passing coffee command
# **and** defaulted options to compile src to lib
build = (watch, callback, output = 'private/build') ->
  if buildFiles.length
    if typeof watch is 'function'
      callback = watch
      watch = false
    #options = ['-c', '-b']
    options = ['-c']
    options.push("--map")
    options.push("-o")
    options.push path.normalize output
    options = options.concat buildFiles
    options.unshift '-w' if watch
    launch 'coffee', options, callback
  else process.exit 0

path.split = (p)->
  d = path.dirname p
  if d != p
    if d == '.' then []
    else
      components = path.split d
      components.push path.basename p
      components
  else [path.basename p]

path.posify = (n)->
  components = path.split path.normalize n
  p = components.shift()
  for component in components
    p += "/" + component
  p

makeHtml = (filename, files)->
  if changed
    console.log "making html"
    fs.writeFileSync filename, """
      <html>
        <head>
          <link rel="stylesheet" href="public/local.css"></link>
          <link rel="stylesheet" href="public/prism/prism.css"></link>
          <link rel="stylesheet" href="public/prism/spinner.css"></link>
          <link id='jqueryuiLink' rel="stylesheet" href="public/jquery-ui/css/leisure/jquery-ui-1.9.2.custom.min.css"></link>
          <link rel="stylesheet" href="public/themes.css"></link>
          #{("<script src='#{file}'></script>" for file in files).join '\n    '}
          <script src="public/jquery-ui/js/jquery-ui-1.9.1.custom.js"></script>
        </head>
        <body>
          <div maindoc contenteditable='true'></div>
        </body>
      </html>
      """
