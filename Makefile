####
# Copyright (C) 2013, Bill Burdick
# License: ZLIB license
####

## Note, the lua tests depend on lua5.1, luarocks, and these luarocks: underscore, luajson
## It uses lua5.1 to maintain compatibility with LuaJIT

SRC=base ast testing gen runtime simpleParse browser repl
TEST=testLeisure
ALL=$(SRC) $(TEST)
IN_FILES=$(ALL:%=core/%)
OUT_FILES=$(ALL:%=lib/%.js) $(ALL:%=lib/%.map)
DIR=core
LIB=lib

all: $(TEST) coffeescript-tests lua-tests

repl:
	node_modules/coffee-script/bin/coffee -o $(LIB) -mc $(DIR)
	node -e "var r=require('./$(LIB)/repl');r.runRepl()"

$(TEST):
	node_modules/coffee-script/bin/coffee -o $(LIB) -mc $(DIR)

coffeescript-tests: FRC
	node $(LIB)/$(TEST)

lua-tests: FRC
	(cd core; eval $(luarocks path) ; lua5.1 -lluarocks.loader testLeisure.lua)

clean:
	rm -f $(OUT_FILES)

FRC:
