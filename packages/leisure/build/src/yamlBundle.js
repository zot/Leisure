var yaml = require('js-yaml');
if (typeof window != 'undefined') window.Yaml = yaml;
else global.Yaml = yaml;
if (typeof Leisure != 'undefined') {
    for (var k in yaml) {
        Leisure[k] = yaml[k];
    }
}

this.Yaml = yaml;
