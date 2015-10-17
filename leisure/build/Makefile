BROWSERIFY_SRC=browserMain
YAML_SRC=src/yamlBundle.js
MODULES=persistent-hash-trie source-map utf8 js-yaml
LEISURE_SRC=generatedPrelude std svg parseAst simpleParse
LEISURE_FILES=$(LEISURE_SRC:%=lib/%.js)
LEISURE_GEN=$(LEISURE_FILES) $(LEISURE_SRC:%=lib/%.ast) $(LEISURE_SRC:%=lib/%.map) lib/generatedPrelude.lsr
NODE=$(CURDIR)/runNode
#REPL=$(NODE) src/runRepl
REPL=$(CURDIR)/../repl
OUTPUT_DIR=../../build/leisure
OUTPUT_GENERATED_PRELUDE=$(OUTPUT_DIR)/generatedPrelude.js
OUTPUT_STD=$(OUTPUT_DIR)/std.js
OUTPUT_SVG=$(OUTPUT_DIR)/svg.js
OUTPUT_PARSE_AST=$(OUTPUT_DIR)/parseAst.js
OUTPUT_BROWSER=$(OUTPUT_DIR)/browser.js
BASE_LEISURE=std svg parseAst
SRC_JS=source-map
OUTPUT_SRC=lib/generatedPrelude $(BASE_LEISURE:%=src/%)
OUTPUT_GEN=generatedPrelude std svg parseAst
OUTPUT_JS=$(OUTPUT_GEN) browser

all: node_modules $(OUTPUT_DIR) lib/generatedPrelude.js $(LEISURE_FILES) lib/browser.js
	cp $(SRC_JS:%=src/%.js) $(OUTPUT_DIR)
	cp $(OUTPUT_JS:%=lib/%.js) $(OUTPUT_DIR)
	cp $(OUTPUT_GEN:%=lib/%.map) $(OUTPUT_DIR)
	cp $(OUTPUT_SRC:%=%.lsr) $(OUTPUT_DIR)

repl: FRC
	$(REPL)

$(OUTPUT_DIR):
	mkdir -p $(OUTPUT_DIR)

clean: FRC
	rm -rf $(LEISURE_GEN) lib/browserMain.*

FRC:

lib/browser.js: node_modules $(BROWSERIFY_SRC:%=lib/%.js)
	$(NODE) node_modules/browserify/bin/cmd.js lib/browserMain.js -o $@ -d
	cp $(@) $(OUTPUT_BROWSER)

#	$(NODE) node_modules/browserify/bin/cmd.js src/yamlBundle.js --bare -o $@ -u buffer
lib/yaml.js: node_modules $(YAML_SRC)
	$(NODE) node_modules/browserify/bin/cmd.js src/yamlBundle.js -o $@ -s

node_modules:
	npm install

lib/generatedPrelude.lsr: src/simpleParse.lsr src/simpleParse2.lsr
	cat src/simpleParse.lsr src/simpleParse2.lsr > $@

lib/generatedPrelude.js: lib/simpleParse.js lib/generatedPrelude.lsr
	$(REPL) -d lib -1 -c lib/generatedPrelude.lsr
	cp $(@) $(OUTPUT_GENERATED_PRELUDE)
	cp lib/generatedPrelude.map $(OUTPUT_DIR)

lib/simpleParse.js: src/simpleParse.lsr
	$(REPL) -d lib -0 -c src/simpleParse.lsr
	sed -e 's!^//@.*$$!//# sourceURL=../src/simpleParse.lsr!' lib/simpleParse.js > /tmp/tmp
	mv /tmp/tmp lib/simpleParse.js

lib/std.js: src/std.lsr lib/generatedPrelude.js
	$(REPL) -d lib -c $(@:lib/%.js=src/%.lsr)
	sed -e 's/"sourceRoot": "\.\."/"sourceRoot": "."/' $(@:%.js=%.map) > temp
	sleep 1
	mv temp $(@:%.js=%.map)
	cp $(@) $(OUTPUT_STD)

lib/svg.js: src/svg.lsr lib/std.js
	$(REPL) -d lib -c -r std $(@:lib/%.js=src/%.lsr)
	sed -e 's/"sourceRoot": "\.\."/"sourceRoot": "."/' $(@:%.js=%.map) > temp
	sleep 1
	mv temp $(@:%.js=%.map)
	cp $(@) $(OUTPUT_SVG)

lib/parseAst.js: src/parseAst.lsr lib/std.js
	$(REPL) -d lib -c -r std -r svg $(@:lib/%.js=src/%.lsr)
	sed -e 's/"sourceRoot": "\.\."/"sourceRoot": "."/' $(@:%.js=%.map) > temp
	sleep 1
	mv temp $(@:%.js=%.map)
	cp $(@) $(OUTPUT_PARSE_AST)

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
