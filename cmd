#!/bin/sh
cp lc.js /tmp/all.js
echo >> /tmp/all.js
cat lcvm.js >> /tmp/all.js
echo >> /tmp/all.js
cat cmd.js >> /tmp/all.js
exec node /tmp/all.js
