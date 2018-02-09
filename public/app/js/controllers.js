var controllers = angular.module('controllers', []);
controllers.controller('listCtrl', function($scope, $timeout, Users) {
    $scope.users = [];
    // calling getUsers method of Users service to get the list of users
    Users.getUsers(function(users) {
        $scope.users = users;
    });
    // method to create new user
    $scope.createNewUser = function(user) {
        // calling createNewUser method of Users service to create new user
        Users.createNewUser(user, function(response) {
            if (response && response.success) {
                user._id = response.insertedUserId;
                // pushing last inserted item into array
                $scope.users.push(user);
                $scope.user = null;
                // display success message
                $scope.createUserSuccess = true;
                // hide modal after 1500ms
                $timeout(function() {
                    $scope.createUserSuccess = false;
                    $('#newUserModal').modal('hide');
                }, 1500)

            }
        })
    };
    // method to delete the user
    $scope.deleteUser = function(userId, $index) {
        // calling deleteUser method of Users service to delete the user
        Users.deleteUser(userId, function(response) {
            if (response) {
                if ($scope.users.length > 0) {
                    //deleting the one entry from $scope.users array
                    $scope.users.splice($index, 1);
                }
            } else {
                alert('something went wrong.')
            }
        })
    }
});

controllers.controller('editCtrl', function($scope, $rootScope, $timeout, $location, $routeParams, Users) {
    var userId = ($routeParams.userId);
    Users.getUserById(userId, function(response) {
        $scope.user = response;
    });
    $scope.updateUser = function(user) {
        Users.updateUser(user._id, user, function(response) {
            if (response.success) {
                $scope.updateUserSuccess = true;
                $timeout(function() {
                    $location.path('/');
                }, 1500)
            } else {
                alert('something went wrong.')
            }
        })
    }
});
