angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope) { })

.controller('NagsCtrl', function ($scope, Nags) {
    $scope.nags = Nags.all();
    $scope.remove = function (nag) {
        Nags.remove(nag);
    }
})

.controller('NagDetailCtrl', function ($scope, $stateParams, Nags, $ionicHistory, $state) {
    $scope.nag = Nags.get($stateParams.nagId);
    $scope.remove = function (nag) {
        Nags.remove(nag);
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('tab.nags');
    }

})

.controller('AccountCtrl', function ($scope, Nags, $ionicHistory, $state) {
    $scope.settings = {
        enableFriends: true
    };

    $scope.scheduleNagger = function (nagger) {
        debugger;
        cordova.plugins.notification.local.cancelAll(function() {
            alert("done");
             $scope.nags = Nags.all();
             var nag0 = $scope.nags[0];
             var nag1 = $scope.nags[1];
             var nag2 = $scope.nags[2];
             var nag3 = $scope.nags[3];
            // var sound = device.platform == 'Android' ? 'file://sound.mp3' : 'file://beep.caf';
            var date = new Date();
            var date1 = new Date();
            date1.setMinutes(date.getMinutes() + 1);
            var date2 = new Date();
            date2.setMinutes(date.getMinutes() + 2);
            var date3 = new Date();
            date3.setMinutes(date.getMinutes() + 3);
            cordova.plugins.notification.local.schedule([{
                id: nag1.id,
                title: 'notif1',// nag1.name,
                message: nag1.lastText,
                at: date1,
                sound: 'file://beep.caf',
                icon: "https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png",
                data: { nagId: nag1.id }
            }, {
                id: nag2.id,
                title: 'notif2',// nag1.name,
                message: nag2.lastText,
                at: date2,
                sound: 'file://beep.caf',
                icon: "https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png",
                data: { nagId: nag2.id }
            }, {
                id: nag3.id,
                title: 'notif3',// nag1.name,
                message: nag3.lastText,
                at: date3,
                sound: 'file://beep.caf',
                icon: "https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png",
                data: { nagId: nag3.id }
            }]);

            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('tab.nag-detail', { nagId: nag0.id });

        }, this);



        cordova.plugins.notification.local.on("click", function (notification) {
            $state.go('tab.nag-detail', { nagId: notification.id });
        });

     
    };
});
