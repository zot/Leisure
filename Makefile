DIR=packages/leisure/build
BROWSER_SRC=$(DIR)/src/browserMain.coffee
BROWSER=client/12-browser.js
LSR_MAIN=client/19-generatedPrelude.js client/20-std.js
LSR_AUX=client/22-svg.js client/29-parseAst.js
BUILT=$(BROWSER) $(LSR_MAIN) $(LSR_AUX)
ALL_BUILT=$(BUILT) $(DIR)/lib/browser.js $(DIR)/lib/generatedPrelude.js $(DIR)/lib/std.js $(DIR)/lib/svg.js $(DIR)/lib/parseAst.js
REPL=./repl
TESTED=$(DIR)/.tested
NODE_PATH=lib;client;$(DIR)/lib;$(DIR)/src;$(DIR)/node_modules

LIB_SRC=src/namespace.litcoffee src/org.coffee
CLIENT_LIB=lib/browser.js lib/generatedPrelude.js lib/std.js src/browserSupport.coffee lib/svg.js src/collaborate.litcoffee src/orgSupport.coffee src/githubExtensions.coffee src/storage.coffee src/notebook.coffee src/fancyOrg.coffee lib/parseAst.js lib/mutation-summary.js
SRV_SRC=src/server.litcoffee
LIB_FILES=$(LIB_SRC:%=$(DIR)/%)
CLIENT_FILES=$(CLIENT_SRC:%=$(DIR)/%)
SRV_FILES=$(SRV_SRC:%=$(DIR)/%)
LIB_DEST=lib
CLIENT_DEST=client
SRV_DEST=server
DEPS=$(DIR)/src/browserMain.coffee
STAMP=$(DIR)/.stamp

all: $(BUILT) $(TESTED)

test: $(TESTED)

$(TESTED): $(LSR_MAIN)
	NODE_PATH="$(NODE_PATH)" coffee $(DIR)/src/testLeisure.coffee
	NODE_PATH="$(NODE_PATH)" coffee $(DIR)/src/testParser.coffee
	touch $(TESTED)

retest: invalidateTests $(TESTED)

invalidateTests: FRC
	rm -f $(TESTED)

$(STAMP): $(BUILT)
	cd $(DIR);$(MAKE)
	cp $(DIR)/lib/
	touch $(STAMP)

$(BROWSER): $(BROWSER_SRC)
	cd $(DIR);$(MAKE) lib/browser.js
	cp $(DIR)/lib/browser.js $(BROWSER)

client/19-generatedPrelude.js: $(DIR)/lib/generatedPrelude.js
	cp $(DIR)/lib/generatedPrelude.js $@

$(DIR)/lib/generatedPrelude.js: $(DIR)/lib/simpleParse.js $(DIR)/lib/generatedPrelude.lsr
	$(REPL) -d $(DIR)/lib -1 -c $(DIR)/lib/generatedPrelude.lsr

$(DIR)/lib/simpleParse.js: $(DIR)/src/simpleParse.lsr
	$(REPL) -d $(DIR)/lib -0 -c $(DIR)/src/simpleParse.lsr

$(DIR)/lib/generatedPrelude.lsr:
	cat $(DIR)/src/simpleParse.lsr $(DIR)/src/simpleParse2.lsr > $@

client/20-std.js: $(DIR)/lib/std.js
	cp $^ $@

client/22-svg.js: $(DIR)/lib/svg.js
	cp $^ $@

client/29-parseAst.js: $(DIR)/lib/parseAst.js
	cp $^ $@

$(DIR)/lib/svg.js: client/20-std.js $(DIR)/src/svg.lsr
	$(REPL) -d $(DIR)/lib -c -r '20-std' $(@:$(DIR)/lib/%.js=$(DIR)/src/%.lsr)
	sed -e 's/"sourceRoot": "\.\."/"sourceRoot": "."/' $(@:%.js=%.map) > tmp
	sleep 1
	mv tmp $(@:%.js=%.map)

$(DIR)/lib/%.js: $(DIR)/src/%.lsr
	$(REPL) -d $(DIR)/lib -c $(@:$(DIR)/lib/%.js=$(DIR)/src/%.lsr)
	sed -e 's/"sourceRoot": "\.\."/"sourceRoot": "."/' $(@:%.js=%.map) > tmp
	sleep 1
	mv tmp $(@:%.js=%.map)

clean: FRC
	rm -f $(ALL_BUILT)

FRC:
