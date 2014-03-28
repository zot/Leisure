####
# Copyright (C) 2013, Bill Burdick
# License: ZLIB license
####

## Note, the lua tests depend on lua5.1, luarocks, and these luarocks: underscore, luajson
## It uses lua5.1 to maintain compatibility with LuaJIT

SHA=$(shell basename $$(which  2>/dev/null sha256sum || which 2>/dev/null sha1sum))
NODE=node --max-stack-size=3000
SHARED_SRC=base ast gen runtime
SRC=$(SHARED_SRC) node testing simpleParseJS repl
TEST=testLeisure
TEST_PARSER=testParser
LIB=lib
PRELUDE_INPUT=simpleParse simpleParse2
PRELUDE_FILES=$(PRELUDE_INPUT:%=core/%.lsr)
PRELUDE=lib/generatedPrelude.js
COFFEE_FILES=$(SRC:%=core/%.coffee) $(TEST:%=core/%.coffee)
COFFEE_JS=$(SRC:%=lib/%.js)

NEWGEN_SRC=gen2
NEWGEN_COFFEE=$(NEWGEN_SRC:%=core/%.coffee)
NEWGEN_JS=$(NEWGEN_SRC:%=lib/%.js)

BROWSER_MAIN_SRC=browserMain
BROWSER_MAIN_COFFEE=$(BROWSER_MAIN_SRC:%=newCode/%.coffee)
BROWSER_MAIN_JS=$(BROWSER_MAIN_SRC:%=lib/%.js)

NEW_COFFEE_SRC=uri prims notebook md calcSupport browserSupport calcSkin
NEW_COFFEE=$(NEW_COFFEE_SRC:%=newCode/%.coffee)
NEW_COFFEE_JS=$(NEW_COFFEE_SRC:%=lib/%.js)

NEW_LSR_SRC=std svg calc parseAst gui
NEW_LSR=$(NEW_LSR_SRC:%=newCode/%.lsr)
NEW_LSR_JS=$(NEW_LSR_SRC:%=lib/%.js)

BROWSER_ONLY_SRC=generatedPrelude githubExtensions storage orgSupport fancyOrg collaborate
BROWSER_SRC=$(SHARED_SRC) $(NEW_LSR_SRC) $(NEW_COFFEE_SRC) $(BROWSER_ONLY_SRC) xus org socket.io
BROWSER_INPUT=$(BROWSER_SRC:%=lib/%.js)
BROWSER_JS=lib/browser.js
BROWSERIFY_EXCLUDE=-i xmlhttprequest

WEB_LEISURE_SRC=generatedPrelude std svg calc parseAst
WEB_LEISURE_FILES=$(WEB_LEISURE_SRC:%=lib/%.lsr) $(WEB_LEISURE_SRC:%=lib/%.js) $(WEB_LEISURE_SRC:%=lib/%.map)

WEB_SRC=bootLeisure
WEB_COFFEE=$(WEB_SRC:%=newCode/%.coffee)
WEB_JS=$(WEB_SRC:%=www/%.js)
WEB_MAPS=$(SHARED_SRC:%=lib/%.map) $(NEW_COFFEE_SRC:%=lib/%.map) $(WEB_SRC:%=lib/%.map)

CSS_SRC=leisure gaudy thin cthulhu
CSS_FILES=$(CSS_SRC:%=newCode/%.css)
CSS_OUT=lib/all.css
ALL=$(SRC) $(TEST) $(TEST_PARSER) generatedPrelude simpleParse $(NEW_LSR) $(NEW_COFFEE_SRC) $(WEB_SRC) ${BROWSER_ONLY_SRC}
OUT_FILES=$(ALL:%=lib/%.js) $(ALL:%=lib/%.map) $(ALL:%=lib/%.ast) $(CSS_OUT) $(WEB_JS) $(ALL:%=www/%.js) $(ALL:%=www/%.map)

SERVER_SRC=server startServer
SERVER_COFFEE=$(SERVER_SRC:%=newCode/%.litcoffee)
SERVER_JS=$(SERVER_SRC:%=lib/%.js)

all: $(PRELUDE) $(NEW_LSR_JS) $(BROWSER_JS) $(WEB_JS) $(NEWGEN_JS) $(SERVER_JS) .tested .parserTested

test:
	echo SHELL: $(SHELL)

clean:
	touch www/leisureJS- www/leisureCSS-
	rm -f $(OUT_FILES) .tested .parserTested www/leisureJS-* www/leisureCSS-*
	rm -f core/generatedPrelude.lsr

#node_modules/.bin/browserify -d $(BROWSERIFY_EXCLUDE) lib/browserMain.js -o $@.tmp
#sed -e '/\/\/@.*=data/n;/\/\/@/d' $@.tmp > $@

