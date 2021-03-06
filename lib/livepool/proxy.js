var util = require('./util');
var exec = require('child_process').exec;
var path = require('path');

exports.setProxy = function setProxy(host, port, done) {

    if (process.platform == 'win32') {
        var dir = path.resolve(__dirname, '../../', 'lib/tools');
        var refresh = 'refreshproxy.exe on ' + host + ':' + port;
        util.chdir(dir, function() {
            exec(refresh, function(err) {
                if (err) {
                    throw err;
                }
                if (typeof done == 'function') done();
            });
        });
    } else if (process.platform == 'mac' || process.platform == 'darwin') {
        var dir = path.resolve(__dirname, '../../', 'lib/tools');
        var cmd = 'sh proxysetting_mac.sh on ' + host + ' ' + port;
        util.chdir(dir, function() {
            exec(cmd, function(err) {
                if (err) {
                    throw err;
                }
                if (typeof done == 'function') done();
            });
        });
    } else if (process.platform == 'linux') {
        var proxy = 'export HTTP_PROXY=http://' + host + ':' + port;
        exec(proxy, function(error) {
            if (error) throw error;
            if (typeof done == 'function') done();
        });
    }
}

exports.initProxy = function initProxy(done) {
    if (process.platform == 'win32') {
        var dir = path.resolve(__dirname, '../../', 'lib/tools');
        var refresh = 'refreshproxy.exe restore';
        util.chdir(dir, function() {
            exec(refresh, function(err) {
                if (err) {
                    throw err;
                }
                if (typeof done == 'function') done();
            });
        });
    } else if (process.platform == 'mac' || process.platform == 'darwin') {
        var dir = path.resolve(__dirname, '../../', 'lib/tools');
        var cmd = 'sh proxysetting_mac.sh off';
        util.chdir(dir, function() {
            exec(cmd, function(err) {
                if (err) {
                    throw err;
                }
                if (typeof done == 'function') done();
            });
        });
    } else if (process.platform == 'linux') {
        var proxy = 'export HTTP_PROXY=""';
        exec(proxy, function(error) {
            if (error) throw error;
            if (typeof done == 'function') done();
        });
    }
}
