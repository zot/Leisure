####
# Copyright (C) 2012, Bill Burdick
# License: ZLIB license
####

SRC=base ast testing newgen
TEST=testLeisure
ALL=$(SRC) $(TEST)
IN_FILES=$(ALL:%=core/%)
OUT_FILES=$(ALL:%=lib/%.js)
DIR=core
LIB=lib

all: $(TEST)

$(TEST):
	node_modules/coffee-script/bin/coffee -o $(LIB) -c $(IN_FILES)
	node $(LIB)/$(TEST)

clean:
	rm -f $(OUT_FILES)

FRC:
