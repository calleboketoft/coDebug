angular.module('coDebug', [
    'cfp.hotkeys'
])

.config(function($logProvider) {
    // Enable debug mode by sessionStorage.setItem(debugKey, '1');
    var debugKey = 'debug';
    if (!sessionStorage.getItem(debugKey)) {
        $logProvider.debugEnabled(false); // $log.debug() is enabled by default in AngularJS
    }
})

.run(function(hotkeys, $window) {
    var debugKey = 'debug';
    // Only possible to use console.log in debug mode
    if (window.console && console.log && !sessionStorage.getItem(debugKey)) {
        console.log = angular.noop;
    }

    // Toggle debug mode
    // -----------------
    hotkeys.add({
        combo: 'alt+l',
        description: 'Toggle logs from console.log and $log.debug',
        callback: function() {
            if (sessionStorage.getItem(debugKey)) {
                sessionStorage.removeItem(debugKey);
            } else {
                sessionStorage.setItem(debugKey, 'true');
            }
            var debugEnabled = !!sessionStorage.getItem(debugKey);
            var confirmMsg = (debugEnabled ? 'Enabling' : 'Disabling') + ' debug mode, reload to apply';
            if (confirm(confirmMsg)) {
                $window.location.reload();
            }
        }
    });
})

.factory('coDebug', function() {
    var debugKey = 'debug';
    var service = {
        enabled: enabled
    };

    function enabled() {
        return !!sessionStorage.getItem(debugKey);
    }

    return service;
});