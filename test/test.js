var test = require('tape');
var parseFormats = require('../');


var fixture = {
	foo: 'bar',
	joke: {
		7: ['ate', 9],
	},
};

var specialFixtures = {
	/* CSV only supports simple structures */
	'.csv': [ {
		foo: 'bar',
		joke: '7 ate 9',
	} ],
	/* INI cannot differenciate between integers and string values */
	'.ini': {
		foo: 'bar',
		joke: {
			7: ['ate', '9'],
		},
	},
	/* XML is... XML */
	'.xml': { foo: 'bar' },
}


test('Each parser creates expected object', function (t) {
	
	for (var format in parseFormats) {
		
		for (var parser in parseFormats[format]) {
			
			var _parser = require(parser);
			var data = require('fs').readFileSync('./test/formats/test'+format, {encoding: 'utf-8'});
			
			var result = parseFormats[format][parser](_parser, data);
			
			var target = specialFixtures[format] || fixture;
			
			t.deepEqual(result, target, 'test' + format + ' parsed by ' + parser + ' should equal fixture');
		
		}
		
	}
	
	t.end();
	
});