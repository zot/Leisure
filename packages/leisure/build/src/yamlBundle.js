var yaml = require('js-yaml');
if (typeof window != 'undefined') window.Yaml = yaml;
else global.Yaml = yaml;
if (typeof Leisure != 'undefined') {
    Leisure.yaml = yaml;
}

this.Yaml = yaml;
