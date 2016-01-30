angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope) { })

.controller('NagsCtrl', function ($scope, Nags, $ionicHistory, $state) {
    $scope.nagger = Nags.getCurrentNagger();
    $scope.remove = function (nag) {
        Nags.remove(nag);
        $scope.nagger = Nags.getCurrentNagger();
    }
    $scope.detail = function (nagId) {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('tab.nag-detail', { nagId: nagId });
    }

    $scope.isShow = function (dateString) {
        return new Date(dateString) < new Date();
    }

    $scope.chooseNagger = function () {
        $state.go('tab.naggers');
    }
})

.controller('NagDetailCtrl', function ($scope, $stateParams, Nags, $ionicHistory, $state) {
    $ionicHistory.clearHistory();
    $scope.nagger = Nags.getCurrentNagger();
    $scope.nag = Nags.get($stateParams.nagId);
    $scope.remove = function (nag) {
        Nags.remove(nag);
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('tab.nags');
    }
    $scope.goBack = function () {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('tab.nags');
    }

})

.controller('NaggersCtrl', function ($scope, Nags, $ionicHistory, $state) {
    $scope.settings = {
        enableFriends: true
    };

    $scope.naggers = Nags.getAllNaggers();

    $scope.scheduleNagger = function (naggerName) {

        cordova.plugins.notification.local.clearAll();
        $scope.nagger = Nags.setCurrentNaggerByName(naggerName);
        var notifications = [];
        $scope.nagger.nags.forEach(function (nag, index) {
            var date = new Date();
            date.setDate(date.getDate() + nag.day);
            date.setHours(nag.hour);
            date.setMinutes(nag.minute);
            date.setSeconds(0);
            $scope.nagger.nags[index].date = date;
            var notification = {};
            notification.id = nag.id;
            notification.title = nag.title;
            notification.message = nag.message;
            notification.date = date;
            notifications.push(notification);

        });
        $scope.nagger = Nags.setCurrentNaggerByName(naggerName);

        cordova.plugins.notification.local.schedule(notifications);

        cordova.plugins.notification.local.on("click", function (notification) {
            $state.go('tab.nag-detail', { nagId: notification.id });
        });




        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('tab.nag-detail', { nagId: $scope.nagger.nags[0].id });



    };
});
