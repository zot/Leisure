SRC=browser generatedPrelude std svg gui parseAst
GENERATED=$(SRC:%=lib/%.js)

all: $(GENERATED)

$(GENERATED):
	cd lib; $(MAKE)
