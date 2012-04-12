Statify
=======

This is a simple static file server tool running on node.js and the Connect middleware framework.

It basically wraps the connect-static and connect-staticCache middleware to form a command line tool.

Installation
------------

Statify can be installed via NPM

```npm install -g statify```

Usage
-----

You can start a static HTTP server in any directory by launching the ```statify``` command in the current directory or by supplying another directory with the ```-d``` option. The default is the current working directory.

The ```-p``` option lets you specify the port that the server will be listening on. It defaults to port 8000.

Caching is enabled by default. It can be disabled by passing the ```-c false``` option.

```-l``` enables simplistic directories listing.

Example: ```statify -d ~/Downloads -p 3000 -c false``` will serve your "Downloads" directory without caching on port 3000.

