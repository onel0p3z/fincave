(function () {
    'use strict';

    var path = require('path');
    var habitat = require('habitat');
    var env = habitat.get('nodeEnv');
    var env_file = habitat.load(path.join(__dirname, env  + '.env'));

    if (env_file === false) {
        throw new Error('could not load an environment');
    }

    var env_var = env_file.get('fincave');

    module.exports = env_var;
})();
