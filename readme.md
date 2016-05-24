## parse-formats

Provides a list of various modules to parse data formats synchronously to JS objects.

Feel free to suggest more formats or more modules to parse them with via issue or pull request.

[![NPM](https://nodei.co/npm/parse-formats.png)](https://nodei.co/npm/parse-formats/)

#### Formats
| Ext   | format | npm module |
| :---- |:------:| ----------:|
| .cson | [cson](https://github.com/bevry/cson) | [cson-parser](https://www.npmjs.com/package/cson-parser) |
| .csv | [csv](https://en.wikipedia.org/wiki/Comma-separated_values) | [parser-csv](https://www.npmjs.com/package/parser-csv) |
| .hjson | [hjson](https://hjson.org/) | [hjson](https://www.npmjs.com/package/hjson) |
| .ini | [ini](https://en.wikipedia.org/wiki/INI_file) | [ini](https://www.npmjs.com/package/ini) |
| .json | [json](http://www.json.org/) | [strip-json-comments](https://www.npmjs.com/package/strip-json-comments) or native |
| .json5 | [json5](http://json5.org/) | [json5](https://www.npmjs.com/package/json5) |
| .xml | [xml](https://en.wikipedia.org/wiki/XML) | [xml2json](https://www.npmjs.com/package/xml2json) |
| .yaml, .yml | [yaml](http://yaml.org/) | [js-yaml](https://www.npmjs.com/package/js-yaml) |

#### Source

````js

/* Common patterns */
function parse (parser, data, opts) {
	return parser.parse(data, opts);
}

function self (parser, data, opts) {
	return parser(data, opts);
}


/* { ext: { moduleName: function(module, data, opts) } } */
module.exports = {
	'.cson':  { 'cson-parser': parse },
	'.csv':   {
		'parser-csv': function (parser, data, opts) {
			return parser.parseSync(data, opts);
		},
	},
	'.hjson': { 'hjson': parse },
	'.ini':   { 'ini': parse },
	'.json':  {
		'strip-json-comments': function (stripComments, data) {
			return JSON.parse(stripComments(data));
		},
		'path': function (_, data) {
			return JSON.parse(data);
		},
	},
	'.json5': { 'json5': parse },
	'.xml': {
		'xml2json': function (xml2json, data, opts) {
			return JSON.parse(xml2json.toJson(data, opts));
		},
	},
	'.yaml': { 'js-yaml': jsYaml },
	'.yml':  { 'js-yaml': jsYaml },
};

function jsYaml (jsYaml, data, opts) {
	return jsYaml.load(data, opts);
}
````
