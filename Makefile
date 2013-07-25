####
# Copyright (C) 2013, Bill Burdick
# License: ZLIB license
####

## Note, the lua tests depend on lua5.1, luarocks, and these luarocks: underscore, luajson
## It uses lua5.1 to maintain compatibility with LuaJIT

SRC=base ast testing gen runtime simpleParseJS browser repl
TEST=testLeisure
TEST_PARSER=testParser
ALL=$(SRC) $(TEST) $(TEST_PARSER) generatedPrelude simpleParse
LIB=lib
PRELUDE_INPUT=simpleParse simpleParse2
PRELUDE_FILES=$(PRELUDE_INPUT:%=core/%.lsr)
PRELUDE=lib/generatedPrelude.js
OUT_FILES=$(ALL:%=lib/%.js) $(ALL:%=lib/%.map) $(ALL:%=lib/%.ast)
COFFEE_FILES=$(SRC:%=core/%.coffee) $(TEST:%=core/%.coffee)
COFFEE_JS=$(SRC:%=lib/%.js)
NEW_COFFEE_SRC=uri prims
NEW_COFFEE=$(NEW_COFFEE_SRC:%=newCode/%.coffee)
NEW_COFFEE_JS=$(NEW_COFFEE_SRC:%=lib/%.js)
NEW_LSR_SRC=std
NEW_LSR=$(NEW_LSR_SRC:%=newCode/%.lsr)
NEW_LSR_JS=$(NEW_LSR_SRC:%=lib/%.js)

all: .tested .parserTested $(NEW_LSR_JS)

repl: all FRC
	core/repl

$(NEW_COFFEE_JS): $(NEW_COFFEE)
	node_modules/coffee-script/bin/coffee -o $(LIB) -mc $(@:lib/%.js=newCode/%.coffee)

$(NEW_LSR_JS): $(NEW_LSR) $(NEW_COFFEE_JS)
	node lib/repl -c -d lib $(@:lib/%.js=newCode/%.lsr)

$(PRELUDE): $(COFFEE_JS) $(PRELUDE_FILES)
	rm -f core/generatedPrelude.lsr
	for i in $(PRELUDE_FILES); do cat $$i >> core/generatedPrelude.lsr; echo >> core/generatedPrelude.lsr; done
	node lib/repl -0 -c -d lib core/simpleParse.lsr
	node lib/repl -1 -c -d lib core/generatedPrelude.lsr

.tested: $(TEST:%=core/%.coffee) $(PRELUDE)
	node_modules/coffee-script/bin/coffee -o $(LIB) -mc core/testLeisure.coffee
	node $(LIB)/$(TEST)
	touch $@

.parserTested: $(TEST_PARSER:%=core/%.coffee) $(PRELUDE)
	node_modules/coffee-script/bin/coffee -o $(LIB) -mc core/testParser.coffee
	node $(LIB)/$(TEST_PARSER) && touch $@

lib/%.js: core/%.coffee
	node_modules/coffee-script/bin/coffee -o $(LIB) -mc $?

lua-tests: FRC
	(cd core; eval $(luarocks path) ; lua5.1 -lluarocks.loader testLeisure.lua)

clean:
	rm -f $(OUT_FILES) .tested .parserTested

FRC:
