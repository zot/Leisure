OUTPUT_DIR=../../build/leisure
YAML_SRC=src/yamlBundle.js
MODULES=persistent-hash-trie source-map utf8 js-yaml
LEISURE_SRC=generatedPrelude std svg parseAst simpleParse
LEISURE_JS=lib/simpleParseJS.js $(LEISURE_SRC:%=$(OUTPUT_DIR)/%.js)
NODE=$(CURDIR)/runNode
#REPL=$(NODE) src/runRepl
REPL=$(CURDIR)/../repl
OUTPUT_PARSE_AST=$(OUTPUT_DIR)/parseAst.js
BASE_LEISURE=std svg parseAst
SRC_JS=source-map
#OUTPUT_SRC=$(OUTPUT_DIR)/generatedPrelude $(BASE_LEISURE:%=src/%)
LEISURE_GEN=$(LEISURE_JS) $(LEISURE_SRC:%=$(OUTPUT_DIR)/%.ast) $(LEISURE_SRC:%=$(OUTPUT_DIR)/%.map) $(LEISURE_SRC:%=$(OUTPUT_DIR)/%.lsr)

all: node_modules lib/leisureRepl.js $(OUTPUT_DIR) $(LEISURE_JS) $(SRC_JS:%=$(OUTPUT_DIR)/%.js) $(BASE_LESURE:%=$(OUTPUT_DIR)/%.lsr)

base: $(OUTPUT_DIR)/generatedPrelude.js

tst: FRC
	echo "LEISURE_JS:" $(LEISURE_JS)

repl: all FRC
	$(REPL)

$(OUTPUT_DIR):
	mkdir -p $(OUTPUT_DIR)

clean: FRC
	rm -rf $(LEISURE_GEN) lib/leisureRepl.*

FRC:

$(OUTPUT_DIR)/%.js: src/%.js
	cp $< $@

$(OUTPUT_DIR)/%.js: lib/%.js
	cp $< $@

$(OUTPUT_DIR)/%.map: lib/%.map
	cp $< $@

$(OUTPUT_DIR)/%.lsr: lib/%.lsr
	cp $< $@

$(OUTPUT_DIR)/%.lsr: src/%.lsr
	cp $< $@

node_modules:
	npm install

$(OUTPUT_DIR)/generatedPrelude.lsr: src/simpleParse.lsr src/simpleParse2.lsr
	cat src/simpleParse.lsr src/simpleParse2.lsr > $@

$(OUTPUT_DIR)/generatedPrelude.js: lib/leisureRepl.js $(OUTPUT_DIR)/simpleParse.js $(OUTPUT_DIR)/generatedPrelude.lsr
	$(REPL) -d $(OUTPUT_DIR) -1 -c $(OUTPUT_DIR)/generatedPrelude.lsr

$(OUTPUT_DIR)/simpleParse.js: src/simpleParse.lsr lib/simpleParseJS.js
	$(REPL) -d $(OUTPUT_DIR) -0 -c src/simpleParse.lsr
	sed -e 's!^//@.*$$!//# sourceMappingURL=simpleParse.map!' $(OUTPUT_DIR)/simpleParse.js > /tmp/tmp
	mv /tmp/tmp $(OUTPUT_DIR)/simpleParse.js
	cp $(@:$(OUTPUT_DIR)/%.js=src/%.lsr) $(OUTPUT_DIR)

$(OUTPUT_DIR)/std.js: src/std.lsr $(OUTPUT_DIR)/generatedPrelude.js
	$(REPL) -d $(OUTPUT_DIR) -c src/std.lsr
	sed -e 's/"sourceRoot": "\.\."/"sourceRoot": "."/' $(@:%.js=%.map) > temp
	sleep 1
	mv temp $(@:%.js=%.map)
	cp $(@:$(OUTPUT_DIR)/%.js=src/%.lsr) $(OUTPUT_DIR)

$(OUTPUT_DIR)/svg.js: src/svg.lsr $(OUTPUT_DIR)/std.js
	$(REPL) -d $(OUTPUT_DIR) -c -r std src/svg.lsr
	sed -e 's/"sourceRoot": "\.\."/"sourceRoot": "."/' $(@:%.js=%.map) > temp
	sleep 1
	mv temp $(@:%.js=%.map)
	cp $(@:$(OUTPUT_DIR)/%.js=src/%.lsr) $(OUTPUT_DIR)

$(OUTPUT_DIR)/parseAst.js: src/parseAst.lsr $(OUTPUT_DIR)/std.js
	$(REPL) -d $(OUTPUT_DIR) -c -r std -r svg src/parseAst.lsr
	sed -e 's/"sourceRoot": "\.\."/"sourceRoot": "."/' $(@:%.js=%.map) > temp
	sleep 1
	mv temp $(@:%.js=%.map)
	cp $(@:$(OUTPUT_DIR)/%.js=src/%.lsr) $(OUTPUT_DIR)

$(OUTPUT_DIR)/%.js: src/%.lsr
	$(REPL) -d $(OUTPUT_DIR) -c $<
	sed -e 's/"sourceRoot": "\.\."/"sourceRoot": "."/' $(@:%.js=%.map) > temp
	sleep 1
	mv temp $(@:%.js=%.map)
	cp $(@:$(OUTPUT_DIR)/%.js=src/%.lsr) $(OUTPUT_DIR)

#sed -e 's/"sourceRoot": "\.\."/"sourceRoot": "."/' $(@:%.js=%.map) > $(LIB)/temp
#sleep 1

$(OUTPUT_DIR)/%.js: src/%.coffee
	./node_modules/coffee-script/bin/coffee -o $(OUTPUT_DIR) -mc $<
	sleep 1

lib/%.js: src/%.coffee
	./node_modules/coffee-script/bin/coffee -o lib -mc $<
	sleep 1
