Compiled version of main Leisure program

    requirejs.leisureCompiled = true

    if document.location.search.match /pop=/ then window.close()
    else require ['main']