$(BROWSER_JS): $(BROWSER_INPUT) $(PRELUDE) $(NEW_LSR_JS) $(BROWSER_MAIN_JS)
	if [ ! -e node_modules/browserify ]; then npm install browserify; fi
	cp -f $(BROWSER_SRC:%=lib/%.js) $(BROWSER_SRC:%=lib/%.map) www
	cp $(WEB_LEISURE_FILES) www
	rm -rf www/core www/newCode
	mkdir www/core www/newCode
	cp -r core/*coffee www/core
	cp -r newCode/*coffee www/newCode
	node node_modules/browserify/bin/cmd.js lib/browserMain.js $(BROWSERIFY_EXCLUDE) -o $@ -d

$(CSS_OUT): $(CSS_FILES)
	cat $(CSS_FILES) > $(CSS_OUT)

repl: all FRC
	core/repl

$(WEB_JS): $(BROWSER_JS) $(WEB_COFFEE) $(CSS_OUT)
	cp lib/xus.js lib/github.js lib/mutation-summary.js lib/socket.io.js www
	./node_modules/coffee-script/bin/coffee -o $(LIB) -mc newCode/bootLeisure.coffee
	sleep 1
	sed -e 's/"sourceRoot": "\.\."/"sourceRoot": "."/' lib/bootLeisure.map > lib/tmp
	sleep 1
	mv lib/tmp lib/bootLeisure.map
	touch www/leisureJS- www/leisureCSS-
	rm -f www/leisureJS-* www/leisureCSS-*
	cp lib/browser.js "www/leisureJS-$$($(SHA) lib/browser.js|awk '{print $$1}').js"
	cp lib/all.css "www/leisureCSS-$$($(SHA) lib/all.css|awk '{print $$1}').css"
	sed -e "s/JSHASH/$$($(SHA) lib/browser.js|awk '{print $$1}')/;s/CSSHASH/$$($(SHA) lib/all.css|awk '{print $$1}')/" newCode/bootTemplate > www/bootLeisure.js
	cat lib/bootLeisure.js >> www/bootLeisure.js
	cp lib/uri.* www
	cp $(WEB_MAPS) www

lib/%.js: newCode/%.coffee
	./node_modules/coffee-script/bin/coffee -o $(LIB) -mc $(@:lib/%.js=newCode/%.coffee)
	sleep 1
	sed -e 's/"sourceRoot": "\.\."/"sourceRoot": "."/' $(@:%.js=%.map) > $(LIB)/tmp
	sleep 1
	mv $(LIB)/tmp $(@:%.js=%.map)

lib/%.js: newCode/%.litcoffee
	./node_modules/coffee-script/bin/coffee -o $(LIB) -mc $(@:lib/%.js=newCode/%.litcoffee)
	sleep 1
	sed -e 's/"sourceRoot": "\.\."/"sourceRoot": "."/' $(@:%.js=%.map) > $(LIB)/tmp
	sleep 1
	mv $(LIB)/tmp $(@:%.js=%.map)

lib/svg.js: newCode/svg.lsr
	$(NODE) lib/repl -c -d lib -r './std' $(@:lib/%.js=newCode/%.lsr)
	cp $(@:lib/%.js=newCode/%.lsr) lib
	sed -e 's/"sourceRoot": "\.\."/"sourceRoot": "."/' $(@:%.js=%.map) > $(LIB)/tmp
	sleep 1
	mv $(LIB)/tmp $(@:%.js=%.map)

lib/%.js: newCode/%.lsr $(NEW_COFFEE_JS)
	$(NODE) lib/repl -c -d lib $(@:lib/%.js=newCode/%.lsr)
	cp $(@:lib/%.js=newCode/%.lsr) lib
	sed -e 's/"sourceRoot": "\.\."/"sourceRoot": "."/' $(@:%.js=%.map) > $(LIB)/tmp
	sleep 1
	mv $(LIB)/tmp $(@:%.js=%.map)

$(PRELUDE): $(COFFEE_JS) $(PRELUDE_FILES)
	rm -f core/generatedPrelude.lsr lib/generatedPrelude.lsr
	for i in $(PRELUDE_FILES); do cat $$i >> core/generatedPrelude.lsr; echo >> core/generatedPrelude.lsr; done
	$(NODE) lib/repl -0 -c -d lib core/simpleParse.lsr
	$(NODE) lib/repl -1 -c -d lib core/generatedPrelude.lsr
	cp core/generatedPrelude.lsr lib

$(TEST:%=lib/%.js): $(TEST:%=core/%.coffee)
	./node_modules/coffee-script/bin/coffee -o $(LIB) -mc core/testLeisure.coffee

.tested: $(TEST:%=lib/%.js) $(PRELUDE)
	$(NODE) $(LIB)/$(TEST) && touch $@

$(TEST_PARSER:%=lib/%.js): $(TEST_PARSER:%=core/%.coffee)
	./node_modules/coffee-script/bin/coffee -o $(LIB) -mc core/testParser.coffee

.parserTested: $(TEST_PARSER:%=lib/%.js) $(PRELUDE)
	$(NODE) $(LIB)/$(TEST_PARSER) && touch $@

lib/%.js: core/%.coffee
	./node_modules/coffee-script/bin/coffee -o $(LIB) -mc $(@:lib/%.js=core/%.coffee)
	sleep 1
	sed -e 's/"sourceRoot": "\.\."/"sourceRoot": "."/' $(@:%.js=%.map) > $(LIB)/tmp
	sleep 1
	mv $(LIB)/tmp $(@:%.js=%.map)

lua-tests: FRC
	(cd lua; eval $(luarocks path) ; lua5.1 -lluarocks.loader testLeisure.lua)

FRC:
