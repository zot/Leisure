DIR=packages/leisure/build
LIB_SRC=src/namespace.litcoffee src/org.coffee
CLIENT_SRC=lib/jquery-1-8-2.min.js src/start.js lib/browser.js src/uri.coffee src/shim.coffee src/base.coffee src/ast.coffee src/runtime.coffee src/gen.coffee lib/generatedPrelude.js lib/std.js src/browserSupport.coffee lib/svg.js src/collaborate.litcoffee src/orgSupport.coffee src/githubExtensions.coffee src/storage.coffee src/notebook.coffee src/fancyOrg.coffee lib/parseAst.js lib/mutation-summary.js
SRV_SRC=src/server.litcoffee
LIB_FILES=$(LIB_SRC:%=$(DIR)/%)
CLIENT_FILES=$(CLIENT_SRC:%=$(DIR)/%)
SRV_FILES=$(SRV_SRC:%=$(DIR)/%)
LIB_DEST=lib
CLIENT_DEST=client
SRV_DEST=server
DEPS=$(DIR)/src/browserMain.coffee
STAMP=$(DIR)/.stamp

$(STAMP): $(CLIENT_FILES) $(DEPS) $(SRV_FILES)
	cd $(DIR);$(MAKE)
	c=10;for file in $(LIB_FILES);do cp $$file $(LIB_DEST)/$$c-$$(basename $$file);c=$$(($$c + 1));done
	c=10;for file in $(CLIENT_FILES);do cp $$file $(CLIENT_DEST)/$$c-$$(basename $$file);c=$$(($$c + 1));done
	c=10;for file in $(SRV_FILES);do cp $$file $(SRV_DEST)/$$c-$$(basename $$file);c=$$(($$c + 1));done
	touch $(STAMP)

$(DIR)/lib/browser.js:

$(DIR)/lib/generatedPrelude.js:

$(DIR)/lib/std.js:

$(DIR)/lib/svg.js:

$(DIR)/lib/parseAst.js:

$(DIR)/lib/:

clean: FRC
	rm -f $(LIB_DEST)/[0-9][0-9]-* $(CLIENT_DEST)/[0-9][0-9]-* $(SRV_DEST)/[0-9][0-9]-* $(STAMP)

FRC:
