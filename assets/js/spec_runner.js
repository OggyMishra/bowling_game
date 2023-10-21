(function () {
    var Chai, Mocha, addSpec, fs, loadSpecs, mocha, path, specificSpecs, specsPath;

    fs = require('fs');

    path = require('path');

    Mocha = require('mocha');

    Chai = require('chai');
    global.requirejs = require('requirejs');
    global._ = require('underscore');
    mocha = new Mocha({
        ui: 'bdd',
        reporter: 'spec'
    });

    global.expect = Chai.expect;

    specificSpecs = process.argv.slice(2);

    requirejs.config({
        baseUrl: 'assets/js',
        nodeRequire: require
    });

    specsPath = 'specs';

    addSpec = function (specPath) {
        return mocha.addFile(specPath);
    };

    loadSpecs = function (specsPath, cb) {
        var _cb, _specsPath, ref;
        if (cb == null) {
            cb = function () {};
        }
        ref = [specsPath, cb], _specsPath = ref[0], _cb = ref[1];
        return fs.readdir(specsPath, function (err, entities) {
            var totalEntities;
            if (err != null) {
                return _cb(err, []);
            }
            totalEntities = entities.length;
            if (totalEntities === 0) {
                return _cb(null);
            }
            return _.each(entities, function (entity) {
                var entityPath;
                entityPath = path.resolve(specsPath, entity);
                return fs.stat(entityPath, function (err, stat) {
                    var isSpec;
                    if ((stat != null) && stat.isDirectory()) {
                        return loadSpecs(entityPath, function (err, file) {
                            if (--totalEntities === 0) {
                                return _cb(null);
                            }
                        });
                    } else {
                        if (specificSpecs.length) {
                            isSpec = false;
                            _.each(specificSpecs, function (spec) {
                                isSpec = (entityPath.substr(-7) === 'spec.js') && (entityPath.indexOf(spec) !== -1);
                                if (isSpec) {
                                    return addSpec(entityPath);
                                }
                            });
                        } else {
                            if (entityPath.substr(-7) === 'spec.js') {
                                addSpec(entityPath);
                            }
                        }
                        if (--totalEntities === 0) {
                            return _cb(null);
                        }
                    }
                });
            });
        });
    };

    loadSpecs(specsPath, function (err) {
        if (err != null) {
            return console.log(err);
        }
        return mocha.run();
    });

}).call(this);