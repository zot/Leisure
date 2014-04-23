BROWSERIFY_SRC=browserMain
MODULES=persistent-hash-trie source-map utf8 js-yaml
LEISURE_SRC=generatedPrelude std svg parseAst simpleParse
LEISURE_FILES=$(LEISURE_SRC:%=lib/%.js)
LEISURE_GEN=$(LEISURE_FILES) $(LEISURE_SRC:%=lib/%.ast) $(LEISURE_SRC:%=lib/%.map) lib/generatedPrelude.lsr
NODE=NODE_PATH="$(shell ./getDir lib)" node --stack-size=3000
REPL=$(NODE) src/runRepl

all: lib/generatedPrelude.js $(LEISURE_FILES) lib/browser.js

clean: FRC
	rm -rf $(LEISURE_GEN) lib/browserMain.*

FRC:

lib/browser.js: node_modules $(BROWSERIFY_SRC:%=lib/%.js)
	if [ ! -e node_modules/browserify ]; then npm install browserify; fi
	$(NODE) node_modules/browserify/bin/cmd.js lib/browserMain.js -o $@ -d

node_modules:
	npm install

lib/generatedPrelude.lsr:
	cat src/simpleParse.lsr src/simpleParse2.lsr > $@

lib/generatedPrelude.js: lib/simpleParse.js lib/generatedPrelude.lsr
	$(REPL) -d lib -1 -c lib/generatedPrelude.lsr

lib/simpleParse.js: src/simpleParse.lsr
	$(REPL) -d lib -0 -c src/simpleParse.lsr

lib/svg.js:
	$(REPL) -d lib -c -r '../lib/std' $(@:lib/%.js=src/%.lsr)
	sed -e 's/"sourceRoot": "\.\."/"sourceRoot": "."/' $(@:%.js=%.map) > tmp
	sleep 1
	mv tmp $(@:%.js=%.map)

lib/%.js: src/%.lsr
	$(REPL) -d lib -c $(@:lib/%.js=src/%.lsr)
	sed -e 's/"sourceRoot": "\.\."/"sourceRoot": "."/' $(@:%.js=%.map) > tmp
	sleep 1
	mv tmp $(@:%.js=%.map)

#sed -e 's/"sourceRoot": "\.\."/"sourceRoot": "."/' $(@:%.js=%.map) > $(LIB)/tmp
#sleep 1

lib/%.js: src/%.coffee
	./node_modules/coffee-script/bin/coffee -o lib -mc $(@:lib/%.js=src/%.coffee)
	sleep 1
