####
# Copyright (C) 2013, Bill Burdick
# License: ZLIB license
####

## Note, the lua tests depend on lua5.1, luarocks, and these luarocks: underscore, luajson
## It uses lua5.1 to maintain compatibility with LuaJIT

SRC=base ast testing gen runtime simpleParseJS browser repl
TEST=testLeisure
ALL=$(SRC) $(TEST) generatedPrelude simpleParse
DIR=core
LIB=lib
PRELUDE_INPUT=simpleParse simpleParse2
PRELUDE_FILES=$(PRELUDE_INPUT:%=core/%.lsr)
PRELUDE=lib/generatedPrelude.js
OUT_FILES=$(ALL:%=lib/%.js) $(ALL:%=lib/%.map) $(ALL:%=lib/%.ast)

all: $(TEST) coffeescript-tests lua-tests $(PRELUDE)
#all: $(TEST) coffeescript-tests lua-tests $(PRELUDE)

repl:
	node_modules/coffee-script/bin/coffee -o $(LIB) -mc $(DIR)
	node -e "var r=require('./$(LIB)/repl');r.run()"

$(PRELUDE): $(PRELUDE_FILES)
	cat $^ > core/generatedPrelude.lsr
	node lib/repl -0 -c -d lib core/simpleParse.lsr
	node lib/repl -1 -c -d lib core/generatedPrelude.lsr

$(TEST):
	node_modules/coffee-script/bin/coffee -o $(LIB) -mc $(DIR)

coffeescript-tests: FRC
	node $(LIB)/$(TEST)

lua-tests: FRC
	(cd core; eval $(luarocks path) ; lua5.1 -lluarocks.loader testLeisure.lua)

clean:
	rm -f $(OUT_FILES)

FRC:
