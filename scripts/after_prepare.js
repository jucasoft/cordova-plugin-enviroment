module.exports = function (ctx) {
    console.log('************************************************************');
    console.log('*                         CONFIGURE                        *');
    console.log('************************************************************');
    console.log('');
    var fs = ctx.requireCordovaModule('fs');
    var path = ctx.requireCordovaModule('path');
    var deferral = ctx.requireCordovaModule('q').defer();

    var target = "DEFAULT";
    if (process.env.target) {
        target = process.env.target;
    }

    var fileFrom = "ENV_" + target + ".js"
    var optionsFileFrom = path.join(ctx.opts.projectRoot, fileFrom);
    console.log("from file: " + optionsFileFrom);
    var optionsFileTo = path.join(ctx.opts.paths[0], "assets", "js", "env.js");
    console.log("to file: " + optionsFileTo);
    console.log('');
    fs.createReadStream(optionsFileFrom).pipe(fs.createWriteStream(optionsFileTo));

};