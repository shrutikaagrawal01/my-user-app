var services = angular.module('services', []);
services.factory("Users", ['$http', function($http, $resource) {
    // Users factory methods
    function getUsers(cb) {
        $http.get('/users/list').
        then(function(response) {
            if (response.data) {
                cb(response.data)
            }
        });
    }

    function getUserById(userId, cb) {
        $http.get('/users/list?userId=' + userId).
        then(function(response) {
            if (response.data) {
                cb(response.data.data);
            }
        });
    }

    function createNewUser(user, cb) {
        $http.post('/users/new', {
            name: user.name,
            email: user.email,
            country: (user.country) ? user.country : null
        }).then(function(response) {
            cb(response.data);
        })
    };

    function updateUser(userId, user, cb) {
        $http.put('/users/update?userId=' + userId, {
            name: user.name,
            country: user.country,
            email: user.email
        }).then(function(response) {
            cb(response.data)
        })
    };

    function deleteUser(userId, cb) {
        $http.delete('/users/remove?userId=' + userId).then(function(response) {
            if (response.data.success) {
                cb(true);
            } else {
                cb(false);
            }
        })
    };
    return {
        getUsers: getUsers,
        getUserById: getUserById,
        createNewUser: createNewUser,
        updateUser: updateUser,
        deleteUser: deleteUser
    }

}]);
