rem @echo off
set DIR=%~dp0%leisure/build
set BUILD=%~dp0%build
set NODE_PATH=%BUILD%;%BUILD%/leisure;%BUILD%/lib;%BUILD%/node_modules;%DIR%/node_modules;%DIR%/lib"
rem node --stack-size=100000 "%INST%\src\runRepl" %*%
node --stack-size=10000 "%DIR%\src\runRepl" %*%
