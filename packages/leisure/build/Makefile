BROWSERIFY_SRC=browserMain
YAML_SRC=src/yamlBundle.js
MODULES=persistent-hash-trie source-map utf8 js-yaml
LEISURE_SRC=generatedPrelude std svg parseAst simpleParse
LEISURE_FILES=$(LEISURE_SRC:%=lib/%.js)
LEISURE_GEN=$(LEISURE_FILES) $(LEISURE_SRC:%=lib/%.ast) $(LEISURE_SRC:%=lib/%.map) lib/generatedPrelude.lsr
NODE=$(CURDIR)/runNode
REPL=$(NODE) src/runRepl
CLIENT_DIR=../../../client
CLIENT_GENERATED_PRELUDE=$(CLIENT_DIR)/19-generatedPrelude.js
CLIENT_STD=$(CLIENT_DIR)/20-std.js
CLIENT_SVG=$(CLIENT_DIR)/22-svg.js
CLIENT_PARSE_AST=$(CLIENT_DIR)/29-parseAst.js
CLIENT_BROWSER=$(CLIENT_DIR)/12-browser.js

all: lib/generatedPrelude.js $(LEISURE_FILES) lib/browser.js

repl: FRC
	$(REPL)

clean: FRC
	rm -rf $(LEISURE_GEN) lib/browserMain.*

FRC:

lib/browser.js: node_modules $(BROWSERIFY_SRC:%=lib/%.js)
	$(NODE) node_modules/browserify/bin/cmd.js lib/browserMain.js -o $@ -d
	cp $(@) $(CLIENT_BROWSER)

#	$(NODE) node_modules/browserify/bin/cmd.js src/yamlBundle.js --bare -o $@ -u buffer
lib/yaml.js: node_modules $(YAML_SRC)
	$(NODE) node_modules/browserify/bin/cmd.js src/yamlBundle.js -o $@ -s

node_modules:
	npm install

lib/generatedPrelude.lsr: src/simpleParse.lsr src/simpleParse2.lsr
	cat src/simpleParse.lsr src/simpleParse2.lsr > $@

lib/generatedPrelude.js: lib/simpleParse.js lib/generatedPrelude.lsr
	$(REPL) -d lib -1 -c lib/generatedPrelude.lsr
	cp $(@) $(CLIENT_GENERATED_PRELUDE)
	cp lib/generatedPrelude.map $(CLIENT_DIR)

lib/simpleParse.js: src/simpleParse.lsr
	$(REPL) -d lib -0 -c src/simpleParse.lsr
	sed -e 's!^//@.*$$!//# sourceURL=../src/simpleParse.lsr!' lib/simpleParse.js > /tmp/tmp
	mv /tmp/tmp lib/simpleParse.js

lib/std.js: src/std.lsr lib/generatedPrelude.js
	$(REPL) -d lib -c $(@:lib/%.js=src/%.lsr)
	sed -e 's/"sourceRoot": "\.\."/"sourceRoot": "."/' $(@:%.js=%.map) > temp
	sleep 1
	mv temp $(@:%.js=%.map)
	cp $(@) $(CLIENT_STD)

lib/svg.js: src/svg.lsr lib/std.js
	$(REPL) -d lib -c -r std $(@:lib/%.js=src/%.lsr)
	sed -e 's/"sourceRoot": "\.\."/"sourceRoot": "."/' $(@:%.js=%.map) > temp
	sleep 1
	mv temp $(@:%.js=%.map)
	cp $(@) $(CLIENT_SVG)

lib/parseAst.js: src/parseAst.lsr lib/std.js
	$(REPL) -d lib -c -r std -r svg $(@:lib/%.js=src/%.lsr)
	sed -e 's/"sourceRoot": "\.\."/"sourceRoot": "."/' $(@:%.js=%.map) > temp
	sleep 1
	mv temp $(@:%.js=%.map)
	cp $(@) $(CLIENT_PARSE_AST)

lib/%.js: src/%.lsr
	$(REPL) -d lib -c $(@:lib/%.js=src/%.lsr)
	sed -e 's/"sourceRoot": "\.\."/"sourceRoot": "."/' $(@:%.js=%.map) > temp
	sleep 1
	mv temp $(@:%.js=%.map)

#sed -e 's/"sourceRoot": "\.\."/"sourceRoot": "."/' $(@:%.js=%.map) > $(LIB)/temp
#sleep 1

lib/%.js: src/%.coffee
	./node_modules/coffee-script/bin/coffee -o lib -mc $(@:lib/%.js=src/%.coffee)
	sleep 1
