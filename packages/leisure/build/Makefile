BROWSERIFY_SRC=browserMain
YAML_SRC=src/yamlBundle.js
MODULES=persistent-hash-trie source-map utf8 js-yaml
LEISURE_SRC=generatedPrelude std svg parseAst simpleParse
LEISURE_FILES=$(LEISURE_SRC:%=lib/%.js)
LEISURE_GEN=$(LEISURE_FILES) $(LEISURE_SRC:%=lib/%.ast) $(LEISURE_SRC:%=lib/%.map) lib/generatedPrelude.lsr
NODE=./runNode
REPL=$(NODE) src/runRepl
CLIENT_GENERATED_PRELUDE=../../../client/19-generatedPrelude.js
CLIENT_STD=../../../client/20-std.js
CLIENT_SVG=../../../client/22-svg.js
CLIENT_PARSE_AST=../../../client/29-parseAst.js

all: lib/generatedPrelude.js $(LEISURE_FILES) lib/browser.js

repl: FRC
	$(REPL)

clean: FRC
	rm -rf $(LEISURE_GEN) lib/browserMain.*

FRC:

lib/browser.js: node_modules $(BROWSERIFY_SRC:%=lib/%.js)
	$(NODE) node_modules/browserify/bin/cmd.js lib/browserMain.js -o $@ -d

#	$(NODE) node_modules/browserify/bin/cmd.js src/yamlBundle.js --bare -o $@ -u buffer
lib/yaml.js: node_modules $(YAML_SRC)
	$(NODE) node_modules/browserify/bin/cmd.js src/yamlBundle.js -o $@ -s

node_modules:
	npm install

lib/generatedPrelude.lsr:
	cat src/simpleParse.lsr src/simpleParse2.lsr > $@

lib/generatedPrelude.js: lib/simpleParse.js lib/generatedPrelude.lsr
	$(REPL) -d lib -1 -c lib/generatedPrelude.lsr
	cp $(@) $(CLIENT_GENERATED_PRELUDE)

lib/simpleParse.js: src/simpleParse.lsr
	$(REPL) -d lib -0 -c src/simpleParse.lsr

lib/std.js: src/std.lsr
	$(REPL) -d lib -c $(@:lib/%.js=src/%.lsr)
	sed -e 's/"sourceRoot": "\.\."/"sourceRoot": "."/' $(@:%.js=%.map) > temp
	sleep 1
	mv temp $(@:%.js=%.map)
	cp $(@) $(CLIENT_STD)

lib/svg.js: src/svg.lsr
	$(REPL) -d lib -c -r std $(@:lib/%.js=src/%.lsr)
	sed -e 's/"sourceRoot": "\.\."/"sourceRoot": "."/' $(@:%.js=%.map) > temp
	sleep 1
	mv temp $(@:%.js=%.map)
	cp $(@) $(CLIENT_SVG)

lib/parseAst.js: src/parseAst.lsr
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
