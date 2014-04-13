set DIR=%~dp0%packages\leisure\build
set NODE_PATH=%DIR%\lib;%DIR%\node_modules
node --stack-size=3000 "%DIR%\src\runRepl" %*%
