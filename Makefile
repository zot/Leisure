####
# Copyright (C) 2013, Bill Burdick
# License: ZLIB license
####

## Note, the lua tests depend on lua5.1, luarocks, and these luarocks: underscore, luajson
## It uses lua5.1 to maintain compatibility with LuaJIT

SHARED_SRC=base ast gen runtime
SRC=$(SHARED_SRC) testing simpleParseJS repl
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
NEW_COFFEE_SRC=uri prims browserMain notebook
NEW_COFFEE=$(NEW_COFFEE_SRC:%=newCode/%.coffee)
NEW_COFFEE_JS=$(NEW_COFFEE_SRC:%=lib/%.js)
NEW_LSR_SRC=std svg
NEW_LSR=$(NEW_LSR_SRC:%=newCode/%.lsr)
NEW_LSR_JS=$(NEW_LSR_SRC:%=lib/%.js)
BROWSER_SRC=$(SHARED_SRC) $(NEW_LSR_SRC) $(NEW_COFFEE_SRC) generatedPrelude xus
BROWSER_INPUT=$(BROWSER_SRC:%=lib/%.js)
BROWSER_JS=lib/browser.js
WEB_SRC=bootLeisure
WEB_COFFEE=$(WEB_SRC:%=newCode/%.coffee)
WEB_JS=$(WEB_SRC:%=www/%.js)
CSS_SRC=leisure gaudy thin cthulhu
CSS_FILES=$(CSS_SRC:%=%.css)
CSS_OUT=lib/all.css

all: .tested .parserTested $(NEW_LSR_JS) $(BROWSER_JS) $(WEB_JS)

$(BROWSER_JS): $(BROWSER_INPUT)
	if [ ! -e node_modules/browserify ]; then npm install browserify; fi
	node_modules/browserify/bin/cmd.js lib/browserMain.js -o $@

$(CSS_OUT): $(CSS_FILES)
	cat $(CSS_SRC) > $(CSS_OUT)

repl: all FRC
	core/repl

#cp lib/browser.map "www/leisureJS-$$(sha256sum lib/browser.js|awk '{print $$1}').map"

$(WEB_JS): $(BROWSER_JS) $(WEB_COFFEE) $(CSS_OUT)
	node_modules/coffee-script/bin/coffee -o $(LIB) -mc newCode/bootLeisure.coffee
	rm -f www/leisureJS-* www/leisureCSS-*
	cp lib/browser.js "www/leisureJS-$$(sha256sum lib/browser.js|awk '{print $$1}').js"
	cp lib/all.css "www/leisureCSS-$$(sha256sum lib/all.css|awk '{print $$1}').js"
	sed -e "s/JSHASH/$$(sha256sum lib/browser.js|awk '{print $$1}')/;s/CSSHASH/$$(sha256sum lib/all.css|awk '{print $$1}')/" newCode/bootTemplate > www/bootLeisure.js
	cat lib/bootLeisure.js >> www/bootLeisure.js
	cp lib/uri.* www

$(NEW_COFFEE_JS): $(NEW_COFFEE)
	node_modules/coffee-script/bin/coffee -o $(LIB) -mc $(@:lib/%.js=newCode/%.coffee)

$(NEW_LSR_JS): $(NEW_LSR) $(NEW_COFFEE_JS)
	node lib/repl -c -d lib $(@:lib/%.js=newCode/%.lsr)

$(PRELUDE): $(COFFEE_JS) $(PRELUDE_FILES)
	rm -f core/generatedPrelude.lsr
	for i in $(PRELUDE_FILES); do cat $$i >> core/generatedPrelude.lsr; echo >> core/generatedPrelude.lsr; done
	node lib/repl -0 -c -d lib core/simpleParse.lsr
	node lib/repl -v -1 -c -d lib core/generatedPrelude.lsr

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
