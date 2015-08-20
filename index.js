

module.exports = {
	'.cson': function (data) {
		var cson = require('cson-parser');
		return cson.parse(data);
	},
	'.csv': function (data, opts) {
		var csv2array = require('csv2array');
		return csv2array(data, opts);
	},
	'.hjson': function (data, opts) {
		var hjson = require('hjson');
		return hjson.parse(data, opts);
	},
	'.ini': function(data) {
		var ini = require('ini');
		return ini.parse(data);
	},
	'.json': function (data) {
		var stripJsonComments = require('strip-json-comments');
		return JSON.parse(stripJsonComments(data));
	},
	'.json5': function (data) {
		var JSON5 = require('json5');
		return JSON5.parse(data);
	},
	'.xml': function (data, opts) {
		var xml2json = require('xml2json');
		return JSON.parse(xml2json.toJson(data, opts));
	},
	'.yaml': yaml,
	'.yml': yaml,
};

function yaml (data, opts) {
	var yaml = require('js-yaml');
	return yaml.load(data, opts);
}