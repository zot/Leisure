set DIR=%~dp0%
set INST=%~dp0%packages\leisure\build\
set NODE_PATH=%DIR%lib;%DIR%client;%INST%\lib;%INST%\src;%INST%\node_modules
node --stack-size=3000 "%INST%\src\runRepl" %*%
