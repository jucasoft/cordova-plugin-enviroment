module.exports = function (ctx) {
    console.log('************************************************************');
    console.log('*                         CONFIGURE                        *');
    console.log('************************************************************');
    var fs = ctx.requireCordovaModule('fs');
    var path = ctx.requireCordovaModule('path');
    var deferral = ctx.requireCordovaModule('q').defer();

    var replace = require('replace-in-file');

    var optionsFile = path.join(ctx.opts.projectRoot, "/options.json");
    if (process.env.optionsFile) {
        optionsFile = process.env.optionsFile;
    }

    console.log('optionsFile: ' + optionsFile);

    var options = JSON.parse(fs.readFileSync(optionsFile, 'utf8'));

    console.log("options.list.length: " + options.list.length);
	
    for (i = 0; i < options.list.length; i++) {
        console.log('');
        console.log('******************** ( ' + i + ' ) *********************');
        console.log('');
        _option = options.list[i]
            console.log("FILES:");
        for (ii = 0; ii < _option.files.length; ii++) {

            try {
                _option.files[ii] = eval(_option.files[ii]);
            } catch (error) {
                _option.files[ii] = _option.files[ii];
            }

            console.log("- " + _option.files[ii]);
        }
            console.log("");
            console.log("CONF:");
			
        _option.from = [];
        _option.to = [];
        for (var k in _option.values) {
            _option.from.push(k);
            console.log("from: " + k + " => to: " + _option.values[k]);
            _option.to.push(_option.values[k]);
        }
		
        console.log("");
        try {
			changedFiles = replace.sync(_option);
			console.log('Modified files:');
			console.log(changedFiles.join(', \n'));
        }
        catch (error) {
            console.error('Error occurred:', error);
        }

    }


};