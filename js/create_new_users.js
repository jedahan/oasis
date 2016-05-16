var twitter_helper = require ('./twitter_helper.js');
var _log = require('./log_helper.js')._log;
var child_process = require('child_process');
var util = require('util');
var settings = require('./settings.js');
var path = require("path");


var exec_cmd = function(cmd, success_msg) {
    _log(util.format('cmd: %s', cmd));
    child_process.exec(cmd, function(error, stdout, stderr) {
        _log(util.format('stdout: %s', stdout));
        _log(util.format('stderr: %s', stderr));
        _log(util.format('error: %j', error));
        if (error == null && success_msg != null) {
            _log(success_msg);
        }
    });
}

var create_user = function(username, password) {
    username = username.replace(/\W/g, '');
    password = password.replace(/\W/g, '');
    var create_user_script = path.join(settings.base_dir, 'bash/create_new_user.sh');
    var create_user_cmd = util.format('sudo %s %s %s', create_user_script, username, password);
    exec_cmd(create_user_cmd, util.format('++ @channel: successfully created user: %s', username));
}

if (require.main === module) {
    create_user('test_cron', 'passwordpassword');
}